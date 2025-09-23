<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin/dashboard" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">知識庫管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container qa-container">
      <div class="action-bar">
        <div class="filter-section">
          <select v-model="selectedCategory" @change="handleCategoryChange" class="filter-select">
            <option value="">全部類別</option>
            <option value="1">懶人包</option>
            <option value="2">宣導資料</option>
          </select>
        </div>
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
            <tr v-for="item in filteredKnowledgeList" 
                :key="item.kid"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover.prevent
                @dragenter.prevent
                @drop="handleDrop($event, item)"
                :class="{ 'opacity-50': isDragging && draggedItem?.kid === item.kid }">
              <td>{{ item.kid }}</td>
              <td>
                <span class="category-tag">{{ getCategoryName(item.know_category) }}</span>
              </td>
              <td>
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 cursor-move mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ item.title }}</div>
                </div>
              </td>
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
                <option value="2">宣導資料</option>
              </select>
            </div>
            <div class="form-group">
              <label>圖片 (限制 5MB 以內)</label>
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
definePageMeta({  
  layout: 'admin'
});

import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
const Swal = ref(null);

const knowledgeList = ref({ data: [] });
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  kid: null,
  know_category: '',
  title: '',
  image_url: ''
});
const imagePreview = ref('');
const selectedFile = ref(null);
const imageError = ref('');
const isButtonLoading = ref(false);
const selectedCategory = ref('');
const isLoading = ref(false);

// 拖拽相關的狀態
const isDragging = ref(false);
const draggedItem = ref(null);

// 篩選後的知識列表
const filteredKnowledgeList = computed(() => {
  if (!selectedCategory.value) {
    return knowledgeList.value.data.data || [];
  }
  return (knowledgeList.value.data.data || []).filter(
    item => item.know_category.toString() === selectedCategory.value
  );
});

// 處理類別變更
async function handleCategoryChange() {
  isLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    // 構建 URL，如果選擇了類別則添加查詢參數
    let url = '/api/knowledge';
    if (selectedCategory.value) {
      url += `?category=${selectedCategory.value}`;
    }

    const response = await $fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // 更新知識列表
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
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '獲取資料失敗'
    });
    if (error?.data?.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    isLoading.value = false;
  }
}

// 處理拖拽開始
const handleDragStart = (event, item) => {
  isDragging.value = true;
  draggedItem.value = item;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', JSON.stringify({
    kid: item.kid,
    category: item.know_category,
    order: item.display_order
  }));
};

// 處理拖拽放置
const handleDrop = async (event, targetItem) => {
  event.preventDefault();
  isDragging.value = false;
  
  try {
    const draggedData = JSON.parse(event.dataTransfer.getData('text/plain'));
    const sourceItem = draggedItem.value;
    
    // 如果拖拽到同一個位置，不做任何處理
    if (sourceItem.kid === targetItem.kid) {
      return;
    }
    
    // 計算新的順序
    let newOrder;
    if (sourceItem.know_category === targetItem.know_category) {
      // 同一類別內移動
      newOrder = targetItem.display_order;
    } else {
      // 不同類別間移動，獲取目標類別的最大順序
      const maxOrder = Math.max(...knowledgeList.value
        .filter(item => item.know_category === targetItem.know_category)
        .map(item => item.display_order), 0);
      newOrder = maxOrder + 1;
    }
    
    // 更新順序
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }
    
    await $fetch('/api/knowledge/order', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: sourceItem.kid,
        newOrder,
        category: targetItem.know_category
      })
    });
    
    // 重新獲取資料
    await fetchKnowledgeList();
    
    // 顯示成功訊息
    Swal.fire({
      icon: 'success',
      title: '更新成功',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('更新順序失敗:', error);
    Swal.fire({
      icon: 'error',
      title: '更新失敗',
      text: error.message || '請稍後再試'
    });
  } finally {
    draggedItem.value = null;
  }
};

//獲取知識列表
async function fetchKnowledgeList() {
  isLoading.value = true;
  isButtonLoading.value = true;
  try {
    console.log('fetchKnowledgeList');
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
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '獲取資料失敗'
    });
    if (error?.data?.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    isLoading.value = false;
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
    2: '宣導資料'
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
    image_url: ''
  };
  imagePreview.value = '';
  selectedFile.value = null;
  imageError.value = '';
  showModal.value = true;
}

