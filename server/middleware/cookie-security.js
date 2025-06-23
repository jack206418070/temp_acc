// Cookie 安全中間件
// 確保所有 Set-Cookie 響應都包含安全屬性

import { securityLogger } from '~/server/utils/security-logger';

// 取得客戶端 IP 地址
function getClientIP(event) {
  // 從 H3 event 對象中取得客戶端 IP
  const request = event.node.req;
  
  // 檢查代理標頭
  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
    // x-forwarded-for 可能包含多個 IP，取第一個
    return forwarded.split(',')[0].trim();
  }
  
  // 檢查其他常見的代理標頭
  const realIP = request.headers['x-real-ip'];
  if (realIP) {
    return realIP;
  }
  
  // 檢查 Cloudflare
  const cfConnectingIP = request.headers['cf-connecting-ip'];
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // 最後使用連接的遠程地址
  return request.connection?.remoteAddress || 
         request.socket?.remoteAddress || 
         'unknown';
}

// 安全的 Cookie 屬性
const SECURE_COOKIE_ATTRIBUTES = {
  secure: true,        // 只能通過 HTTPS 傳輸
  sameSite: 'strict',  // 防護 CSRF 攻擊
  httpOnly: true       // 防護 XSS 攻擊 (某些情況下可能需要例外)
};

// 需要例外處理的 Cookie (可能需要在前端 JavaScript 中存取)
const JAVASCRIPT_ACCESSIBLE_COOKIES = [
  // 目前沒有需要前端存取的 Cookie
];

// 檢查和修復 Set-Cookie 標頭
function fixSetCookieHeader(cookieHeader) {
  if (!cookieHeader) return cookieHeader;
  
  const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
  
  return cookies.map(cookie => {
    // 解析 Cookie 字符串
    const parts = cookie.split(';').map(part => part.trim());
    const cookieName = parts[0].split('=')[0];
    
    // 檢查必要的安全屬性
    const hasSecure = parts.some(part => part.toLowerCase() === 'secure');
    const hasSameSite = parts.some(part => part.toLowerCase().startsWith('samesite'));
    const hasHttpOnly = parts.some(part => part.toLowerCase() === 'httponly');
    
    // 記錄不安全的 Cookie
    if (!hasSecure || !hasSameSite) {
      console.warn(`🔒 Cookie security fix applied to: ${cookieName}`);
    }
    
    // 添加缺失的安全屬性
    if (!hasSecure) {
      parts.push('Secure');
    }
    
    if (!hasSameSite) {
      parts.push('SameSite=Strict');
    }
    
    // 對於某些 Cookie，可能需要保持 JavaScript 可存取性
    if (!hasHttpOnly && !JAVASCRIPT_ACCESSIBLE_COOKIES.includes(cookieName)) {
      parts.push('HttpOnly');
    }
    
    return parts.join('; ');
  });
}

export default defineEventHandler(async (event) => {
  // 攔截響應，修復 Cookie 安全屬性
  const originalSetHeader = event.node.res.setHeader;
  const originalEnd = event.node.res.end;
  
  // 覆寫 setHeader 方法
  event.node.res.setHeader = function(name, value) {
    if (name.toLowerCase() === 'set-cookie') {
      // 修復 Set-Cookie 標頭
      const fixedValue = fixSetCookieHeader(value);
      return originalSetHeader.call(this, name, fixedValue);
    }
    return originalSetHeader.call(this, name, value);
  };
  
  // 覆寫 end 方法，最後檢查
  event.node.res.end = function(chunk, encoding) {
    // 最後檢查響應標頭
    const cookies = this.getHeader('set-cookie');
    if (cookies) {
      const fixedCookies = fixSetCookieHeader(cookies);
      this.setHeader('set-cookie', fixedCookies);
    }
    
    return originalEnd.call(this, chunk, encoding);
  };
  
  // 檢查請求中的 Cookie 是否來自安全來源
  const requestCookies = getHeader(event, 'cookie');
  if (requestCookies) {
    // 檢查是否有從不安全連線設置的 Cookie
    const userAgent = getHeader(event, 'user-agent');
    const referer = getHeader(event, 'referer');
    
    // 如果 Referer 包含 http:// (而非 https://)，記錄可疑活動
    if (referer && referer.startsWith('http://')) {
      await securityLogger.logSecurityEvent({
        type: 'INSECURE_COOKIE_SOURCE',
        severity: 'MEDIUM',
        details: {
          referer: referer,
          userAgent: userAgent,
          cookies: requestCookies,
          url: getRequestURL(event).href,
          ip: getClientIP(event)
        },
        message: `Cookie received from insecure HTTP source: ${referer}`
      });
    }
  }
}); 