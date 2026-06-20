import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, u as useSeoMeta } from "../server.mjs";
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "aboutus-purpose-area",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "plan-about" }, _attrs))} data-v-cbd281a9><h2 data-v-cbd281a9>計畫內容簡介</h2><p data-v-cbd281a9>為回應民眾「臨短急」服務需求，包括長輩「臨」時有狀況卻找不到服務人力、外籍家庭看護空窗期的「短」期需要服務人力、家人手術或病後需要「急」性後期服務等，勞動部推動「多元陪伴照顧服務試辦計畫」，由依法設立滿五年之財團法人或非營利社團法人，並通過公益性、專業度與合理收費等評選標準後成為試辦單位，聘僱及培訓本國籍及外國籍多元陪伴照顧服務工作者到申請服務家庭，提供基本日常生活服務、陪同外出、陪同就醫、安全陪伴等多元陪伴照顧服務 。「陪伴照顧服務工作者」之給薪與休息時間，依勞動基準法規定辦理。</p><p data-v-cbd281a9>本項服務由民眾全額自費，各試辦單位得提供單次至少四小時以上或全日等彈性服務，並依勞動部核定之服務價格收費。</p><p data-v-cbd281a9>申請本項服務之民眾必須具備能提出以下任一文件之資格，包括：身心障礙證明、重大傷病證明、醫師診斷證明書、符合聘僱外國人之招募許可或聘僱許可、長期照顧需求評估通知書或使用收據等文件。</p></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aboutus/aboutus-purpose-area.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-cbd281a9"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "service-targer",
  __ssrInlineRender: true,
  setup(__props) {
    const serviceSteps = [
      {
        title: "",
        description: "具有效期間內身心障礙證明。",
        note: "有效期間內之身心障礙證明。"
      },
      {
        title: "",
        description: "具有效期間內全民健康保險重大傷病資格。",
        note: "有效期間內的重大傷病卡，或全民健保行動快易通/健康存摺APP之重大傷病證明查詢結果，及一年內開具之診斷證明書且載明宜休養"
      },
      {
        title: "",
        description: "具三個月內就醫或手術紀錄。",
        note: "申請日前三個月內開具之診斷證明書，且載明宜休養。"
      },
      {
        title: "",
        description: "符合聘僱外國人從事家庭看護工作或中階家庭看護工作之被看護者資格。",
        note: "符合申請聘僱外國人資格之有效證明文件、有效期間內之招募許可或聘僱許可。 可用系統勾稽。"
      },
      {
        title: "",
        description: "經長期照顧管理中心評估屬長期照顧需要等級第二級至第八級，有使用本計畫服務之需求。",
        note: "長期照顧需求評估結果通知書或長照特約單位開立載有照顧組合名稱之收據。",
        extra_note: "備註: 長期照顧需求評估結果通知書可由醫院出備小組開立"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "plan-service" }, _attrs))} data-v-162bc061><div class="position-relative" data-v-162bc061><h2 data-v-162bc061>服務對象</h2><div class="row m-auto" data-v-162bc061><!--[-->`);
      ssrRenderList(serviceSteps, (item, index) => {
        _push(`<div class="col-md wow fadeInUp"${ssrRenderAttr("data-wow-delay", `${index * 0.2}s`)} data-v-162bc061><div class="step-item text-center mb-lg-4 mb-2" data-v-162bc061><div class="step-number" data-v-162bc061>${ssrInterpolate(index + 1)}</div><div class="step-title" data-v-162bc061>${ssrInterpolate(item.title)}</div></div><div class="description-box p-20 mb-4" data-v-162bc061><p data-v-162bc061>${ssrInterpolate(item.description)}</p></div><div class="notes-box" data-v-162bc061><p style="${ssrRenderStyle({ "white-space": "pre-line" })}" data-v-162bc061>${ssrInterpolate(item.note)}</p>`);
        if (item == null ? void 0 : item.extra_note) {
          _push(`<p style="${ssrRenderStyle({ "white-space": "pre-line" })}" data-v-162bc061>${ssrInterpolate(item.extra_note)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/service-targer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-162bc061"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about-us",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "計畫內容簡介｜多元陪伴照顧服務計畫" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_aboutus_purpose_area = __nuxt_component_0;
      const _component_service_targer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_aboutus_purpose_area, null, null, _parent));
      _push(ssrRenderComponent(_component_service_targer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=about-us-DOp8iuzA.js.map
