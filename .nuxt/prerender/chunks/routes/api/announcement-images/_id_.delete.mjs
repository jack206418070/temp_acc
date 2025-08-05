import { defineEventHandler, createError } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../../_/auth.mjs';
import { d as deleteAnnouncementImage } from '../../../_/announcementModel.mjs';
import '../../../_/nitro.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/c3d19/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';
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
