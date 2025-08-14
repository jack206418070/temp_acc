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

async function checkTables() {
  let pool;
  
  try {
    console.log('🔗 連接到資料庫...');
    pool = await sql.connect(config);
    
    console.log('📊 檢查現有表格:\n');
    const tables = await pool.request().query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE' 
      ORDER BY TABLE_NAME
    `);
    
    if (tables.recordset.length === 0) {
      console.log('❌ 沒有找到任何表格');
    } else {
      console.log(`找到 ${tables.recordset.length} 個表格:`);
      tables.recordset.forEach(table => {
        console.log(`  ✓ ${table.TABLE_NAME}`);
      });
    }
    
    // 檢查每個表格的欄位數量
    console.log('\n📋 表格詳細資訊:');
    for (const table of tables.recordset) {
      const columns = await pool.request()
        .input('tableName', sql.NVarChar, table.TABLE_NAME)
        .query(`
          SELECT COUNT(*) as column_count
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = @tableName
        `);
      
      console.log(`  ${table.TABLE_NAME}: ${columns.recordset[0].column_count} 個欄位`);
    }
    
  } catch (err) {
    console.error('❌ 錯誤:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

checkTables();