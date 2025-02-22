export default defineNuxtRouteMiddleware(async (to) => {
  // 如果是登入頁面，不需要驗證
  if (to.path === '/login') {
    return;
  }

  // 如果是要訪問 admin 路徑
  if (to.path.startsWith('/admin')) {
    // 使用 document.cookie 直接讀取
    const allCookies = useCookie('auth_token');
    console.log('所有 cookies:', allCookies);
    
    // 從 header 中獲取 token
    const token = process.client 
      ? document.cookie.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1]
      : allCookies.value;

    console.log('獲取到的 token:', token);
    
    if (!token) {
      console.log('沒有 token，重定向到登入頁面');
      return navigateTo('/login');
    }

    try {
      // 驗證 token 是否有效
      const response = await $fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('驗證響應:', response);

      if (!response.valid) {
        console.log('token 無效，重定向到登入頁面');
        return navigateTo('/login');
      }
    } catch (error) {
      console.error('驗證失敗:', error);
      return navigateTo('/login');
    }
  }
}); 