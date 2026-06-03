# 安全掃描報告修復 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修復 AppScan 初掃 41 項問題（高+中全修、低/參考合理者修），且不破壞任何資源（影片、圖片、字型、GA/GTM、前台富文本、後台編輯器/上傳/CRUD）。

**Architecture:** 雙軌修復。安全標頭/快取/404 由 IIS `web.config`（單一來源，蓋住「IIS 靜態檔」與「iisnode 轉發回應」）；輸入驗證、全域錯誤處理、`/api` no-store 由 Nuxt repo。CSP 只在 web.config 設一份，並關閉 nuxt-security CSP 以避免雙重 CSP。

**Tech Stack:** Nuxt 3 (Nitro node-server preset) + iisnode + IIS 10 / URL Rewrite；MSSQL（`mssql` 套件）。

**對應 spec：** `docs/superpowers/specs/2026-06-03-security-remediation-design.md`

**前置說明（執行者必讀）：**
- 本專案**無測試框架**（CLAUDE.md 載明無 test/lint）。本計劃用「獨立 node 測試腳本 + curl/瀏覽器實測」做驗證，不引入測試框架。
- web.config 的標頭只在**真正的 IIS 伺服器**才會生效；本機 macOS 無 IIS，故 web.config 類驗證在 **staging IIS** 做（Task 9）。本機僅驗證 Nitro 行為（Task 8）。
- 目前分支 `ft/old_temp`（非預設分支），可直接提交。

---

## 檔案結構（本計劃會新增/修改）

**新增：**
- `server/utils/validate.js` — 數字參數驗證工具（Nitro 自動匯入 `server/utils`）
- `scripts/test-validate.mjs` — `parsePositiveInt` 的獨立測試腳本（`node` 直跑，無框架）
- `server/plugins/error-handler.js` — Nitro 全域錯誤記錄（不洩漏細節）
- `web.config` —（repo 根目錄）部署用 web.config 的**原始碼單一來源**
- `scripts/copy-webconfig.mjs` — build 後把 `web.config` 複製進 `.output/web.config`

**修改：**
- `server/api/knowledge/index.get.js` — `category` 加驗證（報告直接命中）
- `server/api/service-unit/[id].get.js`、`.../[id]/unit-image.get.js`、`.../[id]/price-image.get.js`、`server/api/banners/[id].delete.js` — 補「INT 範圍溢位」防護
- `nuxt.config.ts` — `/api/**` 加 `cache-control: no-store`；關閉 nuxt-security CSP
- `package.json` — `build` 串接 copy-webconfig

**不修改（記錄為風險接受，見 spec §5）：** COEP 用 credentialless、Trusted Types 用 Report-Only、內文公開 Email 保留；`qa_test.vue`/`qa_test2.vue` 保留。

---

## Task 1：數字參數驗證工具 `parsePositiveInt`

**Files:**
- Create: `server/utils/validate.js`
- Test: `scripts/test-validate.mjs`

- [ ] **Step 1：寫失敗測試**

建立 `scripts/test-validate.mjs`：

```js
import assert from 'node:assert';
import { parsePositiveInt } from '../server/utils/validate.js';

const cases = [
  ['5', 5],
  [' 7 ', 7],
  ['1', 1],
  ['2147483647', 2147483647],      // INT 上限，合法
  ['2147483648', null],            // 超出 INT 上限 → 溢位防護
  ['99999999999', null],           // 報告命中的大數
  ['abc', null],
  ['', null],
  ['0', null],
  ['-3', null],
  ['1.5', null],
  ['12x', null],
  [undefined, null],
  [null, null],
];

let pass = 0;
for (const [input, expected] of cases) {
  const got = parsePositiveInt(input);
  assert.strictEqual(got, expected, `parsePositiveInt(${JSON.stringify(input)}) => ${got}, 期望 ${expected}`);
  pass++;
}
console.log(`✅ validate 測試全通過：${pass}/${cases.length}`);
```

