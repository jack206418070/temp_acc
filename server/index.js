import express from 'express';
import { fromNodeMiddleware } from 'h3';
// import { createQA } from './models/qaModel.js';
// import qaRoutes from './routes/qaRoutes.js';
// import './database/init.js';  // 確保資料庫初始化

const app = express();

// ✅ 確保 Express 正確解析 JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 掛載 `/api/qa` 路由
// app.use('/api/qa', qaRoutes);


console.log('✅ Express server is running...');

export default fromNodeMiddleware(app);