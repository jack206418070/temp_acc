import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { mkdirSync } from 'node:fs';
import { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, getResponseStatus, setResponseHeaders, setHeaders, sendRedirect, proxyRequest, createError, getHeader, getResponseHeader, removeResponseHeader, fromNodeMiddleware, handleCors, getRequestIP, getQuery as getQuery$1, readMultipartFormData, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, setCookie, deleteCookie, setHeader, getResponseStatusText } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';
import { loadImage, createCanvas } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/canvas/index.js';
import sql from 'file://C:/Users/c3d19/accompany-web-site/node_modules/mssql/index.js';
import jwt from 'file://C:/Users/c3d19/accompany-web-site/node_modules/jsonwebtoken/index.js';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/devalue/index.js';
import destr from 'file://C:/Users/c3d19/accompany-web-site/node_modules/destr/dist/index.mjs';
import { withQuery, joinURL, withTrailingSlash, parseURL, withoutBase, getQuery, joinRelativeURL } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/@unhead/ssr/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unhead/dist/index.mjs';
import { klona } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/klona/dist/index.mjs';
import defu, { defuFn, createDefu } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/scule/dist/index.mjs';
import { createHooks } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/consola/dist/index.mjs';
import { getContext } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/errx/dist/index.js';
import { isVNode, unref, version } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/vue/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/radix3/dist/index.mjs';
import { webcrypto } from 'node:crypto';
import { createStorage, prefixStorage } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47lru_45cache from 'file://C:/Users/c3d19/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import express from 'file://C:/Users/c3d19/accompany-web-site/node_modules/express/index.js';
import { FilterXSS } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/xss/lib/index.js';
import { hash } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/ohash/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/@unhead/shared/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _YUMiyeXQBG = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/c3d19/accompany-web-site";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[{"src":"/js/bootstrap.bundle.min.js","integrity":"sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw="},{"src":"https://www.googletagmanager.com/gtag/js?id=G-5EVH3D8JX4","async":true},{"children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', 'G-5EVH3D8JX4');\n          ","type":"text/javascript"}],"noscript":[],"title":"多元陪伴照顧服務試辦計畫","charset":"utf-8","viewport":"width=device-width, initial-scale=1"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _hpFiegbO7B = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/assets/**": {
        "headers": {
          "X-Content-Type-Options": "nosniff",
          "Content-Type": "application/javascript; charset=utf-8"
        }
      },
      "/**": {
        "headers": {
          "Referrer-Policy": "no-referrer",
          "Strict-Transport-Security": "max-age=15552000; includeSubDomains; preload;",
          "X-Content-Type-Options": "nosniff",
          "X-Download-Options": "noopen",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-XSS-Protection": "0"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {},
  "jwtSecret": "your-secret-key",
  "private": {
    "basicAuth": false
  },
  "security": {
    "strict": false,
    "headers": {
      "crossOriginResourcePolicy": "same-origin",
      "crossOriginOpenerPolicy": "same-origin",
      "crossOriginEmbedderPolicy": "unsafe-none",
      "contentSecurityPolicy": {
        "base-uri": [
          "'self'"
        ],
        "font-src": [
          "'self'",
          "https:",
          "data:"
        ],
        "form-action": [
          "'self'"
        ],
        "frame-ancestors": [
          "'self'"
        ],
        "img-src": [
          "'self'",
          "data:",
          "blob:"
        ],
        "object-src": [
          "'none'"
        ],
        "script-src-attr": [
          "'none'"
        ],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https:"
        ],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https:"
        ],
        "upgrade-insecure-requests": true,
        "connect-src": [
          "'self'",
          "https:"
        ]
      },
      "originAgentCluster": "?1",
      "referrerPolicy": "no-referrer",
      "strictTransportSecurity": {
        "maxAge": 15552000,
        "includeSubdomains": true,
        "preload": true
      },
      "xContentTypeOptions": "nosniff",
      "xDNSPrefetchControl": "off",
      "xDownloadOptions": "noopen",
      "xFrameOptions": "SAMEORIGIN",
      "xPermittedCrossDomainPolicies": "none",
      "xXSSProtection": "0",
      "permissionsPolicy": {
        "camera": [],
        "display-capture": [],
        "fullscreen": [],
        "geolocation": [],
        "microphone": []
      }
    },
    "requestSizeLimiter": {
      "maxRequestSizeInBytes": 2000000,
      "maxUploadFileRequestInBytes": 8000000,
      "throwError": true
    },
    "rateLimiter": {
      "tokensPerInterval": 150,
      "interval": 300000,
      "headers": false,
      "driver": {
        "name": "lruCache"
      },
      "throwError": true
    },
    "xssValidator": {
      "methods": [
        "GET",
        "POST"
      ],
      "throwError": true
    },
    "corsHandler": {
      "origin": "http://localhost:3000",
      "methods": [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE"
      ],
      "preflight": {
        "statusCode": 204
      }
    },
    "allowedMethodsRestricter": {
      "methods": "*",
      "throwError": true
    },
    "hidePoweredBy": true,
    "enabled": true,
    "csrf": false,
    "nonce": true,
    "removeLoggers": true,
    "ssg": {
      "meta": true,
      "hashScripts": false,
      "hashStyles": false,
      "nitroHeaders": true,
      "exportToPresets": true
    },
    "sri": true
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function defineNitroPlugin(def) {
  return def;
}

const serverAssets = [{"baseName":"server","dir":"C:/Users/c3d19/accompany-web-site/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage$1 = createStorage({});

storage$1.mount('/assets', assets);

storage$1.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"C:\\Users\\c3d19\\accompany-web-site\\public\\uploads","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('#rate-limiter-storage', unstorage_47drivers_47lru_45cache({"driver":"lruCache"}));
storage$1.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\c3d19\\accompany-web-site","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\c3d19\\accompany-web-site\\server","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\c3d19\\accompany-web-site\\.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\c3d19\\accompany-web-site\\.nuxt\\cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:\\Users\\c3d19\\accompany-web-site\\.data\\kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return i()[o]??r[o]},has(e,o){const E=i();return o in E||o in r},set(e,o,E){const b=i(true);return b[o]=E,true},deleteProperty(e,o){if(!o)return  false;const E=i(true);return delete E[o],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",B=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function p(){if(globalThis.process?.env)for(const e of B){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=p(),d=l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const A=t==="test"||n(s.TEST);n(s.MINIMAL)||T||A||!R;const _=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||_)&&s.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),c={versions:{}};new Proxy(y,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const L=globalThis.process?.release?.name==="node",a=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,P=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[N,"edge-light"],[P,"workerd"],[O,"fastly"],[D,"deno"],[a,"bun"],[L,"node"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const u=G();u?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const defuReplaceArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});

async function authenticate(event) {
  var _a;
  console.log(event);
  const token = (_a = getHeader(event, "Authorization")) == null ? void 0 : _a.split(" ")[1];
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u672A\u63D0\u4F9B\u8A8D\u8B49\u4EE4\u724C"
    });
  }
  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u7121\u6548\u7684\u8A8D\u8B49\u4EE4\u724C"
    });
  }
}
const verifyToken = async (token) => {
  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    console.error("Token \u9A57\u8B49\u5931\u6557:", error);
    return null;
  }
};

const nitroAppSecurityOptions = {};
function getAppSecurityOptions() {
  return nitroAppSecurityOptions;
}
function resolveSecurityRules(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.rules) {
    const router = createRouter({ routes: structuredClone(nitroAppSecurityOptions) });
    const matcher = toRouteMatcher(router);
    const matches = matcher.matchAll(event.path.split("?")[0]);
    const rules = defuReplaceArray({}, ...matches.reverse());
    event.context.security.rules = rules;
  }
  return event.context.security.rules;
}
function resolveSecurityRoute(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.route) {
    const routeNames = Object.fromEntries(Object.entries(nitroAppSecurityOptions).map(([name]) => [name, { name }]));
    const router = createRouter({ routes: routeNames });
    const match = router.lookup(event.path.split("?")[0]);
    const route = match?.name ?? "";
    event.context.security.route = route;
  }
  return event.context.security.route;
}

const KEYS_TO_NAMES = {
  contentSecurityPolicy: "Content-Security-Policy",
  crossOriginEmbedderPolicy: "Cross-Origin-Embedder-Policy",
  crossOriginOpenerPolicy: "Cross-Origin-Opener-Policy",
  crossOriginResourcePolicy: "Cross-Origin-Resource-Policy",
  originAgentCluster: "Origin-Agent-Cluster",
  referrerPolicy: "Referrer-Policy",
  strictTransportSecurity: "Strict-Transport-Security",
  xContentTypeOptions: "X-Content-Type-Options",
  xDNSPrefetchControl: "X-DNS-Prefetch-Control",
  xDownloadOptions: "X-Download-Options",
  xFrameOptions: "X-Frame-Options",
  xPermittedCrossDomainPolicies: "X-Permitted-Cross-Domain-Policies",
  xXSSProtection: "X-XSS-Protection",
  permissionsPolicy: "Permissions-Policy"
};
const NAMES_TO_KEYS = Object.fromEntries(Object.entries(KEYS_TO_NAMES).map(([key, name]) => [name, key]));
function getNameFromKey(key) {
  return KEYS_TO_NAMES[key];
}
function getKeyFromName(headerName) {
  const [, key] = Object.entries(NAMES_TO_KEYS).find(([name]) => name.toLowerCase() === headerName.toLowerCase()) || [];
  return key;
}
function headerStringFromObject(optionKey, optionValue) {
  if (optionValue === false) {
    return "";
  }
  if (optionKey === "contentSecurityPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (directive === "upgrade-insecure-requests") {
        return "upgrade-insecure-requests;";
      } else {
        const stringifiedSources = typeof sources === "string" ? sources : sources.map((source) => source.trim()).join(" ");
        return `${directive} ${stringifiedSources};`;
      }
    }).join(" ");
  } else if (optionKey === "strictTransportSecurity") {
    const policies = optionValue;
    return [
      `max-age=${policies.maxAge};`,
      policies.includeSubdomains && "includeSubDomains;",
      policies.preload && "preload;"
    ].filter(Boolean).join(" ");
  } else if (optionKey === "permissionsPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (typeof sources === "string") {
        return `${directive}=${sources}`;
      } else {
        return `${directive}=(${sources.join(" ")})`;
      }
    }).join(", ");
  } else {
    return optionValue;
  }
}
function headerObjectFromString(optionKey, headerValue) {
  if (!headerValue) {
    return false;
  }
  if (optionKey === "contentSecurityPolicy") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, ...sources] = directive.split(" ").map((token) => token.trim());
      if (type === "upgrade-insecure-requests") {
        objectForm[type] = true;
      } else {
        objectForm[type] = sources.join(" ");
      }
    }
    return objectForm;
  } else if (optionKey === "strictTransportSecurity") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      if (type === "max-age") {
        objectForm.maxAge = Number(value);
      } else if (type === "includeSubdomains" || type === "preload") {
        objectForm[type] = true;
      }
    }
    return objectForm;
  } else if (optionKey === "permissionsPolicy") {
    const directives = headerValue.split(",").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      objectForm[type] = value;
    }
    return objectForm;
  } else {
    return headerValue;
  }
}
function standardToSecurity(standardHeaders) {
  if (!standardHeaders) {
    return void 0;
  }
  const standardHeadersAsObject = {};
  Object.entries(standardHeaders).forEach(([headerName, headerValue]) => {
    const optionKey = getKeyFromName(headerName);
    if (optionKey) {
      if (typeof headerValue === "string") {
        const objectValue = headerObjectFromString(optionKey, headerValue);
        standardHeadersAsObject[optionKey] = objectValue;
      } else {
        standardHeadersAsObject[optionKey] = headerValue;
      }
    }
  });
  if (Object.keys(standardHeadersAsObject).length === 0) {
    return void 0;
  }
  return standardHeadersAsObject;
}
function backwardsCompatibleSecurity(securityHeaders) {
  if (!securityHeaders) {
    return void 0;
  }
  const securityHeadersAsObject = {};
  Object.entries(securityHeaders).forEach(([key, value]) => {
    const optionKey = key;
    if ((optionKey === "contentSecurityPolicy" || optionKey === "permissionsPolicy" || optionKey === "strictTransportSecurity") && typeof value === "string") {
      const objectValue = headerObjectFromString(optionKey, value);
      securityHeadersAsObject[optionKey] = objectValue;
    } else if (value === "") {
      securityHeadersAsObject[optionKey] = false;
    } else {
      securityHeadersAsObject[optionKey] = value;
    }
  });
  return securityHeadersAsObject;
}

