import { getKnowledgeById } from '~/server/models/knowledgeModel';
import { verifyToken } from '~/server/utils/auth';
import { getRequestHeader, getRouterParam, createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    // 驗證 Token
    const token = getRequestHeader(event, 'authorization')?.split(' ')[1];
    if (!token) {
      throw createError({
        statusCode: 401,
        message: '未授權的請求'
      });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      throw createError({
        statusCode: 401,
        message: '無效的 Token'
      });
    }

    // 獲取路徑參數
    const id = getRouterParam(event, 'id');
    
    // 從資料庫獲取知識庫資料
    const result = await getKnowledgeById(id);
    
    if (!result) {
      throw createError({
        statusCode: 404,
        message: '找不到該筆資料'
      });
    }

    return {
      success: true,
      data: {
        ...result,
        image_url: `data:${result.image_type};base64,${result.image_data}`
      }
    };

  } catch (error) {
    console.error('獲取知識庫資料失敗:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || '獲取資料失敗'
    });
  }
});
