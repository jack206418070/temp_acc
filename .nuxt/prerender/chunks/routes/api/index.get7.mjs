import { defineEventHandler, createError } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { m as getAllQA } from '../../_/qaModel.mjs';
import '../../_/db.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllQA();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
