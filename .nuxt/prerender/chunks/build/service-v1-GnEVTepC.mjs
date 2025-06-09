import { _ as __nuxt_component_0 } from './breadcrumb-one-DppbJmMF.mjs';
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';
import { Swiper, SwiperSlide } from 'file://C:/inetpub/accompany-web-site/node_modules/swiper/swiper-vue.mjs';
import { EffectFade } from 'file://C:/inetpub/accompany-web-site/node_modules/swiper/modules/index.mjs';
import { _ as __nuxt_component_2 } from './fancy-banner-three-DTRdL-2N.mjs';
import { _ as __nuxt_component_3 } from './newsletter-one-CM5veuBn.mjs';
import { u as useSeoMeta } from './server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

const _imports_0 = publicAssetsURL("/images/icon/icon_12.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "feedback-two",
  __ssrInlineRender: true,
  props: {
    spacing: {}
  },
  setup(__props) {
    const feedback_data = [
      {
        id: 1,
        user: "/images/media/img_08.jpg",
        name: "John Smith",
        location: "CEO & Head of Sky Tech Inc.",
        desc: `"Efficient problem-solving, insightful market analysis, and actionable plans made the consulting experience invaluable to our business's success."`
      },
      {
        id: 2,
        user: "/images/media/img_08.jpg",
        name: "Mark John",
        location: "CEO & Head of Apple Tech Inc.",
        desc: `"Lorem ipsum, dolor sit amet consectetur elit. Asperiores unde inventore tenetur. Accusantium tenetur id cupiditate quibusdam."`
      },
      {
        id: 3,
        user: "/images/media/img_08.jpg",
        name: "James Bond.",
        location: "CEO & Head of Pixel Tech Inc.",
        desc: `"Efficient problem-solving, insightful market analysis, and actionable plans made the consulting experience invaluable to our business's success."`
      }
    ];
    const slider_setting = {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `feedback-section-one ${_ctx.spacing ? _ctx.spacing : "mt-150 lg-mt-80 pb-80"}`
      }, _attrs))}><div class="container"><div class="position-relative"><div class="title-one sm-mb-40"><h2>Words from <br> clients.</h2></div>`);
      _push(ssrRenderComponent(unref(Swiper), mergeProps(slider_setting, {
        effect: "fade",
        modules: [unref(EffectFade)],
        fadeEffect: { crossFade: true },
        class: "feedback-slider-one"
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(feedback_data, (item) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: item.id,
                class: "item"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="feedback-block-one"${_scopeId2}><div class="row align-items-end"${_scopeId2}><div class="col-md-7 ms-auto order-md-last"${_scopeId2}><blockquote${_scopeId2}>${ssrInterpolate(item.desc)}</blockquote><div class="d-flex align-items-center"${_scopeId2}><img${ssrRenderAttr("src", item.user)} alt="" class="avatar rounded-circle"${_scopeId2}><div class="ps-4"${_scopeId2}><div class="name fw-bold text-dark"${_scopeId2}>${ssrInterpolate(item.name)}</div><p class="fs-6 m0"${_scopeId2}>${ssrInterpolate(item.location)}</p></div></div></div><div class="col-md-4 order-md-first"${_scopeId2}><div class="d-flex align-items-center justify-content-between sm-mt-40"${_scopeId2}><div class="line"${_scopeId2}></div><div class="count fw-500"${_scopeId2}><span className="text-dark"${_scopeId2}>${ssrInterpolate(item.id < 10 ? `0${item.id}` : item.id)}</span> / ${ssrInterpolate(feedback_data.length < 10 ? `0${feedback_data.length}` : feedback_data.length)}</div></div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "feedback-block-one" }, [
                        createVNode("div", { class: "row align-items-end" }, [
                          createVNode("div", { class: "col-md-7 ms-auto order-md-last" }, [
                            createVNode("blockquote", null, toDisplayString(item.desc), 1),
                            createVNode("div", { class: "d-flex align-items-center" }, [
                              createVNode("img", {
                                src: item.user,
                                alt: "",
                                class: "avatar rounded-circle"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "ps-4" }, [
                                createVNode("div", { class: "name fw-bold text-dark" }, toDisplayString(item.name), 1),
                                createVNode("p", { class: "fs-6 m0" }, toDisplayString(item.location), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4 order-md-first" }, [
                            createVNode("div", { class: "d-flex align-items-center justify-content-between sm-mt-40" }, [
                              createVNode("div", { class: "line" }),
                              createVNode("div", { class: "count fw-500" }, [
                                createVNode("span", { className: "text-dark" }, toDisplayString(item.id < 10 ? `0${item.id}` : item.id), 1),
                                createTextVNode(" / " + toDisplayString(feedback_data.length < 10 ? `0${feedback_data.length}` : feedback_data.length), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(feedback_data, (item) => {
                return createVNode(unref(SwiperSlide), {
                  key: item.id,
                  class: "item"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "feedback-block-one" }, [
                      createVNode("div", { class: "row align-items-end" }, [
                        createVNode("div", { class: "col-md-7 ms-auto order-md-last" }, [
                          createVNode("blockquote", null, toDisplayString(item.desc), 1),
                          createVNode("div", { class: "d-flex align-items-center" }, [
                            createVNode("img", {
                              src: item.user,
                              alt: "",
                              class: "avatar rounded-circle"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "ps-4" }, [
                              createVNode("div", { class: "name fw-bold text-dark" }, toDisplayString(item.name), 1),
                              createVNode("p", { class: "fs-6 m0" }, toDisplayString(item.location), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-md-4 order-md-first" }, [
                          createVNode("div", { class: "d-flex align-items-center justify-content-between sm-mt-40" }, [
                            createVNode("div", { class: "line" }),
                            createVNode("div", { class: "count fw-500" }, [
                              createVNode("span", { className: "text-dark" }, toDisplayString(item.id < 10 ? `0${item.id}` : item.id), 1),
                              createTextVNode(" / " + toDisplayString(feedback_data.length < 10 ? `0${feedback_data.length}` : feedback_data.length), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="icon d-flex align-items-center justify-content-center rounded-circle"><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img"></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/feedback/feedback-two.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-v1",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "Service v1 - Babun" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_breadcrumb_one = __nuxt_component_0;
      const _component_service_v1_area = resolveComponent("service-v1-area");
      const _component_feedback_two = _sfc_main$1;
      const _component_partner_slider_one = resolveComponent("partner-slider-one");
      const _component_fancy_banner_five = resolveComponent("fancy-banner-five");
      const _component_faq_area_one = resolveComponent("faq-area-one");
      const _component_fancy_banner_three = __nuxt_component_2;
      const _component_newsletter_one = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_breadcrumb_one, {
        title: "Our offerings & Services",
        subtitle: "Offering solutions & services to address a spectrum of financial issues",
        page: "Services",
        bg_img: "/images/media/img_32.jpg",
        style_2: true,
        cls: "me-xxl-4 me-lg-5"
      }, null, _parent));
      _push(ssrRenderComponent(_component_service_v1_area, null, null, _parent));
      _push(ssrRenderComponent(_component_feedback_two, { spacing: "pt-120 pb-120" }, null, _parent));
      _push(`<div class="partner-logo-one pt-80 lg-pt-50 pb-80 lg-pb-50"><div class="container">`);
      _push(ssrRenderComponent(_component_partner_slider_one, null, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_fancy_banner_five, { style_2: true }, null, _parent));
      _push(ssrRenderComponent(_component_faq_area_one, { spacing: "mt-150 lg-mt-80 mb-150 lg-mb-80" }, null, _parent));
      _push(ssrRenderComponent(_component_fancy_banner_three, null, null, _parent));
      _push(ssrRenderComponent(_component_newsletter_one, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-v1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=service-v1-GnEVTepC.mjs.map
