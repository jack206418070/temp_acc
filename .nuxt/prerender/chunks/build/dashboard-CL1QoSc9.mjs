import { _ as _export_sfc, b as useRouter, a as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/c3d19/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/utils.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-2aba6e09><nav class="admin-nav" data-v-2aba6e09><div class="nav-content" data-v-2aba6e09><h1 data-v-2aba6e09>\u5F8C\u53F0\u7BA1\u7406\u7CFB\u7D71</h1><div class="nav-right" data-v-2aba6e09><span class="welcome-text" data-v-2aba6e09>\u6B61\u8FCE\uFF0C${ssrInterpolate(unref(username))}</span><button class="btn btn-danger" data-v-2aba6e09>\u767B\u51FA</button></div></div></nav><div class="admin-container" data-v-2aba6e09><div class="dashboard-grid" data-v-2aba6e09>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/qa",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>\u{1F4DD}</div><h3 data-v-2aba6e09${_scopeId}>\u554F\u7B54\u7BA1\u7406</h3><p data-v-2aba6e09${_scopeId}>\u7BA1\u7406\u7DB2\u7AD9\u5E38\u898B\u554F\u984C</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "\u{1F4DD}"),
              createVNode("h3", null, "\u554F\u7B54\u7BA1\u7406"),
              createVNode("p", null, "\u7BA1\u7406\u7DB2\u7AD9\u5E38\u898B\u554F\u984C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/knowledge",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>\u{1F4DA}</div><h3 data-v-2aba6e09${_scopeId}>\u77E5\u8B58\u5EAB\u7BA1\u7406</h3><p data-v-2aba6e09${_scopeId}>\u7BA1\u7406\u77E5\u8B58\u5EAB\u5716\u7247</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "\u{1F4DA}"),
              createVNode("h3", null, "\u77E5\u8B58\u5EAB\u7BA1\u7406"),
              createVNode("p", null, "\u7BA1\u7406\u77E5\u8B58\u5EAB\u5716\u7247")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/service-unit",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>\u{1F3E2}</div><h3 data-v-2aba6e09${_scopeId}>\u670D\u52D9\u55AE\u4F4D\u7BA1\u7406</h3><p data-v-2aba6e09${_scopeId}>\u7BA1\u7406\u670D\u52D9\u55AE\u4F4D\u8CC7\u8A0A</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "\u{1F3E2}"),
              createVNode("h3", null, "\u670D\u52D9\u55AE\u4F4D\u7BA1\u7406"),
              createVNode("p", null, "\u7BA1\u7406\u670D\u52D9\u55AE\u4F4D\u8CC7\u8A0A")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/announcements",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>\u{1F4E2}</div><h3 data-v-2aba6e09${_scopeId}>\u516C\u544A\u7BA1\u7406</h3><p data-v-2aba6e09${_scopeId}>\u7BA1\u7406\u7DB2\u7AD9\u516C\u544A\u5167\u5BB9</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "\u{1F4E2}"),
              createVNode("h3", null, "\u516C\u544A\u7BA1\u7406"),
              createVNode("p", null, "\u7BA1\u7406\u7DB2\u7AD9\u516C\u544A\u5167\u5BB9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/banners",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>\u{1F5BC}\uFE0F</div><h3 data-v-2aba6e09${_scopeId}>Banner \u7BA1\u7406</h3><p data-v-2aba6e09${_scopeId}>\u7BA1\u7406\u9996\u9801\u8F2A\u64AD\u5716\u7247</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "\u{1F5BC}\uFE0F"),
              createVNode("h3", null, "Banner \u7BA1\u7406"),
              createVNode("p", null, "\u7BA1\u7406\u9996\u9801\u8F2A\u64AD\u5716\u7247")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2aba6e09"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-CL1QoSc9.mjs.map
