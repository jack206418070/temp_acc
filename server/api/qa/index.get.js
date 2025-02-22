import { getAllQA, createQA } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    const data = await getAllQA();
    return { success: true, data };
  } catch (error) {
    console.error('Get QA List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取問答列表失敗'
    });
  }
}); 