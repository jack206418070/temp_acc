import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "all-contact-info",
  __ssrInlineRender: true,
  setup(__props) {
    const select_area = ref("\u5317\u5340");
    const contact_list = ref([
      {
        "link": "https://www.klchb.klcg.gov.tw/tw/klchb/1417.html",
        "name": "\u57FA\u9686\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "02-2434-0234",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://ltc.health.gov.tw/tplcPublic/front/onlineService",
        "name": "\u81FA\u5317\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "02-2537-1099",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://www.health.ntpc.gov.tw/basic/?node=204742",
        "name": "\u65B0\u5317\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "02-2968-3331",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://care.tycg.gov.tw/cp.aspx?n=5786",
        "name": "\u6843\u5712\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "033-340-935",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://www.hcchb.gov.tw/service_form.php",
        "name": "\u65B0\u7AF9\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "035-355-191",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://longcare.hsinchu.gov.tw/Default.aspx",
        "name": "\u65B0\u7AF9\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "035-518-101",
        "area": "\u5317\u5340"
      },
      {
        "link": "https://longcare.miaoli.gov.tw/ApplyForm.aspx?n=2328&sms=11627",
        "name": "\u82D7\u6817\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "037-558-080",
        "area": "\u4E2D\u5340"
      },
      {
        "link": "https://www.health.taichung.gov.tw/1620767/Lpsimplelist",
        "name": "\u53F0\u4E2D\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "04-2515-2888",
        "area": "\u4E2D\u5340"
      },
      {
        "link": "https://edesk.chcg.gov.tw/eservice/apply_mode_directions2?itemId=116",
        "name": "\u5F70\u5316\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "04-7278-503",
        "area": "\u4E2D\u5340"
      },
      {
        "link": "https://www.ntshb.gov.tw/form/Details?Parser=2,7,138,64,,,195",
        "name": "\u5357\u6295\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "049-2222-473",
        "area": "\u4E2D\u5340"
      },
      {
        "link": "https://eservice.yunlin.gov.tw/ApplyCase/Index/187?Lv1Dept=376490300I&lv2Dept=500249",
        "name": "\u96F2\u6797\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "05-5352-880",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://ltccenter.cyhg.gov.tw/",
        "name": "\u5609\u7FA9\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "053-625-750",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://longcare.chiayi.gov.tw/cp.aspx?n=5119",
        "name": "\u5609\u7FA9\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "052-336-889",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://onestop.tainan.gov.tw/eservice/apply_mode_directions2?itemId=3074",
        "name": "\u53F0\u5357\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "062-931-232",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://ltc.kchb.gov.tw/apply",
        "name": "\u9AD8\u96C4\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "077-131-500",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://www.pthg.gov.tw/care/default.aspx",
        "name": "\u5C4F\u6771\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "087-662-900",
        "area": "\u5357\u5340"
      },
      {
        "link": "https://ltc.ilshb.gov.tw/online/confirm",
        "name": "\u5B9C\u862D\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "039-359-990",
        "area": "\u6771\u5340"
      },
      {
        "link": "https://long-term.hlshb.gov.tw/careservice",
        "name": "\u82B1\u84EE\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "038-226-889",
        "area": "\u6771\u5340"
      },
      {
        "link": "https://ttshbltc.ttshb.gov.tw/",
        "name": "\u81FA\u6771\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "089-330-068",
        "area": "\u6771\u5340"
      },
      {
        "link": "https://eservice.penghu.gov.tw/Default.aspx",
        "name": "\u6F8E\u6E56\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "06-9267-242",
        "area": "\u5916\u5CF6"
      },
      {
        "link": "https://longtermcare.kinmen.gov.tw/apply.asp",
        "name": "\u91D1\u9580\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "082-334-228",
        "area": "\u5916\u5CF6"
      },
      {
        "link": "https://www.matsuhb.gov.tw/chhtml/careservice/2286",
        "name": "\u9023\u6C5F\u7E23\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3",
        "phone": "083-622-095#8830~8839",
        "area": "\u5916\u5CF6"
      }
    ]);
    const filter_contact = computed(() => {
      return contact_list.value.filter((item) => item.area == select_area.value);
    });
    useSeoMeta({ title: "\u5404\u7E23\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-5653aac0><h2 class="default-title" data-v-5653aac0> \u5404\u7E23\u5E02\u9577\u671F\u7167\u9867\u7BA1\u7406\u4E2D\u5FC3\u806F\u7E6B\u7A97\u53E3 </h2><div class="tab-list" data-v-5653aac0><div class="${ssrRenderClass([{ active: select_area.value == "\u5317\u5340" }, "tab-item"])}" data-v-5653aac0>\u5317\u90E8\u5730\u5340</div><div class="${ssrRenderClass([{ active: select_area.value == "\u4E2D\u5340" }, "tab-item"])}" data-v-5653aac0>\u4E2D\u90E8\u5730\u5340</div><div class="${ssrRenderClass([{ active: select_area.value == "\u5357\u5340" }, "tab-item"])}" data-v-5653aac0>\u5357\u90E8\u5730\u5340</div><div class="${ssrRenderClass([{ active: select_area.value == "\u6771\u5340" }, "tab-item"])}" data-v-5653aac0>\u6771\u90E8\u5730\u5340</div><div class="${ssrRenderClass([{ active: select_area.value == "\u5916\u5CF6" }, "tab-item"])}" data-v-5653aac0>\u5916\u5CF6\u5730\u5340</div></div><ul class="contact-list" data-v-5653aac0><!--[-->`);
      ssrRenderList(filter_contact.value, (item) => {
        _push(`<li data-v-5653aac0><a${ssrRenderAttr("href", item.link)} data-v-5653aac0>${ssrInterpolate(item.name)}</a><span data-v-5653aac0>${ssrInterpolate(item.phone)}</span></li>`);
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
const allContactInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5653aac0"]]);

export { allContactInfo as default };
//# sourceMappingURL=all-contact-info-uNDRmqjM.mjs.map
