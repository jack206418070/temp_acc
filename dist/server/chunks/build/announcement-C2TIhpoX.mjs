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
  __name: "announcement",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u65B0\u805E\u5831\u5C0E \uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-c2ef1eff><h2 class="default-title" data-v-c2ef1eff> \u516C\u544A/\u65B0\u805E\u7A3F </h2><div class="announcement-list" data-v-c2ef1eff><div class="announcement-list-item first-list" data-v-c2ef1eff><div class="item-date" data-v-c2ef1eff>\u767C\u4F48\u65E5\u671F</div><div class="item-category" data-v-c2ef1eff>\u985E\u5225</div><div class="item-title" data-v-c2ef1eff>\u6A19\u984C</div></div><div class="announcement-list-item" data-v-c2ef1eff><div class="item-date" data-v-c2ef1eff>2025/04/08</div><div class="item-category" data-v-c2ef1eff>\u516C\u544A/\u65B0\u805E\u7A3F</div><div class="item-title" data-v-c2ef1eff><a href="/news/2" data-v-c2ef1eff>\u4FDD\u969C\u300C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u300D\u7167\u9867\u4EBA\u529B\u7684\u5408\u7406\u916C\u52DE\uFF0C\u7DAD\u6301\u670D\u52D9\u7684\u6C38\u7E8C\u6027\u8207\u54C1\u8CEA</a></div></div><div class="announcement-list-item" data-v-c2ef1eff><div class="item-date" data-v-c2ef1eff>2025/04/07</div><div class="item-category" data-v-c2ef1eff>\u516C\u544A/\u65B0\u805E\u7A3F</div><div class="item-title" data-v-c2ef1eff><a href="/news/1" data-v-c2ef1eff>\u591A\u5143\u966A\u4F34\u6B63\u5F0F\u4E0A\u8DEF\u65B0\u805E\u7A3F</a></div></div><div class="announcement-list-item" data-v-c2ef1eff><div class="item-date" data-v-c2ef1eff>2024/11/15</div><div class="item-category" data-v-c2ef1eff>\u516C\u544A</div><div class="item-title" data-v-c2ef1eff><a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3933bb88301933e4e60030906" target="_blank" data-v-c2ef1eff>\u516C\u544A\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u7B2C\u4E00\u968E\u6BB5\u8A66\u8FA6\u55AE\u4F4D\u7533\u8ACB\u671F\u9593\u81EA\u5373\u65E5\u8D77\u81F311\u670828\u65E5\u622A\u6B62\u3002</a></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/announcement.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const announcement = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2ef1eff"]]);

export { announcement as default };
//# sourceMappingURL=announcement-C2TIhpoX.mjs.map
