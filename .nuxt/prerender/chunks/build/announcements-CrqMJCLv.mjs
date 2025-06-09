import { _ as _export_sfc, a as __nuxt_component_0$2, d as __nuxt_component_1$2 } from './server.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = {
  __name: "announcements",
  __ssrInlineRender: true,
  setup(__props) {
    const announcements2 = ref([]);
    const showModal = ref(false);
    ref("\u65B0\u589E\u516C\u544A");
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
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_client_only = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4756646b><nav class="admin-nav" data-v-4756646b><div class="nav-content" data-v-4756646b><div class="nav-wrapper" data-v-4756646b>`);
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
      _push(`<h1 class="page-title" data-v-4756646b>\u516C\u544A\u7BA1\u7406</h1><div class="placeholder" data-v-4756646b></div></div></div></nav><div class="admin-container" data-v-4756646b><div class="announcements-list" data-v-4756646b><div class="action-bar" data-v-4756646b><div class="filter-section" data-v-4756646b><select class="filter-select" data-v-4756646b><option value="" data-v-4756646b${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u5168\u90E8\u985E\u5225</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-4756646b${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category) : ssrLooseEqual(selectedCategory.value, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u516C\u544A")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-4756646b><div class="loading-spinner" data-v-4756646b></div><p data-v-4756646b>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-4756646b><table class="admin-table" data-v-4756646b><thead data-v-4756646b><tr data-v-4756646b><th width="30%" data-v-4756646b>\u6A19\u984C</th><th width="15%" data-v-4756646b>\u985E\u5225</th><th width="15%" data-v-4756646b>\u767C\u5E03\u65E5\u671F</th><th width="15%" data-v-4756646b>\u6D3B\u52D5\u958B\u59CB\u65E5</th><th width="25%" data-v-4756646b>\u64CD\u4F5C</th></tr></thead><tbody data-v-4756646b><!--[-->`);
        ssrRenderList(filteredAnnouncements.value, (announcement) => {
          _push(`<tr data-v-4756646b><td data-v-4756646b>${ssrInterpolate(announcement.title)}</td><td data-v-4756646b><span class="category-tag" data-v-4756646b>${ssrInterpolate(announcement.category)}</span></td><td data-v-4756646b>${ssrInterpolate(announcement.publish_date)}</td><td data-v-4756646b>${ssrInterpolate(announcement.activity_start_date)}</td><td data-v-4756646b><div class="action-buttons" data-v-4756646b><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([announcement.id === editingId.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(announcement.id === editingId.value ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([announcement.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(announcement.id === deletingId.value ? "\u522A\u9664\u4E2D..." : "\u522A\u9664")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-4756646b><div class="modal-content" data-v-4756646b><h2 data-v-4756646b>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u516C\u544A" : "\u65B0\u589E\u516C\u544A")}</h2><form class="admin-form" data-v-4756646b><div class="form-group" data-v-4756646b><label data-v-4756646b>\u6A19\u984C</label><input${ssrRenderAttr("value", form.value.title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u985E\u5225</label><input${ssrRenderAttr("value", form.value.category)} type="text" required placeholder="\u8ACB\u8F38\u5165\u985E\u5225" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u767C\u5E03\u65E5\u671F</label><input${ssrRenderAttr("value", form.value.publish_date)} type="date" required data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u6D3B\u52D5\u958B\u59CB\u65E5</label><input${ssrRenderAttr("value", form.value.activity_start_date)} type="date" required data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u9023\u7D50\u6A19\u984C</label><input${ssrRenderAttr("value", form.value.linkTitle)} type="text" placeholder="\u8ACB\u8F38\u5165\u9023\u7D50\u6A19\u984C\uFF08\u9078\u586B\uFF09" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u9023\u7D50\u7DB2\u5740</label><input${ssrRenderAttr("value", form.value.link)} type="url" placeholder="\u8ACB\u8F38\u5165\u9023\u7D50\u7DB2\u5740\uFF08\u9078\u586B\uFF09" data-v-4756646b></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u5167\u5BB9</label><div class="editor-wrapper" data-v-4756646b>`);
          _push2(ssrRenderComponent(_component_client_only, null, {}, _parent));
          _push2(`</div></div><div class="form-group" data-v-4756646b><label data-v-4756646b>\u5716\u7247 (\u9650\u5236\u6BCF\u5F35 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif" multiple data-v-4756646b>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-4756646b>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (previewImages.value.length > 0) {
            _push2(`<div class="preview-images" data-v-4756646b><!--[-->`);
            ssrRenderList(previewImages.value, (image, index) => {
              _push2(`<div class="preview-image-item" data-v-4756646b><img${ssrRenderAttr("src", `data:image/jpeg;base64,${image.content}`)} alt="\u9810\u89BD\u5716\u7247" data-v-4756646b><button type="button" class="delete-image-btn" data-v-4756646b><i class="fas fa-times" data-v-4756646b></i></button></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-4756646b><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-4756646b><i class="${ssrRenderClass([isSaving.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-4756646b></i> ${ssrInterpolate(isSaving.value ? "\u5132\u5B58\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-4756646b> \u53D6\u6D88 </button></div></form></div></div>`);
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

export { announcements as default };
//# sourceMappingURL=announcements-CrqMJCLv.mjs.map
