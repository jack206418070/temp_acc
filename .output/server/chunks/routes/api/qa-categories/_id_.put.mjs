import { c as defineEventHandler, f as readBody, e as createError } from '../../../_/nitro.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { u as updateQACategory } from '../../../_/qaModel.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '../../../_/db.mjs';
import 'mssql';

const _id__put = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const body = await readBody(event);
    const { parent_id, name, name_en, name_vi, name_id, name_th } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateQACategory(id, {
      parent_id: parent_id || null,
      name,
      name_en,
      name_vi,
      name_id,
      name_th
    });
    return { success: true, data };
  } catch (error) {
    console.error("Update QA Category Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u554F\u7B54\u985E\u5225\u5931\u6557"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
