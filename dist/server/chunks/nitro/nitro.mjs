import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import jwt from 'jsonwebtoken';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, relative, join } from 'node:path';
import { watch as watch$1 } from 'chokidar';
import anymatch from 'anymatch';
import { LRUCache } from 'lru-cache';
import { webcrypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { FilterXSS } from 'xss';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse(body, boundary);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return undefined;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse$1(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    appendResponseHeader(event, name, value);
  }
}
const appendHeaders = appendResponseHeaders;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

function resolveCorsOptions(options = {}) {
  const defaultOptions = {
    origin: "*",
    methods: "*",
    allowHeaders: "*",
    exposeHeaders: "*",
    credentials: false,
    maxAge: false,
    preflight: {
      statusCode: 204
    }
  };
  return defu(options, defaultOptions);
}
function isPreflightRequest(event) {
  const origin = getRequestHeader(event, "origin");
  const accessControlRequestMethod = getRequestHeader(
    event,
    "access-control-request-method"
  );
  return event.method === "OPTIONS" && !!origin && !!accessControlRequestMethod;
}
function isCorsOriginAllowed(origin, options) {
  const { origin: originOption } = options;
  if (!origin || !originOption || originOption === "*" || originOption === "null") {
    return true;
  }
  if (Array.isArray(originOption)) {
    return originOption.some((_origin) => {
      if (_origin instanceof RegExp) {
        return _origin.test(origin);
      }
      return origin === _origin;
    });
  }
  return originOption(origin);
}
function createOriginHeaders(event, options) {
  const { origin: originOption } = options;
  const origin = getRequestHeader(event, "origin");
  if (!origin || !originOption || originOption === "*") {
    return { "access-control-allow-origin": "*" };
  }
  if (typeof originOption === "string") {
    return { "access-control-allow-origin": originOption, vary: "origin" };
  }
  return isCorsOriginAllowed(origin, options) ? { "access-control-allow-origin": origin, vary: "origin" } : {};
}
function createMethodsHeaders(options) {
  const { methods } = options;
  if (!methods) {
    return {};
  }
  if (methods === "*") {
    return { "access-control-allow-methods": "*" };
  }
  return methods.length > 0 ? { "access-control-allow-methods": methods.join(",") } : {};
}
function createCredentialsHeaders(options) {
  const { credentials } = options;
  if (credentials) {
    return { "access-control-allow-credentials": "true" };
  }
  return {};
}
function createAllowHeaderHeaders(event, options) {
  const { allowHeaders } = options;
  if (!allowHeaders || allowHeaders === "*" || allowHeaders.length === 0) {
    const header = getRequestHeader(event, "access-control-request-headers");
    return header ? {
      "access-control-allow-headers": header,
      vary: "access-control-request-headers"
    } : {};
  }
  return {
    "access-control-allow-headers": allowHeaders.join(","),
    vary: "access-control-request-headers"
  };
}
function createExposeHeaders(options) {
  const { exposeHeaders } = options;
  if (!exposeHeaders) {
    return {};
  }
  if (exposeHeaders === "*") {
    return { "access-control-expose-headers": exposeHeaders };
  }
  return { "access-control-expose-headers": exposeHeaders.join(",") };
}
function appendCorsPreflightHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
  appendHeaders(event, createMethodsHeaders(options));
  appendHeaders(event, createAllowHeaderHeaders(event, options));
}
function appendCorsHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
}

function handleCors(event, options) {
  const _options = resolveCorsOptions(options);
  if (isPreflightRequest(event)) {
    appendCorsPreflightHeaders(event, options);
    sendNoContent(event, _options.preflight.statusCode);
    return true;
  }
  appendCorsHeaders(event, options);
  return false;
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function fromNodeMiddleware(handler) {
  if (isEventHandler(handler)) {
    return handler;
  }
  if (typeof handler !== "function") {
    throw new TypeError(
      "Invalid handler. It should be a function:",
      handler
    );
  }
  return eventHandler((event) => {
    return callNodeListener(
      handler,
      event.node.req,
      event.node.res
    );
  });
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}
function callNodeListener(handler, req, res) {
  const isMiddleware = handler.length > 2;
  return new Promise((resolve, reject) => {
    const next = (err) => {
      if (isMiddleware) {
        res.off("close", next);
        res.off("error", next);
      }
      return err ? reject(createError$1(err)) : resolve(undefined);
    };
    try {
      const returned = handler(req, res, next);
      if (isMiddleware && returned === void 0) {
        res.once("close", next);
        res.once("error", next);
      } else {
        resolve(returned);
      }
    } catch (error) {
      next(error);
    }
  });
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

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

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

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
    "buildId": "4409920b-6d39-404c-8616-00e03a2d9d16",
    "buildAssetsDir": "/assets/",
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
          "cache-control": "public, max-age=31536000, immutable",
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
      "/assets/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/assets/builds/**": {
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

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$3 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$3,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["nuxt-security:headers.json"]: {
    import: () => import('../raw/headers.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"8658-kg4Mu5KxQ7oRf690P6648ZS0V+E\"","mtime":"2025-04-10T07:35:54.322Z"}
  }
};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE$1 = /\.\.:|\.\.$/;
const DRIVER_NAME$2 = "fs";
const unstorage_47drivers_47fs = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME$2, "base");
  }
  if (!opts.ignore) {
    opts.ignore = ["**/node_modules/**", "**/.git/**"];
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE$1.test(key)) {
      throw createError(
        DRIVER_NAME$2,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  let _watcher;
  const _unwatch = async () => {
    if (_watcher) {
      await _watcher.close();
      _watcher = void 0;
    }
  };
  return {
    name: DRIVER_NAME$2,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), anymatch(opts.ignore || []));
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    },
    async dispose() {
      if (_watcher) {
        await _watcher.close();
      }
    },
    async watch(callback) {
      if (_watcher) {
        return _unwatch;
      }
      await new Promise((resolve2, reject) => {
        _watcher = watch$1(opts.base, {
          ignoreInitial: true,
          ignored: opts.ignore,
          ...opts.watchOptions
        }).on("ready", () => {
          resolve2();
        }).on("error", reject).on("all", (eventName, path) => {
          path = relative(opts.base, path);
          if (eventName === "change" || eventName === "add") {
            callback("update", path);
          } else if (eventName === "unlink") {
            callback("remove", path);
          }
        });
      });
      return _unwatch;
    }
  };
});

const DRIVER_NAME$1 = "lru-cache";
const unstorage_47drivers_47lru_45cache = defineDriver((opts = {}) => {
  const cache = new LRUCache({
    max: 1e3,
    sizeCalculation: opts.maxSize || opts.maxEntrySize ? (value, key) => {
      return key.length + byteLength(value);
    } : void 0,
    ...opts
  });
  return {
    name: DRIVER_NAME$1,
    options: opts,
    getInstance: () => cache,
    hasItem(key) {
      return cache.has(key);
    },
    getItem(key) {
      return cache.get(key) ?? null;
    },
    getItemRaw(key) {
      return cache.get(key) ?? null;
    },
    setItem(key, value) {
      cache.set(key, value);
    },
    setItemRaw(key, value) {
      cache.set(key, value);
    },
    removeItem(key) {
      cache.delete(key);
    },
    getKeys() {
      return [...cache.keys()];
    },
    clear() {
      cache.clear();
    },
    dispose() {
      cache.clear();
    }
  };
});
function byteLength(value) {
  if (typeof Buffer !== "undefined") {
    try {
      return Buffer.byteLength(value);
    } catch {
    }
  }
  try {
    return typeof value === "string" ? value.length : JSON.stringify(value).length;
  } catch {
  }
  return 0;
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/ginjack/Desktop/accompany-web-site/public/uploads","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('#rate-limiter-storage', unstorage_47drivers_47lru_45cache({"driver":"lruCache"}));
storage$1.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/ginjack/Desktop/accompany-web-site/.data/kv"}));

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

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
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
        const query = getQuery$1(event.path);
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
        const query = getQuery$1(event.path);
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
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
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
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

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
    throw createError$1({
      statusCode: 401,
      statusMessage: "\u672A\u63D0\u4F9B\u8A8D\u8B49\u4EE4\u724C"
    });
  }
  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw createError$1({
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
    const router = createRouter$1({ routes: structuredClone(nitroAppSecurityOptions) });
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
    const router = createRouter$1({ routes: routeNames });
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

const sriHashes = {"/assets/builds/meta/4409920b-6d39-404c-8616-00e03a2d9d16.json":"sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w","/assets/0ATdO7Vo.js":"sha384-pfoSgCeMuykDe/amLkISY/LyKS45eip4pGllEQHfWzrwRnhWJtK5//vStyCyjXum","/assets/0viJ7nPK.js":"sha384-EhVES2mLoDAvM7vd2WOaslat6XMhU5HIfjRZPUos91QK/g5cXjd9L7QtWljLUvFC","/assets/219hlGHe.js":"sha384-0zYQSCwuwT6e8sSitDKLHnbxByUxm5uQB13pAJhpoTd10c63U+kO6ykKLhL/cRhB","/assets/7z-q6ocz.js":"sha384-jStgZLVwikioyS0AVq3wrQh1kle6jHNieeD6O+KoUKOjqUyujusxXTSsiMTb4aKn","/assets/B-sX5vor.js":"sha384-Ha5ZbwujNO+3xwBlj3GkjAfxSjoNJZ3iwA0WE7jlHpSpczvHvs/fefbF5qVc4dP9","/assets/B1ScbXnb.js":"sha384-MN1dIwG/WdZL8PDQp/QhbB1b5Q1ZY1gX+RUaWtEQmxUHZ3pCs3JtK3RizWaJsPXi","/assets/B7ziI6Hm.js":"sha384-78EKgV+wZwIkJsVSLbn6FYTkRH/nFUmdRUqVgTAEPaEBepb+Yd/1Kbf6TECk8Br+","/assets/BDT3iC5Q.js":"sha384-kXhdYdoJZfc7IgaQeT3e2Sv6Ch5sgL1AnSM+w90O3p2wy6gK45JHRBst7JENSPYh","/assets/BLyYiy36.js":"sha384-gepXPAagUMY6AQzTjUqED7x7VnGhKM2zyxJ7KPV+x7zmaHFRbe3LuaPYoRF/HDWm","/assets/BN7Z8gnC.js":"sha384-O6Svd+vmhM0bNzSE3zkllqTsaBttncTLgk2NV3BoF5X9MMwimpE4zPXV42OjTMkQ","/assets/BRYC6yZa.js":"sha384-zxSwPCCMqRrEFVicoQoChqR/Fcp/8DNJM2B+rJKHMmvPMs227AOTY+uoponESGZd","/assets/BRpvjwHO.js":"sha384-lRjYrMZNzv+jTv2Kvt+nTTSTJYvrm6etrowLZRx/CeiQ9sc7IzbIs38XySheqP7R","/assets/BSZ7hnS4.js":"sha384-T+aFs4HeV28wsn/UD29KUQEYau5SfrANR4g4AojXWhd7Jjfo3MFCkMGQ199iQQ/0","/assets/BSh0tAnX.js":"sha384-LxE9RqEiWuDTeQfb6a0/n1G9jokHyzrA/ysKbolYqc3NAvEMsvEXRxquZUwJFr7P","/assets/B_WRvMhm.js":"sha384-f3CaaCdY9wB/kdpO8wDSKwJn9Yfs/1HDtHXy8RZ3frqobCjXGcRjDLmmf2ACwmfQ","/assets/BblG5Zkl.js":"sha384-1g7zS2FqIK9FUw3agr2UM8e30FAT89IcvWxVxp40N/Ae0gV++XE7V8h+VOqWfoHZ","/assets/BeFdQs5c.js":"sha384-6Z/qbeFfwSK8ztSnw4QDxgSYWB171TtHUlPfTW1+2sYFxYGNC30e/51yZS47312J","/assets/BqLVmfHB.js":"sha384-CzLqbGI6EXyS7zrYPU+JAyJ4qy3jyYrMoOYokfQpD+43rF7n9DGx++mMXpXouyx3","/assets/ByUBX5gw.js":"sha384-lQLuTTuuKhX/wa++hEDNCW/yr738U6jl9Es8YEDy4ZZmr/8TQ8+tI/McpVf1udhN","/assets/C6W99v7W.js":"sha384-9cnsjZyzd7ssM1S+/XRZ0222CQvFmDBMhkogAkulYM6R8rabWqI6q/V1UHzeHOVj","/assets/CAxiH7S9.js":"sha384-J6Z9vN7TxC4Mye2dI2H3lmjCpQMOOSwiXUbgakVM+Nde1RRP0BBCeOxZXN7yfiXl","/assets/CBoEAtZy.js":"sha384-A69ldCPGHFWo+hMut9XKa6Y57bRSZaYZ/5VB5sFAAtz4/BdeMh6EhHePsRsDZYfm","/assets/CLk0ipQg.js":"sha384-FY8eX6OBBcLZqj+EQJ0NVtZhBcihm53DxbF4kScWfUawHK1l2WYeGZpuAw7dBzzp","/assets/CO7Zvl3Q.js":"sha384-qLfrJewdG/2T82hzyRyM0Otkk/qBwuGOnN7MtHusFbIMt7T0vNGo2XixHqxEp3Cr","/assets/CW1ZF5ZT.js":"sha384-ECjsEB5UrLeaRXoybgKvSbSMQweYHgiuIc7efTBraz1pUs5Cvq3vyjWJMxfoBiTz","/assets/CY_yRk2N.js":"sha384-rHNu+SV2KwVv7vUjiuO1j1EnoLhP3n43ThBmMk3MYVvt1I6nO++a/sufoZiC7tLP","/assets/CePws7KR.js":"sha384-tHHf3PHp0UdjgVbLzb4jx7ggmF2ZBLKiTTmm4wiMFCbzeeq/dhAOttk291tlnIkF","/assets/Cfta3aqY.js":"sha384-8gg/COBw5DZiHt7rEEKxPxxEecOzo7y4DKcmmjbYbTtYgjq14nNdEgeU+dVhoopE","/assets/CgqQPb5y.js":"sha384-bHeluKcoKUuSRt/OEshO4l9LqZe/zR1fpL0QbzkS/x5aMKv+EjGka407natfJjP5","/assets/Cj10J68Q.js":"sha384-foVkzvgyXozW1udDvN/ZwDzPftXmNifKkgJ9MgRS+gCFwkuOJEF0e4Y6mzJnwPUu","/assets/ClashDisplay-Bold.5hYeFSJJ.ttf":"sha384-wjO8lobPgLMLcQlvP1Ym/CmxyZvn+BCp+3XoJpErUFbHev1T3uaXg5cch1g3qBmU","/assets/ClashDisplay-Bold.79YOzMqN.woff":"sha384-68g2XJWriFtAnjM7RK7LQEBguTEAV2KRUu+XCt1T62shOzBwh3OCczsAEFULCosw","/assets/ClashDisplay-Bold.YaCnK2PY.woff2":"sha384-yCf0JKogT/1mwO8kPWIV2+xlpQC2R/Qxv1bJ22fctXpQeGV7Ly3aJtad9Cw7spW6","/assets/ClashDisplay-Extralight.-kv4w5k0.ttf":"sha384-UGHrrQT0d7ex79xktXrjutn2yG76uoFqgQSVp5/Smi/O3bec3chRc7123t5UKOQu","/assets/ClashDisplay-Extralight.BJExDEVH.woff":"sha384-GpOLy9Kzkz+8I3Rs2mAFfE5AuFu4uAFIxy0t6EiN0M6r4/kWNdcZBlIdNAFp55OD","/assets/ClashDisplay-Extralight.D3i1MCwm.woff2":"sha384-/s+QhITa2FIIe1Tt9YNjx8j069YOsAlyNZWzh8PDSKphAoaAVxIZaRhzj+GxqTrG","/assets/ClashDisplay-Light.Co9CQZ40.woff":"sha384-cGIjwU7aSraVeKcO6IOrTJs6sY/61g8XJqyH83/bxXjM2PJpmqTHitxul2kz1wnE","/assets/ClashDisplay-Light.CutxPsj4.ttf":"sha384-W7obgZG6Og7XAwoXwC/2tiNMLr0jCucnyOvz/+tXnyry+PYWhbCly21IoSzg/IM/","/assets/ClashDisplay-Light.DIjv0-nY.woff2":"sha384-aPpDiZggiZpZWlRcllfYl5udl/MZw0t2D//0b9sdftqDPDyMuB19SBN3yLfI2N+j","/assets/ClashDisplay-Medium.BPdWq--j.woff2":"sha384-k5It5WkIhYWSL9i9xyc+aaa/vhLOD+i3NnR+36bXF86SCzjx9YoMSJnZ339TrDgL","/assets/ClashDisplay-Medium.D8oxfInt.woff":"sha384-QjPZmx6C/uYnciAB1fh7a9ureFnWPy166xrroDxY0G3E+Inw37yrtCYj/JWjiMBT","/assets/ClashDisplay-Medium.RwyLHzhI.ttf":"sha384-rViiQNWJH3kFChGWmzla1YEmlNxXjqYd0NV4umSxNKH7lCpret+GAlGFFhJPkUKX","/assets/ClashDisplay-Regular.BKrzTZUV.woff":"sha384-I2tgqxxcB5hbFn4Jr1Jsu2LFX35tFX1HRZdNmglBz0oz5aY2+8pgkzgH8vt+zCfF","/assets/ClashDisplay-Regular.DhusH4GR.woff2":"sha384-Upaw+fAE6eMgZWCU9D2EX4Cp/d4rQcE7s9b84q3UZMLkck9VB/XFJ1F/eFd6kJx1","/assets/ClashDisplay-Regular.zoOY6xZw.ttf":"sha384-+rR5v7/pS28pk7PpIyBEQDA9mBuDpDQYcTwN6LVjrVQ+suR76tUzWV9gaTc+h+FV","/assets/ClashDisplay-Semibold.C8tXlykZ.ttf":"sha384-8oKIC2dZVqfQP8xJeduY8soYx8Zlw25KCd8Z9SXDA6grNVSO0gme2u26NsFQd7iR","/assets/ClashDisplay-Semibold.Cc_zfQ1K.woff":"sha384-FLW9bnv0TCUA6Gt+OFkm+DBc+Xel6iOsq/tiZHeZE6GVuotUr5g0xFxk8cMmNgsB","/assets/ClashDisplay-Semibold.DcA1xgJG.woff2":"sha384-bEdamHxriyxnHt2tefAQ2ktifm5clowbO1x7ZU4ryQYIkJNJJzsTOR64YBLOrEpP","/assets/Cqi6RyRp.js":"sha384-dqOMUJ+5c1k54sYsfoq410nuM2gb9i9quV8R25EdeyaBnaU4THCdoNlQQIj0/+iH","/assets/Cr4gBYM-.js":"sha384-omCvnvnOiuDpEweJSMDE7E60u3LdHC/2JPo8DNX0awvxAItUJXAJ9QQwo26XIfqi","/assets/D3ptdye_.js":"sha384-TGxilNKh2gkrr12b1nistme3ry7mcQwtkxe61lYbblMhSfPtrJrC+ryXFfYLdY51","/assets/DCCqgrvy.js":"sha384-Hn/JFXZq7cn30hGu0LHN/7ZQ+D4ht1ldhUxeG92UBmyiTq/YxqARGGFKVmtyJLHs","/assets/DJAmbPbo.js":"sha384-UO4sFDjbi5mCe6b39DxVgKbpfzSaKA7iuQ/7kpvBwPZx0sqjc0TqzkYDGu7Mygmw","/assets/DK88V3VT.js":"sha384-KRAc8PpOjKMAYb8CG9SjRoXEWur4kr8uEcnUU8m866DfIBLG3tLFoqqhdSLJi4C9","/assets/DMPsZw2a.js":"sha384-gGMy9IlEJYkHcjg7d/cR9YEMom4gJTBkhOmDO3ikGjUKMzAX+FRraUzbXxEtlnaU","/assets/DNqv7CJE.js":"sha384-bkPzkj8WymYDWgJkkx7FJEsCo4KYBLRbxYEL+hNtyY4YHOEwpHMabalafaPVD7ww","/assets/DV947wrI.js":"sha384-WlG2oG+bbwVqX1q0kXEY5bX7UB81AuMAI0asRLPNccbOINGqqKcvPqrEIdMx15k1","/assets/DW-rDHp8.js":"sha384-nmrmL3Yj3alkV9zaapC5cX+kuXiH2ozZmGQVdIL5joMMtbQ2OZGmeztayerNzqu2","/assets/Daa-K0sW.js":"sha384-DcwPnufxr5S7OXlOQVfNXcB75yRgAYfCoOAkWpkCrbV+Yq/toJYYDXmXn/odce3J","/assets/DejYznDx.js":"sha384-0k9zUcXt47ECc2Hy+6BELuDoYJYO1/Mw4k36QBJPSTq3RnRrLurFgMqnnxGP9/qQ","/assets/DerMSZqJ.js":"sha384-SdbcrIvFSjSLsD/k20kCdwjWPgkoum7utq4Q4w5jcAYUTimUFjXZDWYsjro2t0m2","/assets/Dlp--w5a.js":"sha384-+6KglZ6rcQPRDlw4tnnKfmOnOOhnYINgv9LRmPDE9LARc5O/PBsSFy4/w3nu0q/1","/assets/DnU28O2J.js":"sha384-9SYr+MFTvBLh4vp/68x5I2T/WyV1qK3BravTutaT1tbmOKB+RZfbsltPhKdT98dK","/assets/DzXUkAWT.js":"sha384-Kn9U1lQShlaHU3JkDbG4LK0w2mvVm+cstFNXoAiglpLBnGGN9NSOmQjBAqHEVtMA","/assets/EgpGLap1.js":"sha384-v/9A/1iMQs4wt3YChhyIASgL5d6vCL+/l4AW5eO5iRq4RguPoo5ax9CuYKCianUL","/assets/Magnita.CSUkLIR8.eot":"sha384-o4PRX1Y5o0C4Wccpiy3W8qhUPlP9O0Dr2dsA/Vg3mnNnbAsc/Fr1ujASBtwvOKZI","/assets/Magnita.CYTrzT3l.woff2":"sha384-I2SQQhFWIVVHonyIbAM6HblONDcGfUsJgCcamS+jNs/z3KS/rthIF3cLBZrBnISf","/assets/Magnita.aiIyRRpl.woff":"sha384-MtSpNrkrzHBmaLWRTJUKRH4FiAC8x1TnVJ4vFX/xWc9xR1h8QQY505xXaDHrOKll","/assets/Magnita.dgH1nlX-.svg":"sha384-osQFjxspnoy1Kt+nvrloifPfEnrZkLketn8WIvEKwODSCNxBUY9wAQbDVzHoBwKq","/assets/Satoshi-Black.CizHyRqb.ttf":"sha384-zcK3OiRulLIZ3I6bb11GtBinPY8weNJJwdFl1lXnRfGlABwdB7teHCT1Mh9+MEgp","/assets/Satoshi-Black.D3hzT7Um.woff":"sha384-cBOd02VQW1GXQOsvaCptgEyJEFAmRIK0ZahMnT4QZVf9+FC6ur0we3bxeE6j338C","/assets/Satoshi-Black.DjnQuuRz.woff2":"sha384-EQjbkmMQhPVGI8IeXlw+AZ256ocRIItXly/VzybTEBH3WDcj85vJEXDSRy6W8YKX","/assets/Satoshi-BlackItalic.ChCbTD27.woff2":"sha384-vs6HuoV+J0EUju9vKlqFeyMZJj2XThXZecGhEWkiQ0y3kuS6jZ08sABdVm3QKdtr","/assets/Satoshi-BlackItalic.CvIpOoSh.ttf":"sha384-KOeiPPFOYPrHeAvLwh048MT3I8J76m5d+HGtz05m9fsNVBwSfmaWJ4kfFF1/1EUg","/assets/Satoshi-BlackItalic.D8Ai_S3C.woff":"sha384-RMLQ7tXxm/JyocQJdBsF/gLtgfzYv/AyySJBKUuKQRuxedVVmEqYhl5ZNlJWTpCP","/assets/Satoshi-Bold.Bd5kKQ_U.woff2":"sha384-YUJoc4ASFboFzv21BAYw8YFajUB+TdbJOz6mM4GbFpkkRXTdcONEWwW23KI4ch4h","/assets/Satoshi-Bold.C2PhLWFc.woff":"sha384-GBIVFvkOHL90RHHWx3VGQ0jvvoY70fzyYbQgw3YZhWxkFBw1Ny1uJBwFSnLP766h","/assets/Satoshi-Bold.CPly9kH5.ttf":"sha384-HOLTk4grWrFiR7HxwPMBYLQ5XorJy3fWMOkQDApOZTfIwOycMwQ4rlQnnPT+6L2v","/assets/Satoshi-BoldItalic.CAjvAcxR.woff2":"sha384-QWI/dJ2kd+QbPjVo7GVnQ+O/IT1hLC9nrpKzf+izQ4SlAxJVeZDssIms78ELOwd6","/assets/Satoshi-BoldItalic.DQ7B0PfL.woff":"sha384-DccWN+PEFBgvLwtmKZr+G7LMdlkfYuFAh2+kzD3yqE3XsA4/eJnACWkmGDohpPO6","/assets/Satoshi-BoldItalic.tClQcAb-.ttf":"sha384-X9/DZl4cQQWRfPOUJnpe2da8KrzebssRsp+ZYLWRpFLTfNn0B43M0sQM5nVkHnxL","/assets/Satoshi-Italic.BPCXRxzy.woff":"sha384-8e8ckF87EP2kgTAtpc7YgBWp95nxzThcNLBeRASizieHlkSK/ZznZYhWs5MzJQLc","/assets/Satoshi-Italic.FMxkCD8o.ttf":"sha384-LD6GCl8JISvMpoGW78vHyoesyHu3WWM7lLr1e10znt47ATeVRQnPGMOQ9XNHwarj","/assets/Satoshi-Italic.wVmEEc6M.woff2":"sha384-3gltP/X0J8/qH4ROknNgQ2a7nNDQse/kmiGg4V1LpPmwsSiyGpTDhqBLQo+AD/1G","/assets/Satoshi-Light.B82kzbU-.ttf":"sha384-ZYip1NRjKPP+M0nBedEvO1/dE7JZ9aEPc0wpZd4qFLLXdBPqEkQJMh2xDoKrAI8b","/assets/Satoshi-Light.C_dmkKXz.woff":"sha384-XD29Tgo8dM6CAoMu9BVQvigKYugpuXqiggbC/u9weKmw1xn8u/s5b3nDCMgbpoVe","/assets/Satoshi-Light.IqwJ_ZjS.woff2":"sha384-DKfZbyuHKYbavBmQAPrUD6C/RFreBwY6iIki/ousIHrteEfy2+JlCOHv0Y6H9Mqc","/assets/Satoshi-LightItalic.B9L6s97T.woff":"sha384-0MNk1twnZog2eK4+N1EJIEkZP+9KSZ+y291I+zFWsBclVGW1iHrC/+Q/XJQbAipy","/assets/Satoshi-LightItalic.BAhuxY-A.ttf":"sha384-fRzhXQXoLHVacWEC6BZas5BNEAM4u3cvYLk/qg6v3YpdO173zVRvzpQMppvlhTIN","/assets/Satoshi-LightItalic.C9iuU4v7.woff2":"sha384-2vYZbNVoA/zv+YPZO7BjGUxJTeOLWjGlYiUYRbeN0Pv5xRqFtOuKr2BL5kYfykNh","/assets/Satoshi-Medium.ByP-Zb-9.woff2":"sha384-3SJcXnKSL6CZoWDylcbcUT6zvlrOM76BYx4YLCZVMS66dqkzEp+bt7WgrzA/Q4X/","/assets/Satoshi-Medium.DDwDPeBg.woff":"sha384-rxGjoCTOTJuqmI+WFY8qm5E32shDWnksCTFXPY3ZpKusHCphi32Y8tdj5LxJ417C","/assets/Satoshi-Medium.DOt9kM-a.ttf":"sha384-w/oMtVlslcXIHq+B4FyPMmJKqwRvTduk05EzYi+mlVg8/o7g1er0weHHQ/yeD6S0","/assets/Satoshi-MediumItalic.BPTJUpxz.woff":"sha384-ZpA0TxODyItUnkWT3ri1M8NGgdrnVkP86/Ojsr/Hv2dCavdqzDee8KfxwWF6k1gG","/assets/Satoshi-MediumItalic.BUFVYoD2.ttf":"sha384-GyrmIXeI8yinhXAc25RWwKBHYod9SDbtT+tA2GrApDmZn4TSjVlC/4Gjb0Iu1EDn","/assets/Satoshi-MediumItalic.BxR-IcRj.woff2":"sha384-GtMW/0lEgOXcTF3pd3/i312iD0BwghBslUZxB5ut/T1LEGTUMnuqdQg8R8dOFEpY","/assets/Satoshi-Regular.CPM9dct4.woff2":"sha384-EXdX76+Bab1ra2dNpDnK6HDNO1zhe0EpS5A2BC6NR8j1/bVM7FEQcVa3VBIclQxX","/assets/Satoshi-Regular.CWSyEjGv.woff":"sha384-wmETwHIEO9dXIAp4xsG362Nqfds+/Eo280zdplao/24EltLTOqherEu5S5/dl/6z","/assets/Satoshi-Regular.DToFXog2.ttf":"sha384-6qY/DLHgLz0hbQ4ZIU+0gTmBABVSQMBLcoJB0TMoyy6HpOew7NgMptrrFWLyADu/","/assets/ZMaZ9BTu.js":"sha384-NK6s4Dp51oUc0Twk4JDl69AYUKFUDTlrCCLu+gEQTyHdAA/1ugYcw5aueF4ePtQn","/assets/about-us.CcB1ZWYX.css":"sha384-vXH/ccetFLwLpSkTeWxaAbKE7bqKsQDPLVfS6fsemmJ1sPDruvfWIN2E5pELM1Fm","/assets/admin.n9TyMqAR.css":"sha384-lFWtFp0BVYo9X5DZEJ7fdQGM8DgJj+wX6RLvZ3txwfoFeh9A9YQoN+XtkaN28q2f","/assets/all-contact-info.D2MwO9p1.css":"sha384-VtIHlr14oKZy9p2OnWTrXN2b4kkthRrHZuQQtl3U3Gj7R43B4BORXy3IT3CG0DNq","/assets/announcement.Cr2WHkWY.css":"sha384-0QMmmNKPv/v8mxpwEg9KoB8oFplECemwP8cGMQuqvTg/8OOG6B5ynQ9Ffx75VhYH","/assets/application-form.DXUBT5sI.css":"sha384-UC8+vjHLNb39ucuDT/24VyQ5ps8QWtqGYXwy4xD7scaIURvSiWG7VU3T/HVjvJCs","/assets/bootstrap-icons.DSXWTQaD.woff2":"sha384-8a7oZxHU28YPnDiMUcUxGpUGGWnO6gHBcV6FNMbGgloxSStqzdYP2Djz/ex85ZKu","/assets/bootstrap-icons.DTeOS7dS.woff":"sha384-mgXQ6zSG7EqKkRMOtJB2lFvH5WKbK66diq/Lcr7pzEnK8hy0RwS60d5GjNKgAduP","/assets/breadcrumb-one.FjJfrjWq.css":"sha384-zTl3sBxs3XwDNASk/73QUgn6/k9IkFANCvc7qWV6WdXWfRKjCPGUFz2nAHkBCl79","/assets/censor-standard.BVtJMNh5.css":"sha384-9tqAUJwTqbrt4he9iiwRjp6ZBUp4bCgZLCupHiC3Tded8leBKfVagaJzD8hczMxq","/assets/company-statute.zW0I--tl.css":"sha384-5R/jy2KrVEaINX0FYfDwNI3dw1alKsaQ5dSbWXFAMIwLZJfPMTa5+G3xCaVHbVof","/assets/conduct-plan.BTt5TR3R.css":"sha384-ySkSMuPbeZu99rtwH3dKG3hfczAD5q9tOGvCvPZMkn2DpRPEmvyAUwntXcy2uMBG","/assets/contact.I8R1SwDS.css":"sha384-bLVYA/ROAGxl2mdmwhY02ZZlDbzF+HvJHsn8HPFevJC+YouvULPg+qbzJgMdObw8","/assets/convert-principle.BZHCRG5B.css":"sha384-nttnr54dYACrNEtoCK6h/RHFbeQu0IkEXDF+U7cc9WPdsiWmoxbCGEjGG4jAiwkX","/assets/default.-h_edMOl.css":"sha384-hCNMKpVEDHNLIe3M4cPNeQkDV9kOSyRXDDiLNdZrv6mg7s4owSYkkRy4E+nO59Wo","/assets/employment-services.BCOgZKZ9.css":"sha384-1CsGGd8GylP3rETJNT9S5zk/AQxy7fLNeZB+6MSmOguN+tkaiXAEIzDXGg+bm8/d","/assets/entry.DtYXfDAR.css":"sha384-TLVm34mfQE7X6fORP2L2uKQmQMLssxDzlyJOehkrR2iwyGriineZbt2+5r7VZh+2","/assets/faq.D7c6A40b.css":"sha384-HZSY8m3yYNuV3jsdQY86hVYRK7rs6IW6m3BKLjpPZTb1a39InCCati2/b0yq6BlZ","/assets/foreign-famliy-link.BH3iTk0H.css":"sha384-4ZLeXdmeFygrOvOfuOyXrUpB0s6Tt48N/Q7ALmpGH1q7I210P5FdDSIbQR9UGX16","/assets/hXiZFfwy.js":"sha384-QaqxmUuljLQSURRoheTOdE1mK27IIaJuCfVEmoJEj2sC3EhhLZ1lk3QZvfeRUjha","/assets/iX6uelH_.js":"sha384-D67aGHHFC2X4cC29dghC+B/pCdjY3zdivuxgwD82j20Fp0OpKZdXX5kodMF12nJX","/assets/index.4uOfb_qe.css":"sha384-UDCDnlkdpCLKIc2DeEmojYicI1SIiGDBZQxh/spAvRCGflICM1YZGtJ+nlLd/cp7","/assets/index.D28eu_DT.css":"sha384-LCxMtII/xERs3W5R/AN3UgFRu7oy6e2xBLStivxuBaPejNObXssuWL7r0KY9YppE","/assets/index.D5_Gfe-Q.css":"sha384-9bch5w1isF4qw1ltGq7XZGS1hpJiwVTk5sJd37XIiYZgHGaaMXDhTlvbCc86FOSG","/assets/index.Dz8AXAlD.css":"sha384-qE4D07HkX8HIusYCIazKVqw5C8SFrf5lw5mfIvtq/DcYFHyAU2T4CYQEazO9G3WF","/assets/joGTLTU5.js":"sha384-U7T0Y1AdNCibuUIb4ucYyBDiqf/8OXag9zuXnHevTg79sZXWSbXUU4kxe5CMLZVi","/assets/join-us-unit.DYDpIsJs.css":"sha384-bE6ZxyxsUzVB65r9cS0rzQqKMMr+HottxkiJ8XGOMRKNR8lnYml0T2zMn5RzCzc3","/assets/join-us.tW0T7HDv.css":"sha384-DSqbAEeSSa8f3DW+nf9e1RGgolLdBvIThDmklssfIn0dDwxvF/neOLpBhKctdrIT","/assets/knowledge.Bjs0LHUV.css":"sha384-2lfmgsliUB4hawzzoKQX/oAGWFvVa5oyLKZayOaL/fVyKx6ml7r35N3OeeaBMMXa","/assets/lazy-bag.DLTuVNgY.css":"sha384-gy0I2a6s3cpPcUVJ3qEeR+TaSjXplcM12lRXRKHSBK41kidFTH3uskpJtjziKjRN","/assets/links.BECa8f2-.css":"sha384-2sADnzoiyJZIrGvOni5u7e3P6f6oB/R8NXSTvI0YGWp+qI0QB36872WBcDwQ/ob+","/assets/login.CTe5p9kG.css":"sha384-JJHeO/dq7Zx4nRrINk4V4AdPXfgeH7J5/RuwYk4spn80+nOmAaizq/PqTFakXG0b","/assets/news-details-area.DzgBBcG0.css":"sha384-ladvbMCnzCj806g16LPjOm+8zPU1FesQ1L65KUCoZx7PHiCC5nJslabteNVMIjQs","/assets/propaganda.BZ0qOj1d.css":"sha384-aIcY+uR3UsBB3CDallON0Q1aitRNzALA4EWl1slCYS78Pc1Q29nq3qw6A9TAvZi/","/assets/qa.CiLPdxdO.css":"sha384-iKEMoVDTFcOQybUnFEZlZIDMlzNYqRCsjU0msc91+BmVE8ZKNtO+TcSi8SvLSwJ6","/assets/qa_setting.bie8qpzb.css":"sha384-JHdZjIm03d7TQbkgCW2sijLxjf2Wbecx9IkUsfvSdHpK0qpBBGx3CTIFGXLC0OkK","/assets/reserve-guide.DIF1SbjF.css":"sha384-oSx5jd1nNAVSsH3RZk49PnfuXVmLCFy95R1Ne/fkEUJyITXW0HZTz0fSG8qE03YF","/assets/service-apply-form.B41zIWwn.css":"sha384-7j+EsDpRKNMrftPY2fsP4GA6k6zJDujKJ+AYSb7bVjDqAiMmG7wbkG9I/hdZOVtt","/assets/service-now.BP_7a85e.css":"sha384-eJMYLXsRyi9NSDaLB3GxdjJkl/qx8f57z41x/NgvthJFW3OYV5f1eK3eCHWFqZce","/assets/service-unit-list-area.BNAI2F_i.css":"sha384-PLZ16GswTQKdRbFnyzCuTuXhcHPcYR9FHf5MTNHokbCsm0/FyJI3RXcYTJ3wlskM","/assets/services.B46_FNYA.css":"sha384-tMAlEQphaAwPx5sn+GV/vyAjeGtMkz+FSEvp1lOPTlqoAssWDXwPEG1qYplTyzSs","/assets/vDpqUfwm.js":"sha384-rEz0vhpqdrGoFHJJnDrznI5uffqciC8JqV0CXbyPry8oxBa20HO/h3n20V6ZcEha","/assets/xNitgvn6.js":"sha384-bE9L52oY3KCRbSvYAp1p0gTnOys+JJ7wJyqWNfsh5aH1hledcoO9998e/PnUZYpd","/.DS_Store":"sha384-aB0ZnOQV4miynTmBkrYrual6PJHJ/iuuTls5tXQIw4Ji4+sGlcVtLm5UkM+xOuM9","/favicon.ico":"sha384-e0DOxab7uI618wwd1Lt0+rREwV1k9myViahHX+GFoxul14+FbxXyAOIdbDRGgPYP"};

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
function generateRandomNonce() {
  const array = new Uint8Array(18);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));
  return nonce;
}

