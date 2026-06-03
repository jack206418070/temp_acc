# 安全掃描報告修復設計（spec）

- 日期：2026-06-03
- 來源報告：HCL AppScan Standard 10.11.1 初掃（掃描日 2026/5/20）
- 受測站台：`https://mcs.wda.gov.tw`（IIS 10.0 + iisnode + Nuxt 3 node-server）
- 問題總計：41（高 2 / 中 22 / 低 14 / 參考 3）
- 驗收範圍（已與使用者確認）：**高+中 全部實修；低/參考 合理可修者修，誤判/設計如此者寫風險說明**

---

## 1. 背景與架構認知（修法前提）

### 1.1 部署架構（從 `.output/web.config` 與報告回應確認）
- 進入點：iisnode handler `index.js`（Node，`node_env=production`）。
- URL Rewrite 順序：
  1. `NodeInspector`（debug，略）
  2. `StaticContent`：把所有請求 rewrite 成 `public{PATH_INFO}`
  3. `DynamicContent`：若 `{REQUEST_FILENAME}` **不是實體檔** → rewrite 到 `index.js`（交給 Node）
- 結論：
  - **存在於 `.output/public` 的實體檔（HTML、JS、CSS、圖片、字型）由 IIS 直接服務** → 帶 `ETag`/`Last-Modified`，**nuxt-security / Nitro 完全碰不到這些回應的標頭**。
  - **`/api/**` 與不存在的路徑才轉發給 Node**。

### 1.2 目前安全標頭來源
- 此 app 的 `.output/web.config` **沒有任何 `customHeaders`**。
- 但報告回應裡有 `X-Frame-Options: SAMEORIGIN`、`Content-Security-Policy: frame-ancestors 'self';`、`X-Content-Type-Options: nosniff`、部分回應有 HSTS。
- 推論：**這些標頭是伺服器/站台層級（applicationHost.config 或上層 web.config）設定的**，不在本專案。
- `nuxt.config.ts` 內的 nuxt-security CSP（`script-src`/`style-src`/...）**與線上實際 CSP 完全不符** → 證實 nuxt-security 的 CSP 沒有生效（因為被掃的頁面是 IIS 靜態服務的）。
- `nuxt.config.ts` 的 `nitro.headers` 已把 COEP/COOP/CORP/Referrer-Policy/HSTS/cache-control 等清空為 `''`。

### 1.3 由此決定的策略
**雙軌：IIS `web.config`（標頭/傳輸/快取/404）+ Nuxt repo（輸入驗證/錯誤處理/API 快取）。**

| 層級 | 負責項目 | 理由 |
|------|----------|------|
| `web.config`（本專案 `.output/web.config`，並同步維護一份原始碼版） | 完整 CSP、COEP/COOP/CORP、HSTS、Referrer-Policy、移除 X-Powered-By/Server、`/admin.*`→404、HTML 文件不快取 | 唯一能同時蓋到「IIS 靜態檔」與「Node 轉發回應」的位置；不動渲染邏輯，破壞風險最低 |
| Nuxt repo | 數字參數驗證、全域錯誤處理（不洩漏除錯訊息）、`/api/**` 加 `Cache-Control: no-store` | 應用程式行為，IIS 改不到 |

> **關鍵風險：CSP 重複。** 上層已送 `Content-Security-Policy: frame-ancestors 'self';`。若本層再加完整 CSP，會出現兩個 CSP 標頭（瀏覽器取交集）。對策：在 `customHeaders` 內**先 `<remove>` 再 `<add>`**；若上層 CSP 不是用 customHeaders 繼承（例如用 outboundRules）導致 `<remove>` 無效，則於上線驗證時若發現重複，需請基礎架構移除站台層級那條，**以本專案這份為單一來源**。此為計劃中的明確驗證點。

---

## 2. 41 項問題 → 修法對應

### 高（2）
1. **從 CSP 中缺少必要的指令**（`/`）→ web.config 設完整 CSP（見 §3）。
2. **整數溢位**（`/api/knowledge` 參數 `category`）→ Nuxt repo：
   - `category` 等所有數字參數加驗證：非整數 / 超出 `INT` 範圍（1 ~ 2147483647）→ 回 **400 通用訊息**，不進 DB。
   - 新增 **Nitro 全域錯誤處理**：production 一律回通用訊息，不輸出 stack / SQL / 例外細節。
   - 同類風險端點一併處理（見 §4）。

