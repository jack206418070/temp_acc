<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin/dashboard" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">服務單位管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <!-- Tab 切換 -->
      <div class="tab-container">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'service-unit' }"
          @click="activeTab = 'service-unit'"
        >
          服務單位設定
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'user-reminder' }"
          @click="activeTab = 'user-reminder'"
        >
          使用者叮嚀設定
        </button>
      </div>

      <!-- 服務單位設定內容 -->
      <div v-if="activeTab === 'service-unit'" class="tab-content">
        <div class="action-bar">
          <div class="filter-section">
            <select v-model="selectedRegion" @change="handleRegionChange" class="filter-select">
              <option value="">全部地區</option>
              <option value="north">北部</option>
              <option value="central">中部</option>
              <option value="south">南部</option>
              <option value="east">東部</option>
            </select>
          </div>
          <button @click="openAddModal" class="btn btn-primary" :disabled="isButtonLoading">
            <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
            {{ isButtonLoading ? '處理中...' : '新增服務單位' }}
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
                <th width="10%">地區</th>
                <th width="20%">單位名稱</th>
                <th width="15%">聯絡電話</th>
                <th width="30%">地址</th>
                <th width="20%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredServiceUnits" 
                  :key="item.id"
                  draggable="true"
                  @dragstart="handleDragStart($event, item)"
                  @dragover.prevent
                  @dragenter.prevent
                  @drop="handleDrop($event, item)"
                  :class="{ 'opacity-50': isDragging && draggedItem?.id === item.id }">
                <td>{{ item.id }}</td>
                <td>
                  <span class="region-tag">{{ getRegionName(item.region) }}</span>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.address }}</td>
                <td>
                  <div class="action-buttons">
                    <button 
                      @click="openEditModal(item)" 
                      class="btn btn-secondary" 
                      :disabled="isButtonLoading || item.isLoading || isLoadingEdit"
                    >
                      <i class="fas" :class="item.id === editingId && isLoadingEdit ? 'fa-spinner fa-spin' : 'fa-edit'"></i>
                      {{ item.id === editingId && isLoadingEdit ? '載入中...' : '編輯' }}
                    </button>
                    <button 
                      @click="handleDelete(item.id)" 
                      class="btn btn-danger" 
                      :disabled="isButtonLoading || item.isLoading || isLoadingEdit"
                    >
                      <i class="fas" :class="item.id === deletingId ? 'fa-spinner fa-spin' : 'fa-trash'"></i>
                      {{ item.id === deletingId ? '刪除中...' : '刪除' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 使用者叮嚀設定內容 -->
      <div v-else-if="activeTab === 'user-reminder'" class="tab-content">
        <div class="reminder-container">
          <div class="editor-wrapper">
            <div class="editor-header">
              <h2>編輯使用者叮嚀內容</h2>
              <button 
                @click="saveReminder" 
                class="btn btn-primary"
                :disabled="isReminderLoading"
              >
                <i class="fas" :class="isReminderLoading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ isReminderLoading ? '儲存中...' : '儲存' }}
              </button>
            </div>
            <div class="editor-content">
              <client-only>
                <EditorContent :editor="editor" class="tiptap-editor" />
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯服務單位' : '新增服務單位' }}</h2>
          <form @submit.prevent="handleSubmit" class="admin-form">
            <div class="form-group">
              <label>地區</label>
              <select v-model="formData.region" required>
                <option value="north">北部</option>
                <option value="central">中部</option>
                <option value="south">南部</option>
                <option value="east">東部</option>
              </select>
            </div>
            <div class="form-group">
              <label>單位名稱</label>
              <input 
                v-model="formData.name"
                type="text"
                required
                placeholder="請輸入單位名稱"
              >
            </div>
            <div class="form-group">
              <label>分類</label>
              <input 
                v-model="formData.category"
                type="text"
                required
                placeholder="請輸入分類"
              >
            </div>
            <div class="form-group">
              <label>服務區域</label>
              <input 
                v-model="formData.serviceArea"
                type="text"
                required
                placeholder="請輸入服務區域"
              >
            </div>
            <div class="form-group">
              <label>地址</label>
              <input 
                v-model="formData.address"
                type="text"
                required
                placeholder="請輸入地址"
              >
            </div>
            <div class="form-group">
              <label>聯絡電話</label>
              <input 
                v-model="formData.phone"
                type="tel"
                required
                placeholder="請輸入聯絡電話"
              >
            </div>
            <div class="form-group">
              <label>電子郵件</label>
              <input 
                v-model="formData.email"
                type="email"
                required
                placeholder="請輸入電子郵件"
              >
            </div>
            <div class="form-group">
              <label>網站</label>
              <input 
                v-model="formData.website"
                type="url"
                placeholder="請輸入網站網址（選填）"
              >
            </div>
            <div class="form-group">
              <label>詳細描述</label>
              <textarea 
                v-model="formData.description"
                required
                placeholder="請輸入詳細描述"
                rows="4"
              ></textarea>
            </div>
            <div class="form-group">
              <label>單位圖片 (限制 5MB 以內)</label>
              <input 
                type="file" 
                @change="handleUnitImageChange" 
                accept="image/jpeg,image/png,image/gif"
                :required="!isEditing"
              >
              <div v-if="unitImageError" class="error-message">
                {{ unitImageError }}
              </div>
              <img 
                v-if="unitImagePreview" 
                :src="unitImagePreview" 
                class="image-preview" 
                alt="單位圖片預覽"
              >
            </div>
            <div class="form-group">
              <label>價格圖片 (限制 5MB 以內)</label>
              <input 
                type="file" 
                @change="handlePriceImageChange" 
                accept="image/jpeg,image/png,image/gif"
              >
              <div v-if="priceImageError" class="error-message">
                {{ priceImageError }}
              </div>
              <img 
                v-if="priceImagePreview" 
                :src="priceImagePreview" 
                class="image-preview" 
                alt="價格圖片預覽"
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
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

definePageMeta({
  layout: 'admin'
});

const Swal = ref(null);
const editor = ref(null);
// 如果您有 API Key，請替換此處

const serviceUnits = ref({ data: [] });
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: null,
  name: '',
  category: '',
  region: '',
  serviceArea: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  website: '',
});
const unitImagePreview = ref('');
const priceImagePreview = ref('');
const unitImageError = ref('');
const priceImageError = ref('');
const selectedUnitImage = ref(null);
const selectedPriceImage = ref(null);
const isButtonLoading = ref(false);
const selectedRegion = ref('');
const isLoading = ref(false);
const isLoadingEdit = ref(false);
const editingId = ref(null);
const deletingId = ref(null);

