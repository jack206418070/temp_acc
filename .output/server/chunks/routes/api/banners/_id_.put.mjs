import { c as defineEventHandler, e as authenticate, f as createError, r as readMultipartFormData } from '../../../_/nitro.mjs';
import { u as updateBanner } from '../../../_/bannerModel.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'express';
import 'xss';
import 'mssql';
import '../../../_/db.mjs';

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c;
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
    if (!formData) throw createError({ statusCode: 400, statusMessage: "\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599" });
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const isActive = ((_c = formData.find((f) => f.name === "is_active")) == null ? void 0 : _c.data.toString()) == "1";
    const updateData = {
      title,
      description,
      isActive
    };
    if (imageFile) {
      updateData.imageData = imageFile.data;
      updateData.imageType = imageFile.type;
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
