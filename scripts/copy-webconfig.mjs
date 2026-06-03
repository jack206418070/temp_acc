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
