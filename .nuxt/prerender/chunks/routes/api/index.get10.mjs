import { defineEventHandler, createError } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getUserReminder } from '../../_/userReminderModel.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getUserReminder();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Get User Reminder Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u4F7F\u7528\u8005\u53EE\u5680\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get10.mjs.map