// 開啟編輯模態框
async function openEditModal(item) {
  item.isLoading = true;
  
  try {
    isEditing.value = true;
    formData.value = { 
      ...item,
      image_url: item.image_url || ''
    };
    
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
      imagePreview.value = response.data.image_url || response.data.image_url;
      showModal.value = true;
    } else {
      throw new Error(response.message || '獲取圖片失敗');
    }
  } catch (error) {
    console.error('獲取圖片失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '獲取圖片失敗'
    });
  } finally {
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

    if (!isEditing.value && !selectedFile.value && !formData.value.image_url) {
      alert('請選擇圖片或輸入圖片連結');
      return;
    }

    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const formDataToSend = new FormData();
    formDataToSend.append('know_category', formData.value.know_category);
    formDataToSend.append('title', formData.value.title);
    formDataToSend.append('image_url', formData.value.image_url || '');
    
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
      const Toast = Swal.value.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.value.stopTimer)
          toast.addEventListener('mouseleave', Swal.value.resumeTimer)
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
    Swal.value.fire({
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
  const result = await Swal.value.fire({
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
      Swal.value.fire({
        icon: 'success',
        title: '刪除成功',
        timer: 1500
      });
    } catch (error) {
      Swal.value.fire({
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
onMounted(async () => {
  console.log('in mounted');
  Swal.value = (await import('sweetalert2')).default;
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
  
  .action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .filter-section {
      display: flex;
      align-items: center;
    }
    
    .filter-select {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 15px;
      min-width: 150px;
      margin-right: 1rem;
    }
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
      vertical-align: middle;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 500;
      font-size: 16px;
    }
    
    td {
      font-size: 16px;
      
      .flex {
        display: flex;
        align-items: center;
      }
      
      .cursor-move {
        cursor: move;
      }
      
      .text-gray-400 {
        color: #9ca3af;
      }
      
      .text-gray-900 {
        color: #111827;
      }
    }
    
    tr {
      &:hover {
        background-color: #f8f9fa;
      }
      
      &.dragging {
        opacity: 0.5;
        background-color: #f8f9fa;
      }
      
      &.drag-over {
        border-top: 2px solid #41BBBE;
      }
    }
  }
  
  .category-tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background-color: #e5e7eb;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
    
    .btn {
      font-size: 15px;
      padding: 0.4rem 0.8rem;
      min-width: 76px;
      
      i {
        margin-right: 0.3rem;
      }
      
      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }
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
  
  .opacity-50 {
    opacity: 0.5;
  }

  .admin-nav {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  .nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;

    .page-title {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin: 0;
    }

    .placeholder {
      width: 100px;
    }
  }
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  .filter-section {
    .filter-select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 150px;
    }
  }
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
}

.region-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  
  button {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
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
  
  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
}

.admin-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input,
    select,
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  
  .image-preview {
    max-width: 100%;
    max-height: 200px;
    margin-top: 1rem;
    border-radius: 4px;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  p {
    margin-top: 1rem;
    color: #666;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.opacity-50 {
  opacity: 0.5;
}

.tab-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
}

.tab-button {
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &.active {
    color: var(--primary-color);
    font-weight: 600;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
}

.tab-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 2rem;
}

.reminder-container {
  .editor-wrapper {
    background: white;
    border-radius: 8px;
    overflow: hidden;

    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;

      h2 {
        margin: 0;
        font-size: 1.25rem;
        color: var(--primary-color);
      }
    }

    .editor-content {
      padding: 1rem;

      :deep(.ck-editor__editable) {
        min-height: 400px;
        max-height: 600px;
      }

      :deep(.ck.ck-editor__main > .ck-editor__editable) {
        background-color: #ffffff;
        border: 1px solid #ddd;
        box-shadow: none;
      }

      :deep(.ck.ck-toolbar) {
        border: 1px solid #ddd;
        border-bottom: none;
      }
    }
  }
}
</style>