const _Md88xZOm1j = defineNitroPlugin(async (nitroApp) => {
  const appSecurityOptions = getAppSecurityOptions();
  const runtimeConfig = useRuntimeConfig();
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    const { headers: headers2 } = rule;
    const securityHeaders2 = standardToSecurity(headers2);
    if (securityHeaders2) {
      appSecurityOptions[route] = { headers: securityHeaders2 };
    }
  }
  const securityOptions = runtimeConfig.security;
  const { headers } = securityOptions;
  const securityHeaders = backwardsCompatibleSecurity(headers);
  appSecurityOptions["/**"] = defuReplaceArray(
    { headers: securityHeaders },
    securityOptions,
    appSecurityOptions["/**"]
  );
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    const { security } = rule;
    if (security) {
      const { headers: headers2 } = security;
      const securityHeaders2 = backwardsCompatibleSecurity(headers2);
      appSecurityOptions[route] = defuReplaceArray(
        { headers: securityHeaders2 },
        security,
        appSecurityOptions[route]
      );
    }
  }
  nitroApp.hooks.hook("nuxt-security:headers", ({ route, headers: headers2 }) => {
    appSecurityOptions[route] = defuReplaceArray(
      { headers: headers2 },
      appSecurityOptions[route]
    );
  });
  nitroApp.hooks.hook("nuxt-security:ready", async () => {
    await nitroApp.hooks.callHook("nuxt-security:routeRules", appSecurityOptions);
  });
  await nitroApp.hooks.callHook("nuxt-security:ready");
});

const sriHashes = {"/_nuxt/builds/meta/dev.json":"sha384-UsDRizHHqhLxrFKh2W16FNGn7t2Yn4dzxcf/4wtiZdtKJcZ+wVHbx13NHX0rSROJ","/_nuxt/builds/latest.json":"sha384-uN4i4bEMqHeQgjx+PWptnu0Ab73Bues8ZsgrG1yZiAkc3dLOq3HsMuG7dheDdyve","/.DS_Store":"sha384-aB0ZnOQV4miynTmBkrYrual6PJHJ/iuuTls5tXQIw4Ji4+sGlcVtLm5UkM+xOuM9","/favicon.ico":"sha384-e0DOxab7uI618wwd1Lt0+rREwV1k9myViahHX+GFoxul14+FbxXyAOIdbDRGgPYP"};

const SCRIPT_RE$1 = /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g;
const LINK_RE$1 = /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g;
const _bz15vS9IMw = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.sri) {
      return;
    }
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => {
        if (typeof element !== "string") {
          return element;
        }
        element = element.replace(SCRIPT_RE$1, (match, rest, src) => {
          const hash = sriHashes[src];
          if (hash) {
            const integrityScript = `<script integrity="${hash}"${rest}><\/script>`;
            return integrityScript;
          } else {
            return match;
          }
        });
        element = element.replace(LINK_RE$1, (match, rest, href) => {
          const hash = sriHashes[href];
          if (hash) {
            const integrityLink = `<link integrity="${hash}"${rest}>`;
            return integrityLink;
          } else {
            return match;
          }
        });
        return element;
      });
    }
  });
});

globalThis.crypto ??= webcrypto;
function generateRandomNonce() {
  const array = new Uint8Array(18);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));
  return nonce;
}

const _70uw5dOUJ4 = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const LINK_RE = /<link([^>]*?>)/gi;
const SCRIPT_RE = /<script([^>]*?>)/gi;
const STYLE_RE = /<style([^>]*?>)/gi;
const _a5NKSKyd16 = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    if (event.context.security?.nonce) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.nonce && true) {
      const nonce = generateRandomNonce();
      event.context.security.nonce = nonce;
    }
  });
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.headers || !rules.headers.contentSecurityPolicy || !rules.nonce) {
      return;
    }
    const nonce = event.context.security.nonce;
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => {
        if (typeof element !== "string") {
          return element;
        }
        element = element.replace(LINK_RE, (match, rest) => {
          return `<link nonce="${nonce}"` + rest;
        });
        element = element.replace(SCRIPT_RE, (match, rest) => {
          return `<script nonce="${nonce}"` + rest;
        });
        element = element.replace(STYLE_RE, (match, rest) => {
          return `<style nonce="${nonce}"` + rest;
        });
        return element;
      });
    }
    {
      html.head.push(
        `<meta property="csp-nonce" nonce="${nonce}">`
      );
    }
  });
});

const _iKGHbDd6G1 = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (response, { event }) => {
    if (response.island) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      if (headers.contentSecurityPolicy) {
        const csp = headers.contentSecurityPolicy;
        const nonce = event.context.security?.nonce;
        const scriptHashes = event.context.security?.hashes?.script;
        const styleHashes = event.context.security?.hashes?.style;
        headers.contentSecurityPolicy = updateCspVariables(csp, nonce, scriptHashes, styleHashes);
      }
    }
  });
});
function updateCspVariables(csp, nonce, scriptHashes, styleHashes) {
  const generatedCsp = Object.fromEntries(Object.entries(csp).map(([directive, value]) => {
    if (typeof value === "boolean") {
      return [directive, value];
    }
    const sources = typeof value === "string" ? value.split(" ").map((token) => token.trim()).filter((token) => token) : value;
    const modifiedSources = sources.filter((source) => {
      if (source.startsWith("'nonce-") && source !== "'nonce-{{nonce}}'") {
        console.warn("[nuxt-security] removing static nonce from CSP header");
        return false;
      }
      return true;
    }).map((source) => {
      if (source === "'nonce-{{nonce}}'") {
        return nonce ? `'nonce-${nonce}'` : "";
      } else {
        return source;
      }
    }).filter((source) => source);
    if (directive === "script-src" && scriptHashes) {
      modifiedSources.push(...scriptHashes);
    }
    if (directive === "style-src" && styleHashes) {
      modifiedSources.push(...styleHashes);
    }
    return [directive, modifiedSources];
  }));
  return generatedCsp;
}

const _mzgl08bOO4 = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const _6CaFFM4DEu = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      Object.entries(headers).forEach(([header, value]) => {
        const headerName = getNameFromKey(header);
        if (value === false) {
          const { headers: standardHeaders } = getRouteRules(event);
          const standardHeaderValue = standardHeaders?.[headerName];
          const currentHeaderValue = getResponseHeader(event, headerName);
          if (standardHeaderValue === currentHeaderValue) {
            removeResponseHeader(event, headerName);
          }
        } else {
          const headerValue = headerStringFromObject(header, value);
          setResponseHeader(event, headerName, headerValue);
        }
      });
    }
  });
});

const _iElm849dEl = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.hidePoweredBy && !event.node.res.headersSent) {
      removeResponseHeader(event, "x-powered-by");
    }
  });
});

const _ShUEzURWND = defineNitroPlugin(async (nitroApp) => {
  {
    const prerenderedHeaders = await useStorage("assets:nuxt-security").getItem("headers.json") || {};
    nitroApp.hooks.hook("beforeResponse", (event) => {
      const rules = resolveSecurityRules(event);
      if (rules.enabled && rules.ssg && rules.ssg.nitroHeaders) {
        const path = event.path.split("?")[0];
        if (prerenderedHeaders[path]) {
          setResponseHeaders(event, prerenderedHeaders[path]);
        }
      }
    });
  }
});

const plugins = [
  _YUMiyeXQBG,
_hpFiegbO7B,
_Md88xZOm1j,
_bz15vS9IMw,
_70uw5dOUJ4,
_a5NKSKyd16,
_iKGHbDd6G1,
_mzgl08bOO4,
_6CaFFM4DEu,
_iElm849dEl,
_ShUEzURWND
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("\u2705 Express server is running...");
const _E89xVM = fromNodeMiddleware(app);

const defaultThrowErrorValue = { throwError: true };
const defaultSecurityConfig = (serverlUrl, strict) => {
  const defaultConfig = {
    strict,
    headers: {
      crossOriginResourcePolicy: "same-origin",
      crossOriginOpenerPolicy: "same-origin",
      crossOriginEmbedderPolicy: "unsafe-none" ,
      contentSecurityPolicy: {
        "base-uri": ["'none'"],
        "font-src": ["'self'", "https:", "data:"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'self'"],
        "img-src": ["'self'", "data:"],
        "object-src": ["'none'"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": ["'self'", "https:", "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        "upgrade-insecure-requests": true
      },
      originAgentCluster: "?1",
      referrerPolicy: "no-referrer",
      strictTransportSecurity: {
        maxAge: 15552e3,
        includeSubdomains: true
      },
      xContentTypeOptions: "nosniff",
      xDNSPrefetchControl: "off",
      xDownloadOptions: "noopen",
      xFrameOptions: "SAMEORIGIN",
      xPermittedCrossDomainPolicies: "none",
      xXSSProtection: "0",
      permissionsPolicy: {
        camera: [],
        "display-capture": [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2e6,
      maxUploadFileRequestInBytes: 8e6,
      ...defaultThrowErrorValue
    },
    rateLimiter: {
      // Twitter search rate limiting
      tokensPerInterval: 150,
      interval: 3e5,
      headers: false,
      driver: {
        name: "lruCache"
      },
      ...defaultThrowErrorValue
    },
    xssValidator: {
      methods: ["GET", "POST"],
      ...defaultThrowErrorValue
    },
    corsHandler: {
      // Options by CORS middleware for Express https://github.com/expressjs/cors#configuration-options
      origin: serverlUrl,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      preflight: {
        statusCode: 204
      }
    },
    allowedMethodsRestricter: {
      methods: "*",
      ...defaultThrowErrorValue
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    removeLoggers: true,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true
    },
    sri: true
  };
  return defaultConfig;
};

const FILE_UPLOAD_HEADER = "multipart/form-data";
const defaultSizeLimiter = defaultSecurityConfig("").requestSizeLimiter;
const _i9iNXt = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.requestSizeLimiter) {
    const requestSizeLimiter = defu(
      rules.requestSizeLimiter,
      defaultSizeLimiter
    );
    if (["POST", "PUT", "DELETE"].includes(event.node.req.method)) {
      const contentLengthValue = getRequestHeader(event, "content-length");
      const contentTypeValue = getRequestHeader(event, "content-type");
      const isFileUpload = contentTypeValue?.includes(FILE_UPLOAD_HEADER);
      const requestLimit = isFileUpload ? requestSizeLimiter.maxUploadFileRequestInBytes : requestSizeLimiter.maxRequestSizeInBytes;
      if (parseInt(contentLengthValue) >= requestLimit) {
        const payloadTooLargeError = {
          statusCode: 413,
          statusMessage: "Payload Too Large"
        };
        if (requestSizeLimiter.throwError === false) {
          return payloadTooLargeError;
        }
        throw createError(payloadTooLargeError);
      }
    }
  }
});

const _fFN4My = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.corsHandler) {
    const { corsHandler } = rules;
    let origin;
    if (typeof corsHandler.origin === "string" && corsHandler.origin !== "*") {
      origin = [corsHandler.origin];
    } else {
      origin = corsHandler.origin;
    }
    if (origin && origin !== "*" && corsHandler.useRegExp) {
      origin = origin.map((o) => new RegExp(o, "i"));
    }
    handleCors(event, {
      origin,
      methods: corsHandler.methods,
      allowHeaders: corsHandler.allowHeaders,
      exposeHeaders: corsHandler.exposeHeaders,
      credentials: corsHandler.credentials,
      maxAge: corsHandler.maxAge,
      preflight: corsHandler.preflight
    });
  }
});

