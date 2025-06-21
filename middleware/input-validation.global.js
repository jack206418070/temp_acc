export default defineNuxtRouteMiddleware((to) => {
  // 跳過伺服器端渲染
  if (process.server) return;

  // 檢查查詢參數
  if (to.query && Object.keys(to.query).length > 0) {
    for (const [key, value] of Object.entries(to.query)) {
      // 檢查參數值是否包含惡意模式
      if (containsMaliciousPatterns(value)) {
        console.warn('🚨 Malicious query parameter detected:', { key, value, url: to.fullPath });
        
        // 重定向到 404 頁面
        return navigateTo('/notfound', { replace: true });
      }
    }
  }

  // 檢查路由參數
  if (to.params && Object.keys(to.params).length > 0) {
    for (const [key, value] of Object.entries(to.params)) {
      if (containsMaliciousPatterns(value)) {
        console.warn('🚨 Malicious route parameter detected:', { key, value, url: to.fullPath });
        
        // 重定向到 404 頁面
        return navigateTo('/notfound', { replace: true });
      }
    }
  }
});

// 檢測惡意模式的函數
function containsMaliciousPatterns(input) {
  if (!input) return false;
  
  const maliciousPatterns = [
    // URL schemes
    /^https?:\/\//i,
    /^ftp:\/\//i,
    /^file:\/\//i,
    /^javascript:/i,
    /^data:/i,
    /^vbscript:/i,
    
    // 網域名稱模式
    /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/,
    
    // IP 地址模式
    /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
    
    // 路徑遍歷
    /\.\./,
    /\/\//,
    
    // 腳本注入
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    
    // SQL 注入
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    
    // XSS 攻擊
    /on\w+\s*=/i,
    /javascript\s*:/i,
    /expression\s*\(/i,
    
    // 特殊字符組合 (基本檢測)
    /[<>'"]/,
    
    // Base64 編碼的惡意內容 (簡單檢測)
    /^[A-Za-z0-9+/=]{50,}$/
  ];

  const inputStr = String(input);
  return maliciousPatterns.some(pattern => pattern.test(inputStr));
} 