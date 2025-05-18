import { authenticate } from '~/server/utils/auth';
import { saveAnnouncementImage } from '~/server/models/announcementModel';
import { createError, readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData || !Array.isArray(formData) || formData.length === 0) {
      console.error('未收到表單資料或格式錯誤');
      throw createError({
        statusCode: 400,
        message: '未收到表單資料或格式錯誤'
      });
    }

    // 提取欄位
    const announcementIdField = formData.find(f => f.name === 'announcement_id');
    const imageIdField = formData.find(f => f.name === 'image_id');
    const imageField = formData.find(f => f.name === 'image');

    const missingFields = [];
    if (!announcementIdField?.data) missingFields.push('announcement_id');
    if (!imageIdField?.data) missingFields.push('image_id');
    if (!imageField?.data) missingFields.push('image');

    if (missingFields.length > 0) {
      console.error('缺少必要欄位:', missingFields);
      throw createError({
        statusCode: 400,
        message: `缺少必要欄位: ${missingFields.join(', ')}`
      });
    }

    const announcement_id = parseInt(announcementIdField.data.toString());
    const image_id = imageIdField.data.toString();
    const imageBuffer = imageField.data;

    console.log(`收到圖片 image_id: ${image_id}, 類型: ${imageField.type}, 大小: ${(imageBuffer.length / 1024).toFixed(2)} KB`);

    // 儲存圖片資料
    await saveAnnouncementImage(
      announcement_id,
      image_id,
      imageBuffer
    );

    return {
      success: true,
      data: {
        announcement_id,
        image_id
      }
    };
  } catch (error) {
    console.error('❌ Save Announcement Image Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '保存公告圖片失敗'
    });
  }
});