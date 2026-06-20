import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "announcement",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u65B0\u805E\u5831\u5C0E \uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    const loading = ref(true);
    const announcements = ref([]);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-9329513d><h2 class="default-title" data-v-9329513d> \u516C\u544A/\u65B0\u805E\u7A3F </h2><div class="announcement-list" data-v-9329513d><div class="announcement-list-item first-list" data-v-9329513d><div class="item-date" data-v-9329513d>\u767C\u4F48\u65E5\u671F</div><div class="item-category" data-v-9329513d>\u985E\u5225</div><div class="item-title" data-v-9329513d>\u6A19\u984C</div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-container" data-v-9329513d><div class="loading-spinner" data-v-9329513d></div><p data-v-9329513d>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(announcements), (announcement2) => {
          _push(`<div class="announcement-list-item" data-v-9329513d><div class="item-date" data-v-9329513d>${ssrInterpolate(formatDate(announcement2.publish_date))}</div><div class="item-category" data-v-9329513d>${ssrInterpolate(announcement2.category)}</div><div class="item-title" data-v-9329513d>`);
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
            _push(`<a${ssrRenderAttr("href", announcement2.link)} target="_blank" data-v-9329513d>${ssrInterpolate(announcement2.title)}</a>`);
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
const announcement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9329513d"]]);

export { announcement as default };
//# sourceMappingURL=announcement-DJW5wUAL.mjs.map
