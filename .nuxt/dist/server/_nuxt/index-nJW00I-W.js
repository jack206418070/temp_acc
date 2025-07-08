import { _ as __nuxt_component_0 } from "./breadcrumb-one-DppbJmMF.js";
import { _ as _sfc_main$1 } from "./blog-details-area-B-0Pc4cV.js";
import { _ as __nuxt_component_2 } from "./fancy-banner-three-DTRdL-2N.js";
import { _ as __nuxt_component_3 } from "./newsletter-one-CM5veuBn.js";
import { defineComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useSeoMeta } from "../server.mjs";
import "./news-data-CYWZWJ0W.js";
import "#internal/nuxt/paths";
import "ofetch";
import "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
import "@yeger/vue-masonry-wall";
import "vue3-toastify";
import "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
const menu_data = [
  {
    id: 0,
    link: "/",
    title: "首頁"
  },
  {
    id: 1,
    link: "/about-us",
    title: "計畫簡介"
  },
  {
    id: 2,
    link: "/news",
    title: "最新消息"
  },
  {
    id: 3,
    link: "/services",
    title: "服務介紹"
  },
  {
    id: 4,
    link: "/join-us",
    title: "我想使用服務"
  },
  {
    id: 5,
    link: "/join-us-unit",
    title: "我想成為試辦單位"
  },
  {
    id: 6,
    link: "/contact",
    title: "聯絡我們"
  },
  {
    id: 9,
    link: "/links",
    title: "相關網站連結"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "Blog Details - Babun" });
    const blog = menu_data[0];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_breadcrumb_one = __nuxt_component_0;
      const _component_blog_details_area = _sfc_main$1;
      const _component_fancy_banner_three = __nuxt_component_2;
      const _component_newsletter_one = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_breadcrumb_one, {
        title: "Single Blog Details",
        subtitle: "Meet our experts, guiding you through financial intricacies with precision",
        page: "Blog",
        bg_img: "/images/media/img_32.jpg",
        shape: "/images/shape/shape_35.svg",
        style_2: true
      }, null, _parent));
      _push(ssrRenderComponent(_component_blog_details_area, { blog: unref(blog) }, null, _parent));
      _push(ssrRenderComponent(_component_fancy_banner_three, null, null, _parent));
      _push(ssrRenderComponent(_component_newsletter_one, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-details/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-nJW00I-W.js.map
