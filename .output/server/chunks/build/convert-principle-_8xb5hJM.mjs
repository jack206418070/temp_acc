import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
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
  __name: "convert-principle",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u5916\u570B\u4EBA\u8F49\u63DB\u539F\u5247\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-4ad922e4><div class="conduct-top" data-v-4ad922e4><div class="conduct-block" data-v-4ad922e4>`);
      _push(ssrRenderComponent(_component_Nuxt_link, {
        class: "pre-link",
        href: "/company-statute"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg preserveAspectRatio="none" data-bbox="20 50.001 159.999 99.999" viewBox="20 50.001 159.999 99.999" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true" aria-label="" data-v-4ad922e4${_scopeId}><g data-v-4ad922e4${_scopeId}><path d="M26.097 143.956c8.129 8.058 21.432 8.058 29.561 0L100 100l44.342 43.957c8.129 8.058 21.432 8.058 29.561 0 8.129-8.058 8.129-21.246 0-29.304l-59.122-58.608c-8.129-8.058-21.432-8.058-29.561 0l-59.122 58.608c-8.13 8.058-8.13 21.244-.001 29.303z" data-v-4ad922e4${_scopeId}></path></g></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                preserveAspectRatio: "none",
                "data-bbox": "20 50.001 159.999 99.999",
                viewBox: "20 50.001 159.999 99.999",
                height: "200",
                width: "200",
                xmlns: "http://www.w3.org/2000/svg",
                "data-type": "shape",
                role: "presentation",
                "aria-hidden": "true",
                "aria-label": ""
              }, [
                createVNode("g", null, [
                  createVNode("path", { d: "M26.097 143.956c8.129 8.058 21.432 8.058 29.561 0L100 100l44.342 43.957c8.129 8.058 21.432 8.058 29.561 0 8.129-8.058 8.129-21.246 0-29.304l-59.122-58.608c-8.129-8.058-21.432-8.058-29.561 0l-59.122 58.608c-8.13 8.058-8.13 21.244-.001 29.303z" })
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="default-title" data-v-4ad922e4>\u5916\u570B\u4EBA\u8F49\u63DB\u6E96\u5247</h2></div></div><div class="conduct-content" data-v-4ad922e4><ul data-v-4ad922e4><li data-v-4ad922e4><a href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090023" target="_blank" data-v-4ad922e4>\u5916\u570B\u4EBA\u8F49\u63DB\u6E96\u5247\u9023\u7D50</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/convert-principle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const convertPrinciple = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ad922e4"]]);

export { convertPrinciple as default };
//# sourceMappingURL=convert-principle-_8xb5hJM.mjs.map
