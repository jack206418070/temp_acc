import { authenticate } from '~/server/utils/auth';
import { deleteAnnouncementImage } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 獲取圖片 ID
    const image_id = event.context.params.id;
    if (!image_id) {
      throw createError({
        statusCode: 400,
        message: '缺少圖片 ID'
      });
    }

    // 刪除圖片
    await deleteAnnouncementImage(image_id);

    return {
      success: true,
      message: '圖片刪除成功'
    };
  } catch (error) {
    console.error('❌ Delete Announcement Image Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '刪除公告圖片失敗'
    });
  }
}); 