- [ ] **Step 2：執行測試，確認失敗**

Run: `node scripts/test-validate.mjs`
Expected: FAIL — `Cannot find module '.../server/utils/validate.js'`（檔案尚未建立）

- [ ] **Step 3：實作 `server/utils/validate.js`**

```js
// 數字參數驗證：回傳合法正整數，否則回 null
// 規則：必須為純數字字串、整數、1 <= n <= MSSQL INT 上限(2147483647)
const INT_MAX = 2147483647;

export function parsePositiveInt(value) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (!/^\d+$/.test(s)) return null;       // 非純數字（含空字串、負號、小數點）一律 null
  const n = Number(s);
  if (!Number.isInteger(n) || n < 1 || n > INT_MAX) return null;
  return n;
}
```

- [ ] **Step 4：執行測試，確認通過**

Run: `node scripts/test-validate.mjs`
Expected: PASS — `✅ validate 測試全通過：13/13`

- [ ] **Step 5：提交**

```bash
git add server/utils/validate.js scripts/test-validate.mjs
git commit -m "feat(security): 新增 parsePositiveInt 數字參數驗證工具(含INT溢位防護)"
```

---

## Task 2：修復 `/api/knowledge` 整數溢位（報告高風險直接命中）

**Files:**
- Modify: `server/api/knowledge/index.get.js`

- [ ] **Step 1：改寫 handler，對 `category` 驗證**

把 `server/api/knowledge/index.get.js` 整檔改為：

```js
import { createError } from 'h3';
import { getAllKnowledge } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const includeImage = query.includeImage === 'true';

    // category 為選填；若有提供，必須是合法正整數(含 INT 溢位防護)
    let categoryId = null;
    const rawCategory = query.category;
    if (rawCategory !== undefined && String(rawCategory).trim() !== '') {
      categoryId = parsePositiveInt(rawCategory); // server/utils/validate.js 由 Nitro 自動匯入
      if (categoryId === null) {
        throw createError({ statusCode: 400, statusMessage: '參數格式不正確' });
      }
    }

    const data = await getAllKnowledge(categoryId, includeImage);
    return { success: true, data };
  } catch (error) {
    // 已是預期的 4xx（如 400）直接往外丟，不要覆寫成 500
    if (error?.statusCode && error.statusCode < 500) throw error;
    console.error('Get Knowledge List Error:', error);
    throw createError({ statusCode: 500, statusMessage: '獲取知識列表失敗' });
  }
});
```

- [ ] **Step 2：本機建置（為 Task 8 驗證做準備，先確認可編譯）**

Run: `yarn build`
Expected: 建置成功，無語法錯誤（先不啟動，Task 8 再實測）。

- [ ] **Step 3：提交**

```bash
git add server/api/knowledge/index.get.js
git commit -m "fix(security): /api/knowledge category 參數驗證, 修復整數溢位500洩漏"
```

---

## Task 3：補其餘數字 ID 端點的「INT 溢位」防護

> 這些端點已有 `isNaN` 的 400，但**未擋超出 INT 範圍的大數**（會進 DB 造成溢位錯誤）。改用 `parsePositiveInt` 一致化。

**Files:**
- Modify: `server/api/service-unit/[id].get.js`
- Modify: `server/api/service-unit/[id]/unit-image.get.js`
- Modify: `server/api/service-unit/[id]/price-image.get.js`
- Modify: `server/api/banners/[id].delete.js`

- [ ] **Step 1：`service-unit/[id].get.js`** — 將取 id 段改為：

把：
```js
    // 從 URL 參數中獲取 ID
    const id = parseInt(event.context.params.id);
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '無效的 ID'
      });
    }
```
改為：
```js
    // 從 URL 參數中獲取 ID(含 INT 溢位防護)
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, message: '無效的 ID' });
    }
```

