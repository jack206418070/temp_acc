# Web 應用程式安全防護部署指南

## 概述

本專案已實施全面的 Web 安全防護機制，包含以下威脅的防護：
- **HTTP Request Smuggling (CWE-444)**: 防止請求走私攻擊
- **Dynamic Code Evaluation (CWE-77)**: 防止不安全的 XMLHttpRequest 和代碼執行
- **Insecure Deployment (CWE-116)**: 防止構建文件洩露和 URL 編碼攻擊
- **Cookie Security (CWE-614)**: 防止 Cookie 通過不安全連線傳輸
- **XSS (Cross-Site Scripting)**: 防止跨站腳本攻擊
- **SSRF (Server-Side Request Forgery)**: 防止服務端請求偽造

## 🛡️ 已實施的防護措施

### 1. 應用層防護 (Nuxt/Node.js)

#### HTTP 請求驗證中間件
- **位置**: `server/middleware/request-validation.js`
- **功能**:
  - 檢測並處理 Content-Length 與 Transfer-Encoding 標頭衝突
  - 驗證標頭格式和大小
  - 限制請求體大小和標頭數量
  - 記錄可疑活動

#### HTTP 安全中間件
- **位置**: `server/middleware/http-security.js`  
- **功能**:
  - 檢測和阻止惡意 URL 注入
  - 防止 SSRF (Server-Side Request Forgery) 攻擊
  - 網域白名單和黑名單過濾
  - 內網 IP 地址保護

#### 輸入驗證模組
- **位置**: `server/utils/input-validation.js`
- **功能**:
  - 驗證和清理數字 ID 參數
  - 檢測各種惡意模式 (XSS, SQL Injection, Code Injection)
  - 清理用戶輸入和查詢參數
  - 記錄和警報可疑活動

#### 構建文件保護中間件
- **位置**: `server/middleware/build-protection.js`
- **功能**:
  - 防止存取 Nuxt 構建元數據文件
  - URL 編碼繞過攻擊檢測 (多重編碼、Unicode、HTML 實體)
  - 敏感檔案路徑保護 (配置檔、源碼映射、系統檔案)
  - `_nuxt` 目錄存取控制

#### 標頭安全中間件
- **位置**: `server/middleware/headers-security.js`
- **功能**:
  - 隱藏技術棧資訊 (Server, X-Powered-By 等)
  - 伺服器類型偽裝
  - 安全標頭注入

#### Cookie 安全中間件
- **位置**: `server/middleware/cookie-security.js`
- **功能**:
  - 自動為所有 Cookie 添加 `Secure` 標志
  - 強制設置 `SameSite=Strict` 防護 CSRF
  - 確保敏感 Cookie 具備 `HttpOnly` 屬性
  - 檢測來自不安全來源的 Cookie

#### 全域安全中間件
- **位置**: `middleware/security.global.js`, `middleware/input-validation.global.js`
- **功能**:
  - 前端路由層級的輸入驗證
  - Dynamic Code Evaluation 攻擊檢測
  - XMLHttpRequest 惡意調用檢測
  - 自動重定向惡意請求到 404 頁面

#### 安全配置
- **位置**: `server/api/security-config.js`
- **功能**:
  - 定義安全標頭規範
  - 提供標頭清理和驗證工具
  - 配置請求限制參數

### 2. 惡意模式檢測

系統自動檢測以下攻擊模式：

#### Dynamic Code Evaluation 攻擊:
- `eval()`, `Function()`, `setTimeout()`, `setInterval()`
- `new Function()` 動態代碼建立
- JavaScript 協議注入 (`javascript:`, `vbscript:`)

#### XMLHttpRequest 相關攻擊:
- `XMLHttpRequest`, `xhr`, `fetch()`, `ajax` 關鍵字
- 惡意網域和 URL 注入
- IP 地址和內網存取嘗試

#### XSS 和腳本注入:
- `<script>`, `<iframe>`, `<object>`, `<embed>` 標籤
- 事件處理器 (`onload=`, `onclick=` 等)
- CSS 表達式 (`expression()`)

