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
    const { bannerId, targetOrder } = await readBody(event);
    if (!bannerId || targetOrder === void 0) {
      return createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const result = await updateBannerOrder(bannerId, targetOrder);
    return {
      success: true,
      message: "\u6392\u5E8F\u66F4\u65B0\u6210\u529F",
      data: result
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u6392\u5E8F\u5931\u6557:", error);
    return createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u66F4\u65B0\u6392\u5E8F\u5931\u6557"
    });
  }
});

export { order_put as default };
//# sourceMappingURL=order.put.mjs.map
