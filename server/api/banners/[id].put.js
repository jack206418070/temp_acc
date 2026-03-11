import { authenticate } from '~/server/utils/auth';
import { createBanner } from '~/server/models/bannerModel';
import { createError, readMultipartFormData } from 'h3';
import { validateFileUpload } from '~/server/utils/fileValidation';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: 'No form data' });

    // 擷取欄位
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const description = formData.find(f => f.name === 'description')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const sortOrder = parseInt(formData.find(f => f.name === 'sortOrder')?.data.toString() || '0');
    const isActive = formData.find(f => f.name === 'is_active')?.data.toString() === '1';

    if (!title || !imageFile?.data) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位（title 或 image）'
      });
    }

    const validation = validateFileUpload(imageFile.data, imageFile.type, {
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
      maxSizeMB: 5
    });
    if (!validation.valid) {
      throw createError({ statusCode: 400, statusMessage: validation.error });
    }

    console.log(`✅ 收到圖片 ${imageFile.filename || ''} (${imageFile.type}), 大小 ${(imageFile.data.length / 1024).toFixed(2)} KB`);

    // 直接儲存原始圖片 Buffer
    const data = await createBanner({
      title,
      description,
      imageData: imageFile.data,
      imageType: imageFile.type,
      sortOrder,
      isActive
    });

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('❌ Create Banner Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建 Banner 失敗'
    });
  }
});