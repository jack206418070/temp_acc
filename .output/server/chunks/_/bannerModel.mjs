import sql from 'mssql';
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
  isActive
}) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      const maxOrderResult = await transaction.request().query(`
          SELECT ISNULL(MAX(sort_order), 0) + 1 as nextOrder
          FROM Banners
          WHERE is_deleted = 0
        `);
      const nextOrder = maxOrderResult.recordset[0].nextOrder;
      const result = await transaction.request().input("title", sql.NVarChar(100), title).input("description", sql.NVarChar(500), description).input("imageData", sql.VarBinary(sql.MAX), imageData).input("imageType", sql.NVarChar(50), imageType).input("sortOrder", sql.Int, nextOrder).input("isActive", sql.Bit, isActive).query(`
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
    console.error("\u274C Create Banner Error:", error);
    throw error;
  }
}
async function updateBanner(id, {
  title,
  description,
  imageData,
  imageType,
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
async function updateBannerOrder(id, targetOrder) {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();
    const currentBanner = await transaction.request().input("id", sql.Int, id).query(`
        SELECT id, sort_order
        FROM Banners
        WHERE id = @id AND is_deleted = 0
      `);
    if (currentBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner");
    }
    const currentOrder = currentBanner.recordset[0].sort_order;
    const targetBanner = await transaction.request().input("targetOrder", sql.Int, targetOrder).query(`
        SELECT id, sort_order
        FROM Banners
        WHERE sort_order = @targetOrder AND is_deleted = 0
      `);
    if (targetBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u76EE\u6A19\u6392\u5E8F\u7684 Banner");
    }
    const targetBannerId = targetBanner.recordset[0].id;
    await transaction.request().input("id1", sql.Int, id).input("order1", sql.Int, targetOrder).input("id2", sql.Int, targetBannerId).input("order2", sql.Int, currentOrder).query(`
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
    const result = await pool.request().input("id1", sql.Int, id).input("id2", sql.Int, targetBannerId).query(`
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
    console.error("\u66F4\u65B0\u6392\u5E8F\u5931\u6557:", error);
    throw error;
  }
}

export { updateBannerOrder as a, getBannerById as b, createBanner as c, deleteBanner as d, getAllBanners as g, updateBanner as u };
//# sourceMappingURL=bannerModel.mjs.map
