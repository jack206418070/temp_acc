import { d as defineEventHandler, e as getRequestHeader, c as createError, v as verifyToken, f as getRouterParam } from '../../../nitro/nitro.mjs';
import { g as getKnowledgeById } from '../../../_/knowledgeModel.mjs';
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
import '../../../_/db.mjs';
import 'mssql';

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
