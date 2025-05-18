import { authenticate } from '~/server/utils/auth';
import { updateQA } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const id = event.context.params.id;
    const body = await readBody(event);
    const { question, answer, category } = body;

    if (!question || !answer || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    const data = await updateQA(id, question, answer, category);
    return { success: true, data };
  } catch (error) {
    console.error('Update QA Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新問答失敗'
    });
  }
}); 