#### SQL 注入和資料庫攻擊:
- `UNION SELECT`, `DROP TABLE`, `INSERT INTO`
- `DELETE FROM` 等 SQL 語句

#### 網路攻擊:
- 外部 URL 和網域 (`http://`, `https://`, `ftp://`)
- IP 地址模式 (`192.168.x.x`, `10.x.x.x`)
- Base64 編碼的長字符串

#### URL 編碼繞過攻擊 (CWE-116):
- URL 編碼 (`%3F`, `%2E`, `%2F`)
- 雙重編碼 (`%253F`, `%252E`)
- Unicode 編碼 (`\u002e`, `\u002f`)
- HTML 實體編碼 (`&#x2F;`, `&#47;`)
- 混合編碼攻擊

#### 敏感文件存取攻擊:
- Nuxt 構建元數據 (`/_nuxt/builds/meta/`)
- 配置文件 (`.env`, `nuxt.config.ts`)
- 源碼映射文件 (`.map`)
- 系統文件 (`package.json`, `.git/`)

#### Cookie 安全威脅 (CWE-614):
- 缺少 `Secure` 標志的 Cookie
- 缺少 `SameSite` 屬性導致 CSRF 攻擊
- 缺少 `HttpOnly` 屬性導致 XSS 攻擊
- Cookie 過期時間設定不當

### 3. 響應標頭防護

```javascript
// 自動添加的安全標頭
'Connection': 'close'                    // 防止連線重用攻擊
'X-Content-Type-Options': 'nosniff'     // 防止 MIME 類型嗅探
'X-Frame-Options': 'DENY'               // 防止點擊劫持
'Cache-Control': 'no-cache, no-store'   // 防止快取攻擊
'Strict-Transport-Security': '...'      // 強制 HTTPS
'Content-Security-Policy': '...'        // 防止 XSS 和代碼注入
```

### 4. 請求限制

```javascript
// 預設限制值
maxHeaderSize: 8KB      // 單個標頭最大大小
maxHeaders: 100         // 最大標頭數量
maxBodySize: 10MB       // 請求體最大大小
timeoutMs: 30000        // 請求超時時間
```

## 🚀 生產環境額外防護建議

### 1. 反向代理配置 (Nginx/Apache)

#### Nginx 配置範例:
```nginx
server {
    # 嚴格的 HTTP 解析
    ignore_invalid_headers on;
    large_client_header_buffers 4 16k;
    client_header_buffer_size 1k;
    client_max_body_size 10m;
    
    # 請求超時設定
    client_header_timeout 10s;
    client_body_timeout 10s;
    
    # 禁用不安全的方法
    if ($request_method !~ ^(GET|POST|PUT|DELETE|OPTIONS)$ ) {
        return 405;
    }
    
    # 檢查重複標頭
    if ($http_content_length != $content_length) {
        return 400;
    }
    
    # 轉發到 Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # 防止請求走私
        proxy_request_buffering on;
        proxy_buffering on;
    }
}
```

#### Apache 配置範例:
```apache
# 啟用安全模組
LoadModule security2_module modules/mod_security2.so
LoadModule unique_id_module modules/mod_unique_id.so

# 請求大小限制
LimitRequestFieldSize 8192
LimitRequestFields 100
LimitRequestBody 10485760

# 請求超時
Timeout 30
KeepAliveTimeout 5

# ModSecurity 規則
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess Off

# 檢測 HTTP Request Smuggling
SecRule REQUEST_HEADERS:Content-Length "@contains \n" \
    "id:1001,phase:1,block,msg:'Content-Length header with newline'"

SecRule REQUEST_HEADERS:Transfer-Encoding "@contains \n" \
    "id:1002,phase:1,block,msg:'Transfer-Encoding header with newline'"
```

### 2. 負載平衡器配置

