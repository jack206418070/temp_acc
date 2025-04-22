import { defineEventHandler, createError, readMultipartFormData } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../../nitro/nitro.mjs';
import { u as updateBanner } from '../../../_/bannerModel.mjs';
import { loadImage, createCanvas } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/canvas/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'node:crypto';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';
import '../../../_/db.mjs';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
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
    if (!formData) throw new Error("No form data");
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const sortOrder = (_c = formData.find((f) => f.name === "sortOrder")) == null ? void 0 : _c.data.toString();
    const isActive = ((_d = formData.find((f) => f.name === "is_active")) == null ? void 0 : _d.data.toString()) == 1;
    const updateData = {
      title,
      description,
      sortOrder: parseInt(sortOrder),
      isActive
    };
    if (imageFile) {
      const originalSize = (imageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
      try {
        const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
        const img = await loadImage(base64Image);
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u5716\u7247\u5927\u5C0F: ${compressedSize} KB`);
        console.log(`\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - imageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
        updateData.imageData = imageBuffer;
        updateData.imageType = "image/jpeg";
      } catch (error) {
        console.error("\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
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
