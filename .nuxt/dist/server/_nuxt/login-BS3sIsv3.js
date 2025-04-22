import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { useRouter } from "vue-router";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const username = ref("");
    const password = ref("");
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9b412fcc><nav class="admin-nav" data-v-9b412fcc><div class="nav-content" data-v-9b412fcc><div class="nav-wrapper" data-v-9b412fcc><div class="placeholder" data-v-9b412fcc></div><h1 class="page-title" data-v-9b412fcc>管理員登入</h1><div class="placeholder" data-v-9b412fcc></div></div></div></nav><div class="admin-container qa-container" data-v-9b412fcc><div class="login-form-container" data-v-9b412fcc><form class="login-form" data-v-9b412fcc><div class="form-group" data-v-9b412fcc><label data-v-9b412fcc>帳號</label><input${ssrRenderAttr("value", username.value)} type="text" required placeholder="請輸入帳號"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc></div><div class="form-group" data-v-9b412fcc><label data-v-9b412fcc>密碼</label><input${ssrRenderAttr("value", password.value)} type="password" required placeholder="請輸入密碼"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc></div><div class="button-group" data-v-9b412fcc><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9b412fcc>`);
      if (isLoading.value) {
        _push(`<span class="button-loading" data-v-9b412fcc></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` 登入 </button></div><div class="back-link" data-v-9b412fcc>`);
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
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b412fcc"]]);
export {
  login as default
};
//# sourceMappingURL=login-BS3sIsv3.js.map
