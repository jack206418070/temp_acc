// 標頭安全中間件
// 隱藏技術棧資訊並加入安全標頭

export default defineEventHandler(async (event) => {
  // 獲取響應頭
  const setHeaders = (headers) => {
    // 移除洩露服務器資訊的標頭
    delete headers['server'];
    delete headers['x-powered-by'];
    delete headers['x-nuxt-version'];
    delete headers['x-nuxt-build-id'];
    delete headers['x-aspnet-version'];
    delete headers['x-aspnetmvc-version'];
    
    // 加入安全標頭
    headers['X-Content-Type-Options'] = 'nosniff';
    headers['X-Frame-Options'] = 'DENY';
    headers['X-XSS-Protection'] = '1; mode=block';
    headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    headers['X-Robots-Tag'] = 'index, follow';
    
    // 隱藏實際的服務器類型
    headers['Server'] = 'Apache'; // 偽裝成 Apache 而非 IIS
    
    return headers;
  };

  // Hook 到響應事件
  event.node.res.on('finish', () => {
    setHeaders(event.node.res.getHeaders());
  });

  // 立即設置標頭
  setHeaders(event.node.res.getHeaders());
}); 