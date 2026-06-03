import { createError } from 'h3';
import { updateKnowledge } from '~/server/models/knowledgeModel';
import { validateFileUpload } from '~/server/utils/fileValidation';

export default async function(event) {
  try {
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({
        statusCode: 400,
        message: '無效的 ID'
      });
    }
    const formData = await readMultipartFormData(event);
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: '無效的請求格式'
      });
    }
    
    // 從 formData 中提取數據
    const title = formData.find(f => f.name === 'title')?.data.toString();
    const know_category = formData.find(f => f.name === 'know_category')?.data.toString();
    const imageFile = formData.find(f => f.name === 'image');
    const image_url = formData.find(f => f.name === 'image_url')?.data.toString();
    
    // 驗證必要參數
    if (!title || !know_category) {
      throw createError({
        statusCode: 400,
        message: '缺少必要參數'
      });
    }

    // know_category 為分類 FK(>=1)，加 INT 溢位防護
    if (parsePositiveInt(know_category) === null) {
      throw createError({
        statusCode: 400,
        message: '無效的分類'
      });
    }
    
    // 處理圖片
    let imagePath = null;
    if (imageFile?.data) {
      const validation = validateFileUpload(imageFile.data, imageFile.type, {
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxSizeMB: 5
      });
      if (!validation.valid) {
        throw createError({ statusCode: 400, message: validation.error });
      }
      imagePath = imageFile.data;
    }
    
    // 更新知識
    const result = await updateKnowledge(
      parseInt(id),
      title,
      parseInt(know_category),
      imagePath,
      image_url
    );
    
    return result;
  } catch (error) {
    console.error('Update Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '更新失敗'
    });
  }
} 