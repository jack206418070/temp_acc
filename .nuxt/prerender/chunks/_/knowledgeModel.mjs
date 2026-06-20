import { g as getConnection } from './db.mjs';
import sql from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';

async function getAllKnowledge(category = null, includeImage = false) {
  try {
    const pool = await getConnection();
    let query = `
      SELECT 
        kid,
        know_category,
        title,
        display_order,
        created_at,
        updated_at,
        image_url
    `;
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
    if (category) {
      query += " AND know_category = @category";
    }
    query += " ORDER BY know_category, display_order, kid";
    const request = pool.request();
    if (category) {
      request.input("category", sql.Int, parseInt(category));
    }
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("\u274C Get All Knowledge Error:", error);
    throw error;
  }
}
async function getKnowledgeById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("kid", sql.Int, id).query(`
        SELECT 
          kid,
          know_category,
          title,
          display_order,
          image_type,
          CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_data,
          created_at,
          updated_at,
          image_url
        FROM knowledge
        WHERE kid = @kid
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u7372\u53D6\u77E5\u8B58\u5EAB\u8CC7\u6599\u5931\u6557:", error);
    throw error;
  }
}
async function createKnowledge({ know_category, imageBuffer, imageType, title, image_url }) {
  try {
    const pool = await getConnection();
    const now = /* @__PURE__ */ new Date();
    const maxOrderResult = await pool.request().input("know_category", sql.Int, know_category).query(`
        SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
        FROM knowledge
        WHERE know_category = @know_category
      `);
    const nextOrder = maxOrderResult.recordset[0].next_order;
    console.log(title);
    const result = await pool.request().input("know_category", sql.Int, know_category).input("image_data", sql.VarBinary(sql.MAX), imageBuffer).input("image_type", sql.NVarChar(50), imageType).input("created_at", sql.DateTime, now).input("updated_at", sql.DateTime, now).input("title", sql.NVarChar(50), title).input("display_order", sql.Int, nextOrder).input("image_url", sql.NVarChar(255), image_url).query(`
        INSERT INTO knowledge (
          know_category, 
          image_data, 
          image_type, 
          created_at, 
          updated_at,
          title,
          display_order,
          image_url
        )
        OUTPUT 
          INSERTED.kid,
          INSERTED.know_category,
          'data:' + INSERTED.image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_data,
          INSERTED.image_url,
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
          @display_order,
          @image_url
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Insert Error:", error);
    throw error;
  }
}
async function updateKnowledge(id, title, category, imageData = null, image_url = null) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    console.log("image_url", image_url);
    try {
      const currentItemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      if (currentItemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const currentItem = currentItemResult.recordset[0];
      const oldCategory = currentItem.know_category;
      const oldOrder = currentItem.display_order;
      if (oldCategory !== category) {
        await transaction.request().input("category", sql.Int, oldCategory).input("order", sql.Int, oldOrder).query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category 
            AND display_order > @order
          `);
        const maxOrderResult = await transaction.request().input("category", sql.Int, category).query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        const newOrder = maxOrderResult.recordset[0].next_order;
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              display_order = @newOrder,
              updated_at = @updated_at,
              image_url = @image_url
        `;
        if (imageData) {
          query += ", image_data = @image_data";
        }
        query += " WHERE kid = @id";
        const request = transaction.request();
        request.input("id", sql.Int, id);
        request.input("category", sql.Int, category);
        request.input("title", sql.NVarChar, title);
        request.input("newOrder", sql.Int, newOrder);
        request.input("updated_at", sql.DateTime, /* @__PURE__ */ new Date());
        request.input("image_url", sql.NVarChar(255), image_url);
        if (imageData) {
          request.input("image_data", sql.VarBinary(sql.MAX), imageData);
        }
        await request.query(query);
      } else {
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              updated_at = @updated_at,
              image_url = @image_url
        `;
        if (imageData) {
          query += ", image_data = @image_data";
        }
        query += " WHERE kid = @id";
        const request = transaction.request();
        request.input("id", sql.Int, id);
        request.input("category", sql.Int, category);
        request.input("title", sql.NVarChar, title);
        request.input("updated_at", sql.DateTime, /* @__PURE__ */ new Date());
        request.input("image_url", sql.NVarChar(255), image_url);
        if (imageData) {
          request.input("image_data", sql.VarBinary(sql.MAX), imageData);
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
    console.error("\u274C Update Knowledge Error:", error);
    throw error;
  }
}
async function updateKnowledgeOrder(id, newOrder, category) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    try {
      const currentItemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT display_order, know_category
          FROM knowledge
          WHERE kid = @kid
        `);
      if (currentItemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const currentItem = currentItemResult.recordset[0];
      const oldOrder = currentItem.display_order;
      const oldCategory = currentItem.know_category;
      if (oldCategory !== category) {
        await transaction.request().input("category", sql.Int, oldCategory).input("order", sql.Int, oldOrder).query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category AND display_order > @order
          `);
        const maxOrderResult = await transaction.request().input("category", sql.Int, category).query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        const targetMaxOrder = maxOrderResult.recordset[0].next_order;
        await transaction.request().input("kid", sql.Int, id).input("order", sql.Int, targetMaxOrder).input("category", sql.Int, category).query(`
            UPDATE knowledge
            SET display_order = @order,
                know_category = @category
            WHERE kid = @kid
          `);
      } else {
        if (oldOrder < newOrder) {
          await transaction.request().input("category", sql.Int, category).input("oldOrder", sql.Int, oldOrder).input("newOrder", sql.Int, newOrder).query(`
              UPDATE knowledge
              SET display_order = display_order - 1
              WHERE know_category = @category 
                AND display_order > @oldOrder 
                AND display_order <= @newOrder
            `);
        } else if (oldOrder > newOrder) {
          await transaction.request().input("category", sql.Int, category).input("oldOrder", sql.Int, oldOrder).input("newOrder", sql.Int, newOrder).query(`
              UPDATE knowledge
              SET display_order = display_order + 1
              WHERE know_category = @category 
                AND display_order >= @newOrder 
                AND display_order < @oldOrder
            `);
        }
        await transaction.request().input("kid", sql.Int, id).input("order", sql.Int, newOrder).query(`
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
    console.error("\u274C Update Order Error:", error);
    throw error;
  }
}
async function deleteKnowledge(id) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    try {
      const itemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      if (itemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const item = itemResult.recordset[0];
      await transaction.request().input("kid", sql.Int, id).query("DELETE FROM knowledge WHERE kid = @kid");
      await transaction.request().input("category", sql.Int, item.know_category).input("order", sql.Int, item.display_order).query(`
          UPDATE knowledge
          SET display_order = display_order - 1
          WHERE know_category = @category AND display_order > @order
        `);
      await transaction.commit();
      return { message: "\u522A\u9664\u6210\u529F" };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C Delete Error:", error);
    throw error;
  }
}

export { getAllKnowledge as a, updateKnowledgeOrder as b, createKnowledge as c, deleteKnowledge as d, getKnowledgeById as g, updateKnowledge as u };
//# sourceMappingURL=knowledgeModel.mjs.map
