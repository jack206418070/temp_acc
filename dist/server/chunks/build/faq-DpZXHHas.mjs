import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useSeoMeta, _ as _export_sfc } from './server.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const _imports_0 = publicAssetsURL("/images/assets/flag-1.avif");
const _imports_1 = publicAssetsURL("/images/assets/flag-2.avif");
const _imports_2 = publicAssetsURL("/images/assets/flag-3.avif");
const _imports_3 = publicAssetsURL("/images/assets/flag-4.avif");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "faq-area-five",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80" }, _attrs))} data-v-9b177bc3><div class="main-container" data-v-9b177bc3><div class="service-grid" data-v-9b177bc3><div class="service-card" data-v-9b177bc3><h3 class="card-title" data-v-9b177bc3>\u6C11\u773E\u7533\u8ACB\u7BC7</h3><a href="/qa?id=1" class="service-button" data-v-9b177bc3> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-9b177bc3>\u203A</span></a></div><div class="service-card" data-v-9b177bc3><h3 class="card-title" data-v-9b177bc3>\u8A66\u8FA6\u55AE\u4F4D\u7BC7</h3><a href="/qa?id=2" class="service-button" data-v-9b177bc3> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-9b177bc3>\u203A</span></a></div><div class="service-card" data-v-9b177bc3><h3 class="card-title" data-v-9b177bc3>\u5916\u570B\u7C4D\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005\u7BC7</h3><a href="/qa?id=3" class="service-button" data-v-9b177bc3> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-9b177bc3>\u203A</span></a><div class="flag-container" data-v-9b177bc3><a href="/qa?id=3&amp;lang=en" data-v-9b177bc3><img${ssrRenderAttr("src", _imports_0)} alt="Philippines flag" class="flag" data-v-9b177bc3></a><a href="/qa?id=3&amp;lang=vi" data-v-9b177bc3><img${ssrRenderAttr("src", _imports_1)} alt="Vietnam flag" class="flag" data-v-9b177bc3></a><a href="/qa?id=3&amp;lang=id" data-v-9b177bc3><img${ssrRenderAttr("src", _imports_2)} alt="Indonesia flag" class="flag" data-v-9b177bc3></a><a href="/qa?id=3&amp;lang=th" data-v-9b177bc3><img${ssrRenderAttr("src", _imports_3)} alt="Thailand flag" class="flag" data-v-9b177bc3></a></div></div><div class="service-card mobile" data-v-9b177bc3><h3 class="card-title" data-v-9b177bc3>\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB(\u4EF2\u4ECB)\u7BC7</h3><a href="/qa?id=4" class="service-button" data-v-9b177bc3> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-9b177bc3>\u203A</span></a></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/faq/faq-area-five.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9b177bc3"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_faq_area_five = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_faq_area_five, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=faq-DpZXHHas.mjs.map
