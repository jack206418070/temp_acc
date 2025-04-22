import { _ as _export_sfc, a as __nuxt_component_0, d as __nuxt_component_0$1 } from "../server.mjs";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./back-to-top-BKwl0tkS.js";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
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
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer-one" }, _attrs))}><div class="main-container"><div class="footer-content"><div class="footer-info"><p>勞動部勞動力發展署<br> 地址：24219新北市新莊區中平路439號南棟4樓 <br> 電話：1955 <br>服務時間：全年無休 </p><div class="footer-line"></div><p>多元陪伴照顧服務專案辦公室 <br>地址：114004臺北市內湖區內湖路一段427號2樓 <br> 電話：(02)7756-2580 <br>服務時間：週一至週五上午8時30分至12時30分，下午1時30分至5時30分</p></div><ul class="footer-link"><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`首頁`);
      } else {
        return [
          createTextVNode("首頁")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/about-us" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`計畫簡介`);
      } else {
        return [
          createTextVNode("計畫簡介")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/news" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`最新消息`);
      } else {
        return [
          createTextVNode("最新消息")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/services" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`預約服務`);
      } else {
        return [
          createTextVNode("預約服務")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/join-us-unit" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`試辦單位`);
      } else {
        return [
          createTextVNode("試辦單位")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/faq" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`常見問題`);
      } else {
        return [
          createTextVNode("常見問題")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/contact" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`聯絡我們`);
      } else {
        return [
          createTextVNode("聯絡我們")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_nuxt_link, { href: "/links" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`相關網站連結`);
      } else {
        return [
          createTextVNode("相關網站連結")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="main-container"><div class="bottom-footer"><p class="copyright" style="${ssrRenderStyle({ "padding-bottom": "0px", "margin-bottom": "0px" })}">為提供更為穩定的瀏覽品質與使用體驗，建議更新瀏覽器至以下版本：最新版本Edge、最新版本Chrome、最新版本Firefox<br>最佳解析度1024*768以上 </p><div class="copyright" style="${ssrRenderStyle({ "padding-top": "10px" })}">Copyright @${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} 勞動力發展署版權所有，保留所有權利。</div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/footer-two.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_header_one = __nuxt_component_0$1;
  const _component_footer_two = __nuxt_component_1;
  const _component_back_to_top = _sfc_main$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-page-wrapper" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_header_one, null, null, _parent));
  _push(`<main class="default-padding">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_footer_two, null, null, _parent));
  _push(ssrRenderComponent(_component_back_to_top, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-BsB9y4qf.js.map
