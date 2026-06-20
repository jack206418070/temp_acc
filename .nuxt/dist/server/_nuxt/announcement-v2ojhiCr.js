import { u as useSeoMeta, a as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
  __name: "announcement",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "新聞報導 ｜ 多元陪伴照顧服務計畫" });
    const loading = ref(true);
    const announcements = ref([]);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-99ddb62f><h2 class="default-title" data-v-99ddb62f> 公告/新聞稿 </h2><div class="announcement-list" data-v-99ddb62f><div class="announcement-list-item first-list" data-v-99ddb62f><div class="item-date" data-v-99ddb62f>發佈日期</div><div class="item-category" data-v-99ddb62f>類別</div><div class="item-title" data-v-99ddb62f>標題</div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-container" data-v-99ddb62f><div class="loading-spinner" data-v-99ddb62f></div><p data-v-99ddb62f>載入中...</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(announcements), (announcement2) => {
          _push(`<div class="announcement-list-item" data-v-99ddb62f><div class="item-date" data-v-99ddb62f>${ssrInterpolate(formatDate(announcement2.publish_date))}</div><div class="item-category" data-v-99ddb62f>${ssrInterpolate(announcement2.category)}</div><div class="item-title" data-v-99ddb62f>`);
          if (announcement2.content.length > 10) {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/news/" + announcement2.id
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(announcement2.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(announcement2.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<a${ssrRenderAttr("href", announcement2.link)} target="_blank" data-v-99ddb62f>${ssrInterpolate(announcement2.title)}</a>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/announcement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const announcement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-99ddb62f"]]);
export {
  announcement as default
};
//# sourceMappingURL=announcement-v2ojhiCr.js.map
