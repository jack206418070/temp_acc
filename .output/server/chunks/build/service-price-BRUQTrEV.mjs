import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-price",
  __ssrInlineRender: true,
  setup(__props) {
    const serviceUnit = ref(null);
    const error = ref(null);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e4b49faf>`);
      if (serviceUnit.value) {
        _push(`<div class="service-banner" data-v-e4b49faf><div class="main-container" data-v-e4b49faf><div class="img" data-v-e4b49faf><img${ssrRenderAttr("src", `/api/service-unit/${serviceUnit.value.id}/price-image`)}${ssrRenderAttr("alt", serviceUnit.value.name)} data-v-e4b49faf></div></div></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-e4b49faf><p data-v-e4b49faf>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="loading-container" data-v-e4b49faf><p data-v-e4b49faf>\u8F09\u5165\u4E2D...</p></div>`);
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
const servicePrice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e4b49faf"]]);

export { servicePrice as default };
//# sourceMappingURL=service-price-BRUQTrEV.mjs.map
