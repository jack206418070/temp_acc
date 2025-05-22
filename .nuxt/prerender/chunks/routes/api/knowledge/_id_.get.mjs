import { defineEventHandler, getRequestHeader, createError, getRouterParam } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { g as getKnowledgeById } from '../../../_/knowledgeModel.mjs';
import { v as verifyToken } from '../../../_/auth.mjs';
import '../../../_/db.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';
import '../../../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  try {
    const token = (_a = getRequestHeader(event, "authorization")) == null ? void 0 : _a.split(" ")[1];
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u6388\u6B0A\u7684\u8ACB\u6C42"
      });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw createError({
        statusCode: 401,
        message: "\u7121\u6548\u7684 Token"
      });
    }
    const id = getRouterParam(event, "id");
    const result = await getKnowledgeById(id);
    if (!result) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u8A72\u7B46\u8CC7\u6599"
      });
    }
    return {
      success: true,
      data: {
        ...result,
        image_url: `data:${result.image_type};base64,${result.image_data}`
      }
    };
  } catch (error) {
    console.error("\u7372\u53D6\u77E5\u8B58\u5EAB\u8CC7\u6599\u5931\u6557:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u8CC7\u6599\u5931\u6557"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
