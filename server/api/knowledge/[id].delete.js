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

    // 獲取記錄以刪除相關文件
    const knowledge = await getKnowledgeById(id);
    if (!knowledge) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到要刪除的記錄'
      });
    }

    // 刪除文件
    try {
      const filePath = join(process.cwd(), 'public', knowledge.image_url);
      await unlink(filePath);
      console.log('✅ File deleted:', filePath);
    } catch (error) {
      console.error('❌ File delete error:', error);
      // 繼續執行，即使文件刪除失敗
    }

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