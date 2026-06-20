import { ref, mergeProps, useSSRContext } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/server.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/devalue/index.js';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nuxt/node_modules/ohash/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue3-toastify/dist/index.mjs';

const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-1ee05aa4>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-1ee05aa4><div class="loading-spinner" data-v-1ee05aa4></div><p data-v-1ee05aa4>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div data-v-1ee05aa4>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ee05aa4"]]);

export { admin as default };
//# sourceMappingURL=admin-CVbXIObo.mjs.map
