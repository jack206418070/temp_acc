import { defineComponent, ref, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

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
