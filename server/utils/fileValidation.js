// 支援格式與對應 magic bytes
const FILE_SIGNATURES = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png':  [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif':  [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]
  ],
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]],
};

/**
 * 比對 buffer 前幾 bytes，回傳真實 MIME type 或 null
 * @param {Buffer} buffer
 * @returns {string|null}
 */
export function detectMimeFromBuffer(buffer) {
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

/**
 * 完整驗證上傳檔案
 * @param {Buffer} fileBuffer - 檔案資料
 * @param {string} clientMimeType - client 傳來的 MIME type
 * @param {{ allowedTypes: string[], maxSizeMB?: number }} options
 * @returns {{ valid: boolean, detectedType: string|null, error?: string }}
 */
export function validateFileUpload(fileBuffer, clientMimeType, options = {}) {
  const { allowedTypes = [], maxSizeMB = 5 } = options;

  if (!fileBuffer || fileBuffer.length === 0) {
    return { valid: false, detectedType: null, error: '未收到檔案資料' };
  }

  // 檢查檔案大小
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (fileBuffer.length > maxBytes) {
    return { valid: false, detectedType: null, error: `檔案大小不能超過 ${maxSizeMB}MB` };
  }

  // 偵測真實 MIME type（magic bytes）
  const detectedType = detectMimeFromBuffer(fileBuffer);

  if (!detectedType) {
    return { valid: false, detectedType: null, error: '無法識別檔案格式，請上傳支援的格式' };
  }

  // 確認真實格式在白名單內
  if (!allowedTypes.includes(detectedType)) {
    return {
      valid: false,
      detectedType,
      error: `不支援的檔案類型（${detectedType}），只允許：${allowedTypes.join('、')}`
    };
  }

  // 確認 client 宣稱的 MIME type 與實際簽章一致（防止偽造）
  if (clientMimeType && !allowedTypes.includes(clientMimeType)) {
    return {
      valid: false,
      detectedType,
      error: `不支援的檔案類型`
    };
  }

  if (clientMimeType && clientMimeType !== detectedType) {
    return {
      valid: false,
      detectedType,
      error: `檔案內容與宣稱格式不符（宣稱：${clientMimeType}，實際：${detectedType}）`
    };
  }

  return { valid: true, detectedType };
}
