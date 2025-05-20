import { defineComponent, ref, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "qa",
  __ssrInlineRender: true,
  setup(__props) {
    const qa_data = ref(null);
    const activeCategory = ref("");
    const parsedQaList = ref([]);
    const expandedIndexes = ref([]);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7c91dec6>`);
      if (qa_data.value) {
        _push(`<div class="service-banner" data-v-7c91dec6><div class="category-tabs" data-v-7c91dec6><div class="tabs-scroll" data-v-7c91dec6><!--[-->`);
        ssrRenderList(qa_data.value.qa_content, (html, key) => {
          _push(`<button class="${ssrRenderClass({ active: key === activeCategory.value })}" data-v-7c91dec6>${ssrInterpolate(key)}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-7c91dec6><!--[-->`);
          ssrRenderList(parsedQaList.value, (item, index) => {
            var _a;
            _push(`<div class="qa-item" data-v-7c91dec6><div class="qa-title" data-v-7c91dec6>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-7c91dec6>${(_a = item.answer) != null ? _a : ""}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="service-banner" data-v-7c91dec6><p data-v-7c91dec6>\u8CC7\u6599\u8F09\u5165\u4E2D...</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/qa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qa = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c91dec6"]]);

export { qa as default };
//# sourceMappingURL=qa-CQEAVs21.mjs.map
