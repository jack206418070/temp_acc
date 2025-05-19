import { defineComponent, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "news-details-area",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const blog = ref({});
    const loading = ref(true);
    const error = ref(null);
    const showPopup = ref(false);
    const currentIndex = ref(0);
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    const getImageUrl = (image) => {
      if (!image || !image.image_content || !image.image_content.data) return "";
      const uint8Array = new Uint8Array(image.image_content.data);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    };
    const decode = (str) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80" data-v-481a46e9><div class="container" data-v-481a46e9><div class="row gx-xl-5" data-v-481a46e9><div class="col-lg-12" data-v-481a46e9><article class="blog-meta-two style-two" data-v-481a46e9>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-481a46e9><div class="loading-spinner" data-v-481a46e9></div><p data-v-481a46e9>載入中...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-481a46e9><p data-v-481a46e9>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="post-data" data-v-481a46e9><div class="post-head" data-v-481a46e9>${ssrInterpolate(blog.value.category)}</div><div data-v-481a46e9><div class="post-startDate" data-v-481a46e9>發佈日期：${ssrInterpolate(formatDate(blog.value.publish_date))}</div>`);
        if (blog.value.activity_start_date) {
          _push(`<div class="post-startDate" data-v-481a46e9>活動開始日期：${ssrInterpolate(formatDate(blog.value.activity_start_date))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="post-category" data-v-481a46e9>類別：${ssrInterpolate(blog.value.category)}</div></div><div class="post-details-meta" data-v-481a46e9> 內容：<br data-v-481a46e9><div class="post-content" data-v-481a46e9>${decode(blog.value.content) ?? ""}</div></div>`);
        if (blog.value.link) {
          _push(`<div class="post-links" data-v-481a46e9> 連結：<br data-v-481a46e9><div class="post-link-item" data-v-481a46e9><a${ssrRenderAttr("href", blog.value.link)} target="_blank" data-v-481a46e9>${ssrInterpolate(blog.value.linkTitle || blog.value.link)}</a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (blog.value.images && blog.value.images.length > 0) {
          _push(`<div class="post-images" data-v-481a46e9> 圖片：<br data-v-481a46e9><div class="post-images-item" data-v-481a46e9><!--[-->`);
          ssrRenderList(blog.value.images, (image, index) => {
            _push(`<div class="tab-data-item" data-v-481a46e9><img${ssrRenderAttr("src", getImageUrl(image))} alt="" data-v-481a46e9></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</article></div></div></div></div>`);
      if (showPopup.value && blog.value.images) {
        _push(`<div class="popup-overlay" data-v-481a46e9><div class="popup-content" data-v-481a46e9>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-481a46e9>‹</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", getImageUrl(blog.value.images[currentIndex.value]))} alt="Popup Image" data-v-481a46e9>`);
        if (currentIndex.value < blog.value.images.length - 1) {
          _push(`<button class="arrow right" data-v-481a46e9>›</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-481a46e9>×</button></div></div>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-481a46e9"]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=news-details-area-CjZPzzQ6.js.map
