<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <NuxtLink to="/admin/dashboard" class="btn btn-secondary">返回首頁</NuxtLink>
          <h1 class="page-title">問答管理</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <!-- 操作列 -->
      <div class="action-bar">
        <div class="filter-section">
          <select v-model="selectedCategory" @change="handleCategoryChange" class="filter-select">
            <option value="">全部類別</option>
            <option 
              v-for="category in formattedCategories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.displayName }}
            </option>
          </select>
          <select v-model="selectedLanguage" @change="handleLanguageChange" class="filter-select">
            <option value="">全部語言</option>
            <option v-for="language in languages" :key="language.id" :value="language.id">
              {{ language.name }}
            </option>
          </select>
        </div>
        <div class="button-group">
          <button @click="openCategoryModal" class="btn btn-secondary" :disabled="isButtonLoading">
            <i class="fas fa-tags"></i> 管理類別
          </button>
          <button @click="openAddModal" class="btn btn-primary" :disabled="isButtonLoading">
            <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-plus'"></i>
            {{ isButtonLoading ? '處理中...' : '新增問答' }}
          </button>
        </div>
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
              <th width="10%">語言</th>
              <th width="25%">問題</th>
              <th width="30%">答案</th>
              <th width="15%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredQAContents" 
                :key="item.id"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover.prevent
                @dragenter.prevent
                @drop="handleDrop($event, item)"
                :class="{ 'opacity-50': isDragging && draggedItem?.id === item.id }">
              <td>{{ item.id }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.language_name }}</td>
              <td>{{ item.question }}</td>
              <td>{{ truncateText(item.answer, 100) }}</td>
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

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯問答' : '新增問答' }}</h2>
          <form @submit.prevent="handleSubmit" class="admin-form">
            <div class="form-group">
              <label>類別</label>
              <select v-model="formData.category_id" required>
                <option value="">請選擇類別</option>
                <option v-for="category in availableCategories" :key="category.id" :value="category.id">
                  {{ getCategoryFullName(category) }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>語言</label>
              <select v-model="formData.language_id" required>
                <option value="">請選擇語言</option>
                <option v-for="language in languages" :key="language.id" :value="language.id">
                  {{ language.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>問題</label>
              <input 
                v-model="formData.question"
                type="text"
                required
                placeholder="請輸入問題"
              >
            </div>
            <div class="form-group">
              <label>答案</label>
              <textarea 
                v-model="formData.answer"
                required
                placeholder="請輸入答案"
                rows="4"
              ></textarea>
            </div>
            <div class="form-group">
              <label>排序</label>
              <input 
                v-model="formData.sort_order"
                type="number"
                placeholder="請輸入排序（選填）"
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

    <!-- 類別管理 Modal -->
    <Teleport to="body">
      <div v-if="showCategoryModal" class="modal-overlay" @click.self="closeCategoryModal">
        <div class="modal-content category-modal">
          <div class="modal-header">
            <h2>類別管理</h2>
            <button @click="closeCategoryModal" class="btn-close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <!-- 新增/編輯類別表單 -->
            <form @submit.prevent="handleCategorySubmit" class="category-form">
              <div class="form-group">
                <label>類別層級</label>
                <div class="category-type-selector">
                  <button 
                    type="button"
                    :class="['type-btn', { active: !showParentSelect }]"
                    @click="setCategoryType('main')"
                  >
                    <div class="btn-content">
                      <i class="fas fa-layer-group"></i>
                      <span>主分類</span>
                    </div>
                    <div class="btn-indicator"></div>
                  </button>
                  <button 
                    type="button"
                    :class="['type-btn', { active: showParentSelect }]"
                    @click="setCategoryType('sub')"
                  >
                    <div class="btn-content">
                      <i class="fas fa-stream"></i>
                      <span>子分類</span>
                    </div>
                    <div class="btn-indicator"></div>
                  </button>
                </div>
              </div>

              <div class="form-group" v-if="categoryFormData.parent_id || (!isEditingCategory && showParentSelect)">
                <label>選擇主分類</label>
                <select v-model="categoryFormData.parent_id" :required="showParentSelect">
                  <option value="">請選擇主分類</option>
                  <option v-for="category in mainCategories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label>類別名稱</label>
                <input 
                  v-model="categoryFormData.name"
                  type="text"
                  required
                  placeholder="請輸入類別名稱"
                >
              </div>

              <!-- 只在子分類時顯示多語言設定 -->
              <template v-if="showParentSelect">
                <div class="form-group">
                  <label>英文名稱 (English Name)</label>
                  <input 
                    v-model="categoryFormData.name_en"
                    type="text"
                    placeholder="Please enter English name"
                  >
                </div>

                <div class="form-group">
                  <label>越南文名稱 (Tên Tiếng Việt)</label>
                  <input 
                    v-model="categoryFormData.name_vi"
                    type="text"
                    placeholder="Vui lòng nhập tên bằng tiếng Việt"
                  >
                </div>

                <div class="form-group">
                  <label>印尼文名稱 (Nama Bahasa Indonesia)</label>
                  <input 
                    v-model="categoryFormData.name_id"
                    type="text"
                    placeholder="Silakan masukkan nama dalam bahasa Indonesia"
                  >
                </div>

                <div class="form-group">
                  <label>泰文名稱 (ชื่อภาษาไทย)</label>
                  <input 
                    v-model="categoryFormData.name_th"
                    type="text"
                    placeholder="กรุณาใส่ชื่อเป็นภาษาไทย"
                  >
                </div>
              </template>

              <div class="button-group">
                <button type="submit" class="btn btn-primary" :disabled="isButtonLoading">
                  <i class="fas" :class="isButtonLoading ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                  {{ isButtonLoading ? '處理中...' : (isEditingCategory ? '更新' : '新增') }}
                </button>
                <button v-if="isEditingCategory" type="button" @click="resetCategoryForm" class="btn btn-secondary">
                  取消編輯
                </button>
              </div>
            </form>

            <!-- 類別列表 -->
            <div class="category-lists mt-4">
              <h3>類別列表</h3>
              <div class="category-tree">
                <!-- 主分類 -->
                <div v-for="category in mainCategories" :key="category.id" class="tree-item">
                  <div class="category-item main-category" @click="toggleCategory(category.id)">
                    <div class="category-info">
                      <i class="fas" :class="expandedCategories.includes(category.id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                      <span class="category-name">{{ category.name }}</span>
                      <span class="sub-count" v-if="getSubCategories(category.id).length">
                        ({{ getSubCategories(category.id).length }})
                      </span>
                    </div>
                    <div class="category-actions" @click.stop>
                      <button @click="editCategory(category)" class="btn btn-sm btn-primary">
                        <span>編輯</span>
                      </button>
                      <button @click="handleCategoryDelete(category)" class="btn btn-sm btn-danger">
                        <span>刪除</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- 子分類 -->
                  <div class="sub-categories" v-if="getSubCategories(category.id).length && expandedCategories.includes(category.id)">
                    <div v-for="subCategory in getSubCategories(category.id)" 
                         :key="subCategory.id" 
                         class="category-item sub-category">
                      <div class="category-info">
                        <span class="category-name">{{ subCategory.name }}</span>
                      </div>
                      <div class="category-actions">
                        <button @click="editCategory(subCategory)" class="btn btn-sm btn-primary">
                          <span>編輯</span>
                        </button>
                        <button @click="handleCategoryDelete(subCategory)" class="btn btn-sm btn-danger">
                          <span>刪除</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

definePageMeta({
  layout: 'admin'
});

const Swal = ref(null);

const qaContents = ref({ data: [] });
const categories = ref([]);
const languages = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: null,
  category_id: '',
  language_id: '',
  question: '',
  answer: '',
  sort_order: 0
});

const isButtonLoading = ref(false);
const selectedCategory = ref('');
const selectedLanguage = ref('');
const isLoading = ref(false);
const isLoadingEdit = ref(false);
const editingId = ref(null);
const deletingId = ref(null);

// 拖拽相關的狀態
const isDragging = ref(false);
const draggedItem = ref(null);

// 類別管理相關
const showCategoryModal = ref(false);
const isEditingCategory = ref(false);
const isCategorySaving = ref(false);
const categoryFormData = ref({
  id: null,
  name: '',
  parent_id: '',
  name_en: '',
  name_vi: '',
  name_id: '',
  name_th: ''
});

// 新增狀態
const showParentSelect = ref(false);

// 新增收合功能相關的狀態
const expandedCategories = ref([]);

// 主分類列表
const mainCategories = computed(() => {
  return categories.value.filter(category => !category.parent_id);
});

// 子分類列表（用於 QA 內容的類別選擇）
const subCategories = computed(() => {
  return categories.value.filter(category => category.parent_id);
});

// 設置類別類型
function setCategoryType(type) {
  if (type === 'main') {
    categoryFormData.value.parent_id = '';
    showParentSelect.value = false;
  } else {
    showParentSelect.value = true;
  }
}

// 重置類別表單
function resetCategoryForm() {
  categoryFormData.value = {
    id: null,
    name: '',
    parent_id: '',
    name_en: '',
    name_vi: '',
    name_id: '',
    name_th: ''
  };
  showParentSelect.value = false;
  isEditingCategory.value = false;
}

// 修改 QA 表單中的類別選擇
const availableCategories = computed(() => {
  return categories.value.filter(category => category.parent_id);
});

// 獲取完整的類別名稱（包含主分類）
function getCategoryFullName(category) {
  const parentCategory = categories.value.find(c => c.id === category.parent_id);
  return parentCategory ? `${parentCategory.name} > ${category.name}` : category.name;
}

// 修改 computed 屬性，重新組織類別選單的顯示
const formattedCategories = computed(() => {
  const result = [];
  // 先取得所有主分類
  const mainCategories = categories.value.filter(cat => !cat.parent_id);
  
  // 對每個主分類進行處理
  mainCategories.forEach(mainCat => {
    // 添加主分類
    result.push({
      id: mainCat.id,
      name: mainCat.name,
      displayName: mainCat.name
    });
    
    // 找出並添加該主分類的所有子分類
    const subCategories = categories.value.filter(cat => cat.parent_id === mainCat.id);
    subCategories.forEach(subCat => {
      result.push({
        id: subCat.id,
        name: `${mainCat.name}-${subCat.name}`,
        displayName: `　${subCat.name}` // 使用全形空格來做縮排
      });
    });
  });
  
  return result;
});

// 修改篩選邏輯
const filteredQAContents = computed(() => {
  let filtered = qaContents.value.data || [];
  
  // 如果有選擇類別，進行類別篩選
  if (selectedCategory.value) {
    const selectedCategoryId = selectedCategory.value;
    // 檢查選擇的是否為父分類
    const isParentCategory = categories.value.find(
      cat => cat.id === selectedCategoryId && !cat.parent_id
    );

    if (isParentCategory) {
      // 如果是父分類，找出所有子分類的 ID
      const subCategoryIds = categories.value
        .filter(cat => cat.parent_id === selectedCategoryId)
        .map(cat => cat.id);
      
      // 篩選出父分類下所有子分類的問答內容
      filtered = filtered.filter(item => 
        subCategoryIds.includes(item.category_id)
      );
    } else {
      // 如果是子分類，直接篩選該分類的內容
      filtered = filtered.filter(item => 
        item.category_id === selectedCategoryId
      );
    }
  }
  
  // 如果有選擇語言，進行語言篩選
  if (selectedLanguage.value) {
    filtered = filtered.filter(item => item.language_id === selectedLanguage.value);
  }
  
  return filtered;
});

// 截斷文字
function truncateText(text, length) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// 處理類別變更
async function handleCategoryChange() {
  await fetchQAContents();
}

// 處理語言變更
async function handleLanguageChange() {
  await fetchQAContents();
}

// 獲取所有 QA 內容
async function fetchQAContents() {
  isLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const response = await $fetch('/api/qa-contents', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    qaContents.value.data = response.data.map(item => ({
      ...item,
      isLoading: false
    }));
  } catch (error) {
    console.error('獲取問答列表失敗', error);
    if (error.response?.status === 401) {
      router.push('/admin/login');
    }
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '獲取問答列表失敗'
    });
  } finally {
    isLoading.value = false;
  }
}

