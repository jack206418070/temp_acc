import { ref } from 'vue'

interface QAContent {
  question: string
  answer: string
}

interface QACategory {
  id: number
  name: string
  parent_id: number | null
  qa_contents: {
    id: number
    language_id: number
    question: string
    answer: string
    sort_order: number
  }[]
}

export const useQA = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 獲取所有 QA 類別
  const fetchQACategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/qa-categories')
      return response.data
    } catch (err: any) {
      error.value = err.message || '獲取 QA 類別失敗'
      return []
    } finally {
      loading.value = false
    }
  }

  // 獲取特定類別的 QA 內容
  const fetchQAContents = async (categoryId: number, languageId?: number) => {
    loading.value = true
    error.value = null
    try {
      const query = languageId ? `?language_id=${languageId}` : ''
      const response = await $fetch(`/api/qa-contents${query}`)
      if (categoryId == undefined) {
        return response.data
      } else {
        return response.data.filter((content: any) => content.category_id === categoryId)
      }
    } catch (err: any) {
      error.value = err.message || '獲取 QA 內容失敗'
      return []
    } finally {
      loading.value = false
    }
  }

  // 獲取所有支援的語言
  const fetchLanguages = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/languages')
      return response.data
    } catch (err: any) {
      error.value = err.message || '獲取語言列表失敗'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchQACategories,
    fetchQAContents,
    fetchLanguages
  }
} 