import { defineEventHandler, readMultipartFormData, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { p as parsePositiveInt } from '../../_/validate.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { c as createKnowledge } from '../../_/knowledgeModel.mjs';
import { v as validateFileUpload } from '../../_/fileValidation.mjs';
import '../../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/jsonwebtoken/index.js';
import '../../_/db.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';

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
    if (parsePositiveInt(know_category) === null) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684\u5206\u985E"
      });
    }
    const validation = validateFileUpload(imageFile.data, imageFile.type, {
      allowedTypes: ["image/jpeg", "image/png", "image/gif"],
      maxSizeMB: 5
    });
    if (!validation.valid) {
      throw createError({ statusCode: 400, statusMessage: validation.error });
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
