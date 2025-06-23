import { _ as _export_sfc, a as __nuxt_component_0, g as __nuxt_component_1 } from "../server.mjs";
import { ref, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import "@tiptap/starter-kit";
import "@tiptap/extension-placeholder";
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
  __name: "announcements",
  __ssrInlineRender: true,
  setup(__props) {
    const announcements2 = ref([]);
    const showModal = ref(false);
    ref("新增公告");
    const isSaving = ref(false);
    ref([]);
    ref([]);
    const selectedCategory = ref("");
    const categories = ref([]);
    const isLoading = ref(false);
    const isButtonLoading = ref(false);
    const editingId = ref(null);
    const deletingId = ref(null);
    const imageError = ref("");
    const isEditing = ref(false);
    const previewImages = ref([]);
    ref([]);
    const form = ref({
      id: null,
      title: "",
      category: "",
      publish_date: "",
      activity_start_date: "",
      content: "",
      link: "",
      linkTitle: ""
    });
    ref(null);
    ref(null);
    const filteredAnnouncements = computed(() => {
      if (!selectedCategory.value) {
        return announcements2.value || [];
      }
      return (announcements2.value || []).filter(
        (item) => item.category === selectedCategory.value
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4756646b><nav class="admin-nav" data-v-4756646b><div class="nav-content" data-v-4756646b><div class="nav-wrapper" data-v-4756646b>`);
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
      _push(`<h1 class="page-title" data-v-4756646b>公告管理</h1><div class="placeholder" data-v-4756646b></div></div></div></nav><div class="admin-container" data-v-4756646b><div class="announcements-list" data-v-4756646b><div class="action-bar" data-v-4756646b><div class="filter-section" data-v-4756646b><select class="filter-select" data-v-4756646b><option value="" data-v-4756646b${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>全部類別</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-4756646b${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category) : ssrLooseEqual(selectedCategory.value, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增公告")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-4756646b><div class="loading-spinner" data-v-4756646b></div><p data-v-4756646b>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-4756646b><table class="admin-table" data-v-4756646b><thead data-v-4756646b><tr data-v-4756646b><th width="30%" data-v-4756646b>標題</th><th width="15%" data-v-4756646b>類別</th><th width="15%" data-v-4756646b>發布日期</th><th width="15%" data-v-4756646b>活動開始日</th><th width="25%" data-v-4756646b>操作</th></tr></thead><tbody data-v-4756646b><!--[-->`);
        ssrRenderList(filteredAnnouncements.value, (announcement) => {
          _push(`<tr data-v-4756646b><td data-v-4756646b>${ssrInterpolate(announcement.title)}</td><td data-v-4756646b><span class="category-tag" data-v-4756646b>${ssrInterpolate(announcement.category)}</span></td><td data-v-4756646b>${ssrInterpolate(announcement.publish_date)}</td><td data-v-4756646b>${ssrInterpolate(announcement.activity_start_date)}</td><td data-v-4756646b><div class="action-buttons" data-v-4756646b><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([announcement.id === editingId.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(announcement.id === editingId.value ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([announcement.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(announcement.id === deletingId.value ? "刪除中..." : "刪除")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-4756646b><div class="modal-content" data-v-4756646b><h2 data-v-4756646b>${ssrInterpolate(isEditing.value ? "編輯公告" : "新增公告")}</h2><form class="admin-form" data-v-4756646b><div class="form-group" data-v-4756646b><label data-v-4756646b>標題</label><input${ssrRenderAttr("value", form.value.title)} type="text" required placeholder="請輸入標題" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>類別</label><input${ssrRenderAttr("value", form.value.category)} type="text" required placeholder="請輸入類別" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>發布日期</label><input${ssrRenderAttr("value", form.value.publish_date)} type="date" required data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>活動開始日</label><input${ssrRenderAttr("value", form.value.activity_start_date)} type="date" required data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>連結標題</label><input${ssrRenderAttr("value", form.value.linkTitle)} type="text" placeholder="請輸入連結標題（選填）" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>連結網址</label><input${ssrRenderAttr("value", form.value.link)} type="url" placeholder="請輸入連結網址（選填）" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>內容</label><div class="editor-wrapper" data-v-4756646b>`);
          _push2(ssrRenderComponent(_component_client_only, null, {}, _parent));
          _push2(`</div></div><div class="form-group" data-v-4756646b><label data-v-4756646b>圖片 (限制每張 5MB 以內)</label><input type="file" accept="image/jpeg,image/png,image/gif" multiple data-v-4756646b>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-4756646b>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (previewImages.value.length > 0) {
            _push2(`<div class="preview-images" data-v-4756646b><!--[-->`);
            ssrRenderList(previewImages.value, (image, index) => {
              _push2(`<div class="preview-image-item" data-v-4756646b><img${ssrRenderAttr("src", `data:image/jpeg;base64,${image.content}`)} alt="預覽圖片" data-v-4756646b><button type="button" class="delete-image-btn" data-v-4756646b><i class="fas fa-times" data-v-4756646b></i></button></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-4756646b><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([isSaving.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(isSaving.value ? "儲存中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-4756646b> 取消 </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/announcements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const announcements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4756646b"]]);
export {
  announcements as default
};