- [ ] **Step 2：`service-unit/[id]/unit-image.get.js`** — 將：
```js
    const id = parseInt(event.context.params.id);
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '無效的 ID'
      });
    }
```
改為：
```js
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, message: '無效的 ID' });
    }
```

- [ ] **Step 3：`service-unit/[id]/price-image.get.js`** — 將：
```js
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的 ID'
      });
    }
```
改為：
```js
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, statusMessage: '無效的 ID' });
    }
```

- [ ] **Step 4：`banners/[id].delete.js`** — 將：
```js
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的 Banner ID'
      });
    }
```
改為：
```js
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, statusMessage: '無效的 Banner ID' });
    }
```

- [ ] **Step 5：建置驗證**

Run: `yarn build`
Expected: 成功，無錯誤。

- [ ] **Step 6：提交**

```bash
git add "server/api/service-unit/[id].get.js" "server/api/service-unit/[id]/unit-image.get.js" "server/api/service-unit/[id]/price-image.get.js" "server/api/banners/[id].delete.js"
git commit -m "fix(security): service-unit/banners ID 參數加 INT 溢位防護"
```

---

## Task 4：Nitro 全域錯誤處理（縱深防禦，不洩漏除錯資訊）

**Files:**
- Create: `server/plugins/error-handler.js`

> 說明：iisnode 已設 `node_env=production`，Nitro 預設在 production 不回傳 stack。此 plugin 僅集中記錄錯誤於伺服器端，確保即使未驗證到的例外也只輸出通用回應、細節留在 server log。

- [ ] **Step 1：建立 plugin**

```js
// 集中記錄伺服器錯誤；不改寫回應內容(production 由 Nitro 回通用訊息)
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    const path = event?.path ?? '(unknown)';
    const code = error?.statusCode ?? 500;
    // 僅記錄於 server 端，避免機密/除錯資訊外洩到回應
    console.error(`[server-error] ${code} ${path} :: ${error?.message ?? error}`);
  });
});
```

- [ ] **Step 2：建置驗證**

Run: `yarn build`
Expected: 成功。

- [ ] **Step 3：提交**

```bash
git add server/plugins/error-handler.js
git commit -m "feat(security): 新增 Nitro 全域錯誤記錄, 避免除錯資訊外洩"
```

---

## Task 5：`nuxt.config.ts` — `/api` no-store + 關閉 nuxt-security CSP

**Files:**
- Modify: `nuxt.config.ts`（`security` 區塊 ~57–92 行；`nitro.routeRules` ~174–186 行）

- [ ] **Step 1：關閉 nuxt-security 的 CSP（避免與 web.config 雙重 CSP）**

把 `security:` 區塊中的 `contentSecurityPolicy: { ... }`（整個物件）替換為 `contentSecurityPolicy: false`。改完後 `security.headers` 應為：

```js
    headers: {
      contentSecurityPolicy: false, // CSP 由 IIS web.config 單一來源管理(見 spec §1.3/§4.4)
      strictTransportSecurity: false
    }
```

（保留 `ssg`、`sri: false` 等其餘 security 設定不動。）

- [ ] **Step 2：`/api/**` 加 `Cache-Control: no-store`**

把 `nitro.routeRules` 中的：
```js
      '/api/**': {
        security: {
          xssValidator: false
        }
      }
```
改為：
```js
      '/api/**': {
        security: {
          xssValidator: false
        },
        headers: {
          'cache-control': 'no-store'
        }
      }
```

- [ ] **Step 3：建置驗證**

Run: `yarn build`
Expected: 成功。

- [ ] **Step 4：提交**

```bash
git add nuxt.config.ts
git commit -m "fix(security): /api 加 no-store; 關閉 nuxt-security CSP 避免雙重CSP"
```

---

## Task 6：`web.config` 安全標頭 + `/admin.*` 404 + HTML 不快取 + 移除 Server/X-Powered-By

**Files:**
- Create: `web.config`（repo 根目錄，部署原始碼單一來源）

