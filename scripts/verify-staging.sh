#!/usr/bin/env bash
# 安全修復 staging 驗證腳本
# 用法: bash scripts/verify-staging.sh https://你的staging網域
# 需在部署了本分支 web.config 的 IIS 環境執行(本機 macOS 無 IIS 測不到標頭)。
set -u
BASE="${1:-}"
if [ -z "$BASE" ]; then echo "用法: bash scripts/verify-staging.sh https://STAGING"; exit 1; fi
BASE="${BASE%/}"
pass=0; fail=0
ok(){ echo "  ✅ $1"; pass=$((pass+1)); }
ng(){ echo "  ❌ $1"; fail=$((fail+1)); }

hdr(){ curl -sk -D - -o /dev/null "$1"; }                 # GET 並只取標頭
hdrval(){ hdr "$1" | grep -i "^$2:" | sed "s/^[^:]*: //I" | tr -d '\r'; }
hdrcount(){ hdr "$1" | grep -ci "^$2:"; }

echo "=== [1] HTML 首頁 $BASE/ ==="
CSPCOUNT=$(hdrcount "$BASE/" "content-security-policy")
[ "$CSPCOUNT" = "1" ] && ok "CSP 僅 1 個 (count=$CSPCOUNT)" || ng "CSP 數量異常 (count=$CSPCOUNT，應為 1；>1 表示與站台層級重複)"
hdrval "$BASE/" "content-security-policy" | grep -q "frame-ancestors 'self'" && ok "CSP 含 frame-ancestors 'self'" || ng "CSP 缺 frame-ancestors"
hdrval "$BASE/" "content-security-policy" | grep -q "default-src 'self'" && ok "CSP 含 default-src" || ng "CSP 缺 default-src"
hdrval "$BASE/" "content-security-policy" | grep -q "www.youtube.com" && ok "CSP 放行 YouTube" || ng "CSP 未放行 YouTube(影片會被擋!)"
[ -z "$(hdrval "$BASE/" "cross-origin-embedder-policy")" ] && ok "COEP 未設(刻意；COEP 會擋 YouTube iframe，風險接受)" || ng "不應有 COEP(會擋影片): $(hdrval "$BASE/" "cross-origin-embedder-policy")"
[ "$(hdrval "$BASE/" "cross-origin-opener-policy")" = "same-origin" ] && ok "COOP same-origin" || ng "COOP 缺"
[ "$(hdrval "$BASE/" "cross-origin-resource-policy")" = "same-origin" ] && ok "CORP same-origin" || ng "CORP 缺"
hdrval "$BASE/" "strict-transport-security" | grep -q "max-age=31536000" && ok "HSTS 長 max-age" || ng "HSTS 缺/不足"
hdrval "$BASE/" "referrer-policy" | grep -qi "strict-origin-when-cross-origin" && ok "Referrer-Policy" || ng "Referrer-Policy 缺"
[ -z "$(hdrval "$BASE/" "x-powered-by")" ] && ok "無 X-Powered-By" || ng "仍有 X-Powered-By"
[ -z "$(hdrval "$BASE/" "server")" ] && ok "無 Server 標頭" || ng "仍有 Server 標頭: $(hdrval "$BASE/" "server")"
hdrval "$BASE/" "cache-control" | grep -q "no-store" && ok "HTML no-store" || ng "HTML 未 no-store(outbound rule 可能未觸發，見備註)"

echo "=== [2] API $BASE/api/announcements ==="
ACSP=$(hdrcount "$BASE/api/announcements" "content-security-policy")
echo "  ℹ️ API CSP 標頭數量 = $ACSP (若 >1 表示 Node 與 web.config 各送一份；JSON 無害但可選擇清掉)"
hdrval "$BASE/api/announcements" "cache-control" | grep -q "no-store" && ok "API no-store" || ng "API 未 no-store"
[ -z "$(hdrval "$BASE/api/announcements" "x-powered-by")" ] && ok "API 無 X-Powered-By" || ng "API 仍有 X-Powered-By"

echo "=== [3] 管理頁面探測應 404 / 正常後台應可進 ==="
for p in admin.php admin.asp admin.aspx admin.jsp admin.html admin.cgi admin.pl admin.txt; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE/$p")
  [ "$code" = "404" ] && ok "/$p → 404" || ng "/$p → $code (應為 404)"
done
LOGIN=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE/admin/login")
[ "$LOGIN" = "200" ] && ok "/admin/login → 200" || ng "/admin/login → $LOGIN (後台應正常)"

echo "=== [4] 靜態資源應維持長快取 ==="
ASSET=$(curl -sk "$BASE/" | grep -oE "/_nuxt/[A-Za-z0-9_.-]+\.js" | head -1)
if [ -n "$ASSET" ]; then
  hdrval "$BASE$ASSET" "cache-control" | grep -q "max-age" && ok "$ASSET 長快取" || ng "$ASSET 未長快取(被 no-store 波及?)"
else echo "  ⚠️ 找不到 /_nuxt 資源連結，略過"; fi

echo "=== [5] 整數溢位參數應回 400 ==="
for q in "category=99999999999" "category=abc"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE/api/knowledge?$q")
  [ "$code" = "400" ] && ok "/api/knowledge?$q → 400" || ng "/api/knowledge?$q → $code (應為 400)"
done

echo
echo "====== 結果: 通過 $pass / 失敗 $fail ======"
echo "備註:"
echo "  - 若 [1] HTML no-store 失敗: IIS outbound rule 對靜態檔可能未觸發，需改在站台層級對 text/html 設快取，或接受(僅 /qa_test2 類 HTML)。"
echo "  - 若 [1] CSP count>1 或 [2] API CSP>1: 站台層級或 Node 另送了 CSP。HTML 重複需協調移除站台層級舊標頭; API 重複無害(JSON)，可選擇於 nuxt.config routeRules 對 /api 關閉 nuxt-security 標頭。"
echo "  - 瀏覽器人工驗收(DevTools Console 零 CSP 紅字): 首頁/propaganda/reserve-guide/support 的 YouTube 影片、圖片、Clash 字型、GA/GTM、後台 TinyMCE/CKEditor 編輯與上傳、前台 v-html 富文本。"
[ "$fail" = "0" ] && exit 0 || exit 1
