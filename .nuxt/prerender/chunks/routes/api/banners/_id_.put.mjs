import { defineEventHandler, createError, readMultipartFormData } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../../_/nitro.mjs';
import { u as updateBanner } from '../../../_/bannerModel.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../../../_/db.mjs';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599" });
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const isActive = ((_c = formData.find((f) => f.name === "is_active")) == null ? void 0 : _c.data.toString()) == "1";
    const updateData = {
      title,
      description,
      isActive
    };
    if (imageFile) {
      updateData.imageData = imageFile.data;
      updateData.imageType = imageFile.type;
    }
    const data = await updateBanner(id, updateData);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0 Banner \u5931\u6557"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
