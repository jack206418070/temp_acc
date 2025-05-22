import sql from 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';

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
