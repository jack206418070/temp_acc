import { d as defineEventHandler, a as authenticate, b as readBody, c as createError } from '../../nitro/nitro.mjs';
import { e as createAnnouncement } from '../../_/announcementModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import 'mssql';
import '../../_/db.mjs';

const index_post = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    if (!body.title || !body.category || !body.publish_date || !body.activity_start_date || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const announcementData = {
      title: body.title,
      category: body.category,
      publish_date: body.publish_date,
      activity_start_date: body.activity_start_date,
      content: body.content,
      link: body.link || null,
      linkTitle: body.linkTitle || null
    };
    const announcement = await createAnnouncement(announcementData);
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("\u274C Create Announcement Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u516C\u544A\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
