import { defineComponent, ref, computed, mergeProps, useSSRContext, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$1 } from "../server.mjs";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "cookie-es";
import "destr";
import "ohash";
import "klona";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "hero-banner-empty-index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeBanner = ref(null);
    const bannerStyle = computed(() => {
      if (activeBanner.value) {
        return {
          backgroundImage: `url(data:${activeBanner.value.imageType};base64,${activeBanner.value.imageData})`,
          backgroundPosition: "center center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        };
      }
      return {};
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-banner" }, _attrs))} data-v-402dd777>`);
      if (activeBanner.value) {
        _push(`<div class="main-container home-bg" style="${ssrRenderStyle(bannerStyle.value)}" data-v-402dd777></div>`);
      } else {
        _push(`<div class="main-container home-bg" data-v-402dd777></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hero-banner/hero-banner-empty-index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-402dd777"]]);
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
            _push2(` 預約/申請 `);
          } else {
            return [
              createTextVNode(" 預約/申請 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="main-container home-content" data-v-7c8e8c2b><div class="home-top" data-v-7c8e8c2b><h2 data-v-7c8e8c2b>最新消息</h2></div>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-7c8e8c2b><div class="loading-spinner" data-v-7c8e8c2b></div><p data-v-7c8e8c2b>載入中...</p></div>`);
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
export {
  index as default
};
//# sourceMappingURL=index-CdZXShsN.js.map
