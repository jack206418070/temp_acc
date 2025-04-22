import { defineComponent, useSSRContext } from 'vue';
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
import 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lazy-bag",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u61F6\u4EBA\u5305\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="spacer-section" data-v-0a6b5e89><p data-v-0a6b5e89></p></div><div data-v-0a6b5e89><h1 data-v-0a6b5e89>\u61F6\u4EBA\u5305</h1><div class="grid-container" data-v-0a6b5e89><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>\u5B8C\u6574\u5167\u5BB9\u66F4\u65B0\u4E2D</h3></div><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>\u5B8C\u6574\u5167\u5BB9\u66F4\u65B0\u4E2D</h3></div><div class="grid-item" data-v-0a6b5e89><h3 data-v-0a6b5e89>\u5B8C\u6574\u5167\u5BB9\u66F4\u65B0\u4E2D</h3></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lazy-bag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lazyBag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a6b5e89"]]);

export { lazyBag as default };
//# sourceMappingURL=lazy-bag-DRjYhS4H.mjs.map
