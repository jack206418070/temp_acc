import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, computed, watch, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
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
      "1": "想申請服務",
      "2": "想成為試辦單位",
      "3": "我是多元陪伴照顧服務工作者",
      "4": "我是私立就業服務機構"
    };
    const categoryOptions = [
      { value: "1", label: "想申請服務" },
      { value: "2", label: "想成為試辦單位" },
      { value: "3", label: "我是多元陪伴照顧服務工作者" },
      { value: "4", label: "我是私立就業服務機構" }
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-af324468><div class="admin-layout" data-v-af324468><nav class="admin-nav" data-v-af324468><div class="nav-content" data-v-af324468><div class="nav-wrapper" data-v-af324468>`);
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
      _push(`<h1 class="page-title" data-v-af324468>問答管理</h1><div class="placeholder" data-v-af324468></div></div></div></nav><div class="admin-container qa-container" data-v-af324468><div class="action-bar" data-v-af324468><button class="btn btn-primary" data-v-af324468><i class="fas fa-plus" data-v-af324468></i> 新增問答 </button></div><div class="search-filter-container" data-v-af324468><div class="search-box" data-v-af324468><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="搜尋問題..." class="search-input" data-v-af324468></div><div class="filter-box" data-v-af324468><select class="category-select" data-v-af324468><option value="" data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>所有類別</option><!--[-->`);
      ssrRenderList(categoryOptions, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, option.value) : ssrLooseEqual(selectedCategory.value, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-af324468><div class="loading-spinner" data-v-af324468></div><p data-v-af324468>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-af324468><table class="admin-table" data-v-af324468><thead data-v-af324468><tr data-v-af324468><th width="5%" data-v-af324468>ID</th><th width="35%" data-v-af324468>問題</th><th width="35%" data-v-af324468>答案</th><th width="15%" data-v-af324468>類別</th><th width="10%" data-v-af324468>操作</th></tr></thead><tbody data-v-af324468><!--[-->`);
        ssrRenderList(unref(paginatedQAList), (qa) => {
          _push(`<tr data-v-af324468><td data-v-af324468>${ssrInterpolate(qa.id)}</td><td class="question-cell" data-v-af324468>${ssrInterpolate(qa.question)}</td><td class="answer-cell" data-v-af324468>${ssrInterpolate(truncateText(qa.answer, 80))}</td><td data-v-af324468><span class="category-tag" data-v-af324468>${ssrInterpolate(getCategoryLabel(qa.category))}</span></td><td data-v-af324468><div class="action-buttons" data-v-af324468><button class="btn btn-secondary" data-v-af324468> 編輯 </button><button class="btn btn-danger" data-v-af324468> 刪除 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      if (!isLoading.value && ((_a = qaList.value.data) == null ? void 0 : _a.length)) {
        _push(`<div class="pagination" data-v-af324468><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="btn btn-secondary" data-v-af324468> 上一頁 </button><span class="page-info" data-v-af324468> 第 ${ssrInterpolate(currentPage.value)} 頁，共 ${ssrInterpolate(unref(totalPages))} 頁 </span><button${ssrIncludeBooleanAttr(currentPage.value === unref(totalPages)) ? " disabled" : ""} class="btn btn-secondary" data-v-af324468> 下一頁 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-af324468><div class="modal-content" data-v-af324468><h2 class="modal-title" data-v-af324468>${ssrInterpolate(isEditing.value ? "編輯問答" : "新增問答")}</h2><form class="admin-form" data-v-af324468><div class="form-group" data-v-af324468><label data-v-af324468>問題</label><input${ssrRenderAttr("value", formData.value.question)} type="text" required placeholder="請輸入問題"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468></div><div class="form-group" data-v-af324468><label data-v-af324468>答案</label><textarea required placeholder="請輸入答案"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} rows="4" data-v-af324468>${ssrInterpolate(formData.value.answer)}</textarea></div><div class="form-group" data-v-af324468><label data-v-af324468>類別</label><select required${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="form-select" data-v-af324468><option value="" disabled data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, "") : ssrLooseEqual(formData.value.category, "")) ? " selected" : ""}>請選擇類別</option><!--[-->`);
          ssrRenderList(categoryOptions, (option) => {
            _push2(`<option${ssrRenderAttr("value", option.value)} data-v-af324468${ssrIncludeBooleanAttr(Array.isArray(formData.value.category) ? ssrLooseContain(formData.value.category, option.value) : ssrLooseEqual(formData.value.category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
          });
          _push2(`<!--]--></select></div><div class="button-group" data-v-af324468><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468>`);
          if (isSaving.value) {
            _push2(`<span class="button-loading" data-v-af324468></span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(` ${ssrInterpolate(isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-af324468> 取消 </button></div></form></div></div>`);
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
export {
  qa_setting as default
};
//# sourceMappingURL=qa_setting-CSn9rM9s.js.map
