import { d as defineEventHandler, c as createError, k as setResponseHeaders } from '../../../../nitro/nitro.mjs';
import { p as parsePositiveInt } from '../../../../_/validate.mjs';
import { g as getServiceUnitById } from '../../../../_/serviceUnitModel.mjs';
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
import 'mssql';
import '../../../../_/db.mjs';

const unitImage_get = defineEventHandler(async (event) => {
  try {
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, message: "\u7121\u6548\u7684 ID" });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit || !serviceUnit.unitImage) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u5716\u7247"
      });
    }
    setResponseHeaders(event, {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600"
    });
    return serviceUnit.unitImage;
  } catch (error) {
    console.error("\u274C Get Unit Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u5716\u7247\u5931\u6557"
    });
  }
});

export { unitImage_get as default };
//# sourceMappingURL=unit-image.get.mjs.map
