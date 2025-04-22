import { defineEventHandler, readMultipartFormData, createError } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../nitro/nitro.mjs';
import { s as saveAnnouncementImage } from '../../_/announcementModel.mjs';
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
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData || !Array.isArray(formData) || formData.length === 0) {
      console.error("\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599\u6216\u683C\u5F0F\u932F\u8AA4");
      throw createError({
        statusCode: 400,
        message: "\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599\u6216\u683C\u5F0F\u932F\u8AA4"
      });
    }
    console.log("\u6536\u5230\u7684\u6240\u6709\u6B04\u4F4D:", formData.map((field) => {
      var _a2;
      return {
        name: field.name,
        type: field.type,
        filename: field.filename,
        size: ((_a2 = field.data) == null ? void 0 : _a2.length) || 0,
        hasData: !!field.data
      };
    }));
    const announcementIdField = formData.find((f) => f.name === "announcement_id");
    const imageIdField = formData.find((f) => f.name === "image_id");
    const imageField = formData.find((f) => f.name === "image");
    const missingFields = [];
    if (!(announcementIdField == null ? void 0 : announcementIdField.data)) missingFields.push("announcement_id");
    if (!(imageIdField == null ? void 0 : imageIdField.data)) missingFields.push("image_id");
    if (!(imageField == null ? void 0 : imageField.data)) missingFields.push("image");
    console.log("\u6B04\u4F4D\u72C0\u614B:", {
      announcement_id: {
        exists: !!announcementIdField,
        hasData: !!(announcementIdField == null ? void 0 : announcementIdField.data),
        value: (_a = announcementIdField == null ? void 0 : announcementIdField.data) == null ? void 0 : _a.toString()
      },
      image_id: {
        exists: !!imageIdField,
        hasData: !!(imageIdField == null ? void 0 : imageIdField.data),
        value: (_b = imageIdField == null ? void 0 : imageIdField.data) == null ? void 0 : _b.toString()
      },
      image: {
        exists: !!imageField,
        hasData: !!(imageField == null ? void 0 : imageField.data),
        type: imageField == null ? void 0 : imageField.type,
        filename: imageField == null ? void 0 : imageField.filename,
        size: ((_c = imageField == null ? void 0 : imageField.data) == null ? void 0 : _c.length) || 0
      }
    });
    if (missingFields.length > 0) {
      console.error("\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D:", missingFields);
      throw createError({
        statusCode: 400,
        message: `\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D: ${missingFields.join(", ")}`
      });
    }
    const announcement_id = announcementIdField.data.toString();
    const image_id = imageIdField.data.toString();
    let imageBuffer;
    if (imageField && imageField.data) {
      const originalSize = (imageField.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
      console.log("\u5716\u7247\u985E\u578B:", imageField.type);
      try {
        if (!["image/jpeg", "image/png", "image/gif"].includes(imageField.type)) {
          throw new Error("\u4E0D\u652F\u63F4\u7684\u5716\u7247\u683C\u5F0F");
        }
        const base64Image = `data:${imageField.type};base64,${imageField.data.toString("base64")}`;
        const img = await loadImage(base64Image);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        if (imageField.type === "image/png") {
          ctx.clearRect(0, 0, targetWidth, targetHeight);
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const outputFormat = imageField.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = outputFormat === "image/jpeg" ? 0.8 : 1;
        imageBuffer = canvas.toBuffer(outputFormat, {
          quality,
          progressive: outputFormat === "image/jpeg"
        });
        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`\u8655\u7406\u5F8C\u5716\u7247\u5927\u5C0F: ${compressedSize} KB`);
        console.log(`\u5716\u7247\u8655\u7406\u7387: ${((1 - imageBuffer.length / imageField.data.length) * 100).toFixed(2)}%`);
        console.log("\u8F38\u51FA\u683C\u5F0F:", outputFormat);
      } catch (error) {
        console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          message: error.message || "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    await saveAnnouncementImage(
      parseInt(announcement_id),
      image_id,
      imageBuffer
    );
    return {
      success: true,
      data: {
        announcement_id,
        image_id
      }
    };
  } catch (error) {
    console.error("\u274C Save Announcement Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u4FDD\u5B58\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
