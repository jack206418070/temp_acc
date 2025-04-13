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
        data: [
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-00.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-01.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-02.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-03.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-04.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-05.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-06.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-07.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-08.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-09.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-10.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-11.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-12.jpg"
          },
          {
            image: "/images/assets/\u61F6\u4EBA\u5305-13.jpg"
          }
        ]
      },
      "2": {
        type: "\u5BA3\u5C0E\u8CC7\u6599",
        data: [
          {
            image: "/images/assets/EDM_A4_0325.jpg"
          }
        ]
      }
    });
    const tab_type = ref("1");
    const showPopup = ref(false);
    const currentIndex = ref(0);
    useSeoMeta({ title: "\u61F6\u4EBA\u5305/\u5BA3\u5C0E\u8CC7\u6599\uFF5C \u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-65f7e09a><div class="tab-list" data-v-65f7e09a><div class="${ssrRenderClass([{ activated: tab_type.value === "1" }, "tab-item"])}" data-v-65f7e09a>\u61F6\u4EBA\u5305</div><div class="${ssrRenderClass([{ activated: tab_type.value === "2" }, "tab-item"])}" data-v-65f7e09a>\u5BA3\u5C0E\u8CC7\u6599</div></div><h2 class="default-title" data-v-65f7e09a>${ssrInterpolate(tab_data.value[tab_type.value].type)}</h2><div class="${ssrRenderClass([{ "block2": tab_type.value != "1" }, "tab-data-list"])}" data-v-65f7e09a>`);
      if (tab_type.value == "1") {
        _push(`<!--[-->`);
        ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
          _push(`<div class="tab-data-item" data-v-65f7e09a><img${ssrRenderAttr("src", data.image)} alt="" data-v-65f7e09a></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(tab_data.value[tab_type.value].data, (data, index) => {
          _push(`<div class="tab-data-item-block2" data-v-65f7e09a><img${ssrRenderAttr("src", data.image)} alt="" data-v-65f7e09a></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (showPopup.value) {
        _push(`<div class="popup-overlay" data-v-65f7e09a><div class="popup-content" data-v-65f7e09a>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-65f7e09a>\u2039</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", tab_data.value[tab_type.value].data[currentIndex.value].image)} alt="Popup Image" data-v-65f7e09a>`);
        if (currentIndex.value < tab_data.value[tab_type.value].data.length - 1) {
          _push(`<button class="arrow right" data-v-65f7e09a>\u203A</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-65f7e09a>\xD7</button></div></div>`);
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
const propaganda = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65f7e09a"]]);

export { propaganda as default };
//# sourceMappingURL=propaganda-Dm61bJmM.mjs.map
