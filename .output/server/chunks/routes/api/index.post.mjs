import { c as defineEventHandler, r as readMultipartFormData, e as createError } from '../../_/nitro.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { s as saveAnnouncementImage } from '../../_/announcementModel.mjs';
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
    const image_id = imageIdField.data.toString();
    const imageBuffer = imageField.data;
    const file_type = ((_a = fileTypeField == null ? void 0 : fileTypeField.data) == null ? void 0 : _a.toString()) || "image";
    const original_filename = ((_b = filenameField == null ? void 0 : filenameField.data) == null ? void 0 : _b.toString()) || null;
    console.log("original_filename:", original_filename);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (!allowedTypes.includes(imageField.type)) {
      throw createError({
        statusCode: 400,
        message: "\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B\uFF0C\u53EA\u5141\u8A31\u4E0A\u50B3\u5716\u7247\u6A94\u6848\uFF08JPG\u3001PNG\u3001GIF\uFF09\u6216 PDF \u6A94\u6848"
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (imageBuffer.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: "\u6A94\u6848\u5927\u5C0F\u4E0D\u80FD\u8D85\u904E 5MB"
      });
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
