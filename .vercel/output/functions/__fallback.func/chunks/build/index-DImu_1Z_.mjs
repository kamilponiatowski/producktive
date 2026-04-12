import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { f as buildAssetsURL } from '../_/nitro.mjs';
import { defineComponent, mergeProps, unref, computed, ref, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useI18n, u as useHead, b as useRuntimeConfig } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { formatWithOptions } from 'node:util';
import { sep } from 'node:path';
import g$1 from 'node:process';
import * as tty from 'node:tty';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'consola';
import 'vue-router';
import 'node:fs';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'node:url';
import 'ipx';
import 'node:crypto';
import '@unhead/addons';
import 'unhead/plugins';
import '@unhead/schema-org/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const LogLevels = {
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
};
const LogTypes = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: LogLevels.fatal
  },
  error: {
    level: LogLevels.error
  },
  // Level 1
  warn: {
    level: LogLevels.warn
  },
  // Level 2
  log: {
    level: LogLevels.log
  },
  // Level 3
  info: {
    level: LogLevels.info
  },
  success: {
    level: LogLevels.success
  },
  fail: {
    level: LogLevels.fail
  },
  ready: {
    level: LogLevels.info
  },
  start: {
    level: LogLevels.info
  },
  box: {
    level: LogLevels.info
  },
  // Level 4
  debug: {
    level: LogLevels.debug
  },
  // Level 5
  trace: {
    level: LogLevels.trace
  },
  // Verbose
  verbose: {
    level: LogLevels.verbose
  }
};

function isPlainObject$1(value) {
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
  if (!isPlainObject$1(defaults)) {
    return _defu(baseObject, {}, namespace);
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
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString());
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, ""), {})
  );
}
const defu = createDefu();

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isLogObj(arg) {
  if (!isPlainObject(arg)) {
    return false;
  }
  if (!arg.message && !arg.args) {
    return false;
  }
  if (arg.stack) {
    return false;
  }
  return true;
}

let paused = false;
const queue = [];
class Consola {
  options;
  _lastLog;
  _mockFn;
  /**
   * Creates an instance of Consola with specified options or defaults.
   *
   * @param {Partial<ConsolaOptions>} [options={}] - Configuration options for the Consola instance.
   */
  constructor(options = {}) {
    const types = options.types || LogTypes;
    this.options = defu(
      {
        ...options,
        defaults: { ...options.defaults },
        level: _normalizeLogLevel(options.level, types),
        reporters: [...options.reporters || []]
      },
      {
        types: LogTypes,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: true,
          colors: false,
          compact: true
        }
      }
    );
    for (const type in types) {
      const defaults = {
        type,
        ...this.options.defaults,
        ...types[type]
      };
      this[type] = this._wrapLogFn(defaults);
      this[type].raw = this._wrapLogFn(
        defaults,
        true
      );
    }
    if (this.options.mockFn) {
      this.mockTypes();
    }
    this._lastLog = {};
  }
  /**
   * Gets the current log level of the Consola instance.
   *
   * @returns {number} The current log level.
   */
  get level() {
    return this.options.level;
  }
  /**
   * Sets the minimum log level that will be output by the instance.
   *
   * @param {number} level - The new log level to set.
   */
  set level(level) {
    this.options.level = _normalizeLogLevel(
      level,
      this.options.types,
      this.options.level
    );
  }
  /**
   * Displays a prompt to the user and returns the response.
   * Throw an error if `prompt` is not supported by the current configuration.
   *
   * @template T
   * @param {string} message - The message to display in the prompt.
   * @param {T} [opts] - Optional options for the prompt. See {@link PromptOptions}.
   * @returns {promise<T>} A promise that infer with the prompt options. See {@link PromptOptions}.
   */
  prompt(message, opts) {
    if (!this.options.prompt) {
      throw new Error("prompt is not supported!");
    }
    return this.options.prompt(message, opts);
  }
  /**
   * Creates a new instance of Consola, inheriting options from the current instance, with possible overrides.
   *
   * @param {Partial<ConsolaOptions>} options - Optional overrides for the new instance. See {@link ConsolaOptions}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  create(options) {
    const instance = new Consola({
      ...this.options,
      ...options
    });
    if (this._mockFn) {
      instance.mockTypes(this._mockFn);
    }
    return instance;
  }
  /**
   * Creates a new Consola instance with the specified default log object properties.
   *
   * @param {InputLogObject} defaults - Default properties to include in any log from the new instance. See {@link InputLogObject}.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withDefaults(defaults) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...defaults
      }
    });
  }
  /**
   * Creates a new Consola instance with a specified tag, which will be included in every log.
   *
   * @param {string} tag - The tag to include in each log of the new instance.
   * @returns {ConsolaInstance} A new Consola instance. See {@link ConsolaInstance}.
   */
  withTag(tag) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + tag : tag
    });
  }
  /**
   * Adds a custom reporter to the Consola instance.
   * Reporters will be called for each log message, depending on their implementation and log level.
   *
   * @param {ConsolaReporter} reporter - The reporter to add. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  addReporter(reporter) {
    this.options.reporters.push(reporter);
    return this;
  }
  /**
   * Removes a custom reporter from the Consola instance.
   * If no reporter is specified, all reporters will be removed.
   *
   * @param {ConsolaReporter} reporter - The reporter to remove. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  removeReporter(reporter) {
    if (reporter) {
      const i = this.options.reporters.indexOf(reporter);
      if (i !== -1) {
        return this.options.reporters.splice(i, 1);
      }
    } else {
      this.options.reporters.splice(0);
    }
    return this;
  }
  /**
   * Replaces all reporters of the Consola instance with the specified array of reporters.
   *
   * @param {ConsolaReporter[]} reporters - The new reporters to set. See {@link ConsolaReporter}.
   * @returns {Consola} The current Consola instance.
   */
  setReporters(reporters) {
    this.options.reporters = Array.isArray(reporters) ? reporters : [reporters];
    return this;
  }
  wrapAll() {
    this.wrapConsole();
    this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole();
    this.restoreStd();
  }
  /**
   * Overrides console methods with Consola logging methods for consistent logging.
   */
  wrapConsole() {
    for (const type in this.options.types) {
      if (!console["__" + type]) {
        console["__" + type] = console[type];
      }
      console[type] = this[type].raw;
    }
  }
  /**
   * Restores the original console methods, removing Consola overrides.
   */
  restoreConsole() {
    for (const type in this.options.types) {
      if (console["__" + type]) {
        console[type] = console["__" + type];
        delete console["__" + type];
      }
    }
  }
  /**
   * Overrides standard output and error streams to redirect them through Consola.
   */
  wrapStd() {
    this._wrapStream(this.options.stdout, "log");
    this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(stream, type) {
    if (!stream) {
      return;
    }
    if (!stream.__write) {
      stream.__write = stream.write;
    }
    stream.write = (data) => {
      this[type].raw(String(data).trim());
    };
  }
  /**
   * Restores the original standard output and error streams, removing the Consola redirection.
   */
  restoreStd() {
    this._restoreStream(this.options.stdout);
    this._restoreStream(this.options.stderr);
  }
  _restoreStream(stream) {
    if (!stream) {
      return;
    }
    if (stream.__write) {
      stream.write = stream.__write;
      delete stream.__write;
    }
  }
  /**
   * Pauses logging, queues incoming logs until resumed.
   */
  pauseLogs() {
    paused = true;
  }
  /**
   * Resumes logging, processing any queued logs.
   */
  resumeLogs() {
    paused = false;
    const _queue = queue.splice(0);
    for (const item of _queue) {
      item[0]._logFn(item[1], item[2]);
    }
  }
  /**
   * Replaces logging methods with mocks if a mock function is provided.
   *
   * @param {ConsolaOptions["mockFn"]} mockFn - The function to use for mocking logging methods. See {@link ConsolaOptions["mockFn"]}.
   */
  mockTypes(mockFn) {
    const _mockFn = mockFn || this.options.mockFn;
    this._mockFn = _mockFn;
    if (typeof _mockFn !== "function") {
      return;
    }
    for (const type in this.options.types) {
      this[type] = _mockFn(type, this.options.types[type]) || this[type];
      this[type].raw = this[type];
    }
  }
  _wrapLogFn(defaults, isRaw) {
    return (...args) => {
      if (paused) {
        queue.push([this, defaults, args, isRaw]);
        return;
      }
      return this._logFn(defaults, args, isRaw);
    };
  }
  _logFn(defaults, args, isRaw) {
    if ((defaults.level || 0) > this.level) {
      return false;
    }
    const logObj = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...defaults,
      level: _normalizeLogLevel(defaults.level, this.options.types)
    };
    if (!isRaw && args.length === 1 && isLogObj(args[0])) {
      Object.assign(logObj, args[0]);
    } else {
      logObj.args = [...args];
    }
    if (logObj.message) {
      logObj.args.unshift(logObj.message);
      delete logObj.message;
    }
    if (logObj.additional) {
      if (!Array.isArray(logObj.additional)) {
        logObj.additional = logObj.additional.split("\n");
      }
      logObj.args.push("\n" + logObj.additional.join("\n"));
      delete logObj.additional;
    }
    logObj.type = typeof logObj.type === "string" ? logObj.type.toLowerCase() : "log";
    logObj.tag = typeof logObj.tag === "string" ? logObj.tag : "";
    const resolveLog = (newLog = false) => {
      const repeated = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && repeated > 0) {
        const args2 = [...this._lastLog.object.args];
        if (repeated > 1) {
          args2.push(`(repeated ${repeated} times)`);
        }
        this._log({ ...this._lastLog.object, args: args2 });
        this._lastLog.count = 1;
      }
      if (newLog) {
        this._lastLog.object = logObj;
        this._log(logObj);
      }
    };
    clearTimeout(this._lastLog.timeout);
    const diffTime = this._lastLog.time && logObj.date ? logObj.date.getTime() - this._lastLog.time.getTime() : 0;
    this._lastLog.time = logObj.date;
    if (diffTime < this.options.throttle) {
      try {
        const serializedLog = JSON.stringify([
          logObj.type,
          logObj.tag,
          logObj.args
        ]);
        const isSameLog = this._lastLog.serialized === serializedLog;
        this._lastLog.serialized = serializedLog;
        if (isSameLog) {
          this._lastLog.count = (this._lastLog.count || 0) + 1;
          if (this._lastLog.count > this.options.throttleMin) {
            this._lastLog.timeout = setTimeout(
              resolveLog,
              this.options.throttle
            );
            return;
          }
        }
      } catch {
      }
    }
    resolveLog(true);
  }
  _log(logObj) {
    for (const reporter of this.options.reporters) {
      reporter.log(logObj, {
        options: this.options
      });
    }
  }
}
function _normalizeLogLevel(input, types = {}, defaultLevel = 3) {
  if (input === void 0) {
    return defaultLevel;
  }
  if (typeof input === "number") {
    return input;
  }
  if (types[input] && types[input].level !== void 0) {
    return types[input].level;
  }
  return defaultLevel;
}
Consola.prototype.add = Consola.prototype.addReporter;
Consola.prototype.remove = Consola.prototype.removeReporter;
Consola.prototype.clear = Consola.prototype.removeReporter;
Consola.prototype.withScope = Consola.prototype.withTag;
Consola.prototype.mock = Consola.prototype.mockTypes;
Consola.prototype.pause = Consola.prototype.pauseLogs;
Consola.prototype.resume = Consola.prototype.resumeLogs;
function createConsola$1(options = {}) {
  return new Consola(options);
}

