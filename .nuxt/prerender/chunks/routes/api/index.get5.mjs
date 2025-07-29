import { defineEventHandler, createError } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getAllLanguages } from '../../_/qaModel.mjs';
import '../../_/db.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllLanguages();
    return { success: true, data };
  } catch (error) {
    console.error("Get Languages List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u8A9E\u8A00\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
