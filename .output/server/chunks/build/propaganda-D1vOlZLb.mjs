import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useSeoMeta } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "propaganda",
  __ssrInlineRender: true,
  setup(__props) {
    const tab_data = ref({
      "1": {
        type: "\u61F6\u4EBA\u5305",
        data: []
      },
      "2": {
        type: "\u5BA3\u5C0E\u8CC7\u6599",
        data: []
      }
    });
    const tab_type = ref("1");
    const showPopup = ref(false);
    const currentIndex = ref(0);
    const isLoading = ref(false);
    ref([]);
    useSeoMeta({ title: "\u61F6\u4EBA\u5305/\u5BA3\u5C0E\u8CC7\u6599\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-fa893c3c><div class="tab-list" data-v-fa893c3c><div class="${ssrRenderClass([{ activated: tab_type.value === "1" }, "tab-item"])}" data-v-fa893c3c>\u61F6\u4EBA\u5305</div><div class="${ssrRenderClass([{ activated: tab_type.value === "2" }, "tab-item"])}" data-v-fa893c3c>\u5BA3\u5C0E\u8CC7\u6599</div></div><h2 class="default-title" data-v-fa893c3c>${ssrInterpolate(tab_data.value[tab_type.value].type)}</h2>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-fa893c3c><div class="loading-spinner" data-v-fa893c3c></div><p data-v-fa893c3c>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{ "block2": tab_type.value != "1" }, "tab-data-list"])}" data-v-fa893c3c>`);
        if (tab_type.value == "1") {
          _push(`<!--[-->`);
          ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
            _push(`<div class="tab-data-item" data-v-fa893c3c><img${ssrRenderAttr("src", data.image)}${ssrRenderAttr("alt", data.title)} data-v-fa893c3c></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><iframe width="560" height="315" src="https://www.youtube.com/embed/Kh_wPjROEoo?si=IEKnDSj70L4tDPPR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-fa893c3c></iframe><iframe width="560" height="315" src="https://www.youtube.com/embed/OxRL7eKReVQ?si=N22GWiJ22VtLE1cx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen data-v-fa893c3c></iframe><!--[-->`);
          ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
            _push(`<div class="tab-data-item-block2" data-v-fa893c3c><img${ssrRenderAttr("src", data.image)}${ssrRenderAttr("alt", data.title)} data-v-fa893c3c></div>`);
          });
          _push(`<!--]--><!--]-->`);
        }
        _push(`</div>`);
      }
      if (showPopup.value) {
        _push(`<div class="popup-overlay" data-v-fa893c3c><div class="popup-content" data-v-fa893c3c>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-fa893c3c>\u2039</button>`);
        } else {
          _push(`<!---->`);
        }
        if ((_a = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _a.image_url) {
          _push(`<a${ssrRenderAttr("href", (_b = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _b.image_url)} target="_blank" class="image-link" data-v-fa893c3c><img${ssrRenderAttr("src", (_c = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _c.image)}${ssrRenderAttr("alt", (_d = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _d.title)} data-v-fa893c3c><span class="link-hint" data-v-fa893c3c>\u9EDE\u64CA\u5716\u7247\u958B\u555F\u539F\u59CB\u9023\u7D50</span></a>`);
        } else {
          _push(`<img${ssrRenderAttr("src", (_e = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _e.image)}${ssrRenderAttr("alt", (_f = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _f.title)} data-v-fa893c3c>`);
        }
        if (currentIndex.value < tab_data.value[tab_type.value].data.length - 1) {
          _push(`<button class="arrow right" data-v-fa893c3c>\u203A</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-fa893c3c>\xD7</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/propaganda.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const propaganda = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa893c3c"]]);

export { propaganda as default };
//# sourceMappingURL=propaganda-D1vOlZLb.mjs.map
