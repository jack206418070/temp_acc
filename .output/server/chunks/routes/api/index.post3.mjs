import { c as defineEventHandler, r as readMultipartFormData, e as createError } from '../../_/nitro.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { c as createBanner } from '../../_/bannerModel.mjs';
import { v as validateFileUpload } from '../../_/fileValidation.mjs';
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
  var _a, _b, _c, _d;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const sortOrder = parseInt(((_c = formData.find((f) => f.name === "sortOrder")) == null ? void 0 : _c.data.toString()) || "0");
    const isActive = ((_d = formData.find((f) => f.name === "is_active")) == null ? void 0 : _d.data.toString()) === "1";
    if (!title || !(imageFile == null ? void 0 : imageFile.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D\uFF08title \u6216 image\uFF09"
      });
    }
    const validation = validateFileUpload(imageFile.data, imageFile.type, {
      allowedTypes: ["image/jpeg", "image/png", "image/gif"],
      maxSizeMB: 5
    });
    if (!validation.valid) {
      throw createError({ statusCode: 400, statusMessage: validation.error });
    }
    console.log(`\u2705 \u6536\u5230\u5716\u7247 ${imageFile.filename || ""} (${imageFile.type}), \u5927\u5C0F ${(imageFile.data.length / 1024).toFixed(2)} KB`);
    const data = await createBanner({
      title,
      description,
      imageData: imageFile.data,
      imageType: imageFile.type,
      sortOrder,
      isActive
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Create Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA Banner \u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