const _94z5Ax = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.allowedMethodsRestricter) {
    const { allowedMethodsRestricter } = rules;
    const allowedMethods = allowedMethodsRestricter.methods;
    if (allowedMethods !== "*" && !allowedMethods.includes(event.node.req.method)) {
      const methodNotAllowedError = {
        statusCode: 405,
        statusMessage: "Method not allowed"
      };
      if (allowedMethodsRestricter.throwError === false) {
        return methodNotAllowedError;
      }
      throw createError(methodNotAllowedError);
    }
  }
});

const storage = useStorage("#rate-limiter-storage");
const defaultRateLimiter = defaultSecurityConfig("").rateLimiter;
const _Laadk6 = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  const route = resolveSecurityRoute(event);
  if (rules.enabled && rules.rateLimiter) {
    const rateLimiter = defu(
      rules.rateLimiter,
      defaultRateLimiter
    );
    const ip = getIP(event);
    const url = ip + route;
    let storageItem = await storage.getItem(url);
    if (!storageItem) {
      await setStorageItem(rateLimiter, url);
    } else {
      if (typeof storageItem !== "object") {
        return;
      }
      const timeSinceFirstRateLimit = storageItem.date;
      const timeForInterval = storageItem.date + Number(rateLimiter.interval);
      if (Date.now() >= timeForInterval) {
        await setStorageItem(rateLimiter, url);
        storageItem = await storage.getItem(url);
      }
      const isLimited = timeSinceFirstRateLimit <= timeForInterval && storageItem.value === 0;
      if (isLimited) {
        const tooManyRequestsError = {
          statusCode: 429,
          statusMessage: "Too Many Requests"
        };
        if (rules.rateLimiter.headers) {
          setResponseHeader(event, "x-ratelimit-remaining", 0);
          setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
          setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
        }
        if (rateLimiter.throwError === false) {
          return tooManyRequestsError;
        }
        throw createError(tooManyRequestsError);
      }
      const newItemDate = timeSinceFirstRateLimit > timeForInterval ? Date.now() : storageItem.date;
      const newStorageItem = { value: storageItem.value - 1, date: newItemDate };
      await storage.setItem(url, newStorageItem);
      const currentItem = await storage.getItem(url);
      if (currentItem && rateLimiter.headers) {
        setResponseHeader(event, "x-ratelimit-remaining", currentItem.value);
        setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
        setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
      }
    }
  }
});
async function setStorageItem(rateLimiter, url) {
  const rateLimitedObject = { value: rateLimiter.tokensPerInterval, date: Date.now() };
  await storage.setItem(url, rateLimitedObject);
}
function getIP(event) {
  const ip = getRequestIP(event, { xForwardedFor: true }) || "";
  return ip;
}

const _PQwVmo = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.xssValidator) {
    const filterOpt = {
      ...rules.xssValidator,
      escapeHtml: void 0
    };
    if (rules.xssValidator.escapeHtml === false) {
      filterOpt.escapeHtml = (value) => value;
    }
    const xssValidator = new FilterXSS(filterOpt);
    if (event.node.req.socket.readyState !== "readOnly") {
      if (rules.xssValidator.methods && rules.xssValidator.methods.includes(
        event.node.req.method
      )) {
        const valueToFilter = event.node.req.method === "GET" ? getQuery$1(event) : event.node.req.headers["content-type"]?.includes(
          "multipart/form-data"
        ) ? await readMultipartFormData(event) : await readBody(event);
        if (valueToFilter && Object.keys(valueToFilter).length) {
          if (valueToFilter.statusMessage && valueToFilter.statusMessage !== "Bad Request") {
            return;
          }
          const stringifiedValue = JSON.stringify(valueToFilter);
          const processedValue = xssValidator.process(
            JSON.stringify(valueToFilter)
          );
          if (processedValue !== stringifiedValue) {
            const badRequestError = {
              statusCode: 400,
              statusMessage: "Bad Request"
            };
            if (rules.xssValidator.throwError === false) {
              return badRequestError;
            }
            throw createError(badRequestError);
          }
        }
      }
    }
  }
});

