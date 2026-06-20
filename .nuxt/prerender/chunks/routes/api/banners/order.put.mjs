import { defineEventHandler, readBody, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { u as updateBannerOrder } from '../../../_/bannerModel.mjs';
import '../../../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
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
