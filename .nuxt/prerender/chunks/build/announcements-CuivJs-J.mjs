import { _ as _export_sfc, a as __nuxt_component_0$2, d as __nuxt_component_1$2 } from './server.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/server.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/devalue/index.js';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nuxt/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue3-toastify/dist/index.mjs';

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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-46840475><nav class="admin-nav" data-v-46840475><div class="nav-content" data-v-46840475><div class="nav-wrapper" data-v-46840475>`);
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
      _push(`<h1 class="page-title" data-v-46840475>\u516C\u544A\u7BA1\u7406</h1><div class="placeholder" data-v-46840475></div></div></div></nav><div class="admin-container" data-v-46840475><div class="announcements-list" data-v-46840475><div class="action-bar" data-v-46840475><div class="filter-section" data-v-46840475><select class="filter-select" data-v-46840475><option value="" data-v-46840475${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u5168\u90E8\u985E\u5225</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-46840475${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, category) : ssrLooseEqual(selectedCategory.value, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-46840475><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-46840475></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u516C\u544A")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-46840475><div class="loading-spinner" data-v-46840475></div><p data-v-46840475>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-46840475><table class="admin-table" data-v-46840475><thead data-v-46840475><tr data-v-46840475><th width="30%" data-v-46840475>\u6A19\u984C</th><th width="15%" data-v-46840475>\u985E\u5225</th><th width="15%" data-v-46840475>\u767C\u5E03\u65E5\u671F</th><th width="15%" data-v-46840475>\u6D3B\u52D5\u958B\u59CB\u65E5</th><th width="25%" data-v-46840475>\u64CD\u4F5C</th></tr></thead><tbody data-v-46840475><!--[-->`);
        ssrRenderList(filteredAnnouncements.value, (announcement) => {
          _push(`<tr data-v-46840475><td data-v-46840475>${ssrInterpolate(announcement.title)}</td><td data-v-46840475><span class="category-tag" data-v-46840475>${ssrInterpolate(announcement.category)}</span></td><td data-v-46840475>${ssrInterpolate(announcement.publish_date)}</td><td data-v-46840475>${ssrInterpolate(announcement.activity_start_date)}</td><td data-v-46840475><div class="action-buttons" data-v-46840475><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-46840475><i class="${ssrRenderClass([announcement.id === editingId.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-46840475></i> ${ssrInterpolate(announcement.id === editingId.value ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || announcement.isLoading) ? " disabled" : ""} data-v-46840475><i class="${ssrRenderClass([announcement.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-46840475></i> ${ssrInterpolate(announcement.id === deletingId.value ? "\u522A\u9664\u4E2D..." : "\u522A\u9664")}</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-46840475><div class="modal-content" data-v-46840475><h2 data-v-46840475>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u516C\u544A" : "\u65B0\u589E\u516C\u544A")}</h2><form class="admin-form" data-v-46840475><div class="form-group" data-v-46840475><label data-v-46840475>\u6A19\u984C</label><input${ssrRenderAttr("value", form.value.title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u985E\u5225</label><input${ssrRenderAttr("value", form.value.category)} type="text" required placeholder="\u8ACB\u8F38\u5165\u985E\u5225" data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u767C\u5E03\u65E5\u671F</label><input${ssrRenderAttr("value", form.value.publish_date)} type="date" required data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u6D3B\u52D5\u958B\u59CB\u65E5</label><input${ssrRenderAttr("value", form.value.activity_start_date)} type="date" required data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u9023\u7D50\u6A19\u984C</label><input${ssrRenderAttr("value", form.value.linkTitle)} type="text" placeholder="\u8ACB\u8F38\u5165\u9023\u7D50\u6A19\u984C\uFF08\u9078\u586B\uFF09" data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u9023\u7D50\u7DB2\u5740</label><input${ssrRenderAttr("value", form.value.link)} type="url" placeholder="\u8ACB\u8F38\u5165\u9023\u7D50\u7DB2\u5740\uFF08\u9078\u586B\uFF09" data-v-46840475></div><div class="form-group" data-v-46840475><label data-v-46840475>\u5167\u5BB9</label><div class="editor-wrapper" data-v-46840475>`);
          _push2(ssrRenderComponent(_component_client_only, null, {}, _parent));
          _push2(`</div></div><div class="form-group" data-v-46840475><label data-v-46840475>\u6A94\u6848\u4E0A\u50B3 (\u5716\u7247\u6216PDF\uFF0C\u9650\u5236\u6BCF\u500B 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif,application/pdf" multiple data-v-46840475>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-46840475>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (previewImages.value.length > 0) {
            _push2(`<div class="preview-files" data-v-46840475><!--[-->`);
            ssrRenderList(previewImages.value, (file, index) => {
              _push2(`<div class="preview-file-item" data-v-46840475>`);
              if (file.type === "image") {
                _push2(`<div class="image-preview" data-v-46840475><img${ssrRenderAttr("src", `data:image/jpeg;base64,${file.content}`)} alt="\u9810\u89BD\u5716\u7247" data-v-46840475><span class="file-info" data-v-46840475>\u5716\u7247</span></div>`);
              } else if (file.type === "pdf") {
                _push2(`<div class="pdf-preview" data-v-46840475><i class="fas fa-file-pdf pdf-icon" data-v-46840475></i><div class="file-details" data-v-46840475><span class="filename" data-v-46840475>${ssrInterpolate(file.filename)}</span><span class="file-type" data-v-46840475>PDF \u6A94\u6848</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button type="button" class="delete-file-btn" data-v-46840475><i class="fas fa-times" data-v-46840475></i></button></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-46840475><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-46840475><i class="${ssrRenderClass([isSaving.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-46840475></i> ${ssrInterpolate(isSaving.value ? "\u5132\u5B58\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} data-v-46840475> \u53D6\u6D88 </button></div></form></div></div>`);
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
const announcements = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-46840475"]]);

export { announcements as default };
//# sourceMappingURL=announcements-CuivJs-J.mjs.map