const _lazy_5Xw0zy = () => Promise.resolve().then(function () { return _id__delete$f; });
const _lazy_uyJau5 = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_oxBVdK = () => Promise.resolve().then(function () { return index_post$h; });
const _lazy_BZgJPb = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_ApZBbf = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_M3nLtR = () => Promise.resolve().then(function () { return _id__put$d; });
const _lazy_n0LjF9 = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_nCtAaq = () => Promise.resolve().then(function () { return index_post$f; });
const _lazy_IhfHyJ = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_zEW20u = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_GYyNav = () => Promise.resolve().then(function () { return verify_get$1; });
const _lazy_ciT7XN = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_OGY4Dx = () => Promise.resolve().then(function () { return _id__put$b; });
const _lazy_rl7thK = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_P0xDYO = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_dCaT6n = () => Promise.resolve().then(function () { return order_put$3; });
const _lazy_nHqoqd = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_XwxXmW = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_rQsj42 = () => Promise.resolve().then(function () { return _id__put$9; });
const _lazy_0Qr7Mv = () => Promise.resolve().then(function () { return image_get$1; });
const _lazy_z1uaGs = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_Rmoqay = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_vcRPKP = () => Promise.resolve().then(function () { return order_put$1; });
const _lazy_Y1NE5U = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_GZDl6r = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_MX7lVJ = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_gPPwOW = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_qQimyi = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_Jmg842 = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_WZC2dD = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_z8qBFG = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_ywfAP9 = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_Cg3IQZ = () => Promise.resolve().then(function () { return qa$1; });
const _lazy_QX2Apb = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_nlSC6I = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_hk3WGv = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_2LshuW = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_21wbag = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_Shmuth = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_uvFuvx = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_oJy8Bb = () => Promise.resolve().then(function () { return priceImage_get$1; });
const _lazy_g5qYfO = () => Promise.resolve().then(function () { return unitImage_get$1; });
const _lazy_tJAjJg = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_VSS14A = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_y5MQYX = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_dRdtHU = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_L2F81p = () => Promise.resolve().then(function () { return banner$1; });
const _lazy_HR4SO4 = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/announcement-images/:id', handler: _lazy_5Xw0zy, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcement-images/:id', handler: _lazy_uyJau5, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcement-images', handler: _lazy_oxBVdK, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_BZgJPb, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_ApZBbf, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_M3nLtR, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements', handler: _lazy_n0LjF9, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_nCtAaq, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_IhfHyJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_zEW20u, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_GYyNav, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners/:id', handler: _lazy_ciT7XN, lazy: true, middleware: false, method: "delete" },
  { route: '/api/banners/:id', handler: _lazy_OGY4Dx, lazy: true, middleware: false, method: "put" },
  { route: '/api/banners', handler: _lazy_rl7thK, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners', handler: _lazy_P0xDYO, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners/order', handler: _lazy_dCaT6n, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id', handler: _lazy_nHqoqd, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_XwxXmW, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_rQsj42, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id/image', handler: _lazy_0Qr7Mv, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_z1uaGs, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_Rmoqay, lazy: true, middleware: false, method: "post" },
  { route: '/api/knowledge/order', handler: _lazy_vcRPKP, lazy: true, middleware: false, method: "put" },
  { route: '/api/languages', handler: _lazy_Y1NE5U, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories/:id', handler: _lazy_GZDl6r, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-categories/:id', handler: _lazy_MX7lVJ, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-categories', handler: _lazy_gPPwOW, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories', handler: _lazy_qQimyi, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa-contents/:id', handler: _lazy_Jmg842, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-contents/:id', handler: _lazy_WZC2dD, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-contents', handler: _lazy_z8qBFG, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-contents', handler: _lazy_ywfAP9, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_Cg3IQZ, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_QX2Apb, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy_nlSC6I, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_hk3WGv, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_2LshuW, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-unit/:id', handler: _lazy_21wbag, lazy: true, middleware: false, method: "delete" },
  { route: '/api/service-unit/:id', handler: _lazy_Shmuth, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id', handler: _lazy_uvFuvx, lazy: true, middleware: false, method: "put" },
  { route: '/api/service-unit/:id/price-image', handler: _lazy_oJy8Bb, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id/unit-image', handler: _lazy_g5qYfO, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_tJAjJg, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_VSS14A, lazy: true, middleware: false, method: "post" },
  { route: '/api/user-reminder', handler: _lazy_y5MQYX, lazy: true, middleware: false, method: "get" },
  { route: '/api/user-reminder', handler: _lazy_dRdtHU, lazy: true, middleware: false, method: "post" },
  { route: '/banner', handler: _lazy_L2F81p, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_HR4SO4, lazy: true, middleware: false, method: undefined },
  { route: '/api', handler: _E89xVM, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _i9iNXt, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _fFN4My, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _94z5Ax, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _Laadk6, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _PQwVmo, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_HR4SO4, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (_) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const config = {
  user: "sa",
  password: "MyS3cretPassw0rd",
  server: "43.207.146.80",
  // Docker 內部使用 'localhost'
  port: 1433,
  database: "accompany",
  options: {
    encrypt: false,
    // 若有 SSL 問題請設為 false
    trustServerCertificate: true
  }
};
let pool;
async function getConnection() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("\u2705 Connected to MSSQL");
    } catch (error) {
      console.error("\u274C Database connection failed:", error);
      throw error;
    }
  }
  return pool;
}

async function createAnnouncement({
  publish_date,
  activity_start_date,
  category,
  content,
  title,
  link,
  linkTitle,
  image_id
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("publish_date", sql.VarChar(10), publish_date).input("activity_start_date", sql.VarChar(10), activity_start_date).input("category", sql.NVarChar(50), category).input("content", sql.NVarChar(sql.MAX), content).input("title", sql.NVarChar(200), title).input("link", sql.NVarChar(500), link).input("linkTitle", sql.NVarChar(200), linkTitle).input("image_id", sql.VarChar(50), image_id).query(`
        INSERT INTO Announcements (
          publish_date, activity_start_date, category,
          content, title, link, linkTitle, image_id
        )
        VALUES (
          @publish_date, @activity_start_date, @category,
          @content, @title, @link, @linkTitle, @image_id
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);
    return result.recordset[0];
  } catch (err) {
    console.error("\u274C Create Announcement Error:", err);
    throw err;
  }
}
async function getAllAnnouncements() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT 
          id,
          publish_date,
          activity_start_date,
          category,
          content,
          title,
          link,
          linkTitle,
          image_id,
          created_at,
          updated_at
        FROM Announcements
        WHERE is_deleted = 0
        ORDER BY publish_date DESC;
      `);
    return result.recordset;
  } catch (err) {
    console.error("\u274C Get All Announcements Error:", err);
    throw err;
  }
}
async function getAnnouncementById(id) {
  try {
    const pool = await getConnection();
    const announcementResult = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          id,
          title,
          category,
          content,
          link,
          linkTitle,
          CONVERT(varchar, publish_date, 23) as publish_date,
          CONVERT(varchar, activity_start_date, 23) as activity_start_date,
          CONVERT(varchar, created_at, 120) as created_at,
          CONVERT(varchar, updated_at, 120) as updated_at
        FROM Announcements
        WHERE id = @id AND is_deleted = 0;
      `);
    const announcement = announcementResult.recordset[0];
    if (!announcement) {
      return null;
    }
    const imagesResult = await pool.request().input("announcement_id", sql.Int, id).query(`
        SELECT 
          id,
          image_id,
          image_content,
          CONVERT(varchar, created_at, 120) as created_at
        FROM AnnouncementImages
        WHERE announcement_id = @announcement_id 
        AND is_deleted = 0
        ORDER BY created_at ASC;
      `);
    announcement.images = imagesResult.recordset;
    return announcement;
  } catch (err) {
    console.error("\u274C Get Announcement By Id Error:", err);
    throw err;
  }
}
async function updateAnnouncement(id, {
  publish_date,
  activity_start_date,
  category,
  content,
  title,
  link,
  linkTitle,
  image_id
}) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).input("publish_date", sql.VarChar(10), publish_date).input("activity_start_date", sql.VarChar(10), activity_start_date).input("category", sql.NVarChar(50), category).input("content", sql.NVarChar(sql.MAX), content).input("title", sql.NVarChar(200), title).input("link", sql.NVarChar(500), link).input("linkTitle", sql.NVarChar(200), linkTitle).input("image_id", sql.VarChar(50), image_id).query(`
        UPDATE Announcements
        SET 
          publish_date = @publish_date,
          activity_start_date = @activity_start_date,
          category = @category,
          content = @content,
          title = @title,
          link = @link,
          linkTitle = @linkTitle,
          image_id = @image_id,
          updated_at = GETDATE()
        WHERE id = @id AND is_deleted = 0;
      `);
    return { success: true };
  } catch (err) {
    console.error("\u274C Update Announcement Error:", err);
    throw err;
  }
}
async function deleteAnnouncement(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query(`
        UPDATE Announcements
        SET is_deleted = 1, updated_at = GETDATE()
        WHERE id = @id;
      `);
    return { success: true };
  } catch (err) {
    console.error("\u274C Delete Announcement Error:", err);
    throw err;
  }
}
async function saveAnnouncementImage(announcement_id, image_id, image_content) {
  try {
    const pool = await getConnection();
    await pool.request().input("announcement_id", sql.Int, announcement_id).input("image_id", sql.VarChar(50), image_id).input("image_content", sql.VarBinary(sql.MAX), image_content).query(`
        INSERT INTO AnnouncementImages (
          announcement_id, image_id, image_content
        )
        VALUES (
          @announcement_id, @image_id, @image_content
        );
      `);
    return { success: true };
  } catch (err) {
    console.error("\u274C DB Save Announcement Image Error:", err);
    throw err;
  }
}
async function getAnnouncementImages(announcement_id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("announcement_id", sql.Int, announcement_id).query(`
        SELECT 
          image_id,
          id,
          image_content,
          created_at
        FROM AnnouncementImages
        WHERE announcement_id = @announcement_id 
        AND is_deleted = 0
        ORDER BY created_at DESC;
      `);
    return result.recordset;
  } catch (err) {
    console.error("\u274C Get Announcement Images Error:", err);
    throw err;
  }
}
async function deleteAnnouncementImage(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query(`
        UPDATE AnnouncementImages
        SET is_deleted = 1, updated_at = GETDATE()
        WHERE id = @id;
      `);
    return { success: true };
  } catch (err) {
    console.error("\u274C Delete Announcement Image Error:", err);
    throw err;
  }
}

const _id__delete$e = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const image_id = event.context.params.id;
    if (!image_id) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5716\u7247 ID"
      });
    }
    await deleteAnnouncementImage(image_id);
    return {
      success: true,
      message: "\u5716\u7247\u522A\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u274C Delete Announcement Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u522A\u9664\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

const _id__delete$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$e
});

const _id__get$6 = defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u516C\u544A ID"
      });
    }
    const images = await getAnnouncementImages(id);
    return {
      success: true,
      data: images.map((image) => ({
        id: image.id,
        image_content: image.image_content.toString("base64")
      }))
    };
  } catch (error) {
    console.error("\u274C Get Announcement Images Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

const _id__get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$6
});

const index_post$g = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData || !Array.isArray(formData) || formData.length === 0) {
      console.error("\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599\u6216\u683C\u5F0F\u932F\u8AA4");
      throw createError({
        statusCode: 400,
        message: "\u672A\u6536\u5230\u8868\u55AE\u8CC7\u6599\u6216\u683C\u5F0F\u932F\u8AA4"
      });
    }
    console.log("\u6536\u5230\u7684\u6240\u6709\u6B04\u4F4D:", formData.map((field) => {
      var _a2;
      return {
        name: field.name,
        type: field.type,
        filename: field.filename,
        size: ((_a2 = field.data) == null ? void 0 : _a2.length) || 0,
        hasData: !!field.data
      };
    }));
    const announcementIdField = formData.find((f) => f.name === "announcement_id");
    const imageIdField = formData.find((f) => f.name === "image_id");
    const imageField = formData.find((f) => f.name === "image");
    const missingFields = [];
    if (!(announcementIdField == null ? void 0 : announcementIdField.data)) missingFields.push("announcement_id");
    if (!(imageIdField == null ? void 0 : imageIdField.data)) missingFields.push("image_id");
    if (!(imageField == null ? void 0 : imageField.data)) missingFields.push("image");
    console.log("\u6B04\u4F4D\u72C0\u614B:", {
      announcement_id: {
        exists: !!announcementIdField,
        hasData: !!(announcementIdField == null ? void 0 : announcementIdField.data),
        value: (_a = announcementIdField == null ? void 0 : announcementIdField.data) == null ? void 0 : _a.toString()
      },
      image_id: {
        exists: !!imageIdField,
        hasData: !!(imageIdField == null ? void 0 : imageIdField.data),
        value: (_b = imageIdField == null ? void 0 : imageIdField.data) == null ? void 0 : _b.toString()
      },
      image: {
        exists: !!imageField,
        hasData: !!(imageField == null ? void 0 : imageField.data),
        type: imageField == null ? void 0 : imageField.type,
        filename: imageField == null ? void 0 : imageField.filename,
        size: ((_c = imageField == null ? void 0 : imageField.data) == null ? void 0 : _c.length) || 0
      }
    });
    if (missingFields.length > 0) {
      console.error("\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D:", missingFields);
      throw createError({
        statusCode: 400,
        message: `\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D: ${missingFields.join(", ")}`
      });
    }
    const announcement_id = announcementIdField.data.toString();
    const image_id = imageIdField.data.toString();
    let imageBuffer;
    if (imageField && imageField.data) {
      const originalSize = (imageField.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
      console.log("\u5716\u7247\u985E\u578B:", imageField.type);
      try {
        if (!["image/jpeg", "image/png", "image/gif"].includes(imageField.type)) {
          throw new Error("\u4E0D\u652F\u63F4\u7684\u5716\u7247\u683C\u5F0F");
        }
        const base64Image = `data:${imageField.type};base64,${imageField.data.toString("base64")}`;
        const img = await loadImage(base64Image);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        if (imageField.type === "image/png") {
          ctx.clearRect(0, 0, targetWidth, targetHeight);
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const outputFormat = imageField.type === "image/png" ? "image/png" : "image/jpeg";
        const quality = outputFormat === "image/jpeg" ? 0.8 : 1;
        imageBuffer = canvas.toBuffer(outputFormat, {
          quality,
          progressive: outputFormat === "image/jpeg"
        });
        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`\u8655\u7406\u5F8C\u5716\u7247\u5927\u5C0F: ${compressedSize} KB`);
        console.log(`\u5716\u7247\u8655\u7406\u7387: ${((1 - imageBuffer.length / imageField.data.length) * 100).toFixed(2)}%`);
        console.log("\u8F38\u51FA\u683C\u5F0F:", outputFormat);
      } catch (error) {
        console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          message: error.message || "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    await saveAnnouncementImage(
      parseInt(announcement_id),
      image_id,
      imageBuffer
    );
    return {
      success: true,
      data: {
        announcement_id,
        image_id
      }
    };
  } catch (error) {
    console.error("\u274C Save Announcement Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u4FDD\u5B58\u516C\u544A\u5716\u7247\u5931\u6557"
    });
  }
});

const index_post$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$g
});

const _id__delete$c = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u516C\u544A ID"
      });
    }
    await deleteAnnouncement(id);
    return {
      success: true
    };
  } catch (error) {
    console.error("\u274C Delete Announcement Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u516C\u544A\u5931\u6557"
    });
  }
});

const _id__delete$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$c
});

const _id__get$4 = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684\u516C\u544A ID"
      });
    }
    const announcement = await getAnnouncementById(id);
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u516C\u544A"
      });
    }
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("\u274C Get Announcement Detail Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u8A73\u7D30\u8CC7\u8A0A\u5931\u6557"
    });
  }
});

const _id__get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$4
});

const _id__put$c = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u516C\u544A ID"
      });
    }
    const body = await readBody(event);
    if (!body.title || !body.category || !body.publish_date || !body.activity_start_date || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateAnnouncement(id, {
      title: body.title,
      category: body.category,
      publish_date: body.publish_date,
      activity_start_date: body.activity_start_date,
      content: body.content,
      linkTitle: body.linkTitle || null,
      link: body.link || null
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update Announcement Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u516C\u544A\u5931\u6557"
    });
  }
});

const _id__put$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$c
});

const index_get$g = defineEventHandler(async (event) => {
  try {
    const announcements = await getAllAnnouncements();
    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error("\u274C Get Announcements Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
});

const index_post$e = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    if (!body.title || !body.category || !body.publish_date || !body.activity_start_date || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const announcementData = {
      title: body.title,
      category: body.category,
      publish_date: body.publish_date,
      activity_start_date: body.activity_start_date,
      content: body.content,
      link: body.link || null,
      linkTitle: body.linkTitle || null
    };
    const announcement = await createAnnouncement(announcementData);
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("\u274C Create Announcement Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u516C\u544A\u5931\u6557"
    });
  }
});

const index_post$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$e
});

async function validateUser(username, password) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("username", username).input("password", password).query(`
        SELECT uid, username, role 
        FROM Users 
        WHERE username = @username AND password = @password
      `);
    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error("\u274C Validation Error:", error);
    throw error;
  }
}

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    console.log("\u63A5\u6536\u5230\u767B\u5165\u8ACB\u6C42:", { username });
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7528\u6236\u540D\u548C\u5BC6\u78BC\u4E0D\u80FD\u70BA\u7A7A"
      });
    }
    const user = await validateUser(username, password);
    console.log("\u7528\u6236\u9A57\u8B49\u7D50\u679C:", user);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u7528\u6236\u540D\u6216\u5BC6\u78BC\u932F\u8AA4"
      });
    }
    const config = useRuntimeConfig();
    const token = jwt.sign(
      {
        userId: user.uid,
        // 注意這裡使用 uid 而不是 id
        username: user.username,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );
    setCookie(event, "auth_token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
      // 24小時
      path: "/",
      secure: false,
      sameSite: "lax"
    });
    console.log("\u767B\u5165\u6210\u529F\uFF0C\u8FD4\u56DE\u97FF\u61C9");
    return {
      success: true,
      user: {
        id: user.uid,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error("\u767B\u5165\u8655\u7406\u932F\u8AA4:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u670D\u52D9\u5668\u932F\u8AA4"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login_post
});

const logout_post = defineEventHandler((event) => {
  deleteCookie(event, "auth_token", {
    httpOnly: true,
    path: "/"
  });
  return {
    success: true,
    message: "\u767B\u51FA\u6210\u529F"
  };
});

const logout_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: logout_post
});

const verify_get = defineEventHandler(async (event) => {
  var _a;
  try {
    console.log("verify.get");
    const token = (_a = getHeader(event, "Authorization")) == null ? void 0 : _a.split(" ")[1];
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u672A\u63D0\u4F9B\u8A8D\u8B49\u4EE4\u724C"
      });
    }
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return {
      valid: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role
      }
    };
  } catch (error) {
    console.error("Token verification error:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "\u7121\u6548\u7684\u8A8D\u8B49\u4EE4\u724C"
    });
  }
});

const verify_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: verify_get
});

async function getAllBanners(active = 0) {
  try {
    const pool = await getConnection();
    let result;
    if (active == 0) {
      result = await pool.request().query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE is_deleted = 0
        ORDER BY sort_order ASC, id DESC;
      `);
    } else if (active == 1) {
      result = await pool.request().query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE is_deleted = 0 AND is_active = 1
        ORDER BY sort_order ASC, id DESC;
      `);
    }
    return result.recordset;
  } catch (error) {
    console.error("\u274C Get All Banners Error:", error);
    throw error;
  }
}
async function getBannerById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as is_active,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Get Banner By Id Error:", error);
    throw error;
  }
}
async function createBanner({
  title,
  description,
  imageData,
  imageType,
  isActive
}) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      const maxOrderResult = await transaction.request().query(`
          SELECT ISNULL(MAX(sort_order), 0) + 1 as nextOrder
          FROM Banners
          WHERE is_deleted = 0
        `);
      const nextOrder = maxOrderResult.recordset[0].nextOrder;
      const result = await transaction.request().input("title", sql.NVarChar(100), title).input("description", sql.NVarChar(500), description).input("imageData", sql.VarBinary(sql.MAX), imageData).input("imageType", sql.NVarChar(50), imageType).input("sortOrder", sql.Int, nextOrder).input("isActive", sql.Bit, isActive).query(`
          INSERT INTO Banners (
            title,
            description,
            image_data,
            image_type,
            sort_order,
            is_active,
            created_at,
            updated_at
          )
          OUTPUT 
            INSERTED.id,
            INSERTED.title,
            INSERTED.description,
            CAST(INSERTED.image_data as varbinary(max)) as imageData,
            INSERTED.image_type as imageType,
            INSERTED.sort_order as sortOrder,
            INSERTED.is_active as isActive,
            INSERTED.created_at as createdAt,
            INSERTED.updated_at as updatedAt
          VALUES (
            @title,
            @description,
            @imageData,
            @imageType,
            @sortOrder,
            @isActive,
            GETDATE(),
            GETDATE()
          );
        `);
      await transaction.commit();
      return result.recordset[0];
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  } catch (error) {
    console.error("\u274C Create Banner Error:", error);
    throw error;
  }
}
async function updateBanner(id, {
  title,
  description,
  imageData,
  imageType,
  isActive
}) {
  try {
    const pool = await getConnection();
    const updateFields = [];
    const request = pool.request().input("id", sql.Int, id);
    if (title !== void 0) {
      request.input("title", sql.NVarChar(100), title);
      updateFields.push("title = @title");
    }
    if (description !== void 0) {
      request.input("description", sql.NVarChar(500), description);
      updateFields.push("description = @description");
    }
    if (imageData !== void 0) {
      request.input("imageData", sql.VarBinary(sql.MAX), imageData);
      updateFields.push("image_data = @imageData");
    }
    if (imageType !== void 0) {
      request.input("imageType", sql.NVarChar(50), imageType);
      updateFields.push("image_type = @imageType");
    }
    if (isActive !== void 0) {
      request.input("isActive", sql.Bit, isActive);
      updateFields.push("is_active = @isActive");
    }
    updateFields.push("updated_at = GETDATE()");
    const result = await request.query(`
      UPDATE Banners
      SET ${updateFields.join(", ")}
      OUTPUT INSERTED.*
      WHERE id = @id AND is_deleted = 0;
    `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Banner Error:", error);
    throw error;
  }
}
async function deleteBanner(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        UPDATE Banners
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        OUTPUT INSERTED.*
        WHERE id = @id AND is_deleted = 0;
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Delete Banner Error:", error);
    throw error;
  }
}
async function updateBannerOrder(id, targetOrder) {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();
    const currentBanner = await transaction.request().input("id", sql.Int, id).query(`
        SELECT id, sort_order
        FROM Banners
        WHERE id = @id AND is_deleted = 0
      `);
    if (currentBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner");
    }
    const currentOrder = currentBanner.recordset[0].sort_order;
    const targetBanner = await transaction.request().input("targetOrder", sql.Int, targetOrder).query(`
        SELECT id, sort_order
        FROM Banners
        WHERE sort_order = @targetOrder AND is_deleted = 0
      `);
    if (targetBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u76EE\u6A19\u6392\u5E8F\u7684 Banner");
    }
    const targetBannerId = targetBanner.recordset[0].id;
    await transaction.request().input("id1", sql.Int, id).input("order1", sql.Int, targetOrder).input("id2", sql.Int, targetBannerId).input("order2", sql.Int, currentOrder).query(`
        UPDATE b
        SET sort_order = CASE
          WHEN id = @id1 THEN @order1
          WHEN id = @id2 THEN @order2
        END,
        updated_at = GETDATE()
        FROM Banners b
        WHERE id IN (@id1, @id2) AND is_deleted = 0;
      `);
    await transaction.commit();
    const result = await pool.request().input("id1", sql.Int, id).input("id2", sql.Int, targetBannerId).query(`
        SELECT 
          id,
          title,
          description,
          CAST(image_data as varbinary(max)) as imageData,
          image_type as imageType,
          sort_order as sortOrder,
          is_active as isActive,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id IN (@id1, @id2) AND is_deleted = 0
        ORDER BY sort_order;
      `);
    return result.recordset;
  } catch (error) {
    await transaction.rollback();
    console.error("\u66F4\u65B0\u6392\u5E8F\u5931\u6557:", error);
    throw error;
  }
}

const _id__delete$a = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684 Banner ID"
      });
    }
    await deleteBanner(id);
    return {
      success: true,
      message: "\u522A\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u274C Delete Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664 Banner \u5931\u6557"
    });
  }
});

const _id__delete$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$a
});

const _id__put$a = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const isActive = ((_c = formData.find((f) => f.name === "is_active")) == null ? void 0 : _c.data.toString()) == 1;
    const updateData = {
      title,
      description,
      isActive
    };
    if (imageFile) {
      const originalSize = (imageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
      try {
        const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
        const img = await loadImage(base64Image);
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u5716\u7247\u5927\u5C0F: ${compressedSize} KB`);
        console.log(`\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - imageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
        updateData.imageData = imageBuffer;
        updateData.imageType = "image/jpeg";
      } catch (error) {
        console.error("\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const data = await updateBanner(id, updateData);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0 Banner \u5931\u6557"
    });
  }
});

const _id__put$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$a
});

const index_get$e = defineEventHandler(async (event) => {
  try {
    const active = getQuery$1(event).active;
    if (active == 1) {
      const data = await getAllBanners(active);
      data.forEach((banner) => {
        banner.imageData = banner.imageData.toString("base64");
      });
      return { success: true, data };
    } else {
      const data = await getAllBanners();
      data.forEach((banner) => {
        banner.imageData = banner.imageData.toString("base64");
      });
      return { success: true, data };
    }
  } catch (error) {
    console.error("\u274C Get All Banners Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6 Banner \u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

const index_post$c = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const sortOrder = (_c = formData.find((f) => f.name === "sortOrder")) == null ? void 0 : _c.data.toString();
    const isActive = ((_d = formData.find((f) => f.name === "is_active")) == null ? void 0 : _d.data.toString()) == 1;
    if (!title || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    let imageBuffer;
    if (imageFile) {
      const originalSize = (imageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
      try {
        const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
        const img = await loadImage(base64Image);
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        imageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedSize = (imageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u5716\u7247\u5927\u5C0F: ${compressedSize} KB`);
        console.log(`\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - imageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const data = await createBanner({
      title,
      description,
      imageData: imageBuffer,
      imageType: "image/jpeg",
      sortOrder: parseInt(sortOrder) || 0,
      isActive
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Create Banner Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA Banner \u5931\u6557"
    });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$c
});

const order_put$2 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const { bannerId, targetOrder } = await readBody(event);
    if (!bannerId || targetOrder === void 0) {
      return createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const result = await updateBannerOrder(bannerId, targetOrder);
    return {
      success: true,
      message: "\u6392\u5E8F\u66F4\u65B0\u6210\u529F",
      data: result
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u6392\u5E8F\u5931\u6557:", error);
    return createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u66F4\u65B0\u6392\u5E8F\u5931\u6557"
    });
  }
});

const order_put$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: order_put$2
});

async function getAllKnowledge(category = null, includeImage = false) {
  try {
    const pool = await getConnection();
    let query = `
      SELECT 
        kid,
        know_category,
        title,
        display_order,
        created_at,
        updated_at,
        image_url
    `;
    if (includeImage) {
      query += `,
        image_data,
        image_type,
        CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_base64
      `;
    }
    query += `
      FROM knowledge
      WHERE 1=1
    `;
    if (category) {
      query += " AND know_category = @category";
    }
    query += " ORDER BY know_category, display_order, kid";
    const request = pool.request();
    if (category) {
      request.input("category", sql.Int, parseInt(category));
    }
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("\u274C Get All Knowledge Error:", error);
    throw error;
  }
}
async function getKnowledgeById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("kid", sql.Int, id).query(`
        SELECT 
          kid,
          know_category,
          title,
          display_order,
          image_type,
          CAST('' as xml).value('xs:base64Binary(sql:column("image_data"))', 'varchar(max)') as image_data,
          created_at,
          updated_at,
          image_url
        FROM knowledge
        WHERE kid = @kid
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u7372\u53D6\u77E5\u8B58\u5EAB\u8CC7\u6599\u5931\u6557:", error);
    throw error;
  }
}
async function createKnowledge({ know_category, imageBuffer, imageType, title, image_url }) {
  try {
    const pool = await getConnection();
    const now = /* @__PURE__ */ new Date();
    const maxOrderResult = await pool.request().input("know_category", sql.Int, know_category).query(`
        SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
        FROM knowledge
        WHERE know_category = @know_category
      `);
    const nextOrder = maxOrderResult.recordset[0].next_order;
    console.log(title);
    const result = await pool.request().input("know_category", sql.Int, know_category).input("image_data", sql.VarBinary(sql.MAX), imageBuffer).input("image_type", sql.NVarChar(50), imageType).input("created_at", sql.DateTime, now).input("updated_at", sql.DateTime, now).input("title", sql.NVarChar(50), title).input("display_order", sql.Int, nextOrder).input("image_url", sql.NVarChar(255), image_url).query(`
        INSERT INTO knowledge (
          know_category, 
          image_data, 
          image_type, 
          created_at, 
          updated_at,
          title,
          display_order,
          image_url
        )
        OUTPUT 
          INSERTED.kid,
          INSERTED.know_category,
          'data:' + INSERTED.image_type + ';base64,' + 
          CAST('' as xml).value('xs:base64Binary(sql:column("INSERTED.image_data"))', 'varchar(max)') as image_data,
          INSERTED.image_url,
          INSERTED.created_at,
          INSERTED.updated_at,
          INSERTED.title,
          INSERTED.display_order
        VALUES (
          @know_category, 
          @image_data, 
          @image_type, 
          @created_at, 
          @updated_at,
          @title,
          @display_order,
          @image_url
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Insert Error:", error);
    throw error;
  }
}
async function updateKnowledge(id, title, category, imageData = null, image_url = null) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    console.log("image_url", image_url);
    try {
      const currentItemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      if (currentItemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const currentItem = currentItemResult.recordset[0];
      const oldCategory = currentItem.know_category;
      const oldOrder = currentItem.display_order;
      if (oldCategory !== category) {
        await transaction.request().input("category", sql.Int, oldCategory).input("order", sql.Int, oldOrder).query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category 
            AND display_order > @order
          `);
        const maxOrderResult = await transaction.request().input("category", sql.Int, category).query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        const newOrder = maxOrderResult.recordset[0].next_order;
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              display_order = @newOrder,
              updated_at = @updated_at,
              image_url = @image_url
        `;
        if (imageData) {
          query += ", image_data = @image_data";
        }
        query += " WHERE kid = @id";
        const request = transaction.request();
        request.input("id", sql.Int, id);
        request.input("category", sql.Int, category);
        request.input("title", sql.NVarChar, title);
        request.input("newOrder", sql.Int, newOrder);
        request.input("updated_at", sql.DateTime, /* @__PURE__ */ new Date());
        request.input("image_url", sql.NVarChar(255), image_url);
        if (imageData) {
          request.input("image_data", sql.VarBinary(sql.MAX), imageData);
        }
        await request.query(query);
      } else {
        let query = `
          UPDATE knowledge
          SET know_category = @category,
              title = @title,
              updated_at = @updated_at,
              image_url = @image_url
        `;
        if (imageData) {
          query += ", image_data = @image_data";
        }
        query += " WHERE kid = @id";
        const request = transaction.request();
        request.input("id", sql.Int, id);
        request.input("category", sql.Int, category);
        request.input("title", sql.NVarChar, title);
        request.input("updated_at", sql.DateTime, /* @__PURE__ */ new Date());
        request.input("image_url", sql.NVarChar(255), image_url);
        if (imageData) {
          request.input("image_data", sql.VarBinary(sql.MAX), imageData);
        }
        await request.query(query);
      }
      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C Update Knowledge Error:", error);
    throw error;
  }
}
async function updateKnowledgeOrder(id, newOrder, category) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    try {
      const currentItemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT display_order, know_category
          FROM knowledge
          WHERE kid = @kid
        `);
      if (currentItemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const currentItem = currentItemResult.recordset[0];
      const oldOrder = currentItem.display_order;
      const oldCategory = currentItem.know_category;
      if (oldCategory !== category) {
        await transaction.request().input("category", sql.Int, oldCategory).input("order", sql.Int, oldOrder).query(`
            UPDATE knowledge
            SET display_order = display_order - 1
            WHERE know_category = @category AND display_order > @order
          `);
        const maxOrderResult = await transaction.request().input("category", sql.Int, category).query(`
            SELECT ISNULL(MAX(display_order), 0) + 1 AS next_order
            FROM knowledge
            WHERE know_category = @category
          `);
        const targetMaxOrder = maxOrderResult.recordset[0].next_order;
        await transaction.request().input("kid", sql.Int, id).input("order", sql.Int, targetMaxOrder).input("category", sql.Int, category).query(`
            UPDATE knowledge
            SET display_order = @order,
                know_category = @category
            WHERE kid = @kid
          `);
      } else {
        if (oldOrder < newOrder) {
          await transaction.request().input("category", sql.Int, category).input("oldOrder", sql.Int, oldOrder).input("newOrder", sql.Int, newOrder).query(`
              UPDATE knowledge
              SET display_order = display_order - 1
              WHERE know_category = @category 
                AND display_order > @oldOrder 
                AND display_order <= @newOrder
            `);
        } else if (oldOrder > newOrder) {
          await transaction.request().input("category", sql.Int, category).input("oldOrder", sql.Int, oldOrder).input("newOrder", sql.Int, newOrder).query(`
              UPDATE knowledge
              SET display_order = display_order + 1
              WHERE know_category = @category 
                AND display_order >= @newOrder 
                AND display_order < @oldOrder
            `);
        }
        await transaction.request().input("kid", sql.Int, id).input("order", sql.Int, newOrder).query(`
            UPDATE knowledge
            SET display_order = @order
            WHERE kid = @kid
          `);
      }
      await transaction.commit();
      return { success: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C Update Order Error:", error);
    throw error;
  }
}
async function deleteKnowledge(id) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    try {
      const itemResult = await transaction.request().input("kid", sql.Int, id).query(`
          SELECT know_category, display_order
          FROM knowledge
          WHERE kid = @kid
        `);
      if (itemResult.recordset.length === 0) {
        throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u77E5\u8B58\u9805\u76EE");
      }
      const item = itemResult.recordset[0];
      await transaction.request().input("kid", sql.Int, id).query("DELETE FROM knowledge WHERE kid = @kid");
      await transaction.request().input("category", sql.Int, item.know_category).input("order", sql.Int, item.display_order).query(`
          UPDATE knowledge
          SET display_order = display_order - 1
          WHERE know_category = @category AND display_order > @order
        `);
      await transaction.commit();
      return { message: "\u522A\u9664\u6210\u529F" };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C Delete Error:", error);
    throw error;
  }
}

