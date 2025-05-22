import { c as defineEventHandler, k as getQuery, e as createError } from '../../_/nitro.mjs';
import { a as getAllKnowledge } from '../../_/knowledgeModel.mjs';
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
    const query = getQuery(event);
    const category = query.category;
    const includeImage = query.includeImage === "true";
    const data = await getAllKnowledge(category, includeImage);
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
//# sourceMappingURL=index.get4.mjs.map
