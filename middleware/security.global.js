// 全域安全中間件
export default defineNuxtRouteMiddleware((to, from) => {
  // 檢查可疑的URL模式
  const suspiciousPatterns = [
    // URL編碼攻擊 (但排除靜態資源的正常編碼)
    /%[0-9a-fA-F]{2}%[0-9a-fA-F]{2}%[0-9a-fA-F]{2}/, // 連續的URL編碼
    // 路徑遍歷攻擊
    /\.\.\//, // 相對路徑
    /\.\.\\/, // Windows路徑
    // 腳本注入
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    // 協議攻擊
    /javascript:/i,
    /vbscript:/i,
    /data:/i,
    /file:/i,
    /ftp:/i,
    // SQL注入嘗試
    /union.*select/i,
    /drop.*table/i,
    /insert.*into/i,
    /delete.*from/i,
    // Dynamic Code Evaluation 攻擊
    /eval\s*\(/i,
    /function\s*\(/i,
    /new\s+function/i,
    /setTimeout\s*\(/i,
    /setInterval\s*\(/i,
    // XMLHttpRequest 相關攻擊
    /XMLHttpRequest/i,
    /xhr/i,
    /fetch\s*\(/i,
    /ajax/i,
    // 惡意網域/URL 模式
    /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i,
    /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\//,
    // IP 地址模式
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
    // XSS 攻擊
    /on\w+\s*=/i,
    /expression\s*\(/i,
    // 常見攻擊字符
    /[<>'"&]/,
    // Base64 編碼的長字符串
    /^[A-Za-z0-9+/=]{50,}$/,
    // 過長的路徑（可能是緩衝區溢出攻擊）
    /.{1000,}/
  ]

  const path = to.path
  const query = to.fullPath

  // 對於靜態資源，放寬檢查條件
  const isStaticResource = path.startsWith('/images/') || 
                           path.startsWith('/assets/') || 
                           path.startsWith('/public/') ||
                           path.startsWith('/uploads/') ||
                           /\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|avif|webp)$/i.test(path);

  // 檢查路徑和查詢參數是否包含可疑模式
  let isSuspicious;
  
  if (isStaticResource) {
    // 靜態資源只檢查嚴重的安全威脅
    const staticSuspiciousPatterns = [
      // 路徑遍歷攻擊
      /\.\.\//, 
      /\.\.\\/, 
      // 腳本注入
      /<script/i,
      /<iframe/i,
      // 協議攻擊
      /javascript:/i,
      /vbscript:/i,
      // 空字節攻擊
      /%00/,
      // 系統檔案
      /\/etc\/passwd/i,
      /\/proc\//i,
      // 過長的路徑（可能是緩衝區溢出攻擊）
      /.{1000,}/
    ];
    
    isSuspicious = staticSuspiciousPatterns.some(pattern => 
      pattern.test(path) || pattern.test(query)
    );
  } else {
    // 非靜態資源使用完整的檢查
    isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(path) || pattern.test(query)
    );
  }

  if (isSuspicious) {
    // 記錄可疑請求（僅在伺服器端）
    if (process.server) {
      const headers = useRequestHeaders();
      console.warn('Suspicious request detected:', {
        timestamp: new Date().toISOString(),
        path: path,
        fullPath: query,
        userAgent: headers['user-agent'] || 'Unknown',
        referer: headers.referer || 'None'
      })
    }

    // 重定向到 notfound 而不是拋出錯誤
    return navigateTo('/notfound', { replace: true });
  }

  // 檢查路徑長度，防止過長的URL攻擊
  if (path.length > 500) {
    return navigateTo('/notfound', { replace: true });
  }

  // 檢查是否嘗試訪問敏感路徑
  const sensitivePatterns = [
    /^\/\./, // 隱藏文件
    /\/admin(?!\/)/i, // 管理後台（但允許 /admin/ 開頭的正常路由）
    /\/config/i,
    /\/\.env/i,
    /\/backup/i,
    /\/database/i,
    /\/logs/i,
    /\/tmp/i,
    /\/cache/i,
    /server\.js/i,
    /package\.json/i,
    /\.git/i
  ]

  const isSensitive = sensitivePatterns.some(pattern => pattern.test(path))

  if (isSensitive && !path.startsWith('/admin/')) {
    // 對於敏感路徑訪問，記錄並重定向到 notfound
    if (process.server) {
      const headers = useRequestHeaders();
      console.warn('Sensitive path access attempt:', {
        timestamp: new Date().toISOString(),
        path: path,
        userAgent: headers['user-agent'] || 'Unknown',
        referer: headers.referer || 'None'
      })
    }

    return navigateTo('/notfound', { replace: true });
  }
}) 