// 拖拽相關的狀態
const isDragging = ref(false);
const draggedItem = ref(null);

// 新增的響應式變數
const activeTab = ref('service-unit');
const reminderContent = ref('');
const isReminderLoading = ref(false);

// 修改編輯器配置


// 篩選後的服務單位列表
const filteredServiceUnits = computed(() => {
  if (!selectedRegion.value) {
    return serviceUnits.value.data || [];
  }
  return (serviceUnits.value.data || []).filter(
    item => item.region === selectedRegion.value
  );
});

// 取得地區名稱
function getRegionName(region) {
  const regionMap = {
    'north': '北部',
    'central': '中部',
    'south': '南部',
    'east': '東部'
  };
  return regionMap[region] || region;
}

// 處理地區變更
async function handleRegionChange() {
  isLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    let url = '/api/service-unit';
    if (selectedRegion.value) {
      url += `?region=${selectedRegion.value}`;
    }

    const response = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    serviceUnits.value.data = response.data.map(item => ({
      ...item,
      isLoading: false
    }));
  } catch (error) {
    console.error('獲取服務單位列表失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '獲取服務單位列表失敗'
    });
  } finally {
    isLoading.value = false;
  }
}

// 開啟新增 Modal
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    id: null,
    name: '',
    category: '',
    region: '',
    serviceArea: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    website: '',
  };
  unitImagePreview.value = '';
  priceImagePreview.value = '';
  selectedUnitImage.value = null;
  selectedPriceImage.value = null;
  showModal.value = true;
}

