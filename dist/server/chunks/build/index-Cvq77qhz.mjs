import { _ as _export_sfc, a as useRouter, b as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-6b600389><nav class="admin-nav" data-v-6b600389><div class="nav-content" data-v-6b600389><h1 data-v-6b600389>\u5F8C\u53F0\u7BA1\u7406\u7CFB\u7D71</h1><div class="nav-right" data-v-6b600389><span class="welcome-text" data-v-6b600389>\u6B61\u8FCE\uFF0C${ssrInterpolate(unref(username))}</span><button class="btn btn-danger" data-v-6b600389>\u767B\u51FA</button></div></div></nav><div class="admin-container" data-v-6b600389><div class="dashboard-grid" data-v-6b600389>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/qa_setting",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-6b600389${_scopeId}>\u{1F4DD}</div><h3 data-v-6b600389${_scopeId}>\u554F\u7B54\u7BA1\u7406</h3><p data-v-6b600389${_scopeId}>\u7BA1\u7406\u7DB2\u7AD9\u5E38\u898B\u554F\u984C</p>`);
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
            _push2(`<div class="card-icon" data-v-6b600389${_scopeId}>\u{1F4DA}</div><h3 data-v-6b600389${_scopeId}>\u77E5\u8B58\u5EAB\u7BA1\u7406</h3><p data-v-6b600389${_scopeId}>\u7BA1\u7406\u77E5\u8B58\u5EAB\u5716\u7247</p>`);
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
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6b600389"]]);

export { index as default };
//# sourceMappingURL=index-Cvq77qhz.mjs.map
