import { _ as __nuxt_component_0 } from "./service-unit-list-area-CTGb3nc5.js";
import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, u as useSeoMeta } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/inetpub/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "service-details-area",
  __ssrInlineRender: true,
  setup(__props) {
    const reminder_data = ref("");
    const decode = (str) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-fa472079><div class="" data-v-fa472079><div class="details-meta ps-xxl-5 ps-xl-3" data-v-fa472079><div class="reminder-block" data-v-fa472079>${decode(reminder_data.value) ?? ""}</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-details-area.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fa472079"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "服務介紹 - 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_service_unit_list_area = __nuxt_component_0;
      const _component_service_details_area = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d6dd2e35><div class="service-banner" data-v-d6dd2e35><div class="main-container" data-v-d6dd2e35><h2 class="default-title" data-v-d6dd2e35> 試辦單位簡介 </h2><p data-v-d6dd2e35>經勞動部評選核定為多元陪伴照顧服務試辦計畫之試辦單位，聘僱本國籍及外國籍之多元陪伴照顧服務工作者，指派至多元陪伴照顧服務契約履行地，從事陪伴照顧等相關事務之體力工作。 <br data-v-d6dd2e35> 點選以下各區的試辦單位簡介，有服務項目、服務時數、收費等相關說明介紹。</p></div></div><div class="main-container" data-v-d6dd2e35>`);
      _push(ssrRenderComponent(_component_service_unit_list_area, null, null, _parent));
      _push(ssrRenderComponent(_component_service_details_area, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const services = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6dd2e35"]]);
export {
  services as default
};
//# sourceMappingURL=services-D4kWOX_o.js.map
