import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderTeleport, ssrRenderAttr } from "vue/server-renderer";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
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
        1: "懶人包",
        2: "宣導資料"
      };
      return categories[category] || "未知類別";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6ec4452e><nav class="admin-nav" data-v-6ec4452e><div class="nav-content" data-v-6ec4452e><div class="nav-wrapper" data-v-6ec4452e>`);
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
      _push(`<h1 class="page-title" data-v-6ec4452e>知識庫管理</h1><div class="placeholder" data-v-6ec4452e></div></div></div></nav><div class="admin-container qa-container" data-v-6ec4452e><div class="action-bar" data-v-6ec4452e><div class="filter-section" data-v-6ec4452e><select class="filter-select" data-v-6ec4452e><option value="" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>全部類別</option><option value="1" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "1") : ssrLooseEqual(selectedCategory.value, "1")) ? " selected" : ""}>懶人包</option><option value="2" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "2") : ssrLooseEqual(selectedCategory.value, "2")) ? " selected" : ""}>宣導資料</option></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增知識")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-6ec4452e><div class="loading-spinner" data-v-6ec4452e></div><p data-v-6ec4452e>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-6ec4452e><table class="admin-table" data-v-6ec4452e><thead data-v-6ec4452e><tr data-v-6ec4452e><th width="5%" data-v-6ec4452e>ID</th><th width="15%" data-v-6ec4452e>類別</th><th width="50%" data-v-6ec4452e>標題</th><th width="30%" data-v-6ec4452e>操作</th></tr></thead><tbody data-v-6ec4452e><!--[-->`);
        ssrRenderList(filteredKnowledgeList.value, (item) => {
          var _a;
          _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.kid) === item.kid })}" data-v-6ec4452e><td data-v-6ec4452e>${ssrInterpolate(item.kid)}</td><td data-v-6ec4452e><span class="category-tag" data-v-6ec4452e>${ssrInterpolate(getCategoryName(item.know_category))}</span></td><td data-v-6ec4452e><div class="flex items-center" data-v-6ec4452e><div class="flex-shrink-0 h-10 w-10 cursor-move mr-4" data-v-6ec4452e><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6ec4452e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" data-v-6ec4452e></path></svg></div><div class="text-sm font-medium text-gray-900" data-v-6ec4452e>${ssrInterpolate(item.title)}</div></div></td><td data-v-6ec4452e><div class="action-buttons" data-v-6ec4452e><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([item.isLoading ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(item.isLoading ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-6ec4452e></i> 刪除 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-6ec4452e><div class="modal-content" data-v-6ec4452e><h2 data-v-6ec4452e>${ssrInterpolate(isEditing.value ? "編輯知識" : "新增知識")}</h2><form class="admin-form" data-v-6ec4452e><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>類別</label><select required data-v-6ec4452e><option value="1" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "1") : ssrLooseEqual(formData.value.know_category, "1")) ? " selected" : ""}>懶人包</option><option value="2" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "2") : ssrLooseEqual(formData.value.know_category, "2")) ? " selected" : ""}>宣導資料</option></select></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>標題</label><input${ssrRenderAttr("value", formData.value.title)} type="text" required placeholder="請輸入標題" data-v-6ec4452e></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>圖片連結 (選填)</label><input${ssrRenderAttr("value", formData.value.image_url)} type="url" placeholder="請輸入圖片連結" data-v-6ec4452e></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>圖片 (限制 5MB 以內)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-6ec4452e>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-6ec4452e>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (imagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", imagePreview.value)} class="image-preview" alt="預覽圖" data-v-6ec4452e>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-6ec4452e><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e> 取消 </button></div></form></div></div>`);
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
const knowledge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6ec4452e"]]);
export {
  knowledge as default
};
