import sql from 'mssql';
import { getConnection } from '../config/db.js';

// 獲取所有 Banner
export async function getAllBanners(active = 0) {
  try {
    const pool = await getConnection();
    let result;
    if (active == 0) {
      result = await pool.request()
      .query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE is_deleted = 0
        ORDER BY sort_order ASC, id DESC;
      `);
    } else if (active == 1) {
      result = await pool.request()
      .query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE is_deleted = 0 AND is_active = 1
        ORDER BY sort_order ASC, id DESC;
      `);
    }
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
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
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
  description,
  imageData,
  imageType,
  isActive
}) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      // 獲取最大排序值
      const maxOrderResult = await transaction.request()
        .query(`
          SELECT ISNULL(MAX(sort_order), 0) + 1 as nextOrder
          FROM Banners
          WHERE is_deleted = 0
        `);

      const nextOrder = maxOrderResult.recordset[0].nextOrder;

      // 插入新的 Banner
      const result = await transaction.request()
        .input('title', sql.NVarChar(100), title)
        .input('description', sql.NVarChar(500), description)
        .input('imageData', sql.VarBinary(sql.MAX), imageData)
        .input('imageType', sql.NVarChar(50), imageType)
        .input('sortOrder', sql.Int, nextOrder)
        .input('isActive', sql.Bit, isActive)
        .query(`
          INSERT INTO Banners (
            title,
            description,
            image_data,
            image_type,
            sort_order,
            is_active,
            created_at,
            updated_at
          )
          OUTPUT 
            INSERTED.id,
            INSERTED.title,
            INSERTED.description,
            CAST(INSERTED.image_data as varbinary(max)) as imageData,
            INSERTED.image_type as imageType,
            INSERTED.sort_order as sortOrder,
            INSERTED.is_active as isActive,
            INSERTED.created_at as createdAt,
            INSERTED.updated_at as updatedAt
          VALUES (
            @title,
            @description,
            @imageData,
            @imageType,
            @sortOrder,
            @isActive,
            GETDATE(),
            GETDATE()
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
  description,
  imageData,
  imageType,
  isActive
}) {
  try {
    const pool = await getConnection();
    const updateFields = [];
    const request = pool.request().input('id', sql.Int, id);

    if (title !== undefined) {
      request.input('title', sql.NVarChar(100), title);
      updateFields.push('title = @title');
    }
    if (description !== undefined) {
      request.input('description', sql.NVarChar(500), description);
      updateFields.push('description = @description');
    }
    if (imageData !== undefined) {
      request.input('imageData', sql.VarBinary(sql.MAX), imageData);
      updateFields.push('image_data = @imageData');
    }
    if (imageType !== undefined) {
      request.input('imageType', sql.NVarChar(50), imageType);
      updateFields.push('image_type = @imageType');
    }
    if (isActive !== undefined) {
      request.input('isActive', sql.Bit, isActive);
      updateFields.push('is_active = @isActive');
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
        SELECT id, sort_order
        FROM Banners
        WHERE id = @id AND is_deleted = 0
      `);

    if (currentBanner.recordset.length === 0) {
      throw new Error('找不到指定的 Banner');
    }

    const currentOrder = currentBanner.recordset[0].sort_order;

    // 2. 找到目標排序值的 Banner
    const targetBanner = await transaction.request()
      .input('targetOrder', sql.Int, targetOrder)
      .query(`
        SELECT id, sort_order
        FROM Banners
        WHERE sort_order = @targetOrder AND is_deleted = 0
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
        SET sort_order = CASE
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
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as isActive,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id IN (@id1, @id2) AND is_deleted = 0
        ORDER BY sort_order;
      `);

    return result.recordset;
  } catch (error) {
    await transaction.rollback();
    console.error('更新排序失敗:', error);
    throw error;
  }
} 