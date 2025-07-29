import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/c3d19/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/utils.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const username = ref("");
    const password = ref("");
    const captcha = ref("");
    const isLoading = ref(false);
    const captchaUrl = ref("/api/captcha");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b9c562a6><nav class="admin-nav" data-v-b9c562a6><div class="nav-content" data-v-b9c562a6><div class="nav-wrapper" data-v-b9c562a6><div class="placeholder" data-v-b9c562a6></div><h1 class="page-title" data-v-b9c562a6>\u7BA1\u7406\u54E1\u767B\u5165</h1><div class="placeholder" data-v-b9c562a6></div></div></div></nav><div class="admin-container qa-container" data-v-b9c562a6><div class="login-form-container" data-v-b9c562a6><form class="login-form" data-v-b9c562a6><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>\u5E33\u865F</label><input${ssrRenderAttr("value", username.value)} type="text" required placeholder="\u8ACB\u8F38\u5165\u5E33\u865F"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-b9c562a6></div><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>\u5BC6\u78BC</label><input${ssrRenderAttr("value", password.value)} type="password" required placeholder="\u8ACB\u8F38\u5165\u5BC6\u78BC"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-b9c562a6></div><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>\u9A57\u8B49\u78BC</label><div class="captcha-container" data-v-b9c562a6><div class="captcha-image-wrapper" data-v-b9c562a6><img${ssrRenderAttr("src", captchaUrl.value)} alt="\u9A57\u8B49\u78BC" class="captcha-image" data-v-b9c562a6><div class="refresh-hint" data-v-b9c562a6>\u9EDE\u64CA\u5237\u65B0</div></div><input${ssrRenderAttr("value", captcha.value)} type="text" required placeholder="\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="captcha-input" data-v-b9c562a6></div></div><div class="button-group" data-v-b9c562a6><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isLoading.value || !captcha.value) ? " disabled" : ""} data-v-b9c562a6>`);
      if (isLoading.value) {
        _push(`<span class="button-loading" data-v-b9c562a6></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` \u767B\u5165 </button></div><div class="back-link" data-v-b9c562a6>`);
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
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9c562a6"]]);

export { login as default };
//# sourceMappingURL=login-DAn8IU6K.mjs.map
