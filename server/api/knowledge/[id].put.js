import { createError } from 'h3';
import { updateKnowledge } from '~/server/models/knowledgeModel';

export default async function(event) {
  try {
    const id = event.context.params.id;
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
    
    // 驗證必要參數
    if (!title || !know_category) {
      throw createError({
        statusCode: 400,
        message: '缺少必要參數'
      });
    }
    
    // 處理圖片
    let imagePath = null;
    if (imageFile) {
      // 這裡可以添加圖片處理邏輯
      imagePath = imageFile.data;
    }
    
    // 更新知識
    const result = await updateKnowledge(
      parseInt(id),
      title,
      parseInt(know_category),
      imagePath
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