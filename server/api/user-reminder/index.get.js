import { authenticate } from '~/server/utils/auth';
import { getUserReminder } from '~/server/models/userReminderModel';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    // await authenticate(event);

    // 獲取叮嚀內容
    const data = await getUserReminder();

    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error('❌ Get User Reminder Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取使用者叮嚀失敗'
    });
  }
}); 