// 獲取所有類別
async function fetchCategories() {
  try {
    const response = await $fetch('/api/qa-categories', {
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    categories.value = response.data;
  } catch (error) {
    console.error('獲取類別列表失敗:', error);
  }
}

// 獲取所有語言
async function fetchLanguages() {
  try {
    const response = await $fetch('/api/languages');
    languages.value = response.data;
  } catch (error) {
    console.error('獲取語言列表失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '獲取語言列表失敗'
    });
  }
}

// 開啟新增 Modal
function openAddModal() {
  isEditing.value = false;
  formData.value = {
    id: null,
    category_id: '',
    language_id: '',
    question: '',
    answer: '',
    sort_order: 0
  };
  showModal.value = true;
}

// 開啟編輯 Modal
function openEditModal(item) {
  isEditing.value = true;
  formData.value = { ...item };
  showModal.value = true;
}

// 關閉 Modal
function closeModal() {
  showModal.value = false;
  formData.value = {
    id: null,
    category_id: '',
    language_id: '',
    question: '',
    answer: '',
    sort_order: 0
  };
}

// 處理表單提交
async function handleSubmit() {
  isButtonLoading.value = true;
  try {
    const token = useCookie('auth_token').value;
    if (!token) {
      throw new Error('未登入');
    }

    const url = isEditing.value 
      ? `/api/qa-contents/${formData.value.id}`
      : '/api/qa-contents';

    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await $fetch(url, {
      method,
      body: formData.value,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    await fetchQAContents();
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

      await $fetch(`/api/qa-contents/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await fetchQAContents();
      
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

    // 更新排序
    await $fetch(`/api/qa-contents/${draggedItem.value.id}`, {
      method: 'PUT',
      body: {
        ...draggedItem.value,
        sort_order: targetItem.sort_order
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    await fetchQAContents();
  } catch (error) {
    console.error('更新順序失敗', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '更新順序失敗'
    });
  }
}

// 打開類別管理 Modal
function openCategoryModal() {
  showCategoryModal.value = true;
}

// 關閉類別管理 Modal
function closeCategoryModal() {
  showCategoryModal.value = false;
  resetCategoryForm();
}

// 編輯類別
function editCategory(category) {
  isEditingCategory.value = true;
  categoryFormData.value = {
    id: category.id,
    name: category.name,
    parent_id: category.parent_id || '',
    name_en: category.name_en || '',
    name_vi: category.name_vi || '',
    name_id: category.name_id || '',
    name_th: category.name_th || ''
  };
  showParentSelect.value = !!category.parent_id;
}

// 處理類別表單提交
async function handleCategorySubmit() {
  try {
    isCategorySaving.value = true;
    const url = isEditingCategory.value 
      ? `/api/qa-categories/${categoryFormData.value.id}`
      : '/api/qa-categories';
    const method = isEditingCategory.value ? 'PUT' : 'POST';
    
    // 準備要發送的資料
    const formData = {
      name: categoryFormData.value.name,
      parent_id: categoryFormData.value.parent_id || null,
      name_en: categoryFormData.value.name_en,
      name_vi: categoryFormData.value.name_vi,
      name_id: categoryFormData.value.name_id,
      name_th: categoryFormData.value.name_th
    };
    
    await $fetch(url, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });

    // 重新獲取類別列表
    await fetchCategories();
    resetCategoryForm();

    // 顯示成功提示
    await Swal.value.fire({
      icon: 'success',
      title: `類別${isEditingCategory.value ? '更新' : '新增'}成功！`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  } catch (error) {
    console.error('類別操作失敗:', error);
    await Swal.value.fire({
      icon: 'error',
      title: `類別${isEditingCategory.value ? '更新' : '新增'}失敗`,
      text: error?.data?.statusMessage || '發生未知錯誤',
      confirmButtonText: '確定'
    });
  } finally {
    isCategorySaving.value = false;
  }
}

// 處理類別刪除
async function handleCategoryDelete(categoryId) {
  try {
    const result = await Swal.value.fire({
      title: '確定要刪除此類別嗎？',
      text: '此操作無法復原',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#dc3545'
    });

    if (result.isConfirmed) {
      const token = useCookie('auth_token').value;
      if (!token) {
        throw new Error('未登入');
      }

      // 顯示刪除中的提示
      Swal.value.fire({
        title: '刪除中...',
        html: '正在刪除類別和相關問答內容',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.value.showLoading();
        }
      });

      // 刪除類別
      const response = await $fetch(`/api/qa-categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 重新獲取類別列表和問答內容
      await Promise.all([
        fetchCategories(),
        fetchQAContents()
      ]);

      Swal.value.fire({
        icon: 'success',
        title: '刪除成功',
        html: `
          <div style="text-align: left">
            <p>已成功刪除：</p>
            <ul style="list-style-type: disc; margin-left: 1.5rem;">
              <li>主類別：${response.name}</li>
              ${response.hasSubCategories ? `<li>${response.deletedCategories - 1} 個子類別</li>` : ''}
              <li>所有相關的問答內容</li>
            </ul>
          </div>
        `
      });
    }
  } catch (error) {
    console.error('刪除類別失敗:', error);
    Swal.value.fire({
      icon: 'error',
      title: '錯誤',
      text: '刪除類別失敗'
    });
  }
}

// 獲取指定主分類的所有子分類
function getSubCategories(parentId) {
  return categories.value.filter(category => category.parent_id === parentId);
}

// 計算類別層級
const categoriesWithHierarchy = computed(() => {
  const result = [];
  const addCategoryWithLevel = (categoryId, level = 0) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      result.push({ ...category, level });
      // 找出所有以此類別為父類別的子類別
      categories.value
        .filter(c => c.parent_id === category.id)
        .forEach(child => addCategoryWithLevel(child.id, level + 1));
    }
  };

  // 從沒有父類別的類別開始
  categories.value
    .filter(c => !c.parent_id)
    .forEach(rootCategory => addCategoryWithLevel(rootCategory.id));

  return result;
});

// 切換類別的展開/收合狀態
function toggleCategory(categoryId) {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
  } else {
    expandedCategories.value.push(categoryId);
  }
}

