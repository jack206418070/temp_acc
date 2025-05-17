import { authenticate } from '~/server/utils/auth';
import { createKnowledge } from '~/server/models/knowledgeModel';
import { createError, readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: 'No form data' });

    const know_category = formData.find(f => f.name === 'know_category')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const image_url = formData.find(f => f.name === 'image_url')?.data.toString();

    if (!know_category || !imageFile?.data) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const originalSizeKB = (imageFile.data.length / 1024).toFixed(2);
    console.log(`📷 收到圖片：${imageFile.filename || ''}`);
    console.log(`✅ 類型：${imageFile.type}`);
    console.log(`✅ 原始大小：${originalSizeKB} KB`);

    // 保存到資料庫
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: imageFile.data,
      imageType: imageFile.type,
      title: title,
      image_url: image_url || null
    });

    return {
      success: true,
      data,
      imageInfo: {
        originalSize: `${originalSizeKB} KB`,
        compressedSize: null,
        compressionRatio: null
      }
    };
  } catch (error) {
    console.error('❌ Create Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建知識失敗'
    });
  }
});