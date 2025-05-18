import { authenticate } from '~/server/utils/auth';
import { deleteQAContent } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    await authenticate(event);

    const id = event.context.params.id;
    await deleteQAContent(id);
    return { success: true, message: '刪除成功' };
  } catch (error) {
    console.error('Delete QA Content Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '刪除問答失敗'
    });
  }
}); 