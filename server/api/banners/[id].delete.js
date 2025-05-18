import { authenticate } from '~/server/utils/auth';
import { deleteBanner } from '~/server/models/bannerModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的 Banner ID'
      });
    }

    await deleteBanner(id);

    return { 
      success: true,
      message: '刪除成功'
    };
  } catch (error) {
    console.error('❌ Delete Banner Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '刪除 Banner 失敗'
    });
  }
}); 