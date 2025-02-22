<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <div class="nav-content">
        <h1>知識庫管理</h1>
        <div class="nav-right">
          <NuxtLink to="/admin" class="btn btn-secondary">返回首頁</NuxtLink>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <div class="action-bar">
        <button @click="openAddModal" class="btn btn-primary">
          <i class="fas fa-plus"></i> 新增知識
        </button>
      </div>
      <div class="knowledge-grid">
        <div v-for="item in knowledgeList.data.data" :key="item.id" class="knowledge-card">
          <div class="image-wrapper">
            <img 
              :src="item.image_url" 
              :alt="`知識 ${item.kid}`"
            >
          </div>
          <div class="card-info">
            <span class="category-tag">類別: {{ getCategoryName(item.know_category) }}</span>
            <div class="action-buttons">
              <button @click="openEditModal(item)" class="btn btn-secondary">
                編輯
              </button>
              <button @click="handleDelete(item.kid)" class="btn btn-danger">
                刪除
              </button>
            </div>
          </div>
        </div>
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
                <option value="1">類別一</option>
                <option value="2">類別二</option>
                <option value="3">類別三</option>
              </select>
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
                @error="handleImageError"
              >
            </div>
            <div class="button-group">
              <button type="submit" class="btn btn-primary">
                {{ isEditing ? '更新' : '新增' }}
              </button>
              <button 
                type="button" 
                @click="closeModal" 
                class="btn btn-secondary"
              >
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
const knowledgeList = ref({ data: [] });
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  kid: null,
  know_category: '',
});
const imagePreview = ref('');
const selectedFile = ref(null);
const imageError = ref('');

// 獲取知識列表
async function fetchKnowledgeList() {
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
    knowledgeList.value = { data: response };
  } catch (error) {
    console.error('獲取知識列表失敗:', error);
    alert(error?.data?.message || '獲取資料失敗');
    // 如果是未登入錯誤，導向登入頁
    if (error?.data?.statusCode === 401) {
      navigateTo('/login');
    }
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
    1: '類別一',
    2: '類別二',
    3: '類別三'
  };
  return categories[category] || '未知類別';
}

// 開啟新增模態框
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    kid: null,
    know_category: '',
  };
  imagePreview.value = '';
  selectedFile.value = null;
  imageError.value = '';
  showModal.value = true;
}

// 開啟編輯模態框
function openEditModal(knowledge) {
  isEditing.value = true;
  formData.value = {
    kid: knowledge.kid,
    know_category: knowledge.know_category,
  };
  imagePreview.value = knowledge.image_url;
  selectedFile.value = null;
  imageError.value = '';
  showModal.value = true;
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
    } else {
      throw new Error(response.message || '操作失敗');
    }
  } catch (error) {
    console.error('保存失敗:', error);
    alert(error?.data?.message || '操作失敗');
    if (error?.data?.statusCode === 401) {
      navigateTo('/login');
    }
  }
}

// 處理刪除
async function handleDelete(id) {
  if (!confirm('確定要刪除這個知識嗎？')) return;
  
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
  } catch (error) {
    console.error('刪除失敗:', error);
    alert(error?.data?.message || '刪除失敗');
    if (error?.data?.statusCode === 401) {
      navigateTo('/login');
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
.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.knowledge-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  .image-wrapper {
    aspect-ratio: 16/9;
    overflow: hidden;
    background-color: #f5f5f5; // 添加背景色
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  .card-info {
    padding: 1rem;
    
    .category-tag {
      display: inline-block;
      margin-bottom: 1rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 0.5rem;
      
      .btn {
        flex: 1;
        padding: 0.5rem;
      }
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
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style> 