import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, getRequestURL, getResponseHeader, createApp, getQuery as getQuery$1, readBody, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, createError, getRouterParam, getHeader, readMultipartFormData, getCookie, setCookie, deleteCookie, setHeader, getResponseStatusText } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/@vue/shared/dist/shared.cjs.js';
import jwt from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/jsonwebtoken/index.js';
import sql from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/mssql/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, joinRelativeURL } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/server-renderer/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/vue/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/server.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/plugins.mjs';
import { walkResolver } from 'file:///Users/ginjack/Desktop/temp_acc/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/ginjack/Desktop/temp_acc/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"./public/uploads"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/ginjack/Desktop/temp_acc","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/ginjack/Desktop/temp_acc/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/ginjack/Desktop/temp_acc/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/ginjack/Desktop/temp_acc/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/ginjack/Desktop/temp_acc/.data/kv"}));

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
      "/api/**": {
        "security": {
          "xssValidator": false
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
  "jwtSecret": "your-secret-key"
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

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config$2 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$2.nitro.routeRules })
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
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
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
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
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
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
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
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
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

const _0GIUkJ8Qm2sqpE4vn5_UHX6bbWgz6TCZY8E6PoPl_m8 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/ginjack/Desktop/temp_acc";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[{"src":"/js/bootstrap.bundle.min.js","integrity":"sha256-CDOy6cOibCWEdsRiZuaHf8dSGGJRYuBGC+mjoJimHGw="},{"src":"https://www.googletagmanager.com/gtag/js?id=G-5EVH3D8JX4","async":true},{"children":"\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n            gtag('config', 'G-5EVH3D8JX4');\n          ","type":"text/javascript"},{"children":"\n            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n            })(window,document,'script','dataLayer','GTM-5LRLKWQD');\n          ","type":"text/javascript"}],"noscript":[],"title":"多元陪伴照顧服務試辦計畫","charset":"utf-8","viewport":"width=device-width, initial-scale=1"};

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
const _WxLcDAZ4eAYH5dTB4fXCsW_X_T309oE33WN1mNzl60 = (nitroApp) => {
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
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _0GIUkJ8Qm2sqpE4vn5_UHX6bbWgz6TCZY8E6PoPl_m8,
_WxLcDAZ4eAYH5dTB4fXCsW_X_T309oE33WN1mNzl60
];

const app = createApp();

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
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

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file:///Users/ginjack/Desktop/temp_acc/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file:///Users/ginjack/Desktop/temp_acc/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
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
    ssrContext.modules ||= /* @__PURE__ */ new Set();
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
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

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

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
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
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
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

