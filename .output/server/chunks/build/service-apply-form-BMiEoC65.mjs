import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-apply-form",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u55AE\u4F4D\u7533\u8ACB\u8868" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-1dc3cef7><h2 class="default-title apply-title" data-v-1dc3cef7>\u7533\u8ACB\u8868</h2><div class="apply-block" data-v-1dc3cef7><ul data-v-1dc3cef7><li data-v-1dc3cef7><a href="https://www.accompanytest.com/_files/ugd/73d1df_4c0323ab00d94bcdadc7b22ee919d34e.docx?dn=%E5%A4%9A%E5%85%83%E9%99%AA%E4%BC%B4%E7%85%A7%E9%A1%A7%E6%9C%8D%E5%8B%99-%E8%A9%A6%E8%BE%A6%E5%96%AE%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%A1%A8.docx" data-v-1dc3cef7>\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u55AE\u4F4D\u7533\u8ACB\u8868</a><br data-v-1dc3cef7>(\u50C5\u65BC\u516C\u544A\u53D7\u7406\u671F\u9593\u958B\u653E)</li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-apply-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const serviceApplyForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1dc3cef7"]]);

export { serviceApplyForm as default };
//# sourceMappingURL=service-apply-form-BMiEoC65.mjs.map
