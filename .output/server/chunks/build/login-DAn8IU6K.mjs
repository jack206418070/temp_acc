import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import '../_/nitro.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

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