function parseStack(stack, message) {
  const cwd = process.cwd() + sep;
  const lines = stack.split("\n").splice(message.split("\n").length).map((l) => l.trim().replace("file://", "").replace(cwd, ""));
  return lines;
}

function writeStream(data, stream) {
  const write = stream.__write || stream.write;
  return write.call(stream, data);
}

const bracket = (x) => x ? `[${x}]` : "";
class BasicReporter {
  formatStack(stack, message, opts) {
    const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
    return indent + parseStack(stack, message).join(`
${indent}`);
  }
  formatError(err, opts) {
    const message = err.message ?? formatWithOptions(opts, err);
    const stack = err.stack ? this.formatStack(err.stack, message, opts) : "";
    const level = opts?.errorLevel || 0;
    const causedPrefix = level > 0 ? `${"  ".repeat(level)}[cause]: ` : "";
    const causedError = err.cause ? "\n\n" + this.formatError(err.cause, { ...opts, errorLevel: level + 1 }) : "";
    return causedPrefix + message + "\n" + stack + causedError;
  }
  formatArgs(args, opts) {
    const _args = args.map((arg) => {
      if (arg && typeof arg.stack === "string") {
        return this.formatError(arg, opts);
      }
      return arg;
    });
    return formatWithOptions(opts, ..._args);
  }
  formatDate(date, opts) {
    return opts.date ? date.toLocaleTimeString() : "";
  }
  filterAndJoin(arr) {
    return arr.filter(Boolean).join(" ");
  }
  formatLogObj(logObj, opts) {
    const message = this.formatArgs(logObj.args, opts);
    if (logObj.type === "box") {
      return "\n" + [
        bracket(logObj.tag),
        logObj.title && logObj.title,
        ...message.split("\n")
      ].filter(Boolean).map((l) => " > " + l).join("\n") + "\n";
    }
    return this.filterAndJoin([
      bracket(logObj.type),
      bracket(logObj.tag),
      message
    ]);
  }
  log(logObj, ctx) {
    const line = this.formatLogObj(logObj, {
      columns: ctx.options.stdout.columns || 0,
      ...ctx.options.formatOptions
    });
    return writeStream(
      line + "\n",
      logObj.level < 2 ? ctx.options.stderr || process.stderr : ctx.options.stdout || process.stdout
    );
  }
}

