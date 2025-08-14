import sql from 'mssql';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 資料庫配置（與 server/config/db.js 保持一致）
const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'yourStrong(!)Password',
  server: process.env.DB_SERVER || 'localhost',
  port: 1433,
  database: process.env.DB_NAME || 'test_two',
  options: {
    encrypt: false,  // 與您的設定保持一致
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function initDatabase() {
  let pool;
  
  try {
    console.log('🚀 開始初始化資料庫...');
    
    // 連接到 master 資料庫來創建新資料庫
    const masterConfig = { ...config, database: 'master' };
    pool = await sql.connect(masterConfig);
    
    // 檢查資料庫是否存在
    const dbCheck = await pool.request()
      .query(`SELECT database_id FROM sys.databases WHERE name = '${config.database}'`);
    
    if (dbCheck.recordset.length === 0) {
      console.log(`📦 建立資料庫 ${config.database}...`);
      await pool.request().query(`CREATE DATABASE ${config.database}`);
      console.log('✅ 資料庫建立成功');
    } else {
      console.log(`📦 資料庫 ${config.database} 已存在`);
    }
    
    // 關閉連接
    await pool.close();
    
    // 連接到新資料庫
    console.log(`🔗 連接到資料庫 ${config.database}...`);
    pool = await sql.connect(config);
    
    // 讀取並執行 SQL 腳本
    console.log('📝 讀取 SQL 腳本...');
    const sqlScript = await fs.readFile(
      path.join(__dirname, 'create_tables.sql'),
      'utf-8'
    );
    
    // 分割 SQL 語句（按分號分割，因為我們的腳本使用分號）
    const statements = sqlScript
      .split(';')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => stmt.trim());
    
    console.log(`🔨 執行 ${statements.length} 個 SQL 語句...`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      
      // 跳過註解和空語句
      if (!statement || statement.startsWith('--') || statement === 'GO') {
        continue;
      }
      
      // 跳過 USE 語句（我們已經連接到正確的資料庫）
      if (statement.toUpperCase().startsWith('USE ')) {
        continue;
      }
      
      try {
        await pool.request().query(statement);
        
        // 識別語句類型並輸出相應訊息
        if (statement.toUpperCase().includes('CREATE TABLE')) {
          const tableName = statement.match(/CREATE TABLE (\w+)/i)?.[1];
          console.log(`  ✅ 建立表格 ${tableName}`);
        } else if (statement.toUpperCase().includes('CREATE INDEX')) {
          const indexName = statement.match(/CREATE INDEX (\w+)/i)?.[1];
          console.log(`  ✅ 建立索引 ${indexName}`);
        } else if (statement.toUpperCase().includes('INSERT INTO')) {
          const tableName = statement.match(/INSERT INTO (\w+)/i)?.[1];
          console.log(`  ✅ 插入資料到 ${tableName}`);
        }
      } catch (err) {
        // 如果表格已存在，跳過錯誤
        if (err.message.includes('already exists')) {
          const tableName = statement.match(/CREATE TABLE (\w+)/i)?.[1];
          console.log(`  ⚠️  表格 ${tableName} 已存在，跳過`);
        } else {
          console.error(`  ❌ 執行語句失敗:`, err.message);
          console.error(`     語句: ${statement.substring(0, 100)}...`);
        }
      }
    }
    
    console.log('\n🎉 資料庫初始化完成！');
    
    // 驗證表格
    console.log('\n📊 驗證已建立的表格:');
    const tables = await pool.request().query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE' 
      ORDER BY TABLE_NAME
    `);
    
    tables.recordset.forEach(table => {
      console.log(`  ✓ ${table.TABLE_NAME}`);
    });
    
  } catch (err) {
    console.error('❌ 資料庫初始化失敗:', err);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// 執行初始化
initDatabase().then(() => {
  console.log('\n✨ 所有操作完成');
  process.exit(0);
}).catch(err => {
  console.error('錯誤:', err);
  process.exit(1);
});