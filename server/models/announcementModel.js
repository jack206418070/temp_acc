import sql from 'mssql';
import { getConnection } from '../config/db.js';

// 創建公告
export async function createAnnouncement({
  publish_date,
  activity_start_date,
  category,
  content,
  title,
  link,
  linkTitle,
  image_id
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('publish_date', sql.VarChar(10), publish_date)
      .input('activity_start_date', sql.VarChar(10), activity_start_date)
      .input('category', sql.NVarChar(50), category)
      .input('content', sql.NVarChar(sql.MAX), content)
      .input('title', sql.NVarChar(200), title)
      .input('link', sql.NVarChar(500), link)
      .input('linkTitle', sql.NVarChar(200), linkTitle)
      .input('image_id', sql.VarChar(50), image_id)
      .query(`
        INSERT INTO Announcements (
          publish_date, activity_start_date, category,
          content, title, link, linkTitle, image_id
        )
        VALUES (
          @publish_date, @activity_start_date, @category,
          @content, @title, @link, @linkTitle, @image_id
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);

    return result.recordset[0];
  } catch (err) {
    console.error('❌ Create Announcement Error:', err);
    throw err;
  }
}

// 獲取所有公告
export async function getAllAnnouncements() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(`
        SELECT 
          id,
          publish_date,
          activity_start_date,
          category,
          content,
          title,
          link,
          linkTitle,
          image_id,
          created_at,
          updated_at
        FROM Announcements
        WHERE is_deleted = 0
        ORDER BY publish_date DESC;
      `);

    return result.recordset;
  } catch (err) {
    console.error('❌ Get All Announcements Error:', err);
    throw err;
  }
}

// 獲取單個公告
export async function getAnnouncementById(id) {
  try {
    const pool = await getConnection();
    
    // 獲取公告基本資訊
    const announcementResult = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT 
          id,
          title,
          category,
          content,
          link,
          linkTitle,
          CONVERT(varchar, publish_date, 23) as publish_date,
          CONVERT(varchar, activity_start_date, 23) as activity_start_date,
          CONVERT(varchar, created_at, 120) as created_at,
          CONVERT(varchar, updated_at, 120) as updated_at
        FROM Announcements
        WHERE id = @id AND is_deleted = 0;
      `);

    const announcement = announcementResult.recordset[0];
    if (!announcement) {
      return null;
    }

    // 獲取公告相關的圖片
    const imagesResult = await pool.request()
      .input('announcement_id', sql.Int, id)
      .query(`
        SELECT 
          id,
          image_id,
          image_content,
          file_type,
          original_filename,
          CONVERT(varchar, created_at, 120) as created_at
        FROM AnnouncementImages
        WHERE announcement_id = @announcement_id 
        AND is_deleted = 0
        ORDER BY created_at ASC;
      `);

    // 合併公告和圖片資訊
    announcement.images = imagesResult.recordset;

    return announcement;
  } catch (err) {
    console.error('❌ Get Announcement By Id Error:', err);
    throw err;
  }
}

// 更新公告
export async function updateAnnouncement(id, {
  publish_date,
  activity_start_date,
  category,
  content,
  title,
  link,
  linkTitle,
  image_id
}) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .input('publish_date', sql.VarChar(10), publish_date)
      .input('activity_start_date', sql.VarChar(10), activity_start_date)
      .input('category', sql.NVarChar(50), category)
      .input('content', sql.NVarChar(sql.MAX), content)
      .input('title', sql.NVarChar(200), title)
      .input('link', sql.NVarChar(500), link)
      .input('linkTitle', sql.NVarChar(200), linkTitle)
      .input('image_id', sql.VarChar(50), image_id)
      .query(`
        UPDATE Announcements
        SET 
          publish_date = @publish_date,
          activity_start_date = @activity_start_date,
          category = @category,
          content = @content,
          title = @title,
          link = @link,
          linkTitle = @linkTitle,
          image_id = @image_id,
          updated_at = GETDATE()
        WHERE id = @id AND is_deleted = 0;
      `);

    return { success: true };
  } catch (err) {
    console.error('❌ Update Announcement Error:', err);
    throw err;
  }
}

// 刪除公告（軟刪除）
export async function deleteAnnouncement(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .query(`
        UPDATE Announcements
        SET is_deleted = 1, updated_at = GETDATE()
        WHERE id = @id;
      `);

    return { success: true };
  } catch (err) {
    console.error('❌ Delete Announcement Error:', err);
    throw err;
  }
}

// 儲存公告圖片
export async function saveAnnouncementImage(announcement_id, image_id, image_content, file_type = 'image', original_filename = null) {
  try {
    console.log('original_filename:', original_filename)
    const pool = await getConnection();
    await pool.request()
      .input('announcement_id', sql.Int, announcement_id)
      .input('image_id', sql.VarChar(50), image_id)
      .input('image_content', sql.VarBinary(sql.MAX), image_content)
      .input('file_type', sql.VarChar(10), file_type)
      .input('original_filename', sql.NVarChar(255), original_filename)
      .query(`
        INSERT INTO AnnouncementImages (
          announcement_id, image_id, image_content, file_type, original_filename
        )
        VALUES (
          @announcement_id, @image_id, @image_content, @file_type, @original_filename
        );
      `);

    return { success: true };
  } catch (err) {
    console.error('❌ DB Save Announcement Image Error:', err);
    throw err;
  }
}

// 獲取公告圖片
export async function getAnnouncementImage(image_id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('image_id', sql.VarChar(50), image_id)
      .query(`
        SELECT 
          image_content
        FROM AnnouncementImages
        WHERE id = @image_id AND is_deleted = 0;
      `);

    return result.recordset[0];
  } catch (err) {
    console.error('❌ Get Announcement Image Error:', err);
    throw err;
  }
}

// 獲取公告的所有圖片
export async function getAnnouncementImages(announcement_id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('announcement_id', sql.Int, announcement_id)
      .query(`
        SELECT 
          image_id,
          id,
          image_content,
          file_type,
          original_filename,
          created_at
        FROM AnnouncementImages
        WHERE announcement_id = @announcement_id 
        AND is_deleted = 0
        ORDER BY created_at DESC;
      `);

    return result.recordset;
  } catch (err) {
    console.error('❌ Get Announcement Images Error:', err);
    throw err;
  }
}

// 刪除公告圖片（軟刪除）
export async function deleteAnnouncementImage(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .query(`
        UPDATE AnnouncementImages
        SET is_deleted = 1, updated_at = GETDATE()
        WHERE id = @id;
      `);

    return { success: true };
  } catch (err) {
    console.error('❌ Delete Announcement Image Error:', err);
    throw err;
  }
} 