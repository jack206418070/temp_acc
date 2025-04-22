import { defineComponent, ref, h, resolveComponent, hasInjectionContext, inject, computed, withCtx, createVNode, getCurrentInstance, watchEffect, watch, mergeProps, unref, toDisplayString, createTextVNode, version, defineAsyncComponent, provide, shallowReactive, Suspense, Fragment, useSSRContext, createApp, toRef, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, reactive, effectScope, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, nextTick, getCurrentScope, markRaw } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/index.mjs';
import { $fetch as $fetch$1 } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import { p as publicAssetsURL, f as baseURL } from '../nitro/nitro.mjs';
import { createHooks } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import { getContext } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import { sanitizeStatusCode, createError as createError$1, appendHeader, getRequestHeader, setCookie, getCookie, deleteCookie } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { getActiveHead, CapoPlugin } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin, composableNames, unpackMeta } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@unhead/shared/dist/index.mjs';
import { useRouter as useRouter$1, useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue-router/dist/vue-router.node.mjs';
import { toRouteMatcher, createRouter as createRouter$1 } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import { defu } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import { parseQuery, hasProtocol, joinURL, withQuery, isScriptProtocol, withTrailingSlash, withoutTrailingSlash } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import { parse } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/cookie-es/dist/index.mjs';
import destr from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import { isEqual } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import MasonryWall from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/@yeger/vue-masonry-wall/dist/index.mjs';
import Vue3Toastify, { toast } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue3-toastify/dist/index.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderSuspense, ssrRenderVNode } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import 'node:crypto';
import 'node:fs';
import 'node:url';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/express/index.js';
import 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/xss/lib/index.js';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const appLayoutTransition = false;
const appPageTransition = false;
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
        return "3.15.4";
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
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
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
  if (!to) {
    to = "/";
  }
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
    error2.value = error2.value || nuxtError;
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
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
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
function handleHotUpdate(_router, _generateRoutes) {
}
const _routes = [
  {
    name: "about-us",
    path: "/about-us",
    component: () => import('./about-us-NhcPjnsM.mjs')
  },
  {
    name: "admin-announcements",
    path: "/admin/announcements",
    meta: __nuxt_page_meta$8 || {},
    component: () => import('./announcements-BIHLeMaJ.mjs')
  },
  {
    name: "admin-banners",
    path: "/admin/banners",
    meta: __nuxt_page_meta$7 || {},
    component: () => import('./banners-CwloUFZ4.mjs')
  },
  {
    name: "admin-dashboard",
    path: "/admin/dashboard",
    meta: __nuxt_page_meta$6 || {},
    component: () => import('./dashboard-09iO2yJ3.mjs')
  },
  {
    name: "admin-knowledge",
    path: "/admin/knowledge",
    meta: __nuxt_page_meta$5 || {},
    component: () => import('./knowledge-DnNI907_.mjs')
  },
  {
    name: "admin-knowledge2",
    path: "/admin/knowledge2",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./knowledge2-C7kLQOyK.mjs')
  },
  {
    name: "admin-login",
    path: "/admin/login",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./login-BS3sIsv3.mjs')
  },
  {
    name: "admin-qa_setting",
    path: "/admin/qa_setting",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./qa_setting-D830QVPh.mjs')
  },
  {
    name: "admin-qa",
    path: "/admin/qa",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./qa-BeJXmSN8.mjs')
  },
  {
    name: "admin-service-unit",
    path: "/admin/service-unit",
    meta: __nuxt_page_meta || {},
    component: () => import('./service-unit-1CgxgcAT.mjs')
  },
  {
    name: "all-contact-info",
    path: "/all-contact-info",
    component: () => import('./all-contact-info-BGtZ9dAJ.mjs')
  },
  {
    name: "announcement",
    path: "/announcement",
    component: () => import('./announcement-DX-yKHMv.mjs')
  },
  {
    name: "application-form",
    path: "/application-form",
    component: () => import('./application-form-Bkbl6GqM.mjs')
  },
  {
    name: "blog-details-id",
    path: "/blog-details/:id()",
    component: () => import('./_id_-BTNoU7VI.mjs')
  },
  {
    name: "blog-details",
    path: "/blog-details",
    component: () => import('./index-CyRMcyKB.mjs')
  },
  {
    name: "censor-standard",
    path: "/censor-standard",
    component: () => import('./censor-standard-xUA5DBl8.mjs')
  },
  {
    name: "company-statute",
    path: "/company-statute",
    component: () => import('./company-statute-By5XhbxK.mjs')
  },
  {
    name: "conduct-plan",
    path: "/conduct-plan",
    component: () => import('./conduct-plan-Driaty35.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import('./contact-B2EnhjOs.mjs')
  },
  {
    name: "convert-principle",
    path: "/convert-principle",
    component: () => import('./convert-principle-iEePCYmi.mjs')
  },
  {
    name: "employment-services",
    path: "/employment-services",
    component: () => import('./employment-services-BDSH_69D.mjs')
  },
  {
    name: "experience-share-id",
    path: "/experience-share/:id()",
    component: () => import('./_id_-1_SyI0T9.mjs')
  },
  {
    name: "experience-share",
    path: "/experience-share",
    component: () => import('./index-BK1dNepy.mjs')
  },
  {
    name: "faq",
    path: "/faq",
    component: () => import('./faq-Dr2P90WS.mjs')
  },
  {
    name: "foreign-famliy-link",
    path: "/foreign-famliy-link",
    component: () => import('./foreign-famliy-link-BNZNplcJ.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-CdZXShsN.mjs')
  },
  {
    name: "join-us-unit",
    path: "/join-us-unit",
    component: () => import('./join-us-unit-BwVeY5Hn.mjs')
  },
  {
    name: "join-us",
    path: "/join-us",
    component: () => import('./join-us-CsqnMYkh.mjs')
  },
  {
    name: "lazy-bag",
    path: "/lazy-bag",
    component: () => import('./lazy-bag-DRjYhS4H.mjs')
  },
  {
    name: "links",
    path: "/links",
    component: () => import('./links-BlHH_5kU.mjs')
  },
  {
    name: "news-id",
    path: "/news/:id()",
    component: () => import('./_id_-BitfBGza.mjs')
  },
  {
    name: "news",
    path: "/news",
    component: () => import('./index-VIZz59jq.mjs')
  },
  {
    name: "propaganda",
    path: "/propaganda",
    component: () => import('./propaganda-Byrj19fJ.mjs')
  },
  {
    name: "qa_test",
    path: "/qa_test",
    component: () => import('./qa_test-aWfEdz63.mjs')
  },
  {
    name: "qa_test2",
    path: "/qa_test2",
    component: () => import('./qa_test2-C-vJVtGP.mjs')
  },
  {
    name: "qa",
    path: "/qa",
    component: () => import('./qa-uoS6l90s.mjs')
  },
  {
    name: "reserve-guide",
    path: "/reserve-guide",
    component: () => import('./reserve-guide-C1QyfCmB.mjs')
  },
  {
    name: "service-apply-form",
    path: "/service-apply-form",
    component: () => import('./service-apply-form-BMiEoC65.mjs')
  },
  {
    name: "service-now",
    path: "/service-now",
    component: () => import('./service-now-B-8XGp-F.mjs')
  },
  {
    name: "service-price",
    path: "/service-price",
    component: () => import('./service-price-BA8ar9yQ.mjs')
  },
  {
    name: "service-v1",
    path: "/service-v1",
    component: () => import('./service-v1-3xYZ3X_9.mjs')
  },
  {
    name: "services",
    path: "/services",
    component: () => import('./services-Ci6fsnri.mjs')
  },
  {
    name: "story",
    path: "/story",
    component: () => import('./story-lRiO0X6A.mjs')
  },
  {
    name: "support",
    path: "/support",
    component: () => import('./support--u9Xsuit.mjs')
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
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
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
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function prerenderRoutes(path) {
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
      }
    }
    return;
  }
  if (to.path.startsWith("/admin")) {
    const token = useCookie("auth_token").value;
    if (!token) {
      return navigateTo("/admin/login");
    }
    try {
      const response = ([__temp, __restore] = executeAsync(() => $fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })), __temp = await __temp, __restore(), __temp);
      if (!response.valid) {
        return navigateTo("/admin/login");
      }
    } catch (error) {
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
    const router = createRouter({
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
    handleHotUpdate(router, routerOptions.routes ? routerOptions.routes : (routes22) => routes22);
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
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
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
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
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
          if (result || result === false) {
            return result;
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
        await nuxtApp.runWithContext(() => showError(createError$1({
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
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
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
const piniaSymbol = Symbol("pinia") ;
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
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
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
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
      return resolveTrailingSlashBehavior(path, router.resolve);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return resolveTrailingSlashBehavior(
          href2,
          router.resolve
          /* will not be called */
        );
      }
      if (typeof to.value === "object") {
        return ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null;
      }
      return resolveTrailingSlashBehavior(
        joinURL(config.app.baseURL, to.value),
        router.resolve
        /* will not be called */
      );
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
      async navigate() {
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
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const vue_masonry_wall_13R6vu58Yn = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MasonryWall);
});
const vue3_toastify_OGYNDsiW9E = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
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
const prerender_server_LXx1wM9sKF = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
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
  unhead_KgADcZ0jPj,
  plugin$1,
  revive_payload_server_eJ33V7gbc6,
  plugin,
  components_plugin_KR1HBZs4kY,
  vue_masonry_wall_13R6vu58Yn,
  vue3_toastify_OGYNDsiW9E,
  prerender_server_LXx1wM9sKF
];
const layouts = {
  admin: defineAsyncComponent(() => import('./admin-Bk7Ssp_y.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./default-BsB9y4qf.mjs').then((m) => m.default || m)),
  "layout-one": defineAsyncComponent(() => import('./layout-one-Bl6i4fiO.mjs').then((m) => m.default || m))
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
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
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
const RouteProvider = defineComponent({
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
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          {
            vnode = h(Suspense, {
              suspensible: true
            }, {
              default: () => {
                const providerVNode = h(RouteProvider, {
                  key: key || void 0,
                  vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                  route: routeProps.route,
                  renderKey: key || void 0,
                  vnodeRef: pageRef
                });
                return providerVNode;
              }
            });
            return vnode;
          }
        }
      });
    };
  }
});
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtPage = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
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
        title: "想成為試辦單位",
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
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "navbar-nav align-items-lg-center justify-content-between w-100" }, _attrs))} data-v-4471887d><!--[-->`);
      ssrRenderList(unref(menu_data), (menu) => {
        _push(`<li class="${ssrRenderClass(`nav-item ${menu.dropdown ? "dropdown" : ""} ${menu.mega_menu ? "dropdown mega-dropdown-sm" : ""}`)}" data-v-4471887d>`);
        if (menu.dropdown) {
          _push(`<!--[--><a style="${ssrRenderStyle({ "display": "flex", "gap": "20px" })}" class="${ssrRenderClass([{ "arrow-left": isTouchDevice.value, "rotated": isActive(menu) }, "nav-link"])}"${ssrRenderAttr("href", menu.link ? menu.link : "#")} role="button" data-v-4471887d>`);
          if (isTouchDevice.value) {
            _push(`<span class="${ssrRenderClass({ "rotated": isActive(menu) })}" data-v-4471887d><i class="bi bi-chevron-down" data-v-4471887d></i></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(menu.title)}</a><ul class="${ssrRenderClass([{ show: isActive(menu) }, "dropdown-menu"])}" data-v-4471887d><!--[-->`);
          ssrRenderList(menu.dropdown_menus, (dm, i) => {
            _push(`<li class="dropdown" data-v-4471887d>`);
            if (dm.sub_dropdown) {
              _push(`<!--[-->`);
              if (!isTouchDevice.value) {
                _push(`<div data-v-4471887d>`);
                _push(ssrRenderComponent(_component_nuxt_link, {
                  href: dm.link,
                  class: ["dropdown-item", { active: unref(route).path === dm.link, hightlight: dm.is_highlight }],
                  onClick: closeMenu
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<span data-v-4471887d${_scopeId}>${ssrInterpolate(dm.title)}</span>`);
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
                _push(`<div data-v-4471887d><p class="d-none" data-v-4471887d>in</p><a class="nav-link" style="${ssrRenderStyle({ "display": "flex", "gap": "30px" })}" href="javascript:;" role="button" data-v-4471887d>`);
                if (isTouchDevice.value) {
                  _push(`<span class="${ssrRenderClass({ "rotated": isSubActive(dm) })}" data-v-4471887d><i class="bi bi-chevron-down" data-v-4471887d></i></span>`);
                } else {
                  _push(`<!---->`);
                }
                _push(` ${ssrInterpolate(dm.title)}</a></div>`);
              }
              _push(`<ul style="${ssrRenderStyle({ "padding-left": "20px" })}" class="${ssrRenderClass([{ show: isSubActive(dm) || !isTouchDevice.value }, "dropdown-menu"])}" data-v-4471887d><!--[-->`);
              ssrRenderList(dm.sub_menus, (sub, j) => {
                _push(`<li data-v-4471887d>`);
                _push(ssrRenderComponent(_component_nuxt_link, {
                  href: sub.link,
                  class: ["dropdown-item", { active: unref(route).path === sub.link }],
                  onClick: closeMenu
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<span data-v-4471887d${_scopeId}>${ssrInterpolate(sub.title)}</span>`);
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
                    _push2(`<span data-v-4471887d${_scopeId}>${ssrInterpolate(dm.title)}</span>`);
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
          _push(`<!--[--><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" data-v-4471887d>${ssrInterpolate(menu.title)}</a><ul class="dropdown-menu" data-v-4471887d><li class="row gx-1" data-v-4471887d><!--[-->`);
          ssrRenderList(menu.mega_menus, (mm) => {
            _push(`<div class="col-lg-4" data-v-4471887d><div class="menu-column" data-v-4471887d><ul class="style-none mega-dropdown-list" data-v-4471887d><!--[-->`);
            ssrRenderList(mm.menus, (sm, i) => {
              _push(`<li data-v-4471887d>`);
              _push(ssrRenderComponent(_component_nuxt_link, {
                href: sm.link,
                class: ["dropdown-item", { active: unref(route).path === sm.link }],
                onClick: closeMenu
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span data-v-4471887d${_scopeId}>${ssrInterpolate(sm.title)}</span>`);
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4471887d"]]);
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
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => void 0);
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
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, __nuxt_component_0$2 as a, useRouter as b, useRoute as c, __nuxt_component_0 as d, entry$1 as default, useSeoMeta as u };
//# sourceMappingURL=server.mjs.map
