<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin/dashboard" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">Banner 管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <div class="action-bar">
        <button @click="openAddModal" class="btn btn-primary" :disabled="isButtonLoading">
          <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
          {{ isButtonLoading ? '處理中...' : '新增 Banner' }}
        </button>
      </div>

      <!-- Loading 畫面 -->
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>載入中...</p>
      </div>

      <!-- Banner 列表 -->
      <div v-else class="banner-grid">
        <div v-for="banner in banners" 
             :key="banner.id" 
             class="banner-card"
             draggable="true"
             @dragstart="handleDragStart($event, banner)"
             @dragover.prevent
             @dragenter.prevent
             @drop="handleDrop($event, banner)">
          <div class="banner-image">
            <img :src="`data:${banner.imageType};base64,${banner.imageData}`" :alt="banner.title">
          </div>
          <div class="banner-info">
            <h3>{{ banner.title }}</h3>
            <p>{{ banner.description }}</p>
            <div class="banner-status">
              <span :class="['status-badge', banner.is_active ? 'active' : 'inactive']">
                {{ banner.is_active ? '啟用中' : '已停用' }}
              </span>
              <span class="sort-order">排序: {{ banner.sortOrder }}</span>
            </div>
          </div>
          <div class="banner-actions">
            <button 
              @click="openEditModal(banner)" 
              class="btn btn-secondary"
              :disabled="isButtonLoading || banner.isLoading">
              <i class="fas" :class="banner.id === editingId ? 'fa-spinner fa-spin' : 'fa-edit'"></i>
              {{ banner.id === editingId ? '載入中...' : '編輯' }}
            </button>
            <button 
              @click="handleDelete(banner.id)" 
              class="btn btn-danger"
              :disabled="isButtonLoading || banner.isLoading">
              <i class="fas" :class="banner.id === deletingId ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
              {{ banner.id === deletingId ? '刪除中...' : '刪除' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯 Banner' : '新增 Banner' }}</h2>
          <form @submit.prevent="handleSubmit" class="admin-form">
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
              <label>描述</label>
              <textarea 
                v-model="formData.description"
                placeholder="請輸入描述"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Banner 圖片</label>
              <div class="image-upload">
                <div v-if="imagePreview" class="image-preview">
                  <img :src="imagePreview" alt="預覽圖">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox"
                  v-model="formData.is_active"
                >
                啟用
              </label>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <i class="fas" :class="isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ isSubmitting ? '處理中...' : (isEditing ? '更新' : '新增') }}
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

const banners = ref([]);
const isLoading = ref(true);
const isButtonLoading = ref(false);
const showModal = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const deletingId = ref(null);
const isSubmitting = ref(false);
const imagePreview = ref(null);
const Swal = ref(null);
const draggedBanner = ref(null);

const formData = ref({
  title: '',
  description: '',
  is_active: false
});

// 載入 Banner 列表
async function loadBanners() {
  try {
    isLoading.value = true;
    const cookie = useCookie('auth_token');
    const response = await $fetch('/api/banners', {
      headers: {
        Authorization: `Bearer ${cookie.value}`
      }
    });
    
    banners.value = response.data;
  } catch (error) {
    console.error('載入 Banner 失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '載入 Banner 失敗'
    });
  } finally {
    isLoading.value = false;
  }
}

// 開啟新增 Modal
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    title: '',
    description: '',
    is_active: false
  };
  imagePreview.value = null;
  showModal.value = true;
}

// 開啟編輯 Modal
function openEditModal(banner) {
  isEditing.value = true;
  editingId.value = banner.id;
  formData.value = {
    title: banner.title,
    description: banner.description,
    is_active: banner.is_active
  };
  if (banner.imageData && banner.imageType) {
    imagePreview.value = `data:${banner.imageType};base64,${banner.imageData}`;
  }
  showModal.value = true;
}

// 關閉 Modal
function closeModal() {
  showModal.value = false;
  isEditing.value = false;
  editingId.value = null;
  imagePreview.value = null;
}

