import { defineComponent, ref, withCtx, createTextVNode, mergeProps, unref, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import '../nitro/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:crypto';
import 'node:url';
import 'express';
import 'xss';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-7c8e8c2b>`);
      _push(ssrRenderComponent(_component_hero_banner_empty_index, null, null, _parent));
      _push(`<div data-v-7c8e8c2b>`);
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
      _push(`</div><div class="main-container home-content" data-v-7c8e8c2b><div class="home-top" data-v-7c8e8c2b><h2 data-v-7c8e8c2b>\u6700\u65B0\u6D88\u606F</h2></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-7c8e8c2b><div class="loading-spinner" data-v-7c8e8c2b></div><p data-v-7c8e8c2b>\u8F09\u5165\u4E2D...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-7c8e8c2b><p data-v-7c8e8c2b>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="home-new" data-v-7c8e8c2b><!--[-->`);
        ssrRenderList(announcements.value, (announcement) => {
          _push(`<div class="new-item" data-v-7c8e8c2b><div class="new-title" data-v-7c8e8c2b><div class="title-text" data-v-7c8e8c2b>${ssrInterpolate(announcement.category)}</div><div class="title-date" data-v-7c8e8c2b>${ssrInterpolate(formatDate(announcement.publish_date))}</div></div><div class="new-link" data-v-7c8e8c2b><a${ssrRenderAttr("href", "/news/" + announcement.id)} data-v-7c8e8c2b>${ssrInterpolate(announcement.title)}</a></div><div class="item-line" data-v-7c8e8c2b></div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c8e8c2b"]]);

export { index as default };
//# sourceMappingURL=index-YY_z735S.mjs.map
