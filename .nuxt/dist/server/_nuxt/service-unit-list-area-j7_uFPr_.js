import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-unit-list-area",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { id: "north", name: "北區-北北基桃竹" },
      { id: "central", name: "中區-苗中彰投雲" },
      { id: "south", name: "南區-嘉南高屏" },
      { id: "east", name: "東區-宜花東" }
    ];
    const currentTab = ref("north");
    const vendorData = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const filteredVendors = computed(() => {
      return vendorData.value.filter((vendor) => vendor.region === currentTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-unit-container" }, _attrs))} data-v-3fefab01><div class="main-container" data-v-3fefab01><div class="service-tab" data-v-3fefab01><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["service-tab-btn", { active: unref(currentTab) === tab.id }])}" data-v-3fefab01>${ssrInterpolate(tab.name.split("-")[0])} <span data-v-3fefab01>${ssrInterpolate(tab.name.split("-")[1])}</span></button>`);
      });
      _push(`<!--]--></div><div class="tab-content mt-60 lg-mt-40" data-v-3fefab01>`);
      if (unref(isLoading)) {
        _push(`<div class="loading-container" data-v-3fefab01><div class="loading-spinner" data-v-3fefab01></div><p data-v-3fefab01>載入中...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-container" data-v-3fefab01><p data-v-3fefab01>${ssrInterpolate(unref(error))}</p><button class="retry-btn" data-v-3fefab01>重試</button></div>`);
      } else {
        _push(`<div id="location-block" class="vendor-grid" data-v-3fefab01><!--[-->`);
        ssrRenderList(unref(filteredVendors), (vendor) => {
          _push(`<div class="vendor-card" data-v-3fefab01><img${ssrRenderAttr("src", `/api/service-unit/${vendor.id}/unit-image`)}${ssrRenderAttr("alt", vendor.name)} class="vendor-image" data-v-3fefab01><div class="vendor-info" data-v-3fefab01><p style="${ssrRenderStyle({ "text-align": "left", "padding": "15px 0", "font-size": "20px" })}" data-v-3fefab01>${vendor.name ?? ""}</p><p class="vendor-category" data-v-3fefab01><!--[-->`);
          ssrRenderList(vendor.serviceArea.split(","), (item) => {
            _push(`<span class="vendor-category-tag" data-v-3fefab01>${ssrInterpolate(item)}</span>`);
          });
          _push(`<!--]--></p><a href="#" class="vendor-contact" data-v-3fefab01>${ssrInterpolate(vendor.phone)}</a><a href="#" class="vendor-email" data-v-3fefab01>${ssrInterpolate(vendor.email)}</a><div class="vender-deatil-info" data-v-3fefab01><a${ssrRenderAttr("href", `/service-price?id=${vendor.id}`)} class="vender-detail-price" data-v-3fefab01>服務價格</a><a${ssrRenderAttr("href", vendor.website)} target="_blank" class="vender-detail-web" data-v-3fefab01>單位網站</a></div><a class="book-btn" href="https://serve-mcs.wda.gov.tw" data-v-3fefab01>我要預約</a></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><p class="service-note" data-v-3fefab01>*離島地區於未來計畫擴充時建置 <br data-v-3fefab01> <a class="template-btn" href="https://drive.google.com/drive/folders/1XQkk8vrucc-l2xYapD9JMFFjG3p6hpQ-?usp=sharing" data-v-3fefab01>合約範本</a></p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-unit-list-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fefab01"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=service-unit-list-area-j7_uFPr_.js.map
