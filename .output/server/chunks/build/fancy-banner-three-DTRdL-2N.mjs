import { _ as _export_sfc, a as __nuxt_component_0$2 } from './server.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';

const _imports_0 = publicAssetsURL("/images/icon/icon_30.svg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "fancy-banner-three position-relative wow fadeInUp" }, _attrs))}><div class="container"><div class="row align-content-center"><div class="col-lg-8 col-md-9"><div class="title-one mb-20 lg-mb-10"><h2 class="text-white">Want to Chat? Feel free to Contact our Team.</h2></div><p class="text-lg m0 text-white opacity-75">If you have anything in mind just contact us with our expert.</p></div><div class="col-lg-4 col-md-3">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    href: "/contact",
    class: "quote-btn tran5s rounded-circle d-flex align-items-center justify-content-center ms-auto"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="icon" class="lazy-img"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            src: _imports_0,
            alt: "icon",
            class: "lazy-img"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/fancy-banner/fancy-banner-three.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=fancy-banner-three-DTRdL-2N.mjs.map
