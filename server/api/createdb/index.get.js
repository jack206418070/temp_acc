import { initializeDatabase } from './config/initDb.js';
import { createError } from 'h3';


export default defineEventHandler(async (event) => {
  try {
    initializeDatabase().catch(error => {
      console.error('❌ 資料庫初始化失敗:', error);
      process.exit(1);
    });
    return { success: true, data };
  } catch (error) {
    console.error('Get Knowledge List Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '獲取知識列表失敗'
    });
  }
}); 