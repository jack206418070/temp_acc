import sql from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';
import { g as getConnection } from './db.mjs';

async function createServiceUnit({
  name,
  unitImage,
  category,
  region,
  serviceArea,
  address,
  phone,
  email,
  description,
  website,
  priceImage
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("name", sql.NVarChar(100), name).input("unitImage", sql.VarBinary(sql.MAX), unitImage).input("category", sql.NVarChar(50), category).input("region", sql.NVarChar(20), region).input("serviceArea", sql.NVarChar(200), serviceArea).input("address", sql.NVarChar(200), address).input("phone", sql.NVarChar(50), phone).input("email", sql.NVarChar(100), email).input("description", sql.NVarChar(sql.MAX), description).input("website", sql.NVarChar(200), website).input("priceImage", sql.VarBinary(sql.MAX), priceImage).query(`
        INSERT INTO service_units (
          name, unit_image, category, region, service_area,
          address, phone, email, description, website, price_image
        )
        VALUES (
          @name, @unitImage, @category, @region, @serviceArea,
          @address, @phone, @email, @description, @website, @priceImage
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);
    return result.recordset[0];
  } catch (err) {
    console.error("\u274C Create Service Unit Error:", err);
    throw err;
  }
}
async function getAllServiceUnits(includePriceImage = true) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT 
          id,
          name,
          category,
          region,
          service_area as serviceArea,
          address,
          phone,
          email,
          description,
          website,
          CAST(unit_image as varbinary(max)) as unitImage
          ${includePriceImage ? ", CAST(price_image as varbinary(max)) as priceImage" : ""}
        FROM service_units
        ORDER BY created_at DESC;
      `);
    return result.recordset;
  } catch (err) {
    console.error("\u274C Get All Service Units Error:", err);
    throw err;
  }
}
async function getServiceUnitById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          id,
          name,
          category,
          region,
          service_area as serviceArea,
          address,
          phone,
          email,
          description,
          website,
          CAST(unit_image as varbinary(max)) as unitImage,
          CAST(price_image as varbinary(max)) as priceImage,
          created_at as createdAt,
          updated_at as updatedAt
        FROM service_units
        WHERE id = @id;
      `);
    return result.recordset[0];
  } catch (err) {
    console.error("\u274C Get Service Unit By Id Error:", err);
    throw err;
  }
}
async function updateServiceUnit(id, {
  name,
  unitImage,
  category,
  region,
  serviceArea,
  address,
  phone,
  email,
  description,
  website,
  priceImage
}) {
  try {
    const pool = await getConnection();
    let query = `
      UPDATE service_units
      SET 
        name = @name,
        category = @category,
        region = @region,
        service_area = @serviceArea,
        address = @address,
        phone = @phone,
        email = @email,
        description = @description,
        website = @website,
        updated_at = GETDATE()
    `;
    if (unitImage) {
      query += `, unit_image = @unitImage`;
    }
    if (priceImage) {
      query += `, price_image = @priceImage`;
    }
    query += ` WHERE id = @id`;
    const request = pool.request().input("id", sql.Int, id).input("name", sql.NVarChar(100), name).input("category", sql.NVarChar(50), category).input("region", sql.NVarChar(20), region).input("serviceArea", sql.NVarChar(200), serviceArea).input("address", sql.NVarChar(200), address).input("phone", sql.NVarChar(50), phone).input("email", sql.NVarChar(100), email).input("description", sql.NVarChar(sql.MAX), description).input("website", sql.NVarChar(200), website);
    if (unitImage) {
      request.input("unitImage", sql.VarBinary(sql.MAX), unitImage);
    }
    if (priceImage) {
      request.input("priceImage", sql.VarBinary(sql.MAX), priceImage);
    }
    await request.query(query);
    return { success: true };
  } catch (err) {
    console.error("\u274C Update Service Unit Error:", err);
    throw err;
  }
}
async function deleteServiceUnit(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM service_units WHERE id = @id");
    return { success: true };
  } catch (err) {
    console.error("\u274C Delete Service Unit Error:", err);
    throw err;
  }
}

export { getAllServiceUnits as a, createServiceUnit as c, deleteServiceUnit as d, getServiceUnitById as g, updateServiceUnit as u };
//# sourceMappingURL=serviceUnitModel.mjs.map
