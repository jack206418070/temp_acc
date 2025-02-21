import sql from 'mssql';
import poolPromise from '../config/db.js';

const createTableQuery = `
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='QA' and xtype='U')
BEGIN
    CREATE TABLE QA (
        id INT IDENTITY(1,1) PRIMARY KEY,
        question NVARCHAR(MAX) NOT NULL,
        answer NVARCHAR(MAX) NOT NULL,
        category INT CHECK (category BETWEEN 1 AND 4) NOT NULL
    );
    PRINT 'Table QA created successfully!'
END
ELSE
BEGIN
    PRINT 'Table QA already exists!'
END
`;

const insertTestData = `
IF NOT EXISTS (SELECT * FROM QA)
BEGIN
    INSERT INTO QA (question, answer, category)
    VALUES (N'什麼是 Vue.js？', N'Vue.js 是一個用於構建用戶界面的漸進式框架', 1),
           (N'什麼是 Nuxt.js？', N'Nuxt.js 是一個基於 Vue.js 的通用應用框架', 2),
           (N'什麼是 API？', N'API 是應用程序接口，用於不同軟件系統之間的通信', 3);
    PRINT 'Test data inserted successfully!'
END
`;

async function initDatabase() {
  console.log('開始初始化數據庫...');
  try {
    console.log('等待數據庫連接...');
    const pool = await poolPromise;
    console.log('數據庫連接成功，開始創建表...');
    
    await pool.request().query(createTableQuery);
    console.log('表創建完成，開始插入測試數據...');
    
    await pool.request().query(insertTestData);
    console.log('✅ 數據庫初始化完成！');
  } catch (err) {
    console.error('❌ 數據庫初始化失敗！錯誤詳情：', err);
    // 顯示更詳細的錯誤信息
    if (err.code) {
      console.error('錯誤代碼：', err.code);
    }
    if (err.originalError) {
      console.error('原始錯誤：', err.originalError);
    }
  }
}

// 確保腳本執行
console.log('初始化腳本已加載');
initDatabase(); 