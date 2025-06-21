import securityLogger from '../utils/security-logger.js'

export default defineEventHandler(async (event) => {
  // 簡單的健康檢查端點
  // 不要洩露過多系統資訊
  
  try {
    const healthInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      // 不要包含敏感資訊如版本號、系統詳情等
    }

    // 記錄健康檢查訪問（可用於監控）
    if (process.env.NODE_ENV === 'production') {
      console.log('Health check accessed:', {
        timestamp: healthInfo.timestamp,
        ip: getClientIP(event.node.req)
      })
    }

    return healthInfo
  } catch (error) {
    // 即使是健康檢查也要安全地處理錯誤
    securityLogger.logErrorActivity(error, event.node.req)
    
    throw createError({
      statusCode: 503,
      statusMessage: '服務暫時不可用'
    })
  }
})

function getClientIP(req) {
  return req.headers['x-forwarded-for'] ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         'Unknown'
} 