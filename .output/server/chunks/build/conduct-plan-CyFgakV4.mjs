import { _ as _export_sfc, u as useSeoMeta, a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "conduct-plan",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-fb84ade8><div class="conduct-top" data-v-fb84ade8><div class="conduct-block" data-v-fb84ade8>`);
      _push(ssrRenderComponent(_component_Nuxt_link, {
        class: "pre-link",
        href: "/company-statute"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg preserveAspectRatio="none" data-bbox="20 50.001 159.999 99.999" viewBox="20 50.001 159.999 99.999" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true" aria-label="" data-v-fb84ade8${_scopeId}><g data-v-fb84ade8${_scopeId}><path d="M26.097 143.956c8.129 8.058 21.432 8.058 29.561 0L100 100l44.342 43.957c8.129 8.058 21.432 8.058 29.561 0 8.129-8.058 8.129-21.246 0-29.304l-59.122-58.608c-8.129-8.058-21.432-8.058-29.561 0l-59.122 58.608c-8.13 8.058-8.13 21.244-.001 29.303z" data-v-fb84ade8${_scopeId}></path></g></svg>`);
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
      _push(`<h2 class="default-title" data-v-fb84ade8>\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B</h2></div></div><div class="conduct-content" data-v-fb84ade8><ul data-v-fb84ade8><li data-v-fb84ade8><a href="https://www.accompanytest.com/_files/ugd/73d1df_bed4090d122c498cba9bbaba31c3ad7a.pdf" target="_blank" data-v-fb84ade8>\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u6A94\u6848\u9023\u7D50</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/conduct-plan.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const conductPlan = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb84ade8"]]);

export { conductPlan as default };
//# sourceMappingURL=conduct-plan-CyFgakV4.mjs.map
