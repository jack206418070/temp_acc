import { defineEventHandler, createError } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getAllBanners } from '../../_/bannerModel.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getAllBanners();
    data.forEach((banner) => {
      banner.imageData = banner.imageData.toString("base64");
    });
    return { success: true, data };
  } catch (error) {
    console.error("\u274C Get All Banners Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6 Banner \u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