const _id__delete$8 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    await deleteKnowledge(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C Delete Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u77E5\u8B58\u5931\u6557"
    });
  }
});

const _id__delete$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$8
});

const _id__get$2 = defineEventHandler(async (event) => {
  var _a;
  try {
    const token = (_a = getRequestHeader(event, "authorization")) == null ? void 0 : _a.split(" ")[1];
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u6388\u6B0A\u7684\u8ACB\u6C42"
      });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      throw createError({
        statusCode: 401,
        message: "\u7121\u6548\u7684 Token"
      });
    }
    const id = getRouterParam(event, "id");
    const result = await getKnowledgeById(id);
    if (!result) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u8A72\u7B46\u8CC7\u6599"
      });
    }
    return {
      success: true,
      data: {
        ...result,
        image_url: `data:${result.image_type};base64,${result.image_data}`
      }
    };
  } catch (error) {
    console.error("\u7372\u53D6\u77E5\u8B58\u5EAB\u8CC7\u6599\u5931\u6557:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u8CC7\u6599\u5931\u6557"
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$2
});

async function _id__put$8(event) {
  var _a, _b, _c;
  try {
    const id = event.context.params.id;
    const formData = await readMultipartFormData(event);
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684\u8ACB\u6C42\u683C\u5F0F"
      });
    }
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const know_category = (_b = formData.find((f) => f.name === "know_category")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!title || !know_category) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u5FC5\u8981\u53C3\u6578"
      });
    }
    let imagePath = null;
    if (imageFile) {
      imagePath = imageFile.data;
    }
    const result = await updateKnowledge(
      parseInt(id),
      title,
      parseInt(know_category),
      imagePath,
      image_url
    );
    return result;
  } catch (error) {
    console.error("Update Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u66F4\u65B0\u5931\u6557"
    });
  }
}

