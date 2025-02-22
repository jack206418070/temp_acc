<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h1>管理員登入</h1>
        <p>歡迎回到管理系統</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>帳號</label>
          <input 
            v-model="username" 
            type="text" 
            placeholder="請輸入帳號"
            required
          >
        </div>
        <div class="form-group">
          <label>密碼</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="請輸入密碼"
            required
          >
        </div>
        <button 
          type="submit" 
          class="login-btn"
          :disabled="loading"
        >
          <span v-if="!loading">登入</span>
          <span v-else class="loading-spinner"></span>
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

async function handleLogin() {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });

    console.log('登入響應:', response);

    if (response.success) {
      console.log('登入成功，準備跳轉');
      await router.push('/admin');
    } else {
      error.value = '登入失敗';
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = err?.data?.statusMessage || '登入失敗';
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-light);
  padding: 1rem;
}

.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-color);
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
}

.login-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 500;
    }
    
    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
      }
    }
  }
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.error-message {
  margin-top: 1rem;
  color: var(--danger-color);
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 