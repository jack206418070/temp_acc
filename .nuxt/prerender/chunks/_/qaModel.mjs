import { g as getConnection } from './db.mjs';
import sql from 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';

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
async function getAllQAContents() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        qc.id,
        qc.question,
        qc.answer,
        qc.category_id,
        qc.language_id,
        qc.sort_order,
        qc.created_at,
        qc.updated_at,
        qcat.name as category_name,
        l.name as language_name,
        l.code as language_code
      FROM QAContents qc
      LEFT JOIN QACategories qcat ON qc.category_id = qcat.id
      LEFT JOIN Languages l ON qc.language_id = l.id
      WHERE qc.is_deleted = 0
      ORDER BY qc.sort_order ASC, qc.created_at DESC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllQAContents Error:", error);
    throw error;
  }
}
async function createQAContent(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("category_id", data.category_id).input("language_id", data.language_id).input("question", data.question).input("answer", data.answer).input("sort_order", data.sort_order || 0).query(`
        INSERT INTO QAContents (
          category_id,
          language_id,
          question,
          answer,
          sort_order
        )
        OUTPUT INSERTED.*
        VALUES (
          @category_id,
          @language_id,
          @question,
          @answer,
          @sort_order
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C createQAContent Error:", error);
    throw error;
  }
}
async function updateQAContent(id, data) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).input("category_id", data.category_id).input("language_id", data.language_id).input("question", data.question).input("answer", data.answer).input("sort_order", data.sort_order).query(`
        UPDATE QAContents
        SET 
          category_id = @category_id,
          language_id = @language_id,
          question = @question,
          answer = @answer,
          sort_order = @sort_order,
          updated_at = GETDATE()
        WHERE id = @id AND is_deleted = 0
      `);
    const result = await pool.request().input("id", id).query(`
        SELECT 
          qc.id,
          qc.question,
          qc.answer,
          qc.category_id,
          qc.language_id,
          qc.sort_order,
          qc.created_at,
          qc.updated_at,
          qcat.name as category_name,
          l.name as language_name,
          l.code as language_code
        FROM QAContents qc
        LEFT JOIN QACategories qcat ON qc.category_id = qcat.id
        LEFT JOIN Languages l ON qc.language_id = l.id
        WHERE qc.id = @id AND qc.is_deleted = 0
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C updateQAContent Error:", error);
    throw error;
  }
}
async function deleteQAContent(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).query(`
        UPDATE QAContents
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        WHERE id = @id
      `);
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C deleteQAContent Error:", error);
    throw error;
  }
}
async function getAllQACategories() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id,
        parent_id,
        name,
        name_en,
        name_vi,
        name_id,
        name_th,
        created_at,
        updated_at
      FROM QACategories
      WHERE is_deleted = 0
      ORDER BY created_at ASC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllQACategories Error:", error);
    throw error;
  }
}
async function createQACategory(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("name", data.name).input("name_en", data.name_en).input("name_vi", data.name_vi).input("name_id", data.name_id).input("name_th", data.name_th).input("parent_id", data.parent_id).query(`
        INSERT INTO QACategories (
          name,
          name_en,
          name_vi,
          name_id,
          name_th,
          parent_id
        )
        OUTPUT INSERTED.*
        VALUES (
          @name,
          @name_en,
          @name_vi,
          @name_id,
          @name_th,
          @parent_id
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C createQACategory Error:", error);
    throw error;
  }
}
async function updateQACategory(id, data) {
  try {
    const pool = await getConnection();
    const checkResult = await pool.request().input("id", id).query("SELECT id FROM QACategories WHERE id = @id");
    if (!checkResult.recordset.length) {
      throw new Error("\u627E\u4E0D\u5230\u8981\u66F4\u65B0\u7684\u5206\u985E");
    }
    await pool.request().input("id", id).input("name", data.name).input("name_en", data.name_en).input("name_vi", data.name_vi).input("name_id", data.name_id).input("name_th", data.name_th).input("parent_id", data.parent_id).query(`
        UPDATE QACategories
        SET 
          name = @name,
          name_en = @name_en,
          name_vi = @name_vi,
          name_id = @name_id,
          name_th = @name_th,
          parent_id = @parent_id,
          updated_at = GETDATE()
        WHERE id = @id
      `);
    const result = await pool.request().input("id", id).query(`
        SELECT 
          id,
          parent_id,
          name,
          name_en,
          name_vi,
          name_id,
          name_th,
          created_at,
          updated_at
        FROM QACategories
        WHERE id = @id
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C updateQACategory Error:", error);
    throw error;
  }
}
async function deleteQACategory(id) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      const subCategoriesResult = await transaction.request().input("parent_id", id).query(`
          SELECT id
          FROM QACategories
          WHERE parent_id = @parent_id AND is_deleted = 0
        `);
      const subCategoryIds = subCategoriesResult.recordset.map((row) => row.id);
      const allCategoryIds = [id, ...subCategoryIds];
      await transaction.request().input("categoryIds", sql.VarChar(1e3), allCategoryIds.join(",")).query(`
          UPDATE QAContents
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE category_id IN (
            SELECT value
            FROM STRING_SPLIT(@categoryIds, ',')
          )
        `);
      if (subCategoryIds.length > 0) {
        await transaction.request().input("categoryIds", sql.VarChar(1e3), subCategoryIds.join(",")).query(`
            UPDATE QACategories
            SET 
              is_deleted = 1,
              updated_at = GETDATE()
            WHERE id IN (
              SELECT value
              FROM STRING_SPLIT(@categoryIds, ',')
            )
          `);
      }
      await transaction.request().input("id", id).query(`
          UPDATE QACategories
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE id = @id
        `);
      await transaction.commit();
      return {
        message: "\u522A\u9664\u6210\u529F",
        deletedCategories: allCategoryIds.length,
        hasSubCategories: subCategoryIds.length > 0
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C deleteQACategory Error:", error);
    throw error;
  }
}
async function getAllLanguages() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id,
        code,
        name,
        created_at,
        updated_at
      FROM Languages
      WHERE is_deleted = 0
      ORDER BY created_at ASC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllLanguages Error:", error);
    throw error;
  }
}

export { getAllQACategories as a, deleteQAContent as b, createQACategory as c, deleteQACategory as d, updateQAContent as e, getAllQAContents as f, getAllLanguages as g, createQAContent as h, deleteQA as i, updateQA as j, createQA as k, getQAById as l, getAllQA as m, updateQACategory as u };
//# sourceMappingURL=qaModel.mjs.map
