import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { p as parsePositiveInt } from '../../../_/validate.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { d as deleteBanner } from '../../../_/bannerModel.mjs';
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
import 'mssql';
import '../../../_/db.mjs';

const _id__delete = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, statusMessage: "\u7121\u6548\u7684 Banner ID" });
    }
    await deleteBanner(id);
    return {
      success: true,
      message: "\u522A\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u274C Delete Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664 Banner \u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
