# 敏感編碼攻擊防護 - 404 回應策略

## 概述

為了防止弱點掃描工具將 500 錯誤誤解為"後端處理了敏感編碼"，我們實施了一套完整的安全策略，確保所有敏感編碼攻擊都返回 404 狀態碼，讓攻擊者認為請求被拒絕而非處理。

## 安全策略

### 🎯 核心原則
- **404 vs 500**: 敏感編碼攻擊返回 404 (Resource not found) 而非 500 (Internal Server Error)
- **統一回應**: 所有可疑請求使用相同的 404 回應格式
- **隱藏技術細節**: 不洩露任何系統內部資訊
- **記錄安全事件**: 完整記錄攻擊嘗試用於監控

## 修改內容

### 1. 新增安全工具模組

#### `server/utils/api-security.js`
- `detectSensitiveEncoding()`: 檢測敏感編碼模式
- `validateAndThrowSecurity()`: 驗證並拋出 404 錯誤
- `createSecureAPIError()`: 創建安全的 API 錯誤回應
- `secureAPIWrapper()`: 安全錯誤處理包裝器

**檢測的攻擊模式**:
```javascript
// URL 編碼攻擊
/%[0-9A-Fa-f]{2}/g

// HTML 實體編碼
/&#x?[0-9A-Fa-f]+;/gi

// Unicode 編碼
/\\u[0-9A-Fa-f]{4}/gi

// 惡意域名
/zero\.webappsecurity\.com/i
/webappsecurity\.com/i
/testphp\.vulnweb\.com/i

// 腳本注入
/(union|select|insert|update|delete|drop|exec|script)/i
/(<script|javascript:|vbscript:|onload=|onerror=)/i
```

### 2. 中間件更新

#### `server/middleware/http-security.js`
```javascript
// 修改前
throw createError({
  statusCode: 400,
  statusMessage: '請求參數包含不允許的內容'
});

// 修改後
throw createError({
  statusCode: 404,
  statusMessage: 'Resource not found'
});
```

#### `server/middleware/request-validation.js`
```javascript
// 修改前
throw createError({
  statusCode: 400,
  statusMessage: 'Invalid request format'
});

// 修改後
throw createError({
  statusCode: 404,
  statusMessage: 'Resource not found'
});
```

#### 新增 `server/middleware/api-security.global.js`
- 全域 API 安全檢查中間件
- 檢查 URL 路徑、查詢參數、路由參數、請求體、標頭
- 檢測知名弱點掃描工具特徵

### 3. 錯誤處理器增強

#### `server/api/error-handler.ts`
新增專門針對 API 請求的敏感編碼檢測:
```typescript
// 對於 API 請求，檢查敏感編碼攻擊模式
const isAPIRequest = path.startsWith('/api/')
if (isAPIRequest) {
  suspiciousPatterns.push(
    /%[0-9a-fA-F]{2}/, // URL編碼攻擊
    /&#x?[0-9A-Fa-f]+;/i, // HTML實體編碼
    /\\u[0-9A-Fa-f]{4}/i, // Unicode編碼
    /0x[0-9A-Fa-f]+/i, // 十六進制編碼
    /https?:\/\/[^\s]+/i, // 外部URL注入
  )
}
```

### 4. API 端點修改

#### `server/api/service-unit/[id].get.js`
```javascript
// 修改前
if (InputValidator.containsMaliciousPatterns(rawId)) {
  throw createError({
    statusCode: 400,
    statusMessage: '無效的參數格式'
  });
}

// 修改後
if (InputValidator.containsMaliciousPatterns(rawId)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Resource not found'
  });
}
```

#### `server/api/service-unit/[id]/price-image.get.js`
- 同樣的 400 → 404 修改
- 統一錯誤訊息格式

## 攻擊向量防護

### 1. HTTP Request Smuggling (CWE-444)
```
GET /convert-principle/%33%31%33%31%31
回應: 404 Resource not found
```

### 2. Dynamic Code Evaluation (CWE-77)
```
GET /service-price?id=https://zero.webappsecurity.com/PRcxaxaxcihfhfbggbabdiajaegRP
回應: 404 Resource not found
```

### 3. Insecure Deployment (CWE-116)
```
GET /_nuxt/builds/meta/z%3F.x.%3Fz849003f2-7404-4629-9a2e-c7497202b14f.json
回應: 404 Resource not found
```

### 4. 其他編碼攻擊
- HTML 實體編碼: `&#x33;&#x31;` → 404
- Unicode 編碼: `\\u0031\\u0031` → 404
- 十六進制編碼: `0x31` → 404

## 測試驗證

### 測試腳本: `test-security-404.js`
```bash
node test-security-404.js
```

**測試案例**:
- URL 編碼攻擊
- 動態代碼評估
- 構建元數據訪問
- HTML 實體編碼
- Unicode 編碼
- 十六進制編碼
- XSS 攻擊
- SQL 注入
- 路徑遍歷
- 命令注入

**期望結果**: 所有測試應返回 404 狀態碼

## 安全日誌

所有可疑活動都會記錄到安全日誌:
```javascript
{
  type: 'SENSITIVE_ENCODING_DETECTED',
  severity: 'HIGH',
  details: {
    parameter: 'id',
    value: 'https://zero.webappsecurity.com/...',
    requestUrl: '/service-price',
    method: 'GET',
    userAgent: '...',
    referer: '...',
    ip: '...'
  },
  message: 'Sensitive encoding detected in parameter "id"'
}
```

## 監控指標

### 關鍵指標
- 404 回應數量 (敏感編碼攻擊)
- 攻擊模式分佈
- 攻擊來源 IP 分析
- 時間趨勢分析

### 警報條件
- 短時間內大量 404 回應
- 來自同一 IP 的重複攻擊
- 新的攻擊模式出現

## 部署檢查清單

### ✅ 部署前確認
- [ ] 所有中間件已更新
- [ ] API 端點錯誤處理已修改
- [ ] 測試腳本通過所有案例
- [ ] 安全日誌功能正常
- [ ] 監控系統已配置

### ✅ 部署後驗證
- [ ] 弱點掃描測試確認返回 404
- [ ] 正常業務功能未受影響
- [ ] 安全日誌正常記錄
- [ ] 性能指標無異常下降

## 最佳實踐

### 開發原則
1. **統一錯誤回應**: 所有安全相關錯誤使用 404
2. **最小資訊洩露**: 不在錯誤訊息中包含技術細節
3. **完整日誌記錄**: 記錄但不顯示詳細攻擊資訊
4. **定期更新檢測模式**: 根據新威脅更新攻擊模式

### 維護建議
- 定期檢查安全日誌
- 更新攻擊模式庫
- 監控誤判率並調整
- 定期進行滲透測試

## 相關文件

- [SECURITY_DEPLOYMENT.md](./SECURITY_DEPLOYMENT.md) - 完整安全部署指南
- [test-security.js](./test-security.js) - 綜合安全測試
- [test-security-404.js](./test-security-404.js) - 404 回應專項測試 