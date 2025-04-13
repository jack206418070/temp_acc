import { getConnection } from '../config/db.js';
import sql from 'mssql';

// ✅ 獲取所有知識
export async function getAllKnowledge(category = null, includeImage = false) {
  try {
    const pool = await getConnection();
    
    // 構建基本查詢
    let query = `
      SELECT 
        kid,
        know_category,
        title,
        display_order,
        created_at,
        updated_at
    `;
    
    // 如果需要圖片資訊，則添加相關欄位
    if (includeImage) {
      query += `,
        image_data,
        image_type,
        CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_base64
      `;
    }
    
    query += `
      FROM knowledge
      WHERE 1=1
    `;
    
    // 如果有指定類別，則添加條件
    if (category) {
      query += ' AND know_category = @category';
    }
    
    // 添加排序
    query += ' ORDER BY know_category, display_order, kid';
    
    const request = pool.request();
    if (category) {
      request.input('category', sql.Int, parseInt(category));
    }
    
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error('❌ Get All Knowledge Error:', error);
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
          title,
          display_order,
          image_type,
          CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_data,
          created_at,
          updated_at
        FROM knowledge
        WHERE kid = @kid
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('獲取知識庫資料失敗:', error);
    throw error;
  }
}

// ✅ 新增知識
export async function createKnowledge({ know_category, imageBuffer, imageType, title }) {
  try {
    const pool = await getConnection();
    const now = new Date();
    
    // 獲取當前類別的最大順序值
    const maxOrderResult = await pool.request()
      .input('know_category', sql.Int, know_category)
      .query(`
        SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
        FROM knowledge
        WHERE know_category = @know_category
      `);
    
    const nextOrder = maxOrderResult.recordset[0].next_order;
    
    console.log(title);
    const result = await pool.request()
      .input('know_category', sql.Int, know_category)
      .input('image_data', sql.VarBinary(sql.MAX), imageBuffer)
      .input('image_type', sql.NVarChar(50), imageType)
      .input('created_at', sql.DateTime, now)
      .input('updated_at', sql.DateTime, now)
      .input('title', sql.NVarChar(50), title)
      .input('display_order', sql.Int, nextOrder)
      .query(`
        INSERT INTO knowledge (
          know_category, 
          image_data, 
          image_type, 
          created_at, 
          updated_at,
          title,
          display_order
        )
        OUTPUT 
          INSERTED.kid,
          INSERTED.know_category,
          'data:' + INSERTED.image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_url,
          INSERTED.created_at,
          INSERTED.updated_at,
          INSERTED.title,
          INSERTED.display_order
        VALUES (
          @know_category, 
          @image_data, 
          @image_type, 
          @created_at, 
          @updated_at,
          @title,
          @display_order
        )
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Insert Error:', error);
    throw error;
  }
}

// ✅ 更新知識
export async function updateKnowledge(id, title, category, imageData = null) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    
    await transaction.begin();
    
    try {
      // 1. 先獲取當前項目的資訊
      const currentItemResult = await transaction.request()
        .input('kid', sql.Int, id)
        .query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      
      if (currentItemResult.recordset.length === 0) {
        throw new Error('找不到指定的知識項目');
      }
      
      const currentItem = currentItemResult.recordset[0];
      const oldCategory = currentItem.know_category;
      const oldOrder = currentItem.display_order;
      
      // 2. 如果類別有變更，需要調整兩個類別的順序
      if (oldCategory !== category) {
        // 2.1 將原類別中，順序大於當前項目的所有項目順序減1
        await transaction.request()
          .input('category', sql.Int, oldCategory)
          .input('order', sql.Int, oldOrder)
          .query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category 
            AND display_order > @order
          `);
        
        // 2.2 獲取新類別的最大順序
        const maxOrderResult = await transaction.request()
          .input('category', sql.Int, category)
          .query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        
        const newOrder = maxOrderResult.recordset[0].next_order;
        
        // 2.3 更新當前項目
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              display_order = @newOrder,
              updated_at = @updated_at
        `;
        
        if (imageData) {
          query += ', image_data = @image_data';
        }
        
        query += ' WHERE kid = @id';
        
        const request = transaction.request();
        request.input('id', sql.Int, id);
        request.input('category', sql.Int, category);
        request.input('title', sql.NVarChar, title);
        request.input('newOrder', sql.Int, newOrder);
        request.input('updated_at', sql.DateTime, new Date());
        
        if (imageData) {
          request.input('image_data', sql.VarBinary(sql.MAX), imageData);
        }
        
        await request.query(query);
      } else {
        // 3. 如果類別沒有變更，只更新基本資訊
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              updated_at = @updated_at
        `;
        
        if (imageData) {
          query += ', image_data = @image_data';
        }
        
        query += ' WHERE kid = @id';
        
        const request = transaction.request();
        request.input('id', sql.Int, id);
        request.input('category', sql.Int, category);
        request.input('title', sql.NVarChar, title);
        request.input('updated_at', sql.DateTime, new Date());
        
        if (imageData) {
          request.input('image_data', sql.VarBinary(sql.MAX), imageData);
        }
        
        await request.query(query);
      }
      
      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('❌ Update Knowledge Error:', error);
    throw error;
  }
}

