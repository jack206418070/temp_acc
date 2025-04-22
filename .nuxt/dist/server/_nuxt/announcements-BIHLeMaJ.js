import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_1 } from "./client-only-Db1Q_2tj.js";
import { ref, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import "@tiptap/starter-kit";
import "@tiptap/extension-placeholder";
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-819b8de5><nav class="admin-nav" data-v-819b8de5><div class="nav-content" data-v-819b8de5><div class="nav-wrapper" data-v-819b8de5>`);
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
      _push(`<h1 class="page-title" data-v-819b8de5>公告管理</h1><div class="placeholder" data-v-819b8de5></div></div></div></nav><div class="admin-container" data-v-819b8de5><div class="announcements-list" data-v-819b8de5><div class="action-bar" data-v-819b8de5><div class="filter-section" data-v-819b8de5><select class="filter-select" data-v-819b8de5><option value="" data-v-819b8de5${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>全部類別</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-819b8de5${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category) : ssrLooseEqual(selectedCategory.value, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-819b8de5><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-819b8de5></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增公告")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-819b8de5><div class="loading-spinner" data-v-819b8de5></div><p data-v-819b8de5>載入中...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-819b8de5><table class="admin-table" data-v-819b8de5><thead data-v-819b8de5><tr data-v-819b8de5><th width="30%" data-v-819b8de5>標題</th><th width="15%" data-v-819b8de5>類別</th><th width="15%" data-v-819b8de5>發布日期</th><th width="15%" data-v-819b8de5>活動開始日</th><th width="25%" data-v-819b8de5>操作</th></tr></thead><tbody data-v-819b8de5><!--[-->`);
        ssrRenderList(filteredAnnouncements.value, (announcement) => {
          _push(`<tr data-v-819b8de5><td data-v-819b8de5>${ssrInterpolate(announcement.title)}</td><td data-v-819b8de5><span class="category-tag" data-v-819b8de5>${ssrInterpolate(announcement.category)}</span></td><td data-v-819b8de5>${ssrInterpolate(announcement.publish_date)}</td><td data-v-819b8de5>${ssrInterpolate(announcement.activity_start_date)}</td><td data-v-819b8de5><div class="action-buttons" data-v-819b8de5><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-819b8de5><i class="${ssrRenderClass([announcement.id === editingId.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-819b8de5></i> ${ssrInterpolate(announcement.id === editingId.value ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-819b8de5><i class="${ssrRenderClass([announcement.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-819b8de5></i> ${ssrInterpolate(announcement.id === deletingId.value ? "刪除中..." : "刪除")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-819b8de5><div class="modal-content" data-v-819b8de5><h2 data-v-819b8de5>${ssrInterpolate(isEditing.value ? "編輯公告" : "新增公告")}</h2><form class="admin-form" data-v-819b8de5><div class="form-group" data-v-819b8de5><label data-v-819b8de5>標題</label><input${ssrRenderAttr("value", form.value.title)} type="text" required placeholder="請輸入標題" data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>類別</label><input${ssrRenderAttr("value", form.value.category)} type="text" required placeholder="請輸入類別" data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>發布日期</label><input${ssrRenderAttr("value", form.value.publish_date)} type="date" required data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>活動開始日</label><input${ssrRenderAttr("value", form.value.activity_start_date)} type="date" required data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>連結標題</label><input${ssrRenderAttr("value", form.value.linkTitle)} type="text" placeholder="請輸入連結標題（選填）" data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>連結網址</label><input${ssrRenderAttr("value", form.value.link)} type="url" placeholder="請輸入連結網址（選填）" data-v-819b8de5></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>內容</label><div class="editor-wrapper" data-v-819b8de5>`);
          _push2(ssrRenderComponent(_component_client_only, null, {}, _parent));
          _push2(`</div></div><div class="form-group" data-v-819b8de5><label data-v-819b8de5>圖片 (限制每張 5MB 以內)</label><input type="file" accept="image/jpeg,image/png,image/gif" multiple data-v-819b8de5>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-819b8de5>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (previewImages.value.length > 0) {
            _push2(`<div class="preview-images" data-v-819b8de5><!--[-->`);
            ssrRenderList(previewImages.value, (image, index) => {
              _push2(`<div class="preview-image-item" data-v-819b8de5><img${ssrRenderAttr("src", `data:image/jpeg;base64,${image.content}`)} alt="預覽圖片" data-v-819b8de5><button type="button" class="delete-image-btn" data-v-819b8de5><i class="fas fa-times" data-v-819b8de5></i></button></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-819b8de5><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-819b8de5><i class="${ssrRenderClass([isSaving.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-819b8de5></i> ${ssrInterpolate(isSaving.value ? "儲存中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-819b8de5> 取消 </button></div></form></div></div>`);
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
const announcements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-819b8de5"]]);
export {
  announcements as default
};
//# sourceMappingURL=announcements-BIHLeMaJ.js.map
