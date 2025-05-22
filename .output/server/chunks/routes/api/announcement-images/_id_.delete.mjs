import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { d as deleteAnnouncementImage } from '../../../_/announcementModel.mjs';
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
import 'jsonwebtoken';
import 'mssql';
import '../../../_/db.mjs';

const _id__delete = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const image_id = event.context.params.id;
    if (!image_id) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5716\u7247 ID"
      });
    }
    await deleteAnnouncementImage(image_id);
    return {
      success: true,
      message: "\u5716\u7247\u522A\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u274C Delete Announcement Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u522A\u9664\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