const _ZYWL3XUN8z = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const LINK_RE = /<link([^>]*?>)/gi;
const SCRIPT_RE = /<script([^>]*?>)/gi;
const STYLE_RE = /<style([^>]*?>)/gi;
const _18WRC3KE7t = defineNitroPlugin((nitroApp) => {
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
  });
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
  {
    return;
  }
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

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3l1lldD6RQUS9KTOew8+0izelJI\"",
    "mtime": "2025-04-10T07:35:54.478Z",
    "size": 6148,
    "path": "../.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"863-n19ln8HJXj/zm3D/0cakhNoJ+PM\"",
    "mtime": "2025-04-10T07:35:54.478Z",
    "size": 2147,
    "path": "../favicon.ico"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"863f0-pOiCyZ4kvgh7l4VBfVTNF+SCRWw\"",
    "mtime": "2025-04-10T07:35:53.640Z",
    "size": 549872,
    "path": "../index.html"
  },
  "/nitro.json": {
    "type": "application/json",
    "etag": "\"f7-M8/0mfJKlylW/NnIEHX8z+fkV0U\"",
    "mtime": "2025-04-10T07:35:53.536Z",
    "size": 247,
    "path": "../nitro.json"
  },
  "/admin/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-04-10T07:35:53.716Z",
    "size": 98,
    "path": "../admin/index.html"
  },
  "/about-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86b43-wtxrylX12qDDvGx84M6A8Gr54AY\"",
    "mtime": "2025-04-10T07:35:54.040Z",
    "size": 551747,
    "path": "../about-us/index.html"
  },
  "/all-contact-info/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85a00-exfVCQQnDxNd9QUPl7wmziyYriU\"",
    "mtime": "2025-04-10T07:35:53.952Z",
    "size": 547328,
    "path": "../all-contact-info/index.html"
  },
  "/application-form/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"851da-mgPdFYFlr6X8UInbIVEX0SNpxIg\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 545242,
    "path": "../application-form/index.html"
  },
  "/announcement/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85943-q2aad5kKil67wFgIoA6BJKKnx+w\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 547139,
    "path": "../announcement/index.html"
  },
  "/blog-details/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87125-yzxLAyAZwUwvQmdKNSzKQe/r9pY\"",
    "mtime": "2025-04-10T07:35:54.016Z",
    "size": 553253,
    "path": "../blog-details/index.html"
  },
  "/censor-standard/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"856cf-bqvULaFYwsYZe2+6kWJEvNjTvvo\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 546511,
    "path": "../censor-standard/index.html"
  },
  "/conduct-plan/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85705-D/Y1kE8l5GFTjOYZnmP8Anumn24\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 546565,
    "path": "../conduct-plan/index.html"
  },
  "/company-statute/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85860-xRyqyZ8+LA39OorYFTnatTYuO1w\"",
    "mtime": "2025-04-10T07:35:53.904Z",
    "size": 546912,
    "path": "../company-statute/index.html"
  },
  "/contact/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87901-kJS08q6606vAaXHoHEkv8vo6lhM\"",
    "mtime": "2025-04-10T07:35:53.940Z",
    "size": 555265,
    "path": "../contact/index.html"
  },
  "/convert-principle/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"856dd-zmDhxehPwZTfTu5vWsRy6w6oGkU\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 546525,
    "path": "../convert-principle/index.html"
  },
  "/employment-services/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"856cd-NVjkuYRD6accDrkt4Swsnux6iPg\"",
    "mtime": "2025-04-10T07:35:53.914Z",
    "size": 546509,
    "path": "../employment-services/index.html"
  },
  "/experience-share/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8540d-Ifte9uVL9ueIabyH9a9umxRouPw\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 545805,
    "path": "../experience-share/index.html"
  },
  "/assets/0ATdO7Vo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dab-7QaRGNRi80QdSqHcn8gmafiCb9s\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 3499,
    "path": "../assets/0ATdO7Vo.js"
  },
  "/assets/0viJ7nPK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"162e2-Uun9UV4G/cVyJ9h4unWnpQ9uCRw\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 90850,
    "path": "../assets/0viJ7nPK.js"
  },
  "/assets/219hlGHe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33d3-pQ51rRcHEc5YZr8WTxrCVMs0oEU\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 13267,
    "path": "../assets/219hlGHe.js"
  },
  "/assets/7z-q6ocz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c4-/DNyPpKP/6aQXuQ0n3aZUzgYFX8\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 708,
    "path": "../assets/7z-q6ocz.js"
  },
  "/assets/B-sX5vor.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c31-a1J5DJ0qyT72nxUVvCgTYSlVukw\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 3121,
    "path": "../assets/B-sX5vor.js"
  },
  "/assets/B1ScbXnb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"531-uoB8hfjOPsKrHQxXMUk6xHatsN8\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 1329,
    "path": "../assets/B1ScbXnb.js"
  },
  "/assets/B7ziI6Hm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"459-b74I7mNGnmw34bHci9DbJibWlVE\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 1113,
    "path": "../assets/B7ziI6Hm.js"
  },
  "/assets/BDT3iC5Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"110cd-Wt8PyBQTC743xr/sVLethkTiRm0\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 69837,
    "path": "../assets/BDT3iC5Q.js"
  },
  "/assets/BLyYiy36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a4e-yMH5lfoRCqNGMR1JNxzuNBJcgRE\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 2638,
    "path": "../assets/BLyYiy36.js"
  },
  "/assets/BN7Z8gnC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14fc-oRgvOMrywjMNVIAilNhdTNykfdE\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 5372,
    "path": "../assets/BN7Z8gnC.js"
  },
  "/assets/BRYC6yZa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8a3-pG4aLDrjmVKUJFCLFVWLRmhUh7g\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 2211,
    "path": "../assets/BRYC6yZa.js"
  },
  "/assets/BRpvjwHO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da4-fvMAJJM4Wm1LfeFvEJn0ekkwvEk\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 3492,
    "path": "../assets/BRpvjwHO.js"
  },
  "/assets/BSZ7hnS4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"200f-KIRpvMwF/o66WSCwjd47deSKD0Y\"",
    "mtime": "2025-04-10T07:35:54.338Z",
    "size": 8207,
    "path": "../assets/BSZ7hnS4.js"
  },
  "/assets/BSh0tAnX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c5b-P1c9KlzT022IyjNzJwzw6LUgu00\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 3163,
    "path": "../assets/BSh0tAnX.js"
  },
  "/assets/B_WRvMhm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b9-u7d8VFcz+Rd66iE3ZH9bECvsRLg\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 441,
    "path": "../assets/B_WRvMhm.js"
  },
  "/assets/BblG5Zkl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c2-cHJkNaCqngmzO6SmWjB1Mwr1nHc\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 1986,
    "path": "../assets/BblG5Zkl.js"
  },
  "/assets/BeFdQs5c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f9-HSChwUcjKALeRuy9hpluT9rt+Kg\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 2553,
    "path": "../assets/BeFdQs5c.js"
  },
  "/assets/BqLVmfHB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1895-+gHfRZ/cl4mKTXv2dOFngJZVU8U\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 6293,
    "path": "../assets/BqLVmfHB.js"
  },
  "/assets/ByUBX5gw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30f-Z33amnP7cXEB46g/XtVRoWATEOg\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 783,
    "path": "../assets/ByUBX5gw.js"
  },
  "/assets/C6W99v7W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3019c-D4jJ9hFyGTbUNmsjQOdPhLNdwRM\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 197020,
    "path": "../assets/C6W99v7W.js"
  },
  "/assets/CAxiH7S9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"584-vP+t4ZaTLggBSzPf4sQwt681Vg8\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 1412,
    "path": "../assets/CAxiH7S9.js"
  },
  "/assets/CBoEAtZy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a4-Zimkwdl9abcOuqSBobWIJBm1o/s\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 420,
    "path": "../assets/CBoEAtZy.js"
  },
  "/assets/CLk0ipQg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"700-KxmTLU9sw4EoslJ+Z35Efhtc8yo\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 1792,
    "path": "../assets/CLk0ipQg.js"
  },
  "/assets/CO7Zvl3Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f8-tPqcchL2XFDmQlMgwQN47/ztT4Q\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 2296,
    "path": "../assets/CO7Zvl3Q.js"
  },
  "/assets/CW1ZF5ZT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"531-W3gD6xdC319MmDs17w8+CjgtZtA\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 1329,
    "path": "../assets/CW1ZF5ZT.js"
  },
  "/assets/CY_yRk2N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"567-DMnEInpJUalgyQAGyGJtYbbAkJw\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 1383,
    "path": "../assets/CY_yRk2N.js"
  },
  "/assets/CePws7KR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"389-qE7KEPRrzTjpEE7u6fny4Ip/DWA\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 905,
    "path": "../assets/CePws7KR.js"
  },
  "/assets/Cfta3aqY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2475-qYYwAV41hT8TU5egLMDhRLhwsfo\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 9333,
    "path": "../assets/Cfta3aqY.js"
  },
  "/assets/CgqQPb5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20f-pKqFx+SRRi6EP4n+4DHolezPjrc\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 527,
    "path": "../assets/CgqQPb5y.js"
  },
  "/assets/Cj10J68Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37ec4-OeN6Jp/VujSrEs+1fWuHh2EGUMk\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 229060,
    "path": "../assets/Cj10J68Q.js"
  },
  "/assets/ClashDisplay-Bold.5hYeFSJJ.ttf": {
    "type": "font/ttf",
    "etag": "\"b17c-rUisliadNOWsSzFJ7cByDxGPrAY\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 45436,
    "path": "../assets/ClashDisplay-Bold.5hYeFSJJ.ttf"
  },
  "/assets/ClashDisplay-Bold.79YOzMqN.woff": {
    "type": "font/woff",
    "etag": "\"47bc-nJ4NdN5D6lOz/0RA94fRVTz7Rec\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 18364,
    "path": "../assets/ClashDisplay-Bold.79YOzMqN.woff"
  },
  "/assets/ClashDisplay-Bold.YaCnK2PY.woff2": {
    "type": "font/woff2",
    "etag": "\"38d0-TbK/Sdmhygeg6Uetwl1K+L4psR0\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 14544,
    "path": "../assets/ClashDisplay-Bold.YaCnK2PY.woff2"
  },
  "/assets/ClashDisplay-Extralight.-kv4w5k0.ttf": {
    "type": "font/ttf",
    "etag": "\"b278-XEHz7pFlY4dhKlOidzRQAiudWyw\"",
    "mtime": "2025-04-10T07:35:54.339Z",
    "size": 45688,
    "path": "../assets/ClashDisplay-Extralight.-kv4w5k0.ttf"
  },
  "/assets/ClashDisplay-Extralight.BJExDEVH.woff": {
    "type": "font/woff",
    "etag": "\"45d4-5R7YwNW4xGm/cd22qaAAr++FvLg\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 17876,
    "path": "../assets/ClashDisplay-Extralight.BJExDEVH.woff"
  },
  "/assets/ClashDisplay-Extralight.D3i1MCwm.woff2": {
    "type": "font/woff2",
    "etag": "\"37e8-kZTQHyLBEvUzW0VK3Lx6s/Oe3v0\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 14312,
    "path": "../assets/ClashDisplay-Extralight.D3i1MCwm.woff2"
  },
  "/assets/ClashDisplay-Light.Co9CQZ40.woff": {
    "type": "font/woff",
    "etag": "\"4b7c-QJSvHiwGBZjmM7bu/kNTWcYeSwI\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 19324,
    "path": "../assets/ClashDisplay-Light.Co9CQZ40.woff"
  },
  "/assets/ClashDisplay-Light.CutxPsj4.ttf": {
    "type": "font/ttf",
    "etag": "\"b364-hpAnTZ5uUofw80+YnEYBnZcYMZY\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 45924,
    "path": "../assets/ClashDisplay-Light.CutxPsj4.ttf"
  },
  "/assets/ClashDisplay-Light.DIjv0-nY.woff2": {
    "type": "font/woff2",
    "etag": "\"3bc4-pHwL8DOh/iHYto6HkSFEowXammw\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 15300,
    "path": "../assets/ClashDisplay-Light.DIjv0-nY.woff2"
  },
  "/assets/ClashDisplay-Medium.BPdWq--j.woff2": {
    "type": "font/woff2",
    "etag": "\"3ba8-9J+LstuW6I83bW38sKqeeDZu70c\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 15272,
    "path": "../assets/ClashDisplay-Medium.BPdWq--j.woff2"
  },
  "/assets/ClashDisplay-Medium.D8oxfInt.woff": {
    "type": "font/woff",
    "etag": "\"4c6c-hxrqS9ptU942Y+44dI99I0PVsH4\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 19564,
    "path": "../assets/ClashDisplay-Medium.D8oxfInt.woff"
  },
  "/assets/ClashDisplay-Medium.RwyLHzhI.ttf": {
    "type": "font/ttf",
    "etag": "\"b25c-Org43a6RQL6NYRkuUnrFxSY2EDg\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 45660,
    "path": "../assets/ClashDisplay-Medium.RwyLHzhI.ttf"
  },
  "/assets/ClashDisplay-Regular.BKrzTZUV.woff": {
    "type": "font/woff",
    "etag": "\"4bdc-HVKT2vF7HjoAzJLWUWx5ivEqxzc\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 19420,
    "path": "../assets/ClashDisplay-Regular.BKrzTZUV.woff"
  },
  "/assets/ClashDisplay-Regular.DhusH4GR.woff2": {
    "type": "font/woff2",
    "etag": "\"3b20-+YvkhCZQtFrPKkvvkS2iADw6+qc\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 15136,
    "path": "../assets/ClashDisplay-Regular.DhusH4GR.woff2"
  },
  "/assets/ClashDisplay-Regular.zoOY6xZw.ttf": {
    "type": "font/ttf",
    "etag": "\"b1ac-GDUvSy3jIyjkMxGgNlrzkd7SvAo\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 45484,
    "path": "../assets/ClashDisplay-Regular.zoOY6xZw.ttf"
  },
  "/assets/ClashDisplay-Semibold.C8tXlykZ.ttf": {
    "type": "font/ttf",
    "etag": "\"b234-CDf4hEYSyCtQZ9iY0/Bhmvmqhvo\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 45620,
    "path": "../assets/ClashDisplay-Semibold.C8tXlykZ.ttf"
  },
  "/assets/ClashDisplay-Semibold.Cc_zfQ1K.woff": {
    "type": "font/woff",
    "etag": "\"4c94-ZNkYeGb+y/RG5ktxq44gsjzSuO8\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 19604,
    "path": "../assets/ClashDisplay-Semibold.Cc_zfQ1K.woff"
  },
  "/assets/ClashDisplay-Semibold.DcA1xgJG.woff2": {
    "type": "font/woff2",
    "etag": "\"3bb4-CWpCQyaxXID5O8v8cVkyBbq4C3I\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 15284,
    "path": "../assets/ClashDisplay-Semibold.DcA1xgJG.woff2"
  },
  "/assets/Cqi6RyRp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52f-TtvqU6TcJmzjST4Mo9xZ1Z6wNkY\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 1327,
    "path": "../assets/Cqi6RyRp.js"
  },
  "/assets/Cr4gBYM-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41-7VGkG/H9/kT3snCfVS9mSrhP7nk\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 65,
    "path": "../assets/Cr4gBYM-.js"
  },
  "/assets/D3ptdye_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"962-xWqKFIuRrWyJImvIi3rqbGVYRB8\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 2402,
    "path": "../assets/D3ptdye_.js"
  },
  "/assets/DCCqgrvy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29e-jujoznDY6ztiHmsh610LV/zlgAk\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 670,
    "path": "../assets/DCCqgrvy.js"
  },
  "/assets/DJAmbPbo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30c-y6X427XiH3um48V6VCwaWdYvKDM\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 780,
    "path": "../assets/DJAmbPbo.js"
  },
  "/assets/DK88V3VT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9bf-RWZVI/2PoxTnu0rDLCxwA+1z5mo\"",
    "mtime": "2025-04-10T07:35:54.340Z",
    "size": 2495,
    "path": "../assets/DK88V3VT.js"
  },
  "/assets/DMPsZw2a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"553-ZF/LjEq9b7pGSJFNISH5TakAwqI\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 1363,
    "path": "../assets/DMPsZw2a.js"
  },
  "/assets/DNqv7CJE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"192a-e57Kpn9Rl3+mdAXtiBscbbFsCLo\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 6442,
    "path": "../assets/DNqv7CJE.js"
  },
  "/assets/DV947wrI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49a-yvcUF90AA6YL+9SwdTzQoc6hZEU\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 1178,
    "path": "../assets/DV947wrI.js"
  },
  "/assets/DW-rDHp8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b36-Sq2zJSUkQEi2cq2/4aDLs1HYCuM\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 6966,
    "path": "../assets/DW-rDHp8.js"
  },
  "/assets/Daa-K0sW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ce-Ajly1EHkMesc2OS/xlJOJB6ZE8A\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 206,
    "path": "../assets/Daa-K0sW.js"
  },
  "/assets/DejYznDx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10b8-I6XXOBFQ9/bgZ3tmtKD2fsmFX98\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 4280,
    "path": "../assets/DejYznDx.js"
  },
  "/assets/DerMSZqJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cf4-TOXAI3CgumpGLqBqEn6dO45xN0A\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 7412,
    "path": "../assets/DerMSZqJ.js"
  },
  "/assets/Dlp--w5a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f5-8nEOjgS5FHvheQ0+pgVJTtm4Y+o\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 1013,
    "path": "../assets/Dlp--w5a.js"
  },
  "/assets/DnU28O2J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1032-n+jFuH1yaZEqLJp/fk1cJ/i8JtQ\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 4146,
    "path": "../assets/DnU28O2J.js"
  },
  "/assets/DzXUkAWT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"377-OL+it1uaPzfpvdQfEUdXSc4wZEo\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 887,
    "path": "../assets/DzXUkAWT.js"
  },
  "/assets/EgpGLap1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"53f-7KoC0odGeIRSJTekoNt/ApVUHPU\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 1343,
    "path": "../assets/EgpGLap1.js"
  },
  "/assets/Magnita.CSUkLIR8.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"dbfe-nUYlKH6GYeTNhshuwrm3dzq5tnA\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 56318,
    "path": "../assets/Magnita.CSUkLIR8.eot"
  },
  "/assets/Magnita.CYTrzT3l.woff2": {
    "type": "font/woff2",
    "etag": "\"3ce8-C5PAb5fpBHr4BUVBBrbXz8vCcH8\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 15592,
    "path": "../assets/Magnita.CYTrzT3l.woff2"
  },
  "/assets/Magnita.aiIyRRpl.woff": {
    "type": "font/woff",
    "etag": "\"523c-DAPr6yq9Mcmn1vc/4jlZpuQR4oU\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 21052,
    "path": "../assets/Magnita.aiIyRRpl.woff"
  },
  "/assets/Magnita.dgH1nlX-.svg": {
    "type": "image/svg+xml",
    "etag": "\"4945d-T+C1OlXgWGHr/YKzv/XvHe7OkFc\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 300125,
    "path": "../assets/Magnita.dgH1nlX-.svg"
  },
  "/assets/Satoshi-Black.CizHyRqb.ttf": {
    "type": "font/ttf",
    "etag": "\"11dd8-/QUOV04+gdNGhlH5vGGEMZslv8Y\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 73176,
    "path": "../assets/Satoshi-Black.CizHyRqb.ttf"
  },
  "/assets/Satoshi-Black.D3hzT7Um.woff": {
    "type": "font/woff",
    "etag": "\"76a8-TLow2vkHQGQggQI5ItjyB669EIY\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 30376,
    "path": "../assets/Satoshi-Black.D3hzT7Um.woff"
  },
  "/assets/Satoshi-Black.DjnQuuRz.woff2": {
    "type": "font/woff2",
    "etag": "\"5bbc-BpxteIPlhaarNU/FDxNm1JVAOy0\"",
    "mtime": "2025-04-10T07:35:54.341Z",
    "size": 23484,
    "path": "../assets/Satoshi-Black.DjnQuuRz.woff2"
  },
  "/assets/Satoshi-BlackItalic.ChCbTD27.woff2": {
    "type": "font/woff2",
    "etag": "\"5ed4-uPwSsEUGQ6NfoSAs/CxlrBw6a4M\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 24276,
    "path": "../assets/Satoshi-BlackItalic.ChCbTD27.woff2"
  },
  "/assets/Satoshi-BlackItalic.CvIpOoSh.ttf": {
    "type": "font/ttf",
    "etag": "\"127f0-ChxrUaS//iqc05Vgjm1u5Xpwc2M\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 75760,
    "path": "../assets/Satoshi-BlackItalic.CvIpOoSh.ttf"
  },
  "/assets/Satoshi-BlackItalic.D8Ai_S3C.woff": {
    "type": "font/woff",
    "etag": "\"7a84-KOIgdy2SfN9wQfZaSbgXzPOXZQg\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 31364,
    "path": "../assets/Satoshi-BlackItalic.D8Ai_S3C.woff"
  },
  "/assets/Satoshi-Bold.Bd5kKQ_U.woff2": {
    "type": "font/woff2",
    "etag": "\"62f0-emfkLcebBWtGooanRhAo/Mvefoo\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 25328,
    "path": "../assets/Satoshi-Bold.Bd5kKQ_U.woff2"
  },
  "/assets/Satoshi-Bold.C2PhLWFc.woff": {
    "type": "font/woff",
    "etag": "\"80cc-hEUsQq+QZ3SAPOLaDIOt8QyDEoE\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 32972,
    "path": "../assets/Satoshi-Bold.C2PhLWFc.woff"
  },
  "/assets/Satoshi-Bold.CPly9kH5.ttf": {
    "type": "font/ttf",
    "etag": "\"11e98-uCWkqJtyV1N6ICMWsImXotLwCkk\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 73368,
    "path": "../assets/Satoshi-Bold.CPly9kH5.ttf"
  },
  "/assets/Satoshi-BoldItalic.CAjvAcxR.woff2": {
    "type": "font/woff2",
    "etag": "\"66bc-/mbmGLZ3iJT7MOK6a1Pgk/mq8bo\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 26300,
    "path": "../assets/Satoshi-BoldItalic.CAjvAcxR.woff2"
  },
  "/assets/Satoshi-BoldItalic.DQ7B0PfL.woff": {
    "type": "font/woff",
    "etag": "\"8620-ljDtDmgTK8Bpbt4SqdMZVa3Fhtk\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 34336,
    "path": "../assets/Satoshi-BoldItalic.DQ7B0PfL.woff"
  },
  "/assets/Satoshi-BoldItalic.tClQcAb-.ttf": {
    "type": "font/ttf",
    "etag": "\"12aa4-dX4lKJ2JEogu06XBEb7jj6zHVBI\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 76452,
    "path": "../assets/Satoshi-BoldItalic.tClQcAb-.ttf"
  },
  "/assets/Satoshi-Italic.BPCXRxzy.woff": {
    "type": "font/woff",
    "etag": "\"8620-iBJBoYLUu1nexIcPB3KjEDHh+Q4\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 34336,
    "path": "../assets/Satoshi-Italic.BPCXRxzy.woff"
  },
  "/assets/Satoshi-Italic.FMxkCD8o.ttf": {
    "type": "font/ttf",
    "etag": "\"12b3c-ak0Y5XpMVc6ABehrPsRDDsC5fiE\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 76604,
    "path": "../assets/Satoshi-Italic.FMxkCD8o.ttf"
  },
  "/assets/Satoshi-Italic.wVmEEc6M.woff2": {
    "type": "font/woff2",
    "etag": "\"6758-sUUjT6H/meD32drfbRXppYnRXqE\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 26456,
    "path": "../assets/Satoshi-Italic.wVmEEc6M.woff2"
  },
  "/assets/Satoshi-Light.B82kzbU-.ttf": {
    "type": "font/ttf",
    "etag": "\"11804-6iNGjVWtmnaVjPhKUrcbZb6jXbA\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 71684,
    "path": "../assets/Satoshi-Light.B82kzbU-.ttf"
  },
  "/assets/Satoshi-Light.C_dmkKXz.woff": {
    "type": "font/woff",
    "etag": "\"725c-KD28JKvy8FTDeIrVnk+1MJ0tDXY\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 29276,
    "path": "../assets/Satoshi-Light.C_dmkKXz.woff"
  },
  "/assets/Satoshi-Light.IqwJ_ZjS.woff2": {
    "type": "font/woff2",
    "etag": "\"5910-thSiarRJlhdAbmmhZKf3Cht7M74\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 22800,
    "path": "../assets/Satoshi-Light.IqwJ_ZjS.woff2"
  },
  "/assets/Satoshi-LightItalic.B9L6s97T.woff": {
    "type": "font/woff",
    "etag": "\"7680-Cv6xiIaWksLBcvsQWJxidY/Jc20\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 30336,
    "path": "../assets/Satoshi-LightItalic.B9L6s97T.woff"
  },
  "/assets/Satoshi-LightItalic.BAhuxY-A.ttf": {
    "type": "font/ttf",
    "etag": "\"12688-7l0NU16SH1SPUOrx7Hk0Vn5w0Q0\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 75400,
    "path": "../assets/Satoshi-LightItalic.BAhuxY-A.ttf"
  },
  "/assets/Satoshi-LightItalic.C9iuU4v7.woff2": {
    "type": "font/woff2",
    "etag": "\"5b70-FEEy4vZu59Ye1PQ7KFS+nHungGo\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 23408,
    "path": "../assets/Satoshi-LightItalic.C9iuU4v7.woff2"
  },
  "/assets/Satoshi-Medium.ByP-Zb-9.woff2": {
    "type": "font/woff2",
    "etag": "\"63fc-f23jQcvGBYuDdr2LJlaNNbHTj88\"",
    "mtime": "2025-04-10T07:35:54.342Z",
    "size": 25596,
    "path": "../assets/Satoshi-Medium.ByP-Zb-9.woff2"
  },
  "/assets/Satoshi-Medium.DDwDPeBg.woff": {
    "type": "font/woff",
    "etag": "\"81f8-fzPHxF9fH0xuWrLGZpo+cEHb5oU\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 33272,
    "path": "../assets/Satoshi-Medium.DDwDPeBg.woff"
  },
  "/assets/Satoshi-Medium.DOt9kM-a.ttf": {
    "type": "font/ttf",
    "etag": "\"1201c-5FOfRojIZSBKh53DJT01R/BESBg\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 73756,
    "path": "../assets/Satoshi-Medium.DOt9kM-a.ttf"
  },
  "/assets/Satoshi-MediumItalic.BPTJUpxz.woff": {
    "type": "font/woff",
    "etag": "\"8710-IRL+qCsT1WlKdogklcuneyZFxy4\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 34576,
    "path": "../assets/Satoshi-MediumItalic.BPTJUpxz.woff"
  },
  "/assets/Satoshi-MediumItalic.BUFVYoD2.ttf": {
    "type": "font/ttf",
    "etag": "\"12b98-3wUITKdAG2qS1J4/xXIPvf+/v7w\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 76696,
    "path": "../assets/Satoshi-MediumItalic.BUFVYoD2.ttf"
  },
  "/assets/Satoshi-MediumItalic.BxR-IcRj.woff2": {
    "type": "font/woff2",
    "etag": "\"6848-yy8XGdPzEnCrAywDqXvewMBOJJA\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 26696,
    "path": "../assets/Satoshi-MediumItalic.BxR-IcRj.woff2"
  },
  "/assets/Satoshi-Regular.CPM9dct4.woff2": {
    "type": "font/woff2",
    "etag": "\"63ac-IWM8fM26KEbq5xVU/Cp896DZD/I\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 25516,
    "path": "../assets/Satoshi-Regular.CPM9dct4.woff2"
  },
  "/assets/Satoshi-Regular.CWSyEjGv.woff": {
    "type": "font/woff",
    "etag": "\"8100-0yFpglK3jVYQPMAavtrS0bTWcJs\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 33024,
    "path": "../assets/Satoshi-Regular.CWSyEjGv.woff"
  },
  "/assets/Satoshi-Regular.DToFXog2.ttf": {
    "type": "font/ttf",
    "etag": "\"11f04-vGBaoIRoz7mkAnWmOGraVskqW+0\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 73476,
    "path": "../assets/Satoshi-Regular.DToFXog2.ttf"
  },
  "/assets/ZMaZ9BTu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b0-8Jy+FO7e+4P/9qjDOI1fIakeUB8\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 432,
    "path": "../assets/ZMaZ9BTu.js"
  },
  "/assets/about-us.CcB1ZWYX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8e6-fRXxkY9IdNkB4Qpl97wmCEv20kA\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 2278,
    "path": "../assets/about-us.CcB1ZWYX.css"
  },
  "/assets/admin.n9TyMqAR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"226-2kZv85P/XBaKAB8z7uhQZxy9v28\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 550,
    "path": "../assets/admin.n9TyMqAR.css"
  },
  "/assets/all-contact-info.D2MwO9p1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"440-THz7rXTuTaE0auwn0gfcb6gjC6o\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 1088,
    "path": "../assets/all-contact-info.D2MwO9p1.css"
  },
  "/assets/announcement.Cr2WHkWY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-IzckZVzBmfWFu9f+ooEmSabp+gw\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 919,
    "path": "../assets/announcement.Cr2WHkWY.css"
  },
  "/assets/application-form.DXUBT5sI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"121-15FaserjXd9HyXJppTkrZ7g2Nlg\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 289,
    "path": "../assets/application-form.DXUBT5sI.css"
  },
  "/assets/bootstrap-icons.DSXWTQaD.woff2": {
    "type": "font/woff2",
    "etag": "\"1d9d0-F9rQd2iZrRvq2r0GHDTioiss3nQ\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 121296,
    "path": "../assets/bootstrap-icons.DSXWTQaD.woff2"
  },
  "/assets/bootstrap-icons.DTeOS7dS.woff": {
    "type": "font/woff",
    "etag": "\"28200-dZGccXzlxbxxa8UXBcDNC2D0v/w\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 164352,
    "path": "../assets/bootstrap-icons.DTeOS7dS.woff"
  },
  "/assets/breadcrumb-one.FjJfrjWq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b-VYvYxOdHg/Kauo6QM8wjrRXUisQ\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 59,
    "path": "../assets/breadcrumb-one.FjJfrjWq.css"
  },
  "/assets/censor-standard.BVtJMNh5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-RuPs19MBDMUDBHywSlLkzHJkl7k\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 720,
    "path": "../assets/censor-standard.BVtJMNh5.css"
  },
  "/assets/company-statute.zW0I--tl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32d-2MBUjA6Wf5h/OHlOSI0FrsGntC8\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 813,
    "path": "../assets/company-statute.zW0I--tl.css"
  },
  "/assets/conduct-plan.BTt5TR3R.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-w5kIHwqusJzLTcbVtZ5foEdG1Ck\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 720,
    "path": "../assets/conduct-plan.BTt5TR3R.css"
  },
  "/assets/contact.I8R1SwDS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"465-k6FU6RpzvlBR1qTNTFg21fZ8Twk\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 1125,
    "path": "../assets/contact.I8R1SwDS.css"
  },
  "/assets/convert-principle.BZHCRG5B.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-PIJj/yDKDnWs1/nOyeamegp4mIU\"",
    "mtime": "2025-04-10T07:35:54.343Z",
    "size": 720,
    "path": "../assets/convert-principle.BZHCRG5B.css"
  },
  "/assets/default.-h_edMOl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-SmpSuEalQiX9i0KHw9JEnNYg114\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 97,
    "path": "../assets/default.-h_edMOl.css"
  },
  "/assets/employment-services.BCOgZKZ9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-izw0hflg6cjjeOd73q1uuDrtibQ\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 720,
    "path": "../assets/employment-services.BCOgZKZ9.css"
  },
  "/assets/entry.DtYXfDAR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"352c-+XSPBx1xeKy1Ip51FxAhkrOTqVM\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 13612,
    "path": "../assets/entry.DtYXfDAR.css"
  },
  "/assets/faq.D7c6A40b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f0-TDjIaW6KZhXxuswpGs/BPlKgNmY\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1264,
    "path": "../assets/faq.D7c6A40b.css"
  },
  "/assets/foreign-famliy-link.BH3iTk0H.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a2-VFTtXy/fbWsSgAgViUJZmpU4550\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 418,
    "path": "../assets/foreign-famliy-link.BH3iTk0H.css"
  },
  "/assets/hXiZFfwy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c22-D+lDs+K7KSa9oVseIkzwv4AKi3s\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 11298,
    "path": "../assets/hXiZFfwy.js"
  },
  "/assets/iX6uelH_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"699-p8Znkm7h6fkFGK/+C7a+J0XWBcc\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1689,
    "path": "../assets/iX6uelH_.js"
  },
  "/assets/index.4uOfb_qe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-2tDBN+9cGK1ZFS/rgw7sLHYlcys\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 919,
    "path": "../assets/index.4uOfb_qe.css"
  },
  "/assets/index.D28eu_DT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"458-hPIwkeZUIjCMLKDjEuNCcPQGU5M\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1112,
    "path": "../assets/index.D28eu_DT.css"
  },
  "/assets/index.D5_Gfe-Q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-gseEgU+PDFgly55JzKFoQsCpJ9g\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 919,
    "path": "../assets/index.D5_Gfe-Q.css"
  },
  "/assets/index.Dz8AXAlD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"92b-JGPgF6VvBoamtfYNh4bOw1awetk\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 2347,
    "path": "../assets/index.Dz8AXAlD.css"
  },
  "/assets/joGTLTU5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e7-D9UDF/pSkWCZvzfZIT1StJmWTGs\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 2023,
    "path": "../assets/joGTLTU5.js"
  },
  "/assets/join-us-unit.DYDpIsJs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c3-xBuh8em7qNx5+s5320PbgAL3iR0\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 963,
    "path": "../assets/join-us-unit.DYDpIsJs.css"
  },
  "/assets/join-us.tW0T7HDv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9f-eYMdLAKuuYDn5MXKL7NgPFQvhTw\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 159,
    "path": "../assets/join-us.tW0T7HDv.css"
  },
  "/assets/knowledge.Bjs0LHUV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d3e-45DB/Y2Hkg5IlXJpFFwhwy2G0ao\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 3390,
    "path": "../assets/knowledge.Bjs0LHUV.css"
  },
  "/assets/lazy-bag.DLTuVNgY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f9-J/xk0cSD0S9Ww3XY699tEIYduOU\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 505,
    "path": "../assets/lazy-bag.DLTuVNgY.css"
  },
  "/assets/links.BECa8f2-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51b-li2CEOPB/lIaM12zZbryYCuvpKc\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1307,
    "path": "../assets/links.BECa8f2-.css"
  },
  "/assets/login.CTe5p9kG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79d-BKymmXdZmYUr67EWK0klpRSQu4E\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1949,
    "path": "../assets/login.CTe5p9kG.css"
  },
  "/assets/news-details-area.DzgBBcG0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e5b-kTJ89sMs9N6xnvztnsCjowPurYw\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 3675,
    "path": "../assets/news-details-area.DzgBBcG0.css"
  },
  "/assets/propaganda.BZ0qOj1d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ac5-+5oHTpNUGeJIq9bjLakbgiJfpkc\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 2757,
    "path": "../assets/propaganda.BZ0qOj1d.css"
  },
  "/assets/qa.CiLPdxdO.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b2-39RBH6jM2bWTjXolItXhxgqMIqo\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 946,
    "path": "../assets/qa.CiLPdxdO.css"
  },
  "/assets/qa_setting.bie8qpzb.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1629-1RdOt9wpOEnmX0cOpr86bmCM3zY\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 5673,
    "path": "../assets/qa_setting.bie8qpzb.css"
  },
  "/assets/reserve-guide.DIF1SbjF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ab-s75A7PcUbdvC0UDHGaNx61HanBA\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1451,
    "path": "../assets/reserve-guide.DIF1SbjF.css"
  },
  "/assets/service-apply-form.B41zIWwn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1eb-3rv0aFul32NvAbQbp5bUZ/1MChc\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 491,
    "path": "../assets/service-apply-form.B41zIWwn.css"
  },
  "/assets/service-now.BP_7a85e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"572-S6J4eqLxG3rFocWRRlQXvKa6WIM\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1394,
    "path": "../assets/service-now.BP_7a85e.css"
  },
  "/assets/service-unit-list-area.BNAI2F_i.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c20-H0VxLCeGpLaajAwjKJvvaKXpEF0\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 3104,
    "path": "../assets/service-unit-list-area.BNAI2F_i.css"
  },
  "/assets/services.B46_FNYA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f0-CHicRyUdTDb3H7zuMks6xF6Diuk\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 1264,
    "path": "../assets/services.B46_FNYA.css"
  },
  "/assets/vDpqUfwm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"258-JIrZ7ype91xnybO/NCWrC1Yrtx8\"",
    "mtime": "2025-04-10T07:35:54.344Z",
    "size": 600,
    "path": "../assets/vDpqUfwm.js"
  },
  "/assets/xNitgvn6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f5-1xY6TbzuDyz4CathD45wvnTWCSA\"",
    "mtime": "2025-04-10T07:35:54.345Z",
    "size": 501,
    "path": "../assets/xNitgvn6.js"
  },
  "/faq/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85c47-RQ7Aol9JLrNSMWmKPx6HLh2+lm0\"",
    "mtime": "2025-04-10T07:35:53.935Z",
    "size": 547911,
    "path": "../faq/index.html"
  },
  "/join-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8a396-M50yql19/eG7Zk4+u5Wwj6/TNa0\"",
    "mtime": "2025-04-10T07:35:54.316Z",
    "size": 566166,
    "path": "../join-us/index.html"
  },
  "/join-us-unit/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86062-gZjnQdNlU9iWc8g4itMVMJfUxQE\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 548962,
    "path": "../join-us-unit/index.html"
  },
  "/foreign-famliy-link/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85d21-4TN2AEQOst/BJQ5VRugf5E8Lfz0\"",
    "mtime": "2025-04-10T07:35:54.259Z",
    "size": 548129,
    "path": "../foreign-famliy-link/index.html"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-wUTsEjCC2OyI7i/K0qU7xNEkrFs\"",
    "mtime": "2025-04-10T07:35:54.380Z",
    "size": 8196,
    "path": "../images/.DS_Store"
  },
  "/images/2021-12-23.jpg": {
    "type": "image/jpeg",
    "etag": "\"53303-e2wOLCOU5qJBTFyumNAII/HLeZY\"",
    "mtime": "2025-04-10T07:35:54.382Z",
    "size": 340739,
    "path": "../images/2021-12-23.jpg"
  },
  "/images/bg_1.png": {
    "type": "image/png",
    "etag": "\"f3c1b-D87qMRIklEQ8zmqdZQ156n/F6Bk\"",
    "mtime": "2025-04-10T07:35:54.369Z",
    "size": 998427,
    "path": "../images/bg_1.png"
  },
  "/images/bg_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"47c59-qzAY9397SjCE+PfuF6gON+8mjJM\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 293977,
    "path": "../images/bg_2.jpg"
  },
  "/images/bg_3.png": {
    "type": "image/png",
    "etag": "\"8b2bd-I2/sIZtO/ZWeE9NFbNAF/eLfHCs\"",
    "mtime": "2025-04-10T07:35:54.385Z",
    "size": 570045,
    "path": "../images/bg_3.png"
  },
  "/images/bg_4.png": {
    "type": "image/png",
    "etag": "\"1d7d85-M2ZDH6I/YzSAXPbuty6FxoK7QfA\"",
    "mtime": "2025-04-10T07:35:54.387Z",
    "size": 1932677,
    "path": "../images/bg_4.png"
  },
  "/images/lazy.svg": {
    "type": "image/svg+xml",
    "etag": "\"1d9-182lKBfMaw6HjASXnwU0cGi4+Ww\"",
    "mtime": "2025-04-10T07:35:54.380Z",
    "size": 473,
    "path": "../images/lazy.svg"
  },
  "/images/loader.svg": {
    "type": "image/svg+xml",
    "etag": "\"299-3PblG7D1tbbG6uw+fJ84FClXbog\"",
    "mtime": "2025-04-10T07:35:54.384Z",
    "size": 665,
    "path": "../images/loader.svg"
  },
  "/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13b51-3cbp6tbRaukjc5nOQejBYgzFnDY\"",
    "mtime": "2025-04-10T07:35:54.367Z",
    "size": 80721,
    "path": "../js/bootstrap.bundle.min.js"
  },
  "/lazy-bag/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8533c-hM6B4Agi34210NmykTCQqCL0W60\"",
    "mtime": "2025-04-10T07:35:54.316Z",
    "size": 545596,
    "path": "../lazy-bag/index.html"
  },
  "/links/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86f01-iqKh1ZdFqUGArDXSJctMA8r/Qno\"",
    "mtime": "2025-04-10T07:35:53.904Z",
    "size": 552705,
    "path": "../links/index.html"
  },
  "/news/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"856da-Ab1PhqYDRzEjxYcmEGPUDn9yUq4\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 546522,
    "path": "../news/index.html"
  },
  "/propaganda/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86229-y0AMEdAQRI3os80bldYpDyav1k0\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 549417,
    "path": "../propaganda/index.html"
  },
  "/qa/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85385-PxjRFIOK6hsQYcKxdKCSZnFMmjY\"",
    "mtime": "2025-04-10T07:35:54.280Z",
    "size": 545669,
    "path": "../qa/index.html"
  },
  "/reserve-guide/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"863fb-xkLCgxv6hW0ppROYIFYj8Dfo6h8\"",
    "mtime": "2025-04-10T07:35:53.903Z",
    "size": 549883,
    "path": "../reserve-guide/index.html"
  },
  "/service-apply-form/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"853e5-wNYo4wNsfDxw6hfqH0KHAfu4lIo\"",
    "mtime": "2025-04-10T07:35:53.904Z",
    "size": 545765,
    "path": "../service-apply-form/index.html"
  },
  "/service-price/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"84f76-LYh8iyh6T+t3uy57lchaLbw981I\"",
    "mtime": "2025-04-10T07:35:54.274Z",
    "size": 544630,
    "path": "../service-price/index.html"
  },
  "/service-now/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86fa5-Kzl9pazLUw8Fk96hXUA4VgqqtFs\"",
    "mtime": "2025-04-10T07:35:54.094Z",
    "size": 552869,
    "path": "../service-now/index.html"
  },
  "/services/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"872ab-dADS6n2Rp17U6wEFuIt+aDmsZgQ\"",
    "mtime": "2025-04-10T07:35:54.285Z",
    "size": 553643,
    "path": "../services/index.html"
  },
  "/service-v1/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"865a3-iX5WDRTkgbzf0uUHHvvYUsXs0n0\"",
    "mtime": "2025-04-10T07:35:54.310Z",
    "size": 550307,
    "path": "../service-v1/index.html"
  },
  "/support/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85f5c-RiuivhLyoMOlvQ3wczB3K7IuJMM\"",
    "mtime": "2025-04-10T07:35:54.094Z",
    "size": 548700,
    "path": "../support/index.html"
  },
  "/story/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8563e-pfWNgwP7nBvfMe9/cscE86moP5w\"",
    "mtime": "2025-04-10T07:35:54.054Z",
    "size": 546366,
    "path": "../story/index.html"
  },
  "/uploads/1740206726089-3月.png": {
    "type": "image/png",
    "etag": "\"240ad8-sPOMrrzmia3iC5Twq7q3/Qt4jro\"",
    "mtime": "2025-04-10T07:35:54.371Z",
    "size": 2362072,
    "path": "../uploads/1740206726089-3月.png"
  },
  "/uploads/1740207158706-3月.png": {
    "type": "image/png",
    "etag": "\"240ad8-sPOMrrzmia3iC5Twq7q3/Qt4jro\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 2362072,
    "path": "../uploads/1740207158706-3月.png"
  },
  "/uploads/1740207265814-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740207265814-crying.png"
  },
  "/uploads/1740208785036-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.373Z",
    "size": 6963,
    "path": "../uploads/1740208785036-crying.png"
  },
  "/uploads/1740212939318-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740212939318-crying.png"
  },
  "/uploads/1740213006607-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740213006607-crying.png"
  },
  "/uploads/1740213079068-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740213079068-crying.png"
  },
  "/uploads/1740213118351-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740213118351-crying.png"
  },
  "/uploads/1740213300315-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-04-10T07:35:54.375Z",
    "size": 6963,
    "path": "../uploads/1740213300315-crying.png"
  },
  "/uploads/1740213313019-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-04-10T07:35:54.379Z",
    "size": 512217,
    "path": "../uploads/1740213313019-S__17571843.jpg"
  },
  "/uploads/1740213348339-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-04-10T07:35:54.380Z",
    "size": 512217,
    "path": "../uploads/1740213348339-S__17571843.jpg"
  },
  "/uploads/1740213437020-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-04-10T07:35:54.380Z",
    "size": 512217,
    "path": "../uploads/1740213437020-S__17571843.jpg"
  },
  "/admin/knowledge/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-04-10T07:35:53.713Z",
    "size": 98,
    "path": "../admin/knowledge/index.html"
  },
  "/admin/login/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"83027-Q8U5MI3o/St3UAYc3fRFWttU1DQ\"",
    "mtime": "2025-04-10T07:35:54.004Z",
    "size": 536615,
    "path": "../admin/login/index.html"
  },
  "/blog-details/7/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"871e8-Bj8WptFLx4HgklSt10vnA+oSIrc\"",
    "mtime": "2025-04-10T07:35:54.250Z",
    "size": 553448,
    "path": "../blog-details/7/index.html"
  },
  "/admin/qa_setting/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-04-10T07:35:53.713Z",
    "size": 98,
    "path": "../admin/qa_setting/index.html"
  },
  "/blog-details/8/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"871e3-r/Io3+Po3VDP+xhhUSGG44Fy+dM\"",
    "mtime": "2025-04-10T07:35:54.250Z",
    "size": 553443,
    "path": "../blog-details/8/index.html"
  },
  "/assets/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-7YIH+R6iuIQb0VEY1m8oTcMABoM\"",
    "mtime": "2025-04-10T07:35:54.329Z",
    "size": 71,
    "path": "../assets/builds/latest.json"
  },
  "/images/assets/EDM_A4_0325.jpg": {
    "type": "image/jpeg",
    "etag": "\"28f679-1tXirYMQQtb0KazfluSuM9gzrfw\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 2684537,
    "path": "../images/assets/EDM_A4_0325.jpg"
  },
  "/images/assets/banner.avif": {
    "type": "image/avif",
    "etag": "\"ebb6-KScc6qwUPWb3V3gLxQ7IztryfhA\"",
    "mtime": "2025-04-10T07:35:54.368Z",
    "size": 60342,
    "path": "../images/assets/banner.avif"
  },
  "/images/assets/banner0109.avif": {
    "type": "image/avif",
    "etag": "\"e32a-16ftk7/406hUAlhPyQkWDBSfYNU\"",
    "mtime": "2025-04-10T07:35:54.395Z",
    "size": 58154,
    "path": "../images/assets/banner0109.avif"
  },
  "/images/assets/bg_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"16232-ZNMPh2/u/561/oUUr+Ytbu0sTeM\"",
    "mtime": "2025-04-10T07:35:54.396Z",
    "size": 90674,
    "path": "../images/assets/bg_01.svg"
  },
  "/images/assets/bg_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"15bc5-0ODBQ9H7Khk6QQtpDtrlwA9rZPE\"",
    "mtime": "2025-04-10T07:35:54.395Z",
    "size": 89029,
    "path": "../images/assets/bg_02.svg"
  },
  "/images/assets/bg_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"1601b-BnJViDthF7jmOGLngLcUVkKRAkY\"",
    "mtime": "2025-04-10T07:35:54.396Z",
    "size": 90139,
    "path": "../images/assets/bg_03.svg"
  },
  "/images/assets/bg_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"d7074-wDkTDITEiRDKju2TfxC2DFVJr9A\"",
    "mtime": "2025-04-10T07:35:54.398Z",
    "size": 880756,
    "path": "../images/assets/bg_04.svg"
  },
  "/images/assets/bg_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"4761-0qoP0KqRfiLtBy4f8QCJgnT4yS0\"",
    "mtime": "2025-04-10T07:35:54.396Z",
    "size": 18273,
    "path": "../images/assets/bg_05.svg"
  },
  "/images/assets/bg_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f4-7S9MSp3blPUMTvbx2Io5AEeYU7s\"",
    "mtime": "2025-04-10T07:35:54.396Z",
    "size": 756,
    "path": "../images/assets/bg_06.svg"
  },
  "/images/assets/bg_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"311-BuMz/JJHL/uDGWbPMWZ1QbAku6E\"",
    "mtime": "2025-04-10T07:35:54.396Z",
    "size": 785,
    "path": "../images/assets/bg_07.svg"
  },
  "/images/assets/bg_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"7ae-HFT761/ergAEukqKVKE7kLKeBUE\"",
    "mtime": "2025-04-10T07:35:54.397Z",
    "size": 1966,
    "path": "../images/assets/bg_08.svg"
  },
  "/images/assets/book-1.avif": {
    "type": "image/avif",
    "etag": "\"275b-0cxai7+0JPKKH7L7Q/F0a6xEA3M\"",
    "mtime": "2025-04-10T07:35:54.397Z",
    "size": 10075,
    "path": "../images/assets/book-1.avif"
  },
  "/images/assets/book-10.avif": {
    "type": "image/avif",
    "etag": "\"1772-665HUEd+9iusiVncQKH66LQCAc4\"",
    "mtime": "2025-04-10T07:35:54.397Z",
    "size": 6002,
    "path": "../images/assets/book-10.avif"
  },
  "/images/assets/book-11.avif": {
    "type": "image/avif",
    "etag": "\"3bc0-jw3qmgZy9XEICPTtiBEIXhByHr0\"",
    "mtime": "2025-04-10T07:35:54.397Z",
    "size": 15296,
    "path": "../images/assets/book-11.avif"
  },
  "/images/assets/book-12.avif": {
    "type": "image/avif",
    "etag": "\"3651-iRu837lLKa7Al1XwYd3/iHSwswo\"",
    "mtime": "2025-04-10T07:35:54.397Z",
    "size": 13905,
    "path": "../images/assets/book-12.avif"
  },
  "/images/assets/book-2.avif": {
    "type": "image/avif",
    "etag": "\"2b74-rPasD6qaXe2sg2Js9+tfabURVAg\"",
    "mtime": "2025-04-10T07:35:54.398Z",
    "size": 11124,
    "path": "../images/assets/book-2.avif"
  },
  "/images/assets/book-3.avif": {
    "type": "image/avif",
    "etag": "\"54a2-OZsqzT/hi+xBNMkUR21FCTnA79Q\"",
    "mtime": "2025-04-10T07:35:54.398Z",
    "size": 21666,
    "path": "../images/assets/book-3.avif"
  },
  "/images/assets/book-4.avif": {
    "type": "image/avif",
    "etag": "\"bf0a-1+KygENOimbBtrYFsLP33OKJL4I\"",
    "mtime": "2025-04-10T07:35:54.399Z",
    "size": 48906,
    "path": "../images/assets/book-4.avif"
  },
  "/images/assets/book-5.avif": {
    "type": "image/avif",
    "etag": "\"3b05-uFV5hPi+jiWRnPksYTswONE1Ki8\"",
    "mtime": "2025-04-10T07:35:54.398Z",
    "size": 15109,
    "path": "../images/assets/book-5.avif"
  },
  "/images/assets/book-6.avif": {
    "type": "image/avif",
    "etag": "\"48aa-YFK1JUGo2BzzmMydLB734IQdKTA\"",
    "mtime": "2025-04-10T07:35:54.399Z",
    "size": 18602,
    "path": "../images/assets/book-6.avif"
  },
  "/images/assets/book-7.avif": {
    "type": "image/avif",
    "etag": "\"2d9b-+Qt9o+V3yoW8TJoj5adFNoWPPTw\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 11675,
    "path": "../images/assets/book-7.avif"
  },
  "/images/assets/book-8.avif": {
    "type": "image/avif",
    "etag": "\"1d40-aJDSWIR+i6VD3My5MhL7bLGuObU\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 7488,
    "path": "../images/assets/book-8.avif"
  },
  "/images/assets/book-9.avif": {
    "type": "image/avif",
    "etag": "\"1fb4-cUbmE6ak251tugLFJGjlVFg45w4\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 8116,
    "path": "../images/assets/book-9.avif"
  },
  "/images/assets/brand-1.avif": {
    "type": "image/avif",
    "etag": "\"1be4-1SX+DKluS9SyIPY9llOPqne86Ok\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 7140,
    "path": "../images/assets/brand-1.avif"
  },
  "/images/assets/brand-2.avif": {
    "type": "image/avif",
    "etag": "\"19b7-ETYg6k7ejsbPIidzU+TJFAZgofQ\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 6583,
    "path": "../images/assets/brand-2.avif"
  },
  "/images/assets/brand-3.avif": {
    "type": "image/avif",
    "etag": "\"1b05-7sSpnp9P9jBPfU/D0JU9lYh2ZuI\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 6917,
    "path": "../images/assets/brand-3.avif"
  },
  "/images/assets/brand-4.avif": {
    "type": "image/avif",
    "etag": "\"270b-iviDOsWGo26UnOuTaFmvpLBrdls\"",
    "mtime": "2025-04-10T07:35:54.403Z",
    "size": 9995,
    "path": "../images/assets/brand-4.avif"
  },
  "/images/assets/brand-5.avif": {
    "type": "image/avif",
    "etag": "\"32be-UaRJ1UlGPzOa0p1h7eFHeBD7p3o\"",
    "mtime": "2025-04-10T07:35:54.401Z",
    "size": 12990,
    "path": "../images/assets/brand-5.avif"
  },
  "/images/assets/brand-6.avif": {
    "type": "image/avif",
    "etag": "\"2285-xpQbxzqDcVU0+EOPVK7/UGP+Deg\"",
    "mtime": "2025-04-10T07:35:54.403Z",
    "size": 8837,
    "path": "../images/assets/brand-6.avif"
  },
  "/images/assets/businessman.png": {
    "type": "image/png",
    "etag": "\"31d7f-scSNME1iH4eKcCN0Rb+K3qlfPVQ\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 204159,
    "path": "../images/assets/businessman.png"
  },
  "/images/assets/businessman_01.png": {
    "type": "image/png",
    "etag": "\"26882-SFF7LoWBhlnjaJaf9HBRsnLnoug\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 157826,
    "path": "../images/assets/businessman_01.png"
  },
  "/images/assets/businessman_02.png": {
    "type": "image/png",
    "etag": "\"e473-ier9CtTGmEg6dk1E/avMKJMvuhc\"",
    "mtime": "2025-04-10T07:35:54.403Z",
    "size": 58483,
    "path": "../images/assets/businessman_02.png"
  },
  "/images/assets/businessman_03.png": {
    "type": "image/png",
    "etag": "\"ed61-bVNcVjbjNT9TuZewmrjcLf6LDCc\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 60769,
    "path": "../images/assets/businessman_03.png"
  },
  "/images/assets/flag-1.avif": {
    "type": "image/avif",
    "etag": "\"1aa6-pBS8yIpVBIVHy5M1Fa/F9fpVGeE\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 6822,
    "path": "../images/assets/flag-1.avif"
  },
  "/images/assets/flag-2.avif": {
    "type": "image/avif",
    "etag": "\"a96-GEFO4C6tr8ssooD/7Z4oJ8TwuZY\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 2710,
    "path": "../images/assets/flag-2.avif"
  },
  "/images/assets/flag-3.avif": {
    "type": "image/avif",
    "etag": "\"437-xq7IUivPe7YKFXHNRGAoGo4RjtQ\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 1079,
    "path": "../images/assets/flag-3.avif"
  },
  "/images/assets/flag-4.avif": {
    "type": "image/avif",
    "etag": "\"5c5-cMUBmihendo8PyrE6pD4Oq9otOQ\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 1477,
    "path": "../images/assets/flag-4.avif"
  },
  "/images/assets/gov-logo.avif": {
    "type": "image/avif",
    "etag": "\"b5d-nGU9usd/di5oYrQeIwKYyg9VmnQ\"",
    "mtime": "2025-04-10T07:35:54.404Z",
    "size": 2909,
    "path": "../images/assets/gov-logo.avif"
  },
  "/images/assets/haland-price.avif": {
    "type": "image/avif",
    "etag": "\"f4af-UcTCRYqq1dTxrOpWswQANnJ3mvg\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 62639,
    "path": "../images/assets/haland-price.avif"
  },
  "/images/assets/hand.png": {
    "type": "image/png",
    "etag": "\"ecf9-OYQSesHu4A27ilbnTDMbD4FOWSU\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 60665,
    "path": "../images/assets/hand.png"
  },
  "/images/assets/ils_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"739d-yhA4huMVfu5SuSgFI4AmzcWKXQA\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 29597,
    "path": "../images/assets/ils_01.svg"
  },
  "/images/assets/ils_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"a8a6-zHxl3NggBq+MQvHvFk/yKg4TJ6A\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 43174,
    "path": "../images/assets/ils_02.svg"
  },
  "/images/assets/ils_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f3b-fzQGEqf8Z6a8GK1Ght/s6rkAp5g\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 28475,
    "path": "../images/assets/ils_03.svg"
  },
  "/images/assets/ils_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"5f9d-DsB7LPnkxSMzOM5QKmxe4Jh49Ww\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 24477,
    "path": "../images/assets/ils_04.svg"
  },
  "/images/assets/ils_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"aaf3-XH5m3vmNH0pDeOT+UAEENSP8VqY\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 43763,
    "path": "../images/assets/ils_05.svg"
  },
  "/images/assets/ils_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"b124-Jk/KhbOE30RjM1uSiN4xjg/o0CQ\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 45348,
    "path": "../images/assets/ils_06.svg"
  },
  "/images/assets/ils_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"5ff9-YNFTKgldEAdfmSNY2TilhLRwVag\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 24569,
    "path": "../images/assets/ils_07.svg"
  },
  "/images/assets/ils_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"a39e-MTSHr/QZ2GgyxRkjMmNbP2W3cAQ\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 41886,
    "path": "../images/assets/ils_08.svg"
  },
  "/images/assets/ils_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"47b3-dnE9pFbMKezyKvjICu4U49kGMgw\"",
    "mtime": "2025-04-10T07:35:54.405Z",
    "size": 18355,
    "path": "../images/assets/ils_09.svg"
  },
  "/images/assets/ils_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"ac5d-YovyG/82+wRsqI9l6WjvtX10M0g\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 44125,
    "path": "../images/assets/ils_10.svg"
  },
  "/images/assets/kao-price.avif": {
    "type": "image/avif",
    "etag": "\"b0cc-Eiq9CV+r0NmB43rSqx79lIkvzOU\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 45260,
    "path": "../images/assets/kao-price.avif"
  },
  "/images/assets/lazybag01.webp": {
    "type": "image/webp",
    "etag": "\"1a7ac-y+naxe/1IWOsm5yt05kqJ5AgGkg\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 108460,
    "path": "../images/assets/lazybag01.webp"
  },
  "/images/assets/lazybag02.webp": {
    "type": "image/webp",
    "etag": "\"191d8-qM3mZEw3ezqqosCj+Hhp2u1VtbE\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 102872,
    "path": "../images/assets/lazybag02.webp"
  },
  "/images/assets/lazybag03.webp": {
    "type": "image/webp",
    "etag": "\"1b36e-jxDmX9xDs+fQbIdz9IDuHMecoxc\"",
    "mtime": "2025-04-10T07:35:54.407Z",
    "size": 111470,
    "path": "../images/assets/lazybag03.webp"
  },
  "/images/assets/link-0.avif": {
    "type": "image/avif",
    "etag": "\"308a-BupkQVdoS2a9MCPEPe225rQxoO0\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 12426,
    "path": "../images/assets/link-0.avif"
  },
  "/images/assets/link-7.avif": {
    "type": "image/avif",
    "etag": "\"4de0-wbvpCSUwFyBfTzfwF2cWtSJjWy8\"",
    "mtime": "2025-04-10T07:35:54.407Z",
    "size": 19936,
    "path": "../images/assets/link-7.avif"
  },
  "/images/assets/link_1966.avif": {
    "type": "image/avif",
    "etag": "\"379a-EjHLgEhV9H2li/Pq+ZrVAzvpOBA\"",
    "mtime": "2025-04-10T07:35:54.406Z",
    "size": 14234,
    "path": "../images/assets/link_1966.avif"
  },
  "/images/assets/link_2.avif": {
    "type": "image/avif",
    "etag": "\"2a88-SqUJmiaOKVz+Optjn8obzkNE/0A\"",
    "mtime": "2025-04-10T07:35:54.407Z",
    "size": 10888,
    "path": "../images/assets/link_2.avif"
  },
  "/images/assets/logo.avif": {
    "type": "image/avif",
    "etag": "\"7a9b-aKRodn/5l7ymebymSOjWrBjGovI\"",
    "mtime": "2025-04-10T07:35:54.407Z",
    "size": 31387,
    "path": "../images/assets/logo.avif"
  },
  "/images/assets/new-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"265cb-EZYrKR43jFZYhG6ZOoO/mZ0MVQc\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 157131,
    "path": "../images/assets/new-01.jpg"
  },
  "/images/assets/new-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"304a2-mJ4YLHq8I/pkO1fDQxAXDWGcCeA\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 197794,
    "path": "../images/assets/new-02.jpg"
  },
  "/images/assets/new-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"283d3-05XxJc3fKUURnwbFfV9yP9UjQJQ\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 164819,
    "path": "../images/assets/new-03.jpg"
  },
  "/images/assets/ogg.png": {
    "type": "image/png",
    "etag": "\"2eb91-0WsCmc9kDp7Fs1BPVSpsXOehQjU\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 191377,
    "path": "../images/assets/ogg.png"
  },
  "/images/assets/qa-img-1.avif": {
    "type": "image/avif",
    "etag": "\"6d01-r2F/wtQDZTmrkA1g9M8daENL5rI\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 27905,
    "path": "../images/assets/qa-img-1.avif"
  },
  "/images/assets/qa-img-2.avif": {
    "type": "image/avif",
    "etag": "\"6d01-r2F/wtQDZTmrkA1g9M8daENL5rI\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 27905,
    "path": "../images/assets/qa-img-2.avif"
  },
  "/images/assets/round_shape.png": {
    "type": "image/png",
    "etag": "\"1553-7JsDmFZudGQlLrZ90Io7tl8azyQ\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 5459,
    "path": "../images/assets/round_shape.png"
  },
  "/images/assets/screen_01.png": {
    "type": "image/png",
    "etag": "\"188d-yzoV7Zd1HUKR/JhR301QN2C/e4o\"",
    "mtime": "2025-04-10T07:35:54.411Z",
    "size": 6285,
    "path": "../images/assets/screen_01.png"
  },
  "/images/assets/screen_02.png": {
    "type": "image/png",
    "etag": "\"c9e3-gwpKHR6sDO/BZIAiQijljiqBGiY\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 51683,
    "path": "../images/assets/screen_02.png"
  },
  "/images/assets/screen_03.png": {
    "type": "image/png",
    "etag": "\"be60-oFpDFEnHqVWYiD0/lR2Rw6yfeiY\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 48736,
    "path": "../images/assets/screen_03.png"
  },
  "/images/assets/screen_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"1668-pSfu7HdiDBRhDhjtzj8On0jIotw\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 5736,
    "path": "../images/assets/screen_04.svg"
  },
  "/images/assets/screen_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"67be-xLHoffUfPYgEvPdv2PdWT1OguL4\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 26558,
    "path": "../images/assets/screen_05.svg"
  },
  "/images/assets/screen_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"76db-pEQkdIHmvbsT+UvEIGFilSsAfFI\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 30427,
    "path": "../images/assets/screen_06.svg"
  },
  "/images/assets/screen_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ce9-ew3fTu7uonttGJrV+PVFicCLiUw\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 11497,
    "path": "../images/assets/screen_07.svg"
  },
  "/images/assets/screen_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f49-WpxwMy8M8wzqavqh9v3+6mteQjI\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 20297,
    "path": "../images/assets/screen_08.svg"
  },
  "/images/assets/screen_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"507c-5uwG/ZMlKSizto0vJeruw+z+Anc\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 20604,
    "path": "../images/assets/screen_09.svg"
  },
  "/images/assets/screen_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ba4a-wRpn85CNXh1fwkPdUbpS47803a0\"",
    "mtime": "2025-04-10T07:35:54.413Z",
    "size": 113226,
    "path": "../images/assets/screen_10.svg"
  },
  "/images/assets/screen_11.png": {
    "type": "image/png",
    "etag": "\"eb3a-bwz1l0mNy2UCHsMZaaU9oz9Yz00\"",
    "mtime": "2025-04-10T07:35:54.413Z",
    "size": 60218,
    "path": "../images/assets/screen_11.png"
  },
  "/images/assets/screen_12.png": {
    "type": "image/png",
    "etag": "\"158d-7RQ0V6hs6pR2gpOeU6qiCBvuc7c\"",
    "mtime": "2025-04-10T07:35:54.412Z",
    "size": 5517,
    "path": "../images/assets/screen_12.png"
  },
  "/images/assets/screen_13.png": {
    "type": "image/png",
    "etag": "\"e357-UfBafo11qKQLJU3wPbGJPxD7i+o\"",
    "mtime": "2025-04-10T07:35:54.413Z",
    "size": 58199,
    "path": "../images/assets/screen_13.png"
  },
  "/images/assets/screen_14.png": {
    "type": "image/png",
    "etag": "\"a0ff-h/ZlFmFW5dzz8Zf83qeP1NCnh6E\"",
    "mtime": "2025-04-10T07:35:54.413Z",
    "size": 41215,
    "path": "../images/assets/screen_14.png"
  },
  "/images/assets/screen_15.png": {
    "type": "image/png",
    "etag": "\"1e899-rQDr9TuUIu9DcvBrvIsqOzrV6Qk\"",
    "mtime": "2025-04-10T07:35:54.413Z",
    "size": 125081,
    "path": "../images/assets/screen_15.png"
  },
  "/images/assets/screen_16.png": {
    "type": "image/png",
    "etag": "\"30047-fA5RZ555h/tCyxAlVtQj9Bwhf4c\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 196679,
    "path": "../images/assets/screen_16.png"
  },
  "/images/assets/screen_17.png": {
    "type": "image/png",
    "etag": "\"ce1b-CYDxIQQAPltFm5nlYOpcZarfGhM\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 52763,
    "path": "../images/assets/screen_17.png"
  },
  "/images/assets/screen_18.png": {
    "type": "image/png",
    "etag": "\"178a-1j8dm2KNl0jliVWc0jmTy63rP54\"",
    "mtime": "2025-04-10T07:35:54.414Z",
    "size": 6026,
    "path": "../images/assets/screen_18.png"
  },
  "/images/assets/screen_19.png": {
    "type": "image/png",
    "etag": "\"1399c-wvqkyG6sR4bvSQZ3FjJAYoaXs8w\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 80284,
    "path": "../images/assets/screen_19.png"
  },
  "/images/assets/screen_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ecf-11EpPN36hM6IyU0Q1AUm222xRBc\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 11983,
    "path": "../images/assets/screen_20.svg"
  },
  "/images/assets/screen_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"867b-AOIkl3sW9Bwud0XURa3XsEc+6TQ\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 34427,
    "path": "../images/assets/screen_21.svg"
  },
  "/images/assets/screen_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"1df1-BWDi9XEsVxvDNEbY3Z7vh0JjgD4\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 7665,
    "path": "../images/assets/screen_22.svg"
  },
  "/images/assets/screen_23.png": {
    "type": "image/png",
    "etag": "\"1e86-bm3tMUpT0+xi+lzE3Ba/KQSVPZo\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 7814,
    "path": "../images/assets/screen_23.png"
  },
  "/images/assets/screen_24.png": {
    "type": "image/png",
    "etag": "\"2fbd-8B7AWqMWo4rcCA/wZ8VOaQthhdo\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 12221,
    "path": "../images/assets/screen_24.png"
  },
  "/images/assets/screen_25.png": {
    "type": "image/png",
    "etag": "\"2c2b-t27XSlRLN+UMO8Ktu/SsrF5BEvc\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 11307,
    "path": "../images/assets/screen_25.png"
  },
  "/images/assets/sticker.png": {
    "type": "image/png",
    "etag": "\"aaa-Y77DQXqmty2yen5a64CML2kF0DI\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 2730,
    "path": "../images/assets/sticker.png"
  },
  "/images/assets/sticker_02.png": {
    "type": "image/png",
    "etag": "\"752-HGHN8Gf1AYWWbf0B4tmgCAx9UuA\"",
    "mtime": "2025-04-10T07:35:54.415Z",
    "size": 1874,
    "path": "../images/assets/sticker_02.png"
  },
  "/images/assets/temp-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"37994-IZvNb+gir7V8ZsuNRdTbfLjraxo\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 227732,
    "path": "../images/assets/temp-1.jpg"
  },
  "/images/assets/temp-14.jpg": {
    "type": "image/jpeg",
    "etag": "\"2afa6-KzRcG57WkmEdxpiylavrcaB+ad4\"",
    "mtime": "2025-04-10T07:35:54.417Z",
    "size": 176038,
    "path": "../images/assets/temp-14.jpg"
  },
  "/images/assets/temp-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b8c9-0H+qtjh6a6CgQoHuCC/TcYhltII\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 243913,
    "path": "../images/assets/temp-2.jpg"
  },
  "/images/assets/temp_10.avif": {
    "type": "image/avif",
    "etag": "\"4f16-oRaVDVdJQQor845Jk6I+om1Kfy4\"",
    "mtime": "2025-04-10T07:35:54.416Z",
    "size": 20246,
    "path": "../images/assets/temp_10.avif"
  },
  "/images/assets/temp_11.avif": {
    "type": "image/avif",
    "etag": "\"2856-LTEkKKsMB6N5r0VK1DcI4YpDMO8\"",
    "mtime": "2025-04-10T07:35:54.416Z",
    "size": 10326,
    "path": "../images/assets/temp_11.avif"
  },
  "/images/assets/temp_12.avif": {
    "type": "image/avif",
    "etag": "\"dc29-cemoUsyPmBiMi0Vho218yEMf8cE\"",
    "mtime": "2025-04-10T07:35:54.417Z",
    "size": 56361,
    "path": "../images/assets/temp_12.avif"
  },
  "/images/assets/temp_13.avif": {
    "type": "image/avif",
    "etag": "\"15d45-KJpSWXywiRHJYwCS0p+KFXigokI\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 89413,
    "path": "../images/assets/temp_13.avif"
  },
  "/images/assets/temp_14.avif": {
    "type": "image/avif",
    "etag": "\"c752-P5rZ+PtaqPCTO89ODX78pFFa+hU\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 51026,
    "path": "../images/assets/temp_14.avif"
  },
  "/images/assets/temp_15.avif": {
    "type": "image/avif",
    "etag": "\"104f6-yhGyIGiqEE96hVxf6Bg8dKoprUw\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 66806,
    "path": "../images/assets/temp_15.avif"
  },
  "/images/assets/temp_4.avif": {
    "type": "image/avif",
    "etag": "\"5c5a-BdioCJHVJF/IB+GAcV+hZeg2vz8\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 23642,
    "path": "../images/assets/temp_4.avif"
  },
  "/images/assets/temp_5.avif": {
    "type": "image/avif",
    "etag": "\"6ebd-ghfw+AJWDYuc7qQGdsE9OrMQstE\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 28349,
    "path": "../images/assets/temp_5.avif"
  },
  "/images/assets/temp_6.avif": {
    "type": "image/avif",
    "etag": "\"6485-ahOzFvBHBL3zQ7odQdAj2KOBd5w\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 25733,
    "path": "../images/assets/temp_6.avif"
  },
  "/images/assets/temp_7.avif": {
    "type": "image/avif",
    "etag": "\"528a-4zp/Odynq/imIPjpD6RaO+xzIes\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 21130,
    "path": "../images/assets/temp_7.avif"
  },
  "/images/assets/temp_8.avif": {
    "type": "image/avif",
    "etag": "\"4035-6b13GlpdR5QC9gBBvahk+9gW5EA\"",
    "mtime": "2025-04-10T07:35:54.418Z",
    "size": 16437,
    "path": "../images/assets/temp_8.avif"
  },
  "/images/assets/temp_9.avif": {
    "type": "image/avif",
    "etag": "\"4ca7-bGXTG5fAuI7RXx+3JVvQZjYSqpI\"",
    "mtime": "2025-04-10T07:35:54.420Z",
    "size": 19623,
    "path": "../images/assets/temp_9.avif"
  },
  "/images/assets/trustpilot.png": {
    "type": "image/png",
    "etag": "\"158a-z6Nhb10KIqQ4TKV9Sv7ncr6kwCI\"",
    "mtime": "2025-04-10T07:35:54.420Z",
    "size": 5514,
    "path": "../images/assets/trustpilot.png"
  },
  "/images/assets/南投-price.avif": {
    "type": "image/avif",
    "etag": "\"f67d-XOlsz01jxmkbksJNNsWAa9jOFcs\"",
    "mtime": "2025-04-10T07:35:54.421Z",
    "size": 63101,
    "path": "../images/assets/南投-price.avif"
  },
  "/images/assets/懶人包-00.jpg": {
    "type": "image/jpeg",
    "etag": "\"dfbb5-8+TFYlKDcbCZ5ZNv4eKRIVyfiTQ\"",
    "mtime": "2025-04-10T07:35:54.424Z",
    "size": 916405,
    "path": "../images/assets/懶人包-00.jpg"
  },
  "/images/assets/懶人包-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"1004f0-xGhQsVvnabOalvtroxxlY2TZ1qo\"",
    "mtime": "2025-04-10T07:35:54.425Z",
    "size": 1049840,
    "path": "../images/assets/懶人包-01.jpg"
  },
  "/images/assets/懶人包-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"ec212-WyEJiSvy5PY1XKo1LsrXFJeTWdI\"",
    "mtime": "2025-04-10T07:35:54.425Z",
    "size": 967186,
    "path": "../images/assets/懶人包-02.jpg"
  },
  "/images/assets/懶人包-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"f338f-fb6STf2gg45Ury0i6hfRSgVis8Q\"",
    "mtime": "2025-04-10T07:35:54.425Z",
    "size": 996239,
    "path": "../images/assets/懶人包-03.jpg"
  },
  "/images/assets/懶人包-04.jpg": {
    "type": "image/jpeg",
    "etag": "\"129cec-fXRc8BAhkiVfmER6KqY1CwHT4Qc\"",
    "mtime": "2025-04-10T07:35:54.431Z",
    "size": 1219820,
    "path": "../images/assets/懶人包-04.jpg"
  },
  "/images/assets/懶人包-05.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce6fa-Jjqli2tEEjD7CkJZL+Nw3N0e1Sk\"",
    "mtime": "2025-04-10T07:35:54.432Z",
    "size": 845562,
    "path": "../images/assets/懶人包-05.jpg"
  },
  "/images/assets/懶人包-06.jpg": {
    "type": "image/jpeg",
    "etag": "\"e482c-nqPCU5QiA8kFwAesB5K219BM3Jo\"",
    "mtime": "2025-04-10T07:35:54.433Z",
    "size": 935980,
    "path": "../images/assets/懶人包-06.jpg"
  },
  "/images/assets/懶人包-07.jpg": {
    "type": "image/jpeg",
    "etag": "\"10bab5-YLjKXbS942/c9pbBvkGHgwAzQf0\"",
    "mtime": "2025-04-10T07:35:54.433Z",
    "size": 1096373,
    "path": "../images/assets/懶人包-07.jpg"
  },
  "/images/assets/懶人包-08.jpg": {
    "type": "image/jpeg",
    "etag": "\"f2660-xd3nbukzbWiUOROAOZ/p7z262Ow\"",
    "mtime": "2025-04-10T07:35:54.434Z",
    "size": 992864,
    "path": "../images/assets/懶人包-08.jpg"
  },
  "/images/assets/懶人包-09.jpg": {
    "type": "image/jpeg",
    "etag": "\"c7c80-gm0H3Pv/eYbCao1s7be2yhkk/vY\"",
    "mtime": "2025-04-10T07:35:54.440Z",
    "size": 818304,
    "path": "../images/assets/懶人包-09.jpg"
  },
  "/images/assets/懶人包-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"ac78e-94T//clnrmWeTi5o9/ml/GHnnRE\"",
    "mtime": "2025-04-10T07:35:54.438Z",
    "size": 706446,
    "path": "../images/assets/懶人包-10.jpg"
  },
  "/images/assets/懶人包-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"bf751-FBpeL/YuKkqaUZgduVnaavit2Nc\"",
    "mtime": "2025-04-10T07:35:54.442Z",
    "size": 784209,
    "path": "../images/assets/懶人包-11.jpg"
  },
  "/images/assets/懶人包-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e1de9-gWGL3S3MpwboHWLTmHVnBnGLQSU\"",
    "mtime": "2025-04-10T07:35:54.442Z",
    "size": 925161,
    "path": "../images/assets/懶人包-12.jpg"
  },
  "/images/assets/懶人包-13.jpg": {
    "type": "image/jpeg",
    "etag": "\"add49-o2z6L3BF1Q3OEE5dDqCzg/8mZK0\"",
    "mtime": "2025-04-10T07:35:54.442Z",
    "size": 712009,
    "path": "../images/assets/懶人包-13.jpg"
  },
  "/images/assets/永信-price.avif": {
    "type": "image/avif",
    "etag": "\"c307-k7gMml+k/O5gEFVTwh6kj9wWFlY\"",
    "mtime": "2025-04-10T07:35:54.440Z",
    "size": 49927,
    "path": "../images/assets/永信-price.avif"
  },
  "/images/assets/紅十字-price.avif": {
    "type": "image/avif",
    "etag": "\"427e-+G05BoxDBy2+TewTK8YB6FnO93A\"",
    "mtime": "2025-04-10T07:35:54.440Z",
    "size": 17022,
    "path": "../images/assets/紅十字-price.avif"
  },
  "/images/assets/財團法人-price.avif": {
    "type": "image/avif",
    "etag": "\"bc6f-diaTEtUhFrTSIKSpmMhpxemP93k\"",
    "mtime": "2025-04-10T07:35:54.441Z",
    "size": 48239,
    "path": "../images/assets/財團法人-price.avif"
  },
  "/images/banner/1-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"754b-mhNrd+QQTEsIB1Fjg2Ow6Jfbcbc\"",
    "mtime": "2025-04-10T07:35:54.387Z",
    "size": 30027,
    "path": "../images/banner/1-1.jpg"
  },
  "/images/banner/1-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a88-puKG/FxiDsGfyhxzVevT8FIteDA\"",
    "mtime": "2025-04-10T07:35:54.385Z",
    "size": 35464,
    "path": "../images/banner/1-2.jpg"
  },
  "/images/banner/2-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d47-wdfPKJayDEkIgCGiC5jLKHNgh5k\"",
    "mtime": "2025-04-10T07:35:54.367Z",
    "size": 32071,
    "path": "../images/banner/2-1.jpg"
  },
  "/images/banner/FreeVector_Volunteershelpingelderlypeople.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e6a-zlcg17f0JsrJoxfemJXYVZbXhLU\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 32362,
    "path": "../images/banner/FreeVector_Volunteershelpingelderlypeople.jpg"
  },
  "/images/banner/PremiumVector_Volunteershelpingelderlypeople.jpg": {
    "type": "image/jpeg",
    "etag": "\"652e-GxDqs8TjqHVWL6t88pMDZK1P0lI\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 25902,
    "path": "../images/banner/PremiumVector_Volunteershelpingelderlypeople.jpg"
  },
  "/images/banner/Unini.jpg": {
    "type": "image/jpeg",
    "etag": "\"35d4-SjpcFdvyboNdyAoM7T7WBu/qEmM\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 13780,
    "path": "../images/banner/Unini.jpg"
  },
  "/images/banner/banner_1.png": {
    "type": "image/png",
    "etag": "\"1a703-mP8sL7+bhwOj6mxV5OG/rWWVc/E\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 108291,
    "path": "../images/banner/banner_1.png"
  },
  "/images/banner/banner_2.png": {
    "type": "image/png",
    "etag": "\"1b35c-u8JpVoXWVgo0mluIBAgJL6V3BW4\"",
    "mtime": "2025-04-10T07:35:54.386Z",
    "size": 111452,
    "path": "../images/banner/banner_2.png"
  },
  "/images/fav-icon/icon.png": {
    "type": "image/png",
    "etag": "\"859-iENNh9mgy0LuQQzQtJ0qaWjUQIY\"",
    "mtime": "2025-04-10T07:35:54.367Z",
    "size": 2137,
    "path": "../images/fav-icon/icon.png"
  },
  "/images/blog/avatar_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"19b0-tZVkXszdmXiAB7tPVFoeHmzQaJQ\"",
    "mtime": "2025-04-10T07:35:54.389Z",
    "size": 6576,
    "path": "../images/blog/avatar_01.jpg"
  },
  "/images/blog/avatar_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"12f2-Dsm1xe5ZfJ6qvC25pOEIgFONStA\"",
    "mtime": "2025-04-10T07:35:54.367Z",
    "size": 4850,
    "path": "../images/blog/avatar_02.jpg"
  },
  "/images/blog/avatar_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"194e-iPUTwX/HCFIdASTzxer35bcq1YU\"",
    "mtime": "2025-04-10T07:35:54.389Z",
    "size": 6478,
    "path": "../images/blog/avatar_03.jpg"
  },
  "/images/blog/blog_img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"e572-3Ct2MntuADaNqHhsgLyJYEInHsM\"",
    "mtime": "2025-04-10T07:35:54.391Z",
    "size": 58738,
    "path": "../images/blog/blog_img_01.jpg"
  },
  "/images/blog/blog_img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"1535c-kVbcy9vxL8A1y5eEyXv7Re3wUgE\"",
    "mtime": "2025-04-10T07:35:54.391Z",
    "size": 86876,
    "path": "../images/blog/blog_img_02.jpg"
  },
  "/images/blog/blog_img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"e123-KVIPKz6CeV4zsYP6Hxv64AEL4BQ\"",
    "mtime": "2025-04-10T07:35:54.391Z",
    "size": 57635,
    "path": "../images/blog/blog_img_03.jpg"
  },
  "/images/blog/blog_img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"14f8a-qi0LedxdOszk72VSHufm5GC8sn0\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 85898,
    "path": "../images/blog/blog_img_04.jpg"
  },
  "/images/blog/blog_img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"123df-zZufqRCwzBQhOjgm6bT4/IW19bA\"",
    "mtime": "2025-04-10T07:35:54.391Z",
    "size": 74719,
    "path": "../images/blog/blog_img_05.jpg"
  },
  "/images/blog/blog_img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcb-otONdVjf3pSCQBfil8+mdf14T0Q\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 85963,
    "path": "../images/blog/blog_img_06.jpg"
  },
  "/images/blog/blog_img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a5bc-T8ytvNlCXsn54o6phr+Ss3eVuHY\"",
    "mtime": "2025-04-10T07:35:54.391Z",
    "size": 107964,
    "path": "../images/blog/blog_img_07.jpg"
  },
  "/images/blog/blog_img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"11405-7puVBjZjnrPEZENMxFtezHE5Iis\"",
    "mtime": "2025-04-10T07:35:54.392Z",
    "size": 70661,
    "path": "../images/blog/blog_img_08.jpg"
  },
  "/images/blog/blog_img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"14b11-cUEYzkKQOfRwuhHbgWrOMO2vW5g\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 84753,
    "path": "../images/blog/blog_img_09.jpg"
  },
  "/images/blog/blog_img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"6366-3fG7Ye7W2xhaLbngXRsA1ZWRB10\"",
    "mtime": "2025-04-10T07:35:54.392Z",
    "size": 25446,
    "path": "../images/blog/blog_img_10.jpg"
  },
  "/images/blog/blog_img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a5f-84NaoZgSTWASBfXLoaU+EM5V8iE\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 23135,
    "path": "../images/blog/blog_img_11.jpg"
  },
  "/images/blog/blog_img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e146-qDOKZMblFruEebB1Y5Mk7uui8hc\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 57670,
    "path": "../images/blog/blog_img_12.jpg"
  },
  "/images/blog/blog_img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"e31d-gl38cmI4YkLJRvSPEgCFi/Ogwsk\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 58141,
    "path": "../images/blog/blog_img_13.jpg"
  },
  "/images/blog/blog_img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"13f8d-gB1GSnyWJa475scoQ8IYamnumis\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 81805,
    "path": "../images/blog/blog_img_14.jpg"
  },
  "/images/blog/blog_img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"ef04-dxn6GW/0UM7QwFEc8ck/TAJy7dM\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 61188,
    "path": "../images/blog/blog_img_15.jpg"
  },
  "/images/blog/blog_img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"8113-Wtge2zZb3aB8QcITpsYHIRijo1o\"",
    "mtime": "2025-04-10T07:35:54.394Z",
    "size": 33043,
    "path": "../images/blog/blog_img_16.jpg"
  },
  "/images/blog/blog_img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"33a1-z4r+KZq2Sgal/8CI1k/HLmLf124\"",
    "mtime": "2025-04-10T07:35:54.395Z",
    "size": 13217,
    "path": "../images/blog/blog_img_17.jpg"
  },
  "/images/logo/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2025-04-10T07:35:54.368Z",
    "size": 6148,
    "path": "../images/logo/.DS_Store"
  },
  "/images/logo/logo_01.png": {
    "type": "image/png",
    "etag": "\"59bf-Yjca2f6ZGM5BRB4Zp7Dt6/fr9D8\"",
    "mtime": "2025-04-10T07:35:54.442Z",
    "size": 22975,
    "path": "../images/logo/logo_01.png"
  },
  "/images/logo/logo_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"f0fb-K7URSgdjGD9CWiqXPT4xI7Je/UE\"",
    "mtime": "2025-04-10T07:35:54.442Z",
    "size": 61691,
    "path": "../images/logo/logo_03.jpg"
  },
  "/images/logo/logo_2.png": {
    "type": "image/png",
    "etag": "\"1946a-yz94II8VonXj4ABxGCAdPEgTsN0\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 103530,
    "path": "../images/logo/logo_2.png"
  },
  "/images/gallery/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cff6-gQtmDyRuxMbVl92qSNoJnTH2o5g\"",
    "mtime": "2025-04-10T07:35:54.369Z",
    "size": 118774,
    "path": "../images/gallery/img_01.jpg"
  },
  "/images/gallery/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"8631-yi4gxG28lUApz4V30kfO380Ew3U\"",
    "mtime": "2025-04-10T07:35:54.444Z",
    "size": 34353,
    "path": "../images/gallery/img_02.jpg"
  },
  "/images/gallery/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e93-8uOncqR0JkRZXDY6Pwn7vQcXSuA\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 40595,
    "path": "../images/gallery/img_03.jpg"
  },
  "/images/gallery/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"644c-5u+vYb40XKXr+YyJbcs2uM+yJ+Y\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 25676,
    "path": "../images/gallery/img_04.jpg"
  },
  "/images/gallery/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"10bd9-IfV8bSkMhJIkxI7ZWANpYNvih3o\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 68569,
    "path": "../images/gallery/img_05.jpg"
  },
  "/images/gallery/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"13435-+G/N7sH4nqsmRBLlzUPaM9IGvws\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 78901,
    "path": "../images/gallery/img_06.jpg"
  },
  "/images/gallery/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"7155-E+qNlK+JpFa7l+GqKme7b3vPQ7A\"",
    "mtime": "2025-04-10T07:35:54.444Z",
    "size": 29013,
    "path": "../images/gallery/img_07.jpg"
  },
  "/images/gallery/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"de77-S2qjsVJv/175Gd5/342O/0SNW9I\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 56951,
    "path": "../images/gallery/img_08.jpg"
  },
  "/images/gallery/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"1be6e-+yks4QO0GaLC0pdt5Q3+bJEvq/k\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 114286,
    "path": "../images/gallery/img_09.jpg"
  },
  "/images/gallery/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"113b7-XIbofXLgR1A9mUDv73BPxSpWNWs\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 70583,
    "path": "../images/gallery/img_10.jpg"
  },
  "/images/gallery/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"112d2-ZgJK6AFkDTefShEWkt0WPb95VAs\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 70354,
    "path": "../images/gallery/img_11.jpg"
  },
  "/images/gallery/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"9323-MpyTxkryXeahCams0koRqjKSDAE\"",
    "mtime": "2025-04-10T07:35:54.445Z",
    "size": 37667,
    "path": "../images/gallery/img_12.jpg"
  },
  "/images/gallery/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf6e-+EdtV6U3+0UxZRwxf+3GZsoABVA\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 53102,
    "path": "../images/gallery/img_13.jpg"
  },
  "/images/gallery/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"eb1c-MXxnWM8Zeg1m6A2XUXTBO8j86Lc\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 60188,
    "path": "../images/gallery/img_14.jpg"
  },
  "/images/gallery/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"18e7d-ushL2K8j/Kpao+eRcrmAS9ynStU\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 102013,
    "path": "../images/gallery/img_15.jpg"
  },
  "/images/gallery/img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"19cbb-PvGBj9UUj0bTPrLTNkkVMrQLZRI\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 105659,
    "path": "../images/gallery/img_16.jpg"
  },
  "/images/gallery/img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"14a5f-k9S8fMPrRuFSwtm5lTHuZ0KpgaM\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 84575,
    "path": "../images/gallery/img_17.jpg"
  },
  "/images/gallery/img_18.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cbc-1oenRQXBvLeiVrzkQr+ghyRYu7E\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 31932,
    "path": "../images/gallery/img_18.jpg"
  },
  "/images/gallery/img_19.jpg": {
    "type": "image/jpeg",
    "etag": "\"e93f-hAVvLfyE/rwoyLSgJH1oYoATVWw\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 59711,
    "path": "../images/gallery/img_19.jpg"
  },
  "/images/gallery/img_20.jpg": {
    "type": "image/jpeg",
    "etag": "\"222c5-g05prsXTRkdzIKgJpZdbcB+Xm8w\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 139973,
    "path": "../images/gallery/img_20.jpg"
  },
  "/images/gallery/img_21.jpg": {
    "type": "image/jpeg",
    "etag": "\"11df1-RBvxWVw9oCSHxA/HCTu6BUGBdTA\"",
    "mtime": "2025-04-10T07:35:54.446Z",
    "size": 73201,
    "path": "../images/gallery/img_21.jpg"
  },
  "/images/gallery/img_22.jpg": {
    "type": "image/jpeg",
    "etag": "\"e8e8-QB0cDC5K2a5T5tlKSWEpni5sgm0\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 59624,
    "path": "../images/gallery/img_22.jpg"
  },
  "/images/media/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"3e5a9-x+1/U3N+pITTjAldR46IdCM8Ol0\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 255401,
    "path": "../images/media/img_01.jpg"
  },
  "/images/media/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ad8f-JRllw/xHWkzcEQuFyzZDAQnRcT0\"",
    "mtime": "2025-04-10T07:35:54.373Z",
    "size": 175503,
    "path": "../images/media/img_02.jpg"
  },
  "/images/media/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b31f-WOaRfeUQccjeTUVqKoKXukFMfqo\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 176927,
    "path": "../images/media/img_03.jpg"
  },
  "/images/media/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"d456-IMSmVCa1jpGhwxwRSoJxOR6h13A\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 54358,
    "path": "../images/media/img_04.jpg"
  },
  "/images/media/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"714b-8vFFtCewyQ/COwGiq10bIAOuVBk\"",
    "mtime": "2025-04-10T07:35:54.447Z",
    "size": 29003,
    "path": "../images/media/img_05.jpg"
  },
  "/images/media/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"73ec-otLjS3YgxY8fzs8APAOcyD3Fp00\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 29676,
    "path": "../images/media/img_06.jpg"
  },
  "/images/media/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"73c3-6YZ1STLDLjCXXOZJ+vTYVQaotaQ\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 29635,
    "path": "../images/media/img_07.jpg"
  },
  "/images/media/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"19b0-tZVkXszdmXiAB7tPVFoeHmzQaJQ\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 6576,
    "path": "../images/media/img_08.jpg"
  },
  "/images/media/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"36e0-TaMC93GI6mNzB4Nuql4rosODdDI\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 14048,
    "path": "../images/media/img_09.jpg"
  },
  "/images/media/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"383c-gaZD6GfTpmuKlzf71LZu55l2Vxg\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 14396,
    "path": "../images/media/img_10.jpg"
  },
  "/images/media/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"7387-hOfg82/thfnhaolDxE2y/6aBHVk\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 29575,
    "path": "../images/media/img_11.jpg"
  },
  "/images/media/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"7f90-Ra0afQMhNyuStu8E2KNEXoknwSg\"",
    "mtime": "2025-04-10T07:35:54.448Z",
    "size": 32656,
    "path": "../images/media/img_12.jpg"
  },
  "/images/media/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"f4ab-Grz0PYtLlzPpApThRS6dl8mL09k\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 62635,
    "path": "../images/media/img_13.jpg"
  },
  "/images/media/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"1747-wFllOkkiW8mEnej2ieAEsDXMzL0\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 5959,
    "path": "../images/media/img_14.jpg"
  },
  "/images/media/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"12f2-Dsm1xe5ZfJ6qvC25pOEIgFONStA\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 4850,
    "path": "../images/media/img_15.jpg"
  },
  "/images/media/img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"ab40-eghsm0g+rxDvv+zclhwtxZZNAgo\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 43840,
    "path": "../images/media/img_16.jpg"
  },
  "/images/media/img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"1375b-OdevPw6vkVdW9bGSj3g0/rN5LuI\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 79707,
    "path": "../images/media/img_17.jpg"
  },
  "/images/media/img_18.jpg": {
    "type": "image/jpeg",
    "etag": "\"a565-izxTF6L0nwwt9yho5/elvQUAm8U\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 42341,
    "path": "../images/media/img_18.jpg"
  },
  "/images/media/img_19.jpg": {
    "type": "image/jpeg",
    "etag": "\"194e-iPUTwX/HCFIdASTzxer35bcq1YU\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 6478,
    "path": "../images/media/img_19.jpg"
  },
  "/images/media/img_20.jpg": {
    "type": "image/jpeg",
    "etag": "\"13c2c-F7ofNLKLUBOfPzM+Gpfy8KIq37s\"",
    "mtime": "2025-04-10T07:35:54.449Z",
    "size": 80940,
    "path": "../images/media/img_20.jpg"
  },
  "/images/media/img_21.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c80c-7K61Q+AfSXisqmhUIm3kNjafb9M\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 116748,
    "path": "../images/media/img_21.jpg"
  },
  "/images/media/img_22.jpg": {
    "type": "image/jpeg",
    "etag": "\"b270-TJIC1qmuPgnYDKIOM42ndY2+DhU\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 45680,
    "path": "../images/media/img_22.jpg"
  },
  "/images/media/img_23.jpg": {
    "type": "image/jpeg",
    "etag": "\"d34f-smxqklYf4Q8WOkuU1Lu21+VRxRo\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 54095,
    "path": "../images/media/img_23.jpg"
  },
  "/images/media/img_24.jpg": {
    "type": "image/jpeg",
    "etag": "\"dc65-oZDvCOd3k9A+jyf6/AJXPT8gOEk\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 56421,
    "path": "../images/media/img_24.jpg"
  },
  "/images/media/img_25.jpg": {
    "type": "image/jpeg",
    "etag": "\"9a95-xtDFNul+OndhgNeWt85wabglUiY\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 39573,
    "path": "../images/media/img_25.jpg"
  },
  "/images/media/img_26.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b654-DtS7HZEvzrGKqwTG5di/kg1Cioc\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 177748,
    "path": "../images/media/img_26.jpg"
  },
  "/images/media/img_27.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d7d-7+SJiMsnOaM3ylcXdqb3/1hJ8nE\"",
    "mtime": "2025-04-10T07:35:54.450Z",
    "size": 28029,
    "path": "../images/media/img_27.jpg"
  },
  "/images/media/img_28.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-xtitJ6IJhjrbJFGTsJ1ujjn2LDU\"",
    "mtime": "2025-04-10T07:35:54.452Z",
    "size": 23506,
    "path": "../images/media/img_28.jpg"
  },
  "/images/media/img_29.jpg": {
    "type": "image/jpeg",
    "etag": "\"3079-vPyGrhi+w8dbUzCUVFEemPoOC5k\"",
    "mtime": "2025-04-10T07:35:54.452Z",
    "size": 12409,
    "path": "../images/media/img_29.jpg"
  },
  "/images/media/img_30.jpg": {
    "type": "image/jpeg",
    "etag": "\"570b-DOBt6cWXFxSuIckAPel1lM5xI3Q\"",
    "mtime": "2025-04-10T07:35:54.452Z",
    "size": 22283,
    "path": "../images/media/img_30.jpg"
  },
  "/images/media/img_31.jpg": {
    "type": "image/jpeg",
    "etag": "\"3005c-Ls2gJVIUUP9OaRTRXcEyJh91cKg\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 196700,
    "path": "../images/media/img_31.jpg"
  },
  "/images/media/img_32.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d12e-QgL13ytkgpX0E3pqZtiIVJVSXvg\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 119086,
    "path": "../images/media/img_32.jpg"
  },
  "/images/media/img_33.jpg": {
    "type": "image/jpeg",
    "etag": "\"1db7c-DQ5VN2ZBqGvHgkQXDhFL+fRdxuk\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 121724,
    "path": "../images/media/img_33.jpg"
  },
  "/images/media/img_34.jpg": {
    "type": "image/jpeg",
    "etag": "\"116a0-UZXMsXArKWB019Bpk1E0G/x4W7k\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 71328,
    "path": "../images/media/img_34.jpg"
  },
  "/images/media/img_35.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b2c2-Vyzf2jR/39fBqavDzjV5/UNpfE0\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 111298,
    "path": "../images/media/img_35.jpg"
  },
  "/images/media/img_36.jpg": {
    "type": "image/jpeg",
    "etag": "\"8ec5-YqwA4v36KXyrW/aIPBIT75OT/U8\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 36549,
    "path": "../images/media/img_36.jpg"
  },
  "/images/media/img_37.jpg": {
    "type": "image/jpeg",
    "etag": "\"17c4a-t6caiGyMEYZjwxJo0hl5rZh/OBU\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 97354,
    "path": "../images/media/img_37.jpg"
  },
  "/images/media/img_38.jpg": {
    "type": "image/jpeg",
    "etag": "\"347b-c+T8uFd3YMOHv82hSXXvkiMr3EM\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 13435,
    "path": "../images/media/img_38.jpg"
  },
  "/images/media/img_39.jpg": {
    "type": "image/jpeg",
    "etag": "\"8477-5TIjIcYu+Z15KzGjEytoRzmtuA8\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 33911,
    "path": "../images/media/img_39.jpg"
  },
  "/images/media/img_40.jpg": {
    "type": "image/jpeg",
    "etag": "\"4266-X1Qrzfr+iRWA81qKsYvd7ZKlZVI\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 16998,
    "path": "../images/media/img_40.jpg"
  },
  "/images/media/img_41.jpg": {
    "type": "image/jpeg",
    "etag": "\"5517-ngp3KA30aFBcXE4Hv9Gq6zTjovU\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 21783,
    "path": "../images/media/img_41.jpg"
  },
  "/images/media/img_42.jpg": {
    "type": "image/jpeg",
    "etag": "\"382b-jYO3YlA6j+kr2qGsy5ekqJqIGkg\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 14379,
    "path": "../images/media/img_42.jpg"
  },
  "/images/media/img_43.jpg": {
    "type": "image/jpeg",
    "etag": "\"4860-QxtObIJutCCZ+oXTx6rKCO6yHek\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 18528,
    "path": "../images/media/img_43.jpg"
  },
  "/images/media/img_44.jpg": {
    "type": "image/jpeg",
    "etag": "\"5aef-TWlHNSorUPLfMDv+Sc5KKTupDY4\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 23279,
    "path": "../images/media/img_44.jpg"
  },
  "/images/media/img_45.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c05-rKPGbBqg98s3b3g6wmiqT5u2s4U\"",
    "mtime": "2025-04-10T07:35:54.453Z",
    "size": 27653,
    "path": "../images/media/img_45.jpg"
  },
  "/images/media/img_46.jpg": {
    "type": "image/jpeg",
    "etag": "\"7229-Pw6hU9DBIy7//0Q2FgkfAEKn6XY\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 29225,
    "path": "../images/media/img_46.jpg"
  },
  "/images/media/img_47.jpg": {
    "type": "image/jpeg",
    "etag": "\"18293-U2sCbkm2a0ZYiSY33s6s9HvyhJk\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 98963,
    "path": "../images/media/img_47.jpg"
  },
  "/images/media/img_48.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d3c-wALhkiaaI0rzu7xs9BR0Uz9OFOo\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 73020,
    "path": "../images/media/img_48.jpg"
  },
  "/images/media/img_49.jpg": {
    "type": "image/jpeg",
    "etag": "\"613a9-u3dQNYJVdCoe7qn1fxa2j2qxtcI\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 398249,
    "path": "../images/media/img_49.jpg"
  },
  "/images/media/img_50.jpg": {
    "type": "image/jpeg",
    "etag": "\"251bb-D8R7dTGKwChcRXXGbMYrbwKVcuQ\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 151995,
    "path": "../images/media/img_50.jpg"
  },
  "/images/shape/shape_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f4-jxg2/1OVACaC8FEWo1pyXgvBej0\"",
    "mtime": "2025-04-10T07:35:54.371Z",
    "size": 500,
    "path": "../images/shape/shape_01.svg"
  },
  "/images/shape/shape_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"147-rLsvyjrbE6d/f7he5YUDmUskiOI\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 327,
    "path": "../images/shape/shape_02.svg"
  },
  "/images/shape/shape_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"16f-lXXub2Z8VQSOtGRXEViHNMhIcj4\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 367,
    "path": "../images/shape/shape_03.svg"
  },
  "/images/shape/shape_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"354-L/aj+gdbk24PI9eMiaFgtdPC0K0\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 852,
    "path": "../images/shape/shape_04.svg"
  },
  "/images/shape/shape_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ad-dGRf8rIUdwvQ4rDoY8oywngrJNc\"",
    "mtime": "2025-04-10T07:35:54.454Z",
    "size": 1197,
    "path": "../images/shape/shape_05.svg"
  },
  "/images/shape/shape_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-PmgDTMBWtxBIF7mvBbeRD58KprI\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 649,
    "path": "../images/shape/shape_06.svg"
  },
  "/images/shape/shape_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"27f-mMlI0BBbswdqaqGp1z6k5UoieLw\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 639,
    "path": "../images/shape/shape_07.svg"
  },
  "/images/shape/shape_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"27b-kcPQV6PK9Tq4v6vr8MPYqSM12hQ\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 635,
    "path": "../images/shape/shape_08.svg"
  },
  "/images/shape/shape_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"dd-W1JzmnYUiw3H/Uczx1XAmGmYXTA\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 221,
    "path": "../images/shape/shape_09.svg"
  },
  "/images/shape/shape_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"337-6mRvCbxcRIKY3YqowY2H6NxvoU0\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 823,
    "path": "../images/shape/shape_10.svg"
  },
  "/images/shape/shape_11.svg": {
    "type": "image/svg+xml",
    "etag": "\"44246-JJfVJqu+UWv1GsvnJmLZV+9tIJA\"",
    "mtime": "2025-04-10T07:35:54.456Z",
    "size": 279110,
    "path": "../images/shape/shape_11.svg"
  },
  "/images/shape/shape_12.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0e76-k+Du57/9/kNheypXwnlVtrtLhoU\"",
    "mtime": "2025-04-10T07:35:54.457Z",
    "size": 790134,
    "path": "../images/shape/shape_12.svg"
  },
  "/images/shape/shape_13.svg": {
    "type": "image/svg+xml",
    "etag": "\"170-QwRJk8gmR7xP+qExbCaVCVa7pVE\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 368,
    "path": "../images/shape/shape_13.svg"
  },
  "/images/shape/shape_14.svg": {
    "type": "image/svg+xml",
    "etag": "\"f3e98-1nViucAeeqG+AQUVu/1pue0Farw\"",
    "mtime": "2025-04-10T07:35:54.457Z",
    "size": 999064,
    "path": "../images/shape/shape_14.svg"
  },
  "/images/shape/shape_15.png": {
    "type": "image/png",
    "etag": "\"1b23-jgChndgAOMsQCE2ubFbNo9TKfF8\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 6947,
    "path": "../images/shape/shape_15.png"
  },
  "/images/shape/shape_16.svg": {
    "type": "image/svg+xml",
    "etag": "\"154-4BrUJ8gO5QLn3uIPPX3MJizM7B4\"",
    "mtime": "2025-04-10T07:35:54.455Z",
    "size": 340,
    "path": "../images/shape/shape_16.svg"
  },
  "/images/shape/shape_17.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f55-qo5AlRTyhlIBKJPc8j60v7hfEI0\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 790357,
    "path": "../images/shape/shape_17.svg"
  },
  "/images/shape/shape_18.svg": {
    "type": "image/svg+xml",
    "etag": "\"154-AD7FmwLPPna9CilRngS0spYYmeI\"",
    "mtime": "2025-04-10T07:35:54.456Z",
    "size": 340,
    "path": "../images/shape/shape_18.svg"
  },
  "/images/shape/shape_19.svg": {
    "type": "image/svg+xml",
    "etag": "\"ac-j6tate0AvUTIKCudvbyjorV1Es4\"",
    "mtime": "2025-04-10T07:35:54.456Z",
    "size": 172,
    "path": "../images/shape/shape_19.svg"
  },
  "/images/shape/shape_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"342-GvTxQTn+SDQchF39ruO+3IDBpdM\"",
    "mtime": "2025-04-10T07:35:54.456Z",
    "size": 834,
    "path": "../images/shape/shape_20.svg"
  },
  "/images/shape/shape_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f91-jtcV2hmI6cX0ZGU0Ynk8JGDOfqE\"",
    "mtime": "2025-04-10T07:35:54.456Z",
    "size": 12177,
    "path": "../images/shape/shape_21.svg"
  },
  "/images/shape/shape_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"1dee-5DZZJeOrzXLXim+/YZpw0/VE2Xk\"",
    "mtime": "2025-04-10T07:35:54.457Z",
    "size": 7662,
    "path": "../images/shape/shape_22.svg"
  },
  "/images/shape/shape_23.svg": {
    "type": "image/svg+xml",
    "etag": "\"16c-wsuqAjrb2o4+UgNFU7MvURrTHbQ\"",
    "mtime": "2025-04-10T07:35:54.457Z",
    "size": 364,
    "path": "../images/shape/shape_23.svg"
  },
  "/images/shape/shape_24.svg": {
    "type": "image/svg+xml",
    "etag": "\"8bbcc-lG7pfA0DoZS+auxW54WYhrLssDg\"",
    "mtime": "2025-04-10T07:35:54.464Z",
    "size": 572364,
    "path": "../images/shape/shape_24.svg"
  },
  "/images/shape/shape_25.svg": {
    "type": "image/svg+xml",
    "etag": "\"162-cnKRP3zj720sqUhpOuIJuqDrypk\"",
    "mtime": "2025-04-10T07:35:54.457Z",
    "size": 354,
    "path": "../images/shape/shape_25.svg"
  },
  "/images/shape/shape_26.svg": {
    "type": "image/svg+xml",
    "etag": "\"17c-nubPahQlnUVMN0R+ROTQpBpjvyw\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 380,
    "path": "../images/shape/shape_26.svg"
  },
  "/images/shape/shape_27.svg": {
    "type": "image/svg+xml",
    "etag": "\"167-cWgwHDprF+dohwqCNSH7r95v6AM\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 359,
    "path": "../images/shape/shape_27.svg"
  },
  "/images/shape/shape_28.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-GfGvwWa7xoDWx9+YKPaamhAQHLQ\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_28.svg"
  },
  "/images/shape/shape_29.svg": {
    "type": "image/svg+xml",
    "etag": "\"14d-Jh0xR9uwErrlgCOym+ygNSfEnUI\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 333,
    "path": "../images/shape/shape_29.svg"
  },
  "/images/shape/shape_30.svg": {
    "type": "image/svg+xml",
    "etag": "\"13f-9l5c2Ot0fMyzbQe/vDwcq0Vw+dk\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 319,
    "path": "../images/shape/shape_30.svg"
  },
  "/images/shape/shape_31.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-NNIpt/+uYE6XWcKlpvLCrpgy9WM\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_31.svg"
  },
  "/images/shape/shape_32.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-+VWIMPMGcAhuNRoGSER1zVNFscw\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_32.svg"
  },
  "/images/shape/shape_33.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-YutPhPFj17dm2eZBgd9zczV4wrw\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_33.svg"
  },
  "/images/shape/shape_34.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-a+VO9gLme7nSnSeME/e8OwHQgYw\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_34.svg"
  },
  "/images/shape/shape_35.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-rl4MmazWVFpYvaLq4waDJ/eOmzw\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_35.svg"
  },
  "/images/shape/shape_36.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f39-qQh/lgq261iJh97rlogHWFlOdTg\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 790329,
    "path": "../images/shape/shape_36.svg"
  },
  "/images/shape/shape_37.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-AnGa9394ClKSH0VP1Veoc4YFk+s\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 339,
    "path": "../images/shape/shape_37.svg"
  },
  "/images/shape/shape_38.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f3b-DZVo63DjFod9kJMvdyLS8pcHcJ0\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 790331,
    "path": "../images/shape/shape_38.svg"
  },
  "/images/shape/shape_39.svg": {
    "type": "image/svg+xml",
    "etag": "\"292-hZ8lHA9o+CWv1kjOR+nBPAQ8g2Q\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 658,
    "path": "../images/shape/shape_39.svg"
  },
  "/images/shape/shape_40.svg": {
    "type": "image/svg+xml",
    "etag": "\"16e-Y8Xa8QeGhKj6bmvLkN82fn7eI8g\"",
    "mtime": "2025-04-10T07:35:54.458Z",
    "size": 366,
    "path": "../images/shape/shape_40.svg"
  },
  "/images/shape/shape_41.svg": {
    "type": "image/svg+xml",
    "etag": "\"16d-oXvB3ZfUwZesiN04PQEfxjDRrno\"",
    "mtime": "2025-04-10T07:35:54.459Z",
    "size": 365,
    "path": "../images/shape/shape_41.svg"
  },
  "/images/shape/shape_42.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f66-P42rihoZ7jhScrlnn/7uHLaQcLg\"",
    "mtime": "2025-04-10T07:35:54.464Z",
    "size": 790374,
    "path": "../images/shape/shape_42.svg"
  },
  "/images/shape/shape_43.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ba-8wbclYmgmJIj8yDJmg+jFTfCr5E\"",
    "mtime": "2025-04-10T07:35:54.464Z",
    "size": 698,
    "path": "../images/shape/shape_43.svg"
  },
  "/images/shape/shape_44.svg": {
    "type": "image/svg+xml",
    "etag": "\"30d-9ww8wV7UqzB9nRbef7ayQJ1ArpY\"",
    "mtime": "2025-04-10T07:35:54.464Z",
    "size": 781,
    "path": "../images/shape/shape_44.svg"
  },
  "/images/shape/shape_45.svg": {
    "type": "image/svg+xml",
    "etag": "\"240-/4A6jhqDImmh+CK6RDOGJPnP3nM\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 576,
    "path": "../images/shape/shape_45.svg"
  },
  "/images/shape/shape_46.svg": {
    "type": "image/svg+xml",
    "etag": "\"30c-i3/4JLnrrgfceZlIOExTDKZJ5Ek\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 780,
    "path": "../images/shape/shape_46.svg"
  },
  "/images/shape/shape_47.svg": {
    "type": "image/svg+xml",
    "etag": "\"22c-Cb27pB5EENe7Qj/yks7Lq5t7I4A\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 556,
    "path": "../images/shape/shape_47.svg"
  },
  "/images/shape/shape_48.svg": {
    "type": "image/svg+xml",
    "etag": "\"283-ezpLbRv7eX92BTbKYwTMdRcA/uc\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 643,
    "path": "../images/shape/shape_48.svg"
  },
  "/images/shape/shape_49.svg": {
    "type": "image/svg+xml",
    "etag": "\"4423c-oaWs4QUi5pheg1ZqFKFcuF7pPGA\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 279100,
    "path": "../images/shape/shape_49.svg"
  },
  "/images/shape/shape_50.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cdab-m8cxzCWVtiz0yTH0lxOk6IQ47bU\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 249259,
    "path": "../images/shape/shape_50.svg"
  },
  "/images/shape/shape_51.svg": {
    "type": "image/svg+xml",
    "etag": "\"206-Ss6WM5wQLMZi7LJvois+lfNRyqo\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 518,
    "path": "../images/shape/shape_51.svg"
  },
  "/images/shape/shape_52.png": {
    "type": "image/png",
    "etag": "\"8f29-t3tjrI2BGz49oHihhkJ1PcD10CI\"",
    "mtime": "2025-04-10T07:35:54.465Z",
    "size": 36649,
    "path": "../images/shape/shape_52.png"
  },
  "/images/shop/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"11c44-Nmdj1u7cTx5AhkV7bX+a7je/40k\"",
    "mtime": "2025-04-10T07:35:54.377Z",
    "size": 72772,
    "path": "../images/shop/img_01.jpg"
  },
  "/images/shop/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"ffaf-uDvQg+/fP2OjQRDooP1sjjIX2d0\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 65455,
    "path": "../images/shop/img_02.jpg"
  },
  "/images/shop/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"12b26-jb8AIRFCHWocKHvLYlazYTAkpNs\"",
    "mtime": "2025-04-10T07:35:54.469Z",
    "size": 76582,
    "path": "../images/shop/img_03.jpg"
  },
  "/images/shop/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b296-ImSApo+GjAsTnwc5kvst8rPgWD0\"",
    "mtime": "2025-04-10T07:35:54.467Z",
    "size": 111254,
    "path": "../images/shop/img_04.jpg"
  },
  "/images/shop/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a55d-4BudQ6cW1kv9NnUAEmBj/D4M700\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 107869,
    "path": "../images/shop/img_05.jpg"
  },
  "/images/shop/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce53-bCGdFN0ekm6OlnMFmrZZ5IiPZx4\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 52819,
    "path": "../images/shop/img_06.jpg"
  },
  "/images/shop/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"1aefa-rzq/ZxsCXhhbLdTYCQg77s6zFck\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 110330,
    "path": "../images/shop/img_07.jpg"
  },
  "/images/shop/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"14a10-sqVAsSxfC7fwnaSpox61M0QC9Ls\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 84496,
    "path": "../images/shop/img_08.jpg"
  },
  "/images/shop/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f51-q/FTIWJLLrFS3ydaIkdnjrjE/tw\"",
    "mtime": "2025-04-10T07:35:54.466Z",
    "size": 16209,
    "path": "../images/shop/img_09.jpg"
  },
  "/images/shop/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"188dc-lQzh1DRObEeUVtTRRulSIAirHSo\"",
    "mtime": "2025-04-10T07:35:54.467Z",
    "size": 100572,
    "path": "../images/shop/img_10.jpg"
  },
  "/images/shop/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"17ce1-AibLQlabSXa/Lnl6ZZjiPWrdQA8\"",
    "mtime": "2025-04-10T07:35:54.469Z",
    "size": 97505,
    "path": "../images/shop/img_11.jpg"
  },
  "/images/shop/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"18709-yQGUxDHM5TIf820Ok2oYhj6+9LI\"",
    "mtime": "2025-04-10T07:35:54.469Z",
    "size": 100105,
    "path": "../images/shop/img_12.jpg"
  },
  "/images/shop/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"141b-u9foYiS/zGiS/A0P6TZWxNfUxZQ\"",
    "mtime": "2025-04-10T07:35:54.469Z",
    "size": 5147,
    "path": "../images/shop/img_13.jpg"
  },
  "/images/shop/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"1373-gT710txcOCJO6PNfCulcD9L/TkM\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 4979,
    "path": "../images/shop/img_14.jpg"
  },
  "/images/shop/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f2-/AixopU+8MX7jBHMpZlplKZnfSU\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 9458,
    "path": "../images/shop/img_15.jpg"
  },
  "/news/1/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87529-FtYZXcVqwbVoyTo9j7rbTQwy6tI\"",
    "mtime": "2025-04-10T07:35:54.004Z",
    "size": 554281,
    "path": "../news/1/index.html"
  },
  "/news/2/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87120-vXU+qjBJ45C4EVUB58sS13GUjsE\"",
    "mtime": "2025-04-10T07:35:54.004Z",
    "size": 553248,
    "path": "../news/2/index.html"
  },
  "/images/icon/apple.svg": {
    "type": "image/svg+xml",
    "etag": "\"443-cgdZZyTZM7U+4eEJNVV9FApVuHE\"",
    "mtime": "2025-04-10T07:35:54.373Z",
    "size": 1091,
    "path": "../images/icon/apple.svg"
  },
  "/images/icon/facebook.png": {
    "type": "image/png",
    "etag": "\"2f9-f2gtsi5RBU6LrAwQX4LgSlBzm/8\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 761,
    "path": "../images/icon/facebook.png"
  },
  "/images/icon/google.png": {
    "type": "image/png",
    "etag": "\"379-ertxQJMD6Ra32wux1GLU/SfDwJU\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 889,
    "path": "../images/icon/google.png"
  },
  "/images/icon/icon_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"144-oyFvMvcvTV4XfOFb/GexNVlakAc\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 324,
    "path": "../images/icon/icon_01.svg"
  },
  "/images/icon/icon_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"111-5gsEdCdKbE99biPh6W1f7wvu0B0\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 273,
    "path": "../images/icon/icon_02.svg"
  },
  "/images/icon/icon_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"c11-1tMzPzKeJ9HSPsUrqaOKkzDnNpM\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 3089,
    "path": "../images/icon/icon_03.svg"
  },
  "/images/icon/icon_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"2b0-t5MR39yrq71+lekbpG1jIsrGHqg\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 688,
    "path": "../images/icon/icon_04.svg"
  },
  "/images/icon/icon_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"76f-3eMyrlPuTYROh/kjwdQzO8LnhTY\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 1903,
    "path": "../images/icon/icon_05.svg"
  },
  "/images/icon/icon_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"27c-GGqRciLL7ss3gk0IW/UrKZ42szE\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 636,
    "path": "../images/icon/icon_06.svg"
  },
  "/images/icon/icon_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"575-y/ihYi9VPiMVJuYJfpdRH00FBus\"",
    "mtime": "2025-04-10T07:35:54.471Z",
    "size": 1397,
    "path": "../images/icon/icon_07.svg"
  },
  "/images/icon/icon_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"265-c19HXdfMqOa4y1IclAFKuPTnbAY\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 613,
    "path": "../images/icon/icon_08.svg"
  },
  "/images/icon/icon_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"124-10RTcuNeqtQfSYv+M9BTvzUEe44\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 292,
    "path": "../images/icon/icon_09.svg"
  },
  "/images/icon/icon_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"6d2-E3QAoe9JZn19oTQFA1QuO4ev73E\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1746,
    "path": "../images/icon/icon_10.svg"
  },
  "/images/icon/icon_100.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f4-HU3NyNB2vXCOyooVOpml4CkU1+I\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 756,
    "path": "../images/icon/icon_100.svg"
  },
  "/images/icon/icon_101.svg": {
    "type": "image/svg+xml",
    "etag": "\"2c9-TnTJOldRMhYSdJJP7X1FVuWU/lw\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 713,
    "path": "../images/icon/icon_101.svg"
  },
  "/images/icon/icon_102.svg": {
    "type": "image/svg+xml",
    "etag": "\"101-HEgRl4XIyEL0XkVXu3NnXVFHYNk\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 257,
    "path": "../images/icon/icon_102.svg"
  },
  "/images/icon/icon_103.svg": {
    "type": "image/svg+xml",
    "etag": "\"10b-eE5l8BP8z/dIgojuESzF0/yaJlE\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 267,
    "path": "../images/icon/icon_103.svg"
  },
  "/images/icon/icon_11.svg": {
    "type": "image/svg+xml",
    "etag": "\"266-iHOHZ+AwPnn0XIrpJC94eB4ueqU\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 614,
    "path": "../images/icon/icon_11.svg"
  },
  "/images/icon/icon_12.svg": {
    "type": "image/svg+xml",
    "etag": "\"24a-egWTmdUpBL41Nw/UZS+j6ilJGXQ\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 586,
    "path": "../images/icon/icon_12.svg"
  },
  "/images/icon/icon_13.svg": {
    "type": "image/svg+xml",
    "etag": "\"485-gJE3yuE8cT0cGRhaqssER2hsjfo\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1157,
    "path": "../images/icon/icon_13.svg"
  },
  "/images/icon/icon_14.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e6-+AM5ExEUEu2XCfnGm9wcWv1zscM\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1254,
    "path": "../images/icon/icon_14.svg"
  },
  "/images/icon/icon_15.svg": {
    "type": "image/svg+xml",
    "etag": "\"9c1-bUuy61Shyd2ryVUTnJ7hgtqM/pQ\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 2497,
    "path": "../images/icon/icon_15.svg"
  },
  "/images/icon/icon_16.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d3-IaBsuAr8tzORgnYm3wPUkojbhOA\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 723,
    "path": "../images/icon/icon_16.svg"
  },
  "/images/icon/icon_17.svg": {
    "type": "image/svg+xml",
    "etag": "\"bff-DE9fWW/vjqALXKaQee+1clAVFdM\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 3071,
    "path": "../images/icon/icon_17.svg"
  },
  "/images/icon/icon_18.svg": {
    "type": "image/svg+xml",
    "etag": "\"2dc-ScvN6xiCe2aKdj1h6lthiwcQuCg\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 732,
    "path": "../images/icon/icon_18.svg"
  },
  "/images/icon/icon_19.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-wzv20Tm4aIMw7VKuXYmR7O9JMEM\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 649,
    "path": "../images/icon/icon_19.svg"
  },
  "/images/icon/icon_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"20a-UH9Ahe2xGqb5jbcHEVxCX2rYpOM\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 522,
    "path": "../images/icon/icon_20.svg"
  },
  "/images/icon/icon_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"6d6-8pB/3ap5QvmJdITNxAT0wF7XSFA\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1750,
    "path": "../images/icon/icon_21.svg"
  },
  "/images/icon/icon_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"251-eZ8d+8rfGhfc4azZkxvgtnirp94\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 593,
    "path": "../images/icon/icon_22.svg"
  },
  "/images/icon/icon_23.svg": {
    "type": "image/svg+xml",
    "etag": "\"22f-dvRhvPHNhB031RIMWeoFLmuQ//E\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 559,
    "path": "../images/icon/icon_23.svg"
  },
  "/images/icon/icon_24.svg": {
    "type": "image/svg+xml",
    "etag": "\"2b5-gY1gblez1wHq1UpNgiJoX33DTi4\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 693,
    "path": "../images/icon/icon_24.svg"
  },
  "/images/icon/icon_25.svg": {
    "type": "image/svg+xml",
    "etag": "\"169-m+3a0sTw3iLFPPP7ozIcwk0cu2Y\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 361,
    "path": "../images/icon/icon_25.svg"
  },
  "/images/icon/icon_26.svg": {
    "type": "image/svg+xml",
    "etag": "\"112-bPiNPcnq4rYVNUvZ/TJaGFufS4Q\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 274,
    "path": "../images/icon/icon_26.svg"
  },
  "/images/icon/icon_27.svg": {
    "type": "image/svg+xml",
    "etag": "\"13c-OSO8DOM1YgoiFG4KUQZwGAwo0tA\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 316,
    "path": "../images/icon/icon_27.svg"
  },
  "/images/icon/icon_28.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ab-v+2NzF5f/FPMqIa0oKyF3IDxwYY\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 683,
    "path": "../images/icon/icon_28.svg"
  },
  "/images/icon/icon_29.svg": {
    "type": "image/svg+xml",
    "etag": "\"cf-5027p2ictnSfUqRWhqjMpXkvLrM\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 207,
    "path": "../images/icon/icon_29.svg"
  },
  "/images/icon/icon_30.svg": {
    "type": "image/svg+xml",
    "etag": "\"1235-dWmGONBOiSCj2ZrbcGGozBIhnhw\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 4661,
    "path": "../images/icon/icon_30.svg"
  },
  "/images/icon/icon_31.svg": {
    "type": "image/svg+xml",
    "etag": "\"763-16a4tp8ls4zN/GzUUz+9GRaYC6s\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1891,
    "path": "../images/icon/icon_31.svg"
  },
  "/images/icon/icon_32.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f6-lt1RfCuQh7dVwR4MEWu37/PXkcQ\"",
    "mtime": "2025-04-10T07:35:54.472Z",
    "size": 1782,
    "path": "../images/icon/icon_32.svg"
  },
  "/images/icon/icon_33.svg": {
    "type": "image/svg+xml",
    "etag": "\"67d-0IHp8WKQb9i9i035qeO9kstQ8P4\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1661,
    "path": "../images/icon/icon_33.svg"
  },
  "/images/icon/icon_34.svg": {
    "type": "image/svg+xml",
    "etag": "\"b9b-brccXiXWvVmtkyBooItC9oRkNlg\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 2971,
    "path": "../images/icon/icon_34.svg"
  },
  "/images/icon/icon_35.svg": {
    "type": "image/svg+xml",
    "etag": "\"6e3-YCzmCrDPH6OcZ31wQBg5zskUof0\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1763,
    "path": "../images/icon/icon_35.svg"
  },
  "/images/icon/icon_36.svg": {
    "type": "image/svg+xml",
    "etag": "\"110-nJMOuwTuam8oA4H+GA3vvljFn5U\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 272,
    "path": "../images/icon/icon_36.svg"
  },
  "/images/icon/icon_37.svg": {
    "type": "image/svg+xml",
    "etag": "\"274-B9e1jrbNBZMTWREe83a8Nmdn8Eo\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 628,
    "path": "../images/icon/icon_37.svg"
  },
  "/images/icon/icon_38.svg": {
    "type": "image/svg+xml",
    "etag": "\"222-gjeqO3jfp6khiiz2l2zIcMObZoE\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 546,
    "path": "../images/icon/icon_38.svg"
  },
  "/images/icon/icon_39.svg": {
    "type": "image/svg+xml",
    "etag": "\"11e-DT9w4Z+3ixp8VtqnmLTBARD4H0M\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 286,
    "path": "../images/icon/icon_39.svg"
  },
  "/images/icon/icon_40.svg": {
    "type": "image/svg+xml",
    "etag": "\"34c-1wRW0gaZcWQfZ4Oyzf8gFr2u5vY\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 844,
    "path": "../images/icon/icon_40.svg"
  },
  "/images/icon/icon_41.svg": {
    "type": "image/svg+xml",
    "etag": "\"551-KAHuve9lV0aW9CxE57R0PJ+OiZg\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1361,
    "path": "../images/icon/icon_41.svg"
  },
  "/images/icon/icon_42.svg": {
    "type": "image/svg+xml",
    "etag": "\"330-5uhsb5vvG3XXxSonF4INnLDrDks\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 816,
    "path": "../images/icon/icon_42.svg"
  },
  "/images/icon/icon_43.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f2-mZnZRxTLN/ph6uiRXyi59jRS8Rs\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1778,
    "path": "../images/icon/icon_43.svg"
  },
  "/images/icon/icon_44.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c4-RpCpk4m3rjYaxuy1qWp62scLQ/w\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 964,
    "path": "../images/icon/icon_44.svg"
  },
  "/images/icon/icon_45.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e5-dPKFjSynphfeRVK7ZiDl/F514RY\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 997,
    "path": "../images/icon/icon_45.svg"
  },
  "/images/icon/icon_46.svg": {
    "type": "image/svg+xml",
    "etag": "\"9ab-hjsCLvLZSIT21sOTg6gIzzL8Uug\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 2475,
    "path": "../images/icon/icon_46.svg"
  },
  "/images/icon/icon_47.svg": {
    "type": "image/svg+xml",
    "etag": "\"276-6NgRTDTHbBZItZFK/9axIAIXhcg\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 630,
    "path": "../images/icon/icon_47.svg"
  },
  "/images/icon/icon_48.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ba-gl2svk+5cOJVqhfiH8iaqZYtUlQ\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 698,
    "path": "../images/icon/icon_48.svg"
  },
  "/images/icon/icon_49.svg": {
    "type": "image/svg+xml",
    "etag": "\"4db-uYeND+foU/Rrln5pbjfNInz0l0w\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1243,
    "path": "../images/icon/icon_49.svg"
  },
  "/images/icon/icon_50.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a6-PrKP+3JBIyfRPzfLh/tcZGbebn4\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 2470,
    "path": "../images/icon/icon_50.svg"
  },
  "/images/icon/icon_51.svg": {
    "type": "image/svg+xml",
    "etag": "\"51d-toFOdBYgZkLklAc6cl3U5fYd1zc\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 1309,
    "path": "../images/icon/icon_51.svg"
  },
  "/images/icon/icon_52.svg": {
    "type": "image/svg+xml",
    "etag": "\"45c7-n9wqld/m4Lg7yh3XCtcpDnisnBE\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 17863,
    "path": "../images/icon/icon_52.svg"
  },
  "/images/icon/icon_53.svg": {
    "type": "image/svg+xml",
    "etag": "\"247-DCUk6DCs94nOSFW8RsYCNlovhbY\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 583,
    "path": "../images/icon/icon_53.svg"
  },
  "/images/icon/icon_54.svg": {
    "type": "image/svg+xml",
    "etag": "\"101-mNXZPA4QG4ZDGvJmNGSQGyIaE3Q\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 257,
    "path": "../images/icon/icon_54.svg"
  },
  "/images/icon/icon_55.svg": {
    "type": "image/svg+xml",
    "etag": "\"26a-bC5uk+Lxja0+4KZgJ7OewNwVqDM\"",
    "mtime": "2025-04-10T07:35:54.473Z",
    "size": 618,
    "path": "../images/icon/icon_55.svg"
  },
  "/images/icon/icon_56.svg": {
    "type": "image/svg+xml",
    "etag": "\"776-QTuJLAmUBc+lcwybIv7u+TuxBc0\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1910,
    "path": "../images/icon/icon_56.svg"
  },
  "/images/icon/icon_57.svg": {
    "type": "image/svg+xml",
    "etag": "\"c08-GSkfKANxh3VRXI7f6xXRlZ9LG6c\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 3080,
    "path": "../images/icon/icon_57.svg"
  },
  "/images/icon/icon_58.svg": {
    "type": "image/svg+xml",
    "etag": "\"330-nznYrgE77Y0DHGsw1u9ojv0mk5c\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 816,
    "path": "../images/icon/icon_58.svg"
  },
  "/images/icon/icon_59.svg": {
    "type": "image/svg+xml",
    "etag": "\"33c-zXrSJF9QiFSmTcgeYrdqwhPD85A\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 828,
    "path": "../images/icon/icon_59.svg"
  },
  "/images/icon/icon_60.svg": {
    "type": "image/svg+xml",
    "etag": "\"552-tVFeZg2wlMgOhMkfO5gZrDqXeY4\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1362,
    "path": "../images/icon/icon_60.svg"
  },
  "/images/icon/icon_61.svg": {
    "type": "image/svg+xml",
    "etag": "\"58d-nrj7StGNp2JhK3DXGZ/DkDyeE74\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1421,
    "path": "../images/icon/icon_61.svg"
  },
  "/images/icon/icon_62.svg": {
    "type": "image/svg+xml",
    "etag": "\"223-rYiUxL9F0mq3+AtZoJSd20sf9/o\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 547,
    "path": "../images/icon/icon_62.svg"
  },
  "/images/icon/icon_63.svg": {
    "type": "image/svg+xml",
    "etag": "\"39f-ZpAUPnYG99HLey11aLLOGnp/rUw\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 927,
    "path": "../images/icon/icon_63.svg"
  },
  "/images/icon/icon_64.svg": {
    "type": "image/svg+xml",
    "etag": "\"14b-iYbTnf9m/RfsTYF/iCuADNAgE6o\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 331,
    "path": "../images/icon/icon_64.svg"
  },
  "/images/icon/icon_65.svg": {
    "type": "image/svg+xml",
    "etag": "\"ea-KoD3NETrDpUsG+g1EUn+gJxQ70k\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 234,
    "path": "../images/icon/icon_65.svg"
  },
  "/images/icon/icon_66.svg": {
    "type": "image/svg+xml",
    "etag": "\"300-RO351IL9H+2DIEmdhrfF1fPp0yQ\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 768,
    "path": "../images/icon/icon_66.svg"
  },
  "/images/icon/icon_67.svg": {
    "type": "image/svg+xml",
    "etag": "\"927-jFdwmpCC/ehNVes6Y8ynxV1UhXI\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 2343,
    "path": "../images/icon/icon_67.svg"
  },
  "/images/icon/icon_68.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f9-FLbvhtq93dF64I4Tl1DrHrVAfYw\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1785,
    "path": "../images/icon/icon_68.svg"
  },
  "/images/icon/icon_69.svg": {
    "type": "image/svg+xml",
    "etag": "\"672-3AL9hGvUrxmJ1P5wQhr7snUmhZk\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1650,
    "path": "../images/icon/icon_69.svg"
  },
  "/images/icon/icon_70.svg": {
    "type": "image/svg+xml",
    "etag": "\"b8f-UZTZLoUrmtojtHeqzzszuV/lvCo\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 2959,
    "path": "../images/icon/icon_70.svg"
  },
  "/images/icon/icon_71.svg": {
    "type": "image/svg+xml",
    "etag": "\"6db-/iGzzggj+4e0Qpkma7CidOGIFp0\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 1755,
    "path": "../images/icon/icon_71.svg"
  },
  "/images/icon/icon_72.svg": {
    "type": "image/svg+xml",
    "etag": "\"22d-rPRs9E1meFUKOBW9aTR/sy74NQk\"",
    "mtime": "2025-04-10T07:35:54.474Z",
    "size": 557,
    "path": "../images/icon/icon_72.svg"
  },
  "/images/icon/icon_73.svg": {
    "type": "image/svg+xml",
    "etag": "\"344-wNrpwCYpJx/6LCCXK6CNE5GZWkk\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 836,
    "path": "../images/icon/icon_73.svg"
  },
  "/images/icon/icon_74.svg": {
    "type": "image/svg+xml",
    "etag": "\"204-RgSovh0VAC4jAGPsweXld4/XmGs\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 516,
    "path": "../images/icon/icon_74.svg"
  },
  "/images/icon/icon_75.svg": {
    "type": "image/svg+xml",
    "etag": "\"115-4M32rYoTtbdq37aH83rb6bXZyGU\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 277,
    "path": "../images/icon/icon_75.svg"
  },
  "/images/icon/icon_76.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d7-Rj2hrMHHBJO2y+HOOB/4gGdrMuI\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 727,
    "path": "../images/icon/icon_76.svg"
  },
  "/images/icon/icon_77.svg": {
    "type": "image/svg+xml",
    "etag": "\"15f-H572lh2a3nkcp281ZDgzQls+Mmk\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 351,
    "path": "../images/icon/icon_77.svg"
  },
  "/images/icon/icon_78.svg": {
    "type": "image/svg+xml",
    "etag": "\"293-6RfdTyFaBdNAThyl6wTEFKsgAX0\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 659,
    "path": "../images/icon/icon_78.svg"
  },
  "/images/icon/icon_79.svg": {
    "type": "image/svg+xml",
    "etag": "\"869-vgzmetuh2PqWGgtlF3DHqToBs0c\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 2153,
    "path": "../images/icon/icon_79.svg"
  },
  "/images/icon/icon_80.svg": {
    "type": "image/svg+xml",
    "etag": "\"22f-PI9qIfi9ZIRoa8j1OmBHTNTeUkI\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 559,
    "path": "../images/icon/icon_80.svg"
  },
  "/images/icon/icon_81.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a2-lxvnOPU/18igtGa+rft2dLV94zw\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 674,
    "path": "../images/icon/icon_81.svg"
  },
  "/images/icon/icon_82.svg": {
    "type": "image/svg+xml",
    "etag": "\"149-E8yeskqcYrLxjSu2+IM2v1XWFQM\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 329,
    "path": "../images/icon/icon_82.svg"
  },
  "/images/icon/icon_83.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d1-cK4wXZtdDL/fXoQSFqplt09XHZA\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 721,
    "path": "../images/icon/icon_83.svg"
  },
  "/images/icon/icon_84.svg": {
    "type": "image/svg+xml",
    "etag": "\"123-E2bOX5qbRU7Pmlpax5jwIA9dxS8\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 291,
    "path": "../images/icon/icon_84.svg"
  },
  "/images/icon/icon_85.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a0-mmrbejxEsCpN7bhj4THu1qB9AvM\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 416,
    "path": "../images/icon/icon_85.svg"
  },
  "/images/icon/icon_86.svg": {
    "type": "image/svg+xml",
    "etag": "\"267-qc4GaPXzw1WxXi2WJ4rT0U+vZd4\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 615,
    "path": "../images/icon/icon_86.svg"
  },
  "/images/icon/icon_87.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-4Pp9Pho3qXevtsfhjtKeb1oaG0I\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 649,
    "path": "../images/icon/icon_87.svg"
  },
  "/images/icon/icon_88.svg": {
    "type": "image/svg+xml",
    "etag": "\"23d-JukjlubWB6eA3YzqjSbU56+f7kI\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 573,
    "path": "../images/icon/icon_88.svg"
  },
  "/images/icon/icon_89.svg": {
    "type": "image/svg+xml",
    "etag": "\"289-4Pp9Pho3qXevtsfhjtKeb1oaG0I\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 649,
    "path": "../images/icon/icon_89.svg"
  },
  "/images/icon/icon_90.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c0-0QPASB0pFyHemoTfNk3bXRpt8Qs\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1216,
    "path": "../images/icon/icon_90.svg"
  },
  "/images/icon/icon_91.svg": {
    "type": "image/svg+xml",
    "etag": "\"5e3-68RamhYEt/PDN0t0HNy9SfrcNrc\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1507,
    "path": "../images/icon/icon_91.svg"
  },
  "/images/icon/icon_92.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f0-u08HmpnCWM0/2S1OOUbbCNIWjhQ\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1776,
    "path": "../images/icon/icon_92.svg"
  },
  "/images/icon/icon_93.svg": {
    "type": "image/svg+xml",
    "etag": "\"f7-6+qV0+QNKwH/RRoFDmR+hQ+g9ZI\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 247,
    "path": "../images/icon/icon_93.svg"
  },
  "/images/icon/icon_94.svg": {
    "type": "image/svg+xml",
    "etag": "\"1726-+7/gZRkxqysuFFDWWbOmtEPYuMc\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 5926,
    "path": "../images/icon/icon_94.svg"
  },
  "/images/icon/icon_95.svg": {
    "type": "image/svg+xml",
    "etag": "\"706-nTSQ37yJYF6BEoRLalOZqX4ATwI\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1798,
    "path": "../images/icon/icon_95.svg"
  },
  "/images/icon/icon_96.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e8-DJwjI2G0HWPNP3FZVd/tWiHWEE8\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1256,
    "path": "../images/icon/icon_96.svg"
  },
  "/images/icon/icon_97.svg": {
    "type": "image/svg+xml",
    "etag": "\"ef-VDKf2dbzf2b9bxeLOFvNEraC15k\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 239,
    "path": "../images/icon/icon_97.svg"
  },
  "/images/icon/icon_98.svg": {
    "type": "image/svg+xml",
    "etag": "\"531-6kNKQx71MF8890WkH30UKRh0Zk4\"",
    "mtime": "2025-04-10T07:35:54.476Z",
    "size": 1329,
    "path": "../images/icon/icon_98.svg"
  },
  "/images/icon/icon_99.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b2-uaDLyPBdQO/4/QlMF47qDVMHo/Y\"",
    "mtime": "2025-04-10T07:35:54.475Z",
    "size": 1202,
    "path": "../images/icon/icon_99.svg"
  },
  "/images/icon/playstore.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f6-iekLShIQxx2kZv24cUfC4M02OKI\"",
    "mtime": "2025-04-10T07:35:54.476Z",
    "size": 1782,
    "path": "../images/icon/playstore.svg"
  },
  "/assets/builds/meta/4409920b-6d39-404c-8616-00e03a2d9d16.json": {
    "type": "application/json",
    "etag": "\"8b-WL78uKTWHQltcQrMFCZRgTkTzQM\"",
    "mtime": "2025-04-10T07:35:54.327Z",
    "size": 139,
    "path": "../assets/builds/meta/4409920b-6d39-404c-8616-00e03a2d9d16.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/assets/builds/meta/":{"maxAge":31536000},"/assets/builds/":{"maxAge":1},"/assets/":{"maxAge":31536000}};

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
      throw createError$1({
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
        throw createError$1(payloadTooLargeError);
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
      throw createError$1(methodNotAllowedError);
    }
  }
});

