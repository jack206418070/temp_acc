import { c as defineEventHandler, f as createError } from '../../_/nitro.mjs';
import { m as getAllQA } from '../../_/qaModel.mjs';
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
import 'xss';
import '../../_/db.mjs';
import 'mssql';

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
//# sourceMappingURL=index.get8.mjs.map
