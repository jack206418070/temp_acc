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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b7b01de0><nav class="admin-nav" data-v-b7b01de0><div class="nav-content" data-v-b7b01de0><div class="nav-wrapper" data-v-b7b01de0>`);
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
      _push(`<h1 class="page-title" data-v-b7b01de0>公告管理</h1><div class="placeholder" data-v-b7b01de0></div></div></div></nav><div class="admin-container" data-v-b7b01de0><div class="announcements-list" data-v-b7b01de0><div class="action-bar" data-v-b7b01de0><div class="filter-section" data-v-b7b01de0><select class="filter-select" data-v-b7b01de0><option value="" data-v-b7b01de0${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>全部類別</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-b7b01de0${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category) : ssrLooseEqual(selectedCategory.value, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-b7b01de0><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-b7b01de0></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增公告")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-b7b01de0><div class="loading-spinner" data-v-b7b01de0></div><p data-v-b7b01de0>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-b7b01de0><table class="admin-table" data-v-b7b01de0><thead data-v-b7b01de0><tr data-v-b7b01de0><th width="30%" data-v-b7b01de0>標題</th><th width="15%" data-v-b7b01de0>類別</th><th width="15%" data-v-b7b01de0>發布日期</th><th width="15%" data-v-b7b01de0>活動開始日</th><th width="25%" data-v-b7b01de0>操作</th></tr></thead><tbody data-v-b7b01de0><!--[-->`);
        ssrRenderList(filteredAnnouncements.value, (announcement) => {
          _push(`<tr data-v-b7b01de0><td data-v-b7b01de0>${ssrInterpolate(announcement.title)}</td><td data-v-b7b01de0><span class="category-tag" data-v-b7b01de0>${ssrInterpolate(announcement.category)}</span></td><td data-v-b7b01de0>${ssrInterpolate(announcement.publish_date)}</td><td data-v-b7b01de0>${ssrInterpolate(announcement.activity_start_date)}</td><td data-v-b7b01de0><div class="action-buttons" data-v-b7b01de0><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-b7b01de0><i class="${ssrRenderClass([announcement.id === editingId.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-b7b01de0></i> ${ssrInterpolate(announcement.id === editingId.value ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-b7b01de0><i class="${ssrRenderClass([announcement.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-b7b01de0></i> ${ssrInterpolate(announcement.id === deletingId.value ? "刪除中..." : "刪除")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-b7b01de0><div class="modal-content" data-v-b7b01de0><h2 data-v-b7b01de0>${ssrInterpolate(isEditing.value ? "編輯公告" : "新增公告")}</h2><form class="admin-form" data-v-b7b01de0><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>標題</label><input${ssrRenderAttr("value", form.value.title)} type="text" required placeholder="請輸入標題" data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>類別</label><input${ssrRenderAttr("value", form.value.category)} type="text" required placeholder="請輸入類別" data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>發布日期</label><input${ssrRenderAttr("value", form.value.publish_date)} type="date" required data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>活動開始日</label><input${ssrRenderAttr("value", form.value.activity_start_date)} type="date" required data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>連結標題</label><input${ssrRenderAttr("value", form.value.linkTitle)} type="text" placeholder="請輸入連結標題（選填）" data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>連結網址</label><input${ssrRenderAttr("value", form.value.link)} type="url" placeholder="請輸入連結網址（選填）" data-v-b7b01de0></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>內容</label><div class="editor-wrapper" data-v-b7b01de0>`);
          _push2(ssrRenderComponent(_component_client_only, null, {}, _parent));
          _push2(`</div></div><div class="form-group" data-v-b7b01de0><label data-v-b7b01de0>圖片 (限制每張 5MB 以內)</label>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-b7b01de0>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (previewImages.value.length > 0) {
            _push2(`<div class="preview-images" data-v-b7b01de0><!--[-->`);
            ssrRenderList(previewImages.value, (image, index) => {
              _push2(`<div class="preview-image-item" data-v-b7b01de0><img${ssrRenderAttr("src", `data:image/jpeg;base64,${image.content}`)} alt="預覽圖片" data-v-b7b01de0><button type="button" class="delete-image-btn" data-v-b7b01de0><i class="fas fa-times" data-v-b7b01de0></i></button></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-b7b01de0><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-b7b01de0><i class="${ssrRenderClass([isSaving.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-b7b01de0></i> ${ssrInterpolate(isSaving.value ? "儲存中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-b7b01de0> 取消 </button></div></form></div></div>`);
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
const announcements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b7b01de0"]]);
export {
  announcements as default
};
