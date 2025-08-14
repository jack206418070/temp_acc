import { getAnnouncementImages } from '~/server/models/announcementModel';
import { createError } from 'h3';
import sql from 'mssql';

export default defineEventHandler(async (event) => {
  try {
    // 獲取附件 ID
    const attachmentId = parseInt(event.context.params.id);
    if (!attachmentId || isNaN(attachmentId)) {
      throw createError({
        statusCode: 400,
        statusMessage: '無效的附件 ID'
      });
    }

    // 獲取單一附件
    const { getConnection } = await import('~/server/config/db.js');
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, attachmentId)
      .query(`
        SELECT 
          id,
          image_id,
          image_content,
          file_type,
          original_filename
        FROM AnnouncementImages
        WHERE id = @id AND is_deleted = 0
      `);

    const attachment = result.recordset[0];
    if (!attachment) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到指定的附件'
      });
    }

    // 設定正確的 Content-Type
    const contentType = attachment.file_type === 'pdf' 
      ? 'application/pdf' 
      : 'image/jpeg';

    // 設定下載檔名
    const filename = attachment.original_filename || 
      `attachment-${attachment.id}.${attachment.file_type === 'pdf' ? 'pdf' : 'jpg'}`;

    // 設定響應頭
    setHeader(event, 'Content-Type', contentType);
    setHeader(event, 'Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    setHeader(event, 'Cache-Control', 'public, max-age=31536000'); // 快取 1 年

    // 直接回傳二進制資料
    return attachment.image_content;
    
  } catch (error) {
    console.error('❌ Download Attachment Error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '下載附件失敗'
    });
  }
});