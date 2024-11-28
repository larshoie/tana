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
})({"src/vanilla.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// // class LLMHeroAnimation {
// //     /**
// //      * Create a new LLM Hero Animation
// //      * @param {Object} options - Configuration options
// //      * @param {HTMLElement} options.container - The container element
// //      * @param {number} [options.speed=1000] - Time per element (ms)
// //      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
// //      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
// //      */
// //     constructor(options) {
// //         this.container = options.container;
// //         this.speed = options.speed ?? 1000; // Time per element
// //         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
// //         this.autoplay = options.autoplay ?? true;
// //         // Internal state tracking
// //         this.children = Array.from(this.container.children);
// //         this.animationTimeouts = [];
// //         this.isAnimating = this.autoplay;
// //         // Bind methods to maintain correct context
// //         this.animateSequence = this.animateSequence.bind(this);
// //         this.handleMouseEnter = this.handleMouseEnter.bind(this);
// //         this.handleMouseLeave = this.handleMouseLeave.bind(this);
// //         // Initial setup
// //         this.init();
// //     }
// //     /**
// //      * Initialize the animation
// //      */
// //     init() {
// //         this.container.classList.add('llm-hero-animation');
// //         this.children.forEach((child) => {
// //             child.classList.add('llm-hero-item');
// //             child.style.opacity = '0';
// //             child.style.transition = 'opacity 0.3s ease-in-out';
// //         });
// //         this.container.style.position = 'relative';
// //         this.container.addEventListener('mouseenter', this.handleMouseEnter);
// //         this.container.addEventListener('mouseleave', this.handleMouseLeave);
// //         if (this.autoplay) {
// //             this.animateSequence();
// //         }
// //     }
// //     /**
// //      * Clear all existing animation timeouts
// //      */
// //     clearAnimationTimeouts() {
// //         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
// //         this.animationTimeouts = [];
// //     }
// //     /**
// //      * Animate the sequence of revealing, pausing, and fading out
// //      */
// //     animateSequence() {
// //         this.clearAnimationTimeouts();
// //         this.children.forEach(child => {
// //             child.style.opacity = '0';
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //                 child.currentTime = 0;
// //             }
// //         });
// //         if (!this.isAnimating) return;
// //         const revealDelay = this.speed;
// //         // Reveal children sequentially
// //         this.children.forEach((child, index) => {
// //             const timeout = setTimeout(() => {
// //                 if (this.isAnimating) {
// //                     child.style.opacity = '1';
// //                     if (child.tagName.toLowerCase() === 'video') {
// //                         child.play();
// //                     }
// //                 }
// //             }, index * revealDelay);
// //             this.animationTimeouts.push(timeout);
// //         });
// //         // Pause when all elements are visible
// //         const pauseStart = this.children.length * revealDelay;
// //         const pauseTimeout = setTimeout(() => {
// //             if (this.isAnimating) {
// //                 // Fade-out children in reverse order after the pause
// //                 this.fadeOutSequence(pauseStart);
// //             }
// //         }, pauseStart + this.pauseDuration);
// //         this.animationTimeouts.push(pauseTimeout);
// //     }
// //     /**
// //      * Fade-out children in reverse order
// //      */
// //     fadeOutSequence(startTime) {
// //         const fadeOutDelay = this.speed;
// //         this.children
// //             .slice()
// //             .reverse()
// //             .forEach((child, index) => {
// //                 const timeout = setTimeout(() => {
// //                     if (this.isAnimating) {
// //                         child.style.opacity = '0';
// //                         if (child.tagName.toLowerCase() === 'video') {
// //                             child.pause();
// //                             child.currentTime = 0;
// //                         }
// //                     }
// //                 }, startTime + index * fadeOutDelay);
// //                 this.animationTimeouts.push(timeout);
// //             });
// //         // Restart the sequence after fade-out
// //         const restartTime = startTime + this.children.length * fadeOutDelay;
// //         const restartTimeout = setTimeout(() => {
// //             if (this.isAnimating) {
// //                 this.animateSequence();
// //             }
// //         }, restartTime);
// //         this.animationTimeouts.push(restartTimeout);
// //     }
// //     /**
// //      * Pause animation on mouse enter
// //      */
// //     handleMouseEnter() {
// //         this.isAnimating = false;
// //         this.clearAnimationTimeouts();
// //         this.children.forEach(child => {
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //             }
// //         });
// //     }
// //     /**
// //      * Resume animation on mouse leave
// //      */
// //     handleMouseLeave() {
// //         this.isAnimating = true;
// //         this.animateSequence();
// //     }
// //     /**
// //      * Manually start the animation
// //      */
// //     start() {
// //         this.isAnimating = true;
// //         this.animateSequence();
// //     }
// //     /**
// //      * Manually stop the animation
// //      */
// //     stop() {
// //         this.isAnimating = false;
// //         this.clearAnimationTimeouts();
// //         this.children.forEach(child => {
// //             child.style.opacity = '0';
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //                 child.currentTime = 0;
// //             }
// //         });
// //     }
// //     /**
// //      * Destroy the animation and clean up
// //      */
// //     destroy() {
// //         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
// //         this.container.removeEventListener('mouseleave', this.handleMouseLeave);
// //         this.clearAnimationTimeouts();
// //         this.container.classList.remove('llm-hero-animation');
// //         this.container.style.position = '';
// //         this.children.forEach(child => {
// //             child.classList.remove('llm-hero-item');
// //             child.style.opacity = '';
// //             child.style.transition = '';
// //         });
// //     }
// // }
// // // Expose to global scope if not using a module system
// // if (typeof window !== 'undefined') {
// //     window.LLMHeroAnimation = LLMHeroAnimation;
// // }
// // export default LLMHeroAnimation;
// class LLMHeroAnimation {
//     /**
//      * Create a new LLM Hero Animation
//      * @param {Object} options - Configuration options
//      * @param {HTMLElement} options.container - The container element
//      * @param {number} [options.speed=1000] - Time per element (ms)
//      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
//      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
//      */
//     constructor(options) {
//         this.container = options.container;
//         this.speed = options.speed ?? 1000; // Time per element
//         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
//         this.autoplay = options.autoplay ?? true;
//         // Internal state tracking
//         this.children = Array.from(this.container.children);
//         this.animationTimeouts = [];
//         this.isAnimating = this.autoplay;
//         this.currentStep = 0; // Track the current position in the sequence
//         this.isPaused = false; // Track whether the animation is paused
//         // Bind methods to maintain correct context
//         this.animateSequence = this.animateSequence.bind(this);
//         this.resumeSequence = this.resumeSequence.bind(this);
//         this.handleMouseEnter = this.handleMouseEnter.bind(this);
//         this.handleMouseLeave = this.handleMouseLeave.bind(this);
//         // Initial setup
//         this.init();
//     }
//     /**
//      * Initialize the animation
//      */
//     init() {
//         this.container.classList.add('llm-hero-animation');
//         this.children.forEach((child) => {
//             child.classList.add('llm-hero-item');
//             child.style.opacity = '0';
//             child.style.transition = 'opacity 0.3s ease-in-out';
//         });
//         this.container.style.position = 'relative';
//         this.container.addEventListener('mouseenter', this.handleMouseEnter);
//         this.container.addEventListener('mouseleave', this.handleMouseLeave);
//         if (this.autoplay) {
//             this.animateSequence();
//         }
//     }
//     /**
//      * Clear all existing animation timeouts
//      */
//     clearAnimationTimeouts() {
//         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//         this.animationTimeouts = [];
//     }
//     /**
//      * Animate the sequence of revealing, pausing, and fading out
//      */
//     animateSequence() {
//         this.clearAnimationTimeouts();
//         if (!this.isAnimating || this.isPaused) return;
//         const totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
//         const revealSteps = this.children.length;
//         const fadeOutSteps = this.children.length;
//         const pauseStep = revealSteps; // The step when all elements are visible
//         if (this.currentStep < revealSteps) {
//             // Reveal sequence
//             const child = this.children[this.currentStep];
//             if (child) {
//                 child.style.opacity = '1';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.play();
//                 }
//             }
//         } else if (this.currentStep === pauseStep) {
//             // Pause when all elements are visible
//             setTimeout(() => {
//                 this.currentStep++;
//                 this.animateSequence();
//             }, this.pauseDuration);
//             return;
//         } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
//             // Fade-out sequence
//             const fadeOutIndex = this.currentStep - pauseStep - 1;
//             const child = this.children[this.children.length - 1 - fadeOutIndex];
//             if (child) {
//                 child.style.opacity = '0';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.pause();
//                     child.currentTime = 0;
//                 }
//             }
//         } else {
//             // Restart sequence
//             this.currentStep = 0;
//             this.animateSequence();
//             return;
//         }
//         // Move to the next step
//         this.currentStep++;
//         const nextTimeout = setTimeout(() => {
//             this.animateSequence();
//         }, this.speed);
//         this.animationTimeouts.push(nextTimeout);
//     }
//     /**
//      * Resume animation from the current step
//      */
//     resumeSequence() {
//         this.isPaused = false;
//         this.animateSequence();
//     }
//     /**
//      * Pause animation on mouse enter or manual stop
//      */
//     handleMouseEnter() {
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }
//     /**
//      * Resume animation on mouse leave or manual start
//      */
//     handleMouseLeave() {
//         this.resumeSequence();
//     }
//     /**
//      * Manually start the animation
//      */
//     start() {
//         this.isAnimating = true;
//         this.resumeSequence();
//     }
//     /**
//      * Manually stop the animation
//      */
//     stop() {
//         this.isAnimating = false;
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }
//     /**
//      * Destroy the animation and clean up
//      */
//     destroy() {
//         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
//         this.container.removeEventListener('mouseleave', this.handleMouseLeave);
//         this.clearAnimationTimeouts();
//         this.container.classList.remove('llm-hero-animation');
//         this.container.style.position = '';
//         this.children.forEach(child => {
//             child.classList.remove('llm-hero-item');
//             child.style.opacity = '';
//             child.style.transition = '';
//         });
//     }
// }
// // Expose to global scope if not using a module system
// if (typeof window !== 'undefined') {
//     window.LLMHeroAnimation = LLMHeroAnimation;
// }
// export default LLMHeroAnimation;
// class LLMHeroAnimation {
//     /**
//      * Create a new LLM Hero Animation
//      * @param {Object} options - Configuration options
//      * @param {HTMLElement} options.container - The container element
//      * @param {number} [options.speed=1000] - Time per element (ms)
//      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
//      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
//      */
//     constructor(options) {
//         this.container = options.container;
//         this.speed = options.speed ?? 1000; // Time per element
//         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
//         this.autoplay = options.autoplay ?? true;
//         // Internal state tracking
//         this.children = Array.from(this.container.children);
//         this.animationTimeouts = [];
//         this.isAnimating = this.autoplay;
//         this.currentStep = 0; // Track the current position in the sequence
//         this.isPaused = false; // Track whether the animation is paused
//         this.hasReachedMidpoint = false; // Ensures animation reaches at least 50%
//         // Bind methods to maintain correct context
//         this.animateSequence = this.animateSequence.bind(this);
//         this.resumeSequence = this.resumeSequence.bind(this);
//         this.handleMouseEnter = this.handleMouseEnter.bind(this);
//         this.handleMouseLeave = this.handleMouseLeave.bind(this);
//         // Initial setup
//         this.init();
//     }
//     /**
//      * Initialize the animation
//      */
//     init() {
//         this.container.classList.add('llm-hero-animation');
//         this.children.forEach((child) => {
//             child.classList.add('llm-hero-item');
//             child.style.opacity = '0';
//             child.style.transition = 'opacity 0.3s ease-in-out';
//         });
//         this.container.style.position = 'relative';
//         this.container.addEventListener('mouseenter', this.handleMouseEnter);
//         this.container.addEventListener('mouseleave', this.handleMouseLeave);
//         if (this.autoplay) {
//             this.animateSequence();
//         }
//     }
//     /**
//      * Clear all existing animation timeouts
//      */
//     clearAnimationTimeouts() {
//         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//         this.animationTimeouts = [];
//     }
//     /**
//      * Animate the sequence of revealing, pausing, and fading out
//      */
//     animateSequence() {
//         this.clearAnimationTimeouts();
//         if (!this.isAnimating || this.isPaused) return;
//         const totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
//         const revealSteps = this.children.length;
//         const fadeOutSteps = this.children.length;
//         const pauseStep = revealSteps; // The step when all elements are visible
//         if (this.currentStep < revealSteps) {
//             // Reveal sequence
//             const child = this.children[this.currentStep];
//             if (child) {
//                 child.style.opacity = '1';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.play();
//                 }
//             }
//         } else if (this.currentStep === pauseStep) {
//             // Pause when all elements are visible
//             this.hasReachedMidpoint = true; // Mark that the animation has reached 50%
//             setTimeout(() => {
//                 this.currentStep++;
//                 this.animateSequence();
//             }, this.pauseDuration);
//             return;
//         } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
//             // Fade-out sequence
//             const fadeOutIndex = this.currentStep - pauseStep - 1;
//             const child = this.children[this.children.length - 1 - fadeOutIndex];
//             if (child) {
//                 child.style.opacity = '0';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.pause();
//                     child.currentTime = 0;
//                 }
//             }
//         } else {
//             // Restart sequence
//             this.currentStep = 0;
//             this.animateSequence();
//             return;
//         }
//         // Move to the next step
//         this.currentStep++;
//         const nextTimeout = setTimeout(() => {
//             this.animateSequence();
//         }, this.speed);
//         this.animationTimeouts.push(nextTimeout);
//     }
//     /**
//      * Resume animation from the current step
//      */
//     resumeSequence() {
//         this.isPaused = false;
//         this.animateSequence();
//     }
//     /**
//      * Pause animation on mouse enter or manual stop
//      */
//     handleMouseEnter() {
//         if (this.hasReachedMidpoint) {
//             // Only allow pausing if the animation has reached at least 50%
//             this.isPaused = true;
//             this.clearAnimationTimeouts();
//         }
//     }
//     /**
//      * Resume animation on mouse leave or manual start
//      */
//     handleMouseLeave() {
//         if (this.hasReachedMidpoint) {
//             this.resumeSequence();
//         }
//     }
//     /**
//      * Manually start the animation
//      */
//     start() {
//         this.isAnimating = true;
//         this.resumeSequence();
//     }
//     /**
//      * Manually stop the animation
//      */
//     stop() {
//         this.isAnimating = false;
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }
//     /**
//      * Destroy the animation and clean up
//      */
//     destroy() {
//         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
//         this.container.removeEventListener('mouseleave', this.handleMouseLeave);
//         this.clearAnimationTimeouts();
//         this.container.classList.remove('llm-hero-animation');
//         this.container.style.position = '';
//         this.children.forEach(child => {
//             child.classList.remove('llm-hero-item');
//             child.style.opacity = '';
//             child.style.transition = '';
//         });
//     }
// }
// // Expose to global scope if not using a module system
// if (typeof window !== 'undefined') {
//     window.LLMHeroAnimation = LLMHeroAnimation;
// }
// export default LLMHeroAnimation;
var LLMHeroAnimation = /*#__PURE__*/function () {
  /**
   * Create a new LLM Hero Animation
   * @param {Object} options - Configuration options
   * @param {HTMLElement} options.container - The container element
   * @param {number} [options.speed=1000] - Time per element (ms)
   * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
   * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
   */
  function LLMHeroAnimation(options) {
    var _options$speed, _options$pauseDuratio, _options$autoplay;
    _classCallCheck(this, LLMHeroAnimation);
    this.container = options.container;
    this.speed = (_options$speed = options.speed) !== null && _options$speed !== void 0 ? _options$speed : 1000; // Time per element
    this.pauseDuration = (_options$pauseDuratio = options.pauseDuration) !== null && _options$pauseDuratio !== void 0 ? _options$pauseDuratio : 1000; // Pause duration when all elements are visible
    this.autoplay = (_options$autoplay = options.autoplay) !== null && _options$autoplay !== void 0 ? _options$autoplay : true;

    // Internal state tracking
    this.children = Array.from(this.container.children);
    this.animationTimeouts = [];
    this.isAnimating = this.autoplay;
    this.currentStep = 0; // Track the current position in the sequence
    this.isPaused = false; // Track whether the animation is paused
    this.hasPassedMidpoint = false; // Ensures pausing is only allowed past 50%

    // Bind methods to maintain correct context
    this.animateSequence = this.animateSequence.bind(this);
    this.resumeSequence = this.resumeSequence.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    // Initial setup
    this.init();
  }

  /**
   * Initialize the animation
   */
  return _createClass(LLMHeroAnimation, [{
    key: "init",
    value: function init() {
      this.container.classList.add('llm-hero-animation');
      this.children.forEach(function (child) {
        child.classList.add('llm-hero-item');
        child.style.opacity = '0';
        child.style.transition = 'opacity 0.3s ease-in-out';
      });
      this.container.style.position = 'relative';
      this.container.addEventListener('mouseenter', this.handleMouseEnter);
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
      if (this.autoplay) {
        this.animateSequence();
      }
    }

    /**
     * Clear all existing animation timeouts
     */
  }, {
    key: "clearAnimationTimeouts",
    value: function clearAnimationTimeouts() {
      this.animationTimeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      this.animationTimeouts = [];
    }

    /**
     * Animate the sequence of revealing, pausing, and fading out
     */
  }, {
    key: "animateSequence",
    value: function animateSequence() {
      var _this = this;
      this.clearAnimationTimeouts();
      if (!this.isAnimating || this.isPaused) return;
      var totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
      var revealSteps = this.children.length;
      var fadeOutSteps = this.children.length;
      var pauseStep = revealSteps; // The step when all elements are visible

      if (this.currentStep < revealSteps) {
        // Reveal sequence
        var child = this.children[this.currentStep];
        if (child) {
          child.style.opacity = '1';
          if (child.tagName.toLowerCase() === 'video') {
            child.play();
          }
        }
      } else if (this.currentStep === pauseStep) {
        // Pause when all elements are visible
        setTimeout(function () {
          _this.currentStep++;
          _this.animateSequence();
        }, this.pauseDuration);
        return;
      } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
        // Mark that animation has passed the midpoint
        this.hasPassedMidpoint = true;

        // Fade-out sequence
        var fadeOutIndex = this.currentStep - pauseStep - 1;
        var _child = this.children[this.children.length - 1 - fadeOutIndex];
        if (_child) {
          _child.style.opacity = '0';
          if (_child.tagName.toLowerCase() === 'video') {
            _child.pause();
            _child.currentTime = 0;
          }
        }
      } else {
        // Restart sequence
        this.currentStep = 0;
        this.hasPassedMidpoint = false; // Reset midpoint flag
        this.animateSequence();
        return;
      }

      // Move to the next step
      this.currentStep++;
      var nextTimeout = setTimeout(function () {
        _this.animateSequence();
      }, this.speed);
      this.animationTimeouts.push(nextTimeout);
    }

    /**
     * Resume animation from the current step
     */
  }, {
    key: "resumeSequence",
    value: function resumeSequence() {
      this.isPaused = false;
      this.animateSequence();
    }

    /**
     * Pause animation on mouse enter or manual stop
     */
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      if (this.hasPassedMidpoint) {
        // Only allow pausing if the animation has passed the midpoint (start of fade-out)
        this.isPaused = true;
        this.clearAnimationTimeouts();
      }
    }

    /**
     * Resume animation on mouse leave or manual start
     */
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      if (this.hasPassedMidpoint) {
        this.resumeSequence();
      }
    }

    /**
     * Manually start the animation
     */
  }, {
    key: "start",
    value: function start() {
      this.isAnimating = true;
      this.resumeSequence();
    }

    /**
     * Manually stop the animation
     */
  }, {
    key: "stop",
    value: function stop() {
      this.isAnimating = false;
      this.isPaused = true;
      this.clearAnimationTimeouts();
    }

    /**
     * Destroy the animation and clean up
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.container.removeEventListener('mouseenter', this.handleMouseEnter);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
      this.clearAnimationTimeouts();
      this.container.classList.remove('llm-hero-animation');
      this.container.style.position = '';
      this.children.forEach(function (child) {
        child.classList.remove('llm-hero-item');
        child.style.opacity = '';
        child.style.transition = '';
      });
    }
  }]);
}(); // Expose to global scope if not using a module system
if (typeof window !== 'undefined') {
  window.LLMHeroAnimation = LLMHeroAnimation;
}
var _default = exports.default = LLMHeroAnimation;
},{}],"../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/vanilla.js"], null)
//# sourceMappingURL=/vanilla.87d10076.js.map