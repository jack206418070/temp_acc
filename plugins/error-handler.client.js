// 客戶端錯誤處理插件
// 處理靜態資源載入失敗，重定向到 /notfound

export default defineNuxtPlugin(() => {
  // 處理圖片載入錯誤
  if (process.client) {
    // 監聽全域圖片載入錯誤
    window.addEventListener('error', (event) => {
      const target = event.target;
      
      // 檢查是否為圖片或其他媒體資源載入錯誤
      if (target && (target.tagName === 'IMG' || 
                     target.tagName === 'VIDEO' || 
                     target.tagName === 'AUDIO' ||
                     target.tagName === 'SOURCE')) {
        
        const src = target.src || target.href;
        
        if (src) {
          console.log(`🖼️ Media resource failed to load: ${src}`);
          
          // 檢查是否為內部資源（不是外部連結）
          const isInternalResource = src.startsWith(window.location.origin) || 
                                     src.startsWith('/') ||
                                     !src.includes('://');
          
          if (isInternalResource) {
            // 設置一個延遲，避免太多錯誤導致頁面混亂
            setTimeout(() => {
              console.log(`🔗 Redirecting to /notfound due to failed resource: ${src}`);
              navigateTo('/notfound');
            }, 100);
          }
        }
      }
    }, true); // 使用 capture 模式確保能捕獲到事件
    
    // 處理 fetch 錯誤（適用於動態載入的資源）
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      try {
        const response = await originalFetch.apply(this, args);
        
        // 檢查回應狀態
        if (!response.ok && response.status === 404) {
          const url = args[0];
          
          // 檢查是否為靜態資源請求
          if (typeof url === 'string') {
            const isStaticResource = /\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|avif|webp|pdf)$/i.test(url) ||
                                    url.includes('/images/') || 
                                    url.includes('/assets/') || 
                                    url.includes('/uploads/');
            
            if (isStaticResource) {
              console.log(`📁 Fetch: Static resource not found: ${url}`);
              // 不立即重定向，讓應用程式自己處理
            }
          }
        }
        
        return response;
      } catch (error) {
        // 網路錯誤等
        console.error('Fetch error:', error);
        throw error;
      }
    };
  }
}); 