// 處理圖片選擇
function handleImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// 處理表單提交
async function handleSubmit() {
  try {
    isSubmitting.value = true;
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.value.title);
    formDataToSend.append('description', formData.value.description || '');
    formDataToSend.append('is_active', formData.value.is_active ? '1' : '0');

    const cookie = useCookie('auth_token');
    if (isEditing.value) {
      await $fetch(`/api/banners/${editingId.value}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${cookie.value}`
        }
      });
    } else {
      await $fetch('/api/banners', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${cookie.value}`
        }
      });
    }

    await loadBanners();
    closeModal();
    
    // 使用 SweetAlert2 顯示成功提示
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
  } catch (error) {
    console.error('操作失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '操作失敗'
    });
  } finally {
    isSubmitting.value = false;
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
    try {
      deletingId.value = id;
      const cookie = useCookie('auth_token');
      await $fetch(`/api/banners/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookie.value}`
        }
      });
      await loadBanners();
      
      // 顯示刪除成功提示
      Swal.value.fire({
        icon: 'success',
        title: '刪除成功',
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } catch (error) {
      console.error('刪除失敗:', error);
      Swal.value.fire({
        icon: 'error',
        title: '錯誤',
        text: error?.data?.message || '刪除失敗'
      });
    } finally {
      deletingId.value = null;
    }
  }
}

// 處理拖曳開始
function handleDragStart(event, banner) {
  draggedBanner.value = banner;
  event.dataTransfer.effectAllowed = 'move';
  event.target.classList.add('dragging');
}

// 處理拖曳結束時的放置
async function handleDrop(event, targetBanner) {
  event.preventDefault();
  event.target.closest('.banner-card').classList.remove('dragging');
  
  if (!draggedBanner.value || draggedBanner.value.id === targetBanner.id) {
    return;
  }

  try {
    isButtonLoading.value = true;
    const cookie = useCookie('auth_token');
    
    // 更新排序
    await $fetch(`/api/banners/order`, {
      method: 'PUT',
      body: {
        bannerId: draggedBanner.value.id,
        targetOrder: targetBanner.sortOrder
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.value}`
      }
    });

    // 重新載入列表
    await loadBanners();

    // 顯示成功提示
    const Toast = Swal.value.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });

    Toast.fire({
      icon: 'success',
      title: '排序更新成功'
    });
  } catch (error) {
    console.error('更新排序失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error?.data?.message || '更新排序失敗'
    });
  } finally {
    isButtonLoading.value = false;
    draggedBanner.value = null;
  }
}

// 初始載入
onMounted(async () => {
  try {
    Swal.value = (await import('sweetalert2')).default;
    await loadBanners();
  } catch (error) {
    console.error('初始化失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '初始化失敗'
    });
  }
});
</script>

<style lang="scss" scoped>
.admin-nav {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    
    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .page-title {
        color: var(--primary-color);
        margin: 0;
        font-size: 22px;
      }
      
      .placeholder {
        width: 100px;
      }

      .btn {
        font-size: 14px;
      }
    }
  }
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-size: 14px;
}

.action-bar {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;

  .btn {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }
}

.banner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.banner-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: move;
  
  &.dragging {
    opacity: 0.5;
    transform: scale(0.95);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .banner-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .banner-info {
    padding: 1rem;
    
    h3 {
      margin: 0 0 0.5rem;
      color: var(--primary-color);
      font-size: 18px;
    }
    
    p {
      margin: 0 0 1rem;
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }
  }
  
  .banner-status {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 14px;
      
      &.active {
        background-color: #e6f4ea;
        color: #1e8e3e;
      }
      
      &.inactive {
        background-color: #fce8e6;
        color: #d93025;
      }
    }
  }
  
  .banner-actions {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    border-top: 1px solid #eee;

    .btn {
      font-size: 14px;
      flex: 1;
      justify-content: center;
    }
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    margin-top: 1rem;
    font-size: 14px;
    color: #666;
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  
  h2 {
    margin: 0 0 1.5rem;
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
    
    &:hover {
      background: #999;
    }
  }
}

.admin-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
    
    input[type="text"],
    input[type="number"],
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        background-color: #fff;
        box-shadow: 0 0 0 3px rgba(65, 187, 190, 0.1);
      }

      &:hover {
        border-color: var(--primary-color);
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 14px;
      user-select: none;

      input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
  
  .image-upload {
    .image-preview {
      margin-top: 1rem;
      max-width: 100%;
      height: 200px;
      overflow: hidden;
      border-radius: 8px;
      border: 1px solid #ddd;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;

    .btn {
      min-width: 100px;
      font-size: 14px;
      padding: 0.75rem 1.5rem;
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      i {
        margin-right: 0.5rem;
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.opacity-50 {
  opacity: 0.5;
}

.sort-order {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f0f0f0;
  color: #666;
}
</style> 