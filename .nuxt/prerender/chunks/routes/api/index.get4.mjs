import { defineEventHandler, getQuery, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { p as parsePositiveInt } from '../../_/validate.mjs';
import { a as getAllKnowledge } from '../../_/knowledgeModel.mjs';
import '../../_/db.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';

const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const includeImage = query.includeImage === "true";
    let categoryId = null;
    const rawCategory = query.category;
    if (rawCategory !== void 0 && String(rawCategory).trim() !== "") {
      categoryId = parsePositiveInt(rawCategory);
      if (categoryId === null) {
        throw createError({ statusCode: 400, statusMessage: "\u53C3\u6578\u683C\u5F0F\u4E0D\u6B63\u78BA" });
      }
    }
    const data = await getAllKnowledge(categoryId, includeImage);
    return { success: true, data };
  } catch (error) {
    if ((error == null ? void 0 : error.statusCode) && error.statusCode < 500) throw error;
    console.error("Get Knowledge List Error:", error);
    throw createError({ statusCode: 500, statusMessage: "\u7372\u53D6\u77E5\u8B58\u5217\u8868\u5931\u6557" });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
