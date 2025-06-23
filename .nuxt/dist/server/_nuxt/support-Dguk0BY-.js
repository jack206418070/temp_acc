import { _ as __nuxt_component_0 } from "./breadcrumb-one-DppbJmMF.js";
import { _ as __nuxt_component_3 } from "./newsletter-one-CM5veuBn.js";
import { defineComponent, resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { a as _imports_0, b as _imports_1, c as _imports_2, _ as _imports_3 } from "./virtual_public-CLuFllmE.js";
import { u as useSeoMeta } from "../server.mjs";
import "#internal/nuxt/paths";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "Contact - Babun" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_breadcrumb_one = __nuxt_component_0;
      const _component_form_contact = resolveComponent("form-contact");
      const _component_newsletter_one = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_breadcrumb_one, {
        title: "聯絡我們",
        subtitle: "Get our all info and also can message us directly from here",
        page: "聯絡我們",
        shape: "/images/shape/shape_33.svg"
      }, null, _parent));
      _push(`<div class="contact-us-section pt-150 lg-pt-80"><div class="conteeee"><div class="position-relative"><div class="row"><div class="col-12 m-auto"><div class="row"><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img"></div><h5 class="title">Our Address</h5><p>1012 Pebda Parkway, Mirpur 2 <br>Dhaka, Bangladesh</p></div></div><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_1)} alt="" class="lazy-img"></div><h5 class="title">Contact Info</h5><p> Open a chat or give us call at <br><a href="tel:310.841.5500" class="call text-lg fw-500">310.841.5500</a></p></div></div><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_2)} alt="" class="lazy-img"></div><h5 class="title">Live Support</h5><p> live chat service <br><a href="#" class="webaddress">www.babunlivechat.com</a></p></div></div></div></div></div><div class="bg-wrapper light-bg mt-80 lg-mt-40"><div class="row"><div class="col-lg-5"><div class="d-flex flex-column flex-lg-column-reverse"><div class="row"><div class="col-md-8 col-6 me-auto ms-auto"><img${ssrRenderAttr("src", _imports_3)} alt="" class="lazy-img me-auto ms-auto"></div></div><div class="title-one text-center text-lg-start md-mt-20 mb-70 md-mb-30"><h2>Have inquiries? Reach out via message</h2></div></div></div><div class="col-lg-7"><div class="form-style-one ps-xl-5">`);
      _push(ssrRenderComponent(_component_form_contact, null, null, _parent));
      _push(`</div></div></div></div></div></div><div class="map-banner mt-120 lg-mt-80"><div class="gmap_canvas h-100 w-100"><iframe class="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=dhaka collage&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div></div></div>`);
      _push(ssrRenderComponent(_component_newsletter_one, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
