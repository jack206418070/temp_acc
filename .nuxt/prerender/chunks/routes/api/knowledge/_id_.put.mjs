import { p as parsePositiveInt } from '../../../_/validate.mjs';
import { createError, readMultipartFormData } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { u as updateKnowledge } from '../../../_/knowledgeModel.mjs';
import { v as validateFileUpload } from '../../../_/fileValidation.mjs';
import '../../../_/db.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';

async function _id__put(event) {
  var _a, _b, _c;
  try {
    const id = parsePositiveInt(event.context.params.id);
    if (id === null) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 ID"
      });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684\u8ACB\u6C42\u683C\u5F0F"
      });
    }
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const know_category = (_b = formData.find((f) => f.name === "know_category")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!title || !know_category) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5FC5\u8981\u53C3\u6578"
      });
    }
    if (parsePositiveInt(know_category) === null) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684\u5206\u985E"
      });
    }
    let imagePath = null;
    if (imageFile == null ? void 0 : imageFile.data) {
      const validation = validateFileUpload(imageFile.data, imageFile.type, {
        allowedTypes: ["image/jpeg", "image/png", "image/gif"],
        maxSizeMB: 5
      });
      if (!validation.valid) {
        throw createError({ statusCode: 400, message: validation.error });
      }
      imagePath = imageFile.data;
    }
    const result = await updateKnowledge(
      parseInt(id),
      title,
      parseInt(know_category),
      imagePath,
      image_url
    );
    return result;
  } catch (error) {
    console.error("Update Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u66F4\u65B0\u5931\u6557"
    });
  }
}

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
