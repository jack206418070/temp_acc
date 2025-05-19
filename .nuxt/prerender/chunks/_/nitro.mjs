import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, getRequestURL, getResponseHeader, getResponseStatus, getHeader, createError, removeResponseHeader, getResponseHeaders, appendResponseHeader, createApp, handleCors, getQuery as getQuery$1, readMultipartFormData, readBody, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/h3/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, joinRelativeURL, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ufo/dist/index.mjs';
import jwt from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/jsonwebtoken/index.js';
import destr from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/node-mock-http/dist/index.mjs';
import { klona } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/klona/dist/index.mjs';
import defu, { defuFn, createDefu } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/scule/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/radix3/dist/index.mjs';
import { webcrypto } from 'node:crypto';
import { createStorage, prefixStorage } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs.mjs';
import file_58_47_47_47C_58_47Users_47mcsadmin_47Desktop_47accompany_45web_45site_47node_modules_47nuxt_47dist_47core_47runtime_47nitro_47utils_47cache_45driver_46js from 'file:///C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import unstorage_47drivers_47lru_45cache from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/lru-cache.mjs';
import unstorage_47drivers_47fs_45lite from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/unstorage/drivers/fs-lite.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/pathe/dist/index.mjs';
import express from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/express/index.js';
import { FilterXSS } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/xss/lib/index.js';
import { digest } from 'file://C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/ohash/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/mcsadmin/Desktop/accompany-web-site/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', file_58_47_47_47C_58_47Users_47mcsadmin_47Desktop_47accompany_45web_45site_47node_modules_47nuxt_47dist_47core_47runtime_47nitro_47utils_47cache_45driver_46js({"driver":"file:///C:/Users/mcsadmin/Desktop/accompany-web-site/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js","base":"C:/Users/mcsadmin/Desktop/accompany-web-site/.nuxt/cache/nitro/prerender"}));
storage.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"./public/uploads"}));
storage.mount('#rate-limiter-storage', unstorage_47drivers_47lru_45cache({"driver":"lruCache"}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/mcsadmin/Desktop/accompany-web-site","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/mcsadmin/Desktop/accompany-web-site/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/mcsadmin/Desktop/accompany-web-site/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/mcsadmin/Desktop/accompany-web-site/.nuxt/cache"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
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
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
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
            console.error(`[cache] Cache write error.`, error);
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
        console.error(`[cache] SWR handler error.`, error);
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
  return args.length > 0 ? hash(args) : "";
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
      event.waitUntil = incomingEvent.waitUntil;
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
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "49c8d419-82db-4ae1-8b82-e9ad5f29edb7",
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
      "/api/**": {
        "security": {
          "xssValidator": false
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
      "whiteList": "",
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

function _captureError(error, type) {
  console.error(`[${type}]`, error);
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

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

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

const _ckXiAEtNtPK_2d7s0bWjOfEGn6R4Ni2bjnTEO4C6faM = defineNitroPlugin(async (nitroApp) => {
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

const sriHashes = {"/_nuxt/builds/meta/49c8d419-82db-4ae1-8b82-e9ad5f29edb7.json":"sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w","/_nuxt/-BeWv2vx.js":"sha384-qOUHH5RsXOyA9TqhaRKL3m0rZRD3D79CiN4xMQRfirM1Q6D12PqaECU1uolaNI0c","/_nuxt/3LvWJCBq.js":"sha384-WcQjXDodqfNsomUu+e4XaHt80bQqvcIJ5DcXdT9r7ZyKfpzZZkfkASNs18XYYrJF","/_nuxt/3m1n_6cK.js":"sha384-R5pnwzSJDtE3Tb9B8D7R8Fp0iB7HMJHljSojPwJxErVJ+ylnRnTVp8xnegOliR8n","/_nuxt/7X9czuWm.js":"sha384-FNFVS6kIaPp4ENt4i06JVLs8t3314gOBCvr4fiJX+dh4L8/9HGrpQmkGyeKCjm2r","/_nuxt/about-us.CcB1ZWYX.css":"sha384-vXH/ccetFLwLpSkTeWxaAbKE7bqKsQDPLVfS6fsemmJ1sPDruvfWIN2E5pELM1Fm","/_nuxt/admin.BG4oIB8c.css":"sha384-6rH+GE89itSdjDxfWQKafYWnvJQLImACR5TFnRJiqdrhc4J0Qz0D4PvkDRmjS4rE","/_nuxt/all-contact-info.LmTmS_Ew.css":"sha384-t2EDIfSjdHJwUjvEXZGEFioRO/9kUDptduG0WT0Pf+h4g7WbwojuDlPq/YDUL9In","/_nuxt/announcement.C2UeJKl7.css":"sha384-UhJKCvs/ydMctxk3CIKXohi7WLnVWlYmA+qI0FKvlKmhfOP8Ueh1e7ZyMK9Y37P+","/_nuxt/announcements.9YZ9LwUE.css":"sha384-ieAyafPsVvtUCKpfOfMrD5WG9p17BXeDDjRpgqNJRvj9lpdLhZYAAa/BnDvOSCKt","/_nuxt/application-form.DXUBT5sI.css":"sha384-UC8+vjHLNb39ucuDT/24VyQ5ps8QWtqGYXwy4xD7scaIURvSiWG7VU3T/HVjvJCs","/_nuxt/B9zY1EzE.js":"sha384-3qxhIpvWufYO/quI1xVdRkkXs9gB1dGt91BWMTTpoD6OTzwMQhCgdEbpBxmQrwoY","/_nuxt/banners.CXzX0Pme.css":"sha384-g6TAxy/wSMmU7TMwoLIi/BB1yCyMz8MTP4W2EYcnIJjaXjG2zH9VEL3XuolakxuY","/_nuxt/BB5ws1EL.js":"sha384-z5JA7PpWO2OAz1UQyoCPPMX/zB/OIKyWbRqBNuE/QZQhQ/eBVGJCiwAqNuiu9S60","/_nuxt/BDvgWI81.js":"sha384-mWxXEaPuc/diueU7u+3F8jkKFkgv10EO2o68LJFqNsCYkKD45v96WWbf3b7V8fRQ","/_nuxt/BFEbCx3o.js":"sha384-95LTIz9Zhw03/FU16Qn8h4H9YrpNPpAt++A4/foTuXWmf0jF3YUYj4OTdq1vt4X6","/_nuxt/BfOPKFeP.js":"sha384-eDygKPMH2uoyWWYb1+8TrnYOLhNI7BJKpSZLrYbjS7UymPSlo5E9AauuaeKQaPBp","/_nuxt/BGQN5JpH.js":"sha384-UbbGKu1wQVnp928PjI688ylnwPwqGDcY78dxLUMHKqufImhtCL8YdQZsPTCu2G/y","/_nuxt/BhOnsJTZ.js":"sha384-t6YfIacAEb4U2yE3ahNzFmjxz9AwhwVdW4PuUrDXezitAOo95OUrGKMeWVqGayvN","/_nuxt/BjbJYXuL.js":"sha384-DQ8cuoKpqHcDro3uaxXlaVuY3xvNtTYE8+cuDDz+z1bv7FcVe18St5XIBXaU/tqt","/_nuxt/BjTplraE.js":"sha384-YBSg4qlR1BOnilU+nWXkVcTYe9zj1Rx6wXyEWfXwt+4WtXHCpPjJS59D5mTH7Afj","/_nuxt/Bkz5UteD.js":"sha384-vQbP6vQMzsNN1p3MzZ1AESfhv0kvvtYg8cXL02rKw+2ts46poaJW4kmAF9SNEqrR","/_nuxt/BmxWBips.js":"sha384-2qxkp2JP1loormAy8BGvlGdAcezwktJZnprQl4gAbsWh9iNpclaJg8J+TsBxNKUw","/_nuxt/BNQ7I50j.js":"sha384-MwgRfbXU399f2jLEg+8DKKsxbxNwEeAMOsVcHu9ar7WcYQ5a5Av/7Y5DzFNv/1ze","/_nuxt/bootstrap-icons.DSXWTQaD.woff2":"sha384-8a7oZxHU28YPnDiMUcUxGpUGGWnO6gHBcV6FNMbGgloxSStqzdYP2Djz/ex85ZKu","/_nuxt/bootstrap-icons.DTeOS7dS.woff":"sha384-mgXQ6zSG7EqKkRMOtJB2lFvH5WKbK66diq/Lcr7pzEnK8hy0RwS60d5GjNKgAduP","/_nuxt/BqfGRcUi.js":"sha384-Mus3mEpLuD7As82vDyzYBEBGyhBRmIdNtraZMgq3iqEw//Dmr0RV5M6dvkyh1XdP","/_nuxt/breadcrumb-one.FjJfrjWq.css":"sha384-zTl3sBxs3XwDNASk/73QUgn6/k9IkFANCvc7qWV6WdXWfRKjCPGUFz2nAHkBCl79","/_nuxt/BRleUYs5.js":"sha384-XpLcYkEXbO+XUOa8aFH+PJFssj+xyP6jmlBWiUHd6YzgfVYNUNppHmmBGNNi67nn","/_nuxt/BSZ7hnS4.js":"sha384-T+aFs4HeV28wsn/UD29KUQEYau5SfrANR4g4AojXWhd7Jjfo3MFCkMGQ199iQQ/0","/_nuxt/BUkV7Om5.js":"sha384-H41Q3sxgZthdQu1jvSgeODfh+prGILXM2slksvpw+4j6cP/a1K9MhsMkz7WkeXgj","/_nuxt/BZJOYxE3.js":"sha384-lsxz64u9+sO/lx55fvELeBTiolNtDxJYUyZGc/eI7iQqzaqpga/IPXorrrdg6edy","/_nuxt/C5LruSMl.js":"sha384-v3znzAZUpTBY2k/gpdO0cAOZlYOdOl72Z9C+miPZlBYlZSOMvbUTrsoD9BJ9psx1","/_nuxt/CCcWPx-j.js":"sha384-F+A/uOwAQA4AafOPgZKoYbt6Ab/mfoRJYBKQjo0JXaxvCnO5+6i55Nil0TIjKNQv","/_nuxt/CEI1lO__.js":"sha384-fgMZskPw+rnRR68758JoHyWdMPiIwIjkY+A4QOsCR3Qq/Un3T3UIIRvnG0gqZ66k","/_nuxt/censor-standard.BVtJMNh5.css":"sha384-9tqAUJwTqbrt4he9iiwRjp6ZBUp4bCgZLCupHiC3Tded8leBKfVagaJzD8hczMxq","/_nuxt/cFhKwdVk.js":"sha384-PqvwMIdoOl0TcDW4lKr0CS2pF2AVMseyYIi+PHr1vek3ZpoJevrO9/4LfFQTBL48","/_nuxt/ChZLdbkr.js":"sha384-DfLApJWUY4VuL3zAB0TbvuXvL5I4HuzbkCJsZmQfNoCUyhk92rjnOZC2PdQUeDxT","/_nuxt/CjokzW4m.js":"sha384-rNamKuMOlHyApfLVPVT/Lp05AXp6nPBUcKTxFEjicEd//qgRQPv6c55eN9M8N8L2","/_nuxt/ClashDisplay-Bold.5hYeFSJJ.ttf":"sha384-wjO8lobPgLMLcQlvP1Ym/CmxyZvn+BCp+3XoJpErUFbHev1T3uaXg5cch1g3qBmU","/_nuxt/ClashDisplay-Bold.79YOzMqN.woff":"sha384-68g2XJWriFtAnjM7RK7LQEBguTEAV2KRUu+XCt1T62shOzBwh3OCczsAEFULCosw","/_nuxt/ClashDisplay-Bold.YaCnK2PY.woff2":"sha384-yCf0JKogT/1mwO8kPWIV2+xlpQC2R/Qxv1bJ22fctXpQeGV7Ly3aJtad9Cw7spW6","/_nuxt/ClashDisplay-Extralight.-kv4w5k0.ttf":"sha384-UGHrrQT0d7ex79xktXrjutn2yG76uoFqgQSVp5/Smi/O3bec3chRc7123t5UKOQu","/_nuxt/ClashDisplay-Extralight.BJExDEVH.woff":"sha384-GpOLy9Kzkz+8I3Rs2mAFfE5AuFu4uAFIxy0t6EiN0M6r4/kWNdcZBlIdNAFp55OD","/_nuxt/ClashDisplay-Extralight.D3i1MCwm.woff2":"sha384-/s+QhITa2FIIe1Tt9YNjx8j069YOsAlyNZWzh8PDSKphAoaAVxIZaRhzj+GxqTrG","/_nuxt/ClashDisplay-Light.Co9CQZ40.woff":"sha384-cGIjwU7aSraVeKcO6IOrTJs6sY/61g8XJqyH83/bxXjM2PJpmqTHitxul2kz1wnE","/_nuxt/ClashDisplay-Light.CutxPsj4.ttf":"sha384-W7obgZG6Og7XAwoXwC/2tiNMLr0jCucnyOvz/+tXnyry+PYWhbCly21IoSzg/IM/","/_nuxt/ClashDisplay-Light.DIjv0-nY.woff2":"sha384-aPpDiZggiZpZWlRcllfYl5udl/MZw0t2D//0b9sdftqDPDyMuB19SBN3yLfI2N+j","/_nuxt/ClashDisplay-Medium.BPdWq--j.woff2":"sha384-k5It5WkIhYWSL9i9xyc+aaa/vhLOD+i3NnR+36bXF86SCzjx9YoMSJnZ339TrDgL","/_nuxt/ClashDisplay-Medium.D8oxfInt.woff":"sha384-QjPZmx6C/uYnciAB1fh7a9ureFnWPy166xrroDxY0G3E+Inw37yrtCYj/JWjiMBT","/_nuxt/ClashDisplay-Medium.RwyLHzhI.ttf":"sha384-rViiQNWJH3kFChGWmzla1YEmlNxXjqYd0NV4umSxNKH7lCpret+GAlGFFhJPkUKX","/_nuxt/ClashDisplay-Regular.BKrzTZUV.woff":"sha384-I2tgqxxcB5hbFn4Jr1Jsu2LFX35tFX1HRZdNmglBz0oz5aY2+8pgkzgH8vt+zCfF","/_nuxt/ClashDisplay-Regular.DhusH4GR.woff2":"sha384-Upaw+fAE6eMgZWCU9D2EX4Cp/d4rQcE7s9b84q3UZMLkck9VB/XFJ1F/eFd6kJx1","/_nuxt/ClashDisplay-Regular.zoOY6xZw.ttf":"sha384-+rR5v7/pS28pk7PpIyBEQDA9mBuDpDQYcTwN6LVjrVQ+suR76tUzWV9gaTc+h+FV","/_nuxt/ClashDisplay-Semibold.C8tXlykZ.ttf":"sha384-8oKIC2dZVqfQP8xJeduY8soYx8Zlw25KCd8Z9SXDA6grNVSO0gme2u26NsFQd7iR","/_nuxt/ClashDisplay-Semibold.Cc_zfQ1K.woff":"sha384-FLW9bnv0TCUA6Gt+OFkm+DBc+Xel6iOsq/tiZHeZE6GVuotUr5g0xFxk8cMmNgsB","/_nuxt/ClashDisplay-Semibold.DcA1xgJG.woff2":"sha384-bEdamHxriyxnHt2tefAQ2ktifm5clowbO1x7ZU4ryQYIkJNJJzsTOR64YBLOrEpP","/_nuxt/CmYcEnuP.js":"sha384-7zS6S4hkL2hWBAbfO5cEul4FlDPUlVEfyUDM16RM9t/IguZ4S42Zt2un3kBwuMNK","/_nuxt/company-statute.zW0I--tl.css":"sha384-5R/jy2KrVEaINX0FYfDwNI3dw1alKsaQ5dSbWXFAMIwLZJfPMTa5+G3xCaVHbVof","/_nuxt/conduct-plan.BTt5TR3R.css":"sha384-ySkSMuPbeZu99rtwH3dKG3hfczAD5q9tOGvCvPZMkn2DpRPEmvyAUwntXcy2uMBG","/_nuxt/contact.I8R1SwDS.css":"sha384-bLVYA/ROAGxl2mdmwhY02ZZlDbzF+HvJHsn8HPFevJC+YouvULPg+qbzJgMdObw8","/_nuxt/convert-principle.BZHCRG5B.css":"sha384-nttnr54dYACrNEtoCK6h/RHFbeQu0IkEXDF+U7cc9WPdsiWmoxbCGEjGG4jAiwkX","/_nuxt/Cq5jlADT.js":"sha384-UKDFmgzX8nx1i510ofUEIGR7jA7SU2OFBrKVdtGstuvurR4vKt45JdljOhSEy+uU","/_nuxt/CSgNF79V.js":"sha384-7P/netgdNNKpXO/0KmkD1vCXCqWrTvx8ogWthqCjxXtNPpf6z8zjvAnZl1g20CvF","/_nuxt/CTLYD8Lz.js":"sha384-Ns0pMw82ggXl8+1tfqz04plhkm2wLPsEhEPCyQiqmaHWLA1VFEOea9M0LCUzksxU","/_nuxt/CVbhtb3X.js":"sha384-sl5wdtOPk2oyR5HLKv6WaNKQlSorKphlzYd3Rz/HShpRWGfzz+uTtraSyTGPvDfh","/_nuxt/CXJuJPUO.js":"sha384-XTZvHYFxzfbu+RhAxNJXABZZsnQpDP8okm8x63PeDZs6aRYPtxnU81zgmgOYXGCc","/_nuxt/CxTOsdZd.js":"sha384-tlXFMZ0r7VjtNZ8mHDLxjvTNW/6vb9upVy3Ne9BVGEzmalTgQVo63MT7krlrx3MI","/_nuxt/D29QrThs.js":"sha384-/08k0GQWduGTy+zgnFonuVP8LwkMXluia7L/EJ62eIRHvrtvBHKYjiaerA2hgKL3","/_nuxt/D2txdsom.js":"sha384-VT3/AObVkTRvwFGkpkGRmWlE9ufo11REO31jU/DiAdl7LvNo3d+tSZA6T0Elf/i9","/_nuxt/D38KGuCV.js":"sha384-yD2At6Ieqij37JIj05MF2eu7fWGcNc439/b40oe7dnBekkyA2fPOuqD4OyFzTl/N","/_nuxt/D8bwoaiM.js":"sha384-6N0KXJNh2lySxum5jh16vtWMyplxiWrxkM3oj/z512/ezJ212rrwCpL+i/mq4TC+","/_nuxt/D8wyBA0o.js":"sha384-udcAyNEpGXMgkV3G0KQ7ZNE+t7lBoOgZGbUQC9tGjW/o3Df1emSJZ3BiXmqozxFV","/_nuxt/dashboard.DRC8eif5.css":"sha384-bARaeH6IA5wpBnmjFYJcmKUJm4C4Q6btBVEeeWt4MuApj7ielFqAoE8gJsNQiN6u","/_nuxt/DD1Ieeq-.js":"sha384-rVco5F7elTKGz9UpXT1bHClot4WNWXY4UJEt0VmlRrKIxBwH/FeIEZyA6b4CaXpS","/_nuxt/default.-h_edMOl.css":"sha384-hCNMKpVEDHNLIe3M4cPNeQkDV9kOSyRXDDiLNdZrv6mg7s4owSYkkRy4E+nO59Wo","/_nuxt/DEhgSZIg.js":"sha384-u1JXVDgfMVD2OgchVK8ah874qkzrWP+TzasOd++FTR5sZXrX7HSbGw0m3jtPAXI0","/_nuxt/DG8Rmeoj.js":"sha384-geFRFa1M/pvWtbkImwT+n+AMIJ65VOA2BDWD8c2g8uIMkrhQTHTbmMwgZkV8OdgK","/_nuxt/DGE5mial.js":"sha384-dlxtiw0OQ0T3SopluJH+pB6yOaCpCOKarIsqqbnwwIJBcpt9Vb+tawYIfclXtw3x","/_nuxt/DmSnRJiN.js":"sha384-IAGx5NtOExXUv2C6pOjP8CzPj6bcjITBSN+xKUuzGZuggkrDpzIWcWR7FXB5s7+q","/_nuxt/DNeAabJ3.js":"sha384-GcGRcTPrqiU+CA1yCTZq35mxluOrGUW+0Isnk6AswEca3ZaZijIsLrdeWWFwZGdY","/_nuxt/DNfYWKe0.js":"sha384-MG87AvzBLfYdu8DGP5PwMJ6+IL2SBloxKbKI0PHn0ab8cd8jvlNfN7GWf47GIvX/","/_nuxt/DnJSW8iq.js":"sha384-LFMxcROFhe8iKMTxPY+q0bd985pNHG342vVE5XCiU1hXjwXf0WCIPcvp0K+p3egn","/_nuxt/DpPziJgQ.js":"sha384-7bATCQ1l3J9Aq1LXk40Rt9ofLRvRmzfMqvtRRJMTZqhz5vdleCVGWF9LpJNRdSXA","/_nuxt/DqAE_nju.js":"sha384-efJhPVNJ9qkxwGIrkkGjBD6/dzqa/BzcjYEhsvApSeLO2Dr6tX6AzvbPexZ66mcG","/_nuxt/DT_ky9TM.js":"sha384-Rt/rOqRu49MW9m3a75vbxLd93kjXznCRvR7E49mArOZmHyIu7ipTDU3ZXoDo0IpS","/_nuxt/Du0uDHr4.js":"sha384-KdKSaTPddTXlRjv2DifVSardN7i4rgGSx0oEKkebuQIHUi/GDy1NZMZhzHXXRBlw","/_nuxt/DuTn1kZH.js":"sha384-vjtg3BmWBjW8UrvvXRl8ZigDFYm5GBZP0OYX3+M0p2xDO06zMaIhTTxkuLgwoNS0","/_nuxt/DY3aZN3E.js":"sha384-ssyN0ON7o6oJpdeu9JHoGyHfsIjsf2NeoAB+Pp8J9ZTvw+74EnesnibkCUSpvwuB","/_nuxt/Dyj0vTPE.js":"sha384-3ETfOvyuM6X8xmCU1mxlj9GuKaGUOmNCq7A+0ZU7npkDk/tunYE71t+y5rWLLhZ+","/_nuxt/EeVAjYve.js":"sha384-s+NbuOLam6QNVgOK3C/6ftBinKQExKg3L/e9ofwZ/Y6Rur9f9GyDdUhgqCe4UqeF","/_nuxt/employment-services.BCOgZKZ9.css":"sha384-1CsGGd8GylP3rETJNT9S5zk/AQxy7fLNeZB+6MSmOguN+tkaiXAEIzDXGg+bm8/d","/_nuxt/entry.DJPaDADu.css":"sha384-dT9NnbJdLUsTllXrZf11ulGfwnvNkqZbbMhdCpxm2fxB97i1v+Ds8qzcEqTTtYim","/_nuxt/eoI0fuPi.js":"sha384-HYIBObm6NdI4BaDk8Fohctvn7T1jMG4QzaxdmjaEJsir0D5qZ8/Eer8k7KUVZhVb","/_nuxt/faq.BbrQWZWl.css":"sha384-O+VSHH8ybZS+Y7PbVRpLUHimA1/7HUul02IG0PS060MBuKqfgPPcjq4WAEvO7oO2","/_nuxt/foreign-famliy-link.D-VvIn-n.css":"sha384-ztU7MFaisZW10qaXoUD14lOfbfSySh3CXRbUYuWru6sYB1YdDoKPkMfGRB2PG7Yy","/_nuxt/hXiZFfwy.js":"sha384-QaqxmUuljLQSURRoheTOdE1mK27IIaJuCfVEmoJEj2sC3EhhLZ1lk3QZvfeRUjha","/_nuxt/index.4uOfb_qe.css":"sha384-UDCDnlkdpCLKIc2DeEmojYicI1SIiGDBZQxh/spAvRCGflICM1YZGtJ+nlLd/cp7","/_nuxt/index.CetQAqKn.css":"sha384-Qyr5MsFbZ+IOO99zKTRbRmyRWfzDOWGQoyAFf0umz5KZQkc+k7lRqByeCjVevFoL","/_nuxt/index.D5_Gfe-Q.css":"sha384-9bch5w1isF4qw1ltGq7XZGS1hpJiwVTk5sJd37XIiYZgHGaaMXDhTlvbCc86FOSG","/_nuxt/inkMpG6b.js":"sha384-8436yfuvxsVWEOLf7CyuYpVIYY/GXgMpoZUs7l0Iz6qS6iTxLqbrDTrTFo4SyLq5","/_nuxt/join-us-unit.DYDpIsJs.css":"sha384-bE6ZxyxsUzVB65r9cS0rzQqKMMr+HottxkiJ8XGOMRKNR8lnYml0T2zMn5RzCzc3","/_nuxt/join-us.tW0T7HDv.css":"sha384-DSqbAEeSSa8f3DW+nf9e1RGgolLdBvIThDmklssfIn0dDwxvF/neOLpBhKctdrIT","/_nuxt/knowledge.DFimDFcm.css":"sha384-WY2zz+ijiq7gOLm0MNPS+0DRD2OzUs8vCxQD42yuxWSAixnzXP/IDl74Qlw7OoIl","/_nuxt/knowledge2.D4IRES2e.css":"sha384-PUtL4mqnUnI+yeA/LX9+fis0WxKfIF+KyckMH6bL3BfkykiOhkZ24k13Zgob7/LU","/_nuxt/lazy-bag.DLTuVNgY.css":"sha384-gy0I2a6s3cpPcUVJ3qEeR+TaSjXplcM12lRXRKHSBK41kidFTH3uskpJtjziKjRN","/_nuxt/links.BECa8f2-.css":"sha384-2sADnzoiyJZIrGvOni5u7e3P6f6oB/R8NXSTvI0YGWp+qI0QB36872WBcDwQ/ob+","/_nuxt/login.CthldNmk.css":"sha384-R69kdARxV5D6zeSeBFj9Qc99GqErCXaQsis9WNjNzUQm4n39CAyld4l7dkZhSKNn","/_nuxt/Magnita.aiIyRRpl.woff":"sha384-MtSpNrkrzHBmaLWRTJUKRH4FiAC8x1TnVJ4vFX/xWc9xR1h8QQY505xXaDHrOKll","/_nuxt/Magnita.aKmWMWBq.svg":"sha384-ezge3a504V2caqBkft4ydMPOjt0v2JiPOU3PlrVdXo7hAf/Yr5aBri/vaOQ6TGJg","/_nuxt/Magnita.CSUkLIR8.eot":"sha384-o4PRX1Y5o0C4Wccpiy3W8qhUPlP9O0Dr2dsA/Vg3mnNnbAsc/Fr1ujASBtwvOKZI","/_nuxt/Magnita.CYTrzT3l.woff2":"sha384-I2SQQhFWIVVHonyIbAM6HblONDcGfUsJgCcamS+jNs/z3KS/rthIF3cLBZrBnISf","/_nuxt/news-details-area.BSSv71pN.css":"sha384-UxlYf38edOV+Sm6BomVE53TMQfAT/zK+N52kmpqa+O6G94sO5DcYBxJvlBWT4UlU","/_nuxt/POqF-0B2.js":"sha384-0h0V5iTmB6dNYy3IQEBvRFfhsFlugnmkPQoWg0jlbT2O+jjXbP8WEfHzeLVbFOHt","/_nuxt/propaganda.Cem00kxL.css":"sha384-CPP84dDKYIZXCJqW7YinyL7071sD+z3nlqW8PPEpnYZVf4ROXaa190+1QrBSX4XQ","/_nuxt/qa.BRQ42sO9.css":"sha384-yEN1Xvk8iA+1+J8yyq3IpDvJ4GwHvi7uejJqTmOUDe6oKs+Pm0BbGGpKwXJk3PL4","/_nuxt/qa.DTi5lDwH.css":"sha384-sv/DPCyH19qyCsPmbCqaI0amHP8YXMOwW4fmck3xeegUFtV1Zm/qyPo8GgfWHoFc","/_nuxt/qa_setting.DeSbzGUj.css":"sha384-KpIZlW+rb+TsKyfrUkxaJFMpu94FHpBHNbWW+OMcjuHdDwqUEUBT75EMwi5oqQm3","/_nuxt/qa_test.BkDwbgTh.css":"sha384-83yof+ea5m5+jJqqP6DLYJPo07Yga2k0xG6Imj24uLFxWjYzkZyvhs41vl9xFFVq","/_nuxt/qa_test2.QCUqpaIB.css":"sha384-6kDWx7098n57SNxBx19mZ5umO9s0hXdWr/7WkyHHEBxZ9GOIQMYzATRFU+u+laBc","/_nuxt/R3bUA4SY.js":"sha384-zm6zxfRa76fT3YPFVqQ3+1nhKcjVwpSF3HOUlvVVEneJ767obssxBaPbGpz5WnMz","/_nuxt/reserve-guide.DIF1SbjF.css":"sha384-oSx5jd1nNAVSsH3RZk49PnfuXVmLCFy95R1Ne/fkEUJyITXW0HZTz0fSG8qE03YF","/_nuxt/Satoshi-Black.CizHyRqb.ttf":"sha384-zcK3OiRulLIZ3I6bb11GtBinPY8weNJJwdFl1lXnRfGlABwdB7teHCT1Mh9+MEgp","/_nuxt/Satoshi-Black.D3hzT7Um.woff":"sha384-cBOd02VQW1GXQOsvaCptgEyJEFAmRIK0ZahMnT4QZVf9+FC6ur0we3bxeE6j338C","/_nuxt/Satoshi-Black.DjnQuuRz.woff2":"sha384-EQjbkmMQhPVGI8IeXlw+AZ256ocRIItXly/VzybTEBH3WDcj85vJEXDSRy6W8YKX","/_nuxt/Satoshi-BlackItalic.ChCbTD27.woff2":"sha384-vs6HuoV+J0EUju9vKlqFeyMZJj2XThXZecGhEWkiQ0y3kuS6jZ08sABdVm3QKdtr","/_nuxt/Satoshi-BlackItalic.CvIpOoSh.ttf":"sha384-KOeiPPFOYPrHeAvLwh048MT3I8J76m5d+HGtz05m9fsNVBwSfmaWJ4kfFF1/1EUg","/_nuxt/Satoshi-BlackItalic.D8Ai_S3C.woff":"sha384-RMLQ7tXxm/JyocQJdBsF/gLtgfzYv/AyySJBKUuKQRuxedVVmEqYhl5ZNlJWTpCP","/_nuxt/Satoshi-Bold.Bd5kKQ_U.woff2":"sha384-YUJoc4ASFboFzv21BAYw8YFajUB+TdbJOz6mM4GbFpkkRXTdcONEWwW23KI4ch4h","/_nuxt/Satoshi-Bold.C2PhLWFc.woff":"sha384-GBIVFvkOHL90RHHWx3VGQ0jvvoY70fzyYbQgw3YZhWxkFBw1Ny1uJBwFSnLP766h","/_nuxt/Satoshi-Bold.CPly9kH5.ttf":"sha384-HOLTk4grWrFiR7HxwPMBYLQ5XorJy3fWMOkQDApOZTfIwOycMwQ4rlQnnPT+6L2v","/_nuxt/Satoshi-BoldItalic.CAjvAcxR.woff2":"sha384-QWI/dJ2kd+QbPjVo7GVnQ+O/IT1hLC9nrpKzf+izQ4SlAxJVeZDssIms78ELOwd6","/_nuxt/Satoshi-BoldItalic.DQ7B0PfL.woff":"sha384-DccWN+PEFBgvLwtmKZr+G7LMdlkfYuFAh2+kzD3yqE3XsA4/eJnACWkmGDohpPO6","/_nuxt/Satoshi-BoldItalic.tClQcAb-.ttf":"sha384-X9/DZl4cQQWRfPOUJnpe2da8KrzebssRsp+ZYLWRpFLTfNn0B43M0sQM5nVkHnxL","/_nuxt/Satoshi-Italic.BPCXRxzy.woff":"sha384-8e8ckF87EP2kgTAtpc7YgBWp95nxzThcNLBeRASizieHlkSK/ZznZYhWs5MzJQLc","/_nuxt/Satoshi-Italic.FMxkCD8o.ttf":"sha384-LD6GCl8JISvMpoGW78vHyoesyHu3WWM7lLr1e10znt47ATeVRQnPGMOQ9XNHwarj","/_nuxt/Satoshi-Italic.wVmEEc6M.woff2":"sha384-3gltP/X0J8/qH4ROknNgQ2a7nNDQse/kmiGg4V1LpPmwsSiyGpTDhqBLQo+AD/1G","/_nuxt/Satoshi-Light.B82kzbU-.ttf":"sha384-ZYip1NRjKPP+M0nBedEvO1/dE7JZ9aEPc0wpZd4qFLLXdBPqEkQJMh2xDoKrAI8b","/_nuxt/Satoshi-Light.C_dmkKXz.woff":"sha384-XD29Tgo8dM6CAoMu9BVQvigKYugpuXqiggbC/u9weKmw1xn8u/s5b3nDCMgbpoVe","/_nuxt/Satoshi-Light.IqwJ_ZjS.woff2":"sha384-DKfZbyuHKYbavBmQAPrUD6C/RFreBwY6iIki/ousIHrteEfy2+JlCOHv0Y6H9Mqc","/_nuxt/Satoshi-LightItalic.B9L6s97T.woff":"sha384-0MNk1twnZog2eK4+N1EJIEkZP+9KSZ+y291I+zFWsBclVGW1iHrC/+Q/XJQbAipy","/_nuxt/Satoshi-LightItalic.BAhuxY-A.ttf":"sha384-fRzhXQXoLHVacWEC6BZas5BNEAM4u3cvYLk/qg6v3YpdO173zVRvzpQMppvlhTIN","/_nuxt/Satoshi-LightItalic.C9iuU4v7.woff2":"sha384-2vYZbNVoA/zv+YPZO7BjGUxJTeOLWjGlYiUYRbeN0Pv5xRqFtOuKr2BL5kYfykNh","/_nuxt/Satoshi-Medium.ByP-Zb-9.woff2":"sha384-3SJcXnKSL6CZoWDylcbcUT6zvlrOM76BYx4YLCZVMS66dqkzEp+bt7WgrzA/Q4X/","/_nuxt/Satoshi-Medium.DDwDPeBg.woff":"sha384-rxGjoCTOTJuqmI+WFY8qm5E32shDWnksCTFXPY3ZpKusHCphi32Y8tdj5LxJ417C","/_nuxt/Satoshi-Medium.DOt9kM-a.ttf":"sha384-w/oMtVlslcXIHq+B4FyPMmJKqwRvTduk05EzYi+mlVg8/o7g1er0weHHQ/yeD6S0","/_nuxt/Satoshi-MediumItalic.BPTJUpxz.woff":"sha384-ZpA0TxODyItUnkWT3ri1M8NGgdrnVkP86/Ojsr/Hv2dCavdqzDee8KfxwWF6k1gG","/_nuxt/Satoshi-MediumItalic.BUFVYoD2.ttf":"sha384-GyrmIXeI8yinhXAc25RWwKBHYod9SDbtT+tA2GrApDmZn4TSjVlC/4Gjb0Iu1EDn","/_nuxt/Satoshi-MediumItalic.BxR-IcRj.woff2":"sha384-GtMW/0lEgOXcTF3pd3/i312iD0BwghBslUZxB5ut/T1LEGTUMnuqdQg8R8dOFEpY","/_nuxt/Satoshi-Regular.CPM9dct4.woff2":"sha384-EXdX76+Bab1ra2dNpDnK6HDNO1zhe0EpS5A2BC6NR8j1/bVM7FEQcVa3VBIclQxX","/_nuxt/Satoshi-Regular.CWSyEjGv.woff":"sha384-wmETwHIEO9dXIAp4xsG362Nqfds+/Eo280zdplao/24EltLTOqherEu5S5/dl/6z","/_nuxt/Satoshi-Regular.DToFXog2.ttf":"sha384-6qY/DLHgLz0hbQ4ZIU+0gTmBABVSQMBLcoJB0TMoyy6HpOew7NgMptrrFWLyADu/","/_nuxt/service-apply-form.CsHglrHs.css":"sha384-XmmJYZ+LRxJ3zy3WHwWB8c3DlU7SljbCvJGRFM3lt3POxQg5jIM0TdYp54BWC5u6","/_nuxt/service-now.D2gdYUec.css":"sha384-PSdycI9CEX5PjI5AkhMWQShe1KKGf9+VXJ+cImlJJyLJfT3jSmAXWafmImEtnBq3","/_nuxt/service-price.C_ZPqZB_.css":"sha384-8wNXMV2b+d/L0+1GhaEtjatqWbhNQGqoDnvTw+w022snw7olOa4KlPg/RTWfUp2h","/_nuxt/service-unit-list-area.BxRW7GR2.css":"sha384-lnxOVYzXbVZ5Ifzg5bz6gxj9CsIpSRz2rcWTx5f5HdTJ68c3F/lfMF8RctKnDcU9","/_nuxt/service-unit.CIEUqxPw.css":"sha384-0uWxKlSUs6Mq9SdAwaRIW+C5N/p4se711xTlUK9LwcpUo6ILAWppj4MyRvRmkxDa","/_nuxt/services.CUBT9X5K.css":"sha384-Sb3SKjqCASThovkc/5ynvoXcXVK7f/+f/WTz1fb6QC4rJ2raNNObUTGChsypwriD","/_nuxt/tfw_4xr4.js":"sha384-kGHcED4uqXAUumQyfCclm7PE063nnzAnhLvm7ikLjW37CuBDW2mt4TaaJmPni3sv","/_nuxt/tjY3uDvg.js":"sha384-d6dq2mVbHxwt056ssrbcv3Ai8FDwiCyDE8QIJtZMlYoJ2Qpg8qV4hJWCIMWqe86l","/_nuxt/UjBPYd1q.js":"sha384-Pu/zjthhQZLdSBdoJAFFVQssjQ/qLypQDHcxPOTf+gYxA5HFjRQr+0yItL9qXwtI","/_nuxt/x_rD_Ya3.js":"sha384-tp0sLW/T8vzvCWj0xxnh4xU3GO0hfkrH+1ZHgbQQdieYViuNRt863z9gEBAVUtMc","/_nuxt/Y0E9vUvA.js":"sha384-c440VxXOFqDWfMjj53Pti1mjn9Qh1xBrMeCGLpB4MEPY2MKn+SJwtejV7aUJRgsG","/_nuxt/Zn5VZll4.js":"sha384-NCTjqGs37RwEz0Ug//+H2nlvowbNSTEY3P8yKoifZAixT6hKR/ynU5KzDZpcQJRc","/.DS_Store":"sha384-aB0ZnOQV4miynTmBkrYrual6PJHJ/iuuTls5tXQIw4Ji4+sGlcVtLm5UkM+xOuM9","/favicon.ico":"sha384-e0DOxab7uI618wwd1Lt0+rREwV1k9myViahHX+GFoxul14+FbxXyAOIdbDRGgPYP"};

const SCRIPT_RE$1 = /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g;
const LINK_RE$1 = /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g;
const _q9uSNZaSbdxFSTJP_6AdmjpFztaTls6dTgseRl_us = defineNitroPlugin((nitroApp) => {
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
const _8IZNegAnbU6Anh_Zat9wNTKtffALuDZ6iweFWfPVc = defineNitroPlugin((nitroApp) => {
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

const _cpmDnXWR7Rj1gayUbMN0lVym2EpDHhXRLyh5n6lZazM = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const _VqyoKCBndYGdYRGq85zAf02L0xfa5G6dXyQOnGigD5w = defineNitroPlugin((nitroApp) => {
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

const _g0oXN_mw1uXUcpEw37IkpSJ0tj4sLoBOj3FQEe6XQ34 = defineNitroPlugin((nitroApp) => {
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

const _bOGcPAwq_iOAmp1ZcpanqcLzooUitYU0RvoakEmoQ = defineNitroPlugin((nitroApp) => {
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

const _P3PWS2xxUET6hw75Z8N5WnevIwpwDrf7zworoOmY = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.hidePoweredBy && !event.node.res.headersSent) {
      removeResponseHeader(event, "x-powered-by");
    }
  });
});

const _tH56RVuQyAMO5nLICIm23VyOm3bSRs_VlT82x3e2VA = defineNitroPlugin(async (nitroApp) => {
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
  _ckXiAEtNtPK_2d7s0bWjOfEGn6R4Ni2bjnTEO4C6faM,
_q9uSNZaSbdxFSTJP_6AdmjpFztaTls6dTgseRl_us,
_8IZNegAnbU6Anh_Zat9wNTKtffALuDZ6iweFWfPVc,
_cpmDnXWR7Rj1gayUbMN0lVym2EpDHhXRLyh5n6lZazM,
_VqyoKCBndYGdYRGq85zAf02L0xfa5G6dXyQOnGigD5w,
_g0oXN_mw1uXUcpEw37IkpSJ0tj4sLoBOj3FQEe6XQ34,
_bOGcPAwq_iOAmp1ZcpanqcLzooUitYU0RvoakEmoQ,
_P3PWS2xxUET6hw75Z8N5WnevIwpwDrf7zworoOmY,
_tH56RVuQyAMO5nLICIm23VyOm3bSRs_VlT82x3e2VA
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
const _5OqYXk = eventHandler((event) => {
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
      throw createError({ statusCode: 404 });
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

const app = createApp();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("\u2705 Express server is running...");

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
      whiteList: void 0,
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
const _Aih2Rq = defineEventHandler((event) => {
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

const _wgscAq = defineEventHandler((event) => {
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

const _sHEOQ2 = defineEventHandler((event) => {
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
const _CmpIV2 = defineEventHandler(async (event) => {
  {
    return;
  }
});

const _Ib3cDy = defineEventHandler(async (event) => {
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

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_QD7Y49 = () => import('../routes/api/announcement-images/_id_.delete.mjs');
const _lazy_pmcMD4 = () => import('../routes/api/announcement-images/_id_.get.mjs');
const _lazy_Cwcopl = () => import('../routes/api/index.post.mjs');
const _lazy_xtArDQ = () => import('../routes/api/announcements/_id_.delete.mjs');
const _lazy_9NAIp_ = () => import('../routes/api/announcements/_id_.get.mjs');
const _lazy_CvqaeJ = () => import('../routes/api/announcements/_id_.put.mjs');
const _lazy_FNQD2S = () => import('../routes/api/index.get.mjs');
const _lazy_9S8a_f = () => import('../routes/api/index.post2.mjs');
const _lazy_nKxhyI = () => import('../routes/api/auth/login.post.mjs');
const _lazy_0jGWYz = () => import('../routes/api/auth/logout.post.mjs');
const _lazy_2FVMbF = () => import('../routes/api/auth/verify.get.mjs');
const _lazy_LvTMAW = () => import('../routes/api/banners/_id_.delete.mjs');
const _lazy_UhDLN9 = () => import('../routes/api/banners/_id_.put.mjs');
const _lazy_ezUkHa = () => import('../routes/api/index.get2.mjs');
const _lazy_Oye_HU = () => import('../routes/api/index.post3.mjs');
const _lazy_3QMh64 = () => import('../routes/api/banners/order.put.mjs');
const _lazy_q4YGlV = () => import('../routes/api/knowledge/_id_.delete.mjs');
const _lazy_7ECpS7 = () => import('../routes/api/knowledge/_id_.get.mjs');
const _lazy_aYbee2 = () => import('../routes/api/knowledge/_id_.put.mjs');
const _lazy_RGVtkl = () => import('../routes/api/knowledge/_id/image.get.mjs');
const _lazy_T4byDU = () => import('../routes/api/index.get3.mjs');
const _lazy_1vTI3v = () => import('../routes/api/index.post4.mjs');
const _lazy_nAyXgY = () => import('../routes/api/knowledge/order.put.mjs');
const _lazy_AkBF11 = () => import('../routes/api/index.get4.mjs');
const _lazy_lGpUgW = () => import('../routes/api/qa-categories/_id_.delete.mjs');
const _lazy_xX7yXr = () => import('../routes/api/qa-categories/_id_.put.mjs');
const _lazy_HCE2xP = () => import('../routes/api/index.get5.mjs');
const _lazy_t1W3es = () => import('../routes/api/index.post5.mjs');
const _lazy_9GPgXQ = () => import('../routes/api/qa-contents/_id_.delete.mjs');
const _lazy_8Cbowm = () => import('../routes/api/qa-contents/_id_.put.mjs');
const _lazy_BWfgt8 = () => import('../routes/api/index.get6.mjs');
const _lazy_s_qsNV = () => import('../routes/api/index.post6.mjs');
const _lazy_BOiXbS = () => import('../routes/api/qa.mjs');
const _lazy_qAZ10D = () => import('../routes/api/qa/_id_.delete.mjs');
const _lazy__8Tk2T = () => import('../routes/api/qa/_id_.put.mjs');
const _lazy_nf0JCs = () => import('../routes/api/index.get7.mjs');
const _lazy_NpLNNA = () => import('../routes/api/index.post7.mjs');
const _lazy_R9qOuy = () => import('../routes/api/service-unit/_id_.delete.mjs');
const _lazy_yfnylo = () => import('../routes/api/service-unit/_id_.get.mjs');
const _lazy_XZ7qzp = () => import('../routes/api/service-unit/_id_.put.mjs');
const _lazy_uSqtNT = () => import('../routes/api/service-unit/_id/price-image.get.mjs');
const _lazy_I1HtBx = () => import('../routes/api/service-unit/_id/unit-image.get.mjs');
const _lazy_I0UpHR = () => import('../routes/api/index.get8.mjs');
const _lazy_u0wZwu = () => import('../routes/api/index.post8.mjs');
const _lazy_fxCccO = () => import('../routes/api/index.get9.mjs');
const _lazy_ljIdug = () => import('../routes/api/index.post9.mjs');
const _lazy_Tdkeho = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _5OqYXk, lazy: false, middleware: true, method: undefined },
  { route: '/api/announcement-images/:id', handler: _lazy_QD7Y49, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcement-images/:id', handler: _lazy_pmcMD4, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcement-images', handler: _lazy_Cwcopl, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_xtArDQ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_9NAIp_, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_CvqaeJ, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements', handler: _lazy_FNQD2S, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_9S8a_f, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_nKxhyI, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_0jGWYz, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_2FVMbF, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners/:id', handler: _lazy_LvTMAW, lazy: true, middleware: false, method: "delete" },
  { route: '/api/banners/:id', handler: _lazy_UhDLN9, lazy: true, middleware: false, method: "put" },
  { route: '/api/banners', handler: _lazy_ezUkHa, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners', handler: _lazy_Oye_HU, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners/order', handler: _lazy_3QMh64, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id', handler: _lazy_q4YGlV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_7ECpS7, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_aYbee2, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id/image', handler: _lazy_RGVtkl, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_T4byDU, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_1vTI3v, lazy: true, middleware: false, method: "post" },
  { route: '/api/knowledge/order', handler: _lazy_nAyXgY, lazy: true, middleware: false, method: "put" },
  { route: '/api/languages', handler: _lazy_AkBF11, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories/:id', handler: _lazy_lGpUgW, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-categories/:id', handler: _lazy_xX7yXr, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-categories', handler: _lazy_HCE2xP, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories', handler: _lazy_t1W3es, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa-contents/:id', handler: _lazy_9GPgXQ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-contents/:id', handler: _lazy_8Cbowm, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-contents', handler: _lazy_BWfgt8, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-contents', handler: _lazy_s_qsNV, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_BOiXbS, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_qAZ10D, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy__8Tk2T, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_nf0JCs, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_NpLNNA, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-unit/:id', handler: _lazy_R9qOuy, lazy: true, middleware: false, method: "delete" },
  { route: '/api/service-unit/:id', handler: _lazy_yfnylo, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id', handler: _lazy_XZ7qzp, lazy: true, middleware: false, method: "put" },
  { route: '/api/service-unit/:id/price-image', handler: _lazy_uSqtNT, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id/unit-image', handler: _lazy_I1HtBx, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_I0UpHR, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_u0wZwu, lazy: true, middleware: false, method: "post" },
  { route: '/api/user-reminder', handler: _lazy_fxCccO, lazy: true, middleware: false, method: "get" },
  { route: '/api/user-reminder', handler: _lazy_ljIdug, lazy: true, middleware: false, method: "post" },
  { route: '/api', handler: app, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _Aih2Rq, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _wgscAq, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _sHEOQ2, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _CmpIV2, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _Ib3cDy, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_Tdkeho, lazy: true, middleware: false, method: undefined }
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
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
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
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
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
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

export { authenticate as a, useRuntimeConfig as b, buildAssetsURL as c, defineRenderHandler as d, baseURL as e, getRouteRules as g, publicAssetsURL as p, trapUnhandledNodeErrors as t, useNitroApp as u, verifyToken as v };
//# sourceMappingURL=nitro.mjs.map
