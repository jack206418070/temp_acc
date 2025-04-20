import { getConnection } from '../config/db.js';
import mssql from 'mssql';

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
        UPDATE QA
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

// ✅ 取得所有 QA 內容
export async function getAllQAContents() {
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
    console.error('❌ getAllQAContents Error:', error);
    throw error;
  }
}

// ✅ 依 ID 取得 QA 內容
export async function getQAContentById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .query(`
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

    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ getQAContentById Error:', error);
    throw error;
  }
}

// ✅ 新增 QA 內容
export async function createQAContent(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('category_id', data.category_id)
      .input('language_id', data.language_id)
      .input('question', data.question)
      .input('answer', data.answer)
      .input('sort_order', data.sort_order || 0)
      .query(`
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
    console.error('❌ createQAContent Error:', error);
    throw error;
  }
}

// ✅ 更新 QA 內容
export async function updateQAContent(id, data) {
  try {
    const pool = await getConnection();
    
    // 步驟 1: 執行更新
    await pool.request()
      .input('id', id)
      .input('category_id', data.category_id)
      .input('language_id', data.language_id)
      .input('question', data.question)
      .input('answer', data.answer)
      .input('sort_order', data.sort_order)
      .query(`
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

    // 步驟 2: 獲取更新後的資料
    const result = await pool.request()
      .input('id', id)
      .query(`
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
    console.error('❌ updateQAContent Error:', error);
    throw error;
  }
}

// ✅ 刪除 QA 內容（軟刪除）
export async function deleteQAContent(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', id)
      .query(`
        UPDATE QAContents
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        WHERE id = @id
      `);
    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ deleteQAContent Error:', error);
    throw error;
  }
}

// ✅ 取得所有 QA 類別
export async function getAllQACategories() {
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
    console.error('❌ getAllQACategories Error:', error);
    throw error;
  }
}

// ✅ 新增 QA 分類
export async function createQACategory(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('name', data.name)
      .input('name_en', data.name_en)
      .input('name_vi', data.name_vi)
      .input('name_id', data.name_id)
      .input('name_th', data.name_th)
      .input('parent_id', data.parent_id)
      .query(`
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
    console.error('❌ createQACategory Error:', error);
    throw error;
  }
}

// ✅ 更新 QA 分類
export async function updateQACategory(id, data) {
  try {
    const pool = await getConnection();
    
    // 步驟 1: 檢查是否存在
    const checkResult = await pool.request()
      .input('id', id)
      .query('SELECT id FROM QACategories WHERE id = @id');
    
    if (!checkResult.recordset.length) {
      throw new Error('找不到要更新的分類');
    }
    
    // 步驟 2: 執行更新
    await pool.request()
      .input('id', id)
      .input('name', data.name)
      .input('name_en', data.name_en)
      .input('name_vi', data.name_vi)
      .input('name_id', data.name_id)
      .input('name_th', data.name_th)
      .input('parent_id', data.parent_id)
      .query(`
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

    // 步驟 3: 獲取更新後的資料
    const result = await pool.request()
      .input('id', id)
      .query(`
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
    console.error('❌ updateQACategory Error:', error);
    throw error;
  }
}

// ✅ 刪除 QA 類別（軟刪除）
export async function deleteQACategory(id) {
  try {
    const pool = await getConnection();
    const transaction = new mssql.Transaction(pool);

    try {
      // 開始交易
      await transaction.begin();

      // 1. 獲取所有子類別 ID
      const subCategoriesResult = await transaction.request()
        .input('parent_id', id)
        .query(`
          SELECT id
          FROM QACategories
          WHERE parent_id = @parent_id AND is_deleted = 0
        `);
      
      const subCategoryIds = subCategoriesResult.recordset.map(row => row.id);
      const allCategoryIds = [id, ...subCategoryIds];

      // 2. 刪除所有相關的問答內容（包含父類別和子類別的）
      await transaction.request()
        .input('categoryIds', mssql.VarChar(1000), allCategoryIds.join(','))
        .query(`
          UPDATE QAContents
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE category_id IN (
            SELECT value
            FROM STRING_SPLIT(@categoryIds, ',')
          )
        `);

      // 3. 刪除所有子類別
      if (subCategoryIds.length > 0) {
        await transaction.request()
          .input('categoryIds', mssql.VarChar(1000), subCategoryIds.join(','))
          .query(`
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

      // 4. 刪除父類別
      await transaction.request()
        .input('id', id)
        .query(`
          UPDATE QACategories
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE id = @id
        `);

      // 提交交易
      await transaction.commit();
      
      return { 
        message: '刪除成功',
        deletedCategories: allCategoryIds.length,
        hasSubCategories: subCategoryIds.length > 0
      };
    } catch (error) {
      // 如果出錯，回滾交易
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('❌ deleteQACategory Error:', error);
    throw error;
  }
}

// ✅ 取得所有語言
export async function getAllLanguages() {
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
    console.error('❌ getAllLanguages Error:', error);
    throw error;
  }
}