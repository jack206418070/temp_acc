import { c as defineEventHandler, e as authenticate, g as readBody, f as createError } from '../../_/nitro.mjs';
import { u as updateUserReminder } from '../../_/userReminderModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'express';
import 'xss';
import 'mssql';
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
