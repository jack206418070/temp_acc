import sql from 'mssql';
import { getConnection } from '../config/db.js';

// 獲取所有 Banner
export async function getAllBanners(active = 0) {
  try {
    const pool = await getConnection();
    let result;
    // 注意：資料庫中沒有 is_active 欄位，只用 is_deleted 判斷
    result = await pool.request()
    .query(`
      SELECT 
        id,
        title,
        CAST(image_content as varbinary(max)) as imageData,
        link,
        order_num as sortOrder,
        created_at as createdAt,
        updated_at as updatedAt
      FROM Banners
      WHERE is_deleted = 0
      ORDER BY order_num ASC, id DESC;
    `);
    
    return result.recordset;
  } catch (error) {
    console.error('❌ Get All Banners Error:', error);
    throw error;
  }
}

// 獲取單一 Banner
export async function getBannerById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT 
          id,
          title,
          CAST(image_content as varbinary(max)) as imageData,
          link,
          order_num as sortOrder,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('❌ Get Banner By Id Error:', error);
    throw error;
  }
}

// 創建 Banner
export async function createBanner({
  title,
  link,
  imageData
}) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      // 獲取最大排序值
      const maxOrderResult = await transaction.request()
        .query(`
          SELECT ISNULL(MAX(order_num), 0) + 1 as nextOrder
          FROM Banners
          WHERE is_deleted = 0
        `);

      const nextOrder = maxOrderResult.recordset[0].nextOrder;

      // 插入新的 Banner
      const result = await transaction.request()
        .input('title', sql.NVarChar(200), title)
        .input('link', sql.NVarChar(500), link)
        .input('imageData', sql.VarBinary(sql.MAX), imageData)
        .input('sortOrder', sql.Int, nextOrder)
        .query(`
          INSERT INTO Banners (
            title,
            link,
            image_content,
            order_num,
            created_at,
            updated_at,
            is_deleted
          )
          OUTPUT 
            INSERTED.id,
            INSERTED.title,
            INSERTED.link,
            CAST(INSERTED.image_content as varbinary(max)) as imageData,
            INSERTED.order_num as sortOrder,
            INSERTED.created_at as createdAt,
            INSERTED.updated_at as updatedAt
          VALUES (
            @title,
            @link,
            @imageData,
            @sortOrder,
            GETDATE(),
            GETDATE(),
            0
          );
        `);

      await transaction.commit();
      return result.recordset[0];
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  } catch (error) {
    console.error('❌ Create Banner Error:', error);
    throw error;
  }
}

// 更新 Banner
export async function updateBanner(id, {
  title,
  link,
  imageData
}) {
  try {
    const pool = await getConnection();
    const updateFields = [];
    const request = pool.request().input('id', sql.Int, id);

    if (title !== undefined) {
      request.input('title', sql.NVarChar(200), title);
      updateFields.push('title = @title');
    }
    if (link !== undefined) {
      request.input('link', sql.NVarChar(500), link);
      updateFields.push('link = @link');
    }
    if (imageData !== undefined) {
      request.input('imageData', sql.VarBinary(sql.MAX), imageData);
      updateFields.push('image_content = @imageData');
    }

    updateFields.push('updated_at = GETDATE()');

    const result = await request.query(`
      UPDATE Banners
      SET ${updateFields.join(', ')}
      OUTPUT INSERTED.*
      WHERE id = @id AND is_deleted = 0;
    `);
    return result.recordset[0];
  } catch (error) {
    console.error('❌ Update Banner Error:', error);
    throw error;
  }
}

// 刪除 Banner
export async function deleteBanner(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        UPDATE Banners
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('❌ Delete Banner Error:', error);
    throw error;
  }
}

// 更新 Banner 排序
export async function updateBannerOrder(id, targetOrder) {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    // 1. 獲取當前 Banner 的排序值
    const currentBanner = await transaction.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT id, order_num
        FROM Banners
        WHERE id = @id AND is_deleted = 0
      `);

    if (currentBanner.recordset.length === 0) {
      throw new Error('找不到指定的 Banner');
    }

    const currentOrder = currentBanner.recordset[0].order_num;

    // 2. 找到目標排序值的 Banner
    const targetBanner = await transaction.request()
      .input('targetOrder', sql.Int, targetOrder)
      .query(`
        SELECT id, order_num
        FROM Banners
        WHERE order_num = @targetOrder AND is_deleted = 0
      `);

    if (targetBanner.recordset.length === 0) {
      throw new Error('找不到目標排序的 Banner');
    }

    const targetBannerId = targetBanner.recordset[0].id;

    // 3. 更新兩個 Banner 的排序
    await transaction.request()
      .input('id1', sql.Int, id)
      .input('order1', sql.Int, targetOrder)
      .input('id2', sql.Int, targetBannerId)
      .input('order2', sql.Int, currentOrder)
      .query(`
        UPDATE b
        SET order_num = CASE
          WHEN id = @id1 THEN @order1
          WHEN id = @id2 THEN @order2
        END,
        updated_at = GETDATE()
        FROM Banners b
        WHERE id IN (@id1, @id2) AND is_deleted = 0;
      `);

    await transaction.commit();

    // 4. 返回更新後的結果
    const result = await pool.request()
      .input('id1', sql.Int, id)
      .input('id2', sql.Int, targetBannerId)
      .query(`
        SELECT 
          id,
          title,
          CAST(image_content as varbinary(max)) as imageData,
          link,
          order_num as sortOrder,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id IN (@id1, @id2) AND is_deleted = 0
        ORDER BY order_num;
      `);

    return result.recordset;
  } catch (error) {
    await transaction.rollback();
    console.error('更新排序失敗:', error);
    throw error;
  }
} 