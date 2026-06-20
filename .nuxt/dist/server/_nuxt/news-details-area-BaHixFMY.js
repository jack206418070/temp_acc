import { defineComponent, ref, computed, useSSRContext } from "vue";
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
    const urlCache = /* @__PURE__ */ new Map();
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };
    const extractBinary = (item) => {
      var _a, _b;
      const raw = ((_a = item.image_content) == null ? void 0 : _a.data) ?? item.image_content ?? ((_b = item.file_content) == null ? void 0 : _b.data) ?? item.file_content;
      if (!raw) return null;
      try {
        if (raw instanceof Uint8Array) return raw;
        if (Array.isArray(raw)) return new Uint8Array(raw);
        if (typeof raw.length === "number") return new Uint8Array(raw);
        return null;
      } catch {
        return null;
      }
    };
    const getMimeType = (item) => {
      var _a;
      if (item == null ? void 0 : item.mime_type) return item.mime_type;
      if (((_a = item == null ? void 0 : item.file_type) == null ? void 0 : _a.toLowerCase()) === "pdf") return "application/pdf";
      return "image/jpeg";
    };
    const getBlobUrl = (item) => {
      const key = `${item.id ?? Math.random()}|${item.file_type ?? "unknown"}`;
      if (urlCache.has(key)) return urlCache.get(key);
      const bin = extractBinary(item);
      if (!bin) return "";
      const blob = new Blob([bin], { type: getMimeType(item) });
      const url = URL.createObjectURL(blob);
      urlCache.set(key, url);
      return url;
    };
    const getImageUrl = (image) => {
      if (!image) return "";
      return getBlobUrl(image);
    };
    const getFileUrl = (file) => {
      if (!file) return "";
      return getBlobUrl(file);
    };
    const imageList = computed(
      () => {
        var _a;
        return Array.isArray((_a = blog.value) == null ? void 0 : _a.images) ? blog.value.images.filter((x) => ((x == null ? void 0 : x.file_type) ?? "").toLowerCase() === "image") : [];
      }
    );
    const pdfList = computed(
      () => {
        var _a;
        return Array.isArray((_a = blog.value) == null ? void 0 : _a.images) ? blog.value.images.filter((x) => ((x == null ? void 0 : x.file_type) ?? "").toLowerCase() === "pdf") : [];
      }
    );
    const decode = (str) => {
      if (!str) return "";
      return str;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80" data-v-4ffeec14><div class="container" data-v-4ffeec14><div class="row gx-xl-5" data-v-4ffeec14><div class="col-lg-12" data-v-4ffeec14><article class="blog-meta-two style-two" data-v-4ffeec14>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-4ffeec14><div class="loading-spinner" data-v-4ffeec14></div><p data-v-4ffeec14>載入中...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-4ffeec14><p data-v-4ffeec14>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<div class="post-data" data-v-4ffeec14><div class="post-head" data-v-4ffeec14>${ssrInterpolate(blog.value.category)}</div><div data-v-4ffeec14><div class="post-startDate" data-v-4ffeec14>發佈日期：${ssrInterpolate(formatDate(blog.value.publish_date))}</div>`);
        if (blog.value.activity_start_date) {
          _push(`<div class="post-startDate" data-v-4ffeec14>活動開始日期：${ssrInterpolate(formatDate(blog.value.activity_start_date))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="post-category" data-v-4ffeec14>類別：${ssrInterpolate(blog.value.category)}</div></div><div class="post-details-meta" data-v-4ffeec14> 內容：<br data-v-4ffeec14><div class="post-content" data-v-4ffeec14>${decode(blog.value.content) ?? ""}</div></div>`);
        if (blog.value.link) {
          _push(`<div class="post-links" data-v-4ffeec14> 連結：<br data-v-4ffeec14><div class="post-link-item" data-v-4ffeec14><a${ssrRenderAttr("href", blog.value.link)} target="_blank" data-v-4ffeec14>${ssrInterpolate(blog.value.linkTitle || blog.value.link)}</a></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (pdfList.value.length > 0) {
          _push(`<div class="post-files" data-v-4ffeec14> 檔案：<br data-v-4ffeec14><div class="post-files-list" data-v-4ffeec14><!--[-->`);
          ssrRenderList(pdfList.value, (file, idx) => {
            _push(`<div class="post-file-item" data-v-4ffeec14><div class="file-left" data-v-4ffeec14><span class="file-name" data-v-4ffeec14>${ssrInterpolate(file.original_filename || `PDF 檔案 ${idx + 1}`)}</span></div><div class="file-actions" data-v-4ffeec14><a class="btn btn-ghost"${ssrRenderAttr("href", getFileUrl(file))} target="_blank" rel="noopener" data-v-4ffeec14>開啟</a><button class="btn btn-primary" data-v-4ffeec14>下載</button></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (imageList.value.length > 0) {
          _push(`<div class="post-images" data-v-4ffeec14> 圖片：<br data-v-4ffeec14><div class="post-images-item" data-v-4ffeec14><!--[-->`);
          ssrRenderList(imageList.value, (image, index) => {
            _push(`<div class="tab-data-item" data-v-4ffeec14><img${ssrRenderAttr("src", getImageUrl(image))} alt="" data-v-4ffeec14></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</article></div></div></div></div>`);
      if (showPopup.value && imageList.value.length) {
        _push(`<div class="popup-overlay" data-v-4ffeec14><div class="popup-content" data-v-4ffeec14>`);
        if (currentIndex.value > 0) {
          _push(`<button class="arrow left" data-v-4ffeec14>‹</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<img${ssrRenderAttr("src", getImageUrl(imageList.value[currentIndex.value]))} alt="Popup Image" data-v-4ffeec14>`);
        if (currentIndex.value < imageList.value.length - 1) {
          _push(`<button class="arrow right" data-v-4ffeec14>›</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-4ffeec14>×</button></div></div>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ffeec14"]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=news-details-area-BaHixFMY.js.map
