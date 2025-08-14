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

async function checkAnnouncementImages() {
  let pool;
  
  try {
    console.log('🔗 連接到資料庫...');
    pool = await sql.connect(config);
    
    console.log('\n📊 AnnouncementImages 表結構:\n');
    const columns = await pool.request().query(`
      SELECT 
        COLUMN_NAME,
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        IS_NULLABLE,
        COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'AnnouncementImages'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log('欄位列表:');
    columns.recordset.forEach(col => {
      let type = col.DATA_TYPE;
      if (col.CHARACTER_MAXIMUM_LENGTH) {
        if (col.CHARACTER_MAXIMUM_LENGTH === -1) {
          type += '(MAX)';
        } else {
          type += `(${col.CHARACTER_MAXIMUM_LENGTH})`;
        }
      }
      
      console.log(`  • ${col.COLUMN_NAME}`);
      console.log(`    類型: ${type}`);
      console.log(`    可空: ${col.IS_NULLABLE}`);
      if (col.COLUMN_DEFAULT) {
        console.log(`    預設值: ${col.COLUMN_DEFAULT}`);
      }
      console.log('');
    });
    
    // 檢查重要欄位
    const hasFileType = columns.recordset.some(col => col.COLUMN_NAME === 'file_type');
    const hasOriginalFilename = columns.recordset.some(col => col.COLUMN_NAME === 'original_filename');
    
    console.log('✅ 關鍵欄位檢查:');
    console.log(`  file_type 欄位: ${hasFileType ? '✓ 存在' : '✗ 不存在'}`);
    console.log(`  original_filename 欄位: ${hasOriginalFilename ? '✓ 存在' : '✗ 不存在'}`);
    
  } catch (err) {
    console.error('❌ 錯誤:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

checkAnnouncementImages();