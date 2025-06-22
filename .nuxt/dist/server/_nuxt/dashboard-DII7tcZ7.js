import { _ as _export_sfc, e as useRouter, a as __nuxt_component_0 } from "../server.mjs";
import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
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
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-2aba6e09><nav class="admin-nav" data-v-2aba6e09><div class="nav-content" data-v-2aba6e09><h1 data-v-2aba6e09>後台管理系統</h1><div class="nav-right" data-v-2aba6e09><span class="welcome-text" data-v-2aba6e09>歡迎，${ssrInterpolate(unref(username))}</span><button class="btn btn-danger" data-v-2aba6e09>登出</button></div></div></nav><div class="admin-container" data-v-2aba6e09><div class="dashboard-grid" data-v-2aba6e09>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/qa",
        class: "dashboard-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>📝</div><h3 data-v-2aba6e09${_scopeId}>問答管理</h3><p data-v-2aba6e09${_scopeId}>管理網站常見問題</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "📝"),
              createVNode("h3", null, "問答管理"),
              createVNode("p", null, "管理網站常見問題")
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
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>📚</div><h3 data-v-2aba6e09${_scopeId}>知識庫管理</h3><p data-v-2aba6e09${_scopeId}>管理知識庫圖片</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "📚"),
              createVNode("h3", null, "知識庫管理"),
              createVNode("p", null, "管理知識庫圖片")
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
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>🏢</div><h3 data-v-2aba6e09${_scopeId}>服務單位管理</h3><p data-v-2aba6e09${_scopeId}>管理服務單位資訊</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "🏢"),
              createVNode("h3", null, "服務單位管理"),
              createVNode("p", null, "管理服務單位資訊")
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
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>📢</div><h3 data-v-2aba6e09${_scopeId}>公告管理</h3><p data-v-2aba6e09${_scopeId}>管理網站公告內容</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "📢"),
              createVNode("h3", null, "公告管理"),
              createVNode("p", null, "管理網站公告內容")
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
            _push2(`<div class="card-icon" data-v-2aba6e09${_scopeId}>🖼️</div><h3 data-v-2aba6e09${_scopeId}>Banner 管理</h3><p data-v-2aba6e09${_scopeId}>管理首頁輪播圖片</p>`);
          } else {
            return [
              createVNode("div", { class: "card-icon" }, "🖼️"),
              createVNode("h3", null, "Banner 管理"),
              createVNode("p", null, "管理首頁輪播圖片")
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
export {
  dashboard as default
};
