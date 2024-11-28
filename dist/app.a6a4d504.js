// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../opt/homebrew/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"src/llm-effect.js":[function(require,module,exports) {
var define;
var process = require("process");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("Typewriter", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Typewriter = t() : e.Typewriter = t();
}("undefined" != typeof self ? self : this, function () {
  return function () {
    var e = {
        75: function _(e) {
          (function () {
            var t, n, r, o, a, i;
            "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function () {
              return performance.now();
            } : "undefined" != typeof process && null !== process && process.hrtime ? (e.exports = function () {
              return (t() - a) / 1e6;
            }, n = process.hrtime, o = (t = function t() {
              var e;
              return 1e9 * (e = n())[0] + e[1];
            })(), i = 1e9 * process.uptime(), a = o - i) : Date.now ? (e.exports = function () {
              return Date.now() - r;
            }, r = Date.now()) : (e.exports = function () {
              return new Date().getTime() - r;
            }, r = new Date().getTime());
          }).call(this);
        },
        4087: function _(e, t, n) {
          for (var r = n(75), o = "undefined" == typeof window ? n.g : window, a = ["moz", "webkit"], i = "AnimationFrame", s = o["request" + i], u = o["cancel" + i] || o["cancelRequest" + i], l = 0; !s && l < a.length; l++) s = o[a[l] + "Request" + i], u = o[a[l] + "Cancel" + i] || o[a[l] + "CancelRequest" + i];
          if (!s || !u) {
            var c = 0,
              p = 0,
              d = [];
            s = function s(e) {
              if (0 === d.length) {
                var t = r(),
                  n = Math.max(0, 16.666666666666668 - (t - c));
                c = n + t, setTimeout(function () {
                  var e = d.slice(0);
                  d.length = 0;
                  var _loop = function _loop() {
                    if (!e[t].cancelled) try {
                      e[t].callback(c);
                    } catch (e) {
                      setTimeout(function () {
                        throw e;
                      }, 0);
                    }
                  };
                  for (var t = 0; t < e.length; t++) {
                    _loop();
                  }
                }, Math.round(n));
              }
              return d.push({
                handle: ++p,
                callback: e,
                cancelled: !1
              }), p;
            }, u = function u(e) {
              for (var t = 0; t < d.length; t++) d[t].handle === e && (d[t].cancelled = !0);
            };
          }
          e.exports = function (e) {
            return s.call(o, e);
          }, e.exports.cancel = function () {
            u.apply(o, arguments);
          }, e.exports.polyfill = function (e) {
            e || (e = o), e.requestAnimationFrame = s, e.cancelAnimationFrame = u;
          };
        }
      },
      t = {};
    function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var a = t[r] = {
        exports: {}
      };
      return e[r].call(a.exports, a, a.exports, n), a.exports;
    }
    n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, {
        a: t
      }), t;
    }, n.d = function (e, t) {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
      });
    }, n.g = function () {
      if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
      }
    }(), n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    };
    var r = {};
    return function () {
      "use strict";

      n.d(r, {
        default: function _default() {
          return C;
        }
      });
      var e = n(4087),
        t = n.n(e);
      var o = function o(e) {
          return new RegExp(/<[a-z][\s\S]*>/i).test(e);
        },
        a = function a(e, t) {
          return Math.floor(Math.random() * (t - e + 1)) + e;
        };
      var i = "TYPE_CHARACTER",
        s = "REMOVE_CHARACTER",
        u = "REMOVE_ALL",
        l = "REMOVE_LAST_VISIBLE_NODE",
        c = "PAUSE_FOR",
        p = "CALL_FUNCTION",
        d = "ADD_HTML_TAG_ELEMENT",
        f = "CHANGE_DELETE_SPEED",
        v = "CHANGE_DELAY",
        h = "CHANGE_CURSOR",
        m = "PASTE_STRING",
        y = "HTML_TAG";
      function g(e) {
        return g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
          return _typeof(e);
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
        }, g(e);
      }
      function E(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t && (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })), n.push.apply(n, r);
        }
        return n;
      }
      function w(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? E(Object(n), !0).forEach(function (t) {
            A(e, t, n[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : E(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
        }
        return e;
      }
      function b(e) {
        return function (e) {
          if (Array.isArray(e)) return T(e);
        }(e) || function (e) {
          if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
        }(e) || function (e, t) {
          if (e) {
            if ("string" == typeof e) return T(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? T(e, t) : void 0;
          }
        }(e) || function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function S(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, N(r.key), r);
        }
      }
      function A(e, t, n) {
        return (t = N(t)) in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = n, e;
      }
      function N(e) {
        var t = function (e, t) {
          if ("object" !== g(e) || null === e) return e;
          var n = e[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(e, "string");
            if ("object" !== g(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }(e);
        return "symbol" === g(t) ? t : String(t);
      }
      var C = function () {
        function n(r, g) {
          var E = this;
          if (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, n), A(this, "state", {
            cursorAnimation: null,
            lastFrameTime: null,
            pauseUntil: null,
            eventQueue: [],
            eventLoop: null,
            eventLoopPaused: !1,
            reverseCalledEvents: [],
            calledEvents: [],
            visibleNodes: [],
            initialOptions: null,
            elements: {
              container: null,
              wrapper: document.createElement("span"),
              cursor: document.createElement("span")
            }
          }), A(this, "options", {
            strings: null,
            cursor: "|",
            delay: "natural",
            pauseFor: 1500,
            deleteSpeed: "natural",
            loop: !1,
            autoStart: !1,
            devMode: !1,
            skipAddStyles: !1,
            wrapperClassName: "Typewriter__wrapper",
            cursorClassName: "Typewriter__cursor",
            stringSplitter: null,
            onCreateTextNode: null,
            onRemoveNode: null
          }), A(this, "setupWrapperElement", function () {
            E.state.elements.container && (E.state.elements.wrapper.className = E.options.wrapperClassName, E.state.elements.cursor.className = E.options.cursorClassName, E.state.elements.cursor.innerHTML = E.options.cursor, E.state.elements.container.innerHTML = "", E.state.elements.container.appendChild(E.state.elements.wrapper), E.state.elements.container.appendChild(E.state.elements.cursor));
          }), A(this, "start", function () {
            return E.state.eventLoopPaused = !1, E.runEventLoop(), E;
          }), A(this, "pause", function () {
            return E.state.eventLoopPaused = !0, E;
          }), A(this, "stop", function () {
            return E.state.eventLoop && ((0, e.cancel)(E.state.eventLoop), E.state.eventLoop = null), E;
          }), A(this, "pauseFor", function (e) {
            return E.addEventToQueue(c, {
              ms: e
            }), E;
          }), A(this, "typeOutAllStrings", function () {
            return "string" == typeof E.options.strings ? (E.typeString(E.options.strings).pauseFor(E.options.pauseFor), E) : (E.options.strings.forEach(function (e) {
              E.typeString(e).pauseFor(E.options.pauseFor).deleteAll(E.options.deleteSpeed);
            }), E);
          }), A(this, "typeString", function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (o(e)) return E.typeOutHTMLString(e, t);
            if (e) {
              var n = (E.options || {}).stringSplitter,
                r = "function" == typeof n ? n(e) : e.split(" ").map(function (e) {
                  return e + " ";
                });
              E.typeCharacters(r, t);
            }
            return E;
          }), A(this, "pasteString", function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return o(e) ? E.typeOutHTMLString(e, t, !0) : (e && E.addEventToQueue(m, {
              character: e,
              node: t
            }), E);
          }), A(this, "typeOutHTMLString", function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              n = arguments.length > 2 ? arguments[2] : void 0,
              r = function (e) {
                var t = document.createElement("div");
                return t.innerHTML = e, t.childNodes;
              }(e);
            if (r.length > 0) for (var o = 0; o < r.length; o++) {
              var a = r[o],
                i = a.innerHTML;
              a && 3 !== a.nodeType ? (a.innerHTML = "", E.addEventToQueue(d, {
                node: a,
                parentNode: t
              }), n ? E.pasteString(i, a) : E.typeString(i, a)) : a.textContent && (n ? E.pasteString(a.textContent, t) : E.typeString(a.textContent, t));
            }
            return E;
          }), A(this, "deleteAll", function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "natural";
            return E.addEventToQueue(u, {
              speed: e
            }), E;
          }), A(this, "changeDeleteSpeed", function (e) {
            if (!e) throw new Error("Must provide new delete speed");
            return E.addEventToQueue(f, {
              speed: e
            }), E;
          }), A(this, "changeDelay", function (e) {
            if (!e) throw new Error("Must provide new delay");
            return E.addEventToQueue(v, {
              delay: e
            }), E;
          }), A(this, "changeCursor", function (e) {
            if (!e) throw new Error("Must provide new cursor");
            return E.addEventToQueue(h, {
              cursor: e
            }), E;
          }), A(this, "deleteChars", function (e) {
            if (!e) throw new Error("Must provide amount of characters to delete");
            for (var t = 0; t < e; t++) E.addEventToQueue(s);
            return E;
          }), A(this, "callFunction", function (e, t) {
            if (!e || "function" != typeof e) throw new Error("Callback must be a function");
            return E.addEventToQueue(p, {
              cb: e,
              thisArg: t
            }), E;
          }), A(this, "typeCharacters", function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
            return e.forEach(function (e) {
              E.addEventToQueue(i, {
                character: e,
                node: t
              });
            }), E;
          }), A(this, "removeCharacters", function (e) {
            if (!e || !Array.isArray(e)) throw new Error("Characters must be an array");
            return e.forEach(function () {
              E.addEventToQueue(s);
            }), E;
          }), A(this, "addEventToQueue", function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return E.addEventToStateProperty(e, t, n, "eventQueue");
          }), A(this, "addReverseCalledEvent", function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return E.options.loop ? E.addEventToStateProperty(e, t, n, "reverseCalledEvents") : E;
          }), A(this, "addEventToStateProperty", function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              r = arguments.length > 3 ? arguments[3] : void 0,
              o = {
                eventName: e,
                eventArgs: t || {}
              };
            return E.state[r] = n ? [o].concat(b(E.state[r])) : [].concat(b(E.state[r]), [o]), E;
          }), A(this, "runEventLoop", function () {
            E.state.lastFrameTime || (E.state.lastFrameTime = Date.now());
            var e = Date.now(),
              n = e - E.state.lastFrameTime;
            if (!E.state.eventQueue.length) {
              if (!E.options.loop) return;
              E.state.eventQueue = b(E.state.calledEvents), E.state.calledEvents = [], E.options = w({}, E.state.initialOptions);
            }
            if (E.state.eventLoop = t()(E.runEventLoop), !E.state.eventLoopPaused) {
              if (E.state.pauseUntil) {
                if (e < E.state.pauseUntil) return;
                E.state.pauseUntil = null;
              }
              var r,
                o = b(E.state.eventQueue),
                g = o.shift();
              if (!(n <= (r = g.eventName === l || g.eventName === s ? "natural" === E.options.deleteSpeed ? a(40, 80) : E.options.deleteSpeed : "natural" === E.options.delay ? a(120, 160) : E.options.delay))) {
                var T = g.eventName,
                  S = g.eventArgs;
                switch (E.logInDevMode({
                  currentEvent: g,
                  state: E.state,
                  delay: r
                }), T) {
                  case m:
                  case i:
                    var A = S.character,
                      N = S.node,
                      C = document.createTextNode(A),
                      _ = C;
                    E.options.onCreateTextNode && "function" == typeof E.options.onCreateTextNode && (_ = E.options.onCreateTextNode(A, C)), _ && (N ? N.appendChild(_) : E.state.elements.wrapper.appendChild(_)), E.state.visibleNodes = [].concat(b(E.state.visibleNodes), [{
                      type: "TEXT_NODE",
                      character: A,
                      node: _
                    }]);
                    break;
                  case s:
                    o.unshift({
                      eventName: l,
                      eventArgs: {
                        removingCharacterNode: !0
                      }
                    });
                    break;
                  case c:
                    var O = g.eventArgs.ms;
                    E.state.pauseUntil = Date.now() + parseInt(O);
                    break;
                  case p:
                    var L = g.eventArgs,
                      D = L.cb,
                      M = L.thisArg;
                    D.call(M, {
                      elements: E.state.elements
                    });
                    break;
                  case d:
                    var x = g.eventArgs,
                      P = x.node,
                      j = x.parentNode;
                    j ? j.appendChild(P) : E.state.elements.wrapper.appendChild(P), E.state.visibleNodes = [].concat(b(E.state.visibleNodes), [{
                      type: y,
                      node: P,
                      parentNode: j || E.state.elements.wrapper
                    }]);
                    break;
                  case u:
                    var R = E.state.visibleNodes,
                      k = S.speed,
                      Q = [];
                    k && Q.push({
                      eventName: f,
                      eventArgs: {
                        speed: k,
                        temp: !0
                      }
                    });
                    for (var F = 0, H = R.length; F < H; F++) Q.push({
                      eventName: l,
                      eventArgs: {
                        removingCharacterNode: !1
                      }
                    });
                    k && Q.push({
                      eventName: f,
                      eventArgs: {
                        speed: E.options.deleteSpeed,
                        temp: !0
                      }
                    }), o.unshift.apply(o, Q);
                    break;
                  case l:
                    var I = g.eventArgs.removingCharacterNode;
                    if (E.state.visibleNodes.length) {
                      var U = E.state.visibleNodes.pop(),
                        q = U.type,
                        G = U.node,
                        Y = U.character;
                      E.options.onRemoveNode && "function" == typeof E.options.onRemoveNode && E.options.onRemoveNode({
                        node: G,
                        character: Y
                      }), G && G.parentNode.removeChild(G), q === y && I && o.unshift({
                        eventName: l,
                        eventArgs: {}
                      });
                    }
                    break;
                  case f:
                    E.options.deleteSpeed = g.eventArgs.speed;
                    break;
                  case v:
                    E.options.delay = g.eventArgs.delay;
                    break;
                  case h:
                    E.options.cursor = g.eventArgs.cursor, E.state.elements.cursor.innerHTML = g.eventArgs.cursor;
                }
                E.options.loop && (g.eventName === l || g.eventArgs && g.eventArgs.temp || (E.state.calledEvents = [].concat(b(E.state.calledEvents), [g]))), E.state.eventQueue = o, E.state.lastFrameTime = e;
              }
            }
          }), r) if ("string" == typeof r) {
            var T = document.querySelector(r);
            if (!T) throw new Error("Could not find container element");
            this.state.elements.container = T;
          } else this.state.elements.container = r;
          g && (this.options = w(w({}, this.options), g)), this.state.initialOptions = w({}, this.options), this.init();
        }
        var r, g;
        return r = n, (g = [{
          key: "init",
          value: function value() {
            var e, t;
            this.setupWrapperElement(), this.addEventToQueue(h, {
              cursor: this.options.cursor
            }, !0), this.addEventToQueue(u, null, !0), !window || window.___TYPEWRITER_JS_STYLES_ADDED___ || this.options.skipAddStyles || (e = ".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}", (t = document.createElement("style")).appendChild(document.createTextNode(e)), document.head.appendChild(t), window.___TYPEWRITER_JS_STYLES_ADDED___ = !0), !0 === this.options.autoStart && this.options.strings && this.typeOutAllStrings().start();
          }
        }, {
          key: "logInDevMode",
          value: function value(e) {
            this.options.devMode && console.log(e);
          }
        }]) && S(r.prototype, g), Object.defineProperty(r, "prototype", {
          writable: !1
        }), n;
      }();
    }(), r.default;
  }();
});
},{"process":"../../../../opt/homebrew/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

var _llmEffect = _interopRequireDefault(require("./llm-effect.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.tagName === 'VIDEO' && node.classList.contains('video')) {
          node.addEventListener('mouseover', function () {
            return node.play();
          });
          node.addEventListener('mouseout', function () {
            return node.pause();
          });
        }
      });
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
var app = document.getElementById("typewriter");
var typewriter = new _llmEffect.default(app, {
  loop: true,
  delay: 150,
  deleteSpeed: 200,
  cursor: "",
  onCreateTextNode: function onCreateTextNode(character) {
    // Create a span for each character
    var span = document.createElement("span");
    span.textContent = character;

    // Apply the fade-in animation to each character
    span.style.opacity = 0; // Start invisible
    span.style.transition = "opacity 0.2s ease-in-out"; // Smooth fade-in

    // Delay the fade-in slightly for each character
    setTimeout(function () {
      span.style.opacity = 1; // Fade in
    }, 0);
    return span; // Return the custom span
  }
  // onRemoveNode: ({ node }) => {
  //   // Apply fade-out effect
  //   node.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade-out
  //   node.style.opacity = 0; // Start fade-out

  //   // Wait for the fade-out to complete before removing the node
  //   setTimeout(() => {
  //     if (node.parentNode) {
  //       node.parentNode.removeChild(node); // Remove the node from the DOM
  //     }
  //   }, 500); // Match the duration of the fade-out
  // },
});

