import sql from 'mssql';
import readline from 'readline';

const config = {
  user: 'sa',
  password: 'yourStrong(!)Password',
  server: 'localhost',
  port: 1433,
  database: 'test_two',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function showMenu() {
  console.log('\n========== 使用者管理系統 ==========');
  console.log('1. 顯示所有使用者');
  console.log('2. 新增使用者');
  console.log('3. 修改使用者密碼');
  console.log('4. 刪除使用者');
  console.log('5. 退出');
  console.log('=====================================');
  
  const choice = await question('請選擇操作 (1-5): ');
  return choice;
}

async function listUsers(pool) {
  const result = await pool.request().query(`
    SELECT uid, username, role, created_at, updated_at
    FROM OfficerUsers
    ORDER BY uid
  `);
  
  if (result.recordset.length === 0) {
    console.log('\n❌ 沒有找到任何使用者');
  } else {
    console.log('\n📊 使用者列表:');
    console.log('---------------------------------------------');
    result.recordset.forEach(user => {
      console.log(`ID: ${user.uid} | 使用者: ${user.username} | 角色: ${user.role}`);
      console.log(`   建立時間: ${user.created_at}`);
      console.log('---------------------------------------------');
    });
  }
  return result.recordset;
}

async function addUser(pool) {
  console.log('\n=== 新增使用者 ===');
  const username = await question('使用者名稱: ');
  const password = await question('密碼: ');
  const role = await question('角色 (admin/user) [預設: admin]: ') || 'admin';
  
  try {
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .input('role', sql.VarChar, role)
      .query(`
        INSERT INTO OfficerUsers (username, password, role)
        VALUES (@username, @password, @role)
      `);
    
    console.log(`✅ 成功建立使用者: ${username}`);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      console.log(`❌ 使用者名稱 ${username} 已存在`);
    } else {
      console.error('❌ 建立失敗:', err.message);
    }
  }
}

async function updatePassword(pool) {
  await listUsers(pool);
  console.log('\n=== 修改密碼 ===');
  const username = await question('請輸入要修改的使用者名稱: ');
  const newPassword = await question('請輸入新密碼: ');
  
  try {
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, newPassword)
      .query(`
        UPDATE OfficerUsers 
        SET password = @password, updated_at = GETDATE()
        WHERE username = @username
      `);
    
    if (result.rowsAffected[0] > 0) {
      console.log(`✅ 成功更新使用者 ${username} 的密碼`);
    } else {
      console.log(`❌ 找不到使用者: ${username}`);
    }
  } catch (err) {
    console.error('❌ 更新失敗:', err.message);
  }
}

async function deleteUser(pool) {
  await listUsers(pool);
  console.log('\n=== 刪除使用者 ===');
  const username = await question('請輸入要刪除的使用者名稱: ');
  const confirm = await question(`確定要刪除使用者 ${username} 嗎？(y/n): `);
  
  if (confirm.toLowerCase() === 'y') {
    try {
      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('DELETE FROM OfficerUsers WHERE username = @username');
      
      if (result.rowsAffected[0] > 0) {
        console.log(`✅ 成功刪除使用者: ${username}`);
      } else {
        console.log(`❌ 找不到使用者: ${username}`);
      }
    } catch (err) {
      console.error('❌ 刪除失敗:', err.message);
    }
  } else {
    console.log('已取消刪除操作');
  }
}

async function main() {
  let pool;
  
  try {
    console.log('🔗 連接到資料庫...');
    pool = await sql.connect(config);
    console.log('✅ 連接成功\n');
    
    // 確保 OfficerUsers 表存在
    const tableExists = await pool.request().query(`
      SELECT COUNT(*) as count
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME = 'OfficerUsers'
    `);
    
    if (tableExists.recordset[0].count === 0) {
      console.log('📦 建立 OfficerUsers 表...');
      await pool.request().query(`
        CREATE TABLE OfficerUsers (
          uid INT IDENTITY(1,1) PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          created_at DATETIME DEFAULT GETDATE(),
          updated_at DATETIME DEFAULT GETDATE()
        )
      `);
      console.log('✅ OfficerUsers 表建立成功');
    }
    
    let exit = false;
    while (!exit) {
      const choice = await showMenu();
      
      switch (choice) {
        case '1':
          await listUsers(pool);
          break;
        case '2':
          await addUser(pool);
          break;
        case '3':
          await updatePassword(pool);
          break;
        case '4':
          await deleteUser(pool);
          break;
        case '5':
          exit = true;
          console.log('\n👋 再見！');
          break;
        default:
          console.log('\n❌ 無效的選擇，請重試');
      }
      
      if (!exit) {
        await question('\n按 Enter 繼續...');
      }
    }
    
  } catch (err) {
    console.error('❌ 資料庫錯誤:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
    rl.close();
  }
}

// 執行主程式
main();