import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "news-details-area",
  __ssrInlineRender: true,
  props: {
    blog: {}
  },
  setup(__props) {
    const showPopup = ref(false);
    const currentIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80" data-v-c6f1e6e9><div class="container" data-v-c6f1e6e9><div class="row gx-xl-5" data-v-c6f1e6e9><div class="col-lg-12" data-v-c6f1e6e9><article class="blog-meta-two style-two" data-v-c6f1e6e9><div class="post-data" data-v-c6f1e6e9>`);
      if (_ctx.blog.id == 1) {
        _push(`<div class="post-head" data-v-c6f1e6e9>\u6D3B\u52D5\u5FEB\u5831</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.blog.id == 2) {
        _push(`<div class="post-head" data-v-c6f1e6e9>\u65B0\u805E\u5FEB\u5831</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="post-startDate" data-v-c6f1e6e9>\u8D77\u59CB\u6D3B\u52D5\u65E5\uFF1A${ssrInterpolate(_ctx.blog.date)}</div><div data-v-c6f1e6e9><div class="post-startDate" data-v-c6f1e6e9>\u767C\u4F48\u65E5\u671F\uFF1A${ssrInterpolate(_ctx.blog.date)}</div><div class="post-category" data-v-c6f1e6e9>\u985E\u5225\uFF1A${ssrInterpolate(_ctx.blog.category)}</div></div>`);
      if (_ctx.blog.post_info) {
        _push(`<div class="post-info" data-v-c6f1e6e9>\u6D3B\u52D5\u8A0A\u606F\uFF1A${ssrInterpolate(_ctx.blog.post_info)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="post-details-meta" data-v-c6f1e6e9> \u5167\u5BB9\uFF1A<br data-v-c6f1e6e9><div class="post-content" data-v-c6f1e6e9>${(_a = _ctx.blog.content) != null ? _a : ""}</div></div>`);
      if (_ctx.blog.links) {
        _push(`<div class="post-links" data-v-c6f1e6e9> \u9023\u7D50\uFF1A<br data-v-c6f1e6e9><div class="post-link-item" data-v-c6f1e6e9><!--[-->`);
        ssrRenderList(_ctx.blog.links, (item) => {
          _push(`<a${ssrRenderAttr("href", item.url)} target="_blank" data-v-c6f1e6e9>${ssrInterpolate(item.name)}</a>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.blog.images) {
        _push(`<div class="post-images" data-v-c6f1e6e9> \u5716\u7247\uFF1A<br data-v-c6f1e6e9><div class="post-images-item" data-v-c6f1e6e9><!--[-->`);
        ssrRenderList(_ctx.blog.images, (item, index) => {
          _push(`<div class="tab-data-item" data-v-c6f1e6e9><img${ssrRenderAttr("src", item.url)} alt="" data-v-c6f1e6e9><p data-v-c6f1e6e9>${ssrInterpolate(item.name)}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></article></div></div></div></div>`);
      if (showPopup.value) {
        _push(`<div class="popup-overlay" data-v-c6f1e6e9><div class="popup-content" data-v-c6f1e6e9>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-c6f1e6e9>\u2039</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", _ctx.blog.images[currentIndex.value].url)} alt="Popup Image" data-v-c6f1e6e9>`);
        if (currentIndex.value < _ctx.blog.images.length - 1) {
          _push(`<button class="arrow right" data-v-c6f1e6e9>\u203A</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-c6f1e6e9>\xD7</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/news/news-details-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6f1e6e9"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=news-details-area-DoFQV0y-.mjs.map
