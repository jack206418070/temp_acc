<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <div class="nav-content">
        <h1>問答管理</h1>
        <div class="nav-right">
          <NuxtLink to="/admin" class="btn btn-secondary">返回首頁</NuxtLink>
        </div>
      </div>
    </nav>

    <div class="admin-container">
      <div class="action-bar">
        <button @click="openAddModal" class="btn btn-primary">
          <i class="fas fa-plus"></i> 新增問答
        </button>
      </div>

      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>問題</th>
              <th>答案</th>
              <th>類別</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="qa in qaList.data" :key="qa.id">
              <td>{{ qa.id }}</td>
              <td>{{ qa.question }}</td>
              <td>{{ qa.answer }}</td>
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
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ isEditing ? '編輯問答' : '新增問答' }}</h2>
          <form @submit.prevent="handleSubmit" class="admin-form">
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
              ></textarea>
            </div>
            <div class="form-group">
              <label>類別</label>
              <input 
                v-model="formData.category" 
                type="text" 
                required
                placeholder="請輸入類別"
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
const qaList = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: null,
  question: '',
  answer: '',
  category: ''
});

// 獲取 QA 列表
async function fetchQAList() {
  try {
    const response = await $fetch('/api/qa', {
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    qaList.value = response;
  } catch (error) {
    console.error('獲取 QA 列表失敗:', error);
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
  } catch (error) {
    console.error('保存失敗:', error);
    alert(error?.data?.statusMessage || '操作失敗');
  }
}

// 處理刪除
async function handleDelete(id) {
  if (!confirm('確定要刪除這個問答嗎？')) return;
  
  try {
    await $fetch(`/api/qa/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('auth_token').value}`
      }
    });
    await fetchQAList();
  } catch (error) {
    console.error('刪除失敗:', error);
  }
}

// 頁面載入時獲取數據
onMounted(() => {
  fetchQAList();
});
</script>

<style lang="scss" scoped>
.action-bar {
  margin-bottom: 2rem;
}

.table-responsive {
  overflow-x: auto;
}

.category-tag {
  background-color: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  
  .btn {
    padding: 0.5rem 1rem;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style> 