import { g as getConnection } from './db.mjs';

async function getAllQA() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM QA");
    return result.recordset;
  } catch (error) {
    console.error("\u274C Query Error:", error);
    throw error;
  }
}
async function getQAById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).query("SELECT * FROM QA WHERE id = @id");
    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error("\u274C Query Error:", error);
    throw error;
  }
}
async function createQA(question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("question", question).input("answer", answer).input("category", category).query(`
        INSERT INTO QA (question, answer, category)
        OUTPUT INSERTED.*
        VALUES (@question, @answer, @category)
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Insert Error:", error);
    throw error;
  }
}
async function updateQA(id, question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).input("question", question).input("answer", answer).input("category", category).query(`
        UPDATE QA
        SET question = @question, answer = @answer, category = @category
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Error:", error);
    throw error;
  }
}
async function deleteQA(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).query("DELETE FROM QA WHERE id = @id");
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C Delete Error:", error);
    throw error;
  }
}

export { getAllQA as a, createQA as c, deleteQA as d, getQAById as g, updateQA as u };
//# sourceMappingURL=qaModel.mjs.map
