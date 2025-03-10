<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">知識庫管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container qa-container">
      <div class="action-bar">
        <button @click="openAddModal" class="btn btn-primary" :disabled="isButtonLoading">
          <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
          {{ isButtonLoading ? '處理中...' : '新增知識' }}
        </button>
      </div>

      <!-- Loading 畫面 -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>

      <!-- 表格呈現 -->
      <div v-else class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th width="5%">ID</th>
              <th width="15%">類別</th>
              <th width="50%">標題</th>
              <th width="30%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in knowledgeList.data.data" :key="item.kid">
              <td>{{ item.kid }}</td>
              <td>
                <span class="category-tag">{{ getCategoryName(item.know_category) }}</span>
              </td>
              <td>{{ item.title }}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    @click="openEditModal(item)" 
                    class="btn btn-secondary" 
                    :disabled="isButtonLoading || item.isLoading"
                  >
                    <i class="fas" :class="item.isLoading ? 'fa-spinner fa-spin' : 'fa-edit'"></i>
                    {{ item.isLoading ? '載入中...' : '編輯' }}
                  </button>
                  <button 
                    @click="handleDelete(item.kid)" 
                    class="btn btn-danger" 
                    :disabled="isButtonLoading || item.isLoading"
                  >
                    <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯知識' : '新增知識' }}</h2>
          <form @submit.prevent="handleSubmit" class="admin-form">
            <div class="form-group">
              <label>類別</label>
              <select v-model="formData.know_category" required>
                <option value="1">懶人包</option>
                <option value="2">宣傳圖卡</option>
              </select>
            </div>
            <div class="form-group">
              <label>標題</label>
              <input 
                v-model="formData.title"
                type="text"
                required
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label>圖片 (限制 5MB 以內)</label>
              <input 
                type="file" 
                @change="handleFileChange" 
                accept="image/jpeg,image/png,image/gif"
                :required="!isEditing"
              >
              <div v-if="imageError" class="error-message">
                {{ imageError }}
              </div>
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                class="image-preview" 
                alt="預覽圖"
              >
            </div>
            <div class="button-group">
              <button type="submit" class="btn btn-primary" :disabled="isButtonLoading">
                <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ isButtonLoading ? '處理中...' : (isEditing ? '更新' : '新增') }}
              </button>
              <button type="button" @click="closeModal" class="btn btn-secondary" :disabled="isButtonLoading">
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swal from 'sweetalert2';

const knowledgeList = ref({ data: [] });
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  kid: null,
  know_category: '',
  title: '',
});
const imagePreview = ref('');
const selectedFile = ref(null);
const imageError = ref('');
const isButtonLoading = ref(false);

definePageMeta({
  layout: 'admin'
});

// 獲取知識列表
async function fetchKnowledgeList() {
  isButtonLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch('/api/knowledge', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // 為每個項目添加 isLoading 屬性
    knowledgeList.value = { 
      data: {
        ...response,
        data: response.data.map(item => ({
          ...item,
          isLoading: false
        }))
      }
    };
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '獲取資料失敗'
    });
    if (error?.data?.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    isButtonLoading.value = false;
  }
}

// 處理圖片載入錯誤
function handleImageError(event) {
  console.error('圖片載入失敗:', event.target.src);
  event.target.src = '/images/bg_1.png';
}

// 處理文件選擇
function handleFileChange(event) {
  const file = event.target.files[0];
  imageError.value = '';

  if (file) {
    // 檢查文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      imageError.value = '圖片大小不能超過 5MB';
      event.target.value = '';
      imagePreview.value = '';
      selectedFile.value = null;
      return;
    }

    // 檢查文件類型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      imageError.value = '只支援 JPG、PNG 或 GIF 格式';
      event.target.value = '';
      imagePreview.value = '';
      selectedFile.value = null;
      return;
    }

    selectedFile.value = file;
    if (imagePreview.value) {
      URL.revokeObjectURL(imagePreview.value);
    }
    imagePreview.value = URL.createObjectURL(file);
  }
}

// 獲取類別名稱
function getCategoryName(category) {
  const categories = {
    1: '懶人包',
    2: '宣傳圖卡'
  };
  return categories[category] || '未知類別';
}

// 開啟新增模態框
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    kid: null,
    know_category: '1',
    title: '',
  };
  imagePreview.value = '';
  selectedFile.value = null;
  imageError.value = '';
  showModal.value = true;
}

