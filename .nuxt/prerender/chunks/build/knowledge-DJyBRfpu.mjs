import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, computed, withCtx, createTextVNode, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderTeleport, ssrRenderAttr } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
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
        1: "\u61F6\u4EBA\u5305",
        2: "\u5BA3\u5C0E\u8CC7\u6599"
      };
      return categories[category] || "\u672A\u77E5\u985E\u5225";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6ec4452e><nav class="admin-nav" data-v-6ec4452e><div class="nav-content" data-v-6ec4452e><div class="nav-wrapper" data-v-6ec4452e>`);
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
      _push(`<h1 class="page-title" data-v-6ec4452e>\u77E5\u8B58\u5EAB\u7BA1\u7406</h1><div class="placeholder" data-v-6ec4452e></div></div></div></nav><div class="admin-container qa-container" data-v-6ec4452e><div class="action-bar" data-v-6ec4452e><div class="filter-section" data-v-6ec4452e><select class="filter-select" data-v-6ec4452e><option value="" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>\u5168\u90E8\u985E\u5225</option><option value="1" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "1") : ssrLooseEqual(selectedCategory.value, "1")) ? " selected" : ""}>\u61F6\u4EBA\u5305</option><option value="2" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "2") : ssrLooseEqual(selectedCategory.value, "2")) ? " selected" : ""}>\u5BA3\u5C0E\u8CC7\u6599</option></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u77E5\u8B58")}</button></div>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-6ec4452e><div class="loading-spinner" data-v-6ec4452e></div><p data-v-6ec4452e>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-6ec4452e><table class="admin-table" data-v-6ec4452e><thead data-v-6ec4452e><tr data-v-6ec4452e><th width="5%" data-v-6ec4452e>ID</th><th width="15%" data-v-6ec4452e>\u985E\u5225</th><th width="50%" data-v-6ec4452e>\u6A19\u984C</th><th width="30%" data-v-6ec4452e>\u64CD\u4F5C</th></tr></thead><tbody data-v-6ec4452e><!--[-->`);
        ssrRenderList(filteredKnowledgeList.value, (item) => {
          var _a;
          _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.kid) === item.kid })}" data-v-6ec4452e><td data-v-6ec4452e>${ssrInterpolate(item.kid)}</td><td data-v-6ec4452e><span class="category-tag" data-v-6ec4452e>${ssrInterpolate(getCategoryName(item.know_category))}</span></td><td data-v-6ec4452e><div class="flex items-center" data-v-6ec4452e><div class="flex-shrink-0 h-10 w-10 cursor-move mr-4" data-v-6ec4452e><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-6ec4452e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" data-v-6ec4452e></path></svg></div><div class="text-sm font-medium text-gray-900" data-v-6ec4452e>${ssrInterpolate(item.title)}</div></div></td><td data-v-6ec4452e><div class="action-buttons" data-v-6ec4452e><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([item.isLoading ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(item.isLoading ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-6ec4452e></i> \u522A\u9664 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-6ec4452e><div class="modal-content" data-v-6ec4452e><h2 data-v-6ec4452e>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u77E5\u8B58" : "\u65B0\u589E\u77E5\u8B58")}</h2><form class="admin-form" data-v-6ec4452e><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>\u985E\u5225</label><select required data-v-6ec4452e><option value="1" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "1") : ssrLooseEqual(formData.value.know_category, "1")) ? " selected" : ""}>\u61F6\u4EBA\u5305</option><option value="2" data-v-6ec4452e${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "2") : ssrLooseEqual(formData.value.know_category, "2")) ? " selected" : ""}>\u5BA3\u5C0E\u8CC7\u6599</option></select></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>\u6A19\u984C</label><input${ssrRenderAttr("value", formData.value.title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-6ec4452e></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>\u5716\u7247\u9023\u7D50 (\u9078\u586B)</label><input${ssrRenderAttr("value", formData.value.image_url)} type="url" placeholder="\u8ACB\u8F38\u5165\u5716\u7247\u9023\u7D50" data-v-6ec4452e></div><div class="form-group" data-v-6ec4452e><label data-v-6ec4452e>\u5716\u7247 (\u9650\u5236 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-6ec4452e>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-6ec4452e>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (imagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", imagePreview.value)} class="image-preview" alt="\u9810\u89BD\u5716" data-v-6ec4452e>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-6ec4452e><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-6ec4452e></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-6ec4452e> \u53D6\u6D88 </button></div></form></div></div>`);
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

export { knowledge as default };
//# sourceMappingURL=knowledge-DJyBRfpu.mjs.map
