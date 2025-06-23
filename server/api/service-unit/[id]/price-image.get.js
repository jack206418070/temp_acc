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
      InputValidator.logSuspiciousActivity(rawId, 'price-image-id', event.node.req);
      
      throw createError({
        statusCode: 400,
        statusMessage: '無效的參數格式'
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

    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該服務單位'
      });
    }

    if (!serviceUnit.priceImage) {
      throw createError({
        statusCode: 404,
        statusMessage: '此服務單位沒有價格圖片'
      });
    }

    // 設置回應標頭為圖片
    setResponseHeaders(event, {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache'
    });

    return serviceUnit.priceImage;
  } catch (error) {
    console.error('❌ Get Service Unit Price Image Error:', error);
    
    // 如果是輸入驗證錯誤，不要洩露詳細資訊
    if (error.message && error.message.includes('Invalid') || 
        error.message && error.message.includes('Malicious')) {
      throw createError({
        statusCode: 400,
        statusMessage: '請求參數無效'
      });
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取價格圖片失敗'
    });
  }
}); 