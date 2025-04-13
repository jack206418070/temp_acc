import { _ as _export_sfc, b as __nuxt_component_0$2 } from './server.mjs';
import { ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderTeleport, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "knowledge",
  __ssrInlineRender: true,
  setup(__props) {
    const knowledgeList = ref({ data: [] });
    const showModal = ref(false);
    const isEditing = ref(false);
    const formData = ref({
      kid: null,
      know_category: "",
      title: ""
    });
    const imagePreview = ref("");
    ref(null);
    const imageError = ref("");
    const isButtonLoading = ref(false);
    function getCategoryName(category) {
      const categories = {
        1: "\u61F6\u4EBA\u5305",
        2: "\u5BA3\u5C0E\u8CC7\u6599"
      };
      return categories[category] || "\u672A\u77E5\u985E\u5225";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-faae3368><nav class="admin-nav" data-v-faae3368><div class="nav-content" data-v-faae3368><div class="nav-wrapper" data-v-faae3368>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "btn btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE\u9996\u9801`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE\u9996\u9801")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="page-title" data-v-faae3368>\u77E5\u8B58\u5EAB\u7BA1\u7406</h1><div class="placeholder" data-v-faae3368></div></div></div></nav><div class="admin-container qa-container" data-v-faae3368><div class="action-bar" data-v-faae3368><button class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-faae3368><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-plus", "fas"])}" data-v-faae3368></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : "\u65B0\u589E\u77E5\u8B58")}</button></div>`);
      if (_ctx.isLoading) {
        _push(`<div class="loading-container" data-v-faae3368><div class="loading-spinner" data-v-faae3368></div><p data-v-faae3368>\u8F09\u5165\u4E2D...</p></div>`);
      } else {
        _push(`<div class="table-responsive" data-v-faae3368><table class="admin-table" data-v-faae3368><thead data-v-faae3368><tr data-v-faae3368><th width="5%" data-v-faae3368>ID</th><th width="15%" data-v-faae3368>\u985E\u5225</th><th width="50%" data-v-faae3368>\u6A19\u984C</th><th width="30%" data-v-faae3368>\u64CD\u4F5C</th></tr></thead><tbody data-v-faae3368><!--[-->`);
        ssrRenderList(knowledgeList.value.data.data, (item) => {
          _push(`<tr data-v-faae3368><td data-v-faae3368>${ssrInterpolate(item.kid)}</td><td data-v-faae3368><span class="category-tag" data-v-faae3368>${ssrInterpolate(getCategoryName(item.know_category))}</span></td><td data-v-faae3368>${ssrInterpolate(item.title)}</td><td data-v-faae3368><div class="action-buttons" data-v-faae3368><button class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-faae3368><i class="${ssrRenderClass([item.isLoading ? "fa-spinner fa-spin" : "fa-edit", "fas"])}" data-v-faae3368></i> ${ssrInterpolate(item.isLoading ? "\u8F09\u5165\u4E2D..." : "\u7DE8\u8F2F")}</button><button class="btn btn-danger"${ssrIncludeBooleanAttr(isButtonLoading.value || item.isLoading) ? " disabled" : ""} data-v-faae3368><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-trash", "fas"])}" data-v-faae3368></i> \u522A\u9664 </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showModal.value) {
          _push2(`<div class="modal-overlay" data-v-faae3368><div class="modal-content" data-v-faae3368><h2 data-v-faae3368>${ssrInterpolate(isEditing.value ? "\u7DE8\u8F2F\u77E5\u8B58" : "\u65B0\u589E\u77E5\u8B58")}</h2><form class="admin-form" data-v-faae3368><div class="form-group" data-v-faae3368><label data-v-faae3368>\u985E\u5225</label><select required data-v-faae3368><option value="1" data-v-faae3368${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "1") : ssrLooseEqual(formData.value.know_category, "1")) ? " selected" : ""}>\u61F6\u4EBA\u5305</option><option value="2" data-v-faae3368${ssrIncludeBooleanAttr(Array.isArray(formData.value.know_category) ? ssrLooseContain(formData.value.know_category, "2") : ssrLooseEqual(formData.value.know_category, "2")) ? " selected" : ""}>\u5BA3\u5C0E\u8CC7\u6599</option></select></div><div class="form-group" data-v-faae3368><label data-v-faae3368>\u6A19\u984C</label><input${ssrRenderAttr("value", formData.value.title)} type="text" required placeholder="\u8ACB\u8F38\u5165\u6A19\u984C" data-v-faae3368></div><div class="form-group" data-v-faae3368><label data-v-faae3368>\u5716\u7247 (\u9650\u5236 5MB \u4EE5\u5167)</label><input type="file" accept="image/jpeg,image/png,image/gif"${ssrIncludeBooleanAttr(!isEditing.value) ? " required" : ""} data-v-faae3368>`);
          if (imageError.value) {
            _push2(`<div class="error-message" data-v-faae3368>${ssrInterpolate(imageError.value)}</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (imagePreview.value) {
            _push2(`<img${ssrRenderAttr("src", imagePreview.value)} class="image-preview" alt="\u9810\u89BD\u5716" data-v-faae3368>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="button-group" data-v-faae3368><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-faae3368><i class="${ssrRenderClass([isButtonLoading.value ? "fa-spinner fa-spin" : "fa-save", "fas"])}" data-v-faae3368></i> ${ssrInterpolate(isButtonLoading.value ? "\u8655\u7406\u4E2D..." : isEditing.value ? "\u66F4\u65B0" : "\u65B0\u589E")}</button><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(isButtonLoading.value) ? " disabled" : ""} data-v-faae3368> \u53D6\u6D88 </button></div></form></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/knowledge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const knowledge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-faae3368"]]);

export { knowledge as default };
//# sourceMappingURL=knowledge-CMc5jDut.mjs.map
