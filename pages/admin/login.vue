<template>
  <div>
    <nav class="admin-nav">
      <div class="nav-content">
        <div class="nav-wrapper">
          <div class="placeholder"></div>
          <h1 class="page-title">管理員登入</h1>
          <div class="placeholder"></div>
        </div>
      </div>
    </nav>

    <div class="admin-container qa-container">
      <div class="login-form-container">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>帳號</label>
            <input 
              v-model="username" 
              type="text" 
              required
              placeholder="請輸入帳號"
              :disabled="isLoading"
            >
          </div>
          <div class="form-group">
            <label>密碼</label>
            <input 
              v-model="password" 
              type="password" 
              required
              placeholder="請輸入密碼"
              :disabled="isLoading"
            >
          </div>
          <div class="button-group">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="button-loading"></span>
              登入
            </button>
          </div>
          
          <div class="back-link">
            <NuxtLink to="/">返回前台</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'admin'
});

const router = useRouter();
const username = ref('');
const password = ref('');
const isLoading = ref(false);

async function handleLogin() {
  isLoading.value = true;
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    });

    console.log('Login response:', response);

    if (response.success) {
      await navigateTo('/admin/dashboard');
    } else {
      throw new Error('未收到有效的登入令牌');
    }
  } catch (error) {
    console.error('登入失敗詳細資訊:', error);
    
    const errorMessage = error.data?.message || 
                        error.data?.statusMessage || 
                        error.message || 
                        '登入失敗，請檢查帳號密碼是否正確';
    
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.qa-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
  font-size: 14px;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  position: relative;

  .btn {
    font-size: 13px;
    padding: 0.4rem 0.8rem;
    
    i {
      margin-right: 0.3rem;
    }
  }
}

.page-title {
  font-size: 1.5rem;
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

.login-form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.login-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-size: 14px;
    }
    
    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: #41BBBE;
      }
      
      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
    }
  }
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  
  .btn {
    min-width: 120px;
    font-size: 14px;
    padding: 0.8rem 1.5rem;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.button-loading {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.back-link {
  text-align: center;
  margin-top: 1rem;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      color: #41BBBE;
      text-decoration: underline;
    }
  }
}
</style> 