import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { d as deleteKnowledge } from '../../../_/knowledgeModel.mjs';
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
    await deleteKnowledge(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C Delete Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u77E5\u8B58\u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
