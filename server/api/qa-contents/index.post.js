import { authenticate } from '~/server/utils/auth';
import { createQAContent } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 讀取請求內容
    const body = await readBody(event);
    console.log('Received POST body:', body);

    const { category_id, language_id, question, answer, sort_order } = body;
    
    // 驗證必要欄位
    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 創建 QA 內容
    const data = await createQAContent({
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Create QA Content Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建問答失敗'
    });
  }
}); 