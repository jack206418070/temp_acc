import { authenticate } from '~/server/utils/auth';
import { getAllBanners } from '~/server/models/bannerModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    // await authenticate(event);

    const data = await getAllBanners();
    data.forEach(banner => {
      banner.imageData = banner.imageData.toString('base64');
    });
    return { success: true, data };
  } catch (error) {
    console.error('❌ Get All Banners Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取 Banner 列表失敗'
    });
  }
}); 