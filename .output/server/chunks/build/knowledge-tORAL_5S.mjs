import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderTeleport, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "knowledge",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const knowledgeList = ref({ data: [] });
    const showModal = ref(false);
    const isEditing = ref(false);
    const formData = ref({
      kid: null,
      know_category: "",
      title: "",
      image_url: ""
    });
    const imagePreview = ref("");
    ref(null);
    const imageError = ref("");
    const isButtonLoading = ref(false);
    const selectedCategory = ref("");
    const isLoading = ref(false);
    const isDragging = ref(false);
    const draggedItem = ref(null);
    const filteredKnowledgeList = computed(() => {
      if (!selectedCategory.value) {
        return knowledgeList.value.data.data || [];
      }
      return (knowledgeList.value.data.data || []).filter(
        (item) => item.know_category.toString() === selectedCategory.value
      );
    });
    function getCategoryName(category) {
      const categories = {
        1: "\u61F6\u4EBA\u5305",
        2: "\u5BA3\u5C0E\u8CC7\u6599"
      };
      return categories[category] || "\u672A\u77E5\u985E\u5225";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1f66fc7c><nav class="admin-nav" data-v-1f66fc7c><div class="nav-content" data-v-1f66fc7c><div class="nav-wrapper" data-v-1f66fc7c>`);
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
      _push(`<h1 class="page-title" data-v-1f66fc7c>\u77E5\u8B58\u5EAB\u7BA1\u7406</h1><div class="placeholder" data-v-1f66fc7c></div></div></div></nav><div class="admin-container qa-container" data-v-1f66fc7c><div class="action-bar" data-v-1f66fc7c><div class="filter-section" data-v-1f66fc7c><select class="filter-select" data-v-1f66fc7c><option value="" data-v-1f66fc7c${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u5168\u90E8\u985E\u5225</option><option value="1" data-v-1f66fc7c${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "1") : ssrLooseEqual(selectedCategory.value, "1")) ? " selected" : ""}>\u61F6\u4EBA\u5305</option><option value="2" data-v-1f66fc7c${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "2") : ssrLooseEqual(selectedCategory.value, "2")) ? " selected" : ""}>\u5BA3\u5C0E\u8CC7\u6599</option></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-1f66fc7c><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-1f66fc7c></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u77E5\u8B58")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-1f66fc7c><div class="loading-spinner" data-v-1f66fc7c></div><p data-v-1f66fc7c>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-1f66fc7c><table class="admin-table" data-v-1f66fc7c><thead data-v-1f66fc7c><tr data-v-1f66fc7c><th width="5%" data-v-1f66fc7c>ID</th><th width="15%" data-v-1f66fc7c>\u985E\u5225</th><th width="50%" data-v-1f66fc7c>\u6A19\u984C</th><th width="30%" data-v-1f66fc7c>\u64CD\u4F5C</th></tr></thead><tbody data-v-1f66fc7c><!--[-->`);
        ssrRenderList(filteredKnowledgeList.value, (item) => {
          var _a;
          _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.kid) === item.kid })}" data-v-1f66fc7c><td data-v-1f66fc7c>${ssrInterpolate(item.kid)}</td><td data-v-1f66fc7c><span class="category-tag" data-v-1f66fc7c>${ssrInterpolate(getCategoryName(item.know_category))}</span></td><td data-v-1f66fc7c><div class="flex items-center" data-v-1f66fc7c><div class="flex-shrink-0 h-10 w-10 cursor-move mr-4" data-v-1f66fc7c><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1f66fc7c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" data-v-1f66fc7c></path></svg></div><div class="text-sm font-medium text-gray-900" data-v-1f66fc7c>${ssrInterpolate(item.title)}</div></div></td><td data-v-1f66fc7c><div class="action-buttons" data-v-1f66fc7c><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-1f66fc7c><i class="${ssrRenderClass([item.isLoading ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-1f66fc7c></i> ${ssrInterpolate(item.isLoading ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-1f66fc7c><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-1f66fc7c></i> \u522A\u9664 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-1f66fc7c><div class="modal-content" data-v-1f66fc7c><h2 data-v-1f66fc7c>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u77E5\u8B58" : "\u65B0\u589E\u77E5\u8B58")}</h2><form class="admin-form" data-v-1f66fc7c><div class="form-group" data-v-1f66fc7c><label data-v-1f66fc7c>\u985E\u5225</label><select required data-v-1f66fc7c><option value="1" data-v-1f66fc7c${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "1") : ssrLooseEqual(formData.value.know_category, "1")) ? " selected" : ""}>\u61F6\u4EBA\u5305</option><option value="2" data-v-1f66fc7c${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "2") : ssrLooseEqual(formData.value.know_category, "2")) ? " selected" : ""}>\u5BA3\u5C0E\u8CC7\u6599</option></select></div><div class="form-group" data-v-1f66fc7c><label data-v-1f66fc7c>\u6A19\u984C</label><input${ssrRenderAttr("value", formData.value.title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-1f66fc7c></div><div class="form-group" data-v-1f66fc7c><label data-v-1f66fc7c>\u5716\u7247\u9023\u7D50 (\u9078\u586B)</label><input${ssrRenderAttr("value", formData.value.image_url)} type="url" placeholder="\u8ACB\u8F38\u5165\u5716\u7247\u9023\u7D50" data-v-1f66fc7c></div><div class="form-group" data-v-1f66fc7c><label data-v-1f66fc7c>\u5716\u7247 (\u9650\u5236 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-1f66fc7c>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-1f66fc7c>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (imagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", imagePreview.value)} class="image-preview" alt="\u9810\u89BD\u5716" data-v-1f66fc7c>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-1f66fc7c><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-1f66fc7c><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-1f66fc7c></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-1f66fc7c> \u53D6\u6D88 </button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/knowledge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const knowledge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f66fc7c"]]);

export { knowledge as default };
//# sourceMappingURL=knowledge-tORAL_5S.mjs.map
