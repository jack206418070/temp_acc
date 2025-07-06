import { a as __nuxt_component_0, _ as _export_sfc, e as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _sfc_main$2 } from "./back-to-top-BKwl0tkS.js";
import "ofetch";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _imports_0 = publicAssetsURL("/images/logo/logo_2.png");
const _imports_1 = publicAssetsURL("/images/shape/shape_06.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "footer-one",
  __ssrInlineRender: true,
  props: {
    bg: { type: Boolean, default: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `footer-two ${_ctx.bg ? "" : "no-bg"}`
      }, _attrs))}><div class="main-container"><div class="bg-wrapper position-relative"><div class="container"><div class="row justify-content-between"><div class="col-xl-3 col-lg-4 footer-intro mb-30"><div class="logo mb-35 md-mb-20">`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="lh-sm mb-40 md-mb-20">2190 Urban Terrace, Mirpur, link Licensed in 50 states.</p></div><div class="col-lg-2 col-sm-4 mb-20"><h5 class="footer-title">Links</h5><ul class="footer-nav-link style-none"><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首頁`);
          } else {
            return [
              createTextVNode("首頁")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/about-us" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`計畫介紹`);
          } else {
            return [
              createTextVNode("計畫介紹")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/services" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`服務介紹`);
          } else {
            return [
              createTextVNode("服務介紹")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/project-v1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Portfolio`);
          } else {
            return [
              createTextVNode("Portfolio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/blog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Careers`);
          } else {
            return [
              createTextVNode("Careers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/service-v2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Features`);
          } else {
            return [
              createTextVNode("Features")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="col-lg-2 col-sm-4 mb-20"><h5 class="footer-title">Company</h5><ul class="footer-nav-link style-none"><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/about-us" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About us`);
          } else {
            return [
              createTextVNode("About us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/blog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blogs`);
          } else {
            return [
              createTextVNode("Blogs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/faq" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FAQ’s`);
          } else {
            return [
              createTextVNode("FAQ’s")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="col-xxl-2 col-lg-3 col-sm-4 mb-20"><h5 class="footer-title">Support</h5><ul class="footer-nav-link style-none"><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of use`);
          } else {
            return [
              createTextVNode("Terms of use")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms &amp; conditions`);
          } else {
            return [
              createTextVNode("Terms & conditions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cookie policy`);
          } else {
            return [
              createTextVNode("Cookie policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Self-service`);
          } else {
            return [
              createTextVNode("Self-service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="copyright text-center">Copyright @2023 babun inc.</div></div><img${ssrRenderAttr("src", _imports_1)} alt="shape" class="lazy-img shapes shape_01"><img${ssrRenderAttr("src", _imports_1)} alt="shape" class="lazy-img shapes shape_02"></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/footer-one.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_header_one = __nuxt_component_0$1;
  const _component_footer_one = _sfc_main$1;
  const _component_back_to_top = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-page-wrapper" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_header_one, null, null, _parent));
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_footer_one, null, null, _parent));
  _push(ssrRenderComponent(_component_back_to_top, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/layout-one.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const layoutOne = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  layoutOne as default
};
//# sourceMappingURL=layout-one-fx4gHe48.js.map
