import { defineComponent, useSSRContext } from "vue";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lazy-bag",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "懶人包｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="spacer-section" data-v-0a6b5e89><p data-v-0a6b5e89></p></div><div data-v-0a6b5e89><h1 data-v-0a6b5e89>懶人包</h1><div class="grid-container" data-v-0a6b5e89><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>完整內容更新中</h3></div><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>完整內容更新中</h3></div><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>完整內容更新中</h3></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lazy-bag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lazyBag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a6b5e89"]]);
export {
  lazyBag as default
};
//# sourceMappingURL=lazy-bag-DRjYhS4H.js.map
