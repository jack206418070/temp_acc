import { createError } from 'h3';
import { getKnowledgeById } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    
    // 獲取知識項目
    const knowledge = await getKnowledgeById(id);
    
    if (!knowledge || !knowledge.image_data) {
      throw createError({
        statusCode: 404,
        message: '找不到圖片'
      });
    }
    
    // 設置響應頭
    setHeader(event, 'Content-Type', knowledge.image_type || 'image/jpeg');
    
    // 返回圖片數據
    return knowledge.image_data;
  } catch (error) {
    console.error('Get Image Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '獲取圖片失敗'
    });
  }
}); 