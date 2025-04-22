import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, getResponseStatus, setResponseHeaders, setHeaders, sendRedirect, proxyRequest, getHeader, createError, getResponseHeader, removeResponseHeader, getResponseHeaders, appendResponseHeader, fromNodeMiddleware, handleCors, getQuery as getQuery$1, readMultipartFormData, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { withQuery, joinURL, parseURL, withoutBase, getQuery, joinRelativeURL, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import jwt from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import destr from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unenv/runtime/fetch/index.mjs';
import { klona } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import defu, { defuFn, createDefu } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import { createStorage, defineDriver, prefixStorage } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import fsDriver from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import lruCache from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import { getContext } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/unctx/dist/index.mjs';
import { webcrypto } from 'node:crypto';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import express from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/express/index.js';
import { FilterXSS } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import { hash } from 'file:///Users/ginjack/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';

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
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
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
    stack: "",
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
    const { template } = await import('../_/error-500.mjs');
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
    "buildId": "9ce42651-496d-4fae-aab1-ef1c21045159",
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
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
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
      "crossOriginEmbedderPolicy": "credentialless",
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

const serverAssets = [{"baseName":"server","dir":"/Users/ginjack/Desktop/accompany-web-site/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

// @ts-check


/**
 * @param {string} item
 */
const normalizeFsKey = item => item.replaceAll(':', '_');

/**
 * @param {{ base: string }} opts
 */
const _47Users_47ginjack_47Desktop_47accompany_45web_45site_47node_modules_47nuxt_47dist_47core_47runtime_47nitro_47cache_45driver_46js = defineDriver((opts) => {
  const fs = fsDriver({ base: opts.base });
  const lru = lruCache({ max: 1000 });

  return {
    ...fs, // fall back to file system - only the bottom three methods are used in renderer
    async setItem (key, value, opts) {
      await Promise.all([
        fs.setItem?.(normalizeFsKey(key), value, opts),
        lru.setItem?.(key, value, opts),
      ]);
    },
    async hasItem (key, opts) {
      return await lru.hasItem(key, opts) || await fs.hasItem(normalizeFsKey(key), opts)
    },
    async getItem (key, opts) {
      return await lru.getItem(key, opts) || await fs.getItem(normalizeFsKey(key), opts)
    },
  }
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', _47Users_47ginjack_47Desktop_47accompany_45web_45site_47node_modules_47nuxt_47dist_47core_47runtime_47nitro_47cache_45driver_46js({"driver":"/Users/ginjack/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js","base":"/Users/ginjack/Desktop/accompany-web-site/.nuxt/cache/nitro/prerender"}));
storage.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/ginjack/Desktop/accompany-web-site/public/uploads","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('#rate-limiter-storage', lruCache({"driver":"lruCache"}));
storage.mount('data', fsDriver({"driver":"fsLite","base":"/Users/ginjack/Desktop/accompany-web-site/.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/ginjack/Desktop/accompany-web-site","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/ginjack/Desktop/accompany-web-site/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/ginjack/Desktop/accompany-web-site/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/ginjack/Desktop/accompany-web-site/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
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

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
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

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function baseURL() {
  return useRuntimeConfig().app.baseURL;
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

const _0cyWV0Dd2Z = defineNitroPlugin(async (nitroApp) => {
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

const sriHashes = {"/_nuxt/builds/meta/9ce42651-496d-4fae-aab1-ef1c21045159.json":"sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w","/_nuxt/2mBJLieo.js":"sha384-ZCiTxXgKlaOvdDYxNx+fVZSzS0r7zNCKNAPL+03RFHKVw38zaTCsGrVQVNfJEWAy","/_nuxt/AZtNrhzT.js":"sha384-cvCK6/W17BxSTF8On5pf/BUNhYgpn5+Re5XcOznwpgRpiTywb/3W6nsELS4ycpko","/_nuxt/BBsYbeZx.js":"sha384-EePV1DkHvOUni31Xzxz9AZnaPFotiG4Y9iCgKVqjpi8w7zeYrmy7w3//4rIgH+Ot","/_nuxt/BDT3iC5Q.js":"sha384-kXhdYdoJZfc7IgaQeT3e2Sv6Ch5sgL1AnSM+w90O3p2wy6gK45JHRBst7JENSPYh","/_nuxt/BDlczRK9.js":"sha384-y2YTUcR4YZX3qfvlT1T5CdEndi7Zy/631HHkqoBR7beZlhbpn/SBTsTYzJSTYurh","/_nuxt/BDurcp9g.js":"sha384-TLs5fjglync6J7CGhGGpOGm1q76BxYiZIEtaPL3WCqcTj+gYKLlr5k6VDzzy68Eo","/_nuxt/BEbMJb1K.js":"sha384-HkYKUza/LfN41HUvB7oB5RP5GxQxEH3UyIJj9S+hPWPNNs5cYLSc2xVTS0UcfXzE","/_nuxt/BGw3Pbfv.js":"sha384-ywmWY6becj/D/5ZCkyxMRqkluUdV0lZ/AFXMLL6S7E4ZNAyafPGDEbMptlnIBeyG","/_nuxt/BHEcGnGw.js":"sha384-zoq+vCW7YfxfIxYUVIwgGfdGx9TklesCcOgruvzAEFb6FYGb5O231e4aOVCe18gF","/_nuxt/BIvWwErE.js":"sha384-StOjkYpAnQhPLwLPFhW/ZwdjP/TiFwlhk+O+NBrU1l9G5SUnLnYeIJMRKY3mdLzK","/_nuxt/BK9uUhBp.js":"sha384-hkbj9k611rRFtdIGiIsESvRxiEcVp6/ruuK51AvcSrFoJoy8MzC6/aAsu35/WzOr","/_nuxt/BSZ7hnS4.js":"sha384-T+aFs4HeV28wsn/UD29KUQEYau5SfrANR4g4AojXWhd7Jjfo3MFCkMGQ199iQQ/0","/_nuxt/BWHb6VvC.js":"sha384-HoKH3+kUulrfZBD0cEE+3qH0pf2stModP5q+4xjnunvAfcyZ8abCkvyG8Tde0CgU","/_nuxt/BZB-ZlPY.js":"sha384-kwJNwqDv0ZgfBY/FnM/Hw9YHR2cVQ4NKa8FBssmY7Itusx9mwE4irc4+37m/B5IZ","/_nuxt/Bel7uzZy.js":"sha384-GC1Z8ToDw5qNstWAw2iuBZ80M2Xp+gIu7fio89uiJVWdt3d2aEF2Oc2aCd4yXCl7","/_nuxt/BgPtTAUb.js":"sha384-YTrZstQoD3eFImF06KQJwFTF/8LphBd3FqrupXwv+ELBvc9DgWGktzdctLQtr7Gr","/_nuxt/Bkg6fv8Z.js":"sha384-4W67RprW/EOmwUy8OxSSkTT9gS4+hTei+q1uso2+UHegYxGZHVU1fpSNyFLtY1XC","/_nuxt/BpemjpAY.js":"sha384-oyLTtbRd9NIsbb2rZqmW7/xKmusYOUY7KXp24AnDs9GXNnyg+QWKFHwNSIjxJO5V","/_nuxt/C5R8anT6.js":"sha384-UEqDakeqiQCWnZpmo+578r8HesrbUXlDyOUQ3UjUGeF0ugHCaijzlM4WNAKpvjuN","/_nuxt/C7HfGfQF.js":"sha384-mQBdRK8PrkTe34Ut82nM0cWd+123DWp1kwRetzha9m9nhK2c6IzHU4BdBTvBkjkc","/_nuxt/CCbnYgaa.js":"sha384-lDqQZeNQ1DeyuLR8axOpDn1pHz44TjQsiURuEn+g/z6zA3yDxklij1T4NNx1X2ny","/_nuxt/CWtwlC3T.js":"sha384-ZpdO90w2Z4+nmqXgq/9jBUxJ3Pw2m0eNy8OwM2liiBU0g/3+EAmm0ZuWNcF7lRZ0","/_nuxt/CXUXr8EH.js":"sha384-D2vND8z+RRyuss/k6029Fd7NFNNo6U7CCOPa/n67jZ7Ak8vnRpVm2XEJmTlzDQdB","/_nuxt/CZAA0QMj.js":"sha384-baM0hO6gHEK7//bck7Nlq7kawTlJfH+vipQcde/8XHesGxVnnxTYEZ9TIYhddOgj","/_nuxt/C_XsSh4V.js":"sha384-TcnN0dfAel/Z/fxMCwSLF/u/g28e4s3QzffjQx9+bXZnzCF0SYPbGkRcar2wh/qK","/_nuxt/Cbq-W-It.js":"sha384-mWd0j2peONmqy8MwZKr2VPjP2f4oo70/J9n2Vrgs/LaQDvPski13aftY79Gcf2FF","/_nuxt/Ck6vwgu7.js":"sha384-Lr9t/0zP7pAemxXltL56j4Gy8WW+dRkWTJS0eeNL+92YpHwfrZLcyuYEmEz40VIF","/_nuxt/CkpWCWy7.js":"sha384-JmA+h8WT3ELo5jTtkgyaizeXKZ4krQSBhFUGNXNKBzkW630OCqhEGGf0VAvLiCgb","/_nuxt/ClashDisplay-Bold.5hYeFSJJ.ttf":"sha384-wjO8lobPgLMLcQlvP1Ym/CmxyZvn+BCp+3XoJpErUFbHev1T3uaXg5cch1g3qBmU","/_nuxt/ClashDisplay-Bold.79YOzMqN.woff":"sha384-68g2XJWriFtAnjM7RK7LQEBguTEAV2KRUu+XCt1T62shOzBwh3OCczsAEFULCosw","/_nuxt/ClashDisplay-Bold.YaCnK2PY.woff2":"sha384-yCf0JKogT/1mwO8kPWIV2+xlpQC2R/Qxv1bJ22fctXpQeGV7Ly3aJtad9Cw7spW6","/_nuxt/ClashDisplay-Extralight.-kv4w5k0.ttf":"sha384-UGHrrQT0d7ex79xktXrjutn2yG76uoFqgQSVp5/Smi/O3bec3chRc7123t5UKOQu","/_nuxt/ClashDisplay-Extralight.BJExDEVH.woff":"sha384-GpOLy9Kzkz+8I3Rs2mAFfE5AuFu4uAFIxy0t6EiN0M6r4/kWNdcZBlIdNAFp55OD","/_nuxt/ClashDisplay-Extralight.D3i1MCwm.woff2":"sha384-/s+QhITa2FIIe1Tt9YNjx8j069YOsAlyNZWzh8PDSKphAoaAVxIZaRhzj+GxqTrG","/_nuxt/ClashDisplay-Light.Co9CQZ40.woff":"sha384-cGIjwU7aSraVeKcO6IOrTJs6sY/61g8XJqyH83/bxXjM2PJpmqTHitxul2kz1wnE","/_nuxt/ClashDisplay-Light.CutxPsj4.ttf":"sha384-W7obgZG6Og7XAwoXwC/2tiNMLr0jCucnyOvz/+tXnyry+PYWhbCly21IoSzg/IM/","/_nuxt/ClashDisplay-Light.DIjv0-nY.woff2":"sha384-aPpDiZggiZpZWlRcllfYl5udl/MZw0t2D//0b9sdftqDPDyMuB19SBN3yLfI2N+j","/_nuxt/ClashDisplay-Medium.BPdWq--j.woff2":"sha384-k5It5WkIhYWSL9i9xyc+aaa/vhLOD+i3NnR+36bXF86SCzjx9YoMSJnZ339TrDgL","/_nuxt/ClashDisplay-Medium.D8oxfInt.woff":"sha384-QjPZmx6C/uYnciAB1fh7a9ureFnWPy166xrroDxY0G3E+Inw37yrtCYj/JWjiMBT","/_nuxt/ClashDisplay-Medium.RwyLHzhI.ttf":"sha384-rViiQNWJH3kFChGWmzla1YEmlNxXjqYd0NV4umSxNKH7lCpret+GAlGFFhJPkUKX","/_nuxt/ClashDisplay-Regular.BKrzTZUV.woff":"sha384-I2tgqxxcB5hbFn4Jr1Jsu2LFX35tFX1HRZdNmglBz0oz5aY2+8pgkzgH8vt+zCfF","/_nuxt/ClashDisplay-Regular.DhusH4GR.woff2":"sha384-Upaw+fAE6eMgZWCU9D2EX4Cp/d4rQcE7s9b84q3UZMLkck9VB/XFJ1F/eFd6kJx1","/_nuxt/ClashDisplay-Regular.zoOY6xZw.ttf":"sha384-+rR5v7/pS28pk7PpIyBEQDA9mBuDpDQYcTwN6LVjrVQ+suR76tUzWV9gaTc+h+FV","/_nuxt/ClashDisplay-Semibold.C8tXlykZ.ttf":"sha384-8oKIC2dZVqfQP8xJeduY8soYx8Zlw25KCd8Z9SXDA6grNVSO0gme2u26NsFQd7iR","/_nuxt/ClashDisplay-Semibold.Cc_zfQ1K.woff":"sha384-FLW9bnv0TCUA6Gt+OFkm+DBc+Xel6iOsq/tiZHeZE6GVuotUr5g0xFxk8cMmNgsB","/_nuxt/ClashDisplay-Semibold.DcA1xgJG.woff2":"sha384-bEdamHxriyxnHt2tefAQ2ktifm5clowbO1x7ZU4ryQYIkJNJJzsTOR64YBLOrEpP","/_nuxt/CrF1WZSG.js":"sha384-ghl/r/g59PIcm50VutKkesLkFfX74QUA3I40uA1L8SobZxEi21f4aBGgQEdQwPbn","/_nuxt/Csv1iGwN.js":"sha384-XyrZrjoJZODZem+hrB2hUo2GS3IS5rueF168LBR/dW7n+VRtLrC+u5Kp5t3bOkMe","/_nuxt/CxQe4AMX.js":"sha384-qjZfN63+bki+GGLGuAccTU54Qx7SI9UuMNAGQhY1AxXpW4YOkcuKnekUk9hNZRGm","/_nuxt/CyQFOrNy.js":"sha384-J1vBCYzhD5uGzBVb+2mOqEQVpC6NXYKPtSUkmvAkWVNHxfAA45Wxjsci3Jm3DPh4","/_nuxt/CynXJNR9.js":"sha384-a18/mdHNyD62F2ks6fqWPLHLMltTNlWOf3CNFGKNJfDyFCQK7Wnyb+rJO3dICzXL","/_nuxt/D2WdSy6i.js":"sha384-7viQ73gux7HRpo8evuTLhlPYf0YyoWbkuidIwSvHvRpMjbeypClpdyT6XConYFSv","/_nuxt/D9ZrRg2M.js":"sha384-AwUxi4r5OQe38WzOZ3BZ2SwWARKjxil2lUis8OX7Ujv1L1fm/+Du/HhtATCsAQiT","/_nuxt/DBnZH-lZ.js":"sha384-qytVDXNPKua90Hl5osx2H1RgyIYOwsqFtZrniutsUurmepvAed2ghUaRQy/mhYF6","/_nuxt/DClk_15h.js":"sha384-zZqiGsT5sMHG7rdqmguOyK/cav0ETJOhESgZ8uU+NO83UFmSnz8SBhD7cFko2Ijx","/_nuxt/DEHvpaTL.js":"sha384-HneJPaURzHf2w0ceb2wNYUpvK4RJ4UyAILC9TYeSlrW52RgmXN303IewwaaqkdE+","/_nuxt/DH_a2IC7.js":"sha384-NttfqBtvf+t3rQx41clXHWHwR5Sw7C6fwCN4boNxnjYoBZPok6gZl9UmYhofH7Tj","/_nuxt/DKMKeO5U.js":"sha384-hrd1pSfNERcLsrxCdyeUwtH4gYGATFb8ZteYC3bKzvnIYTgMAdDjNdXNy5SXTpbL","/_nuxt/DMRADFXs.js":"sha384-iWT/B5lvET5Hci1NO7jYbhXBdefWZuaX5XwMqbVMnA7ruDKrFwcowFsqo8aVDf/d","/_nuxt/DPNYWHPY.js":"sha384-AV6tmLRimE+uBbPhGKSQAV6VuZk8vq0CvUciJGuSZHnQMGBl17UIYSAS09kbeFBi","/_nuxt/DSxuBh5g.js":"sha384-B/VL87nQP1y2wd5S6sXU89MSDXIqnMvORnC7ee4Bjv8tqQwFjqXf/dkO+IsE1OtG","/_nuxt/DVTQgqcA.js":"sha384-KQa+l8WdIeSe54SFNQ5KL55Poz61b+Jh/0jkx0RbNWfBe8zzh+TqStJUyoftou0b","/_nuxt/DXvk6p2S.js":"sha384-XvwnVHwt7hdGz5mFl9zwMgWuJXiCIs/xBpP/daOWc5DSmxArl+EnTyklcvx/WWBf","/_nuxt/D_j8p-No.js":"sha384-Uk8WQpWB9K+N+RsgBo6/qhoCLvzUehCkTnGOyXgq4KUdQ+mSbIU6E9r4qsrCEmvK","/_nuxt/DcWasBkt.js":"sha384-Kgc0a78K7InfseSI5wT8oMRyU+D14nJS87vfFjwe7/lp6zfpIk/j/7N/TkQBoLDG","/_nuxt/Dg1nk5-5.js":"sha384-vZwKjvu8HXSXESgZRzfhOil4EVWw3Hxm+WMvEjp0GDocv1KFANXMejfimuz95fAM","/_nuxt/DlI6nAHE.js":"sha384-6YQLdxZlzJrACK+IIjeSdzj8Mw9olNOXrkDLFv3RfRBFuWde6hL58blcUl6wue0e","/_nuxt/Dw-PlReE.js":"sha384-DaPVDbdbnujRkHzBCtCU7xpSnB4L5QbI6lsnalELLgpYAovH+WK0fhfos0wIexnC","/_nuxt/DxReYKUj.js":"sha384-VpGN7hpZ2PQbld1eWSpG/O43ob8Zc+CX6ppqSCg1xjn1Y/ZI/jeP7G/ywcaOj8aq","/_nuxt/E3JikTO9.js":"sha384-fEMJMd/+PdGKrHJFgwb3BmVu4aTsSLfJjq8QaD3ocVA3sgZQxBEvEU1a7WVNq8AR","/_nuxt/LTthK50j.js":"sha384-cw0/KxbeavHUxM6gmwMIei3Jd2GmoeGwvScUrnt8sc5g1u3hOKAnsBu/9aKVT/Z4","/_nuxt/Magnita.CSUkLIR8.eot":"sha384-o4PRX1Y5o0C4Wccpiy3W8qhUPlP9O0Dr2dsA/Vg3mnNnbAsc/Fr1ujASBtwvOKZI","/_nuxt/Magnita.CYTrzT3l.woff2":"sha384-I2SQQhFWIVVHonyIbAM6HblONDcGfUsJgCcamS+jNs/z3KS/rthIF3cLBZrBnISf","/_nuxt/Magnita.aiIyRRpl.woff":"sha384-MtSpNrkrzHBmaLWRTJUKRH4FiAC8x1TnVJ4vFX/xWc9xR1h8QQY505xXaDHrOKll","/_nuxt/Magnita.dgH1nlX-.svg":"sha384-osQFjxspnoy1Kt+nvrloifPfEnrZkLketn8WIvEKwODSCNxBUY9wAQbDVzHoBwKq","/_nuxt/NT_ioq_n.js":"sha384-fUlFwoD9RIJJi8icHIlTERhwO6j9zjlcGVroqpxMn03UyIuuOFN/+7KxaW0V/wGc","/_nuxt/OUem--W2.js":"sha384-T1KZ/ZB92Pkh2j8qUuNlYCVCTxGbbnb03qtoMxO/P7BCUMbiCmOh5L4zMP1ZpURc","/_nuxt/PNc1cTTg.js":"sha384-31Ze6cUNYEScU71EhUAHMqHi/0v8lOYlAeDMf5qZkQ5XlyApchV825aXBW+M+ND+","/_nuxt/Satoshi-Black.CizHyRqb.ttf":"sha384-zcK3OiRulLIZ3I6bb11GtBinPY8weNJJwdFl1lXnRfGlABwdB7teHCT1Mh9+MEgp","/_nuxt/Satoshi-Black.D3hzT7Um.woff":"sha384-cBOd02VQW1GXQOsvaCptgEyJEFAmRIK0ZahMnT4QZVf9+FC6ur0we3bxeE6j338C","/_nuxt/Satoshi-Black.DjnQuuRz.woff2":"sha384-EQjbkmMQhPVGI8IeXlw+AZ256ocRIItXly/VzybTEBH3WDcj85vJEXDSRy6W8YKX","/_nuxt/Satoshi-BlackItalic.ChCbTD27.woff2":"sha384-vs6HuoV+J0EUju9vKlqFeyMZJj2XThXZecGhEWkiQ0y3kuS6jZ08sABdVm3QKdtr","/_nuxt/Satoshi-BlackItalic.CvIpOoSh.ttf":"sha384-KOeiPPFOYPrHeAvLwh048MT3I8J76m5d+HGtz05m9fsNVBwSfmaWJ4kfFF1/1EUg","/_nuxt/Satoshi-BlackItalic.D8Ai_S3C.woff":"sha384-RMLQ7tXxm/JyocQJdBsF/gLtgfzYv/AyySJBKUuKQRuxedVVmEqYhl5ZNlJWTpCP","/_nuxt/Satoshi-Bold.Bd5kKQ_U.woff2":"sha384-YUJoc4ASFboFzv21BAYw8YFajUB+TdbJOz6mM4GbFpkkRXTdcONEWwW23KI4ch4h","/_nuxt/Satoshi-Bold.C2PhLWFc.woff":"sha384-GBIVFvkOHL90RHHWx3VGQ0jvvoY70fzyYbQgw3YZhWxkFBw1Ny1uJBwFSnLP766h","/_nuxt/Satoshi-Bold.CPly9kH5.ttf":"sha384-HOLTk4grWrFiR7HxwPMBYLQ5XorJy3fWMOkQDApOZTfIwOycMwQ4rlQnnPT+6L2v","/_nuxt/Satoshi-BoldItalic.CAjvAcxR.woff2":"sha384-QWI/dJ2kd+QbPjVo7GVnQ+O/IT1hLC9nrpKzf+izQ4SlAxJVeZDssIms78ELOwd6","/_nuxt/Satoshi-BoldItalic.DQ7B0PfL.woff":"sha384-DccWN+PEFBgvLwtmKZr+G7LMdlkfYuFAh2+kzD3yqE3XsA4/eJnACWkmGDohpPO6","/_nuxt/Satoshi-BoldItalic.tClQcAb-.ttf":"sha384-X9/DZl4cQQWRfPOUJnpe2da8KrzebssRsp+ZYLWRpFLTfNn0B43M0sQM5nVkHnxL","/_nuxt/Satoshi-Italic.BPCXRxzy.woff":"sha384-8e8ckF87EP2kgTAtpc7YgBWp95nxzThcNLBeRASizieHlkSK/ZznZYhWs5MzJQLc","/_nuxt/Satoshi-Italic.FMxkCD8o.ttf":"sha384-LD6GCl8JISvMpoGW78vHyoesyHu3WWM7lLr1e10znt47ATeVRQnPGMOQ9XNHwarj","/_nuxt/Satoshi-Italic.wVmEEc6M.woff2":"sha384-3gltP/X0J8/qH4ROknNgQ2a7nNDQse/kmiGg4V1LpPmwsSiyGpTDhqBLQo+AD/1G","/_nuxt/Satoshi-Light.B82kzbU-.ttf":"sha384-ZYip1NRjKPP+M0nBedEvO1/dE7JZ9aEPc0wpZd4qFLLXdBPqEkQJMh2xDoKrAI8b","/_nuxt/Satoshi-Light.C_dmkKXz.woff":"sha384-XD29Tgo8dM6CAoMu9BVQvigKYugpuXqiggbC/u9weKmw1xn8u/s5b3nDCMgbpoVe","/_nuxt/Satoshi-Light.IqwJ_ZjS.woff2":"sha384-DKfZbyuHKYbavBmQAPrUD6C/RFreBwY6iIki/ousIHrteEfy2+JlCOHv0Y6H9Mqc","/_nuxt/Satoshi-LightItalic.B9L6s97T.woff":"sha384-0MNk1twnZog2eK4+N1EJIEkZP+9KSZ+y291I+zFWsBclVGW1iHrC/+Q/XJQbAipy","/_nuxt/Satoshi-LightItalic.BAhuxY-A.ttf":"sha384-fRzhXQXoLHVacWEC6BZas5BNEAM4u3cvYLk/qg6v3YpdO173zVRvzpQMppvlhTIN","/_nuxt/Satoshi-LightItalic.C9iuU4v7.woff2":"sha384-2vYZbNVoA/zv+YPZO7BjGUxJTeOLWjGlYiUYRbeN0Pv5xRqFtOuKr2BL5kYfykNh","/_nuxt/Satoshi-Medium.ByP-Zb-9.woff2":"sha384-3SJcXnKSL6CZoWDylcbcUT6zvlrOM76BYx4YLCZVMS66dqkzEp+bt7WgrzA/Q4X/","/_nuxt/Satoshi-Medium.DDwDPeBg.woff":"sha384-rxGjoCTOTJuqmI+WFY8qm5E32shDWnksCTFXPY3ZpKusHCphi32Y8tdj5LxJ417C","/_nuxt/Satoshi-Medium.DOt9kM-a.ttf":"sha384-w/oMtVlslcXIHq+B4FyPMmJKqwRvTduk05EzYi+mlVg8/o7g1er0weHHQ/yeD6S0","/_nuxt/Satoshi-MediumItalic.BPTJUpxz.woff":"sha384-ZpA0TxODyItUnkWT3ri1M8NGgdrnVkP86/Ojsr/Hv2dCavdqzDee8KfxwWF6k1gG","/_nuxt/Satoshi-MediumItalic.BUFVYoD2.ttf":"sha384-GyrmIXeI8yinhXAc25RWwKBHYod9SDbtT+tA2GrApDmZn4TSjVlC/4Gjb0Iu1EDn","/_nuxt/Satoshi-MediumItalic.BxR-IcRj.woff2":"sha384-GtMW/0lEgOXcTF3pd3/i312iD0BwghBslUZxB5ut/T1LEGTUMnuqdQg8R8dOFEpY","/_nuxt/Satoshi-Regular.CPM9dct4.woff2":"sha384-EXdX76+Bab1ra2dNpDnK6HDNO1zhe0EpS5A2BC6NR8j1/bVM7FEQcVa3VBIclQxX","/_nuxt/Satoshi-Regular.CWSyEjGv.woff":"sha384-wmETwHIEO9dXIAp4xsG362Nqfds+/Eo280zdplao/24EltLTOqherEu5S5/dl/6z","/_nuxt/Satoshi-Regular.DToFXog2.ttf":"sha384-6qY/DLHgLz0hbQ4ZIU+0gTmBABVSQMBLcoJB0TMoyy6HpOew7NgMptrrFWLyADu/","/_nuxt/Vg8KHOmD.js":"sha384-aNhmN6JiCHb7Sa837fG4cA97slgE2J/EG3LJVDr2nFDFJQmaYkbv4craG7VscDwj","/_nuxt/Yr8zqxNl.js":"sha384-zWdrGEHATfBIEwbBDIvMzOTpkSqPQXz15MaTV2jmQ13Hxf/WTwALTsr3L4Y1Kd+A","/_nuxt/about-us.CcB1ZWYX.css":"sha384-vXH/ccetFLwLpSkTeWxaAbKE7bqKsQDPLVfS6fsemmJ1sPDruvfWIN2E5pELM1Fm","/_nuxt/admin.n9TyMqAR.css":"sha384-lFWtFp0BVYo9X5DZEJ7fdQGM8DgJj+wX6RLvZ3txwfoFeh9A9YQoN+XtkaN28q2f","/_nuxt/akMEA2id.js":"sha384-CLWZP96p5XljcC4JByTcI6AeXhtbAnsxHQghWoZCoAC4G97ZMTAaCaPD9AF66/Zh","/_nuxt/all-contact-info.D2MwO9p1.css":"sha384-VtIHlr14oKZy9p2OnWTrXN2b4kkthRrHZuQQtl3U3Gj7R43B4BORXy3IT3CG0DNq","/_nuxt/announcement.BES7XhuV.css":"sha384-gAlkr2ieAZEhi+qAJiBf14w4c80kF5dyBc1F8X99oRkCkfKiz6luPesWMdQMwZom","/_nuxt/announcements.dSTw9F1Q.css":"sha384-Ha1IOdqzpekYafMJrnNDaxQ+2PYAcqasg560cxv65HHykgeIvdny4sz1sPgGLIa0","/_nuxt/application-form.DXUBT5sI.css":"sha384-UC8+vjHLNb39ucuDT/24VyQ5ps8QWtqGYXwy4xD7scaIURvSiWG7VU3T/HVjvJCs","/_nuxt/banners.BEwPrk0C.css":"sha384-ubT7VIjR76ax9sJXyKIgeCA4TXBXDoSbYGI9HlAVQWsJisQtA35r83y2foXvit7s","/_nuxt/bootstrap-icons.DSXWTQaD.woff2":"sha384-8a7oZxHU28YPnDiMUcUxGpUGGWnO6gHBcV6FNMbGgloxSStqzdYP2Djz/ex85ZKu","/_nuxt/bootstrap-icons.DTeOS7dS.woff":"sha384-mgXQ6zSG7EqKkRMOtJB2lFvH5WKbK66diq/Lcr7pzEnK8hy0RwS60d5GjNKgAduP","/_nuxt/breadcrumb-one.FjJfrjWq.css":"sha384-zTl3sBxs3XwDNASk/73QUgn6/k9IkFANCvc7qWV6WdXWfRKjCPGUFz2nAHkBCl79","/_nuxt/censor-standard.BVtJMNh5.css":"sha384-9tqAUJwTqbrt4he9iiwRjp6ZBUp4bCgZLCupHiC3Tded8leBKfVagaJzD8hczMxq","/_nuxt/company-statute.zW0I--tl.css":"sha384-5R/jy2KrVEaINX0FYfDwNI3dw1alKsaQ5dSbWXFAMIwLZJfPMTa5+G3xCaVHbVof","/_nuxt/conduct-plan.BTt5TR3R.css":"sha384-ySkSMuPbeZu99rtwH3dKG3hfczAD5q9tOGvCvPZMkn2DpRPEmvyAUwntXcy2uMBG","/_nuxt/contact.I8R1SwDS.css":"sha384-bLVYA/ROAGxl2mdmwhY02ZZlDbzF+HvJHsn8HPFevJC+YouvULPg+qbzJgMdObw8","/_nuxt/convert-principle.BZHCRG5B.css":"sha384-nttnr54dYACrNEtoCK6h/RHFbeQu0IkEXDF+U7cc9WPdsiWmoxbCGEjGG4jAiwkX","/_nuxt/dashboard.g4ISJX5U.css":"sha384-+MFhi2dlIn9Po9XWAylSeiEkKlcjzV16+o4Ep0YCAzSr/ag3BPO6XMscCSTP4TJr","/_nuxt/default.-h_edMOl.css":"sha384-hCNMKpVEDHNLIe3M4cPNeQkDV9kOSyRXDDiLNdZrv6mg7s4owSYkkRy4E+nO59Wo","/_nuxt/egdScShR.js":"sha384-Aoz0exnCZy1WksN7nOIqmUGli0aQLDrs+62ydf3PJQ8a9Ckoqj7FwX7/UQYRwdnd","/_nuxt/employment-services.BCOgZKZ9.css":"sha384-1CsGGd8GylP3rETJNT9S5zk/AQxy7fLNeZB+6MSmOguN+tkaiXAEIzDXGg+bm8/d","/_nuxt/entry.DtYXfDAR.css":"sha384-TLVm34mfQE7X6fORP2L2uKQmQMLssxDzlyJOehkrR2iwyGriineZbt2+5r7VZh+2","/_nuxt/faq.XfsXCCQg.css":"sha384-xy+dQXQMYH8kWntYVv2o1MoCzoW6xXp1SGAsf5Ct4fZyemIZCb2stPzYGv6TFzBS","/_nuxt/foreign-famliy-link.BH3iTk0H.css":"sha384-4ZLeXdmeFygrOvOfuOyXrUpB0s6Tt48N/Q7ALmpGH1q7I210P5FdDSIbQR9UGX16","/_nuxt/hXiZFfwy.js":"sha384-QaqxmUuljLQSURRoheTOdE1mK27IIaJuCfVEmoJEj2sC3EhhLZ1lk3QZvfeRUjha","/_nuxt/index.4uOfb_qe.css":"sha384-UDCDnlkdpCLKIc2DeEmojYicI1SIiGDBZQxh/spAvRCGflICM1YZGtJ+nlLd/cp7","/_nuxt/index.D5_Gfe-Q.css":"sha384-9bch5w1isF4qw1ltGq7XZGS1hpJiwVTk5sJd37XIiYZgHGaaMXDhTlvbCc86FOSG","/_nuxt/index.ibJqUf94.css":"sha384-+TqMalbJx1VpGvqqXL2MYJQH09mGMBE4I224AsRD8shjYnmzACsKIuDbc7xDPm+q","/_nuxt/join-us-unit.DYDpIsJs.css":"sha384-bE6ZxyxsUzVB65r9cS0rzQqKMMr+HottxkiJ8XGOMRKNR8lnYml0T2zMn5RzCzc3","/_nuxt/join-us.tW0T7HDv.css":"sha384-DSqbAEeSSa8f3DW+nf9e1RGgolLdBvIThDmklssfIn0dDwxvF/neOLpBhKctdrIT","/_nuxt/kUHBRzUi.js":"sha384-in2ta3cXIW7GzP/9otT8Cy+4kwxl8LIX2h3rOFEv3ELH7CyFA7EquX1z/VDwWPC0","/_nuxt/knowledge.BgTZ2HGu.css":"sha384-Rh+MmrUjYpqIE+gHCA59I3i9RcIfsU6XQRF4fxVYfLbeBwvdOqXUwTr3rOb/Eqmx","/_nuxt/knowledge2.BIm2Ojcw.css":"sha384-M9tyNAUR8+Y3oXX17vt476GGj44oJHEhLkasj4XZKO4WdvQo5IdcyPzwSFDoCrSX","/_nuxt/lazy-bag.DLTuVNgY.css":"sha384-gy0I2a6s3cpPcUVJ3qEeR+TaSjXplcM12lRXRKHSBK41kidFTH3uskpJtjziKjRN","/_nuxt/links.BECa8f2-.css":"sha384-2sADnzoiyJZIrGvOni5u7e3P6f6oB/R8NXSTvI0YGWp+qI0QB36872WBcDwQ/ob+","/_nuxt/login.Cru35F2P.css":"sha384-DUdO0NgmXPhxY94DOmJCjNho3hsLGwJRRmJ+gZN3zSZkExDiuTgBoQG8PgYrwuAV","/_nuxt/news-details-area.BWpFC0Ff.css":"sha384-i7hlSm/4tMThK+SorGvwsyj5rUWoUKmrqJdc/BkPv0Y0FyA/6EuDcCCCuPyrnqhh","/_nuxt/propaganda.BUrx9w7D.css":"sha384-2UkPGB0aOGiaB5oYtWPCvSQ54qTM2P7dYLN6JbKjjTKp8WMLWZPFHvLW+uUijmvG","/_nuxt/qa.C60GLsPZ.css":"sha384-wUEMk0FTpC9Ql+gazha+rf71omDx3+dE3N/AgtoyCrlUmnP3YwEOl9Hhlp2fyQoE","/_nuxt/qa.CiLPdxdO.css":"sha384-iKEMoVDTFcOQybUnFEZlZIDMlzNYqRCsjU0msc91+BmVE8ZKNtO+TcSi8SvLSwJ6","/_nuxt/qa_setting.vUreePvB.css":"sha384-9R/clCkQ5AnPD6XmUaxLgrF6GEC1kHobKG697ae5dFh9dmhjMaI8HCO/4yVgmWmE","/_nuxt/qa_test.CZ3iaABa.css":"sha384-q4ZsbxGCfQk2NRrpPIFnqU6IW1Zz86pWX9cICT5rdCcHEC5+hiJyqa0Z3xIv8vjg","/_nuxt/qa_test2.C5eSH2y_.css":"sha384-NtQsXgD9ycQW/zO/jdkMrYqdPxirgUdfYdsZl8vGsvkwaYazbPFehpkRzRpGjwCU","/_nuxt/reserve-guide.DIF1SbjF.css":"sha384-oSx5jd1nNAVSsH3RZk49PnfuXVmLCFy95R1Ne/fkEUJyITXW0HZTz0fSG8qE03YF","/_nuxt/service-apply-form.B41zIWwn.css":"sha384-7j+EsDpRKNMrftPY2fsP4GA6k6zJDujKJ+AYSb7bVjDqAiMmG7wbkG9I/hdZOVtt","/_nuxt/service-now.BP_7a85e.css":"sha384-eJMYLXsRyi9NSDaLB3GxdjJkl/qx8f57z41x/NgvthJFW3OYV5f1eK3eCHWFqZce","/_nuxt/service-price.BrXBsRLn.css":"sha384-yi33TsjdYvdFq6V4kLj6G/NZ5lr1sWEmPiZP7ctcgu1EXzndnVF0p+evjRriYLD+","/_nuxt/service-unit-list-area.BxRW7GR2.css":"sha384-lnxOVYzXbVZ5Ifzg5bz6gxj9CsIpSRz2rcWTx5f5HdTJ68c3F/lfMF8RctKnDcU9","/_nuxt/service-unit.DMqRAto5.css":"sha384-zKdZIydq7mK7Fe5tIvwijEWeuLnGvBvJ7BwH9xOzATW2w8IfP941Kiaqd4uda2qD","/_nuxt/services.yZKDFg7A.css":"sha384-1gHIlJYCwUNriyEMI0Lqk+LqUB+MciDFJOS8Dji39V4HEldBEFouOoaYyJ8buNhA","/_nuxt/xGJXBX01.js":"sha384-3fUoCwCJQldLpsMH3Pk8N5coGfmeVkPuFBlOtcHta8gN9SAWn77kDT2t2Ba29us5","/_nuxt/y_8Ulw3N.js":"sha384-hlItlNYDZYZjHPGN2dWgO2KzEUfN5z2372jRAcopaxerSiQtja0blUph5Cp8BnV9","/.DS_Store":"sha384-aB0ZnOQV4miynTmBkrYrual6PJHJ/iuuTls5tXQIw4Ji4+sGlcVtLm5UkM+xOuM9","/favicon.ico":"sha384-e0DOxab7uI618wwd1Lt0+rREwV1k9myViahHX+GFoxul14+FbxXyAOIdbDRGgPYP"};

const SCRIPT_RE$1 = /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g;
const LINK_RE$1 = /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g;
const _xBK3pcSVkw = defineNitroPlugin((nitroApp) => {
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
async function generateHash(content, hashAlgorithm) {
  let buffer;
  if (typeof content === "string") {
    buffer = new TextEncoder().encode(content);
  } else {
    buffer = new Uint8Array(content);
  }
  const hashBuffer = await crypto.subtle.digest(hashAlgorithm, buffer);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  const prefix = hashAlgorithm.replace("-", "").toLowerCase();
  return `${prefix}-${base64}`;
}

const INLINE_SCRIPT_RE = /<script(?![^>]*?\bsrc="[\w:.\-\\/]+")[^>]*>([\s\S]*?)<\/script>/gi;
const STYLE_RE = /<style[^>]*>([\s\S]*?)<\/style>/gi;
const SCRIPT_RE = /<script(?=[^>]+\bsrc="[^"]+")(?=[^>]+\bintegrity="([\w\-+/=]+)")[^>]+(?:\/>|><\/script[^>]*?>)/gi;
const LINK_RE = /<link(?=[^>]+\brel="(stylesheet|preload|modulepreload)")(?=[^>]+\bintegrity="([\w\-+/=]+)")(?=(?:[^>]+\bas="(\w+)")?)[^>]+>/gi;
const _ZYWL3XUN8z = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", async (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.headers || !rules.headers.contentSecurityPolicy) {
      return;
    }
    event.context.security.hashes = {
      script: /* @__PURE__ */ new Set(),
      style: /* @__PURE__ */ new Set()
    };
    const scriptHashes = event.context.security.hashes.script;
    const styleHashes = event.context.security.hashes.style;
    const hashAlgorithm = "SHA-256";
    if (rules.ssg) {
      const { hashScripts, hashStyles } = rules.ssg;
      const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
      for (const section of sections) {
        for (const element of html[section]) {
          if (hashScripts) {
            const inlineScriptMatches = element.matchAll(INLINE_SCRIPT_RE);
            for (const [, scriptText] of inlineScriptMatches) {
              const hash = await generateHash(scriptText, hashAlgorithm);
              scriptHashes.add(`'${hash}'`);
            }
            const externalScriptMatches = element.matchAll(SCRIPT_RE);
            for (const [, integrity] of externalScriptMatches) {
              scriptHashes.add(`'${integrity}'`);
            }
          }
          if (hashStyles) {
            const styleMatches = element.matchAll(STYLE_RE);
            for (const [, styleText] of styleMatches) {
              const hash = await generateHash(styleText, hashAlgorithm);
              styleHashes.add(`'${hash}'`);
            }
          }
          const linkMatches = element.matchAll(LINK_RE);
          for (const [, rel, integrity, as] of linkMatches) {
            if (integrity) {
              if (rel === "stylesheet" && hashStyles) {
                styleHashes.add(`'${integrity}'`);
              } else if (rel === "preload" && hashScripts) {
                switch (as) {
                  case "script":
                  case "audioworklet":
                  case "paintworklet":
                  case "xlst":
                    scriptHashes.add(`'${integrity}'`);
                    break;
                }
              } else if (rel === "modulepreload" && hashScripts) {
                scriptHashes.add(`'${integrity}'`);
              }
            }
          }
        }
      }
    }
  });
});

const _18WRC3KE7t = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const _1DCDIkjLOo = defineNitroPlugin((nitroApp) => {
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

const _4DXYzpneNF = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled) {
      return;
    }
    if (rules.ssg && rules.ssg.meta && rules.headers && rules.headers.contentSecurityPolicy) {
      const csp = structuredClone(rules.headers.contentSecurityPolicy);
      csp["frame-ancestors"] = false;
      const headerValue = headerStringFromObject("contentSecurityPolicy", csp);
      let insertIndex = 0;
      if (html.head.length > 0) {
        const metaCharsetMatch = html.head[0].match(/^<meta charset="(.*?)">/mdi);
        if (metaCharsetMatch && metaCharsetMatch.indices) {
          insertIndex = metaCharsetMatch.indices[0][1];
        }
        html.head[0] = html.head[0].slice(0, insertIndex) + `<meta http-equiv="Content-Security-Policy" content="${headerValue}">` + html.head[0].slice(insertIndex);
      }
    }
  });
});

const _3JUp8pydYs = defineNitroPlugin((nitroApp) => {
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

const _9ai6KLaTsh = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.hidePoweredBy && !event.node.res.headersSent) {
      removeResponseHeader(event, "x-powered-by");
    }
  });
});

const _vNJYSjo2yU = defineNitroPlugin(async (nitroApp) => {
  {
    const prerenderedHeaders = {};
    nitroApp.hooks.hook("render:html", (_, { event }) => {
      const rules = resolveSecurityRules(event);
      if (rules.enabled && rules.ssg && rules.ssg.nitroHeaders) {
        const headers = getResponseHeaders(event);
        const path = event.path.split("?")[0];
        prerenderedHeaders[path] = headers;
      }
    });
    nitroApp.hooks.hook("close", async () => {
      const headers = Object.fromEntries(
        Object.entries(prerenderedHeaders).map(([path, headers2]) => {
          const headersEntries = Object.entries(headers2).filter(([header]) => header !== "x-nitro-prerender").map(([header, value]) => {
            if (Array.isArray(value)) {
              return [header, value.join(";")];
            } else {
              return [header, value];
            }
          });
          return [path, Object.fromEntries(headersEntries)];
        })
      );
      await useStorage("build:nuxt-security").setItem("headers.json", headers);
    });
  }
});

const plugins = [
  _0cyWV0Dd2Z,
_xBK3pcSVkw,
_ZYWL3XUN8z,
_18WRC3KE7t,
_1DCDIkjLOo,
_4DXYzpneNF,
_3JUp8pydYs,
_9ai6KLaTsh,
_vNJYSjo2yU
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _Ir9i1A = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

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
      crossOriginEmbedderPolicy: "credentialless",
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
const _VCbdr6 = defineEventHandler((event) => {
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

const _NwzmoC = defineEventHandler((event) => {
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

const _OjERKg = defineEventHandler((event) => {
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

useStorage("#rate-limiter-storage");
const _kmu5uV = defineEventHandler(async (event) => {
  {
    return;
  }
});

const _Fts5nN = defineEventHandler(async (event) => {
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

const _lazy_usf0v2 = () => import('../routes/api/announcement-images/_id_.delete.mjs');
const _lazy_F1JXMX = () => import('../routes/api/announcement-images/_id_.get.mjs');
const _lazy_wLFF1g = () => import('../routes/api/index.post.mjs');
const _lazy_uzXYkV = () => import('../routes/api/announcements/_id_.delete.mjs');
const _lazy_OZG8hQ = () => import('../routes/api/announcements/_id_.get.mjs');
const _lazy_uYC6M5 = () => import('../routes/api/announcements/_id_.put.mjs');
const _lazy_FYXn3U = () => import('../routes/api/index.get.mjs');
const _lazy_He0zuc = () => import('../routes/api/index.post2.mjs');
const _lazy_wIwBlD = () => import('../routes/api/auth/login.post.mjs');
const _lazy_MzumQb = () => import('../routes/api/auth/logout.post.mjs');
const _lazy_bnBG6j = () => import('../routes/api/auth/verify.get.mjs');
const _lazy_0OjgA1 = () => import('../routes/api/banners/_id_.delete.mjs');
const _lazy_rVtNaQ = () => import('../routes/api/banners/_id_.put.mjs');
const _lazy_67Ik41 = () => import('../routes/api/index.get2.mjs');
const _lazy_hihkRt = () => import('../routes/api/index.post3.mjs');
const _lazy_bq3wbB = () => import('../routes/api/banners/order.put.mjs');
const _lazy_9Yr17i = () => import('../routes/api/knowledge/_id_.delete.mjs');
const _lazy_7WqvB0 = () => import('../routes/api/knowledge/_id_.get.mjs');
const _lazy_c93Fbe = () => import('../routes/api/knowledge/_id_.put.mjs');
const _lazy_ifmygq = () => import('../routes/api/knowledge/_id/image.get.mjs');
const _lazy_yC49DX = () => import('../routes/api/index.get3.mjs');
const _lazy_YDwZVC = () => import('../routes/api/index.post4.mjs');
const _lazy_4ulyfY = () => import('../routes/api/knowledge/order.put.mjs');
const _lazy_iwse1A = () => import('../routes/api/index.get4.mjs');
const _lazy_PfiCTR = () => import('../routes/api/qa-categories/_id_.delete.mjs');
const _lazy_PUUTcR = () => import('../routes/api/qa-categories/_id_.put.mjs');
const _lazy_J9yBIs = () => import('../routes/api/index.get5.mjs');
const _lazy_gKSlky = () => import('../routes/api/index.post5.mjs');
const _lazy_SwInfD = () => import('../routes/api/qa-contents/_id_.delete.mjs');
const _lazy_qRfM3h = () => import('../routes/api/qa-contents/_id_.put.mjs');
const _lazy_bBWr4X = () => import('../routes/api/index.get6.mjs');
const _lazy_ypY0tF = () => import('../routes/api/index.post6.mjs');
const _lazy_4rTY9p = () => import('../routes/api/qa.mjs');
const _lazy_SkelAC = () => import('../routes/api/qa/_id_.delete.mjs');
const _lazy_mG417t = () => import('../routes/api/qa/_id_.put.mjs');
const _lazy_7sNGLR = () => import('../routes/api/index.get7.mjs');
const _lazy_4GSN8g = () => import('../routes/api/index.post7.mjs');
const _lazy_1mKcnA = () => import('../routes/api/service-unit/_id_.delete.mjs');
const _lazy_TdxUXA = () => import('../routes/api/service-unit/_id_.get.mjs');
const _lazy_uuPYTC = () => import('../routes/api/service-unit/_id_.put.mjs');
const _lazy_2tfrkH = () => import('../routes/api/service-unit/_id/price-image.get.mjs');
const _lazy_Yr0GyA = () => import('../routes/api/service-unit/_id/unit-image.get.mjs');
const _lazy_qVvBuq = () => import('../routes/api/index.get8.mjs');
const _lazy_VRbvFi = () => import('../routes/api/index.post8.mjs');
const _lazy_x9S02J = () => import('../routes/api/index.get9.mjs');
const _lazy_t0b2Fu = () => import('../routes/api/index.post9.mjs');
const _lazy_8cmr32 = () => import('../routes/banner.mjs');
const _lazy_KJ86Tq = () => import('../_/renderer.mjs');

const handlers = [
  { route: '', handler: _Ir9i1A, lazy: false, middleware: true, method: undefined },
  { route: '/api/announcement-images/:id', handler: _lazy_usf0v2, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcement-images/:id', handler: _lazy_F1JXMX, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcement-images', handler: _lazy_wLFF1g, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_uzXYkV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_OZG8hQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_uYC6M5, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements', handler: _lazy_FYXn3U, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_He0zuc, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_wIwBlD, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_MzumQb, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_bnBG6j, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners/:id', handler: _lazy_0OjgA1, lazy: true, middleware: false, method: "delete" },
  { route: '/api/banners/:id', handler: _lazy_rVtNaQ, lazy: true, middleware: false, method: "put" },
  { route: '/api/banners', handler: _lazy_67Ik41, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners', handler: _lazy_hihkRt, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners/order', handler: _lazy_bq3wbB, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id', handler: _lazy_9Yr17i, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_7WqvB0, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_c93Fbe, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id/image', handler: _lazy_ifmygq, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_yC49DX, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_YDwZVC, lazy: true, middleware: false, method: "post" },
  { route: '/api/knowledge/order', handler: _lazy_4ulyfY, lazy: true, middleware: false, method: "put" },
  { route: '/api/languages', handler: _lazy_iwse1A, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories/:id', handler: _lazy_PfiCTR, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-categories/:id', handler: _lazy_PUUTcR, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-categories', handler: _lazy_J9yBIs, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories', handler: _lazy_gKSlky, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa-contents/:id', handler: _lazy_SwInfD, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-contents/:id', handler: _lazy_qRfM3h, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-contents', handler: _lazy_bBWr4X, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-contents', handler: _lazy_ypY0tF, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_4rTY9p, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_SkelAC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy_mG417t, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_7sNGLR, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_4GSN8g, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-unit/:id', handler: _lazy_1mKcnA, lazy: true, middleware: false, method: "delete" },
  { route: '/api/service-unit/:id', handler: _lazy_TdxUXA, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id', handler: _lazy_uuPYTC, lazy: true, middleware: false, method: "put" },
  { route: '/api/service-unit/:id/price-image', handler: _lazy_2tfrkH, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id/unit-image', handler: _lazy_Yr0GyA, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_qVvBuq, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_VRbvFi, lazy: true, middleware: false, method: "post" },
  { route: '/api/user-reminder', handler: _lazy_x9S02J, lazy: true, middleware: false, method: "get" },
  { route: '/api/user-reminder', handler: _lazy_t0b2Fu, lazy: true, middleware: false, method: "post" },
  { route: '/banner', handler: _lazy_8cmr32, lazy: true, middleware: false, method: undefined },
  { route: '/api', handler: _E89xVM, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _VCbdr6, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _NwzmoC, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _OjERKg, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _kmu5uV, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _Fts5nN, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_KJ86Tq, lazy: true, middleware: false, method: undefined }
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
    debug: destr(false),
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
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { authenticate as a, buildAssetsURL as b, useStorage as c, defineRenderHandler as d, useNitroApp as e, baseURL as f, getRouteRules as g, closePrerenderer as h, localFetch as l, publicAssetsURL as p, useRuntimeConfig as u, verifyToken as v };
//# sourceMappingURL=nitro.mjs.map
