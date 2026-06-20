import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { g as getAllLanguages } from '../../_/qaModel.mjs';
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
import '../../_/db.mjs';
import 'mssql';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllLanguages();
    return { success: true, data };
  } catch (error) {
    console.error("Get Languages List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u8A9E\u8A00\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
