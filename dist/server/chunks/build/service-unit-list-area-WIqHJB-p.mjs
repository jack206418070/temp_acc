import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
    const vendorData = [
      {
        id: 1,
        name: "\u7D05\u5FC3\u5B57\u6703\u79C9\u6301\u300C\u611B\u5FC3\u7121\u9650\uFF0C\u670D\u52D9\u793E\u6703\u300D\uFF0C\u52A0\u5165\u591A\u5143\u670D\u52D9\uFF0C\u7D13\u89E3\u7167\u9867\u4EBA\u529B\u77ED\u7F3A\uFF0C\u63D0\u4F9B\u81E8\u3001\u77ED\u3001\u6025\u4E4B\u5C08\u696D\u6EAB\u6696\u670D\u52D9\u3002",
        image: "/images/assets/brand-1.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "north",
        service_area: "\u81FA\u5317\u5E02,\u65B0\u5317\u5E02",
        address: "\u53F0\u5317\u5E02\u4E2D\u6B63\u5340\u91CD\u6176\u5357\u8DEF1\u6BB543\u865F5\u6A13\u4E4B2",
        phone: "\uFF0802) 2370-9191",
        email: "redheart1266@gmail.com",
        description: "\u5C08\u696D\u7684\u7167\u8B77\u5718\u968A\uFF0C\u63D0\u4F9B\u5168\u65B9\u4F4D\u7684\u9577\u7167\u670D\u52D9\uFF0C\u8B93\u9577\u8005\u4EAB\u53D7\u6EAB\u99A8\u8212\u9069\u7684\u7167\u9867\u3002",
        rating: 4,
        web: "https://www.redheart.org.tw/",
        price: "/service-price?id=1"
      },
      {
        id: 2,
        name: "\u79C9\u6301\u670D\u52D9\u300C\u6C38\u7E8C\u300D\u7684\u7CBE\u795E\uFF0C\u8B93\u53D7\u7167\u9867\u8005\u80FD\u5920\u4EAB\u53D7\u300C\u5E78\u798F\u300D\u751F\u6D3B\uFF0C\u9054\u5230\u4F60\u597D\u3001\u6211\u597D\u3001\u5927\u5BB6\u597D\u7684\u76EE\u6A19\u3002",
        image: "/images/assets/brand-2.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "central",
        service_area: "\u81FA\u4E2D\u5E02",
        address: "\u53F0\u4E2D\u5E02\u5927\u7532\u5340\u6210\u529F\u8DEF319\u865F",
        phone: "(04) 2676-0180",
        email: "ysphomecare@gmail.com",
        description: "\u63D0\u4F9B\u5C08\u696D\u5FC3\u7406\u8AEE\u5546\u670D\u52D9\uFF0C\u5354\u52A9\u60A8\u627E\u56DE\u5167\u5FC3\u7684\u5E73\u975C\u8207\u5FEB\u6A02\u3002",
        rating: 3,
        web: "https://www.ysswf.com/",
        price: "/service-price?id=2"
      },
      {
        id: 3,
        name: "\u7AE5\u5EAD\u57FA\u91D1\u6703\u81F4\u529B\u65BC\u4E86\u89E3\u60A8\u7684\u9700\u6C42\uFF0C\u63D0\u4F9B\u60A8\u5C08\u696D\u4E14\u6709\u6EAB\u5EA6\u7684\u81E8\u3001\u77ED\u3001\u6025\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u3002",
        image: "/images/assets/brand-4.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "central",
        service_area: "\u81FA\u4E2D\u5E02",
        address: "\u53F0\u4E2D\u5E02\u5927\u7532\u5340\u6210\u529F\u8DEF319\u865F",
        phone: "(04) 23360996",
        email: "dragonlee@ttcharity.org.tw",
        description: "\u63D0\u4F9B\u5C08\u696D\u5FC3\u7406\u8AEE\u5546\u670D\u52D9\uFF0C\u5354\u52A9\u60A8\u627E\u56DE\u5167\u5FC3\u7684\u5E73\u975C\u8207\u5FEB\u6A02\u3002",
        rating: 3,
        web: "https://www.ttcharity.org.tw/",
        price: "/service-price?id=3"
      },
      {
        id: 6,
        name: "\u5354\u6703\u9577\u671F\u63D0\u4F9B\u7167\u8B77\u3001\u8077\u8A13\u3001\u5FC3\u7406\u8207\u6CD5\u5F8B\u6276\u52A9\uFF0C\u539A\u690D\u5730\u65B9\u8CC7\u6E90\u5275\u65B0\u670D\u52D9\uFF0C\u71DF\u9020\u5171\u878D\u5171\u597D\u793E\u6703\u3002",
        image: "/images/assets/brand-3.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "central",
        service_area: "\u81FA\u4E2D\u5E02,\u5357\u6295\u7E23,\u5F70\u5316\u7E23",
        address: "\u53F0\u4E2D\u5E02\u5927\u7532\u5340\u6210\u529F\u8DEF319\u865F",
        phone: "(04) 9224-5265",
        email: "ntnrca1mcs@gmail.com",
        description: "\u63D0\u4F9B\u5C08\u696D\u5FC3\u7406\u8AEE\u5546\u670D\u52D9\uFF0C\u5354\u52A9\u60A8\u627E\u56DE\u5167\u5FC3\u7684\u5E73\u975C\u8207\u5FEB\u6A02\u3002",
        rating: 3,
        web: "https://www.facebook.com/profile.php?id=100064631114886&mibextid=wwXIfr&rdid=A86u7EN6cA82uuvt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14yDS9r63R%2F%3Fmibextid%3DwwXIfr#",
        price: "/service-price?id=4"
      },
      {
        id: 4,
        name: "\u842C\u4EBA\u5354\u6703\u670D\u52D9\u5357\u90E8\u5730\u5340\u6C11\u773E\uFF0C\u81F4\u529B\u65BC\u652F\u6301\u5F31\u52E2\u65CF\u7FA4\u8207\u5176\u7167\u9867\u8005\uFF0C\u900F\u904E\u5C08\u696D\u5718\u968A\uFF0C\u6E1B\u8F15\u5BB6\u5EAD\u81E8\u3001\u77ED\u3001\u6025\u7167\u9867\u9700\u6C42\uFF0C\u5354\u52A9\u66F4\u591A\u9700\u8981\u95DC\u61F7\u7684\u5BB6\u5EAD\u3002",
        image: "/images/assets/brand-5.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "south",
        service_area: "\u81FA\u5357\u5E02,\u9AD8\u96C4\u5E02,\u5C4F\u6771\u7E23",
        address: "\u9AD8\u96C4\u5E02\u4E09\u6C11\u5340\u660E\u8AA0\u4E00\u8DEF20\u865F",
        phone: "(06) 2570119",
        email: "TPSW@tpsw.org.tw",
        description: "\u8C50\u5BCC\u591A\u5143\u7684\u6A02\u9F61\u6D3B\u52D5\uFF0C\u8B93\u9577\u8005\u4EAB\u53D7\u5145\u5BE6\u5FEB\u6A02\u7684\u9000\u4F11\u751F\u6D3B\u3002",
        rating: 5,
        web: "http://www.tpsw.org.tw/ap/index.aspx",
        price: "/service-price?id=5"
      },
      {
        id: 5,
        name: "\u82B1\u84EE\u5BB6\u5354\u70BA\u5B9C\u82B1\u6771\u6709\u300C\u81E8\u3001\u77ED\u3001\u6025\u300D\u7167\u9867\u9700\u6C42\u7684\u5BB6\u5EAD\uFF0C\u63D0\u4F9B\u591A\u5143\u5C08\u696D\u512A\u8CEA\u7684\u5BB6\u5EAD\u7167\u9867\u670D\u52D9\u3002",
        image: "/images/assets/brand-6.avif",
        category: "\u5FC3\u7406\u8AEE\u5546",
        area: "east",
        service_area: "\u5B9C\u862D\u7E23,\u82B1\u84EE\u7E23,\u81FA\u6771\u7E23",
        address: "\u82B1\u84EE\u5E02\u7F8E\u502B\u8DEF87\u865F",
        phone: "(03) 8223685",
        email: "hlmcs@secondcare.org.tw",
        description: "\u5C08\u70BA\u9280\u9AEE\u65CF\u8A2D\u8A08\u7684\u8AB2\u7A0B\uFF0C\u6301\u7E8C\u5B78\u7FD2\u3001\u8C50\u5BCC\u4EBA\u751F\u3002",
        rating: 4,
        web: "https://www.facebook.com/HFCCA/?locale=zh_TW",
        price: "/service-price?id=6"
      }
    ];
    const filteredVendors = computed(() => {
      return vendorData.filter((vendor) => vendor.area === currentTab.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "service-unit-container" }, _attrs))} data-v-0f763971><div class="main-container" data-v-0f763971><div class="service-tab" data-v-0f763971><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["service-tab-btn", { active: unref(currentTab) === tab.id }])}" data-v-0f763971>${ssrInterpolate(tab.name.split("-")[0])} <span data-v-0f763971>${ssrInterpolate(tab.name.split("-")[1])}</span></button>`);
      });
      _push(`<!--]--></div><div class="tab-content mt-60 lg-mt-40" data-v-0f763971><div id="location-block" class="vendor-grid" data-v-0f763971><!--[-->`);
      ssrRenderList(unref(filteredVendors), (vendor) => {
        var _a;
        _push(`<div class="vendor-card" data-v-0f763971><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="vendor-image" data-v-0f763971><div class="vendor-info" data-v-0f763971><p style="${ssrRenderStyle({ "text-align": "left", "padding": "15px 0", "font-size": "20px" })}" data-v-0f763971>${(_a = vendor.name) != null ? _a : ""}</p><p class="vendor-category" data-v-0f763971><!--[-->`);
        ssrRenderList(vendor.service_area.split(","), (item) => {
          _push(`<span class="vendor-category-tag" data-v-0f763971>${ssrInterpolate(item)}</span>`);
        });
        _push(`<!--]--></p><a href="#" class="vendor-contact" data-v-0f763971>${ssrInterpolate(vendor.phone)}</a><a href="#" class="vendor-email" data-v-0f763971>${ssrInterpolate(vendor.email)}</a><div class="vender-deatil-info" data-v-0f763971><a${ssrRenderAttr("href", vendor.price)} class="vender-detail-price" data-v-0f763971>\u670D\u52D9\u50F9\u683C</a><a${ssrRenderAttr("href", vendor.web)} target="_blank" class="vender-detail-web" data-v-0f763971>\u55AE\u4F4D\u7DB2\u7AD9</a></div><a class="book-btn" href="https://serve-mcs.wda.gov.tw" data-v-0f763971>\u6211\u8981\u9810\u7D04</a></div></div>`);
      });
      _push(`<!--]--></div></div><p class="service-note" data-v-0f763971>*\u96E2\u5CF6\u5730\u5340\u65BC\u672A\u4F86\u8A08\u756B\u64F4\u5145\u6642\u5EFA\u7F6E <br data-v-0f763971> <a class="template-btn" href="https://drive.google.com/drive/folders/1XQkk8vrucc-l2xYapD9JMFFjG3p6hpQ-?usp=sharing" data-v-0f763971>\u5408\u7D04\u7BC4\u672C</a></p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-unit-list-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f763971"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=service-unit-list-area-WIqHJB-p.mjs.map
