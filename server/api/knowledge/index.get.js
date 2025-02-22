import { createError } from 'h3';
import { getAllKnowledge } from '~/server/models/knowledgeModel';

export default defineEventHandler(async (event) => {
  try {
    const data = await getAllKnowledge();
    return { success: true, data };
  } catch (error) {
    console.error('Get Knowledge List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取知識列表失敗'
    });
  }
}); 