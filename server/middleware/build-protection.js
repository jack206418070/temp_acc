// 構建文件保護中間件
// 防止存取敏感的 Nuxt 構建元數據和其他敏感文件

import { securityLogger } from '~/server/utils/security-logger';

// 敏感路徑模式
const SENSITIVE_PATHS = [
  // Nuxt 構建文件
  /^\/_nuxt\/builds\/meta\//i,
  /^\/_nuxt\/builds\//i,
  
  // 配置文件
  /^\/_nuxt\/.*\.config\./i,
  /^\/_nuxt\/.*\.env/i,
  
  // 源碼映射文件
  /^\/_nuxt\/.*\.map$/i,
  
  // 開發工具文件
  /^\/_nuxt\/.*\.dev\./i,
  /^\/_nuxt\/.*debug/i,
  
  // 其他敏感文件
  /^\/\.well-known\/security/i,
  /^\/robots\.txt$/i,
  /^\/sitemap/i,
  
  // 系統文件
  /^\/\.git/i,
  /^\/\.env/i,
  /^\/package\.json$/i,
  /^\/package-lock\.json$/i,
  /^\/yarn\.lock$/i,
  /^\/nuxt\.config/i,
  /^\/server\//i,
  /^\/node_modules/i,
];

// URL 編碼繞過模式
const ENCODING_BYPASS_PATTERNS = [
  // URL 編碼
  /%[0-9a-fA-F]{2}/,
  
  // 雙重編碼
  /%25[0-9a-fA-F]{2}/,
  
  // Unicode 編碼
  /\\u[0-9a-fA-F]{4}/,
  
  // HTML 實體編碼
  /&#x?[0-9a-fA-F]+;/,
  
  // 混合編碼
  /[%\\].*[0-9a-fA-F]/,
];

// 解碼 URL 的所有編碼形式
function decodeAllEncodings(url) {
  let decoded = url;
  
  try {
    // 1. URL 解碼 (可能需要多次)
    let prevDecoded;
    do {
      prevDecoded = decoded;
      decoded = decodeURIComponent(decoded);
    } while (decoded !== prevDecoded && decoded.includes('%'));
    
    // 2. HTML 實體解碼
    decoded = decoded
      .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));
    
    // 3. Unicode 解碼
    decoded = decoded.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => 
      String.fromCharCode(parseInt(hex, 16))
    );
    
    // 4. 移除多餘的斜線
    decoded = decoded.replace(/\/+/g, '/');
    
    return decoded;
  } catch (error) {
    // 如果解碼失敗，返回原始 URL
    return url;
  }
}

// 檢查路徑是否包含編碼繞過攻擊
function hasEncodingBypass(path) {
  return ENCODING_BYPASS_PATTERNS.some(pattern => pattern.test(path));
}

// 檢查是否為敏感路徑
function isSensitivePath(path) {
  const cleanPath = decodeAllEncodings(path);
  return SENSITIVE_PATHS.some(pattern => pattern.test(cleanPath));
}

// 生成安全的錯誤響應
function createSecureErrorResponse() {
  return {
    statusCode: 404,
    statusMessage: 'Not Found',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  };
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  
  // 檢查是否有編碼繞過嘗試
  if (hasEncodingBypass(path)) {
    // 記錄編碼繞過攻擊
    await securityLogger.logSecurityEvent({
      type: 'ENCODING_BYPASS_ATTEMPT',
      severity: 'HIGH',
      details: {
        originalPath: path,
        decodedPath: decodeAllEncodings(path),
        requestUrl: url.href,
        method: event.node.req.method,
        userAgent: getHeader(event, 'user-agent'),
        referer: getHeader(event, 'referer'),
        ip: getClientIP(event)
      },
      message: `Encoding bypass attempt detected: ${path}`
    });
  }
  
  // 檢查是否嘗試存取敏感路徑
  if (isSensitivePath(path)) {
    // 記錄敏感文件存取嘗試
    await securityLogger.logSecurityEvent({
      type: 'SENSITIVE_FILE_ACCESS',
      severity: 'HIGH',
      details: {
        originalPath: path,
        decodedPath: decodeAllEncodings(path),
        requestUrl: url.href,
        method: event.node.req.method,
        userAgent: getHeader(event, 'user-agent'),
        referer: getHeader(event, 'referer'),
        ip: getClientIP(event)
      },
      message: `Attempt to access sensitive file: ${path}`
    });
    
    // 立即返回 404 錯誤，不提供任何有用資訊
    const errorResponse = createSecureErrorResponse();
    throw createError(errorResponse);
  }
  
  // 特別處理 _nuxt 目錄的請求
  if (path.startsWith('/_nuxt/')) {
    // 只允許特定的資源類型
    const allowedExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf'];
    const hasAllowedExtension = allowedExtensions.some(ext => path.toLowerCase().endsWith(ext));
    
    if (!hasAllowedExtension) {
      // 檢查是否為已知的構建文件模式
      const isBuildFile = /^\/_nuxt\/[A-Za-z0-9_-]+\.(js|css)$/.test(path);
      
      if (!isBuildFile) {
        await securityLogger.logSecurityEvent({
          type: 'UNAUTHORIZED_NUXT_ACCESS',
          severity: 'MEDIUM',
          details: {
            path: path,
            method: event.node.req.method,
            userAgent: getHeader(event, 'user-agent'),
            ip: getClientIP(event)
          },
          message: `Unauthorized access to _nuxt directory: ${path}`
        });
        
        throw createError(createSecureErrorResponse());
      }
    }
  }
  
  // 檢查是否有可疑的查詢參數
  const query = getQuery(event);
  if (query && Object.keys(query).length > 0) {
    for (const [key, value] of Object.entries(query)) {
      if (hasEncodingBypass(String(value))) {
        await securityLogger.logSecurityEvent({
          type: 'ENCODED_QUERY_ATTACK',
          severity: 'MEDIUM',
          details: {
            parameter: key,
            value: String(value),
            decodedValue: decodeAllEncodings(String(value)),
            path: path,
            ip: getClientIP(event)
          },
          message: `Encoded query parameter attack detected: ${key}=${value}`
        });
        
        throw createError(createSecureErrorResponse());
      }
    }
  }
}); 