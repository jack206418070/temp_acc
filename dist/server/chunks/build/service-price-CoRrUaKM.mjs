import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "service-price",
  __ssrInlineRender: true,
  setup(__props) {
    const price_data = ref(null);
    useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (price_data.value) {
        _push(`<div class="service-banner"><div class="main-container"><div class="img"><img${ssrRenderAttr("src", price_data.value.image_url)}${ssrRenderAttr("alt", price_data.value.meta_data.name)}></div></div></div>`);
      } else {
        _push(`<div><p></p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service-price.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=service-price-CoRrUaKM.mjs.map
