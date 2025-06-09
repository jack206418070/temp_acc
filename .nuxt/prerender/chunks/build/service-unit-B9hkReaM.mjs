import { _ as _export_sfc, a as __nuxt_component_0$2, d as __nuxt_component_1$2 } from './server.mjs';
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
  __name: "service-unit",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    const serviceUnits = ref({ data: [] });
    const showModal = ref(false);
    const isEditing = ref(false);
    const formData = ref({
      id: null,
      name: "",
      category: "",
      region: "",
      serviceArea: "",
      address: "",
      phone: "",
      email: "",
      description: "",
      website: ""
    });
    const unitImagePreview = ref("");
    const priceImagePreview = ref("");
    const unitImageError = ref("");
    const priceImageError = ref("");
    ref(null);
    ref(null);
    const isButtonLoading = ref(false);
    const selectedRegion = ref("");
    const isLoading = ref(false);
    const isLoadingEdit = ref(false);
    const editingId = ref(null);
    const deletingId = ref(null);
    const isDragging = ref(false);
    const draggedItem = ref(null);
    const activeTab = ref("service-unit");
    ref("");
    const isReminderLoading = ref(false);
    const filteredServiceUnits = computed(() => {
      if (!selectedRegion.value) {
        return serviceUnits.value.data || [];
      }
      return (serviceUnits.value.data || []).filter(
        (item) => item.region === selectedRegion.value
      );
    });
    function getRegionName(region) {
      const regionMap = {
        "north": "\u5317\u90E8",
        "central": "\u4E2D\u90E8",
        "south": "\u5357\u90E8",
        "east": "\u6771\u90E8"
      };
      return regionMap[region] || region;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_client_only = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8f8a9e57><nav class="admin-nav" data-v-8f8a9e57><div class="nav-content" data-v-8f8a9e57><div class="nav-wrapper" data-v-8f8a9e57>`);
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
      _push(`<h1 class="page-title" data-v-8f8a9e57>\u670D\u52D9\u55AE\u4F4D\u7BA1\u7406</h1><div class="placeholder" data-v-8f8a9e57></div></div></div></nav><div class="admin-container" data-v-8f8a9e57><div class="tab-container" data-v-8f8a9e57><button class="${ssrRenderClass([{ active: activeTab.value === "service-unit" }, "tab-button"])}" data-v-8f8a9e57> \u670D\u52D9\u55AE\u4F4D\u8A2D\u5B9A </button><button class="${ssrRenderClass([{ active: activeTab.value === "user-reminder" }, "tab-button"])}" data-v-8f8a9e57> \u4F7F\u7528\u8005\u53EE\u5680\u8A2D\u5B9A </button></div>`);
      if (activeTab.value === "service-unit") {
        _push(`<div class="tab-content" data-v-8f8a9e57><div class="action-bar" data-v-8f8a9e57><div class="filter-section" data-v-8f8a9e57><select class="filter-select" data-v-8f8a9e57><option value="" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "") : ssrLooseEqual(selectedRegion.value, "")) ? " selected" : ""}>\u5168\u90E8\u5730\u5340</option><option value="north" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "north") : ssrLooseEqual(selectedRegion.value, "north")) ? " selected" : ""}>\u5317\u90E8</option><option value="central" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "central") : ssrLooseEqual(selectedRegion.value, "central")) ? " selected" : ""}>\u4E2D\u90E8</option><option value="south" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "south") : ssrLooseEqual(selectedRegion.value, "south")) ? " selected" : ""}>\u5357\u90E8</option><option value="east" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "east") : ssrLooseEqual(selectedRegion.value, "east")) ? " selected" : ""}>\u6771\u90E8</option></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-8f8a9e57><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-8f8a9e57></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u670D\u52D9\u55AE\u4F4D")}</button></div>`);
        if (isLoading.value) {
          _push(`<div class="loading-container" data-v-8f8a9e57><div class="loading-spinner" data-v-8f8a9e57></div><p data-v-8f8a9e57>\u8F09\u5165\u4E2D...</p></div>`);
        } else {
          _push(`<div class="table-responsive" data-v-8f8a9e57><table class="admin-table" data-v-8f8a9e57><thead data-v-8f8a9e57><tr data-v-8f8a9e57><th width="5%" data-v-8f8a9e57>ID</th><th width="10%" data-v-8f8a9e57>\u5730\u5340</th><th width="20%" data-v-8f8a9e57>\u55AE\u4F4D\u540D\u7A31</th><th width="15%" data-v-8f8a9e57>\u806F\u7D61\u96FB\u8A71</th><th width="30%" data-v-8f8a9e57>\u5730\u5740</th><th width="20%" data-v-8f8a9e57>\u64CD\u4F5C</th></tr></thead><tbody data-v-8f8a9e57><!--[-->`);
          ssrRenderList(filteredServiceUnits.value, (item) => {
            var _a;
            _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.id) === item.id })}" data-v-8f8a9e57><td data-v-8f8a9e57>${ssrInterpolate(item.id)}</td><td data-v-8f8a9e57><span class="region-tag" data-v-8f8a9e57>${ssrInterpolate(getRegionName(item.region))}</span></td><td data-v-8f8a9e57>${ssrInterpolate(item.name)}</td><td data-v-8f8a9e57>${ssrInterpolate(item.phone)}</td><td data-v-8f8a9e57>${ssrInterpolate(item.address)}</td><td data-v-8f8a9e57><div class="action-buttons" data-v-8f8a9e57><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-8f8a9e57><i class="${ssrRenderClass([item.id === editingId.value && isLoadingEdit.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-8f8a9e57></i> ${ssrInterpolate(item.id === editingId.value && isLoadingEdit.value ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-8f8a9e57><i class="${ssrRenderClass([item.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-8f8a9e57></i> ${ssrInterpolate(item.id === deletingId.value ? "\u522A\u9664\u4E2D..." : "\u522A\u9664")}</button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div>`);
      } else if (activeTab.value === "user-reminder") {
        _push(`<div class="tab-content" data-v-8f8a9e57><div class="reminder-container" data-v-8f8a9e57><div class="editor-wrapper" data-v-8f8a9e57><div class="editor-header" data-v-8f8a9e57><h2 data-v-8f8a9e57>\u7DE8\u8F2F\u4F7F\u7528\u8005\u53EE\u5680\u5167\u5BB9</h2><button class="btn btn-primary"${ssrIncludeBooleanAttr(isReminderLoading.value) ? " disabled" : ""} data-v-8f8a9e57><i class="${ssrRenderClass([isReminderLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-8f8a9e57></i> ${ssrInterpolate(isReminderLoading.value ? "\u5132\u5B58\u4E2D..." : "\u5132\u5B58")}</button></div><div class="editor-content" data-v-8f8a9e57>`);
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-8f8a9e57><div class="modal-content" data-v-8f8a9e57><h2 data-v-8f8a9e57>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u670D\u52D9\u55AE\u4F4D" : "\u65B0\u589E\u670D\u52D9\u55AE\u4F4D")}</h2><form class="admin-form" data-v-8f8a9e57><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u5730\u5340</label><select required data-v-8f8a9e57><option value="north" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "north") : ssrLooseEqual(formData.value.region, "north")) ? " selected" : ""}>\u5317\u90E8</option><option value="central" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "central") : ssrLooseEqual(formData.value.region, "central")) ? " selected" : ""}>\u4E2D\u90E8</option><option value="south" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "south") : ssrLooseEqual(formData.value.region, "south")) ? " selected" : ""}>\u5357\u90E8</option><option value="east" data-v-8f8a9e57${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "east") : ssrLooseEqual(formData.value.region, "east")) ? " selected" : ""}>\u6771\u90E8</option></select></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u55AE\u4F4D\u540D\u7A31</label><input${ssrRenderAttr("value", formData.value.name)} type="text" required placeholder="\u8ACB\u8F38\u5165\u55AE\u4F4D\u540D\u7A31" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u5206\u985E</label><input${ssrRenderAttr("value", formData.value.category)} type="text" required placeholder="\u8ACB\u8F38\u5165\u5206\u985E" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u670D\u52D9\u5340\u57DF</label><input${ssrRenderAttr("value", formData.value.serviceArea)} type="text" required placeholder="\u8ACB\u8F38\u5165\u670D\u52D9\u5340\u57DF" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u5730\u5740</label><input${ssrRenderAttr("value", formData.value.address)} type="text" required placeholder="\u8ACB\u8F38\u5165\u5730\u5740" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u806F\u7D61\u96FB\u8A71</label><input${ssrRenderAttr("value", formData.value.phone)} type="tel" required placeholder="\u8ACB\u8F38\u5165\u806F\u7D61\u96FB\u8A71" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u96FB\u5B50\u90F5\u4EF6</label><input${ssrRenderAttr("value", formData.value.email)} type="email" required placeholder="\u8ACB\u8F38\u5165\u96FB\u5B50\u90F5\u4EF6" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u7DB2\u7AD9</label><input${ssrRenderAttr("value", formData.value.website)} type="url" placeholder="\u8ACB\u8F38\u5165\u7DB2\u7AD9\u7DB2\u5740\uFF08\u9078\u586B\uFF09" data-v-8f8a9e57></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u8A73\u7D30\u63CF\u8FF0</label><textarea required placeholder="\u8ACB\u8F38\u5165\u8A73\u7D30\u63CF\u8FF0" rows="4" data-v-8f8a9e57>${ssrInterpolate(formData.value.description)}</textarea></div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u55AE\u4F4D\u5716\u7247 (\u9650\u5236 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-8f8a9e57>`);
          if (unitImageError.value) {
            _push2(`<div class="error-message" data-v-8f8a9e57>${ssrInterpolate(unitImageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (unitImagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", unitImagePreview.value)} class="image-preview" alt="\u55AE\u4F4D\u5716\u7247\u9810\u89BD" data-v-8f8a9e57>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="form-group" data-v-8f8a9e57><label data-v-8f8a9e57>\u50F9\u683C\u5716\u7247 (\u9650\u5236 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif" data-v-8f8a9e57>`);
          if (priceImageError.value) {
            _push2(`<div class="error-message" data-v-8f8a9e57>${ssrInterpolate(priceImageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (priceImagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", priceImagePreview.value)} class="image-preview" alt="\u50F9\u683C\u5716\u7247\u9810\u89BD" data-v-8f8a9e57>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-8f8a9e57><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-8f8a9e57><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-8f8a9e57></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-8f8a9e57> \u53D6\u6D88 </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/service-unit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const serviceUnit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f8a9e57"]]);

export { serviceUnit as default };
//# sourceMappingURL=service-unit-B9hkReaM.mjs.map
