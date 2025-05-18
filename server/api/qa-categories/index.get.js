import { getAllQACategories } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    const data = await getAllQACategories();
    return { success: true, data };
  } catch (error) {
    console.error('Get QA Categories List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取問答類別列表失敗'
    });
  }
}); 