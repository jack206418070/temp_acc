import { authenticate } from '~/server/utils/auth';
import { createAnnouncement, saveAnnouncementImage } from '~/server/models/announcementModel';
import { createError } from 'h3';
import { createCanvas, loadImage } from 'canvas';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析請求數據
    const body = await readBody(event);

    // 驗證必填欄位
    if (!body.title || !body.category || !body.publish_date || !body.activity_start_date || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 保存公告到數據庫
    const announcementData = {
      title: body.title,
      category: body.category,
      publish_date: body.publish_date,
      activity_start_date: body.activity_start_date,
      content: body.content,
      link: body.link || null,
      linkTitle: body.linkTitle || null
    };

    const announcement = await createAnnouncement(announcementData);

    return { 
      success: true, 
      data: announcement
    };
  } catch (error) {
    console.error('❌ Create Announcement Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建公告失敗'
    });
  }
}); 