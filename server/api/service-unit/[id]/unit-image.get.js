import { getServiceUnitById } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: '無效的 ID'
      });
    }

    const serviceUnit = await getServiceUnitById(id);
    
    if (!serviceUnit || !serviceUnit.unitImage) {
      throw createError({
        statusCode: 404,
        message: '找不到圖片'
      });
    }

    // 設置回應標頭為圖片
    setResponseHeaders(event, {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600'
    });

    return serviceUnit.unitImage;
  } catch (error) {
    console.error('❌ Get Unit Image Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '獲取圖片失敗'
    });
  }
}); 