import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { c as getAllAnnouncements } from '../../_/announcementModel.mjs';
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
