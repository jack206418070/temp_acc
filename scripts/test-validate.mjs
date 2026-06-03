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