> 基底沿用現行 `.output/web.config`（iisnode + StaticContent/DynamicContent rewrite），新增：BlockAdminProbes(404)、outboundRules(HTML 不快取)、customHeaders(安全標頭)、removeServerHeader。

- [ ] **Step 1：建立 `web.config`（完整內容）**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <webSocket enabled="false" />
    <handlers>
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^index.js/debug[/]?" />
        </rule>

        <!-- 安全：阻擋管理頁面探測(admin.php/admin.asp...)，回 404；必須在 StaticContent 之前 -->
        <rule name="BlockAdminProbes" stopProcessing="true">
          <match url="^admin\.[a-zA-Z0-9]+$" />
          <action type="CustomResponse" statusCode="404" statusReason="Not Found" statusDescription="Not Found" />
        </rule>

        <!-- 先比對 /public 內實體檔 -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{PATH_INFO}" />
        </rule>

        <!-- 其餘導向 Node 進入點 -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
          </conditions>
          <action type="Rewrite" url="index.js" />
        </rule>
      </rules>

      <!-- HTML 文件不快取(雜湊靜態資源仍維持長快取，不受影響) -->
      <outboundRules>
        <preConditions>
          <preCondition name="IsHtml">
            <add input="{RESPONSE_CONTENT_TYPE}" pattern="^text/html" />
          </preCondition>
        </preConditions>
        <rule name="NoStoreHtml" preCondition="IsHtml">
          <match serverVariable="RESPONSE_Cache-Control" pattern=".*" />
          <action type="Rewrite" value="no-store, no-cache, must-revalidate" />
        </rule>
        <rule name="PragmaHtml" preCondition="IsHtml">
          <match serverVariable="RESPONSE_Pragma" pattern=".*" />
          <action type="Rewrite" value="no-cache" />
        </rule>
      </outboundRules>
    </rewrite>

    <httpProtocol>
      <customHeaders>
        <!-- 先移除(避免與站台層級繼承的標頭重複)，再加入本案單一來源 -->
        <remove name="X-Powered-By" />
        <remove name="Content-Security-Policy" />
        <remove name="Cross-Origin-Embedder-Policy" />
        <remove name="Cross-Origin-Opener-Policy" />
        <remove name="Cross-Origin-Resource-Policy" />
        <remove name="Referrer-Policy" />
        <remove name="Strict-Transport-Security" />
        <remove name="X-Content-Type-Options" />
        <remove name="X-Frame-Options" />

        <add name="Content-Security-Policy" value="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://i.ytimg.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.analytics.google.com https://stats.g.doubleclick.net; frame-src https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self';" />
        <!-- Trusted Types 僅觀察(Report-Only)，避免破壞編輯器/v-html -->
        <add name="Content-Security-Policy-Report-Only" value="require-trusted-types-for 'script';" />
        <add name="Cross-Origin-Embedder-Policy" value="credentialless" />
        <add name="Cross-Origin-Opener-Policy" value="same-origin" />
        <add name="Cross-Origin-Resource-Policy" value="same-origin" />
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
        <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="SAMEORIGIN" />
      </customHeaders>
    </httpProtocol>

    <security>
      <requestFiltering removeServerHeader="true">
        <hiddenSegments>
          <remove segment="bin" />
        </hiddenSegments>
        <requestLimits maxAllowedContentLength="4294967295" />
      </requestFiltering>
    </security>

    <httpErrors existingResponse="PassThrough" />

    <iisnode watchedFiles="index.js" node_env="production" debuggingEnabled="false" loggingEnabled="false" />
  </system.webServer>
