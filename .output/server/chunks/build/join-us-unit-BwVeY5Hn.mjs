import { defineComponent, mergeProps, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useSeoMeta, _ as _export_sfc } from './server.mjs';
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
  __name: "joinusunit-intro",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "join-block" }, _attrs))} data-v-1d466a2c><h2 class="default-title" data-v-1d466a2c>\u5982\u4F55\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D</h2><div class="line-wrapper position-relative" data-v-1d466a2c><div class="row align-items-center" data-v-1d466a2c><div class="col-lg-12 wow fadeInLeft" data-v-1d466a2c><h3 class="join-title" data-v-1d466a2c>\u7533\u8ACB\u8CC7\u683C</h3><ol class="ch-main-list join-method-list" data-v-1d466a2c><li data-v-1d466a2c>\u4F9D\u6CD5\u8A2D\u7ACB\u6216\u767B\u8A18\u6EFF\u4E94\u5E74\u4E4B\u8CA1\u5718\u6CD5\u4EBA\u6216\u975E\u71DF\u5229\u793E\u5718\u6CD5\u4EBA\u3002</li><li data-v-1d466a2c> \u82E5\u898F\u756B\u59D4\u4EFB\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB\uFF0C\u8FA6\u7406\u5916\u7C4D\u966A\u4F34\u7167\u9867\u5DE5\u4F5C\u8005\u4E4B\u62DB\u52DF\u3001\u8058\u50F1\u7BA1\u7406\u7B49\u4E8B\u5B9C\u8005\uFF0C\u53D7\u59D4\u4EFB\u4E4B\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB\u5FC5\u9808\u7B26\u5408\u4E0B\u5217\u8CC7\u683C\uFF1A </li><ol class="ch-sub-list" data-v-1d466a2c><li data-v-1d466a2c> \u65BC\u7533\u8ACB\u65E5\u524D\u4E94\u5E74\u5167\uFF0C\u8A55\u9451\u6210\u7E3E\u4F9D\u898F\u5B9A\u5747\u5C6C\u65BCA\u7D1A\u53CA\u7E3E\u512A\u514D\u8A55\u9451\u8005\u3002 </li><li data-v-1d466a2c> \u65BC\u7533\u8ACB\u65E5\u524D\u4E8C\u5E74\u53D7\u96C7\u4E3B\u59D4\u4EFB\u5F15\u9032\u6216\u8058\u50F1\u4E4B\u5916\u570B\u4EBA\uFF0C\u4F54\u8A72\u6A5F\u69CB\u7576\u5E74\u7E3D\u5F15\u9032\u6216\u8058\u50F1\u5916\u570B\u4EBA\u4EBA\u6578\u4E8C\u5206\u4E4B\u4E00\u4EE5\u4E0A\u3002 </li><li data-v-1d466a2c> \u65BC\u7533\u8ACB\u65E5\u524D\u4E8C\u5E74\uFF0C\u7121\u9055\u53CD\u5C31\u696D\u670D\u52D9\u6CD5\u76F8\u95DC\u6CD5\u898F\u770B\u8B77\u5DE5\u53CA\u5BB6\u5EAD\u5E6B\u50AD\u3002 </li></ol></ol><p class="title-p" data-v-1d466a2c> \u2192\u5982\u9808\u77AD\u89E3\u7B26\u5408\u4EE5\u4E0A\u8CC7\u683C\u4E4B\u79C1\u7ACB\u5C31\u696D\u670D\u52D9\u6A5F\u69CB\u696D\u8005\u4E4B\u8CC7\u8A0A\uFF0C\u53EF\u6D3D\u8A62<a href="/contact" data-v-1d466a2c>\u672C\u8A08\u756B\u5C08\u6848\u8FA6\u516C\u5BA4</a>\u3002 </p><h3 class="join-title" data-v-1d466a2c>\u8A55\u9078\u6D41\u7A0B</h3><p class="title-p" data-v-1d466a2c> \u6709\u610F\u9858\u4E14\u7B26\u5408\u8CC7\u683C\u7684\u55AE\u4F4D\u9808\u5728\u52DE\u52D5\u90E8\u516C\u544A\u53D7\u7406\u671F\u9593\u5167\u81EA\u884C\u63D0\u51FA\u7533\u8ACB\u8868\u3001\u7533\u8ACB\u8A08\u756B\u66F8\u53CA\u6AA2\u9644\u76F8\u95DC\u6587\u4EF6\uFF0C\u7D93\u52DE\u52D5\u90E8\u53EC\u958B\u8A55\u9078\u6703\u8B70\u8A55\u9078\u5408\u683C\uFF0C\u518D\u7531\u52DE\u52D5\u90E8\u8996\u653F\u7B56\u9700\u8981\u9032\u884C\u6838\u5B9A\u5F8C\uFF0C\u59CB\u5F97\u6210\u70BA\u672C\u8A08\u756B\u4E4B\u8A66\u8FA6\u55AE\u4F4D\u3002 </p><ul class="join-method-list" data-v-1d466a2c><li data-v-1d466a2c>\u7D44\u7E54\u516C\u76CA\u6027\u53CA\u7E3E\u512A\u4E8B\u8E5F\uFF0820\u5206\uFF09</li><li data-v-1d466a2c>\u670D\u52D9\u5167\u5BB9\u53CA\u8CBB\u7528\u6A19\u6E96\uFF0815\u5206\uFF09</li><li data-v-1d466a2c>\u7D44\u7E54\u5C08\u696D\u6027\uFF0815\u5206\uFF09</li><li data-v-1d466a2c>\u670D\u52D9\u54C1\u8CEA\u78BA\u4FDD\u6A5F\u5236\uFF0815\u5206\uFF09</li><li data-v-1d466a2c>\u5916\u570B\u7C4D\u966A\u4F34\u7167\u9867\u670D\u52D9\u5DE5\u4F5C\u8005\u8058\u50F1\u7BA1\u7406\u53CA\u8A13\u7DF4\u3001\u5F8C\u63F4\u898F\u756B\uFF0815\u5206\uFF09</li><li data-v-1d466a2c>\u5275\u65B0\u4F5C\u70BA\uFF0820\u5206\uFF09</li></ul><div id="jelly-box" class="jelly-box" data-v-1d466a2c><h4 class="join-title" style="${ssrRenderStyle({ "letter-spacing": "1.3px" })}" data-v-1d466a2c>\u6B61\u8FCE\u9EDE\u95B1\uFF0C\u77AD\u89E3\u66F4\u591A</h4><ul class="join-method-list" data-v-1d466a2c><li data-v-1d466a2c><a href="/conduct-plan" data-v-1d466a2c>\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B</a></li><li data-v-1d466a2c>\u8A66\u8FA6\u55AE\u4F4D\u8A55\u9078\u7A0B\u5E8F</li></ul></div><p class="title-p" data-v-1d466a2c> \u2192\u5982\u9808\u9032\u4E00\u6B65\u77AD\u89E3\u5982\u4F55\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D\u4E4B\u8CC7\u8A0A\uFF0C\u53EF\u6D3D\u8A62\u672C\u8A08\u756B<a href="/contact" data-v-1d466a2c>\u672C\u8A08\u756B\u5C08\u6848\u8FA6\u516C\u5BA4</a>\u3002 </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinusunit/joinusunit-intro.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1d466a2c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "join-us-unit",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u6211\u8981\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D \uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_joinusunit_intro = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_joinusunit_intro, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/join-us-unit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=join-us-unit-BwVeY5Hn.mjs.map
