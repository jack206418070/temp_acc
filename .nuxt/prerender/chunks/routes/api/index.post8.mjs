import { defineEventHandler, readMultipartFormData, createError } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../nitro/nitro.mjs';
import { c as createServiceUnit } from '../../_/serviceUnitModel.mjs';
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
import '../../_/db.mjs';

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const name = (_a = formData.find((f) => f.name === "name")) == null ? void 0 : _a.data.toString();
    const unitImageFile = formData.find((f) => f.name === "unitImage");
    const category = (_b = formData.find((f) => f.name === "category")) == null ? void 0 : _b.data.toString();
    const region = (_c = formData.find((f) => f.name === "region")) == null ? void 0 : _c.data.toString();
    const serviceArea = (_d = formData.find((f) => f.name === "serviceArea")) == null ? void 0 : _d.data.toString();
    const address = (_e = formData.find((f) => f.name === "address")) == null ? void 0 : _e.data.toString();
    const phone = (_f = formData.find((f) => f.name === "phone")) == null ? void 0 : _f.data.toString();
    const email = (_g = formData.find((f) => f.name === "email")) == null ? void 0 : _g.data.toString();
    const description = (_h = formData.find((f) => f.name === "description")) == null ? void 0 : _h.data.toString();
    const website = (_i = formData.find((f) => f.name === "website")) == null ? void 0 : _i.data.toString();
    const priceImageFile = formData.find((f) => f.name === "priceImage");
    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    let unitImageBuffer;
    if (unitImageFile) {
      const originalUnitSize = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${originalUnitSize} KB`);
      try {
        const base64UnitImage = `data:${unitImageFile.type};base64,${unitImageFile.data.toString("base64")}`;
        const img = await loadImage(base64UnitImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        unitImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedUnitSize = (unitImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${compressedUnitSize} KB`);
        console.log(`\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - unitImageBuffer.length / unitImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u55AE\u4F4D\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    let priceImageBuffer;
    if (priceImageFile) {
      const originalPriceSize = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${originalPriceSize} KB`);
      try {
        const base64PriceImage = `data:${priceImageFile.type};base64,${priceImageFile.data.toString("base64")}`;
        const img = await loadImage(base64PriceImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        priceImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedPriceSize = (priceImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${compressedPriceSize} KB`);
        console.log(`\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - priceImageBuffer.length / priceImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u50F9\u683C\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const data = await createServiceUnit({
      name,
      unitImage: unitImageBuffer,
      category,
      region,
      serviceArea,
      address,
      phone,
      email,
      description,
      website,
      priceImage: priceImageBuffer
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Create Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post8.mjs.map