</configuration>
```

- [ ] **Step 2：XML 格式檢查（本機可做）**

Run: `python3 -c "import xml.dom.minidom,sys; xml.dom.minidom.parse('web.config'); print('web.config XML OK')"`
Expected: `web.config XML OK`

- [ ] **Step 3：提交**

```bash
git add web.config
git commit -m "feat(security): web.config 安全標頭/admin探測404/HTML不快取/移除Server標頭"
```

---

## Task 7：build 後自動把 `web.config` 帶進 `.output`

**Files:**
- Create: `scripts/copy-webconfig.mjs`
- Modify: `package.json`（`scripts.build`）

- [ ] **Step 1：建立複製腳本**

```js
// 把 repo 根目錄的 web.config 複製進 .output/(覆蓋建置產生的版本)
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const src = 'web.config';
const dest = '.output/web.config';

if (!existsSync(src)) {
  console.error('❌ 找不到來源 web.config');
  process.exit(1);
}
if (!existsSync('.output')) {
  mkdirSync('.output', { recursive: true });
}
copyFileSync(src, dest);
console.log('✅ 已複製 web.config →', dest);
```

- [ ] **Step 2：更新 `package.json` build 指令**

把：
```json
    "build": "nuxt build",
```
改為：
```json
    "build": "nuxt build && node scripts/copy-webconfig.mjs",
```

- [ ] **Step 3：建置並確認 web.config 進入 `.output`**

Run: `yarn build && test -f .output/web.config && grep -c "BlockAdminProbes" .output/web.config`
Expected: build 成功，最後印出 `1`（`.output/web.config` 含我們的規則）。

- [ ] **Step 4：提交**

```bash
git add scripts/copy-webconfig.mjs package.json
git commit -m "build(security): build 後複製 web.config 進 .output"
```

---

## Task 8：本機驗證（Nitro 行為，不需 IIS）

> 目標：確認輸入驗證、no-store、Node 不再自送 CSP。web.config 標頭本機不生效，留待 Task 9。

- [ ] **Step 1：啟動本機 node-server**

Run: `node .output/server/index.mjs`（背景執行；預設埠 3000。若被占用，設 `PORT=3010 node .output/server/index.mjs`）
Expected: 看到 Nitro 啟動於 `http://localhost:3000`。

- [ ] **Step 2：整數溢位 → 400（不需 DB，驗證在進 DB 前就擋下）**

Run: `curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/knowledge?category=99999999999"`
Expected: `400`

Run: `curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/api/knowledge?category=abc"`
Expected: `400`

- [ ] **Step 3：確認 Node 回應不再自送 CSP（避免雙重 CSP 來源）**

Run: `curl -sI "http://localhost:3000/api/knowledge?category=abc" | grep -i "content-security-policy" || echo "NO-CSP-FROM-NODE"`
Expected: `NO-CSP-FROM-NODE`（CSP 改由 web.config 提供）

- [ ] **Step 4：確認 `/api` 帶 no-store**

Run: `curl -sI "http://localhost:3000/api/knowledge?category=abc" | grep -i "cache-control"`
Expected: 含 `cache-control: no-store`

- [ ] **Step 5：停止本機 server**

Run: 結束 Task 8 Step 1 的背景程序（Ctrl+C 或 `kill`）。

> 本任務無程式碼變更，不需提交。若任一項不符 → 回對應 Task 修正。

---

## Task 9：Staging IIS 驗證 + 瀏覽器零破壞驗收（部署前最後關卡）

> 把本分支部署到 **staging IIS**（與正式相同：iisnode + 本 web.config）。以下 `STAGING` 代換為 staging 網域。

- [ ] **Step 1：標頭逐條檢查（HTML 靜態頁，由 IIS 直接服務）**

Run: `curl -sI "https://STAGING/" | grep -iE "content-security-policy|cross-origin-|strict-transport-security|referrer-policy|x-content-type-options|x-frame-options|x-powered-by|server|cache-control|pragma"`
Expected:
- `content-security-policy:` 只出現**一次**且為我們的完整字串（含 `default-src` 與 `frame-ancestors 'self'`）
- `cross-origin-embedder-policy: credentialless`、`cross-origin-opener-policy: same-origin`、`cross-origin-resource-policy: same-origin`
- `strict-transport-security: max-age=31536000; includeSubDomains`
- `referrer-policy: strict-origin-when-cross-origin`、`x-content-type-options: nosniff`
- `cache-control: no-store, no-cache, must-revalidate`（HTML）
- **無** `x-powered-by`、**無** `server`

