import { defineEventHandler, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { p as parsePositiveInt } from '../../../_/validate.mjs';
import { g as getServiceUnitById } from '../../../_/serviceUnitModel.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
import '../../../_/db.mjs';

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({ statusCode: 400, message: "\u7121\u6548\u7684 ID" });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u8A72\u670D\u52D9\u55AE\u4F4D"
      });
    }
    return {
      success: true,
      data: serviceUnit
    };
  } catch (error) {
    console.error("\u274C Get Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u670D\u52D9\u55AE\u4F4D\u8CC7\u6599\u5931\u6557"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
