import { getAllLanguages } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    const data = await getAllLanguages();
    return { success: true, data };
  } catch (error) {
    console.error('Get Languages List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取語言列表失敗'
    });
  }
}); 