const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (error) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", error);
    throw error;
  });
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
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
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
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
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_i75Uv0 = () => Promise.resolve().then(function () { return _id__delete$f; });
const _lazy_Wry4v8 = () => Promise.resolve().then(function () { return _id__get$b; });
const _lazy_uHFMIa = () => Promise.resolve().then(function () { return index_post$h; });
const _lazy_vEQmDj = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_Qcty7I = () => Promise.resolve().then(function () { return _id__get$9; });
const _lazy_berBm2 = () => Promise.resolve().then(function () { return _id__put$d; });
const _lazy_XsPDqQ = () => Promise.resolve().then(function () { return index_get$l; });
const _lazy_ojtzn8 = () => Promise.resolve().then(function () { return index_post$f; });
const _lazy_Nf0fk6 = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_ajK85o = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_a5Ikdm = () => Promise.resolve().then(function () { return verify_get$1; });
const _lazy_hPn_rK = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_ezDeHc = () => Promise.resolve().then(function () { return _id__put$b; });
const _lazy_INFU0K = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_PEREmi = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_j6KJHB = () => Promise.resolve().then(function () { return order_put$3; });
const _lazy_fYr1Ve = () => Promise.resolve().then(function () { return captcha$1; });
const _lazy_qvotFx = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_LaEbac = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_enVkWs = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_dDDY4Y = () => Promise.resolve().then(function () { return _id__put$9; });
const _lazy_oyyiXF = () => Promise.resolve().then(function () { return image_get$1; });
const _lazy_Ng09XU = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_SwnabR = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_ImWBLZ = () => Promise.resolve().then(function () { return order_put$1; });
const _lazy_S8oyGn = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_SXBw5G = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_I9h2IP = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_r76RbZ = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_2IZnTB = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_JsmWfa = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_7njCD6 = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_Xn2Rej = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_dPNvRr = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_pU6bZO = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_J6whW1 = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_Inroz9 = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_paebrr = () => Promise.resolve().then(function () { return qa$1; });
const _lazy_tROYgi = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_0Wiq_d = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_QGfrbA = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_9ObyfT = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_Xd7K9M = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_jGgiwq = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_Y1EsKE = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_iktQNM = () => Promise.resolve().then(function () { return priceImage_get$1; });
const _lazy_hO5vFD = () => Promise.resolve().then(function () { return unitImage_get$1; });
const _lazy_4hjPBW = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_mLqrme = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_nNtztb = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_wHkRFc = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_vts8zM = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/announcement-images/:id', handler: _lazy_i75Uv0, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcement-images/:id', handler: _lazy_Wry4v8, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcement-images', handler: _lazy_uHFMIa, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_vEQmDj, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_Qcty7I, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_berBm2, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements', handler: _lazy_XsPDqQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_ojtzn8, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_Nf0fk6, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_ajK85o, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_a5Ikdm, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners/:id', handler: _lazy_hPn_rK, lazy: true, middleware: false, method: "delete" },
  { route: '/api/banners/:id', handler: _lazy_ezDeHc, lazy: true, middleware: false, method: "put" },
  { route: '/api/banners', handler: _lazy_INFU0K, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners', handler: _lazy_PEREmi, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners/order', handler: _lazy_j6KJHB, lazy: true, middleware: false, method: "put" },
  { route: '/api/captcha', handler: _lazy_fYr1Ve, lazy: true, middleware: false, method: undefined },
  { route: '/api/createdb', handler: _lazy_qvotFx, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_LaEbac, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_enVkWs, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_dDDY4Y, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id/image', handler: _lazy_oyyiXF, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_Ng09XU, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_SwnabR, lazy: true, middleware: false, method: "post" },
  { route: '/api/knowledge/order', handler: _lazy_ImWBLZ, lazy: true, middleware: false, method: "put" },
  { route: '/api/languages', handler: _lazy_S8oyGn, lazy: true, middleware: false, method: "get" },
  { route: '/api/public/announcements/:id', handler: _lazy_SXBw5G, lazy: true, middleware: false, method: "get" },
  { route: '/api/public/announcements', handler: _lazy_I9h2IP, lazy: true, middleware: false, method: "get" },
  { route: '/api/public/attachments/:id', handler: _lazy_r76RbZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories/:id', handler: _lazy_2IZnTB, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-categories/:id', handler: _lazy_JsmWfa, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-categories', handler: _lazy_7njCD6, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories', handler: _lazy_Xn2Rej, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa-contents/:id', handler: _lazy_dPNvRr, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-contents/:id', handler: _lazy_pU6bZO, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-contents', handler: _lazy_J6whW1, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-contents', handler: _lazy_Inroz9, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_paebrr, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_tROYgi, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy_0Wiq_d, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_QGfrbA, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_9ObyfT, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-unit/:id', handler: _lazy_Xd7K9M, lazy: true, middleware: false, method: "delete" },
  { route: '/api/service-unit/:id', handler: _lazy_jGgiwq, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id', handler: _lazy_Y1EsKE, lazy: true, middleware: false, method: "put" },
  { route: '/api/service-unit/:id/price-image', handler: _lazy_iktQNM, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id/unit-image', handler: _lazy_hO5vFD, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_4hjPBW, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_mLqrme, lazy: true, middleware: false, method: "post" },
  { route: '/api/user-reminder', handler: _lazy_nNtztb, lazy: true, middleware: false, method: "get" },
  { route: '/api/user-reminder', handler: _lazy_wHkRFc, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_vts8zM, lazy: true, middleware: false, method: undefined },
  { route: '/api', handler: app, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_vts8zM, lazy: true, middleware: false, method: undefined }
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
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

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

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
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
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
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

const config$1 = {
  user: "sa",
  password: "yourStrong(!)Password",
  server: "localhost",
  // Docker 內部使用 'localhost'
  port: 1433,
  database: "test_two",
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
      pool = await sql.connect(config$1);
      console.log("\u2705 Connected to MSSQL");
    } catch (error) {
      console.error("\u274C Database connection failed:", error);
      throw error;
    }
  }
  return pool;
}

const db = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getConnection: getConnection
});

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
          file_type,
          original_filename,
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
async function saveAnnouncementImage(announcement_id, image_id, image_content, file_type = "image", original_filename = null) {
  try {
    const pool = await getConnection();
    await pool.request().input("announcement_id", sql.Int, announcement_id).input("image_id", sql.VarChar(50), image_id).input("image_content", sql.VarBinary(sql.MAX), image_content).input("file_type", sql.VarChar(10), file_type).input("original_filename", sql.NVarChar(255), original_filename).query(`
        INSERT INTO AnnouncementImages (
          announcement_id, image_id, image_content, file_type, original_filename
        )
        VALUES (
          @announcement_id, @image_id, @image_content, @file_type, @original_filename
        );
      `);
    return { success: true };
  } catch (err) {
    console.error("\u274C DB Save Announcement File Error:", err);
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
          file_type,
          original_filename,
          created_at
        FROM AnnouncementImages
        WHERE announcement_id = @announcement_id 
        AND is_deleted = 0
        ORDER BY created_at DESC;
      `);
    return result.recordset;
  } catch (err) {
    console.error("\u274C Get Announcement Files Error:", err);
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

const _id__get$a = defineEventHandler(async (event) => {
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

const _id__get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$a
});

const index_post$g = defineEventHandler(async (event) => {
  var _a, _b;
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
    const announcementIdField = formData.find((f) => f.name === "announcement_id");
    const imageIdField = formData.find((f) => f.name === "image_id");
    const imageField = formData.find((f) => f.name === "image");
    const fileTypeField = formData.find((f) => f.name === "file_type");
    const filenameField = formData.find((f) => f.name === "filename");
    const missingFields = [];
    if (!(announcementIdField == null ? void 0 : announcementIdField.data)) missingFields.push("announcement_id");
    if (!(imageIdField == null ? void 0 : imageIdField.data)) missingFields.push("image_id");
    if (!(imageField == null ? void 0 : imageField.data)) missingFields.push("image");
    if (missingFields.length > 0) {
      console.error("\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D:", missingFields);
      throw createError({
        statusCode: 400,
        message: `\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D: ${missingFields.join(", ")}`
      });
    }
    const announcement_id = parseInt(announcementIdField.data.toString());
    const image_id = imageIdField.data.toString();
    const imageBuffer = imageField.data;
    const file_type = ((_a = fileTypeField == null ? void 0 : fileTypeField.data) == null ? void 0 : _a.toString()) || "image";
    const original_filename = ((_b = filenameField == null ? void 0 : filenameField.data) == null ? void 0 : _b.toString()) || null;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (!allowedTypes.includes(imageField.type)) {
      throw createError({
        statusCode: 400,
        message: "\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B\uFF0C\u53EA\u5141\u8A31\u4E0A\u50B3\u5716\u7247\u6A94\u6848\uFF08JPG\u3001PNG\u3001GIF\uFF09\u6216 PDF \u6A94\u6848"
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (imageBuffer.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: "\u6A94\u6848\u5927\u5C0F\u4E0D\u80FD\u8D85\u904E 5MB"
      });
    }
    console.log(`\u6536\u5230\u6A94\u6848 image_id: ${image_id}, \u985E\u578B: ${imageField.type}, \u6A94\u6848\u985E\u578B: ${file_type}, \u6A94\u540D: ${original_filename}, \u5927\u5C0F: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
    await saveAnnouncementImage(
      announcement_id,
      image_id,
      imageBuffer,
      file_type,
      original_filename
    );
    return {
      success: true,
      data: {
        announcement_id,
        image_id,
        file_type,
        original_filename
      }
    };
  } catch (error) {
    console.error("\u274C Save Announcement File Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u4FDD\u5B58\u516C\u544A\u6A94\u6848\u5931\u6557"
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

const _id__get$8 = defineEventHandler(async (event) => {
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

const _id__get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$8
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

const index_get$k = defineEventHandler(async (event) => {
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

const index_get$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$k
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
        FROM OfficerUsers
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
    const { username, password, captcha } = body;
    const storedCaptcha = getCookie(event, "captcha");
    if (!storedCaptcha || storedCaptcha.toLowerCase() !== (captcha == null ? void 0 : captcha.toLowerCase())) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u9A57\u8B49\u78BC\u932F\u8AA4"
      });
    }
    setCookie(event, "captcha", "", { maxAge: 0, path: "/" });
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
    result = await pool.request().query(`
      SELECT 
        id,
        title,
        CAST(image_content as varbinary(max)) as imageData,
        link,
        order_num as sortOrder,
        created_at as createdAt,
        updated_at as updatedAt
      FROM Banners
      WHERE is_deleted = 0
      ORDER BY order_num ASC, id DESC;
    `);
    return result.recordset;
  } catch (error) {
    console.error("\u274C Get All Banners Error:", error);
    throw error;
  }
}
async function createBanner({
  title,
  link,
  imageData
}) {
  try {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);
    try {
      await transaction.begin();
      const maxOrderResult = await transaction.request().query(`
          SELECT ISNULL(MAX(order_num), 0) + 1 as nextOrder
          FROM Banners
          WHERE is_deleted = 0
        `);
      const nextOrder = maxOrderResult.recordset[0].nextOrder;
      const result = await transaction.request().input("title", sql.NVarChar(200), title).input("link", sql.NVarChar(500), link).input("imageData", sql.VarBinary(sql.MAX), imageData).input("sortOrder", sql.Int, nextOrder).query(`
          INSERT INTO Banners (
            title,
            link,
            image_content,
            order_num,
            created_at,
            updated_at,
            is_deleted
          )
          OUTPUT 
            INSERTED.id,
            INSERTED.title,
            INSERTED.link,
            CAST(INSERTED.image_content as varbinary(max)) as imageData,
            INSERTED.order_num as sortOrder,
            INSERTED.created_at as createdAt,
            INSERTED.updated_at as updatedAt
          VALUES (
            @title,
            @link,
            @imageData,
            @sortOrder,
            GETDATE(),
            GETDATE(),
            0
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
        SELECT id, order_num
        FROM Banners
        WHERE id = @id AND is_deleted = 0
      `);
    if (currentBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u6307\u5B9A\u7684 Banner");
    }
    const currentOrder = currentBanner.recordset[0].order_num;
    const targetBanner = await transaction.request().input("targetOrder", sql.Int, targetOrder).query(`
        SELECT id, order_num
        FROM Banners
        WHERE order_num = @targetOrder AND is_deleted = 0
      `);
    if (targetBanner.recordset.length === 0) {
      throw new Error("\u627E\u4E0D\u5230\u76EE\u6A19\u6392\u5E8F\u7684 Banner");
    }
    const targetBannerId = targetBanner.recordset[0].id;
    await transaction.request().input("id1", sql.Int, id).input("order1", sql.Int, targetOrder).input("id2", sql.Int, targetBannerId).input("order2", sql.Int, currentOrder).query(`
        UPDATE b
        SET order_num = CASE
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
          CAST(image_content as varbinary(max)) as imageData,
          link,
          order_num as sortOrder,
          created_at as createdAt,
          updated_at as updatedAt
        FROM Banners
        WHERE id IN (@id1, @id2) AND is_deleted = 0
        ORDER BY order_num;
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
  var _a, _b, _c, _d;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const sortOrder = parseInt(((_c = formData.find((f) => f.name === "sortOrder")) == null ? void 0 : _c.data.toString()) || "0");
    const isActive = ((_d = formData.find((f) => f.name === "is_active")) == null ? void 0 : _d.data.toString()) === "1";
    if (!title || !(imageFile == null ? void 0 : imageFile.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D\uFF08title \u6216 image\uFF09"
      });
    }
    console.log(`\u2705 \u6536\u5230\u5716\u7247 ${imageFile.filename || ""} (${imageFile.type}), \u5927\u5C0F ${(imageFile.data.length / 1024).toFixed(2)} KB`);
    const data = await createBanner({
      title,
      description,
      imageData: imageFile.data,
      imageType: imageFile.type,
      sortOrder,
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

const _id__put$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put$a
});

const index_get$i = defineEventHandler(async (event) => {
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

const index_get$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$i
});

const index_post$c = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const title = (_a = formData.find((f) => f.name === "title")) == null ? void 0 : _a.data.toString();
    const description = (_b = formData.find((f) => f.name === "description")) == null ? void 0 : _b.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const sortOrder = parseInt(((_c = formData.find((f) => f.name === "sortOrder")) == null ? void 0 : _c.data.toString()) || "0");
    const isActive = ((_d = formData.find((f) => f.name === "is_active")) == null ? void 0 : _d.data.toString()) === "1";
    if (!title || !(imageFile == null ? void 0 : imageFile.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D\uFF08title \u6216 image\uFF09"
      });
    }
    console.log(`\u2705 \u6536\u5230\u5716\u7247 ${imageFile.filename || ""} (${imageFile.type}), \u5927\u5C0F ${(imageFile.data.length / 1024).toFixed(2)} KB`);
    const data = await createBanner({
      title,
      description,
      imageData: imageFile.data,
      imageType: imageFile.type,
      sortOrder,
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

const captcha = defineEventHandler(async (event) => {
  try {
    const code = Math.random().toString().slice(2, 6);
    const svg = `
      <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" fill="#f0f0f0"/>
        ${generateNoise()}
        ${generateText(code)}
      </svg>
    `;
    setCookie(event, "captcha", code, { httpOnly: true, path: "/" });
    event.node.res.setHeader("Content-Type", "image/svg+xml");
    event.node.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    event.node.res.setHeader("Pragma", "no-cache");
    event.node.res.setHeader("Expires", "0");
    return svg;
  } catch (error) {
    console.error("Captcha generation error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate captcha"
    });
  }
});
function generateNoise() {
  let noise = "";
  for (let i = 0; i < 5; i++) {
    const x1 = Math.floor(Math.random() * 120);
    const y1 = Math.floor(Math.random() * 40);
    const x2 = Math.floor(Math.random() * 120);
    const y2 = Math.floor(Math.random() * 40);
    noise += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#999" stroke-width="1"/>`;
  }
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(Math.random() * 120);
    const y = Math.floor(Math.random() * 40);
    noise += `<circle cx="${x}" cy="${y}" r="1" fill="#999"/>`;
  }
  return noise;
}
function generateText(code) {
  let text = "";
  for (let i = 0; i < code.length; i++) {
    const x = 20 + i * 25;
    const y = 25;
    const rotate = Math.random() * 30 - 15;
    text += `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" font-family="Arial" font-size="20" fill="#333">${code[i]}</text>`;
  }
  return text;
}

const captcha$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: captcha
});

