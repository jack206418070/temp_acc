import { defineComponent, useSSRContext } from "vue";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/cookie-es/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "/Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "vue/server-renderer";
import "/Users/ginjack/Desktop/temp_acc/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "lazy-bag",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "懶人包｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="spacer-section" data-v-c5174e46><p data-v-c5174e46></p></div><div data-v-c5174e46><h1 data-v-c5174e46>懶人包</h1><div class="grid-container" data-v-c5174e46><div class="grid-item" data-v-c5174e46><h3 data-v-c5174e46>完整內容更新中</h3></div><div class="grid-item" data-v-c5174e46><h3 data-v-c5174e46>完整內容更新中</h3></div><div class="grid-item" data-v-c5174e46><h3 data-v-c5174e46>完整內容更新中</h3></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/lazy-bag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const lazyBag = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5174e46"]]);
export {
  lazyBag as default
};
//# sourceMappingURL=lazy-bag-C2WMmkJH.js.map
