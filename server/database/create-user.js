import sql from 'mssql';

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

async function createUser() {
  let pool;
  
  try {
    console.log('🔗 連接到資料庫...');
    pool = await sql.connect(config);
    
    // 首先檢查 OfficerUsers 表是否存在，如果不存在就建立
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
    } else {
      console.log('📊 OfficerUsers 表已存在');
    }
    
    // 建立管理員帳號
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    const adminRole = 'admin';
    
    // 檢查使用者是否已存在
    const userExists = await pool.request()
      .input('username', sql.VarChar, adminUsername)
      .query('SELECT COUNT(*) as count FROM OfficerUsers WHERE username = @username');
    
    if (userExists.recordset[0].count > 0) {
      console.log(`⚠️  使用者 ${adminUsername} 已存在`);
      
      // 更新密碼（可選）
      const updatePassword = await pool.request()
        .input('username', sql.VarChar, adminUsername)
        .input('password', sql.VarChar, adminPassword)
        .query(`
          UPDATE OfficerUsers 
          SET password = @password, updated_at = GETDATE()
          WHERE username = @username
        `);
      
      console.log(`✅ 已更新使用者 ${adminUsername} 的密碼`);
    } else {
      // 建立新使用者
      const result = await pool.request()
        .input('username', sql.VarChar, adminUsername)
        .input('password', sql.VarChar, adminPassword)
        .input('role', sql.VarChar, adminRole)
        .query(`
          INSERT INTO OfficerUsers (username, password, role)
          OUTPUT INSERTED.*
          VALUES (@username, @password, @role)
        `);
      
      console.log('✅ 成功建立使用者:');
      console.log(`   使用者名稱: ${adminUsername}`);
      console.log(`   密碼: ${adminPassword}`);
      console.log(`   角色: ${adminRole}`);
    }
    
    // 顯示所有使用者
    console.log('\n📊 所有使用者列表:');
    const allUsers = await pool.request().query(`
      SELECT uid, username, role, created_at, updated_at
      FROM OfficerUsers
      ORDER BY uid
    `);
    
    if (allUsers.recordset.length === 0) {
      console.log('   沒有找到任何使用者');
    } else {
      allUsers.recordset.forEach(user => {
        console.log(`   ${user.uid}. ${user.username} (${user.role}) - 建立於: ${user.created_at}`);
      });
    }
    
    console.log('\n🎉 操作完成！');
    console.log('📝 登入資訊:');
    console.log(`   使用者名稱: ${adminUsername}`);
    console.log(`   密碼: ${adminPassword}`);
    console.log('   登入網址: http://localhost:3000/admin/login');
    
  } catch (err) {
    console.error('❌ 錯誤:', err.message);
    if (err.message.includes('Violation of UNIQUE KEY constraint')) {
      console.error('   使用者名稱已存在');
    }
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// 執行建立使用者
createUser();