const config = {
  user: "accompanyservice",
  password: "!QAZ8520@wsx",
  server: "172.21.50.165",
  // Docker 內部使用 'localhost'
  port: 1433,
  database: "accompanyservice",
  options: {
    encrypt: false,
    // 若有 SSL 問題請設為 false
    trustServerCertificate: true
  }
};
async function initializeDatabase() {
  let pool;
  let transaction;
  try {
    console.log("\u958B\u59CB\u9023\u63A5\u8CC7\u6599\u5EAB...");
    pool = await sql.connect(config);
    transaction = new sql.Transaction(pool);
    console.log("\u958B\u59CB\u4EA4\u6613...");
    await transaction.begin();
    console.log("\u958B\u59CB\u522A\u9664\u5916\u9375\u7D04\u675F...");
    try {
      await transaction.request().query(`
        DECLARE @sql NVARCHAR(MAX) = '';
        SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id))
          + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) 
          + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';'
        FROM sys.foreign_keys;
        EXEC sp_executesql @sql;
      `);
      console.log("\u2705 \u6240\u6709\u5916\u9375\u7D04\u675F\u5DF2\u522A\u9664");
    } catch (error) {
      console.error("\u522A\u9664\u5916\u9375\u7D04\u675F\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u958B\u59CB\u522A\u9664\u73FE\u6709\u8868\u683C...");
    try {
      await transaction.request().query(`
        IF OBJECT_ID('user_reminders', 'U') IS NOT NULL DROP TABLE user_reminders;
        IF OBJECT_ID('announcements', 'U') IS NOT NULL DROP TABLE announcements;
        IF OBJECT_ID('officerusers', 'U') IS NOT NULL DROP TABLE officerusers;
        IF OBJECT_ID('languages', 'U') IS NOT NULL DROP TABLE languages;
        IF OBJECT_ID('banners', 'U') IS NOT NULL DROP TABLE banners;
        IF OBJECT_ID('qa', 'U') IS NOT NULL DROP TABLE qa;
        IF OBJECT_ID('qa_categories', 'U') IS NOT NULL DROP TABLE qa_categories;
        IF OBJECT_ID('qa_contents', 'U') IS NOT NULL DROP TABLE qa_contents;
        IF OBJECT_ID('knowledge', 'U') IS NOT NULL DROP TABLE knowledge;
        IF OBJECT_ID('service_units', 'U') IS NOT NULL DROP TABLE service_units;
        IF OBJECT_ID('announcement_images', 'U') IS NOT NULL DROP TABLE announcement_images;
      `);
      console.log("\u2705 \u6240\u6709\u8868\u683C\u522A\u9664\u5B8C\u6210");
    } catch (error) {
      console.error("\u522A\u9664\u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u958B\u59CB\u5275\u5EFA\u65B0\u8868\u683C...");
    try {
      await transaction.request().query(`
        CREATE TABLE OfficerUsers (
          password varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          [role] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          username varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          uid int NULL
        )
      `);
      console.log("\u2705 Users \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Users \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE Languages (
          id int IDENTITY(1,1) NOT NULL,
          code varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          name nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__Language__3213E83F5E39B80C PRIMARY KEY (id),
          CONSTRAINT UQ__Language__357D4CF9D2859F6D UNIQUE (code)
        )
      `);
      console.log("\u2705 Languages \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Languages \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE Banners (
          id int IDENTITY(1,1) NOT NULL,
          title nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          description nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          image_data varbinary(MAX) NULL,
          image_type nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          sort_order int DEFAULT 0 NULL,
          is_active bit DEFAULT 1 NULL,
          is_deleted bit DEFAULT 0 NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          CONSTRAINT PK__Banners__3213E83FE0E992A3 PRIMARY KEY (id)
        )
      `);
      console.log("\u2705 Banners \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Banners \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE Announcements (
          id int IDENTITY(1,1) NOT NULL,
          publish_date varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          activity_start_date varchar(10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          category nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          content nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          title nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          link nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          image_id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          linkTitle nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__Announce__3213E83F9812D79E PRIMARY KEY (id)
        )
      `);
      console.log("\u2705 Announcements \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA Announcements \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE AnnouncementImages (
          id int IDENTITY(1,1) NOT NULL,
          announcement_id int NOT NULL,
          image_id varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          image_content varbinary(MAX) NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__Announce__3213E83F3BEB8D9B PRIMARY KEY (id),
          CONSTRAINT FK__Announcem__annou__5070F446 FOREIGN KEY (announcement_id) REFERENCES Announcements(id)
        );
        CREATE NONCLUSTERED INDEX IX_AnnouncementImages_ImageId ON AnnouncementImages (image_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
      `);
      console.log("\u2705 AnnouncementImages \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA AnnouncementImages \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE QACategories (
          id int IDENTITY(1,1) NOT NULL,
          parent_id int NULL,
          name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          name_en nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_vi nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          name_th nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__QACatego__3213E83FF77C39C8 PRIMARY KEY (id),
          CONSTRAINT FK__QACategor__paren__5BE2A6F2 FOREIGN KEY (parent_id) REFERENCES QACategories(id)
        )
      `);
      console.log("\u2705 QACategories \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QACategories \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE QA (
          question varchar(128) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          answer varchar(512) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          category int NULL,
          created_at varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          id int IDENTITY(1,1) NOT NULL,
          CONSTRAINT PK__QA__3213E83F924C792C PRIMARY KEY (id)
        )
      `);
      console.log("\u2705 QA \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QA \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE QAContents (
          id int IDENTITY(1,1) NOT NULL,
          category_id int NOT NULL,
          language_id int NOT NULL,
          question nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          answer nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          sort_order int DEFAULT 0 NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          is_deleted bit DEFAULT 0 NULL,
          CONSTRAINT PK__QAConten__3213E83F15E47525 PRIMARY KEY (id),
          CONSTRAINT FK__QAContent__categ__628FA481 FOREIGN KEY (category_id) REFERENCES QACategories(id),
          CONSTRAINT FK__QAContent__langu__6383C8BA FOREIGN KEY (language_id) REFERENCES Languages(id)
        );
        CREATE NONCLUSTERED INDEX idx_qa_category ON QAContents (category_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
        CREATE NONCLUSTERED INDEX idx_qa_language ON QAContents (language_id ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
        CREATE NONCLUSTERED INDEX idx_qa_sort ON QAContents (sort_order ASC)
          WITH (PAD_INDEX = OFF, FILLFACTOR = 100, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, STATISTICS_NORECOMPUTE = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
          ON [PRIMARY];
      `);
      console.log("\u2705 QAContents \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA QAContents \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE knowledge (
          kid int IDENTITY(1,1) NOT NULL,
          know_category int NOT NULL,
          image_type varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          image_data varbinary(MAX) NOT NULL,
          created_at datetime DEFAULT getdate() NOT NULL,
          updated_at datetime NOT NULL,
          title nvarchar(50) COLLATE Chinese_Taiwan_Stroke_CI_AS NULL,
          display_order int DEFAULT 0 NULL,
          image_url varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          CONSTRAINT PK__knowledg__DFDFDF3E7412647D PRIMARY KEY (kid)
        )
      `);
      console.log("\u2705 knowledge \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA knowledge \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE service_units (
          id int IDENTITY(1,1) NOT NULL,
          name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          unit_image varbinary(MAX) NULL,
          category nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          region nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          service_area nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          address nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          phone nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          email nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          description nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          website nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
          price_image varbinary(MAX) NULL,
          created_at datetime DEFAULT getdate() NULL,
          updated_at datetime DEFAULT getdate() NULL,
          CONSTRAINT PK__service___3213E83FC7684B48 PRIMARY KEY (id)
        )
      `);
      console.log("\u2705 service_units \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA service_units \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    try {
      await transaction.request().query(`
        CREATE TABLE user_reminders (
          id int IDENTITY(1,1) NOT NULL,
          content nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
          created_at datetime2 DEFAULT getdate() NULL,
          updated_at datetime2 DEFAULT getdate() NULL,
          CONSTRAINT PK__user_rem__3213E83FA474AAFD PRIMARY KEY (id)
        )
      `);
      console.log("\u2705 user_reminders \u8868\u683C\u5275\u5EFA\u5B8C\u6210");
    } catch (error) {
      console.error("\u5275\u5EFA user_reminders \u8868\u683C\u6642\u767C\u751F\u932F\u8AA4:", error);
      throw error;
    }
    console.log("\u63D0\u4EA4\u4EA4\u6613...");
    await transaction.commit();
    console.log("\u2705 \u4EA4\u6613\u63D0\u4EA4\u6210\u529F");
    console.log("\u6AA2\u67E5\u662F\u5426\u9700\u8981\u5275\u5EFA\u9810\u8A2D\u5E33\u865F...");
    const checkUser = await pool.request().query("SELECT COUNT(*) as cnt FROM officerusers");
    if (checkUser.recordset[0].cnt === 0) {
      console.log("\u958B\u59CB\u5275\u5EFA\u9810\u8A2D\u5E33\u865F...");
      await pool.request().query(`
        INSERT INTO officerusers (username, password, role)
        VALUES ('adminUser', 'strong(Password)', 'admin')
      `);
      console.log("\u2705 \u9810\u8A2D\u7BA1\u7406\u54E1\u5E33\u865F\u5275\u5EFA\u5B8C\u6210");
    } else {
      console.log("\u5DF2\u6709\u6578\u64DA\u5B58\u5728\uFF0C\u8DF3\u904E\u9810\u8A2D\u5E33\u865F\u5275\u5EFA");
    }
  } catch (error) {
    console.error("\u274C \u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5931\u6557:", error);
    if (transaction) {
      try {
        console.log("\u5617\u8A66\u56DE\u6EFE\u4EA4\u6613...");
        await transaction.rollback();
        console.log("\u2705 \u4EA4\u6613\u56DE\u6EFE\u6210\u529F");
      } catch (rollbackError) {
        console.error("\u4EA4\u6613\u56DE\u6EFE\u5931\u6557:", rollbackError);
      }
    }
    throw error;
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log("\u8CC7\u6599\u5EAB\u9023\u63A5\u5DF2\u95DC\u9589");
      } catch (closeError) {
        console.error("\u95DC\u9589\u8CC7\u6599\u5EAB\u9023\u63A5\u6642\u767C\u751F\u932F\u8AA4:", closeError);
      }
    }
  }
}

const index_get$g = defineEventHandler(async (event) => {
  try {
    initializeDatabase().catch((error) => {
      console.error("\u274C \u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5931\u6557:", error);
      process.exit(1);
    });
    return { success: true, data };
  } catch (error) {
    console.error("Get Knowledge List Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u7372\u53D6\u77E5\u8B58\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
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

const _id__get$6 = defineEventHandler(async (event) => {
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

const _id__get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$6
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

const index_get$e = defineEventHandler(async (event) => {
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

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

const index_post$a = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await authenticate(event);
    const formData = await readMultipartFormData(event);
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
    const know_category = (_a = formData.find((f) => f.name === "know_category")) == null ? void 0 : _a.data.toString();
    const imageFile = formData.find((f) => f.name === "image");
    const title = (_b = formData.find((f) => f.name === "title")) == null ? void 0 : _b.data.toString();
    const image_url = (_c = formData.find((f) => f.name === "image_url")) == null ? void 0 : _c.data.toString();
    if (!know_category || !(imageFile == null ? void 0 : imageFile.data)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const originalSizeKB = (imageFile.data.length / 1024).toFixed(2);
    console.log(`\u{1F4F7} \u6536\u5230\u5716\u7247\uFF1A${imageFile.filename || ""}`);
    console.log(`\u2705 \u985E\u578B\uFF1A${imageFile.type}`);
    console.log(`\u2705 \u539F\u59CB\u5927\u5C0F\uFF1A${originalSizeKB} KB`);
    const data = await createKnowledge({
      know_category: parseInt(know_category),
      imageBuffer: imageFile.data,
      imageType: imageFile.type,
      title,
      image_url: image_url || null
    });
    return {
      success: true,
      data,
      imageInfo: {
        originalSize: `${originalSizeKB} KB`,
        compressedSize: null,
        compressionRatio: null
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

const index_get$c = defineEventHandler(async (event) => {
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

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
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
    if (announcement.images && announcement.images.length > 0) {
      announcement.images = announcement.images.map((image) => ({
        id: image.id,
        image_id: image.image_id,
        file_type: image.file_type || "image",
        original_filename: image.original_filename,
        image_content: {
          data: Array.from(image.image_content)
          // 轉換為陣列格式
        },
        created_at: image.created_at
      }));
    }
    return {
      success: true,
      data: announcement
    };
  } catch (error) {
    console.error("\u274C Get Public Announcement Detail Error:", error);
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

const index_get$a = defineEventHandler(async (event) => {
  try {
    const announcements = await getAllAnnouncements();
    return {
      success: true,
      data: announcements
    };
  } catch (error) {
    console.error("\u274C Get Public Announcements Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u7372\u53D6\u516C\u544A\u5217\u8868\u5931\u6557"
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const _id__get$2 = defineEventHandler(async (event) => {
  try {
    const attachmentId = parseInt(event.context.params.id);
    if (!attachmentId || isNaN(attachmentId)) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7121\u6548\u7684\u9644\u4EF6 ID"
      });
    }
    const { getConnection } = await Promise.resolve().then(function () { return db; });
    const pool = await getConnection();
    const result = await pool.request().input("id", sql.Int, attachmentId).query(`
        SELECT 
          id,
          image_id,
          image_content,
          file_type,
          original_filename
        FROM AnnouncementImages
        WHERE id = @id AND is_deleted = 0
      `);
    const attachment = result.recordset[0];
    if (!attachment) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u9644\u4EF6"
      });
    }
    const contentType = attachment.file_type === "pdf" ? "application/pdf" : "image/jpeg";
    const filename = attachment.original_filename || `attachment-${attachment.id}.${attachment.file_type === "pdf" ? "pdf" : "jpg"}`;
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
    setHeader(event, "Cache-Control", "public, max-age=31536000");
    return attachment.image_content;
  } catch (error) {
    console.error("\u274C Download Attachment Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u4E0B\u8F09\u9644\u4EF6\u5931\u6557"
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$2
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
    const { parent_id, name, name_en, name_vi, name_id, name_th } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D"
      });
    }
    const data = await createQACategory({
      parent_id: parent_id || null,
      name,
      name_en,
      name_vi,
      name_id,
      name_th
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
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
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
    let unitImageBuffer = null;
    if (unitImageFile == null ? void 0 : unitImageFile.data) {
      const size = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4F7} \u55AE\u4F4D\u5716\u7247: ${size} KB, \u985E\u578B: ${unitImageFile.type}`);
      unitImageBuffer = unitImageFile.data;
    }
    let priceImageBuffer = null;
    if (priceImageFile == null ? void 0 : priceImageFile.data) {
      const size = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4F7} \u50F9\u683C\u5716\u7247: ${size} KB, \u985E\u578B: ${priceImageFile.type}`);
      priceImageBuffer = priceImageFile.data;
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
    if (!formData) throw createError({ statusCode: 400, statusMessage: "No form data" });
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
      throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u6B04\u4F4D" });
    }
    let unitImageBuffer = null;
    if (unitImageFile == null ? void 0 : unitImageFile.data) {
      const size = (unitImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4E6} \u55AE\u4F4D\u5716\u7247\u5927\u5C0F: ${size} KB, \u985E\u578B: ${unitImageFile.type}`);
      unitImageBuffer = unitImageFile.data;
    }
    let priceImageBuffer = null;
    if (priceImageFile == null ? void 0 : priceImageFile.data) {
      const size = (priceImageFile.data.length / 1024).toFixed(2);
      console.log(`\u{1F4E6} \u50F9\u683C\u5716\u7247\u5927\u5C0F: ${size} KB, \u985E\u578B: ${priceImageFile.type}`);
      priceImageBuffer = priceImageFile.data;
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

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    ssrContext.head.push({
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
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
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
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
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

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});
//# sourceMappingURL=index.mjs.map
