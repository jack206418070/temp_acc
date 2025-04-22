import { authenticate } from '~/server/utils/auth';
import { updateBannerOrder } from '~/server/models/bannerModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const body = await readBody(event);
    const { id, sortOrder } = body;

    if (!id || sortOrder === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要參數'
      });
    }

    const data = await updateBannerOrder(id, sortOrder);

    return { 
      success: true,
      data
    };
  } catch (error) {
    console.error('❌ Update Banner Order Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新 Banner 排序失敗'
    });
  }
}); 