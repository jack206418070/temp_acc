import { getConnection } from '../config/db.js';
import sql from 'mssql';

// ✅ 取得所有知識
export async function getAllKnowledge() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        kid,
        know_category,
        'data:' + image_type + ';base64,' + 
        CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_url,
        created_at,
        updated_at
      FROM knowledge 
      ORDER BY kid DESC
    `);
    return result.recordset;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 依 ID 取得知識
export async function getKnowledgeById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('kid', sql.Int, id)
      .query(`
        SELECT 
          kid,
          know_category,
          'data:' + image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_url,
          created_at,
          updated_at
        FROM knowledge 
        WHERE kid = @kid
      `);

    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 新增知識
export async function createKnowledge({ know_category, imageBuffer, imageType }) {
  try {
    const pool = await getConnection();
    const now = new Date();

    const result = await pool.request()
      .input('know_category', sql.Int, know_category)
      .input('image_data', sql.VarBinary(sql.MAX), imageBuffer)
      .input('image_type', sql.NVarChar(50), imageType)
      .input('created_at', sql.DateTime, now)
      .input('updated_at', sql.DateTime, now)
      .query(`
        INSERT INTO knowledge (
          know_category, 
          image_data, 
          image_type, 
          created_at, 
          updated_at
        )
        OUTPUT 
          INSERTED.kid,
          INSERTED.know_category,
          'data:' + INSERTED.image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_url,
          INSERTED.created_at,
          INSERTED.updated_at
        VALUES (
          @know_category, 
          @image_data, 
          @image_type, 
          @created_at, 
          @updated_at
        )
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Insert Error:', error);
    throw error;
  }
}

// ✅ 更新知識
export async function updateKnowledge(id, { know_category, imageBuffer, imageType }) {
  try {
    const pool = await getConnection();
    const request = pool.request()
      .input('kid', sql.Int, id)
      .input('know_category', sql.Int, know_category)
      .input('updated_at', sql.DateTime, new Date());

    let query = `
      UPDATE knowledge 
      SET know_category = @know_category,
          updated_at = @updated_at
    `;

    if (imageBuffer && imageType) {
      request
        .input('image_data', sql.VarBinary(sql.MAX), imageBuffer)
        .input('image_type', sql.NVarChar(50), imageType);
      query += ', image_data = @image_data, image_type = @image_type';
    }

    query += `
      OUTPUT 
        INSERTED.kid,
        INSERTED.know_category,
        'data:' + INSERTED.image_type + ';base64,' + 
        CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_url,
        INSERTED.created_at,
        INSERTED.updated_at
      WHERE kid = @kid
    `;

    const result = await request.query(query);
    return result.recordset[0];
  } catch (error) {
    console.error('❌ Update Error:', error);
    throw error;
  }
}

// ✅ 刪除知識
export async function deleteKnowledge(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('kid', sql.Int, id)
      .query('DELETE FROM knowledge WHERE kid = @kid');
    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ Delete Error:', error);
    throw error;
  }
} 