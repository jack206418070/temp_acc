import { defineEventHandler, createError, setResponseHeaders } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getServiceUnitById } from '../../../../_/serviceUnitModel.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';
import '../../../../_/db.mjs';

const unitImage_get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 ID"
      });
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
