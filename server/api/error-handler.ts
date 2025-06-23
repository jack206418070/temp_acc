import { createError } from 'h3'

export default async function errorHandler(error: any, event: any) {
  // 檢查是否為靜態資源的 404 錯誤
  const path = event.node.req.url || ''
  const isStaticResource = /\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|avif|webp|pdf|doc|docx)$/i.test(path) ||
                          path.startsWith('/images/') || 
                          path.startsWith('/assets/') || 
                          path.startsWith('/uploads/')

  if (isStaticResource && (error.statusCode === 404 || error.statusCode === 500)) {
    console.log(`📁 Static resource not found, redirecting to /notfound: ${path}`)
    
    // 對於靜態資源，返回 404 而不重定向（避免無限循環）
    throw createError({
      statusCode: 404,
      statusMessage: '檔案不存在'
    })
  }

  // 記錄錯誤（僅在伺服器端）
  if (process.server) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      statusCode: error.statusCode || 500,
      message: error.message || 'Unknown error',
      path: event.node.req.url,
      method: event.node.req.method,
      userAgent: event.node.req.headers['user-agent'] || 'Unknown',
      ip: event.node.req.headers['x-forwarded-for'] || 
          event.node.req.headers['x-real-ip'] || 
          event.node.req.connection.remoteAddress || 'Unknown',
      referer: event.node.req.headers.referer || 'None'
    }
    
    // 僅在開發環境顯示完整錯誤
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error details:', error)
    } else {
      // 生產環境僅記錄必要資訊
      console.error('Error occurred:', errorLog)
    }
  }

  // 安全的錯誤回應
  const statusCode = error.statusCode || 500
  const safeStatusCodes = [400, 401, 403, 404, 405, 500, 503]
  const finalStatusCode = safeStatusCodes.includes(statusCode) ? statusCode : 500

  const safeMessages: Record<number, string> = {
    400: '請求錯誤',
    401: '未授權訪問',
    403: '禁止訪問',
    404: '頁面不存在',
    405: '方法不允許',
    500: '伺服器錯誤',
    503: '服務暫時不可用'
  }

  // 檢查是否為疑似攻擊的請求
  const suspiciousPatterns = [
    /\.\.\//, // 路徑遍歷
    /<script/i, // XSS攻擊
    /union.*select/i, // SQL注入
    /javascript:/i, // JavaScript協議
    /vbscript:/i, // VBScript協議
    /on\w+\s*=/i, // 事件處理器
    /zero\.webappsecurity\.com/i, // 惡意測試域名
    /webappsecurity\.com/i, // 惡意測試域名
    /testphp\.vulnweb\.com/i, // 惡意測試域名
  ]

  // 對於非靜態資源才檢查 URL 編碼
  if (!isStaticResource) {
    suspiciousPatterns.push(/%[0-9a-fA-F]{2}/) // URL編碼
  }

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(path))

  if (isSuspicious) {
    // 對於疑似攻擊的請求返回通用錯誤
    throw createError({
      statusCode: 404,
      statusMessage: safeMessages[404]
    })
  }

  // 返回安全的錯誤訊息
  throw createError({
    statusCode: finalStatusCode,
    statusMessage: safeMessages[finalStatusCode] || '發生錯誤'
  })
} 