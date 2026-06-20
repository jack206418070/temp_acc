import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import sql from 'mssql';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';

const config = {
  user: "accompanyservice",
  password: "!QAZ8520@wsx",
  server: "172.21.50.165",
  // Docker 內部使用 'localhost'
  port: 1433,
  database: "accompanyservice",
  options: {
    encrypt: false,
    // 若有 SSL 問題請設為 false
    trustServerCertificate: true
  }
};
async function initializeDatabase() {
  let pool;
  let transaction;
  try {
    console.log("\u958B\u59CB\u9023\u63A5\u8CC7\u6599\u5EAB...");
    pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    console.log("\u958B\u59CB\u4EA4\u6613...");
    await transaction.begin();
    console.log("\u958B\u59CB\u522A\u9664\u5916\u9375\u7D04\u675F...");
    try {
      await transaction.request().query(`
        DECLARE @sql NVARCHAR(MAX) = '';
        SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id))
          + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) 
          + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
        FROM sys.foreign_keys;
        EXEC sp_executesql @sql;
      `);
      console.log("\u2705 \u6240\u6709\u5916\u9375\u7D04\u675F\u5DF2\u522A\u9664");
    } catch (error) {
      console.error("\u522A\u9664\u5916\u9375\u7D04\u675F\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u958B\u59CB\u522A\u9664\u73FE\u6709\u8868\u683C...");
    try {
      await transaction.request().query(`
        IF OBJECT_ID('user_reminders', 'U') IS NOT NULL DROP TABLE user_reminders;
        IF OBJECT_ID('announcements', 'U') IS NOT NULL DROP TABLE announcements;
        IF OBJECT_ID('officerusers', 'U') IS NOT NULL DROP TABLE officerusers;
        IF OBJECT_ID('languages', 'U') IS NOT NULL DROP TABLE languages;
        IF OBJECT_ID('banners', 'U') IS NOT NULL DROP TABLE banners;
        IF OBJECT_ID('qa', 'U') IS NOT NULL DROP TABLE qa;
        IF OBJECT_ID('qa_categories', 'U') IS NOT NULL DROP TABLE qa_categories;
        IF OBJECT_ID('qa_contents', 'U') IS NOT NULL DROP TABLE qa_contents;
        IF OBJECT_ID('knowledge', 'U') IS NOT NULL DROP TABLE knowledge;
        IF OBJECT_ID('service_units', 'U') IS NOT NULL DROP TABLE service_units;
        IF OBJECT_ID('announcement_images', 'U') IS NOT NULL DROP TABLE announcement_images;
      `);
      console.log("\u2705 \u6240\u6709\u8868\u683C\u522A\u9664\u5B8C\u6210");
    } catch (error) {
      console.error("\u522A\u9664\u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u958B\u59CB\u5275\u5EFA\u65B0\u8868\u683C...");
    try {
      await transaction.request().query(`
        CREATE TABLE OfficerUsers (
          password varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          [role] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          username varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          uid int NULL
        )
      `);
      console.log("\u2705 Users \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Users \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 Languages \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Languages \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 Banners \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Banners \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 Announcements \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Announcements \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 AnnouncementImages \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA AnnouncementImages \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 QACategories \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QACategories \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 QA \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QA \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 QAContents \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QAContents \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 knowledge \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA knowledge \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 service_units \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA service_units \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
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
      console.log("\u2705 user_reminders \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA user_reminders \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u63D0\u4EA4\u4EA4\u6613...");
    await transaction.commit();
    console.log("\u2705 \u4EA4\u6613\u63D0\u4EA4\u6210\u529F");
    console.log("\u6AA2\u67E5\u662F\u5426\u9700\u8981\u5275\u5EFA\u9810\u8A2D\u5E33\u865F...");
    const checkUser = await pool.request().query("SELECT COUNT(*) as cnt FROM officerusers");
    if (checkUser.recordset[0].cnt === 0) {
      console.log("\u958B\u59CB\u5275\u5EFA\u9810\u8A2D\u5E33\u865F...");
      await pool.request().query(`
        INSERT INTO officerusers (username, password, role)
        VALUES ('adminUser', 'strong(Password)', 'admin')
      `);
      console.log("\u2705 \u9810\u8A2D\u7BA1\u7406\u54E1\u5E33\u865F\u5275\u5EFA\u5B8C\u6210");
    } else {
      console.log("\u5DF2\u6709\u6578\u64DA\u5B58\u5728\uFF0C\u8DF3\u904E\u9810\u8A2D\u5E33\u865F\u5275\u5EFA");
    }
  } catch (error) {
    console.error("\u274C \u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5931\u6557:", error);
    if (transaction) {
      try {
        console.log("\u5617\u8A66\u56DE\u6EFE\u4EA4\u6613...");
        await transaction.rollback();
        console.log("\u2705 \u4EA4\u6613\u56DE\u6EFE\u6210\u529F");
      } catch (rollbackError) {
        console.error("\u4EA4\u6613\u56DE\u6EFE\u5931\u6557:", rollbackError);
      }
    }
    throw error;
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log("\u8CC7\u6599\u5EAB\u9023\u63A5\u5DF2\u95DC\u9589");
      } catch (closeError) {
        console.error("\u95DC\u9589\u8CC7\u6599\u5EAB\u9023\u63A5\u6642\u767C\u751F\u932F\u8AA4:", closeError);
      }
    }
  }
}

const index_get = defineEventHandler(async (event) => {
  try {
    initializeDatabase().catch((error) => {
      console.error("\u274C \u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5931\u6557:", error);
      process.exit(1);
    });
    return { success: true, data };
  } catch (error) {
    console.error("Get Knowledge List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u77E5\u8B58\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
