import sql from 'mssql';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const sqlFiles = [
  'Languages_202505172204.sql',
  'Users_202505172205.sql',
  'QACategories_202505172205.sql',
  'Announcements_202505172204.sql',
  'AnnouncementImages_202505172204.sql',
  'Banners_202505172204.sql',
  'QA_202505172204.sql',
  'QAContents_202505172205.sql',
  'knowledge_202505172205.sql',
  'service_units_202505172205.sql',
  'user_reminders_202505172205.sql'
];

// 清空表格的順序（考慮外鍵關係）
const truncateOrder = [
  'user_reminders',
  'QAContents',
  'QA',
  'QACategories',
  'AnnouncementImages',
  'Announcements',
  'Banners',
  'knowledge',
  'service_units',
  'Users',
  'Languages'
];

// 有 identity 欄位的表格
const identityTables = [
  'user_reminders',
  'QAContents',
  'QA',
  'QACategories',
  'AnnouncementImages',
  'Announcements',
  'Banners',
  'knowledge',
  'service_units',
  // 'Users', // Users 沒有 identity 欄位
  // 'Languages' // Languages 沒有 identity 欄位
];

async function truncateTables(transaction) {
  console.log('開始清空表格...');
  
  // 先禁用所有外鍵約束
  await transaction.request().query(`
    EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'
  `);
  
  // 清空表格
  for (const table of truncateOrder) {
    try {
      await transaction.request().query(`DELETE FROM ${table}`);
      if (identityTables.includes(table)) {
        await transaction.request().query(`DBCC CHECKIDENT ('${table}', RESEED, 0)`);
        console.log(`✅ ${table} 表格已清空並重設自增主鍵`);
      } else {
        console.log(`✅ ${table} 表格已清空`);
      }
    } catch (error) {
      console.error(`清空 ${table} 表格時發生錯誤:`, error);
      throw error;
    }
  }
  
  // 重新啟用所有外鍵約束
  await transaction.request().query(`
    EXEC sp_MSforeachtable 'ALTER TABLE ? CHECK CONSTRAINT ALL'
  `);
  
  console.log('✅ 所有表格清空完成');
}

async function importData() {
  let pool;
  let transaction;
  
  try {
    console.log('開始連接資料庫...');
    pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    
    console.log('開始交易...');
    await transaction.begin();

    // 先清空所有表格
    await truncateTables(transaction);

    // 開始匯入資料
    for (const file of sqlFiles) {
      try {
        const filePath = path.join(__dirname, '..', 'database', file);
        console.log(`正在執行 ${file}...`);
        
        const sqlContent = fs.readFileSync(filePath, 'utf8');
        await transaction.request().query(sqlContent);
        
        console.log(`✅ ${file} 執行完成`);
      } catch (error) {
        console.error(`執行 ${file} 時發生錯誤:`, error);
        throw error;
      }
    }

    console.log('提交交易...');
    await transaction.commit();
    console.log('✅ 所有資料匯入完成');

  } catch (error) {
    console.error('❌ 資料匯入失敗:', error);
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

// 執行匯入
importData().catch(console.error); 