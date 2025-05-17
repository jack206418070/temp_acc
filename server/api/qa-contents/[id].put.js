import { authenticate } from '~/server/utils/auth';
import { updateQAContent } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const id = event.context.params.id;
    const body = await readBody(event);
    const { category_id, language_id, question, answer, sort_order } = body;

    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const data = await updateQAContent(id, {
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Update QA Content Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新問答失敗'
    });
  }
}); 