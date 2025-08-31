import sql from 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';

const config = {
  user: "SA",
  password: "yourStrong(!)Password",
  server: "localhost",
  port: 1433,
  database: "test_three",
  options: {
    encrypt: false,
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
