import { defineComponent, ref, mergeProps, useSSRContext } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { u as useQA } from './useQA-CICtKEzJ.mjs';
import { u as useSeoMeta, _ as _export_sfc } from './server.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'node:crypto';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unhead/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

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
      return uniqueLanguages.length > 0;
    }
    function availableLanguages(categoryId) {
      const subCategoryIds = categories.value.filter((cat) => cat.parent_id === categoryId).map((cat) => cat.id);
      const contents = qaContents.value.filter(
        (content) => subCategoryIds.includes(content.category_id) && content.language_code !== "zh-tw" && ["en", "vi", "id", "th"].includes(content.language_code)
      );
      const uniqueLanguageCodes = [...new Set(contents.map((content) => content.language_code))];
      const availableLangs = languages.value.filter((lang) => uniqueLanguageCodes.includes(lang.code)).filter((lang) => ["en", "vi", "id", "th"].includes(lang.code));
      return availableLangs;
    }
    useSeoMeta({ title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80" }, _attrs))} data-v-735efbbc><div class="main-container" data-v-735efbbc><div class="service-grid" data-v-735efbbc><!--[-->`);
      ssrRenderList(parentCategories.value, (category) => {
        _push(`<div class="service-card" data-v-735efbbc><h3 class="card-title" data-v-735efbbc>${ssrInterpolate(category.name)}</h3><a${ssrRenderAttr("href", `/qa_test2?id=${category.id}`)} class="service-button" data-v-735efbbc> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-735efbbc>\u203A</span></a>`);
        if (hasMultiLanguageContent(category.id)) {
          _push(`<div class="flag-container" data-v-735efbbc><!--[-->`);
          ssrRenderList(availableLanguages(category.id), (lang, index) => {
            _push(`<a${ssrRenderAttr("href", `/qa_test2?id=${category.id}&lang=${lang.code}`)}${ssrRenderAttr("title", lang.name)} class="flag-link" data-v-735efbbc><img${ssrRenderAttr("src", `/images/assets/flag-${getFlagNumber(lang.code)}.avif`)}${ssrRenderAttr("alt", lang.name)} class="flag" data-v-735efbbc></a>`);
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-735efbbc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867" });
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

export { _sfc_main as default };
//# sourceMappingURL=faq-Dr2P90WS.mjs.map
