import { defineEventHandler, createError, setResponseHeaders } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getServiceUnitById } from '../../../../_/serviceUnitModel.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../../../../_/db.mjs';

const priceImage_get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684 ID"
      });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u8A72\u670D\u52D9\u55AE\u4F4D"
      });
    }
    if (!serviceUnit.priceImage) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u6B64\u670D\u52D9\u55AE\u4F4D\u6C92\u6709\u50F9\u683C\u5716\u7247"
      });
    }
    setResponseHeaders(event, {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache"
    });
    return serviceUnit.priceImage;
  } catch (error) {
    console.error("\u274C Get Service Unit Price Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u50F9\u683C\u5716\u7247\u5931\u6557"
    });
  }
});

export { priceImage_get as default };
//# sourceMappingURL=price-image.get.mjs.map
