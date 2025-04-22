import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-d54714fa><div class="tab-list" data-v-d54714fa><div class="${ssrRenderClass([{ activated: tab_type.value === "1" }, "tab-item"])}" data-v-d54714fa>\u61F6\u4EBA\u5305</div><div class="${ssrRenderClass([{ activated: tab_type.value === "2" }, "tab-item"])}" data-v-d54714fa>\u5BA3\u5C0E\u8CC7\u6599</div></div><h2 class="default-title" data-v-d54714fa>${ssrInterpolate(tab_data.value[tab_type.value].type)}</h2>`);
      if (isLoading.value) {
        _push(`<div class="loading-container" data-v-d54714fa><div class="loading-spinner" data-v-d54714fa></div><p data-v-d54714fa>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([{ "block2": tab_type.value != "1" }, "tab-data-list"])}" data-v-d54714fa>`);
        if (tab_type.value == "1") {
          _push(`<!--[-->`);
          ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
            _push(`<div class="tab-data-item" data-v-d54714fa><img${ssrRenderAttr("src", data.image)}${ssrRenderAttr("alt", data.title)} data-v-d54714fa></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
            _push(`<div class="tab-data-item-block2" data-v-d54714fa><img${ssrRenderAttr("src", data.image)}${ssrRenderAttr("alt", data.title)} data-v-d54714fa></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      }
      if (showPopup.value) {
        _push(`<div class="popup-overlay" data-v-d54714fa><div class="popup-content" data-v-d54714fa>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-d54714fa>\u2039</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", (_a = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _a.image)}${ssrRenderAttr("alt", (_b = tab_data.value[tab_type.value].data[currentIndex.value]) == null ? void 0 : _b.title)} data-v-d54714fa>`);
        if (currentIndex.value < tab_data.value[tab_type.value].data.length - 1) {
          _push(`<button class="arrow right" data-v-d54714fa>\u203A</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-d54714fa>\xD7</button></div></div>`);
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
const propaganda = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d54714fa"]]);

export { propaganda as default };
//# sourceMappingURL=propaganda-Byrj19fJ.mjs.map