### 中（22）
3. **直接存取管理頁面 ×19**（`/admin.shtml`、`/admin.php`、`/admin.asp`…等任意 `/admin.*` 回 200）→ web.config：在 `StaticContent` 規則**之前**加一條 rule，命中 `^admin\.[a-z0-9]+$`（排除真實存在的 admin SPA 路由）即回 **404**。
4. **COEP 缺失**（`/`）→ web.config：`Cross-Origin-Embedder-Policy: credentialless`（保 YouTube 影片 / GA；非報告建議的 require-corp，見 §5 風險說明）。
5. **COOP 缺失**（`/`）→ web.config：`Cross-Origin-Opener-Policy: same-origin`。
6. **CORP 缺失**（`/`）→ web.config：`Cross-Origin-Resource-Policy: same-origin`。

### 低（14）
7. **frame-ancestors 指令**（`/`）→ 已含在 §3 完整 CSP（`frame-ancestors 'self'`）。
8. **CSP 未強制 Trusted Types**（`/`）→ web.config：另發 `Content-Security-Policy-Report-Only: require-trusted-types-for 'script'`（只觀察、不阻擋，不破壞 TinyMCE/CKEditor/Tiptap/v-html；見 §5）。
9. **不必要 HTTP 標頭**（`/api/banners` 等出現 `X-Powered-By: ASP.NET`）→ web.config：移除 `X-Powered-By`，並 `removeServerHeader`（移除 `Server`）。
10. **可快取 SSL 頁面 ×10**（多個 `/api/*` + `/qa_test2`）→
    - `/api/**`：Nuxt `nitro.routeRules` 加 `Cache-Control: no-store`。
    - HTML 文件（含 `/qa_test2`）：web.config 對 `text/html` 設不快取。
    - **雜湊過的 JS/CSS/圖片/字型維持長快取**（不影響資源載入、不傷效能）。
11. **HSTS 缺失/不足**（`/`）→ web.config：對**所有**回應一致送 `Strict-Transport-Security: max-age=31536000; includeSubDomains`。

### 參考（3）
12. **找到電子郵件位址 ×2**（`/api/qa-contents`、`/api/service-unit`）→ 為 QA／服務單位內文的**合法公開聯絡信箱**（如 `das@slsc.org.tw`、各單位 email）。標為「設計如此、風險接受」，寫說明（§5）。
13. **遺漏 Referrer-Policy**（`/`）→ web.config：`Referrer-Policy: strict-origin-when-cross-origin`（與站上 YouTube iframe 既有 referrerpolicy 一致）。

---

## 3. 最終 CSP（已對照專案實際使用的外部資源）

