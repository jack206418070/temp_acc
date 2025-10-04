import { _ as __nuxt_component_0$2 } from "./breadcrumb-one-DppbJmMF.js";
import { _ as _export_sfc, a as __nuxt_component_0$1, u as useSeoMeta } from "../server.mjs";
import { withCtx, createTextVNode, useSSRContext, defineComponent, mergeProps, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _imports_3, a as _imports_0$2, b as _imports_1$2, c as _imports_2$1 } from "./virtual_public-CLuFllmE.js";
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
const _imports_0$1 = publicAssetsURL("/images/assets/screen_04.svg");
const _imports_1$1 = publicAssetsURL("/images/assets/screen_05.svg");
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-feature-three text-feature-seven position-relative mt-160 lg-m-80 pb-200 lg-pb-120"><div class="container"><div class="row"><div class="col-xxl-5 col-lg-6 ms-auto d-flex flex-column order-lg-last wow fadeInRight"><div class="title-one"><h2>選擇試辦單位</h2></div><p class="text-lg mt-30 mb-55 lg-mb-30"> Your success is our mission. As business advisors, we offer expert guidance, unlocking your potential </p><ul class="style-none"><li>Mobile app easy management &amp; access.</li><li>Ton’s of features for handle the card easily &amp; safely</li><li>Strong security system.</li></ul><div class="counter-wrapper mt-50 lg-mt-40 pt-25 lg-pt-10"></div></div><div class="col-xxl-6 col-lg-5 d-flex order-lg-first wow fadeInLeft"><div class="media-wrapper w-100 position-relative"><img${ssrRenderAttr("src", _imports_0$1)} alt="" class="lazy-img shapes screen_01"><img${ssrRenderAttr("src", _imports_1$1)} alt="" class="lazy-img shapes screen_02"></div></div></div></div></div><div class="text-center mb-60 lg-mb-50">`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    href: "https://accompany-service-user.vercel.app/login",
    target: "_blank",
    class: "btn-one"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`我要申請`);
      } else {
        return [
          createTextVNode("我要申請")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinus/joinus-about-us-two-area.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "faq-item",
  __ssrInlineRender: true,
  props: {
    id: {},
    title: {},
    desc: {},
    isShow: { type: Boolean },
    parent: {},
    cls: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "accordion-item" }, _attrs))} data-v-7c83540a><div class="accordion-header"${ssrRenderAttr("id", "heading" + _ctx.id)} data-v-7c83540a><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"${ssrRenderAttr("data-bs-target", "#collapse" + _ctx.id)}${ssrRenderAttr("aria-expanded", false)}${ssrRenderAttr("aria-controls", "collapse" + _ctx.id)} data-v-7c83540a>${ssrInterpolate(_ctx.title)}</button></div><div${ssrRenderAttr("id", "collapse" + _ctx.id)} class="accordion-collapse collapse"${ssrRenderAttr("aria-labelledby", "heading" + _ctx.id)}${ssrRenderAttr("data-bs-parent", "#" + _ctx.parent)} data-v-7c83540a><div class="accordion-body" data-v-7c83540a><p class="faq-answer" data-v-7c83540a>${ssrInterpolate(_ctx.desc)}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/faq/faq-item.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7c83540a"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_faq_item = __nuxt_component_0;
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-section-three light-bg border-top pt-120 lg-pt-80 pb-150 lg-pb-80" }, _attrs))}><div class="container"><nav><div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab">All</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-marketing" type="button" role="tab">Marketing</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-banking" type="button" role="tab">Banking</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-finance" type="button" role="tab">Finance</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-payment" type="button" role="tab">Payments</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-terms" type="button" role="tab">Terms &amp; Conditions</button><button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-account" type="button" role="tab">Account</button></div></nav><div class="tab-content mt-60 lg-mt-40"><div class="tab-pane fade show active" id="nav-all" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionOne">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "one",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    isShow: true,
    id: "two",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "three",
    title: "What do you look for in a founding team?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "four",
    title: "Do you recommend Pay as you go or Pre pay?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "five",
    title: "What do I get for $0 with my plan?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "six",
    title: "What do you look for in a founding team?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionOne"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-marketing" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionTwo">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "nine",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionTwo"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "ten",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionTwo"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-banking" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionThree">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "seven",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionThree"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "eight",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionThree"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-finance" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionFour">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "eleven",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionFour"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "twelve",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionFour"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-payment" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionFive">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "thirteen",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionFive"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "fourteen",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionFive"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-terms" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionSix">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "fifteen",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionSix"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "sixteen",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionSix"
  }, null, _parent));
  _push(`</div></div><div class="tab-pane fade" id="nav-account" role="tabpanel" tabindex="0"><div class="accordion accordion-style-one" id="accordionSeven">`);
  _push(ssrRenderComponent(_component_faq_item, {
    id: "seventeen",
    title: "How does the free trial work?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionSeven"
  }, null, _parent));
  _push(ssrRenderComponent(_component_faq_item, {
    id: "eighteen",
    title: "How do you find different criteria in your process?",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    parent: "accordionSeven"
  }, null, _parent));
  _push(`</div></div></div><div class="text-center mt-60 lg-mt-50"><h2 class="fs-1 mb-30">Don’t get your answer?</h2>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    href: "/contact",
    class: "btn-four"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact Us`);
      } else {
        return [
          createTextVNode("Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinus/joinus-faq-area-three.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_form_contact = resolveComponent("form-contact");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-us-section pt-150 lg-pt-80" }, _attrs))}><div class="container"><div class="position-relative"><div class="bg-wrapper light-bg mb-80 lg-mb-40"><div class="row"><div class="col-lg-5"><div class="d-flex flex-column flex-lg-column-reverse"><div class="row"><div class="col-md-8 col-6 me-auto ms-auto"><img${ssrRenderAttr("src", _imports_3)} alt="" class="lazy-img me-auto ms-auto"></div></div><div class="title-one text-center text-lg-start md-mt-20 mb-70 md-mb-30"><h2>求援與申訴管道</h2></div></div></div><div class="col-lg-7"><div class="form-style-one ps-xl-5">`);
  _push(ssrRenderComponent(_component_form_contact, null, null, _parent));
  _push(`</div></div></div></div><div class="row"><div class="col-12 m-auto"><div class="row"><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_0$2)} alt="" class="lazy-img"></div><h5 class="title">Our Address</h5><p>1012 Pebda Parkway, Mirpur 2 <br>Dhaka, Bangladesh</p></div></div><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_1$2)} alt="" class="lazy-img"></div><h5 class="title">Contact Info</h5><p> Open a chat or give us call at <br><a href="tel:310.841.5500" class="call text-lg fw-500">310.841.5500</a></p></div></div><div class="col-md-4"><div class="address-block-one text-center mb-40 wow fadeInUp"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_2$1)} alt="" class="lazy-img"></div><h5 class="title">Live Support</h5><p> live chat service <br><a href="#" class="webaddress">www.babunlivechat.com</a></p></div></div></div></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinus/joinus-support-area.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _imports_0 = publicAssetsURL("/images/assets/ils_01.svg");
