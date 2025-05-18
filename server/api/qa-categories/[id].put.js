import { authenticate } from '~/server/utils/auth';
import { updateQACategory } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const id = event.context.params.id;
    const body = await readBody(event);
    const { parent_id, name, name_en, name_vi, name_id, name_th } = body;

    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const data = await updateQACategory(id, {
      parent_id: parent_id || null,
      name,
      name_en,
      name_vi,
      name_id,
      name_th
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Update QA Category Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新問答類別失敗'
    });
  }
}); 