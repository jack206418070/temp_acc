import { _ as __nuxt_component_0 } from './breadcrumb-one-DppbJmMF.mjs';
import { _ as __nuxt_component_3 } from './newsletter-one-CM5veuBn.mjs';
import { defineComponent, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useSeoMeta } from './server.mjs';
import '../_/nitro.mjs';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'lru-cache';
import 'node:url';
import 'xss';
import 'vue-router';
import '@yeger/vue-masonry-wall';
import 'vue3-toastify';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "story",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({ title: "Blog - Babun" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_breadcrumb_one = __nuxt_component_0;
      const _component_blog_list_area = resolveComponent("blog-list-area");
      const _component_newsletter_one = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_breadcrumb_one, {
        title: "\u4F7F\u7528\u8005\u898B\u8B49",
        subtitle: "Meet our experts, guiding you through financial intricacies with precision",
        page: "\u4F7F\u7528\u8005\u898B\u8B49",
        bg_img: "/images/media/img_32.jpg",
        style_2: true,
        shape: "/images/shape/shape_34.svg"
      }, null, _parent));
      _push(ssrRenderComponent(_component_blog_list_area, null, null, _parent));
      _push(ssrRenderComponent(_component_newsletter_one, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/story.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=story-Dv6pkHq5.mjs.map
