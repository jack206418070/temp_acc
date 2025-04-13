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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u65B0\u805E\u5831\u5C0E \uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-b2078e91><h2 class="default-title" data-v-b2078e91> \u65B0\u805E\u5831\u5C0E </h2><div class="announcement-list" data-v-b2078e91><div class="announcement-list-item first-list" data-v-b2078e91><div class="item-date" data-v-b2078e91>\u767C\u4F48\u65E5\u671F</div><div class="item-category" data-v-b2078e91>\u985E\u5225</div><div class="item-title" data-v-b2078e91>\u6A19\u984C</div></div><div class="announcement-list-item" data-v-b2078e91><div class="item-date" data-v-b2078e91>2024/11/15</div><div class="item-category" data-v-b2078e91>\u65B0\u805E\u5831\u5C0E</div><div class="item-title" data-v-b2078e91><a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank" data-v-b2078e91>\u52DE\u52D5\u90E8\u4ECA\u8FA6\u300C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u300D\u8A66\u8FA6\u55AE\u4F4D\u8AAA\u660E\u6703 \u793E\u798F\u5718\u9AD4\u53CD\u61C9\u71B1\u70C8\uFF01</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b2078e91"]]);

export { index as default };
//# sourceMappingURL=index-AxFg8EHX.mjs.map
