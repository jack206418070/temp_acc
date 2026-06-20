import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { a as deleteAnnouncement } from '../../../_/announcementModel.mjs';
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
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u516C\u544A ID"
      });
    }
    await deleteAnnouncement(id);
    return {
      success: true
    };
  } catch (error) {
    console.error("\u274C Delete Announcement Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u516C\u544A\u5931\u6557"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
