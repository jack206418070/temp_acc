import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { b as deleteQAContent } from '../../../_/qaModel.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    await deleteQAContent(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("Delete QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u554F\u7B54\u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
