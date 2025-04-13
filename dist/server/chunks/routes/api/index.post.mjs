import { d as defineEventHandler, b as authenticate, h as readMultipartFormData, c as createError } from '../../nitro/nitro.mjs';
import { c as createKnowledge } from '../../_/knowledgeModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import '../../_/db.mjs';
import 'mssql';

const index_post = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const title = (_b = formData.find((f) => f.name === "title")) == null ? void 0 : _b.data.toString();
    console.log(title);
    if (!know_category || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const imageType = imageFile.type || "image/jpeg";
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: imageFile.data,
      imageType,
      title
    });
    return { success: true, data };
  } catch (error) {
    console.error("\u274C Create Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u77E5\u8B58\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
