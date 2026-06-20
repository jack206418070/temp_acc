const FILE_SIGNATURES = {
  "image/jpeg": [[255, 216, 255]],
  "image/png": [[137, 80, 78, 71, 13, 10, 26, 10]],
  "image/gif": [
    [71, 73, 70, 56, 55, 97],
    [71, 73, 70, 56, 57, 97]
  ],
  "application/pdf": [[37, 80, 68, 70]]
};
function detectMimeFromBuffer(buffer) {
  if (!buffer || buffer.length < 4) return null;
  for (const [mimeType, signatures] of Object.entries(FILE_SIGNATURES)) {
    for (const sig of signatures) {
      if (sig.every((byte, i) => buffer[i] === byte)) {
        return mimeType;
      }
    }
  }
  return null;
}
function validateFileUpload(fileBuffer, clientMimeType, options = {}) {
  const { allowedTypes = [], maxSizeMB = 5 } = options;
  if (!fileBuffer || fileBuffer.length === 0) {
    return { valid: false, detectedType: null, error: "\u672A\u6536\u5230\u6A94\u6848\u8CC7\u6599" };
  }
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (fileBuffer.length > maxBytes) {
    return { valid: false, detectedType: null, error: `\u6A94\u6848\u5927\u5C0F\u4E0D\u80FD\u8D85\u904E ${maxSizeMB}MB` };
  }
  const detectedType = detectMimeFromBuffer(fileBuffer);
  if (!detectedType) {
    return { valid: false, detectedType: null, error: "\u7121\u6CD5\u8B58\u5225\u6A94\u6848\u683C\u5F0F\uFF0C\u8ACB\u4E0A\u50B3\u652F\u63F4\u7684\u683C\u5F0F" };
  }
  if (!allowedTypes.includes(detectedType)) {
    return {
      valid: false,
      detectedType,
      error: `\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B\uFF08${detectedType}\uFF09\uFF0C\u53EA\u5141\u8A31\uFF1A${allowedTypes.join("\u3001")}`
    };
  }
  if (clientMimeType && !allowedTypes.includes(clientMimeType)) {
    return {
      valid: false,
      detectedType,
      error: `\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B`
    };
  }
  if (clientMimeType && clientMimeType !== detectedType) {
    return {
      valid: false,
      detectedType,
      error: `\u6A94\u6848\u5167\u5BB9\u8207\u5BA3\u7A31\u683C\u5F0F\u4E0D\u7B26\uFF08\u5BA3\u7A31\uFF1A${clientMimeType}\uFF0C\u5BE6\u969B\uFF1A${detectedType}\uFF09`
    };
  }
  return { valid: true, detectedType };
}

export { validateFileUpload as v };
//# sourceMappingURL=fileValidation.mjs.map
