import sql from 'mssql';

const config = {
  user: "sa",
  password: "MyS3cretPassw0rd",
  server: "43.207.146.80",
  // Docker 內部使用 'localhost'
  port: 1433,
  database: "accompany",
  options: {
    encrypt: false,
    // 若有 SSL 問題請設為 false
    trustServerCertificate: true
  }
};
let pool;
async function getConnection() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("\u2705 Connected to MSSQL");
    } catch (error) {
      console.error("\u274C Database connection failed:", error);
      throw error;
    }
  }
  return pool;
}

export { getConnection as g };
//# sourceMappingURL=db.mjs.map
