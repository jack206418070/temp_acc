import { defineEventHandler, createError } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as getAllQACategories } from '../../_/qaModel.mjs';
import '../../_/db.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllQACategories();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA Categories List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u985E\u5225\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
