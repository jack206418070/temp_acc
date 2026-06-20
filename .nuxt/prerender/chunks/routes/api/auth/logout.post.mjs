import { defineEventHandler, deleteCookie } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';

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
