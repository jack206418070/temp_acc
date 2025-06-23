// 靜態文件處理中間件
// 處理靜態資源的 404 錯誤，將其轉為重定向而非 500 錯誤

import { existsSync } from 'fs';
import { join } from 'path';

// 檢查是否為靜態資源路徑
function isStaticResourcePath(path) {
  const staticPrefixes = ['/images/', '/assets/', '/public/', '/uploads/'];
  const staticExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', 
                           '.css', '.js', '.woff', '.woff2', '.ttf', '.eot', 
                           '.avif', '.webp', '.pdf', '.doc', '.docx'];
  
  return staticPrefixes.some(prefix => path.startsWith(prefix)) ||
         staticExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

// 檢查文件是否存在
function checkFileExists(path) {
  try {
    // 建構實際的文件路徑
    let filePath;
    
    if (path.startsWith('/images/') || path.startsWith('/assets/')) {
      // 這些路徑映射到 public 目錄
      filePath = join(process.cwd(), 'public', path);
    } else if (path.startsWith('/uploads/')) {
      // uploads 目錄
      filePath = join(process.cwd(), 'public', path);
    } else {
      // 其他靜態資源
      filePath = join(process.cwd(), 'public', path);
    }
    
    return existsSync(filePath);
  } catch (error) {
    return false;
  }
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  
  // 只處理靜態資源路徑
  if (!isStaticResourcePath(path)) {
    return;
  }
  
  // 解碼 URL 以處理像 %20 這樣的編碼
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path);
  } catch (error) {
    // 如果解碼失敗，使用原路徑
    decodedPath = path;
  }
  
  // 檢查文件是否存在
  if (!checkFileExists(decodedPath)) {
    console.log(`🔍 Static file not found: ${path} (decoded: ${decodedPath})`);
    
    // 對於不存在的靜態資源，重定向到 notfound 而不是拋出 500 錯誤
    // 但我們需要讓這個請求通過，讓 Nuxt 的正常處理機制來處理
    // 如果還是產生錯誤，我們在錯誤處理中攔截
    
    // 設置一個標記，表明這是一個找不到的靜態資源
    event.context.staticFileNotFound = true;
    event.context.originalPath = path;
    event.context.decodedPath = decodedPath;
  }
}); 