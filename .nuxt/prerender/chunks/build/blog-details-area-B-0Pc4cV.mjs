import { a as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { n as news_data } from './news-data-CYWZWJ0W.mjs';
import { p as publicAssetsURL } from '../_/renderer.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "blog-sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const recent_blogs = news_data.filter((b) => b.page === "news-list").slice(-2);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-sidebar md-mt-60 ps-xxl-4" }, _attrs))}><div class="blog-category mt-60 lg-mt-40 pb-40"><h3 class="sidebar-title">\u5206\u985E</h3><ul class="style-none"><li><a href="#"><span>\u516C\u544A(1)</span></a></li><li><a href="#">\u65B0\u805E\u7A3F <span>(1)</span></a></li><li><a href="#">\u65B0\u805E\u5831\u5C0E <span>(1)</span></a></li><li><a href="#">\u4F7F\u7528\u5FC3\u5F97\u5206\u4EAB <span>(1)</span></a></li></ul></div><div class="blog-recent-news lg-mt-40"><h3 class="sidebar-title">\u904E\u53BB\u6D88\u606F</h3><!--[-->`);
      ssrRenderList(unref(recent_blogs), (b) => {
        _push(`<article class="recent-news"><div class="post-data"><div class="date">${ssrInterpolate(b.date)}</div>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          href: `/blog-details/${b.id}`,
          class: "blog-title"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3${_scopeId}>${ssrInterpolate(b.title)}</h3>`);
            } else {
              return [
                createVNode("h3", null, toDisplayString(b.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></article>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/blog-sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/images/icon/icon_93.svg");
const _imports_1 = publicAssetsURL("/images/blog/blog_img_16.jpg");
const _imports_2 = publicAssetsURL("/images/blog/blog_img_17.jpg");
const _imports_3 = publicAssetsURL("/images/blog/avatar_01.jpg");
const _imports_4 = publicAssetsURL("/images/blog/avatar_02.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blog-details-area",
  __ssrInlineRender: true,
  props: {
    blog: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_form_blog_comment = resolveComponent("form-blog-comment");
      const _component_blog_sidebar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-details position-relative mt-150 lg-mt-80 mb-150 lg-mb-80" }, _attrs))}><div class="container"><div class="row gx-xl-5"><div class="col-lg-8"><article class="blog-meta-two style-two"><figure class="post-img position-relative d-flex align-items-end m0" style="${ssrRenderStyle({ "background-image": "url(/images/blog/blog_img_08.jpg)" })}"><div class="date">${ssrInterpolate(_ctx.blog.date)}</div></figure><div class="post-data"><div class="post-info">${ssrInterpolate(_ctx.blog.post_info)}</div><div class="blog-title"><h4>${ssrInterpolate(_ctx.blog.title)}</h4></div><div class="post-details-meta"><p> Tomfoolery crikey bits and bobs brilliant bamboozled down the pub amongst brolly hanky panky, cack bonnet arse over tit burke bugger all mate bodge. cillum dolore fugiat pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui official deserunt mollit anim id est laborum.Suspendisse interdum consectetur libero id faucib nisl. Lacus vel facilisis volutpat est velit egestas. </p><p> Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Sit amet ris nullam eget felis. Enim praesent elementum facilisis leo. Ultricies leo integer. </p><div class="quote-wrapper"><div class="wrapper"><div class="icon rounded-circle d-flex align-items-center justify-content-center m-auto"><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img"></div><div class="row"><div class="col-xxl-9 col-xl-11 m-auto"><h3> Grow wealth like a tree, roots in savings, branches reaching toward diverse investments. </h3></div></div><h6>James Bond. <span>Founder Agro</span></h6></div></div><div class="row img-gallery"><div class="col-sm-8"><img${ssrRenderAttr("src", _imports_1)} alt="" class="lazy-img w-100"></div><div class="col-sm-4"><img${ssrRenderAttr("src", _imports_2)} alt="" class="lazy-img w-100"></div></div><h3>Work Harder &amp; Gain Success</h3><p> One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in quis elit future. The same Duis aute irure dolor in reprehenderit. </p><ul class="style-none list-item"><li>Find the problem first</li><li>Make research and find out the solution</li><li>Finalize the solution &amp; apply.</li></ul><p> One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in quis elit future. The same Duis aute irure dolor in reprehenderit. sunt in culpa qui official deserunt mollit anim id est laborum. </p></div><div class="bottom-widget d-sm-flex align-items-center justify-content-between"><ul class="d-flex align-items-center tags style-none pt-20"><li>Tag:</li><li><a href="#">Finance</a></li><li><a href="#">Loan</a></li><li><a href="#">Banking</a></li></ul><ul class="d-flex share-icon align-items-center style-none pt-20"><li>Share:</li><li><a href="#"><i class="bi bi-facebook"></i></a></li><li><a href="#"><i class="bi bi-twitter"></i></a></li><li><a href="#"><i class="bi bi-instagram"></i></a></li></ul></div></div></article><div class="blog-comment-area grey-bg"><h3 class="blog-inner-title pb-15">Comments</h3><div class="comment d-flex"><img${ssrRenderAttr("src", _imports_3)} alt="" class="lazy-img user-avatar rounded-circle"><div class="comment-text"><div class="d-md-flex align-items-center justify-content-between"><div class="name fw-500">Kudilum Ahus</div><div class="date">13 June, 23, 7:30pm</div></div><p> Sunt in culpa qui official deserunt mollit anim id est laborum.Suspendisse interdum consectetur libero id faucib nisl. Lacus vel facilisis volutpat est velit egestas. </p><a href="#" class="reply-btn fw-500 tran3s">Reply</a><div class="comment reply-comment d-flex"><img${ssrRenderAttr("src", _imports_3)} alt="" class="lazy-img user-avatar rounded-circle"><div class="comment-text"><div class="d-md-flex align-items-center justify-content-between"><div class="name fw-500">Rashed Kabir</div><div class="date">13 June, 23, 7:30pm</div></div><p> The same Duis aute irure dolor in reprehenderit. sunt in culpa qui official deserunt mollit anim id est laborum. </p><a href="#" class="reply-btn fw-500 tran3s">Reply</a></div></div></div></div><div class="comment d-flex"><img${ssrRenderAttr("src", _imports_4)} alt="" class="lazy-img user-avatar rounded-circle"><div class="comment-text"><div class="d-md-flex align-items-center justify-content-between"><div class="name fw-500">Jubayer Al Hasan</div><div class="date">13 June, 23, 7:30pm</div></div><p> Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Sit amet ris nullam eget felis. </p><a href="#" class="reply-btn fw-500 tran3s">Reply</a></div></div></div><div class="blog-comment-form grey-bg"><h3 class="blog-inner-title">Add Your Comments</h3><p><a href="#" data-bs-toggle="modal" data-bs-target="#loginModal" class="text-decoration-underline fw-500"> Sign in </a> to post your comment or signup if you don&#39;t have any account. </p>`);
      _push(ssrRenderComponent(_component_form_blog_comment, null, null, _parent));
      _push(`</div></div><div class="col-lg-4 col-md-8">`);
      _push(ssrRenderComponent(_component_blog_sidebar, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/blog/blog-details-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=blog-details-area-B-0Pc4cV.mjs.map
