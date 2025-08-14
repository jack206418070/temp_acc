# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

### 網站名稱
多元陪伴照顧服務試辦計畫官方網站

### 專案目的
這是勞動部推出的「多元陪伴照顧服務試辦計畫」官方平台，旨在：
1. 推廣政府試辦計畫，提供完整的計畫資訊
2. 媒合需要照顧服務的民眾與服務提供單位
3. 協助試辦單位申請加入計畫
4. 提供計畫相關法規、申請流程、最新消息等資訊公開

### 目標使用者
- **一般民眾**：需要陪伴照顧服務的家庭和個人
- **試辦單位**：想成為或已成為服務提供者的機構
- **政府管理人員**：負責計畫管理和內容更新

## 網站功能架構

### 前台功能模組

#### 1. 首頁 (`/`)
- 最新消息展示
- 快速預約申請連結
- YouTube 介紹影片嵌入
- 服務單位輪播展示

#### 2. 計畫簡介
- **計畫內容說明** (`/about-us`)：計畫介紹與目標
- **相關法規文件**：
  - 審查標準 (`/censor-standard`)
  - 試辦計畫 (`/conduct-plan`)
  - 就業服務法 (`/employment-services`)
  - 轉介原則 (`/convert-principle`)
- **宣導資料** (`/propaganda`, `/lazy-bag`)：懶人包與宣傳素材

#### 3. 最新消息
- **公告/新聞稿** (`/announcement`)
- **新聞報導** (`/news/[id]`)
- **使用心得分享** (`/experience-share/[id]`)
- **文章詳情頁** (`/blog-details/[id]`)

#### 4. 預約服務
- **外部預約系統連結**：連接到 serve-mcs.wda.gov.tw
- **預約指引** (`/reserve-guide`)：12步驟圖文教學
- **試辦單位簡介** (`/service-unit`)：各單位服務內容與收費標準

#### 5. 試辦單位
- **現有單位列表** (`/services`)
- **申請加入** (`/join-us`)：申請資格說明
- **申請表單** (`/application-form`)：線上申請系統

#### 6. 其他功能
- **常見問題** (`/faq`, `/qa`)：多語言 Q&A 系統
- **聯絡資訊** (`/contact`, `/all-contact-info`)
- **相關連結** (`/links`)
- **外勞親屬探視** (`/foreign-famliy-link`)

### 後台管理系統 (`/admin`)

#### 登入與驗證
- **登入頁面** (`/admin/login`)
- 圖形驗證碼驗證
- JWT Token 身份管理

#### 管理功能模組
1. **儀表板** (`/admin/dashboard`)：系統總覽
2. **公告管理** (`/admin/announcements`)：新增/編輯/刪除公告，支援富文本編輯
3. **Banner 管理** (`/admin/banners`)：首頁輪播圖管理
4. **服務單位管理** (`/admin/service-unit`)：試辦單位資訊維護
5. **問答管理** (`/admin/qa`, `/admin/qa_setting`)：多語言 FAQ 內容管理
6. **知識庫管理** (`/admin/knowledge`, `/admin/knowledge2`)：圖片知識庫維護

## 開發指令

### 安裝相依套件
```bash
npm install
# 或
yarn install
```

### 開發伺服器
```bash
npm run dev
# 或
yarn dev
```
執行於 http://localhost:3000

### 建置生產版本
```bash
npm run build
# 或
yarn build
```

### 預覽生產版本
```bash
npm run preview
# 或
yarn preview
```

### 生成靜態網站
```bash
npm run generate
# 或
yarn generate
```

## 技術架構總覽

### 技術棧
- **前端框架**：Nuxt 3 + Vue 3
- **後端**：Node.js with H3 framework (Nuxt 內建伺服器引擎)
- **資料庫**：Microsoft SQL Server (MSSQL)
- **狀態管理**：Pinia
- **樣式框架**：Bootstrap 5, SCSS
- **身份驗證**：JWT-based 自訂中介軟體
- **富文本編輯器**：TipTap, TinyMCE, CKEditor
- **UI 元件**：Swiper, Vue3-Toastify, SweetAlert2

### 專案結構

#### 前端架構
- **頁面 (`/pages`)**：Nuxt 自動路由的 Vue 元件
  - 公開頁面：首頁、服務、常見問題、聯絡等
  - 管理後台 (`/admin`)**：受保護的內容管理系統
- **元件 (`/components`)**：按功能分類的可重用 Vue 元件
- **版型 (`/layouts`)**：default、admin、layout-one 三種版型
- **組合式函數 (`/composables`)**：共享的 Vue composition 函數

#### 後端架構 (MVC 模式)
- **API 路由 (`/server/api`)**：RESTful 端點，按資源分類
  - announcements (公告管理)
  - banners (輪播圖管理)
  - knowledge (知識庫)
  - qa (問答系統)
  - service-unit (服務單位)
  - auth (身份驗證)
