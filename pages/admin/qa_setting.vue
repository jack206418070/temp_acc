<template>
  <div>
    <div class="admin-layout">
      <nav class="admin-nav">
        <div class="nav-content">
          <div class="nav-wrapper">
            <NuxtLink to="/admin" class="btn btn-secondary">返回首頁</NuxtLink>
            <h1 class="page-title">問答管理</h1>
            <div class="placeholder"></div><!-- 用來平衡布局 -->
          </div>
        </div>
      </nav>

      <div class="admin-container qa-container">
        <div class="action-bar">
          <button @click="openAddModal" class="btn btn-primary">
            <i class="fas fa-plus"></i> 新增問答
          </button>
        </div>

        <!-- 搜尋和篩選區塊 -->
        <div class="search-filter-container">
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜尋問題..."
              class="search-input"
            >
          </div>
          <div class="filter-box">
            <select 
              v-model="selectedCategory" 
              class="category-select"
            >
              <option value="">所有類別</option>
              <option 
                v-for="category in uniqueCategories" 
                :key="category" 
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>

        <!-- 載入中畫面 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>載入中...</p>
        </div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th width="5%">ID</th>
                <th width="35%">問題</th>
                <th width="35%">答案</th>
                <th width="15%">類別</th>
                <th width="10%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="qa in paginatedQAList" :key="qa.id">
                <td>{{ qa.id }}</td>
                <td class="question-cell">{{ qa.question }}</td>
                <td class="answer-cell">
                  {{ truncateText(qa.answer, 80) }}
                </td>
                <td>
                  <span class="category-tag">{{ qa.category }}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click="openEditModal(qa)" class="btn btn-secondary">
                      編輯
                    </button>
                    <button @click="handleDelete(qa.id)" class="btn btn-danger">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分頁控制 -->
        <div v-if="!isLoading && qaList.data?.length" class="pagination">
          <button 
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="btn btn-secondary"
          >
            上一頁
          </button>
          <span class="page-info">
            第 {{ currentPage }} 頁，共 {{ totalPages }} 頁
          </span>
          <button 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="btn btn-secondary"
          >
            下一頁
          </button>
        </div>
      </div>

      <!-- Modal -->
      <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <h2 class="modal-title">{{ isEditing ? '編輯問答' : '新增問答' }}</h2>
            <form @submit.prevent="handleSubmit" class="admin-form">
              <div class="form-group">
                <label>問題</label>
                <input 
                  v-model="formData.question" 
                  type="text" 
                  required
                  placeholder="請輸入問題"
                  :disabled="isSaving"
                >
              </div>
              <div class="form-group">
                <label>答案</label>
                <textarea 
                  v-model="formData.answer" 
                  required
                  placeholder="請輸入答案"
                  :disabled="isSaving"
                  rows="4"
                ></textarea>
              </div>
              <div class="form-group">
                <label>類別</label>
                <input 
                  v-model="formData.category" 
                  type="text" 
                  required
                  placeholder="請輸入類別"
                  :disabled="isSaving"
                >
              </div>
              <div class="button-group">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="isSaving"
                >
                  <span v-if="isSaving" class="button-loading"></span>
                  {{ isEditing ? '更新' : '新增' }}
                </button>
                <button 
                  type="button" 
                  @click="closeModal" 
                  class="btn btn-secondary"
                  :disabled="isSaving"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';

definePageMeta({
  layout: 'admin'
});

const qaList = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const isLoading = ref(true);
const formData = ref({
  id: null,
  question: '',
  answer: '',
  category: ''
});
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref('');
const selectedCategory = ref('');
const isSaving = ref(false);

// 獲取 QA 列表
async function fetchQAList() {
  isLoading.value = true;
  try {
    const response = await $fetch('/api/qa', {
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    qaList.value = response;
  } catch (error) {
    console.error('獲取 QA 列表失敗:', error);
  } finally {
    isLoading.value = false;
  }
}

// 開啟新增模態框
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    id: null,
    question: '',
    answer: '',
    category: ''
  };
  showModal.value = true;
}

// 開啟編輯模態框
function openEditModal(qa) {
  isEditing.value = true;
  formData.value = { ...qa };
  showModal.value = true;
}

// 關閉模態框
function closeModal() {
  showModal.value = false;
}

