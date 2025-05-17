import { c as defineEventHandler, g as readBody, f as createError } from '../../../_/nitro.mjs';
import { b as updateKnowledgeOrder } from '../../../_/knowledgeModel.mjs';
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

const order_put = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id, newOrder, category } = body;
    if (!id || newOrder === void 0 || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C3\u6578"
      });
    }
    await updateKnowledgeOrder(id, newOrder, category);
    return { success: true, message: "\u9806\u5E8F\u66F4\u65B0\u6210\u529F" };
  } catch (error) {
    console.error("Update Knowledge Order Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "\u66F4\u65B0\u9806\u5E8F\u5931\u6557"
    });
  }
});

export { order_put as default };
//# sourceMappingURL=order.put.mjs.map
