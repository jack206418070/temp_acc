import { authenticate } from '~/server/utils/auth';
import { deleteKnowledge, getKnowledgeById } from '~/server/models/knowledgeModel';
import { createError } from 'h3';
import { unlink } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    // 驗證
    await authenticate(event);

    const id = event.context.params.id;

    // 刪除數據庫記錄
    await deleteKnowledge(id);
    return { success: true, message: '刪除成功' };
  } catch (error) {
    console.error('❌ Delete Knowledge Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '刪除知識失敗'
    });
  }
}); 