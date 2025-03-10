<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <div class="nav-content">
        <h1>後台管理系統</h1>
        <div class="nav-right">
          <span class="welcome-text">歡迎，{{ username }}</span>
          <button @click="handleLogout" class="btn btn-danger">登出</button>
        </div>
      </div>
    </nav>
    
    <div class="admin-container">
      <div class="dashboard-grid">
        <NuxtLink to="/admin/qa_setting" class="dashboard-card">
          <div class="card-icon">📝</div>
          <h3>問答管理</h3>
          <p>管理網站常見問題</p>
        </NuxtLink>
        <NuxtLink to="/admin/knowledge" class="dashboard-card">
          <div class="card-icon">📚</div>
          <h3>知識庫管理</h3>
          <p>管理知識庫圖片</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
});

const username = ref('');
const router = useRouter();

async function handleLogout() {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  } catch (error) {
    console.error('登出失敗', error);
  }
}

// 在頁面載入時獲取用戶信息
onMounted(async () => {
  try {
    const cookie = useCookie('auth_token');
    const response = await $fetch('/api/auth/verify', {
      headers: {
        Authorization: `Bearer ${cookie.value}`
      }
    });
    if (response.valid) {
      username.value = response.user.username;
    }
  } catch (error) {
    console.error('獲取用戶信息失敗', error);
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h1 {
      color: var(--primary-color);
      margin: 0;
      font-size: calc(1.5rem + 2px);
    }
  }
  
  .nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .welcome-text {
    color: var(--text-color);
  }
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.dashboard-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .card-icon {
    font-size: calc(2.5rem + 2px);
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin: 0;
  }
}
</style> 