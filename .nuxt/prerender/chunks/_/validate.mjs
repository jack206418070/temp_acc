const INT_MAX = 2147483647;
function parsePositiveInt(value) {
  if (value === void 0 || value === null) return null;
  const s = String(value).trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isInteger(n) || n < 1 || n > INT_MAX) return null;
  return n;
}

export { parsePositiveInt as p };
//# sourceMappingURL=validate.mjs.map
