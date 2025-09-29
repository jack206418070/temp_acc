<template>
  <div>
    <div class="service-banner" v-if="!loading">
      <!-- 分類標題按鈕 -->
      <div class="category-tabs">
        <div class="tabs-scroll">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setActiveCategory(category)"
            :class="{ active: activeCategory?.id === category.id }"
          >
            {{ getCategoryName(category) }}
          </button>
        </div>
      </div>
      <div class="qa-list" v-if="activeCategory">
        <div
          class="qa-item"
          v-for="(item, index) in qaContents"
          :key="item.id"
        >
          <div class="qa-title" @click="toggleExpand(index)">
            {{ item.question }}
          </div>
          <div
            class="qa-content"
            v-if="expandedIndexes.includes(index)"
            v-html="item.answer"
          />
        </div>
      </div>
    </div>
    <div class="service-banner" v-else>
      <p>資料載入中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '#imports'

const route = useRoute()
const { loading, error, fetchQACategories, fetchQAContents } = useQA()

interface Category {
  id: number
  name: string
  name_en?: string
  name_vi?: string
  name_id?: string
  name_th?: string
  parent_id: number | null
}

interface QAContent {
  id: number
  question: string
  answer: string
  category_id: number
  language_code: string
  sort_order: number
}

const categories = ref<Category[]>([])
const qaContents = ref<QAContent[]>([])
const activeCategory = ref<Category | null>(null)
const expandedIndexes = ref<number[]>([])
const currentLang = ref<string>('zh-tw') // 預設為中文

// 根據當前語言取得分類名稱
const getCategoryName = (category: Category) => {
  const langMap = {
    'zh-tw': 'name',    // 中文
    'en': 'name_en',    // 英文
    'vi': 'name_vi',    // 越南文
    'id': 'name_id',    // 印尼文
    'th': 'name_th'     // 泰文
  }
  
  const langKey = langMap[currentLang.value] || 'name'
  return category[langKey as keyof Category] || category.name
}

// 設置當前分類
const setActiveCategory = async (category: Category) => {
  activeCategory.value = category
  await loadQAContents()
}

// 載入 QA 內容
const loadQAContents = async () => {
  if (!activeCategory.value) return
  
  const contents = await fetchQAContents()
  
  // 過濾出當前分類和語言的內容
  qaContents.value = contents
    .filter((content: QAContent) => {
      // 檢查是否屬於當前分類
      const isCurrentCategory = content.category_id === activeCategory.value?.id
      console.log('content',content)
      // 檢查語言是否匹配
      // 如果沒有指定語言參數，或語言是 zh-tw，就顯示中文內容
      if (!route.query.lang || route.query.lang === 'zh-tw') {
        // 顯示沒有語言代碼的內容（預設中文）
        return isCurrentCategory && content.language_code == 'zh-TW'
      } else {
        // 其他語言則需要完全匹配
        return isCurrentCategory && content.language_code === route.query.lang
      }
    })
    .sort((a: QAContent, b: QAContent) => a.sort_order - b.sort_order)
}

// 展開/收合 QA
const toggleExpand = (index: number) => {
  const idx = expandedIndexes.value.indexOf(index)
  if (idx > -1) {
    expandedIndexes.value.splice(idx, 1)
  } else {
    expandedIndexes.value.push(index)
  }
}

// 監聽路由參數變化
watch(
  () => route.query,
  async () => {
    // 更新當前語言
    if (route.query.lang) {
      currentLang.value = route.query.lang as string
    } else {
      currentLang.value = 'zh-tw'  // 如果沒有指定語言，預設使用中文
    }
    
    if (activeCategory.value) {
      await loadQAContents()
    }
  },
  { immediate: true }
)


// 初始化
onMounted(async () => {
  try {
    // 設置當前語言
    if (route.query.lang) {
      currentLang.value = route.query.lang as string
    }
    
    const allCategories = await fetchQACategories()
    
    // 根據 URL 參數過濾子分類
    const parentId = route.query.id ? parseInt(route.query.id as string) : null
    categories.value = allCategories.filter((cat: Category) => cat.parent_id === parentId)
    
    // 如果有分類，自動選擇第一個
    if (categories.value.length > 0) {
      // 預設選擇分類
      let initialCategory = categories.value[0]

      // 如果 id = 1，嘗試用網址中的 category 參數比對
      if (parentId === 1 && route.query.category) {
        const categoryId = Number(route.query.category)
        const matched = categories.value.find(c => c.id === categoryId)
        if (matched) {
          initialCategory = matched
        }
      }

      await setActiveCategory(initialCategory)
    }
  } catch (error) {
    console.error('初始化失敗:', error)
  }
})

// SEO 設置
useSeoMeta({ 
  title: '常見問題｜多元陪伴照顧',
  description: '多元陪伴照顧服務常見問題解答，包含民眾申請、試辦單位、外國籍陪伴照顧服務工作者等相關資訊。'
})
</script>

<style lang="scss" scoped>
.service-banner {
  padding-top: 100px;
  max-width: 1280px;
  margin: 0 auto;
  padding-bottom: 80px;
}
.category-tabs {
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 16px;
}
.tabs-scroll {
  display: flex;
}
.category-tabs button {
  margin-right: 20px;
  padding: 6px 20px;
  cursor: pointer;
  white-space: nowrap;
  background: #f0f0f0;
  border: none;
  margin-bottom: 10px;
  border:2px solid #D3D3DA;
  border-radius: 99px;
  background: #fff;
  font-size: 20px;
  transition: .3s;
}
.category-tabs button.active, .category-tabs button:hover {
  background: #41BBBE;
  color: #fff;
}

.qa-item {
  border-bottom: 1px solid #065306;
  padding: 20px 0;
}
.qa-title {
  font-weight: 400;
  cursor: pointer;
  color: rgb(43, 39, 22);
}
.qa-content {
  margin-top: 20px;
  padding-left: 12px;
  font-size: 18px;
}
.qa-content  p {
  margin-bottom: 0px !important;
}
@media (max-width: 996px) {
  .service-banner {
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 40px;
    padding-top: 40px;
  }
}
</style> 