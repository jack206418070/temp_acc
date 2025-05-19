import { c as defineEventHandler, e as authenticate, g as readBody, f as createError } from '../../../_/nitro.mjs';
import { e as updateQAContent } from '../../../_/qaModel.mjs';
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
import '../../../_/db.mjs';
import 'mssql';

const _id__put = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const body = await readBody(event);
    const { category_id, language_id, question, answer, sort_order } = body;
    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateQAContent(id, {
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    return { success: true, data };
  } catch (error) {
    console.error("Update QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u554F\u7B54\u5931\u6557"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
