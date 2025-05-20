import { _ as __nuxt_component_0 } from './breadcrumb-one-DppbJmMF.mjs';
import { _ as _sfc_main$1 } from './blog-details-area-B-0Pc4cV.mjs';
import { _ as __nuxt_component_2 } from './fancy-banner-three-DTRdL-2N.mjs';
import { _ as __nuxt_component_3 } from './newsletter-one-CM5veuBn.mjs';
import { defineComponent, unref, useSSRContext } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://C:/inetpub/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { u as useSeoMeta } from './server.mjs';
import './news-data-CYWZWJ0W.mjs';
import '../_/nitro.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/h3/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ufo/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/destr/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/hookable/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/klona/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/defu/dist/defu.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/radix3/dist/index.mjs';
import 'node:crypto';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/inetpub/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/inetpub/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/xss/lib/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/ohash/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unctx/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import '../_/renderer.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/server.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/devalue/index.js';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/inetpub/accompany-web-site/node_modules/unhead/dist/utils.mjs';

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

export { _sfc_main as default };
//# sourceMappingURL=index-yNJcFY8R.mjs.map
