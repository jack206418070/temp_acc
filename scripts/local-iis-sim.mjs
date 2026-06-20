// 本機 IIS 層模擬 proxy(僅供開發驗證，非部署用)
// 讀取 repo 根 web.config，把其 customHeaders(add/remove) 套到回應，
// 並模擬 BlockAdminProbes(/admin.*→404) 與 NoStoreHtml(text/html 不快取)。
// 用法:
//   1) 先啟動 Nuxt:  PORT=3000 node .output/server/index.mjs
//   2) 再啟動本檔:   node scripts/local-iis-sim.mjs   (預設 :8080 → 轉發 :3000)
//   3) 瀏覽器開 http://localhost:8080 做肉眼驗收，或 bash scripts/verify-staging.sh http://localhost:8080
// 注意: 這只模擬 IIS「標頭/404/快取」行為，真實 IIS 的 removeServerHeader、
//       與站台層級重複 CSP 等仍須在實際 IIS 環境最終確認。
import http from 'node:http';
import { readFileSync } from 'node:fs';

const UPSTREAM = process.env.UPSTREAM || 'http://localhost:3000';
const PORT = Number(process.env.PROXY_PORT || 8080);
const up = new URL(UPSTREAM);

function decode(s) {
  return s.replace(/&#39;/g, "'").replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

const xml = readFileSync(new URL('../web.config', import.meta.url), 'utf8');
const skip = (process.env.SKIP_HEADERS || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
const addHeaders = [...xml.matchAll(/<add\s+name="([^"]+)"\s+value="([^"]*)"\s*\/>/g)]
  .map(m => [m[1], decode(m[2])])
  .filter(([name]) => !skip.includes(name.toLowerCase()));
if (skip.length) console.log('SKIP_HEADERS(實驗用，略過):', skip.join(', '));
const removeHeaders = [...xml.matchAll(/<remove\s+name="([^"]+)"\s*\/>/g)]
  .map(m => m[1].toLowerCase());

console.log('套用 web.config customHeaders:');
console.log('  remove:', removeHeaders.join(', '));
for (const [n, v] of addHeaders) console.log(`  add: ${n}: ${v.length > 70 ? v.slice(0, 70) + '…' : v}`);

const server = http.createServer((req, res) => {
  const pathOnly = req.url.split('?')[0].replace(/^\//, '');
  // BlockAdminProbes: ^admin\.[a-zA-Z0-9]+$
  if (/^admin\.[a-zA-Z0-9]+$/i.test(pathOnly)) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }
  const proxyReq = http.request(
    { hostname: up.hostname, port: up.port, path: req.url, method: req.method,
      headers: { ...req.headers, host: up.host } },
    (proxyRes) => {
      const headers = { ...proxyRes.headers };
      for (const name of removeHeaders) delete headers[name];
      // 統一由 web.config 來源管理 CSP，移除上游(nuxt-security)可能自帶的
      delete headers['content-security-policy'];
      delete headers['content-security-policy-report-only'];
      for (const [name, value] of addHeaders) headers[name] = value;
      // NoStoreHtml outbound rule: text/html → 不快取
      if (/^text\/html/i.test(proxyRes.headers['content-type'] || '')) {
        headers['cache-control'] = 'no-store, no-cache, must-revalidate';
        headers['pragma'] = 'no-cache';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res);
    }
  );
  proxyReq.on('error', (e) => { res.writeHead(502); res.end('upstream error: ' + e.message); });
  req.pipe(proxyReq);
});

server.listen(PORT, () => console.log(`\n✅ local IIS sim proxy: http://localhost:${PORT} → ${UPSTREAM}\n`));
