import { _ as _export_sfc, a as __nuxt_component_0, d as __nuxt_component_1 } from "../server.mjs";
import { ref, computed, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderTeleport, ssrRenderAttr } from "vue/server-renderer";
import "@tiptap/starter-kit";
import "@tiptap/extension-placeholder";
import "@tiptap/extension-code-block-lowlight";
import "/Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/cookie-es/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "/Users/ginjack/Desktop/temp_acc/node_modules/@unhead/vue/dist/index.mjs";
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
        "north": "北部",
        "central": "中部",
        "south": "南部",
        "east": "東部"
      };
      return regionMap[region] || region;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-121496b0><nav class="admin-nav" data-v-121496b0><div class="nav-content" data-v-121496b0><div class="nav-wrapper" data-v-121496b0>`);
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
      _push(`<h1 class="page-title" data-v-121496b0>服務單位管理</h1><div class="placeholder" data-v-121496b0></div></div></div></nav><div class="admin-container" data-v-121496b0><div class="tab-container" data-v-121496b0><button class="${ssrRenderClass([{ active: activeTab.value === "service-unit" }, "tab-button"])}" data-v-121496b0> 服務單位設定 </button><button class="${ssrRenderClass([{ active: activeTab.value === "user-reminder" }, "tab-button"])}" data-v-121496b0> 使用者叮嚀設定 </button></div>`);
      if (activeTab.value === "service-unit") {
        _push(`<div class="tab-content" data-v-121496b0><div class="action-bar" data-v-121496b0><div class="filter-section" data-v-121496b0><select class="filter-select" data-v-121496b0><option value="" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "") : ssrLooseEqual(selectedRegion.value, "")) ? " selected" : ""}>全部地區</option><option value="north" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "north") : ssrLooseEqual(selectedRegion.value, "north")) ? " selected" : ""}>北部</option><option value="central" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "central") : ssrLooseEqual(selectedRegion.value, "central")) ? " selected" : ""}>中部</option><option value="south" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "south") : ssrLooseEqual(selectedRegion.value, "south")) ? " selected" : ""}>南部</option><option value="east" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(selectedRegion.value) ? ssrLooseContain(selectedRegion.value, "east") : ssrLooseEqual(selectedRegion.value, "east")) ? " selected" : ""}>東部</option></select></div><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-121496b0><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-121496b0></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : "新增服務單位")}</button></div>`);
        if (isLoading.value) {
          _push(`<div class="loading-container" data-v-121496b0><div class="loading-spinner" data-v-121496b0></div><p data-v-121496b0>載入中...</p></div>`);
        } else {
          _push(`<div class="table-responsive" data-v-121496b0><table class="admin-table" data-v-121496b0><thead data-v-121496b0><tr data-v-121496b0><th width="5%" data-v-121496b0>ID</th><th width="10%" data-v-121496b0>地區</th><th width="20%" data-v-121496b0>單位名稱</th><th width="15%" data-v-121496b0>聯絡電話</th><th width="30%" data-v-121496b0>地址</th><th width="20%" data-v-121496b0>操作</th></tr></thead><tbody data-v-121496b0><!--[-->`);
          ssrRenderList(filteredServiceUnits.value, (item) => {
            var _a;
            _push(`<tr draggable="true" class="${ssrRenderClass({ "opacity-50": isDragging.value && ((_a = draggedItem.value) == null ? void 0 : _a.id) === item.id })}" data-v-121496b0><td data-v-121496b0>${ssrInterpolate(item.id)}</td><td data-v-121496b0><span class="region-tag" data-v-121496b0>${ssrInterpolate(getRegionName(item.region))}</span></td><td data-v-121496b0>${ssrInterpolate(item.name)}</td><td data-v-121496b0>${ssrInterpolate(item.phone)}</td><td data-v-121496b0>${ssrInterpolate(item.address)}</td><td data-v-121496b0><div class="action-buttons" data-v-121496b0><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-121496b0><i class="${ssrRenderClass([item.id === editingId.value && isLoadingEdit.value ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-121496b0></i> ${ssrInterpolate(item.id === editingId.value && isLoadingEdit.value ? "載入中..." : "編輯")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading || isLoadingEdit.value) ? " disabled" : ""} data-v-121496b0><i class="${ssrRenderClass([item.id === deletingId.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-121496b0></i> ${ssrInterpolate(item.id === deletingId.value ? "刪除中..." : "刪除")}</button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div>`);
      } else if (activeTab.value === "user-reminder") {
        _push(`<div class="tab-content" data-v-121496b0><div class="reminder-container" data-v-121496b0><div class="editor-wrapper" data-v-121496b0><div class="editor-header" data-v-121496b0><h2 data-v-121496b0>編輯使用者叮嚀內容</h2><button class="btn btn-primary"${ssrIncludeBooleanAttr(isReminderLoading.value) ? " disabled" : ""} data-v-121496b0><i class="${ssrRenderClass([isReminderLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-121496b0></i> ${ssrInterpolate(isReminderLoading.value ? "儲存中..." : "儲存")}</button></div><div class="editor-content" data-v-121496b0>`);
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-121496b0><div class="modal-content" data-v-121496b0><h2 data-v-121496b0>${ssrInterpolate(isEditing.value ? "編輯服務單位" : "新增服務單位")}</h2><form class="admin-form" data-v-121496b0><div class="form-group" data-v-121496b0><label data-v-121496b0>地區</label><select required data-v-121496b0><option value="north" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "north") : ssrLooseEqual(formData.value.region, "north")) ? " selected" : ""}>北部</option><option value="central" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "central") : ssrLooseEqual(formData.value.region, "central")) ? " selected" : ""}>中部</option><option value="south" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "south") : ssrLooseEqual(formData.value.region, "south")) ? " selected" : ""}>南部</option><option value="east" data-v-121496b0${ssrIncludeBooleanAttr(Array.isArray(formData.value.region) ? ssrLooseContain(formData.value.region, "east") : ssrLooseEqual(formData.value.region, "east")) ? " selected" : ""}>東部</option></select></div><div class="form-group" data-v-121496b0><label data-v-121496b0>單位名稱</label><input${ssrRenderAttr("value", formData.value.name)} type="text" required placeholder="請輸入單位名稱" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>分類</label><input${ssrRenderAttr("value", formData.value.category)} type="text" required placeholder="請輸入分類" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>服務區域</label><input${ssrRenderAttr("value", formData.value.serviceArea)} type="text" required placeholder="請輸入服務區域" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>地址</label><input${ssrRenderAttr("value", formData.value.address)} type="text" required placeholder="請輸入地址" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>聯絡電話</label><input${ssrRenderAttr("value", formData.value.phone)} type="tel" required placeholder="請輸入聯絡電話" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>電子郵件</label><input${ssrRenderAttr("value", formData.value.email)} type="email" required placeholder="請輸入電子郵件" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>網站</label><input${ssrRenderAttr("value", formData.value.website)} type="url" placeholder="請輸入網站網址（選填）" data-v-121496b0></div><div class="form-group" data-v-121496b0><label data-v-121496b0>詳細描述</label><textarea required placeholder="請輸入詳細描述" rows="4" data-v-121496b0>${ssrInterpolate(formData.value.description)}</textarea></div><div class="form-group" data-v-121496b0><label data-v-121496b0>單位圖片 (限制 5MB 以內)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-121496b0>`);
          if (unitImageError.value) {
            _push2(`<div class="error-message" data-v-121496b0>${ssrInterpolate(unitImageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (unitImagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", unitImagePreview.value)} class="image-preview" alt="單位圖片預覽" data-v-121496b0>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="form-group" data-v-121496b0><label data-v-121496b0>價格圖片 (限制 5MB 以內)</label><input type="file" accept="image/jpeg,image/png,image/gif" data-v-121496b0>`);
          if (priceImageError.value) {
            _push2(`<div class="error-message" data-v-121496b0>${ssrInterpolate(priceImageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (priceImagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", priceImagePreview.value)} class="image-preview" alt="價格圖片預覽" data-v-121496b0>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-121496b0><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-121496b0><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-121496b0></i> ${ssrInterpolate(isButtonLoading.value ? "處理中..." : isEditing.value ? "更新" : "新增")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-121496b0> 取消 </button></div></form></div></div>`);
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
const serviceUnit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-121496b0"]]);
export {
  serviceUnit as default
};
//# sourceMappingURL=service-unit-DBXZoOfo.js.map
