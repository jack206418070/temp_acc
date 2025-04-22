import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-price",
  __ssrInlineRender: true,
  setup(__props) {
    const serviceUnit = ref(null);
    const error = ref(null);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e2bc518b>`);
      if (serviceUnit.value) {
        _push(`<div class="service-banner" data-v-e2bc518b><div class="main-container" data-v-e2bc518b><div class="img" data-v-e2bc518b><img${ssrRenderAttr("src", `/api/service-unit/${serviceUnit.value.id}/price-image`)}${ssrRenderAttr("alt", serviceUnit.value.name)} data-v-e2bc518b></div></div></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-e2bc518b><p data-v-e2bc518b>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="loading-container" data-v-e2bc518b><p data-v-e2bc518b>載入中...</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-price.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const servicePrice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2bc518b"]]);
export {
  servicePrice as default
};
//# sourceMappingURL=service-price-BA8ar9yQ.js.map
