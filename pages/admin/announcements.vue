<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin/dashboard" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">公告管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <!-- 公告列表 -->
      <div class="announcements-list">
        <div class="action-bar">
          <div class="filter-section">
            <select v-model="selectedCategory" class="filter-select">
              <option value="">全部類別</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <button @click="openCreateModal" class="btn btn-primary" :disabled="isButtonLoading">
            <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
            {{ isButtonLoading ? '處理中...' : '新增公告' }}
          </button>
        </div>

        <!-- Loading 畫面 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>載入中...</p>
        </div>

        <!-- 公告列表表格 -->
        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th width="30%">標題</th>
                <th width="15%">類別</th>
                <th width="15%">發布日期</th>
                <th width="15%">活動開始日</th>
                <th width="25%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="announcement in filteredAnnouncements" :key="announcement.id">
                <td>{{ announcement.title }}</td>
                <td>
                  <span class="category-tag">{{ announcement.category }}</span>
                </td>
                <td>{{ announcement.publish_date }}</td>
                <td>{{ announcement.activity_start_date }}</td>
                <td>
                  <div class="action-buttons">
                    <button 
                      @click="editAnnouncement(announcement)" 
                      class="btn btn-secondary"
                      :disabled="isButtonLoading || announcement.isLoading"
                    >
                      <i class="fas" :class="announcement.id === editingId ? 'fa-spinner fa-spin' : 'fa-edit'"></i>
                      {{ announcement.id === editingId ? '載入中...' : '編輯' }}
                    </button>
                    <button 
                      @click="deleteAnnouncement(announcement.id)" 
                      class="btn btn-danger"
                      :disabled="isButtonLoading || announcement.isLoading"
                    >
                      <i class="fas" :class="announcement.id === deletingId ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
                      {{ announcement.id === deletingId ? '刪除中...' : '刪除' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯公告' : '新增公告' }}</h2>
          <form @submit.prevent="saveAnnouncement" class="admin-form">
            <div class="form-group">
              <label>標題</label>
              <input v-model="form.title" type="text" required placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label>類別</label>
              <input v-model="form.category" type="text" required placeholder="請輸入類別">
            </div>
            <div class="form-group">
              <label>發布日期</label>
              <input v-model="form.publish_date" type="date" required>
            </div>
            <div class="form-group">
              <label>活動開始日</label>
              <input v-model="form.activity_start_date" type="date" required>
            </div>
            <div class="form-group">
              <label>連結標題</label>
              <input v-model="form.linkTitle" type="text" placeholder="請輸入連結標題（選填）">
            </div>
            <div class="form-group">
              <label>連結網址</label>
              <input v-model="form.link" type="url" placeholder="請輸入連結網址（選填）">
            </div>
            <div class="form-group">
              <label>內容</label>
              <div class="editor-wrapper">
                <client-only>
                  <EditorContent :editor="editor" class="editor-content" />
                </client-only>
              </div>
            </div>
            <div class="form-group">
              <label>檔案上傳 (圖片或PDF，限制每個 5MB 以內)</label>
              <input 
                type="file" 
                @change="handleFileUpload" 
                accept="image/jpeg,image/png,image/gif,application/pdf"
                multiple
              >
              <div v-if="imageError" class="error-message">
                {{ imageError }}
              </div>
              <div v-if="previewImages.length > 0" class="preview-files">
                <div v-for="(file, index) in previewImages" :key="index" class="preview-file-item">
                  <!-- 圖片預覽 -->
                  <div v-if="file.type === 'image'" class="image-preview">
                    <img :src="`data:image/jpeg;base64,${file.content}`" alt="預覽圖片" />
                    <span class="file-info">圖片</span>
                  </div>
                  
                  <!-- PDF 預覽 -->
                  <div v-else-if="file.type === 'pdf'" class="pdf-preview">
                    <i class="fas fa-file-pdf pdf-icon"></i>
                    <div class="file-details">
                      <span class="filename">{{ file.filename }}</span>
                      <span class="file-type">PDF 檔案</span>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    class="delete-file-btn"
                    @click="deleteFile(file.id)"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="button-group">
              <button type="submit" class="btn btn-primary" :disabled="isSaving">
                <i class="fas" :class="isSaving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ isSaving ? '儲存中...' : (isEditing ? '更新' : '新增') }}
              </button>
              <button type="button" @click="closeModal" class="btn btn-secondary" :disabled="isSaving">
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
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

definePageMeta({
  layout: 'admin'
});

// 狀態
const announcements = ref([]);
const showModal = ref(false);
const modalTitle = ref('新增公告');
const isSaving = ref(false);
const imagePreviews = ref([]);
const selectedFiles = ref([]);
const selectedCategory = ref('');
const categories = ref([]);
const isLoading = ref(false);
const isButtonLoading = ref(false);
const editingId = ref(null);
const deletingId = ref(null);
const imageError = ref('');
const isEditing = ref(false);
const previewImages = ref([]);
const existingImages = ref([]);

// 表單資料
const form = ref({
  id: null,
  title: '',
  category: '',
  publish_date: '',
  activity_start_date: '',
  content: '',
  link: '',
  linkTitle: ''
});

// 編輯器配置
const editor = ref(null);
const Swal = ref(null);
// 方法
async function loadAnnouncements() {
  try {
    isLoading.value = true;

    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch('/api/announcements', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    announcements.value = response.data.map(item => ({
      ...item,
      isLoading: false
    }));
    
    // 更新類別列表
    const uniqueCategories = new Set(response.data.map(item => item.category));
    categories.value = Array.from(uniqueCategories);
  } catch (error) {
    console.error('載入公告列表失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '載入公告列表失敗'
    });
  } finally {
    isLoading.value = false;
  }
}

// 初始化編輯器
function initEditor(content = '') {
  if (editor.value) {
    editor.value.destroy();
  }
  
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Placeholder.configure({
        placeholder: '請輸入公告內容...',
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    content: content,
    autofocus: true,
    onUpdate: ({ editor }) => {
      form.value.content = editor.getHTML();
    },
  });
}

function openCreateModal() {
  form.value = {
    id: null,
    title: '',
    category: '',
    publish_date: '',
    activity_start_date: '',
    content: '',
    link: '',
    linkTitle: ''
  };
  previewImages.value = [];
  existingImages.value = [];
  selectedFiles.value = [];
  imageError.value = '';
  modalTitle.value = '新增公告';
  showModal.value = true;
  isEditing.value = false;
  
  // 初始化編輯器
  nextTick(() => {
    initEditor('');
  });
}

async function editAnnouncement(announcement) {
  try {
    editingId.value = announcement.id;
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    form.value = { ...announcement };
    modalTitle.value = '編輯公告';
    showModal.value = true;
    isEditing.value = true;
    
    // 初始化編輯器並設定內容
    nextTick(() => {
      initEditor(announcement.content || '');
    });

    // 載入公告圖片
    try {
      const response = await $fetch(`/api/announcement-images/${announcement.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.success && response.data) {
        // 將檔案資料轉換為預覽格式，確保使用正確的 id
        previewImages.value = response.data.map(image => ({
          id: image.id,  // 使用資料庫的 id
          content: image.image_content,
          type: image.file_type || 'image',
          filename: image.original_filename,
          isExisting: true
        }));

        // 保存已存在的圖片資訊
        existingImages.value = [...previewImages.value];

        console.log('載入圖片成功:', {
          imageCount: previewImages.value.length,
          images: previewImages.value.map(img => ({
            id: img.id,
            hasContent: !!img.content,
            isExisting: true
          }))
        });
      }
    } catch (error) {
      console.error('載入圖片失敗', error);
      Swal.value.fire({
        icon: 'error',
        title: '錯誤',
        text: '載入圖片失敗'
      });
    }
  } catch (error) {
    console.error('編輯公告失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '編輯公告失敗'
    });
  } finally {
    editingId.value = null;
  }
}

function closeModal() {
  showModal.value = false;
  isEditing.value = false;
  previewImages.value = [];
  existingImages.value = [];
  selectedFiles.value = [];
  // 銷毀編輯器
  if (editor.value) {
    editor.value.destroy();
    editor.value = null;
  }
}

async function handleFileUpload(event) {
  const files = Array.from(event.target.files);
  
  // 檢查每個檔案
  for (const file of files) {
    // 檢查檔案大小
    if (file.size > 5 * 1024 * 1024) {
      imageError.value = '每個檔案大小不能超過 5MB';
      event.target.value = '';
      return;
    }

    // 檢查檔案類型
    if (!['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type)) {
      imageError.value = '只能上傳 JPG、PNG、GIF 格式的圖片或 PDF 檔案';
      event.target.value = '';
      return;
    }
  }

  imageError.value = '';

  // 處理每個檔案
  for (const file of files) {
    // 判斷檔案類型
    const fileType = file.type.startsWith('image/') ? 'image' : 'pdf';
    
    // 建立預覽
    const reader = new FileReader();
    reader.onload = e => {
      selectedFiles.value.push(file);
      previewImages.value.push({
        id: `temp-${Date.now()}-${file.name}`,
        content: e.target.result.split(',')[1],
        type: fileType,
        filename: file.name,
        isExisting: false,
        file: file
      });
    };
    reader.readAsDataURL(file);
  }
}

function removeImage(index) {
  imagePreviews.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
}

async function saveAnnouncement() {
  try {
    isSaving.value = true;

    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    // 確保所有欄位都被正確傳遞
    const data = {
      ...form.value,
      content: editor.value ? editor.value.getHTML() : '',
      publish_date: form.value.publish_date.split('T')[0],
      activity_start_date: form.value.activity_start_date.split('T')[0],
      linkTitle: form.value.linkTitle || null  // 確保 linkTitle 欄位被傳遞
    };

    console.log('準備儲存的資料:', {
      ...data,
      content: data.content ? '(content...)' : null
    });

    let announcementId;

    if (form.value.id) {
      // 更新公告
      const response = await $fetch(`/api/announcements/${form.value.id}`, {
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      announcementId = parseInt(form.value.id);
    } else {
      // 新增公告
      const response = await $fetch('/api/announcements', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      announcementId = parseInt(response.data.id);
    }

    // 只上傳新增的圖片
    const newImages = previewImages.value.filter(img => !img.isExisting && img.file);
    
    if (newImages.length > 0) {
      for (const image of newImages) {
        try {
          const formData = new FormData();
          
          if (!announcementId) {
            throw new Error('公告 ID 不存在');
          }

          formData.append('announcement_id', announcementId.toString());
          formData.append('image_id', `${Date.now()}-${image.file.name}`);
          formData.append('image', image.file);
          formData.append('file_type', image.type);
          formData.append('filename', image.file.name);

          console.log('準備上傳新圖片:', {
            announcement_id: announcementId.toString(),
            image_id: `${Date.now()}-${image.file.name}`,
            file_name: image.file.name,
            file_type: image.file.type,
            file_size: `${(image.file.size / 1024).toFixed(2)} KB`
          });

          const response = await $fetch('/api/announcement-images', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!response.success) {
            throw new Error(response.message || '圖片上傳失敗');
          }

          console.log('圖片上傳成功:', response);
        } catch (error) {
          console.error('圖片上傳失敗:', error);
          throw error;
        }
      }
    }

    await loadAnnouncements();
    showModal.value = false;
    Swal.value.fire({
      icon: 'success',
      title: '成功',
      text: `${form.value.id ? '更新' : '新增'}公告成功`
    });
  } catch (error) {
    console.error('儲存公告失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '儲存公告失敗'
    });
  } finally {
    isSaving.value = false;
  }
}

async function deleteAnnouncement(id) {
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const result = await Swal.value.fire({
      title: '確認刪除',
      text: '確定要刪除這則公告嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    });

    if (result.isConfirmed) {
      deletingId.value = id;
      await $fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await loadAnnouncements();
      Swal.value.fire({
        icon: 'success',
        title: '成功',
        text: '公告已刪除'
      });
    }
  } catch (error) {
    console.error('刪除公告失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '刪除公告失敗'
    });
  } finally {
    deletingId.value = null;
  }
}

const deleteFile = async (fileId) => {
  try {
    const result = await Swal.value.fire({
      title: '確認刪除',
      text: '確定要刪除這個檔案嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消'
    });

    if (result.isConfirmed) {
      // 找到要刪除的檔案
      const fileToDelete = previewImages.value.find(file => file.id === fileId);
      
      if (!fileToDelete) {
        throw new Error('找不到要刪除的檔案');
      }

      // 如果是已存在的檔案，需要呼叫 API 刪除
      if (fileToDelete.isExisting) {
        const token = useCookie('auth_token').value;
        if (!token) {
          throw new Error('未登入');
        }

        console.log('準備刪除檔案:', {
          id: fileId,
          isExisting: true
        });

        const response = await $fetch(`/api/announcement-images/${fileId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.success) {
          throw new Error(response.message || '刪除檔案失敗');
        }
      }

      // 從預覽檔案列表中移除
      const index = previewImages.value.findIndex(file => file.id === fileId);
      if (index !== -1) {
        previewImages.value.splice(index, 1);
      }

      // 如果是新上傳的檔案，也要從 selectedFiles 中移除
      if (!fileToDelete.isExisting) {
        const fileIndex = selectedFiles.value.findIndex(
          file => `temp-${Date.now()}-${file.name}` === fileId
        );
        if (fileIndex !== -1) {
          selectedFiles.value.splice(fileIndex, 1);
        }
      }

      Swal.value.fire({
        icon: 'success',
        title: '成功',
        text: '檔案已刪除'
      });
    }
  } catch (error) {
    console.error('刪除檔案失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '刪除檔案失敗'
    });
  }
};

// 生命週期
onMounted(async () => {
  try {
    Swal.value = (await import('sweetalert2')).default;
    await loadAnnouncements();
  } catch (error) {
    console.error('初始化失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '初始化失敗'
    });
  }
});

