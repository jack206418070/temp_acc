import { createError } from 'h3';
import { getAllKnowledge } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    // 獲取查詢參數
    const query = getQuery(event);
    const category = query.category;
    const includeImage = query.includeImage === 'true';
    
    const data = await getAllKnowledge(category, includeImage);
    return { success: true, data };
  } catch (error) {
    console.error('Get Knowledge List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取知識列表失敗'
    });
  }
}); 