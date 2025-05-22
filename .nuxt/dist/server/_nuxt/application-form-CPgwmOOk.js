import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "application-form",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "申請表｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-dbbb9603><h2 class="default-title" data-v-dbbb9603> 填寫申請表 </h2><p data-v-dbbb9603>線上申請系統於未來計畫擴充時建置</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/application-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const applicationForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbbb9603"]]);
export {
  applicationForm as default
};
//# sourceMappingURL=application-form-CPgwmOOk.js.map
