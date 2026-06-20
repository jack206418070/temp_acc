import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-unit-list-area",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { id: "north", name: "\u5317\u5340-\u5317\u5317\u57FA\u6843\u7AF9" },
      { id: "central", name: "\u4E2D\u5340-\u82D7\u4E2D\u5F70\u6295\u96F2" },
      { id: "south", name: "\u5357\u5340-\u5609\u5357\u9AD8\u5C4F" },
      { id: "east", name: "\u6771\u5340-\u5B9C\u82B1\u6771" }
    ];
    const currentTab = ref("north");
    const vendorData = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const filteredVendors = computed(() => {
      return vendorData.value.filter((vendor) => vendor.region === currentTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-unit-container" }, _attrs))} data-v-a4ac1682><div class="main-container" data-v-a4ac1682><div class="service-tab" data-v-a4ac1682><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["service-tab-btn", { active: unref(currentTab) === tab.id }])}" data-v-a4ac1682>${ssrInterpolate(tab.name.split("-")[0])} <span data-v-a4ac1682>${ssrInterpolate(tab.name.split("-")[1])}</span></button>`);
      });
      _push(`<!--]--></div><div class="tab-content mt-60 lg-mt-40" data-v-a4ac1682>`);
      if (unref(isLoading)) {
        _push(`<div class="loading-container" data-v-a4ac1682><div class="loading-spinner" data-v-a4ac1682></div><p data-v-a4ac1682>\u8F09\u5165\u4E2D...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-container" data-v-a4ac1682><p data-v-a4ac1682>${ssrInterpolate(unref(error))}</p><button class="retry-btn" data-v-a4ac1682>\u91CD\u8A66</button></div>`);
      } else {
        _push(`<div id="location-block" class="vendor-grid" data-v-a4ac1682><!--[-->`);
        ssrRenderList(unref(filteredVendors), (vendor) => {
          var _a;
          _push(`<div class="vendor-card" data-v-a4ac1682><img${ssrRenderAttr("src", `/api/service-unit/${vendor.id}/unit-image`)}${ssrRenderAttr("alt", vendor.name)} class="vendor-image" data-v-a4ac1682><div class="vendor-info" data-v-a4ac1682><p style="${ssrRenderStyle({ "text-align": "left", "padding": "15px 0", "font-size": "20px" })}" data-v-a4ac1682>${(_a = vendor.name) != null ? _a : ""}</p><p class="vendor-category" data-v-a4ac1682><!--[-->`);
          ssrRenderList(vendor.serviceArea.split(","), (item) => {
            _push(`<span class="vendor-category-tag" data-v-a4ac1682>${ssrInterpolate(item)}</span>`);
          });
          _push(`<!--]--></p><a href="#" class="vendor-contact" data-v-a4ac1682>${ssrInterpolate(vendor.phone)}</a><a href="#" class="vendor-email" data-v-a4ac1682>${ssrInterpolate(vendor.email)}</a><div class="vender-deatil-info" data-v-a4ac1682><a${ssrRenderAttr("href", `/service-price?id=${vendor.id}`)} class="vender-detail-price" data-v-a4ac1682>\u670D\u52D9\u50F9\u683C</a><a${ssrRenderAttr("href", vendor.website)} target="_blank" class="vender-detail-web" data-v-a4ac1682>\u55AE\u4F4D\u7DB2\u7AD9</a></div><a class="book-btn" href="https://serve-mcs.wda.gov.tw" data-v-a4ac1682>\u6211\u8981\u9810\u7D04</a></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><p class="service-note" data-v-a4ac1682>*\u96E2\u5CF6\u5730\u5340\u65BC\u672A\u4F86\u8A08\u756B\u64F4\u5145\u6642\u5EFA\u7F6E <br data-v-a4ac1682> <a class="template-btn" href="https://drive.google.com/drive/folders/1XQkk8vrucc-l2xYapD9JMFFjG3p6hpQ-?usp=sharing" data-v-a4ac1682>\u5408\u7D04\u7BC4\u672C</a></p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-unit-list-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a4ac1682"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=service-unit-list-area-Djhh1-S9.mjs.map
