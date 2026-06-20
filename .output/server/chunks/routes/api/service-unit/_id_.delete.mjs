import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
import { p as parsePositiveInt } from '../../../_/validate.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { d as deleteServiceUnit } from '../../../_/serviceUnitModel.mjs';
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
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11 ID"
      });
    }
    const data = await deleteServiceUnit(id);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Delete Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
