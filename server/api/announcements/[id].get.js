import { authenticate } from '~/server/utils/auth';
import { getAnnouncementById } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 獲取公告 ID
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的公告 ID'
      });
    }

    // 獲取公告資訊
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到指定的公告'
      });
    }

    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error('❌ Get Announcement Detail Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取公告詳細資訊失敗'
    });
  }
}); 