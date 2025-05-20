import { defineEventHandler, readBody, createError, setCookie } from 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import { b as useRuntimeConfig } from '../../../_/nitro.mjs';
import { g as getConnection } from '../../../_/db.mjs';
import jwt from 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/mssql/index.js';

async function validateUser(username, password) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("username", username).input("password", password).query(`
        SELECT uid, username, role 
        FROM OfficerUsers
        WHERE username = @username AND password = @password
      `);
    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error("\u274C Validation Error:", error);
    throw error;
  }
}

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    console.log("\u63A5\u6536\u5230\u767B\u5165\u8ACB\u6C42:", { username });
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7528\u6236\u540D\u548C\u5BC6\u78BC\u4E0D\u80FD\u70BA\u7A7A"
      });
    }
    const user = await validateUser(username, password);
    console.log("\u7528\u6236\u9A57\u8B49\u7D50\u679C:", user);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u7528\u6236\u540D\u6216\u5BC6\u78BC\u932F\u8AA4"
      });
    }
    const config = useRuntimeConfig();
    const token = jwt.sign(
      {
        userId: user.uid,
        // 注意這裡使用 uid 而不是 id
        username: user.username,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );
    setCookie(event, "auth_token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      // 24小時
      path: "/",
      secure: false,
      sameSite: "lax"
    });
    console.log("\u767B\u5165\u6210\u529F\uFF0C\u8FD4\u56DE\u97FF\u61C9");
    return {
      success: true,
      user: {
        id: user.uid,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error("\u767B\u5165\u8655\u7406\u932F\u8AA4:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u670D\u52D9\u5668\u932F\u8AA4"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
