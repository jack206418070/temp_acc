import { _ as _export_sfc, b as __nuxt_component_0$2 } from './server.mjs';
import { ref, computed, watch, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderTeleport } from 'vue/server-renderer';
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
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const itemsPerPage = 10;
const _sfc_main = {
  __name: "qa_setting",
  __ssrInlineRender: true,
  setup(__props) {
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5a7fabe8><div class="admin-layout" data-v-5a7fabe8><nav class="admin-nav" data-v-5a7fabe8><div class="nav-content" data-v-5a7fabe8><div class="nav-wrapper" data-v-5a7fabe8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
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
      _push(`<h1 class="page-title" data-v-5a7fabe8>\u554F\u7B54\u7BA1\u7406</h1><div class="placeholder" data-v-5a7fabe8></div></div></div></nav><div class="admin-container qa-container" data-v-5a7fabe8><div class="action-bar" data-v-5a7fabe8><button class="btn btn-primary" data-v-5a7fabe8><i class="fas fa-plus" data-v-5a7fabe8></i> \u65B0\u589E\u554F\u7B54 </button></div><div class="search-filter-container" data-v-5a7fabe8><div class="search-box" data-v-5a7fabe8><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="\u641C\u5C0B\u554F\u984C..." class="search-input" data-v-5a7fabe8></div><div class="filter-box" data-v-5a7fabe8><select class="category-select" data-v-5a7fabe8><option value="" data-v-5a7fabe8${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>\u6240\u6709\u985E\u5225</option><!--[-->`);
      ssrRenderList(categoryOptions, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} data-v-5a7fabe8${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), option.value) : ssrLooseEqual(unref(selectedCategory), option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="loading-container" data-v-5a7fabe8><div class="loading-spinner" data-v-5a7fabe8></div><p data-v-5a7fabe8>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-5a7fabe8><table class="admin-table" data-v-5a7fabe8><thead data-v-5a7fabe8><tr data-v-5a7fabe8><th width="5%" data-v-5a7fabe8>ID</th><th width="35%" data-v-5a7fabe8>\u554F\u984C</th><th width="35%" data-v-5a7fabe8>\u7B54\u6848</th><th width="15%" data-v-5a7fabe8>\u985E\u5225</th><th width="10%" data-v-5a7fabe8>\u64CD\u4F5C</th></tr></thead><tbody data-v-5a7fabe8><!--[-->`);
        ssrRenderList(unref(paginatedQAList), (qa) => {
          _push(`<tr data-v-5a7fabe8><td data-v-5a7fabe8>${ssrInterpolate(qa.id)}</td><td class="question-cell" data-v-5a7fabe8>${ssrInterpolate(qa.question)}</td><td class="answer-cell" data-v-5a7fabe8>${ssrInterpolate(truncateText(qa.answer, 80))}</td><td data-v-5a7fabe8><span class="category-tag" data-v-5a7fabe8>${ssrInterpolate(getCategoryLabel(qa.category))}</span></td><td data-v-5a7fabe8><div class="action-buttons" data-v-5a7fabe8><button class="btn btn-secondary" data-v-5a7fabe8> \u7DE8\u8F2F </button><button class="btn btn-danger" data-v-5a7fabe8> \u522A\u9664 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      if (!unref(isLoading) && ((_a = unref(qaList).data) == null ? void 0 : _a.length)) {
        _push(`<div class="pagination" data-v-5a7fabe8><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="btn btn-secondary" data-v-5a7fabe8> \u4E0A\u4E00\u9801 </button><span class="page-info" data-v-5a7fabe8> \u7B2C ${ssrInterpolate(unref(currentPage))} \u9801\uFF0C\u5171 ${ssrInterpolate(unref(totalPages))} \u9801 </span><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="btn btn-secondary" data-v-5a7fabe8> \u4E0B\u4E00\u9801 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showModal)) {
          _push2(`<div class="modal-overlay" data-v-5a7fabe8><div class="modal-content" data-v-5a7fabe8><h2 class="modal-title" data-v-5a7fabe8>${ssrInterpolate(unref(isEditing) ? "\u7DE8\u8F2F\u554F\u7B54" : "\u65B0\u589E\u554F\u7B54")}</h2><form class="admin-form" data-v-5a7fabe8><div class="form-group" data-v-5a7fabe8><label data-v-5a7fabe8>\u554F\u984C</label><input${ssrRenderAttr("value", unref(formData).question)} type="text" required placeholder="\u8ACB\u8F38\u5165\u554F\u984C"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-5a7fabe8></div><div class="form-group" data-v-5a7fabe8><label data-v-5a7fabe8>\u7B54\u6848</label><textarea required placeholder="\u8ACB\u8F38\u5165\u7B54\u6848"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} rows="4" data-v-5a7fabe8>${ssrInterpolate(unref(formData).answer)}</textarea></div><div class="form-group" data-v-5a7fabe8><label data-v-5a7fabe8>\u985E\u5225</label><select required${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="form-select" data-v-5a7fabe8><option value="" disabled data-v-5a7fabe8${ssrIncludeBooleanAttr(Array.isArray(unref(formData).category) ? ssrLooseContain(unref(formData).category, "") : ssrLooseEqual(unref(formData).category, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u985E\u5225</option><!--[-->`);
          ssrRenderList(categoryOptions, (option) => {
            _push2(`<option${ssrRenderAttr("value", option.value)} data-v-5a7fabe8${ssrIncludeBooleanAttr(Array.isArray(unref(formData).category) ? ssrLooseContain(unref(formData).category, option.value) : ssrLooseEqual(unref(formData).category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="button-group" data-v-5a7fabe8><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-5a7fabe8>`);
          if (unref(isSaving)) {
            _push2(`<span class="button-loading" data-v-5a7fabe8></span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(unref(isEditing) ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} data-v-5a7fabe8> \u53D6\u6D88 </button></div></form></div></div>`);
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
const qa_setting = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a7fabe8"]]);

export { qa_setting as default };
//# sourceMappingURL=qa_setting-4igqc64H.mjs.map
