import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, computed, watch, withCtx, createTextVNode, unref, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderTeleport } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
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

const itemsPerPage = 10;
const _sfc_main = {
  __name: "qa_setting",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const qaList = ref([]);
    const showModal = ref(false);
    const isEditing = ref(false);
    const isLoading = ref(true);
    const formData = ref({
      id: null,
      question: "",
      answer: "",
      category: ""
    });
    const currentPage = ref(1);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const isSaving = ref(false);
    const categoryMapping = {
      "1": "\u60F3\u7533\u8ACB\u670D\u52D9",
      "2": "\u60F3\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D",
      "3": "\u6211\u662F\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005",
      "4": "\u6211\u662F\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB"
    };
    const categoryOptions = [
      { value: "1", label: "\u60F3\u7533\u8ACB\u670D\u52D9" },
      { value: "2", label: "\u60F3\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D" },
      { value: "3", label: "\u6211\u662F\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005" },
      { value: "4", label: "\u6211\u662F\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB" }
    ];
    computed(() => {
      if (!qaList.value.data) return [];
      const categories = [...new Set(qaList.value.data.map((qa) => qa.category))];
      return categories.map((category) => ({
        value: category,
        label: categoryMapping[category] || category
      }));
    });
    const getCategoryLabel = (category) => {
      return categoryMapping[category] || category;
    };
    const filteredQAList = computed(() => {
      if (!qaList.value.data) return [];
      return qaList.value.data.filter((qa) => {
        const matchQuery = searchQuery.value.toLowerCase();
        const matchCategory = !selectedCategory.value || qa.category === selectedCategory.value;
        const matchSearch = !searchQuery.value || qa.question.toLowerCase().includes(matchQuery);
        return matchSearch && matchCategory;
      });
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredQAList.value.length / itemsPerPage);
    });
    const paginatedQAList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredQAList.value.slice(start, end);
    });
    watch([searchQuery, selectedCategory], () => {
      currentPage.value = 1;
    });
    function truncateText(text, maxLength) {
      if (!text) return "";
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-af324468><div class="admin-layout" data-v-af324468><nav class="admin-nav" data-v-af324468><div class="nav-content" data-v-af324468><div class="nav-wrapper" data-v-af324468>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "btn btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE\u9996\u9801`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE\u9996\u9801")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="page-title" data-v-af324468>\u554F\u7B54\u7BA1\u7406</h1><div class="placeholder" data-v-af324468></div></div></div></nav><div class="admin-container qa-container" data-v-af324468><div class="action-bar" data-v-af324468><button class="btn btn-primary" data-v-af324468><i class="fas fa-plus" data-v-af324468></i> \u65B0\u589E\u554F\u7B54 </button></div><div class="search-filter-container" data-v-af324468><div class="search-box" data-v-af324468><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="\u641C\u5C0B\u554F\u984C..." class="search-input" data-v-af324468></div><div class="filter-box" data-v-af324468><select class="category-select" data-v-af324468><option value="" data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u6240\u6709\u985E\u5225</option><!--[-->`);
      ssrRenderList(categoryOptions, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, option.value) : ssrLooseEqual(selectedCategory.value, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-af324468><div class="loading-spinner" data-v-af324468></div><p data-v-af324468>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-af324468><table class="admin-table" data-v-af324468><thead data-v-af324468><tr data-v-af324468><th width="5%" data-v-af324468>ID</th><th width="35%" data-v-af324468>\u554F\u984C</th><th width="35%" data-v-af324468>\u7B54\u6848</th><th width="15%" data-v-af324468>\u985E\u5225</th><th width="10%" data-v-af324468>\u64CD\u4F5C</th></tr></thead><tbody data-v-af324468><!--[-->`);
        ssrRenderList(unref(paginatedQAList), (qa) => {
          _push(`<tr data-v-af324468><td data-v-af324468>${ssrInterpolate(qa.id)}</td><td class="question-cell" data-v-af324468>${ssrInterpolate(qa.question)}</td><td class="answer-cell" data-v-af324468>${ssrInterpolate(truncateText(qa.answer, 80))}</td><td data-v-af324468><span class="category-tag" data-v-af324468>${ssrInterpolate(getCategoryLabel(qa.category))}</span></td><td data-v-af324468><div class="action-buttons" data-v-af324468><button class="btn btn-secondary" data-v-af324468> \u7DE8\u8F2F </button><button class="btn btn-danger" data-v-af324468> \u522A\u9664 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      if (!isLoading.value && ((_a = qaList.value.data) == null ? void 0 : _a.length)) {
        _push(`<div class="pagination" data-v-af324468><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="btn btn-secondary" data-v-af324468> \u4E0A\u4E00\u9801 </button><span class="page-info" data-v-af324468> \u7B2C ${ssrInterpolate(currentPage.value)} \u9801\uFF0C\u5171 ${ssrInterpolate(unref(totalPages))} \u9801 </span><button${ssrIncludeBooleanAttr(currentPage.value === unref(totalPages)) ? " disabled" : ""} class="btn btn-secondary" data-v-af324468> \u4E0B\u4E00\u9801 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-af324468><div class="modal-content" data-v-af324468><h2 class="modal-title" data-v-af324468>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u554F\u7B54" : "\u65B0\u589E\u554F\u7B54")}</h2><form class="admin-form" data-v-af324468><div class="form-group" data-v-af324468><label data-v-af324468>\u554F\u984C</label><input${ssrRenderAttr("value", formData.value.question)} type="text" required placeholder="\u8ACB\u8F38\u5165\u554F\u984C"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468></div><div class="form-group" data-v-af324468><label data-v-af324468>\u7B54\u6848</label><textarea required placeholder="\u8ACB\u8F38\u5165\u7B54\u6848"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} rows="4" data-v-af324468>${ssrInterpolate(formData.value.answer)}</textarea></div><div class="form-group" data-v-af324468><label data-v-af324468>\u985E\u5225</label><select required${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="form-select" data-v-af324468><option value="" disabled data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "") : ssrLooseEqual(formData.value.category, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u985E\u5225</option><!--[-->`);
          ssrRenderList(categoryOptions, (option) => {
            _push2(`<option${ssrRenderAttr("value", option.value)} data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, option.value) : ssrLooseEqual(formData.value.category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="button-group" data-v-af324468><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468>`);
          if (isSaving.value) {
            _push2(`<span class="button-loading" data-v-af324468></span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468> \u53D6\u6D88 </button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/qa_setting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qa_setting = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-af324468"]]);

export { qa_setting as default };
//# sourceMappingURL=qa_setting-DFGVxSxR.mjs.map
