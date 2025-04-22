import sql from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';
import { g as getConnection } from './db.mjs';

async function getAllBanners(active = 0) {
  try {
    const pool = await getConnection();
    let result;
    if (active == 0) {
      result = await pool.request().query(`
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
      result = await pool.request().query(`
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
    console.error("\u274C Get All Banners Error:", error);
    throw error;
  }
}
async function getBannerById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
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
    console.error("\u274C Get Banner By Id Error:", error);
    throw error;
  }
}
async function createBanner({
  title,
  description,
  imageData,
  imageType,
  sortOrder,
  isActive
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("title", sql.NVarChar(100), title).input("description", sql.NVarChar(500), description).input("imageData", sql.VarBinary(sql.MAX), imageData).input("imageType", sql.NVarChar(50), imageType).input("sortOrder", sql.Int, sortOrder).input("isActive", sql.Bit, isActive).query(`
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
    console.error("\u274C Create Banner Error:", error);
    throw error;
  }
}
async function updateBanner(id, {
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
    const request = pool.request().input("id", sql.Int, id);
    if (title !== void 0) {
      request.input("title", sql.NVarChar(100), title);
      updateFields.push("title = @title");
    }
    if (description !== void 0) {
      request.input("description", sql.NVarChar(500), description);
      updateFields.push("description = @description");
    }
    if (imageData !== void 0) {
      request.input("imageData", sql.VarBinary(sql.MAX), imageData);
      updateFields.push("image_data = @imageData");
    }
    if (imageType !== void 0) {
      request.input("imageType", sql.NVarChar(50), imageType);
      updateFields.push("image_type = @imageType");
    }
    if (sortOrder !== void 0) {
      request.input("sortOrder", sql.Int, sortOrder);
      updateFields.push("sort_order = @sortOrder");
    }
    if (isActive !== void 0) {
      request.input("isActive", sql.Bit, isActive);
      updateFields.push("is_active = @isActive");
    }
    updateFields.push("updated_at = GETDATE()");
    const result = await request.query(`
      UPDATE Banners
      SET ${updateFields.join(", ")}
      OUTPUT INSERTED.*
      WHERE id = @id AND is_deleted = 0;
    `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Banner Error:", error);
    throw error;
  }
}
async function deleteBanner(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        UPDATE Banners
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Delete Banner Error:", error);
    throw error;
  }
}
async function updateBannerOrder(id, sortOrder) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).input("sortOrder", sql.Int, sortOrder).query(`
        UPDATE Banners
        SET 
          sort_order = @sortOrder,
          updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Banner Order Error:", error);
    throw error;
  }
}

export { updateBannerOrder as a, getBannerById as b, createBanner as c, deleteBanner as d, getAllBanners as g, updateBanner as u };
//# sourceMappingURL=bannerModel.mjs.map
