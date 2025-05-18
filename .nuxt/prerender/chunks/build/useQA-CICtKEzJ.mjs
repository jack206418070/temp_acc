import { ref } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue/index.mjs';

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
      error.value = err.message || "\u7372\u53D6 QA \u985E\u5225\u5931\u6557";
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
      error.value = err.message || "\u7372\u53D6 QA \u5167\u5BB9\u5931\u6557";
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
      error.value = err.message || "\u7372\u53D6\u8A9E\u8A00\u5217\u8868\u5931\u6557";
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

export { useQA as u };
//# sourceMappingURL=useQA-CICtKEzJ.mjs.map
