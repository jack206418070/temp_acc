import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const _imports_0 = publicAssetsURL("/images/assets/book-1.avif");
const _imports_1 = publicAssetsURL("/images/assets/book-2.avif");
const _imports_2 = publicAssetsURL("/images/assets/book-3.avif");
const _imports_3 = publicAssetsURL("/images/assets/book-4.avif");
const _imports_4 = publicAssetsURL("/images/assets/book-5.avif");
const _imports_5 = publicAssetsURL("/images/assets/book-6.avif");
const _imports_6 = publicAssetsURL("/images/assets/book-7.avif");
const _imports_7 = publicAssetsURL("/images/assets/book-8.avif");
const _imports_8 = publicAssetsURL("/images/assets/book-9.avif");
const _imports_9 = publicAssetsURL("/images/assets/book-10.avif");
const _imports_10 = publicAssetsURL("/images/assets/book-11.avif");
const _imports_11 = publicAssetsURL("/images/assets/book-12.avif");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reserve-guide",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "\u9810\u7D04\u6307\u5F15\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "customer-container" }, _attrs))} data-v-4c648eee><h2 class="default-title" data-v-4c648eee> \u9810\u7D04\u6307\u5F15 </h2><a href="tel:0255995449" class="note-display" data-v-4c648eee>\u5982\u6709\u64CD\u4F5C\u76F8\u95DC\u7591\u554F\u9700\u8AEE\u8A62,\u7169\u8ACB\u64A5\u6253 <span data-v-4c648eee>02-55995449</span> \u8A62\u554F\uFF0C\u611F\u8B1D\u60A8</a><iframe width="100%" height="450" src="https://www.youtube.com/embed/MhJgMhQ2PVA?si=lcp1d9-v6UPD6N0x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-4c648eee></iframe><div class="book-step" data-v-4c648eee><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>1</span><p data-v-4c648eee>\u8A3B\u518A/\u767B\u5165</p></div><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>2</span><p data-v-4c648eee>\u586B\u5BEB\u670D\u52D9\u7533\u8ACB\u8CC7\u6599</p></div><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>3</span><p data-v-4c648eee>\u9078\u64C7\u8A66\u8FA6\u55AE\u4F4D</p></div><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>4</span><p data-v-4c648eee>\u95B1\u8B80\u96D9\u65B9<br data-v-4c648eee>\u6B0A\u5229\u7FA9\u52D9\u8CAC\u4EFB</p></div><img${ssrRenderAttr("src", _imports_3)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>5</span><p data-v-4c648eee>\u78BA\u8A8D\u88AB\u59D4\u8A17<br data-v-4c648eee>\u8A66\u8FA6\u55AE\u4F4D\u53D7\u7406\u670D\u52D9\u7533\u8ACB</p></div><img${ssrRenderAttr("src", _imports_4)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>6</span><p data-v-4c648eee>\u8A66\u8FA6\u55AE\u4F4D\u81F4\u96FB\u806F\u7E6B<br data-v-4c648eee>\u8AAA\u660E\u4E26\u77AD\u89E3\u670D\u52D9\u9700\u6C42</p></div><img${ssrRenderAttr("src", _imports_5)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>7</span><p data-v-4c648eee>\u4E0A\u50B3\u76F8\u95DC\u8CC7\u683C\u6587\u4EF6</p></div><img${ssrRenderAttr("src", _imports_6)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>8</span><p data-v-4c648eee>\u7C3D\u7D04</p></div><img${ssrRenderAttr("src", _imports_7)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>9</span><p data-v-4c648eee>\u966A\u4F34\u54E1\u5230\u5E9C\u670D\u52D9<br data-v-4c648eee>\u6253\u5361\u78BA\u8A8D\u958B\u59CB\u670D\u52D9</p></div><img${ssrRenderAttr("src", _imports_8)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>10</span><p data-v-4c648eee>\u670D\u52D9\u7D50\u675F\u6642<br data-v-4c648eee>\u6253\u5361\u78BA\u8A8D</p></div><img${ssrRenderAttr("src", _imports_9)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>11</span><p data-v-4c648eee>\u586B\u5BEB\u670D\u52D9\u4F7F\u7528<br data-v-4c648eee>\u6EFF\u610F\u5EA6\u8ABF\u67E5</p></div><img${ssrRenderAttr("src", _imports_10)} alt="" data-v-4c648eee></div><div class="step-item" data-v-4c648eee><h3 data-v-4c648eee>\u6B65\u9A5F</h3><div data-v-4c648eee><span data-v-4c648eee>12</span><p data-v-4c648eee>\u670D\u52D9\u7D50\u675F</p></div><img${ssrRenderAttr("src", _imports_11)} alt="" data-v-4c648eee></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reserve-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reserveGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c648eee"]]);

export { reserveGuide as default };
//# sourceMappingURL=reserve-guide-Ea4ngwpL.mjs.map
