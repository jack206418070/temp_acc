import sql from 'mssql';

// SQL Server 連線設定
const config = {
  user: 'accompanyservice',
  password: '!QAZ8520@wsx',
  server: '172.21.50.165',  // Docker 內部使用 'localhost'
  port: 1433,
  database: 'accompanyservice',
  options: {
    encrypt: false,  // 若有 SSL 問題請設為 false
    trustServerCertificate: true,
  },
};

// const config = {
//   user: 'SA',
//   password: 'yourStrong(!)Password',
//   server: 'localhost',
//   port: 1433,
//   database: 'test_three',
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

// const config = {
//   user: 'sa',
//   password: 'MyS3cretPassw0rd',
//   server: '43.207.146.80',  // Docker 內部使用 'localhost'
//   port: 1433,
//   database: 'test_two',
//   options: {
//     encrypt: false,  // 若有 SSL 問題請設為 false
//     trustServerCertificate: true,
//   },
// };

// 取得資料庫連線
let pool;
export async function getConnection() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log('✅ Connected to MSSQL');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }
  return pool;
}