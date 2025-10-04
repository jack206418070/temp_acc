import { _ as _export_sfc, a as __nuxt_component_0 } from "../server.mjs";
import { ref, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrLooseContain } from "vue/server-renderer";
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
  __name: "banners",
  __ssrInlineRender: true,
  setup(__props) {
    const banners2 = ref([]);
    const isLoading = ref(true);
    const isButtonLoading = ref(false);
    const showModal = ref(false);
    const isEditing = ref(false);
    const editingId = ref(null);
    const deletingId = ref(null);
    const isSubmitting = ref(false);
    const imagePreview = ref(null);
    ref(null);
    ref(null);
    const formData = ref({
      title: "",
      description: "",
      is_active: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7ec5b883><nav class="admin-nav" data-v-7ec5b883><div class="nav-content" data-v-7ec5b883><div class="nav-wrapper" data-v-7ec5b883>`);
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
      _push(`<h1 class="page-title" data-v-7ec5b883>Banner 管理</h1><div class="placeholder" data-v-7ec5b883></div></div></div></nav><div class="admin-container" data-v-7ec5b883><div class="action-bar" data-v-7ec5b883><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(isButtonLoading)) ? " disabled" : ""} data-v-7ec5b883><i class="${ssrRenderClass([unref(isButtonLoading) ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-7ec5b883></i> ${ssrInterpolate(unref(isButtonLoading) ? "處理中..." : "新增 Banner")}</button></div>`);
      if (unref(isLoading)) {
        _push(`<div class="loading-container" data-v-7ec5b883><div class="loading-spinner" data-v-7ec5b883></div><p data-v-7ec5b883>載入中...</p></div>`);
      } else {
        _push(`<div class="banner-grid" data-v-7ec5b883><!--[-->`);
        ssrRenderList(unref(banners2), (banner) => {
          _push(`<div class="banner-card" draggable="true" data-v-7ec5b883><div class="banner-image" data-v-7ec5b883><img${ssrRenderAttr("src", `data:${banner.imageType};base64,${banner.imageData}`)}${ssrRenderAttr("alt", banner.title)} data-v-7ec5b883></div><div class="banner-info" data-v-7ec5b883><h3 data-v-7ec5b883>${ssrInterpolate(banner.title)}</h3><p data-v-7ec5b883>${ssrInterpolate(banner.description)}</p><div class="banner-status" data-v-7ec5b883><span class="${ssrRenderClass(["status-badge", banner.is_active ? "active" : "inactive"])}" data-v-7ec5b883>${ssrInterpolate(banner.is_active ? "啟用中" : "已停用")}</span><span class="sort-order" data-v-7ec5b883>排序: ${ssrInterpolate(banner.sortOrder)}</span></div></div><div class="banner-actions" data-v-7ec5b883><button class="btn btn-secondary"${ssrIncludeBooleanAttr(unref(isButtonLoading) || banner.isLoading) ? " disabled" : ""} data-v-7ec5b883><i class="${ssrRenderClass([banner.id === unref(editingId) ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-7ec5b883></i> ${ssrInterpolate(banner.id === unref(editingId) ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(unref(isButtonLoading) || banner.isLoading) ? " disabled" : ""} data-v-7ec5b883><i class="${ssrRenderClass([banner.id === unref(deletingId) ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-7ec5b883></i> ${ssrInterpolate(banner.id === unref(deletingId) ? "刪除中..." : "刪除")}</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showModal)) {
          _push2(`<div class="modal-overlay" data-v-7ec5b883><div class="modal-content" data-v-7ec5b883><h2 data-v-7ec5b883>${ssrInterpolate(unref(isEditing) ? "編輯 Banner" : "新增 Banner")}</h2><form class="admin-form" data-v-7ec5b883><div class="form-group" data-v-7ec5b883><label data-v-7ec5b883>標題</label><input${ssrRenderAttr("value", unref(formData).title)} type="text" required placeholder="請輸入標題" data-v-7ec5b883></div><div class="form-group" data-v-7ec5b883><label data-v-7ec5b883>描述</label><textarea placeholder="請輸入描述" rows="3" data-v-7ec5b883>${ssrInterpolate(unref(formData).description)}</textarea></div><div class="form-group" data-v-7ec5b883><label data-v-7ec5b883>Banner 圖片</label><div class="image-upload" data-v-7ec5b883>`);
          if (unref(imagePreview)) {
            _push2(`<div class="image-preview" data-v-7ec5b883><img${ssrRenderAttr("src", unref(imagePreview))} alt="預覽圖" data-v-7ec5b883></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="form-group" data-v-7ec5b883><label class="checkbox-label" data-v-7ec5b883><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).is_active) ? ssrLooseContain(unref(formData).is_active, null) : unref(formData).is_active) ? " checked" : ""} data-v-7ec5b883> 啟用 </label></div><div class="form-actions" data-v-7ec5b883><button type="button" class="btn btn-secondary" data-v-7ec5b883>取消</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} data-v-7ec5b883><i class="${ssrRenderClass([unref(isSubmitting) ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-7ec5b883></i> ${ssrInterpolate(unref(isSubmitting) ? "處理中..." : unref(isEditing) ? "更新" : "新增")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ec5b883"]]);
export {
  banners as default
};
