import { _ as __nuxt_component_0 } from './service-unit-list-area-CTGb3nc5.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "service-details-area",
  __ssrInlineRender: true,
  setup(__props) {
    const reminder_data = ref("");
    const decode = (str) => {
      const txt = (void 0).createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-b93215d9><div class="" data-v-b93215d9><div class="details-meta ps-xxl-5 ps-xl-3" data-v-b93215d9><div class="reminder-block" data-v-b93215d9>${(_a = decode(reminder_data.value)) != null ? _a : ""}</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-details-area.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b93215d9"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u670D\u52D9\u4ECB\u7D39 - \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_service_unit_list_area = __nuxt_component_0;
      const _component_service_details_area = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d6dd2e35><div class="service-banner" data-v-d6dd2e35><div class="main-container" data-v-d6dd2e35><h2 class="default-title" data-v-d6dd2e35> \u8A66\u8FA6\u55AE\u4F4D\u7C21\u4ECB </h2><p data-v-d6dd2e35>\u7D93\u52DE\u52D5\u90E8\u8A55\u9078\u6838\u5B9A\u70BA\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u4E4B\u8A66\u8FA6\u55AE\u4F4D\uFF0C\u8058\u50F1\u672C\u570B\u7C4D\u53CA\u5916\u570B\u7C4D\u4E4B\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005\uFF0C\u6307\u6D3E\u81F3\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u5951\u7D04\u5C65\u884C\u5730\uFF0C\u5F9E\u4E8B\u966A\u4F34\u7167\u9867\u7B49\u76F8\u95DC\u4E8B\u52D9\u4E4B\u9AD4\u529B\u5DE5\u4F5C\u3002 <br data-v-d6dd2e35> \u9EDE\u9078\u4EE5\u4E0B\u5404\u5340\u7684\u8A66\u8FA6\u55AE\u4F4D\u7C21\u4ECB\uFF0C\u6709\u670D\u52D9\u9805\u76EE\u3001\u670D\u52D9\u6642\u6578\u3001\u6536\u8CBB\u7B49\u76F8\u95DC\u8AAA\u660E\u4ECB\u7D39\u3002</p></div></div><div class="main-container" data-v-d6dd2e35>`);
      _push(ssrRenderComponent(_component_service_unit_list_area, null, null, _parent));
      _push(ssrRenderComponent(_component_service_details_area, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const services = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6dd2e35"]]);

export { services as default };
//# sourceMappingURL=services-Ci6fsnri.mjs.map
