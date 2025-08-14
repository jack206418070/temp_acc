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

async function checkBannersTable() {
  let pool;
  
  try {
    console.log('🔗 連接到資料庫...');
    pool = await sql.connect(config);
    
    console.log('\n📊 Banners 表結構:\n');
    const columns = await pool.request().query(`
      SELECT 
        COLUMN_NAME,
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        IS_NULLABLE,
        COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'Banners'
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
      
      console.log(`  • ${col.COLUMN_NAME} - ${type} ${col.IS_NULLABLE === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
  } catch (err) {
    console.error('❌ 錯誤:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

checkBannersTable();