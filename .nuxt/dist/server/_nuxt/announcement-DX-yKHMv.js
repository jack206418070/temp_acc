import { u as useSeoMeta, a as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-c1969895><h2 class="default-title" data-v-c1969895> 公告/新聞稿 </h2><div class="announcement-list" data-v-c1969895><div class="announcement-list-item first-list" data-v-c1969895><div class="item-date" data-v-c1969895>發佈日期</div><div class="item-category" data-v-c1969895>類別</div><div class="item-title" data-v-c1969895>標題</div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-container" data-v-c1969895><div class="loading-spinner" data-v-c1969895></div><p data-v-c1969895>載入中...</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(announcements), (announcement2) => {
          _push(`<div class="announcement-list-item" data-v-c1969895><div class="item-date" data-v-c1969895>${ssrInterpolate(formatDate(announcement2.publish_date))}</div><div class="item-category" data-v-c1969895>${ssrInterpolate(announcement2.category)}</div><div class="item-title" data-v-c1969895>`);
          if (announcement2.link) {
            _push(`<a${ssrRenderAttr("href", "/news/" + announcement2.id)} target="_blank" data-v-c1969895>${ssrInterpolate(announcement2.title)}</a>`);
          } else {
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
const announcement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1969895"]]);
export {
  announcement as default
};
//# sourceMappingURL=announcement-DX-yKHMv.js.map
