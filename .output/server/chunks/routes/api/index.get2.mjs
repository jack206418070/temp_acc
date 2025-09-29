import { c as defineEventHandler, k as getQuery, e as createError } from '../../_/nitro.mjs';
import { g as getAllBanners } from '../../_/bannerModel.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import 'mssql';
import '../../_/db.mjs';

const index_get = defineEventHandler(async (event) => {
  try {
    const active = getQuery(event).active;
    if (active == 1) {
      const data = await getAllBanners(active);
      data.forEach((banner) => {
        banner.imageData = banner.imageData.toString("base64");
      });
      return { success: true, data };
    } else {
      const data = await getAllBanners();
      data.forEach((banner) => {
        banner.imageData = banner.imageData.toString("base64");
      });
      return { success: true, data };
    }
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
