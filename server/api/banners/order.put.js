import { authenticate } from '~/server/utils/auth';
import { updateBannerOrder } from '~/server/models/bannerModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 獲取請求資料
    const { bannerId, targetOrder } = await readBody(event);

    // 驗證必要欄位
    if (!bannerId || targetOrder === undefined) {
      return createError({
        statusCode: 400,
        message: '缺少必要欄位'
      });
    }

    // 更新排序
    const result = await updateBannerOrder(bannerId, targetOrder);

    return {
      success: true,
      message: '排序更新成功',
      data: result
    };
  } catch (error) {
    console.error('更新排序失敗:', error);
    return createError({
      statusCode: error.statusCode || 500,
      message: error.message || '更新排序失敗'
    });
  }
}); 