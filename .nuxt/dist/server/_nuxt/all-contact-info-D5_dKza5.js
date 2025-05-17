import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "all-contact-info",
  __ssrInlineRender: true,
  setup(__props) {
    const select_area = ref("北區");
    const contact_list = ref([
      {
        "link": "https://www.klchb.klcg.gov.tw/tw/klchb/1417.html",
        "name": "基隆市長期照顧管理中心",
        "phone": "02-2434-0234",
        "area": "北區"
      },
      {
        "link": "https://ltc.health.gov.tw/tplcPublic/front/onlineService",
        "name": "臺北市長期照顧管理中心",
        "phone": "02-2537-1099",
        "area": "北區"
      },
      {
        "link": "https://www.health.ntpc.gov.tw/basic/?node=204742",
        "name": "新北市長期照顧管理中心",
        "phone": "02-2968-3331",
        "area": "北區"
      },
      {
        "link": "https://care.tycg.gov.tw/cp.aspx?n=5786",
        "name": "桃園市長期照顧管理中心",
        "phone": "033-340-935",
        "area": "北區"
      },
      {
        "link": "https://www.hcchb.gov.tw/service_form.php",
        "name": "新竹市長期照顧管理中心",
        "phone": "035-355-191",
        "area": "北區"
      },
      {
        "link": "https://longcare.hsinchu.gov.tw/Default.aspx",
        "name": "新竹縣長期照顧管理中心",
        "phone": "035-518-101",
        "area": "北區"
      },
      {
        "link": "https://longcare.miaoli.gov.tw/ApplyForm.aspx?n=2328&sms=11627",
        "name": "苗栗縣長期照顧管理中心",
        "phone": "037-558-080",
        "area": "中區"
      },
      {
        "link": "https://www.health.taichung.gov.tw/1620767/Lpsimplelist",
        "name": "台中市長期照顧管理中心",
        "phone": "04-2515-2888",
        "area": "中區"
      },
      {
        "link": "https://edesk.chcg.gov.tw/eservice/apply_mode_directions2?itemId=116",
        "name": "彰化縣長期照顧管理中心",
        "phone": "04-7278-503",
        "area": "中區"
      },
      {
        "link": "https://www.ntshb.gov.tw/form/Details?Parser=2,7,138,64,,,195",
        "name": "南投縣長期照顧管理中心",
        "phone": "049-2222-473",
        "area": "中區"
      },
      {
        "link": "https://eservice.yunlin.gov.tw/ApplyCase/Index/187?Lv1Dept=376490300I&lv2Dept=500249",
        "name": "雲林縣長期照顧管理中心",
        "phone": "05-5352-880",
        "area": "南區"
      },
      {
        "link": "https://ltccenter.cyhg.gov.tw/",
        "name": "嘉義縣長期照顧管理中心",
        "phone": "053-625-750",
        "area": "南區"
      },
      {
        "link": "https://longcare.chiayi.gov.tw/cp.aspx?n=5119",
        "name": "嘉義市長期照顧管理中心",
        "phone": "052-336-889",
        "area": "南區"
      },
      {
        "link": "https://onestop.tainan.gov.tw/eservice/apply_mode_directions2?itemId=3074",
        "name": "台南市長期照顧管理中心",
        "phone": "062-931-232",
        "area": "南區"
      },
      {
        "link": "https://ltc.kchb.gov.tw/apply",
        "name": "高雄市長期照顧管理中心",
        "phone": "077-131-500",
        "area": "南區"
      },
      {
        "link": "https://www.pthg.gov.tw/care/default.aspx",
        "name": "屏東市長期照顧管理中心",
        "phone": "087-662-900",
        "area": "南區"
      },
      {
        "link": "https://ltc.ilshb.gov.tw/online/confirm",
        "name": "宜蘭縣長期照顧管理中心",
        "phone": "039-359-990",
        "area": "東區"
      },
      {
        "link": "https://long-term.hlshb.gov.tw/careservice",
        "name": "花蓮縣長期照顧管理中心",
        "phone": "038-226-889",
        "area": "東區"
      },
      {
        "link": "https://ttshbltc.ttshb.gov.tw/",
        "name": "臺東縣長期照顧管理中心",
        "phone": "089-330-068",
        "area": "東區"
      },
      {
        "link": "https://eservice.penghu.gov.tw/Default.aspx",
        "name": "澎湖縣長期照顧管理中心",
        "phone": "06-9267-242",
        "area": "外島"
      },
      {
        "link": "https://longtermcare.kinmen.gov.tw/apply.asp",
        "name": "金門縣長期照顧管理中心",
        "phone": "082-334-228",
        "area": "外島"
      },
      {
        "link": "https://www.matsuhb.gov.tw/chhtml/careservice/2286",
        "name": "連江縣長期照顧管理中心",
        "phone": "083-622-095#8830~8839",
        "area": "外島"
      }
    ]);
    const filter_contact = computed(() => {
      return contact_list.value.filter((item) => item.area == select_area.value);
    });
    useSeoMeta({ title: "各縣市長期照顧管理中心｜多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-00af8aa2><h2 class="default-title" data-v-00af8aa2> 各縣市長期照顧管理中心聯繫窗口 </h2><div class="tab-list" data-v-00af8aa2><div class="${ssrRenderClass([{ active: select_area.value == "北區" }, "tab-item"])}" data-v-00af8aa2>北部地區</div><div class="${ssrRenderClass([{ active: select_area.value == "中區" }, "tab-item"])}" data-v-00af8aa2>中部地區</div><div class="${ssrRenderClass([{ active: select_area.value == "南區" }, "tab-item"])}" data-v-00af8aa2>南部地區</div><div class="${ssrRenderClass([{ active: select_area.value == "東區" }, "tab-item"])}" data-v-00af8aa2>東部地區</div><div class="${ssrRenderClass([{ active: select_area.value == "外島" }, "tab-item"])}" data-v-00af8aa2>外島地區</div></div><ul class="contact-list" data-v-00af8aa2><!--[-->`);
      ssrRenderList(filter_contact.value, (item) => {
        _push(`<li data-v-00af8aa2><a${ssrRenderAttr("href", item.link)} data-v-00af8aa2>${ssrInterpolate(item.name)}</a><span data-v-00af8aa2>${ssrInterpolate(item.phone)}</span></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/all-contact-info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const allContactInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00af8aa2"]]);
export {
  allContactInfo as default
};
//# sourceMappingURL=all-contact-info-D5_dKza5.js.map
