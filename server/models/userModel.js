import { getConnection } from '../config/db.js';

// ✅ 驗證用戶
export async function validateUser(username, password) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('username', username)
      .input('password', password)
      .query(`
        SELECT uid, username, role 
        FROM OfficerUsers
        WHERE username = @username AND password = @password
      `);
    
    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ Validation Error:', error);
    throw error;
  }
}

// ✅ 取得所有用戶
export async function getAllUsers() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT id, username, role FROM OfficerUsers');
    return result.recordset;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 依 ID 取得用戶
export async function getUserById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .query('SELECT id, username, role FROM OfficerUsers WHERE id = @id');

    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error('❌ Query Error:', error);
    throw error;
  }
}

// ✅ 新增用戶
export async function createUser(username, password, role = 'user') {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('username', username)
      .input('password', password)
      .input('role', role)
      .query(`
        INSERT INTO OfficerUsers (username, password, role)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.role
        VALUES (@username, @password, @role)
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Insert Error:', error);
    throw error;
  }
}

// ✅ 更新用戶
export async function updateUser(id, username, password, role) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', id)
      .input('username', username)
      .input('password', password)
      .input('role', role)
      .query(`
        UPDATE OfficerUsers
        SET username = @username, 
            password = CASE WHEN @password = '' THEN password ELSE @password END,
            role = @role
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.role
        WHERE id = @id
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('❌ Update Error:', error);
    throw error;
  }
}

// ✅ 刪除用戶
export async function deleteUser(id) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', id)
      .query('DELETE FROM OfficerUsers WHERE id = @id');
    return { message: '刪除成功' };
  } catch (error) {
    console.error('❌ Delete Error:', error);
    throw error;
  }
} 