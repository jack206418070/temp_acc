import { defineEventHandler, createError, setHeader } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getKnowledgeById } from '../../../../_/knowledgeModel.mjs';
import '../../../../_/db.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/mssql/index.js';

const image_get = defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const knowledge = await getKnowledgeById(id);
    if (!knowledge || !knowledge.image_data) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u5716\u7247"
      });
    }
    setHeader(event, "Content-Type", knowledge.image_type || "image/jpeg");
    return knowledge.image_data;
  } catch (error) {
    console.error("Get Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u5716\u7247\u5931\u6557"
    });
  }
});

export { image_get as default };
//# sourceMappingURL=image.get.mjs.map