專案實際外部資源：YouTube 內嵌（index/propaganda/reserve-guide/support）、Google Tag Manager（GTM-5LRLKWQD）、Google Analytics（G-5EVH3D8JX4）、自架 Bootstrap、自架 Clash Display 字型、圖片以 data:/blob: 與 API 回傳。

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://i.ytimg.com;
font-src 'self' data:;
connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.analytics.google.com https://stats.g.doubleclick.net;
frame-src https://www.youtube.com https://www.youtube-nocookie.com;
object-src 'none';
base-uri 'self';
frame-ancestors 'self';
form-action 'self';
```

說明：
- `script-src` 含 `'unsafe-inline'`：inline GTM/GA bootstrap 與 Nuxt hydration 皆為 inline script，靜態預產生 HTML 無法套 nonce。此設定即可消除「缺必要指令」「frame-ancestors」兩項，且不破壞影片/分析/編輯器。
- 此 CSP 在 web.config `customHeaders` 設定（先 `<remove>` 再 `<add>`，避免與上層重複）。

---

## 4. Nuxt repo 變更設計

### 4.1 數字參數驗證（整數溢位根因）
新增小工具（例如 `server/utils/validate.js`）：`parsePositiveInt(value)` → 回傳合法整數或 `null`（NaN、非整數、≤0、>2147483647 視為非法）。

套用範圍（讀取後直接進 `sql.Int` 的端點）：
- `server/api/knowledge/index.get.js`（`category`，報告直接命中）
- `server/api/announcements/[id].get.js`、`server/api/service-unit/[id].get.js` 及其 `unit-image.get.js`/`price-image.get.js`、`server/api/banners/[id].*`、`knowledge/[id].*`、`announcement-images/index.post.js` 等
- 非法 → `createError({ statusCode: 400, statusMessage: '參數格式不正確' })`（通用訊息）。

> 原則：先處理報告直接命中的 `/api/knowledge`，其餘同類端點一併加固（縱深防禦）。

### 4.2 全域錯誤處理（不洩漏除錯資訊）
- 新增 Nitro 錯誤攔截（`server/plugins/error-handler.js`，使用 `nitroApp.hooks.hook('error', ...)`／或 Nitro `errorHandler`）。
- production：回傳通用訊息與狀態碼，**不含** stack、SQL 文字、例外細節；錯誤詳情僅寫入伺服器日誌。
- 確認現有各 `catch` 不把 `error.message`/原始例外回給前端。

### 4.3 API 快取標頭
- `nuxt.config.ts` → `nitro.routeRules['/api/**'].headers`：加 `cache-control: 'no-store'`。
- 注意：目前 `nitro.headers['cache-control'] = ''` 會清空，需調整使 `/api/**` 確實送出 `no-store`。

### 4.4 避免雙重 CSP
- 因 CSP 由 web.config 單一管理：將 `nuxt.config.ts` 的 `security.headers.contentSecurityPolicy` 設為 `false`（或保持不生效現況），避免 Node 轉發回應另送一份 CSP 造成衝突。

### 4.5 遺留測試頁
- `qa_test.vue` / `qa_test2.vue`：**本次保留**（使用者決定）。`/qa_test2` 的可快取問題由 §2-10 的 HTML 不快取規則涵蓋。

---

## 5. 記錄為「風險接受 / 說明」而非強改的項目

| 項目 | 報告建議 | 本案做法 | 理由 |
|------|----------|----------|------|
| COEP | require-corp | **credentialless** | require-corp 會封鎖 YouTube 內嵌影片與 GA；本站「不能少任何影片」。COEP 實際風險低（CVSS 4.0 = 2.3）。 |
| Trusted Types | 強制 require-trusted-types-for 'script' | **Report-Only 觀察** | 全面強制會破壞 TinyMCE/CKEditor/Tiptap 與前台 v-html 富文本。低嚴重度（CVSS 3.7）。 |
| 內文 Email ×2 | 從網站移除 | **保留並說明** | 為計畫公開聯絡信箱（民眾諮詢/申訴用），屬設計需求。 |

---

## 6. 安全上線與驗證流程（避免「修完站壞掉」）

1. 修改 `nuxt.config.ts`、新增 repo 端驗證/錯誤處理；維護一份原始碼版 `web.config`（含上述 customHeaders / rewrite / 移除標頭規則）。
2. 測試環境 `yarn build` → 用 `curl -I` 對下列逐一驗證：
   - `/`（HTML 靜態）：CSP 完整且**只有一個** CSP 標頭、COEP=credentialless、COOP、CORP、HSTS、Referrer-Policy、無 `Server`/`X-Powered-By`。
   - `/api/announcements`（Node）：同上 + `Cache-Control: no-store`。
   - 一個雜湊靜態資源（JS/字型）：仍維持長快取。
   - `/admin.php`、`/admin.asp` → **404**；`/admin/login` → 正常。
   - `/api/knowledge?category=abc`、`?category=99999999999` → **400 通用訊息**（非 500、無除錯細節）。
3. 瀏覽器人工驗收 + DevTools Console **零 CSP 紅字**：
   - 首頁、`/propaganda`、`/reserve-guide`、`/support` 的 **YouTube 影片可播放**。
   - 圖片（banners/service-unit/knowledge）、Clash Display 字型正常載入。
   - GA/GTM 正常送出（DevTools Network 看 collect 請求）。
   - 後台：TinyMCE/CKEditor 開啟與編輯、圖片上傳、各 CRUD 正常。
4. 全部綠燈才部署正式；建議請對方**重掃驗收**。
5. 若重掃仍報「CSP 重複」或「標頭未生效」→ 回到 §1.3 的重複 CSP 對策，協調移除站台層級舊標頭。

---

## 7. 相依/待確認事項
- **站台層級既有標頭**（frame-ancestors CSP、X-Frame-Options、HSTS）的設定位置未知；若 `customHeaders` 的 `<remove>` 無法蓋掉，需基礎架構端配合（§1.3、§6-5）。
- 正式部署如何更新 `web.config`：本專案 `.output/web.config` 由建置產生；需確保我們的 web.config 變更會被部署流程帶上正式（建議於 repo 原始碼維護模板，部署時覆蓋 `.output/web.config`）。

---

## 8. 成功標準
- 高(2) + 中(22) 全部實修並通過 §6 驗證。
- 低(14)：除 Trusted Types（Report-Only）外全部實修。
- 參考(3)：Referrer-Policy 實修；Email 寫風險說明。
- **回歸零破壞**：影片、圖片、字型、GA/GTM、前台富文本、後台編輯器/上傳/CRUD 全部正常（§6-3 驗收）。
