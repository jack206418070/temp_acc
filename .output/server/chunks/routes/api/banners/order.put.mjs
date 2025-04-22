import { d as defineEventHandler, a as authenticate, b as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { a as updateBannerOrder } from '../../../_/bannerModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import 'mssql';
import '../../../_/db.mjs';

const order_put = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    const { id, sortOrder } = body;
    if (!id || sortOrder === void 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C3\u6578"
      });
    }
    const data = await updateBannerOrder(id, sortOrder);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update Banner Order Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0 Banner \u6392\u5E8F\u5931\u6557"
    });
  }
});

export { order_put as default };
//# sourceMappingURL=order.put.mjs.map
