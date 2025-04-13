import { _ as __nuxt_component_0 } from './breadcrumb-one-BqIANhBF.mjs';
import { _ as _sfc_main$1 } from './blog-details-area-B2lfFJwv.mjs';
import { _ as __nuxt_component_2 } from './fancy-banner-three-B9vSb4l7.mjs';
import { _ as __nuxt_component_1 } from './newsletter-one-DxGVlyGS.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeoMeta } from './server.mjs';
import './news-data-CYWZWJ0W.mjs';
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

const menu_data = [
  {
    id: 0,
    link: "/",
    title: "\u9996\u9801"
  },
  {
    id: 1,
    link: "/about-us",
    title: "\u8A08\u756B\u7C21\u4ECB"
  },
  {
    id: 2,
    link: "/news",
    title: "\u6700\u65B0\u6D88\u606F"
  },
  {
    id: 3,
    link: "/services",
    title: "\u670D\u52D9\u4ECB\u7D39"
  },
  {
    id: 4,
    link: "/join-us",
    title: "\u6211\u60F3\u4F7F\u7528\u670D\u52D9"
  },
  {
    id: 5,
    link: "/join-us-unit",
    title: "\u6211\u60F3\u6210\u70BA\u8A66\u8FA6\u55AE\u4F4D"
  },
  {
    id: 6,
    link: "/contact",
    title: "\u806F\u7D61\u6211\u5011"
  },
  {
    id: 9,
    link: "/links",
    title: "\u76F8\u95DC\u7DB2\u7AD9\u9023\u7D50"
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
      const _component_newsletter_one = __nuxt_component_1;
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

export { _sfc_main as default };
//# sourceMappingURL=index-B8y3E9jo.mjs.map
