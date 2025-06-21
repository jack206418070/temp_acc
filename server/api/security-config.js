// HTTP Request Smuggling 防護配置
export const HTTP_SECURITY_CONFIG = {
  // 安全標頭配置
  securityHeaders: {
    'Connection': 'close', // 防止連線重用攻擊
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  },

  // 請求限制配置
  requestLimits: {
    maxHeaderSize: 8192, // 8KB
    maxHeaders: 100,
    maxBodySize: 10 * 1024 * 1024, // 10MB
    maxChunkSize: 1024 * 1024, // 1MB
    timeoutMs: 30000 // 30 seconds
  },

  // 危險標頭組合
  dangerousHeaderCombinations: [
    ['content-length', 'transfer-encoding'],
    ['host', 'host'], // 重複 host 標頭
    ['content-type', 'content-type'] // 重複 content-type 標頭
  ],

  // 合法的編碼方式
  validEncodings: ['chunked', 'compress', 'deflate', 'gzip', 'identity'],

  // 支援的 HTTP 版本
  supportedHttpVersions: ['1.0', '1.1', '2.0']
};

// 驗證請求是否安全
export function validateHttpRequest(req) {
  const headers = req.headers;
  const errors = [];

  // 1. 檢查衝突的標頭組合
  for (const [header1, header2] of HTTP_SECURITY_CONFIG.dangerousHeaderCombinations) {
    if (headers[header1] && headers[header2] && header1 === header2) {
      // 重複標頭
      if (Array.isArray(headers[header1])) {
        errors.push(`Duplicate ${header1} header detected`);
      }
    } else if (headers[header1] && headers[header2]) {
      // 衝突標頭組合
      errors.push(`Conflicting headers: ${header1} and ${header2}`);
    }
  }

  // 2. 驗證 Content-Length
  const contentLength = headers['content-length'];
  if (contentLength) {
    const length = parseInt(contentLength, 10);
    if (isNaN(length) || length < 0) {
      errors.push('Invalid Content-Length value');
    }
    if (length > HTTP_SECURITY_CONFIG.requestLimits.maxBodySize) {
      errors.push('Content-Length exceeds maximum allowed size');
    }
  }

  // 3. 驗證 Transfer-Encoding
  const transferEncoding = headers['transfer-encoding'];
  if (transferEncoding) {
    const encodings = transferEncoding.toLowerCase().split(',').map(s => s.trim());
    for (const encoding of encodings) {
      if (!HTTP_SECURITY_CONFIG.validEncodings.includes(encoding)) {
        errors.push(`Invalid Transfer-Encoding: ${encoding}`);
      }
    }
  }

  // 4. 檢查標頭數量
  const headerCount = Object.keys(headers).length;
  if (headerCount > HTTP_SECURITY_CONFIG.requestLimits.maxHeaders) {
    errors.push('Too many headers');
  }

  // 5. 檢查標頭大小
  for (const [name, value] of Object.entries(headers)) {
    if (typeof value === 'string' && value.length > HTTP_SECURITY_CONFIG.requestLimits.maxHeaderSize) {
      errors.push(`Header ${name} exceeds maximum size`);
    }
  }

  // 6. 驗證 HTTP 版本
  if (!HTTP_SECURITY_CONFIG.supportedHttpVersions.includes(req.httpVersion)) {
    errors.push(`Unsupported HTTP version: ${req.httpVersion}`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// 清理和標準化請求標頭
export function sanitizeHeaders(headers) {
  const sanitized = { ...headers };

  // 處理 Content-Length 和 Transfer-Encoding 衝突
  if (sanitized['content-length'] && sanitized['transfer-encoding']) {
    const te = sanitized['transfer-encoding'].toLowerCase();
    if (te.includes('chunked')) {
      // 根據 RFC 7230，chunked 編碼時應移除 Content-Length
      delete sanitized['content-length'];
    } else {
      // 如果不是 chunked，則保留 Content-Length，移除 Transfer-Encoding
      delete sanitized['transfer-encoding'];
    }
  }

  // 移除重複的標頭（保留第一個）
  for (const [name, value] of Object.entries(sanitized)) {
    if (Array.isArray(value)) {
      sanitized[name] = value[0];
    }
  }

  return sanitized;
}

// 記錄可疑活動
export function logSuspiciousActivity(req, errors, ip) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: 'HTTP_REQUEST_SMUGGLING_ATTEMPT',
    url: req.url,
    method: req.method,
    httpVersion: req.httpVersion,
    headers: req.headers,
    errors: errors,
    ip: ip,
    userAgent: req.headers['user-agent'] || 'Unknown'
  };

  console.warn('🚨 Potential HTTP Request Smuggling detected:', logEntry);
  
  // 在生產環境中，可以將此記錄發送到安全監控系統
  if (process.env.NODE_ENV === 'production') {
    // TODO: 發送到安全監控系統
    // sendToSecurityMonitoring(logEntry);
  }

  return logEntry;
} 