const storage = useStorage("#rate-limiter-storage");
const defaultRateLimiter = defaultSecurityConfig("").rateLimiter;
const _kmu5uV = defineEventHandler(async (event) => {
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
        throw createError$1(tooManyRequestsError);
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
        const valueToFilter = event.node.req.method === "GET" ? getQuery(event) : event.node.req.headers["content-type"]?.includes(
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
            throw createError$1(badRequestError);
          }
        }
      }
    }
  }
});

const _lazy_wIwBlD = () => import('../routes/api/auth/login.post.mjs');
const _lazy_MzumQb = () => import('../routes/api/auth/logout.post.mjs');
const _lazy_bnBG6j = () => import('../routes/api/auth/verify.get.mjs');
const _lazy_9Yr17i = () => import('../routes/api/knowledge/_id_.delete.mjs');
const _lazy_7WqvB0 = () => import('../routes/api/knowledge/_id_.get.mjs');
const _lazy_c93Fbe = () => import('../routes/api/knowledge/_id_.put.mjs');
const _lazy_yC49DX = () => import('../routes/api/index.get.mjs');
const _lazy_YDwZVC = () => import('../routes/api/index.post.mjs');
const _lazy_4rTY9p = () => import('../routes/api/qa.mjs');
const _lazy_SkelAC = () => import('../routes/api/qa/_id_.delete.mjs');
const _lazy_mG417t = () => import('../routes/api/qa/_id_.put.mjs');
const _lazy_7sNGLR = () => import('../routes/api/index.get2.mjs');
const _lazy_4GSN8g = () => import('../routes/api/index.post2.mjs');
const _lazy_KJ86Tq = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _Ir9i1A, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/login', handler: _lazy_wIwBlD, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_MzumQb, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_bnBG6j, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_9Yr17i, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_7WqvB0, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_c93Fbe, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge', handler: _lazy_yC49DX, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_YDwZVC, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_4rTY9p, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_SkelAC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy_mG417t, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_7sNGLR, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_4GSN8g, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_KJ86Tq, lazy: true, middleware: false, method: undefined },
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
  const router = createRouter({
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

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, withTrailingSlash as A, withoutTrailingSlash as B, sanitizeStatusCode as C, baseURL as D, createHooks as E, toRouteMatcher as F, createRouter$1 as G, defu as H, destr as I, klona as J, parse$1 as K, isEqual as L, getCookie as M, nodeServer as N, deleteCookie as a, authenticate as b, createError$1 as c, defineEventHandler as d, getRequestHeader as e, getRouterParam as f, getHeader as g, readMultipartFormData as h, defineRenderHandler as i, buildAssetsURL as j, getQuery as k, getRouteRules as l, useNitroApp as m, getResponseStatusText as n, getResponseStatus as o, publicAssetsURL as p, parseQuery as q, readBody as r, setCookie as s, hasProtocol as t, useRuntimeConfig as u, verifyToken as v, joinURL as w, withQuery as x, isScriptProtocol as y, getContext as z };
//# sourceMappingURL=nitro.mjs.map
