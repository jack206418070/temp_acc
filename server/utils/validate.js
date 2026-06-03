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