const _id__put$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$8
});

const image_get = defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const knowledge = await getKnowledgeById(id);
    if (!knowledge || !knowledge.image_data) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u5716\u7247"
      });
    }
    setHeader(event, "Content-Type", knowledge.image_type || "image/jpeg");
    return knowledge.image_data;
  } catch (error) {
    console.error("Get Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u5716\u7247\u5931\u6557"
    });
  }
});

const image_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: image_get
});

const index_get$c = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const category = query.category;
    const includeImage = query.includeImage === "true";
    const data = await getAllKnowledge(category, includeImage);
    return { success: true, data };
  } catch (error) {
    console.error("Get Knowledge List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u77E5\u8B58\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
});

const index_post$a = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const title = (_b = formData.find((f) => f.name === "title")) == null ? void 0 : _b.data.toString();
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!know_category || !imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const originalSize = (imageFile.data.length / 1024).toFixed(2);
    console.log(`\u539F\u59CB\u5716\u7247\u5927\u5C0F: ${originalSize} KB`);
    let compressedImageBuffer;
    try {
      const base64Image = `data:${imageFile.type};base64,${imageFile.data.toString("base64")}`;
      const img = await loadImage(base64Image);
      const maxWidth = 1200;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      compressedImageBuffer = canvas.toBuffer("image/jpeg", {
        quality: 0.8,
        progressive: true
      });
      const compressedSize = (compressedImageBuffer.length / 1024).toFixed(2);
      console.log(`\u58D3\u7E2E\u5F8C\u5927\u5C0F: ${compressedSize} KB`);
      console.log(`\u58D3\u7E2E\u7387: ${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`);
    } catch (error) {
      console.error("\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
      throw createError({
        statusCode: 400,
        statusMessage: "\u5716\u7247\u8655\u7406\u5931\u6557"
      });
    }
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: compressedImageBuffer,
      imageType: "image/jpeg",
      title,
      image_url: image_url || null
    });
    return {
      success: true,
      data,
      imageInfo: {
        originalSize: `${originalSize} KB`,
        compressedSize: `${(compressedImageBuffer.length / 1024).toFixed(2)} KB`,
        compressionRatio: `${((1 - compressedImageBuffer.length / imageFile.data.length) * 100).toFixed(2)}%`
      }
    };
  } catch (error) {
    console.error("\u274C Create Knowledge Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u77E5\u8B58\u5931\u6557"
    });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$a
});

const order_put = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id, newOrder, category } = body;
    if (!id || newOrder === void 0 || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C3\u6578"
      });
    }
    await updateKnowledgeOrder(id, newOrder, category);
    return { success: true, message: "\u9806\u5E8F\u66F4\u65B0\u6210\u529F" };
  } catch (error) {
    console.error("Update Knowledge Order Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "\u66F4\u65B0\u9806\u5E8F\u5931\u6557"
    });
  }
});

const order_put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: order_put
});

async function getAllQA() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM QA");
    return result.recordset;
  } catch (error) {
    console.error("\u274C Query Error:", error);
    throw error;
  }
}
async function getQAById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).query("SELECT * FROM QA WHERE id = @id");
    return result.recordset.length ? result.recordset[0] : null;
  } catch (error) {
    console.error("\u274C Query Error:", error);
    throw error;
  }
}
async function createQA(question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("question", question).input("answer", answer).input("category", category).query(`
        INSERT INTO QA (question, answer, category)
        OUTPUT INSERTED.*
        VALUES (@question, @answer, @category)
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Insert Error:", error);
    throw error;
  }
}
async function updateQA(id, question, answer, category) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", id).input("question", question).input("answer", answer).input("category", category).query(`
        UPDATE QA
        SET question = @question, answer = @answer, category = @category
        OUTPUT INSERTED.*
        WHERE id = @id
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update Error:", error);
    throw error;
  }
}
async function deleteQA(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).query("DELETE FROM QA WHERE id = @id");
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C Delete Error:", error);
    throw error;
  }
}
async function getAllQAContents() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        qc.id,
        qc.question,
        qc.answer,
        qc.category_id,
        qc.language_id,
        qc.sort_order,
        qc.created_at,
        qc.updated_at,
        qcat.name as category_name,
        l.name as language_name,
        l.code as language_code
      FROM QAContents qc
      LEFT JOIN QACategories qcat ON qc.category_id = qcat.id
      LEFT JOIN Languages l ON qc.language_id = l.id
      WHERE qc.is_deleted = 0
      ORDER BY qc.sort_order ASC, qc.created_at DESC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllQAContents Error:", error);
    throw error;
  }
}
async function createQAContent(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("category_id", data.category_id).input("language_id", data.language_id).input("question", data.question).input("answer", data.answer).input("sort_order", data.sort_order || 0).query(`
        INSERT INTO QAContents (
          category_id,
          language_id,
          question,
          answer,
          sort_order
        )
        OUTPUT INSERTED.*
        VALUES (
          @category_id,
          @language_id,
          @question,
          @answer,
          @sort_order
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C createQAContent Error:", error);
    throw error;
  }
}
async function updateQAContent(id, data) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).input("category_id", data.category_id).input("language_id", data.language_id).input("question", data.question).input("answer", data.answer).input("sort_order", data.sort_order).query(`
        UPDATE QAContents
        SET 
          category_id = @category_id,
          language_id = @language_id,
          question = @question,
          answer = @answer,
          sort_order = @sort_order,
          updated_at = GETDATE()
        WHERE id = @id AND is_deleted = 0
      `);
    const result = await pool.request().input("id", id).query(`
        SELECT 
          qc.id,
          qc.question,
          qc.answer,
          qc.category_id,
          qc.language_id,
          qc.sort_order,
          qc.created_at,
          qc.updated_at,
          qcat.name as category_name,
          l.name as language_name,
          l.code as language_code
        FROM QAContents qc
        LEFT JOIN QACategories qcat ON qc.category_id = qcat.id
        LEFT JOIN Languages l ON qc.language_id = l.id
        WHERE qc.id = @id AND qc.is_deleted = 0
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C updateQAContent Error:", error);
    throw error;
  }
}
async function deleteQAContent(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", id).query(`
        UPDATE QAContents
        SET 
          is_deleted = 1,
          updated_at = GETDATE()
        WHERE id = @id
      `);
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C deleteQAContent Error:", error);
    throw error;
  }
}
async function getAllQACategories() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id,
        parent_id,
        name,
        name_en,
        name_vi,
        name_id,
        name_th,
        created_at,
        updated_at
      FROM QACategories
      WHERE is_deleted = 0
      ORDER BY created_at ASC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllQACategories Error:", error);
    throw error;
  }
}
async function createQACategory(data) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("name", data.name).input("name_en", data.name_en).input("name_vi", data.name_vi).input("name_id", data.name_id).input("name_th", data.name_th).input("parent_id", data.parent_id).query(`
        INSERT INTO QACategories (
          name,
          name_en,
          name_vi,
          name_id,
          name_th,
          parent_id
        )
        OUTPUT INSERTED.*
        VALUES (
          @name,
          @name_en,
          @name_vi,
          @name_id,
          @name_th,
          @parent_id
        )
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C createQACategory Error:", error);
    throw error;
  }
}
async function updateQACategory(id, data) {
  try {
    const pool = await getConnection();
    const checkResult = await pool.request().input("id", id).query("SELECT id FROM QACategories WHERE id = @id");
    if (!checkResult.recordset.length) {
      throw new Error("\u627E\u4E0D\u5230\u8981\u66F4\u65B0\u7684\u5206\u985E");
    }
    await pool.request().input("id", id).input("name", data.name).input("name_en", data.name_en).input("name_vi", data.name_vi).input("name_id", data.name_id).input("name_th", data.name_th).input("parent_id", data.parent_id).query(`
        UPDATE QACategories
        SET 
          name = @name,
          name_en = @name_en,
          name_vi = @name_vi,
          name_id = @name_id,
          name_th = @name_th,
          parent_id = @parent_id,
          updated_at = GETDATE()
        WHERE id = @id
      `);
    const result = await pool.request().input("id", id).query(`
        SELECT 
          id,
          parent_id,
          name,
          name_en,
          name_vi,
          name_id,
          name_th,
          created_at,
          updated_at
        FROM QACategories
        WHERE id = @id
      `);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C updateQACategory Error:", error);
    throw error;
  }
}
async function deleteQACategory(id) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      const subCategoriesResult = await transaction.request().input("parent_id", id).query(`
          SELECT id
          FROM QACategories
          WHERE parent_id = @parent_id AND is_deleted = 0
        `);
      const subCategoryIds = subCategoriesResult.recordset.map((row) => row.id);
      const allCategoryIds = [id, ...subCategoryIds];
      await transaction.request().input("categoryIds", sql.VarChar(1e3), allCategoryIds.join(",")).query(`
          UPDATE QAContents
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE category_id IN (
            SELECT value
            FROM STRING_SPLIT(@categoryIds, ',')
          )
        `);
      if (subCategoryIds.length > 0) {
        await transaction.request().input("categoryIds", sql.VarChar(1e3), subCategoryIds.join(",")).query(`
            UPDATE QACategories
            SET 
              is_deleted = 1,
              updated_at = GETDATE()
            WHERE id IN (
              SELECT value
              FROM STRING_SPLIT(@categoryIds, ',')
            )
          `);
      }
      await transaction.request().input("id", id).query(`
          UPDATE QACategories
          SET 
            is_deleted = 1,
            updated_at = GETDATE()
          WHERE id = @id
        `);
      await transaction.commit();
      return {
        message: "\u522A\u9664\u6210\u529F",
        deletedCategories: allCategoryIds.length,
        hasSubCategories: subCategoryIds.length > 0
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("\u274C deleteQACategory Error:", error);
    throw error;
  }
}
async function getAllLanguages() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id,
        code,
        name,
        created_at,
        updated_at
      FROM Languages
      WHERE is_deleted = 0
      ORDER BY created_at ASC
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C getAllLanguages Error:", error);
    throw error;
  }
}

