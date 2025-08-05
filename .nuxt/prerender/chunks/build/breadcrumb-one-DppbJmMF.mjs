import { defineComponent, mergeProps, useSSRContext } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "breadcrumb-one",
  __ssrInlineRender: true,
  props: {
    title: { default: "" },
    subtitle: { default: "" },
    bg_img: { default: "/images/media/img_26.jpg" },
    shape: { default: "/images/shape/shape_33.svg" },
    page: { default: "" },
    cls: { default: "" },
    style_2: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "inner-banner-one pt-225 lg-pt-200 md-pt-150 pb-100 md-pb-70 position-relative",
        style: `background-image: url(${_ctx.bg_img})`
      }, _attrs))} data-v-bb6347f4><div class="container position-relative" data-v-bb6347f4>`);
      if (!_ctx.style_2) {
        _push(`<div class="row align-items-center" data-v-bb6347f4><div class="col-lg-12" data-v-bb6347f4><h1 class="hero-heading d-inline-block position-relative" data-v-bb6347f4><span class="bg-white rounded-4 p-3" data-v-bb6347f4>${ssrInterpolate(_ctx.title)}</span></h1></div><div class="col-xl-4 col-lg-5 ms-auto" data-v-bb6347f4></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.style_2) {
        _push(`<div class="row align-items-center" data-v-bb6347f4><div class="col-lg-6" data-v-bb6347f4><h1 class="${ssrRenderClass(`hero-heading d-inline-block position-relative ${_ctx.cls}`)}" data-v-bb6347f4><span class="bg-white rounded-4 p-3" data-v-bb6347f4>${ssrInterpolate(_ctx.title)}</span></h1></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/breadcrumb/breadcrumb-one.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bb6347f4"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=breadcrumb-one-DppbJmMF.mjs.map
