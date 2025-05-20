import { c as defineEventHandler, i as deleteCookie } from '../../../_/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';

const logout_post = defineEventHandler((event) => {
  deleteCookie(event, "auth_token", {
    httpOnly: true,
    path: "/"
  });
  return {
    success: true,
    message: "\u767B\u51FA\u6210\u529F"
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
