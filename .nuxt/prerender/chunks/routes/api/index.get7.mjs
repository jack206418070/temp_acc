import { defineEventHandler, createError } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import { f as getAllQAContents } from '../../_/qaModel.mjs';
import '../../_/db.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllQAContents();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA Contents List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
