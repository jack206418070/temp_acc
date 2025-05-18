import { getServiceUnitById } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
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
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取價格圖片失敗'
    });
  }
}); 