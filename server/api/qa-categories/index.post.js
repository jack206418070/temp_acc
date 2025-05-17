import { authenticate } from '~/server/utils/auth';
import { createQACategory } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const body = await readBody(event);
    console.log('Received POST body:', body);

    const { parent_id, name } = body;
    
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const data = await createQACategory({
      parent_id: parent_id || null,
      name
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Create QA Category Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建問答類別失敗'
    });
  }
}); 