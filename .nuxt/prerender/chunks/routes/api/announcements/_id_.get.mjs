import { defineEventHandler, createError } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { b as getAnnouncementById } from '../../../_/announcementModel.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';
import '../../../_/db.mjs';

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684\u516C\u544A ID"
      });
    }
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u516C\u544A"
      });
    }
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("\u274C Get Announcement Detail Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u8A73\u7D30\u8CC7\u8A0A\u5931\u6557"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
