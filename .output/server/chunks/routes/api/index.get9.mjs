import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { g as getUserReminder } from '../../_/userReminderModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import 'mssql';
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
//# sourceMappingURL=index.get9.mjs.map
