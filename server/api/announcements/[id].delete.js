import { authenticate } from '~/server/utils/auth';
import { deleteAnnouncement } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 獲取公告 ID
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少公告 ID'
      });
    }

    // 刪除公告
    await deleteAnnouncement(id);

    return {
      success: true
    };
  } catch (error) {
    console.error('❌ Delete Announcement Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '刪除公告失敗'
    });
  }
}); 