#### HAProxy 配置:
```haproxy
global
    tune.http.maxhdr 100
    
defaults
    timeout http-request 10s
    timeout client 30s
    timeout server 30s
    
frontend web_frontend
    bind *:80
    bind *:443 ssl crt /path/to/cert.pem
    
    # 拒絕惡意請求
    http-request deny if { req.hdr_cnt(content-length) gt 1 }
    http-request deny if { req.hdr_cnt(transfer-encoding) gt 1 }
    http-request deny if { req.hdr_cnt(host) gt 1 }
    
    # 標準化標頭
    http-request set-header Connection close
    
    default_backend web_servers

backend web_servers
    balance roundrobin
    option httpchk GET /api/health
    server web1 localhost:3000 check
```

### 3. 監控和警報

#### 日誌監控
創建 `scripts/security-monitor.js`:
```javascript
// 監控安全日誌
const fs = require('fs');
const path = require('path');

function monitorSecurityLogs() {
    const logFile = path.join(process.cwd(), 'logs/security.log');
    
    fs.watchFile(logFile, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            // 讀取新的日誌條目
            // 發送警報到安全團隊
            sendSecurityAlert();
        }
    });
}
```

#### 警報配置
```bash
# 使用 logrotate 管理日誌
/path/to/app/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    notifempty
    postrotate
        # 發送日誌到 SIEM 系統
        curl -X POST "https://siem.company.com/api/logs" \
             -H "Content-Type: application/json" \
             -d @/path/to/app/logs/security.log
    endscript
}
```

## 🔍 測試和驗證

### 1. 自動化測試

創建 `tests/security/http-smuggling.test.js`:
```javascript
const axios = require('axios');

describe('HTTP Request Smuggling Protection', () => {
    test('should block conflicting headers', async () => {
        try {
            await axios.post('http://localhost:3000/api/test', 'data', {
                headers: {
                    'Content-Length': '4',
                    'Transfer-Encoding': 'chunked'
                }
            });
            fail('Should have blocked the request');
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
    
    test('should block invalid Content-Length', async () => {
        try {
            await axios.post('http://localhost:3000/api/test', 'data', {
                headers: {
                    'Content-Length': '-1'
                }
            });
            fail('Should have blocked the request');
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});
```

### 2. 手動測試

```bash
# 測試衝突標頭
curl -X POST http://localhost:3000/api/test \
     -H "Content-Length: 4" \
     -H "Transfer-Encoding: chunked" \
     -d "test"

# 測試無效 Content-Length
curl -X POST http://localhost:3000/api/test \
     -H "Content-Length: -1" \
     -d "test"

# 測試重複標頭
curl -X POST http://localhost:3000/api/test \
     -H "Host: example.com" \
     -H "Host: malicious.com" \
     -d "test"
```

## 📊 監控指標

### 關鍵指標
1. **拒絕的請求數量** - 因安全檢查失敗而被拒絕的請求
2. **可疑活動事件** - 檢測到的潛在攻擊嘗試
3. **響應時間** - 安全檢查對性能的影響
4. **錯誤率** - 誤判的百分比

### 警報閾值
```javascript
// 建議的警報閾值
const alertThresholds = {
    suspiciousRequests: 10,      // 每分鐘超過10個可疑請求
    rejectedRequests: 50,        // 每分鐘超過50個被拒絕請求
    responseTime: 1000,          // 響應時間超過1秒
    errorRate: 0.05              // 錯誤率超過5%
};
```

## 🔄 定期維護

### 1. 安全規則更新
- 每月檢查並更新安全規則
- 訂閱 CVE 通知，及時修補漏洞
- 定期進行滲透測試

### 2. 日誌審查
- 每週審查安全日誌
- 分析攻擊模式和趨勢
- 調整防護規則

### 3. 性能監控
- 監控安全檢查對性能的影響
- 優化規則效率
- 平衡安全性與性能

## 📞 事件響應

### 發現攻擊時的處理流程:
1. **立即響應** - 自動阻擋可疑 IP
2. **通知團隊** - 發送警報給安全團隊
3. **日誌保存** - 保存詳細的攻擊證據
4. **分析調查** - 分析攻擊模式和影響
5. **防護加強** - 根據攻擊調整防護規則

---

**注意**: 本防護機制已經過測試，但請根據您的具體環境和需求進行調整。建議在部署前進行充分的測試。 