import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';

const _sfc_main = {
  __name: "qa",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const qaContents = ref({ data: [] });
    const categories = ref([]);
    const languages = ref([]);
    const showModal = ref(false);
    const isEditing = ref(false);
    const formData = ref({
      id: null,
      category_id: "",
      language_id: "",
      question: "",
      answer: "",
      sort_order: 0
    });
    const isButtonLoading = ref(false);
    const selectedCategory = ref("");
    const selectedLanguage = ref("");
    const isLoading = ref(false);
    const isLoadingEdit = ref(false);
    const editingId = ref(null);
    const deletingId = ref(null);
    const isDragging = ref(false);
    const draggedItem = ref(null);
    const showCategoryModal = ref(false);
    const isEditingCategory = ref(false);
    ref(false);
    const categoryFormData = ref({
      id: null,
      name: "",
      parent_id: "",
      name_en: "",
      name_vi: "",
      name_id: "",
      name_th: ""
    });
    const showParentSelect = ref(false);
    const expandedCategories = ref([]);
    const mainCategories = computed(() => {
      return categories.value.filter((category) => !category.parent_id);
    });
    computed(() => {
      return categories.value.filter((category) => category.parent_id);
    });
    const availableCategories = computed(() => {
      return categories.value.filter((category) => category.parent_id);
    });
    function getCategoryFullName(category) {
      const parentCategory = categories.value.find((c) => c.id === category.parent_id);
      return parentCategory ? `${parentCategory.name} > ${category.name}` : category.name;
    }
    const formattedCategories = computed(() => {
      const result = [];
      const mainCategories2 = categories.value.filter((cat) => !cat.parent_id);
      mainCategories2.forEach((mainCat) => {
        result.push({
          id: mainCat.id,
          name: mainCat.name,
          displayName: mainCat.name
        });
        const subCategories = categories.value.filter((cat) => cat.parent_id === mainCat.id);
        subCategories.forEach((subCat) => {
          result.push({
            id: subCat.id,
            name: `${mainCat.name}-${subCat.name}`,
            displayName: `\u3000${subCat.name}`
            // 使用全形空格來做縮排
          });
        });
      });
      return result;
    });
    const filteredQAContents = computed(() => {
      let filtered = qaContents.value.data || [];
      if (selectedCategory.value) {
        const selectedCategoryId = selectedCategory.value;
        const isParentCategory = categories.value.find(
          (cat) => cat.id === selectedCategoryId && !cat.parent_id
        );
        if (isParentCategory) {
          const subCategoryIds = categories.value.filter((cat) => cat.parent_id === selectedCategoryId).map((cat) => cat.id);
          filtered = filtered.filter(
            (item) => subCategoryIds.includes(item.category_id)
          );
        } else {
          filtered = filtered.filter(
            (item) => item.category_id === selectedCategoryId
          );
        }
      }
      if (selectedLanguage.value) {
        filtered = filtered.filter((item) => item.language_id === selectedLanguage.value);
      }
      return filtered;
    });
    function truncateText(text, length) {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    }
    function getSubCategories(parentId) {
      return categories.value.filter((category) => category.parent_id === parentId);
    }
    computed(() => {
      const result = [];
      const addCategoryWithLevel = (categoryId, level = 0) => {
        const category = categories.value.find((c) => c.id === categoryId);
        if (category) {
          result.push({ ...category, level });
          categories.value.filter((c) => c.parent_id === category.id).forEach((child) => addCategoryWithLevel(child.id, level + 1));
        }
      };
      categories.value.filter((c) => !c.parent_id).forEach((rootCategory) => addCategoryWithLevel(rootCategory.id));
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9217d50d><nav class="admin-nav" data-v-9217d50d><div class="nav-content" data-v-9217d50d><div class="nav-wrapper" data-v-9217d50d>`);
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
      _push(`<h1 class="page-title" data-v-9217d50d>\u554F\u7B54\u7BA1\u7406</h1><div class="placeholder" data-v-9217d50d></div></div></div></nav><div class="admin-container" data-v-9217d50d><div class="action-bar" data-v-9217d50d><div class="filter-section" data-v-9217d50d><select class="filter-select" data-v-9217d50d><option value="" data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u5168\u90E8\u985E\u5225</option><!--[-->`);
      ssrRenderList(formattedCategories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)} data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category.id) : ssrLooseEqual(selectedCategory.value, category.id)) ? " selected" : ""}>${ssrInterpolate(category.displayName)}</option>`);
      });
      _push(`<!--]--></select><select class="filter-select" data-v-9217d50d><option value="" data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(selectedLanguage.value) ? ssrLooseContain(selectedLanguage.value, "") : ssrLooseEqual(selectedLanguage.value, "")) ? " selected" : ""}>\u5168\u90E8\u8A9E\u8A00</option><!--[-->`);
      ssrRenderList(languages.value, (language) => {
        _push(`<option${ssrRenderAttr("value", language.id)} data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(selectedLanguage.value) ? ssrLooseContain(selectedLanguage.value, language.id) : ssrLooseEqual(selectedLanguage.value, language.id)) ? " selected" : ""}>${ssrInterpolate(language.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="button-group" data-v-9217d50d><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-9217d50d><i class="fas fa-tags" data-v-9217d50d></i> \u7BA1\u7406\u985E\u5225 </button><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-9217d50d><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-9217d50d></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u554F\u7B54")}</button></div></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-9217d50d><div class="loading-spinner" data-v-9217d50d></div><p data-v-9217d50d>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-9217d50d><table class="admin-table" data-v-9217d50d><thead data-v-9217d50d><tr data-v-9217d50d><th width="5%" data-v-9217d50d>ID</th><th width="15%" data-v-9217d50d>\u985E\u5225</th><th width="10%" data-v-9217d50d>\u8A9E\u8A00</th><th width="25%" data-v-9217d50d>\u554F\u984C</th><th width="30%" data-v-9217d50d>\u7B54\u6848</th><th width="15%" data-v-9217d50d>\u64CD\u4F5C</th></tr></thead><tbody data-v-9217d50d><!--[-->`);
        ssrRenderList(filteredQAContents.value, (item) => {
          var _a;
          _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.id) === item.id })}" data-v-9217d50d><td data-v-9217d50d>${ssrInterpolate(item.id)}</td><td data-v-9217d50d>${ssrInterpolate(item.category_name)}</td><td data-v-9217d50d>${ssrInterpolate(item.language_name)}</td><td data-v-9217d50d>${ssrInterpolate(item.question)}</td><td data-v-9217d50d>${ssrInterpolate(truncateText(item.answer, 100))}</td><td data-v-9217d50d><div class="action-buttons" data-v-9217d50d><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-9217d50d><i class="${ssrRenderClass([item.id === editingId.value && isLoadingEdit.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-9217d50d></i> ${ssrInterpolate(item.id === editingId.value && isLoadingEdit.value ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-9217d50d><i class="${ssrRenderClass([item.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-9217d50d></i> ${ssrInterpolate(item.id === deletingId.value ? "\u522A\u9664\u4E2D..." : "\u522A\u9664")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-9217d50d><div class="modal-content" data-v-9217d50d><h2 data-v-9217d50d>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u554F\u7B54" : "\u65B0\u589E\u554F\u7B54")}</h2><form class="admin-form" data-v-9217d50d><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u985E\u5225</label><select required data-v-9217d50d><option value="" data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(formData.value.category_id) ? ssrLooseContain(formData.value.category_id, "") : ssrLooseEqual(formData.value.category_id, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u985E\u5225</option><!--[-->`);
          ssrRenderList(availableCategories.value, (category) => {
            _push2(`<option${ssrRenderAttr("value", category.id)} data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(formData.value.category_id) ? ssrLooseContain(formData.value.category_id, category.id) : ssrLooseEqual(formData.value.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(getCategoryFullName(category))}</option>`);
          });
          _push2(`<!--]--></select></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u8A9E\u8A00</label><select required data-v-9217d50d><option value="" data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(formData.value.language_id) ? ssrLooseContain(formData.value.language_id, "") : ssrLooseEqual(formData.value.language_id, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u8A9E\u8A00</option><!--[-->`);
          ssrRenderList(languages.value, (language) => {
            _push2(`<option${ssrRenderAttr("value", language.id)} data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(formData.value.language_id) ? ssrLooseContain(formData.value.language_id, language.id) : ssrLooseEqual(formData.value.language_id, language.id)) ? " selected" : ""}>${ssrInterpolate(language.name)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u554F\u984C</label><input${ssrRenderAttr("value", formData.value.question)} type="text" required placeholder="\u8ACB\u8F38\u5165\u554F\u984C" data-v-9217d50d></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u7B54\u6848</label><textarea required placeholder="\u8ACB\u8F38\u5165\u7B54\u6848" rows="4" data-v-9217d50d>${ssrInterpolate(formData.value.answer)}</textarea></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u6392\u5E8F</label><input${ssrRenderAttr("value", formData.value.sort_order)} type="number" placeholder="\u8ACB\u8F38\u5165\u6392\u5E8F\uFF08\u9078\u586B\uFF09" data-v-9217d50d></div><div class="button-group" data-v-9217d50d><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-9217d50d><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-9217d50d></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-9217d50d> \u53D6\u6D88 </button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (showCategoryModal.value) {
          _push2(`<div class="modal-overlay" data-v-9217d50d><div class="modal-content category-modal" data-v-9217d50d><div class="modal-header" data-v-9217d50d><h2 data-v-9217d50d>\u985E\u5225\u7BA1\u7406</h2><button class="btn-close" data-v-9217d50d><i class="fas fa-times" data-v-9217d50d></i></button></div><div class="modal-body" data-v-9217d50d><form class="category-form" data-v-9217d50d><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u985E\u5225\u5C64\u7D1A</label><div class="category-type-selector" data-v-9217d50d><button type="button" class="${ssrRenderClass(["type-btn", { active: !showParentSelect.value }])}" data-v-9217d50d><div class="btn-content" data-v-9217d50d><i class="fas fa-layer-group" data-v-9217d50d></i><span data-v-9217d50d>\u4E3B\u5206\u985E</span></div><div class="btn-indicator" data-v-9217d50d></div></button><button type="button" class="${ssrRenderClass(["type-btn", { active: showParentSelect.value }])}" data-v-9217d50d><div class="btn-content" data-v-9217d50d><i class="fas fa-stream" data-v-9217d50d></i><span data-v-9217d50d>\u5B50\u5206\u985E</span></div><div class="btn-indicator" data-v-9217d50d></div></button></div></div>`);
          if (categoryFormData.value.parent_id || !isEditingCategory.value && showParentSelect.value) {
            _push2(`<div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u9078\u64C7\u4E3B\u5206\u985E</label><select${ssrIncludeBooleanAttr(showParentSelect.value) ? " required" : ""} data-v-9217d50d><option value="" data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(categoryFormData.value.parent_id) ? ssrLooseContain(categoryFormData.value.parent_id, "") : ssrLooseEqual(categoryFormData.value.parent_id, "")) ? " selected" : ""}>\u8ACB\u9078\u64C7\u4E3B\u5206\u985E</option><!--[-->`);
            ssrRenderList(mainCategories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-9217d50d${ssrIncludeBooleanAttr(Array.isArray(categoryFormData.value.parent_id) ? ssrLooseContain(categoryFormData.value.parent_id, category.id) : ssrLooseEqual(categoryFormData.value.parent_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u985E\u5225\u540D\u7A31</label><input${ssrRenderAttr("value", categoryFormData.value.name)} type="text" required placeholder="\u8ACB\u8F38\u5165\u985E\u5225\u540D\u7A31" data-v-9217d50d></div>`);
          if (showParentSelect.value) {
            _push2(`<!--[--><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u82F1\u6587\u540D\u7A31 (English Name)</label><input${ssrRenderAttr("value", categoryFormData.value.name_en)} type="text" placeholder="Please enter English name" data-v-9217d50d></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u8D8A\u5357\u6587\u540D\u7A31 (T\xEAn Ti\u1EBFng Vi\u1EC7t)</label><input${ssrRenderAttr("value", categoryFormData.value.name_vi)} type="text" placeholder="Vui l\xF2ng nh\u1EADp t\xEAn b\u1EB1ng ti\u1EBFng Vi\u1EC7t" data-v-9217d50d></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u5370\u5C3C\u6587\u540D\u7A31 (Nama Bahasa Indonesia)</label><input${ssrRenderAttr("value", categoryFormData.value.name_id)} type="text" placeholder="Silakan masukkan nama dalam bahasa Indonesia" data-v-9217d50d></div><div class="form-group" data-v-9217d50d><label data-v-9217d50d>\u6CF0\u6587\u540D\u7A31 (\u0E0A\u0E37\u0E48\u0E2D\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22)</label><input${ssrRenderAttr("value", categoryFormData.value.name_th)} type="text" placeholder="\u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22" data-v-9217d50d></div><!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="button-group" data-v-9217d50d><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-9217d50d><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-9217d50d></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditingCategory.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button>`);
          if (isEditingCategory.value) {
            _push2(`<button type="button" class="btn btn-secondary" data-v-9217d50d> \u53D6\u6D88\u7DE8\u8F2F </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></form><div class="category-lists mt-4" data-v-9217d50d><h3 data-v-9217d50d>\u985E\u5225\u5217\u8868</h3><div class="category-tree" data-v-9217d50d><!--[-->`);
          ssrRenderList(mainCategories.value, (category) => {
            _push2(`<div class="tree-item" data-v-9217d50d><div class="category-item main-category" data-v-9217d50d><div class="category-info" data-v-9217d50d><i class="${ssrRenderClass([expandedCategories.value.includes(category.id) ? "fa-chevron-down" : "fa-chevron-right", "fas"])}" data-v-9217d50d></i><span class="category-name" data-v-9217d50d>${ssrInterpolate(category.name)}</span>`);
            if (getSubCategories(category.id).length) {
              _push2(`<span class="sub-count" data-v-9217d50d> (${ssrInterpolate(getSubCategories(category.id).length)}) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="category-actions" data-v-9217d50d><button class="btn btn-sm btn-primary" data-v-9217d50d><span data-v-9217d50d>\u7DE8\u8F2F</span></button><button class="btn btn-sm btn-danger" data-v-9217d50d><span data-v-9217d50d>\u522A\u9664</span></button></div></div>`);
            if (getSubCategories(category.id).length && expandedCategories.value.includes(category.id)) {
              _push2(`<div class="sub-categories" data-v-9217d50d><!--[-->`);
              ssrRenderList(getSubCategories(category.id), (subCategory) => {
                _push2(`<div class="category-item sub-category" data-v-9217d50d><div class="category-info" data-v-9217d50d><span class="category-name" data-v-9217d50d>${ssrInterpolate(subCategory.name)}</span></div><div class="category-actions" data-v-9217d50d><button class="btn btn-sm btn-primary" data-v-9217d50d><span data-v-9217d50d>\u7DE8\u8F2F</span></button><button class="btn btn-sm btn-danger" data-v-9217d50d><span data-v-9217d50d>\u522A\u9664</span></button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/qa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const qa = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9217d50d"]]);

export { qa as default };
//# sourceMappingURL=qa-CfgiCiAa.mjs.map
