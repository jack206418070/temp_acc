import { getServiceUnitById } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';
import { InputValidator } from '~/server/utils/input-validation';

export default defineEventHandler(async (event) => {
  try {
    // 獲取原始 ID 參數
    const rawId = event.context.params.id;
    
    // 檢測惡意模式
    if (InputValidator.containsMaliciousPatterns(rawId)) {
      // 記錄可疑活動
      InputValidator.logSuspiciousActivity(rawId, 'service-unit-id', event.node.req);
      
      // 返回 404 讓弱點掃描工具認為請求被拒絕
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found'
      });
    }
    
    // 驗證和清理 ID
    const id = InputValidator.validateId(rawId);
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的 ID'
      });
    }

    // 獲取服務單位資料
    const serviceUnit = await getServiceUnitById(id);
    
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該服務單位'
      });
    }

    return {
      success: true,
      data: serviceUnit
    };
  } catch (error) {
    console.error('❌ Get Service Unit Error:', error);
    
    // 如果是輸入驗證錯誤，返回 404 防止資訊洩露
    if (error.message && error.message.includes('Invalid') || 
        error.message && error.message.includes('Malicious')) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resource not found'
      });
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取服務單位資料失敗'
    });
  }
}); 