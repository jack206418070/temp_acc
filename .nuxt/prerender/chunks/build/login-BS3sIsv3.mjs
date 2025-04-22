import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'node:crypto';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unhead/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const username = ref("");
    const password = ref("");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9b412fcc><nav class="admin-nav" data-v-9b412fcc><div class="nav-content" data-v-9b412fcc><div class="nav-wrapper" data-v-9b412fcc><div class="placeholder" data-v-9b412fcc></div><h1 class="page-title" data-v-9b412fcc>\u7BA1\u7406\u54E1\u767B\u5165</h1><div class="placeholder" data-v-9b412fcc></div></div></div></nav><div class="admin-container qa-container" data-v-9b412fcc><div class="login-form-container" data-v-9b412fcc><form class="login-form" data-v-9b412fcc><div class="form-group" data-v-9b412fcc><label data-v-9b412fcc>\u5E33\u865F</label><input${ssrRenderAttr("value", username.value)} type="text" required placeholder="\u8ACB\u8F38\u5165\u5E33\u865F"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc></div><div class="form-group" data-v-9b412fcc><label data-v-9b412fcc>\u5BC6\u78BC</label><input${ssrRenderAttr("value", password.value)} type="password" required placeholder="\u8ACB\u8F38\u5165\u5BC6\u78BC"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc></div><div class="button-group" data-v-9b412fcc><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc>`);
      if (isLoading.value) {
        _push(`<span class="button-loading" data-v-9b412fcc></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` \u767B\u5165 </button></div><div class="back-link" data-v-9b412fcc>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE\u524D\u53F0`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE\u524D\u53F0")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b412fcc"]]);

export { login as default };
//# sourceMappingURL=login-BS3sIsv3.mjs.map
