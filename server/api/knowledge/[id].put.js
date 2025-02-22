import { authenticate } from '~/server/utils/auth';
import { updateKnowledge, getKnowledgeById } from '~/server/models/knowledgeModel';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createError } from 'h3';
import { ensureUploadDir } from '~/server/utils/ensureUploadDir';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = event.context.params.id;
    
    // 確保上傳目錄存在
    await ensureUploadDir();

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

    let image_url = existingKnowledge.image_url;

    // 如果有新圖片，則更新
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.filename}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filePath = join(uploadDir, fileName);

      await writeFile(filePath, imageFile.data);
      console.log('✅ New file saved:', filePath);

      image_url = `/uploads/${fileName}`;
    }

    // 更新數據庫
    const data = await updateKnowledge(id, {
      know_category: parseInt(know_category),
      image_url
    });

    return { success: true, data };
  } catch (error) {
    console.error('❌ Update Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新知識失敗'
    });
  }
}); 