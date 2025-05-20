import { defineComponent, ref, withCtx, createTextVNode, mergeProps, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { Swiper, SwiperSlide } from 'file://C:/inetpub/accompany-web-site/node_modules/swiper/swiper-vue.mjs';
import { Autoplay, Pagination, Navigation } from 'file://C:/inetpub/accompany-web-site/node_modules/swiper/modules/index.mjs';
import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "hero-banner-empty-index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeBanners = ref([]);
    const SwiperAutoplay = Autoplay;
    const SwiperPagination = Pagination;
    const SwiperNavigation = Navigation;
    const getBannerStyle = (banner) => {
      return {
        backgroundImage: `url(data:${banner.imageType};base64,${banner.imageData})`,
        backgroundPosition: "center center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-banner" }, _attrs))} data-v-b491b69e><div class="main-container" data-v-b491b69e>`);
      if (activeBanners.value.length > 0) {
        _push(ssrRenderComponent(unref(Swiper), {
          modules: [unref(SwiperAutoplay), unref(SwiperPagination), unref(SwiperNavigation)],
          "slides-per-view": 1,
          loop: true,
          autoplay: {
            delay: 5e3,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true
          },
          navigation: true,
          class: "banner-swiper"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(activeBanners.value, (banner) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: banner.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="home-bg" style="${ssrRenderStyle(getBannerStyle(banner))}" data-v-b491b69e${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: "home-bg",
                          style: getBannerStyle(banner)
                        }, null, 4)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(activeBanners.value, (banner) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: banner.id
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "home-bg",
                        style: getBannerStyle(banner)
                      }, null, 4)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="home-bg" data-v-b491b69e></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hero-banner/hero-banner-empty-index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b491b69e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const announcements = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    useSeoMeta({ title: "\u9996\u9801\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_hero_banner_empty_index = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-afb7855e>`);
      _push(ssrRenderComponent(_component_hero_banner_empty_index, null, null, _parent));
      _push(`<div data-v-afb7855e>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "book-btn btn-one jelly-box",
        id: "jelly-box",
        href: "https://serve-mcs.wda.gov.tw"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u9810\u7D04/\u7533\u8ACB `);
          } else {
            return [
              createTextVNode(" \u9810\u7D04/\u7533\u8ACB ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><iframe width="560" height="315" src="https://www.youtube.com/embed/OxRL7eKReVQ?si=hhulgueBNpIueGKd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-afb7855e></iframe><div class="main-container home-content" data-v-afb7855e><div class="home-top" data-v-afb7855e><h2 data-v-afb7855e>\u6700\u65B0\u6D88\u606F</h2></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-afb7855e><div class="loading-spinner" data-v-afb7855e></div><p data-v-afb7855e>\u8F09\u5165\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-afb7855e><p data-v-afb7855e>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="home-new" data-v-afb7855e><!--[-->`);
        ssrRenderList(announcements.value, (announcement) => {
          _push(`<div class="new-item" data-v-afb7855e><div class="new-title" data-v-afb7855e><div class="title-text" data-v-afb7855e>${ssrInterpolate(announcement.category)}</div><div class="title-date" data-v-afb7855e>${ssrInterpolate(formatDate(announcement.publish_date))}</div></div><div class="new-link" data-v-afb7855e><a${ssrRenderAttr("href", "/news/" + announcement.id)} data-v-afb7855e>${ssrInterpolate(announcement.title)}</a></div><div class="item-line" data-v-afb7855e></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-afb7855e"]]);

export { index as default };
//# sourceMappingURL=index-LIhiYYsn.mjs.map