// 開啟編輯模態框
async function openEditModal(item) {
  // 設置當前項目的 loading 狀態
  item.isLoading = true;
  
  try {
    isEditing.value = true;
    formData.value = { ...item };
    
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch(`/api/knowledge/${item.kid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.success) {
      imagePreview.value = response.data.image_url;
      showModal.value = true;
    } else {
      throw new Error(response.message || '獲取圖片失敗');
    }
  } catch (error) {
    console.error('獲取圖片失敗:', error);
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '獲取圖片失敗'
    });
  } finally {
    // 清除當前項目的 loading 狀態
    item.isLoading = false;
  }
}

// 關閉模態框
function closeModal() {
  showModal.value = false;
  if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value);
  }
  imagePreview.value = '';
  imageError.value = '';
}

// 處理表單提交
async function handleSubmit() {
  isButtonLoading.value = true;
  try {
    if (!formData.value.know_category) {
      alert('請選擇類別');
      return;
    }

    if (!isEditing.value && !selectedFile.value) {
      alert('請選擇圖片');
      return;
    }

    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const formDataToSend = new FormData();
    formDataToSend.append('know_category', formData.value.know_category);
    formDataToSend.append('title', formData.value.title);
    console.log(formData.value.title);
    if (selectedFile.value) {
      formDataToSend.append('image', selectedFile.value);
    }

    const url = isEditing.value 
      ? `/api/knowledge/${formData.value.kid}`
      : '/api/knowledge';
    
    const method = isEditing.value ? 'PUT' : 'POST';
    
    const response = await $fetch(url, {
      method,
      body: formDataToSend,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.success) {
      await fetchKnowledgeList();
      closeModal();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      Toast.fire({
        icon: 'success',
        title: isEditing.value ? '更新成功' : '新增成功'
      });
    } else {
      throw new Error(response.message || '操作失敗');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '操作失敗'
    });
    if (error?.data?.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    isButtonLoading.value = false;
  }
}

// 處理刪除
async function handleDelete(id) {
  const result = await Swal.fire({
    title: '確定要刪除嗎？',
    text: '此操作無法復原',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#41BBBE',
    cancelButtonColor: '#d33',
    confirmButtonText: '確定刪除',
    cancelButtonText: '取消'
  });

  if (result.isConfirmed) {
    isButtonLoading.value = true;
    try {
      const token = useCookie('auth_token').value;
      if (!token) {
        throw new Error('未登入');
      }

      await $fetch(`/api/knowledge/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await fetchKnowledgeList();
      Swal.fire({
        icon: 'success',
        title: '刪除成功',
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: error?.data?.message || '刪除失敗'
      });
      if (error?.data?.statusCode === 401) {
        navigateTo('/admin/login');
      }
    } finally {
      isButtonLoading.value = false;
    }
  }
}

// 頁面載入時獲取數據
onMounted(() => {
  fetchKnowledgeList();
});

// 在組件卸載時清理
onBeforeUnmount(() => {
  if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value);
  }
});
</script>

<style lang="scss" scoped>
.qa-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 16px;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: relative;

  .btn {
    font-size: 15px;
    padding: 0.4rem 0.8rem;
  }
}

.page-title {
  font-size: calc(1.5rem + 2px);
  color: #41BBBE;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.placeholder {
  width: 84px;
  visibility: hidden;
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

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  th, td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 500;
    font-size: 16px;
  }
  
  td {
    font-size: 16px;
    vertical-align: middle;
  }
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 4px;
  object-fit: contain;
  background-color: #f8f9fa;
  padding: 0.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// 文件上傳按鈕樣式
input[type="file"] {
  display: block;
  width: 100%;
  padding: 0.8rem;
  border: 1px dashed var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary-color);
  }

  &:invalid {
    border-color: var(--danger-color, #dc3545);
  }
}

select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.error-message {
  color: var(--danger-color, #dc3545);
  font-size: calc(0.875rem + 2px);
  margin-top: 0.25rem;
}

.action-bar {
  margin-bottom: 1rem;
  
  .btn-primary {
    font-size: 15px;
    padding: 0.4rem 0.8rem;
    
    i {
      margin-right: 0.3rem;
    }
  }
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  
  h2 {
    color: #41BBBE;
    font-size: calc(1.2rem + 2px);
    margin-bottom: 1.5rem;
  }
  
  .admin-form {
    .form-group {
      margin-bottom: 1rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 16px;
        color: #333;
      }
      
      input, select {
        font-size: 16px;
      }
    }
    
    .button-group {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
      
      .btn {
        font-size: 15px;
        padding: 0.4rem 0.8rem;
        min-width: 80px;
        
        &:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
      }
    }
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  
  .btn {
    font-size: 15px;
    padding: 0.4rem 0.8rem;
    min-width: 76px;  // 添加最小寬度，避免 loading 時按鈕寬度改變
    
    i {
      margin-right: 0.3rem;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}
</style> 