// Add event listeners for hover actions
app.addEventListener("mouseenter", function () {
  typewriter.stop(); // Pause typing when hovering
});
app.addEventListener("mouseleave", function () {
  typewriter.start(); // Resume typing when hover ends
});
typewriter.pasteString("<button class=\"clickable\" popovertarget=\"dogs-popover\" style=\"--anchor: dogs-popover\">\u29BF</button>\n     <div id=\"dogs-popover\" popover style=\"--anchor: dogs-popover; top: 0; right: 0;\">\n       <p>\n       <span class=\"tag\">#dogs</span>\n       Dogs: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the dog.\n       </p>\n     </div>").typeString("Walk and work").pasteString('<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>').pasteString("<button class=\"clickable\" popovertarget=\"ducks-popover\" style=\"--anchor: ducks-popover\">\u29BF</button>\n     <div id=\"ducks-popover\" popover style=\"--anchor: ducks-popover; top: 0; right: 0;\">\n       <p>\n       Duck: Go from thought to task, meeting agenda, tweet, or published article in seconds. Voice memos so powerful you can do real work while walking the duck.\n       </p>\n     </div>").typeString("Contribute more by typing less").pasteString('<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>').pasteString("<button class=\"clickable\" popovertarget=\"cats-popover\">\u29BF</button>\n     <div id=\"cats-popover\" popover>\n       <p>\n      Use the Tana meeting assistant to get \u2193\n\n      Meeting summaries that link to the transcript\n      Action items sent to your task board\n      CRM that adds info about contacts\n       </p>\n     </div>").typeString("ChatGPT with benefits").pasteString("<button class=\"clickable\" popovertarget=\"cats-popover\">\u29BF</button>\n     <div id=\"cats-popover\" popover>\n       <p>\n       Experience AI in a flexible, powerful editor. Go from chat to structured knowledge embedded in your personal knowledge base. And yes, you can chat with your content.\n       </p>\n     </div>").pasteString('<video src="https://tana.inc/promo_video_2.mp4" loop muted class="video"></video>').pauseFor(5000).start();
},{"./llm-effect.js":"src/llm-effect.js"}],"../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58641" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map