import { c as defineEventHandler, f as createError, n as setHeader } from '../../../../_/nitro.mjs';
import { g as getKnowledgeById } from '../../../../_/knowledgeModel.mjs';
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
import '../../../../_/db.mjs';
import 'mssql';

const image_get = defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const knowledge = await getKnowledgeById(id);
    if (!knowledge || !knowledge.image_data) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u5716\u7247"
      });
    }
    setHeader(event, "Content-Type", knowledge.image_type || "image/jpeg");
    return knowledge.image_data;
  } catch (error) {
    console.error("Get Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u5716\u7247\u5931\u6557"
    });
  }
});

export { image_get as default };
//# sourceMappingURL=image.get.mjs.map