// 開啟編輯 Modal
async function openEditModal(item) {
  try {
    isLoadingEdit.value = true;
    editingId.value = item.id;
    isEditing.value = true;
    
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch(`/api/service-unit/${item.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.success) {
      throw new Error(response.message || '獲取資料失敗');
    }

    const serviceUnit = response.data;

    formData.value = { 
      id: serviceUnit.id,
      name: serviceUnit.name,
      category: serviceUnit.category,
      region: serviceUnit.region,
      serviceArea: serviceUnit.serviceArea,
      address: serviceUnit.address,
      phone: serviceUnit.phone,
      email: serviceUnit.email,
      description: serviceUnit.description,
      website: serviceUnit.website || '',
    };
    
    // 使用新的函數生成圖片 URL
    if (serviceUnit.unitImage) {
      unitImagePreview.value = generateImageUrl(serviceUnit.id, 'unit-image');
    } else {
      unitImagePreview.value = '';
    }
    
    if (serviceUnit.priceImage) {
      priceImagePreview.value = generateImageUrl(serviceUnit.id, 'price-image');
    } else {
      priceImagePreview.value = '';
    }
    
    showModal.value = true;
  } catch (error) {
    console.error('獲取服務單位資料失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: error.message || '獲取服務單位資料失敗'
    });
  } finally {
    isLoadingEdit.value = false;
    editingId.value = null;
  }
}

// 關閉 Modal
function closeModal() {
  showModal.value = false;
  formData.value = {
    id: null,
    name: '',
    category: '',
    region: '',
    serviceArea: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    website: '',
  };
  unitImagePreview.value = '';
  priceImagePreview.value = '';
  selectedUnitImage.value = null;
  selectedPriceImage.value = null;
  unitImageError.value = '';
  priceImageError.value = '';
}

// 處理單位圖片變更
function handleUnitImageChange(event) {
  const file = event.target.files[0];
  if (!file) {
    unitImagePreview.value = '';
    selectedUnitImage.value = null;
    unitImageError.value = '';
    return;
  }

  // 檢查檔案大小
  if (file.size > 5 * 1024 * 1024) {
    unitImageError.value = '圖片大小不能超過 5MB';
    event.target.value = '';
    return;
  }

  // 檢查檔案類型
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    unitImageError.value = '只能上傳 JPG、PNG 或 GIF 格式的圖片';
    event.target.value = '';
    return;
  }

  selectedUnitImage.value = file;
  unitImageError.value = '';

  // 預覽圖片
  const reader = new FileReader();
  reader.onload = e => {
    unitImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 處理價格圖片變更
function handlePriceImageChange(event) {
  const file = event.target.files[0];
  if (!file) {
    priceImagePreview.value = '';
    selectedPriceImage.value = null;
    priceImageError.value = '';
    return;
  }

  // 檢查檔案大小
  if (file.size > 5 * 1024 * 1024) {
    priceImageError.value = '圖片大小不能超過 5MB';
    event.target.value = '';
    return;
  }

  // 檢查檔案類型
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    priceImageError.value = '只能上傳 JPG、PNG 或 GIF 格式的圖片';
    event.target.value = '';
    return;
  }

  selectedPriceImage.value = file;
  priceImageError.value = '';

  // 預覽圖片
  const reader = new FileReader();
  reader.onload = e => {
    priceImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 處理表單提交
async function handleSubmit() {
  if (unitImageError.value || priceImageError.value) return;

  isButtonLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.value.name);
    formDataToSend.append('category', formData.value.category);
    formDataToSend.append('region', formData.value.region);
    formDataToSend.append('serviceArea', formData.value.serviceArea);
    formDataToSend.append('address', formData.value.address);
    formDataToSend.append('phone', formData.value.phone);
    formDataToSend.append('email', formData.value.email);
    formDataToSend.append('description', formData.value.description);
    formDataToSend.append('website', formData.value.website || '');

    if (selectedUnitImage.value) {
      formDataToSend.append('unitImage', selectedUnitImage.value);
    }
    if (selectedPriceImage.value) {
      formDataToSend.append('priceImage', selectedPriceImage.value);
    }

    const url = isEditing.value 
      ? `/api/service-unit/${formData.value.id}`
      : '/api/service-unit';

    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await $fetch(url, {
      method,
      body: formDataToSend,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // 更新成功後，重新載入列表並更新圖片預覽
    await handleRegionChange();

    // 如果是編輯模式，更新圖片預覽
    if (isEditing.value && response.success) {
      if (selectedUnitImage.value) {
        unitImagePreview.value = generateImageUrl(formData.value.id, 'unit-image');
      }
      if (selectedPriceImage.value) {
        priceImagePreview.value = generateImageUrl(formData.value.id, 'price-image');
      }
    }

    closeModal();
    
    Swal.value.fire({
      icon: 'success',
      title: '成功',
      text: isEditing.value ? '更新成功' : '新增成功'
    });
  } catch (error) {
    console.error('提交失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '提交失敗'
    });
  } finally {
    isButtonLoading.value = false;
  }
}

// 處理刪除
async function handleDelete(id) {
  try {
    const result = await Swal.value.fire({
      title: '確定要刪除嗎？',
      text: '此操作無法復原',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    });

    if (result.isConfirmed) {
      deletingId.value = id;
      const token = useCookie('auth_token').value;
      if (!token) {
        throw new Error('未登入');
      }

      await $fetch(`/api/service-unit/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await handleRegionChange();
      
      Swal.value.fire({
        icon: 'success',
        title: '成功',
        text: '刪除成功'
      });
    }
  } catch (error) {
    console.error('刪除失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '刪除失敗'
    });
  } finally {
    deletingId.value = null;
  }
}

