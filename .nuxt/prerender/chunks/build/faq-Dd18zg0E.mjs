import { defineComponent, ref, mergeProps, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { u as useQA } from './useQA-CICtKEzJ.mjs';
import { u as useSeoMeta, _ as _export_sfc } from './server.mjs';
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
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

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
      console.log("\u7576\u524D\u8A9E\u8A00\u4EE3\u78BC:", langCode);
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
      console.log("\u5206\u985EID:", categoryId, "\u53EF\u7528\u8A9E\u8A00:", uniqueLanguages);
      return uniqueLanguages.length > 0;
    }
    function availableLanguages(categoryId) {
      const subCategoryIds = categories.value.filter((cat) => cat.parent_id === categoryId).map((cat) => cat.id);
      const contents = qaContents.value.filter(
        (content) => subCategoryIds.includes(content.category_id) && content.language_code !== "zh-tw" && ["en", "vi", "id", "th"].includes(content.language_code)
      );
      const uniqueLanguageCodes = [...new Set(contents.map((content) => content.language_code))];
      const availableLangs = languages.value.filter((lang) => uniqueLanguageCodes.includes(lang.code)).filter((lang) => ["en", "vi", "id", "th"].includes(lang.code));
      console.log("\u5206\u985EID:", categoryId, "\u53EF\u7528\u8A9E\u8A00\u8CC7\u8A0A:", availableLangs);
      return availableLangs;
    }
    useSeoMeta({ title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-section-three pt-120 lg-pt-80 pb-40 lg-pb-80" }, _attrs))} data-v-d0d5ffc3><div class="main-container" data-v-d0d5ffc3><div class="service-grid" data-v-d0d5ffc3><!--[-->`);
      ssrRenderList(parentCategories.value, (category, index) => {
        _push(`<div class="${ssrRenderClass([{ "mobile": index == 3 }, "service-card"])}" data-v-d0d5ffc3><h3 class="card-title" data-v-d0d5ffc3>${ssrInterpolate(category.name)}</h3><a${ssrRenderAttr("href", `/qa_test2?id=${category.id}`)} class="service-button" data-v-d0d5ffc3> \u76F8\u95DC\u554F\u984C <span class="arrow" data-v-d0d5ffc3>\u203A</span></a>`);
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
//# sourceMappingURL=faq-Dd18zg0E.mjs.map
