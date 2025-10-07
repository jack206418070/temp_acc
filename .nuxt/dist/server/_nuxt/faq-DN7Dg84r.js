import { ref, mergeProps, useSSRContext, defineComponent } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as useQA } from "./useQA-CICtKEzJ.js";
import { _ as _export_sfc, u as useSeoMeta } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
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
const _sfc_main$1 = {
  __name: "faq-area-six",
  __ssrInlineRender: true,
  setup(__props) {
    useQA();
    const parentCategories = ref([]);
    const languages = ref([]);
    const qaContents = ref([]);
    const categories = ref([]);
    function getFlagNumber(langCode) {
      console.log("當前語言代碼:", langCode);
      switch (langCode) {
        case "en":
          return "1";
        // 英文
        case "vi":
          return "2";
        // 越南文
        case "id":
          return "3";
        // 印尼文
        case "th":
          return "4";
        // 泰文
        default:
          return null;
      }
    }
    function hasMultiLanguageContent(categoryId) {
      const subCategoryIds = categories.value.filter((cat) => cat.parent_id === categoryId).map((cat) => cat.id);
      const contents = qaContents.value.filter(
        (content) => subCategoryIds.includes(content.category_id) && content.language_code !== "zh-tw" && ["en", "vi", "id", "th"].includes(content.language_code)
      );
      const uniqueLanguages = [...new Set(contents.map((content) => content.language_code))];
      console.log("分類ID:", categoryId, "可用語言:", uniqueLanguages);
      return uniqueLanguages.length > 0;
    }
    function availableLanguages(categoryId) {
      const subCategoryIds = categories.value.filter((cat) => cat.parent_id === categoryId).map((cat) => cat.id);
      const contents = qaContents.value.filter(
        (content) => subCategoryIds.includes(content.category_id) && content.language_code !== "zh-tw" && ["en", "vi", "id", "th"].includes(content.language_code)
      );
      const uniqueLanguageCodes = [...new Set(contents.map((content) => content.language_code))];
      const availableLangs = languages.value.filter((lang) => uniqueLanguageCodes.includes(lang.code)).filter((lang) => ["en", "vi", "id", "th"].includes(lang.code));
      console.log("分類ID:", categoryId, "可用語言資訊:", availableLangs);
      return availableLangs;
    }
    useSeoMeta({ title: "常見問題｜多元陪伴照顧" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80" }, _attrs))} data-v-d0d5ffc3><div class="main-container" data-v-d0d5ffc3><div class="service-grid" data-v-d0d5ffc3><!--[-->`);
      ssrRenderList(parentCategories.value, (category, index) => {
        _push(`<div class="${ssrRenderClass([{ "mobile": index == 3 }, "service-card"])}" data-v-d0d5ffc3><h3 class="card-title" data-v-d0d5ffc3>${ssrInterpolate(category.name)}</h3><a${ssrRenderAttr("href", `/qa_test2?id=${category.id}`)} class="service-button" data-v-d0d5ffc3> 相關問題 <span class="arrow" data-v-d0d5ffc3>›</span></a>`);
        if (hasMultiLanguageContent(category.id)) {
          _push(`<div class="flag-container" data-v-d0d5ffc3><!--[-->`);
          ssrRenderList(availableLanguages(category.id), (lang, index2) => {
            _push(`<a${ssrRenderAttr("href", `/qa_test2?id=${category.id}&lang=${lang.code}`)}${ssrRenderAttr("title", lang.name)} class="flag-link" data-v-d0d5ffc3><img${ssrRenderAttr("src", `/images/assets/flag-${getFlagNumber(lang.code)}.avif`)}${ssrRenderAttr("alt", lang.name)} class="flag" data-v-d0d5ffc3></a>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/faq/faq-area-six.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d0d5ffc3"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "常見問題｜多元陪伴照顧" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_faq_area_six = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_faq_area_six, null, null, _parent));
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
export {
  _sfc_main as default
};
