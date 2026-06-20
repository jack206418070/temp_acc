import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
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
import "/Users/ginjack/Desktop/temp_acc/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-apply-form",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "多元陪伴照顧服務試辦單位申請表" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))} data-v-3de1b1f5><h2 class="default-title apply-title" data-v-3de1b1f5>申請表</h2><div class="apply-block" data-v-3de1b1f5><ul data-v-3de1b1f5><li data-v-3de1b1f5><a href="https://www.accompanytest.com/_files/ugd/73d1df_4c0323ab00d94bcdadc7b22ee919d34e.docx?dn=%E5%A4%9A%E5%85%83%E9%99%AA%E4%BC%B4%E7%85%A7%E9%A1%A7%E6%9C%8D%E5%8B%99-%E8%A9%A6%E8%BE%A6%E5%96%AE%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%A1%A8.docx" data-v-3de1b1f5>多元陪伴照顧服務試辦單位申請表</a></li><li data-v-3de1b1f5><a href="https://docs.google.com/document/d/1LZ_Qa-ZjeIE-8fujDAes3KvzBGkKg5vB0qM1GdDLZG0/edit?usp=sharing" data-v-3de1b1f5>多元陪伴照顧服務試辦計畫書</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-apply-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const serviceApplyForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3de1b1f5"]]);
export {
  serviceApplyForm as default
};
//# sourceMappingURL=service-apply-form-BYcVCfTU.js.map
