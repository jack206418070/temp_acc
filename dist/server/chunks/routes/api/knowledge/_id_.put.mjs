import { d as defineEventHandler, b as authenticate, h as readMultipartFormData, c as createError } from '../../../nitro/nitro.mjs';
import { g as getKnowledgeById, u as updateKnowledge } from '../../../_/knowledgeModel.mjs';
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
import '../../../_/db.mjs';
import 'mssql';

const _id__put = defineEventHandler(async (event) => {
  var _a;
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    if (!know_category) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const existingKnowledge = await getKnowledgeById(id);
    if (!existingKnowledge) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u8981\u66F4\u65B0\u7684\u8A18\u9304"
      });
    }
    const updateData = {
      know_category: parseInt(know_category)
    };
    if (imageFile) {
      updateData.imageBuffer = imageFile.data;
      updateData.imageType = imageFile.type || "image/jpeg";
    }
    const data = await updateKnowledge(id, updateData);
    return { success: true, data };
  } catch (error) {
    console.error("\u274C Update Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u77E5\u8B58\u5931\u6557"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
