import { u as useSeoMeta, a as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/inetpub/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "company-statute",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "多元陪伴法規｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container company-statute" }, _attrs))} data-v-97e89cc4><h2 class="default-title company-title" data-v-97e89cc4>多元陪伴照顧服務法規</h2><div class="comapny-statute-list" data-v-97e89cc4><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>01</div><div class="item-desc" data-v-97e89cc4>`);
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
      _push(`</div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>02</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090001" target="_blank" data-v-97e89cc4>就業服務法</a></div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>03</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090029" target="_blank" data-v-97e89cc4>外國人從事就業服務法第四十六條第一項第八款至第十一款工作資格及審查標準(藍領審查標準)</a></div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>04</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090023" target="_blank" data-v-97e89cc4>外國人受聘僱從事就業服務法第四十六條第一項第八款至第十一款規定工作之轉換雇主或工作程序準則(外國人轉換準則)</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/company-statute.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const companyStatute = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97e89cc4"]]);
export {
  companyStatute as default
};
//# sourceMappingURL=company-statute-DEwCJEF5.js.map
