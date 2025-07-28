import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, relative, join } from 'node:path';
import { watch as watch$1 } from 'chokidar';
import anymatch from 'anymatch';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

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
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
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
function decode$2(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
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
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
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
  if (fragmentIndex !== -1) {
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
  if (fragmentIndex !== -1) {
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

function parse$2(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode$1;
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
      obj[key] = tryDecode$1(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$1(name, value, options) {
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

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
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

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=g(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function g(...n){return function(...e){for(const t of n)t(...e);}}const m=_();class A extends m{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function S(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const C=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(C.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function O(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:S(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

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
    if (this.data !== void 0) {
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
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
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
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse$1(multipartBodyBuffer, boundary) {
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
      params[key] = decode$2(params[key]);
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
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
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
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
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
  return parse$1(body, boundary);
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
    return void 0;
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
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
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

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$2(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$1(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
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
const setHeader = setResponseHeader;
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
      body = await readRawBody(event, false).catch(() => void 0);
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
  if (response._data !== void 0) {
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
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
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
  return input ? Array.isArray(input) ? input : [input] : void 0;
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
  const spacing = options.debug ? 2 : void 0;
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
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
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
          await options.onAfterResponse(event, void 0);
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
      await options.onAfterResponse(event, void 0);
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
      if (layer.match && !layer.match(_layerPath, void 0)) {
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
    handler = toEventHandler(handler, void 0, input.route);
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
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
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
      route.handlers[method] = toEventHandler(handler, void 0, path);
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
      if (res === void 0 && isPreemptive) {
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

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

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
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
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
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
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
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
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
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

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
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
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
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
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
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$2 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$2,
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
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
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
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
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
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
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
const DRIVER_NAME$1 = "fs";
const unstorage_47drivers_47fs = defineDriver((userOptions = {}) => {
  if (!userOptions.base) {
    throw createRequiredError(DRIVER_NAME$1, "base");
  }
  const base = resolve$1(userOptions.base);
  const ignore = anymatch(
    userOptions.ignore || ["**/node_modules/**", "**/.git/**"]
  );
  const r = (key) => {
    if (PATH_TRAVERSE_RE$1.test(key)) {
      throw createError(
        DRIVER_NAME$1,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(base, key.replace(/:/g, "/"));
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
    name: DRIVER_NAME$1,
    options: userOptions,
    flags: {
      maxDepth: true
    },
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
      if (userOptions.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (userOptions.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (userOptions.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), ignore, topts?.maxDepth);
    },
    async clear() {
      if (userOptions.readOnly || userOptions.noClear) {
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
        const watchOptions = {
          ignoreInitial: true,
          ...userOptions.watchOptions
        };
        if (!watchOptions.ignored) {
          watchOptions.ignored = [];
        } else if (Array.isArray(watchOptions.ignored)) {
          watchOptions.ignored = [...watchOptions.ignored];
        } else {
          watchOptions.ignored = [watchOptions.ignored];
        }
        watchOptions.ignored.push(ignore);
        _watcher = watch$1(base, watchOptions).on("ready", () => {
          resolve2();
        }).on("error", reject).on("all", (eventName, path) => {
          path = relative(base, path);
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
    flags: {
      maxDepth: true
    },
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
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('uploads', unstorage_47drivers_47fs({"driver":"fs","base":"./public/uploads"}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

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
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "93632ac8-7f75-4df7-a019-6c0a3a6cacdb",
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
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
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

const plugins = [
  
];

const assets = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3l1lldD6RQUS9KTOew8+0izelJI\"",
    "mtime": "2025-05-17T03:54:35.264Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"863-n19ln8HJXj/zm3D/0cakhNoJ+PM\"",
    "mtime": "2025-05-17T03:54:35.264Z",
    "size": 2147,
    "path": "../public/favicon.ico"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"863a8-iNZZJzIeTTTOOyeiRujRu1oZDno\"",
    "mtime": "2025-07-28T11:26:21.866Z",
    "size": 549800,
    "path": "../public/index.html"
  },
  "/all-contact-info/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85b86-iHbOsdWUmXH3OPuMtbOXqeW8K4Y\"",
    "mtime": "2025-07-28T11:26:23.467Z",
    "size": 547718,
    "path": "../public/all-contact-info/index.html"
  },
  "/about-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86c74-n1BAkG/pxNAvnTmkfSdp6imC4xk\"",
    "mtime": "2025-07-28T11:26:23.151Z",
    "size": 552052,
    "path": "../public/about-us/index.html"
  },
  "/announcement/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"859f3-dcY7iuFgtRz/0p136aDWF6/se/k\"",
    "mtime": "2025-07-28T11:26:22.524Z",
    "size": 547315,
    "path": "../public/announcement/index.html"
  },
  "/blog-details/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"870ad-3w809Z2Yf/6YQwkF1tPdip2nuAs\"",
    "mtime": "2025-07-28T11:26:23.256Z",
    "size": 553133,
    "path": "../public/blog-details/index.html"
  },
  "/application-form/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85360-PXB8FyF4vUYVcyaKFzRcRmGAU6o\"",
    "mtime": "2025-07-28T11:26:22.525Z",
    "size": 545632,
    "path": "../public/application-form/index.html"
  },
  "/censor-standard/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85838-CdBuMxGHYwkS57VVmItg+AGtrkA\"",
    "mtime": "2025-07-28T11:26:22.540Z",
    "size": 546872,
    "path": "../public/censor-standard/index.html"
  },
  "/company-statute/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85a73-XLM17LweBW6pNyid4R1DMIFrs3w\"",
    "mtime": "2025-07-28T11:26:22.528Z",
    "size": 547443,
    "path": "../public/company-statute/index.html"
  },
  "/conduct-plan/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85f20-GyLqHmhnugas9dMV1dOc4acBsiE\"",
    "mtime": "2025-07-28T11:26:22.540Z",
    "size": 548640,
    "path": "../public/conduct-plan/index.html"
  },
  "/contact/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87a32-aV/2J3RN/sw2L4oQ8MjG4niON7Q\"",
    "mtime": "2025-07-28T11:26:22.525Z",
    "size": 555570,
    "path": "../public/contact/index.html"
  },
  "/convert-principle/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85843-JwCilsK2mTtEsHtsQDzXp8WAOrg\"",
    "mtime": "2025-07-28T11:26:22.668Z",
    "size": 546883,
    "path": "../public/convert-principle/index.html"
  },
  "/employment-services/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85833-YYvnuvVXH0P9os6F0Sk3D1N5bow\"",
    "mtime": "2025-07-28T11:26:22.528Z",
    "size": 546867,
    "path": "../public/employment-services/index.html"
  },
  "/faq/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"857b1-pLZkwgqqnWIqN4QjIg4pxxpjEfg\"",
    "mtime": "2025-07-28T11:26:22.904Z",
    "size": 546737,
    "path": "../public/faq/index.html"
  },
  "/foreign-famliy-link/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85ea7-gdXJuLbDYODhc7o+lOphDnFs0Ns\"",
    "mtime": "2025-07-28T11:26:23.453Z",
    "size": 548519,
    "path": "../public/foreign-famliy-link/index.html"
  },
  "/images/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2004-wUTsEjCC2OyI7i/K0qU7xNEkrFs\"",
    "mtime": "2025-05-17T03:54:35.264Z",
    "size": 8196,
    "path": "../public/images/.DS_Store"
  },
  "/images/2021-12-23.jpg": {
    "type": "image/jpeg",
    "etag": "\"53303-e2wOLCOU5qJBTFyumNAII/HLeZY\"",
    "mtime": "2025-05-17T03:54:35.280Z",
    "size": 340739,
    "path": "../public/images/2021-12-23.jpg"
  },
  "/images/bg_1.png": {
    "type": "image/png",
    "etag": "\"f3c1b-D87qMRIklEQ8zmqdZQ156n/F6Bk\"",
    "mtime": "2025-05-17T03:54:35.895Z",
    "size": 998427,
    "path": "../public/images/bg_1.png"
  },
  "/images/bg_2.jpg": {
    "type": "image/jpeg",
    "etag": "\"47c59-qzAY9397SjCE+PfuF6gON+8mjJM\"",
    "mtime": "2025-05-17T03:54:35.902Z",
    "size": 293977,
    "path": "../public/images/bg_2.jpg"
  },
  "/images/bg_3.png": {
    "type": "image/png",
    "etag": "\"8b2bd-I2/sIZtO/ZWeE9NFbNAF/eLfHCs\"",
    "mtime": "2025-05-17T03:54:35.911Z",
    "size": 570045,
    "path": "../public/images/bg_3.png"
  },
  "/images/bg_4.png": {
    "type": "image/png",
    "etag": "\"1d7d85-M2ZDH6I/YzSAXPbuty6FxoK7QfA\"",
    "mtime": "2025-05-17T03:54:35.934Z",
    "size": 1932677,
    "path": "../public/images/bg_4.png"
  },
  "/images/lazy.svg": {
    "type": "image/svg+xml",
    "etag": "\"1d9-182lKBfMaw6HjASXnwU0cGi4+Ww\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 473,
    "path": "../public/images/lazy.svg"
  },
  "/images/loader.svg": {
    "type": "image/svg+xml",
    "etag": "\"29d-sTmwxo78YcKj1iE5T7CUVpVrnOk\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 669,
    "path": "../public/images/loader.svg"
  },
  "/join-us-unit/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"860e9-74BgBVbBszCvz531Gm/zJ5y40eY\"",
    "mtime": "2025-07-28T11:26:22.524Z",
    "size": 549097,
    "path": "../public/join-us-unit/index.html"
  },
  "/join-us/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8a3c8-lDASoWu6KpMuMDOFqK/zJOcyi2Q\"",
    "mtime": "2025-07-28T11:26:23.233Z",
    "size": 566216,
    "path": "../public/join-us/index.html"
  },
  "/js/bootstrap.bundle.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13b57-i3FSYFsLhIeKHnb8M21FQ+Uvla8\"",
    "mtime": "2025-05-17T03:54:36.608Z",
    "size": 80727,
    "path": "../public/js/bootstrap.bundle.min.js"
  },
  "/lazy-bag/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"854c2-n8ycBaCfaL4WjG861R3vDgQWiyA\"",
    "mtime": "2025-07-28T11:26:23.689Z",
    "size": 545986,
    "path": "../public/lazy-bag/index.html"
  },
  "/links/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87087-6VTe3h7LWwYNd12uRGVgvkt/EOQ\"",
    "mtime": "2025-07-28T11:26:22.524Z",
    "size": 553095,
    "path": "../public/links/index.html"
  },
  "/news/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85860-SDJgrpZckcqmrSSmpBL17vxA6O8\"",
    "mtime": "2025-07-28T11:26:22.524Z",
    "size": 546912,
    "path": "../public/news/index.html"
  },
  "/propaganda/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86149-kAwUCppvYN0wOHUjrkbWkD5dWkM\"",
    "mtime": "2025-07-28T11:26:22.528Z",
    "size": 549193,
    "path": "../public/propaganda/index.html"
  },
  "/qa/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85579-V8myIdCjgYgR+AlZ1tkltGcibg8\"",
    "mtime": "2025-07-28T11:26:22.642Z",
    "size": 546169,
    "path": "../public/qa/index.html"
  },
  "/experience-share/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85593-4atK4JdKSm2sdCxSRG5A5MO6wzU\"",
    "mtime": "2025-07-28T11:26:22.540Z",
    "size": 546195,
    "path": "../public/experience-share/index.html"
  },
  "/qa_test/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8557e-NGYLG0V/9H23qv+ub8pPu6QFqWE\"",
    "mtime": "2025-07-28T11:26:22.670Z",
    "size": 546174,
    "path": "../public/qa_test/index.html"
  },
  "/qa_test2/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85655-UEj69PWiJMoh6MDTSMEg8NCbw0s\"",
    "mtime": "2025-07-28T11:26:23.689Z",
    "size": 546389,
    "path": "../public/qa_test2/index.html"
  },
  "/reserve-guide/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86581-IFBrE2tb8Vt4TWpbThfbU4IqUvI\"",
    "mtime": "2025-07-28T11:26:22.528Z",
    "size": 550273,
    "path": "../public/reserve-guide/index.html"
  },
  "/service-now/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86e32-YMhvv4NXEippFGdyErQ4JiBNNq8\"",
    "mtime": "2025-07-28T11:26:23.233Z",
    "size": 552498,
    "path": "../public/service-now/index.html"
  },
  "/service-apply-form/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"855f6-WkiYhz3iMT2QcFAbz/QiPp0mLQQ\"",
    "mtime": "2025-07-28T11:26:22.540Z",
    "size": 546294,
    "path": "../public/service-apply-form/index.html"
  },
  "/service-price/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85322-dRSm5mNrBuBy7fTFTqnTJQKVe1Y\"",
    "mtime": "2025-07-28T11:26:23.467Z",
    "size": 545570,
    "path": "../public/service-price/index.html"
  },
  "/service-v1/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86622-BWyoJnZHZ+q9n+3WRmHCSg2PhV0\"",
    "mtime": "2025-07-28T11:26:23.492Z",
    "size": 550434,
    "path": "../public/service-v1/index.html"
  },
  "/services/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"86d25-PvFe1GxBfxlYoPyDF8JUqelTd4U\"",
    "mtime": "2025-07-28T11:26:23.586Z",
    "size": 552229,
    "path": "../public/services/index.html"
  },
  "/story/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"856c5-70LtBIGxvTDQ3M0sFKpD97AzdhI\"",
    "mtime": "2025-07-28T11:26:22.904Z",
    "size": 546501,
    "path": "../public/story/index.html"
  },
  "/support/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"85f8e-tt+oB3sJ6PwM7uthoocPudzu6oA\"",
    "mtime": "2025-07-28T11:26:22.904Z",
    "size": 548750,
    "path": "../public/support/index.html"
  },
  "/uploads/1740206726089-3月.png": {
    "type": "image/png",
    "etag": "\"240ad8-sPOMrrzmia3iC5Twq7q3/Qt4jro\"",
    "mtime": "2025-05-17T03:54:36.642Z",
    "size": 2362072,
    "path": "../public/uploads/1740206726089-3月.png"
  },
  "/uploads/1740207158706-3月.png": {
    "type": "image/png",
    "etag": "\"240ad8-sPOMrrzmia3iC5Twq7q3/Qt4jro\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 2362072,
    "path": "../public/uploads/1740207158706-3月.png"
  },
  "/uploads/1740207265814-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740207265814-crying.png"
  },
  "/uploads/1740208785036-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740208785036-crying.png"
  },
  "/uploads/1740212939318-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740212939318-crying.png"
  },
  "/uploads/1740213006607-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740213006607-crying.png"
  },
  "/uploads/1740213079068-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740213079068-crying.png"
  },
  "/uploads/1740213118351-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740213118351-crying.png"
  },
  "/uploads/1740213300315-crying.png": {
    "type": "image/png",
    "etag": "\"1b33-u2OPScio10P7hqE4VNkb0Cp3KYA\"",
    "mtime": "2025-05-17T03:54:36.668Z",
    "size": 6963,
    "path": "../public/uploads/1740213300315-crying.png"
  },
  "/uploads/1740213313019-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-05-17T03:54:36.684Z",
    "size": 512217,
    "path": "../public/uploads/1740213313019-S__17571843.jpg"
  },
  "/uploads/1740213348339-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-05-17T03:54:36.692Z",
    "size": 512217,
    "path": "../public/uploads/1740213348339-S__17571843.jpg"
  },
  "/uploads/1740213437020-S__17571843.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d0d9-GXHA/TGpr3N3smuW+2Jm9V8Z4S4\"",
    "mtime": "2025-05-17T03:54:36.700Z",
    "size": 512217,
    "path": "../public/uploads/1740213437020-S__17571843.jpg"
  },
  "/uploads/授權方式及範圍.docx": {
    "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "etag": "\"35ca-YBBuKhhNNLdWICzHGNvc+XRTM1A\"",
    "mtime": "2025-07-28T11:23:16.002Z",
    "size": 13770,
    "path": "../public/uploads/授權方式及範圍.docx"
  },
  "/uploads/檢舉貪瀆.docx": {
    "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "etag": "\"30be-xeniT7MdiVzthBhSUvNmw6sKSPI\"",
    "mtime": "2025-07-28T11:23:16.002Z",
    "size": 12478,
    "path": "../public/uploads/檢舉貪瀆.docx"
  },
  "/uploads/附件一-多元陪伴照顧服務試辦單位申請表.docx": {
    "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "etag": "\"391c-HxiY8TEfR8erZiNXF5d8itcUp+o\"",
    "mtime": "2025-06-22T04:05:50.928Z",
    "size": 14620,
    "path": "../public/uploads/附件一-多元陪伴照顧服務試辦單位申請表.docx"
  },
  "/uploads/附件二-多元陪伴照顧服務試辦計畫書.docx": {
    "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "etag": "\"5574-S4sucj97M7gTCRdLO3nzqMsSaZQ\"",
    "mtime": "2025-06-22T04:05:50.928Z",
    "size": 21876,
    "path": "../public/uploads/附件二-多元陪伴照顧服務試辦計畫書.docx"
  },
  "/uploads/隱私權及資訊安全政策.docx": {
    "type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "etag": "\"44b7-R+YIvWQ6vVZNRvWkRzCO3zJnU10\"",
    "mtime": "2025-07-28T11:23:16.002Z",
    "size": 17591,
    "path": "../public/uploads/隱私權及資訊安全政策.docx"
  },
  "/_nuxt/1kc5_5-r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f4-V320UBocuX3og8ofzgQrr+X/CVk\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 756,
    "path": "../public/_nuxt/1kc5_5-r.js"
  },
  "/_nuxt/4n_QcQ4a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da4-F2EvZ1WCEvbJmOH7dSw3a8iZW+E\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 3492,
    "path": "../public/_nuxt/4n_QcQ4a.js"
  },
  "/_nuxt/6cM-BfyX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1000-1S5EjJoXybBqhHtro/kk2uMw/Ks\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 4096,
    "path": "../public/_nuxt/6cM-BfyX.js"
  },
  "/_nuxt/9A2vj-4v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"377-kNmQRflainSHCVtfnjyip8U3olM\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 887,
    "path": "../public/_nuxt/9A2vj-4v.js"
  },
  "/_nuxt/about-us.CcB1ZWYX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8e6-fRXxkY9IdNkB4Qpl97wmCEv20kA\"",
    "mtime": "2025-07-28T11:25:51.609Z",
    "size": 2278,
    "path": "../public/_nuxt/about-us.CcB1ZWYX.css"
  },
  "/_nuxt/admin.BG4oIB8c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"226-Nbkbdku8WIJQvXIXd1y0p4QQhMA\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 550,
    "path": "../public/_nuxt/admin.BG4oIB8c.css"
  },
  "/_nuxt/all-contact-info.LmTmS_Ew.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"440-nTfrildnzEps/Hnrs9xH9D46aUA\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 1088,
    "path": "../public/_nuxt/all-contact-info.LmTmS_Ew.css"
  },
  "/_nuxt/announcement.CdktB5ep.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5fe-ThCtg8/0KgQL5yfowNjSxBhbSko\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 1534,
    "path": "../public/_nuxt/announcement.CdktB5ep.css"
  },
  "/_nuxt/announcements.9YZ9LwUE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"149b-Clw8If/Uspj9a4M362Lg5j/p4+Q\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 5275,
    "path": "../public/_nuxt/announcements.9YZ9LwUE.css"
  },
  "/_nuxt/application-form.DXUBT5sI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"121-15FaserjXd9HyXJppTkrZ7g2Nlg\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 289,
    "path": "../public/_nuxt/application-form.DXUBT5sI.css"
  },
  "/_nuxt/B06jpjv_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f6-SCMeWvO5j8zoL41qMFCtcYx4d0o\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 502,
    "path": "../public/_nuxt/B06jpjv_.js"
  },
  "/_nuxt/B1woMRDl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a49-pbZuDrqT4/4kovZKuBX1I5ESUk4\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 2633,
    "path": "../public/_nuxt/B1woMRDl.js"
  },
  "/_nuxt/B35g4hJZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a15-7r8LElMY0b151aB/XFpUPDuJHUQ\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 10773,
    "path": "../public/_nuxt/B35g4hJZ.js"
  },
  "/_nuxt/B4rNFqK2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30f9-d3AFhIk27O0TUyXq1VtyfpRD2Mk\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 12537,
    "path": "../public/_nuxt/B4rNFqK2.js"
  },
  "/_nuxt/B6aZOaut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d8c-1g6PWh0S6xC7PThbZ8A+UoioUK0\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 7564,
    "path": "../public/_nuxt/B6aZOaut.js"
  },
  "/_nuxt/B84RmLkZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"192a-EDXN71RmgThCZg2QMEghVzk/Ses\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 6442,
    "path": "../public/_nuxt/B84RmLkZ.js"
  },
  "/_nuxt/BA1es72k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"51f-l3OybV7Y5rA7XltPKXXn6WYV248\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 1311,
    "path": "../public/_nuxt/BA1es72k.js"
  },
  "/_nuxt/BAhxFMIO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"50f-E1WrNu2pwub3e+fpmUpjm6zW+Gs\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 1295,
    "path": "../public/_nuxt/BAhxFMIO.js"
  },
  "/_nuxt/banners.CXzX0Pme.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"185a-BnCJJQh12AG+v8h4PCIcTbFx+Wg\"",
    "mtime": "2025-07-28T11:25:51.614Z",
    "size": 6234,
    "path": "../public/_nuxt/banners.CXzX0Pme.css"
  },
  "/_nuxt/Beo8uSS2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b0-ICQMQkSdfxksHAmZ3CT1iYPZOy0\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 432,
    "path": "../public/_nuxt/Beo8uSS2.js"
  },
  "/_nuxt/BFhU4z-8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"454-fHRk8psFt3Aist96eXyWp+tWHgo\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 1108,
    "path": "../public/_nuxt/BFhU4z-8.js"
  },
  "/_nuxt/BgxMiRUX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20db-Xh9d1BLHRp8B8nQFcJNO1g5Dbrk\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 8411,
    "path": "../public/_nuxt/BgxMiRUX.js"
  },
  "/_nuxt/BjNxgquD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c4-N7ojWhkjzAryasHlYdxtQorHRu8\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 708,
    "path": "../public/_nuxt/BjNxgquD.js"
  },
  "/_nuxt/bootstrap-icons.DSXWTQaD.woff2": {
    "type": "font/woff2",
    "etag": "\"1d9d0-F9rQd2iZrRvq2r0GHDTioiss3nQ\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 121296,
    "path": "../public/_nuxt/bootstrap-icons.DSXWTQaD.woff2"
  },
  "/_nuxt/bootstrap-icons.DTeOS7dS.woff": {
    "type": "font/woff",
    "etag": "\"28200-dZGccXzlxbxxa8UXBcDNC2D0v/w\"",
    "mtime": "2025-07-28T11:25:51.533Z",
    "size": 164352,
    "path": "../public/_nuxt/bootstrap-icons.DTeOS7dS.woff"
  },
  "/_nuxt/BPwMFge1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3021f-IMl3kjNzeTaOvYQwmfZLWdzX+EE\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 197151,
    "path": "../public/_nuxt/BPwMFge1.js"
  },
  "/_nuxt/BQTR8uBX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c6c-yCdOdB2LE52yDGVtiFB7nlaJTMM\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 7276,
    "path": "../public/_nuxt/BQTR8uBX.js"
  },
  "/_nuxt/BqyXcpfT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"384-AyYBF+8GHkuQqv9pfcq17K4S0tM\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 900,
    "path": "../public/_nuxt/BqyXcpfT.js"
  },
  "/_nuxt/Br4lrAh6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"123ed-UngLqcDwNNYpJfFVjVSDt10frqk\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 74733,
    "path": "../public/_nuxt/Br4lrAh6.js"
  },
  "/_nuxt/breadcrumb-one.FjJfrjWq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b-VYvYxOdHg/Kauo6QM8wjrRXUisQ\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 59,
    "path": "../public/_nuxt/breadcrumb-one.FjJfrjWq.css"
  },
  "/_nuxt/Brfk6Bdo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11132-f+QGLEQyVOHgyJJ7j8uObM8BgTc\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 69938,
    "path": "../public/_nuxt/Brfk6Bdo.js"
  },
  "/_nuxt/BvhIm-I2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7bd-EDQcWQln5UIJoZV9scw+y6uzQxQ\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 1981,
    "path": "../public/_nuxt/BvhIm-I2.js"
  },
  "/_nuxt/BVv6edHu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e3a-FGvHtNleankDdGb+XkaRYCoud90\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 3642,
    "path": "../public/_nuxt/BVv6edHu.js"
  },
  "/_nuxt/Bwdaa1vK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33d3-RNl5jOpKlvqSlyTuhsUgLZrzwvM\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 13267,
    "path": "../public/_nuxt/Bwdaa1vK.js"
  },
  "/_nuxt/BxEw9RTd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29f-4Y9bpaJJuRnTrwtrffDeCMJvu7M\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 671,
    "path": "../public/_nuxt/BxEw9RTd.js"
  },
  "/_nuxt/C0ymWHiW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113-cP+A1tsiJ1RiSwn7LdLYaK1E2p8\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 275,
    "path": "../public/_nuxt/C0ymWHiW.js"
  },
  "/_nuxt/C2Ri_3o8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"514-eiBavYa5V1H/Yl3rJhIuvIQv/jM\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 1300,
    "path": "../public/_nuxt/C2Ri_3o8.js"
  },
  "/_nuxt/C3GjurlD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"214-YoavxNabM3ChrRzLDacn9f810oY\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 532,
    "path": "../public/_nuxt/C3GjurlD.js"
  },
  "/_nuxt/C5mJaO-0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dab-Yoz7bN1NABU6YQJZ2GBnxBT+534\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 3499,
    "path": "../public/_nuxt/C5mJaO-0.js"
  },
  "/_nuxt/Caq-V9SV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d62-RUQpnJPvxaqK0HxU7/To6ZzeLpI\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 3426,
    "path": "../public/_nuxt/Caq-V9SV.js"
  },
  "/_nuxt/CcWsJCfb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ce-jNiASoZzLu8nx6u0FyYhUlqH8q4\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 206,
    "path": "../public/_nuxt/CcWsJCfb.js"
  },
  "/_nuxt/CcXdW5f6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156c-lguY+oiQY+RuQtBziNfY9TwX9/o\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 5484,
    "path": "../public/_nuxt/CcXdW5f6.js"
  },
  "/_nuxt/censor-standard.DYzwdk36.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-So2v/ujJXPpGcJoZqACggO4SW6I\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 720,
    "path": "../public/_nuxt/censor-standard.DYzwdk36.css"
  },
  "/_nuxt/CG7ka5em.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49f-TPzNGsQXUQaVa2hmAqOalZRib8o\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 1183,
    "path": "../public/_nuxt/CG7ka5em.js"
  },
  "/_nuxt/ClashDisplay-Bold.5hYeFSJJ.ttf": {
    "type": "font/ttf",
    "etag": "\"b17c-rUisliadNOWsSzFJ7cByDxGPrAY\"",
    "mtime": "2025-07-28T11:25:51.573Z",
    "size": 45436,
    "path": "../public/_nuxt/ClashDisplay-Bold.5hYeFSJJ.ttf"
  },
  "/_nuxt/ClashDisplay-Bold.79YOzMqN.woff": {
    "type": "font/woff",
    "etag": "\"47bc-nJ4NdN5D6lOz/0RA94fRVTz7Rec\"",
    "mtime": "2025-07-28T11:25:51.532Z",
    "size": 18364,
    "path": "../public/_nuxt/ClashDisplay-Bold.79YOzMqN.woff"
  },
  "/_nuxt/ClashDisplay-Bold.YaCnK2PY.woff2": {
    "type": "font/woff2",
    "etag": "\"38d0-TbK/Sdmhygeg6Uetwl1K+L4psR0\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 14544,
    "path": "../public/_nuxt/ClashDisplay-Bold.YaCnK2PY.woff2"
  },
  "/_nuxt/ClashDisplay-Extralight.-kv4w5k0.ttf": {
    "type": "font/ttf",
    "etag": "\"b278-XEHz7pFlY4dhKlOidzRQAiudWyw\"",
    "mtime": "2025-07-28T11:25:51.565Z",
    "size": 45688,
    "path": "../public/_nuxt/ClashDisplay-Extralight.-kv4w5k0.ttf"
  },
  "/_nuxt/ClashDisplay-Extralight.BJExDEVH.woff": {
    "type": "font/woff",
    "etag": "\"45d4-5R7YwNW4xGm/cd22qaAAr++FvLg\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 17876,
    "path": "../public/_nuxt/ClashDisplay-Extralight.BJExDEVH.woff"
  },
  "/_nuxt/ClashDisplay-Extralight.D3i1MCwm.woff2": {
    "type": "font/woff2",
    "etag": "\"37e8-kZTQHyLBEvUzW0VK3Lx6s/Oe3v0\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 14312,
    "path": "../public/_nuxt/ClashDisplay-Extralight.D3i1MCwm.woff2"
  },
  "/_nuxt/ClashDisplay-Light.Co9CQZ40.woff": {
    "type": "font/woff",
    "etag": "\"4b7c-QJSvHiwGBZjmM7bu/kNTWcYeSwI\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 19324,
    "path": "../public/_nuxt/ClashDisplay-Light.Co9CQZ40.woff"
  },
  "/_nuxt/ClashDisplay-Light.CutxPsj4.ttf": {
    "type": "font/ttf",
    "etag": "\"b364-hpAnTZ5uUofw80+YnEYBnZcYMZY\"",
    "mtime": "2025-07-28T11:25:51.572Z",
    "size": 45924,
    "path": "../public/_nuxt/ClashDisplay-Light.CutxPsj4.ttf"
  },
  "/_nuxt/ClashDisplay-Light.DIjv0-nY.woff2": {
    "type": "font/woff2",
    "etag": "\"3bc4-pHwL8DOh/iHYto6HkSFEowXammw\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 15300,
    "path": "../public/_nuxt/ClashDisplay-Light.DIjv0-nY.woff2"
  },
  "/_nuxt/ClashDisplay-Medium.BPdWq--j.woff2": {
    "type": "font/woff2",
    "etag": "\"3ba8-9J+LstuW6I83bW38sKqeeDZu70c\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 15272,
    "path": "../public/_nuxt/ClashDisplay-Medium.BPdWq--j.woff2"
  },
  "/_nuxt/ClashDisplay-Medium.D8oxfInt.woff": {
    "type": "font/woff",
    "etag": "\"4c6c-hxrqS9ptU942Y+44dI99I0PVsH4\"",
    "mtime": "2025-07-28T11:25:51.532Z",
    "size": 19564,
    "path": "../public/_nuxt/ClashDisplay-Medium.D8oxfInt.woff"
  },
  "/_nuxt/ClashDisplay-Medium.RwyLHzhI.ttf": {
    "type": "font/ttf",
    "etag": "\"b25c-Org43a6RQL6NYRkuUnrFxSY2EDg\"",
    "mtime": "2025-07-28T11:25:51.573Z",
    "size": 45660,
    "path": "../public/_nuxt/ClashDisplay-Medium.RwyLHzhI.ttf"
  },
  "/_nuxt/ClashDisplay-Regular.BKrzTZUV.woff": {
    "type": "font/woff",
    "etag": "\"4bdc-HVKT2vF7HjoAzJLWUWx5ivEqxzc\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 19420,
    "path": "../public/_nuxt/ClashDisplay-Regular.BKrzTZUV.woff"
  },
  "/_nuxt/ClashDisplay-Regular.DhusH4GR.woff2": {
    "type": "font/woff2",
    "etag": "\"3b20-+YvkhCZQtFrPKkvvkS2iADw6+qc\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 15136,
    "path": "../public/_nuxt/ClashDisplay-Regular.DhusH4GR.woff2"
  },
  "/_nuxt/ClashDisplay-Regular.zoOY6xZw.ttf": {
    "type": "font/ttf",
    "etag": "\"b1ac-GDUvSy3jIyjkMxGgNlrzkd7SvAo\"",
    "mtime": "2025-07-28T11:25:51.572Z",
    "size": 45484,
    "path": "../public/_nuxt/ClashDisplay-Regular.zoOY6xZw.ttf"
  },
  "/_nuxt/ClashDisplay-Semibold.C8tXlykZ.ttf": {
    "type": "font/ttf",
    "etag": "\"b234-CDf4hEYSyCtQZ9iY0/Bhmvmqhvo\"",
    "mtime": "2025-07-28T11:25:51.581Z",
    "size": 45620,
    "path": "../public/_nuxt/ClashDisplay-Semibold.C8tXlykZ.ttf"
  },
  "/_nuxt/ClashDisplay-Semibold.Cc_zfQ1K.woff": {
    "type": "font/woff",
    "etag": "\"4c94-ZNkYeGb+y/RG5ktxq44gsjzSuO8\"",
    "mtime": "2025-07-28T11:25:51.532Z",
    "size": 19604,
    "path": "../public/_nuxt/ClashDisplay-Semibold.Cc_zfQ1K.woff"
  },
  "/_nuxt/ClashDisplay-Semibold.DcA1xgJG.woff2": {
    "type": "font/woff2",
    "etag": "\"3bb4-CWpCQyaxXID5O8v8cVkyBbq4C3I\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 15284,
    "path": "../public/_nuxt/ClashDisplay-Semibold.DcA1xgJG.woff2"
  },
  "/_nuxt/company-statute.Chy6yFf3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32d-kOmh+eQPZBXgMALo5npcSsT3mEQ\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 813,
    "path": "../public/_nuxt/company-statute.Chy6yFf3.css"
  },
  "/_nuxt/conduct-plan.Ctj7PMC6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f7-z3Cy7M7LA1BwdGZ4O4qZvt0Igz8\"",
    "mtime": "2025-07-28T11:25:51.614Z",
    "size": 759,
    "path": "../public/_nuxt/conduct-plan.Ctj7PMC6.css"
  },
  "/_nuxt/contact.I8R1SwDS.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"465-k6FU6RpzvlBR1qTNTFg21fZ8Twk\"",
    "mtime": "2025-07-28T11:25:51.607Z",
    "size": 1125,
    "path": "../public/_nuxt/contact.I8R1SwDS.css"
  },
  "/_nuxt/convert-principle.DJT9pcMz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-wkwfd80QI6SaqWUHCFCZR2ETjFI\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 720,
    "path": "../public/_nuxt/convert-principle.DJT9pcMz.css"
  },
  "/_nuxt/CQ2xJDCB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ca-W3v6ttxIB7zJ+XHx0QrlnIZEBj0\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 2250,
    "path": "../public/_nuxt/CQ2xJDCB.js"
  },
  "/_nuxt/CS2usx0J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9be-U8iuV81lGm9XH4ANeFygU+0LeP0\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 2494,
    "path": "../public/_nuxt/CS2usx0J.js"
  },
  "/_nuxt/Csi1WAdA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac0-P+iSCG8j7x2BvIKU/H0TmipDNwI\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 2752,
    "path": "../public/_nuxt/Csi1WAdA.js"
  },
  "/_nuxt/CSzm6xDi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e36-xFzHJ5qRHXVtH+qGMHuCE+xOA6E\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 7734,
    "path": "../public/_nuxt/CSzm6xDi.js"
  },
  "/_nuxt/cTnEV00V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4cc7-IxP9bBUj1h3uHMIP5BfCHt1mLKI\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 19655,
    "path": "../public/_nuxt/cTnEV00V.js"
  },
  "/_nuxt/CTorpNet.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a9-vvovVQ6VYyp8DroZUmeIGHajc/s\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 425,
    "path": "../public/_nuxt/CTorpNet.js"
  },
  "/_nuxt/CtV90Ctt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3fe-h1BDLa+y/AXs9zqjLdvZcUIh97U\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 1022,
    "path": "../public/_nuxt/CtV90Ctt.js"
  },
  "/_nuxt/CwVngibL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"384-nSd98XVcdGoOV/EBWWlcCfJj++U\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 900,
    "path": "../public/_nuxt/CwVngibL.js"
  },
  "/_nuxt/C_rYJChR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43f3-rkz0do+q42mXTdnIpehOxIN3BYo\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 17395,
    "path": "../public/_nuxt/C_rYJChR.js"
  },
  "/_nuxt/D1EjytOQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38e07-N/FwMsZIs6rs9OV8lM6w72ecMZA\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 232967,
    "path": "../public/_nuxt/D1EjytOQ.js"
  },
  "/_nuxt/D5An5Zd-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c04-j9p8k8jNEIIotcnpQp5PDJm7A0I\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 3076,
    "path": "../public/_nuxt/D5An5Zd-.js"
  },
  "/_nuxt/D6ogOEzI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1895-W9DxqCDZFI+Z6jveQxJOh0niWJA\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 6293,
    "path": "../public/_nuxt/D6ogOEzI.js"
  },
  "/_nuxt/dashboard.DRC8eif5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"458-6nXyhgfXvY0UaFkrFkWJyTiWVk4\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 1112,
    "path": "../public/_nuxt/dashboard.DRC8eif5.css"
  },
  "/_nuxt/DBm7E3b1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"312-UYcXE5gJECvrG2aVT6iA7NjGBTE\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 786,
    "path": "../public/_nuxt/DBm7E3b1.js"
  },
  "/_nuxt/default.-h_edMOl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-SmpSuEalQiX9i0KHw9JEnNYg114\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 97,
    "path": "../public/_nuxt/default.-h_edMOl.css"
  },
  "/_nuxt/Dek1VfFx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"247a-jPsaFYBmdTsRCZMRVpjO1sVuZHQ\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 9338,
    "path": "../public/_nuxt/Dek1VfFx.js"
  },
  "/_nuxt/DHKlRAJr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14e2b-i3HIt58RWEjMsXDxWuRjpI7nuns\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 85547,
    "path": "../public/_nuxt/DHKlRAJr.js"
  },
  "/_nuxt/DiStDPJM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25d-xVo7tYYb1SeuJ5CZBCAsb38+eew\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 605,
    "path": "../public/_nuxt/DiStDPJM.js"
  },
  "/_nuxt/DjM5zKUw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"471e2-EbXX/NkgICxTIA3/6yjYqoyu05I\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 291298,
    "path": "../public/_nuxt/DjM5zKUw.js"
  },
  "/_nuxt/DkQXeLD7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10c2-OONzUfQ0Exti3mqcX9Lmk/wfPGQ\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 4290,
    "path": "../public/_nuxt/DkQXeLD7.js"
  },
  "/_nuxt/DO0GOKq8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"814-pWQC2SF48bx02onKKitUxh0ANhk\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 2068,
    "path": "../public/_nuxt/DO0GOKq8.js"
  },
  "/_nuxt/DO_m8NSs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2abc-sLRBfawnR6//2Q9+MMmtgC1vBp8\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 10940,
    "path": "../public/_nuxt/DO_m8NSs.js"
  },
  "/_nuxt/DqhtyqGE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9392-vGCAXeET50tY41Me/Ba7M96bmhA\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 37778,
    "path": "../public/_nuxt/DqhtyqGE.js"
  },
  "/_nuxt/DqoCOQAL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e6-HRcdqWI7YkAlLqFm/Sd0lFIIcU0\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 1510,
    "path": "../public/_nuxt/DqoCOQAL.js"
  },
  "/_nuxt/DQXuP--O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"454-FeOpTDIhS3c4UWdO3CcfUr5H+iA\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 1108,
    "path": "../public/_nuxt/DQXuP--O.js"
  },
  "/_nuxt/Du82l_yK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1037-jJZ8XGkhlhCzAcDl4Eta+bERDmE\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 4151,
    "path": "../public/_nuxt/Du82l_yK.js"
  },
  "/_nuxt/DX1CZ2cJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c5d-wDPghKnPbIUnEOmFlne3o8bAoFY\"",
    "mtime": "2025-07-28T11:25:51.637Z",
    "size": 3165,
    "path": "../public/_nuxt/DX1CZ2cJ.js"
  },
  "/_nuxt/D_sulTYP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"232-lK6l6AYz7UcohWcV0R6ehFZaOgo\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 562,
    "path": "../public/_nuxt/D_sulTYP.js"
  },
  "/_nuxt/employment-services.BHNwRfOo.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d0-C+svGVoDjtdgjOZfimToEax5c7U\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 720,
    "path": "../public/_nuxt/employment-services.BHNwRfOo.css"
  },
  "/_nuxt/entry.DZIuoYPs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"352c-DtHj9x6/DJaa4/r6OPXlnqEUw+Y\"",
    "mtime": "2025-07-28T11:25:51.583Z",
    "size": 13612,
    "path": "../public/_nuxt/entry.DZIuoYPs.css"
  },
  "/_nuxt/faq.BbrQWZWl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f0-ISo035xB2BoTAhSHESKavRuKwN8\"",
    "mtime": "2025-07-28T11:25:51.585Z",
    "size": 1264,
    "path": "../public/_nuxt/faq.BbrQWZWl.css"
  },
  "/_nuxt/foreign-famliy-link.D-VvIn-n.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a2-SxwLGPPFjDZkNfABEJ7+B1trtm4\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 418,
    "path": "../public/_nuxt/foreign-famliy-link.D-VvIn-n.css"
  },
  "/_nuxt/G2ZfCcYL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b18-vFFaIDD1ZLaCh8NUALLZfNZMoXU\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 2840,
    "path": "../public/_nuxt/G2ZfCcYL.js"
  },
  "/_nuxt/hXiZFfwy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c22-D+lDs+K7KSa9oVseIkzwv4AKi3s\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 11298,
    "path": "../public/_nuxt/hXiZFfwy.js"
  },
  "/_nuxt/index.4uOfb_qe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-2tDBN+9cGK1ZFS/rgw7sLHYlcys\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 919,
    "path": "../public/_nuxt/index.4uOfb_qe.css"
  },
  "/_nuxt/index.C1Gml3sV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"40a9-I8PTll5Jr9xu2E94M1IlFZ+HEDk\"",
    "mtime": "2025-07-28T11:25:51.589Z",
    "size": 16553,
    "path": "../public/_nuxt/index.C1Gml3sV.css"
  },
  "/_nuxt/index.D5_Gfe-Q.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"397-gseEgU+PDFgly55JzKFoQsCpJ9g\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 919,
    "path": "../public/_nuxt/index.D5_Gfe-Q.css"
  },
  "/_nuxt/join-us-unit.DYDpIsJs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c3-xBuh8em7qNx5+s5320PbgAL3iR0\"",
    "mtime": "2025-07-28T11:25:51.614Z",
    "size": 963,
    "path": "../public/_nuxt/join-us-unit.DYDpIsJs.css"
  },
  "/_nuxt/join-us.tW0T7HDv.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9f-eYMdLAKuuYDn5MXKL7NgPFQvhTw\"",
    "mtime": "2025-07-28T11:25:51.607Z",
    "size": 159,
    "path": "../public/_nuxt/join-us.tW0T7HDv.css"
  },
  "/_nuxt/joNOYaQ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30224-N/3HIvHefEOAuFU2AiPJWcTwmBk\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 197156,
    "path": "../public/_nuxt/joNOYaQ7.js"
  },
  "/_nuxt/knowledge.DFimDFcm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"21b4-XWY3yFbcJua2E/UKT2n456kis0c\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 8628,
    "path": "../public/_nuxt/knowledge.DFimDFcm.css"
  },
  "/_nuxt/knowledge2.D4IRES2e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d3e-/tB4jeZD0+iGmk+VCabYs2ow3lw\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 3390,
    "path": "../public/_nuxt/knowledge2.D4IRES2e.css"
  },
  "/_nuxt/lazy-bag.DLTuVNgY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f9-J/xk0cSD0S9Ww3XY699tEIYduOU\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 505,
    "path": "../public/_nuxt/lazy-bag.DLTuVNgY.css"
  },
  "/_nuxt/links.BECa8f2-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"51b-li2CEOPB/lIaM12zZbryYCuvpKc\"",
    "mtime": "2025-07-28T11:25:51.589Z",
    "size": 1307,
    "path": "../public/_nuxt/links.BECa8f2-.css"
  },
  "/_nuxt/login.CGuNNCvk.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a41-bPLL5XbeVVUzPX4s2Tfhrw5r434\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 2625,
    "path": "../public/_nuxt/login.CGuNNCvk.css"
  },
  "/_nuxt/Magnita.aiIyRRpl.woff": {
    "type": "font/woff",
    "etag": "\"523c-DAPr6yq9Mcmn1vc/4jlZpuQR4oU\"",
    "mtime": "2025-07-28T11:25:51.572Z",
    "size": 21052,
    "path": "../public/_nuxt/Magnita.aiIyRRpl.woff"
  },
  "/_nuxt/Magnita.aKmWMWBq.svg": {
    "type": "image/svg+xml",
    "etag": "\"4adbe-XmKzqcWr6C3pIlbAKXqhKZ6igPY\"",
    "mtime": "2025-07-28T11:25:51.573Z",
    "size": 306622,
    "path": "../public/_nuxt/Magnita.aKmWMWBq.svg"
  },
  "/_nuxt/Magnita.CSUkLIR8.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"dbfe-nUYlKH6GYeTNhshuwrm3dzq5tnA\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 56318,
    "path": "../public/_nuxt/Magnita.CSUkLIR8.eot"
  },
  "/_nuxt/Magnita.CYTrzT3l.woff2": {
    "type": "font/woff2",
    "etag": "\"3ce8-C5PAb5fpBHr4BUVBBrbXz8vCcH8\"",
    "mtime": "2025-07-28T11:25:51.533Z",
    "size": 15592,
    "path": "../public/_nuxt/Magnita.CYTrzT3l.woff2"
  },
  "/_nuxt/news-details-area.B_V4NsC5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1112-16zwjcKz3JbqYaa3qrk/fj/hzFY\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 4370,
    "path": "../public/_nuxt/news-details-area.B_V4NsC5.css"
  },
  "/_nuxt/PeITmX08.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"742-3hhxCGT5d6HoffzWJ8ddh/2tMEs\"",
    "mtime": "2025-07-28T11:25:51.632Z",
    "size": 1858,
    "path": "../public/_nuxt/PeITmX08.js"
  },
  "/_nuxt/PE_y6nD0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"589-CelULpEO/vRkJmJrNt6f4pAdXtE\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 1417,
    "path": "../public/_nuxt/PE_y6nD0.js"
  },
  "/_nuxt/propaganda.CCAosxga.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ea9-+Uss9mIGJkwO6Ef15eBOUNnJUFI\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 3753,
    "path": "../public/_nuxt/propaganda.CCAosxga.css"
  },
  "/_nuxt/qa.BRQ42sO9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b2-+wh/VaPMPQpPsZ9KAbJVBHuIW5o\"",
    "mtime": "2025-07-28T11:25:51.583Z",
    "size": 946,
    "path": "../public/_nuxt/qa.BRQ42sO9.css"
  },
  "/_nuxt/qa.DTi5lDwH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3bae-0JlIQhHr1VMi8qPFo2g2TkTWp20\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 15278,
    "path": "../public/_nuxt/qa.DTi5lDwH.css"
  },
  "/_nuxt/qa_setting.DeSbzGUj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2637-FpmlXuKBqi8Yn70SEtMXdbn3Kt8\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 9783,
    "path": "../public/_nuxt/qa_setting.DeSbzGUj.css"
  },
  "/_nuxt/qa_test.BkDwbgTh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b2-xZLeCo0BKAJrpxzXlp7HjaBrGTs\"",
    "mtime": "2025-07-28T11:25:51.609Z",
    "size": 946,
    "path": "../public/_nuxt/qa_test.BkDwbgTh.css"
  },
  "/_nuxt/qa_test2.QCUqpaIB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b2-Ad/uCynnTLchrhxQpiQM3OUU5uI\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 946,
    "path": "../public/_nuxt/qa_test2.QCUqpaIB.css"
  },
  "/_nuxt/QXX3pRvZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c4-bANzTkDQFmQ9uyTjGxfrKuexJcw\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 1732,
    "path": "../public/_nuxt/QXX3pRvZ.js"
  },
  "/_nuxt/reserve-guide.DIF1SbjF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ab-s75A7PcUbdvC0UDHGaNx61HanBA\"",
    "mtime": "2025-07-28T11:25:51.614Z",
    "size": 1451,
    "path": "../public/_nuxt/reserve-guide.DIF1SbjF.css"
  },
  "/_nuxt/Satoshi-Black.CizHyRqb.ttf": {
    "type": "font/ttf",
    "etag": "\"11dd8-/QUOV04+gdNGhlH5vGGEMZslv8Y\"",
    "mtime": "2025-07-28T11:25:51.561Z",
    "size": 73176,
    "path": "../public/_nuxt/Satoshi-Black.CizHyRqb.ttf"
  },
  "/_nuxt/Satoshi-Black.D3hzT7Um.woff": {
    "type": "font/woff",
    "etag": "\"76a8-TLow2vkHQGQggQI5ItjyB669EIY\"",
    "mtime": "2025-07-28T11:25:51.530Z",
    "size": 30376,
    "path": "../public/_nuxt/Satoshi-Black.D3hzT7Um.woff"
  },
  "/_nuxt/Satoshi-Black.DjnQuuRz.woff2": {
    "type": "font/woff2",
    "etag": "\"5bbc-BpxteIPlhaarNU/FDxNm1JVAOy0\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 23484,
    "path": "../public/_nuxt/Satoshi-Black.DjnQuuRz.woff2"
  },
  "/_nuxt/Satoshi-BlackItalic.ChCbTD27.woff2": {
    "type": "font/woff2",
    "etag": "\"5ed4-uPwSsEUGQ6NfoSAs/CxlrBw6a4M\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 24276,
    "path": "../public/_nuxt/Satoshi-BlackItalic.ChCbTD27.woff2"
  },
  "/_nuxt/Satoshi-BlackItalic.CvIpOoSh.ttf": {
    "type": "font/ttf",
    "etag": "\"127f0-ChxrUaS//iqc05Vgjm1u5Xpwc2M\"",
    "mtime": "2025-07-28T11:25:51.569Z",
    "size": 75760,
    "path": "../public/_nuxt/Satoshi-BlackItalic.CvIpOoSh.ttf"
  },
  "/_nuxt/Satoshi-BlackItalic.D8Ai_S3C.woff": {
    "type": "font/woff",
    "etag": "\"7a84-KOIgdy2SfN9wQfZaSbgXzPOXZQg\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 31364,
    "path": "../public/_nuxt/Satoshi-BlackItalic.D8Ai_S3C.woff"
  },
  "/_nuxt/Satoshi-Bold.Bd5kKQ_U.woff2": {
    "type": "font/woff2",
    "etag": "\"62f0-emfkLcebBWtGooanRhAo/Mvefoo\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 25328,
    "path": "../public/_nuxt/Satoshi-Bold.Bd5kKQ_U.woff2"
  },
  "/_nuxt/Satoshi-Bold.C2PhLWFc.woff": {
    "type": "font/woff",
    "etag": "\"80cc-hEUsQq+QZ3SAPOLaDIOt8QyDEoE\"",
    "mtime": "2025-07-28T11:25:51.530Z",
    "size": 32972,
    "path": "../public/_nuxt/Satoshi-Bold.C2PhLWFc.woff"
  },
  "/_nuxt/Satoshi-Bold.CPly9kH5.ttf": {
    "type": "font/ttf",
    "etag": "\"11e98-uCWkqJtyV1N6ICMWsImXotLwCkk\"",
    "mtime": "2025-07-28T11:25:51.561Z",
    "size": 73368,
    "path": "../public/_nuxt/Satoshi-Bold.CPly9kH5.ttf"
  },
  "/_nuxt/Satoshi-BoldItalic.CAjvAcxR.woff2": {
    "type": "font/woff2",
    "etag": "\"66bc-/mbmGLZ3iJT7MOK6a1Pgk/mq8bo\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 26300,
    "path": "../public/_nuxt/Satoshi-BoldItalic.CAjvAcxR.woff2"
  },
  "/_nuxt/Satoshi-BoldItalic.DQ7B0PfL.woff": {
    "type": "font/woff",
    "etag": "\"8620-ljDtDmgTK8Bpbt4SqdMZVa3Fhtk\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 34336,
    "path": "../public/_nuxt/Satoshi-BoldItalic.DQ7B0PfL.woff"
  },
  "/_nuxt/Satoshi-BoldItalic.tClQcAb-.ttf": {
    "type": "font/ttf",
    "etag": "\"12aa4-dX4lKJ2JEogu06XBEb7jj6zHVBI\"",
    "mtime": "2025-07-28T11:25:51.563Z",
    "size": 76452,
    "path": "../public/_nuxt/Satoshi-BoldItalic.tClQcAb-.ttf"
  },
  "/_nuxt/Satoshi-Italic.BPCXRxzy.woff": {
    "type": "font/woff",
    "etag": "\"8620-iBJBoYLUu1nexIcPB3KjEDHh+Q4\"",
    "mtime": "2025-07-28T11:25:51.502Z",
    "size": 34336,
    "path": "../public/_nuxt/Satoshi-Italic.BPCXRxzy.woff"
  },
  "/_nuxt/Satoshi-Italic.FMxkCD8o.ttf": {
    "type": "font/ttf",
    "etag": "\"12b3c-ak0Y5XpMVc6ABehrPsRDDsC5fiE\"",
    "mtime": "2025-07-28T11:25:51.533Z",
    "size": 76604,
    "path": "../public/_nuxt/Satoshi-Italic.FMxkCD8o.ttf"
  },
  "/_nuxt/Satoshi-Italic.wVmEEc6M.woff2": {
    "type": "font/woff2",
    "etag": "\"6758-sUUjT6H/meD32drfbRXppYnRXqE\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 26456,
    "path": "../public/_nuxt/Satoshi-Italic.wVmEEc6M.woff2"
  },
  "/_nuxt/Satoshi-Light.B82kzbU-.ttf": {
    "type": "font/ttf",
    "etag": "\"11804-6iNGjVWtmnaVjPhKUrcbZb6jXbA\"",
    "mtime": "2025-07-28T11:25:51.543Z",
    "size": 71684,
    "path": "../public/_nuxt/Satoshi-Light.B82kzbU-.ttf"
  },
  "/_nuxt/Satoshi-Light.C_dmkKXz.woff": {
    "type": "font/woff",
    "etag": "\"725c-KD28JKvy8FTDeIrVnk+1MJ0tDXY\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 29276,
    "path": "../public/_nuxt/Satoshi-Light.C_dmkKXz.woff"
  },
  "/_nuxt/Satoshi-Light.IqwJ_ZjS.woff2": {
    "type": "font/woff2",
    "etag": "\"5910-thSiarRJlhdAbmmhZKf3Cht7M74\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 22800,
    "path": "../public/_nuxt/Satoshi-Light.IqwJ_ZjS.woff2"
  },
  "/_nuxt/Satoshi-LightItalic.B9L6s97T.woff": {
    "type": "font/woff",
    "etag": "\"7680-Cv6xiIaWksLBcvsQWJxidY/Jc20\"",
    "mtime": "2025-07-28T11:25:51.530Z",
    "size": 30336,
    "path": "../public/_nuxt/Satoshi-LightItalic.B9L6s97T.woff"
  },
  "/_nuxt/Satoshi-LightItalic.BAhuxY-A.ttf": {
    "type": "font/ttf",
    "etag": "\"12688-7l0NU16SH1SPUOrx7Hk0Vn5w0Q0\"",
    "mtime": "2025-07-28T11:25:51.547Z",
    "size": 75400,
    "path": "../public/_nuxt/Satoshi-LightItalic.BAhuxY-A.ttf"
  },
  "/_nuxt/Satoshi-LightItalic.C9iuU4v7.woff2": {
    "type": "font/woff2",
    "etag": "\"5b70-FEEy4vZu59Ye1PQ7KFS+nHungGo\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 23408,
    "path": "../public/_nuxt/Satoshi-LightItalic.C9iuU4v7.woff2"
  },
  "/_nuxt/Satoshi-Medium.ByP-Zb-9.woff2": {
    "type": "font/woff2",
    "etag": "\"63fc-f23jQcvGBYuDdr2LJlaNNbHTj88\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 25596,
    "path": "../public/_nuxt/Satoshi-Medium.ByP-Zb-9.woff2"
  },
  "/_nuxt/Satoshi-Medium.DDwDPeBg.woff": {
    "type": "font/woff",
    "etag": "\"81f8-fzPHxF9fH0xuWrLGZpo+cEHb5oU\"",
    "mtime": "2025-07-28T11:25:51.530Z",
    "size": 33272,
    "path": "../public/_nuxt/Satoshi-Medium.DDwDPeBg.woff"
  },
  "/_nuxt/Satoshi-Medium.DOt9kM-a.ttf": {
    "type": "font/ttf",
    "etag": "\"1201c-5FOfRojIZSBKh53DJT01R/BESBg\"",
    "mtime": "2025-07-28T11:25:51.539Z",
    "size": 73756,
    "path": "../public/_nuxt/Satoshi-Medium.DOt9kM-a.ttf"
  },
  "/_nuxt/Satoshi-MediumItalic.BPTJUpxz.woff": {
    "type": "font/woff",
    "etag": "\"8710-IRL+qCsT1WlKdogklcuneyZFxy4\"",
    "mtime": "2025-07-28T11:25:51.531Z",
    "size": 34576,
    "path": "../public/_nuxt/Satoshi-MediumItalic.BPTJUpxz.woff"
  },
  "/_nuxt/Satoshi-MediumItalic.BUFVYoD2.ttf": {
    "type": "font/ttf",
    "etag": "\"12b98-3wUITKdAG2qS1J4/xXIPvf+/v7w\"",
    "mtime": "2025-07-28T11:25:51.563Z",
    "size": 76696,
    "path": "../public/_nuxt/Satoshi-MediumItalic.BUFVYoD2.ttf"
  },
  "/_nuxt/Satoshi-MediumItalic.BxR-IcRj.woff2": {
    "type": "font/woff2",
    "etag": "\"6848-yy8XGdPzEnCrAywDqXvewMBOJJA\"",
    "mtime": "2025-07-28T11:25:51.494Z",
    "size": 26696,
    "path": "../public/_nuxt/Satoshi-MediumItalic.BxR-IcRj.woff2"
  },
  "/_nuxt/Satoshi-Regular.CPM9dct4.woff2": {
    "type": "font/woff2",
    "etag": "\"63ac-IWM8fM26KEbq5xVU/Cp896DZD/I\"",
    "mtime": "2025-07-28T11:25:51.481Z",
    "size": 25516,
    "path": "../public/_nuxt/Satoshi-Regular.CPM9dct4.woff2"
  },
  "/_nuxt/Satoshi-Regular.CWSyEjGv.woff": {
    "type": "font/woff",
    "etag": "\"8100-0yFpglK3jVYQPMAavtrS0bTWcJs\"",
    "mtime": "2025-07-28T11:25:51.497Z",
    "size": 33024,
    "path": "../public/_nuxt/Satoshi-Regular.CWSyEjGv.woff"
  },
  "/_nuxt/Satoshi-Regular.DToFXog2.ttf": {
    "type": "font/ttf",
    "etag": "\"11f04-vGBaoIRoz7mkAnWmOGraVskqW+0\"",
    "mtime": "2025-07-28T11:25:51.533Z",
    "size": 73476,
    "path": "../public/_nuxt/Satoshi-Regular.DToFXog2.ttf"
  },
  "/_nuxt/service-apply-form.CvqsROMd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1eb-dvTJVjJdoHLJMLht9naszEzjhKs\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 491,
    "path": "../public/_nuxt/service-apply-form.CvqsROMd.css"
  },
  "/_nuxt/service-now.D2gdYUec.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"572-qPRijK8TGQJqPDbMSC/SZ973X5o\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 1394,
    "path": "../public/_nuxt/service-now.D2gdYUec.css"
  },
  "/_nuxt/service-price.C_ZPqZB_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"153-2SfWq9MmLZVnkKRUEvi2idJmD/A\"",
    "mtime": "2025-07-28T11:25:51.614Z",
    "size": 339,
    "path": "../public/_nuxt/service-price.C_ZPqZB_.css"
  },
  "/_nuxt/service-unit-list-area.BxRW7GR2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ea4-Y8hdhgTrxOwk6QGdtiwQeNdcfkQ\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 3748,
    "path": "../public/_nuxt/service-unit-list-area.BxRW7GR2.css"
  },
  "/_nuxt/service-unit.CIEUqxPw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1463-1g+ksO8qunRcsxnrro2CzVhvQSk\"",
    "mtime": "2025-07-28T11:25:51.616Z",
    "size": 5219,
    "path": "../public/_nuxt/service-unit.CIEUqxPw.css"
  },
  "/_nuxt/services.CUBT9X5K.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4f0-p8UqMfiFdsIU1MD+863qmcCYeLc\"",
    "mtime": "2025-07-28T11:25:51.611Z",
    "size": 1264,
    "path": "../public/_nuxt/services.CUBT9X5K.css"
  },
  "/_nuxt/x_rD_Ya3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b-NQFdZyJZYCba7NdYw0SoR9PvUtA\"",
    "mtime": "2025-07-28T11:25:51.627Z",
    "size": 43,
    "path": "../public/_nuxt/x_rD_Ya3.js"
  },
  "/admin/announcements/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.317Z",
    "size": 98,
    "path": "../public/admin/announcements/index.html"
  },
  "/admin/knowledge/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.403Z",
    "size": 98,
    "path": "../public/admin/knowledge/index.html"
  },
  "/admin/banners/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.317Z",
    "size": 98,
    "path": "../public/admin/banners/index.html"
  },
  "/admin/dashboard/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.317Z",
    "size": 98,
    "path": "../public/admin/dashboard/index.html"
  },
  "/admin/knowledge2/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.403Z",
    "size": 98,
    "path": "../public/admin/knowledge2/index.html"
  },
  "/admin/qa_setting/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.256Z",
    "size": 98,
    "path": "../public/admin/qa_setting/index.html"
  },
  "/admin/login/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"831c4-CHPQk2eSzDgW3ECJf7QHbvRQsu0\"",
    "mtime": "2025-07-28T11:26:23.721Z",
    "size": 537028,
    "path": "../public/admin/login/index.html"
  },
  "/admin/qa/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.467Z",
    "size": 98,
    "path": "../public/admin/qa/index.html"
  },
  "/admin/service-unit/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62-7I1EUP8z3Ttjt0W20/FuO4VUwfw\"",
    "mtime": "2025-07-28T11:26:23.314Z",
    "size": 98,
    "path": "../public/admin/service-unit/index.html"
  },
  "/blog-details/7/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"87170-iHFK59gso4Pwoq3EKRIeRNtuDzY\"",
    "mtime": "2025-07-28T11:26:23.652Z",
    "size": 553328,
    "path": "../public/blog-details/7/index.html"
  },
  "/blog-details/8/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"8716b-SMh9eUXlWpgRt07YYtJa1wsTVuw\"",
    "mtime": "2025-07-28T11:26:23.667Z",
    "size": 553323,
    "path": "../public/blog-details/8/index.html"
  },
  "/images/assets/banner.avif": {
    "type": "image/avif",
    "etag": "\"ebb6-KScc6qwUPWb3V3gLxQ7IztryfhA\"",
    "mtime": "2025-05-17T03:54:35.331Z",
    "size": 60342,
    "path": "../public/images/assets/banner.avif"
  },
  "/images/assets/banner0109.avif": {
    "type": "image/avif",
    "etag": "\"e32a-16ftk7/406hUAlhPyQkWDBSfYNU\"",
    "mtime": "2025-05-17T03:54:35.331Z",
    "size": 58154,
    "path": "../public/images/assets/banner0109.avif"
  },
  "/images/assets/bg_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"1625a-cj5lKTosf50ufqnCs5B/oPTpfLs\"",
    "mtime": "2025-05-17T03:54:35.331Z",
    "size": 90714,
    "path": "../public/images/assets/bg_01.svg"
  },
  "/images/assets/bg_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"15bcf-8eQEq+GL5c5yJfg3XhAqGtgIp/0\"",
    "mtime": "2025-05-17T03:54:35.344Z",
    "size": 89039,
    "path": "../public/images/assets/bg_02.svg"
  },
  "/images/assets/bg_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"16038-LirZuCyJeXHlTcyUwW4MEEHs0CI\"",
    "mtime": "2025-05-17T03:54:35.344Z",
    "size": 90168,
    "path": "../public/images/assets/bg_03.svg"
  },
  "/images/assets/bg_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"d709d-pQxwBFMLvuYNlGqhxOknuTNaNOQ\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 880797,
    "path": "../public/images/assets/bg_04.svg"
  },
  "/images/assets/bg_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"4790-rTXzcQ5hXbSAsh8DzGKZemCHO4Y\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 18320,
    "path": "../public/images/assets/bg_05.svg"
  },
  "/images/assets/bg_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"2fe-mBl2Gpksbk7v7hCsq8ZoT3dMC+c\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 766,
    "path": "../public/images/assets/bg_06.svg"
  },
  "/images/assets/bg_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"31b-nL2gEq6xFVZOitv2Vc3r60Mv59E\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 795,
    "path": "../public/images/assets/bg_07.svg"
  },
  "/images/assets/bg_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"7cd-0scdWGzNEUXpCP13SAb2SEm8OuQ\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 1997,
    "path": "../public/images/assets/bg_08.svg"
  },
  "/images/assets/book-1.avif": {
    "type": "image/avif",
    "etag": "\"275b-0cxai7+0JPKKH7L7Q/F0a6xEA3M\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 10075,
    "path": "../public/images/assets/book-1.avif"
  },
  "/images/assets/book-10.avif": {
    "type": "image/avif",
    "etag": "\"1772-665HUEd+9iusiVncQKH66LQCAc4\"",
    "mtime": "2025-05-17T03:54:35.361Z",
    "size": 6002,
    "path": "../public/images/assets/book-10.avif"
  },
  "/images/assets/book-11.avif": {
    "type": "image/avif",
    "etag": "\"3bc0-jw3qmgZy9XEICPTtiBEIXhByHr0\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 15296,
    "path": "../public/images/assets/book-11.avif"
  },
  "/images/assets/book-12.avif": {
    "type": "image/avif",
    "etag": "\"3651-iRu837lLKa7Al1XwYd3/iHSwswo\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 13905,
    "path": "../public/images/assets/book-12.avif"
  },
  "/images/assets/book-2.avif": {
    "type": "image/avif",
    "etag": "\"2b74-rPasD6qaXe2sg2Js9+tfabURVAg\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 11124,
    "path": "../public/images/assets/book-2.avif"
  },
  "/images/assets/book-3.avif": {
    "type": "image/avif",
    "etag": "\"54a2-OZsqzT/hi+xBNMkUR21FCTnA79Q\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 21666,
    "path": "../public/images/assets/book-3.avif"
  },
  "/images/assets/book-4.avif": {
    "type": "image/avif",
    "etag": "\"bf0a-1+KygENOimbBtrYFsLP33OKJL4I\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 48906,
    "path": "../public/images/assets/book-4.avif"
  },
  "/images/assets/book-5.avif": {
    "type": "image/avif",
    "etag": "\"3b05-uFV5hPi+jiWRnPksYTswONE1Ki8\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 15109,
    "path": "../public/images/assets/book-5.avif"
  },
  "/images/assets/book-6.avif": {
    "type": "image/avif",
    "etag": "\"48aa-YFK1JUGo2BzzmMydLB734IQdKTA\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 18602,
    "path": "../public/images/assets/book-6.avif"
  },
  "/images/assets/book-7.avif": {
    "type": "image/avif",
    "etag": "\"2d9b-+Qt9o+V3yoW8TJoj5adFNoWPPTw\"",
    "mtime": "2025-05-17T03:54:35.376Z",
    "size": 11675,
    "path": "../public/images/assets/book-7.avif"
  },
  "/images/assets/book-8.avif": {
    "type": "image/avif",
    "etag": "\"1d40-aJDSWIR+i6VD3My5MhL7bLGuObU\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 7488,
    "path": "../public/images/assets/book-8.avif"
  },
  "/images/assets/book-9.avif": {
    "type": "image/avif",
    "etag": "\"1fb4-cUbmE6ak251tugLFJGjlVFg45w4\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 8116,
    "path": "../public/images/assets/book-9.avif"
  },
  "/images/assets/brand-1.avif": {
    "type": "image/avif",
    "etag": "\"1be4-1SX+DKluS9SyIPY9llOPqne86Ok\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 7140,
    "path": "../public/images/assets/brand-1.avif"
  },
  "/images/assets/brand-1.png": {
    "type": "image/png",
    "etag": "\"a4a0-Ule/zGo6VstiZBye988qlaaInOM\"",
    "mtime": "2025-05-17T03:55:30.193Z",
    "size": 42144,
    "path": "../public/images/assets/brand-1.png"
  },
  "/images/assets/brand-2.avif": {
    "type": "image/avif",
    "etag": "\"19b7-ETYg6k7ejsbPIidzU+TJFAZgofQ\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 6583,
    "path": "../public/images/assets/brand-2.avif"
  },
  "/images/assets/brand-2.png": {
    "type": "image/png",
    "etag": "\"92bd-Jn+wgkKK+EVp6Y1G75dMZoyscQ4\"",
    "mtime": "2025-05-17T03:55:30.193Z",
    "size": 37565,
    "path": "../public/images/assets/brand-2.png"
  },
  "/images/assets/brand-3.avif": {
    "type": "image/avif",
    "etag": "\"1b05-7sSpnp9P9jBPfU/D0JU9lYh2ZuI\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 6917,
    "path": "../public/images/assets/brand-3.avif"
  },
  "/images/assets/brand-3.png": {
    "type": "image/png",
    "etag": "\"109a2-nm2j1/hwwA0Wy9RggMz/rFzagFI\"",
    "mtime": "2025-05-17T03:55:30.193Z",
    "size": 68002,
    "path": "../public/images/assets/brand-3.png"
  },
  "/images/assets/brand-4.avif": {
    "type": "image/avif",
    "etag": "\"270b-iviDOsWGo26UnOuTaFmvpLBrdls\"",
    "mtime": "2025-05-17T03:54:35.392Z",
    "size": 9995,
    "path": "../public/images/assets/brand-4.avif"
  },
  "/images/assets/brand-4.png": {
    "type": "image/png",
    "etag": "\"cf97-r1gV07X6c4GEjEuTqOHrM0ixbzg\"",
    "mtime": "2025-05-17T03:55:30.193Z",
    "size": 53143,
    "path": "../public/images/assets/brand-4.png"
  },
  "/images/assets/brand-5.avif": {
    "type": "image/avif",
    "etag": "\"32be-UaRJ1UlGPzOa0p1h7eFHeBD7p3o\"",
    "mtime": "2025-05-17T03:54:35.409Z",
    "size": 12990,
    "path": "../public/images/assets/brand-5.avif"
  },
  "/images/assets/brand-5.png": {
    "type": "image/png",
    "etag": "\"1049a-6aFUbYRzL2/RF904etUtGbC4XXM\"",
    "mtime": "2025-05-17T03:55:30.209Z",
    "size": 66714,
    "path": "../public/images/assets/brand-5.png"
  },
  "/images/assets/brand-6.avif": {
    "type": "image/avif",
    "etag": "\"2285-xpQbxzqDcVU0+EOPVK7/UGP+Deg\"",
    "mtime": "2025-05-17T03:54:35.409Z",
    "size": 8837,
    "path": "../public/images/assets/brand-6.avif"
  },
  "/images/assets/brand-6.png": {
    "type": "image/png",
    "etag": "\"17582-YwpyNE+xvYTn5YfuHoQFQR0p7Nk\"",
    "mtime": "2025-05-17T03:55:30.214Z",
    "size": 95618,
    "path": "../public/images/assets/brand-6.png"
  },
  "/images/assets/businessman.png": {
    "type": "image/png",
    "etag": "\"31d7f-scSNME1iH4eKcCN0Rb+K3qlfPVQ\"",
    "mtime": "2025-05-17T03:54:35.413Z",
    "size": 204159,
    "path": "../public/images/assets/businessman.png"
  },
  "/images/assets/businessman_01.png": {
    "type": "image/png",
    "etag": "\"26882-SFF7LoWBhlnjaJaf9HBRsnLnoug\"",
    "mtime": "2025-05-17T03:54:35.417Z",
    "size": 157826,
    "path": "../public/images/assets/businessman_01.png"
  },
  "/images/assets/businessman_02.png": {
    "type": "image/png",
    "etag": "\"e473-ier9CtTGmEg6dk1E/avMKJMvuhc\"",
    "mtime": "2025-05-17T03:54:35.419Z",
    "size": 58483,
    "path": "../public/images/assets/businessman_02.png"
  },
  "/images/assets/businessman_03.png": {
    "type": "image/png",
    "etag": "\"ed61-bVNcVjbjNT9TuZewmrjcLf6LDCc\"",
    "mtime": "2025-05-17T03:54:35.423Z",
    "size": 60769,
    "path": "../public/images/assets/businessman_03.png"
  },
  "/images/assets/EDM_A4_0325.jpg": {
    "type": "image/jpeg",
    "etag": "\"28f679-1tXirYMQQtb0KazfluSuM9gzrfw\"",
    "mtime": "2025-05-17T03:54:35.331Z",
    "size": 2684537,
    "path": "../public/images/assets/EDM_A4_0325.jpg"
  },
  "/images/assets/flag-1.avif": {
    "type": "image/avif",
    "etag": "\"1aa6-pBS8yIpVBIVHy5M1Fa/F9fpVGeE\"",
    "mtime": "2025-05-17T03:54:35.424Z",
    "size": 6822,
    "path": "../public/images/assets/flag-1.avif"
  },
  "/images/assets/flag-2.avif": {
    "type": "image/avif",
    "etag": "\"a96-GEFO4C6tr8ssooD/7Z4oJ8TwuZY\"",
    "mtime": "2025-05-17T03:54:35.426Z",
    "size": 2710,
    "path": "../public/images/assets/flag-2.avif"
  },
  "/images/assets/flag-3.avif": {
    "type": "image/avif",
    "etag": "\"437-xq7IUivPe7YKFXHNRGAoGo4RjtQ\"",
    "mtime": "2025-05-17T03:54:35.428Z",
    "size": 1079,
    "path": "../public/images/assets/flag-3.avif"
  },
  "/images/assets/flag-4.avif": {
    "type": "image/avif",
    "etag": "\"5c5-cMUBmihendo8PyrE6pD4Oq9otOQ\"",
    "mtime": "2025-05-17T03:54:35.430Z",
    "size": 1477,
    "path": "../public/images/assets/flag-4.avif"
  },
  "/images/assets/gov-logo.avif": {
    "type": "image/avif",
    "etag": "\"b5d-nGU9usd/di5oYrQeIwKYyg9VmnQ\"",
    "mtime": "2025-05-17T03:54:35.431Z",
    "size": 2909,
    "path": "../public/images/assets/gov-logo.avif"
  },
  "/images/assets/haland-price.avif": {
    "type": "image/avif",
    "etag": "\"f4af-UcTCRYqq1dTxrOpWswQANnJ3mvg\"",
    "mtime": "2025-05-17T03:54:35.433Z",
    "size": 62639,
    "path": "../public/images/assets/haland-price.avif"
  },
  "/images/assets/haland-price.png": {
    "type": "image/png",
    "etag": "\"3a2f5-QJQ+9P7Gwvohl20TqrrUSTwm3Mk\"",
    "mtime": "2025-05-17T03:55:30.217Z",
    "size": 238325,
    "path": "../public/images/assets/haland-price.png"
  },
  "/images/assets/hand.png": {
    "type": "image/png",
    "etag": "\"ecf9-OYQSesHu4A27ilbnTDMbD4FOWSU\"",
    "mtime": "2025-05-17T03:54:35.435Z",
    "size": 60665,
    "path": "../public/images/assets/hand.png"
  },
  "/images/assets/ils_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"73c7-FHi7OEpOrnM6gWDhcxdu/T9faQ0\"",
    "mtime": "2025-05-17T03:54:35.437Z",
    "size": 29639,
    "path": "../public/images/assets/ils_01.svg"
  },
  "/images/assets/ils_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"a8e6-ZvFW0TT6YCMOidxes1DtB15rdQw\"",
    "mtime": "2025-05-17T03:54:35.439Z",
    "size": 43238,
    "path": "../public/images/assets/ils_02.svg"
  },
  "/images/assets/ils_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f62-sKw1H731TfXDpHrpjp2JxMCZDjI\"",
    "mtime": "2025-05-17T03:54:35.442Z",
    "size": 28514,
    "path": "../public/images/assets/ils_03.svg"
  },
  "/images/assets/ils_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"5fb6-+/3081sG6l/pT0mX/6csOsV5Gs8\"",
    "mtime": "2025-05-17T03:54:35.444Z",
    "size": 24502,
    "path": "../public/images/assets/ils_04.svg"
  },
  "/images/assets/ils_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"ab34-mKq8bLBWtrSwPuljLscXkl9kLgU\"",
    "mtime": "2025-05-17T03:54:35.447Z",
    "size": 43828,
    "path": "../public/images/assets/ils_05.svg"
  },
  "/images/assets/ils_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"b16b-uGWfSrX7Qgj2jONacYNeOZHiN7w\"",
    "mtime": "2025-05-17T03:54:35.449Z",
    "size": 45419,
    "path": "../public/images/assets/ils_06.svg"
  },
  "/images/assets/ils_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"6012-a6Z0cQDuBRceWYb5F6SsR1kW7oA\"",
    "mtime": "2025-05-17T03:54:35.453Z",
    "size": 24594,
    "path": "../public/images/assets/ils_07.svg"
  },
  "/images/assets/ils_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"a3d2-cWB5xuOHWLtVvfhz6efEkWwZ4eM\"",
    "mtime": "2025-05-17T03:54:35.455Z",
    "size": 41938,
    "path": "../public/images/assets/ils_08.svg"
  },
  "/images/assets/ils_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"47cc-+5cvHTwyy4ucAQOtjfX19N3di+A\"",
    "mtime": "2025-05-17T03:54:35.456Z",
    "size": 18380,
    "path": "../public/images/assets/ils_09.svg"
  },
  "/images/assets/ils_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"ac9c-uyxZMraEd0rNajM/T2FgfM96tug\"",
    "mtime": "2025-05-17T03:54:35.461Z",
    "size": 44188,
    "path": "../public/images/assets/ils_10.svg"
  },
  "/images/assets/kao-price.avif": {
    "type": "image/avif",
    "etag": "\"b0cc-Eiq9CV+r0NmB43rSqx79lIkvzOU\"",
    "mtime": "2025-05-17T03:54:35.463Z",
    "size": 45260,
    "path": "../public/images/assets/kao-price.avif"
  },
  "/images/assets/kao-price.png": {
    "type": "image/png",
    "etag": "\"41c82-hKstQyoHRYcwUSD1ZMqx/MkAss8\"",
    "mtime": "2025-05-17T03:55:30.225Z",
    "size": 269442,
    "path": "../public/images/assets/kao-price.png"
  },
  "/images/assets/lazybag01.webp": {
    "type": "image/webp",
    "etag": "\"1a7ac-y+naxe/1IWOsm5yt05kqJ5AgGkg\"",
    "mtime": "2025-05-17T03:54:35.467Z",
    "size": 108460,
    "path": "../public/images/assets/lazybag01.webp"
  },
  "/images/assets/lazybag02.webp": {
    "type": "image/webp",
    "etag": "\"191d8-qM3mZEw3ezqqosCj+Hhp2u1VtbE\"",
    "mtime": "2025-05-17T03:54:35.469Z",
    "size": 102872,
    "path": "../public/images/assets/lazybag02.webp"
  },
  "/images/assets/lazybag03.webp": {
    "type": "image/webp",
    "etag": "\"1b36e-jxDmX9xDs+fQbIdz9IDuHMecoxc\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 111470,
    "path": "../public/images/assets/lazybag03.webp"
  },
  "/images/assets/link-0.avif": {
    "type": "image/avif",
    "etag": "\"308a-BupkQVdoS2a9MCPEPe225rQxoO0\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 12426,
    "path": "../public/images/assets/link-0.avif"
  },
  "/images/assets/link-7.avif": {
    "type": "image/avif",
    "etag": "\"4de0-wbvpCSUwFyBfTzfwF2cWtSJjWy8\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 19936,
    "path": "../public/images/assets/link-7.avif"
  },
  "/images/assets/link_1966.avif": {
    "type": "image/avif",
    "etag": "\"379a-EjHLgEhV9H2li/Pq+ZrVAzvpOBA\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 14234,
    "path": "../public/images/assets/link_1966.avif"
  },
  "/images/assets/link_2.avif": {
    "type": "image/avif",
    "etag": "\"2a88-SqUJmiaOKVz+Optjn8obzkNE/0A\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 10888,
    "path": "../public/images/assets/link_2.avif"
  },
  "/images/assets/logo.avif": {
    "type": "image/avif",
    "etag": "\"7a9b-aKRodn/5l7ymebymSOjWrBjGovI\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 31387,
    "path": "../public/images/assets/logo.avif"
  },
  "/images/assets/new-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"265cb-EZYrKR43jFZYhG6ZOoO/mZ0MVQc\"",
    "mtime": "2025-05-17T03:54:35.472Z",
    "size": 157131,
    "path": "../public/images/assets/new-01.jpg"
  },
  "/images/assets/new-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"304a2-mJ4YLHq8I/pkO1fDQxAXDWGcCeA\"",
    "mtime": "2025-05-17T03:54:35.490Z",
    "size": 197794,
    "path": "../public/images/assets/new-02.jpg"
  },
  "/images/assets/new-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"283d3-05XxJc3fKUURnwbFfV9yP9UjQJQ\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 164819,
    "path": "../public/images/assets/new-03.jpg"
  },
  "/images/assets/ogg.png": {
    "type": "image/png",
    "etag": "\"2eb91-0WsCmc9kDp7Fs1BPVSpsXOehQjU\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 191377,
    "path": "../public/images/assets/ogg.png"
  },
  "/images/assets/qa-img-1.avif": {
    "type": "image/avif",
    "etag": "\"6d01-r2F/wtQDZTmrkA1g9M8daENL5rI\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 27905,
    "path": "../public/images/assets/qa-img-1.avif"
  },
  "/images/assets/qa-img-2.avif": {
    "type": "image/avif",
    "etag": "\"6d01-r2F/wtQDZTmrkA1g9M8daENL5rI\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 27905,
    "path": "../public/images/assets/qa-img-2.avif"
  },
  "/images/assets/round_shape.png": {
    "type": "image/png",
    "etag": "\"1553-7JsDmFZudGQlLrZ90Io7tl8azyQ\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 5459,
    "path": "../public/images/assets/round_shape.png"
  },
  "/images/assets/screen_01.png": {
    "type": "image/png",
    "etag": "\"188d-yzoV7Zd1HUKR/JhR301QN2C/e4o\"",
    "mtime": "2025-05-17T03:54:35.492Z",
    "size": 6285,
    "path": "../public/images/assets/screen_01.png"
  },
  "/images/assets/screen_02.png": {
    "type": "image/png",
    "etag": "\"c9e3-gwpKHR6sDO/BZIAiQijljiqBGiY\"",
    "mtime": "2025-05-17T03:54:35.504Z",
    "size": 51683,
    "path": "../public/images/assets/screen_02.png"
  },
  "/images/assets/screen_03.png": {
    "type": "image/png",
    "etag": "\"be60-oFpDFEnHqVWYiD0/lR2Rw6yfeiY\"",
    "mtime": "2025-05-17T03:54:35.508Z",
    "size": 48736,
    "path": "../public/images/assets/screen_03.png"
  },
  "/images/assets/screen_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"167c-J11x5StTetzH2IRylLxAbdBXr0w\"",
    "mtime": "2025-05-17T03:54:35.510Z",
    "size": 5756,
    "path": "../public/images/assets/screen_04.svg"
  },
  "/images/assets/screen_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"683f-3pL7bFdWPiX4QX5BExu4JJesB2s\"",
    "mtime": "2025-05-17T03:54:35.512Z",
    "size": 26687,
    "path": "../public/images/assets/screen_05.svg"
  },
  "/images/assets/screen_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"770e-0hTfsYVZxYLhAcTkPfxYZyhXwNo\"",
    "mtime": "2025-05-17T03:54:35.514Z",
    "size": 30478,
    "path": "../public/images/assets/screen_06.svg"
  },
  "/images/assets/screen_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d11-FihKuTe8MOtsJiFlrV+2XPL5W90\"",
    "mtime": "2025-05-17T03:54:35.517Z",
    "size": 11537,
    "path": "../public/images/assets/screen_07.svg"
  },
  "/images/assets/screen_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f81-eP5vmvWNhfRNQgY+wyQtgkqX1hs\"",
    "mtime": "2025-05-17T03:54:35.519Z",
    "size": 20353,
    "path": "../public/images/assets/screen_08.svg"
  },
  "/images/assets/screen_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"50b7-i7v+uYmjLh+CMKwzK0zpowxsPwg\"",
    "mtime": "2025-05-17T03:54:35.521Z",
    "size": 20663,
    "path": "../public/images/assets/screen_09.svg"
  },
  "/images/assets/screen_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ba9c-gO/gxd/3hcKpqz/BW+8bgoGomck\"",
    "mtime": "2025-05-17T03:54:35.524Z",
    "size": 113308,
    "path": "../public/images/assets/screen_10.svg"
  },
  "/images/assets/screen_11.png": {
    "type": "image/png",
    "etag": "\"eb3a-bwz1l0mNy2UCHsMZaaU9oz9Yz00\"",
    "mtime": "2025-05-17T03:54:35.526Z",
    "size": 60218,
    "path": "../public/images/assets/screen_11.png"
  },
  "/images/assets/screen_12.png": {
    "type": "image/png",
    "etag": "\"158d-7RQ0V6hs6pR2gpOeU6qiCBvuc7c\"",
    "mtime": "2025-05-17T03:54:35.526Z",
    "size": 5517,
    "path": "../public/images/assets/screen_12.png"
  },
  "/images/assets/screen_13.png": {
    "type": "image/png",
    "etag": "\"e357-UfBafo11qKQLJU3wPbGJPxD7i+o\"",
    "mtime": "2025-05-17T03:54:35.526Z",
    "size": 58199,
    "path": "../public/images/assets/screen_13.png"
  },
  "/images/assets/screen_14.png": {
    "type": "image/png",
    "etag": "\"a0ff-h/ZlFmFW5dzz8Zf83qeP1NCnh6E\"",
    "mtime": "2025-05-17T03:54:35.526Z",
    "size": 41215,
    "path": "../public/images/assets/screen_14.png"
  },
  "/images/assets/screen_15.png": {
    "type": "image/png",
    "etag": "\"1e899-rQDr9TuUIu9DcvBrvIsqOzrV6Qk\"",
    "mtime": "2025-05-17T03:54:35.535Z",
    "size": 125081,
    "path": "../public/images/assets/screen_15.png"
  },
  "/images/assets/screen_16.png": {
    "type": "image/png",
    "etag": "\"30047-fA5RZ555h/tCyxAlVtQj9Bwhf4c\"",
    "mtime": "2025-05-17T03:54:35.535Z",
    "size": 196679,
    "path": "../public/images/assets/screen_16.png"
  },
  "/images/assets/screen_17.png": {
    "type": "image/png",
    "etag": "\"ce1b-CYDxIQQAPltFm5nlYOpcZarfGhM\"",
    "mtime": "2025-05-17T03:54:35.542Z",
    "size": 52763,
    "path": "../public/images/assets/screen_17.png"
  },
  "/images/assets/screen_18.png": {
    "type": "image/png",
    "etag": "\"178a-1j8dm2KNl0jliVWc0jmTy63rP54\"",
    "mtime": "2025-05-17T03:54:35.542Z",
    "size": 6026,
    "path": "../public/images/assets/screen_18.png"
  },
  "/images/assets/screen_19.png": {
    "type": "image/png",
    "etag": "\"1399c-wvqkyG6sR4bvSQZ3FjJAYoaXs8w\"",
    "mtime": "2025-05-17T03:54:35.542Z",
    "size": 80284,
    "path": "../public/images/assets/screen_19.png"
  },
  "/images/assets/screen_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ef7-SupIoMRD8ySVQ1DQgt/ShWE8o8c\"",
    "mtime": "2025-05-17T03:54:35.542Z",
    "size": 12023,
    "path": "../public/images/assets/screen_20.svg"
  },
  "/images/assets/screen_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"86a7-oINaZ6gu8aKSDGPcyaA5ugOs+nc\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 34471,
    "path": "../public/images/assets/screen_21.svg"
  },
  "/images/assets/screen_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e0b-w9cFlBbZ0Yo07AjOPdpoBYuRUmg\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 7691,
    "path": "../public/images/assets/screen_22.svg"
  },
  "/images/assets/screen_23.png": {
    "type": "image/png",
    "etag": "\"1e86-bm3tMUpT0+xi+lzE3Ba/KQSVPZo\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 7814,
    "path": "../public/images/assets/screen_23.png"
  },
  "/images/assets/screen_24.png": {
    "type": "image/png",
    "etag": "\"2fbd-8B7AWqMWo4rcCA/wZ8VOaQthhdo\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 12221,
    "path": "../public/images/assets/screen_24.png"
  },
  "/images/assets/screen_25.png": {
    "type": "image/png",
    "etag": "\"2c2b-t27XSlRLN+UMO8Ktu/SsrF5BEvc\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 11307,
    "path": "../public/images/assets/screen_25.png"
  },
  "/images/assets/sticker.png": {
    "type": "image/png",
    "etag": "\"aaa-Y77DQXqmty2yen5a64CML2kF0DI\"",
    "mtime": "2025-05-17T03:54:35.551Z",
    "size": 2730,
    "path": "../public/images/assets/sticker.png"
  },
  "/images/assets/sticker_02.png": {
    "type": "image/png",
    "etag": "\"752-HGHN8Gf1AYWWbf0B4tmgCAx9UuA\"",
    "mtime": "2025-05-17T03:54:35.561Z",
    "size": 1874,
    "path": "../public/images/assets/sticker_02.png"
  },
  "/images/assets/temp-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"37994-IZvNb+gir7V8ZsuNRdTbfLjraxo\"",
    "mtime": "2025-05-17T03:54:35.567Z",
    "size": 227732,
    "path": "../public/images/assets/temp-1.jpg"
  },
  "/images/assets/temp-14.jpg": {
    "type": "image/jpeg",
    "etag": "\"2afa6-KzRcG57WkmEdxpiylavrcaB+ad4\"",
    "mtime": "2025-05-17T03:54:35.567Z",
    "size": 176038,
    "path": "../public/images/assets/temp-14.jpg"
  },
  "/images/assets/temp-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b8c9-0H+qtjh6a6CgQoHuCC/TcYhltII\"",
    "mtime": "2025-05-17T03:54:35.578Z",
    "size": 243913,
    "path": "../public/images/assets/temp-2.jpg"
  },
  "/images/assets/temp_10.avif": {
    "type": "image/avif",
    "etag": "\"4f16-oRaVDVdJQQor845Jk6I+om1Kfy4\"",
    "mtime": "2025-05-17T03:54:35.580Z",
    "size": 20246,
    "path": "../public/images/assets/temp_10.avif"
  },
  "/images/assets/temp_11.avif": {
    "type": "image/avif",
    "etag": "\"2856-LTEkKKsMB6N5r0VK1DcI4YpDMO8\"",
    "mtime": "2025-05-17T03:54:35.583Z",
    "size": 10326,
    "path": "../public/images/assets/temp_11.avif"
  },
  "/images/assets/temp_12.avif": {
    "type": "image/avif",
    "etag": "\"dc29-cemoUsyPmBiMi0Vho218yEMf8cE\"",
    "mtime": "2025-05-17T03:54:35.586Z",
    "size": 56361,
    "path": "../public/images/assets/temp_12.avif"
  },
  "/images/assets/temp_13.avif": {
    "type": "image/avif",
    "etag": "\"15d45-KJpSWXywiRHJYwCS0p+KFXigokI\"",
    "mtime": "2025-05-17T03:54:35.589Z",
    "size": 89413,
    "path": "../public/images/assets/temp_13.avif"
  },
  "/images/assets/temp_14.avif": {
    "type": "image/avif",
    "etag": "\"c752-P5rZ+PtaqPCTO89ODX78pFFa+hU\"",
    "mtime": "2025-05-17T03:54:35.591Z",
    "size": 51026,
    "path": "../public/images/assets/temp_14.avif"
  },
  "/images/assets/temp_15.avif": {
    "type": "image/avif",
    "etag": "\"104f6-yhGyIGiqEE96hVxf6Bg8dKoprUw\"",
    "mtime": "2025-05-17T03:54:35.593Z",
    "size": 66806,
    "path": "../public/images/assets/temp_15.avif"
  },
  "/images/assets/temp_4.avif": {
    "type": "image/avif",
    "etag": "\"5c5a-BdioCJHVJF/IB+GAcV+hZeg2vz8\"",
    "mtime": "2025-05-17T03:54:35.595Z",
    "size": 23642,
    "path": "../public/images/assets/temp_4.avif"
  },
  "/images/assets/temp_5.avif": {
    "type": "image/avif",
    "etag": "\"6ebd-ghfw+AJWDYuc7qQGdsE9OrMQstE\"",
    "mtime": "2025-05-17T03:54:35.595Z",
    "size": 28349,
    "path": "../public/images/assets/temp_5.avif"
  },
  "/images/assets/temp_6.avif": {
    "type": "image/avif",
    "etag": "\"6485-ahOzFvBHBL3zQ7odQdAj2KOBd5w\"",
    "mtime": "2025-05-17T03:54:35.598Z",
    "size": 25733,
    "path": "../public/images/assets/temp_6.avif"
  },
  "/images/assets/temp_7.avif": {
    "type": "image/avif",
    "etag": "\"528a-4zp/Odynq/imIPjpD6RaO+xzIes\"",
    "mtime": "2025-05-17T03:54:35.600Z",
    "size": 21130,
    "path": "../public/images/assets/temp_7.avif"
  },
  "/images/assets/temp_8.avif": {
    "type": "image/avif",
    "etag": "\"4035-6b13GlpdR5QC9gBBvahk+9gW5EA\"",
    "mtime": "2025-05-17T03:54:35.602Z",
    "size": 16437,
    "path": "../public/images/assets/temp_8.avif"
  },
  "/images/assets/temp_9.avif": {
    "type": "image/avif",
    "etag": "\"4ca7-bGXTG5fAuI7RXx+3JVvQZjYSqpI\"",
    "mtime": "2025-05-17T03:54:35.604Z",
    "size": 19623,
    "path": "../public/images/assets/temp_9.avif"
  },
  "/images/assets/trustpilot.png": {
    "type": "image/png",
    "etag": "\"158a-z6Nhb10KIqQ4TKV9Sv7ncr6kwCI\"",
    "mtime": "2025-05-17T03:54:35.606Z",
    "size": 5514,
    "path": "../public/images/assets/trustpilot.png"
  },
  "/images/assets/南投-price.avif": {
    "type": "image/avif",
    "etag": "\"f67d-XOlsz01jxmkbksJNNsWAa9jOFcs\"",
    "mtime": "2025-05-17T03:54:35.608Z",
    "size": 63101,
    "path": "../public/images/assets/南投-price.avif"
  },
  "/images/assets/南投-price.png": {
    "type": "image/png",
    "etag": "\"49919-tB1iaHtVcgetiiKzKRv1K2mxpBg\"",
    "mtime": "2025-05-17T03:55:30.225Z",
    "size": 301337,
    "path": "../public/images/assets/南投-price.png"
  },
  "/images/assets/懶人包-00.jpg": {
    "type": "image/jpeg",
    "etag": "\"dfbb5-8+TFYlKDcbCZ5ZNv4eKRIVyfiTQ\"",
    "mtime": "2025-05-17T03:54:35.627Z",
    "size": 916405,
    "path": "../public/images/assets/懶人包-00.jpg"
  },
  "/images/assets/懶人包-01.jpg": {
    "type": "image/jpeg",
    "etag": "\"1004f0-xGhQsVvnabOalvtroxxlY2TZ1qo\"",
    "mtime": "2025-05-17T03:54:35.644Z",
    "size": 1049840,
    "path": "../public/images/assets/懶人包-01.jpg"
  },
  "/images/assets/懶人包-02.jpg": {
    "type": "image/jpeg",
    "etag": "\"ec212-WyEJiSvy5PY1XKo1LsrXFJeTWdI\"",
    "mtime": "2025-05-17T03:54:35.662Z",
    "size": 967186,
    "path": "../public/images/assets/懶人包-02.jpg"
  },
  "/images/assets/懶人包-03.jpg": {
    "type": "image/jpeg",
    "etag": "\"f338f-fb6STf2gg45Ury0i6hfRSgVis8Q\"",
    "mtime": "2025-05-17T03:54:35.680Z",
    "size": 996239,
    "path": "../public/images/assets/懶人包-03.jpg"
  },
  "/images/assets/懶人包-04.jpg": {
    "type": "image/jpeg",
    "etag": "\"129cec-fXRc8BAhkiVfmER6KqY1CwHT4Qc\"",
    "mtime": "2025-05-17T03:54:35.696Z",
    "size": 1219820,
    "path": "../public/images/assets/懶人包-04.jpg"
  },
  "/images/assets/懶人包-05.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce6fa-Jjqli2tEEjD7CkJZL+Nw3N0e1Sk\"",
    "mtime": "2025-05-17T03:54:35.718Z",
    "size": 845562,
    "path": "../public/images/assets/懶人包-05.jpg"
  },
  "/images/assets/懶人包-06.jpg": {
    "type": "image/jpeg",
    "etag": "\"e482c-nqPCU5QiA8kFwAesB5K219BM3Jo\"",
    "mtime": "2025-05-17T03:54:35.729Z",
    "size": 935980,
    "path": "../public/images/assets/懶人包-06.jpg"
  },
  "/images/assets/懶人包-07.jpg": {
    "type": "image/jpeg",
    "etag": "\"10bab5-YLjKXbS942/c9pbBvkGHgwAzQf0\"",
    "mtime": "2025-05-17T03:54:35.754Z",
    "size": 1096373,
    "path": "../public/images/assets/懶人包-07.jpg"
  },
  "/images/assets/懶人包-08.jpg": {
    "type": "image/jpeg",
    "etag": "\"f2660-xd3nbukzbWiUOROAOZ/p7z262Ow\"",
    "mtime": "2025-05-17T03:54:35.770Z",
    "size": 992864,
    "path": "../public/images/assets/懶人包-08.jpg"
  },
  "/images/assets/懶人包-09.jpg": {
    "type": "image/jpeg",
    "etag": "\"c7c80-gm0H3Pv/eYbCao1s7be2yhkk/vY\"",
    "mtime": "2025-05-17T03:54:35.787Z",
    "size": 818304,
    "path": "../public/images/assets/懶人包-09.jpg"
  },
  "/images/assets/懶人包-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"ac78e-94T//clnrmWeTi5o9/ml/GHnnRE\"",
    "mtime": "2025-05-17T03:54:35.803Z",
    "size": 706446,
    "path": "../public/images/assets/懶人包-10.jpg"
  },
  "/images/assets/懶人包-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"bf751-FBpeL/YuKkqaUZgduVnaavit2Nc\"",
    "mtime": "2025-05-17T03:54:35.812Z",
    "size": 784209,
    "path": "../public/images/assets/懶人包-11.jpg"
  },
  "/images/assets/懶人包-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e1de9-gWGL3S3MpwboHWLTmHVnBnGLQSU\"",
    "mtime": "2025-05-17T03:54:35.836Z",
    "size": 925161,
    "path": "../public/images/assets/懶人包-12.jpg"
  },
  "/images/assets/懶人包-13.jpg": {
    "type": "image/jpeg",
    "etag": "\"add49-o2z6L3BF1Q3OEE5dDqCzg/8mZK0\"",
    "mtime": "2025-05-17T03:54:35.849Z",
    "size": 712009,
    "path": "../public/images/assets/懶人包-13.jpg"
  },
  "/images/assets/永信-price.avif": {
    "type": "image/avif",
    "etag": "\"c307-k7gMml+k/O5gEFVTwh6kj9wWFlY\"",
    "mtime": "2025-05-17T03:54:35.856Z",
    "size": 49927,
    "path": "../public/images/assets/永信-price.avif"
  },
  "/images/assets/永信-price.png": {
    "type": "image/png",
    "etag": "\"3d9eb-/cbtZ8yhWIY7YOv+6BO7/7a5J8U\"",
    "mtime": "2025-05-17T03:55:30.225Z",
    "size": 252395,
    "path": "../public/images/assets/永信-price.png"
  },
  "/images/assets/紅十字-price.avif": {
    "type": "image/avif",
    "etag": "\"427e-+G05BoxDBy2+TewTK8YB6FnO93A\"",
    "mtime": "2025-05-17T03:54:35.856Z",
    "size": 17022,
    "path": "../public/images/assets/紅十字-price.avif"
  },
  "/images/assets/紅十字-price.png": {
    "type": "image/png",
    "etag": "\"2bdf1-4PEUiYWPgwoyVuS3snwTbJ1pFo0\"",
    "mtime": "2025-05-17T03:55:30.245Z",
    "size": 179697,
    "path": "../public/images/assets/紅十字-price.png"
  },
  "/images/assets/財團法人-price.avif": {
    "type": "image/avif",
    "etag": "\"bc6f-diaTEtUhFrTSIKSpmMhpxemP93k\"",
    "mtime": "2025-05-17T03:54:35.858Z",
    "size": 48239,
    "path": "../public/images/assets/財團法人-price.avif"
  },
  "/images/assets/財團法人-price.png": {
    "type": "image/png",
    "etag": "\"43f0a-/T2WvUlVeUafZRxuj1IuEpMFc6g\"",
    "mtime": "2025-05-17T03:55:30.245Z",
    "size": 278282,
    "path": "../public/images/assets/財團法人-price.png"
  },
  "/images/banner/1-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"754b-mhNrd+QQTEsIB1Fjg2Ow6Jfbcbc\"",
    "mtime": "2025-05-17T03:54:35.861Z",
    "size": 30027,
    "path": "../public/images/banner/1-1.jpg"
  },
  "/images/banner/1-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a88-puKG/FxiDsGfyhxzVevT8FIteDA\"",
    "mtime": "2025-05-17T03:54:35.863Z",
    "size": 35464,
    "path": "../public/images/banner/1-2.jpg"
  },
  "/images/banner/2-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d47-wdfPKJayDEkIgCGiC5jLKHNgh5k\"",
    "mtime": "2025-05-17T03:54:35.865Z",
    "size": 32071,
    "path": "../public/images/banner/2-1.jpg"
  },
  "/images/banner/banner_1.png": {
    "type": "image/png",
    "etag": "\"1a703-mP8sL7+bhwOj6mxV5OG/rWWVc/E\"",
    "mtime": "2025-05-17T03:54:35.877Z",
    "size": 108291,
    "path": "../public/images/banner/banner_1.png"
  },
  "/images/banner/banner_2.png": {
    "type": "image/png",
    "etag": "\"1b35c-u8JpVoXWVgo0mluIBAgJL6V3BW4\"",
    "mtime": "2025-05-17T03:54:35.880Z",
    "size": 111452,
    "path": "../public/images/banner/banner_2.png"
  },
  "/images/banner/FreeVector_Volunteershelpingelderlypeople.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e6a-zlcg17f0JsrJoxfemJXYVZbXhLU\"",
    "mtime": "2025-05-17T03:54:35.869Z",
    "size": 32362,
    "path": "../public/images/banner/FreeVector_Volunteershelpingelderlypeople.jpg"
  },
  "/images/banner/PremiumVector_Volunteershelpingelderlypeople.jpg": {
    "type": "image/jpeg",
    "etag": "\"652e-GxDqs8TjqHVWL6t88pMDZK1P0lI\"",
    "mtime": "2025-05-17T03:54:35.871Z",
    "size": 25902,
    "path": "../public/images/banner/PremiumVector_Volunteershelpingelderlypeople.jpg"
  },
  "/images/banner/Unini.jpg": {
    "type": "image/jpeg",
    "etag": "\"35d4-SjpcFdvyboNdyAoM7T7WBu/qEmM\"",
    "mtime": "2025-05-17T03:54:35.871Z",
    "size": 13780,
    "path": "../public/images/banner/Unini.jpg"
  },
  "/images/blog/avatar_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"19b0-tZVkXszdmXiAB7tPVFoeHmzQaJQ\"",
    "mtime": "2025-05-17T03:54:35.939Z",
    "size": 6576,
    "path": "../public/images/blog/avatar_01.jpg"
  },
  "/images/blog/avatar_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"12f2-Dsm1xe5ZfJ6qvC25pOEIgFONStA\"",
    "mtime": "2025-05-17T03:54:35.942Z",
    "size": 4850,
    "path": "../public/images/blog/avatar_02.jpg"
  },
  "/images/blog/avatar_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"194e-iPUTwX/HCFIdASTzxer35bcq1YU\"",
    "mtime": "2025-05-17T03:54:35.944Z",
    "size": 6478,
    "path": "../public/images/blog/avatar_03.jpg"
  },
  "/images/blog/blog_img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"e572-3Ct2MntuADaNqHhsgLyJYEInHsM\"",
    "mtime": "2025-05-17T03:54:35.948Z",
    "size": 58738,
    "path": "../public/images/blog/blog_img_01.jpg"
  },
  "/images/blog/blog_img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"1535c-kVbcy9vxL8A1y5eEyXv7Re3wUgE\"",
    "mtime": "2025-05-17T03:54:35.950Z",
    "size": 86876,
    "path": "../public/images/blog/blog_img_02.jpg"
  },
  "/images/blog/blog_img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"e123-KVIPKz6CeV4zsYP6Hxv64AEL4BQ\"",
    "mtime": "2025-05-17T03:54:35.950Z",
    "size": 57635,
    "path": "../public/images/blog/blog_img_03.jpg"
  },
  "/images/blog/blog_img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"14f8a-qi0LedxdOszk72VSHufm5GC8sn0\"",
    "mtime": "2025-05-17T03:54:35.955Z",
    "size": 85898,
    "path": "../public/images/blog/blog_img_04.jpg"
  },
  "/images/blog/blog_img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"123df-zZufqRCwzBQhOjgm6bT4/IW19bA\"",
    "mtime": "2025-05-17T03:54:35.955Z",
    "size": 74719,
    "path": "../public/images/blog/blog_img_05.jpg"
  },
  "/images/blog/blog_img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcb-otONdVjf3pSCQBfil8+mdf14T0Q\"",
    "mtime": "2025-05-17T03:54:35.955Z",
    "size": 85963,
    "path": "../public/images/blog/blog_img_06.jpg"
  },
  "/images/blog/blog_img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a5bc-T8ytvNlCXsn54o6phr+Ss3eVuHY\"",
    "mtime": "2025-05-17T03:54:35.962Z",
    "size": 107964,
    "path": "../public/images/blog/blog_img_07.jpg"
  },
  "/images/blog/blog_img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"11405-7puVBjZjnrPEZENMxFtezHE5Iis\"",
    "mtime": "2025-05-17T03:54:35.962Z",
    "size": 70661,
    "path": "../public/images/blog/blog_img_08.jpg"
  },
  "/images/blog/blog_img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"14b11-cUEYzkKQOfRwuhHbgWrOMO2vW5g\"",
    "mtime": "2025-05-17T03:54:35.962Z",
    "size": 84753,
    "path": "../public/images/blog/blog_img_09.jpg"
  },
  "/images/blog/blog_img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"6366-3fG7Ye7W2xhaLbngXRsA1ZWRB10\"",
    "mtime": "2025-05-17T03:54:35.971Z",
    "size": 25446,
    "path": "../public/images/blog/blog_img_10.jpg"
  },
  "/images/blog/blog_img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a5f-84NaoZgSTWASBfXLoaU+EM5V8iE\"",
    "mtime": "2025-05-17T03:54:35.971Z",
    "size": 23135,
    "path": "../public/images/blog/blog_img_11.jpg"
  },
  "/images/blog/blog_img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"e146-qDOKZMblFruEebB1Y5Mk7uui8hc\"",
    "mtime": "2025-05-17T03:54:35.975Z",
    "size": 57670,
    "path": "../public/images/blog/blog_img_12.jpg"
  },
  "/images/blog/blog_img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"e31d-gl38cmI4YkLJRvSPEgCFi/Ogwsk\"",
    "mtime": "2025-05-17T03:54:35.980Z",
    "size": 58141,
    "path": "../public/images/blog/blog_img_13.jpg"
  },
  "/images/blog/blog_img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"13f8d-gB1GSnyWJa475scoQ8IYamnumis\"",
    "mtime": "2025-05-17T03:54:35.982Z",
    "size": 81805,
    "path": "../public/images/blog/blog_img_14.jpg"
  },
  "/images/blog/blog_img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"ef04-dxn6GW/0UM7QwFEc8ck/TAJy7dM\"",
    "mtime": "2025-05-17T03:54:35.984Z",
    "size": 61188,
    "path": "../public/images/blog/blog_img_15.jpg"
  },
  "/images/blog/blog_img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"8113-Wtge2zZb3aB8QcITpsYHIRijo1o\"",
    "mtime": "2025-05-17T03:54:35.986Z",
    "size": 33043,
    "path": "../public/images/blog/blog_img_16.jpg"
  },
  "/images/blog/blog_img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"33a1-z4r+KZq2Sgal/8CI1k/HLmLf124\"",
    "mtime": "2025-05-17T03:54:35.986Z",
    "size": 13217,
    "path": "../public/images/blog/blog_img_17.jpg"
  },
  "/images/fav-icon/icon.png": {
    "type": "image/png",
    "etag": "\"859-iENNh9mgy0LuQQzQtJ0qaWjUQIY\"",
    "mtime": "2025-05-17T03:54:35.986Z",
    "size": 2137,
    "path": "../public/images/fav-icon/icon.png"
  },
  "/images/gallery/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cff6-gQtmDyRuxMbVl92qSNoJnTH2o5g\"",
    "mtime": "2025-05-17T03:54:35.992Z",
    "size": 118774,
    "path": "../public/images/gallery/img_01.jpg"
  },
  "/images/gallery/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"8631-yi4gxG28lUApz4V30kfO380Ew3U\"",
    "mtime": "2025-05-17T03:54:35.992Z",
    "size": 34353,
    "path": "../public/images/gallery/img_02.jpg"
  },
  "/images/gallery/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"9e93-8uOncqR0JkRZXDY6Pwn7vQcXSuA\"",
    "mtime": "2025-05-17T03:54:35.992Z",
    "size": 40595,
    "path": "../public/images/gallery/img_03.jpg"
  },
  "/images/gallery/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"644c-5u+vYb40XKXr+YyJbcs2uM+yJ+Y\"",
    "mtime": "2025-05-17T03:54:35.992Z",
    "size": 25676,
    "path": "../public/images/gallery/img_04.jpg"
  },
  "/images/gallery/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"10bd9-IfV8bSkMhJIkxI7ZWANpYNvih3o\"",
    "mtime": "2025-05-17T03:54:36.001Z",
    "size": 68569,
    "path": "../public/images/gallery/img_05.jpg"
  },
  "/images/gallery/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"13435-+G/N7sH4nqsmRBLlzUPaM9IGvws\"",
    "mtime": "2025-05-17T03:54:36.001Z",
    "size": 78901,
    "path": "../public/images/gallery/img_06.jpg"
  },
  "/images/gallery/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"7155-E+qNlK+JpFa7l+GqKme7b3vPQ7A\"",
    "mtime": "2025-05-17T03:54:36.001Z",
    "size": 29013,
    "path": "../public/images/gallery/img_07.jpg"
  },
  "/images/gallery/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"de77-S2qjsVJv/175Gd5/342O/0SNW9I\"",
    "mtime": "2025-05-17T03:54:36.001Z",
    "size": 56951,
    "path": "../public/images/gallery/img_08.jpg"
  },
  "/images/gallery/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"1be6e-+yks4QO0GaLC0pdt5Q3+bJEvq/k\"",
    "mtime": "2025-05-17T03:54:36.001Z",
    "size": 114286,
    "path": "../public/images/gallery/img_09.jpg"
  },
  "/images/gallery/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"113b7-XIbofXLgR1A9mUDv73BPxSpWNWs\"",
    "mtime": "2025-05-17T03:54:36.017Z",
    "size": 70583,
    "path": "../public/images/gallery/img_10.jpg"
  },
  "/images/gallery/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"112d2-ZgJK6AFkDTefShEWkt0WPb95VAs\"",
    "mtime": "2025-05-17T03:54:36.019Z",
    "size": 70354,
    "path": "../public/images/gallery/img_11.jpg"
  },
  "/images/gallery/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"9323-MpyTxkryXeahCams0koRqjKSDAE\"",
    "mtime": "2025-05-17T03:54:36.021Z",
    "size": 37667,
    "path": "../public/images/gallery/img_12.jpg"
  },
  "/images/gallery/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf6e-+EdtV6U3+0UxZRwxf+3GZsoABVA\"",
    "mtime": "2025-05-17T03:54:36.021Z",
    "size": 53102,
    "path": "../public/images/gallery/img_13.jpg"
  },
  "/images/gallery/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"eb1c-MXxnWM8Zeg1m6A2XUXTBO8j86Lc\"",
    "mtime": "2025-05-17T03:54:36.025Z",
    "size": 60188,
    "path": "../public/images/gallery/img_14.jpg"
  },
  "/images/gallery/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"18e7d-ushL2K8j/Kpao+eRcrmAS9ynStU\"",
    "mtime": "2025-05-17T03:54:36.025Z",
    "size": 102013,
    "path": "../public/images/gallery/img_15.jpg"
  },
  "/images/gallery/img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"19cbb-PvGBj9UUj0bTPrLTNkkVMrQLZRI\"",
    "mtime": "2025-05-17T03:54:36.025Z",
    "size": 105659,
    "path": "../public/images/gallery/img_16.jpg"
  },
  "/images/gallery/img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"14a5f-k9S8fMPrRuFSwtm5lTHuZ0KpgaM\"",
    "mtime": "2025-05-17T03:54:36.033Z",
    "size": 84575,
    "path": "../public/images/gallery/img_17.jpg"
  },
  "/images/gallery/img_18.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cbc-1oenRQXBvLeiVrzkQr+ghyRYu7E\"",
    "mtime": "2025-05-17T03:54:36.062Z",
    "size": 31932,
    "path": "../public/images/gallery/img_18.jpg"
  },
  "/images/gallery/img_19.jpg": {
    "type": "image/jpeg",
    "etag": "\"e93f-hAVvLfyE/rwoyLSgJH1oYoATVWw\"",
    "mtime": "2025-05-17T03:54:36.062Z",
    "size": 59711,
    "path": "../public/images/gallery/img_19.jpg"
  },
  "/images/gallery/img_20.jpg": {
    "type": "image/jpeg",
    "etag": "\"222c5-g05prsXTRkdzIKgJpZdbcB+Xm8w\"",
    "mtime": "2025-05-17T03:54:36.065Z",
    "size": 139973,
    "path": "../public/images/gallery/img_20.jpg"
  },
  "/images/gallery/img_21.jpg": {
    "type": "image/jpeg",
    "etag": "\"11df1-RBvxWVw9oCSHxA/HCTu6BUGBdTA\"",
    "mtime": "2025-05-17T03:54:36.065Z",
    "size": 73201,
    "path": "../public/images/gallery/img_21.jpg"
  },
  "/images/gallery/img_22.jpg": {
    "type": "image/jpeg",
    "etag": "\"e8e8-QB0cDC5K2a5T5tlKSWEpni5sgm0\"",
    "mtime": "2025-05-17T03:54:36.065Z",
    "size": 59624,
    "path": "../public/images/gallery/img_22.jpg"
  },
  "/images/logo/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1804-3y++sUAKzaCQmjLBz2v0kvESHgc\"",
    "mtime": "2025-05-17T03:54:36.242Z",
    "size": 6148,
    "path": "../public/images/logo/.DS_Store"
  },
  "/images/logo/logo_01.png": {
    "type": "image/png",
    "etag": "\"59bf-Yjca2f6ZGM5BRB4Zp7Dt6/fr9D8\"",
    "mtime": "2025-05-17T03:54:36.242Z",
    "size": 22975,
    "path": "../public/images/logo/logo_01.png"
  },
  "/images/logo/logo_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"f0fb-K7URSgdjGD9CWiqXPT4xI7Je/UE\"",
    "mtime": "2025-05-17T03:54:36.242Z",
    "size": 61691,
    "path": "../public/images/logo/logo_03.jpg"
  },
  "/images/logo/logo_2.png": {
    "type": "image/png",
    "etag": "\"1946a-yz94II8VonXj4ABxGCAdPEgTsN0\"",
    "mtime": "2025-05-17T03:54:36.242Z",
    "size": 103530,
    "path": "../public/images/logo/logo_2.png"
  },
  "/images/media/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"3e5a9-x+1/U3N+pITTjAldR46IdCM8Ol0\"",
    "mtime": "2025-05-17T03:54:36.256Z",
    "size": 255401,
    "path": "../public/images/media/img_01.jpg"
  },
  "/images/media/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ad8f-JRllw/xHWkzcEQuFyzZDAQnRcT0\"",
    "mtime": "2025-05-17T03:54:36.262Z",
    "size": 175503,
    "path": "../public/images/media/img_02.jpg"
  },
  "/images/media/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b31f-WOaRfeUQccjeTUVqKoKXukFMfqo\"",
    "mtime": "2025-05-17T03:54:36.262Z",
    "size": 176927,
    "path": "../public/images/media/img_03.jpg"
  },
  "/images/media/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"d456-IMSmVCa1jpGhwxwRSoJxOR6h13A\"",
    "mtime": "2025-05-17T03:54:36.262Z",
    "size": 54358,
    "path": "../public/images/media/img_04.jpg"
  },
  "/images/media/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"714b-8vFFtCewyQ/COwGiq10bIAOuVBk\"",
    "mtime": "2025-05-17T03:54:36.271Z",
    "size": 29003,
    "path": "../public/images/media/img_05.jpg"
  },
  "/images/media/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"73ec-otLjS3YgxY8fzs8APAOcyD3Fp00\"",
    "mtime": "2025-05-17T03:54:36.271Z",
    "size": 29676,
    "path": "../public/images/media/img_06.jpg"
  },
  "/images/media/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"73c3-6YZ1STLDLjCXXOZJ+vTYVQaotaQ\"",
    "mtime": "2025-05-17T03:54:36.271Z",
    "size": 29635,
    "path": "../public/images/media/img_07.jpg"
  },
  "/images/media/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"19b0-tZVkXszdmXiAB7tPVFoeHmzQaJQ\"",
    "mtime": "2025-05-17T03:54:36.271Z",
    "size": 6576,
    "path": "../public/images/media/img_08.jpg"
  },
  "/images/media/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"36e0-TaMC93GI6mNzB4Nuql4rosODdDI\"",
    "mtime": "2025-05-17T03:54:36.271Z",
    "size": 14048,
    "path": "../public/images/media/img_09.jpg"
  },
  "/images/media/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"383c-gaZD6GfTpmuKlzf71LZu55l2Vxg\"",
    "mtime": "2025-05-17T03:54:36.284Z",
    "size": 14396,
    "path": "../public/images/media/img_10.jpg"
  },
  "/images/media/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"7387-hOfg82/thfnhaolDxE2y/6aBHVk\"",
    "mtime": "2025-05-17T03:54:36.287Z",
    "size": 29575,
    "path": "../public/images/media/img_11.jpg"
  },
  "/images/media/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"7f90-Ra0afQMhNyuStu8E2KNEXoknwSg\"",
    "mtime": "2025-05-17T03:54:36.287Z",
    "size": 32656,
    "path": "../public/images/media/img_12.jpg"
  },
  "/images/media/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"f4ab-Grz0PYtLlzPpApThRS6dl8mL09k\"",
    "mtime": "2025-05-17T03:54:36.291Z",
    "size": 62635,
    "path": "../public/images/media/img_13.jpg"
  },
  "/images/media/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"1747-wFllOkkiW8mEnej2ieAEsDXMzL0\"",
    "mtime": "2025-05-17T03:54:36.291Z",
    "size": 5959,
    "path": "../public/images/media/img_14.jpg"
  },
  "/images/media/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"12f2-Dsm1xe5ZfJ6qvC25pOEIgFONStA\"",
    "mtime": "2025-05-17T03:54:36.291Z",
    "size": 4850,
    "path": "../public/images/media/img_15.jpg"
  },
  "/images/media/img_16.jpg": {
    "type": "image/jpeg",
    "etag": "\"ab40-eghsm0g+rxDvv+zclhwtxZZNAgo\"",
    "mtime": "2025-05-17T03:54:36.291Z",
    "size": 43840,
    "path": "../public/images/media/img_16.jpg"
  },
  "/images/media/img_17.jpg": {
    "type": "image/jpeg",
    "etag": "\"1375b-OdevPw6vkVdW9bGSj3g0/rN5LuI\"",
    "mtime": "2025-05-17T03:54:36.291Z",
    "size": 79707,
    "path": "../public/images/media/img_17.jpg"
  },
  "/images/media/img_18.jpg": {
    "type": "image/jpeg",
    "etag": "\"a565-izxTF6L0nwwt9yho5/elvQUAm8U\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 42341,
    "path": "../public/images/media/img_18.jpg"
  },
  "/images/media/img_19.jpg": {
    "type": "image/jpeg",
    "etag": "\"194e-iPUTwX/HCFIdASTzxer35bcq1YU\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 6478,
    "path": "../public/images/media/img_19.jpg"
  },
  "/images/media/img_20.jpg": {
    "type": "image/jpeg",
    "etag": "\"13c2c-F7ofNLKLUBOfPzM+Gpfy8KIq37s\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 80940,
    "path": "../public/images/media/img_20.jpg"
  },
  "/images/media/img_21.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c80c-7K61Q+AfSXisqmhUIm3kNjafb9M\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 116748,
    "path": "../public/images/media/img_21.jpg"
  },
  "/images/media/img_22.jpg": {
    "type": "image/jpeg",
    "etag": "\"b270-TJIC1qmuPgnYDKIOM42ndY2+DhU\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 45680,
    "path": "../public/images/media/img_22.jpg"
  },
  "/images/media/img_23.jpg": {
    "type": "image/jpeg",
    "etag": "\"d34f-smxqklYf4Q8WOkuU1Lu21+VRxRo\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 54095,
    "path": "../public/images/media/img_23.jpg"
  },
  "/images/media/img_24.jpg": {
    "type": "image/jpeg",
    "etag": "\"dc65-oZDvCOd3k9A+jyf6/AJXPT8gOEk\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 56421,
    "path": "../public/images/media/img_24.jpg"
  },
  "/images/media/img_25.jpg": {
    "type": "image/jpeg",
    "etag": "\"9a95-xtDFNul+OndhgNeWt85wabglUiY\"",
    "mtime": "2025-05-17T03:54:36.303Z",
    "size": 39573,
    "path": "../public/images/media/img_25.jpg"
  },
  "/images/media/img_26.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b654-DtS7HZEvzrGKqwTG5di/kg1Cioc\"",
    "mtime": "2025-05-17T03:54:36.321Z",
    "size": 177748,
    "path": "../public/images/media/img_26.jpg"
  },
  "/images/media/img_27.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d7d-7+SJiMsnOaM3ylcXdqb3/1hJ8nE\"",
    "mtime": "2025-05-17T03:54:36.323Z",
    "size": 28029,
    "path": "../public/images/media/img_27.jpg"
  },
  "/images/media/img_28.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-xtitJ6IJhjrbJFGTsJ1ujjn2LDU\"",
    "mtime": "2025-05-17T03:54:36.327Z",
    "size": 23506,
    "path": "../public/images/media/img_28.jpg"
  },
  "/images/media/img_29.jpg": {
    "type": "image/jpeg",
    "etag": "\"3079-vPyGrhi+w8dbUzCUVFEemPoOC5k\"",
    "mtime": "2025-05-17T03:54:36.329Z",
    "size": 12409,
    "path": "../public/images/media/img_29.jpg"
  },
  "/images/media/img_30.jpg": {
    "type": "image/jpeg",
    "etag": "\"570b-DOBt6cWXFxSuIckAPel1lM5xI3Q\"",
    "mtime": "2025-05-17T03:54:36.331Z",
    "size": 22283,
    "path": "../public/images/media/img_30.jpg"
  },
  "/images/media/img_31.jpg": {
    "type": "image/jpeg",
    "etag": "\"3005c-Ls2gJVIUUP9OaRTRXcEyJh91cKg\"",
    "mtime": "2025-05-17T03:54:36.335Z",
    "size": 196700,
    "path": "../public/images/media/img_31.jpg"
  },
  "/images/media/img_32.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d12e-QgL13ytkgpX0E3pqZtiIVJVSXvg\"",
    "mtime": "2025-05-17T03:54:36.335Z",
    "size": 119086,
    "path": "../public/images/media/img_32.jpg"
  },
  "/images/media/img_33.jpg": {
    "type": "image/jpeg",
    "etag": "\"1db7c-DQ5VN2ZBqGvHgkQXDhFL+fRdxuk\"",
    "mtime": "2025-05-17T03:54:36.335Z",
    "size": 121724,
    "path": "../public/images/media/img_33.jpg"
  },
  "/images/media/img_34.jpg": {
    "type": "image/jpeg",
    "etag": "\"116a0-UZXMsXArKWB019Bpk1E0G/x4W7k\"",
    "mtime": "2025-05-17T03:54:36.342Z",
    "size": 71328,
    "path": "../public/images/media/img_34.jpg"
  },
  "/images/media/img_35.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b2c2-Vyzf2jR/39fBqavDzjV5/UNpfE0\"",
    "mtime": "2025-05-17T03:54:36.342Z",
    "size": 111298,
    "path": "../public/images/media/img_35.jpg"
  },
  "/images/media/img_36.jpg": {
    "type": "image/jpeg",
    "etag": "\"8ec5-YqwA4v36KXyrW/aIPBIT75OT/U8\"",
    "mtime": "2025-05-17T03:54:36.342Z",
    "size": 36549,
    "path": "../public/images/media/img_36.jpg"
  },
  "/images/media/img_37.jpg": {
    "type": "image/jpeg",
    "etag": "\"17c4a-t6caiGyMEYZjwxJo0hl5rZh/OBU\"",
    "mtime": "2025-05-17T03:54:36.350Z",
    "size": 97354,
    "path": "../public/images/media/img_37.jpg"
  },
  "/images/media/img_38.jpg": {
    "type": "image/jpeg",
    "etag": "\"347b-c+T8uFd3YMOHv82hSXXvkiMr3EM\"",
    "mtime": "2025-05-17T03:54:36.350Z",
    "size": 13435,
    "path": "../public/images/media/img_38.jpg"
  },
  "/images/media/img_39.jpg": {
    "type": "image/jpeg",
    "etag": "\"8477-5TIjIcYu+Z15KzGjEytoRzmtuA8\"",
    "mtime": "2025-05-17T03:54:36.350Z",
    "size": 33911,
    "path": "../public/images/media/img_39.jpg"
  },
  "/images/media/img_40.jpg": {
    "type": "image/jpeg",
    "etag": "\"4266-X1Qrzfr+iRWA81qKsYvd7ZKlZVI\"",
    "mtime": "2025-05-17T03:54:36.350Z",
    "size": 16998,
    "path": "../public/images/media/img_40.jpg"
  },
  "/images/media/img_41.jpg": {
    "type": "image/jpeg",
    "etag": "\"5517-ngp3KA30aFBcXE4Hv9Gq6zTjovU\"",
    "mtime": "2025-05-17T03:54:36.363Z",
    "size": 21783,
    "path": "../public/images/media/img_41.jpg"
  },
  "/images/media/img_42.jpg": {
    "type": "image/jpeg",
    "etag": "\"382b-jYO3YlA6j+kr2qGsy5ekqJqIGkg\"",
    "mtime": "2025-05-17T03:54:36.363Z",
    "size": 14379,
    "path": "../public/images/media/img_42.jpg"
  },
  "/images/media/img_43.jpg": {
    "type": "image/jpeg",
    "etag": "\"4860-QxtObIJutCCZ+oXTx6rKCO6yHek\"",
    "mtime": "2025-05-17T03:54:36.375Z",
    "size": 18528,
    "path": "../public/images/media/img_43.jpg"
  },
  "/images/media/img_44.jpg": {
    "type": "image/jpeg",
    "etag": "\"5aef-TWlHNSorUPLfMDv+Sc5KKTupDY4\"",
    "mtime": "2025-05-17T03:54:36.382Z",
    "size": 23279,
    "path": "../public/images/media/img_44.jpg"
  },
  "/images/media/img_45.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c05-rKPGbBqg98s3b3g6wmiqT5u2s4U\"",
    "mtime": "2025-05-17T03:54:36.383Z",
    "size": 27653,
    "path": "../public/images/media/img_45.jpg"
  },
  "/images/media/img_46.jpg": {
    "type": "image/jpeg",
    "etag": "\"7229-Pw6hU9DBIy7//0Q2FgkfAEKn6XY\"",
    "mtime": "2025-05-17T03:54:36.385Z",
    "size": 29225,
    "path": "../public/images/media/img_46.jpg"
  },
  "/images/media/img_47.jpg": {
    "type": "image/jpeg",
    "etag": "\"18293-U2sCbkm2a0ZYiSY33s6s9HvyhJk\"",
    "mtime": "2025-05-17T03:54:36.385Z",
    "size": 98963,
    "path": "../public/images/media/img_47.jpg"
  },
  "/images/media/img_48.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d3c-wALhkiaaI0rzu7xs9BR0Uz9OFOo\"",
    "mtime": "2025-05-17T03:54:36.392Z",
    "size": 73020,
    "path": "../public/images/media/img_48.jpg"
  },
  "/images/media/img_49.jpg": {
    "type": "image/jpeg",
    "etag": "\"613a9-u3dQNYJVdCoe7qn1fxa2j2qxtcI\"",
    "mtime": "2025-05-17T03:54:36.398Z",
    "size": 398249,
    "path": "../public/images/media/img_49.jpg"
  },
  "/images/media/img_50.jpg": {
    "type": "image/jpeg",
    "etag": "\"251bb-D8R7dTGKwChcRXXGbMYrbwKVcuQ\"",
    "mtime": "2025-05-17T03:54:36.405Z",
    "size": 151995,
    "path": "../public/images/media/img_50.jpg"
  },
  "/images/icon/apple.svg": {
    "type": "image/svg+xml",
    "etag": "\"447-8ayp7RsfIhOfXrXUM121A/61/Nc\"",
    "mtime": "2025-05-17T03:54:36.065Z",
    "size": 1095,
    "path": "../public/images/icon/apple.svg"
  },
  "/images/icon/facebook.png": {
    "type": "image/png",
    "etag": "\"2f9-f2gtsi5RBU6LrAwQX4LgSlBzm/8\"",
    "mtime": "2025-05-17T03:54:36.076Z",
    "size": 761,
    "path": "../public/images/icon/facebook.png"
  },
  "/images/icon/google.png": {
    "type": "image/png",
    "etag": "\"379-ertxQJMD6Ra32wux1GLU/SfDwJU\"",
    "mtime": "2025-05-17T03:54:36.076Z",
    "size": 889,
    "path": "../public/images/icon/google.png"
  },
  "/images/icon/icon_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"149-1BQTvaq1207s0BWU1qKC8iZFPVQ\"",
    "mtime": "2025-05-17T03:54:36.076Z",
    "size": 329,
    "path": "../public/images/icon/icon_01.svg"
  },
  "/images/icon/icon_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"115-GiCZYpUKKrTFZp4KV6Dly64mEsM\"",
    "mtime": "2025-05-17T03:54:36.076Z",
    "size": 277,
    "path": "../public/images/icon/icon_02.svg"
  },
  "/images/icon/icon_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"c14-rrQWiISxrzduA82Mkq9yQOwRq1k\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 3092,
    "path": "../public/images/icon/icon_03.svg"
  },
  "/images/icon/icon_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"2b4-wLhd2hAwsUV0gjMIRq4uLhuyJo8\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 692,
    "path": "../public/images/icon/icon_04.svg"
  },
  "/images/icon/icon_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"772-6k+XryIMbEAUdDOQUoQ7thrsHbc\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 1906,
    "path": "../public/images/icon/icon_05.svg"
  },
  "/images/icon/icon_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"280-hLs3IS+A/b73X7us3V2BDpDRGow\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 640,
    "path": "../public/images/icon/icon_06.svg"
  },
  "/images/icon/icon_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"57b-B2JTa8hH9nGywr36nbnoJ50NS04\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 1403,
    "path": "../public/images/icon/icon_07.svg"
  },
  "/images/icon/icon_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"26b-KZ3zTfV9QgnfUgSZQfhZBdAo9jw\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 619,
    "path": "../public/images/icon/icon_08.svg"
  },
  "/images/icon/icon_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"128-q8BPNjtn+VZ7wHfZJ1EMyTM+KvQ\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 296,
    "path": "../public/images/icon/icon_09.svg"
  },
  "/images/icon/icon_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"6d6-MlZRcfXm8Uj1/jzUFQI6FG4jNs0\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 1750,
    "path": "../public/images/icon/icon_10.svg"
  },
  "/images/icon/icon_100.svg": {
    "type": "image/svg+xml",
    "etag": "\"2fb-Mjo0bsDpAEPfJA3qfZUl5xTNAj8\"",
    "mtime": "2025-05-17T03:54:36.081Z",
    "size": 763,
    "path": "../public/images/icon/icon_100.svg"
  },
  "/images/icon/icon_101.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cd-u+u6jcYNdp/H2QZBU1s9xLBtOew\"",
    "mtime": "2025-05-17T03:54:36.097Z",
    "size": 717,
    "path": "../public/images/icon/icon_101.svg"
  },
  "/images/icon/icon_102.svg": {
    "type": "image/svg+xml",
    "etag": "\"105-ZFVWTyoS+gECFJ0i73S4yNIZ44Q\"",
    "mtime": "2025-05-17T03:54:36.097Z",
    "size": 261,
    "path": "../public/images/icon/icon_102.svg"
  },
  "/images/icon/icon_103.svg": {
    "type": "image/svg+xml",
    "etag": "\"10f-/8A6pjBlMZV78g166rNqY5hXEPU\"",
    "mtime": "2025-05-17T03:54:36.100Z",
    "size": 271,
    "path": "../public/images/icon/icon_103.svg"
  },
  "/images/icon/icon_11.svg": {
    "type": "image/svg+xml",
    "etag": "\"26a-b+BkFxSm54SoxRx1N1urBoVAU5E\"",
    "mtime": "2025-05-17T03:54:36.101Z",
    "size": 618,
    "path": "../public/images/icon/icon_11.svg"
  },
  "/images/icon/icon_12.svg": {
    "type": "image/svg+xml",
    "etag": "\"24d-hwwYpLMrVO6+Y9S88l6n2B90Bgw\"",
    "mtime": "2025-05-17T03:54:36.101Z",
    "size": 589,
    "path": "../public/images/icon/icon_12.svg"
  },
  "/images/icon/icon_13.svg": {
    "type": "image/svg+xml",
    "etag": "\"489-xhafkhoEGvgr3geXugYAQcaY5S4\"",
    "mtime": "2025-05-17T03:54:36.101Z",
    "size": 1161,
    "path": "../public/images/icon/icon_13.svg"
  },
  "/images/icon/icon_14.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e9-O9iIpm+pjoSxUP3I6YY98BP0eAw\"",
    "mtime": "2025-05-17T03:54:36.101Z",
    "size": 1257,
    "path": "../public/images/icon/icon_14.svg"
  },
  "/images/icon/icon_15.svg": {
    "type": "image/svg+xml",
    "etag": "\"9c4-Gy/XlmdmL2Q3z/za6/VkMePIEwI\"",
    "mtime": "2025-05-17T03:54:36.101Z",
    "size": 2500,
    "path": "../public/images/icon/icon_15.svg"
  },
  "/images/icon/icon_16.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d7-yLEZbJ7P9wCCWzUlEz3foKdJbPE\"",
    "mtime": "2025-05-17T03:54:36.109Z",
    "size": 727,
    "path": "../public/images/icon/icon_16.svg"
  },
  "/images/icon/icon_17.svg": {
    "type": "image/svg+xml",
    "etag": "\"c02-UtNqvPgqaYZmmXU0G6J2R6P0WxQ\"",
    "mtime": "2025-05-17T03:54:36.109Z",
    "size": 3074,
    "path": "../public/images/icon/icon_17.svg"
  },
  "/images/icon/icon_18.svg": {
    "type": "image/svg+xml",
    "etag": "\"2df-5ssv9u3iK2kPuuvruLcaC3nWFLY\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 735,
    "path": "../public/images/icon/icon_18.svg"
  },
  "/images/icon/icon_19.svg": {
    "type": "image/svg+xml",
    "etag": "\"28d-M9SVDyrlhUubDVzxnornxZbGWkI\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 653,
    "path": "../public/images/icon/icon_19.svg"
  },
  "/images/icon/icon_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"20e-TwjEKwXzYZw56MQxerWbG9VGExw\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 526,
    "path": "../public/images/icon/icon_20.svg"
  },
  "/images/icon/icon_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"6da-ooky21RQrYqK+FEArOYK0dv9tJY\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 1754,
    "path": "../public/images/icon/icon_21.svg"
  },
  "/images/icon/icon_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"257-1gIIAFQ6FMBgZiokEicbWn1EKmk\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 599,
    "path": "../public/images/icon/icon_22.svg"
  },
  "/images/icon/icon_23.svg": {
    "type": "image/svg+xml",
    "etag": "\"233-OWcmXunPAN59oIYWbbuD3xZjKUo\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 563,
    "path": "../public/images/icon/icon_23.svg"
  },
  "/images/icon/icon_24.svg": {
    "type": "image/svg+xml",
    "etag": "\"2b9-yYHI51jDD6eJjp5TTAEtgPPTuqU\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 697,
    "path": "../public/images/icon/icon_24.svg"
  },
  "/images/icon/icon_25.svg": {
    "type": "image/svg+xml",
    "etag": "\"16d-stsy0i7S9LBfhZ89xNPXowdE38A\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 365,
    "path": "../public/images/icon/icon_25.svg"
  },
  "/images/icon/icon_26.svg": {
    "type": "image/svg+xml",
    "etag": "\"115-v12iCVK+a6lPKpEoczskEsg98A0\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 277,
    "path": "../public/images/icon/icon_26.svg"
  },
  "/images/icon/icon_27.svg": {
    "type": "image/svg+xml",
    "etag": "\"140-5gW9K1tZX0FCxoA6qC73ZHE54R4\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 320,
    "path": "../public/images/icon/icon_27.svg"
  },
  "/images/icon/icon_28.svg": {
    "type": "image/svg+xml",
    "etag": "\"2af-1zTt+p7Y1OC81PxfyAtfiRhsIIU\"",
    "mtime": "2025-05-17T03:54:36.112Z",
    "size": 687,
    "path": "../public/images/icon/icon_28.svg"
  },
  "/images/icon/icon_29.svg": {
    "type": "image/svg+xml",
    "etag": "\"d2-OJcDEk7nyUajZTWltbe6M0deCF4\"",
    "mtime": "2025-05-17T03:54:36.126Z",
    "size": 210,
    "path": "../public/images/icon/icon_29.svg"
  },
  "/images/icon/icon_30.svg": {
    "type": "image/svg+xml",
    "etag": "\"1243-9cp8PGmhKa9gNMlzeqOVEhPqkOU\"",
    "mtime": "2025-05-17T03:54:36.126Z",
    "size": 4675,
    "path": "../public/images/icon/icon_30.svg"
  },
  "/images/icon/icon_31.svg": {
    "type": "image/svg+xml",
    "etag": "\"76b-r0jk0TAA/4SxjQepKyCNM6VE+Yw\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 1899,
    "path": "../public/images/icon/icon_31.svg"
  },
  "/images/icon/icon_32.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fe-XfT3EKVIb/uJhbOQMaWbVs0XfbM\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 1790,
    "path": "../public/images/icon/icon_32.svg"
  },
  "/images/icon/icon_33.svg": {
    "type": "image/svg+xml",
    "etag": "\"687-ayNgzHaFtB2cyWXHlDI0vEE/egE\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 1671,
    "path": "../public/images/icon/icon_33.svg"
  },
  "/images/icon/icon_34.svg": {
    "type": "image/svg+xml",
    "etag": "\"ba1-JFGlLm4lSquaNsEnx5diEzt2oAc\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 2977,
    "path": "../public/images/icon/icon_34.svg"
  },
  "/images/icon/icon_35.svg": {
    "type": "image/svg+xml",
    "etag": "\"6eb-QU05DOGeGdyY79HFw59qVzyM/b0\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 1771,
    "path": "../public/images/icon/icon_35.svg"
  },
  "/images/icon/icon_36.svg": {
    "type": "image/svg+xml",
    "etag": "\"113-Y4dIV2rnZBT+moAv2uzqkUVdV6Q\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 275,
    "path": "../public/images/icon/icon_36.svg"
  },
  "/images/icon/icon_37.svg": {
    "type": "image/svg+xml",
    "etag": "\"277-xg/+wDTj0ILnm/MusuwL4PMWvV0\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 631,
    "path": "../public/images/icon/icon_37.svg"
  },
  "/images/icon/icon_38.svg": {
    "type": "image/svg+xml",
    "etag": "\"226-lXETxx+zigJzC576ly8i9BXUXoY\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 550,
    "path": "../public/images/icon/icon_38.svg"
  },
  "/images/icon/icon_39.svg": {
    "type": "image/svg+xml",
    "etag": "\"122-ssI8iJPnaule6qpQOMuAPyMUxzo\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 290,
    "path": "../public/images/icon/icon_39.svg"
  },
  "/images/icon/icon_40.svg": {
    "type": "image/svg+xml",
    "etag": "\"356-6PpXdDcamDuhTDwid34jGhqrNms\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 854,
    "path": "../public/images/icon/icon_40.svg"
  },
  "/images/icon/icon_41.svg": {
    "type": "image/svg+xml",
    "etag": "\"556-9rI8bHGHoas7LGS3G5q5mLwhh1k\"",
    "mtime": "2025-05-17T03:54:36.129Z",
    "size": 1366,
    "path": "../public/images/icon/icon_41.svg"
  },
  "/images/icon/icon_42.svg": {
    "type": "image/svg+xml",
    "etag": "\"338-bOgBjU3CbjcFOokYfIVIVWk9x74\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 824,
    "path": "../public/images/icon/icon_42.svg"
  },
  "/images/icon/icon_43.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f6-NH7Y7/4AcqOoTQzdCjd87mBH++Q\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 1782,
    "path": "../public/images/icon/icon_43.svg"
  },
  "/images/icon/icon_44.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c9-Y//36YU9M5H6ejCy9ZrWuF5HD/M\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 969,
    "path": "../public/images/icon/icon_44.svg"
  },
  "/images/icon/icon_45.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e9-1sXJCMfVAwXRDLRinfwGfw12JvY\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 1001,
    "path": "../public/images/icon/icon_45.svg"
  },
  "/images/icon/icon_46.svg": {
    "type": "image/svg+xml",
    "etag": "\"9b0-CeMqaNz9YTl2LuQM36U8ymSeZAY\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 2480,
    "path": "../public/images/icon/icon_46.svg"
  },
  "/images/icon/icon_47.svg": {
    "type": "image/svg+xml",
    "etag": "\"27a-aD3+XWYuYenqorCi2qUQa4hQ7sQ\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 634,
    "path": "../public/images/icon/icon_47.svg"
  },
  "/images/icon/icon_48.svg": {
    "type": "image/svg+xml",
    "etag": "\"2be-vilwahVMp8QRtEdqGodEvwbTUMQ\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 702,
    "path": "../public/images/icon/icon_48.svg"
  },
  "/images/icon/icon_49.svg": {
    "type": "image/svg+xml",
    "etag": "\"4de-8Cb8BjfZ8cUHIpxsxTHtUsaV8/k\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 1246,
    "path": "../public/images/icon/icon_49.svg"
  },
  "/images/icon/icon_50.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a9-BHTQi33SMtfdM81j6VEARnd5KWg\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 2473,
    "path": "../public/images/icon/icon_50.svg"
  },
  "/images/icon/icon_51.svg": {
    "type": "image/svg+xml",
    "etag": "\"528-joJp9Rl2V5IeoT2wfw1ce2v4U4k\"",
    "mtime": "2025-05-17T03:54:36.145Z",
    "size": 1320,
    "path": "../public/images/icon/icon_51.svg"
  },
  "/images/icon/icon_52.svg": {
    "type": "image/svg+xml",
    "etag": "\"45d5-9H/Fsu5KbwFRb8nMY20NdkW5aXE\"",
    "mtime": "2025-05-17T03:54:36.160Z",
    "size": 17877,
    "path": "../public/images/icon/icon_52.svg"
  },
  "/images/icon/icon_53.svg": {
    "type": "image/svg+xml",
    "etag": "\"24e-wBR/p0t7D9al+RIKBy3qVtGvfEo\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 590,
    "path": "../public/images/icon/icon_53.svg"
  },
  "/images/icon/icon_54.svg": {
    "type": "image/svg+xml",
    "etag": "\"105-uG34Ac4GudTvRrZU+KjW7KDEWGg\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 261,
    "path": "../public/images/icon/icon_54.svg"
  },
  "/images/icon/icon_55.svg": {
    "type": "image/svg+xml",
    "etag": "\"26e-q/zhPaQWPFG+QLTCKDE4nQF3/uk\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 622,
    "path": "../public/images/icon/icon_55.svg"
  },
  "/images/icon/icon_56.svg": {
    "type": "image/svg+xml",
    "etag": "\"779-0VKLI96AuWLNGdQ4qvnAAU7c0Io\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 1913,
    "path": "../public/images/icon/icon_56.svg"
  },
  "/images/icon/icon_57.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0b-vG1xTQFL9eK82zhp38WapsM84e8\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 3083,
    "path": "../public/images/icon/icon_57.svg"
  },
  "/images/icon/icon_58.svg": {
    "type": "image/svg+xml",
    "etag": "\"333-iLqk+b6PHDorlDfh3ClRqc9LhxI\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 819,
    "path": "../public/images/icon/icon_58.svg"
  },
  "/images/icon/icon_59.svg": {
    "type": "image/svg+xml",
    "etag": "\"346-AqYMwXpQ6BXbNiwpT8u4omLRe6o\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 838,
    "path": "../public/images/icon/icon_59.svg"
  },
  "/images/icon/icon_60.svg": {
    "type": "image/svg+xml",
    "etag": "\"557-evxHe3e4by9rx4Uk/T4uMVz8q2E\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 1367,
    "path": "../public/images/icon/icon_60.svg"
  },
  "/images/icon/icon_61.svg": {
    "type": "image/svg+xml",
    "etag": "\"593-LGiUTiUKP2GZSI5U26aC39PMnH8\"",
    "mtime": "2025-05-17T03:54:36.162Z",
    "size": 1427,
    "path": "../public/images/icon/icon_61.svg"
  },
  "/images/icon/icon_62.svg": {
    "type": "image/svg+xml",
    "etag": "\"227-uuSsIlpkrspq8zPdaUfsjJMO33w\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 551,
    "path": "../public/images/icon/icon_62.svg"
  },
  "/images/icon/icon_63.svg": {
    "type": "image/svg+xml",
    "etag": "\"3aa-7D9rRjdrFg+gdLns9S1qtDSCgsE\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 938,
    "path": "../public/images/icon/icon_63.svg"
  },
  "/images/icon/icon_64.svg": {
    "type": "image/svg+xml",
    "etag": "\"14f-pEOElzQwt2RYKZm4IcaAfINJKxQ\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 335,
    "path": "../public/images/icon/icon_64.svg"
  },
  "/images/icon/icon_65.svg": {
    "type": "image/svg+xml",
    "etag": "\"ed-Z10IKeFYhcNgmgv6tcNd6snCc0U\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 237,
    "path": "../public/images/icon/icon_65.svg"
  },
  "/images/icon/icon_66.svg": {
    "type": "image/svg+xml",
    "etag": "\"305-Vs43QZtWBl3Tu9JwYFKUlWljh6s\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 773,
    "path": "../public/images/icon/icon_66.svg"
  },
  "/images/icon/icon_67.svg": {
    "type": "image/svg+xml",
    "etag": "\"92c-IYX3NmVKSDduvPuHn3X8c2ySYs4\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 2348,
    "path": "../public/images/icon/icon_67.svg"
  },
  "/images/icon/icon_68.svg": {
    "type": "image/svg+xml",
    "etag": "\"701-2o+BgmaorM6/shhNEAOskwOO8G0\"",
    "mtime": "2025-05-17T03:54:36.176Z",
    "size": 1793,
    "path": "../public/images/icon/icon_68.svg"
  },
  "/images/icon/icon_69.svg": {
    "type": "image/svg+xml",
    "etag": "\"67c-QViaTa3LuLz/ewDwLbPB94A1BGE\"",
    "mtime": "2025-05-17T03:54:36.192Z",
    "size": 1660,
    "path": "../public/images/icon/icon_69.svg"
  },
  "/images/icon/icon_70.svg": {
    "type": "image/svg+xml",
    "etag": "\"b95-tPfoo0+i97EYo4H0tPflds0fxrg\"",
    "mtime": "2025-05-17T03:54:36.193Z",
    "size": 2965,
    "path": "../public/images/icon/icon_70.svg"
  },
  "/images/icon/icon_71.svg": {
    "type": "image/svg+xml",
    "etag": "\"6e3-G9+HkM9yFKl2RPZipVlhnyMCpSY\"",
    "mtime": "2025-05-17T03:54:36.195Z",
    "size": 1763,
    "path": "../public/images/icon/icon_71.svg"
  },
  "/images/icon/icon_72.svg": {
    "type": "image/svg+xml",
    "etag": "\"231-C0A7njTVq0QJh2tTaETE37gMhE4\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 561,
    "path": "../public/images/icon/icon_72.svg"
  },
  "/images/icon/icon_73.svg": {
    "type": "image/svg+xml",
    "etag": "\"34f-1Eeey/Lbi9xsqXJK2lQxRJyOeTA\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 847,
    "path": "../public/images/icon/icon_73.svg"
  },
  "/images/icon/icon_74.svg": {
    "type": "image/svg+xml",
    "etag": "\"20f-N2jRbrN+qnsiFY8hgTlETfrypCo\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 527,
    "path": "../public/images/icon/icon_74.svg"
  },
  "/images/icon/icon_75.svg": {
    "type": "image/svg+xml",
    "etag": "\"118-5ShOWbyKxa0mEnsUjSOyCQhDVpM\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 280,
    "path": "../public/images/icon/icon_75.svg"
  },
  "/images/icon/icon_76.svg": {
    "type": "image/svg+xml",
    "etag": "\"2dc-41Tuh9M6Q9vJ2zU/UmdQVt/AF2o\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 732,
    "path": "../public/images/icon/icon_76.svg"
  },
  "/images/icon/icon_77.svg": {
    "type": "image/svg+xml",
    "etag": "\"162-rzGIj0lS6M4EuT0jVOhS3U/2/ZU\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 354,
    "path": "../public/images/icon/icon_77.svg"
  },
  "/images/icon/icon_78.svg": {
    "type": "image/svg+xml",
    "etag": "\"297-/FTqofDzcXWlEVOLe5vz6cvM1u0\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 663,
    "path": "../public/images/icon/icon_78.svg"
  },
  "/images/icon/icon_79.svg": {
    "type": "image/svg+xml",
    "etag": "\"86e-U5njkM6MBF+xPGR5nVYv4FNu1hw\"",
    "mtime": "2025-05-17T03:54:36.197Z",
    "size": 2158,
    "path": "../public/images/icon/icon_79.svg"
  },
  "/images/icon/icon_80.svg": {
    "type": "image/svg+xml",
    "etag": "\"232-jZTjeRHOO0urweGRfCQAbWX4v5M\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 562,
    "path": "../public/images/icon/icon_80.svg"
  },
  "/images/icon/icon_81.svg": {
    "type": "image/svg+xml",
    "etag": "\"2a7-1t1ama81pWxl1h55mzWpZ8+JOaA\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 679,
    "path": "../public/images/icon/icon_81.svg"
  },
  "/images/icon/icon_82.svg": {
    "type": "image/svg+xml",
    "etag": "\"14d-npxdw+IH2pPjsc0V+uc1xi5aQEc\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 333,
    "path": "../public/images/icon/icon_82.svg"
  },
  "/images/icon/icon_83.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d5-81dObySJ1OnN1MWkmgn01QqVrB0\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 725,
    "path": "../public/images/icon/icon_83.svg"
  },
  "/images/icon/icon_84.svg": {
    "type": "image/svg+xml",
    "etag": "\"127-oRZZdeKT27WB0yYRMcZUZPQTjMw\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 295,
    "path": "../public/images/icon/icon_84.svg"
  },
  "/images/icon/icon_85.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a4-MAbtTjyNfw+UOe0qcqkc9EdpdZ4\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 420,
    "path": "../public/images/icon/icon_85.svg"
  },
  "/images/icon/icon_86.svg": {
    "type": "image/svg+xml",
    "etag": "\"26b-OAgMKevoC+jxRHVMb+IIKvaYLoA\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 619,
    "path": "../public/images/icon/icon_86.svg"
  },
  "/images/icon/icon_87.svg": {
    "type": "image/svg+xml",
    "etag": "\"28e-3byGNyUhAYTFuyk58y2L2SJ8Ku8\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 654,
    "path": "../public/images/icon/icon_87.svg"
  },
  "/images/icon/icon_88.svg": {
    "type": "image/svg+xml",
    "etag": "\"241-1YFC+AbL4izzn6ZiKeqzwlN1ues\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 577,
    "path": "../public/images/icon/icon_88.svg"
  },
  "/images/icon/icon_89.svg": {
    "type": "image/svg+xml",
    "etag": "\"28e-3byGNyUhAYTFuyk58y2L2SJ8Ku8\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 654,
    "path": "../public/images/icon/icon_89.svg"
  },
  "/images/icon/icon_90.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c3-ZzRgNWJ+ucjTPMHOGNErxRAFvcI\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 1219,
    "path": "../public/images/icon/icon_90.svg"
  },
  "/images/icon/icon_91.svg": {
    "type": "image/svg+xml",
    "etag": "\"5e6-nOq1J6/UNUztO1XEQNh6oj2JkI4\"",
    "mtime": "2025-05-17T03:54:36.209Z",
    "size": 1510,
    "path": "../public/images/icon/icon_91.svg"
  },
  "/images/icon/icon_92.svg": {
    "type": "image/svg+xml",
    "etag": "\"6f3-UeFWK1evY6lbzNnXIm97YlD6Ias\"",
    "mtime": "2025-05-17T03:54:36.224Z",
    "size": 1779,
    "path": "../public/images/icon/icon_92.svg"
  },
  "/images/icon/icon_93.svg": {
    "type": "image/svg+xml",
    "etag": "\"fa-wpeS0r6AGtdO57LrFS2dJenD+Bc\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 250,
    "path": "../public/images/icon/icon_93.svg"
  },
  "/images/icon/icon_94.svg": {
    "type": "image/svg+xml",
    "etag": "\"172a-NCKU0PAN/mq64Dm6u5qHX9o3rZs\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 5930,
    "path": "../public/images/icon/icon_94.svg"
  },
  "/images/icon/icon_95.svg": {
    "type": "image/svg+xml",
    "etag": "\"70b-9iUftJACZvoMJTZYSotVUDsUn5Y\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 1803,
    "path": "../public/images/icon/icon_95.svg"
  },
  "/images/icon/icon_96.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ec-58gzWCdqW1siNjkv0CxOIDJBHzQ\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 1260,
    "path": "../public/images/icon/icon_96.svg"
  },
  "/images/icon/icon_97.svg": {
    "type": "image/svg+xml",
    "etag": "\"f2-FvvKOxwWpbiKQF24PzykgGzOHUA\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 242,
    "path": "../public/images/icon/icon_97.svg"
  },
  "/images/icon/icon_98.svg": {
    "type": "image/svg+xml",
    "etag": "\"535-ggwo5F6IqXEnm+Sfd16TzGofETI\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 1333,
    "path": "../public/images/icon/icon_98.svg"
  },
  "/images/icon/icon_99.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b8-lVCR6GWCE1F6ld3ISZzAfrx/M/0\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 1208,
    "path": "../public/images/icon/icon_99.svg"
  },
  "/images/icon/playstore.svg": {
    "type": "image/svg+xml",
    "etag": "\"700-Mjk10HVX5zc7HVnENV6emGROVYI\"",
    "mtime": "2025-05-17T03:54:36.225Z",
    "size": 1792,
    "path": "../public/images/icon/playstore.svg"
  },
  "/images/shape/shape_01.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f7-3s/kX8pZ5vP3v/e32khD1DCIJFM\"",
    "mtime": "2025-05-17T03:54:36.405Z",
    "size": 503,
    "path": "../public/images/shape/shape_01.svg"
  },
  "/images/shape/shape_02.svg": {
    "type": "image/svg+xml",
    "etag": "\"14a-YLTQsta+UmcyQA3MUfnEfqxXWmo\"",
    "mtime": "2025-05-17T03:54:36.405Z",
    "size": 330,
    "path": "../public/images/shape/shape_02.svg"
  },
  "/images/shape/shape_03.svg": {
    "type": "image/svg+xml",
    "etag": "\"172-891HL+5+EBhpUKaUKSsLfHA1vOk\"",
    "mtime": "2025-05-17T03:54:36.405Z",
    "size": 370,
    "path": "../public/images/shape/shape_03.svg"
  },
  "/images/shape/shape_04.svg": {
    "type": "image/svg+xml",
    "etag": "\"357-+neojs31tV5chAZIiZ4D8buoDxM\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 855,
    "path": "../public/images/shape/shape_04.svg"
  },
  "/images/shape/shape_05.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b1-ODJVG/mqse3NuBIf0uDEICfwXvU\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 1201,
    "path": "../public/images/shape/shape_05.svg"
  },
  "/images/shape/shape_06.svg": {
    "type": "image/svg+xml",
    "etag": "\"28c-lIC4ePQku2/BrWz9GuqyaNjLSVw\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 652,
    "path": "../public/images/shape/shape_06.svg"
  },
  "/images/shape/shape_07.svg": {
    "type": "image/svg+xml",
    "etag": "\"282-EfQe53dvYWB3o0crspHTBgtm79E\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 642,
    "path": "../public/images/shape/shape_07.svg"
  },
  "/images/shape/shape_08.svg": {
    "type": "image/svg+xml",
    "etag": "\"27e-M69ImbrlLHAzfMS0YqMrpUZL7+w\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 638,
    "path": "../public/images/shape/shape_08.svg"
  },
  "/images/shape/shape_09.svg": {
    "type": "image/svg+xml",
    "etag": "\"e1-ruc9RbtKWcm4A5CSVxFWYmM34Cs\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 225,
    "path": "../public/images/shape/shape_09.svg"
  },
  "/images/shape/shape_10.svg": {
    "type": "image/svg+xml",
    "etag": "\"342-b/mYq7KhqxX5tOv4IyVq6Niciv8\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 834,
    "path": "../public/images/shape/shape_10.svg"
  },
  "/images/shape/shape_11.svg": {
    "type": "image/svg+xml",
    "etag": "\"4424f-N7GPqZ3E1Dxdn7yPLR4n5SBrNgY\"",
    "mtime": "2025-05-17T03:54:36.414Z",
    "size": 279119,
    "path": "../public/images/shape/shape_11.svg"
  },
  "/images/shape/shape_12.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0e7f-Lv5vHfQ4s39pC+ptO+nyDrwTkxo\"",
    "mtime": "2025-05-17T03:54:36.430Z",
    "size": 790143,
    "path": "../public/images/shape/shape_12.svg"
  },
  "/images/shape/shape_13.svg": {
    "type": "image/svg+xml",
    "etag": "\"173-cThe9u7jDH1p4JY4ohaynszs1xo\"",
    "mtime": "2025-05-17T03:54:36.440Z",
    "size": 371,
    "path": "../public/images/shape/shape_13.svg"
  },
  "/images/shape/shape_14.svg": {
    "type": "image/svg+xml",
    "etag": "\"f3ea6-VD+wponUPYD86Nffkka9pijUqlI\"",
    "mtime": "2025-05-17T03:54:36.446Z",
    "size": 999078,
    "path": "../public/images/shape/shape_14.svg"
  },
  "/images/shape/shape_15.png": {
    "type": "image/png",
    "etag": "\"1b23-jgChndgAOMsQCE2ubFbNo9TKfF8\"",
    "mtime": "2025-05-17T03:54:36.458Z",
    "size": 6947,
    "path": "../public/images/shape/shape_15.png"
  },
  "/images/shape/shape_16.svg": {
    "type": "image/svg+xml",
    "etag": "\"157-k8PCE5nsN26vv29/msU7nb2uBvI\"",
    "mtime": "2025-05-17T03:54:36.458Z",
    "size": 343,
    "path": "../public/images/shape/shape_16.svg"
  },
  "/images/shape/shape_17.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f63-rPN+8Crg/pAgouVPHc6yo3o/s98\"",
    "mtime": "2025-05-17T03:54:36.467Z",
    "size": 790371,
    "path": "../public/images/shape/shape_17.svg"
  },
  "/images/shape/shape_18.svg": {
    "type": "image/svg+xml",
    "etag": "\"157-X8c4A3V6KQAIHcxu5YBN9gUScpU\"",
    "mtime": "2025-05-17T03:54:36.467Z",
    "size": 343,
    "path": "../public/images/shape/shape_18.svg"
  },
  "/images/shape/shape_19.svg": {
    "type": "image/svg+xml",
    "etag": "\"af-TbD0Nor3aq6Rap8N6hgKZ0VVJDI\"",
    "mtime": "2025-05-17T03:54:36.467Z",
    "size": 175,
    "path": "../public/images/shape/shape_19.svg"
  },
  "/images/shape/shape_20.svg": {
    "type": "image/svg+xml",
    "etag": "\"345-Xcrk6tkJPob7TlYxADgJitMAqD4\"",
    "mtime": "2025-05-17T03:54:36.467Z",
    "size": 837,
    "path": "../public/images/shape/shape_20.svg"
  },
  "/images/shape/shape_21.svg": {
    "type": "image/svg+xml",
    "etag": "\"300d-gmZIC7RQv3oCQzRS25zng3yhHD8\"",
    "mtime": "2025-05-17T03:54:36.478Z",
    "size": 12301,
    "path": "../public/images/shape/shape_21.svg"
  },
  "/images/shape/shape_22.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e6f-dbF3lkFAQBeddDNmQs+wzUdJSXc\"",
    "mtime": "2025-05-17T03:54:36.478Z",
    "size": 7791,
    "path": "../public/images/shape/shape_22.svg"
  },
  "/images/shape/shape_23.svg": {
    "type": "image/svg+xml",
    "etag": "\"16f-4hhiKGAzGSqNWhVntIHzrVBzRp8\"",
    "mtime": "2025-05-17T03:54:36.478Z",
    "size": 367,
    "path": "../public/images/shape/shape_23.svg"
  },
  "/images/shape/shape_24.svg": {
    "type": "image/svg+xml",
    "etag": "\"8bbe4-xVcuqwqaZ5lCL9r15yM3HtAq+mU\"",
    "mtime": "2025-05-17T03:54:36.478Z",
    "size": 572388,
    "path": "../public/images/shape/shape_24.svg"
  },
  "/images/shape/shape_25.svg": {
    "type": "image/svg+xml",
    "etag": "\"165-Z9jj5HtfiEcTjmsE0r+ZqkY4wjs\"",
    "mtime": "2025-05-17T03:54:36.478Z",
    "size": 357,
    "path": "../public/images/shape/shape_25.svg"
  },
  "/images/shape/shape_26.svg": {
    "type": "image/svg+xml",
    "etag": "\"17f-OQUIpiYKOAluHPMpal4fwf+HBEo\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 383,
    "path": "../public/images/shape/shape_26.svg"
  },
  "/images/shape/shape_27.svg": {
    "type": "image/svg+xml",
    "etag": "\"16a-Ou11H6LU3rZvAkbYLqe2j+yi6l0\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 362,
    "path": "../public/images/shape/shape_27.svg"
  },
  "/images/shape/shape_28.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-KNgKIR/qNTJ9nm5jesr0+MafC1A\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 342,
    "path": "../public/images/shape/shape_28.svg"
  },
  "/images/shape/shape_29.svg": {
    "type": "image/svg+xml",
    "etag": "\"150-eC+k6W5IIzJxK/GrHyB5/AkqpUs\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 336,
    "path": "../public/images/shape/shape_29.svg"
  },
  "/images/shape/shape_30.svg": {
    "type": "image/svg+xml",
    "etag": "\"143-vjChVqIMe1cMCOhjSEVrSbl0Mhs\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 323,
    "path": "../public/images/shape/shape_30.svg"
  },
  "/images/shape/shape_31.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-/fOnMfouIvV7G2YaiSXA6+JhBfk\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 342,
    "path": "../public/images/shape/shape_31.svg"
  },
  "/images/shape/shape_32.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-ovNfMS3Xw5bJJwroygGq/63Ha9s\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 342,
    "path": "../public/images/shape/shape_32.svg"
  },
  "/images/shape/shape_33.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-fWHy/1XeyJUavZfn6pU/BjwqYxQ\"",
    "mtime": "2025-05-17T03:54:36.493Z",
    "size": 342,
    "path": "../public/images/shape/shape_33.svg"
  },
  "/images/shape/shape_34.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-lLfcmgThUa1EX6eTP+6lBGTpgww\"",
    "mtime": "2025-05-17T03:54:36.509Z",
    "size": 342,
    "path": "../public/images/shape/shape_34.svg"
  },
  "/images/shape/shape_35.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-fPYcDMKVFFnFitmMWeWOPTJQwsY\"",
    "mtime": "2025-05-17T03:54:36.509Z",
    "size": 342,
    "path": "../public/images/shape/shape_35.svg"
  },
  "/images/shape/shape_36.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f47-8VwzuS6AvDadxvHlGNiM5hCIOhU\"",
    "mtime": "2025-05-17T03:54:36.525Z",
    "size": 790343,
    "path": "../public/images/shape/shape_36.svg"
  },
  "/images/shape/shape_37.svg": {
    "type": "image/svg+xml",
    "etag": "\"156-pzk034Eop3dUwkK74ukvMDDlXRs\"",
    "mtime": "2025-05-17T03:54:36.525Z",
    "size": 342,
    "path": "../public/images/shape/shape_37.svg"
  },
  "/images/shape/shape_38.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f49-Z0AzYGuazxz2c7Wfz30PE7uE6Xs\"",
    "mtime": "2025-05-17T03:54:36.544Z",
    "size": 790345,
    "path": "../public/images/shape/shape_38.svg"
  },
  "/images/shape/shape_39.svg": {
    "type": "image/svg+xml",
    "etag": "\"295-D5mziPg3Kb477Et1xsO7sEp7Yic\"",
    "mtime": "2025-05-17T03:54:36.546Z",
    "size": 661,
    "path": "../public/images/shape/shape_39.svg"
  },
  "/images/shape/shape_40.svg": {
    "type": "image/svg+xml",
    "etag": "\"171-n9y6Rw+QNPpAsKKQRwKsquVl/Gg\"",
    "mtime": "2025-05-17T03:54:36.546Z",
    "size": 369,
    "path": "../public/images/shape/shape_40.svg"
  },
  "/images/shape/shape_41.svg": {
    "type": "image/svg+xml",
    "etag": "\"170-fcH39UEGCVP7AI5mQvuOA8LRqlA\"",
    "mtime": "2025-05-17T03:54:36.546Z",
    "size": 368,
    "path": "../public/images/shape/shape_41.svg"
  },
  "/images/shape/shape_42.svg": {
    "type": "image/svg+xml",
    "etag": "\"c0f74-tirMRaN2mslWCFRQ/7uGP0+ko5I\"",
    "mtime": "2025-05-17T03:54:36.557Z",
    "size": 790388,
    "path": "../public/images/shape/shape_42.svg"
  },
  "/images/shape/shape_43.svg": {
    "type": "image/svg+xml",
    "etag": "\"2bf-HGrLBj1uovRh93kR6lDbW+ye300\"",
    "mtime": "2025-05-17T03:54:36.557Z",
    "size": 703,
    "path": "../public/images/shape/shape_43.svg"
  },
  "/images/shape/shape_44.svg": {
    "type": "image/svg+xml",
    "etag": "\"315-oium4TK2h/J/0ifjptabTsi8xiM\"",
    "mtime": "2025-05-17T03:54:36.557Z",
    "size": 789,
    "path": "../public/images/shape/shape_44.svg"
  },
  "/images/shape/shape_45.svg": {
    "type": "image/svg+xml",
    "etag": "\"243-KVOyxMRp2OfEOGXWEsvI1uknddA\"",
    "mtime": "2025-05-17T03:54:36.563Z",
    "size": 579,
    "path": "../public/images/shape/shape_45.svg"
  },
  "/images/shape/shape_46.svg": {
    "type": "image/svg+xml",
    "etag": "\"314-GXSJZy2IDvYPqcJFOOX/A7Pyz3Q\"",
    "mtime": "2025-05-17T03:54:36.563Z",
    "size": 788,
    "path": "../public/images/shape/shape_46.svg"
  },
  "/images/shape/shape_47.svg": {
    "type": "image/svg+xml",
    "etag": "\"22f-j4h7v4gzU3RfGS9f5aYqR1CqGFA\"",
    "mtime": "2025-05-17T03:54:36.563Z",
    "size": 559,
    "path": "../public/images/shape/shape_47.svg"
  },
  "/images/shape/shape_48.svg": {
    "type": "image/svg+xml",
    "etag": "\"286-weC4ll33pCUe4nyv1n5A2doi8ok\"",
    "mtime": "2025-05-17T03:54:36.563Z",
    "size": 646,
    "path": "../public/images/shape/shape_48.svg"
  },
  "/images/shape/shape_49.svg": {
    "type": "image/svg+xml",
    "etag": "\"44245-enOQx3C9mBg3Zx7q6OXMVgGon2c\"",
    "mtime": "2025-05-17T03:54:36.563Z",
    "size": 279109,
    "path": "../public/images/shape/shape_49.svg"
  },
  "/images/shape/shape_50.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cdb9-hfmZc272GylVUu9hWO9tt0WARYg\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 249273,
    "path": "../public/images/shape/shape_50.svg"
  },
  "/images/shape/shape_51.svg": {
    "type": "image/svg+xml",
    "etag": "\"20b-chLFojdZQtZUF/Xe1cI5Z+7oWkQ\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 523,
    "path": "../public/images/shape/shape_51.svg"
  },
  "/images/shape/shape_52.png": {
    "type": "image/png",
    "etag": "\"8f29-t3tjrI2BGz49oHihhkJ1PcD10CI\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 36649,
    "path": "../public/images/shape/shape_52.png"
  },
  "/images/shop/img_01.jpg": {
    "type": "image/jpeg",
    "etag": "\"11c44-Nmdj1u7cTx5AhkV7bX+a7je/40k\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 72772,
    "path": "../public/images/shop/img_01.jpg"
  },
  "/images/shop/img_02.jpg": {
    "type": "image/jpeg",
    "etag": "\"ffaf-uDvQg+/fP2OjQRDooP1sjjIX2d0\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 65455,
    "path": "../public/images/shop/img_02.jpg"
  },
  "/images/shop/img_03.jpg": {
    "type": "image/jpeg",
    "etag": "\"12b26-jb8AIRFCHWocKHvLYlazYTAkpNs\"",
    "mtime": "2025-05-17T03:54:36.575Z",
    "size": 76582,
    "path": "../public/images/shop/img_03.jpg"
  },
  "/images/shop/img_04.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b296-ImSApo+GjAsTnwc5kvst8rPgWD0\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 111254,
    "path": "../public/images/shop/img_04.jpg"
  },
  "/images/shop/img_05.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a55d-4BudQ6cW1kv9NnUAEmBj/D4M700\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 107869,
    "path": "../public/images/shop/img_05.jpg"
  },
  "/images/shop/img_06.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce53-bCGdFN0ekm6OlnMFmrZZ5IiPZx4\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 52819,
    "path": "../public/images/shop/img_06.jpg"
  },
  "/images/shop/img_07.jpg": {
    "type": "image/jpeg",
    "etag": "\"1aefa-rzq/ZxsCXhhbLdTYCQg77s6zFck\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 110330,
    "path": "../public/images/shop/img_07.jpg"
  },
  "/images/shop/img_08.jpg": {
    "type": "image/jpeg",
    "etag": "\"14a10-sqVAsSxfC7fwnaSpox61M0QC9Ls\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 84496,
    "path": "../public/images/shop/img_08.jpg"
  },
  "/images/shop/img_09.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f51-q/FTIWJLLrFS3ydaIkdnjrjE/tw\"",
    "mtime": "2025-05-17T03:54:36.588Z",
    "size": 16209,
    "path": "../public/images/shop/img_09.jpg"
  },
  "/images/shop/img_10.jpg": {
    "type": "image/jpeg",
    "etag": "\"188dc-lQzh1DRObEeUVtTRRulSIAirHSo\"",
    "mtime": "2025-05-17T03:54:36.604Z",
    "size": 100572,
    "path": "../public/images/shop/img_10.jpg"
  },
  "/images/shop/img_11.jpg": {
    "type": "image/jpeg",
    "etag": "\"17ce1-AibLQlabSXa/Lnl6ZZjiPWrdQA8\"",
    "mtime": "2025-05-17T03:54:36.606Z",
    "size": 97505,
    "path": "../public/images/shop/img_11.jpg"
  },
  "/images/shop/img_12.jpg": {
    "type": "image/jpeg",
    "etag": "\"18709-yQGUxDHM5TIf820Ok2oYhj6+9LI\"",
    "mtime": "2025-05-17T03:54:36.608Z",
    "size": 100105,
    "path": "../public/images/shop/img_12.jpg"
  },
  "/images/shop/img_13.jpg": {
    "type": "image/jpeg",
    "etag": "\"141b-u9foYiS/zGiS/A0P6TZWxNfUxZQ\"",
    "mtime": "2025-05-17T03:54:36.608Z",
    "size": 5147,
    "path": "../public/images/shop/img_13.jpg"
  },
  "/images/shop/img_14.jpg": {
    "type": "image/jpeg",
    "etag": "\"1373-gT710txcOCJO6PNfCulcD9L/TkM\"",
    "mtime": "2025-05-17T03:54:36.608Z",
    "size": 4979,
    "path": "../public/images/shop/img_14.jpg"
  },
  "/images/shop/img_15.jpg": {
    "type": "image/jpeg",
    "etag": "\"24f2-/AixopU+8MX7jBHMpZlplKZnfSU\"",
    "mtime": "2025-05-17T03:54:36.608Z",
    "size": 9458,
    "path": "../public/images/shop/img_15.jpg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-m1bg94wdxJobjqG5pYRLAnvi99s\"",
    "mtime": "2025-07-28T11:26:23.756Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/93632ac8-7f75-4df7-a019-6c0a3a6cacdb.json": {
    "type": "application/json",
    "etag": "\"8b-pqAuOpbRG3iZ7Lg1VTNn0ydBjAE\"",
    "mtime": "2025-07-28T11:26:23.757Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/93632ac8-7f75-4df7-a019-6c0a3a6cacdb.json"
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
const _ztPG50 = eventHandler((event) => {
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
      throw createError$1({ statusCode: 404 });
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

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_8Dqqk5 = () => import('../routes/api/announcement-images/_id_.delete.mjs');
const _lazy_ZRcREm = () => import('../routes/api/announcement-images/_id_.get.mjs');
const _lazy_LuHeok = () => import('../routes/api/index.post.mjs');
const _lazy_Ortbfn = () => import('../routes/api/announcements/_id_.delete.mjs');
const _lazy_P3fkPp = () => import('../routes/api/announcements/_id_.get.mjs');
const _lazy_IXwCQk = () => import('../routes/api/announcements/_id_.put.mjs');
const _lazy_CMo_7V = () => import('../routes/api/index.get.mjs');
const _lazy_3VoKdm = () => import('../routes/api/index.post2.mjs');
const _lazy_uLo6u7 = () => import('../routes/api/auth/login.post.mjs');
const _lazy_aSfk2F = () => import('../routes/api/auth/logout.post.mjs');
const _lazy_718nsX = () => import('../routes/api/auth/verify.get.mjs');
const _lazy_Xh20OV = () => import('../routes/api/banners/_id_.delete.mjs');
const _lazy_SQh5H9 = () => import('../routes/api/banners/_id_.put.mjs');
const _lazy_SFcGYH = () => import('../routes/api/index.get2.mjs');
const _lazy_aeIVUz = () => import('../routes/api/index.post3.mjs');
const _lazy_ZW8Ah0 = () => import('../routes/api/banners/order.put.mjs');
const _lazy_cRU9Aw = () => import('../routes/api/captcha.mjs');
const _lazy_1F5V51 = () => import('../routes/api/index.get3.mjs');
const _lazy_3jDNj3 = () => import('../routes/api/knowledge/_id_.delete.mjs');
const _lazy_nVYCQQ = () => import('../routes/api/knowledge/_id_.get.mjs');
const _lazy_4UwLnB = () => import('../routes/api/knowledge/_id_.put.mjs');
const _lazy_FlafqI = () => import('../routes/api/knowledge/_id/image.get.mjs');
const _lazy_PXgF2y = () => import('../routes/api/index.get4.mjs');
const _lazy_UNoa4b = () => import('../routes/api/index.post4.mjs');
const _lazy_6dz89q = () => import('../routes/api/knowledge/order.put.mjs');
const _lazy_F1bG8g = () => import('../routes/api/index.get5.mjs');
const _lazy_OajZQO = () => import('../routes/api/qa-categories/_id_.delete.mjs');
const _lazy_E1IGe7 = () => import('../routes/api/qa-categories/_id_.put.mjs');
const _lazy_XLciC0 = () => import('../routes/api/index.get6.mjs');
const _lazy_PsHWrt = () => import('../routes/api/index.post5.mjs');
const _lazy_OI2i6I = () => import('../routes/api/qa-contents/_id_.delete.mjs');
const _lazy_4KcgEu = () => import('../routes/api/qa-contents/_id_.put.mjs');
const _lazy_67OO6x = () => import('../routes/api/index.get7.mjs');
const _lazy_BOnSJe = () => import('../routes/api/index.post6.mjs');
const _lazy_Bgw7hG = () => import('../routes/api/qa.mjs');
const _lazy_Y5ImD3 = () => import('../routes/api/qa/_id_.delete.mjs');
const _lazy_spx7w8 = () => import('../routes/api/qa/_id_.put.mjs');
const _lazy_C98I36 = () => import('../routes/api/index.get8.mjs');
const _lazy_EX4Uyt = () => import('../routes/api/index.post7.mjs');
const _lazy_pP9ppf = () => import('../routes/api/service-unit/_id_.delete.mjs');
const _lazy_1oFBQ0 = () => import('../routes/api/service-unit/_id_.get.mjs');
const _lazy_tGcPK2 = () => import('../routes/api/service-unit/_id_.put.mjs');
const _lazy_6wkh0j = () => import('../routes/api/service-unit/_id/price-image.get.mjs');
const _lazy_cjEkEo = () => import('../routes/api/service-unit/_id/unit-image.get.mjs');
const _lazy_5py_H9 = () => import('../routes/api/index.get9.mjs');
const _lazy_TqZPxS = () => import('../routes/api/index.post8.mjs');
const _lazy_Kp9Hyw = () => import('../routes/api/index.get10.mjs');
const _lazy_M98aMZ = () => import('../routes/api/index.post9.mjs');
const _lazy_qd3yzN = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _ztPG50, lazy: false, middleware: true, method: undefined },
  { route: '/api/announcement-images/:id', handler: _lazy_8Dqqk5, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcement-images/:id', handler: _lazy_ZRcREm, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcement-images', handler: _lazy_LuHeok, lazy: true, middleware: false, method: "post" },
  { route: '/api/announcements/:id', handler: _lazy_Ortbfn, lazy: true, middleware: false, method: "delete" },
  { route: '/api/announcements/:id', handler: _lazy_P3fkPp, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements/:id', handler: _lazy_IXwCQk, lazy: true, middleware: false, method: "put" },
  { route: '/api/announcements', handler: _lazy_CMo_7V, lazy: true, middleware: false, method: "get" },
  { route: '/api/announcements', handler: _lazy_3VoKdm, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/login', handler: _lazy_uLo6u7, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_aSfk2F, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify', handler: _lazy_718nsX, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners/:id', handler: _lazy_Xh20OV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/banners/:id', handler: _lazy_SQh5H9, lazy: true, middleware: false, method: "put" },
  { route: '/api/banners', handler: _lazy_SFcGYH, lazy: true, middleware: false, method: "get" },
  { route: '/api/banners', handler: _lazy_aeIVUz, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners/order', handler: _lazy_ZW8Ah0, lazy: true, middleware: false, method: "put" },
  { route: '/api/captcha', handler: _lazy_cRU9Aw, lazy: true, middleware: false, method: undefined },
  { route: '/api/createdb', handler: _lazy_1F5V51, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_3jDNj3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/knowledge/:id', handler: _lazy_nVYCQQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge/:id', handler: _lazy_4UwLnB, lazy: true, middleware: false, method: "put" },
  { route: '/api/knowledge/:id/image', handler: _lazy_FlafqI, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_PXgF2y, lazy: true, middleware: false, method: "get" },
  { route: '/api/knowledge', handler: _lazy_UNoa4b, lazy: true, middleware: false, method: "post" },
  { route: '/api/knowledge/order', handler: _lazy_6dz89q, lazy: true, middleware: false, method: "put" },
  { route: '/api/languages', handler: _lazy_F1bG8g, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories/:id', handler: _lazy_OajZQO, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-categories/:id', handler: _lazy_E1IGe7, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-categories', handler: _lazy_XLciC0, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-categories', handler: _lazy_PsHWrt, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa-contents/:id', handler: _lazy_OI2i6I, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa-contents/:id', handler: _lazy_4KcgEu, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa-contents', handler: _lazy_67OO6x, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa-contents', handler: _lazy_BOnSJe, lazy: true, middleware: false, method: "post" },
  { route: '/api/qa', handler: _lazy_Bgw7hG, lazy: true, middleware: false, method: undefined },
  { route: '/api/qa/:id', handler: _lazy_Y5ImD3, lazy: true, middleware: false, method: "delete" },
  { route: '/api/qa/:id', handler: _lazy_spx7w8, lazy: true, middleware: false, method: "put" },
  { route: '/api/qa', handler: _lazy_C98I36, lazy: true, middleware: false, method: "get" },
  { route: '/api/qa', handler: _lazy_EX4Uyt, lazy: true, middleware: false, method: "post" },
  { route: '/api/service-unit/:id', handler: _lazy_pP9ppf, lazy: true, middleware: false, method: "delete" },
  { route: '/api/service-unit/:id', handler: _lazy_1oFBQ0, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id', handler: _lazy_tGcPK2, lazy: true, middleware: false, method: "put" },
  { route: '/api/service-unit/:id/price-image', handler: _lazy_6wkh0j, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit/:id/unit-image', handler: _lazy_cjEkEo, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_5py_H9, lazy: true, middleware: false, method: "get" },
  { route: '/api/service-unit', handler: _lazy_TqZPxS, lazy: true, middleware: false, method: "post" },
  { route: '/api/user-reminder', handler: _lazy_Kp9Hyw, lazy: true, middleware: false, method: "get" },
  { route: '/api/user-reminder', handler: _lazy_M98aMZ, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_qd3yzN, lazy: true, middleware: false, method: undefined },
  { route: '/api', handler: app, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_qd3yzN, lazy: true, middleware: false, method: undefined }
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
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return O(
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

function parse(str, options) {
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

export { $fetch as $, joinURL as A, withQuery as B, withTrailingSlash as C, withoutTrailingSlash as D, isScriptProtocol as E, sanitizeStatusCode as F, getContext as G, createHooks as H, executeAsync as I, toRouteMatcher as J, createRouter$1 as K, defu as L, klona as M, parse as N, trapUnhandledNodeErrors as a, useNitroApp as b, defineEventHandler as c, destr as d, createError$1 as e, readBody as f, getCookie as g, setCookie as h, deleteCookie as i, getHeader as j, getQuery as k, getRequestHeader as l, getRouterParam as m, setHeader as n, setResponseHeaders as o, joinRelativeURL as p, defineRenderHandler as q, readMultipartFormData as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, getRouteRules as v, getResponseStatusText as w, getResponseStatus as x, parseQuery as y, hasProtocol as z };
//# sourceMappingURL=nitro.mjs.map
