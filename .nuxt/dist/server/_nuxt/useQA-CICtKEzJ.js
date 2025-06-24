import { ref } from "vue";
const useQA = () => {
  const loading = ref(false);
  const error = ref(null);
  const fetchQACategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/qa-categories");
      return response.data;
    } catch (err) {
      error.value = err.message || "獲取 QA 類別失敗";
      return [];
    } finally {
      loading.value = false;
    }
  };
  const fetchQAContents = async (categoryId, languageId) => {
    loading.value = true;
    error.value = null;
    try {
      const query = languageId ? `?language_id=${languageId}` : "";
      const response = await $fetch(`/api/qa-contents${query}`);
      if (categoryId == void 0) {
        return response.data;
      } else {
        return response.data.filter((content) => content.category_id === categoryId);
      }
    } catch (err) {
      error.value = err.message || "獲取 QA 內容失敗";
      return [];
    } finally {
      loading.value = false;
    }
  };
  const fetchLanguages = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch("/api/languages");
      return response.data;
    } catch (err) {
      error.value = err.message || "獲取語言列表失敗";
      return [];
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    error,
    fetchQACategories,
    fetchQAContents,
    fetchLanguages
  };
};
export {
  useQA as u
};
