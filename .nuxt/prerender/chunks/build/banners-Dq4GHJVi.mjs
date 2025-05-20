import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, withCtx, createTextVNode, unref, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrRenderTeleport, ssrLooseContain } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
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
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1f8df470><nav class="admin-nav" data-v-1f8df470><div class="nav-content" data-v-1f8df470><div class="nav-wrapper" data-v-1f8df470>`);
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
      _push(`<h1 class="page-title" data-v-1f8df470>Banner \u7BA1\u7406</h1><div class="placeholder" data-v-1f8df470></div></div></div></nav><div class="admin-container" data-v-1f8df470><div class="action-bar" data-v-1f8df470><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(isButtonLoading)) ? " disabled" : ""} data-v-1f8df470><i class="${ssrRenderClass([unref(isButtonLoading) ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-1f8df470></i> ${ssrInterpolate(unref(isButtonLoading) ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E Banner")}</button></div>`);
      if (unref(isLoading)) {
        _push(`<div class="loading-container" data-v-1f8df470><div class="loading-spinner" data-v-1f8df470></div><p data-v-1f8df470>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="banner-grid" data-v-1f8df470><!--[-->`);
        ssrRenderList(unref(banners2), (banner) => {
          _push(`<div class="banner-card" draggable="true" data-v-1f8df470><div class="banner-image" data-v-1f8df470><img${ssrRenderAttr("src", `data:${banner.imageType};base64,${banner.imageData}`)}${ssrRenderAttr("alt", banner.title)} data-v-1f8df470></div><div class="banner-info" data-v-1f8df470><h3 data-v-1f8df470>${ssrInterpolate(banner.title)}</h3><p data-v-1f8df470>${ssrInterpolate(banner.description)}</p><div class="banner-status" data-v-1f8df470><span class="${ssrRenderClass(["status-badge", banner.is_active ? "active" : "inactive"])}" data-v-1f8df470>${ssrInterpolate(banner.is_active ? "\u555F\u7528\u4E2D" : "\u5DF2\u505C\u7528")}</span><span class="sort-order" data-v-1f8df470>\u6392\u5E8F: ${ssrInterpolate(banner.sortOrder)}</span></div></div><div class="banner-actions" data-v-1f8df470><button class="btn btn-secondary"${ssrIncludeBooleanAttr(unref(isButtonLoading) || banner.isLoading) ? " disabled" : ""} data-v-1f8df470><i class="${ssrRenderClass([banner.id === unref(editingId) ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-1f8df470></i> ${ssrInterpolate(banner.id === unref(editingId) ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(unref(isButtonLoading) || banner.isLoading) ? " disabled" : ""} data-v-1f8df470><i class="${ssrRenderClass([banner.id === unref(deletingId) ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-1f8df470></i> ${ssrInterpolate(banner.id === unref(deletingId) ? "\u522A\u9664\u4E2D..." : "\u522A\u9664")}</button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showModal)) {
          _push2(`<div class="modal-overlay" data-v-1f8df470><div class="modal-content" data-v-1f8df470><h2 data-v-1f8df470>${ssrInterpolate(unref(isEditing) ? "\u7DE8\u8F2F Banner" : "\u65B0\u589E Banner")}</h2><form class="admin-form" data-v-1f8df470><div class="form-group" data-v-1f8df470><label data-v-1f8df470>\u6A19\u984C</label><input${ssrRenderAttr("value", unref(formData).title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-1f8df470></div><div class="form-group" data-v-1f8df470><label data-v-1f8df470>\u63CF\u8FF0</label><textarea placeholder="\u8ACB\u8F38\u5165\u63CF\u8FF0" rows="3" data-v-1f8df470>${ssrInterpolate(unref(formData).description)}</textarea></div><div class="form-group" data-v-1f8df470><label data-v-1f8df470>Banner \u5716\u7247</label><div class="image-upload" data-v-1f8df470><input type="file" accept="image/*"${ssrIncludeBooleanAttr(!unref(isEditing)) ? " required" : ""} data-v-1f8df470>`);
          if (unref(imagePreview)) {
            _push2(`<div class="image-preview" data-v-1f8df470><img${ssrRenderAttr("src", unref(imagePreview))} alt="\u9810\u89BD\u5716" data-v-1f8df470></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="form-group" data-v-1f8df470><label class="checkbox-label" data-v-1f8df470><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).is_active) ? ssrLooseContain(unref(formData).is_active, null) : unref(formData).is_active) ? " checked" : ""} data-v-1f8df470> \u555F\u7528 </label></div><div class="form-actions" data-v-1f8df470><button type="button" class="btn btn-secondary" data-v-1f8df470>\u53D6\u6D88</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} data-v-1f8df470><i class="${ssrRenderClass([unref(isSubmitting) ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-1f8df470></i> ${ssrInterpolate(unref(isSubmitting) ? "\u8655\u7406\u4E2D..." : unref(isEditing) ? "\u66F4\u65B0" : "\u65B0\u589E")}</button></div></form></div></div>`);
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
const banners = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f8df470"]]);

export { banners as default };
//# sourceMappingURL=banners-Dq4GHJVi.mjs.map
