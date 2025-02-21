import { getConnection } from '../config/db.js';

// ✅ 取得所有 QA
export async function getAllQA() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM QA'); // 修改成你的 Table
    return result.recordset;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 依 ID 取得 QA
export async function getQAById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM QA WHERE id = @id');

    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 新增 QA
export async function createQA(question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('question', question)
      .input('answer', answer)
      .input('category', category)
      .query(`
        INSERT INTO QA (question, answer, category)
        OUTPUT INSERTED.*
        VALUES (@question, @answer, @category)
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Insert Error:', error);
    throw error;
  }
}

// ✅ 更新 QA
export async function updateQA(id, question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .input('question', question)
      .input('answer', answer)
      .input('category', category)
      .query(`
        UPDATE QA_
        SET question = @question, answer = @answer, category = @category
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Update Error:', error);
    throw error;
  }
}

// ✅ 刪除 QA
export async function deleteQA(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', id)
      .query('DELETE FROM QA WHERE id = @id');
    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ Delete Error:', error);
    throw error;
  }
}