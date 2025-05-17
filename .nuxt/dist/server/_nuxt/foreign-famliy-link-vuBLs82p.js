import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { u as useSeoMeta, _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "foreign-famliy-link",
  __ssrInlineRender: true,
  setup(__props) {
    const links = ref([
      {
        "name": "外國人從事家庭看護工作補充訓練課程專區",
        "link": "https://fw.wda.gov.tw/wda-employer/home/e-training/newPreLogin"
      },
      {
        "name": "【移學園】移工學習的學園Migrant Learning Garden 免費華語學習社團",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38fb67f75018fb7f1fdb602cb"
      },
      {
        "name": "臺北移工學校 Sekolah Pekerja Migran Taipei",
        "link": "https://www.youtube.com/@taipeimigrantworkerschool5411"
      },
      {
        "name": "(越南/泰國/菲律賓)中文學習影片宣傳",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38c40b9a4018c4331d91f04b2"
      },
      {
        "name": "(印尼)中文學習影片宣傳",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb389604c4601896315e6990804"
      },
      {
        "name": "臺灣華語教育資源中心-華語101",
        "link": "https://lmit.edu.tw/zh"
      },
      {
        "name": "外籍看護工中文基礎訓練課程教材(中越文版)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4f1a66f0022"
      },
      {
        "name": "外籍看護工中文基礎訓練課程教材(中英文版)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48730fd0023"
      },
      {
        "name": "外籍看護工中文基礎訓練課程教材(中印文版)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48cb6490047"
      },
      {
        "name": "外籍看護工中文基礎訓練課程教材(中泰文版)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4fe0fde0046"
      }
    ]);
    useSeoMeta({ title: "外籍家庭看護工學習資源｜多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container foreign-famliy-link-block" }, _attrs))} data-v-a733ff90><!--[-->`);
      ssrRenderList(links.value, (link, index) => {
        _push(`<div class="link-item" data-v-a733ff90><p data-v-a733ff90>${ssrInterpolate(index + 1)}.${ssrInterpolate(link.name)}</p><a${ssrRenderAttr("href", link.link)} data-v-a733ff90>${ssrInterpolate(link.link)}</a></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foreign-famliy-link.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const foreignFamliyLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a733ff90"]]);
export {
  foreignFamliyLink as default
};
//# sourceMappingURL=foreign-famliy-link-vuBLs82p.js.map
