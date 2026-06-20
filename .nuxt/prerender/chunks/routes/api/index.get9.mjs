import { defineEventHandler, getQuery, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { a as getAllServiceUnits } from '../../_/serviceUnitModel.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const includePriceImage = query.includePriceImage !== "false";
    const data = await getAllServiceUnits(includePriceImage);
    if (!includePriceImage) {
      data.forEach((unit) => {
        delete unit.priceImage;
        delete unit.priceImagePath;
      });
    }
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Get Service Units Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get9.mjs.map
