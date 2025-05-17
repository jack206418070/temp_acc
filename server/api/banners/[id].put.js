import { authenticate } from '~/server/utils/auth';
import { updateBanner } from '~/server/models/bannerModel';
import { createError, readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的 Banner ID'
      });
    }

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: '未收到表單資料' });

    // 提取欄位
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const description = formData.find(f => f.name === 'description')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const isActive = formData.find(f => f.name === 'is_active')?.data.toString() == '1';

    // 準備更新資料
    const updateData = {
      title,
      description,
      isActive
    };

    if (imageFile) {
      updateData.imageData = imageFile.data;  // ✅ 原始 Buffer
      updateData.imageType = imageFile.type;  // ✅ 原始 MIME type（如 image/png）
    }

    // 寫入資料庫
    const data = await updateBanner(id, updateData);

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('❌ Update Banner Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新 Banner 失敗'
    });
  }
});