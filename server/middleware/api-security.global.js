// 全域 API 安全中間件
import { detectSensitiveEncoding, validateAndThrowSecurity } from '../utils/api-security.js';

export default defineEventHandler(async (event) => {
  // 只處理 API 請求
  if (!event.node.req.url?.startsWith('/api/')) {
    return;
  }

  const request = event.node.req;
  const method = request.method?.toLowerCase();
  
  // 檢查 URL 路徑中的敏感編碼
  const urlPath = request.url || '';
  if (detectSensitiveEncoding(urlPath, 'url_path', request)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Resource not found'
    });
  }

  // 檢查查詢參數
  const query = getQuery(event);
  for (const [key, value] of Object.entries(query)) {
    validateAndThrowSecurity(value, key, request);
  }

  // 檢查路由參數
  const params = event.context.params || {};
  for (const [key, value] of Object.entries(params)) {
    validateAndThrowSecurity(value, key, request);
  }

  // 檢查 POST/PUT 請求的 body（如果存在）
  if (['post', 'put', 'patch'].includes(method)) {
    try {
      // 嘗試讀取請求體
      let body = null;
      const contentType = request.headers['content-type'] || '';
      
      if (contentType.includes('application/json')) {
        try {
          body = await readBody(event);
        } catch (e) {
          // 如果無法解析 JSON，可能是攻擊
          throw createError({
            statusCode: 404,
            statusMessage: 'Resource not found'
          });
        }
        
        // 檢查 JSON body 中的敏感內容
        if (body && typeof body === 'object') {
          for (const [key, value] of Object.entries(body)) {
            if (typeof value === 'string') {
              validateAndThrowSecurity(value, key, request);
            }
          }
        }
      }
    } catch (error) {
      // 如果是我們拋出的安全錯誤，直接傳遞
      if (error.statusCode === 404) {
        throw error;
      }
      // 其他錯誤繼續處理
    }
  }

  // 檢查標頭中的可疑內容
  const suspiciousHeaders = ['referer', 'user-agent', 'x-forwarded-for'];
  for (const headerName of suspiciousHeaders) {
    const headerValue = request.headers[headerName];
    if (headerValue && detectSensitiveEncoding(headerValue, headerName, request)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found'
      });
    }
  }

  // 檢查是否為知名的弱點掃描工具測試 URL
  const knownAttackPatterns = [
    /zero\.webappsecurity\.com/i,
    /webappsecurity\.com/i,
    /testphp\.vulnweb\.com/i,
    /hackerone\.com/i,
    /bugcrowd\.com/i,
    /sqlmap/i,
    /nmap/i,
    /nikto/i,
    /burpsuite/i,
    /owasp/i
  ];

  const fullUrl = urlPath + (request.url?.includes('?') ? '?' + new URL(request.url, 'http://localhost').search : '');
  
  for (const pattern of knownAttackPatterns) {
    if (pattern.test(fullUrl) || pattern.test(request.headers['user-agent'] || '')) {
      console.warn(`🚨 Known attack pattern detected: ${pattern} in ${fullUrl}`);
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found'
      });
    }
  }

  // 請求通過所有安全檢查，繼續處理
}); 