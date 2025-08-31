import { defineComponent, ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useQA } from "./useQA-CICtKEzJ.js";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
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
  __name: "qa_test2",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { loading, fetchQAContents } = useQA();
    const categories = ref([]);
    const qaContents = ref([]);
    const activeCategory = ref(null);
    const expandedIndexes = ref([]);
    const currentLang = ref("zh-tw");
    const getCategoryName = (category) => {
      const langMap = {
        "zh-tw": "name",
        // 中文
        "en": "name_en",
        // 英文
        "vi": "name_vi",
        // 越南文
        "id": "name_id",
        // 印尼文
        "th": "name_th"
        // 泰文
      };
      const langKey = langMap[currentLang.value] || "name";
      return category[langKey] || category.name;
    };
    const loadQAContents = async () => {
      if (!activeCategory.value) return;
      const contents = await fetchQAContents();
      qaContents.value = contents.filter((content) => {
        var _a;
        const isCurrentCategory = content.category_id === ((_a = activeCategory.value) == null ? void 0 : _a.id);
        console.log("content", content);
        if (!route.query.lang || route.query.lang === "zh-tw") {
          return isCurrentCategory && content.language_code == "zh-TW";
        } else {
          return isCurrentCategory && content.language_code === route.query.lang;
        }
      }).sort((a, b) => a.sort_order - b.sort_order);
    };
    watch(
      () => route.query,
      async () => {
        if (route.query.lang) {
          currentLang.value = route.query.lang;
        } else {
          currentLang.value = "zh-tw";
        }
        if (activeCategory.value) {
          await loadQAContents();
        }
      },
      { immediate: true }
    );
    useSeoMeta({
      title: "常見問題｜多元陪伴照顧",
      description: "多元陪伴照顧服務常見問題解答，包含民眾申請、試辦單位、外國籍陪伴照顧服務工作者等相關資訊。"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4ef1f8a6>`);
      if (!unref(loading)) {
        _push(`<div class="service-banner" data-v-4ef1f8a6><div class="category-tabs" data-v-4ef1f8a6><div class="tabs-scroll" data-v-4ef1f8a6><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          var _a;
          _push(`<button class="${ssrRenderClass({ active: ((_a = activeCategory.value) == null ? void 0 : _a.id) === category.id })}" data-v-4ef1f8a6>${ssrInterpolate(getCategoryName(category))}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-4ef1f8a6><!--[-->`);
          ssrRenderList(qaContents.value, (item, index) => {
            _push(`<div class="qa-item" data-v-4ef1f8a6><div class="qa-title" data-v-4ef1f8a6>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-4ef1f8a6>${item.answer ?? ""}</div>`);
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
        _push(`<div class="service-banner" data-v-4ef1f8a6><p data-v-4ef1f8a6>資料載入中...</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/qa_test2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qa_test2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ef1f8a6"]]);
export {
  qa_test2 as default
};
//# sourceMappingURL=qa_test2-0aRiZq7v.js.map
