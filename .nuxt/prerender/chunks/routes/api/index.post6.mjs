import { defineEventHandler, readBody, createError } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as authenticate } from '../../_/nitro.mjs';
import { h as createQAContent } from '../../_/qaModel.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import '../../_/db.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/mssql/index.js';

const index_post = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    console.log("Received POST body:", body);
    const { category_id, language_id, question, answer, sort_order } = body;
    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await createQAContent({
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    return { success: true, data };
  } catch (error) {
    console.error("Create QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u554F\u7B54\u5931\u6557"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post6.mjs.map
