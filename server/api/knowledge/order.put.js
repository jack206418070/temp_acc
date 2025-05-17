import { createError } from 'h3';
import { updateKnowledgeOrder } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id, newOrder, category } = body;
    
    if (!id || newOrder === undefined || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要參數'
      });
    }
    
    await updateKnowledgeOrder(id, newOrder, category);
    return { success: true, message: '順序更新成功' };
  } catch (error) {
    console.error('Update Knowledge Order Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '更新順序失敗'
    });
  }
}); 