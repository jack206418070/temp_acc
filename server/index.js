import { createApp } from 'h3';
import { initializeDatabase } from './config/initDb.js';
// import { createQA } from './models/qaModel.js';
// import qaRoutes from './routes/qaRoutes.js';
// import knowledgeRoutes from './routes/knowledgeRoutes.js';
// import './database/init.js';  // 確保資料庫初始化

const app = createApp();

// ✅ 確保 Express 正確解析 JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ✅ 掛載 `/api/qa` 路由
// app.use('/api/qa', qaRoutes);
// app.use('/api/qa', qaRoutes);

// 初始化資料庫
// initializeDatabase().catch(error => {
//   console.error('❌ 資料庫初始化失敗:', error);
//   process.exit(1);
// });

export default app;