- **模型 (`/server/models`)**：資料庫實體模型
- **控制器 (`/server/controllers`)**：業務邏輯處理
- **資料庫設定 (`/server/config/db.js`)**：MSSQL 連線設定
- **工具函數 (`/server/utils`)**：包含身份驗證等輔助函數

### 重要設定檔
- **nuxt.config.ts**：Nuxt 主設定，包含安全標頭、建置設定、模組設定
- **資料庫**：使用 MSSQL，設定檔位於 `/server/config/db.js`
- **身份驗證**：JWT 驗證，中介軟體位於 `/middleware/auth.global.js`

### 開發規範

1. **語言**：使用繁體中文作為回應和 UI 文字
2. **框架**：遵循 Nuxt 3 框架慣例
3. **開發模式**：採用 MVC 架構
4. **後端**：使用 Node.js 搭配 H3 框架
5. **程式修改**：參考現有程式碼模式再進行修改

### 資料庫連線
應用程式連接到 MSSQL 資料庫，連線詳情在 `/server/config/db.js`：
- 本地開發使用 localhost:1433
- 資料庫名稱：test_two
- 認證方式：SQL Server 身份驗證

### API 結構
所有 API 路由遵循 RESTful 慣例：
- GET `/api/[resource]` - 列出所有項目
- GET `/api/[resource]/[id]` - 取得單一項目
- POST `/api/[resource]` - 建立新項目
- PUT `/api/[resource]/[id]` - 更新現有項目
- DELETE `/api/[resource]/[id]` - 刪除項目

### 資料庫架構

#### 主要資料表結構

##### 1. **Announcements** - 公告資料表
```sql
- id (INT) - 主鍵，自動遞增
- title (NVARCHAR(200)) - 公告標題
- category (NVARCHAR(50)) - 公告類別（新聞發佈、活動快報、最新訊息等）
- content (NVARCHAR(MAX)) - 公告內容（支援 HTML 富文本）
- publish_date (VARCHAR(10)) - 發布日期
- activity_start_date (VARCHAR(10)) - 活動開始日期
- link (NVARCHAR(500)) - 相關連結網址
- linkTitle (NVARCHAR(200)) - 連結標題
- image_id (VARCHAR(50)) - 圖片識別碼（已棄用，改用獨立圖片表）
- created_at (DATETIME) - 建立時間
- updated_at (DATETIME) - 更新時間
- is_deleted (BIT) - 軟刪除標記（0=正常, 1=已刪除）
```

##### 2. **AnnouncementImages** - 公告圖片資料表
```sql
- id (INT) - 主鍵，自動遞增
- announcement_id (INT) - 關聯公告 ID（外鍵）
- image_id (VARCHAR(50)) - 圖片唯一識別碼
- image_content (VARBINARY(MAX)) - 圖片二進制內容（Base64 編碼）
- created_at (DATETIME) - 建立時間
- updated_at (DATETIME) - 更新時間
- is_deleted (BIT) - 軟刪除標記
```

##### 3. **ServiceUnits** - 服務單位資料表
```sql
- id (INT) - 主鍵
- name (NVARCHAR) - 單位名稱
- service_area (NVARCHAR) - 服務區域
- contact_info (NVARCHAR) - 聯絡資訊
- service_content (NVARCHAR) - 服務內容
- price_image (VARBINARY) - 收費標準圖片
- unit_image (VARBINARY) - 單位圖片
- created_at/updated_at - 時間戳記
- is_deleted - 軟刪除標記
```

##### 4. **QA** - 多語言問答資料表
```sql
- id (INT) - 主鍵
- category_id (INT) - 分類 ID（外鍵）
- order_num (INT) - 排序號碼
- created_at/updated_at - 時間戳記
```

##### 5. **QAContents** - 問答內容資料表
```sql
- id (INT) - 主鍵
- qa_id (INT) - 關聯問答 ID（外鍵）
- language_id (INT) - 語言 ID（外鍵）
- question (NVARCHAR) - 問題內容
- answer (NVARCHAR) - 答案內容
```

##### 6. **Languages** - 語言資料表
```sql
- id (INT) - 主鍵
- code (VARCHAR) - 語言代碼（zh, en, vi, id, th）
- name (NVARCHAR) - 語言名稱
```

##### 7. **Knowledge** - 知識庫資料表
```sql
- id (INT) - 主鍵
- title (NVARCHAR) - 標題
- image_content (VARBINARY) - 圖片內容
- category (NVARCHAR) - 分類
- order_num (INT) - 排序號碼
```

