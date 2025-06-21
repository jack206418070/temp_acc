// 輸入驗證和清理工具
export class InputValidator {
  
  // 驗證和清理數字 ID
  static validateId(input) {
    // 移除所有非數字字符
    const cleaned = String(input).replace(/[^\d]/g, '');
    const num = parseInt(cleaned, 10);
    
    // 檢查是否為有效的正整數
    if (isNaN(num) || num <= 0 || num > 2147483647) { // SQL Server int max
      throw new Error('Invalid ID format');
    }
    
    return num;
  }

  // 檢測惡意 URL 模式
  static containsMaliciousPatterns(input) {
    const maliciousPatterns = [
      // URL schemes
      /^https?:\/\//i,
      /^ftp:\/\//i,
      /^file:\/\//i,
      /^javascript:/i,
      /^data:/i,
      /^vbscript:/i,
      
      // 網域名稱模式
      /[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/,
      
      // IP 地址模式
      /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
      
      // 路徑遍歷
      /\.\./,
      /\/\//,
      
      // 腳本注入
      /<script/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      
      // SQL 注入
      /union\s+select/i,
      /drop\s+table/i,
      /insert\s+into/i,
      /delete\s+from/i,
      
      // XSS 攻擊
      /on\w+\s*=/i,
      /javascript\s*:/i,
      /expression\s*\(/i,
      
      // 特殊字符組合
      /[<>'"&]/,
      /\x00-\x1f/,
      
      // Base64 編碼的惡意內容 (簡單檢測)
      /^[A-Za-z0-9+/=]{20,}$/
    ];

    const inputStr = String(input);
    return maliciousPatterns.some(pattern => pattern.test(inputStr));
  }

  // 驗證字符串長度
  static validateLength(input, maxLength = 50) {
    const str = String(input);
    if (str.length > maxLength) {
      throw new Error(`Input too long (max: ${maxLength})`);
    }
    return str;
  }

  // 清理用戶輸入
  static sanitizeInput(input) {
    if (typeof input !== 'string') {
      input = String(input);
    }

    // 移除危險字符
    return input
      .replace(/[<>'"&]/g, '') // HTML 特殊字符
      .replace(/javascript:/gi, '') // JavaScript 協議
      .replace(/on\w+\s*=/gi, '') // 事件處理器
      .replace(/\x00-\x1f/g, '') // 控制字符
      .trim();
  }

  // 驗證查詢參數
  static validateQueryParams(params) {
    const validatedParams = {};
    
    for (const [key, value] of Object.entries(params)) {
      // 檢查參數名稱
      if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
        throw new Error(`Invalid parameter name: ${key}`);
      }
      
      // 檢查參數值
      if (this.containsMaliciousPatterns(value)) {
        throw new Error(`Malicious content detected in parameter: ${key}`);
      }
      
      // 長度限制
      validatedParams[key] = this.validateLength(value, 200);
    }
    
    return validatedParams;
  }

  // 記錄可疑活動
  static logSuspiciousActivity(input, context, req) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'MALICIOUS_INPUT_DETECTED',
      input: String(input),
      context: context,
      url: req?.url || 'Unknown',
      method: req?.method || 'Unknown',
      userAgent: req?.headers?.['user-agent'] || 'Unknown',
      ip: req?.headers?.['x-forwarded-for'] || 
          req?.headers?.['x-real-ip'] || 
          req?.socket?.remoteAddress || 'Unknown',
      referer: req?.headers?.referer || 'None'
    };

    console.warn('🚨 Malicious input detected:', logEntry);
    
    // 在生產環境中，發送到安全監控系統
    if (process.env.NODE_ENV === 'production') {
      // TODO: 發送到 SIEM 系統
      // sendToSecurityMonitoring(logEntry);
    }
    
    return logEntry;
  }
}

// 便利函數
export function validateId(input) {
  return InputValidator.validateId(input);
}

export function containsMaliciousPatterns(input) {
  return InputValidator.containsMaliciousPatterns(input);
}

export function sanitizeInput(input) {
  return InputValidator.sanitizeInput(input);
}

export function validateQueryParams(params) {
  return InputValidator.validateQueryParams(params);
} 