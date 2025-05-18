import { defineComponent, ref, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useQA } from './useQA-CICtKEzJ.mjs';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
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
import 'express';
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
      title: "\u5E38\u898B\u554F\u984C\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867",
      description: "\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u5E38\u898B\u554F\u984C\u89E3\u7B54\uFF0C\u5305\u542B\u6C11\u773E\u7533\u8ACB\u3001\u8A66\u8FA6\u55AE\u4F4D\u3001\u5916\u570B\u7C4D\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005\u7B49\u76F8\u95DC\u8CC7\u8A0A\u3002"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-81fea75b>`);
      if (!unref(loading)) {
        _push(`<div class="service-banner" data-v-81fea75b><div class="category-tabs" data-v-81fea75b><div class="tabs-scroll" data-v-81fea75b><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          var _a;
          _push(`<button class="${ssrRenderClass({ active: ((_a = activeCategory.value) == null ? void 0 : _a.id) === category.id })}" data-v-81fea75b>${ssrInterpolate(getCategoryName(category))}</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (activeCategory.value) {
          _push(`<div class="qa-list" data-v-81fea75b><!--[-->`);
          ssrRenderList(qaContents.value, (item, index) => {
            var _a;
            _push(`<div class="qa-item" data-v-81fea75b><div class="qa-title" data-v-81fea75b>${ssrInterpolate(item.question)}</div>`);
            if (expandedIndexes.value.includes(index)) {
              _push(`<div class="qa-content" data-v-81fea75b>${(_a = item.answer) != null ? _a : ""}</div>`);
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
        _push(`<div class="service-banner" data-v-81fea75b><p data-v-81fea75b>\u8CC7\u6599\u8F09\u5165\u4E2D...</p></div>`);
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
const qa_test2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81fea75b"]]);

export { qa_test2 as default };
//# sourceMappingURL=qa_test2-DVNhGHbA.mjs.map
