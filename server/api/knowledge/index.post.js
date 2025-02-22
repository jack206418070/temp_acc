import { authenticate } from '~/server/utils/auth';
import { createKnowledge } from '~/server/models/knowledgeModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);


    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error('No form data');

    const know_category = formData.find(f => f.name === 'know_category')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');

    if (!know_category || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 獲取圖片類型
    const imageType = imageFile.type || 'image/jpeg';


    // 保存到數據庫
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: imageFile.data,
      imageType: imageType
    });

    return { success: true, data };
  } catch (error) {
    console.error('❌ Create Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建知識失敗'
    });
  }
}); 