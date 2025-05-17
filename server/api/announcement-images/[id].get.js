import { authenticate } from '~/server/utils/auth';
import { getAnnouncementImages } from '~/server/models/announcementModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {

    // 獲取公告 ID
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少公告 ID'
      });
    }

    // 獲取公告圖片
    const images = await getAnnouncementImages(id);

    return {
      success: true,
      data: images.map(image => ({
        id: image.id,
        image_content: image.image_content.toString('base64')
      }))
    };
  } catch (error) {
    console.error('❌ Get Announcement Images Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取公告圖片失敗'
    });
  }
}); 