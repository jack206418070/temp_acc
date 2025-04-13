import { _ as __nuxt_component_0 } from './service-unit-list-area-WIqHJB-p.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-24afa485><div class="" data-v-24afa485><div class="details-meta ps-xxl-5 ps-xl-3" data-v-24afa485><div class="reminder-block" data-v-24afa485><h3 class="default-title" data-v-24afa485>\u7D66\u670D\u52D9\u4F7F\u7528\u8005\u7684\u5C0F\u53EE\u5680</h3><p class="reminder-intro mb-4" data-v-24afa485> \u9762\u5C0D\u300C\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005\u300D\uFF0C\u63D0\u9192\u60A8\u6CE8\u610F\u4EE5\u4E0B\u4E8B\u9805\uFF0C\u76F8\u4FE1\u6709\u52A9\u65BC\u6E9D\u901A\u8207\u7167\u9867\u54C1\u8CEA\uFF1A </p><ul class="reminder-list" data-v-24afa485><li data-v-24afa485><strong data-v-24afa485>\u4EA4\u63A5\u88AB\u7167\u9867\u8005\u7684\u91CD\u8981\u8CC7\u8A0A\u6216\u6CE8\u610F\u4E8B\u9805</strong>\uFF0C\u4F8B\u5982\u7528\u85E5\u3001\u98F2\u98DF\u7FD2\u6163\u3001\u559C\u597D\u7B49\u3002 </li><li data-v-24afa485><strong data-v-24afa485>\u4F9D\u64DA\u88AB\u7167\u9867\u8005\u751F\u6D3B\u4F5C\u606F\uFF0C\u4E8B\u524D\u5171\u540C\u8A02\u5B9A</strong>\u7528\u9910\u3001\u5982\u5EC1\u3001\u5FA9\u5065\u3001\u4F11\u606F\u7B49\u7167\u9867\u6642\u9593\u8868\u3002 </li><li data-v-24afa485><strong data-v-24afa485>\u5C0A\u91CD\u4E0D\u540C\u98F2\u98DF\u6587\u5316\u8207\u4FE1\u4EF0</strong>\u3002\u4F8B\u5982\u7A46\u65AF\u6797\u56E0\u4FE1\u4EF0\u95DC\u4FC2\u4E0D\u98DF\u7528\u8C6C\u8089\u3002</li><li data-v-24afa485><strong data-v-24afa485>\u63D0\u4F9B\u5FC5\u8981\u4F11\u606F\u6642\u9593\u8207\u80FD\u5B89\u5FC3\u4F11\u606F\u7684\u7A7A\u9593</strong>\u3002 </li></ul><p class="reminder-note mt-4" data-v-24afa485><span class="text-black" data-v-24afa485>\u2605</span> \u82E5\u6709\u4EFB\u4F55\u554F\u984C\uFF0C\u53EF\u81F4\u96FB\u5404\u8A66\u8FA6\u55AE\u4F4D\uFF0C\u4ED6\u5011\u5C07\u6703\u5373\u6642\u63D0\u4F9B\u5354\u52A9\u3002 </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-details-area.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-24afa485"]]);
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
//# sourceMappingURL=services-4dSA5iBj.mjs.map
