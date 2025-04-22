import { u as useSeoMeta, a as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "employment-services",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "就業服務法｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-48b53522><div class="conduct-top" data-v-48b53522><div class="conduct-block" data-v-48b53522>`);
      _push(ssrRenderComponent(_component_Nuxt_link, {
        class: "pre-link",
        href: "/company-statute"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg preserveAspectRatio="none" data-bbox="20 50.001 159.999 99.999" viewBox="20 50.001 159.999 99.999" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true" aria-label="" data-v-48b53522${_scopeId}><g data-v-48b53522${_scopeId}><path d="M26.097 143.956c8.129 8.058 21.432 8.058 29.561 0L100 100l44.342 43.957c8.129 8.058 21.432 8.058 29.561 0 8.129-8.058 8.129-21.246 0-29.304l-59.122-58.608c-8.129-8.058-21.432-8.058-29.561 0l-59.122 58.608c-8.13 8.058-8.13 21.244-.001 29.303z" data-v-48b53522${_scopeId}></path></g></svg>`);
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
      _push(`<h2 class="default-title" data-v-48b53522>就業服務法</h2></div></div><div class="conduct-content" data-v-48b53522><ul data-v-48b53522><li data-v-48b53522><a href="https://www.accompanytest.com/_files/ugd/73d1df_b63f4ce2fc9d43d2bf4577e6462ce490.pdf" target="_blank" data-v-48b53522>就業服務法檔案連結</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/employment-services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const employmentServices = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48b53522"]]);
export {
  employmentServices as default
};
//# sourceMappingURL=employment-services-BDSH_69D.js.map
