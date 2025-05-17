import { authenticate } from '~/server/utils/auth';
import { updateAnnouncement } from '~/server/models/announcementModel';
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

    // 解析請求數據
    const body = await readBody(event);

    // 驗證必填欄位
    if (!body.title || !body.category || !body.publish_date || !body.activity_start_date || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 更新公告
    const data = await updateAnnouncement(id, {
      title: body.title,
      category: body.category,
      publish_date: body.publish_date,
      activity_start_date: body.activity_start_date,
      content: body.content,
      linkTitle: body.linkTitle || null,
      link: body.link || null
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('❌ Update Announcement Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新公告失敗'
    });
  }
}); 