// ✅ 更新知識順序
export async function updateKnowledgeOrder(id, newOrder, category) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    
    await transaction.begin();
    
    try {
      // 獲取當前項目的舊順序和類別
      const currentItemResult = await transaction.request()
        .input('kid', sql.Int, id)
        .query(`
          SELECT display_order, know_category
          FROM knowledge
          WHERE kid = @kid
        `);
      
      if (currentItemResult.recordset.length === 0) {
        throw new Error('找不到指定的知識項目');
      }
      
      const currentItem = currentItemResult.recordset[0];
      const oldOrder = currentItem.display_order;
      const oldCategory = currentItem.know_category;
      
      // 如果類別變更，需要調整兩個類別的順序
      if (oldCategory !== category) {
        // 1. 將原類別中，順序大於當前項目的所有項目順序減1
        await transaction.request()
          .input('category', sql.Int, oldCategory)
          .input('order', sql.Int, oldOrder)
          .query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category AND display_order > @order
          `);
        
        // 2. 獲取目標類別的最大順序值
        const maxOrderResult = await transaction.request()
          .input('category', sql.Int, category)
          .query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        
        const targetMaxOrder = maxOrderResult.recordset[0].next_order;
        
        // 3. 更新當前項目的順序和類別
        await transaction.request()
          .input('kid', sql.Int, id)
          .input('order', sql.Int, targetMaxOrder)
          .input('category', sql.Int, category)
          .query(`
            UPDATE knowledge
            SET display_order = @order,
                know_category = @category
            WHERE kid = @kid
          `);
      } else {
        // 同一類別內移動
        if (oldOrder < newOrder) {
          // 向下移動：將中間項目的順序減1
          await transaction.request()
            .input('category', sql.Int, category)
            .input('oldOrder', sql.Int, oldOrder)
            .input('newOrder', sql.Int, newOrder)
            .query(`
              UPDATE knowledge
              SET display_order = display_order - 1
              WHERE know_category = @category 
                AND display_order > @oldOrder 
                AND display_order <= @newOrder
            `);
        } else if (oldOrder > newOrder) {
          // 向上移動：將中間項目的順序加1
          await transaction.request()
            .input('category', sql.Int, category)
            .input('oldOrder', sql.Int, oldOrder)
            .input('newOrder', sql.Int, newOrder)
            .query(`
              UPDATE knowledge
              SET display_order = display_order + 1
              WHERE know_category = @category 
                AND display_order >= @newOrder 
                AND display_order < @oldOrder
            `);
        }
        
        // 更新當前項目的順序
        await transaction.request()
          .input('kid', sql.Int, id)
          .input('order', sql.Int, newOrder)
          .query(`
            UPDATE knowledge
            SET display_order = @order
            WHERE kid = @kid
          `);
      }
      
      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('❌ Update Order Error:', error);
    throw error;
  }
}

// ✅ 刪除知識
export async function deleteKnowledge(id) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    
    await transaction.begin();
    
    try {
      // 獲取要刪除的項目的類別和順序
      const itemResult = await transaction.request()
        .input('kid', sql.Int, id)
        .query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      
      if (itemResult.recordset.length === 0) {
        throw new Error('找不到指定的知識項目');
      }
      
      const item = itemResult.recordset[0];
      
      // 刪除項目
      await transaction.request()
        .input('kid', sql.Int, id)
        .query('DELETE FROM knowledge WHERE kid = @kid');
      
      // 更新同類別中順序大於被刪除項目的所有項目的順序
      await transaction.request()
        .input('category', sql.Int, item.know_category)
        .input('order', sql.Int, item.display_order)
        .query(`
          UPDATE knowledge
          SET display_order = display_order - 1
          WHERE know_category = @category AND display_order > @order
        `);
      
      await transaction.commit();
      return { message: '刪除成功' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('❌ Delete Error:', error);
    throw error;
  }
} 