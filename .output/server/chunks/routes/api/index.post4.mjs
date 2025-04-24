import { d as defineEventHandler, a as authenticate, r as readMultipartFormData, c as createError } from '../../nitro/nitro.mjs';
import { c as createKnowledge } from '../../_/knowledgeModel.mjs';
import { loadImage, createCanvas } from 'canvas';
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
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const title = (_b = formData.find((f) => f.name === "title")) == null ? void 0 : _b.data.toString();
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!know_category || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const originalSize = (imageFile.data.length / 1024).toFixed(2);
    console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
    let compressedImageBuffer;
    try {
      const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
      const img = await loadImage(base64Image);
      const maxWidth = 1200;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      compressedImageBuffer = canvas.toBuffer("image/jpeg", {
        quality: 0.8,
        progressive: true
      });
      const compressedSize = (compressedImageBuffer.length / 1024).toFixed(2);
      console.log(`\u58D3\u7E2E\u5F8C\u5927\u5C0F: ${compressedSize} KB`);
      console.log(`\u58D3\u7E2E\u7387: ${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
    } catch (error) {
      console.error("\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
      throw createError({
        statusCode: 400,
        statusMessage: "\u5716\u7247\u8655\u7406\u5931\u6557"
      });
    }
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: compressedImageBuffer,
      imageType: "image/jpeg",
      title,
      image_url: image_url || null
    });
    return {
      success: true,
      data,
      imageInfo: {
        originalSize: `${originalSize} KB`,
        compressedSize: `${(compressedImageBuffer.length / 1024).toFixed(2)} KB`,
        compressionRatio: `${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`
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
