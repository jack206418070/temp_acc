import { authenticate } from '~/server/utils/auth';
import { createKnowledge } from '~/server/models/knowledgeModel';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createError } from 'h3';
import { ensureUploadDir } from '~/server/utils/ensureUploadDir';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 確保上傳目錄存在
    await ensureUploadDir();

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

    // 生成唯一的文件名
    const fileName = `${Date.now()}-${imageFile.filename}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);

    // 保存文件
    await writeFile(filePath, imageFile.data);
    console.log('✅ File saved:', filePath);

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