import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
import '../nitro/nitro.mjs';
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
  __name: "application-form",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u7533\u8ACB\u8868\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-a0e3bd87><h2 class="default-title" data-v-a0e3bd87> \u586B\u5BEB\u7533\u8ACB\u8868 </h2><p data-v-a0e3bd87>\u7DDA\u4E0A\u7533\u8ACB\u7CFB\u7D71\u65BC\u672A\u4F86\u8A08\u756B\u64F4\u5145\u6642\u5EFA\u7F6E</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/application-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const applicationForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0e3bd87"]]);

export { applicationForm as default };
//# sourceMappingURL=application-form-D-2ct_Nu.mjs.map
