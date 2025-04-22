import { _ as __nuxt_component_0 } from "./service-unit-list-area-CTGb3nc5.js";
import { defineComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-now",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "現有試辦單位簡介 - 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_service_unit_list_area = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-866fb4f5><div class="service-banner" data-v-866fb4f5><div class="main-container" data-v-866fb4f5><h2 class="default-title" data-v-866fb4f5> 試辦單位簡介 </h2><p data-v-866fb4f5>經勞動部評選核定為多元陪伴照顧服務試辦計畫之試辦單位，聘僱本國籍及外國籍之多元陪伴照顧服務工作者，指派至多元陪伴照顧服務契約履行地，從事陪伴服務等相關事務之體力工作。<br data-v-866fb4f5> 點選以下各區的試辦單位簡介，有服務項目、服務時數、收費等相關說明介紹。</p><h2 class="default-title flex" data-v-866fb4f5> 現有試辦單位簡介 <a class="service-login-btn-temp" href="https://unit-mcs.wda.gov.tw" data-v-866fb4f5>試辦單位登入</a></h2><a class="service-login-btn-temp mobile" href="https://unit-mcs.wda.gov.tw" data-v-866fb4f5>試辦單位登入</a><p data-v-866fb4f5>以下各區的試辦單位簡介，有服務項目、服務時數、收費等相關說明介紹。</p></div></div><div class="main-container" data-v-866fb4f5>`);
      _push(ssrRenderComponent(_component_service_unit_list_area, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-now.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const serviceNow = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-866fb4f5"]]);
export {
  serviceNow as default
};
//# sourceMappingURL=service-now-B-8XGp-F.js.map
