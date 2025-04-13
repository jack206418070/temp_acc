import { defineComponent, withCtx, createTextVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSeoMeta, b as __nuxt_component_0$2 } from './server.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-banner" }, _attrs))} data-v-66e4ba2f><div class="main-container home-bg" data-v-66e4ba2f></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hero-banner/hero-banner-empty-index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-66e4ba2f"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u9996\u9801\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_hero_banner_empty_index = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-4c66c19d>`);
      _push(ssrRenderComponent(_component_hero_banner_empty_index, null, null, _parent));
      _push(`<div data-v-4c66c19d>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "book-btn btn-one jelly-box",
        id: "jelly-box",
        href: "https://serve-mcs.wda.gov.tw"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u9810\u7D04/\u7533\u8ACB `);
          } else {
            return [
              createTextVNode(" \u9810\u7D04/\u7533\u8ACB ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="main-container home-content" data-v-4c66c19d><div class="home-top" data-v-4c66c19d><h2 data-v-4c66c19d>\u6700\u65B0\u6D88\u606F</h2></div><div class="home-new" data-v-4c66c19d><div class="new-item" data-v-4c66c19d><div class="new-title" data-v-4c66c19d><div class="title-text" data-v-4c66c19d>\u516C\u544A/\u65B0\u805E\u7A3F</div><div class="title-date" data-v-4c66c19d>2025/04/08</div></div><div class="new-link" data-v-4c66c19d><a href="/news/2" data-v-4c66c19d>\u4FDD\u969C\u300C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u300D\u7167\u9867\u4EBA\u529B\u7684\u5408\u7406\u916C\u52DE\uFF0C\u7DAD\u6301\u670D\u52D9\u7684\u6C38\u7E8C\u6027\u8207\u54C1\u8CEA</a></div><div class="item-line" data-v-4c66c19d></div></div><div class="new-item" data-v-4c66c19d><div class="new-title" data-v-4c66c19d><div class="title-text" data-v-4c66c19d>\u516C\u544A/\u65B0\u805E\u7A3F</div><div class="title-date" data-v-4c66c19d>2025/04/07</div></div><div class="new-link" data-v-4c66c19d><a href="/news/1" data-v-4c66c19d>\u591A\u5143\u966A\u4F34\u6B63\u5F0F\u4E0A\u8DEF\u65B0\u805E\u7A3F</a></div><div class="item-line" data-v-4c66c19d></div></div><div class="new-item" data-v-4c66c19d><div class="new-title" data-v-4c66c19d><div class="title-text" data-v-4c66c19d>\u516C\u544A/\u65B0\u805E\u7A3F</div><div class="title-date" data-v-4c66c19d>2024/11/15</div></div><div class="new-link" data-v-4c66c19d><a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank" data-v-4c66c19d>\u52DE\u52D5\u90E8\u4ECA\u8FA6\u300C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u300D\u8A66\u8FA6\u55AE\u4F4D\u8AAA\u660E\u6703 \u793E\u798F\u5718\u9AD4\u53CD\u61C9\u71B1\u70C8\uFF01</a></div><div class="item-line" data-v-4c66c19d></div></div><div class="new-item" data-v-4c66c19d><div class="new-title" data-v-4c66c19d><div class="title-text" data-v-4c66c19d>\u65B0\u805E\u5831\u5C0E</div><div class="title-date" data-v-4c66c19d>2024/11/15</div></div><div class="new-link" data-v-4c66c19d><a href="https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb3932da4d501932dd7e96609eb" target="_blank" data-v-4c66c19d>\u6D3B\u52D5\u8A0A\u606F\uFF1A\u52DE\u52D5\u90E8\u4ECA\u8FA6\u300C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A66\u8FA6\u8A08\u756B\u300D\u8A66\u8FA6\u55AE\u4F4D\u8AAA\u660E\u6703 \u793E\u798F\u5718\u9AD4\u53CD\u61C9\u71B1\u70C8\uFF01</a></div><div class="item-line" data-v-4c66c19d></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c66c19d"]]);

export { index as default };
//# sourceMappingURL=index-D7kGgQX8.mjs.map