onMounted(async () => {
  try {
    Swal.value = (await import('sweetalert2')).default;
    await Promise.all([
      fetchQAContents(),
      fetchCategories(),
      fetchLanguages()
    ]);
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
    display: flex;
    gap: 1rem;
    
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
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  
  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #41BBBE;
    font-size: 22px;
  }
}

.admin-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 14px;
      color: #333;
    }
    
    input,
    select,
    textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background-color: #f8f9fa;
      color: #333;
      
      &::placeholder {
        color: #999;
      }
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
        box-shadow: 0 0 0 3px rgba(65, 187, 190, 0.1);
        background-color: #fff;
      }

      &:hover {
        border-color: #41BBBE;
      }
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;
    }
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  align-items: center;
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

.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 14px;
}

.category-modal {
  width: 95%;
  max-width: 700px;
  padding: 0;
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #eee;
    
    h2 {
      margin: 0;
      color: #41BBBE;
      font-size: 22px;
    }
    
    .btn-close {
      background: none;
      border: none;
      font-size: 20px;
      color: #666;
      cursor: pointer;
      padding: 0.5rem;
      transition: all 0.3s ease;
      
      &:hover {
        color: #333;
        transform: rotate(90deg);
      }
    }
  }
  
  .modal-body {
    padding: 2rem;
  }
}

