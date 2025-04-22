import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import "hookable";
import "destr";
import "klona";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "ohash";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
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
            displayName: `　${subCat.name}`
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ade18f59><nav class="admin-nav" data-v-ade18f59><div class="nav-content" data-v-ade18f59><div class="nav-wrapper" data-v-ade18f59>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "btn btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`返回首頁`);
          } else {
            return [
              createTextVNode("返回首頁")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="page-title" data-v-ade18f59>問答管理</h1><div class="placeholder" data-v-ade18f59></div></div></div></nav><div class="admin-container" data-v-ade18f59><div class="action-bar" data-v-ade18f59><div class="filter-section" data-v-ade18f59><select class="filter-select" data-v-ade18f59><option value="" data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>全部類別</option><!--[-->`);
      ssrRenderList(formattedCategories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)} data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category.id) : ssrLooseEqual(selectedCategory.value, category.id)) ? " selected" : ""}>${ssrInterpolate(category.displayName)}</option>`);
      });
      _push(`<!--]--></select><select class="filter-select" data-v-ade18f59><option value="" data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(selectedLanguage.value) ? ssrLooseContain(selectedLanguage.value, "") : ssrLooseEqual(selectedLanguage.value, "")) ? " selected" : ""}>全部語言</option><!--[-->`);
      ssrRenderList(languages.value, (language) => {
        _push(`<option${ssrRenderAttr("value", language.id)} data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(selectedLanguage.value) ? ssrLooseContain(selectedLanguage.value, language.id) : ssrLooseEqual(selectedLanguage.value, language.id)) ? " selected" : ""}>${ssrInterpolate(language.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="button-group" data-v-ade18f59><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-ade18f59><i class="fas fa-tags" data-v-ade18f59></i> 管理類別 </button><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-ade18f59><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-ade18f59></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增問答")}</button></div></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-ade18f59><div class="loading-spinner" data-v-ade18f59></div><p data-v-ade18f59>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-ade18f59><table class="admin-table" data-v-ade18f59><thead data-v-ade18f59><tr data-v-ade18f59><th width="5%" data-v-ade18f59>ID</th><th width="15%" data-v-ade18f59>類別</th><th width="10%" data-v-ade18f59>語言</th><th width="25%" data-v-ade18f59>問題</th><th width="30%" data-v-ade18f59>答案</th><th width="15%" data-v-ade18f59>操作</th></tr></thead><tbody data-v-ade18f59><!--[-->`);
        ssrRenderList(filteredQAContents.value, (item) => {
          var _a;
          _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.id) === item.id })}" data-v-ade18f59><td data-v-ade18f59>${ssrInterpolate(item.id)}</td><td data-v-ade18f59>${ssrInterpolate(item.category_name)}</td><td data-v-ade18f59>${ssrInterpolate(item.language_name)}</td><td data-v-ade18f59>${ssrInterpolate(item.question)}</td><td data-v-ade18f59>${ssrInterpolate(truncateText(item.answer, 100))}</td><td data-v-ade18f59><div class="action-buttons" data-v-ade18f59><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-ade18f59><i class="${ssrRenderClass([item.id === editingId.value && isLoadingEdit.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-ade18f59></i> ${ssrInterpolate(item.id === editingId.value && isLoadingEdit.value ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-ade18f59><i class="${ssrRenderClass([item.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-ade18f59></i> ${ssrInterpolate(item.id === deletingId.value ? "刪除中..." : "刪除")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-ade18f59><div class="modal-content" data-v-ade18f59><h2 data-v-ade18f59>${ssrInterpolate(isEditing.value ? "編輯問答" : "新增問答")}</h2><form class="admin-form" data-v-ade18f59><div class="form-group" data-v-ade18f59><label data-v-ade18f59>類別</label><select required data-v-ade18f59><option value="" data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(formData.value.category_id) ? ssrLooseContain(formData.value.category_id, "") : ssrLooseEqual(formData.value.category_id, "")) ? " selected" : ""}>請選擇類別</option><!--[-->`);
          ssrRenderList(availableCategories.value, (category) => {
            _push2(`<option${ssrRenderAttr("value", category.id)} data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(formData.value.category_id) ? ssrLooseContain(formData.value.category_id, category.id) : ssrLooseEqual(formData.value.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(getCategoryFullName(category))}</option>`);
          });
          _push2(`<!--]--></select></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>語言</label><select required data-v-ade18f59><option value="" data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(formData.value.language_id) ? ssrLooseContain(formData.value.language_id, "") : ssrLooseEqual(formData.value.language_id, "")) ? " selected" : ""}>請選擇語言</option><!--[-->`);
          ssrRenderList(languages.value, (language) => {
            _push2(`<option${ssrRenderAttr("value", language.id)} data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(formData.value.language_id) ? ssrLooseContain(formData.value.language_id, language.id) : ssrLooseEqual(formData.value.language_id, language.id)) ? " selected" : ""}>${ssrInterpolate(language.name)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>問題</label><input${ssrRenderAttr("value", formData.value.question)} type="text" required placeholder="請輸入問題" data-v-ade18f59></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>答案</label><textarea required placeholder="請輸入答案" rows="4" data-v-ade18f59>${ssrInterpolate(formData.value.answer)}</textarea></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>排序</label><input${ssrRenderAttr("value", formData.value.sort_order)} type="number" placeholder="請輸入排序（選填）" data-v-ade18f59></div><div class="button-group" data-v-ade18f59><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-ade18f59><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-ade18f59></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-ade18f59> 取消 </button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (showCategoryModal.value) {
          _push2(`<div class="modal-overlay" data-v-ade18f59><div class="modal-content category-modal" data-v-ade18f59><div class="modal-header" data-v-ade18f59><h2 data-v-ade18f59>類別管理</h2><button class="btn-close" data-v-ade18f59><i class="fas fa-times" data-v-ade18f59></i></button></div><div class="modal-body" data-v-ade18f59><form class="category-form" data-v-ade18f59><div class="form-group" data-v-ade18f59><label data-v-ade18f59>類別層級</label><div class="category-type-selector" data-v-ade18f59><button type="button" class="${ssrRenderClass(["type-btn", { active: !showParentSelect.value }])}" data-v-ade18f59><div class="btn-content" data-v-ade18f59><i class="fas fa-layer-group" data-v-ade18f59></i><span data-v-ade18f59>主分類</span></div><div class="btn-indicator" data-v-ade18f59></div></button><button type="button" class="${ssrRenderClass(["type-btn", { active: showParentSelect.value }])}" data-v-ade18f59><div class="btn-content" data-v-ade18f59><i class="fas fa-stream" data-v-ade18f59></i><span data-v-ade18f59>子分類</span></div><div class="btn-indicator" data-v-ade18f59></div></button></div></div>`);
          if (categoryFormData.value.parent_id || !isEditingCategory.value && showParentSelect.value) {
            _push2(`<div class="form-group" data-v-ade18f59><label data-v-ade18f59>選擇主分類</label><select${ssrIncludeBooleanAttr(showParentSelect.value) ? " required" : ""} data-v-ade18f59><option value="" data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(categoryFormData.value.parent_id) ? ssrLooseContain(categoryFormData.value.parent_id, "") : ssrLooseEqual(categoryFormData.value.parent_id, "")) ? " selected" : ""}>請選擇主分類</option><!--[-->`);
            ssrRenderList(mainCategories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-ade18f59${ssrIncludeBooleanAttr(Array.isArray(categoryFormData.value.parent_id) ? ssrLooseContain(categoryFormData.value.parent_id, category.id) : ssrLooseEqual(categoryFormData.value.parent_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="form-group" data-v-ade18f59><label data-v-ade18f59>類別名稱</label><input${ssrRenderAttr("value", categoryFormData.value.name)} type="text" required placeholder="請輸入類別名稱" data-v-ade18f59></div>`);
          if (showParentSelect.value) {
            _push2(`<!--[--><div class="form-group" data-v-ade18f59><label data-v-ade18f59>英文名稱 (English Name)</label><input${ssrRenderAttr("value", categoryFormData.value.name_en)} type="text" placeholder="Please enter English name" data-v-ade18f59></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>越南文名稱 (Tên Tiếng Việt)</label><input${ssrRenderAttr("value", categoryFormData.value.name_vi)} type="text" placeholder="Vui lòng nhập tên bằng tiếng Việt" data-v-ade18f59></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>印尼文名稱 (Nama Bahasa Indonesia)</label><input${ssrRenderAttr("value", categoryFormData.value.name_id)} type="text" placeholder="Silakan masukkan nama dalam bahasa Indonesia" data-v-ade18f59></div><div class="form-group" data-v-ade18f59><label data-v-ade18f59>泰文名稱 (ชื่อภาษาไทย)</label><input${ssrRenderAttr("value", categoryFormData.value.name_th)} type="text" placeholder="กรุณาใส่ชื่อเป็นภาษาไทย" data-v-ade18f59></div><!--]-->`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="button-group" data-v-ade18f59><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-ade18f59><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-ade18f59></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : isEditingCategory.value ? "更新" : "新增")}</button>`);
          if (isEditingCategory.value) {
            _push2(`<button type="button" class="btn btn-secondary" data-v-ade18f59> 取消編輯 </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></form><div class="category-lists mt-4" data-v-ade18f59><h3 data-v-ade18f59>類別列表</h3><div class="category-tree" data-v-ade18f59><!--[-->`);
          ssrRenderList(mainCategories.value, (category) => {
            _push2(`<div class="tree-item" data-v-ade18f59><div class="category-item main-category" data-v-ade18f59><div class="category-info" data-v-ade18f59><i class="${ssrRenderClass([expandedCategories.value.includes(category.id) ? "fa-chevron-down" : "fa-chevron-right", "fas"])}" data-v-ade18f59></i><span class="category-name" data-v-ade18f59>${ssrInterpolate(category.name)}</span>`);
            if (getSubCategories(category.id).length) {
              _push2(`<span class="sub-count" data-v-ade18f59> (${ssrInterpolate(getSubCategories(category.id).length)}) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="category-actions" data-v-ade18f59><button class="btn btn-sm btn-primary" data-v-ade18f59><span data-v-ade18f59>編輯</span></button><button class="btn btn-sm btn-danger" data-v-ade18f59><span data-v-ade18f59>刪除</span></button></div></div>`);
            if (getSubCategories(category.id).length && expandedCategories.value.includes(category.id)) {
              _push2(`<div class="sub-categories" data-v-ade18f59><!--[-->`);
              ssrRenderList(getSubCategories(category.id), (subCategory) => {
                _push2(`<div class="category-item sub-category" data-v-ade18f59><div class="category-info" data-v-ade18f59><span class="category-name" data-v-ade18f59>${ssrInterpolate(subCategory.name)}</span></div><div class="category-actions" data-v-ade18f59><button class="btn btn-sm btn-primary" data-v-ade18f59><span data-v-ade18f59>編輯</span></button><button class="btn btn-sm btn-danger" data-v-ade18f59><span data-v-ade18f59>刪除</span></button></div></div>`);
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
const qa = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ade18f59"]]);
export {
  qa as default
};
//# sourceMappingURL=qa-BeJXmSN8.js.map
