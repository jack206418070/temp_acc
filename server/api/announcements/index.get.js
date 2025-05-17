import { authenticate } from '~/server/utils/auth';
import { getAllAnnouncements } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {

    // 獲取所有公告
    const announcements = await getAllAnnouncements();

    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error('❌ Get Announcements Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取公告列表失敗'
    });
  }
}); 