const index_get$a = defineEventHandler(async (event) => {
  try {
    const data = await getAllLanguages();
    return { success: true, data };
  } catch (error) {
    console.error("Get Languages List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u8A9E\u8A00\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const _id__delete$6 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    await deleteQACategory(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("Delete QA Category Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u554F\u7B54\u985E\u5225\u5931\u6557"
    });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$6
});

const _id__put$6 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const body = await readBody(event);
    const { parent_id, name, name_en, name_vi, name_id, name_th } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateQACategory(id, {
      parent_id: parent_id || null,
      name,
      name_en,
      name_vi,
      name_id,
      name_th
    });
    return { success: true, data };
  } catch (error) {
    console.error("Update QA Category Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u554F\u7B54\u985E\u5225\u5931\u6557"
    });
  }
});

const _id__put$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$6
});

const index_get$8 = defineEventHandler(async (event) => {
  try {
    const data = await getAllQACategories();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA Categories List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u985E\u5225\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$8
});

const index_post$8 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    console.log("Received POST body:", body);
    const { parent_id, name } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await createQACategory({
      parent_id: parent_id || null,
      name
    });
    return { success: true, data };
  } catch (error) {
    console.error("Create QA Category Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u554F\u7B54\u985E\u5225\u5931\u6557"
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$8
});

const _id__delete$4 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    await deleteQAContent(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("Delete QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u554F\u7B54\u5931\u6557"
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$4
});

const _id__put$4 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const body = await readBody(event);
    const { category_id, language_id, question, answer, sort_order } = body;
    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateQAContent(id, {
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    return { success: true, data };
  } catch (error) {
    console.error("Update QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u554F\u7B54\u5931\u6557"
    });
  }
});

const _id__put$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$4
});

const index_get$6 = defineEventHandler(async (event) => {
  try {
    const data = await getAllQAContents();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA Contents List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$6
});

const index_post$6 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    console.log("Received POST body:", body);
    const { category_id, language_id, question, answer, sort_order } = body;
    if (!category_id || !language_id || !question || !answer) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await createQAContent({
      category_id,
      language_id,
      question,
      answer,
      sort_order: sort_order || 0
    });
    return { success: true, data };
  } catch (error) {
    console.error("Create QA Content Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u554F\u7B54\u5931\u6557"
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$6
});

const qaController = {
  async getAllQA(event) {
    console.log("\u2705 in getAllQA");
    try {
      const qas = await getAllQA();
      return { data: qas };
    } catch (error) {
      console.error("\u274C Error in getAllQA:", error);
      return { error: "Database query failed" };
    }
  },
  async getQAById(event) {
    try {
      const id = event.context.params.id;
      const qa = await getQAById(id);
      if (!qa) {
        return { message: "\u627E\u4E0D\u5230\u8A72 QA" };
      }
      return { data: qa };
    } catch (error) {
      console.error("\u274C Error in getQAById:", error);
      return { error: error.message };
    }
  },
  async createQA(event) {
    try {
      const body = await readBody(event);
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: "\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\u7684" };
      }
      const newQA = await createQA(question, answer, category);
      return { data: newQA };
    } catch (error) {
      console.error("\u274C Error in createQA:", error);
      return { error: error.message };
    }
  },
  async updateQA(event) {
    try {
      const id = event.context.params.id;
      const body = await readBody(event);
      const { question, answer, category } = body;
      if (!question || !answer || !category) {
        return { message: "\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\u7684" };
      }
      const updatedQA = await updateQA(id, question, answer, category);
      return { data: updatedQA };
    } catch (error) {
      console.error("\u274C Error in updateQA:", error);
      return { error: error.message };
    }
  },
  async deleteQA(event) {
    try {
      const id = event.context.params.id;
      await deleteQA(id);
      return { message: "\u522A\u9664\u6210\u529F" };
    } catch (error) {
      console.error("\u274C Error in deleteQA:", error);
      return { error: error.message };
    }
  }
};

const qa = defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    return qaController.getAllQA(event);
  }
});

const qa$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: qa
});

const _id__delete$2 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    await deleteQA(id);
    return { success: true, message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("Delete QA Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u554F\u7B54\u5931\u6557"
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$2
});

const _id__put$2 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = event.context.params.id;
    const body = await readBody(event);
    const { question, answer, category } = body;
    if (!question || !answer || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await updateQA(id, question, answer, category);
    return { success: true, data };
  } catch (error) {
    console.error("Update QA Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u554F\u7B54\u5931\u6557"
    });
  }
});