const _imports_1 = publicAssetsURL("/images/assets/ils_02.svg");
const _imports_2 = publicAssetsURL("/images/shape/shape_05.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "join-us",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "我想使用服務 ｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_breadcrumb_one = __nuxt_component_0$2;
      const _component_joinus_about_us_two_area = __nuxt_component_1;
      const _component_joinus_faq_area_three = __nuxt_component_2;
      const _component_joinus_support_area = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_breadcrumb_one, {
        title: "我想使用服務",
        subtitle: "我想使用服務",
        page: "我想使用服務",
        bg_img: "/images/media/img_32.jpg",
        style_2: true,
        shape: "/images/shape/shape_34.svg"
      }, null, _parent));
      _push(`<div><div class="inner-banner-two light-bg text-center pt-200 md-pt-150 pb-85 lg-pb-50 position-relative"><div class="container position-relative"><div class="row"><div class="col-xl-8 col-lg-9 m-auto"><div class="tag">我想使用服務</div><h1 class="hero-heading">我想使用服務</h1><p class="text-lg">目前試辦單位還在持續累積中，各試辦單位坐落在不同服務地區，所提供的服務項目、服務時數、收費、服務特色、注意事項或有不同，請進入試辦單位介紹區有更多完整的介紹，並可點選服務。</p></div></div></div><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img shapes shape_01"><img${ssrRenderAttr("src", _imports_1)} alt="" class="lazy-img shapes shape_02"><img${ssrRenderAttr("src", _imports_2)} alt="" class="lazy-img shapes shape_03"><img${ssrRenderAttr("src", _imports_2)} alt="" class="lazy-img shapes shape_04"></div>`);
      _push(ssrRenderComponent(_component_joinus_about_us_two_area, null, null, _parent));
      _push(ssrRenderComponent(_component_joinus_faq_area_three, null, null, _parent));
      _push(ssrRenderComponent(_component_joinus_support_area, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/join-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
