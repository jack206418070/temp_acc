import { getConnection } from '../config/db.js';

// ✅ 取得所有知識
export async function getAllKnowledge() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM knowledge ORDER BY kid DESC');
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
      .input('kid', id)
      .query('SELECT * FROM knowledge WHERE kid = @kid');

    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 新增知識
export async function createKnowledge({ know_category, image_url }) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('know_category', know_category)
      .input('image_url', image_url)
      .query(`
        INSERT INTO knowledge (know_category, image_url)
        OUTPUT INSERTED.*
        VALUES (@know_category, @image_url)
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Insert Error:', error);
    throw error;
  }
}

// ✅ 更新知識
export async function updateKnowledge(id, { know_category, image_url }) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('kid', id)
      .input('know_category', know_category)
      .input('image_url', image_url)
      .query(`
        UPDATE knowledge
        SET know_category = @know_category, image_url = @image_url
        OUTPUT INSERTED.*
        WHERE kid = @kid
      `);

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
      .input('kid', id)
      .query('DELETE FROM knowledge WHERE kid = @kid');
    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ Delete Error:', error);
    throw error;
  }
} 