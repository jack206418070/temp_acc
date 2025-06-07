import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$1 } from "../server.mjs";
import "C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
    useSeoMeta({ title: "首頁｜多元陪伴照顧服務" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_hero_banner_empty_index = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d15f90e8>`);
      _push(ssrRenderComponent(_component_hero_banner_empty_index, null, null, _parent));
      _push(`<div data-v-d15f90e8>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "book-btn btn-one jelly-box",
        id: "jelly-box",
        href: "https://serve-mcs.wda.gov.tw"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 預約/申請 `);
          } else {
            return [
              createTextVNode(" 預約/申請 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><iframe width="560" height="315" src="https://www.youtube.com/embed/OxRL7eKReVQ?si=hhulgueBNpIueGKd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-d15f90e8></iframe><div class="main-container home-content" data-v-d15f90e8><div class="home-top" data-v-d15f90e8><h2 data-v-d15f90e8>最新消息</h2></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-d15f90e8><div class="loading-spinner" data-v-d15f90e8></div><p data-v-d15f90e8>載入中...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-d15f90e8><p data-v-d15f90e8>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="home-new" data-v-d15f90e8><!--[-->`);
        ssrRenderList(announcements.value, (announcement) => {
          _push(`<div class="new-item" data-v-d15f90e8><div class="new-title" data-v-d15f90e8><div class="title-text" data-v-d15f90e8>${ssrInterpolate(announcement.category)}</div><div class="title-date" data-v-d15f90e8>${ssrInterpolate(formatDate(announcement.publish_date))}</div></div><div class="new-link" data-v-d15f90e8>`);
          if (announcement.content.length > 10) {
            _push(`<a${ssrRenderAttr("href", "/news/" + announcement.id)} data-v-d15f90e8>${ssrInterpolate(announcement.title)}</a>`);
          } else {
            _push(`<a${ssrRenderAttr("href", announcement.link)} target="_blank" data-v-d15f90e8>${ssrInterpolate(announcement.title)}</a>`);
          }
          _push(`</div><div class="item-line" data-v-d15f90e8></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d15f90e8"]]);
export {
  index as default
};
//# sourceMappingURL=index-BgX5rol7.js.map
