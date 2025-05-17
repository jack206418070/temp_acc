export default defineNuxtRouteMiddleware(async (to) => {
  // 如果是登入頁面，不需要驗證
  if (to.path === '/admin/login') {
    // 如果已登入且訪問登入頁，重定向到後台首頁
    console.log('auth.global.js');
    const token = useCookie('auth_token').value;
    if (token) {
      try {
        const response = await $fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.valid) {
          return navigateTo('/admin/dashboard');
        }
      } catch (error) {
        console.error('Token 驗證失敗:', error);
      }
    }
    return; // 未登入時允許訪問登入頁
  }

  // 如果是要訪問 admin 路徑
  if (to.path.startsWith('/admin')) {
    console.log('admin');
    const token = useCookie('auth_token').value;
    console.log('token:', token);
    if (!token) {
      console.log('沒有 token，重定向到登入頁面');
      return navigateTo('/admin/login');
    }

    try {
      const response = await $fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.valid) {
        console.log('token 無效，重定向到登入頁面');
        return navigateTo('/admin/login');
      }
    } catch (error) {
      console.error('驗證失敗:', error);
      return navigateTo('/admin/login');
    }
  }
}); 