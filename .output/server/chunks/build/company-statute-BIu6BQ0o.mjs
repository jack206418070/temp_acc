import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
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
  __name: "company-statute",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u591A\u5143\u966A\u4F34\u6CD5\u898F\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container company-statute" }, _attrs))} data-v-97e89cc4><h2 class="default-title company-title" data-v-97e89cc4>\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u6CD5\u898F</h2><div class="comapny-statute-list" data-v-97e89cc4><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>01</div><div class="item-desc" data-v-97e89cc4>`);
      _push(ssrRenderComponent(_component_Nuxt_link, { href: "/conduct-plan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B`);
          } else {
            return [
              createTextVNode("\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>02</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090001" target="_blank" data-v-97e89cc4>\u5C31\u696D\u670D\u52D9\u6CD5</a></div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>03</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090029" target="_blank" data-v-97e89cc4>\u5916\u570B\u4EBA\u5F9E\u4E8B\u5C31\u696D\u670D\u52D9\u6CD5\u7B2C\u56DB\u5341\u516D\u689D\u7B2C\u4E00\u9805\u7B2C\u516B\u6B3E\u81F3\u7B2C\u5341\u4E00\u6B3E\u5DE5\u4F5C\u8CC7\u683C\u53CA\u5BE9\u67E5\u6A19\u6E96(\u85CD\u9818\u5BE9\u67E5\u6A19\u6E96)</a></div></div><div class="comapny-statute-list-item" data-v-97e89cc4><div class="item-number" data-v-97e89cc4>04</div><div class="item-desc" data-v-97e89cc4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090023" target="_blank" data-v-97e89cc4>\u5916\u570B\u4EBA\u53D7\u8058\u50F1\u5F9E\u4E8B\u5C31\u696D\u670D\u52D9\u6CD5\u7B2C\u56DB\u5341\u516D\u689D\u7B2C\u4E00\u9805\u7B2C\u516B\u6B3E\u81F3\u7B2C\u5341\u4E00\u6B3E\u898F\u5B9A\u5DE5\u4F5C\u4E4B\u8F49\u63DB\u96C7\u4E3B\u6216\u5DE5\u4F5C\u7A0B\u5E8F\u6E96\u5247(\u5916\u570B\u4EBA\u8F49\u63DB\u6E96\u5247)</a></div></div></div></div>`);
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

export { companyStatute as default };
//# sourceMappingURL=company-statute-BIu6BQ0o.mjs.map
