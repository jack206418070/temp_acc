import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
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
  __name: "qa_test",
  __ssrInlineRender: true,
  setup(__props) {
    const qa_data = ref(null);
    const activeCategory = ref("");
    const parsedQaList = ref([]);
    const expandedIndexes = ref([]);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9b7d9aa9>`);
      if (qa_data.value) {
        _push(`<div class="service-banner" data-v-9b7d9aa9><div class="category-tabs" data-v-9b7d9aa9><div class="tabs-scroll" data-v-9b7d9aa9><!--[-->`);
        ssrRenderList(qa_data.value.qa_content, (html, key) => {
          _push(`<button class="${ssrRenderClass({ active: key === activeCategory.value })}" data-v-9b7d9aa9>${ssrInterpolate(key)}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-9b7d9aa9><!--[-->`);
          ssrRenderList(parsedQaList.value, (item, index) => {
            _push(`<div class="qa-item" data-v-9b7d9aa9><div class="qa-title" data-v-9b7d9aa9>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-9b7d9aa9>${item.answer ?? ""}</div>`);
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
        _push(`<div class="service-banner" data-v-9b7d9aa9><p data-v-9b7d9aa9>資料載入中...</p></div>`);
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
const qa_test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b7d9aa9"]]);
export {
  qa_test as default
};
//# sourceMappingURL=qa_test-aWfEdz63.js.map
