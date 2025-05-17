import { defineEventHandler, createError } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { c as getAllAnnouncements } from '../../_/announcementModel.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_get = defineEventHandler(async (event) => {
  try {
    const announcements = await getAllAnnouncements();
    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error("\u274C Get Announcements Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u5217\u8868\u5931\u6557"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
