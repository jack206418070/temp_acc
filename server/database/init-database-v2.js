import sql from 'mssql';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 資料庫配置
const config = {
  user: 'sa',
  password: 'yourStrong(!)Password',
  server: 'localhost',
  port: 1433,
  database: 'test_two',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

async function initDatabase() {
  let pool;
  
  try {
    console.log('🚀 開始初始化資料庫...\n');
    
    // 連接到資料庫
    console.log(`🔗 連接到資料庫 ${config.database}...`);
    pool = await sql.connect(config);
    console.log('✅ 連接成功\n');
    
    // 讀取 SQL 腳本
    console.log('📝 讀取 SQL 腳本...');
    const sqlScript = await fs.readFile(
      path.join(__dirname, 'create_tables.sql'),
      'utf-8'
    );
    
    // 定義所有的 CREATE TABLE 語句
    const createTableStatements = [
      // Users 表
      `CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // Languages 表
      `CREATE TABLE Languages (
        id INT IDENTITY(1,1) PRIMARY KEY,
        code VARCHAR(5) NOT NULL UNIQUE,
        name NVARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // Announcements 表
      `CREATE TABLE Announcements (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(200) NOT NULL,
        category NVARCHAR(50) NOT NULL,
        content NVARCHAR(MAX),
        publish_date VARCHAR(10) NOT NULL,
        activity_start_date VARCHAR(10) NOT NULL,
        link NVARCHAR(500),
        linkTitle NVARCHAR(200),
        image_id VARCHAR(50),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // AnnouncementImages 表
      `CREATE TABLE AnnouncementImages (
        id INT IDENTITY(1,1) PRIMARY KEY,
        announcement_id INT NOT NULL,
        image_id VARCHAR(50) NOT NULL,
        image_content VARBINARY(MAX) NOT NULL,
        file_type VARCHAR(10) DEFAULT 'image',
        original_filename NVARCHAR(255),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0,
        FOREIGN KEY (announcement_id) REFERENCES Announcements(id)
      )`,
      
      // ServiceUnits 表
      `CREATE TABLE ServiceUnits (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        service_area NVARCHAR(100) NOT NULL,
        contact_info NVARCHAR(500),
        service_content NVARCHAR(MAX),
        price_image VARBINARY(MAX),
        unit_image VARBINARY(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // QACategories 表
      `CREATE TABLE QACategories (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        order_num INT DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // QA 表
      `CREATE TABLE QA (
        id INT IDENTITY(1,1) PRIMARY KEY,
        category_id INT NOT NULL,
        order_num INT DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0,
        FOREIGN KEY (category_id) REFERENCES QACategories(id)
      )`,
      
      // QAContents 表
      `CREATE TABLE QAContents (
        id INT IDENTITY(1,1) PRIMARY KEY,
        qa_id INT NOT NULL,
        language_id INT NOT NULL,
        question NVARCHAR(MAX) NOT NULL,
        answer NVARCHAR(MAX) NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0,
        FOREIGN KEY (qa_id) REFERENCES QA(id),
        FOREIGN KEY (language_id) REFERENCES Languages(id)
      )`,
      
      // Knowledge 表
      `CREATE TABLE Knowledge (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(200) NOT NULL,
        image_content VARBINARY(MAX),
        category NVARCHAR(50),
        order_num INT DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // Banners 表
      `CREATE TABLE Banners (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(200),
        image_content VARBINARY(MAX) NOT NULL,
        link NVARCHAR(500),
        order_num INT DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        is_deleted BIT DEFAULT 0
      )`,
      
      // UserReminders 表
      `CREATE TABLE UserReminders (
        id INT IDENTITY(1,1) PRIMARY KEY,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
      )`
    ];
    
    const tableNames = [
      'Users', 'Languages', 'Announcements', 'AnnouncementImages',
      'ServiceUnits', 'QACategories', 'QA', 'QAContents',
      'Knowledge', 'Banners', 'UserReminders'
    ];
    
    console.log(`🔨 準備建立 ${tableNames.length} 個表格...\n`);
    
    // 建立每個表格
    for (let i = 0; i < createTableStatements.length; i++) {
      const tableName = tableNames[i];
      
      try {
        // 檢查表格是否已存在
        const tableExists = await pool.request()
          .input('tableName', sql.NVarChar, tableName)
          .query(`
            SELECT COUNT(*) as count
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_NAME = @tableName
          `);
        
        if (tableExists.recordset[0].count > 0) {
          console.log(`  ⚠️  表格 ${tableName} 已存在，跳過`);
          continue;
        }
        
        // 建立表格
        await pool.request().query(createTableStatements[i]);
        console.log(`  ✅ 建立表格 ${tableName}`);
        
      } catch (err) {
        console.error(`  ❌ 建立表格 ${tableName} 失敗:`, err.message);
      }
    }
    
    // 建立索引
    console.log('\n📐 建立索引...');
    const indexStatements = [
      'CREATE INDEX IX_AnnouncementImages_AnnouncementId ON AnnouncementImages(announcement_id)',
      'CREATE INDEX IX_AnnouncementImages_FileType ON AnnouncementImages(file_type)',
      'CREATE INDEX IX_Announcements_Category ON Announcements(category)',
      'CREATE INDEX IX_Announcements_PublishDate ON Announcements(publish_date)',
      'CREATE INDEX IX_QAContents_QAId ON QAContents(qa_id)',
      'CREATE INDEX IX_QAContents_LanguageId ON QAContents(language_id)'
    ];
    
    for (const indexStmt of indexStatements) {
      try {
        await pool.request().query(indexStmt);
        const indexName = indexStmt.match(/CREATE INDEX (\w+)/i)?.[1];
        console.log(`  ✅ 建立索引 ${indexName}`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          const indexName = indexStmt.match(/CREATE INDEX (\w+)/i)?.[1];
          console.log(`  ⚠️  索引 ${indexName} 已存在`);
        } else {
          console.error(`  ⚠️  建立索引失敗:`, err.message);
        }
      }
    }
    
    // 插入預設語言資料
    console.log('\n📝 插入預設資料...');
    try {
      const langCount = await pool.request()
        .query('SELECT COUNT(*) as count FROM Languages');
      
      if (langCount.recordset[0].count === 0) {
        await pool.request().query(`
          INSERT INTO Languages (code, name) VALUES
          ('zh', N'繁體中文'),
          ('en', N'English'),
          ('vi', N'Tiếng Việt'),
          ('id', N'Bahasa Indonesia'),
          ('th', N'ภาษาไทย')
        `);
        console.log('  ✅ 插入預設語言資料');
      } else {
        console.log('  ⚠️  語言資料已存在');
      }
    } catch (err) {
      console.error('  ⚠️  插入語言資料失敗:', err.message);
    }
    
    // 驗證表格
    console.log('\n📊 驗證已建立的表格:');
    const tables = await pool.request().query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE' 
      ORDER BY TABLE_NAME
    `);
    
    if (tables.recordset.length === 0) {
      console.log('  ❌ 沒有找到任何表格');
    } else {
      console.log(`  找到 ${tables.recordset.length} 個表格:`);
      tables.recordset.forEach(table => {
        console.log(`    ✓ ${table.TABLE_NAME}`);
      });
    }
    
    console.log('\n🎉 資料庫初始化完成！');
    
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