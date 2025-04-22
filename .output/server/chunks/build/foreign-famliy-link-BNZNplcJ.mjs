import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "foreign-famliy-link",
  __ssrInlineRender: true,
  setup(__props) {
    const links = ref([
      {
        "name": "\u5916\u570B\u4EBA\u5F9E\u4E8B\u5BB6\u5EAD\u770B\u8B77\u5DE5\u4F5C\u88DC\u5145\u8A13\u7DF4\u8AB2\u7A0B\u5C08\u5340",
        "link": "https://fw.wda.gov.tw/wda-employer/home/e-training/newPreLogin"
      },
      {
        "name": "\u3010\u79FB\u5B78\u5712\u3011\u79FB\u5DE5\u5B78\u7FD2\u7684\u5B78\u5712Migrant Learning Garden \u514D\u8CBB\u83EF\u8A9E\u5B78\u7FD2\u793E\u5718",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38fb67f75018fb7f1fdb602cb"
      },
      {
        "name": "\u81FA\u5317\u79FB\u5DE5\u5B78\u6821 Sekolah Pekerja Migran Taipei",
        "link": "https://www.youtube.com/@taipeimigrantworkerschool5411"
      },
      {
        "name": "(\u8D8A\u5357/\u6CF0\u570B/\u83F2\u5F8B\u8CD3)\u4E2D\u6587\u5B78\u7FD2\u5F71\u7247\u5BA3\u50B3",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb38c40b9a4018c4331d91f04b2"
      },
      {
        "name": "(\u5370\u5C3C)\u4E2D\u6587\u5B78\u7FD2\u5F71\u7247\u5BA3\u50B3",
        "link": "https://fw.wda.gov.tw/wda-employer/home/activity/2c95efb389604c4601896315e6990804"
      },
      {
        "name": "\u81FA\u7063\u83EF\u8A9E\u6559\u80B2\u8CC7\u6E90\u4E2D\u5FC3-\u83EF\u8A9E101",
        "link": "https://lmit.edu.tw/zh"
      },
      {
        "name": "\u5916\u7C4D\u770B\u8B77\u5DE5\u4E2D\u6587\u57FA\u790E\u8A13\u7DF4\u8AB2\u7A0B\u6559\u6750(\u4E2D\u8D8A\u6587\u7248)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4f1a66f0022"
      },
      {
        "name": "\u5916\u7C4D\u770B\u8B77\u5DE5\u4E2D\u6587\u57FA\u790E\u8A13\u7DF4\u8AB2\u7A0B\u6559\u6750(\u4E2D\u82F1\u6587\u7248)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48730fd0023"
      },
      {
        "name": "\u5916\u7C4D\u770B\u8B77\u5DE5\u4E2D\u6587\u57FA\u790E\u8A13\u7DF4\u8AB2\u7A0B\u6559\u6750(\u4E2D\u5370\u6587\u7248)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b3dc6d0163b48cb6490047"
      },
      {
        "name": "\u5916\u7C4D\u770B\u8B77\u5DE5\u4E2D\u6587\u57FA\u790E\u8A13\u7DF4\u8AB2\u7A0B\u6559\u6750(\u4E2D\u6CF0\u6587\u7248)",
        "link": "https://fw.wda.gov.tw/wda-employer/home/textbook/2c9552e063b4c0260163b4fe0fde0046"
      }
    ]);
    useSeoMeta({ title: "\u5916\u7C4D\u5BB6\u5EAD\u770B\u8B77\u5DE5\u5B78\u7FD2\u8CC7\u6E90\uFF5C\u591A\u5143\u966A\u4F34\u7167\u9867\u670D\u52D9\u8A08\u756B" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container foreign-famliy-link-block" }, _attrs))} data-v-fe956056><!--[-->`);
      ssrRenderList(links.value, (link, index) => {
        _push(`<div class="link-item" data-v-fe956056><p data-v-fe956056>${ssrInterpolate(index + 1)}.${ssrInterpolate(link.name)}</p><a${ssrRenderAttr("href", link.link)} data-v-fe956056>${ssrInterpolate(link.link)}</a></div>`);
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
const foreignFamliyLink = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe956056"]]);

export { foreignFamliyLink as default };
//# sourceMappingURL=foreign-famliy-link-BNZNplcJ.mjs.map
