export default defineEventHandler((event) => {
  // 清除 auth cookie
  deleteCookie(event, 'auth_token', {
    httpOnly: true,
    path: '/'
  });

  return {
    success: true,
    message: '登出成功'
  };
}); 