// 處理表單提交
async function handleSubmit() {
  isSaving.value = true;
  try {
    const url = isEditing.value 
      ? `/api/qa/${formData.value.id}`
      : '/api/qa';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    await $fetch(url, {
      method,
      body: formData.value,
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });

    await fetchQAList();
    closeModal();
    
    // 使用 SweetAlert2 顯示成功提示
    await Swal.fire({
      icon: 'success',
      title: isEditing.value ? '更新成功！' : '新增成功！',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  } catch (error) {
    console.error('保存失敗:', error);
    await Swal.fire({
      icon: 'error',
      title: '操作失敗',
      text: error?.data?.statusMessage || '發生未知錯誤',
      confirmButtonText: '確定'
    });
  } finally {
    isSaving.value = false;
  }
}

// 處理刪除
async function handleDelete(id) {
  // 使用 SweetAlert2 確認刪除
  const result = await Swal.fire({
    icon: 'warning',
    title: '確定要刪除嗎？',
    text: '刪除後將無法復原！',
    showCancelButton: true,
    confirmButtonText: '確定刪除',
    cancelButtonText: '取消',
    confirmButtonColor: '#dc3545',
  });

  if (!result.isConfirmed) return;
  
  try {
    await $fetch(`/api/qa/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    await fetchQAList();
    
    // 顯示刪除成功提示
    await Swal.fire({
      icon: 'success',
      title: '刪除成功！',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  } catch (error) {
    console.error('刪除失敗:', error);
    await Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: error?.data?.statusMessage || '發生未知錯誤',
      confirmButtonText: '確定'
    });
  }
}

// 獲取所有唯一的類別
const uniqueCategories = computed(() => {
  if (!qaList.value.data) return [];
  return [...new Set(qaList.value.data.map(qa => qa.category))];
});

// 篩選後的資料
const filteredQAList = computed(() => {
  if (!qaList.value.data) return [];
  
  return qaList.value.data.filter(qa => {
    const matchQuery = searchQuery.value.toLowerCase();
    const matchCategory = !selectedCategory.value || qa.category === selectedCategory.value;
    
    const matchSearch = !searchQuery.value || 
      qa.question.toLowerCase().includes(matchQuery);
    
    return matchSearch && matchCategory;
  });
});

// 修改分頁資料來源為篩選後的資料
const totalPages = computed(() => {
  return Math.ceil(filteredQAList.value.length / itemsPerPage);
});

const paginatedQAList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredQAList.value.slice(start, end);
});

// 當搜尋條件改變時，重置頁碼
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1;
});

// 文字截斷函數
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...'
    : text;
}

// 頁面載入時獲取數據
onMounted(() => {
  fetchQAList();
});
</script>

<style lang="scss" scoped>
.qa-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 14px;
}

.admin-table {
  width: 100%;
  table-layout: fixed;
  
  th, td {
    padding: 0.8rem;  // 稍微縮小 padding
    vertical-align: top;
    border-bottom: 1px solid #eee;
    font-size: 14px;  // 設定表格字體大小
  }

  th {
    font-size: 15px;  // 表頭字體稍大一點
  }
}

.category-tag {
  background-color: #41BBBE;
  color: white;
  padding: 0.2rem 0.6rem;  // 縮小 padding
  border-radius: 16px;
  font-size: 13px;        // 縮小標籤字體
}

.action-buttons {
  .btn {
    padding: 0.3rem 0.8rem;  // 縮小按鈕 padding
    font-size: 13px;         // 縮小按鈕字體
  }
}

.pagination {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 0;
  
  .page-info {
    margin: 0 1rem;
  }
  
  button {
    min-width: 70px;  // 稍微縮小按鈕寬度
    font-size: 13px;  // 按鈕字體大小
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.question-cell {
  white-space: pre-wrap;
  word-break: break-word;
  max-width: 400px;    // 增加問題欄位寬度
}

.answer-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;    // 增加答案欄位寬度
}

.action-bar {
  margin-bottom: 1rem;

  .btn {
    font-size: 13px;
    padding: 0.4rem 0.8rem;
  }
}

.table-responsive {
  overflow-x: auto;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: relative;

  .btn {
    font-size: 13px;
    padding: 0.4rem 0.8rem;
  }
}

.page-title {
  font-size: 1.5rem;
  color: #41BBBE;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.placeholder {
  // 與返回首頁按鈕相同寬度的空白區塊，用來保持標題置中
  width: 84px; // 根據返回首頁按鈕的寬度調整
  visibility: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  p {
    margin-top: 1rem;
    color: #41BBBE;
    font-size: 14px;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #41BBBE;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.search-filter-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  .search-box {
    flex: 1;
    
    .search-input {
      width: 100%;
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
      }
    }
  }
  
  .filter-box {
    width: 200px;
    
    .category-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
      }
    }
  }
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  font-size: 14px;
}

.modal-title {
  color: #41BBBE;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.admin-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-size: 14px;
    }
    
    input, textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
      }
      
      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  .btn {
    min-width: 100px;
    font-size: 14px;
    padding: 0.8rem 1.5rem;
    position: relative;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.button-loading {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}

// 可以添加一些 SweetAlert2 的自定義樣式
:deep(.swal2-popup) {
  font-size: 14px;
}

:deep(.swal2-title) {
  font-size: 1.2rem;
}

:deep(.swal2-toast) {
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

// 修改次要按鈕的顏色
:deep(.btn-secondary) {
  background-color: #41BBBE;
  border-color: #41BBBE;
  color: white;
  
  &:hover {
    background-color: darken(#41BBBE, 5%);
    border-color: darken(#41BBBE, 5%);
  }

  &:disabled {
    background-color: lighten(#41BBBE, 20%);
    border-color: lighten(#41BBBE, 20%);
  }
}

// 移除原本的 btn-primary 樣式覆蓋，因為現在使用 btn-secondary
:deep(.btn-primary) {
  // 移除這個樣式區塊
}
</style> 