import { authenticate } from '~/server/utils/auth';
import { createQA } from '~/server/models/qaModel';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 讀取請求內容
    const body = await readBody(event);
    console.log('Received POST body:', body);

    const { question, answer, category } = body;
    
    // 驗證必要欄位
    if (!question || !answer || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要欄位'
      });
    }

    // 創建 QA
    const data = await createQA(question, answer, category);
    return { success: true, data };
  } catch (error) {
    console.error('Create QA Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '創建問答失敗'
    });
  }
}); 