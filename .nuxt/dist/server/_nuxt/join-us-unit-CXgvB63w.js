import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import "C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc, u as useSeoMeta } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "joinusunit-intro",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "join-block" }, _attrs))} data-v-1d466a2c><h2 class="default-title" data-v-1d466a2c>如何成為試辦單位</h2><div class="line-wrapper position-relative" data-v-1d466a2c><div class="row align-items-center" data-v-1d466a2c><div class="col-lg-12 wow fadeInLeft" data-v-1d466a2c><h3 class="join-title" data-v-1d466a2c>申請資格</h3><ol class="ch-main-list join-method-list" data-v-1d466a2c><li data-v-1d466a2c>依法設立或登記滿五年之財團法人或非營利社團法人。</li><li data-v-1d466a2c> 若規畫委任私立就業服務機構，辦理外籍陪伴照顧工作者之招募、聘僱管理等事宜者，受委任之私立就業服務機構必須符合下列資格： </li><ol class="ch-sub-list" data-v-1d466a2c><li data-v-1d466a2c> 於申請日前五年內，評鑑成績依規定均屬於A級及績優免評鑑者。 </li><li data-v-1d466a2c> 於申請日前二年受雇主委任引進或聘僱之外國人，佔該機構當年總引進或聘僱外國人人數二分之一以上。 </li><li data-v-1d466a2c> 於申請日前二年，無違反就業服務法相關法規看護工及家庭幫傭。 </li></ol></ol><p class="title-p" data-v-1d466a2c> →如須瞭解符合以上資格之私立就業服務機構業者之資訊，可洽詢<a href="/contact" data-v-1d466a2c>本計畫專案辦公室</a>。 </p><h3 class="join-title" data-v-1d466a2c>評選流程</h3><p class="title-p" data-v-1d466a2c> 有意願且符合資格的單位須在勞動部公告受理期間內自行提出申請表、申請計畫書及檢附相關文件，經勞動部召開評選會議評選合格，再由勞動部視政策需要進行核定後，始得成為本計畫之試辦單位。 </p><ul class="join-method-list" data-v-1d466a2c><li data-v-1d466a2c>組織公益性及績優事蹟（20分）</li><li data-v-1d466a2c>服務內容及費用標準（15分）</li><li data-v-1d466a2c>組織專業性（15分）</li><li data-v-1d466a2c>服務品質確保機制（15分）</li><li data-v-1d466a2c>外國籍陪伴照顧服務工作者聘僱管理及訓練、後援規畫（15分）</li><li data-v-1d466a2c>創新作為（20分）</li></ul><div id="jelly-box" class="jelly-box" data-v-1d466a2c><h4 class="join-title" style="${ssrRenderStyle({ "letter-spacing": "1.3px" })}" data-v-1d466a2c>歡迎點閱，瞭解更多</h4><ul class="join-method-list" data-v-1d466a2c><li data-v-1d466a2c><a href="/conduct-plan" data-v-1d466a2c>多元陪伴照顧服務試辦計畫</a></li><li data-v-1d466a2c>試辦單位評選程序</li></ul></div><p class="title-p" data-v-1d466a2c> →如須進一步瞭解如何成為試辦單位之資訊，可洽詢本計畫<a href="/contact" data-v-1d466a2c>本計畫專案辦公室</a>。 </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/joinusunit/joinusunit-intro.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1d466a2c"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "join-us-unit",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "我要成為試辦單位 ｜ 多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_joinusunit_intro = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_joinusunit_intro, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/join-us-unit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=join-us-unit-CXgvB63w.js.map
