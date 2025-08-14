import { getAnnouncementById } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 獲取公告 ID
    const id = parseInt(event.context.params.id);
    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的公告 ID'
      });
    }

    // 獲取公告資訊（包含附件）
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到指定的公告'
      });
    }

    // 處理附件資料，轉換為前端可用格式
    if (announcement.images && announcement.images.length > 0) {
      announcement.images = announcement.images.map(image => ({
        id: image.id,
        image_id: image.image_id,
        file_type: image.file_type || 'image',
        original_filename: image.original_filename,
        image_content: {
          data: Array.from(image.image_content) // 轉換為陣列格式
        },
        created_at: image.created_at
      }));
    }

    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error('❌ Get Public Announcement Detail Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取公告詳細資訊失敗'
    });
  }
});