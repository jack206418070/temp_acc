import { c as defineEventHandler, f as createError } from '../../../_/nitro.mjs';
import { g as getAnnouncementImages } from '../../../_/announcementModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';
import 'mssql';
import '../../../_/db.mjs';

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u516C\u544A ID"
      });
    }
    const images = await getAnnouncementImages(id);
    return {
      success: true,
      data: images.map((image) => ({
        id: image.id,
        image_content: image.image_content.toString("base64")
      }))
    };
  } catch (error) {
    console.error("\u274C Get Announcement Images Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
