import { defineComponent, ref, useSSRContext } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-router/dist/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/server.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/devalue/index.js';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nuxt/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "qa_test",
  __ssrInlineRender: true,
  setup(__props) {
    const qa_data = ref(null);
    const activeCategory = ref("");
    const parsedQaList = ref([]);
    const expandedIndexes = ref([]);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d20c6e60>`);
      if (qa_data.value) {
        _push(`<div class="service-banner" data-v-d20c6e60><div class="category-tabs" data-v-d20c6e60><div class="tabs-scroll" data-v-d20c6e60><!--[-->`);
        ssrRenderList(qa_data.value.qa_content, (html, key) => {
          _push(`<button class="${ssrRenderClass({ active: key === activeCategory.value })}" data-v-d20c6e60>${ssrInterpolate(key)}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-d20c6e60><!--[-->`);
          ssrRenderList(parsedQaList.value, (item, index) => {
            var _a;
            _push(`<div class="qa-item" data-v-d20c6e60><div class="qa-title" data-v-d20c6e60>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-d20c6e60>${(_a = item.answer) != null ? _a : ""}</div>`);
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
        _push(`<div class="service-banner" data-v-d20c6e60><p data-v-d20c6e60>\u8CC7\u6599\u8F09\u5165\u4E2D...</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/qa_test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qa_test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d20c6e60"]]);

export { qa_test as default };
//# sourceMappingURL=qa_test-CVA3xBAh.mjs.map
