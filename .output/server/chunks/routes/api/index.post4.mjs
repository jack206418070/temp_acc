import { c as defineEventHandler, r as readMultipartFormData, e as createError } from '../../_/nitro.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { c as createKnowledge } from '../../_/knowledgeModel.mjs';
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
import '../../_/db.mjs';
import 'mssql';

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const title = (_b = formData.find((f) => f.name === "title")) == null ? void 0 : _b.data.toString();
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!know_category || !(imageFile == null ? void 0 : imageFile.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const originalSizeKB = (imageFile.data.length / 1024).toFixed(2);
    console.log(`\u{1F4F7} \u6536\u5230\u5716\u7247\uFF1A${imageFile.filename || ""}`);
    console.log(`\u2705 \u985E\u578B\uFF1A${imageFile.type}`);
    console.log(`\u2705 \u539F\u59CB\u5927\u5C0F\uFF1A${originalSizeKB} KB`);
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: imageFile.data,
      imageType: imageFile.type,
      title,
      image_url: image_url || null
    });
    return {
      success: true,
      data,
      imageInfo: {
        originalSize: `${originalSizeKB} KB`,
        compressedSize: null,
        compressionRatio: null
      }
    };
  } catch (error) {
    console.error("\u274C Create Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u77E5\u8B58\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
