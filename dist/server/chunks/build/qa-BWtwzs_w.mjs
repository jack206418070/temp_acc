import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
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
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8d7d6cac>`);
      if (qa_data.value) {
        _push(`<div class="service-banner" data-v-8d7d6cac><div class="category-tabs" data-v-8d7d6cac><div class="tabs-scroll" data-v-8d7d6cac><!--[-->`);
        ssrRenderList(qa_data.value.qa_content, (html, key) => {
          _push(`<button class="${ssrRenderClass({ active: key === activeCategory.value })}" data-v-8d7d6cac>${ssrInterpolate(key)}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-8d7d6cac><!--[-->`);
          ssrRenderList(parsedQaList.value, (item, index) => {
            var _a;
            _push(`<div class="qa-item" data-v-8d7d6cac><div class="qa-title" data-v-8d7d6cac>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-8d7d6cac>${(_a = item.answer) != null ? _a : ""}</div>`);
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
        _push(`<div class="service-banner" data-v-8d7d6cac><p data-v-8d7d6cac>\u8CC7\u6599\u8F09\u5165\u4E2D...</p></div>`);
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
const qa = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8d7d6cac"]]);

export { qa as default };
//# sourceMappingURL=qa-BWtwzs_w.mjs.map
