import { authenticate } from '~/server/utils/auth';
import { updateKnowledge, getKnowledgeById } from '~/server/models/knowledgeModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = event.context.params.id;

    // 解析 multipart form data
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error('No form data');

    const know_category = formData.find(f => f.name === 'know_category')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');

    if (!know_category) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 獲取現有記錄
    const existingKnowledge = await getKnowledgeById(id);
    if (!existingKnowledge) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到要更新的記錄'
      });
    }

    // 準備更新數據
    const updateData = {
      know_category: parseInt(know_category)
    };

    // 如果有新圖片，則更新圖片數據
    if (imageFile) {
      updateData.imageBuffer = imageFile.data;
      updateData.imageType = imageFile.type || 'image/jpeg';
    }

    // 更新數據庫
    const data = await updateKnowledge(id, updateData);

    return { success: true, data };
  } catch (error) {
    console.error('❌ Update Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新知識失敗'
    });
  }
}); 