.category-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  .form-group {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    label {
      font-size: 14px;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    input, select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background-color: white;
      
      &::placeholder {
        color: #999;
      }
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
        box-shadow: 0 0 0 3px rgba(65, 187, 190, 0.1);
      }
      
      &:hover {
        border-color: #41BBBE;
      }
      
      &.editing {
        border-color: #41BBBE;
        background-color: #f0fafa;
      }
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 2.5rem;
    }
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.category-divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #666;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
  }
  
  span {
    padding: 0 1rem;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
}

.category-lists {
  margin-top: 2rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
  }
}

.category-tree {
  padding: 0.5rem;
  
  .tree-item {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .category-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    background-color: white;
    margin-bottom: 8px;
    
    &.main-category {
      font-weight: 500;
      font-size: 0.95rem;
      color: #333;
      
      &:hover {
        background-color: #f8f9fa;
      }
      
      .fas {
        width: 16px;
        margin-right: 0.5rem;
        cursor: pointer;
      }
    }
    
    &.sub-category {
      font-size: 0.9rem;
      color: #666;
      margin-left: 2rem;
      position: relative;
      
      &::before {
        content: "-";
        position: absolute;
        left: -1rem;
        color: #999;
      }
    }
    
    .category-info {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      
      .category-name {
        margin-right: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .sub-count {
        font-size: 0.8rem;
        color: #999;
      }
    }
    
    .category-actions {
      display: flex;
      gap: 0.5rem;
      margin-left: auto;
      
      .btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
        min-width: 80px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s ease;
        color: white;
        
        i {
          margin: 0;
          font-size: 1rem;
        }

        span {
          font-weight: 500;
        }
        
        &.btn-primary {
          background-color: #41BBBE;
          border-color: #41BBBE;
          
          &:hover {
            background-color: #3aa7aa;
            border-color: #3aa7aa;
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }
        
        &.btn-danger {
          background-color: #dc3545;
          border-color: #dc3545;
          
          &:hover {
            background-color: #c82333;
            border-color: #bd2130;
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
  
  .sub-categories {
    margin-left: 2rem;
    position: relative;
    
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: #dee2e6;
    }
  }
}

.mt-4 {
  margin-top: 1.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.category-type-selector {
  display: flex;
  gap: 1rem;
  background: #f8f9fa;
  border-radius: 16px;
  padding: 0.75rem;
  
  .type-btn {
    flex: 1;
    position: relative;
    padding: 1.25rem;
    border: none;
    border-radius: 12px;
    background: white;
    color: #666;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    
    .btn-content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      
      i {
        font-size: 1.25rem;
        transition: all 0.3s ease;
      }
      
      span {
        font-size: 1rem;
        font-weight: 500;
      }
    }
    
    .btn-indicator {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      height: 3px;
      width: 80%;
      background: var(--primary-color);
      border-radius: 3px;
      transition: transform 0.3s ease;
    }
    
    &:hover {
      background: #f0fafa;
      
      .btn-content {
        i {
          transform: scale(1.1);
          color: var(--primary-color);
        }
        
        span {
          color: var(--primary-color);
        }
      }
      
      .btn-indicator {
        transform: translateX(-50%) scaleX(0.5);
      }
    }
    
    &.active {
      background: #e6f7f7;
      
      .btn-content {
        i, span {
          color: var(--primary-color);
        }
      }
      
      .btn-indicator {
        transform: translateX(-50%) scaleX(1);
      }
      
      &:hover {
        background: #e6f7f7;
        
        .btn-content {
          i {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}

.category-translations {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.translation-tag {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #495057;
}

.category-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  background-color: white;
  margin-bottom: 8px;
  
  &.main-category {
    font-weight: 500;
    font-size: 0.95rem;
    color: #333;
    
    &:hover {
      background-color: #f8f9fa;
    }
    
    .fas {
      width: 16px;
      margin-right: 0.5rem;
      cursor: pointer;
    }
  }
  
  &.sub-category {
    font-size: 0.9rem;
    color: #666;
    margin-left: 2rem;
    position: relative;
    
    &::before {
      content: "-";
      position: absolute;
      left: -1rem;
      color: #999;
    }
  }
  
  .category-info {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    
    .category-name {
      margin-right: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .sub-count {
      font-size: 0.8rem;
      color: #999;
    }
  }
  
  .category-actions {
    display: flex;
    gap: 0.5rem;
    margin-left: auto;
    
    .btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
      min-width: 80px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.3s ease;
      color: white;
      
      i {
        margin: 0;
        font-size: 1rem;
      }

      span {
        font-weight: 500;
      }
      
      &.btn-primary {
        background-color: #41BBBE;
        border-color: #41BBBE;
        
        &:hover {
          background-color: #3aa7aa;
          border-color: #3aa7aa;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
      
      &.btn-danger {
        background-color: #dc3545;
        border-color: #dc3545;
        
        &:hover {
          background-color: #c82333;
          border-color: #bd2130;
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

.subcategory-list {
  margin-left: 20px;
  padding-left: 12px;
  border-left: 2px solid #dee2e6;
}

.subcategory-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.category-actions {
  display: flex;
  gap: 8px;
}

.category-modal {
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #dee2e6;
}

.btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6c757d;
  
  &:hover {
    color: #343a40;
  }
}

.category-form {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #dee2e6;
}
</style> 