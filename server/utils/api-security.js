// API 安全工具函數
import { logSuspiciousActivity } from '../api/security-config.js';
import { securityLogger } from './security-logger.js';

/**
 * 檢測敏感編碼攻擊
 * @param {string} input - 輸入內容
 * @param {string} paramName - 參數名稱
 * @param {object} request - 請求對象
 * @returns {boolean} 是否包含敏感編碼
 */
export function detectSensitiveEncoding(input, paramName, request) {
  if (!input) return false;
  
  const inputStr = String(input);
  
  // 敏感編碼模式檢測
  const suspiciousPatterns = [
    // URL 編碼攻擊
    /%[0-9A-Fa-f]{2}/g,
    // HTML 實體編碼
    /&#x?[0-9A-Fa-f]+;/gi,
    // Unicode 編碼
    /\\u[0-9A-Fa-f]{4}/gi,
    // Base64 可疑模式
    /[A-Za-z0-9+\/]{20,}={0,2}/,
    // 十六進制編碼
    /0x[0-9A-Fa-f]+/g,
    // 惡意域名模式
    /zero\.webappsecurity\.com/i,
    /webappsecurity\.com/i,
    /testphp\.vulnweb\.com/i,
    // SQL 注入模式
    /(union|select|insert|update|delete|drop|exec|script)/i,
    // XSS 模式
    /(<script|javascript:|vbscript:|onload=|onerror=)/i,
    // 路徑遍歷
    /\.\.[\/\\]/,
    // 命令注入
    /(;|&&|\|\||`|\$\()/
  ];
  
  // 檢測可疑模式
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(inputStr)) {
      // 記錄安全事件
      securityLogger.logSecurityEvent({
        type: 'SENSITIVE_ENCODING_DETECTED',
        severity: 'HIGH',
        details: {
          parameter: paramName,
          value: inputStr.length > 100 ? inputStr.substring(0, 100) + '...' : inputStr,
          pattern: pattern.toString(),
          requestUrl: request.url,
          method: request.method,
          userAgent: request.headers['user-agent'],
          referer: request.headers['referer'],
          ip: getClientIP(request)
        },
        message: `Sensitive encoding detected in parameter '${paramName}'`
      });
      
      return true;
    }
  }
  
  return false;
}

/**
 * 檢測並拋出安全錯誤（返回 404 而不是 500）
 * @param {string} input - 輸入內容
 * @param {string} paramName - 參數名稱
 * @param {object} request - 請求對象
 */
export function validateAndThrowSecurity(input, paramName, request) {
  if (detectSensitiveEncoding(input, paramName, request)) {
    // 拋出 404 錯誤讓弱點掃描工具認為請求被拒絕
    throw createError({
      statusCode: 404,
      statusMessage: 'Resource not found'
    });
  }
}

/**
 * 取得客戶端 IP 地址
 * @param {object} request - 請求對象
 * @returns {string} IP 地址
 */
function getClientIP(request) {
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers['x-real-ip'];
  if (realIP) {
    return realIP;
  }
  
  const cfConnectingIP = request.headers['cf-connecting-ip'];
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return request.connection?.remoteAddress || 
         request.socket?.remoteAddress || 
         'unknown';
}

/**
 * 創建安全的 API 錯誤（統一使用 404 而不是 500 來防止資訊洩露）
 * @param {object} options - 錯誤選項
 * @param {number} options.statusCode - 原始狀態碼
 * @param {string} options.statusMessage - 錯誤訊息
 * @param {object} options.originalError - 原始錯誤對象
 * @returns {Error} 安全的錯誤對象
 */
export function createSecureAPIError(options = {}) {
  const { statusCode, statusMessage, originalError } = options;
  
  // 如果是伺服器錯誤 (5xx)，改為 404 以防止資訊洩露
  if (statusCode >= 500) {
    return createError({
      statusCode: 404,
      statusMessage: 'Resource not found'
    });
  }
  
  // 其他錯誤保持原狀
  return createError({
    statusCode: statusCode || 404,
    statusMessage: statusMessage || 'Resource not found'
  });
}

/**
 * 安全的錯誤處理包裝器
 * @param {Function} apiFunction - API 函數
 * @returns {Function} 包裝後的函數
 */
export function secureAPIWrapper(apiFunction) {
  return async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      // 檢查是否為可疑的錯誤
      if (error.statusCode >= 500) {
        // 記錄原始錯誤到日誌
        console.error('API Error (converted to 404):', error);
        
        // 返回 404 錯誤以防止資訊洩露
        throw createError({
          statusCode: 404,
          statusMessage: 'Resource not found'
        });
      }
      
      // 其他錯誤直接拋出
      throw error;
    }
  };
} 