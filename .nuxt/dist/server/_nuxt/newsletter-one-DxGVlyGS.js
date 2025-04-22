import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "newsletter-banner" }, _attrs))}><div class="container"><div class="main-wrapper top-border bottom-border"><div class="row"><div class="col-lg-6"><h2 class="text-dark fw-bold">Our Newsletter.</h2><p class="text-lg md-pb-20"> Get instant news by subscribe to our daily newsletter </p></div><div class="col-lg-6"><form action="#" class="me-auto ms-auto me-lg-0"><div class="d-flex align-items-center justify-content-between"><input type="email" placeholder="Enter your email address"><button class="rounded-circle tran3s"><i class="bi bi-arrow-right"></i></button></div><p class="text-center text-lg-end m0 pt-5"> Already subscribed? <a href="#" class="text-dark fw-500">Unsubscribe</a></p></form></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/newsletter/newsletter-one.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=newsletter-one-DxGVlyGS.js.map
