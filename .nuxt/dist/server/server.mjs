import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, ref, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, markRaw, defineComponent, createElementBlock, provide, h, resolveComponent, computed, defineAsyncComponent, unref, Suspense, nextTick, mergeProps, Fragment, withCtx, createVNode, useSSRContext, toDisplayString, createTextVNode, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, createApp } from "vue";
import { $fetch as $fetch$1 } from "ofetch";
import { baseURL, publicAssetsURL } from "#internal/nuxt/paths";
import { createHooks } from "C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs";
import { getContext, executeAsync } from "C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs";
import { sanitizeStatusCode, createError as createError$1, appendHeader, getRequestHeader, setCookie, getCookie, deleteCookie } from "C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs";
import { START_LOCATION, createMemoryHistory, createRouter as createRouter$1, useRoute as useRoute$1, RouterView, useRouter as useRouter$1 } from "vue-router";
import { toRouteMatcher, createRouter } from "C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs";
import { defu } from "C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs";
import { hasProtocol, joinURL, withQuery, isScriptProtocol, parseQuery, withTrailingSlash, withoutTrailingSlash } from "C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs";
import { parse } from "C:/Users/c3d19/accompany-web-site/node_modules/cookie-es/dist/index.mjs";
import destr from "C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs";
import { isEqual } from "C:/Users/c3d19/accompany-web-site/node_modules/nuxt/node_modules/ohash/dist/index.mjs";
import { klona } from "C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs";
import MasonryWall from "@yeger/vue-masonry-wall";
import Vue3Toastify, { toast } from "vue3-toastify";
import { ssrRenderStyle, ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import { useSeoMeta as useSeoMeta$1, headSymbol } from "C:/Users/c3d19/accompany-web-site/node_modules/@unhead/vue/dist/index.mjs";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$8 = {
  layout: "admin"
};
const __nuxt_page_meta$7 = {
  layout: "admin"
};
const __nuxt_page_meta$6 = {
  layout: "admin"
};
const __nuxt_page_meta$5 = {
  layout: "admin"
};
const __nuxt_page_meta$4 = {
  layout: "admin"
};
const __nuxt_page_meta$3 = {
  layout: "admin"
};
const __nuxt_page_meta$2 = {
  layout: "admin"
};
const __nuxt_page_meta$1 = {
  layout: "admin"
};
const __nuxt_page_meta = {
  layout: "admin"
};
const _routes = [
  {
    name: "qa",
    path: "/qa",
    component: () => import("./_nuxt/qa-aq0Vi-Jy.js")
  },
  {
    name: "faq",
    path: "/faq",
    component: () => import("./_nuxt/faq-DN7Dg84r.js")
  },
  {
    name: "index",
    path: "/",
    component: () => import("./_nuxt/index-DZpEdGpy.js")
  },
  {
    name: "links",
    path: "/links",
    component: () => import("./_nuxt/links-JcuG5tzQ.js")
  },
  {
    name: "story",
    path: "/story",
    component: () => import("./_nuxt/story-DQpg3nDz.js")
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import("./_nuxt/contact-BaK7xHY4.js")
  },
  {
    name: "join-us",
    path: "/join-us",
    component: () => import("./_nuxt/join-us-BqWC1I_C.js")
  },
  {
    name: "qa_test",
    path: "/qa_test",
    component: () => import("./_nuxt/qa_test-BKcCJRS8.js")
  },
  {
    name: "support",
    path: "/support",
    component: () => import("./_nuxt/support--7nFxuiH.js")
  },
  {
    name: "about-us",
    path: "/about-us",
    component: () => import("./_nuxt/about-us-BcgP7idh.js")
  },
  {
    name: "admin-qa",
    path: "/admin/qa",
    meta: __nuxt_page_meta$8 || {},
    component: () => import("./_nuxt/qa-3AszYI_I.js")
  },
  {
    name: "lazy-bag",
    path: "/lazy-bag",
    component: () => import("./_nuxt/lazy-bag-DJTD_Cwb.js")
  },
  {
    name: "qa_test2",
    path: "/qa_test2",
    component: () => import("./_nuxt/qa_test2-D2WI1kHp.js")
  },
  {
    name: "services",
    path: "/services",
    component: () => import("./_nuxt/services-CsLRwvfJ.js")
  },
  {
    name: "news-id",
    path: "/news/:id()",
    component: () => import("./_nuxt/_id_-DHSIj8uh.js")
  },
  {
    name: "news",
    path: "/news",
    component: () => import("./_nuxt/index-DHlQKiK7.js")
  },
  {
    name: "propaganda",
    path: "/propaganda",
    component: () => import("./_nuxt/propaganda-CJmHRK-b.js")
  },
  {
    name: "service-v1",
    path: "/service-v1",
    component: () => import("./_nuxt/service-v1-DmtyHeXh.js")
  },
  {
    name: "admin-login",
    path: "/admin/login",
    meta: __nuxt_page_meta$7 || {},
    component: () => import("./_nuxt/login-DAn8IU6K.js")
  },
  {
    name: "service-now",
    path: "/service-now",
    component: () => import("./_nuxt/service-now-CGHRzhi_.js")
  },
  {
    name: "announcement",
    path: "/announcement",
    component: () => import("./_nuxt/announcement-v2ojhiCr.js")
  },
  {
    name: "conduct-plan",
    path: "/conduct-plan",
    component: () => import("./_nuxt/conduct-plan-B1bGOXb7.js")
  },
  {
    name: "join-us-unit",
    path: "/join-us-unit",
    component: () => import("./_nuxt/join-us-unit-Cdjn5YLx.js")
  },
  {
    name: "admin-banners",
    path: "/admin/banners",
    meta: __nuxt_page_meta$6 || {},
    component: () => import("./_nuxt/banners-DySzUbe6.js")
  },
  {
    name: "reserve-guide",
    path: "/reserve-guide",
    component: () => import("./_nuxt/reserve-guide-CBzduHPw.js")
  },
  {
    name: "service-price",
    path: "/service-price",
    component: () => import("./_nuxt/service-price-DSIaZjpU.js")
  },
  {
    name: "admin-dashboard",
    path: "/admin/dashboard",
    meta: __nuxt_page_meta$5 || {},
    component: () => import("./_nuxt/dashboard-CL1QoSc9.js")
  },
  {
    name: "admin-knowledge",
    path: "/admin/knowledge",
    meta: __nuxt_page_meta$4 || {},
    component: () => import("./_nuxt/knowledge-BrKPT3Ls.js")
  },
  {
    name: "censor-standard",
    path: "/censor-standard",
    component: () => import("./_nuxt/censor-standard-B4O4PFao.js")
  },
  {
    name: "company-statute",
    path: "/company-statute",
    component: () => import("./_nuxt/company-statute-BIu6BQ0o.js")
  },
  {
    name: "admin-knowledge2",
    path: "/admin/knowledge2",
    meta: __nuxt_page_meta$3 || {},
    component: () => import("./_nuxt/knowledge2-DI1r-zYW.js")
  },
  {
    name: "admin-qa_setting",
    path: "/admin/qa_setting",
    meta: __nuxt_page_meta$2 || {},
    component: () => import("./_nuxt/qa_setting-BcxCBAXr.js")
  },
  {
    name: "all-contact-info",
    path: "/all-contact-info",
    component: () => import("./_nuxt/all-contact-info-DR4O_oyp.js")
  },
  {
    name: "application-form",
    path: "/application-form",
    component: () => import("./_nuxt/application-form-C5wKLweg.js")
  },
  {
    name: "blog-details-id",
    path: "/blog-details/:id()",
    component: () => import("./_nuxt/_id_-BZ8uuygS.js")
  },
  {
    name: "convert-principle",
    path: "/convert-principle",
    component: () => import("./_nuxt/convert-principle-Dh8BqjgV.js")
  },
  {
    name: "admin-service-unit",
    path: "/admin/service-unit",
    meta: __nuxt_page_meta$1 || {},
    component: () => import("./_nuxt/service-unit-CZpLtMeF.js")
  },
  {
    name: "blog-details",
    path: "/blog-details",
    component: () => import("./_nuxt/index-BGY4yu61.js")
  },
  {
    name: "service-apply-form",
    path: "/service-apply-form",
    component: () => import("./_nuxt/service-apply-form-D4_103aJ.js")
  },
  {
    name: "admin-announcements",
    path: "/admin/announcements",
    meta: __nuxt_page_meta || {},
    component: () => import("./_nuxt/announcements-Dz0tUETr.js")
  },
  {
    name: "employment-services",
    path: "/employment-services",
    component: () => import("./_nuxt/employment-services-BSbYfNmA.js")
  },
  {
    name: "foreign-famliy-link",
    path: "/foreign-famliy-link",
    component: () => import("./_nuxt/foreign-famliy-link-CEX196hk.js")
  },
  {
    name: "experience-share-id",
    path: "/experience-share/:id()",
    component: () => import("./_nuxt/_id_-DSTCWeJM.js")
  },
  {
    name: "experience-share",
    path: "/experience-share",
    component: () => import("./_nuxt/index-CGMPnvob.js")
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => {
    var _a;
    return (_a = children.default) == null ? void 0 : _a.call(children);
  } };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    let position = savedPosition || void 0;
    if (!position && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, "instant", position));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, "instant", position)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, scrollBehaviorType, position) {
  if (position) {
    return position;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: scrollBehaviorType
    };
  }
  return { left: 0, top: 0, behavior: scrollBehaviorType };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const hashMode = false;
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function prerenderRoutes(path) {
  if (!import.meta.prerender) {
    return;
  }
  const paths = toArray(path);
  appendHeader(useRequestEvent(), "x-nitro-prerender", paths.map((p) => encodeURIComponent(p)).join(", "));
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  if (to.path === "/admin/login") {
    console.log("auth.global.js");
    const token = useCookie("auth_token").value;
    if (token) {
      try {
        const response = ([__temp, __restore] = executeAsync(() => $fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })), __temp = await __temp, __restore(), __temp);
        if (response.valid) {
          return navigateTo("/admin/dashboard");
        }
      } catch (error) {
        console.error("Token 驗證失敗:", error);
      }
    }
    return;
  }
  if (to.path.startsWith("/admin")) {
    console.log("admin");
    const token = useCookie("auth_token").value;
    console.log("token:", token);
    if (!token) {
      console.log("沒有 token，重定向到登入頁面");
      return navigateTo("/admin/login");
    }
    try {
      const response = ([__temp, __restore] = executeAsync(() => $fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })), __temp = await __temp, __restore(), __temp);
      if (!response.valid) {
        console.log("token 無效，重定向到登入頁面");
        return navigateTo("/admin/login");
      }
    } catch (error) {
      console.error("驗證失敗:", error);
      return navigateTo("/admin/login");
    }
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  auth_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = false;
(process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT;
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_1$2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a;
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (link == null ? void 0 : link.isActive) ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (link == null ? void 0 : link.isExactActive) ?? computed(() => to.value === router.currentRoute.value.path),
      route: (link == null ? void 0 : link.route) ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      ref(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
    // }) as unknown as DefineComponent<NuxtLinkProps, object, object, ComputedOptions, MethodOptions, object, object, EmitsOptions, string, object, NuxtLinkProps, object, SlotsType<NuxtLinkSlots>>
  });
}
const __nuxt_component_0$2 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const vue_masonry_wall_T6O6xOAGm1QFl5vs4xpy74tK8LKnfdaZdBJweexbWNE = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MasonryWall);
});
const vue3_toastify_tU4V_Q_3gRw3rPPdj6Y_FGU4jrEWuLb9DIUytSnZjGI = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    position: "top-center",
    autoClose: 3e3,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: void 0
  });
  return {
    provide: { toast }
  };
});
let routes;
const prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  if (!import.meta.prerender || hashMode) {
    return;
  }
  if (routes && !routes.length) {
    return;
  }
  (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules;
  routes || (routes = Array.from(processRoutes(([__temp, __restore] = executeAsync(() => {
    var _a;
    return (_a = routerOptions.routes) == null ? void 0 : _a.call(routerOptions, _routes);
  }), __temp = await __temp, __restore(), __temp) ?? _routes)));
  const batch = routes.splice(0, 10);
  prerenderRoutes(batch);
});
const OPTIONAL_PARAM_RE = /^\/?:.*(?:\?|\(\.\*\)\*)$/;
function shouldPrerender(path) {
  return true;
}
function processRoutes(routes2, currentPath = "/", routesToPrerender = /* @__PURE__ */ new Set()) {
  var _a;
  for (const route of routes2) {
    if (OPTIONAL_PARAM_RE.test(route.path) && !((_a = route.children) == null ? void 0 : _a.length) && shouldPrerender()) {
      routesToPrerender.add(currentPath);
    }
    if (route.path.includes(":")) {
      continue;
    }
    const fullPath = joinURL(currentPath, route.path);
    {
      routesToPrerender.add(fullPath);
    }
    if (route.children) {
      processRoutes(route.children, fullPath, routesToPrerender);
    }
  }
  return routesToPrerender;
}
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  vue_masonry_wall_T6O6xOAGm1QFl5vs4xpy74tK8LKnfdaZdBJweexbWNE,
  vue3_toastify_tU4V_Q_3gRw3rPPdj6Y_FGU4jrEWuLb9DIUytSnZjGI,
  prerender_server_sqIxOBipVr4FbVMA9kqWL0wT8FPop6sKAXLVfifsJzk
];
const layouts = {
  admin: defineAsyncComponent(() => import("./_nuxt/admin-DJVnVVUB.js").then((m) => m.default || m)),
  default: defineAsyncComponent(() => import("./_nuxt/default-CvBusW8F.js").then((m) => m.default || m)),
  "layout-one": defineAsyncComponent(() => import("./_nuxt/layout-one-fx4gHe48.js").then((m) => m.default || m))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1$1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtPage = __nuxt_component_1$1;
      _push(`<!--[--><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LRLKWQD" height="0" width="0" style="${ssrRenderStyle({ "display": "none", "visibility": "hidden" })}"></iframe></noscript>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const menu_data = [
  {
    id: 0,
    link: "/",
    title: "首頁"
  },
  {
    id: 1,
    link: "/about-us",
    title: "計畫簡介",
    dropdown: true,
    dropdown_menus: [
      {
        link: "/about-us",
        title: "計畫內容簡介",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      },
      {
        link: "/company-statute",
        title: "多元陪伴照顧服務法規",
        sub_menus: [
          { link: "/conduct-plan", title: "多元陪伴照顧服務試辦計劃" },
          { link: "/employment-services", title: "就業服務法" },
          { link: "/censor-standard", title: "藍領審查標準" },
          { link: "/convert-principle", title: "外國人轉換原則" }
          // {link:'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090001',title:'就業服務法'},
          // {link:'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090029',title:'藍領審查標準'},
          // {link:'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0090023',title:'外國人轉換原則'},
        ],
        sub_id: 1,
        sub_dropdown: true,
        is_highlight: false
      },
      {
        link: "/propaganda",
        title: "懶人包/宣導資料",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      }
    ]
  },
  {
    id: 2,
    link: "/",
    title: "最新消息",
    dropdown: true,
    dropdown_menus: [
      {
        link: "/announcement",
        title: "公告/新聞稿",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      },
      {
        link: "/news",
        title: "新聞報導",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      },
      {
        link: "/experience-share",
        title: "使用心得分享",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      }
    ]
  },
  {
    id: 3,
    link: "/services",
    title: "預約服務",
    dropdown: true,
    dropdown_menus: [
      {
        link: "https://serve-mcs.wda.gov.tw",
        title: "我要預約",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: true
      },
      {
        link: "/reserve-guide",
        title: "預約指引",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      },
      {
        link: "/services",
        title: "試辦單位簡介",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      }
    ]
  },
  {
    id: 4,
    link: "/join-us-unit",
    title: "試辦單位",
    dropdown: true,
    dropdown_menus: [
      {
        link: "/service-now",
        title: "現有試辦單位簡介",
        sub_id: 0,
        sub_dropdown: false,
        is_highlight: false
      },
      {
        link: "/application-form",
        title: "試辦單位申請及審查系統",
        sub_id: 2,
        sub_dropdown: true,
        sub_menus: [
          { link: "/join-us-unit", title: "申請資格與評選流程" },
          { link: "/application-form", title: "填寫申請表" },
          { link: "/service-apply-form", title: "多元陪伴照顧服務試辦單位申請表" }
        ],
        is_highlight: false
      }
    ]
  },
  {
    id: 5,
    link: "/faq",
    title: "常見問題"
  },
  {
    id: 6,
    link: "/contact",
    title: "聯絡我們"
  },
  {
    id: 7,
    link: "/links",
    title: "相關網站連結"
  }
];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "header-nav-menus",
  __ssrInlineRender: true,
  props: {
    logo: { default: "/images/logo/logo_02.png" }
  },
  emits: ["update-overflow"],
  setup(__props, { emit: __emit }) {
    const router = useRouter$1();
    const isTouchDevice = ref(false);
    const activeMenu = ref(null);
    const activeSubMenu = ref(null);
    const emit = __emit;
    const isActive = (menu) => activeMenu.value === menu.id;
    const isSubActive = (menu) => activeSubMenu.value === menu.sub_id;
    const route = useRoute();
    const closeMenu = (type = "", link = null) => {
      emit("update-overflow", false);
      const navbarCollapse = (void 0).getElementById("navbarNav");
      if (navbarCollapse) {
        navbarCollapse.classList.remove("show");
      }
      if (type == "subMenu" && link) {
        router.push(link);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "navbar-nav align-items-lg-center justify-content-between w-100" }, _attrs))} data-v-c8c9807a><!--[-->`);
      ssrRenderList(unref(menu_data), (menu) => {
        _push(`<li class="${ssrRenderClass(`nav-item ${menu.dropdown ? "dropdown" : ""} ${menu.mega_menu ? "dropdown mega-dropdown-sm" : ""}`)}" data-v-c8c9807a>`);
        if (menu.dropdown) {
          _push(`<!--[--><a style="${ssrRenderStyle({ "display": "flex", "gap": "20px" })}" class="${ssrRenderClass([{ "arrow-left": isTouchDevice.value, "rotated": isActive(menu) }, "nav-link"])}"${ssrRenderAttr("href", menu.link ? menu.link : "#")} role="button" data-v-c8c9807a>`);
          if (isTouchDevice.value) {
            _push(`<span class="${ssrRenderClass({ "rotated": isActive(menu) })}" data-v-c8c9807a><i class="bi bi-chevron-down" data-v-c8c9807a></i></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(menu.title)}</a><ul class="${ssrRenderClass([{ show: isActive(menu) }, "dropdown-menu"])}" data-v-c8c9807a><!--[-->`);
          ssrRenderList(menu.dropdown_menus, (dm, i) => {
            _push(`<li class="dropdown" data-v-c8c9807a>`);
            if (dm.sub_dropdown) {
              _push(`<!--[-->`);
              if (!isTouchDevice.value) {
                _push(`<div data-v-c8c9807a>`);
                _push(ssrRenderComponent(_component_nuxt_link, {
                  href: dm.link,
                  class: ["dropdown-item", { active: unref(route).path === dm.link, hightlight: dm.is_highlight }],
                  onClick: closeMenu
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<span data-v-c8c9807a${_scopeId}>${ssrInterpolate(dm.title)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(dm.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</div>`);
              } else {
                _push(`<div data-v-c8c9807a><p class="d-none" data-v-c8c9807a>in</p><a class="nav-link" style="${ssrRenderStyle({ "display": "flex", "gap": "30px" })}" href="javascript:;" role="button" data-v-c8c9807a>`);
                if (isTouchDevice.value) {
                  _push(`<span class="${ssrRenderClass({ "rotated": isSubActive(dm) })}" data-v-c8c9807a><i class="bi bi-chevron-down" data-v-c8c9807a></i></span>`);
                } else {
                  _push(`<!---->`);
                }
                _push(` ${ssrInterpolate(dm.title)}</a></div>`);
              }
              _push(`<ul style="${ssrRenderStyle({ "padding-left": "20px" })}" class="${ssrRenderClass([{ show: isSubActive(dm) || !isTouchDevice.value }, "dropdown-menu"])}" data-v-c8c9807a><!--[-->`);
              ssrRenderList(dm.sub_menus, (sub, j) => {
                _push(`<li data-v-c8c9807a>`);
                _push(ssrRenderComponent(_component_nuxt_link, {
                  href: sub.link,
                  class: ["dropdown-item", { active: unref(route).path === sub.link }],
                  onClick: closeMenu
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<span data-v-c8c9807a${_scopeId}>${ssrInterpolate(sub.title)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(sub.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              });
              _push(`<!--]--></ul><!--]-->`);
            } else {
              _push(ssrRenderComponent(_component_nuxt_link, {
                href: dm.link,
                class: ["dropdown-item", { active: unref(route).path === dm.link, highlight: dm.is_highlight }],
                onClick: closeMenu
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span data-v-c8c9807a${_scopeId}>${ssrInterpolate(dm.title)}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(dm.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul><!--]-->`);
        } else if (menu.mega_menu) {
          _push(`<!--[--><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" data-v-c8c9807a>${ssrInterpolate(menu.title)}</a><ul class="dropdown-menu" data-v-c8c9807a><li class="row gx-1" data-v-c8c9807a><!--[-->`);
          ssrRenderList(menu.mega_menus, (mm) => {
            _push(`<div class="col-lg-4" data-v-c8c9807a><div class="menu-column" data-v-c8c9807a><ul class="style-none mega-dropdown-list" data-v-c8c9807a><!--[-->`);
            ssrRenderList(mm.menus, (sm, i) => {
              _push(`<li data-v-c8c9807a>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                href: sm.link,
                class: ["dropdown-item", { active: unref(route).path === sm.link }],
                onClick: closeMenu
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span data-v-c8c9807a${_scopeId}>${ssrInterpolate(sm.title)}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(sm.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push(`</li>`);
            });
            _push(`<!--]--></ul></div></div>`);
          });
          _push(`<!--]--></li></ul><!--]-->`);
        } else {
          _push(`<!--[-->`);
          if (menu.title == "首頁") {
            _push(`<!--[-->`);
            if (!isTouchDevice.value) {
              _push(ssrRenderComponent(_component_nuxt_link, {
                class: "nav-link moblie-no-dropdown",
                href: menu.link ? menu.link : "#",
                role: "button",
                onClick: closeMenu
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(menu.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(menu.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(ssrRenderComponent(_component_nuxt_link, {
              class: "nav-link moblie-no-dropdown",
              href: menu.link ? menu.link : "#",
              role: "button",
              onClick: closeMenu
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(menu.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(menu.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/header-nav-menus.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c8c9807a"]]);
const _imports_0$1 = publicAssetsURL("/images/assets/logo.avif");
function useSticky() {
  let isSticky = ref(false);
  return { isSticky };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "header-one",
  __ssrInlineRender: true,
  setup(__props) {
    useSticky();
    const search_text = ref("");
    const is_overflow = ref(false);
    const handleOverflowChange = (value) => {
      is_overflow.value = value;
      if (is_overflow.value) {
        (void 0).body.style.overflow = "hidden";
      } else {
        (void 0).body.style.overflow = "";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_header_nav_menus = __nuxt_component_1;
      const _component_popup_login = resolveComponent("popup-login");
      _push(`<!--[--><header class="theme-main-menu menu-style-two sticky-menu fixed" data-v-58b8cfae><div class="main-container inner-content" data-v-58b8cfae><div class="top-header position-relative" data-v-58b8cfae><div class="d-flex flex-wrap align-items-center justify-content-between" data-v-58b8cfae><div class="logo order-lg-0 order-2 w-40" data-v-58b8cfae>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        href: "/",
        class: "d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0$1)} alt="" data-v-58b8cfae${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0$1,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="navbar navbar-expand-lg p0 order-lg-4 order-1 menu-block" data-v-58b8cfae><button class="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"${ssrRenderAttr("aria-expanded", is_overflow.value ? "true" : "false")} aria-label="Toggle navigation" data-v-58b8cfae><span data-v-58b8cfae></span></button><div class="collapse navbar-collapse" id="navbarNav" data-v-58b8cfae>`);
      _push(ssrRenderComponent(_component_header_nav_menus, { onUpdateOverflow: handleOverflowChange }, null, _parent));
      _push(`</div></nav><div class="d-flex align-items-center justify-content-between gap-mid order-lg-2 order-3" data-v-58b8cfae><div class="d-lg-flex align-items-center justify-content-end blog-sidebar d-none" data-v-58b8cfae><form action="#" class="d-flex sidebar-search" data-v-58b8cfae><span class="search-icon" data-v-58b8cfae><i class="bi bi-search" data-v-58b8cfae></i></span>`);
      if (search_text.value) {
        _push(`<div class="close-block" data-v-58b8cfae><span class="close-btn" data-v-58b8cfae><svg width="8" height="9" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg" data-v-58b8cfae><path d="M8 1.057 7.293.35 4 3.643.707.35 0 1.057 3.293 4.35 0 7.643l.707.707L4 5.057 7.293 8.35 8 7.643 4.707 4.35 8 1.057Z" fill="currentcolor" data-v-58b8cfae></path></svg></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", search_text.value)} type="text" placeholder="搜尋.." data-v-58b8cfae></form></div><button class="login-btn d-flex align-items-center btn-one tran3s" data-v-58b8cfae><a class="" href="https://serve-mcs.wda.gov.tw" target="" data-v-58b8cfae>登入/註冊</a></button></div><div class="d-lg-none align-items-center justify-content-end blog-sidebar d-flex order-4 w-100" data-v-58b8cfae><form action="#" class="d-flex sidebar-search" data-v-58b8cfae><span class="search-icon" data-v-58b8cfae><i class="bi bi-search" data-v-58b8cfae></i></span>`);
      if (search_text.value) {
        _push(`<div class="close-block" data-v-58b8cfae><span class="close-btn" data-v-58b8cfae><svg width="8" height="9" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg" data-v-58b8cfae><path d="M8 1.057 7.293.35 4 3.643.707.35 0 1.057 3.293 4.35 0 7.643l.707.707L4 5.057 7.293 8.35 8 7.643 4.707 4.35 8 1.057Z" fill="currentcolor" data-v-58b8cfae></path></svg></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", search_text.value)} type="text" placeholder="搜尋.." data-v-58b8cfae></form></div></div></div></div></header>`);
      _push(ssrRenderComponent(_component_popup_login, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/header-one.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-58b8cfae"]]);
const _imports_0 = publicAssetsURL("/images/assets/ils_05.svg");
const _imports_1 = publicAssetsURL("/images/assets/ils_06.svg");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: ["error"],
  setup(__props) {
    useSeoMeta({ title: "Error - Babun" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_header_one = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-page-wrapper" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_header_one, null, null, _parent));
      _push(`<main><div class="error-page text-center d-flex align-items-center justify-content-center flex-column light-bg position-relative"><h1 class="font-magnita">${ssrInterpolate(__props.error.statusCode)}</h1><h2 class="fw-bold">${ssrInterpolate(__props.error.message)}</h2><p class="text-lg mb-45">Publishing industries for previewing layouts &amp; visual mockups used.</p><div>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        href: "/",
        class: "btn-four"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go Back`);
          } else {
            return [
              createTextVNode("Go Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><img${ssrRenderAttr("src", _imports_0)} alt="" class="lazy-img shapes shape_01"><img${ssrRenderAttr("src", _imports_1)} alt="" class="lazy-img shapes shape_02"></div></main></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
export {
  _export_sfc as _,
  __nuxt_component_0$2 as a,
  useRouter as b,
  useRoute as c,
  __nuxt_component_1$2 as d,
  entry$1 as default,
  __nuxt_component_0 as e,
  useSeoMeta as u
};
//# sourceMappingURL=server.mjs.map
