import sql from 'mssql';
import { getConnection } from '../config/db.js';

// 獲取所有 Banner
export async function getAllBanners() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
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
  sortOrder,
  isActive
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('title', sql.NVarChar(100), title)
      .input('description', sql.NVarChar(500), description)
      .input('imageData', sql.VarBinary(sql.MAX), imageData)
      .input('imageType', sql.NVarChar(50), imageType)
      .input('sortOrder', sql.Int, sortOrder)
      .input('isActive', sql.Bit, isActive)
      .query(`
        INSERT INTO Banners (
          title,
          description,
          image_data,
          image_type,
          sort_order,
          is_active
        )
        OUTPUT INSERTED.*
        VALUES (
          @title,
          @description,
          @imageData,
          @imageType,
          @sortOrder,
          @isActive
        );
      `);
    return result.recordset[0];
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
  sortOrder,
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
    if (sortOrder !== undefined) {
      request.input('sortOrder', sql.Int, sortOrder);
      updateFields.push('sort_order = @sortOrder');
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
export async function updateBannerOrder(id, sortOrder) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('sortOrder', sql.Int, sortOrder)
      .query(`
        UPDATE Banners
        SET 
          sort_order = @sortOrder,
          updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('❌ Update Banner Order Error:', error);
    throw error;
  }
} 