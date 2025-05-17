import { authenticate } from '~/server/utils/auth';
import { deleteServiceUnit } from '~/server/models/serviceUnitModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少 ID'
      });
    }

    // 刪除服務單位
    const data = await deleteServiceUnit(id);

    return { 
      success: true, 
      data
    };
  } catch (error) {
    console.error('❌ Delete Service Unit Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '刪除服務單位失敗'
    });
  }
}); 