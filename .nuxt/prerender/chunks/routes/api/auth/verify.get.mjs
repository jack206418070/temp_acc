import { defineEventHandler, getHeader, createError } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { a as useRuntimeConfig } from '../../../_/nitro.mjs';
import jwt from 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
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

const verify_get = defineEventHandler(async (event) => {
  var _a;
  try {
    console.log("verify.get");
    const token = (_a = getHeader(event, "Authorization")) == null ? void 0 : _a.split(" ")[1];
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u672A\u63D0\u4F9B\u8A8D\u8B49\u4EE4\u724C"
      });
    }
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return {
      valid: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role
      }
    };
  } catch (error) {
    console.error("Token verification error:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "\u7121\u6548\u7684\u8A8D\u8B49\u4EE4\u724C"
    });
  }
});

export { verify_get as default };
//# sourceMappingURL=verify.get.mjs.map
