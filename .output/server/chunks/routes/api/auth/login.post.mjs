import { c as defineEventHandler, f as readBody, g as getCookie, e as createError, h as setCookie, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { g as getConnection } from '../../../_/db.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import 'mssql';

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
    const { username, password, captcha } = body;
    const storedCaptcha = getCookie(event, "captcha");
    if (!storedCaptcha || storedCaptcha.toLowerCase() !== (captcha == null ? void 0 : captcha.toLowerCase())) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u9A57\u8B49\u78BC\u932F\u8AA4"
      });
    }
    setCookie(event, "captcha", "", { maxAge: 0, path: "/" });
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
      secure: true,
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
