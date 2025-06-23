import { u as useSeoMeta, b as __nuxt_component_0, a as __nuxt_component_0$1, c as _imports_0, d as _imports_1, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notfound",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "404 - 頁面不存在 | 多元陪伴照顧服務試辦計畫",
      description: "抱歉，您訪問的頁面不存在。",
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_header_one = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-page-wrapper" }, _attrs))} data-v-78ffa6e3>`);
      _push(ssrRenderComponent(_component_header_one, null, null, _parent));
      _push(`<main data-v-78ffa6e3><div class="error-page text-center d-flex align-items-center justify-content-center flex-column light-bg position-relative" data-v-78ffa6e3><div class="error-content" data-v-78ffa6e3><h1 class="font-magnita display-1 mb-4" style="${ssrRenderStyle({ "font-size": "8rem", "color": "#ff6b6b" })}" data-v-78ffa6e3>404</h1><h2 class="fw-bold mb-3" data-v-78ffa6e3>糟糕！找不到此頁面</h2><p class="text-lg mb-4 text-muted" data-v-78ffa6e3> 您訪問的頁面可能已被移動、刪除，或者您輸入了錯誤的網址。 </p><div class="d-flex justify-content-center gap-3 flex-wrap" data-v-78ffa6e3>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        href: "/",
        class: "btn btn-primary btn-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-house-fill me-2" data-v-78ffa6e3${_scopeId}></i>回到首頁 `);
          } else {
            return [
              createVNode("i", { class: "bi bi-house-fill me-2" }),
              createTextVNode("回到首頁 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn btn-outline-secondary btn-lg" data-v-78ffa6e3><i class="bi bi-arrow-left me-2" data-v-78ffa6e3></i>返回上頁 </button></div></div><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img shapes shape_01" style="${ssrRenderStyle({ "opacity": "0.1" })}" data-v-78ffa6e3><img${ssrRenderAttr("src", _imports_1)} alt="" class="lazy-img shapes shape_02" style="${ssrRenderStyle({ "opacity": "0.1" })}" data-v-78ffa6e3></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notfound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const notfound = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78ffa6e3"]]);
export {
  notfound as default
};
