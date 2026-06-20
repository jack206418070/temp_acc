import { defineEventHandler, readMultipartFormData, createError } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../_/auth.mjs';
import { c as createServiceUnit } from '../../_/serviceUnitModel.mjs';
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
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
import '../../_/db.mjs';

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const name = (_a = formData.find((f) => f.name === "name")) == null ? void 0 : _a.data.toString();
    const unitImageFile = formData.find((f) => f.name === "unitImage");
    const category = (_b = formData.find((f) => f.name === "category")) == null ? void 0 : _b.data.toString();
    const region = (_c = formData.find((f) => f.name === "region")) == null ? void 0 : _c.data.toString();
    const serviceArea = (_d = formData.find((f) => f.name === "serviceArea")) == null ? void 0 : _d.data.toString();
    const address = (_e = formData.find((f) => f.name === "address")) == null ? void 0 : _e.data.toString();
    const phone = (_f = formData.find((f) => f.name === "phone")) == null ? void 0 : _f.data.toString();
    const email = (_g = formData.find((f) => f.name === "email")) == null ? void 0 : _g.data.toString();
    const description = (_h = formData.find((f) => f.name === "description")) == null ? void 0 : _h.data.toString();
    const website = (_i = formData.find((f) => f.name === "website")) == null ? void 0 : _i.data.toString();
    const priceImageFile = formData.find((f) => f.name === "priceImage");
    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D" });
    }
    const IMAGE_OPTS = { allowedTypes: ["image/jpeg", "image/png", "image/gif"], maxSizeMB: 5 };
    let unitImageBuffer = null;
    if (unitImageFile == null ? void 0 : unitImageFile.data) {
      const validation = validateFileUpload(unitImageFile.data, unitImageFile.type, IMAGE_OPTS);
      if (!validation.valid) {
        throw createError({ statusCode: 400, statusMessage: `\u55AE\u4F4D\u5716\u7247\uFF1A${validation.error}` });
      }
      const size = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4E6} \u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${size} KB, \u985E\u578B: ${unitImageFile.type}`);
      unitImageBuffer = unitImageFile.data;
    }
    let priceImageBuffer = null;
    if (priceImageFile == null ? void 0 : priceImageFile.data) {
      const validation = validateFileUpload(priceImageFile.data, priceImageFile.type, IMAGE_OPTS);
      if (!validation.valid) {
        throw createError({ statusCode: 400, statusMessage: `\u50F9\u683C\u5716\u7247\uFF1A${validation.error}` });
      }
      const size = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4E6} \u50F9\u683C\u5716\u7247\u5927\u5C0F: ${size} KB, \u985E\u578B: ${priceImageFile.type}`);
      priceImageBuffer = priceImageFile.data;
    }
    const data = await createServiceUnit({
      name,
      unitImage: unitImageBuffer,
      category,
      region,
      serviceArea,
      address,
      phone,
      email,
      description,
      website,
      priceImage: priceImageBuffer
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Create Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post8.mjs.map
