// 把 deploy/web.config 複製進 .output/(覆蓋 iis preset 產生的預設版本)
// 註：web.config 放在 deploy/ 而非專案根目錄，是為了避免 nitro 的 iis preset
//     去 parse 根目錄 web.config(會要求 xml2js 且可能忽略我們的設定)。
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const src = 'deploy/web.config';
const dest = '.output/web.config';

if (!existsSync(src)) {
  console.error('❌ 找不到來源 deploy/web.config');
  process.exit(1);
}
if (!existsSync('.output')) {
  mkdirSync('.output', { recursive: true });
}
copyFileSync(src, dest);
console.log('✅ 已複製 web.config →', dest);