// 新增 onBeforeUnmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

// 新增 computed
const filteredAnnouncements = computed(() => {
  if (!selectedCategory.value) {
    return announcements.value || [];
  }
  return (announcements.value || []).filter(
    item => item.category === selectedCategory.value
  );
});
</script>

<style lang="scss" scoped>
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
      color: #41BBBE;
      margin: 0;
    }

    .btn {
      font-size: 15px;
      padding: 0.4rem 0.8rem;
    }

    .placeholder {
      width: 100px;
    }
  }
}
.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 14px;
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

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: #41BBBE;
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
    color: #41BBBE;
  }
}

.admin-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #41BBBE;
      }
    }
  }
}

.editor-wrapper {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  background: #fff;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #41BBBE;
  }

  :deep(.ProseMirror) {
    min-height: 300px;
    outline: none;
    
    > * + * {
      margin-top: 0.75em;
    }
    
    p.is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    ul,
    ol {
      padding: 0 1rem;
    }
  }
}

.editor-content {
  min-height: 300px;
  line-height: 1.8;
  font-size: 1rem;
  color: #333;

  :deep(p) {
    margin: 0 0 1rem;
  }

  :deep(ul), :deep(ol) {
    padding-left: 1.5rem;
  }
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.image-preview-wrapper {
  position: relative;
  width: 200px;

  .image-preview {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);

    &:hover {
      background: #c82333;
    }
  }
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #41BBBE;
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

.preview-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.preview-image-item {
  position: relative;
  width: 150px;
  height: 150px;
}

.preview-image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.delete-image-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.delete-image-btn:hover {
  background-color: #cc0000;
}

.delete-image-btn i {
  font-size: 12px;
}

.preview-files {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.preview-file-item {
  position: relative;
  width: 150px;
}

.image-preview img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.image-preview .file-info {
  display: block;
  text-align: center;
  padding: 0.25rem;
  background: #f8f9fa;
  font-size: 0.75rem;
  color: #666;
  border-radius: 0 0 4px 4px;
}

.pdf-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  min-height: 120px;
  justify-content: center;
}

.pdf-preview .pdf-icon {
  font-size: 2rem;
  color: #dc3545;
  margin-bottom: 0.5rem;
}

.pdf-preview .file-details {
  text-align: center;
}

.pdf-preview .filename {
  display: block;
  font-size: 0.75rem;
  color: #333;
  margin-bottom: 0.25rem;
  word-break: break-all;
}

.pdf-preview .file-type {
  display: block;
  font-size: 0.7rem;
  color: #666;
}

.delete-file-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  z-index: 10;
}

.delete-file-btn:hover {
  background-color: #c82333;
}

.delete-file-btn i {
  font-size: 12px;
}
</style> 