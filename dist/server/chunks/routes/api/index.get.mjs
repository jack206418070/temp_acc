import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { a as getAllKnowledge } from '../../_/knowledgeModel.mjs';
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
import '../../_/db.mjs';
import 'mssql';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllKnowledge();
    return { success: true, data };
  } catch (error) {
    console.error("Get Knowledge List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u77E5\u8B58\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
