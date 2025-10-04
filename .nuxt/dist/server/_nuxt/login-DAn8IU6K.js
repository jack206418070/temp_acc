import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { useRouter } from "vue-router";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b9c562a6><nav class="admin-nav" data-v-b9c562a6><div class="nav-content" data-v-b9c562a6><div class="nav-wrapper" data-v-b9c562a6><div class="placeholder" data-v-b9c562a6></div><h1 class="page-title" data-v-b9c562a6>管理員登入</h1><div class="placeholder" data-v-b9c562a6></div></div></div></nav><div class="admin-container qa-container" data-v-b9c562a6><div class="login-form-container" data-v-b9c562a6><form class="login-form" data-v-b9c562a6><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>帳號</label><input${ssrRenderAttr("value", username.value)} type="text" required placeholder="請輸入帳號"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-b9c562a6></div><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>密碼</label><input${ssrRenderAttr("value", password.value)} type="password" required placeholder="請輸入密碼"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-b9c562a6></div><div class="form-group" data-v-b9c562a6><label data-v-b9c562a6>驗證碼</label><div class="captcha-container" data-v-b9c562a6><div class="captcha-image-wrapper" data-v-b9c562a6><img${ssrRenderAttr("src", captchaUrl.value)} alt="驗證碼" class="captcha-image" data-v-b9c562a6><div class="refresh-hint" data-v-b9c562a6>點擊刷新</div></div><input${ssrRenderAttr("value", captcha.value)} type="text" required placeholder="請輸入驗證碼"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="captcha-input" data-v-b9c562a6></div></div><div class="button-group" data-v-b9c562a6><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isLoading.value || !captcha.value) ? " disabled" : ""} data-v-b9c562a6>`);
      if (isLoading.value) {
        _push(`<span class="button-loading" data-v-b9c562a6></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` 登入 </button></div><div class="back-link" data-v-b9c562a6>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`返回前台`);
          } else {
            return [
              createTextVNode("返回前台")
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
export {
  login as default
};
