import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unhead/dist/utils.mjs';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-cc7f3a77><h2 class="default-title" data-v-cc7f3a77> \u516C\u544A/\u65B0\u805E\u7A3F </h2><div class="announcement-list" data-v-cc7f3a77><div class="announcement-list-item first-list" data-v-cc7f3a77><div class="item-date" data-v-cc7f3a77>\u767C\u4F48\u65E5\u671F</div><div class="item-category" data-v-cc7f3a77>\u985E\u5225</div><div class="item-title" data-v-cc7f3a77>\u6A19\u984C</div></div>`);
      if (unref(loading)) {
        _push(`<div class="loading-container" data-v-cc7f3a77><div class="loading-spinner" data-v-cc7f3a77></div><p data-v-cc7f3a77>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(announcements), (announcement2) => {
          _push(`<div class="announcement-list-item" data-v-cc7f3a77><div class="item-date" data-v-cc7f3a77>${ssrInterpolate(formatDate(announcement2.publish_date))}</div><div class="item-category" data-v-cc7f3a77>${ssrInterpolate(announcement2.category)}</div><div class="item-title" data-v-cc7f3a77>`);
          if (announcement2.link) {
            _push(`<a${ssrRenderAttr("href", "/news/" + announcement2.id)} target="_blank" data-v-cc7f3a77>${ssrInterpolate(announcement2.title)}</a>`);
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
const announcement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc7f3a77"]]);

export { announcement as default };
//# sourceMappingURL=announcement-D6CaCLEq.mjs.map