const _id__put$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$2
});

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const data = await getAllQA();
    return { success: true, data };
  } catch (error) {
    console.error("Get QA List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u554F\u7B54\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const index_post$4 = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    console.log("Received POST body:", body);
    const { question, answer, category } = body;
    if (!question || !answer || !category) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await createQA(question, answer, category);
    return { success: true, data };
  } catch (error) {
    console.error("Create QA Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u554F\u7B54\u5931\u6557"
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

async function createServiceUnit({
  name,
  unitImage,
  category,
  region,
  serviceArea,
  address,
  phone,
  email,
  description,
  website,
  priceImage
}) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("name", sql.NVarChar(100), name).input("unitImage", sql.VarBinary(sql.MAX), unitImage).input("category", sql.NVarChar(50), category).input("region", sql.NVarChar(20), region).input("serviceArea", sql.NVarChar(200), serviceArea).input("address", sql.NVarChar(200), address).input("phone", sql.NVarChar(50), phone).input("email", sql.NVarChar(100), email).input("description", sql.NVarChar(sql.MAX), description).input("website", sql.NVarChar(200), website).input("priceImage", sql.VarBinary(sql.MAX), priceImage).query(`
        INSERT INTO service_units (
          name, unit_image, category, region, service_area,
          address, phone, email, description, website, price_image
        )
        VALUES (
          @name, @unitImage, @category, @region, @serviceArea,
          @address, @phone, @email, @description, @website, @priceImage
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);
    return result.recordset[0];
  } catch (err) {
    console.error("\u274C Create Service Unit Error:", err);
    throw err;
  }
}
async function getAllServiceUnits(includePriceImage = true) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT 
          id,
          name,
          category,
          region,
          service_area as serviceArea,
          address,
          phone,
          email,
          description,
          website,
          CAST(unit_image as varbinary(max)) as unitImage
          ${includePriceImage ? ", CAST(price_image as varbinary(max)) as priceImage" : ""}
        FROM service_units
        ORDER BY created_at DESC;
      `);
    return result.recordset;
  } catch (err) {
    console.error("\u274C Get All Service Units Error:", err);
    throw err;
  }
}
async function getServiceUnitById(id) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT 
          id,
          name,
          category,
          region,
          service_area as serviceArea,
          address,
          phone,
          email,
          description,
          website,
          CAST(unit_image as varbinary(max)) as unitImage,
          CAST(price_image as varbinary(max)) as priceImage,
          created_at as createdAt,
          updated_at as updatedAt
        FROM service_units
        WHERE id = @id;
      `);
    return result.recordset[0];
  } catch (err) {
    console.error("\u274C Get Service Unit By Id Error:", err);
    throw err;
  }
}
async function updateServiceUnit(id, {
  name,
  unitImage,
  category,
  region,
  serviceArea,
  address,
  phone,
  email,
  description,
  website,
  priceImage
}) {
  try {
    const pool = await getConnection();
    let query = `
      UPDATE service_units
      SET 
        name = @name,
        category = @category,
        region = @region,
        service_area = @serviceArea,
        address = @address,
        phone = @phone,
        email = @email,
        description = @description,
        website = @website,
        updated_at = GETDATE()
    `;
    if (unitImage) {
      query += `, unit_image = @unitImage`;
    }
    if (priceImage) {
      query += `, price_image = @priceImage`;
    }
    query += ` WHERE id = @id`;
    const request = pool.request().input("id", sql.Int, id).input("name", sql.NVarChar(100), name).input("category", sql.NVarChar(50), category).input("region", sql.NVarChar(20), region).input("serviceArea", sql.NVarChar(200), serviceArea).input("address", sql.NVarChar(200), address).input("phone", sql.NVarChar(50), phone).input("email", sql.NVarChar(100), email).input("description", sql.NVarChar(sql.MAX), description).input("website", sql.NVarChar(200), website);
    if (unitImage) {
      request.input("unitImage", sql.VarBinary(sql.MAX), unitImage);
    }
    if (priceImage) {
      request.input("priceImage", sql.VarBinary(sql.MAX), priceImage);
    }
    await request.query(query);
    return { success: true };
  } catch (err) {
    console.error("\u274C Update Service Unit Error:", err);
    throw err;
  }
}
async function deleteServiceUnit(id) {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, id).query("DELETE FROM service_units WHERE id = @id");
    return { success: true };
  } catch (err) {
    console.error("\u274C Delete Service Unit Error:", err);
    throw err;
  }
}

const _id__delete = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11 ID"
      });
    }
    const data = await deleteServiceUnit(id);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Delete Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u522A\u9664\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete
});

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 ID"
      });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u8A72\u670D\u52D9\u55AE\u4F4D"
      });
    }
    return {
      success: true,
      data: serviceUnit
    };
  } catch (error) {
    console.error("\u274C Get Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u670D\u52D9\u55AE\u4F4D\u8CC7\u6599\u5931\u6557"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get
});

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    await authenticate(event);
    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11 ID"
      });
    }
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const name = (_a = formData.find((f) => f.name === "name")) == null ? void 0 : _a.data.toString();
    const unitImageFile = formData.find((f) => f.name === "unitImage");
    const category = (_b = formData.find((f) => f.name === "category")) == null ? void 0 : _b.data.toString();
    const region = (_c = formData.find((f) => f.name === "region")) == null ? void 0 : _c.data.toString();
    const serviceArea = (_d = formData.find((f) => f.name === "serviceArea")) == null ? void 0 : _d.data.toString();
    const address = (_e = formData.find((f) => f.name === "address")) == null ? void 0 : _e.data.toString();
    const phone = (_f = formData.find((f) => f.name === "phone")) == null ? void 0 : _f.data.toString();
    const email = (_g = formData.find((f) => f.name === "email")) == null ? void 0 : _g.data.toString();
    const description = (_h = formData.find((f) => f.name === "description")) == null ? void 0 : _h.data.toString();
    const website = (_i = formData.find((f) => f.name === "website")) == null ? void 0 : _i.data.toString();
    const priceImageFile = formData.find((f) => f.name === "priceImage");
    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    let unitImageBuffer;
    if (unitImageFile) {
      const originalUnitSize = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${originalUnitSize} KB`);
      try {
        const base64UnitImage = `data:${unitImageFile.type};base64,${unitImageFile.data.toString("base64")}`;
        const img = await loadImage(base64UnitImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        unitImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedUnitSize = (unitImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${compressedUnitSize} KB`);
        console.log(`\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - unitImageBuffer.length / unitImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u55AE\u4F4D\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    let priceImageBuffer;
    if (priceImageFile) {
      const originalPriceSize = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${originalPriceSize} KB`);
      try {
        const base64PriceImage = `data:${priceImageFile.type};base64,${priceImageFile.data.toString("base64")}`;
        const img = await loadImage(base64PriceImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        priceImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedPriceSize = (priceImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${compressedPriceSize} KB`);
        console.log(`\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - priceImageBuffer.length / priceImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u50F9\u683C\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const data = await updateServiceUnit(id, {
      name,
      unitImage: unitImageBuffer,
      category,
      region,
      serviceArea,
      address,
      phone,
      email,
      description,
      website,
      priceImage: priceImageBuffer
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put
});

const priceImage_get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684 ID"
      });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u8A72\u670D\u52D9\u55AE\u4F4D"
      });
    }
    if (!serviceUnit.priceImage) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u6B64\u670D\u52D9\u55AE\u4F4D\u6C92\u6709\u50F9\u683C\u5716\u7247"
      });
    }
    setResponseHeaders(event, {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache"
    });
    return serviceUnit.priceImage;
  } catch (error) {
    console.error("\u274C Get Service Unit Price Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u50F9\u683C\u5716\u7247\u5931\u6557"
    });
  }
});

const priceImage_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: priceImage_get
});

const unitImage_get = defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 ID"
      });
    }
    const serviceUnit = await getServiceUnitById(id);
    if (!serviceUnit || !serviceUnit.unitImage) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u5716\u7247"
      });
    }
    setResponseHeaders(event, {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600"
    });
    return serviceUnit.unitImage;
  } catch (error) {
    console.error("\u274C Get Unit Image Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u7372\u53D6\u5716\u7247\u5931\u6557"
    });
  }
});

const unitImage_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: unitImage_get
});

const index_get$2 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const includePriceImage = query.includePriceImage !== "false";
    const data = await getAllServiceUnits(includePriceImage);
    if (!includePriceImage) {
      data.forEach((unit) => {
        delete unit.priceImage;
        delete unit.priceImagePath;
      });
    }
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Get Service Units Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const index_post$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw new Error("No form data");
    const name = (_a = formData.find((f) => f.name === "name")) == null ? void 0 : _a.data.toString();
    const unitImageFile = formData.find((f) => f.name === "unitImage");
    const category = (_b = formData.find((f) => f.name === "category")) == null ? void 0 : _b.data.toString();
    const region = (_c = formData.find((f) => f.name === "region")) == null ? void 0 : _c.data.toString();
    const serviceArea = (_d = formData.find((f) => f.name === "serviceArea")) == null ? void 0 : _d.data.toString();
    const address = (_e = formData.find((f) => f.name === "address")) == null ? void 0 : _e.data.toString();
    const phone = (_f = formData.find((f) => f.name === "phone")) == null ? void 0 : _f.data.toString();
    const email = (_g = formData.find((f) => f.name === "email")) == null ? void 0 : _g.data.toString();
    const description = (_h = formData.find((f) => f.name === "description")) == null ? void 0 : _h.data.toString();
    const website = (_i = formData.find((f) => f.name === "website")) == null ? void 0 : _i.data.toString();
    const priceImageFile = formData.find((f) => f.name === "priceImage");
    if (!name || !category || !region || !serviceArea || !address || !phone || !email || !description) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    let unitImageBuffer;
    if (unitImageFile) {
      const originalUnitSize = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${originalUnitSize} KB`);
      try {
        const base64UnitImage = `data:${unitImageFile.type};base64,${unitImageFile.data.toString("base64")}`;
        const img = await loadImage(base64UnitImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        unitImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedUnitSize = (unitImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${compressedUnitSize} KB`);
        console.log(`\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - unitImageBuffer.length / unitImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u55AE\u4F4D\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u55AE\u4F4D\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    let priceImageBuffer;
    if (priceImageFile) {
      const originalPriceSize = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u539F\u59CB\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${originalPriceSize} KB`);
      try {
        const base64PriceImage = `data:${priceImageFile.type};base64,${priceImageFile.data.toString("base64")}`;
        const img = await loadImage(base64PriceImage);
        const maxWidth = 1200;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        priceImageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        const compressedPriceSize = (priceImageBuffer.length / 1024).toFixed(2);
        console.log(`\u58D3\u7E2E\u5F8C\u50F9\u683C\u5716\u7247\u5927\u5C0F: ${compressedPriceSize} KB`);
        console.log(`\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u7387: ${((1 - priceImageBuffer.length / priceImageFile.data.length) * 100).toFixed(2)}%`);
      } catch (error) {
        console.error("\u50F9\u683C\u5716\u7247\u58D3\u7E2E\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          statusMessage: "\u50F9\u683C\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const data = await createServiceUnit({
      name,
      unitImage: unitImageBuffer,
      category,
      region,
      serviceArea,
      address,
      phone,
      email,
      description,
      website,
      priceImage: priceImageBuffer
    });
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Create Service Unit Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5275\u5EFA\u670D\u52D9\u55AE\u4F4D\u5931\u6557"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

async function getUserReminder() {
  try {
    const pool = await getConnection();
    const query = `
      SELECT 
        id,
        content,
        created_at,
        updated_at
      FROM user_reminders
      WHERE id = 1
    `;
    const result = await pool.request().query(query);
    return result.recordset[0] || { id: null, content: "", created_at: null, updated_at: null };
  } catch (error) {
    console.error("\u274C Get User Reminder Error:", error);
    throw error;
  }
}
async function updateUserReminder(content) {
  try {
    const pool = await getConnection();
    const query = `
      MERGE user_reminders AS target
      USING (SELECT 1 AS id) AS source
      ON (target.id = source.id)
      WHEN MATCHED THEN
        UPDATE SET content = @content, updated_at = GETDATE()
      WHEN NOT MATCHED THEN
        INSERT (content) VALUES (@content);

      SELECT 
        id,
        content,
        created_at,
        updated_at
      FROM user_reminders
      WHERE id = 1;
    `;
    const result = await pool.request().input("content", sql.NVarChar(sql.MAX), content).query(query);
    return result.recordset[0];
  } catch (error) {
    console.error("\u274C Update User Reminder Error:", error);
    throw error;
  }
}

const index_get = defineEventHandler(async (event) => {
  try {
    const data = await getUserReminder();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Get User Reminder Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u4F7F\u7528\u8005\u53EE\u5680\u5931\u6557"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const index_post = defineEventHandler(async (event) => {
  try {
    await authenticate(event);
    const body = await readBody(event);
    if (!body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u5167\u5BB9\u4E0D\u80FD\u70BA\u7A7A"
      });
    }
    const data = await updateUserReminder(body.content);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error("\u274C Update User Reminder Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u66F4\u65B0\u4F7F\u7528\u8005\u53EE\u5680\u5931\u6557"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

async function handleGetAllBanners(event) {
  try {
    const banners = await getAllBanners();
    return banners;
  } catch (error) {
    console.error("\u274C handleGetAllBanners Error:", error);
    throw createError({
      statusCode: 500,
      message: "\u7372\u53D6 Banner \u5217\u8868\u5931\u6557"
    });
  }
}
async function handleGetBannerById(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const banner = await getBannerById(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleGetBannerById Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u7372\u53D6 Banner \u8A73\u60C5\u5931\u6557"
    });
  }
}
async function handleCreateBanner(event) {
  try {
    const body = await readBody(event);
    if (!body.title || !body.image_data) {
      throw createError({
        statusCode: 400,
        message: "\u6A19\u984C\u548C\u5716\u7247\u70BA\u5FC5\u586B\u6B04\u4F4D"
      });
    }
    try {
      const base64Image = body.image_data;
      const img = await loadImage(base64Image);
      const maxWidth = 1920;
      const scale = maxWidth / img.width;
      const targetWidth = img.width > maxWidth ? maxWidth : img.width;
      const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageBuffer = canvas.toBuffer("image/jpeg", {
        quality: 0.8,
        progressive: true
      });
      const banner = await createBanner({
        ...body,
        image_data: imageBuffer,
        image_type: "image/jpeg"
      });
      return banner;
    } catch (error) {
      console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
      throw createError({
        statusCode: 400,
        message: "\u5716\u7247\u8655\u7406\u5931\u6557"
      });
    }
  } catch (error) {
    console.error("\u274C handleCreateBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u65B0\u589E Banner \u5931\u6557"
    });
  }
}
async function handleUpdateBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const body = await readBody(event);
    if (body.image_data) {
      try {
        const base64Image = body.image_data;
        const img = await loadImage(base64Image);
        const maxWidth = 1920;
        const scale = maxWidth / img.width;
        const targetWidth = img.width > maxWidth ? maxWidth : img.width;
        const targetHeight = img.width > maxWidth ? Math.round(img.height * scale) : img.height;
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const imageBuffer = canvas.toBuffer("image/jpeg", {
          quality: 0.8,
          progressive: true
        });
        body.image_data = imageBuffer;
        body.image_type = "image/jpeg";
      } catch (error) {
        console.error("\u5716\u7247\u8655\u7406\u5931\u6557:", error);
        throw createError({
          statusCode: 400,
          message: "\u5716\u7247\u8655\u7406\u5931\u6557"
        });
      }
    }
    const banner = await updateBanner(id, body);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleUpdateBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u66F4\u65B0 Banner \u5931\u6557"
    });
  }
}
async function handleDeleteBanner(event) {
  try {
    const id = parseInt(event.context.params.id);
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684 Banner ID"
      });
    }
    const banner = await deleteBanner(id);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return { message: "\u522A\u9664\u6210\u529F" };
  } catch (error) {
    console.error("\u274C handleDeleteBanner Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u522A\u9664 Banner \u5931\u6557"
    });
  }
}
async function handleUpdateBannerOrder(event) {
  try {
    const body = await readBody(event);
    const { id, sort_order } = body;
    if (isNaN(id) || isNaN(sort_order)) {
      throw createError({
        statusCode: 400,
        message: "\u7121\u6548\u7684\u53C3\u6578"
      });
    }
    const banner = await updateBannerOrder(id, sort_order);
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner"
      });
    }
    return banner;
  } catch (error) {
    console.error("\u274C handleUpdateBannerOrder Error:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "\u66F4\u65B0 Banner \u6392\u5E8F\u5931\u6557"
    });
  }
}

const banner = defineEventHandler(async (event) => {
  const method = event.method;
  const path = event.path;
  if (method === "GET" && path === "/api/banners") {
    return await handleGetAllBanners();
  }
  if (method === "GET" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleGetBannerById(event);
  }
  if (method === "POST" && path === "/api/banners") {
    return await handleCreateBanner(event);
  }
  if (method === "PUT" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleUpdateBanner(event);
  }
  if (method === "DELETE" && /^\/api\/banners\/\d+$/.test(path)) {
    return await handleDeleteBanner(event);
  }
  if (method === "PUT" && path === "/api/banners/order") {
    return await handleUpdateBannerOrder(event);
  }
  throw createError({
    statusCode: 404,
    message: "\u627E\u4E0D\u5230\u8A72\u8DEF\u7531"
  });
});

const banner$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: banner
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
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

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file://C:/Users/c3d19/accompany-web-site/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file://C:/Users/c3d19/accompany-web-site/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link ||= [];
    islandHead.style ||= [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
