import { 
  HTTP_SECURITY_CONFIG, 
  validateHttpRequest, 
  sanitizeHeaders, 
  logSuspiciousActivity 
} from '../api/security-config.js';

// HTTP Request Smuggling 防護中間件
export default defineEventHandler(async (event) => {
  // 只處理 API 路由
  if (!event.node.req.url?.startsWith('/api/')) {
    return;
  }

  const req = event.node.req;
  const res = event.node.res;

  // 獲取客戶端 IP
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.socket.remoteAddress || 'Unknown';

  try {
    // 1. 驗證請求是否安全
    const validation = validateHttpRequest(req);
    
    if (!validation.isValid) {
      // 記錄可疑活動
      logSuspiciousActivity(req, validation.errors, clientIP);
      
      // 拒絕不安全的請求
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request format'
      });
    }

    // 2. 清理和標準化標頭
    req.headers = sanitizeHeaders(req.headers);

    // 3. 設置安全響應標頭
    for (const [name, value] of Object.entries(HTTP_SECURITY_CONFIG.securityHeaders)) {
      res.setHeader(name, value);
    }

    // 4. 設置請求超時
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        res.statusCode = 408;
        res.end('Request Timeout');
      }
    }, HTTP_SECURITY_CONFIG.requestLimits.timeoutMs);

    // 清理超時計時器
    res.on('finish', () => clearTimeout(timeout));
    res.on('close', () => clearTimeout(timeout));

    // 5. 監控請求體大小（針對 POST/PUT 請求）
    if (['POST', 'PUT', 'PATCH'].includes(req.method?.toUpperCase())) {
      let bodySize = 0;
      const maxSize = HTTP_SECURITY_CONFIG.requestLimits.maxBodySize;

      // 監聽數據流
      req.on('data', (chunk) => {
        bodySize += chunk.length;
        if (bodySize > maxSize) {
          logSuspiciousActivity(req, ['Request body exceeds maximum size'], clientIP);
          throw createError({
            statusCode: 413,
            statusMessage: 'Request entity too large'
          });
        }
      });
    }

    // 6. 防止慢速攻擊
    const startTime = Date.now();
    req.on('end', () => {
      const duration = Date.now() - startTime;
      if (duration > HTTP_SECURITY_CONFIG.requestLimits.timeoutMs) {
        console.warn('Slow request detected:', {
          url: req.url,
          duration: duration,
          ip: clientIP
        });
      }
    });

  } catch (error) {
    // 確保錯誤響應也包含安全標頭
    for (const [name, value] of Object.entries(HTTP_SECURITY_CONFIG.securityHeaders)) {
      if (!res.headersSent) {
        res.setHeader(name, value);
      }
    }
    
    // 重新拋出錯誤
    throw error;
  }
}); 