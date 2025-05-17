import { authenticate } from '~/server/utils/auth';
import { updateUserReminder } from '~/server/models/userReminderModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    // 獲取請求內容
    const body = await readBody(event);
    if (!body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: '內容不能為空'
      });
    }

    // 更新叮嚀內容
    const data = await updateUserReminder(body.content);

    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error('❌ Update User Reminder Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '更新使用者叮嚀失敗'
    });
  }
}); 