const {
  env = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
const isForced = "FORCE_COLOR" in env || argv.includes("--color");
const isWindows = platform === "win32";
const isDumbTerminal = env.TERM === "dumb";
const isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
const isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
function replaceClose(index, string, close, replace, head = string.slice(0, Math.max(0, index)) + replace, tail = string.slice(Math.max(0, index + close.length)), next = tail.indexOf(close)) {
  return head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
}
function clearBleed(index, string, open, close, replace) {
  return index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
}
function filterEmpty(open, close, replace = open, at = open.length + 1) {
  return (string) => string || !(string === "" || string === void 0) ? clearBleed(
    ("" + string).indexOf(close, at),
    string,
    open,
    close,
    replace
  ) : "";
}
function init(open, close, replace) {
  return filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
}
const colorDefs = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
function createColors(useColor = isColorSupported) {
  return useColor ? colorDefs : Object.fromEntries(Object.keys(colorDefs).map((key) => [key, String]));
}
const colors = createColors();
function getColor$1(color, fallback = "reset") {
  return colors[color] || colors[fallback];
}

const ansiRegex$1 = [
  String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`,
  String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))`
].join("|");
function stripAnsi$1(text) {
  return text.replace(new RegExp(ansiRegex$1, "g"), "");
}

const boxStylePresets = {
  solid: {
    tl: "\u250C",
    tr: "\u2510",
    bl: "\u2514",
    br: "\u2518",
    h: "\u2500",
    v: "\u2502"
  },
  double: {
    tl: "\u2554",
    tr: "\u2557",
    bl: "\u255A",
    br: "\u255D",
    h: "\u2550",
    v: "\u2551"
  },
  doubleSingle: {
    tl: "\u2553",
    tr: "\u2556",
    bl: "\u2559",
    br: "\u255C",
    h: "\u2500",
    v: "\u2551"
  },
  doubleSingleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2551"
  },
  singleThick: {
    tl: "\u250F",
    tr: "\u2513",
    bl: "\u2517",
    br: "\u251B",
    h: "\u2501",
    v: "\u2503"
  },
  singleDouble: {
    tl: "\u2552",
    tr: "\u2555",
    bl: "\u2558",
    br: "\u255B",
    h: "\u2550",
    v: "\u2502"
  },
  singleDoubleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2550",
    v: "\u2502"
  },
  rounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2502"
  }
};
const defaultStyle = {
  borderColor: "white",
  borderStyle: "rounded",
  valign: "center",
  padding: 2,
  marginLeft: 1,
  marginTop: 1,
  marginBottom: 1
};
function box(text, _opts = {}) {
  const opts = {
    ..._opts,
    style: {
      ...defaultStyle,
      ..._opts.style
    }
  };
  const textLines = text.split("\n");
  const boxLines = [];
  const _color = getColor$1(opts.style.borderColor);
  const borderStyle = {
    ...typeof opts.style.borderStyle === "string" ? boxStylePresets[opts.style.borderStyle] || boxStylePresets.solid : opts.style.borderStyle
  };
  if (_color) {
    for (const key in borderStyle) {
      borderStyle[key] = _color(
        borderStyle[key]
      );
    }
  }
  const paddingOffset = opts.style.padding % 2 === 0 ? opts.style.padding : opts.style.padding + 1;
  const height = textLines.length + paddingOffset;
  const width = Math.max(
    ...textLines.map((line) => stripAnsi$1(line).length),
    opts.title ? stripAnsi$1(opts.title).length : 0
  ) + paddingOffset;
  const widthOffset = width + paddingOffset;
  const leftSpace = opts.style.marginLeft > 0 ? " ".repeat(opts.style.marginLeft) : "";
  if (opts.style.marginTop > 0) {
    boxLines.push("".repeat(opts.style.marginTop));
  }
  if (opts.title) {
    const title = _color ? _color(opts.title) : opts.title;
    const left = borderStyle.h.repeat(
      Math.floor((width - stripAnsi$1(opts.title).length) / 2)
    );
    const right = borderStyle.h.repeat(
      width - stripAnsi$1(opts.title).length - stripAnsi$1(left).length + paddingOffset
    );
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${left}${title}${right}${borderStyle.tr}`
    );
  } else {
    boxLines.push(
      `${leftSpace}${borderStyle.tl}${borderStyle.h.repeat(widthOffset)}${borderStyle.tr}`
    );
  }
  const valignOffset = opts.style.valign === "center" ? Math.floor((height - textLines.length) / 2) : opts.style.valign === "top" ? height - textLines.length - paddingOffset : height - textLines.length;
  for (let i = 0; i < height; i++) {
    if (i < valignOffset || i >= valignOffset + textLines.length) {
      boxLines.push(
        `${leftSpace}${borderStyle.v}${" ".repeat(widthOffset)}${borderStyle.v}`
      );
    } else {
      const line = textLines[i - valignOffset];
      const left = " ".repeat(paddingOffset);
      const right = " ".repeat(width - stripAnsi$1(line).length);
      boxLines.push(
        `${leftSpace}${borderStyle.v}${left}${line}${right}${borderStyle.v}`
      );
    }
  }
  boxLines.push(
    `${leftSpace}${borderStyle.bl}${borderStyle.h.repeat(widthOffset)}${borderStyle.br}`
  );
  if (opts.style.marginBottom > 0) {
    boxLines.push("".repeat(opts.style.marginBottom));
  }
  return boxLines.join("\n");
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),o=new Proxy(r,{get(e,s){return i()[s]??r[s]},has(e,s){const E=i();return s in E||s in r},set(e,s,E){const B=i(true);return B[s]=E,true},deleteProperty(e,s){if(!s)return  false;const E=i(true);return delete E[s],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"production"||"",f=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["CODESANDBOX","CODESANDBOX_HOST",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function b(){if(globalThis.process?.env)for(const e of f){const s=e[1]||e[0];if(globalThis.process?.env[s])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=b();l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(o.CI)||l.ci!==false,a=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY),g=n(o.DEBUG),R=t==="test"||n(o.TEST);n(o.MINIMAL)||T||R||!a;const A=/^win/i.test(I);!n(o.NO_COLOR)&&(n(o.FORCE_COLOR)||(a||A)&&o.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),_={versions:{}};new Proxy(y,{get(e,s){if(s==="env")return o;if(s in e)return e[s];if(s in _)return _[s]}});const c=globalThis.process?.release?.name==="node",O=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,L=!!globalThis.fastly,S=!!globalThis.Netlify,u=!!globalThis.EdgeRuntime,N=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[u,"edge-light"],[N,"workerd"],[L,"fastly"],[D,"deno"],[O,"bun"],[c,"node"]];function G(){const e=F.find(s=>s[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

function ansiRegex({onlyFirst = false} = {}) {
	// Valid string terminator sequences are BEL, ESC\, and 0x9c
	const ST = '(?:\\u0007|\\u001B\\u005C|\\u009C)';
	const pattern = [
		`[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

const regex = ansiRegex();

function stripAnsi(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	// Even though the regex is global, we don't need to reset the `.lastIndex`
	// because unlike `.exec()` and `.test()`, `.replace()` does it automatically
	// and doing it manually has a performance penalty.
	return string.replace(regex, '');
}

// Generated code.

function isAmbiguous(x) {
	return x === 0xA1
		|| x === 0xA4
		|| x === 0xA7
		|| x === 0xA8
		|| x === 0xAA
		|| x === 0xAD
		|| x === 0xAE
		|| x >= 0xB0 && x <= 0xB4
		|| x >= 0xB6 && x <= 0xBA
		|| x >= 0xBC && x <= 0xBF
		|| x === 0xC6
		|| x === 0xD0
		|| x === 0xD7
		|| x === 0xD8
		|| x >= 0xDE && x <= 0xE1
		|| x === 0xE6
		|| x >= 0xE8 && x <= 0xEA
		|| x === 0xEC
		|| x === 0xED
		|| x === 0xF0
		|| x === 0xF2
		|| x === 0xF3
		|| x >= 0xF7 && x <= 0xFA
		|| x === 0xFC
		|| x === 0xFE
		|| x === 0x101
		|| x === 0x111
		|| x === 0x113
		|| x === 0x11B
		|| x === 0x126
		|| x === 0x127
		|| x === 0x12B
		|| x >= 0x131 && x <= 0x133
		|| x === 0x138
		|| x >= 0x13F && x <= 0x142
		|| x === 0x144
		|| x >= 0x148 && x <= 0x14B
		|| x === 0x14D
		|| x === 0x152
		|| x === 0x153
		|| x === 0x166
		|| x === 0x167
		|| x === 0x16B
		|| x === 0x1CE
		|| x === 0x1D0
		|| x === 0x1D2
		|| x === 0x1D4
		|| x === 0x1D6
		|| x === 0x1D8
		|| x === 0x1DA
		|| x === 0x1DC
		|| x === 0x251
		|| x === 0x261
		|| x === 0x2C4
		|| x === 0x2C7
		|| x >= 0x2C9 && x <= 0x2CB
		|| x === 0x2CD
		|| x === 0x2D0
		|| x >= 0x2D8 && x <= 0x2DB
		|| x === 0x2DD
		|| x === 0x2DF
		|| x >= 0x300 && x <= 0x36F
		|| x >= 0x391 && x <= 0x3A1
		|| x >= 0x3A3 && x <= 0x3A9
		|| x >= 0x3B1 && x <= 0x3C1
		|| x >= 0x3C3 && x <= 0x3C9
		|| x === 0x401
		|| x >= 0x410 && x <= 0x44F
		|| x === 0x451
		|| x === 0x2010
		|| x >= 0x2013 && x <= 0x2016
		|| x === 0x2018
		|| x === 0x2019
		|| x === 0x201C
		|| x === 0x201D
		|| x >= 0x2020 && x <= 0x2022
		|| x >= 0x2024 && x <= 0x2027
		|| x === 0x2030
		|| x === 0x2032
		|| x === 0x2033
		|| x === 0x2035
		|| x === 0x203B
		|| x === 0x203E
		|| x === 0x2074
		|| x === 0x207F
		|| x >= 0x2081 && x <= 0x2084
		|| x === 0x20AC
		|| x === 0x2103
		|| x === 0x2105
		|| x === 0x2109
		|| x === 0x2113
		|| x === 0x2116
		|| x === 0x2121
		|| x === 0x2122
		|| x === 0x2126
		|| x === 0x212B
		|| x === 0x2153
		|| x === 0x2154
		|| x >= 0x215B && x <= 0x215E
		|| x >= 0x2160 && x <= 0x216B
		|| x >= 0x2170 && x <= 0x2179
		|| x === 0x2189
		|| x >= 0x2190 && x <= 0x2199
		|| x === 0x21B8
		|| x === 0x21B9
		|| x === 0x21D2
		|| x === 0x21D4
		|| x === 0x21E7
		|| x === 0x2200
		|| x === 0x2202
		|| x === 0x2203
		|| x === 0x2207
		|| x === 0x2208
		|| x === 0x220B
		|| x === 0x220F
		|| x === 0x2211
		|| x === 0x2215
		|| x === 0x221A
		|| x >= 0x221D && x <= 0x2220
		|| x === 0x2223
		|| x === 0x2225
		|| x >= 0x2227 && x <= 0x222C
		|| x === 0x222E
		|| x >= 0x2234 && x <= 0x2237
		|| x === 0x223C
		|| x === 0x223D
		|| x === 0x2248
		|| x === 0x224C
		|| x === 0x2252
		|| x === 0x2260
		|| x === 0x2261
		|| x >= 0x2264 && x <= 0x2267
		|| x === 0x226A
		|| x === 0x226B
		|| x === 0x226E
		|| x === 0x226F
		|| x === 0x2282
		|| x === 0x2283
		|| x === 0x2286
		|| x === 0x2287
		|| x === 0x2295
		|| x === 0x2299
		|| x === 0x22A5
		|| x === 0x22BF
		|| x === 0x2312
		|| x >= 0x2460 && x <= 0x24E9
		|| x >= 0x24EB && x <= 0x254B
		|| x >= 0x2550 && x <= 0x2573
		|| x >= 0x2580 && x <= 0x258F
		|| x >= 0x2592 && x <= 0x2595
		|| x === 0x25A0
		|| x === 0x25A1
		|| x >= 0x25A3 && x <= 0x25A9
		|| x === 0x25B2
		|| x === 0x25B3
		|| x === 0x25B6
		|| x === 0x25B7
		|| x === 0x25BC
		|| x === 0x25BD
		|| x === 0x25C0
		|| x === 0x25C1
		|| x >= 0x25C6 && x <= 0x25C8
		|| x === 0x25CB
		|| x >= 0x25CE && x <= 0x25D1
		|| x >= 0x25E2 && x <= 0x25E5
		|| x === 0x25EF
		|| x === 0x2605
		|| x === 0x2606
		|| x === 0x2609
		|| x === 0x260E
		|| x === 0x260F
		|| x === 0x261C
		|| x === 0x261E
		|| x === 0x2640
		|| x === 0x2642
		|| x === 0x2660
		|| x === 0x2661
		|| x >= 0x2663 && x <= 0x2665
		|| x >= 0x2667 && x <= 0x266A
		|| x === 0x266C
		|| x === 0x266D
		|| x === 0x266F
		|| x === 0x269E
		|| x === 0x269F
		|| x === 0x26BF
		|| x >= 0x26C6 && x <= 0x26CD
		|| x >= 0x26CF && x <= 0x26D3
		|| x >= 0x26D5 && x <= 0x26E1
		|| x === 0x26E3
		|| x === 0x26E8
		|| x === 0x26E9
		|| x >= 0x26EB && x <= 0x26F1
		|| x === 0x26F4
		|| x >= 0x26F6 && x <= 0x26F9
		|| x === 0x26FB
		|| x === 0x26FC
		|| x === 0x26FE
		|| x === 0x26FF
		|| x === 0x273D
		|| x >= 0x2776 && x <= 0x277F
		|| x >= 0x2B56 && x <= 0x2B59
		|| x >= 0x3248 && x <= 0x324F
		|| x >= 0xE000 && x <= 0xF8FF
		|| x >= 0xFE00 && x <= 0xFE0F
		|| x === 0xFFFD
		|| x >= 0x1F100 && x <= 0x1F10A
		|| x >= 0x1F110 && x <= 0x1F12D
		|| x >= 0x1F130 && x <= 0x1F169
		|| x >= 0x1F170 && x <= 0x1F18D
		|| x === 0x1F18F
		|| x === 0x1F190
		|| x >= 0x1F19B && x <= 0x1F1AC
		|| x >= 0xE0100 && x <= 0xE01EF
		|| x >= 0xF0000 && x <= 0xFFFFD
		|| x >= 0x100000 && x <= 0x10FFFD;
}

function isFullWidth(x) {
	return x === 0x3000
		|| x >= 0xFF01 && x <= 0xFF60
		|| x >= 0xFFE0 && x <= 0xFFE6;
}

function isWide(x) {
	return x >= 0x1100 && x <= 0x115F
		|| x === 0x231A
		|| x === 0x231B
		|| x === 0x2329
		|| x === 0x232A
		|| x >= 0x23E9 && x <= 0x23EC
		|| x === 0x23F0
		|| x === 0x23F3
		|| x === 0x25FD
		|| x === 0x25FE
		|| x === 0x2614
		|| x === 0x2615
		|| x >= 0x2630 && x <= 0x2637
		|| x >= 0x2648 && x <= 0x2653
		|| x === 0x267F
		|| x >= 0x268A && x <= 0x268F
		|| x === 0x2693
		|| x === 0x26A1
		|| x === 0x26AA
		|| x === 0x26AB
		|| x === 0x26BD
		|| x === 0x26BE
		|| x === 0x26C4
		|| x === 0x26C5
		|| x === 0x26CE
		|| x === 0x26D4
		|| x === 0x26EA
		|| x === 0x26F2
		|| x === 0x26F3
		|| x === 0x26F5
		|| x === 0x26FA
		|| x === 0x26FD
		|| x === 0x2705
		|| x === 0x270A
		|| x === 0x270B
		|| x === 0x2728
		|| x === 0x274C
		|| x === 0x274E
		|| x >= 0x2753 && x <= 0x2755
		|| x === 0x2757
		|| x >= 0x2795 && x <= 0x2797
		|| x === 0x27B0
		|| x === 0x27BF
		|| x === 0x2B1B
		|| x === 0x2B1C
		|| x === 0x2B50
		|| x === 0x2B55
		|| x >= 0x2E80 && x <= 0x2E99
		|| x >= 0x2E9B && x <= 0x2EF3
		|| x >= 0x2F00 && x <= 0x2FD5
		|| x >= 0x2FF0 && x <= 0x2FFF
		|| x >= 0x3001 && x <= 0x303E
		|| x >= 0x3041 && x <= 0x3096
		|| x >= 0x3099 && x <= 0x30FF
		|| x >= 0x3105 && x <= 0x312F
		|| x >= 0x3131 && x <= 0x318E
		|| x >= 0x3190 && x <= 0x31E5
		|| x >= 0x31EF && x <= 0x321E
		|| x >= 0x3220 && x <= 0x3247
		|| x >= 0x3250 && x <= 0xA48C
		|| x >= 0xA490 && x <= 0xA4C6
		|| x >= 0xA960 && x <= 0xA97C
		|| x >= 0xAC00 && x <= 0xD7A3
		|| x >= 0xF900 && x <= 0xFAFF
		|| x >= 0xFE10 && x <= 0xFE19
		|| x >= 0xFE30 && x <= 0xFE52
		|| x >= 0xFE54 && x <= 0xFE66
		|| x >= 0xFE68 && x <= 0xFE6B
		|| x >= 0x16FE0 && x <= 0x16FE4
		|| x === 0x16FF0
		|| x === 0x16FF1
		|| x >= 0x17000 && x <= 0x187F7
		|| x >= 0x18800 && x <= 0x18CD5
		|| x >= 0x18CFF && x <= 0x18D08
		|| x >= 0x1AFF0 && x <= 0x1AFF3
		|| x >= 0x1AFF5 && x <= 0x1AFFB
		|| x === 0x1AFFD
		|| x === 0x1AFFE
		|| x >= 0x1B000 && x <= 0x1B122
		|| x === 0x1B132
		|| x >= 0x1B150 && x <= 0x1B152
		|| x === 0x1B155
		|| x >= 0x1B164 && x <= 0x1B167
		|| x >= 0x1B170 && x <= 0x1B2FB
		|| x >= 0x1D300 && x <= 0x1D356
		|| x >= 0x1D360 && x <= 0x1D376
		|| x === 0x1F004
		|| x === 0x1F0CF
		|| x === 0x1F18E
		|| x >= 0x1F191 && x <= 0x1F19A
		|| x >= 0x1F200 && x <= 0x1F202
		|| x >= 0x1F210 && x <= 0x1F23B
		|| x >= 0x1F240 && x <= 0x1F248
		|| x === 0x1F250
		|| x === 0x1F251
		|| x >= 0x1F260 && x <= 0x1F265
		|| x >= 0x1F300 && x <= 0x1F320
		|| x >= 0x1F32D && x <= 0x1F335
		|| x >= 0x1F337 && x <= 0x1F37C
		|| x >= 0x1F37E && x <= 0x1F393
		|| x >= 0x1F3A0 && x <= 0x1F3CA
		|| x >= 0x1F3CF && x <= 0x1F3D3
		|| x >= 0x1F3E0 && x <= 0x1F3F0
		|| x === 0x1F3F4
		|| x >= 0x1F3F8 && x <= 0x1F43E
		|| x === 0x1F440
		|| x >= 0x1F442 && x <= 0x1F4FC
		|| x >= 0x1F4FF && x <= 0x1F53D
		|| x >= 0x1F54B && x <= 0x1F54E
		|| x >= 0x1F550 && x <= 0x1F567
		|| x === 0x1F57A
		|| x === 0x1F595
		|| x === 0x1F596
		|| x === 0x1F5A4
		|| x >= 0x1F5FB && x <= 0x1F64F
		|| x >= 0x1F680 && x <= 0x1F6C5
		|| x === 0x1F6CC
		|| x >= 0x1F6D0 && x <= 0x1F6D2
		|| x >= 0x1F6D5 && x <= 0x1F6D7
		|| x >= 0x1F6DC && x <= 0x1F6DF
		|| x === 0x1F6EB
		|| x === 0x1F6EC
		|| x >= 0x1F6F4 && x <= 0x1F6FC
		|| x >= 0x1F7E0 && x <= 0x1F7EB
		|| x === 0x1F7F0
		|| x >= 0x1F90C && x <= 0x1F93A
		|| x >= 0x1F93C && x <= 0x1F945
		|| x >= 0x1F947 && x <= 0x1F9FF
		|| x >= 0x1FA70 && x <= 0x1FA7C
		|| x >= 0x1FA80 && x <= 0x1FA89
		|| x >= 0x1FA8F && x <= 0x1FAC6
		|| x >= 0x1FACE && x <= 0x1FADC
		|| x >= 0x1FADF && x <= 0x1FAE9
		|| x >= 0x1FAF0 && x <= 0x1FAF8
		|| x >= 0x20000 && x <= 0x2FFFD
		|| x >= 0x30000 && x <= 0x3FFFD;
}

function validate(codePoint) {
	if (!Number.isSafeInteger(codePoint)) {
		throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
	}
}

function eastAsianWidth(codePoint, {ambiguousAsWide = false} = {}) {
	validate(codePoint);

	if (
		isFullWidth(codePoint)
		|| isWide(codePoint)
		|| (ambiguousAsWide && isAmbiguous(codePoint))
	) {
		return 2;
	}

	return 1;
}

const emojiRegex = () => {
	// https://mths.be/emoji
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

const segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter() : { segment: (str) => str.split('') };

const defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;

function stringWidth$1(string, options = {}) {
	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	const {
		ambiguousIsNarrow = true,
		countAnsiEscapeCodes = false,
	} = options;

	if (!countAnsiEscapeCodes) {
		string = stripAnsi(string);
	}

	if (string.length === 0) {
		return 0;
	}

	let width = 0;
	const eastAsianWidthOptions = {ambiguousAsWide: !ambiguousIsNarrow};

	for (const {segment: character} of segmenter.segment(string)) {
		const codePoint = character.codePointAt(0);

		// Ignore control characters
		if (codePoint <= 0x1F || (codePoint >= 0x7F && codePoint <= 0x9F)) {
			continue;
		}

		// Ignore zero-width characters
		if (
			(codePoint >= 0x20_0B && codePoint <= 0x20_0F) // Zero-width space, non-joiner, joiner, left-to-right mark, right-to-left mark
			|| codePoint === 0xFE_FF // Zero-width no-break space
		) {
			continue;
		}

		// Ignore combining characters
		if (
			(codePoint >= 0x3_00 && codePoint <= 0x3_6F) // Combining diacritical marks
			|| (codePoint >= 0x1A_B0 && codePoint <= 0x1A_FF) // Combining diacritical marks extended
			|| (codePoint >= 0x1D_C0 && codePoint <= 0x1D_FF) // Combining diacritical marks supplement
			|| (codePoint >= 0x20_D0 && codePoint <= 0x20_FF) // Combining diacritical marks for symbols
			|| (codePoint >= 0xFE_20 && codePoint <= 0xFE_2F) // Combining half marks
		) {
			continue;
		}

		// Ignore surrogate pairs
		if (codePoint >= 0xD8_00 && codePoint <= 0xDF_FF) {
			continue;
		}

		// Ignore variation selectors
		if (codePoint >= 0xFE_00 && codePoint <= 0xFE_0F) {
			continue;
		}

		// This covers some of the above cases, but we still keep them for performance reasons.
		if (defaultIgnorableCodePointRegex.test(character)) {
			continue;
		}

		// TODO: Use `/\p{RGI_Emoji}/v` when targeting Node.js 20.
		if (emojiRegex().test(character)) {
			width += 2;
			continue;
		}

		width += eastAsianWidth(codePoint, eastAsianWidthOptions);
	}

	return width;
}

function isUnicodeSupported() {
	const {env} = g$1;
	const {TERM, TERM_PROGRAM} = env;

	if (g$1.platform !== 'win32') {
		return TERM !== 'linux'; // Linux console (kernel)
	}

	return Boolean(env.WT_SESSION) // Windows Terminal
		|| Boolean(env.TERMINUS_SUBLIME) // Terminus (<0.2.27)
		|| env.ConEmuTask === '{cmd::Cmder}' // ConEmu and cmder
		|| TERM_PROGRAM === 'Terminus-Sublime'
		|| TERM_PROGRAM === 'vscode'
		|| TERM === 'xterm-256color'
		|| TERM === 'alacritty'
		|| TERM === 'rxvt-unicode'
		|| TERM === 'rxvt-unicode-256color'
		|| env.TERMINAL_EMULATOR === 'JetBrains-JediTerm';
}

const TYPE_COLOR_MAP = {
  info: "cyan",
  fail: "red",
  success: "green",
  ready: "green",
  start: "magenta"
};
const LEVEL_COLOR_MAP = {
  0: "red",
  1: "yellow"
};
const unicode = isUnicodeSupported();
const s = (c, fallback) => unicode ? c : fallback;
const TYPE_ICONS = {
  error: s("\u2716", "\xD7"),
  fatal: s("\u2716", "\xD7"),
  ready: s("\u2714", "\u221A"),
  warn: s("\u26A0", "\u203C"),
  info: s("\u2139", "i"),
  success: s("\u2714", "\u221A"),
  debug: s("\u2699", "D"),
  trace: s("\u2192", "\u2192"),
  fail: s("\u2716", "\xD7"),
  start: s("\u25D0", "o"),
  log: ""
};
function stringWidth(str) {
  const hasICU = typeof Intl === "object";
  if (!hasICU || !Intl.Segmenter) {
    return stripAnsi$1(str).length;
  }
  return stringWidth$1(str);
}
class FancyReporter extends BasicReporter {
  formatStack(stack, message, opts) {
    const indent = "  ".repeat((opts?.errorLevel || 0) + 1);
    return `
${indent}` + parseStack(stack, message).map(
      (line) => "  " + line.replace(/^at +/, (m) => colors.gray(m)).replace(/\((.+)\)/, (_, m) => `(${colors.cyan(m)})`)
    ).join(`
${indent}`);
  }
  formatType(logObj, isBadge, opts) {
    const typeColor = TYPE_COLOR_MAP[logObj.type] || LEVEL_COLOR_MAP[logObj.level] || "gray";
    if (isBadge) {
      return getBgColor(typeColor)(
        colors.black(` ${logObj.type.toUpperCase()} `)
      );
    }
    const _type = typeof TYPE_ICONS[logObj.type] === "string" ? TYPE_ICONS[logObj.type] : logObj.icon || logObj.type;
    return _type ? getColor(typeColor)(_type) : "";
  }
  formatLogObj(logObj, opts) {
    const [message, ...additional] = this.formatArgs(logObj.args, opts).split(
      "\n"
    );
    if (logObj.type === "box") {
      return box(
        characterFormat(
          message + (additional.length > 0 ? "\n" + additional.join("\n") : "")
        ),
        {
          title: logObj.title ? characterFormat(logObj.title) : void 0,
          style: logObj.style
        }
      );
    }
    const date = this.formatDate(logObj.date, opts);
    const coloredDate = date && colors.gray(date);
    const isBadge = logObj.badge ?? logObj.level < 2;
    const type = this.formatType(logObj, isBadge, opts);
    const tag = logObj.tag ? colors.gray(logObj.tag) : "";
    let line;
    const left = this.filterAndJoin([type, characterFormat(message)]);
    const right = this.filterAndJoin(opts.columns ? [tag, coloredDate] : [tag]);
    const space = (opts.columns || 0) - stringWidth(left) - stringWidth(right) - 2;
    line = space > 0 && (opts.columns || 0) >= 80 ? left + " ".repeat(space) + right : (right ? `${colors.gray(`[${right}]`)} ` : "") + left;
    line += characterFormat(
      additional.length > 0 ? "\n" + additional.join("\n") : ""
    );
    if (logObj.type === "trace") {
      const _err = new Error("Trace: " + logObj.message);
      line += this.formatStack(_err.stack || "", _err.message);
    }
    return isBadge ? "\n" + line + "\n" : line;
  }
}
function characterFormat(str) {
  return str.replace(/`([^`]+)`/gm, (_, m) => colors.cyan(m)).replace(/\s+_([^_]+)_\s+/gm, (_, m) => ` ${colors.underline(m)} `);
}
function getColor(color = "white") {
  return colors[color] || colors.white;
}
function getBgColor(color = "bgWhite") {
  return colors[`bg${color[0].toUpperCase()}${color.slice(1)}`] || colors.bgWhite;
}

function createConsola(options = {}) {
  let level = _getDefaultLogLevel();
  if (process.env.CONSOLA_LEVEL) {
    level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
  }
  const consola2 = createConsola$1({
    level,
    defaults: { level },
    stdout: process.stdout,
    stderr: process.stderr,
    prompt: (...args) => import('../_/prompt.mjs').then((m) => m.prompt(...args)),
    reporters: options.reporters || [
      options.fancy ?? !(T || R) ? new FancyReporter() : new BasicReporter()
    ],
    ...options
  });
  return consola2;
}
function _getDefaultLogLevel() {
  if (g) {
    return LogLevels.debug;
  }
  if (R) {
    return LogLevels.warn;
  }
  return LogLevels.info;
}
createConsola();

const producktiveGlass = "" + buildAssetsURL("producktive-glass.rsyVFddj.png");
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "hero",
        class: "relative min-h-screen flex items-center pt-16 overflow-hidden",
        "aria-labelledby": "hero-heading"
      }, _attrs))}><div class="glow-orb w-[600px] h-[600px] bg-brand-primary top-[-200px] left-[-200px]" aria-hidden="true"></div><div class="glow-orb w-[400px] h-[400px] bg-brand-accent bottom-[-100px] right-[-100px]" aria-hidden="true"></div><div class="absolute inset-0 opacity-[0.04]" style="${ssrRenderStyle({ "background-image": "linear-gradient(rgba(0, 229, 255, 1) 1px, transparent 1px),\r\n          linear-gradient(90deg, rgba(0, 229, 255, 1) 1px, transparent 1px)", "background-size": "48px 48px" })}" aria-hidden="true"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"><div class="grid lg:grid-cols-2 gap-16 items-center"><div class="flex flex-col gap-6"><div class="inline-flex items-center gap-2 w-fit reveal"><span class="badge"><span class="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" aria-hidden="true"></span> ${ssrInterpolate(unref(t)("hero.badge"))}</span></div><h1 id="hero-heading" class="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] tracking-tight reveal">${ssrInterpolate(unref(t)("hero.titleLine1"))}<br><span class="text-gradient-animate">${ssrInterpolate(unref(t)("hero.titleLine2"))}<br>${ssrInterpolate(unref(t)("hero.titleLine3"))}</span></h1><p class="text-brand-muted text-lg leading-relaxed max-w-lg reveal">${ssrInterpolate(unref(t)("hero.subtitle", { highlight: unref(t)("hero.subtitleHighlight") }).split(unref(t)("hero.subtitleHighlight"))[0])}<strong class="text-white">${ssrInterpolate(unref(t)("hero.subtitleHighlight"))}</strong>${ssrInterpolate(unref(t)("hero.subtitle", { highlight: unref(t)("hero.subtitleHighlight") }).split(unref(t)("hero.subtitleHighlight")).slice(1).join(unref(t)("hero.subtitleHighlight")))}</p><div class="flex flex-wrap gap-3 reveal"><a href="#kontakt" class="btn-primary text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">${ssrInterpolate(unref(t)("hero.ctaPrimary"))} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a><a href="#portfolio" class="btn-secondary text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">${ssrInterpolate(unref(t)("hero.ctaSecondary"))} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></a></div><div class="flex flex-wrap items-center gap-4 text-sm text-brand-muted reveal"><span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(t)("hero.proof1"))}</span><span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(t)("hero.proof2"))}</span><span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> ${ssrInterpolate(unref(t)("hero.proof3"))}</span></div></div><div class="hidden lg:flex justify-center items-center reveal"><div class="relative motion-safe:animate-float"><div class="rounded-3xl overflow-hidden shadow-brand backdrop-blur-md bg-white/5 border border-brand-primary/25 p-1.5"><img${ssrRenderAttr("src", unref(producktiveGlass))} alt="Producktive \u2014 dynamika i charakter strony" class="w-80 rounded-2xl object-cover" width="320" loading="eager"></div><div class="absolute -top-4 -right-6 badge-accent text-xs px-3 py-1.5 motion-safe:animate-pulse-slow" aria-hidden="true">${ssrInterpolate(unref(t)("hero.mockupBadge1"))}</div><div class="absolute -bottom-4 -left-6 badge text-xs px-3 py-1.5" aria-hidden="true">${ssrInterpolate(unref(t)("hero.mockupBadge2"))}</div></div></div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted text-xs motion-safe:animate-bounce"${ssrRenderAttr("aria-label", unref(t)("a11y.scrollDown"))} aria-hidden="true"><span>${ssrInterpolate(unref(t)("hero.scroll"))}</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Hero.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TrustBar",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const items = [
      {
        label: "Vue 3 + Nuxt",
        tooltip: "Framework frontendowy i meta-framework SSR/SSG",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4l9 15L21 4M9 4l3 5 3-5"/></svg>`
      },
      {
        label: "TailwindCSS",
        tooltip: "Utility-first framework CSS do stylowania",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 10h12M4 14h8M4 18h4"/></svg>`
      },
      {
        label: "Supabase",
        tooltip: "Open-source platforma backend: baza danych, auth, API",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="7" rx="9" ry="4"/><path d="M3 7v5a9 4 0 0018 0V7"/><path d="M3 12v5a9 4 0 0018 0v-5"/></svg>`
      },
      {
        label: "Vercel Edge",
        tooltip: "Platforma deploymentu z globaln\u0105 sieci\u0105 CDN",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3L22 20H2L12 3z"/></svg>`
      },
      {
        label: "TypeScript",
        tooltip: "Silnie typowany nadzbi\xF3r JavaScript",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
      },
      {
        label: "Figma",
        tooltip: "Narz\u0119dzie do projektowania UI/UX i prototypowania",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="6" height="6" rx="2"/><rect x="13" y="2" width="6" height="6" rx="2"/><rect x="5" y="10" width="6" height="6" rx="2"/><rect x="5" y="18" width="6" height="6" rx="2"/><circle cx="16" cy="16" r="3"/></svg>`
      },
      {
        label: "Node.js",
        tooltip: "\u015Arodowisko uruchomieniowe JavaScript po stronie serwera",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
      },
      {
        label: "SSR / SSG",
        tooltip: "Server-Side Rendering / Static Site Generation \u2014 strony generowane po stronie serwera lub statycznie",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative border-y border-brand-primary/10 bg-brand-card/30 overflow-hidden py-4",
        role: "complementary",
        "aria-label": unref(t)("trustBar.label")
      }, _attrs))} data-v-6dba4e8d><div class="flex items-center gap-4 text-xs text-brand-muted mb-3 max-w-6xl mx-auto px-4" data-v-6dba4e8d><div class="divider-gradient flex-1 my-0" aria-hidden="true" data-v-6dba4e8d></div><span class="shrink-0" data-v-6dba4e8d>${ssrInterpolate(unref(t)("trustBar.label"))}</span><div class="divider-gradient flex-1 my-0" aria-hidden="true" data-v-6dba4e8d></div></div><div class="flex overflow-hidden" aria-hidden="true" data-v-6dba4e8d><div class="flex gap-10 shrink-0 animate-marquee" data-v-6dba4e8d><!--[-->`);
      ssrRenderList(items, (item, i) => {
        var _a;
        _push(`<div class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0 group relative" data-v-6dba4e8d><span class="w-4 h-4 text-brand-primary shrink-0" data-v-6dba4e8d>${(_a = item.svg) != null ? _a : ""}</span><span class="font-mono" data-v-6dba4e8d>${ssrInterpolate(item.label)}</span><span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-card border border-brand-primary/20 text-brand-text text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-card" data-v-6dba4e8d>${ssrInterpolate(item.tooltip)}</span></div>`);
      });
      _push(`<!--]--></div><div class="flex gap-10 shrink-0 animate-marquee" aria-hidden="true" data-v-6dba4e8d><!--[-->`);
      ssrRenderList(items, (item, i) => {
        var _a;
        _push(`<div class="flex items-center gap-2 text-brand-muted whitespace-nowrap text-sm shrink-0" data-v-6dba4e8d><span class="w-4 h-4 text-brand-primary shrink-0" data-v-6dba4e8d>${(_a = item.svg) != null ? _a : ""}</span><span class="font-mono" data-v-6dba4e8d>${ssrInterpolate(item.label)}</span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/TrustBar.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6dba4e8d"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const skills = [
      {
        categoryKey: "frontend",
        items: ["Vue 3", "Nuxt", "TypeScript", "TailwindCSS", "Vite"]
      },
      {
        categoryKey: "backend",
        items: ["Node.js", "Supabase", "PostgreSQL", "REST API", "Edge Functions"]
      },
      {
        categoryKey: "design",
        items: ["Figma", "Design Systems", "UX Research", "Prototyping"]
      },
      {
        categoryKey: "devops",
        items: ["Vercel", "GitHub Actions", "Docker", "CI/CD"]
      }
    ];
    const values = [
      {
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
        key: "deadline"
      },
      {
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        key: "quality"
      },
      {
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
        key: "partnership"
      },
      {
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        key: "transparency"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "o-mnie",
        class: "py-24 relative overflow-hidden",
        "aria-labelledby": "about-heading"
      }, _attrs))}><div class="glow-orb w-[500px] h-[500px] bg-brand-primary/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid lg:grid-cols-2 gap-16 items-start"><div class="reveal"><span class="badge mb-4 inline-block">${ssrInterpolate(unref(t)("about.badge"))}</span><h2 id="about-heading" class="section-title mb-6">${ssrInterpolate(unref(t)("about.title"))}<br><span class="text-gradient">${ssrInterpolate(unref(t)("about.titleHighlight"))}</span></h2><div class="space-y-4 text-brand-muted leading-relaxed"><p>${ssrInterpolate(unref(t)("about.paragraph1", { brand: "Producktive" }).split("Producktive")[0])}<strong class="text-white">Producktive</strong>${ssrInterpolate(unref(t)("about.paragraph1", { brand: "Producktive" }).split("Producktive").slice(1).join("Producktive"))}</p><p>${ssrInterpolate(unref(t)("about.paragraph2", { highlight: unref(t)("about.paragraph2Highlight") }).split(unref(t)("about.paragraph2Highlight"))[0])}<strong class="text-white">${ssrInterpolate(unref(t)("about.paragraph2Highlight"))}</strong>${ssrInterpolate(unref(t)("about.paragraph2", { highlight: unref(t)("about.paragraph2Highlight") }).split(unref(t)("about.paragraph2Highlight")).slice(1).join(unref(t)("about.paragraph2Highlight")))}</p><p>${ssrInterpolate(unref(t)("about.paragraph3", { highlight: unref(t)("about.paragraph3Highlight") }).split(unref(t)("about.paragraph3Highlight"))[0])}<strong class="text-white">${ssrInterpolate(unref(t)("about.paragraph3Highlight"))}</strong>${ssrInterpolate(unref(t)("about.paragraph3", { highlight: unref(t)("about.paragraph3Highlight") }).split(unref(t)("about.paragraph3Highlight")).slice(1).join(unref(t)("about.paragraph3Highlight")))}</p><p>${ssrInterpolate(unref(t)("about.paragraph4"))}</p></div><div class="mt-6 card p-4 inline-flex flex-col gap-1"><span class="text-white font-semibold text-sm">${ssrInterpolate(unref(t)("about.location"))}</span><span class="text-brand-muted text-xs">${ssrInterpolate(unref(t)("about.locationDesc"))}</span></div><div class="mt-8 flex flex-wrap gap-3"><a href="#kontakt" class="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">${ssrInterpolate(unref(t)("about.ctaPrimary"))}</a><a href="https://www.linkedin.com/in/kamil-poniatowski-rev/" target="_blank" rel="noopener noreferrer" class="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">${ssrInterpolate(unref(t)("about.ctaLinkedIn"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg><span class="sr-only">(${ssrInterpolate(unref(t)("a11y.externalLink"))})</span></a></div></div><div class="space-y-8 reveal" style="${ssrRenderStyle({ "transition-delay": "150ms" })}"><div><h3 class="text-white font-semibold mb-4 flex items-center gap-2"><span class="badge">${ssrInterpolate(unref(t)("about.stackTitle"))}</span></h3><div class="space-y-3"><!--[-->`);
      ssrRenderList(skills, (group) => {
        _push(`<div class="flex flex-wrap items-center gap-2"><span class="text-brand-muted text-xs font-mono w-16 shrink-0">${ssrInterpolate(unref(t)(`about.skills.${group.categoryKey}`))}</span><!--[-->`);
        ssrRenderList(group.items, (skill) => {
          _push(`<span class="badge text-xs">${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div><div class="divider-gradient" aria-hidden="true"></div><div><h3 class="text-white font-semibold mb-4">${ssrInterpolate(unref(t)("about.howIWork"))}</h3><div class="grid grid-cols-2 gap-3"><!--[-->`);
      ssrRenderList(values, (v) => {
        var _a;
        _push(`<div class="card p-4 flex flex-col gap-2"><div class="text-brand-primary">${(_a = v.svgPath) != null ? _a : ""}</div><div class="font-semibold text-white text-sm">${ssrInterpolate(unref(t)(`about.values.${v.key}.title`))}</div><div class="text-brand-muted text-xs leading-relaxed">${ssrInterpolate(unref(t)(`about.values.${v.key}.desc`))}</div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/About.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Services",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const serviceIcons = {
      website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`,
      landing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      blog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
      shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
      saas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      design: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7"><circle cx="13.5" cy="6.5" r="3.5"/><circle cx="17.5" cy="13.5" r="3.5"/><circle cx="8.5" cy="14.5" r="3.5"/><circle cx="6.5" cy="7.5" r="3.5"/></svg>`
    };
    const services = computed(() => [
      {
        key: "website",
        tags: ["Vue 3", "TailwindCSS", "Vercel"],
        highlight: false,
        comingSoon: false
      },
      {
        key: "landing",
        tags: ["A/B testing", "Analytics", "Fast"],
        highlight: true,
        comingSoon: false
      },
      {
        key: "blog",
        tags: ["SEO", "CMS", "Markdown"],
        highlight: false,
        comingSoon: false
      },
      {
        key: "shop",
        tags: ["Headless", "Stripe", "Nuxt 4"],
        highlight: false,
        comingSoon: true
      },
      {
        key: "saas",
        tags: ["Vue 3", "Supabase", "Auth"],
        highlight: false,
        comingSoon: true
      },
      {
        key: "design",
        tags: ["Figma", "Prototyp", "Design System"],
        highlight: false,
        comingSoon: false,
        collaborator: true
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "uslugi",
        class: "py-24 relative",
        "aria-labelledby": "services-heading"
      }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16 reveal"><span class="badge mb-4">${ssrInterpolate(unref(t)("services.badge"))}</span><h2 id="services-heading" class="section-title mb-4">${ssrInterpolate(unref(t)("services.title"))} <span class="text-gradient">${ssrInterpolate(unref(t)("services.titleHighlight"))}</span></h2><p class="section-subtitle mx-auto">${ssrInterpolate(unref(t)("services.subtitle"))}</p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(services), (service, i) => {
        var _a;
        _push(`<article class="${ssrRenderClass([[
          service.highlight ? "border-brand-primary/50 shadow-brand" : "",
          service.comingSoon ? "opacity-70" : ""
        ], "card p-6 flex flex-col gap-4 reveal relative group"])}" style="${ssrRenderStyle({ transitionDelay: `${i * 80}ms` })}">`);
        if (service.highlight) {
          _push(`<div class="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md bg-brand-accent/30 border border-brand-accent/60 text-brand-accent shadow-lg">${ssrInterpolate(unref(t)("services.popular"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (service.comingSoon) {
          _push(`<div class="absolute -top-3 left-6 badge text-xs px-3 py-1 bg-brand-muted/20 text-brand-muted">${ssrInterpolate(unref(t)("services.comingSoon"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-start gap-3"><div class="text-brand-primary shrink-0 mt-0.5">${(_a = serviceIcons[service.key]) != null ? _a : ""}</div><div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-display font-bold text-lg text-white">${ssrInterpolate(unref(t)(`services.items.${service.key}.title`))}</h3>`);
        if (service.collaborator) {
          _push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-accent/15 text-brand-accent border border-brand-accent/25"><svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg> we wsp\xF3\u0142pracy z Designerem </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center gap-2 mt-1 text-xs text-brand-muted"><svg class="w-3 h-3 text-brand-muted/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${ssrInterpolate(unref(t)(`services.items.${service.key}.days`))} <span aria-hidden="true">\xB7</span><span class="text-brand-accent font-semibold">${ssrInterpolate(unref(t)(`services.items.${service.key}.price`))}</span></div></div></div><p class="text-brand-muted text-sm leading-relaxed">${ssrInterpolate(unref(t)(`services.items.${service.key}.desc`))}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(service.tags, (tag) => {
          _push(`<span class="badge text-xs">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
        if (!service.comingSoon) {
          _push(`<a href="#kontakt" class="mt-auto flex items-center gap-2 text-sm font-medium text-brand-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded">${ssrInterpolate(unref(t)("services.askAbout"))} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div><div class="mt-8 card-gradient p-6 text-center reveal"><p class="text-white font-semibold mb-2">${ssrInterpolate(unref(t)("services.customTitle"))}</p><p class="text-brand-muted text-sm mb-4">${ssrInterpolate(unref(t)("services.customDesc"))}</p><a href="#kontakt" class="btn-primary inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">${ssrInterpolate(unref(t)("services.customCta"))}</a></div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Services.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const miraliveSrc = "" + buildAssetsURL("site-miralive.D3JyHt3N.png");
const neksusScr = "" + buildAssetsURL("site-neksuspng.Dj-rBECm.png");
const producktiveSrc = "" + buildAssetsURL("site-producktive.DLQdXKwA.png");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Portfolio",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const projectImages = {
      miralive: miraliveSrc,
      neksus: neksusScr,
      producktive: producktiveSrc
    };
    const activeFilter = ref("all");
    const filters = computed(() => [
      { key: "all", label: t("portfolio.filterAll") },
      { key: "client", label: t("portfolio.filterClient") },
      { key: "concept", label: t("portfolio.filterConcept") },
      { key: "personal", label: t("portfolio.filterPersonal") }
    ]);
    const projects = computed(() => [
      {
        type: "client",
        key: "miralive",
        tags: ["Nuxt 4", "TailwindCSS", "Resend", "Schema.org"],
        demoUrl: "https://miralive.pl",
        labelType: "badge-accent",
        initial: "M"
      },
      {
        type: "client",
        key: "neksus",
        tags: ["Nuxt 4", "TailwindCSS", "SSG", "SEO"],
        demoUrl: "https://neksus-phi.vercel.pl",
        labelType: "badge-accent",
        initial: "N"
      },
      {
        type: "personal",
        key: "producktive",
        tags: ["Nuxt 3", "TailwindCSS", "Supabase", "PWA", "i18n"],
        demoUrl: "https://producktive.pl",
        labelType: "badge",
        initial: "P"
      }
    ]);
    const filtered = computed(
      () => activeFilter.value === "all" ? projects.value : projects.value.filter((p) => p.type === activeFilter.value)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "portfolio",
        class: "py-24 bg-brand-card/20",
        "aria-labelledby": "portfolio-heading"
      }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12 reveal"><span class="badge mb-4">${ssrInterpolate(unref(t)("portfolio.badge"))}</span><h2 id="portfolio-heading" class="section-title mb-4">${ssrInterpolate(unref(t)("portfolio.title"))} <span class="text-gradient">${ssrInterpolate(unref(t)("portfolio.titleHighlight"))}</span></h2><p class="section-subtitle mx-auto">${ssrInterpolate(unref(t)("portfolio.subtitle"))}</p></div><div class="flex flex-wrap justify-center gap-2 mb-10 reveal" role="tablist"${ssrRenderAttr("aria-label", unref(t)("portfolio.badge"))}><!--[-->`);
      ssrRenderList(unref(filters), (f) => {
        _push(`<button role="tab"${ssrRenderAttr("aria-selected", unref(activeFilter) === f.key)} class="${ssrRenderClass([
          unref(activeFilter) === f.key ? "bg-gradient-brand text-white shadow-brand" : "bg-brand-card text-brand-muted hover:text-white border border-white/10",
          "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        ])}">${ssrInterpolate(f.label)}</button>`);
      });
      _push(`<!--]--></div><div class="grid md:grid-cols-2 lg:grid-cols-2 gap-6" role="tabpanel"><!--[-->`);
      ssrRenderList(unref(filtered), (project) => {
        _push(`<article class="card overflow-hidden flex flex-col reveal group"><div class="h-48 bg-gradient-brand relative overflow-hidden"><div class="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-sm flex items-center gap-1.5 px-3 z-10" aria-hidden="true"><span class="w-2.5 h-2.5 rounded-full bg-red-400/70"></span><span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></span><span class="w-2.5 h-2.5 rounded-full bg-green-400/70"></span></div><div class="absolute inset-0 flex items-center justify-center text-white/20 text-7xl font-bold" aria-hidden="true">${ssrInterpolate(project.initial)}</div><div class="absolute top-8 left-3 z-10"><span class="${ssrRenderClass([project.labelType, "text-xs"])}">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.label`))}</span></div><div class="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">`);
        if (project.demoUrl && project.demoUrl !== "#") {
          _push(`<a${ssrRenderAttr("href", project.demoUrl)} target="_blank" rel="noopener noreferrer" class="btn-primary text-sm py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"${ssrRenderAttr("aria-label", unref(t)("a11y.viewProject", { name: unref(t)(`portfolio.projects.${project.key}.title`) }))}>${ssrInterpolate(unref(t)("portfolio.viewDemo"))}</a>`);
        } else {
          _push(`<span class="text-white/70 text-sm bg-black/50 px-3 py-1.5 rounded-lg">${ssrInterpolate(unref(t)("portfolio.nda"))}</span>`);
        }
        _push(`</div><img${ssrRenderAttr("src", projectImages[project.key])}${ssrRenderAttr("alt", unref(t)(`portfolio.projects.${project.key}.title`))} class="absolute inset-0 w-full h-full object-cover object-top motion-safe:group-hover:scale-105 transition-transform duration-500" loading="lazy"></div><div class="p-5 flex flex-col gap-3 flex-1"><h3 class="font-display font-bold text-white leading-tight text-lg">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.title`))}</h3><p class="text-brand-muted text-sm leading-relaxed">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.desc`))}</p><ul class="space-y-1"${ssrRenderAttr("aria-label", unref(t)("portfolio.badge"))}><li class="text-xs text-brand-muted/80">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.result1`))}</li><li class="text-xs text-brand-muted/80">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.result2`))}</li><li class="text-xs text-brand-muted/80">${ssrInterpolate(unref(t)(`portfolio.projects.${project.key}.result3`))}</li></ul><div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5"><!--[-->`);
        ssrRenderList(project.tags, (tag) => {
          _push(`<span class="badge text-xs">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><div class="flex gap-3 pt-2">`);
        if (project.demoUrl && project.demoUrl !== "#") {
          _push(`<a${ssrRenderAttr("href", project.demoUrl)} target="_blank" rel="noopener noreferrer" class="text-sm text-brand-primary hover:text-white transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"${ssrRenderAttr("aria-label", unref(t)("a11y.viewProject", { name: unref(t)(`portfolio.projects.${project.key}.title`) }))}>${ssrInterpolate(unref(t)("portfolio.viewDemo"))} <span class="sr-only">(${ssrInterpolate(unref(t)("a11y.externalLink"))})</span></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></article>`);
      });
      _push(`<!--]--></div><div class="mt-12 text-center reveal"><div class="card-gradient p-8 rounded-2xl"><div class="text-4xl mb-3" aria-hidden="true">\u{1F91D}</div><h3 class="font-display text-xl font-bold text-white mb-2">${ssrInterpolate(unref(t)("portfolio.ctaTitle"))}</h3><p class="text-brand-muted text-sm mb-5">${ssrInterpolate(unref(t)("portfolio.ctaDesc"))}</p><a href="#kontakt" class="btn-primary inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">${ssrInterpolate(unref(t)("portfolio.ctaButton"))}</a></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Portfolio.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Process",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const steps = [
      { number: "01", icon: "\u{1F3AF}", key: "consultation" },
      { number: "02", icon: "\u{1F4CB}", key: "proposal" },
      { number: "03", icon: "\u{1F3A8}", key: "design" },
      { number: "04", icon: "\u2699\uFE0F", key: "development" },
      { number: "05", icon: "\u{1F680}", key: "launch" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "proces",
        class: "py-24 bg-brand-card/20",
        "aria-labelledby": "process-heading"
      }, _attrs))}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16 reveal"><span class="badge mb-4">${ssrInterpolate(unref(t)("process.badge"))}</span><h2 id="process-heading" class="section-title mb-4">${ssrInterpolate(unref(t)("process.title"))} <span class="text-gradient">${ssrInterpolate(unref(t)("process.titleHighlight"))}</span></h2><p class="section-subtitle mx-auto">${ssrInterpolate(unref(t)("process.subtitle"))}</p></div><div class="relative"><div class="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent" aria-hidden="true"></div><div class="lg:hidden absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/60 via-brand-accent/30 to-transparent" aria-hidden="true"></div><ol class="flex flex-col gap-6 lg:gap-0 list-none p-0"><!--[-->`);
      ssrRenderList(steps, (step, i) => {
        _push(`<li class="relative reveal lg:flex lg:items-center lg:min-h-[140px] lg:py-8" style="${ssrRenderStyle({ transitionDelay: `${i * 100}ms` })}"><div class="absolute z-10 flex items-center justify-center rounded-full font-mono font-bold text-brand-primary bg-brand-card border-2 border-brand-primary shadow-brand left-0 top-4 w-7 h-7 text-xs lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:text-sm" aria-hidden="true">${ssrInterpolate(step.number)}</div><div class="${ssrRenderClass([i % 2 === 0 ? "lg:mr-auto lg:pr-16" : "lg:ml-auto lg:pl-16", "pl-10 lg:pl-0 lg:w-[45%]"])}"><div class="card p-5 lg:p-6 hover:border-brand-primary/40 transition-colors duration-300"><div class="flex items-start gap-3 mb-2"><span class="text-2xl" aria-hidden="true">${ssrInterpolate(step.icon)}</span><h3 class="text-base lg:text-lg font-semibold text-white leading-snug">${ssrInterpolate(unref(t)(`process.steps.${step.key}.title`))}</h3></div><p class="text-brand-muted text-sm leading-relaxed mb-3">${ssrInterpolate(unref(t)(`process.steps.${step.key}.desc`))}</p><ul class="space-y-1"><!--[-->`);
        ssrRenderList([1, 2, 3], (bulletNum) => {
          _push(`<li class="flex items-start gap-2 text-xs text-brand-muted"><span class="mt-0.5 text-brand-success shrink-0" aria-hidden="true">\u2713</span><span>${ssrInterpolate(unref(t)(`process.steps.${step.key}.bullet${bulletNum}`))}</span></li>`);
        });
        _push(`<!--]--></ul></div></div></li>`);
      });
      _push(`<!--]--></ol></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Process.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Community",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const networkBenefits = computed(() => [
      {
        key: "benefit1",
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`
      },
      {
        key: "benefit2",
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`
      },
      {
        key: "benefit3",
        svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`
      }
    ]);
    const resources = computed(() => [
      { key: "resource1", icon: "file" },
      { key: "resource2", icon: "wind" },
      { key: "resource3", icon: "layout" },
      { key: "resource4", icon: "database" }
    ]);
    const resourceIcons = {
      file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      wind: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>`,
      layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
      database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0" aria-hidden="true"><ellipse cx="12" cy="7" rx="9" ry="4"/><path d="M3 7v5a9 4 0 0018 0V7"/><path d="M3 12v5a9 4 0 0018 0v-5"/></svg>`
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "siec",
        class: "py-24 relative overflow-hidden",
        "aria-labelledby": "community-heading"
      }, _attrs))}><div class="glow-orb w-[500px] h-[500px] bg-brand-accent/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16 reveal"><span class="badge mb-4">${ssrInterpolate(unref(t)("community.badge"))}</span><h2 id="community-heading" class="section-title mb-4">${ssrInterpolate(unref(t)("community.title"))} <span class="text-gradient">${ssrInterpolate(unref(t)("community.titleHighlight"))}</span></h2><p class="section-subtitle mx-auto">${ssrInterpolate(unref(t)("community.subtitle"))}</p></div><div class="grid lg:grid-cols-2 gap-12"><div class="reveal"><h3 class="text-white font-semibold text-lg mb-6 flex items-center gap-2"><span class="badge">${ssrInterpolate(unref(t)("community.networkTitle"))}</span></h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(networkBenefits), (benefit) => {
        var _a;
        _push(`<div class="card p-5 flex gap-4 items-start"><div class="text-brand-primary shrink-0 mt-0.5">${(_a = benefit.svgPath) != null ? _a : ""}</div><div><div class="font-semibold text-white text-sm mb-1">${ssrInterpolate(unref(t)(`community.${benefit.key}Title`))}</div><div class="text-brand-muted text-sm leading-relaxed">${ssrInterpolate(unref(t)(`community.${benefit.key}Desc`))}</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="reveal" style="${ssrRenderStyle({ "transition-delay": "150ms" })}"><h3 class="text-white font-semibold text-lg mb-6 flex items-center gap-2"><span class="badge-accent">${ssrInterpolate(unref(t)("community.resourcesTitle"))}</span></h3><div class="card-gradient p-6 space-y-4"><p class="text-brand-muted text-sm leading-relaxed">${ssrInterpolate(unref(t)("community.resourcesDesc"))}</p><ul class="space-y-3"><!--[-->`);
      ssrRenderList(unref(resources), (resource) => {
        var _a;
        _push(`<li class="flex items-start gap-3 text-sm text-brand-muted"><span class="text-brand-accent mt-0.5">${(_a = resourceIcons[resource.icon]) != null ? _a : ""}</span><span>${ssrInterpolate(unref(t)(`community.${resource.key}`))}</span></li>`);
      });
      _push(`<!--]--></ul><div class="pt-4 border-t border-white/5"><a href="#kontakt" class="btn-primary w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg> ${ssrInterpolate(unref(t)("community.cta"))}</a></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Community.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ContactSchema = z.object({
  name: z.string().min(2, "nameRequired").max(100),
  email: z.string().email("emailInvalid"),
  service: z.string().min(1, "serviceRequired"),
  budget: z.string().min(1, "budgetRequired"),
  message: z.string().min(20, "messageMin").max(2e3, "messageMax"),
  honeypot: z.string().max(0, "Bot detected")
});
function useContactForm() {
  const { t } = useI18n();
  const config = useRuntimeConfig();
  const form = reactive({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
    honeypot: ""
  });
  const errors = reactive({});
  const loading = ref(false);
  const success = ref(false);
  const serverError = ref("");
  const getErrorMessage = (key) => {
    const validationKeys = {
      nameRequired: t("contact.validation.nameRequired"),
      emailInvalid: t("contact.validation.emailInvalid"),
      serviceRequired: t("contact.validation.serviceRequired"),
      budgetRequired: t("contact.validation.budgetRequired"),
      messageMin: t("contact.validation.messageMin"),
      messageMax: t("contact.validation.messageMax")
    };
    return validationKeys[key] || key;
  };
  const validateField = (field) => {
    const partial = ContactSchema.shape[field];
    const result = partial.safeParse(form[field]);
    if (result.success) {
      errors[field] = void 0;
    } else {
      errors[field] = getErrorMessage(result.error.errors[0].message);
    }
  };
  const submit = async () => {
    serverError.value = "";
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        const field = e.path[0];
        errors[field] = getErrorMessage(e.message);
      });
      return;
    }
    loading.value = true;
    try {
      const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey
      );
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        service: form.service,
        budget: form.budget,
        message: form.message
      });
      if (error) throw error;
      success.value = true;
      Object.assign(form, {
        name: "",
        email: "",
        service: "",
        budget: "",
        message: ""
      });
    } catch {
      serverError.value = t("contact.serverError");
    } finally {
      loading.value = false;
    }
  };
  return { form, errors, loading, success, serverError, submit, validateField };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const config = useRuntimeConfig();
    const { form, errors, loading, success, serverError } = useContactForm();
    const calendlyUrl = config.public.calendlyUrl;
    const serviceKeys = ["website", "landing", "shop", "blog", "saas", "design", "other"];
    const budgetKeys = ["3k5k", "5k9k", "9k15k", "over15k", "unknown"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "kontakt",
        class: "py-24 relative overflow-hidden",
        "aria-labelledby": "contact-heading"
      }, _attrs))} data-v-f5be2054><div class="glow-orb w-[600px] h-[600px] bg-brand-accent/10 bottom-[-200px] right-[-200px]" aria-hidden="true" data-v-f5be2054></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-v-f5be2054><div class="text-center mb-16 reveal" data-v-f5be2054><span class="badge mb-4" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.badge"))}</span><h2 id="contact-heading" class="section-title mb-4" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.title"))} <span class="text-gradient" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.titleHighlight"))}</span></h2><p class="section-subtitle mx-auto" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.subtitle"))}</p></div><div class="grid lg:grid-cols-5 gap-12" data-v-f5be2054><div class="lg:col-span-3 reveal" data-v-f5be2054>`);
      if (unref(success)) {
        _push(`<div class="card p-8 text-center" role="alert" data-v-f5be2054><div class="flex justify-center mb-4" aria-hidden="true" data-v-f5be2054><svg class="w-12 h-12 text-brand-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-f5be2054><path d="M22 11.08V12a10 10 0 11-5.93-9.14" data-v-f5be2054></path><polyline points="22 4 12 14.01 9 11.01" data-v-f5be2054></polyline></svg></div><h3 class="font-display text-xl font-bold text-white mb-2" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.success.title"))}</h3><p class="text-brand-muted" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.success.desc"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(success)) {
        _push(`<form class="space-y-5 card p-6" novalidate data-v-f5be2054><input${ssrRenderAttr("value", unref(form).honeypot)} type="text" name="website" autocomplete="off" tabindex="-1" class="hidden" aria-hidden="true" data-v-f5be2054><div data-v-f5be2054><label for="contact-name" class="block text-sm text-white/70 mb-1.5" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.name"))} ${ssrInterpolate(unref(t)("contact.form.required"))}</label><input id="contact-name"${ssrRenderAttr("value", unref(form).name)} type="text"${ssrRenderAttr("placeholder", unref(t)("contact.form.namePlaceholder"))} class="${ssrRenderClass([unref(errors).name ? "border-red-500/50" : "border-white/10", "w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"])}"${ssrRenderAttr("aria-invalid", !!unref(errors).name)}${ssrRenderAttr("aria-describedby", unref(errors).name ? "name-error" : void 0)} data-v-f5be2054>`);
        if (unref(errors).name) {
          _push(`<p id="name-error" class="text-red-400 text-xs mt-1" role="alert" data-v-f5be2054>${ssrInterpolate(unref(errors).name)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f5be2054><label for="contact-email" class="block text-sm text-white/70 mb-1.5" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.email"))} ${ssrInterpolate(unref(t)("contact.form.required"))}</label><input id="contact-email"${ssrRenderAttr("value", unref(form).email)} type="email"${ssrRenderAttr("placeholder", unref(t)("contact.form.emailPlaceholder"))} class="${ssrRenderClass([unref(errors).email ? "border-red-500/50" : "border-white/10", "w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"])}"${ssrRenderAttr("aria-invalid", !!unref(errors).email)}${ssrRenderAttr("aria-describedby", unref(errors).email ? "email-error" : void 0)} data-v-f5be2054>`);
        if (unref(errors).email) {
          _push(`<p id="email-error" class="text-red-400 text-xs mt-1" role="alert" data-v-f5be2054>${ssrInterpolate(unref(errors).email)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f5be2054><div class="block text-sm text-white/70 mb-2" id="service-label" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.service"))} ${ssrInterpolate(unref(t)("contact.form.required"))}</div><div class="flex flex-wrap gap-2" role="group" aria-labelledby="service-label"${ssrRenderAttr("aria-describedby", unref(errors).service ? "service-error" : void 0)} data-v-f5be2054><!--[-->`);
        ssrRenderList(serviceKeys, (key) => {
          _push(`<button type="button" class="${ssrRenderClass([
            unref(form).service === key ? "bg-brand-primary/20 border-brand-primary text-brand-primary" : "bg-brand-dark border-white/10 text-brand-muted hover:border-brand-primary/50 hover:text-white",
            "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          ])}"${ssrRenderAttr("aria-pressed", unref(form).service === key)} data-v-f5be2054>${ssrInterpolate(unref(t)(`contact.services.${key}`))}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(errors).service) {
          _push(`<p id="service-error" class="text-red-400 text-xs mt-1" role="alert" data-v-f5be2054>${ssrInterpolate(unref(errors).service)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f5be2054><div class="block text-sm text-white/70 mb-2" id="budget-label" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.budget"))} ${ssrInterpolate(unref(t)("contact.form.required"))}</div><div class="flex flex-wrap gap-2" role="group" aria-labelledby="budget-label"${ssrRenderAttr("aria-describedby", unref(errors).budget ? "budget-error" : void 0)} data-v-f5be2054><!--[-->`);
        ssrRenderList(budgetKeys, (key) => {
          _push(`<button type="button" class="${ssrRenderClass([
            unref(form).budget === key ? "bg-brand-accent/20 border-brand-accent text-brand-accent" : "bg-brand-dark border-white/10 text-brand-muted hover:border-brand-accent/50 hover:text-white",
            "px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          ])}"${ssrRenderAttr("aria-pressed", unref(form).budget === key)} data-v-f5be2054>${ssrInterpolate(unref(t)(`contact.budgets.${key}`))}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(errors).budget) {
          _push(`<p id="budget-error" class="text-red-400 text-xs mt-1" role="alert" data-v-f5be2054>${ssrInterpolate(unref(errors).budget)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f5be2054><label for="contact-message" class="block text-sm text-white/70 mb-1.5" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.message"))} ${ssrInterpolate(unref(t)("contact.form.required"))}</label><textarea id="contact-message" rows="5"${ssrRenderAttr("placeholder", unref(t)("contact.form.messagePlaceholder"))} class="${ssrRenderClass([unref(errors).message ? "border-red-500/50" : "border-white/10", "w-full bg-brand-dark border rounded-xl px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors resize-none"])}"${ssrRenderAttr("aria-invalid", !!unref(errors).message)}${ssrRenderAttr("aria-describedby", unref(errors).message ? "message-error" : "message-counter")} data-v-f5be2054>${ssrInterpolate(unref(form).message)}</textarea><div class="flex justify-between mt-1" data-v-f5be2054>`);
        if (unref(errors).message) {
          _push(`<p id="message-error" class="text-red-400 text-xs" role="alert" data-v-f5be2054>${ssrInterpolate(unref(errors).message)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p id="message-counter" class="text-brand-muted text-xs ml-auto" data-v-f5be2054>${ssrInterpolate(unref(form).message.length)}/2000 </p></div></div>`);
        if (unref(serverError)) {
          _push(`<p class="text-red-400 text-sm p-3 bg-red-500/10 rounded-xl" role="alert" data-v-f5be2054>${ssrInterpolate(unref(serverError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="${ssrRenderClass([unref(loading) ? "opacity-70 cursor-not-allowed" : "", "btn-primary w-full justify-center py-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"])}" data-v-f5be2054>`);
        if (unref(loading)) {
          _push(`<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true" data-v-f5be2054><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-f5be2054></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-f5be2054></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-f5be2054>${ssrInterpolate(unref(loading) ? unref(t)("contact.form.submitting") : unref(t)("contact.form.submit"))}</span></button><div class="flex items-center justify-center gap-2 text-brand-muted/60 text-xs" data-v-f5be2054><svg class="w-3.5 h-3.5 text-brand-primary/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-f5be2054><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-f5be2054></path></svg><span data-v-f5be2054>Formularz zabezpieczony honeypot + walidacja serwerowa</span></div><p class="text-brand-muted text-xs text-center" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.form.privacy"))}</p></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-2 space-y-6 reveal" style="${ssrRenderStyle({ "transition-delay": "150ms" })}" data-v-f5be2054><div class="card-gradient p-6 text-center" data-v-f5be2054><div class="flex justify-center mb-3" aria-hidden="true" data-v-f5be2054><svg class="w-10 h-10 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-f5be2054><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-f5be2054></rect><line x1="16" y1="2" x2="16" y2="6" data-v-f5be2054></line><line x1="8" y1="2" x2="8" y2="6" data-v-f5be2054></line><line x1="3" y1="10" x2="21" y2="10" data-v-f5be2054></line></svg></div><h3 class="font-display font-bold text-white text-lg mb-2" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.calendar.title"))}</h3><p class="text-brand-muted text-sm leading-relaxed mb-5" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.calendar.desc"))}</p><a${ssrRenderAttr("href", unref(calendlyUrl))} target="_blank" rel="noopener noreferrer" class="btn-primary w-full justify-center py-3.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" data-v-f5be2054><span data-v-f5be2054>${ssrInterpolate(unref(t)("contact.calendar.cta"))}</span></a><p class="text-brand-muted/60 text-xs mt-3" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.calendar.note"))}</p></div><div class="card p-5 space-y-3" data-v-f5be2054><h3 class="font-semibold text-white text-sm" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.direct.title"))}</h3><a href="mailto:kontakt@producktive.pl" class="flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded" data-v-f5be2054><div class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0" aria-hidden="true" data-v-f5be2054><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-f5be2054><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-v-f5be2054></path><polyline points="22,6 12,13 2,6" data-v-f5be2054></polyline></svg></div> kontakt@producktive.pl </a><a href="tel:+48886127854" class="flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded" data-v-f5be2054><div class="w-9 h-9 rounded-xl bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/25 shrink-0" aria-hidden="true" data-v-f5be2054><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-f5be2054><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81A2 2 0 017 6.1l-1.27 1.27a16 16 0 006.29 6.29L13.3 12a2 2 0 012.37-.44A12.84 12.84 0 0018.5 12a2 2 0 011.72 2v.92z" data-v-f5be2054></path></svg></div> +48 886 127 854 </a></div><div class="card-gradient p-5" data-v-f5be2054><div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-primary/15 mb-3" aria-hidden="true" data-v-f5be2054><svg class="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-f5be2054><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-f5be2054></path></svg></div><h3 class="font-semibold text-white mb-2" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.guarantee.title"))}</h3><p class="text-brand-muted text-sm leading-relaxed" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.guarantee.desc", { highlight: unref(t)("contact.guarantee.highlight") }).split(unref(t)("contact.guarantee.highlight"))[0])}<strong class="text-white" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.guarantee.highlight"))}</strong>${ssrInterpolate(unref(t)("contact.guarantee.desc", { highlight: unref(t)("contact.guarantee.highlight") }).split(unref(t)("contact.guarantee.highlight")).slice(1).join(unref(t)("contact.guarantee.highlight")))}</p></div><div class="card p-5 space-y-3" data-v-f5be2054><h3 class="font-semibold text-white mb-1" data-v-f5be2054>${ssrInterpolate(unref(t)("contact.faq.title"))}</h3><div class="text-sm space-y-3" data-v-f5be2054><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(`<div data-v-f5be2054><div class="text-white/80 font-medium" data-v-f5be2054>${ssrInterpolate(unref(t)(`contact.faq.q${n}`))}</div><div class="text-brand-muted" data-v-f5be2054>${ssrInterpolate(unref(t)(`contact.faq.a${n}`))}</div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/Contact.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f5be2054"]]);
createConsola({
  defaults: {
    tag: "@nuxtjs/og-image"
  }
});
function defineOgImageComponent(_component, _props = {}, _options = {}) {
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({
      title: t("meta.title"),
      meta: [
        { name: "description", content: t("meta.description") },
        { property: "og:title", content: t("meta.ogTitle") },
        { property: "og:description", content: t("meta.ogDescription") },
        { property: "og:type", content: "website" }
      ]
    });
    defineOgImageComponent("NuxtSeo", {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionsHero = _sfc_main$8;
      const _component_SectionsTrustBar = __nuxt_component_1;
      const _component_SectionsAbout = _sfc_main$6;
      const _component_SectionsServices = _sfc_main$5;
      const _component_SectionsPortfolio = _sfc_main$4;
      const _component_SectionsProcess = _sfc_main$3;
      const _component_SectionsCommunity = _sfc_main$2;
      const _component_SectionsContact = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SectionsHero, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsTrustBar, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsServices, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsPortfolio, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsProcess, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsCommunity, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionsContact, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DImu_1Z_.mjs.map
