import { g as getConnection } from './db.mjs';
import sql from 'mssql';

async function getAllKnowledge() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        kid,
        know_category,
        title,
        created_at,
        updated_at
      FROM knowledge 
      ORDER BY kid DESC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C Query Error:", error);
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
          image_type,
          CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_data,
          created_at,
          updated_at
        FROM knowledge
        WHERE kid = @kid
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u7372\u53D6\u77E5\u8B58\u5EAB\u8CC7\u6599\u5931\u6557:", error);
    throw error;
  }
}
async function createKnowledge({ know_category, imageBuffer, imageType, title }) {
  try {
    const pool = await getConnection();
    const now = /* @__PURE__ */ new Date();
    console.log(title);
    const result = await pool.request().input("know_category", sql.Int, know_category).input("image_data", sql.VarBinary(sql.MAX), imageBuffer).input("image_type", sql.NVarChar(50), imageType).input("created_at", sql.DateTime, now).input("updated_at", sql.DateTime, now).input("title", sql.NVarChar(50), title).query(`
        INSERT INTO knowledge (
          know_category, 
          image_data, 
          image_type, 
          created_at, 
          updated_at,
          title
        )
        OUTPUT 
          INSERTED.kid,
          INSERTED.know_category,
          'data:' + INSERTED.image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_url,
          INSERTED.created_at,
          INSERTED.updated_at,
          INSERTED.title
        VALUES (
          @know_category, 
          @image_data, 
          @image_type, 
          @created_at, 
          @updated_at,
          @title
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Insert Error:", error);
    throw error;
  }
}
async function updateKnowledge(id, { know_category, imageBuffer, imageType, title }) {
  try {
    const pool = await getConnection();
    const request = pool.request().input("kid", sql.Int, id).input("know_category", sql.Int, know_category).input("updated_at", sql.DateTime, /* @__PURE__ */ new Date());
    let query = `
      UPDATE knowledge 
      SET know_category = @know_category,
          updated_at = @updated_at
    `;
    if (imageBuffer && imageType) {
      request.input("image_data", sql.VarBinary(sql.MAX), imageBuffer).input("image_type", sql.NVarChar(50), imageType);
      query += ", image_data = @image_data, image_type = @image_type";
    }
    if (title) {
      request.input("title", sql.NVarChar(sql.MAX), title);
      query += ", title = N@title";
    }
    query += `
      OUTPUT 
        INSERTED.kid,
        INSERTED.know_category,
        'data:' + INSERTED.image_type + ';base64,' + 
        CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_url,
        INSERTED.created_at,
        INSERTED.updated_at
      WHERE kid = @kid
    `;
    const result = await request.query(query);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Error:", error);
    throw error;
  }
}
async function deleteKnowledge(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("kid", sql.Int, id).query("DELETE FROM knowledge WHERE kid = @kid");
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C Delete Error:", error);
    throw error;
  }
}

export { getAllKnowledge as a, createKnowledge as c, deleteKnowledge as d, getKnowledgeById as g, updateKnowledge as u };
//# sourceMappingURL=knowledgeModel.mjs.map
