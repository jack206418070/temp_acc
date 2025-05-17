import sql from 'mssql';

const config = {
  user: 'sa',
  password: 'MyS3cretPassw0rd',
  server: '43.207.146.80',
  port: 1433,
  database: 'test_two',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function initializeDatabase() {
  let pool;
  let transaction;
  
  try {
    console.log('開始連接資料庫...');
    pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    
    console.log('開始交易...');
    await transaction.begin();

    // 1. 先找出並刪除所有外鍵約束
    console.log('開始刪除外鍵約束...');
    try {
      await transaction.request().query(`
        DECLARE @sql NVARCHAR(MAX) = '';
        SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id))
          + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) 
          + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
        FROM sys.foreign_keys;
        EXEC sp_executesql @sql;
      `);
      console.log('✅ 所有外鍵約束已刪除');
    } catch (error) {
      console.error('刪除外鍵約束時發生錯誤:', error);
      throw error;
    }

    // 2. 刪除所有表格
    console.log('開始刪除現有表格...');
    try {
      await transaction.request().query(`
        IF OBJECT_ID('user_reminders', 'U') IS NOT NULL DROP TABLE user_reminders;
        IF OBJECT_ID('announcements', 'U') IS NOT NULL DROP TABLE announcements;
        IF OBJECT_ID('users', 'U') IS NOT NULL DROP TABLE users;
        IF OBJECT_ID('languages', 'U') IS NOT NULL DROP TABLE languages;
        IF OBJECT_ID('banners', 'U') IS NOT NULL DROP TABLE banners;
        IF OBJECT_ID('qa', 'U') IS NOT NULL DROP TABLE qa;
        IF OBJECT_ID('qa_categories', 'U') IS NOT NULL DROP TABLE qa_categories;
        IF OBJECT_ID('qa_contents', 'U') IS NOT NULL DROP TABLE qa_contents;
        IF OBJECT_ID('knowledge', 'U') IS NOT NULL DROP TABLE knowledge;
        IF OBJECT_ID('service_units', 'U') IS NOT NULL DROP TABLE service_units;
        IF OBJECT_ID('announcement_images', 'U') IS NOT NULL DROP TABLE announcement_images;
      `);
      console.log('✅ 所有表格刪除完成');
    } catch (error) {
      console.error('刪除表格時發生錯誤:', error);
      throw error;
    }

    // 3. CREATE（含外鍵）
    console.log('開始創建新表格...');
    
    // Users
    try {
      await transaction.request().query(`
        CREATE TABLE Users (
          password varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          [role] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          username varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          uid int NULL
        )
      `);
      console.log('✅ Users 表格創建完成');
    } catch (error) {
      console.error('創建 Users 表格時發生錯誤:', error);
      throw error;
    }

    // Languages
    try {
      await transaction.request().query(`
        CREATE TABLE Languages (
          id int IDENTITY(1,1) NOT NULL,
          code varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          name nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__Language__3213E83F5E39B80C PRIMARY KEY (id),
          CONSTRAINT UQ__Language__357D4CF9D2859F6D UNIQUE (code)
        )
      `);
      console.log('✅ Languages 表格創建完成');
    } catch (error) {
      console.error('創建 Languages 表格時發生錯誤:', error);
      throw error;
    }

    // Banners
    try {
      await transaction.request().query(`
        CREATE TABLE Banners (
          id int IDENTITY(1,1) NOT NULL,
          title nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          description nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          image_data varbinary(MAX) NULL,
          image_type nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          sort_order int DEFAULT 0 NULL,
          is_active bit DEFAULT 1 NULL,
          is_deleted bit DEFAULT 0 NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          CONSTRAINT PK__Banners__3213E83FE0E992A3 PRIMARY KEY (id)
        )
      `);
      console.log('✅ Banners 表格創建完成');
    } catch (error) {
      console.error('創建 Banners 表格時發生錯誤:', error);
      throw error;
    }

    // Announcements
    try {
      await transaction.request().query(`
        CREATE TABLE Announcements (
          id int IDENTITY(1,1) NOT NULL,
          publish_date varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          activity_start_date varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          category nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          content nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          title nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          link nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          image_id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          linkTitle nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__Announce__3213E83F9812D79E PRIMARY KEY (id)
        )
      `);
      console.log('✅ Announcements 表格創建完成');
    } catch (error) {
      console.error('創建 Announcements 表格時發生錯誤:', error);
      throw error;
    }

    // AnnouncementImages
    try {
      await transaction.request().query(`
        CREATE TABLE AnnouncementImages (
          id int IDENTITY(1,1) NOT NULL,
          announcement_id int NOT NULL,
          image_id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          image_content varbinary(MAX) NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__Announce__3213E83F3BEB8D9B PRIMARY KEY (id),
          CONSTRAINT FK__Announcem__annou__5070F446 FOREIGN KEY (announcement_id) REFERENCES Announcements(id)
        );
        CREATE NONCLUSTERED INDEX IX_AnnouncementImages_ImageId ON AnnouncementImages (image_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
      `);
      console.log('✅ AnnouncementImages 表格創建完成');
    } catch (error) {
      console.error('創建 AnnouncementImages 表格時發生錯誤:', error);
      throw error;
    }

    // QACategories
    try {
      await transaction.request().query(`
        CREATE TABLE QACategories (
          id int IDENTITY(1,1) NOT NULL,
          parent_id int NULL,
          name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          name_en nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_vi nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_th nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__QACatego__3213E83FF77C39C8 PRIMARY KEY (id),
          CONSTRAINT FK__QACategor__paren__5BE2A6F2 FOREIGN KEY (parent_id) REFERENCES QACategories(id)
        )
      `);
      console.log('✅ QACategories 表格創建完成');
    } catch (error) {
      console.error('創建 QACategories 表格時發生錯誤:', error);
      throw error;
    }

    // QA
    try {
      await transaction.request().query(`
        CREATE TABLE QA (
          question varchar(128) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          answer varchar(512) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          category int NULL,
          created_at varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          id int IDENTITY(1,1) NOT NULL,
          CONSTRAINT PK__QA__3213E83F924C792C PRIMARY KEY (id)
        )
      `);
      console.log('✅ QA 表格創建完成');
    } catch (error) {
      console.error('創建 QA 表格時發生錯誤:', error);
      throw error;
    }

    // QAContents
    try {
      await transaction.request().query(`
        CREATE TABLE QAContents (
          id int IDENTITY(1,1) NOT NULL,
          category_id int NOT NULL,
          language_id int NOT NULL,
          question nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          answer nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          sort_order int DEFAULT 0 NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__QAConten__3213E83F15E47525 PRIMARY KEY (id),
          CONSTRAINT FK__QAContent__categ__628FA481 FOREIGN KEY (category_id) REFERENCES QACategories(id),
          CONSTRAINT FK__QAContent__langu__6383C8BA FOREIGN KEY (language_id) REFERENCES Languages(id)
        );
        CREATE NONCLUSTERED INDEX idx_qa_category ON QAContents (category_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
        CREATE NONCLUSTERED INDEX idx_qa_language ON QAContents (language_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
        CREATE NONCLUSTERED INDEX idx_qa_sort ON QAContents (sort_order ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
      `);
      console.log('✅ QAContents 表格創建完成');
    } catch (error) {
      console.error('創建 QAContents 表格時發生錯誤:', error);
      throw error;
    }

    // Knowledge
    try {
      await transaction.request().query(`
        CREATE TABLE knowledge (
          kid int IDENTITY(1,1) NOT NULL,
          know_category int NOT NULL,
          image_type varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          image_data varbinary(MAX) NOT NULL,
          created_at datetime DEFAULT getdate() NOT NULL,
          updated_at datetime NOT NULL,
          title nvarchar(50) COLLATE Chinese_Taiwan_Stroke_CI_AS NULL,
          display_order int DEFAULT 0 NULL,
          image_url varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__knowledg__DFDFDF3E7412647D PRIMARY KEY (kid)
        )
      `);
      console.log('✅ knowledge 表格創建完成');
    } catch (error) {
      console.error('創建 knowledge 表格時發生錯誤:', error);
      throw error;
    }

    // Service Units
    try {
      await transaction.request().query(`
        CREATE TABLE service_units (
          id int IDENTITY(1,1) NOT NULL,
          name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          unit_image varbinary(MAX) NULL,
          category nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          region nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          service_area nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          address nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          phone nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          email nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          website nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          price_image varbinary(MAX) NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          CONSTRAINT PK__service___3213E83FC7684B48 PRIMARY KEY (id)
        )
      `);
      console.log('✅ service_units 表格創建完成');
    } catch (error) {
      console.error('創建 service_units 表格時發生錯誤:', error);
      throw error;
    }

    // User Reminders
    try {
      await transaction.request().query(`
        CREATE TABLE user_reminders (
          id int IDENTITY(1,1) NOT NULL,
          content nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime2 DEFAULT getdate() NULL,
          updated_at datetime2 DEFAULT getdate() NULL,
          CONSTRAINT PK__user_rem__3213E83FA474AAFD PRIMARY KEY (id)
        )
      `);
      console.log('✅ user_reminders 表格創建完成');
    } catch (error) {
      console.error('創建 user_reminders 表格時發生錯誤:', error);
      throw error;
    }

    console.log('提交交易...');
    await transaction.commit();
    console.log('✅ 交易提交成功');

    // 4. 檢查 Users 表，若無資料則新增預設帳號
    console.log('檢查是否需要創建預設帳號...');
    const checkUser = await pool.request().query('SELECT COUNT(*) as cnt FROM users');
    
    if (checkUser.recordset[0].cnt === 0) {
      console.log('開始創建預設帳號...');
      await pool.request().query(`
        INSERT INTO users (username, password, role)
        VALUES ('adminUser', 'strong(Password)', 'admin')
      `);
      console.log('✅ 預設管理員帳號創建完成');
    } else {
      console.log('已有數據存在，跳過預設帳號創建');
    }

  } catch (error) {
    console.error('❌ 資料庫初始化失敗:', error);
    if (transaction) {
      try {
        console.log('嘗試回滾交易...');
        await transaction.rollback();
        console.log('✅ 交易回滾成功');
      } catch (rollbackError) {
        console.error('交易回滾失敗:', rollbackError);
      }
    }
    throw error;
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log('資料庫連接已關閉');
      } catch (closeError) {
        console.error('關閉資料庫連接時發生錯誤:', closeError);
      }
    }
  }
} 