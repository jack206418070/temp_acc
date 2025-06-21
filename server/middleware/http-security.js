// HTTP 請求安全中間件
import { securityLogger } from '~/server/utils/security-logger';

// 允許的網域白名單 (可根據需求調整)
const ALLOWED_DOMAINS = [
  // 本地開發
  'localhost',
  '127.0.0.1',
  // 生產環境域名 (需要根據實際情況調整)
  'mcs.wda.gov.tw',
  'wda.gov.tw'
];

// 被禁止的網域黑名單
const BLOCKED_DOMAINS = [
  'zero.webappsecurity.com',
  'webappsecurity.com',
  'testphp.vulnweb.com',
  'example.com',
  'test.com',
  'malicious.com',
  'evil.com'
];

// 檢查是否為內網 IP
function isPrivateIP(ip) {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fe80::/i,
    /^fc00::/i,
    /^fd00::/i
  ];
  
  return privateRanges.some(range => range.test(ip));
}

// 檢查網域是否合法
function isDomainAllowed(domain) {
  if (!domain) return false;
  
  // 檢查黑名單
  if (BLOCKED_DOMAINS.some(blocked => domain.toLowerCase().includes(blocked.toLowerCase()))) {
    return false;
  }
  
  // 檢查是否為內網域名
  if (domain === 'localhost' || domain.startsWith('127.') || domain.startsWith('192.168.') || 
      domain.startsWith('10.') || domain.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
    return process.env.NODE_ENV === 'development';
  }
  
  // 在生產環境中，只允許白名單域名
  if (process.env.NODE_ENV === 'production') {
    return ALLOWED_DOMAINS.some(allowed => 
      domain.toLowerCase() === allowed.toLowerCase() || 
      domain.toLowerCase().endsWith('.' + allowed.toLowerCase())
    );
  }
  
  return true;
}

// 解析 URL 中的網域
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return null;
  }
}

// 檢測惡意 URL 模式
function containsMaliciousURL(input) {
  const inputStr = String(input);
  
  // 檢查是否包含 URL
  const urlPatterns = [
    /https?:\/\/[^\s]+/i,
    /ftp:\/\/[^\s]+/i,
    /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[\/\?][^\s]*/,
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[\/\:]/
  ];
  
  for (const pattern of urlPatterns) {
    const matches = inputStr.match(pattern);
    if (matches) {
      const url = matches[0];
      const domain = extractDomain(url) || url.split('/')[0];
      
      if (!isDomainAllowed(domain)) {
        return { isMalicious: true, url, domain };
      }
    }
  }
  
  return { isMalicious: false };
}

export default defineEventHandler(async (event) => {
  // 只處理帶有查詢參數的請求
  const query = getQuery(event);
  const url = getRequestURL(event);
  
  if (!query || Object.keys(query).length === 0) {
    return;
  }
  
  // 檢查所有查詢參數
  for (const [key, value] of Object.entries(query)) {
    if (!value) continue;
    
    const result = containsMaliciousURL(value);
    if (result.isMalicious) {
      // 記錄惡意請求
      await securityLogger.logSecurityEvent({
        type: 'MALICIOUS_URL_DETECTED',
        severity: 'HIGH',
        details: {
          parameter: key,
          value: String(value),
          url: result.url,
          domain: result.domain,
          requestUrl: url.pathname + url.search,
          method: event.node.req.method,
          userAgent: getHeader(event, 'user-agent'),
          referer: getHeader(event, 'referer'),
          ip: getClientIP(event)
        },
        message: `Malicious URL detected in parameter '${key}': ${result.url}`
      });
      
      // 返回錯誤
      throw createError({
        statusCode: 400,
        statusMessage: '請求參數包含不允許的內容'
      });
    }
  }
  
  // 檢查路由參數 (如果存在)
  const params = event.context.params || {};
  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    
    const result = containsMaliciousURL(value);
    if (result.isMalicious) {
      await securityLogger.logSecurityEvent({
        type: 'MALICIOUS_URL_IN_ROUTE',
        severity: 'HIGH',
        details: {
          parameter: key,
          value: String(value),
          url: result.url,
          domain: result.domain,
          requestUrl: url.pathname + url.search,
          method: event.node.req.method,
          userAgent: getHeader(event, 'user-agent'),
          referer: getHeader(event, 'referer'),
          ip: getClientIP(event)
        },
        message: `Malicious URL detected in route parameter '${key}': ${result.url}`
      });
      
      throw createError({
        statusCode: 400,
        statusMessage: '路由參數包含不允許的內容'
      });
    }
  }
}); 