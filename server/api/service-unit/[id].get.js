import { getServiceUnitById } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 從 URL 參數中獲取 ID(含 INT 溢位防護)
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, message: '無效的 ID' });
    }

    // 獲取服務單位資料
    const serviceUnit = await getServiceUnitById(id);
    
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        message: '找不到該服務單位'
      });
    }

    return {
      success: true,
      data: serviceUnit
    };
  } catch (error) {
    console.error('❌ Get Service Unit Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '獲取服務單位資料失敗'
    });
  }
}); 