// 處理拖拽開始
function handleDragStart(event, item) {
  isDragging.value = true;
  draggedItem.value = item;
  event.dataTransfer.effectAllowed = 'move';
}

// 處理放置
async function handleDrop(event, targetItem) {
  event.preventDefault();
  isDragging.value = false;

  if (!draggedItem.value || draggedItem.value.id === targetItem.id) {
    return;
  }

  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    await $fetch(`/api/service-unit/order`, {
      method: 'PUT',
      body: {
        id: draggedItem.value.id,
        targetId: targetItem.id,
        region: targetItem.region
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    await handleRegionChange();
  } catch (error) {
    console.error('更新順序失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '更新順序失敗'
    });
  }
}

// 新增 arrayBufferToBase64 函數
function arrayBufferToBase64(buffer) {
  if (!buffer) return '';
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// 在 script setup 中添加生成圖片 URL 的函數
function generateImageUrl(id, type) {
  const timestamp = new Date().getTime();
  return `/api/service-unit/${id}/${type}?t=${timestamp}`;
}

// 載入叮嚀內容
async function loadReminder() {
  try {
    const { data } = await useFetch('/api/user-reminder', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    });

    if (data.value?.data) {
      reminderContent.value = data.value.data.content || '';
      if (editor.value) {
        editor.value.commands.setContent(reminderContent.value)
      }
    }
  } catch (error) {
    console.error('獲取叮嚀內容失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '獲取叮嚀內容失敗'
    });
  }
}

// 儲存叮嚀內容
async function saveReminder() {
  isReminderLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch(`/api/user-reminder`, {
      method: 'POST',
      body: {
        content: reminderContent.value
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    if (response.success) {
      Swal.value.fire({
        icon: 'success',
        title: '成功',
        text: '儲存成功'
      });
    }
  } catch (error) {
    console.error('儲存失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '儲存失敗'
    });
  } finally {
    isReminderLoading.value = false;
  }
}

// 修改 onMounted
onMounted(async () => {
  try {
    Swal.value = (await import('sweetalert2')).default;
    editor.value = new Editor({
      content: reminderContent.value,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: '請輸入內容或HTML',
        })
      ],
      onUpdate: ({ editor }) => {
        reminderContent.value = editor.getHTML()
      },
    })
    await handleRegionChange();
    await loadReminder();
  } catch (error) {
    console.error('初始化失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '初始化失敗'
    });
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style lang="scss" scoped>

.editor-wrapper {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  background: #fff;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  transition: border-color 0.3s ease;
}

.editor-wrapper:focus-within {
  border-color: #41BBBE;
}

.editor-content {
  min-height: 300px;
  line-height: 1.8;
  font-size: 1rem;
  color: #333;
}

.editor-content p {
  margin: 0 0 1rem;
}

.editor-content ul, .editor-content ol {
  padding-left: 1.5rem;
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
        border-color: #41BBBE;
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
    color: #41BBBE;
  }
  
  &.active {
    color: #41BBBE;
    font-weight: 600;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #41BBBE;
    }
  }
}

.tab-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 2rem;
}

.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 14px;
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
        color: #41BBBE;
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