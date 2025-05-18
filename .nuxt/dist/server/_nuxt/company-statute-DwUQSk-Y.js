import { u as useSeoMeta, a as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "company-statute",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "多元陪伴法規｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container company-statute" }, _attrs))} data-v-d3799dd7><h2 class="default-title company-title" data-v-d3799dd7>多元陪伴照顧服務法規</h2><div class="comapny-statute-list" data-v-d3799dd7><div class="comapny-statute-list-item" data-v-d3799dd7><div class="item-number" data-v-d3799dd7>01</div><div class="item-desc" data-v-d3799dd7>`);
      _push(ssrRenderComponent(_component_Nuxt_link, { href: "/conduct-plan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`多元陪伴照顧服務試辦計畫`);
          } else {
            return [
              createTextVNode("多元陪伴照顧服務試辦計畫")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="comapny-statute-list-item" data-v-d3799dd7><div class="item-number" data-v-d3799dd7>02</div><div class="item-desc" data-v-d3799dd7>`);
      _push(ssrRenderComponent(_component_Nuxt_link, { href: "/employment-services" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`就業服務法`);
          } else {
            return [
              createTextVNode("就業服務法")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="comapny-statute-list-item" data-v-d3799dd7><div class="item-number" data-v-d3799dd7>03</div><div class="item-desc" data-v-d3799dd7>`);
      _push(ssrRenderComponent(_component_Nuxt_link, { href: "/censor-standard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`外國人從事就業服務法第四十六條第一項第八款至第十一款工作資格及審查標準(藍領審查標準)`);
          } else {
            return [
              createTextVNode("外國人從事就業服務法第四十六條第一項第八款至第十一款工作資格及審查標準(藍領審查標準)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="comapny-statute-list-item" data-v-d3799dd7><div class="item-number" data-v-d3799dd7>04</div><div class="item-desc" data-v-d3799dd7>`);
      _push(ssrRenderComponent(_component_Nuxt_link, { href: "/convert-principle" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`外國人受聘僱從事就業服務法第四十六條第一項第八款至第十一款規定工作之轉換雇主或工作程序準則(外國人轉換準則)`);
          } else {
            return [
              createTextVNode("外國人受聘僱從事就業服務法第四十六條第一項第八款至第十一款規定工作之轉換雇主或工作程序準則(外國人轉換準則)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/company-statute.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const companyStatute = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d3799dd7"]]);
export {
  companyStatute as default
};
//# sourceMappingURL=company-statute-DwUQSk-Y.js.map
