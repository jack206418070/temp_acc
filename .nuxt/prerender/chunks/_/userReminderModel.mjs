import sql from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';
import { g as getConnection } from './db.mjs';

async function getUserReminder() {
  try {
    const pool = await getConnection();
    const query = `
      SELECT 
        id,
        content,
        created_at,
        updated_at
      FROM user_reminders
      WHERE id = 1
    `;
    const result = await pool.request().query(query);
    return result.recordset[0] || { id: null, content: "", created_at: null, updated_at: null };
  } catch (error) {
    console.error("\u274C Get User Reminder Error:", error);
    throw error;
  }
}
async function updateUserReminder(content) {
  try {
    const pool = await getConnection();
    const query = `
      MERGE user_reminders AS target
      USING (SELECT 1 AS id) AS source
      ON (target.id = source.id)
      WHEN MATCHED THEN
        UPDATE SET content = @content, updated_at = GETDATE()
      WHEN NOT MATCHED THEN
        INSERT (content) VALUES (@content);

      SELECT 
        id,
        content,
        created_at,
        updated_at
      FROM user_reminders
      WHERE id = 1;
    `;
    const result = await pool.request().input("content", sql.NVarChar(sql.MAX), content).query(query);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update User Reminder Error:", error);
    throw error;
  }
}

export { getUserReminder as g, updateUserReminder as u };
//# sourceMappingURL=userReminderModel.mjs.map