##### 8. **Banners** - 輪播圖資料表
```sql
- id (INT) - 主鍵
- title (NVARCHAR) - 標題
- image_content (VARBINARY) - 圖片內容
- link (NVARCHAR) - 連結網址
- order_num (INT) - 排序號碼
```

##### 9. **Users** - 使用者資料表
```sql
- id (INT) - 主鍵
- username (VARCHAR) - 使用者名稱
- password (VARCHAR) - 密碼（加密儲存）
- role (VARCHAR) - 角色權限
```

### 安全功能
- Content Security Policy 標頭設定
- XSS 防護
- JWT 身份驗證保護管理路由
- 檔案上傳驗證機制
- 圖形驗證碼登入保護

### 樣式管理
- Bootstrap 5 作為基礎樣式框架
- 自訂 SCSS 位於 `/assets/scss/`
- 元件特定樣式使用 Vue SFC `<style>` 區塊
- 字體資源位於 `/assets/fonts/`

### 狀態管理
使用 Pinia 進行狀態管理，已設定自動匯入。可依需要建立 store 模組，會自動匯入使用。

### 圖片與資源管理
- 靜態圖片位於 `/public/images/`
- 上傳檔案儲存於 `/public/uploads/`
- 支援 Base64 圖片儲存於資料庫
- Nuxt Image 模組處理圖片最佳化

### 環境變數
重要環境變數：
- `JWT_SECRET`：JWT 身份驗證密鑰
- `NODE_ENV`：開發/生產環境標記

### 測試
目前未設定測試框架。建議需要時加入 Vitest 進行單元測試。

### 部署
- 建置輸出：`.output` 目錄
- 預設：`node-server`（可更改為 `vercel` 或 `static`）
- 支援靜態生成：`npm run generate`

## 特殊功能詳細說明

### 後台公告管理系統

#### 功能特色
1. **CRUD 完整操作**
   - 新增公告：支援標題、類別、發布日期、活動日期、內容、連結
   - 編輯公告：可修改所有欄位並更新圖片
   - 刪除公告：採用軟刪除機制（is_deleted 標記）
   - 列表顯示：支援類別篩選和排序

2. **富文本編輯器**
   - 使用 TipTap 編輯器
   - 支援 HTML 格式內容
   - 可插入連結、格式化文字
   - 內容儲存為 HTML 格式於資料庫

3. **圖片管理**
   - 支援多圖片上傳（每張限制 5MB）
   - 圖片以 Base64 格式儲存於 AnnouncementImages 表
   - 一對多關聯：一個公告可有多張圖片
   - 支援圖片預覽和刪除功能
   - 使用時間戳記作為圖片唯一識別碼

4. **類別管理**
   - 動態類別系統
   - 自動從現有公告提取類別列表
   - 支援類別篩選功能

5. **API 端點**
   ```
   GET    /api/announcements          - 取得所有公告
   GET    /api/announcements/[id]     - 取得單一公告（含圖片）
   POST   /api/announcements          - 新增公告
   PUT    /api/announcements/[id]     - 更新公告
   DELETE /api/announcements/[id]     - 刪除公告（軟刪除）
   
   POST   /api/announcement-images    - 上傳公告圖片
   GET    /api/announcement-images/[id] - 取得圖片內容
   DELETE /api/announcement-images/[id] - 刪除圖片（軟刪除）
   ```

### 資料庫設計特點

1. **軟刪除機制**
   - 所有主要資料表都有 `is_deleted` 欄位
   - 刪除操作不會真正移除資料，只標記為已刪除
   - 查詢時自動過濾已刪除資料

2. **圖片儲存策略**
   - 採用 VARBINARY(MAX) 儲存二進制資料
   - 支援 Base64 編碼轉換
   - 獨立圖片表以支援一對多關聯

3. **時間戳記**
   - 所有表都有 created_at 和 updated_at
   - 自動追蹤資料建立和修改時間

4. **多語言架構**
   - QA 系統採用三表設計（QA、QAContents、Languages）
   - 支援動態新增語言
   - 內容與語言分離便於維護

### 多語言問答系統
- 支援五種語言：繁體中文、英文、越南文、印尼文、泰文
- 問答內容可在後台管理
- 前台自動根據選擇的語言顯示對應內容

### 富文本編輯器整合
專案整合三種編輯器供不同場景使用：
- **TipTap**：主要編輯器，支援進階格式
- **TinyMCE**：備選編輯器
- **CKEditor**：特定功能使用

### 外部系統整合
- **預約系統**：連接到 serve-mcs.wda.gov.tw
- **Google Analytics**：GA4 追蹤碼整合
- **Google Tag Manager**：GTM 整合

### 檔案上傳處理
- 支援圖片上傳與預覽
- 圖片可儲存為 Base64 格式於資料庫
- 或儲存於 `/public/uploads/` 目錄