- [ ] **Step 2：API 回應標頭（經 Node 轉發）**

Run: `curl -sI "https://STAGING/api/announcements" | grep -iE "content-security-policy|cache-control|x-powered-by|server"`
Expected: 有單一 CSP、`cache-control: no-store`、無 `x-powered-by`、無 `server`。

- [ ] **Step 3：管理頁面探測 → 404；正常後台 → 可進**

Run: `for p in admin.php admin.asp admin.aspx admin.jsp admin.html admin.cgi; do echo -n "$p "; curl -s -o /dev/null -w "%{http_code}\n" "https://STAGING/$p"; done`
Expected: 全部 `404`

Run: `curl -s -o /dev/null -w "%{http_code}\n" "https://STAGING/admin/login"`
Expected: `200`（後台登入頁正常）

- [ ] **Step 4：靜態資源仍可長快取（未被 HTML 規則波及）**

Run: 從首頁原始碼挑一個 `/_nuxt/*.js`，`curl -sI "https://STAGING/_nuxt/<檔名>.js" | grep -i cache-control`
Expected: 仍為長快取（如 `max-age=...`），**不是** no-store。

- [ ] **Step 5：瀏覽器零破壞驗收（最重要）**

開瀏覽器 DevTools（Console + Network），逐頁確認 **Console 無任何 CSP 紅字**，且：
- [ ] 首頁、`/propaganda`、`/reserve-guide`、`/support`：**YouTube 影片可正常播放**
- [ ] banners / service-unit / knowledge 圖片正常顯示
- [ ] Clash Display 字型正常載入（Network 無被 CSP 擋）
- [ ] GA/GTM 正常（Network 看到送往 google-analytics / googletagmanager 的請求成功）
- [ ] 後台：TinyMCE / CKEditor / Tiptap 開啟與編輯正常、圖片上傳正常、各 CRUD 正常
- [ ] 前台 QA 富文本(v-html)內容正常呈現

- [ ] **Step 6：若出現雙重 CSP 或標頭未生效**

依 spec §1.3/§6-5：站台層級若另有舊 CSP/標頭且 `<remove>` 無法蓋掉 → 協調基礎架構移除站台層級該標頭，使本 web.config 為單一來源後重測。

> 全部綠燈才部署正式，並建議請對方**重掃驗收**。

---

## Task 10：風險接受項目留痕（驗收文件）

**Files:**
- 沿用 `docs/superpowers/specs/2026-06-03-security-remediation-design.md` §5

- [ ] **Step 1：確認 spec §5「風險接受」三項描述齊全**（COEP credentialless、Trusted Types Report-Only、內文公開 Email）。供回覆掃描單位作為低/參考項目之處置說明。
- [ ] **Step 2（可選）：** 如掃描單位要求逐項回覆表，依 spec §2 對應表整理成回覆文件。

---

## 對應檢查（spec → task）

| spec 需求 | Task |
|-----------|------|
| 高：CSP 缺指令 | 6 |
| 高：整數溢位 | 1,2,3,4 |
| 中：直接存取管理頁面 ×19 | 6(BlockAdminProbes) |
| 中：COEP/COOP/CORP | 6 |
| 低：frame-ancestors | 6(CSP) |
| 低：Trusted Types(Report-Only) | 6 |
| 低：多餘標頭(X-Powered-By/Server) | 6 |
| 低：可快取 SSL(API no-store) | 5 |
| 低：可快取 SSL(HTML 不快取) | 6 |
| 低：HSTS | 6 |
| 參考：Referrer-Policy | 6 |
| 參考：內文 Email | 10(風險說明) |
| 避免雙重 CSP | 5 |
| 不破壞驗收 | 8,9 |
