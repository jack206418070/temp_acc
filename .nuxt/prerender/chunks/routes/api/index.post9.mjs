import { defineEventHandler, readBody, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { u as updateUserReminder } from '../../_/userReminderModel.mjs';
import '../../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_post = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    if (!body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u5167\u5BB9\u4E0D\u80FD\u70BA\u7A7A"
      });
    }
    const data = await updateUserReminder(body.content);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update User Reminder Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u4F7F\u7528\u8005\u53EE\u5680\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post9.mjs.map
