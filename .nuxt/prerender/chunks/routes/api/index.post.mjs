import { defineEventHandler, readMultipartFormData, createError } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import { p as parsePositiveInt } from '../../_/validate.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { s as saveAnnouncementImage } from '../../_/announcementModel.mjs';
import { v as validateFileUpload } from '../../_/fileValidation.mjs';
import '../../_/nitro.mjs';
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
import '../../_/db.mjs';

const index_post = defineEventHandler(async (event) => {
  var _a, _b;
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
    const announcementIdField = formData.find((f) => f.name === "announcement_id");
    const imageIdField = formData.find((f) => f.name === "image_id");
    const imageField = formData.find((f) => f.name === "image");
    const fileTypeField = formData.find((f) => f.name === "file_type");
    const filenameField = formData.find((f) => f.name === "filename");
    console.log("filename:", filenameField);
    const missingFields = [];
    if (!(announcementIdField == null ? void 0 : announcementIdField.data)) missingFields.push("announcement_id");
    if (!(imageIdField == null ? void 0 : imageIdField.data)) missingFields.push("image_id");
    if (!(imageField == null ? void 0 : imageField.data)) missingFields.push("image");
    if (missingFields.length > 0) {
      console.error("\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D:", missingFields);
      throw createError({
        statusCode: 400,
        message: `\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D: ${missingFields.join(", ")}`
      });
    }
    const announcement_id = parseInt(announcementIdField.data.toString());
    if (parsePositiveInt(announcementIdField.data.toString()) === null) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 announcement_id"
      });
    }
    const image_id = imageIdField.data.toString();
    const imageBuffer = imageField.data;
    const file_type = ((_a = fileTypeField == null ? void 0 : fileTypeField.data) == null ? void 0 : _a.toString()) || "image";
    const original_filename = ((_b = filenameField == null ? void 0 : filenameField.data) == null ? void 0 : _b.toString()) || null;
    console.log("original_filename:", original_filename);
    const validation = validateFileUpload(imageBuffer, imageField.type, {
      allowedTypes: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
      maxSizeMB: 5
    });
    if (!validation.valid) {
      throw createError({ statusCode: 400, message: validation.error });
    }
    console.log(`\u6536\u5230\u5716\u7247 image_id: ${image_id}, \u985E\u578B: ${imageField.type}, \u5927\u5C0F: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
    await saveAnnouncementImage(
      announcement_id,
      image_id,
      imageBuffer,
      file_type,
      original_filename
    );
    return {
      success: true,
      data: {
        announcement_id,
        image_id,
        file_type,
        original_filename
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
