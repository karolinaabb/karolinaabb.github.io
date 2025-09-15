(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/lazysizes.js
  var require_lazysizes = __commonJS({
    "ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes;
        }
      })(
        typeof window != "undefined" ? window : {},
        /**
         * import("./types/global")
         * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
         */
        function l(window2, document2, Date2) {
          "use strict";
          var lazysizes, lazySizesCfg;
          (function() {
            var prop;
            var lazySizesDefaults = {
              lazyClass: "lazyload",
              loadedClass: "lazyloaded",
              loadingClass: "lazyloading",
              preloadClass: "lazypreload",
              errorClass: "lazyerror",
              //strictClass: 'lazystrict',
              autosizesClass: "lazyautosizes",
              fastLoadedClass: "ls-is-cached",
              iframeLoadMode: 0,
              srcAttr: "data-src",
              srcsetAttr: "data-srcset",
              sizesAttr: "data-sizes",
              //preloadAfterLoad: false,
              minSize: 40,
              customMedia: {},
              init: true,
              expFactor: 1.5,
              hFac: 0.8,
              loadMode: 2,
              loadHidden: true,
              ricTimeout: 0,
              throttleDelay: 125
            };
            lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
            for (prop in lazySizesDefaults) {
              if (!(prop in lazySizesCfg)) {
                lazySizesCfg[prop] = lazySizesDefaults[prop];
              }
            }
          })();
          if (!document2 || !document2.getElementsByClassName) {
            return {
              init: function() {
              },
              /**
               * @type { LazySizesConfigPartial }
               */
              cfg: lazySizesCfg,
              /**
               * @type { true }
               */
              noSupport: true
            };
          }
          var docElem = document2.documentElement;
          var supportPicture = window2.HTMLPictureElement;
          var _addEventListener = "addEventListener";
          var _getAttribute = "getAttribute";
          var addEventListener = window2[_addEventListener].bind(window2);
          var setTimeout2 = window2.setTimeout;
          var requestAnimationFrame2 = window2.requestAnimationFrame || setTimeout2;
          var requestIdleCallback = window2.requestIdleCallback;
          var regPicture = /^picture$/i;
          var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
          var regClassCache = {};
          var forEach = Array.prototype.forEach;
          var hasClass = function(ele, cls) {
            if (!regClassCache[cls]) {
              regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            }
            return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
          };
          var addClass = function(ele, cls) {
            if (!hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
            }
          };
          var removeClass = function(ele, cls) {
            var reg;
            if (reg = hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
            }
          };
          var addRemoveLoadEvents = function(dom, fn, add) {
            var action = add ? _addEventListener : "removeEventListener";
            if (add) {
              addRemoveLoadEvents(dom, fn);
            }
            loadEvents.forEach(function(evt) {
              dom[action](evt, fn);
            });
          };
          var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
            var event = document2.createEvent("Event");
            if (!detail) {
              detail = {};
            }
            detail.instance = lazysizes;
            event.initEvent(name, !noBubbles, !noCancelable);
            event.detail = detail;
            elem.dispatchEvent(event);
            return event;
          };
          var updatePolyfill = function(el2, full) {
            var polyfill;
            if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
              if (full && full.src && !el2[_getAttribute]("srcset")) {
                el2.setAttribute("srcset", full.src);
              }
              polyfill({ reevaluate: true, elements: [el2] });
            } else if (full && full.src) {
              el2.src = full.src;
            }
          };
          var getCSS = function(elem, style) {
            return (getComputedStyle(elem, null) || {})[style];
          };
          var getWidth = function(elem, parent, width) {
            width = width || elem.offsetWidth;
            while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
              width = parent.offsetWidth;
              parent = parent.parentNode;
            }
            return width;
          };
          var rAF = function() {
            var running, waiting;
            var firstFns = [];
            var secondFns = [];
            var fns = firstFns;
            var run = function() {
              var runFns = fns;
              fns = firstFns.length ? secondFns : firstFns;
              running = true;
              waiting = false;
              while (runFns.length) {
                runFns.shift()();
              }
              running = false;
            };
            var rafBatch = function(fn, queue) {
              if (running && !queue) {
                fn.apply(this, arguments);
              } else {
                fns.push(fn);
                if (!waiting) {
                  waiting = true;
                  (document2.hidden ? setTimeout2 : requestAnimationFrame2)(run);
                }
              }
            };
            rafBatch._lsFlush = run;
            return rafBatch;
          }();
          var rAFIt = function(fn, simple) {
            return simple ? function() {
              rAF(fn);
            } : function() {
              var that = this;
              var args = arguments;
              rAF(function() {
                fn.apply(that, args);
              });
            };
          };
          var throttle = function(fn) {
            var running;
            var lastTime = 0;
            var gDelay = lazySizesCfg.throttleDelay;
            var rICTimeout = lazySizesCfg.ricTimeout;
            var run = function() {
              running = false;
              lastTime = Date2.now();
              fn();
            };
            var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
              requestIdleCallback(run, { timeout: rICTimeout });
              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                rICTimeout = lazySizesCfg.ricTimeout;
              }
            } : rAFIt(function() {
              setTimeout2(run);
            }, true);
            return function(isPriority) {
              var delay;
              if (isPriority = isPriority === true) {
                rICTimeout = 33;
              }
              if (running) {
                return;
              }
              running = true;
              delay = gDelay - (Date2.now() - lastTime);
              if (delay < 0) {
                delay = 0;
              }
              if (isPriority || delay < 9) {
                idleCallback();
              } else {
                setTimeout2(idleCallback, delay);
              }
            };
          };
          var debounce = function(func) {
            var timeout, timestamp;
            var wait = 99;
            var run = function() {
              timeout = null;
              func();
            };
            var later = function() {
              var last = Date2.now() - timestamp;
              if (last < wait) {
                setTimeout2(later, wait - last);
              } else {
                (requestIdleCallback || run)(run);
              }
            };
            return function() {
              timestamp = Date2.now();
              if (!timeout) {
                timeout = setTimeout2(later, wait);
              }
            };
          };
          var loader = function() {
            var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
            var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
            var regImg = /^img$/i;
            var regIframe = /^iframe$/i;
            var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
            var shrinkExpand = 0;
            var currentExpand = 0;
            var isLoading = 0;
            var lowRuns = -1;
            var resetPreloading = function(e) {
              isLoading--;
              if (!e || isLoading < 0 || !e.target) {
                isLoading = 0;
              }
            };
            var isVisible = function(elem) {
              if (isBodyHidden == null) {
                isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
              }
              return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
            };
            var isNestedVisible = function(elem, elemExpand) {
              var outerRect;
              var parent = elem;
              var visible = isVisible(elem);
              eLtop -= elemExpand;
              eLbottom += elemExpand;
              eLleft -= elemExpand;
              eLright += elemExpand;
              while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
                visible = (getCSS(parent, "opacity") || 1) > 0;
                if (visible && getCSS(parent, "overflow") != "visible") {
                  outerRect = parent.getBoundingClientRect();
                  visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
              }
              return visible;
            };
            var checkElements = function() {
              var eLlen, i2, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
              var lazyloadElems = lazysizes.elements;
              if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i2 = 0;
                lowRuns++;
                for (; i2 < eLlen; i2++) {
                  if (!lazyloadElems[i2] || lazyloadElems[i2]._lazyRace) {
                    continue;
                  }
                  if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i2])) {
                    unveilElement(lazyloadElems[i2]);
                    continue;
                  }
                  if (!(elemExpandVal = lazyloadElems[i2][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                    elemExpand = currentExpand;
                  }
                  if (!defaultExpand) {
                    defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                    lazysizes._defEx = defaultExpand;
                    preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                    hFac = lazySizesCfg.hFac;
                    isBodyHidden = null;
                    if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                      currentExpand = preloadExpand;
                      lowRuns = 0;
                    } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = shrinkExpand;
                    }
                  }
                  if (beforeExpandVal !== elemExpand) {
                    eLvW = innerWidth + elemExpand * hFac;
                    elvH = innerHeight + elemExpand;
                    elemNegativeExpand = elemExpand * -1;
                    beforeExpandVal = elemExpand;
                  }
                  rect = lazyloadElems[i2].getBoundingClientRect();
                  if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i2])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i2], elemExpand))) {
                    unveilElement(lazyloadElems[i2]);
                    loadedSomething = true;
                    if (isLoading > 9) {
                      break;
                    }
                  } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i2][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i2];
                  }
                }
                if (autoLoadElem && !loadedSomething) {
                  unveilElement(autoLoadElem);
                }
              }
            };
            var throttledCheckElements = throttle(checkElements);
            var switchLoadingClass = function(e) {
              var elem = e.target;
              if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
              }
              resetPreloading(e);
              addClass(elem, lazySizesCfg.loadedClass);
              removeClass(elem, lazySizesCfg.loadingClass);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass);
              triggerEvent(elem, "lazyloaded");
            };
            var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
            var rafSwitchLoadingClass = function(e) {
              rafedSwitchLoadingClass({ target: e.target });
            };
            var changeIframeSrc = function(elem, src) {
              var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
              if (loadMode2 == 0) {
                elem.contentWindow.location.replace(src);
              } else if (loadMode2 == 1) {
                elem.src = src;
              }
            };
            var handleSources = function(source) {
              var customMedia;
              var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
              if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
                source.setAttribute("media", customMedia);
              }
              if (sourceSrcset) {
                source.setAttribute("srcset", sourceSrcset);
              }
            };
            var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
              var src, srcset, parent, isPicture, event, firesLoad;
              if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
                if (sizes) {
                  if (isAuto) {
                    addClass(elem, lazySizesCfg.autosizesClass);
                  } else {
                    elem.setAttribute("sizes", sizes);
                  }
                }
                srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                src = elem[_getAttribute](lazySizesCfg.srcAttr);
                if (isImg) {
                  parent = elem.parentNode;
                  isPicture = parent && regPicture.test(parent.nodeName || "");
                }
                firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
                event = { target: elem };
                addClass(elem, lazySizesCfg.loadingClass);
                if (firesLoad) {
                  clearTimeout(resetPreloadingTimer);
                  resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                  addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }
                if (isPicture) {
                  forEach.call(parent.getElementsByTagName("source"), handleSources);
                }
                if (srcset) {
                  elem.setAttribute("srcset", srcset);
                } else if (src && !isPicture) {
                  if (regIframe.test(elem.nodeName)) {
                    changeIframeSrc(elem, src);
                  } else {
                    elem.src = src;
                  }
                }
                if (isImg && (srcset || isPicture)) {
                  updatePolyfill(elem, { src });
                }
              }
              if (elem._lazyRace) {
                delete elem._lazyRace;
              }
              removeClass(elem, lazySizesCfg.lazyClass);
              rAF(function() {
                var isLoaded = elem.complete && elem.naturalWidth > 1;
                if (!firesLoad || isLoaded) {
                  if (isLoaded) {
                    addClass(elem, lazySizesCfg.fastLoadedClass);
                  }
                  switchLoadingClass(event);
                  elem._lazyCache = true;
                  setTimeout2(function() {
                    if ("_lazyCache" in elem) {
                      delete elem._lazyCache;
                    }
                  }, 9);
                }
                if (elem.loading == "lazy") {
                  isLoading--;
                }
              }, true);
            });
            var unveilElement = function(elem) {
              if (elem._lazyRace) {
                return;
              }
              var detail;
              var isImg = regImg.test(elem.nodeName);
              var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
              var isAuto = sizes == "auto";
              if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
                return;
              }
              detail = triggerEvent(elem, "lazyunveilread").detail;
              if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
              }
              elem._lazyRace = true;
              isLoading++;
              lazyUnveil(elem, detail, isAuto, sizes, isImg);
            };
            var afterScroll = debounce(function() {
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
            });
            var altLoadmodeScrollListner = function() {
              if (lazySizesCfg.loadMode == 3) {
                lazySizesCfg.loadMode = 2;
              }
              afterScroll();
            };
            var onload = function() {
              if (isCompleted) {
                return;
              }
              if (Date2.now() - started < 999) {
                setTimeout2(onload, 999);
                return;
              }
              isCompleted = true;
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
              addEventListener("scroll", altLoadmodeScrollListner, true);
            };
            return {
              _: function() {
                started = Date2.now();
                lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
                preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
                addEventListener("scroll", throttledCheckElements, true);
                addEventListener("resize", throttledCheckElements, true);
                addEventListener("pageshow", function(e) {
                  if (e.persisted) {
                    var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                    if (loadingElements.length && loadingElements.forEach) {
                      requestAnimationFrame2(function() {
                        loadingElements.forEach(function(img) {
                          if (img.complete) {
                            unveilElement(img);
                          }
                        });
                      });
                    }
                  }
                });
                if (window2.MutationObserver) {
                  new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
                } else {
                  docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                  docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                  setInterval(throttledCheckElements, 999);
                }
                addEventListener("hashchange", throttledCheckElements, true);
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                  document2[_addEventListener](name, throttledCheckElements, true);
                });
                if (/d$|^c/.test(document2.readyState)) {
                  onload();
                } else {
                  addEventListener("load", onload);
                  document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                  setTimeout2(onload, 2e4);
                }
                if (lazysizes.elements.length) {
                  checkElements();
                  rAF._lsFlush();
                } else {
                  throttledCheckElements();
                }
              },
              checkElems: throttledCheckElements,
              unveil: unveilElement,
              _aLSL: altLoadmodeScrollListner
            };
          }();
          var autoSizer = function() {
            var autosizesElems;
            var sizeElement = rAFIt(function(elem, parent, event, width) {
              var sources, i2, len;
              elem._lazysizesWidth = width;
              width += "px";
              elem.setAttribute("sizes", width);
              if (regPicture.test(parent.nodeName || "")) {
                sources = parent.getElementsByTagName("source");
                for (i2 = 0, len = sources.length; i2 < len; i2++) {
                  sources[i2].setAttribute("sizes", width);
                }
              }
              if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
              }
            });
            var getSizeElement = function(elem, dataAttr, width) {
              var event;
              var parent = elem.parentNode;
              if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
                if (!event.defaultPrevented) {
                  width = event.detail.width;
                  if (width && width !== elem._lazysizesWidth) {
                    sizeElement(elem, parent, event, width);
                  }
                }
              }
            };
            var updateElementsSizes = function() {
              var i2;
              var len = autosizesElems.length;
              if (len) {
                i2 = 0;
                for (; i2 < len; i2++) {
                  getSizeElement(autosizesElems[i2]);
                }
              }
            };
            var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
            return {
              _: function() {
                autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
                addEventListener("resize", debouncedUpdateElementsSizes);
              },
              checkElems: debouncedUpdateElementsSizes,
              updateElem: getSizeElement
            };
          }();
          var init = function() {
            if (!init.i && document2.getElementsByClassName) {
              init.i = true;
              autoSizer._();
              loader._();
            }
          };
          setTimeout2(function() {
            if (lazySizesCfg.init) {
              init();
            }
          });
          lazysizes = {
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            autoSizer,
            loader,
            init,
            uP: updatePolyfill,
            aC: addClass,
            rC: removeClass,
            hC: hasClass,
            fire: triggerEvent,
            gW: getWidth,
            rAF
          };
          return lazysizes;
        }
      );
    }
  });

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/menu.js
  var el = document.getElementById("menu-toggle");
  if (el) {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.getElementById("menu");
      el.ariaExpanded = target.classList.contains("hidden");
      target.classList.toggle("hidden");
    });
  }

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/justified-layout.ts
  var Row = class {
    top;
    rowWidth;
    spacing;
    rowHeight;
    heightTolerance;
    minAspectRatio;
    maxAspectRatio;
    items = [];
    height = 0;
    oneColumn;
    constructor(params) {
      this.top = params.top;
      this.rowWidth = params.rowWidth;
      this.spacing = params.spacing;
      this.rowHeight = params.rowHeight;
      this.heightTolerance = params.heightTolerance;
      this.minAspectRatio = this.rowWidth / params.rowHeight * (1 - params.heightTolerance);
      this.maxAspectRatio = this.rowWidth / params.rowHeight * (1 + params.heightTolerance);
      this.oneColumn = !!params.oneColumn;
    }
    /**
     * Attempt to add a single item to the row.
     * This is the heart of the justified algorithm.
     * This method is direction-agnostic; it deals only with sizes, not positions.
     *
     * If the item fits in the row, without pushing row height beyond min/max tolerance,
     * the item is added and the method returns true.
     *
     * If the item leaves row height too high, there may be room to scale it down and add another item.
     * In this case, the item is added and the method returns true, but the row is incomplete.
     *
     * If the item leaves row height too short, there are too many items to fit within tolerance.
     * The method will either accept or reject the new item, favoring the resulting row height closest to within tolerance.
     * If the item is rejected, left/right padding will be required to fit the row height within tolerance;
     * if the item is accepted, top/bottom cropping will be required to fit the row height within tolerance.
     *
     * @return {boolean} True if successfully added; false if rejected.
     */
    addItem(aspectRatio) {
      const itemData = { aspectRatio };
      if (this.oneColumn) {
        this.items = [itemData];
        const rowWidthWithoutSpacing2 = this.rowWidth;
        const targetRowHeight2 = rowWidthWithoutSpacing2 / itemData.aspectRatio;
        this.completeLayout(targetRowHeight2);
        return true;
      }
      const newItems = this.items.concat(itemData);
      const rowWidthWithoutSpacing = this.rowWidth - (newItems.length - 1) * this.spacing;
      const newAspectRatio = newItems.reduce(function(sum, item) {
        return sum + item.aspectRatio;
      }, 0);
      const targetAspectRatio = rowWidthWithoutSpacing / this.rowHeight;
      if (newAspectRatio < this.minAspectRatio) {
        this.items.push(itemData);
        return true;
      } else if (newAspectRatio > this.maxAspectRatio) {
        if (this.items.length === 0) {
          this.items.push(itemData);
          this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
          return true;
        }
        const previousRowWidthWithoutSpacing = this.rowWidth - (this.items.length - 1) * this.spacing;
        const previousAspectRatio = this.items.reduce(function(sum, item) {
          return sum + item.aspectRatio;
        }, 0);
        const previousTargetAspectRatio = previousRowWidthWithoutSpacing / this.rowHeight;
        if (Math.abs(newAspectRatio - targetAspectRatio) > Math.abs(previousAspectRatio - previousTargetAspectRatio)) {
          this.completeLayout(previousRowWidthWithoutSpacing / previousAspectRatio);
          return false;
        } else {
          this.items.push(itemData);
          this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
          return true;
        }
      } else {
        this.items.push(itemData);
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
        return true;
      }
    }
    /**
     * Set row height and compute item geometry from that height.
     */
    completeLayout(newHeight) {
      const rowWidthWithoutSpacing = this.rowWidth - (this.items.length - 1) * this.spacing;
      let clampedToNativeRatio;
      const clampedHeight = Math.max(0.5 * this.rowHeight, Math.min(newHeight, 2 * this.rowHeight));
      if (newHeight !== clampedHeight) {
        this.height = clampedHeight;
        clampedToNativeRatio = rowWidthWithoutSpacing / clampedHeight / (rowWidthWithoutSpacing / newHeight);
      } else {
        this.height = newHeight;
        clampedToNativeRatio = 1;
      }
      let itemWidthSum = 0;
      for (const item of this.items) {
        item.top = this.top;
        item.width = item.aspectRatio * this.height * clampedToNativeRatio;
        item.height = this.height;
        item.left = itemWidthSum;
        itemWidthSum += item.width + this.spacing;
      }
    }
  };
  function justified_layout_default(aspectRatios, layoutOptions) {
    let containerHeight = 0;
    let boxes = [];
    let currentRow;
    let lastRowHeight = 0;
    for (const aspectRatio of aspectRatios) {
      if (!currentRow) {
        currentRow = new Row({ top: containerHeight, ...layoutOptions });
      }
      let itemAdded = currentRow.addItem(aspectRatio);
      if (currentRow.height > 0) {
        lastRowHeight = currentRow.height;
        boxes = boxes.concat(currentRow.items);
        containerHeight += currentRow.height + layoutOptions.spacing;
        currentRow = new Row({ top: containerHeight, ...layoutOptions });
        if (!itemAdded) {
          itemAdded = currentRow.addItem(aspectRatio);
          if (currentRow.height > 0) {
            lastRowHeight = currentRow.height;
            boxes = boxes.concat(currentRow.items);
            containerHeight += currentRow.height + layoutOptions.spacing;
            currentRow = new Row({ top: containerHeight, ...layoutOptions });
          }
        }
      }
    }
    if (currentRow && currentRow.items.length) {
      currentRow.completeLayout(lastRowHeight || layoutOptions.rowHeight);
      boxes = boxes.concat(currentRow.items);
      containerHeight += currentRow.height + layoutOptions.spacing;
    }
    containerHeight -= layoutOptions.spacing;
    return { containerHeight, boxes };
  }

  // ns-hugo-params:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/gallery.js
  var boxSpacing = 8;
  var oneColumn = true;
  var targetRowHeight = 288;
  var targetRowHeightTolerance = 0.25;

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/gallery.js
  var gallery = document.getElementById("gallery");
  if (gallery) {
    let updateGallery = function() {
      if (containerWidth === gallery.getBoundingClientRect().width) return;
      containerWidth = gallery.getBoundingClientRect().width;
      const layout = justified_layout_default(aspectRatios, {
        rowWidth: containerWidth,
        spacing: Number.isInteger(boxSpacing) ? boxSpacing : 8,
        rowHeight: targetRowHeight || 288,
        heightTolerance: Number.isInteger(targetRowHeightTolerance) ? targetRowHeightTolerance : 0.25,
        oneColumn: oneColumn || false
      });
      items.forEach((item, i2) => {
        const { width, height, top, left } = layout.boxes[i2];
        item.style.position = "absolute";
        item.style.width = width + "px";
        item.style.height = height + "px";
        item.style.top = top + "px";
        item.style.left = left + "px";
        item.style.overflow = "hidden";
      });
      gallery.style.position = "relative";
      gallery.style.height = layout.containerHeight + "px";
      gallery.style.visibility = "";
    };
    let containerWidth = 0;
    const items = gallery.querySelectorAll(".gallery-item");
    const aspectRatios = Array.from(items).map((item) => {
      const img = item.querySelector("img");
      img.style.width = "100%";
      img.style.height = "auto";
      return parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
    });
    window.addEventListener("resize", updateGallery);
    window.addEventListener("orientationchange", updateGallery);
    updateGallery();
    updateGallery();
  }

  // <stdin>
  var import_lazysizes = __toESM(require_lazysizes());

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/photoswipe/photoswipe-lightbox.esm.js
  function createElement(className, tagName, appendToEl) {
    const el2 = document.createElement(tagName);
    if (className) {
      el2.className = className;
    }
    if (appendToEl) {
      appendToEl.appendChild(el2);
    }
    return el2;
  }
  function toTransformString(x, y, scale) {
    let propValue = `translate3d(${x}px,${y || 0}px,0)`;
    if (scale !== void 0) {
      propValue += ` scale3d(${scale},${scale},1)`;
    }
    return propValue;
  }
  function setWidthHeight(el2, w, h) {
    el2.style.width = typeof w === "number" ? `${w}px` : w;
    el2.style.height = typeof h === "number" ? `${h}px` : h;
  }
  var LOAD_STATE = {
    IDLE: "idle",
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
  };
  function specialKeyUsed(e) {
    return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
  }
  function getElementsFromOption(option, legacySelector, parent = document) {
    let elements = [];
    if (option instanceof Element) {
      elements = [option];
    } else if (option instanceof NodeList || Array.isArray(option)) {
      elements = Array.from(option);
    } else {
      const selector = typeof option === "string" ? option : legacySelector;
      if (selector) {
        elements = Array.from(parent.querySelectorAll(selector));
      }
    }
    return elements;
  }
  function isPswpClass(fn) {
    return typeof fn === "function" && fn.prototype && fn.prototype.goTo;
  }
  function isSafari() {
    return !!(navigator.vendor && navigator.vendor.match(/apple/i));
  }
  var PhotoSwipeEvent = class {
    /**
     * @param {T} type
     * @param {PhotoSwipeEventsMap[T]} [details]
     */
    constructor(type, details) {
      this.type = type;
      this.defaultPrevented = false;
      if (details) {
        Object.assign(this, details);
      }
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
  };
  var Eventable = class {
    constructor() {
      this._listeners = {};
      this._filters = {};
      this.pswp = void 0;
      this.options = void 0;
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {PhotoSwipeFiltersMap[T]} fn
     * @param {number} priority
     */
    addFilter(name, fn, priority = 100) {
      var _this$_filters$name, _this$_filters$name2, _this$pswp;
      if (!this._filters[name]) {
        this._filters[name] = [];
      }
      (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
        fn,
        priority
      });
      (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
      (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {PhotoSwipeFiltersMap[T]} fn
     */
    removeFilter(name, fn) {
      if (this._filters[name]) {
        this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
      }
      if (this.pswp) {
        this.pswp.removeFilter(name, fn);
      }
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
     * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
     */
    applyFilters(name, ...args) {
      var _this$_filters$name3;
      (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach((filter) => {
        args[0] = filter.fn.apply(this, args);
      });
      return args[0];
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {EventCallback<T>} fn
     */
    on(name, fn) {
      var _this$_listeners$name, _this$pswp2;
      if (!this._listeners[name]) {
        this._listeners[name] = [];
      }
      (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn);
      (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {EventCallback<T>} fn
     */
    off(name, fn) {
      var _this$pswp3;
      if (this._listeners[name]) {
        this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
      }
      (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {PhotoSwipeEventsMap[T]} [details]
     * @returns {AugmentedEvent<T>}
     */
    dispatch(name, details) {
      var _this$_listeners$name2;
      if (this.pswp) {
        return this.pswp.dispatch(name, details);
      }
      const event = (
        /** @type {AugmentedEvent<T>} */
        new PhotoSwipeEvent(name, details)
      );
      (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach((listener) => {
        listener.call(this, event);
      });
      return event;
    }
  };
  var Placeholder = class {
    /**
     * @param {string | false} imageSrc
     * @param {HTMLElement} container
     */
    constructor(imageSrc, container) {
      this.element = createElement("pswp__img pswp__img--placeholder", imageSrc ? "img" : "div", container);
      if (imageSrc) {
        const imgEl = (
          /** @type {HTMLImageElement} */
          this.element
        );
        imgEl.decoding = "async";
        imgEl.alt = "";
        imgEl.src = imageSrc;
        imgEl.setAttribute("role", "presentation");
      }
      this.element.setAttribute("aria-hidden", "true");
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    setDisplayedSize(width, height) {
      if (!this.element) {
        return;
      }
      if (this.element.tagName === "IMG") {
        setWidthHeight(this.element, 250, "auto");
        this.element.style.transformOrigin = "0 0";
        this.element.style.transform = toTransformString(0, 0, width / 250);
      } else {
        setWidthHeight(this.element, width, height);
      }
    }
    destroy() {
      var _this$element;
      if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
        this.element.remove();
      }
      this.element = null;
    }
  };
  var Content = class {
    /**
     * @param {SlideData} itemData Slide data
     * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
     * @param {number} index
     */
    constructor(itemData, instance, index) {
      this.instance = instance;
      this.data = itemData;
      this.index = index;
      this.element = void 0;
      this.placeholder = void 0;
      this.slide = void 0;
      this.displayedImageWidth = 0;
      this.displayedImageHeight = 0;
      this.width = Number(this.data.w) || Number(this.data.width) || 0;
      this.height = Number(this.data.h) || Number(this.data.height) || 0;
      this.isAttached = false;
      this.hasSlide = false;
      this.isDecoding = false;
      this.state = LOAD_STATE.IDLE;
      if (this.data.type) {
        this.type = this.data.type;
      } else if (this.data.src) {
        this.type = "image";
      } else {
        this.type = "html";
      }
      this.instance.dispatch("contentInit", {
        content: this
      });
    }
    removePlaceholder() {
      if (this.placeholder && !this.keepPlaceholder()) {
        setTimeout(() => {
          if (this.placeholder) {
            this.placeholder.destroy();
            this.placeholder = void 0;
          }
        }, 1e3);
      }
    }
    /**
     * Preload content
     *
     * @param {boolean} isLazy
     * @param {boolean} [reload]
     */
    load(isLazy, reload) {
      if (this.slide && this.usePlaceholder()) {
        if (!this.placeholder) {
          const placeholderSrc = this.instance.applyFilters(
            "placeholderSrc",
            // use  image-based placeholder only for the first slide,
            // as rendering (even small stretched thumbnail) is an expensive operation
            this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
            this
          );
          this.placeholder = new Placeholder(placeholderSrc, this.slide.container);
        } else {
          const placeholderEl = this.placeholder.element;
          if (placeholderEl && !placeholderEl.parentElement) {
            this.slide.container.prepend(placeholderEl);
          }
        }
      }
      if (this.element && !reload) {
        return;
      }
      if (this.instance.dispatch("contentLoad", {
        content: this,
        isLazy
      }).defaultPrevented) {
        return;
      }
      if (this.isImageContent()) {
        this.element = createElement("pswp__img", "img");
        if (this.displayedImageWidth) {
          this.loadImage(isLazy);
        }
      } else {
        this.element = createElement("pswp__content", "div");
        this.element.innerHTML = this.data.html || "";
      }
      if (reload && this.slide) {
        this.slide.updateContentSize(true);
      }
    }
    /**
     * Preload image
     *
     * @param {boolean} isLazy
     */
    loadImage(isLazy) {
      var _this$data$src, _this$data$alt;
      if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
        content: this,
        isLazy
      }).defaultPrevented) {
        return;
      }
      const imageElement = (
        /** @type HTMLImageElement */
        this.element
      );
      this.updateSrcsetSizes();
      if (this.data.srcset) {
        imageElement.srcset = this.data.srcset;
      }
      imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : "";
      imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : "";
      this.state = LOAD_STATE.LOADING;
      if (imageElement.complete) {
        this.onLoaded();
      } else {
        imageElement.onload = () => {
          this.onLoaded();
        };
        imageElement.onerror = () => {
          this.onError();
        };
      }
    }
    /**
     * Assign slide to content
     *
     * @param {Slide} slide
     */
    setSlide(slide) {
      this.slide = slide;
      this.hasSlide = true;
      this.instance = slide.pswp;
    }
    /**
     * Content load success handler
     */
    onLoaded() {
      this.state = LOAD_STATE.LOADED;
      if (this.slide && this.element) {
        this.instance.dispatch("loadComplete", {
          slide: this.slide,
          content: this
        });
        if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
          this.append();
          this.slide.updateContentSize(true);
        }
        if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
          this.removePlaceholder();
        }
      }
    }
    /**
     * Content load error handler
     */
    onError() {
      this.state = LOAD_STATE.ERROR;
      if (this.slide) {
        this.displayError();
        this.instance.dispatch("loadComplete", {
          slide: this.slide,
          isError: true,
          content: this
        });
        this.instance.dispatch("loadError", {
          slide: this.slide,
          content: this
        });
      }
    }
    /**
     * @returns {Boolean} If the content is currently loading
     */
    isLoading() {
      return this.instance.applyFilters("isContentLoading", this.state === LOAD_STATE.LOADING, this);
    }
    /**
     * @returns {Boolean} If the content is in error state
     */
    isError() {
      return this.state === LOAD_STATE.ERROR;
    }
    /**
     * @returns {boolean} If the content is image
     */
    isImageContent() {
      return this.type === "image";
    }
    /**
     * Update content size
     *
     * @param {Number} width
     * @param {Number} height
     */
    setDisplayedSize(width, height) {
      if (!this.element) {
        return;
      }
      if (this.placeholder) {
        this.placeholder.setDisplayedSize(width, height);
      }
      if (this.instance.dispatch("contentResize", {
        content: this,
        width,
        height
      }).defaultPrevented) {
        return;
      }
      setWidthHeight(this.element, width, height);
      if (this.isImageContent() && !this.isError()) {
        const isInitialSizeUpdate = !this.displayedImageWidth && width;
        this.displayedImageWidth = width;
        this.displayedImageHeight = height;
        if (isInitialSizeUpdate) {
          this.loadImage(false);
        } else {
          this.updateSrcsetSizes();
        }
        if (this.slide) {
          this.instance.dispatch("imageSizeChange", {
            slide: this.slide,
            width,
            height,
            content: this
          });
        }
      }
    }
    /**
     * @returns {boolean} If the content can be zoomed
     */
    isZoomable() {
      return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);
    }
    /**
     * Update image srcset sizes attribute based on width and height
     */
    updateSrcsetSizes() {
      if (!this.isImageContent() || !this.element || !this.data.srcset) {
        return;
      }
      const image = (
        /** @type HTMLImageElement */
        this.element
      );
      const sizesWidth = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
      if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
        image.sizes = sizesWidth + "px";
        image.dataset.largestUsedSize = String(sizesWidth);
      }
    }
    /**
     * @returns {boolean} If content should use a placeholder (from msrc by default)
     */
    usePlaceholder() {
      return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
    }
    /**
     * Preload content with lazy-loading param
     */
    lazyLoad() {
      if (this.instance.dispatch("contentLazyLoad", {
        content: this
      }).defaultPrevented) {
        return;
      }
      this.load(true);
    }
    /**
     * @returns {boolean} If placeholder should be kept after content is loaded
     */
    keepPlaceholder() {
      return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
    }
    /**
     * Destroy the content
     */
    destroy() {
      this.hasSlide = false;
      this.slide = void 0;
      if (this.instance.dispatch("contentDestroy", {
        content: this
      }).defaultPrevented) {
        return;
      }
      this.remove();
      if (this.placeholder) {
        this.placeholder.destroy();
        this.placeholder = void 0;
      }
      if (this.isImageContent() && this.element) {
        this.element.onload = null;
        this.element.onerror = null;
        this.element = void 0;
      }
    }
    /**
     * Display error message
     */
    displayError() {
      if (this.slide) {
        var _this$instance$option, _this$instance$option2;
        let errorMsgEl = createElement("pswp__error-msg", "div");
        errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : "";
        errorMsgEl = /** @type {HTMLDivElement} */
        this.instance.applyFilters("contentErrorElement", errorMsgEl, this);
        this.element = createElement("pswp__content pswp__error-msg-container", "div");
        this.element.appendChild(errorMsgEl);
        this.slide.container.innerText = "";
        this.slide.container.appendChild(this.element);
        this.slide.updateContentSize(true);
        this.removePlaceholder();
      }
    }
    /**
     * Append the content
     */
    append() {
      if (this.isAttached || !this.element) {
        return;
      }
      this.isAttached = true;
      if (this.state === LOAD_STATE.ERROR) {
        this.displayError();
        return;
      }
      if (this.instance.dispatch("contentAppend", {
        content: this
      }).defaultPrevented) {
        return;
      }
      const supportsDecode = "decode" in this.element;
      if (this.isImageContent()) {
        if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
          this.isDecoding = true;
          this.element.decode().catch(() => {
          }).finally(() => {
            this.isDecoding = false;
            this.appendImage();
          });
        } else {
          this.appendImage();
        }
      } else if (this.slide && !this.element.parentNode) {
        this.slide.container.appendChild(this.element);
      }
    }
    /**
     * Activate the slide,
     * active slide is generally the current one,
     * meaning the user can see it.
     */
    activate() {
      if (this.instance.dispatch("contentActivate", {
        content: this
      }).defaultPrevented || !this.slide) {
        return;
      }
      if (this.isImageContent() && this.isDecoding && !isSafari()) {
        this.appendImage();
      } else if (this.isError()) {
        this.load(false, true);
      }
      if (this.slide.holderElement) {
        this.slide.holderElement.setAttribute("aria-hidden", "false");
      }
    }
    /**
     * Deactivate the content
     */
    deactivate() {
      this.instance.dispatch("contentDeactivate", {
        content: this
      });
      if (this.slide && this.slide.holderElement) {
        this.slide.holderElement.setAttribute("aria-hidden", "true");
      }
    }
    /**
     * Remove the content from DOM
     */
    remove() {
      this.isAttached = false;
      if (this.instance.dispatch("contentRemove", {
        content: this
      }).defaultPrevented) {
        return;
      }
      if (this.element && this.element.parentNode) {
        this.element.remove();
      }
      if (this.placeholder && this.placeholder.element) {
        this.placeholder.element.remove();
      }
    }
    /**
     * Append the image content to slide container
     */
    appendImage() {
      if (!this.isAttached) {
        return;
      }
      if (this.instance.dispatch("contentAppendImage", {
        content: this
      }).defaultPrevented) {
        return;
      }
      if (this.slide && this.element && !this.element.parentNode) {
        this.slide.container.appendChild(this.element);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  };
  function getViewportSize(options, pswp) {
    if (options.getViewportSizeFn) {
      const newViewportSize = options.getViewportSizeFn(options, pswp);
      if (newViewportSize) {
        return newViewportSize;
      }
    }
    return {
      x: document.documentElement.clientWidth,
      // TODO: height on mobile is very incosistent due to toolbar
      // find a way to improve this
      //
      // document.documentElement.clientHeight - doesn't seem to work well
      y: window.innerHeight
    };
  }
  function parsePaddingOption(prop, options, viewportSize, itemData, index) {
    let paddingValue = 0;
    if (options.paddingFn) {
      paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
    } else if (options.padding) {
      paddingValue = options.padding[prop];
    } else {
      const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
      if (options[legacyPropName]) {
        paddingValue = options[legacyPropName];
      }
    }
    return Number(paddingValue) || 0;
  }
  function getPanAreaSize(options, viewportSize, itemData, index) {
    return {
      x: viewportSize.x - parsePaddingOption("left", options, viewportSize, itemData, index) - parsePaddingOption("right", options, viewportSize, itemData, index),
      y: viewportSize.y - parsePaddingOption("top", options, viewportSize, itemData, index) - parsePaddingOption("bottom", options, viewportSize, itemData, index)
    };
  }
  var MAX_IMAGE_WIDTH = 4e3;
  var ZoomLevel = class {
    /**
     * @param {PhotoSwipeOptions} options PhotoSwipe options
     * @param {SlideData} itemData Slide data
     * @param {number} index Slide index
     * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
     */
    constructor(options, itemData, index, pswp) {
      this.pswp = pswp;
      this.options = options;
      this.itemData = itemData;
      this.index = index;
      this.panAreaSize = null;
      this.elementSize = null;
      this.fit = 1;
      this.fill = 1;
      this.vFill = 1;
      this.initial = 1;
      this.secondary = 1;
      this.max = 1;
      this.min = 1;
    }
    /**
     * Calculate initial, secondary and maximum zoom level for the specified slide.
     *
     * It should be called when either image or viewport size changes.
     *
     * @param {number} maxWidth
     * @param {number} maxHeight
     * @param {Point} panAreaSize
     */
    update(maxWidth, maxHeight, panAreaSize) {
      const elementSize = {
        x: maxWidth,
        y: maxHeight
      };
      this.elementSize = elementSize;
      this.panAreaSize = panAreaSize;
      const hRatio = panAreaSize.x / elementSize.x;
      const vRatio = panAreaSize.y / elementSize.y;
      this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
      this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
      this.vFill = Math.min(1, vRatio);
      this.initial = this._getInitial();
      this.secondary = this._getSecondary();
      this.max = Math.max(this.initial, this.secondary, this._getMax());
      this.min = Math.min(this.fit, this.initial, this.secondary);
      if (this.pswp) {
        this.pswp.dispatch("zoomLevelsUpdate", {
          zoomLevels: this,
          slideData: this.itemData
        });
      }
    }
    /**
     * Parses user-defined zoom option.
     *
     * @private
     * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
     * @returns { number | undefined }
     */
    _parseZoomLevelOption(optionPrefix) {
      const optionName = (
        /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
        optionPrefix + "ZoomLevel"
      );
      const optionValue = this.options[optionName];
      if (!optionValue) {
        return;
      }
      if (typeof optionValue === "function") {
        return optionValue(this);
      }
      if (optionValue === "fill") {
        return this.fill;
      }
      if (optionValue === "fit") {
        return this.fit;
      }
      return Number(optionValue);
    }
    /**
     * Get zoom level to which image will be zoomed after double-tap gesture,
     * or when user clicks on zoom icon,
     * or mouse-click on image itself.
     * If you return 1 image will be zoomed to its original size.
     *
     * @private
     * @return {number}
     */
    _getSecondary() {
      let currZoomLevel = this._parseZoomLevelOption("secondary");
      if (currZoomLevel) {
        return currZoomLevel;
      }
      currZoomLevel = Math.min(1, this.fit * 3);
      if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
        currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
      }
      return currZoomLevel;
    }
    /**
     * Get initial image zoom level.
     *
     * @private
     * @return {number}
     */
    _getInitial() {
      return this._parseZoomLevelOption("initial") || this.fit;
    }
    /**
     * Maximum zoom level when user zooms
     * via zoom/pinch gesture,
     * via cmd/ctrl-wheel or via trackpad.
     *
     * @private
     * @return {number}
     */
    _getMax() {
      return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
    }
  };
  function lazyLoadData(itemData, instance, index) {
    const content = instance.createContentFromData(itemData, index);
    let zoomLevel;
    const {
      options
    } = instance;
    if (options) {
      zoomLevel = new ZoomLevel(options, itemData, -1);
      let viewportSize;
      if (instance.pswp) {
        viewportSize = instance.pswp.viewportSize;
      } else {
        viewportSize = getViewportSize(options, instance);
      }
      const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
      zoomLevel.update(content.width, content.height, panAreaSize);
    }
    content.lazyLoad();
    if (zoomLevel) {
      content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
    }
    return content;
  }
  function lazyLoadSlide(index, instance) {
    const itemData = instance.getItemData(index);
    if (instance.dispatch("lazyLoadSlide", {
      index,
      itemData
    }).defaultPrevented) {
      return;
    }
    return lazyLoadData(itemData, instance, index);
  }
  var PhotoSwipeBase = class extends Eventable {
    /**
     * Get total number of slides
     *
     * @returns {number}
     */
    getNumItems() {
      var _this$options;
      let numItems = 0;
      const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;
      if (dataSource && "length" in dataSource) {
        numItems = dataSource.length;
      } else if (dataSource && "gallery" in dataSource) {
        if (!dataSource.items) {
          dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
        }
        if (dataSource.items) {
          numItems = dataSource.items.length;
        }
      }
      const event = this.dispatch("numItems", {
        dataSource,
        numItems
      });
      return this.applyFilters("numItems", event.numItems, dataSource);
    }
    /**
     * @param {SlideData} slideData
     * @param {number} index
     * @returns {Content}
     */
    createContentFromData(slideData, index) {
      return new Content(slideData, this, index);
    }
    /**
     * Get item data by index.
     *
     * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
     * For example, it may contain properties like
     * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
     *
     * @param {number} index
     * @returns {SlideData}
     */
    getItemData(index) {
      var _this$options2;
      const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
      let dataSourceItem = {};
      if (Array.isArray(dataSource)) {
        dataSourceItem = dataSource[index];
      } else if (dataSource && "gallery" in dataSource) {
        if (!dataSource.items) {
          dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
        }
        dataSourceItem = dataSource.items[index];
      }
      let itemData = dataSourceItem;
      if (itemData instanceof Element) {
        itemData = this._domElementToItemData(itemData);
      }
      const event = this.dispatch("itemData", {
        itemData: itemData || {},
        index
      });
      return this.applyFilters("itemData", event.itemData, index);
    }
    /**
     * Get array of gallery DOM elements,
     * based on childSelector and gallery element.
     *
     * @param {HTMLElement} galleryElement
     * @returns {HTMLElement[]}
     */
    _getGalleryDOMElements(galleryElement) {
      var _this$options3, _this$options4;
      if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
        return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];
      }
      return [galleryElement];
    }
    /**
     * Converts DOM element to item data object.
     *
     * @param {HTMLElement} element DOM element
     * @returns {SlideData}
     */
    _domElementToItemData(element) {
      const itemData = {
        element
      };
      const linkEl = (
        /** @type {HTMLAnchorElement} */
        element.tagName === "A" ? element : element.querySelector("a")
      );
      if (linkEl) {
        itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
        if (linkEl.dataset.pswpSrcset) {
          itemData.srcset = linkEl.dataset.pswpSrcset;
        }
        itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
        itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
        itemData.w = itemData.width;
        itemData.h = itemData.height;
        if (linkEl.dataset.pswpType) {
          itemData.type = linkEl.dataset.pswpType;
        }
        const thumbnailEl = element.querySelector("img");
        if (thumbnailEl) {
          var _thumbnailEl$getAttri;
          itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
          itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute("alt")) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : "";
        }
        if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
          itemData.thumbCropped = true;
        }
      }
      return this.applyFilters("domItemData", itemData, element, linkEl);
    }
    /**
     * Lazy-load by slide data
     *
     * @param {SlideData} itemData Data about the slide
     * @param {number} index
     * @returns {Content} Image that is being decoded or false.
     */
    lazyLoadData(itemData, index) {
      return lazyLoadData(itemData, this, index);
    }
  };
  var PhotoSwipeLightbox = class extends PhotoSwipeBase {
    /**
     * @param {PhotoSwipeOptions} [options]
     */
    constructor(options) {
      super();
      this.options = options || {};
      this._uid = 0;
      this.shouldOpen = false;
      this._preloadedContent = void 0;
      this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
    }
    /**
     * Initialize lightbox, should be called only once.
     * It's not included in the main constructor, so you may bind events before it.
     */
    init() {
      getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
        galleryElement.addEventListener("click", this.onThumbnailsClick, false);
      });
    }
    /**
     * @param {MouseEvent} e
     */
    onThumbnailsClick(e) {
      if (specialKeyUsed(e) || window.pswp) {
        return;
      }
      let initialPoint = {
        x: e.clientX,
        y: e.clientY
      };
      if (!initialPoint.x && !initialPoint.y) {
        initialPoint = null;
      }
      let clickedIndex = this.getClickedIndex(e);
      clickedIndex = this.applyFilters("clickedIndex", clickedIndex, e, this);
      const dataSource = {
        gallery: (
          /** @type {HTMLElement} */
          e.currentTarget
        )
      };
      if (clickedIndex >= 0) {
        e.preventDefault();
        this.loadAndOpen(clickedIndex, dataSource, initialPoint);
      }
    }
    /**
     * Get index of gallery item that was clicked.
     *
     * @param {MouseEvent} e click event
     * @returns {number}
     */
    getClickedIndex(e) {
      if (this.options.getClickedIndexFn) {
        return this.options.getClickedIndexFn.call(this, e);
      }
      const clickedTarget = (
        /** @type {HTMLElement} */
        e.target
      );
      const childElements = getElementsFromOption(
        this.options.children,
        this.options.childSelector,
        /** @type {HTMLElement} */
        e.currentTarget
      );
      const clickedChildIndex = childElements.findIndex((child) => child === clickedTarget || child.contains(clickedTarget));
      if (clickedChildIndex !== -1) {
        return clickedChildIndex;
      } else if (this.options.children || this.options.childSelector) {
        return -1;
      }
      return 0;
    }
    /**
     * Load and open PhotoSwipe
     *
     * @param {number} index
     * @param {DataSource} [dataSource]
     * @param {Point | null} [initialPoint]
     * @returns {boolean}
     */
    loadAndOpen(index, dataSource, initialPoint) {
      if (window.pswp || !this.options) {
        return false;
      }
      if (!dataSource && this.options.gallery && this.options.children) {
        const galleryElements = getElementsFromOption(this.options.gallery);
        if (galleryElements[0]) {
          dataSource = {
            gallery: galleryElements[0]
          };
        }
      }
      this.options.index = index;
      this.options.initialPointerPos = initialPoint;
      this.shouldOpen = true;
      this.preload(index, dataSource);
      return true;
    }
    /**
     * Load the main module and the slide content by index
     *
     * @param {number} index
     * @param {DataSource} [dataSource]
     */
    preload(index, dataSource) {
      const {
        options
      } = this;
      if (dataSource) {
        options.dataSource = dataSource;
      }
      const promiseArray = [];
      const pswpModuleType = typeof options.pswpModule;
      if (isPswpClass(options.pswpModule)) {
        promiseArray.push(Promise.resolve(
          /** @type {Type<PhotoSwipe>} */
          options.pswpModule
        ));
      } else if (pswpModuleType === "string") {
        throw new Error("pswpModule as string is no longer supported");
      } else if (pswpModuleType === "function") {
        promiseArray.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          options.pswpModule()
        );
      } else {
        throw new Error("pswpModule is not valid");
      }
      if (typeof options.openPromise === "function") {
        promiseArray.push(options.openPromise());
      }
      if (options.preloadFirstSlide !== false && index >= 0) {
        this._preloadedContent = lazyLoadSlide(index, this);
      }
      const uid = ++this._uid;
      Promise.all(promiseArray).then((iterableModules) => {
        if (this.shouldOpen) {
          const mainModule = iterableModules[0];
          this._openPhotoswipe(mainModule, uid);
        }
      });
    }
    /**
     * @private
     * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
     * @param {number} uid
     */
    _openPhotoswipe(module, uid) {
      if (uid !== this._uid && this.shouldOpen) {
        return;
      }
      this.shouldOpen = false;
      if (window.pswp) {
        return;
      }
      const pswp = typeof module === "object" ? new module.default(this.options) : new module(this.options);
      this.pswp = pswp;
      window.pswp = pswp;
      Object.keys(this._listeners).forEach((name) => {
        var _this$_listeners$name;
        (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.forEach((fn) => {
          pswp.on(
            name,
            /** @type {EventCallback<typeof name>} */
            fn
          );
        });
      });
      Object.keys(this._filters).forEach((name) => {
        var _this$_filters$name;
        (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.forEach((filter) => {
          pswp.addFilter(name, filter.fn, filter.priority);
        });
      });
      if (this._preloadedContent) {
        pswp.contentLoader.addToCache(this._preloadedContent);
        this._preloadedContent = void 0;
      }
      pswp.on("destroy", () => {
        this.pswp = void 0;
        delete window.pswp;
      });
      pswp.init();
    }
    /**
     * Unbinds all events, closes PhotoSwipe if it's open.
     */
    destroy() {
      var _this$pswp;
      (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.destroy();
      this.shouldOpen = false;
      this._listeners = {};
      getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
        galleryElement.removeEventListener("click", this.onThumbnailsClick, false);
      });
    }
  };

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/photoswipe/photoswipe.esm.js
  function createElement2(className, tagName, appendToEl) {
    const el2 = document.createElement(tagName);
    if (className) {
      el2.className = className;
    }
    if (appendToEl) {
      appendToEl.appendChild(el2);
    }
    return el2;
  }
  function equalizePoints(p1, p2) {
    p1.x = p2.x;
    p1.y = p2.y;
    if (p2.id !== void 0) {
      p1.id = p2.id;
    }
    return p1;
  }
  function roundPoint(p) {
    p.x = Math.round(p.x);
    p.y = Math.round(p.y);
  }
  function getDistanceBetween(p1, p2) {
    const x = Math.abs(p1.x - p2.x);
    const y = Math.abs(p1.y - p2.y);
    return Math.sqrt(x * x + y * y);
  }
  function pointsEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }
  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
  function toTransformString2(x, y, scale) {
    let propValue = `translate3d(${x}px,${y || 0}px,0)`;
    if (scale !== void 0) {
      propValue += ` scale3d(${scale},${scale},1)`;
    }
    return propValue;
  }
  function setTransform(el2, x, y, scale) {
    el2.style.transform = toTransformString2(x, y, scale);
  }
  var defaultCSSEasing = "cubic-bezier(.4,0,.22,1)";
  function setTransitionStyle(el2, prop, duration, ease) {
    el2.style.transition = prop ? `${prop} ${duration}ms ${ease || defaultCSSEasing}` : "none";
  }
  function setWidthHeight2(el2, w, h) {
    el2.style.width = typeof w === "number" ? `${w}px` : w;
    el2.style.height = typeof h === "number" ? `${h}px` : h;
  }
  function removeTransitionStyle(el2) {
    setTransitionStyle(el2);
  }
  function decodeImage(img) {
    if ("decode" in img) {
      return img.decode().catch(() => {
      });
    }
    if (img.complete) {
      return Promise.resolve(img);
    }
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
  var LOAD_STATE2 = {
    IDLE: "idle",
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
  };
  function specialKeyUsed2(e) {
    return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
  }
  function getElementsFromOption2(option, legacySelector, parent = document) {
    let elements = [];
    if (option instanceof Element) {
      elements = [option];
    } else if (option instanceof NodeList || Array.isArray(option)) {
      elements = Array.from(option);
    } else {
      const selector = typeof option === "string" ? option : legacySelector;
      if (selector) {
        elements = Array.from(parent.querySelectorAll(selector));
      }
    }
    return elements;
  }
  function isSafari2() {
    return !!(navigator.vendor && navigator.vendor.match(/apple/i));
  }
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
      get: () => {
        supportsPassive = true;
      }
    }));
  } catch (e) {
  }
  var DOMEvents = class {
    constructor() {
      this._pool = [];
    }
    /**
     * Adds event listeners
     *
     * @param {PoolItem['target']} target
     * @param {PoolItem['type']} type Can be multiple, separated by space.
     * @param {PoolItem['listener']} listener
     * @param {PoolItem['passive']} [passive]
     */
    add(target, type, listener, passive) {
      this._toggleListener(target, type, listener, passive);
    }
    /**
     * Removes event listeners
     *
     * @param {PoolItem['target']} target
     * @param {PoolItem['type']} type
     * @param {PoolItem['listener']} listener
     * @param {PoolItem['passive']} [passive]
     */
    remove(target, type, listener, passive) {
      this._toggleListener(target, type, listener, passive, true);
    }
    /**
     * Removes all bound events
     */
    removeAll() {
      this._pool.forEach((poolItem) => {
        this._toggleListener(poolItem.target, poolItem.type, poolItem.listener, poolItem.passive, true, true);
      });
      this._pool = [];
    }
    /**
     * Adds or removes event
     *
     * @private
     * @param {PoolItem['target']} target
     * @param {PoolItem['type']} type
     * @param {PoolItem['listener']} listener
     * @param {PoolItem['passive']} [passive]
     * @param {boolean} [unbind] Whether the event should be added or removed
     * @param {boolean} [skipPool] Whether events pool should be skipped
     */
    _toggleListener(target, type, listener, passive, unbind, skipPool) {
      if (!target) {
        return;
      }
      const methodName = unbind ? "removeEventListener" : "addEventListener";
      const types = type.split(" ");
      types.forEach((eType) => {
        if (eType) {
          if (!skipPool) {
            if (unbind) {
              this._pool = this._pool.filter((poolItem) => {
                return poolItem.type !== eType || poolItem.listener !== listener || poolItem.target !== target;
              });
            } else {
              this._pool.push({
                target,
                type: eType,
                listener,
                passive
              });
            }
          }
          const eventOptions = supportsPassive ? {
            passive: passive || false
          } : false;
          target[methodName](eType, listener, eventOptions);
        }
      });
    }
  };
  function getViewportSize2(options, pswp) {
    if (options.getViewportSizeFn) {
      const newViewportSize = options.getViewportSizeFn(options, pswp);
      if (newViewportSize) {
        return newViewportSize;
      }
    }
    return {
      x: document.documentElement.clientWidth,
      // TODO: height on mobile is very incosistent due to toolbar
      // find a way to improve this
      //
      // document.documentElement.clientHeight - doesn't seem to work well
      y: window.innerHeight
    };
  }
  function parsePaddingOption2(prop, options, viewportSize, itemData, index) {
    let paddingValue = 0;
    if (options.paddingFn) {
      paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
    } else if (options.padding) {
      paddingValue = options.padding[prop];
    } else {
      const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
      if (options[legacyPropName]) {
        paddingValue = options[legacyPropName];
      }
    }
    return Number(paddingValue) || 0;
  }
  function getPanAreaSize2(options, viewportSize, itemData, index) {
    return {
      x: viewportSize.x - parsePaddingOption2("left", options, viewportSize, itemData, index) - parsePaddingOption2("right", options, viewportSize, itemData, index),
      y: viewportSize.y - parsePaddingOption2("top", options, viewportSize, itemData, index) - parsePaddingOption2("bottom", options, viewportSize, itemData, index)
    };
  }
  var PanBounds = class {
    /**
     * @param {Slide} slide
     */
    constructor(slide) {
      this.slide = slide;
      this.currZoomLevel = 1;
      this.center = /** @type {Point} */
      {
        x: 0,
        y: 0
      };
      this.max = /** @type {Point} */
      {
        x: 0,
        y: 0
      };
      this.min = /** @type {Point} */
      {
        x: 0,
        y: 0
      };
    }
    /**
     * _getItemBounds
     *
     * @param {number} currZoomLevel
     */
    update(currZoomLevel) {
      this.currZoomLevel = currZoomLevel;
      if (!this.slide.width) {
        this.reset();
      } else {
        this._updateAxis("x");
        this._updateAxis("y");
        this.slide.pswp.dispatch("calcBounds", {
          slide: this.slide
        });
      }
    }
    /**
     * _calculateItemBoundsForAxis
     *
     * @param {Axis} axis
     */
    _updateAxis(axis) {
      const {
        pswp
      } = this.slide;
      const elSize = this.slide[axis === "x" ? "width" : "height"] * this.currZoomLevel;
      const paddingProp = axis === "x" ? "left" : "top";
      const padding = parsePaddingOption2(paddingProp, pswp.options, pswp.viewportSize, this.slide.data, this.slide.index);
      const panAreaSize = this.slide.panAreaSize[axis];
      this.center[axis] = Math.round((panAreaSize - elSize) / 2) + padding;
      this.max[axis] = elSize > panAreaSize ? Math.round(panAreaSize - elSize) + padding : this.center[axis];
      this.min[axis] = elSize > panAreaSize ? padding : this.center[axis];
    }
    // _getZeroBounds
    reset() {
      this.center.x = 0;
      this.center.y = 0;
      this.max.x = 0;
      this.max.y = 0;
      this.min.x = 0;
      this.min.y = 0;
    }
    /**
     * Correct pan position if it's beyond the bounds
     *
     * @param {Axis} axis x or y
     * @param {number} panOffset
     * @returns {number}
     */
    correctPan(axis, panOffset) {
      return clamp(panOffset, this.max[axis], this.min[axis]);
    }
  };
  var MAX_IMAGE_WIDTH2 = 4e3;
  var ZoomLevel2 = class {
    /**
     * @param {PhotoSwipeOptions} options PhotoSwipe options
     * @param {SlideData} itemData Slide data
     * @param {number} index Slide index
     * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
     */
    constructor(options, itemData, index, pswp) {
      this.pswp = pswp;
      this.options = options;
      this.itemData = itemData;
      this.index = index;
      this.panAreaSize = null;
      this.elementSize = null;
      this.fit = 1;
      this.fill = 1;
      this.vFill = 1;
      this.initial = 1;
      this.secondary = 1;
      this.max = 1;
      this.min = 1;
    }
    /**
     * Calculate initial, secondary and maximum zoom level for the specified slide.
     *
     * It should be called when either image or viewport size changes.
     *
     * @param {number} maxWidth
     * @param {number} maxHeight
     * @param {Point} panAreaSize
     */
    update(maxWidth, maxHeight, panAreaSize) {
      const elementSize = {
        x: maxWidth,
        y: maxHeight
      };
      this.elementSize = elementSize;
      this.panAreaSize = panAreaSize;
      const hRatio = panAreaSize.x / elementSize.x;
      const vRatio = panAreaSize.y / elementSize.y;
      this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
      this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
      this.vFill = Math.min(1, vRatio);
      this.initial = this._getInitial();
      this.secondary = this._getSecondary();
      this.max = Math.max(this.initial, this.secondary, this._getMax());
      this.min = Math.min(this.fit, this.initial, this.secondary);
      if (this.pswp) {
        this.pswp.dispatch("zoomLevelsUpdate", {
          zoomLevels: this,
          slideData: this.itemData
        });
      }
    }
    /**
     * Parses user-defined zoom option.
     *
     * @private
     * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
     * @returns { number | undefined }
     */
    _parseZoomLevelOption(optionPrefix) {
      const optionName = (
        /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
        optionPrefix + "ZoomLevel"
      );
      const optionValue = this.options[optionName];
      if (!optionValue) {
        return;
      }
      if (typeof optionValue === "function") {
        return optionValue(this);
      }
      if (optionValue === "fill") {
        return this.fill;
      }
      if (optionValue === "fit") {
        return this.fit;
      }
      return Number(optionValue);
    }
    /**
     * Get zoom level to which image will be zoomed after double-tap gesture,
     * or when user clicks on zoom icon,
     * or mouse-click on image itself.
     * If you return 1 image will be zoomed to its original size.
     *
     * @private
     * @return {number}
     */
    _getSecondary() {
      let currZoomLevel = this._parseZoomLevelOption("secondary");
      if (currZoomLevel) {
        return currZoomLevel;
      }
      currZoomLevel = Math.min(1, this.fit * 3);
      if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH2) {
        currZoomLevel = MAX_IMAGE_WIDTH2 / this.elementSize.x;
      }
      return currZoomLevel;
    }
    /**
     * Get initial image zoom level.
     *
     * @private
     * @return {number}
     */
    _getInitial() {
      return this._parseZoomLevelOption("initial") || this.fit;
    }
    /**
     * Maximum zoom level when user zooms
     * via zoom/pinch gesture,
     * via cmd/ctrl-wheel or via trackpad.
     *
     * @private
     * @return {number}
     */
    _getMax() {
      return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
    }
  };
  var Slide = class {
    /**
     * @param {SlideData} data
     * @param {number} index
     * @param {PhotoSwipe} pswp
     */
    constructor(data, index, pswp) {
      this.data = data;
      this.index = index;
      this.pswp = pswp;
      this.isActive = index === pswp.currIndex;
      this.currentResolution = 0;
      this.panAreaSize = {
        x: 0,
        y: 0
      };
      this.pan = {
        x: 0,
        y: 0
      };
      this.isFirstSlide = this.isActive && !pswp.opener.isOpen;
      this.zoomLevels = new ZoomLevel2(pswp.options, data, index, pswp);
      this.pswp.dispatch("gettingData", {
        slide: this,
        data: this.data,
        index
      });
      this.content = this.pswp.contentLoader.getContentBySlide(this);
      this.container = createElement2("pswp__zoom-wrap", "div");
      this.holderElement = null;
      this.currZoomLevel = 1;
      this.width = this.content.width;
      this.height = this.content.height;
      this.heavyAppended = false;
      this.bounds = new PanBounds(this);
      this.prevDisplayedWidth = -1;
      this.prevDisplayedHeight = -1;
      this.pswp.dispatch("slideInit", {
        slide: this
      });
    }
    /**
     * If this slide is active/current/visible
     *
     * @param {boolean} isActive
     */
    setIsActive(isActive) {
      if (isActive && !this.isActive) {
        this.activate();
      } else if (!isActive && this.isActive) {
        this.deactivate();
      }
    }
    /**
     * Appends slide content to DOM
     *
     * @param {HTMLElement} holderElement
     */
    append(holderElement) {
      this.holderElement = holderElement;
      this.container.style.transformOrigin = "0 0";
      if (!this.data) {
        return;
      }
      this.calculateSize();
      this.load();
      this.updateContentSize();
      this.appendHeavy();
      this.holderElement.appendChild(this.container);
      this.zoomAndPanToInitial();
      this.pswp.dispatch("firstZoomPan", {
        slide: this
      });
      this.applyCurrentZoomPan();
      this.pswp.dispatch("afterSetContent", {
        slide: this
      });
      if (this.isActive) {
        this.activate();
      }
    }
    load() {
      this.content.load(false);
      this.pswp.dispatch("slideLoad", {
        slide: this
      });
    }
    /**
     * Append "heavy" DOM elements
     *
     * This may depend on a type of slide,
     * but generally these are large images.
     */
    appendHeavy() {
      const {
        pswp
      } = this;
      const appendHeavyNearby = true;
      if (this.heavyAppended || !pswp.opener.isOpen || pswp.mainScroll.isShifted() || !this.isActive && !appendHeavyNearby) {
        return;
      }
      if (this.pswp.dispatch("appendHeavy", {
        slide: this
      }).defaultPrevented) {
        return;
      }
      this.heavyAppended = true;
      this.content.append();
      this.pswp.dispatch("appendHeavyContent", {
        slide: this
      });
    }
    /**
     * Triggered when this slide is active (selected).
     *
     * If it's part of opening/closing transition -
     * activate() will trigger after the transition is ended.
     */
    activate() {
      this.isActive = true;
      this.appendHeavy();
      this.content.activate();
      this.pswp.dispatch("slideActivate", {
        slide: this
      });
    }
    /**
     * Triggered when this slide becomes inactive.
     *
     * Slide can become inactive only after it was active.
     */
    deactivate() {
      this.isActive = false;
      this.content.deactivate();
      if (this.currZoomLevel !== this.zoomLevels.initial) {
        this.calculateSize();
      }
      this.currentResolution = 0;
      this.zoomAndPanToInitial();
      this.applyCurrentZoomPan();
      this.updateContentSize();
      this.pswp.dispatch("slideDeactivate", {
        slide: this
      });
    }
    /**
     * The slide should destroy itself, it will never be used again.
     * (unbind all events and destroy internal components)
     */
    destroy() {
      this.content.hasSlide = false;
      this.content.remove();
      this.container.remove();
      this.pswp.dispatch("slideDestroy", {
        slide: this
      });
    }
    resize() {
      if (this.currZoomLevel === this.zoomLevels.initial || !this.isActive) {
        this.calculateSize();
        this.currentResolution = 0;
        this.zoomAndPanToInitial();
        this.applyCurrentZoomPan();
        this.updateContentSize();
      } else {
        this.calculateSize();
        this.bounds.update(this.currZoomLevel);
        this.panTo(this.pan.x, this.pan.y);
      }
    }
    /**
     * Apply size to current slide content,
     * based on the current resolution and scale.
     *
     * @param {boolean} [force] if size should be updated even if dimensions weren't changed
     */
    updateContentSize(force) {
      const scaleMultiplier = this.currentResolution || this.zoomLevels.initial;
      if (!scaleMultiplier) {
        return;
      }
      const width = Math.round(this.width * scaleMultiplier) || this.pswp.viewportSize.x;
      const height = Math.round(this.height * scaleMultiplier) || this.pswp.viewportSize.y;
      if (!this.sizeChanged(width, height) && !force) {
        return;
      }
      this.content.setDisplayedSize(width, height);
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    sizeChanged(width, height) {
      if (width !== this.prevDisplayedWidth || height !== this.prevDisplayedHeight) {
        this.prevDisplayedWidth = width;
        this.prevDisplayedHeight = height;
        return true;
      }
      return false;
    }
    /** @returns {HTMLImageElement | HTMLDivElement | null | undefined} */
    getPlaceholderElement() {
      var _this$content$placeho;
      return (_this$content$placeho = this.content.placeholder) === null || _this$content$placeho === void 0 ? void 0 : _this$content$placeho.element;
    }
    /**
     * Zoom current slide image to...
     *
     * @param {number} destZoomLevel Destination zoom level.
     * @param {Point} [centerPoint]
     * Transform origin center point, or false if viewport center should be used.
     * @param {number | false} [transitionDuration] Transition duration, may be set to 0.
     * @param {boolean} [ignoreBounds] Minimum and maximum zoom levels will be ignored.
     */
    zoomTo(destZoomLevel, centerPoint, transitionDuration, ignoreBounds) {
      const {
        pswp
      } = this;
      if (!this.isZoomable() || pswp.mainScroll.isShifted()) {
        return;
      }
      pswp.dispatch("beforeZoomTo", {
        destZoomLevel,
        centerPoint,
        transitionDuration
      });
      pswp.animations.stopAllPan();
      const prevZoomLevel = this.currZoomLevel;
      if (!ignoreBounds) {
        destZoomLevel = clamp(destZoomLevel, this.zoomLevels.min, this.zoomLevels.max);
      }
      this.setZoomLevel(destZoomLevel);
      this.pan.x = this.calculateZoomToPanOffset("x", centerPoint, prevZoomLevel);
      this.pan.y = this.calculateZoomToPanOffset("y", centerPoint, prevZoomLevel);
      roundPoint(this.pan);
      const finishTransition = () => {
        this._setResolution(destZoomLevel);
        this.applyCurrentZoomPan();
      };
      if (!transitionDuration) {
        finishTransition();
      } else {
        pswp.animations.startTransition({
          isPan: true,
          name: "zoomTo",
          target: this.container,
          transform: this.getCurrentTransform(),
          onComplete: finishTransition,
          duration: transitionDuration,
          easing: pswp.options.easing
        });
      }
    }
    /**
     * @param {Point} [centerPoint]
     */
    toggleZoom(centerPoint) {
      this.zoomTo(this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial, centerPoint, this.pswp.options.zoomAnimationDuration);
    }
    /**
     * Updates zoom level property and recalculates new pan bounds,
     * unlike zoomTo it does not apply transform (use applyCurrentZoomPan)
     *
     * @param {number} currZoomLevel
     */
    setZoomLevel(currZoomLevel) {
      this.currZoomLevel = currZoomLevel;
      this.bounds.update(this.currZoomLevel);
    }
    /**
     * Get pan position after zoom at a given `point`.
     *
     * Always call setZoomLevel(newZoomLevel) beforehand to recalculate
     * pan bounds according to the new zoom level.
     *
     * @param {'x' | 'y'} axis
     * @param {Point} [point]
     * point based on which zoom is performed, usually refers to the current mouse position,
     * if false - viewport center will be used.
     * @param {number} [prevZoomLevel] Zoom level before new zoom was applied.
     * @returns {number}
     */
    calculateZoomToPanOffset(axis, point, prevZoomLevel) {
      const totalPanDistance = this.bounds.max[axis] - this.bounds.min[axis];
      if (totalPanDistance === 0) {
        return this.bounds.center[axis];
      }
      if (!point) {
        point = this.pswp.getViewportCenterPoint();
      }
      if (!prevZoomLevel) {
        prevZoomLevel = this.zoomLevels.initial;
      }
      const zoomFactor = this.currZoomLevel / prevZoomLevel;
      return this.bounds.correctPan(axis, (this.pan[axis] - point[axis]) * zoomFactor + point[axis]);
    }
    /**
     * Apply pan and keep it within bounds.
     *
     * @param {number} panX
     * @param {number} panY
     */
    panTo(panX, panY) {
      this.pan.x = this.bounds.correctPan("x", panX);
      this.pan.y = this.bounds.correctPan("y", panY);
      this.applyCurrentZoomPan();
    }
    /**
     * If the slide in the current state can be panned by the user
     * @returns {boolean}
     */
    isPannable() {
      return Boolean(this.width) && this.currZoomLevel > this.zoomLevels.fit;
    }
    /**
     * If the slide can be zoomed
     * @returns {boolean}
     */
    isZoomable() {
      return Boolean(this.width) && this.content.isZoomable();
    }
    /**
     * Apply transform and scale based on
     * the current pan position (this.pan) and zoom level (this.currZoomLevel)
     */
    applyCurrentZoomPan() {
      this._applyZoomTransform(this.pan.x, this.pan.y, this.currZoomLevel);
      if (this === this.pswp.currSlide) {
        this.pswp.dispatch("zoomPanUpdate", {
          slide: this
        });
      }
    }
    zoomAndPanToInitial() {
      this.currZoomLevel = this.zoomLevels.initial;
      this.bounds.update(this.currZoomLevel);
      equalizePoints(this.pan, this.bounds.center);
      this.pswp.dispatch("initialZoomPan", {
        slide: this
      });
    }
    /**
     * Set translate and scale based on current resolution
     *
     * @param {number} x
     * @param {number} y
     * @param {number} zoom
     * @private
     */
    _applyZoomTransform(x, y, zoom) {
      zoom /= this.currentResolution || this.zoomLevels.initial;
      setTransform(this.container, x, y, zoom);
    }
    calculateSize() {
      const {
        pswp
      } = this;
      equalizePoints(this.panAreaSize, getPanAreaSize2(pswp.options, pswp.viewportSize, this.data, this.index));
      this.zoomLevels.update(this.width, this.height, this.panAreaSize);
      pswp.dispatch("calcSlideSize", {
        slide: this
      });
    }
    /** @returns {string} */
    getCurrentTransform() {
      const scale = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
      return toTransformString2(this.pan.x, this.pan.y, scale);
    }
    /**
     * Set resolution and re-render the image.
     *
     * For example, if the real image size is 2000x1500,
     * and resolution is 0.5 - it will be rendered as 1000x750.
     *
     * Image with zoom level 2 and resolution 0.5 is
     * the same as image with zoom level 1 and resolution 1.
     *
     * Used to optimize animations and make
     * sure that browser renders image in the highest quality.
     * Also used by responsive images to load the correct one.
     *
     * @param {number} newResolution
     */
    _setResolution(newResolution) {
      if (newResolution === this.currentResolution) {
        return;
      }
      this.currentResolution = newResolution;
      this.updateContentSize();
      this.pswp.dispatch("resolutionChanged");
    }
  };
  var PAN_END_FRICTION = 0.35;
  var VERTICAL_DRAG_FRICTION = 0.6;
  var MIN_RATIO_TO_CLOSE = 0.4;
  var MIN_NEXT_SLIDE_SPEED = 0.5;
  function project(initialVelocity, decelerationRate) {
    return initialVelocity * decelerationRate / (1 - decelerationRate);
  }
  var DragHandler = class {
    /**
     * @param {Gestures} gestures
     */
    constructor(gestures) {
      this.gestures = gestures;
      this.pswp = gestures.pswp;
      this.startPan = {
        x: 0,
        y: 0
      };
    }
    start() {
      if (this.pswp.currSlide) {
        equalizePoints(this.startPan, this.pswp.currSlide.pan);
      }
      this.pswp.animations.stopAll();
    }
    change() {
      const {
        p1,
        prevP1,
        dragAxis
      } = this.gestures;
      const {
        currSlide
      } = this.pswp;
      if (dragAxis === "y" && this.pswp.options.closeOnVerticalDrag && currSlide && currSlide.currZoomLevel <= currSlide.zoomLevels.fit && !this.gestures.isMultitouch) {
        const panY = currSlide.pan.y + (p1.y - prevP1.y);
        if (!this.pswp.dispatch("verticalDrag", {
          panY
        }).defaultPrevented) {
          this._setPanWithFriction("y", panY, VERTICAL_DRAG_FRICTION);
          const bgOpacity = 1 - Math.abs(this._getVerticalDragRatio(currSlide.pan.y));
          this.pswp.applyBgOpacity(bgOpacity);
          currSlide.applyCurrentZoomPan();
        }
      } else {
        const mainScrollChanged = this._panOrMoveMainScroll("x");
        if (!mainScrollChanged) {
          this._panOrMoveMainScroll("y");
          if (currSlide) {
            roundPoint(currSlide.pan);
            currSlide.applyCurrentZoomPan();
          }
        }
      }
    }
    end() {
      const {
        velocity
      } = this.gestures;
      const {
        mainScroll,
        currSlide
      } = this.pswp;
      let indexDiff = 0;
      this.pswp.animations.stopAll();
      if (mainScroll.isShifted()) {
        const mainScrollShiftDiff = mainScroll.x - mainScroll.getCurrSlideX();
        const currentSlideVisibilityRatio = mainScrollShiftDiff / this.pswp.viewportSize.x;
        if (velocity.x < -MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio < 0 || velocity.x < 0.1 && currentSlideVisibilityRatio < -0.5) {
          indexDiff = 1;
          velocity.x = Math.min(velocity.x, 0);
        } else if (velocity.x > MIN_NEXT_SLIDE_SPEED && currentSlideVisibilityRatio > 0 || velocity.x > -0.1 && currentSlideVisibilityRatio > 0.5) {
          indexDiff = -1;
          velocity.x = Math.max(velocity.x, 0);
        }
        mainScroll.moveIndexBy(indexDiff, true, velocity.x);
      }
      if (currSlide && currSlide.currZoomLevel > currSlide.zoomLevels.max || this.gestures.isMultitouch) {
        this.gestures.zoomLevels.correctZoomPan(true);
      } else {
        this._finishPanGestureForAxis("x");
        this._finishPanGestureForAxis("y");
      }
    }
    /**
     * @private
     * @param {'x' | 'y'} axis
     */
    _finishPanGestureForAxis(axis) {
      const {
        velocity
      } = this.gestures;
      const {
        currSlide
      } = this.pswp;
      if (!currSlide) {
        return;
      }
      const {
        pan,
        bounds
      } = currSlide;
      const panPos = pan[axis];
      const restoreBgOpacity = this.pswp.bgOpacity < 1 && axis === "y";
      const decelerationRate = 0.995;
      const projectedPosition = panPos + project(velocity[axis], decelerationRate);
      if (restoreBgOpacity) {
        const vDragRatio = this._getVerticalDragRatio(panPos);
        const projectedVDragRatio = this._getVerticalDragRatio(projectedPosition);
        if (vDragRatio < 0 && projectedVDragRatio < -MIN_RATIO_TO_CLOSE || vDragRatio > 0 && projectedVDragRatio > MIN_RATIO_TO_CLOSE) {
          this.pswp.close();
          return;
        }
      }
      const correctedPanPosition = bounds.correctPan(axis, projectedPosition);
      if (panPos === correctedPanPosition) {
        return;
      }
      const dampingRatio = correctedPanPosition === projectedPosition ? 1 : 0.82;
      const initialBgOpacity = this.pswp.bgOpacity;
      const totalPanDist = correctedPanPosition - panPos;
      this.pswp.animations.startSpring({
        name: "panGesture" + axis,
        isPan: true,
        start: panPos,
        end: correctedPanPosition,
        velocity: velocity[axis],
        dampingRatio,
        onUpdate: (pos) => {
          if (restoreBgOpacity && this.pswp.bgOpacity < 1) {
            const animationProgressRatio = 1 - (correctedPanPosition - pos) / totalPanDist;
            this.pswp.applyBgOpacity(clamp(initialBgOpacity + (1 - initialBgOpacity) * animationProgressRatio, 0, 1));
          }
          pan[axis] = Math.floor(pos);
          currSlide.applyCurrentZoomPan();
        }
      });
    }
    /**
     * Update position of the main scroll,
     * or/and update pan position of the current slide.
     *
     * Should return true if it changes (or can change) main scroll.
     *
     * @private
     * @param {'x' | 'y'} axis
     * @returns {boolean}
     */
    _panOrMoveMainScroll(axis) {
      const {
        p1,
        dragAxis,
        prevP1,
        isMultitouch
      } = this.gestures;
      const {
        currSlide,
        mainScroll
      } = this.pswp;
      const delta = p1[axis] - prevP1[axis];
      const newMainScrollX = mainScroll.x + delta;
      if (!delta || !currSlide) {
        return false;
      }
      if (axis === "x" && !currSlide.isPannable() && !isMultitouch) {
        mainScroll.moveTo(newMainScrollX, true);
        return true;
      }
      const {
        bounds
      } = currSlide;
      const newPan = currSlide.pan[axis] + delta;
      if (this.pswp.options.allowPanToNext && dragAxis === "x" && axis === "x" && !isMultitouch) {
        const currSlideMainScrollX = mainScroll.getCurrSlideX();
        const mainScrollShiftDiff = mainScroll.x - currSlideMainScrollX;
        const isLeftToRight = delta > 0;
        const isRightToLeft = !isLeftToRight;
        if (newPan > bounds.min[axis] && isLeftToRight) {
          const wasAtMinPanPosition = bounds.min[axis] <= this.startPan[axis];
          if (wasAtMinPanPosition) {
            mainScroll.moveTo(newMainScrollX, true);
            return true;
          } else {
            this._setPanWithFriction(axis, newPan);
          }
        } else if (newPan < bounds.max[axis] && isRightToLeft) {
          const wasAtMaxPanPosition = this.startPan[axis] <= bounds.max[axis];
          if (wasAtMaxPanPosition) {
            mainScroll.moveTo(newMainScrollX, true);
            return true;
          } else {
            this._setPanWithFriction(axis, newPan);
          }
        } else {
          if (mainScrollShiftDiff !== 0) {
            if (mainScrollShiftDiff > 0) {
              mainScroll.moveTo(Math.max(newMainScrollX, currSlideMainScrollX), true);
              return true;
            } else if (mainScrollShiftDiff < 0) {
              mainScroll.moveTo(Math.min(newMainScrollX, currSlideMainScrollX), true);
              return true;
            }
          } else {
            this._setPanWithFriction(axis, newPan);
          }
        }
      } else {
        if (axis === "y") {
          if (!mainScroll.isShifted() && bounds.min.y !== bounds.max.y) {
            this._setPanWithFriction(axis, newPan);
          }
        } else {
          this._setPanWithFriction(axis, newPan);
        }
      }
      return false;
    }
    // If we move above - the ratio is negative
    // If we move below the ratio is positive
    /**
     * Relation between pan Y position and third of viewport height.
     *
     * When we are at initial position (center bounds) - the ratio is 0,
     * if position is shifted upwards - the ratio is negative,
     * if position is shifted downwards - the ratio is positive.
     *
     * @private
     * @param {number} panY The current pan Y position.
     * @returns {number}
     */
    _getVerticalDragRatio(panY) {
      var _this$pswp$currSlide$, _this$pswp$currSlide;
      return (panY - ((_this$pswp$currSlide$ = (_this$pswp$currSlide = this.pswp.currSlide) === null || _this$pswp$currSlide === void 0 ? void 0 : _this$pswp$currSlide.bounds.center.y) !== null && _this$pswp$currSlide$ !== void 0 ? _this$pswp$currSlide$ : 0)) / (this.pswp.viewportSize.y / 3);
    }
    /**
     * Set pan position of the current slide.
     * Apply friction if the position is beyond the pan bounds,
     * or if custom friction is defined.
     *
     * @private
     * @param {'x' | 'y'} axis
     * @param {number} potentialPan
     * @param {number} [customFriction] (0.1 - 1)
     */
    _setPanWithFriction(axis, potentialPan, customFriction) {
      const {
        currSlide
      } = this.pswp;
      if (!currSlide) {
        return;
      }
      const {
        pan,
        bounds
      } = currSlide;
      const correctedPan = bounds.correctPan(axis, potentialPan);
      if (correctedPan !== potentialPan || customFriction) {
        const delta = Math.round(potentialPan - pan[axis]);
        pan[axis] += delta * (customFriction || PAN_END_FRICTION);
      } else {
        pan[axis] = potentialPan;
      }
    }
  };
  var UPPER_ZOOM_FRICTION = 0.05;
  var LOWER_ZOOM_FRICTION = 0.15;
  function getZoomPointsCenter(p, p1, p2) {
    p.x = (p1.x + p2.x) / 2;
    p.y = (p1.y + p2.y) / 2;
    return p;
  }
  var ZoomHandler = class {
    /**
     * @param {Gestures} gestures
     */
    constructor(gestures) {
      this.gestures = gestures;
      this._startPan = {
        x: 0,
        y: 0
      };
      this._startZoomPoint = {
        x: 0,
        y: 0
      };
      this._zoomPoint = {
        x: 0,
        y: 0
      };
      this._wasOverFitZoomLevel = false;
      this._startZoomLevel = 1;
    }
    start() {
      const {
        currSlide
      } = this.gestures.pswp;
      if (currSlide) {
        this._startZoomLevel = currSlide.currZoomLevel;
        equalizePoints(this._startPan, currSlide.pan);
      }
      this.gestures.pswp.animations.stopAllPan();
      this._wasOverFitZoomLevel = false;
    }
    change() {
      const {
        p1,
        startP1,
        p2,
        startP2,
        pswp
      } = this.gestures;
      const {
        currSlide
      } = pswp;
      if (!currSlide) {
        return;
      }
      const minZoomLevel = currSlide.zoomLevels.min;
      const maxZoomLevel = currSlide.zoomLevels.max;
      if (!currSlide.isZoomable() || pswp.mainScroll.isShifted()) {
        return;
      }
      getZoomPointsCenter(this._startZoomPoint, startP1, startP2);
      getZoomPointsCenter(this._zoomPoint, p1, p2);
      let currZoomLevel = 1 / getDistanceBetween(startP1, startP2) * getDistanceBetween(p1, p2) * this._startZoomLevel;
      if (currZoomLevel > currSlide.zoomLevels.initial + currSlide.zoomLevels.initial / 15) {
        this._wasOverFitZoomLevel = true;
      }
      if (currZoomLevel < minZoomLevel) {
        if (pswp.options.pinchToClose && !this._wasOverFitZoomLevel && this._startZoomLevel <= currSlide.zoomLevels.initial) {
          const bgOpacity = 1 - (minZoomLevel - currZoomLevel) / (minZoomLevel / 1.2);
          if (!pswp.dispatch("pinchClose", {
            bgOpacity
          }).defaultPrevented) {
            pswp.applyBgOpacity(bgOpacity);
          }
        } else {
          currZoomLevel = minZoomLevel - (minZoomLevel - currZoomLevel) * LOWER_ZOOM_FRICTION;
        }
      } else if (currZoomLevel > maxZoomLevel) {
        currZoomLevel = maxZoomLevel + (currZoomLevel - maxZoomLevel) * UPPER_ZOOM_FRICTION;
      }
      currSlide.pan.x = this._calculatePanForZoomLevel("x", currZoomLevel);
      currSlide.pan.y = this._calculatePanForZoomLevel("y", currZoomLevel);
      currSlide.setZoomLevel(currZoomLevel);
      currSlide.applyCurrentZoomPan();
    }
    end() {
      const {
        pswp
      } = this.gestures;
      const {
        currSlide
      } = pswp;
      if ((!currSlide || currSlide.currZoomLevel < currSlide.zoomLevels.initial) && !this._wasOverFitZoomLevel && pswp.options.pinchToClose) {
        pswp.close();
      } else {
        this.correctZoomPan();
      }
    }
    /**
     * @private
     * @param {'x' | 'y'} axis
     * @param {number} currZoomLevel
     * @returns {number}
     */
    _calculatePanForZoomLevel(axis, currZoomLevel) {
      const zoomFactor = currZoomLevel / this._startZoomLevel;
      return this._zoomPoint[axis] - (this._startZoomPoint[axis] - this._startPan[axis]) * zoomFactor;
    }
    /**
     * Correct currZoomLevel and pan if they are
     * beyond minimum or maximum values.
     * With animation.
     *
     * @param {boolean} [ignoreGesture]
     * Wether gesture coordinates should be ignored when calculating destination pan position.
     */
    correctZoomPan(ignoreGesture) {
      const {
        pswp
      } = this.gestures;
      const {
        currSlide
      } = pswp;
      if (!(currSlide !== null && currSlide !== void 0 && currSlide.isZoomable())) {
        return;
      }
      if (this._zoomPoint.x === 0) {
        ignoreGesture = true;
      }
      const prevZoomLevel = currSlide.currZoomLevel;
      let destinationZoomLevel;
      let currZoomLevelNeedsChange = true;
      if (prevZoomLevel < currSlide.zoomLevels.initial) {
        destinationZoomLevel = currSlide.zoomLevels.initial;
      } else if (prevZoomLevel > currSlide.zoomLevels.max) {
        destinationZoomLevel = currSlide.zoomLevels.max;
      } else {
        currZoomLevelNeedsChange = false;
        destinationZoomLevel = prevZoomLevel;
      }
      const initialBgOpacity = pswp.bgOpacity;
      const restoreBgOpacity = pswp.bgOpacity < 1;
      const initialPan = equalizePoints({
        x: 0,
        y: 0
      }, currSlide.pan);
      let destinationPan = equalizePoints({
        x: 0,
        y: 0
      }, initialPan);
      if (ignoreGesture) {
        this._zoomPoint.x = 0;
        this._zoomPoint.y = 0;
        this._startZoomPoint.x = 0;
        this._startZoomPoint.y = 0;
        this._startZoomLevel = prevZoomLevel;
        equalizePoints(this._startPan, initialPan);
      }
      if (currZoomLevelNeedsChange) {
        destinationPan = {
          x: this._calculatePanForZoomLevel("x", destinationZoomLevel),
          y: this._calculatePanForZoomLevel("y", destinationZoomLevel)
        };
      }
      currSlide.setZoomLevel(destinationZoomLevel);
      destinationPan = {
        x: currSlide.bounds.correctPan("x", destinationPan.x),
        y: currSlide.bounds.correctPan("y", destinationPan.y)
      };
      currSlide.setZoomLevel(prevZoomLevel);
      const panNeedsChange = !pointsEqual(destinationPan, initialPan);
      if (!panNeedsChange && !currZoomLevelNeedsChange && !restoreBgOpacity) {
        currSlide._setResolution(destinationZoomLevel);
        currSlide.applyCurrentZoomPan();
        return;
      }
      pswp.animations.stopAllPan();
      pswp.animations.startSpring({
        isPan: true,
        start: 0,
        end: 1e3,
        velocity: 0,
        dampingRatio: 1,
        naturalFrequency: 40,
        onUpdate: (now) => {
          now /= 1e3;
          if (panNeedsChange || currZoomLevelNeedsChange) {
            if (panNeedsChange) {
              currSlide.pan.x = initialPan.x + (destinationPan.x - initialPan.x) * now;
              currSlide.pan.y = initialPan.y + (destinationPan.y - initialPan.y) * now;
            }
            if (currZoomLevelNeedsChange) {
              const newZoomLevel = prevZoomLevel + (destinationZoomLevel - prevZoomLevel) * now;
              currSlide.setZoomLevel(newZoomLevel);
            }
            currSlide.applyCurrentZoomPan();
          }
          if (restoreBgOpacity && pswp.bgOpacity < 1) {
            pswp.applyBgOpacity(clamp(initialBgOpacity + (1 - initialBgOpacity) * now, 0, 1));
          }
        },
        onComplete: () => {
          currSlide._setResolution(destinationZoomLevel);
          currSlide.applyCurrentZoomPan();
        }
      });
    }
  };
  function didTapOnMainContent(event) {
    return !!/** @type {HTMLElement} */
    event.target.closest(".pswp__container");
  }
  var TapHandler = class {
    /**
     * @param {Gestures} gestures
     */
    constructor(gestures) {
      this.gestures = gestures;
    }
    /**
     * @param {Point} point
     * @param {PointerEvent} originalEvent
     */
    click(point, originalEvent) {
      const targetClassList = (
        /** @type {HTMLElement} */
        originalEvent.target.classList
      );
      const isImageClick = targetClassList.contains("pswp__img");
      const isBackgroundClick = targetClassList.contains("pswp__item") || targetClassList.contains("pswp__zoom-wrap");
      if (isImageClick) {
        this._doClickOrTapAction("imageClick", point, originalEvent);
      } else if (isBackgroundClick) {
        this._doClickOrTapAction("bgClick", point, originalEvent);
      }
    }
    /**
     * @param {Point} point
     * @param {PointerEvent} originalEvent
     */
    tap(point, originalEvent) {
      if (didTapOnMainContent(originalEvent)) {
        this._doClickOrTapAction("tap", point, originalEvent);
      }
    }
    /**
     * @param {Point} point
     * @param {PointerEvent} originalEvent
     */
    doubleTap(point, originalEvent) {
      if (didTapOnMainContent(originalEvent)) {
        this._doClickOrTapAction("doubleTap", point, originalEvent);
      }
    }
    /**
     * @private
     * @param {Actions} actionName
     * @param {Point} point
     * @param {PointerEvent} originalEvent
     */
    _doClickOrTapAction(actionName, point, originalEvent) {
      var _this$gestures$pswp$e;
      const {
        pswp
      } = this.gestures;
      const {
        currSlide
      } = pswp;
      const actionFullName = (
        /** @type {AddPostfix<Actions, 'Action'>} */
        actionName + "Action"
      );
      const optionValue = pswp.options[actionFullName];
      if (pswp.dispatch(actionFullName, {
        point,
        originalEvent
      }).defaultPrevented) {
        return;
      }
      if (typeof optionValue === "function") {
        optionValue.call(pswp, point, originalEvent);
        return;
      }
      switch (optionValue) {
        case "close":
        case "next":
          pswp[optionValue]();
          break;
        case "zoom":
          currSlide === null || currSlide === void 0 || currSlide.toggleZoom(point);
          break;
        case "zoom-or-close":
          if (currSlide !== null && currSlide !== void 0 && currSlide.isZoomable() && currSlide.zoomLevels.secondary !== currSlide.zoomLevels.initial) {
            currSlide.toggleZoom(point);
          } else if (pswp.options.clickToCloseNonZoomable) {
            pswp.close();
          }
          break;
        case "toggle-controls":
          (_this$gestures$pswp$e = this.gestures.pswp.element) === null || _this$gestures$pswp$e === void 0 || _this$gestures$pswp$e.classList.toggle("pswp--ui-visible");
          break;
      }
    }
  };
  var AXIS_SWIPE_HYSTERISIS = 10;
  var DOUBLE_TAP_DELAY = 300;
  var MIN_TAP_DISTANCE = 25;
  var Gestures = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this.dragAxis = null;
      this.p1 = {
        x: 0,
        y: 0
      };
      this.p2 = {
        x: 0,
        y: 0
      };
      this.prevP1 = {
        x: 0,
        y: 0
      };
      this.prevP2 = {
        x: 0,
        y: 0
      };
      this.startP1 = {
        x: 0,
        y: 0
      };
      this.startP2 = {
        x: 0,
        y: 0
      };
      this.velocity = {
        x: 0,
        y: 0
      };
      this._lastStartP1 = {
        x: 0,
        y: 0
      };
      this._intervalP1 = {
        x: 0,
        y: 0
      };
      this._numActivePoints = 0;
      this._ongoingPointers = [];
      this._touchEventEnabled = "ontouchstart" in window;
      this._pointerEventEnabled = !!window.PointerEvent;
      this.supportsTouch = this._touchEventEnabled || this._pointerEventEnabled && navigator.maxTouchPoints > 1;
      this._numActivePoints = 0;
      this._intervalTime = 0;
      this._velocityCalculated = false;
      this.isMultitouch = false;
      this.isDragging = false;
      this.isZooming = false;
      this.raf = null;
      this._tapTimer = null;
      if (!this.supportsTouch) {
        pswp.options.allowPanToNext = false;
      }
      this.drag = new DragHandler(this);
      this.zoomLevels = new ZoomHandler(this);
      this.tapHandler = new TapHandler(this);
      pswp.on("bindEvents", () => {
        pswp.events.add(
          pswp.scrollWrap,
          "click",
          /** @type EventListener */
          this._onClick.bind(this)
        );
        if (this._pointerEventEnabled) {
          this._bindEvents("pointer", "down", "up", "cancel");
        } else if (this._touchEventEnabled) {
          this._bindEvents("touch", "start", "end", "cancel");
          if (pswp.scrollWrap) {
            pswp.scrollWrap.ontouchmove = () => {
            };
            pswp.scrollWrap.ontouchend = () => {
            };
          }
        } else {
          this._bindEvents("mouse", "down", "up");
        }
      });
    }
    /**
     * @private
     * @param {'mouse' | 'touch' | 'pointer'} pref
     * @param {'down' | 'start'} down
     * @param {'up' | 'end'} up
     * @param {'cancel'} [cancel]
     */
    _bindEvents(pref, down, up, cancel) {
      const {
        pswp
      } = this;
      const {
        events
      } = pswp;
      const cancelEvent = cancel ? pref + cancel : "";
      events.add(
        pswp.scrollWrap,
        pref + down,
        /** @type EventListener */
        this.onPointerDown.bind(this)
      );
      events.add(
        window,
        pref + "move",
        /** @type EventListener */
        this.onPointerMove.bind(this)
      );
      events.add(
        window,
        pref + up,
        /** @type EventListener */
        this.onPointerUp.bind(this)
      );
      if (cancelEvent) {
        events.add(
          pswp.scrollWrap,
          cancelEvent,
          /** @type EventListener */
          this.onPointerUp.bind(this)
        );
      }
    }
    /**
     * @param {PointerEvent} e
     */
    onPointerDown(e) {
      const isMousePointer = e.type === "mousedown" || e.pointerType === "mouse";
      if (isMousePointer && e.button > 0) {
        return;
      }
      const {
        pswp
      } = this;
      if (!pswp.opener.isOpen) {
        e.preventDefault();
        return;
      }
      if (pswp.dispatch("pointerDown", {
        originalEvent: e
      }).defaultPrevented) {
        return;
      }
      if (isMousePointer) {
        pswp.mouseDetected();
        this._preventPointerEventBehaviour(e, "down");
      }
      pswp.animations.stopAll();
      this._updatePoints(e, "down");
      if (this._numActivePoints === 1) {
        this.dragAxis = null;
        equalizePoints(this.startP1, this.p1);
      }
      if (this._numActivePoints > 1) {
        this._clearTapTimer();
        this.isMultitouch = true;
      } else {
        this.isMultitouch = false;
      }
    }
    /**
     * @param {PointerEvent} e
     */
    onPointerMove(e) {
      this._preventPointerEventBehaviour(e, "move");
      if (!this._numActivePoints) {
        return;
      }
      this._updatePoints(e, "move");
      if (this.pswp.dispatch("pointerMove", {
        originalEvent: e
      }).defaultPrevented) {
        return;
      }
      if (this._numActivePoints === 1 && !this.isDragging) {
        if (!this.dragAxis) {
          this._calculateDragDirection();
        }
        if (this.dragAxis && !this.isDragging) {
          if (this.isZooming) {
            this.isZooming = false;
            this.zoomLevels.end();
          }
          this.isDragging = true;
          this._clearTapTimer();
          this._updateStartPoints();
          this._intervalTime = Date.now();
          this._velocityCalculated = false;
          equalizePoints(this._intervalP1, this.p1);
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.drag.start();
          this._rafStopLoop();
          this._rafRenderLoop();
        }
      } else if (this._numActivePoints > 1 && !this.isZooming) {
        this._finishDrag();
        this.isZooming = true;
        this._updateStartPoints();
        this.zoomLevels.start();
        this._rafStopLoop();
        this._rafRenderLoop();
      }
    }
    /**
     * @private
     */
    _finishDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        if (!this._velocityCalculated) {
          this._updateVelocity(true);
        }
        this.drag.end();
        this.dragAxis = null;
      }
    }
    /**
     * @param {PointerEvent} e
     */
    onPointerUp(e) {
      if (!this._numActivePoints) {
        return;
      }
      this._updatePoints(e, "up");
      if (this.pswp.dispatch("pointerUp", {
        originalEvent: e
      }).defaultPrevented) {
        return;
      }
      if (this._numActivePoints === 0) {
        this._rafStopLoop();
        if (this.isDragging) {
          this._finishDrag();
        } else if (!this.isZooming && !this.isMultitouch) {
          this._finishTap(e);
        }
      }
      if (this._numActivePoints < 2 && this.isZooming) {
        this.isZooming = false;
        this.zoomLevels.end();
        if (this._numActivePoints === 1) {
          this.dragAxis = null;
          this._updateStartPoints();
        }
      }
    }
    /**
     * @private
     */
    _rafRenderLoop() {
      if (this.isDragging || this.isZooming) {
        this._updateVelocity();
        if (this.isDragging) {
          if (!pointsEqual(this.p1, this.prevP1)) {
            this.drag.change();
          }
        } else {
          if (!pointsEqual(this.p1, this.prevP1) || !pointsEqual(this.p2, this.prevP2)) {
            this.zoomLevels.change();
          }
        }
        this._updatePrevPoints();
        this.raf = requestAnimationFrame(this._rafRenderLoop.bind(this));
      }
    }
    /**
     * Update velocity at 50ms interval
     *
     * @private
     * @param {boolean} [force]
     */
    _updateVelocity(force) {
      const time = Date.now();
      const duration = time - this._intervalTime;
      if (duration < 50 && !force) {
        return;
      }
      this.velocity.x = this._getVelocity("x", duration);
      this.velocity.y = this._getVelocity("y", duration);
      this._intervalTime = time;
      equalizePoints(this._intervalP1, this.p1);
      this._velocityCalculated = true;
    }
    /**
     * @private
     * @param {PointerEvent} e
     */
    _finishTap(e) {
      const {
        mainScroll
      } = this.pswp;
      if (mainScroll.isShifted()) {
        mainScroll.moveIndexBy(0, true);
        return;
      }
      if (e.type.indexOf("cancel") > 0) {
        return;
      }
      if (e.type === "mouseup" || e.pointerType === "mouse") {
        this.tapHandler.click(this.startP1, e);
        return;
      }
      const tapDelay = this.pswp.options.doubleTapAction ? DOUBLE_TAP_DELAY : 0;
      if (this._tapTimer) {
        this._clearTapTimer();
        if (getDistanceBetween(this._lastStartP1, this.startP1) < MIN_TAP_DISTANCE) {
          this.tapHandler.doubleTap(this.startP1, e);
        }
      } else {
        equalizePoints(this._lastStartP1, this.startP1);
        this._tapTimer = setTimeout(() => {
          this.tapHandler.tap(this.startP1, e);
          this._clearTapTimer();
        }, tapDelay);
      }
    }
    /**
     * @private
     */
    _clearTapTimer() {
      if (this._tapTimer) {
        clearTimeout(this._tapTimer);
        this._tapTimer = null;
      }
    }
    /**
     * Get velocity for axis
     *
     * @private
     * @param {'x' | 'y'} axis
     * @param {number} duration
     * @returns {number}
     */
    _getVelocity(axis, duration) {
      const displacement = this.p1[axis] - this._intervalP1[axis];
      if (Math.abs(displacement) > 1 && duration > 5) {
        return displacement / duration;
      }
      return 0;
    }
    /**
     * @private
     */
    _rafStopLoop() {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
    }
    /**
     * @private
     * @param {PointerEvent} e
     * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
     */
    _preventPointerEventBehaviour(e, pointerType) {
      const preventPointerEvent = this.pswp.applyFilters("preventPointerEvent", true, e, pointerType);
      if (preventPointerEvent) {
        e.preventDefault();
      }
    }
    /**
     * Parses and normalizes points from the touch, mouse or pointer event.
     * Updates p1 and p2.
     *
     * @private
     * @param {PointerEvent | TouchEvent} e
     * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
     */
    _updatePoints(e, pointerType) {
      if (this._pointerEventEnabled) {
        const pointerEvent = (
          /** @type {PointerEvent} */
          e
        );
        const pointerIndex = this._ongoingPointers.findIndex((ongoingPointer) => {
          return ongoingPointer.id === pointerEvent.pointerId;
        });
        if (pointerType === "up" && pointerIndex > -1) {
          this._ongoingPointers.splice(pointerIndex, 1);
        } else if (pointerType === "down" && pointerIndex === -1) {
          this._ongoingPointers.push(this._convertEventPosToPoint(pointerEvent, {
            x: 0,
            y: 0
          }));
        } else if (pointerIndex > -1) {
          this._convertEventPosToPoint(pointerEvent, this._ongoingPointers[pointerIndex]);
        }
        this._numActivePoints = this._ongoingPointers.length;
        if (this._numActivePoints > 0) {
          equalizePoints(this.p1, this._ongoingPointers[0]);
        }
        if (this._numActivePoints > 1) {
          equalizePoints(this.p2, this._ongoingPointers[1]);
        }
      } else {
        const touchEvent = (
          /** @type {TouchEvent} */
          e
        );
        this._numActivePoints = 0;
        if (touchEvent.type.indexOf("touch") > -1) {
          if (touchEvent.touches && touchEvent.touches.length > 0) {
            this._convertEventPosToPoint(touchEvent.touches[0], this.p1);
            this._numActivePoints++;
            if (touchEvent.touches.length > 1) {
              this._convertEventPosToPoint(touchEvent.touches[1], this.p2);
              this._numActivePoints++;
            }
          }
        } else {
          this._convertEventPosToPoint(
            /** @type {PointerEvent} */
            e,
            this.p1
          );
          if (pointerType === "up") {
            this._numActivePoints = 0;
          } else {
            this._numActivePoints++;
          }
        }
      }
    }
    /** update points that were used during previous rAF tick
     * @private
     */
    _updatePrevPoints() {
      equalizePoints(this.prevP1, this.p1);
      equalizePoints(this.prevP2, this.p2);
    }
    /** update points at the start of gesture
     * @private
     */
    _updateStartPoints() {
      equalizePoints(this.startP1, this.p1);
      equalizePoints(this.startP2, this.p2);
      this._updatePrevPoints();
    }
    /** @private */
    _calculateDragDirection() {
      if (this.pswp.mainScroll.isShifted()) {
        this.dragAxis = "x";
      } else {
        const diff = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
        if (diff !== 0) {
          const axisToCheck = diff > 0 ? "x" : "y";
          if (Math.abs(this.p1[axisToCheck] - this.startP1[axisToCheck]) >= AXIS_SWIPE_HYSTERISIS) {
            this.dragAxis = axisToCheck;
          }
        }
      }
    }
    /**
     * Converts touch, pointer or mouse event
     * to PhotoSwipe point.
     *
     * @private
     * @param {Touch | PointerEvent} e
     * @param {Point} p
     * @returns {Point}
     */
    _convertEventPosToPoint(e, p) {
      p.x = e.pageX - this.pswp.offset.x;
      p.y = e.pageY - this.pswp.offset.y;
      if ("pointerId" in e) {
        p.id = e.pointerId;
      } else if (e.identifier !== void 0) {
        p.id = e.identifier;
      }
      return p;
    }
    /**
     * @private
     * @param {PointerEvent} e
     */
    _onClick(e) {
      if (this.pswp.mainScroll.isShifted()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };
  var MAIN_SCROLL_END_FRICTION = 0.35;
  var MainScroll = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this.x = 0;
      this.slideWidth = 0;
      this._currPositionIndex = 0;
      this._prevPositionIndex = 0;
      this._containerShiftIndex = -1;
      this.itemHolders = [];
    }
    /**
     * Position the scroller and slide containers
     * according to viewport size.
     *
     * @param {boolean} [resizeSlides] Whether slides content should resized
     */
    resize(resizeSlides) {
      const {
        pswp
      } = this;
      const newSlideWidth = Math.round(pswp.viewportSize.x + pswp.viewportSize.x * pswp.options.spacing);
      const slideWidthChanged = newSlideWidth !== this.slideWidth;
      if (slideWidthChanged) {
        this.slideWidth = newSlideWidth;
        this.moveTo(this.getCurrSlideX());
      }
      this.itemHolders.forEach((itemHolder, index) => {
        if (slideWidthChanged) {
          setTransform(itemHolder.el, (index + this._containerShiftIndex) * this.slideWidth);
        }
        if (resizeSlides && itemHolder.slide) {
          itemHolder.slide.resize();
        }
      });
    }
    /**
     * Reset X position of the main scroller to zero
     */
    resetPosition() {
      this._currPositionIndex = 0;
      this._prevPositionIndex = 0;
      this.slideWidth = 0;
      this._containerShiftIndex = -1;
    }
    /**
     * Create and append array of three items
     * that hold data about slides in DOM
     */
    appendHolders() {
      this.itemHolders = [];
      for (let i2 = 0; i2 < 3; i2++) {
        const el2 = createElement2("pswp__item", "div", this.pswp.container);
        el2.setAttribute("role", "group");
        el2.setAttribute("aria-roledescription", "slide");
        el2.setAttribute("aria-hidden", "true");
        el2.style.display = i2 === 1 ? "block" : "none";
        this.itemHolders.push({
          el: el2
          //index: -1
        });
      }
    }
    /**
     * Whether the main scroll can be horizontally swiped to the next or previous slide.
     * @returns {boolean}
     */
    canBeSwiped() {
      return this.pswp.getNumItems() > 1;
    }
    /**
     * Move main scroll by X amount of slides.
     * For example:
     *   `-1` will move to the previous slide,
     *    `0` will reset the scroll position of the current slide,
     *    `3` will move three slides forward
     *
     * If loop option is enabled - index will be automatically looped too,
     * (for example `-1` will move to the last slide of the gallery).
     *
     * @param {number} diff
     * @param {boolean} [animate]
     * @param {number} [velocityX]
     * @returns {boolean} whether index was changed or not
     */
    moveIndexBy(diff, animate, velocityX) {
      const {
        pswp
      } = this;
      let newIndex = pswp.potentialIndex + diff;
      const numSlides = pswp.getNumItems();
      if (pswp.canLoop()) {
        newIndex = pswp.getLoopedIndex(newIndex);
        const distance = (diff + numSlides) % numSlides;
        if (distance <= numSlides / 2) {
          diff = distance;
        } else {
          diff = distance - numSlides;
        }
      } else {
        if (newIndex < 0) {
          newIndex = 0;
        } else if (newIndex >= numSlides) {
          newIndex = numSlides - 1;
        }
        diff = newIndex - pswp.potentialIndex;
      }
      pswp.potentialIndex = newIndex;
      this._currPositionIndex -= diff;
      pswp.animations.stopMainScroll();
      const destinationX = this.getCurrSlideX();
      if (!animate) {
        this.moveTo(destinationX);
        this.updateCurrItem();
      } else {
        pswp.animations.startSpring({
          isMainScroll: true,
          start: this.x,
          end: destinationX,
          velocity: velocityX || 0,
          naturalFrequency: 30,
          dampingRatio: 1,
          //0.7,
          onUpdate: (x) => {
            this.moveTo(x);
          },
          onComplete: () => {
            this.updateCurrItem();
            pswp.appendHeavy();
          }
        });
        let currDiff = pswp.potentialIndex - pswp.currIndex;
        if (pswp.canLoop()) {
          const currDistance = (currDiff + numSlides) % numSlides;
          if (currDistance <= numSlides / 2) {
            currDiff = currDistance;
          } else {
            currDiff = currDistance - numSlides;
          }
        }
        if (Math.abs(currDiff) > 1) {
          this.updateCurrItem();
        }
      }
      return Boolean(diff);
    }
    /**
     * X position of the main scroll for the current slide
     * (ignores position during dragging)
     * @returns {number}
     */
    getCurrSlideX() {
      return this.slideWidth * this._currPositionIndex;
    }
    /**
     * Whether scroll position is shifted.
     * For example, it will return true if the scroll is being dragged or animated.
     * @returns {boolean}
     */
    isShifted() {
      return this.x !== this.getCurrSlideX();
    }
    /**
     * Update slides X positions and set their content
     */
    updateCurrItem() {
      var _this$itemHolders$;
      const {
        pswp
      } = this;
      const positionDifference = this._prevPositionIndex - this._currPositionIndex;
      if (!positionDifference) {
        return;
      }
      this._prevPositionIndex = this._currPositionIndex;
      pswp.currIndex = pswp.potentialIndex;
      let diffAbs = Math.abs(positionDifference);
      let tempHolder;
      if (diffAbs >= 3) {
        this._containerShiftIndex += positionDifference + (positionDifference > 0 ? -3 : 3);
        diffAbs = 3;
        this.itemHolders.forEach((itemHolder) => {
          var _itemHolder$slide;
          (_itemHolder$slide = itemHolder.slide) === null || _itemHolder$slide === void 0 || _itemHolder$slide.destroy();
          itemHolder.slide = void 0;
        });
      }
      for (let i2 = 0; i2 < diffAbs; i2++) {
        if (positionDifference > 0) {
          tempHolder = this.itemHolders.shift();
          if (tempHolder) {
            this.itemHolders[2] = tempHolder;
            this._containerShiftIndex++;
            setTransform(tempHolder.el, (this._containerShiftIndex + 2) * this.slideWidth);
            pswp.setContent(tempHolder, pswp.currIndex - diffAbs + i2 + 2);
          }
        } else {
          tempHolder = this.itemHolders.pop();
          if (tempHolder) {
            this.itemHolders.unshift(tempHolder);
            this._containerShiftIndex--;
            setTransform(tempHolder.el, this._containerShiftIndex * this.slideWidth);
            pswp.setContent(tempHolder, pswp.currIndex + diffAbs - i2 - 2);
          }
        }
      }
      if (Math.abs(this._containerShiftIndex) > 50 && !this.isShifted()) {
        this.resetPosition();
        this.resize();
      }
      pswp.animations.stopAllPan();
      this.itemHolders.forEach((itemHolder, i2) => {
        if (itemHolder.slide) {
          itemHolder.slide.setIsActive(i2 === 1);
        }
      });
      pswp.currSlide = (_this$itemHolders$ = this.itemHolders[1]) === null || _this$itemHolders$ === void 0 ? void 0 : _this$itemHolders$.slide;
      pswp.contentLoader.updateLazy(positionDifference);
      if (pswp.currSlide) {
        pswp.currSlide.applyCurrentZoomPan();
      }
      pswp.dispatch("change");
    }
    /**
     * Move the X position of the main scroll container
     *
     * @param {number} x
     * @param {boolean} [dragging]
     */
    moveTo(x, dragging) {
      if (!this.pswp.canLoop() && dragging) {
        let newSlideIndexOffset = (this.slideWidth * this._currPositionIndex - x) / this.slideWidth;
        newSlideIndexOffset += this.pswp.currIndex;
        const delta = Math.round(x - this.x);
        if (newSlideIndexOffset < 0 && delta > 0 || newSlideIndexOffset >= this.pswp.getNumItems() - 1 && delta < 0) {
          x = this.x + delta * MAIN_SCROLL_END_FRICTION;
        }
      }
      this.x = x;
      if (this.pswp.container) {
        setTransform(this.pswp.container, x);
      }
      this.pswp.dispatch("moveMainScroll", {
        x,
        dragging: dragging !== null && dragging !== void 0 ? dragging : false
      });
    }
  };
  var KeyboardKeyCodesMap = {
    Escape: 27,
    z: 90,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    Tab: 9
  };
  var getKeyboardEventKey = (key, isKeySupported) => {
    return isKeySupported ? key : KeyboardKeyCodesMap[key];
  };
  var Keyboard = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this._wasFocused = false;
      pswp.on("bindEvents", () => {
        if (pswp.options.trapFocus) {
          if (!pswp.options.initialPointerPos) {
            this._focusRoot();
          }
          pswp.events.add(
            document,
            "focusin",
            /** @type EventListener */
            this._onFocusIn.bind(this)
          );
        }
        pswp.events.add(
          document,
          "keydown",
          /** @type EventListener */
          this._onKeyDown.bind(this)
        );
      });
      const lastActiveElement = (
        /** @type {HTMLElement} */
        document.activeElement
      );
      pswp.on("destroy", () => {
        if (pswp.options.returnFocus && lastActiveElement && this._wasFocused) {
          lastActiveElement.focus();
        }
      });
    }
    /** @private */
    _focusRoot() {
      if (!this._wasFocused && this.pswp.element) {
        this.pswp.element.focus();
        this._wasFocused = true;
      }
    }
    /**
     * @private
     * @param {KeyboardEvent} e
     */
    _onKeyDown(e) {
      const {
        pswp
      } = this;
      if (pswp.dispatch("keydown", {
        originalEvent: e
      }).defaultPrevented) {
        return;
      }
      if (specialKeyUsed2(e)) {
        return;
      }
      let keydownAction;
      let axis;
      let isForward = false;
      const isKeySupported = "key" in e;
      switch (isKeySupported ? e.key : e.keyCode) {
        case getKeyboardEventKey("Escape", isKeySupported):
          if (pswp.options.escKey) {
            keydownAction = "close";
          }
          break;
        case getKeyboardEventKey("z", isKeySupported):
          keydownAction = "toggleZoom";
          break;
        case getKeyboardEventKey("ArrowLeft", isKeySupported):
          axis = "x";
          break;
        case getKeyboardEventKey("ArrowUp", isKeySupported):
          axis = "y";
          break;
        case getKeyboardEventKey("ArrowRight", isKeySupported):
          axis = "x";
          isForward = true;
          break;
        case getKeyboardEventKey("ArrowDown", isKeySupported):
          isForward = true;
          axis = "y";
          break;
        case getKeyboardEventKey("Tab", isKeySupported):
          this._focusRoot();
          break;
      }
      if (axis) {
        e.preventDefault();
        const {
          currSlide
        } = pswp;
        if (pswp.options.arrowKeys && axis === "x" && pswp.getNumItems() > 1) {
          keydownAction = isForward ? "next" : "prev";
        } else if (currSlide && currSlide.currZoomLevel > currSlide.zoomLevels.fit) {
          currSlide.pan[axis] += isForward ? -80 : 80;
          currSlide.panTo(currSlide.pan.x, currSlide.pan.y);
        }
      }
      if (keydownAction) {
        e.preventDefault();
        pswp[keydownAction]();
      }
    }
    /**
     * Trap focus inside photoswipe
     *
     * @private
     * @param {FocusEvent} e
     */
    _onFocusIn(e) {
      const {
        template
      } = this.pswp;
      if (template && document !== e.target && template !== e.target && !template.contains(
        /** @type {Node} */
        e.target
      )) {
        template.focus();
      }
    }
  };
  var DEFAULT_EASING = "cubic-bezier(.4,0,.22,1)";
  var CSSAnimation = class {
    /**
     * onComplete can be unpredictable, be careful about current state
     *
     * @param {CssAnimationProps} props
     */
    constructor(props) {
      var _props$prop;
      this.props = props;
      const {
        target,
        onComplete,
        transform,
        onFinish = () => {
        },
        duration = 333,
        easing = DEFAULT_EASING
      } = props;
      this.onFinish = onFinish;
      const prop = transform ? "transform" : "opacity";
      const propValue = (_props$prop = props[prop]) !== null && _props$prop !== void 0 ? _props$prop : "";
      this._target = target;
      this._onComplete = onComplete;
      this._finished = false;
      this._onTransitionEnd = this._onTransitionEnd.bind(this);
      this._helperTimeout = setTimeout(() => {
        setTransitionStyle(target, prop, duration, easing);
        this._helperTimeout = setTimeout(() => {
          target.addEventListener("transitionend", this._onTransitionEnd, false);
          target.addEventListener("transitioncancel", this._onTransitionEnd, false);
          this._helperTimeout = setTimeout(() => {
            this._finalizeAnimation();
          }, duration + 500);
          target.style[prop] = propValue;
        }, 30);
      }, 0);
    }
    /**
     * @private
     * @param {TransitionEvent} e
     */
    _onTransitionEnd(e) {
      if (e.target === this._target) {
        this._finalizeAnimation();
      }
    }
    /**
     * @private
     */
    _finalizeAnimation() {
      if (!this._finished) {
        this._finished = true;
        this.onFinish();
        if (this._onComplete) {
          this._onComplete();
        }
      }
    }
    // Destroy is called automatically onFinish
    destroy() {
      if (this._helperTimeout) {
        clearTimeout(this._helperTimeout);
      }
      removeTransitionStyle(this._target);
      this._target.removeEventListener("transitionend", this._onTransitionEnd, false);
      this._target.removeEventListener("transitioncancel", this._onTransitionEnd, false);
      if (!this._finished) {
        this._finalizeAnimation();
      }
    }
  };
  var DEFAULT_NATURAL_FREQUENCY = 12;
  var DEFAULT_DAMPING_RATIO = 0.75;
  var SpringEaser = class {
    /**
     * @param {number} initialVelocity Initial velocity, px per ms.
     *
     * @param {number} [dampingRatio]
     * Determines how bouncy animation will be.
     * From 0 to 1, 0 - always overshoot, 1 - do not overshoot.
     * "overshoot" refers to part of animation that
     * goes beyond the final value.
     *
     * @param {number} [naturalFrequency]
     * Determines how fast animation will slow down.
     * The higher value - the stiffer the transition will be,
     * and the faster it will slow down.
     * Recommended value from 10 to 50
     */
    constructor(initialVelocity, dampingRatio, naturalFrequency) {
      this.velocity = initialVelocity * 1e3;
      this._dampingRatio = dampingRatio || DEFAULT_DAMPING_RATIO;
      this._naturalFrequency = naturalFrequency || DEFAULT_NATURAL_FREQUENCY;
      this._dampedFrequency = this._naturalFrequency;
      if (this._dampingRatio < 1) {
        this._dampedFrequency *= Math.sqrt(1 - this._dampingRatio * this._dampingRatio);
      }
    }
    /**
     * @param {number} deltaPosition Difference between current and end position of the animation
     * @param {number} deltaTime Frame duration in milliseconds
     *
     * @returns {number} Displacement, relative to the end position.
     */
    easeFrame(deltaPosition, deltaTime) {
      let displacement = 0;
      let coeff;
      deltaTime /= 1e3;
      const naturalDumpingPow = Math.E ** (-this._dampingRatio * this._naturalFrequency * deltaTime);
      if (this._dampingRatio === 1) {
        coeff = this.velocity + this._naturalFrequency * deltaPosition;
        displacement = (deltaPosition + coeff * deltaTime) * naturalDumpingPow;
        this.velocity = displacement * -this._naturalFrequency + coeff * naturalDumpingPow;
      } else if (this._dampingRatio < 1) {
        coeff = 1 / this._dampedFrequency * (this._dampingRatio * this._naturalFrequency * deltaPosition + this.velocity);
        const dumpedFCos = Math.cos(this._dampedFrequency * deltaTime);
        const dumpedFSin = Math.sin(this._dampedFrequency * deltaTime);
        displacement = naturalDumpingPow * (deltaPosition * dumpedFCos + coeff * dumpedFSin);
        this.velocity = displacement * -this._naturalFrequency * this._dampingRatio + naturalDumpingPow * (-this._dampedFrequency * deltaPosition * dumpedFSin + this._dampedFrequency * coeff * dumpedFCos);
      }
      return displacement;
    }
  };
  var SpringAnimation = class {
    /**
     * @param {SpringAnimationProps} props
     */
    constructor(props) {
      this.props = props;
      this._raf = 0;
      const {
        start,
        end,
        velocity,
        onUpdate,
        onComplete,
        onFinish = () => {
        },
        dampingRatio,
        naturalFrequency
      } = props;
      this.onFinish = onFinish;
      const easer = new SpringEaser(velocity, dampingRatio, naturalFrequency);
      let prevTime = Date.now();
      let deltaPosition = start - end;
      const animationLoop = () => {
        if (this._raf) {
          deltaPosition = easer.easeFrame(deltaPosition, Date.now() - prevTime);
          if (Math.abs(deltaPosition) < 1 && Math.abs(easer.velocity) < 50) {
            onUpdate(end);
            if (onComplete) {
              onComplete();
            }
            this.onFinish();
          } else {
            prevTime = Date.now();
            onUpdate(deltaPosition + end);
            this._raf = requestAnimationFrame(animationLoop);
          }
        }
      };
      this._raf = requestAnimationFrame(animationLoop);
    }
    // Destroy is called automatically onFinish
    destroy() {
      if (this._raf >= 0) {
        cancelAnimationFrame(this._raf);
      }
      this._raf = 0;
    }
  };
  var Animations = class {
    constructor() {
      this.activeAnimations = [];
    }
    /**
     * @param {SpringAnimationProps} props
     */
    startSpring(props) {
      this._start(props, true);
    }
    /**
     * @param {CssAnimationProps} props
     */
    startTransition(props) {
      this._start(props);
    }
    /**
     * @private
     * @param {AnimationProps} props
     * @param {boolean} [isSpring]
     * @returns {Animation}
     */
    _start(props, isSpring) {
      const animation = isSpring ? new SpringAnimation(
        /** @type SpringAnimationProps */
        props
      ) : new CSSAnimation(
        /** @type CssAnimationProps */
        props
      );
      this.activeAnimations.push(animation);
      animation.onFinish = () => this.stop(animation);
      return animation;
    }
    /**
     * @param {Animation} animation
     */
    stop(animation) {
      animation.destroy();
      const index = this.activeAnimations.indexOf(animation);
      if (index > -1) {
        this.activeAnimations.splice(index, 1);
      }
    }
    stopAll() {
      this.activeAnimations.forEach((animation) => {
        animation.destroy();
      });
      this.activeAnimations = [];
    }
    /**
     * Stop all pan or zoom transitions
     */
    stopAllPan() {
      this.activeAnimations = this.activeAnimations.filter((animation) => {
        if (animation.props.isPan) {
          animation.destroy();
          return false;
        }
        return true;
      });
    }
    stopMainScroll() {
      this.activeAnimations = this.activeAnimations.filter((animation) => {
        if (animation.props.isMainScroll) {
          animation.destroy();
          return false;
        }
        return true;
      });
    }
    /**
     * Returns true if main scroll transition is running
     */
    // isMainScrollRunning() {
    //   return this.activeAnimations.some((animation) => {
    //     return animation.props.isMainScroll;
    //   });
    // }
    /**
     * Returns true if any pan or zoom transition is running
     */
    isPanRunning() {
      return this.activeAnimations.some((animation) => {
        return animation.props.isPan;
      });
    }
  };
  var ScrollWheel = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      pswp.events.add(
        pswp.element,
        "wheel",
        /** @type EventListener */
        this._onWheel.bind(this)
      );
    }
    /**
     * @private
     * @param {WheelEvent} e
     */
    _onWheel(e) {
      e.preventDefault();
      const {
        currSlide
      } = this.pswp;
      let {
        deltaX,
        deltaY
      } = e;
      if (!currSlide) {
        return;
      }
      if (this.pswp.dispatch("wheel", {
        originalEvent: e
      }).defaultPrevented) {
        return;
      }
      if (e.ctrlKey || this.pswp.options.wheelToZoom) {
        if (currSlide.isZoomable()) {
          let zoomFactor = -deltaY;
          if (e.deltaMode === 1) {
            zoomFactor *= 0.05;
          } else {
            zoomFactor *= e.deltaMode ? 1 : 2e-3;
          }
          zoomFactor = 2 ** zoomFactor;
          const destZoomLevel = currSlide.currZoomLevel * zoomFactor;
          currSlide.zoomTo(destZoomLevel, {
            x: e.clientX,
            y: e.clientY
          });
        }
      } else {
        if (currSlide.isPannable()) {
          if (e.deltaMode === 1) {
            deltaX *= 18;
            deltaY *= 18;
          }
          currSlide.panTo(currSlide.pan.x - deltaX, currSlide.pan.y - deltaY);
        }
      }
    }
  };
  function addElementHTML(htmlData) {
    if (typeof htmlData === "string") {
      return htmlData;
    }
    if (!htmlData || !htmlData.isCustomSVG) {
      return "";
    }
    const svgData = htmlData;
    let out = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
    out = out.split("%d").join(
      /** @type {string} */
      svgData.size || 32
    );
    if (svgData.outlineID) {
      out += '<use class="pswp__icn-shadow" xlink:href="#' + svgData.outlineID + '"/>';
    }
    out += svgData.inner;
    out += "</svg>";
    return out;
  }
  var UIElement = class {
    /**
     * @param {PhotoSwipe} pswp
     * @param {UIElementData} data
     */
    constructor(pswp, data) {
      var _container;
      const name = data.name || data.className;
      let elementHTML = data.html;
      if (pswp.options[name] === false) {
        return;
      }
      if (typeof pswp.options[name + "SVG"] === "string") {
        elementHTML = pswp.options[name + "SVG"];
      }
      pswp.dispatch("uiElementCreate", {
        data
      });
      let className = "";
      if (data.isButton) {
        className += "pswp__button ";
        className += data.className || `pswp__button--${data.name}`;
      } else {
        className += data.className || `pswp__${data.name}`;
      }
      let tagName = data.isButton ? data.tagName || "button" : data.tagName || "div";
      tagName = /** @type {keyof HTMLElementTagNameMap} */
      tagName.toLowerCase();
      const element = createElement2(className, tagName);
      if (data.isButton) {
        if (tagName === "button") {
          element.type = "button";
        }
        let {
          title
        } = data;
        const {
          ariaLabel
        } = data;
        if (typeof pswp.options[name + "Title"] === "string") {
          title = pswp.options[name + "Title"];
        }
        if (title) {
          element.title = title;
        }
        const ariaText = ariaLabel || title;
        if (ariaText) {
          element.setAttribute("aria-label", ariaText);
        }
      }
      element.innerHTML = addElementHTML(elementHTML);
      if (data.onInit) {
        data.onInit(element, pswp);
      }
      if (data.onClick) {
        element.onclick = (e) => {
          if (typeof data.onClick === "string") {
            pswp[data.onClick]();
          } else if (typeof data.onClick === "function") {
            data.onClick(e, element, pswp);
          }
        };
      }
      const appendTo = data.appendTo || "bar";
      let container = pswp.element;
      if (appendTo === "bar") {
        if (!pswp.topBar) {
          pswp.topBar = createElement2("pswp__top-bar pswp__hide-on-close", "div", pswp.scrollWrap);
        }
        container = pswp.topBar;
      } else {
        element.classList.add("pswp__hide-on-close");
        if (appendTo === "wrapper") {
          container = pswp.scrollWrap;
        }
      }
      (_container = container) === null || _container === void 0 || _container.appendChild(pswp.applyFilters("uiElement", element, data));
    }
  };
  function initArrowButton(element, pswp, isNextButton) {
    element.classList.add("pswp__button--arrow");
    element.setAttribute("aria-controls", "pswp__items");
    pswp.on("change", () => {
      if (!pswp.options.loop) {
        if (isNextButton) {
          element.disabled = !(pswp.currIndex < pswp.getNumItems() - 1);
        } else {
          element.disabled = !(pswp.currIndex > 0);
        }
      }
    });
  }
  var arrowPrev = {
    name: "arrowPrev",
    className: "pswp__button--arrow--prev",
    title: "Previous",
    order: 10,
    isButton: true,
    appendTo: "wrapper",
    html: {
      isCustomSVG: true,
      size: 60,
      inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
      outlineID: "pswp__icn-arrow"
    },
    onClick: "prev",
    onInit: initArrowButton
  };
  var arrowNext = {
    name: "arrowNext",
    className: "pswp__button--arrow--next",
    title: "Next",
    order: 11,
    isButton: true,
    appendTo: "wrapper",
    html: {
      isCustomSVG: true,
      size: 60,
      inner: '<use xlink:href="#pswp__icn-arrow"/>',
      outlineID: "pswp__icn-arrow"
    },
    onClick: "next",
    onInit: (el2, pswp) => {
      initArrowButton(el2, pswp, true);
    }
  };
  var closeButton = {
    name: "close",
    title: "Close",
    order: 20,
    isButton: true,
    html: {
      isCustomSVG: true,
      inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
      outlineID: "pswp__icn-close"
    },
    onClick: "close"
  };
  var zoomButton = {
    name: "zoom",
    title: "Zoom",
    order: 10,
    isButton: true,
    html: {
      isCustomSVG: true,
      // eslint-disable-next-line max-len
      inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
      outlineID: "pswp__icn-zoom"
    },
    onClick: "toggleZoom"
  };
  var loadingIndicator = {
    name: "preloader",
    appendTo: "bar",
    order: 7,
    html: {
      isCustomSVG: true,
      // eslint-disable-next-line max-len
      inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
      outlineID: "pswp__icn-loading"
    },
    onInit: (indicatorElement, pswp) => {
      let isVisible;
      let delayTimeout = null;
      const toggleIndicatorClass = (className, add) => {
        indicatorElement.classList.toggle("pswp__preloader--" + className, add);
      };
      const setIndicatorVisibility = (visible) => {
        if (isVisible !== visible) {
          isVisible = visible;
          toggleIndicatorClass("active", visible);
        }
      };
      const updatePreloaderVisibility = () => {
        var _pswp$currSlide;
        if (!((_pswp$currSlide = pswp.currSlide) !== null && _pswp$currSlide !== void 0 && _pswp$currSlide.content.isLoading())) {
          setIndicatorVisibility(false);
          if (delayTimeout) {
            clearTimeout(delayTimeout);
            delayTimeout = null;
          }
          return;
        }
        if (!delayTimeout) {
          delayTimeout = setTimeout(() => {
            var _pswp$currSlide2;
            setIndicatorVisibility(Boolean((_pswp$currSlide2 = pswp.currSlide) === null || _pswp$currSlide2 === void 0 ? void 0 : _pswp$currSlide2.content.isLoading()));
            delayTimeout = null;
          }, pswp.options.preloaderDelay);
        }
      };
      pswp.on("change", updatePreloaderVisibility);
      pswp.on("loadComplete", (e) => {
        if (pswp.currSlide === e.slide) {
          updatePreloaderVisibility();
        }
      });
      if (pswp.ui) {
        pswp.ui.updatePreloaderVisibility = updatePreloaderVisibility;
      }
    }
  };
  var counterIndicator = {
    name: "counter",
    order: 5,
    onInit: (counterElement, pswp) => {
      pswp.on("change", () => {
        counterElement.innerText = pswp.currIndex + 1 + pswp.options.indexIndicatorSep + pswp.getNumItems();
      });
    }
  };
  function setZoomedIn(el2, isZoomedIn) {
    el2.classList.toggle("pswp--zoomed-in", isZoomedIn);
  }
  var UI = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this.isRegistered = false;
      this.uiElementsData = [];
      this.items = [];
      this.updatePreloaderVisibility = () => {
      };
      this._lastUpdatedZoomLevel = void 0;
    }
    init() {
      const {
        pswp
      } = this;
      this.isRegistered = false;
      this.uiElementsData = [closeButton, arrowPrev, arrowNext, zoomButton, loadingIndicator, counterIndicator];
      pswp.dispatch("uiRegister");
      this.uiElementsData.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
      });
      this.items = [];
      this.isRegistered = true;
      this.uiElementsData.forEach((uiElementData) => {
        this.registerElement(uiElementData);
      });
      pswp.on("change", () => {
        var _pswp$element;
        (_pswp$element = pswp.element) === null || _pswp$element === void 0 || _pswp$element.classList.toggle("pswp--one-slide", pswp.getNumItems() === 1);
      });
      pswp.on("zoomPanUpdate", () => this._onZoomPanUpdate());
    }
    /**
     * @param {UIElementData} elementData
     */
    registerElement(elementData) {
      if (this.isRegistered) {
        this.items.push(new UIElement(this.pswp, elementData));
      } else {
        this.uiElementsData.push(elementData);
      }
    }
    /**
     * Fired each time zoom or pan position is changed.
     * Update classes that control visibility of zoom button and cursor icon.
     *
     * @private
     */
    _onZoomPanUpdate() {
      const {
        template,
        currSlide,
        options
      } = this.pswp;
      if (this.pswp.opener.isClosing || !template || !currSlide) {
        return;
      }
      let {
        currZoomLevel
      } = currSlide;
      if (!this.pswp.opener.isOpen) {
        currZoomLevel = currSlide.zoomLevels.initial;
      }
      if (currZoomLevel === this._lastUpdatedZoomLevel) {
        return;
      }
      this._lastUpdatedZoomLevel = currZoomLevel;
      const currZoomLevelDiff = currSlide.zoomLevels.initial - currSlide.zoomLevels.secondary;
      if (Math.abs(currZoomLevelDiff) < 0.01 || !currSlide.isZoomable()) {
        setZoomedIn(template, false);
        template.classList.remove("pswp--zoom-allowed");
        return;
      }
      template.classList.add("pswp--zoom-allowed");
      const potentialZoomLevel = currZoomLevel === currSlide.zoomLevels.initial ? currSlide.zoomLevels.secondary : currSlide.zoomLevels.initial;
      setZoomedIn(template, potentialZoomLevel <= currZoomLevel);
      if (options.imageClickAction === "zoom" || options.imageClickAction === "zoom-or-close") {
        template.classList.add("pswp--click-to-zoom");
      }
    }
  };
  function getBoundsByElement(el2) {
    const thumbAreaRect = el2.getBoundingClientRect();
    return {
      x: thumbAreaRect.left,
      y: thumbAreaRect.top,
      w: thumbAreaRect.width
    };
  }
  function getCroppedBoundsByElement(el2, imageWidth, imageHeight) {
    const thumbAreaRect = el2.getBoundingClientRect();
    const hRatio = thumbAreaRect.width / imageWidth;
    const vRatio = thumbAreaRect.height / imageHeight;
    const fillZoomLevel = hRatio > vRatio ? hRatio : vRatio;
    const offsetX = (thumbAreaRect.width - imageWidth * fillZoomLevel) / 2;
    const offsetY = (thumbAreaRect.height - imageHeight * fillZoomLevel) / 2;
    const bounds = {
      x: thumbAreaRect.left + offsetX,
      y: thumbAreaRect.top + offsetY,
      w: imageWidth * fillZoomLevel
    };
    bounds.innerRect = {
      w: thumbAreaRect.width,
      h: thumbAreaRect.height,
      x: offsetX,
      y: offsetY
    };
    return bounds;
  }
  function getThumbBounds(index, itemData, instance) {
    const event = instance.dispatch("thumbBounds", {
      index,
      itemData,
      instance
    });
    if (event.thumbBounds) {
      return event.thumbBounds;
    }
    const {
      element
    } = itemData;
    let thumbBounds;
    let thumbnail;
    if (element && instance.options.thumbSelector !== false) {
      const thumbSelector = instance.options.thumbSelector || "img";
      thumbnail = element.matches(thumbSelector) ? element : (
        /** @type {HTMLElement | null} */
        element.querySelector(thumbSelector)
      );
    }
    thumbnail = instance.applyFilters("thumbEl", thumbnail, itemData, index);
    if (thumbnail) {
      if (!itemData.thumbCropped) {
        thumbBounds = getBoundsByElement(thumbnail);
      } else {
        thumbBounds = getCroppedBoundsByElement(thumbnail, itemData.width || itemData.w || 0, itemData.height || itemData.h || 0);
      }
    }
    return instance.applyFilters("thumbBounds", thumbBounds, itemData, index);
  }
  var PhotoSwipeEvent2 = class {
    /**
     * @param {T} type
     * @param {PhotoSwipeEventsMap[T]} [details]
     */
    constructor(type, details) {
      this.type = type;
      this.defaultPrevented = false;
      if (details) {
        Object.assign(this, details);
      }
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
  };
  var Eventable2 = class {
    constructor() {
      this._listeners = {};
      this._filters = {};
      this.pswp = void 0;
      this.options = void 0;
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {PhotoSwipeFiltersMap[T]} fn
     * @param {number} priority
     */
    addFilter(name, fn, priority = 100) {
      var _this$_filters$name, _this$_filters$name2, _this$pswp;
      if (!this._filters[name]) {
        this._filters[name] = [];
      }
      (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
        fn,
        priority
      });
      (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
      (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {PhotoSwipeFiltersMap[T]} fn
     */
    removeFilter(name, fn) {
      if (this._filters[name]) {
        this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
      }
      if (this.pswp) {
        this.pswp.removeFilter(name, fn);
      }
    }
    /**
     * @template {keyof PhotoSwipeFiltersMap} T
     * @param {T} name
     * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
     * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
     */
    applyFilters(name, ...args) {
      var _this$_filters$name3;
      (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach((filter) => {
        args[0] = filter.fn.apply(this, args);
      });
      return args[0];
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {EventCallback<T>} fn
     */
    on(name, fn) {
      var _this$_listeners$name, _this$pswp2;
      if (!this._listeners[name]) {
        this._listeners[name] = [];
      }
      (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn);
      (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {EventCallback<T>} fn
     */
    off(name, fn) {
      var _this$pswp3;
      if (this._listeners[name]) {
        this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
      }
      (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
    }
    /**
     * @template {keyof PhotoSwipeEventsMap} T
     * @param {T} name
     * @param {PhotoSwipeEventsMap[T]} [details]
     * @returns {AugmentedEvent<T>}
     */
    dispatch(name, details) {
      var _this$_listeners$name2;
      if (this.pswp) {
        return this.pswp.dispatch(name, details);
      }
      const event = (
        /** @type {AugmentedEvent<T>} */
        new PhotoSwipeEvent2(name, details)
      );
      (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach((listener) => {
        listener.call(this, event);
      });
      return event;
    }
  };
  var Placeholder2 = class {
    /**
     * @param {string | false} imageSrc
     * @param {HTMLElement} container
     */
    constructor(imageSrc, container) {
      this.element = createElement2("pswp__img pswp__img--placeholder", imageSrc ? "img" : "div", container);
      if (imageSrc) {
        const imgEl = (
          /** @type {HTMLImageElement} */
          this.element
        );
        imgEl.decoding = "async";
        imgEl.alt = "";
        imgEl.src = imageSrc;
        imgEl.setAttribute("role", "presentation");
      }
      this.element.setAttribute("aria-hidden", "true");
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    setDisplayedSize(width, height) {
      if (!this.element) {
        return;
      }
      if (this.element.tagName === "IMG") {
        setWidthHeight2(this.element, 250, "auto");
        this.element.style.transformOrigin = "0 0";
        this.element.style.transform = toTransformString2(0, 0, width / 250);
      } else {
        setWidthHeight2(this.element, width, height);
      }
    }
    destroy() {
      var _this$element;
      if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
        this.element.remove();
      }
      this.element = null;
    }
  };
  var Content2 = class {
    /**
     * @param {SlideData} itemData Slide data
     * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
     * @param {number} index
     */
    constructor(itemData, instance, index) {
      this.instance = instance;
      this.data = itemData;
      this.index = index;
      this.element = void 0;
      this.placeholder = void 0;
      this.slide = void 0;
      this.displayedImageWidth = 0;
      this.displayedImageHeight = 0;
      this.width = Number(this.data.w) || Number(this.data.width) || 0;
      this.height = Number(this.data.h) || Number(this.data.height) || 0;
      this.isAttached = false;
      this.hasSlide = false;
      this.isDecoding = false;
      this.state = LOAD_STATE2.IDLE;
      if (this.data.type) {
        this.type = this.data.type;
      } else if (this.data.src) {
        this.type = "image";
      } else {
        this.type = "html";
      }
      this.instance.dispatch("contentInit", {
        content: this
      });
    }
    removePlaceholder() {
      if (this.placeholder && !this.keepPlaceholder()) {
        setTimeout(() => {
          if (this.placeholder) {
            this.placeholder.destroy();
            this.placeholder = void 0;
          }
        }, 1e3);
      }
    }
    /**
     * Preload content
     *
     * @param {boolean} isLazy
     * @param {boolean} [reload]
     */
    load(isLazy, reload) {
      if (this.slide && this.usePlaceholder()) {
        if (!this.placeholder) {
          const placeholderSrc = this.instance.applyFilters(
            "placeholderSrc",
            // use  image-based placeholder only for the first slide,
            // as rendering (even small stretched thumbnail) is an expensive operation
            this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
            this
          );
          this.placeholder = new Placeholder2(placeholderSrc, this.slide.container);
        } else {
          const placeholderEl = this.placeholder.element;
          if (placeholderEl && !placeholderEl.parentElement) {
            this.slide.container.prepend(placeholderEl);
          }
        }
      }
      if (this.element && !reload) {
        return;
      }
      if (this.instance.dispatch("contentLoad", {
        content: this,
        isLazy
      }).defaultPrevented) {
        return;
      }
      if (this.isImageContent()) {
        this.element = createElement2("pswp__img", "img");
        if (this.displayedImageWidth) {
          this.loadImage(isLazy);
        }
      } else {
        this.element = createElement2("pswp__content", "div");
        this.element.innerHTML = this.data.html || "";
      }
      if (reload && this.slide) {
        this.slide.updateContentSize(true);
      }
    }
    /**
     * Preload image
     *
     * @param {boolean} isLazy
     */
    loadImage(isLazy) {
      var _this$data$src, _this$data$alt;
      if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
        content: this,
        isLazy
      }).defaultPrevented) {
        return;
      }
      const imageElement = (
        /** @type HTMLImageElement */
        this.element
      );
      this.updateSrcsetSizes();
      if (this.data.srcset) {
        imageElement.srcset = this.data.srcset;
      }
      imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : "";
      imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : "";
      this.state = LOAD_STATE2.LOADING;
      if (imageElement.complete) {
        this.onLoaded();
      } else {
        imageElement.onload = () => {
          this.onLoaded();
        };
        imageElement.onerror = () => {
          this.onError();
        };
      }
    }
    /**
     * Assign slide to content
     *
     * @param {Slide} slide
     */
    setSlide(slide) {
      this.slide = slide;
      this.hasSlide = true;
      this.instance = slide.pswp;
    }
    /**
     * Content load success handler
     */
    onLoaded() {
      this.state = LOAD_STATE2.LOADED;
      if (this.slide && this.element) {
        this.instance.dispatch("loadComplete", {
          slide: this.slide,
          content: this
        });
        if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
          this.append();
          this.slide.updateContentSize(true);
        }
        if (this.state === LOAD_STATE2.LOADED || this.state === LOAD_STATE2.ERROR) {
          this.removePlaceholder();
        }
      }
    }
    /**
     * Content load error handler
     */
    onError() {
      this.state = LOAD_STATE2.ERROR;
      if (this.slide) {
        this.displayError();
        this.instance.dispatch("loadComplete", {
          slide: this.slide,
          isError: true,
          content: this
        });
        this.instance.dispatch("loadError", {
          slide: this.slide,
          content: this
        });
      }
    }
    /**
     * @returns {Boolean} If the content is currently loading
     */
    isLoading() {
      return this.instance.applyFilters("isContentLoading", this.state === LOAD_STATE2.LOADING, this);
    }
    /**
     * @returns {Boolean} If the content is in error state
     */
    isError() {
      return this.state === LOAD_STATE2.ERROR;
    }
    /**
     * @returns {boolean} If the content is image
     */
    isImageContent() {
      return this.type === "image";
    }
    /**
     * Update content size
     *
     * @param {Number} width
     * @param {Number} height
     */
    setDisplayedSize(width, height) {
      if (!this.element) {
        return;
      }
      if (this.placeholder) {
        this.placeholder.setDisplayedSize(width, height);
      }
      if (this.instance.dispatch("contentResize", {
        content: this,
        width,
        height
      }).defaultPrevented) {
        return;
      }
      setWidthHeight2(this.element, width, height);
      if (this.isImageContent() && !this.isError()) {
        const isInitialSizeUpdate = !this.displayedImageWidth && width;
        this.displayedImageWidth = width;
        this.displayedImageHeight = height;
        if (isInitialSizeUpdate) {
          this.loadImage(false);
        } else {
          this.updateSrcsetSizes();
        }
        if (this.slide) {
          this.instance.dispatch("imageSizeChange", {
            slide: this.slide,
            width,
            height,
            content: this
          });
        }
      }
    }
    /**
     * @returns {boolean} If the content can be zoomed
     */
    isZoomable() {
      return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== LOAD_STATE2.ERROR, this);
    }
    /**
     * Update image srcset sizes attribute based on width and height
     */
    updateSrcsetSizes() {
      if (!this.isImageContent() || !this.element || !this.data.srcset) {
        return;
      }
      const image = (
        /** @type HTMLImageElement */
        this.element
      );
      const sizesWidth = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
      if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
        image.sizes = sizesWidth + "px";
        image.dataset.largestUsedSize = String(sizesWidth);
      }
    }
    /**
     * @returns {boolean} If content should use a placeholder (from msrc by default)
     */
    usePlaceholder() {
      return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
    }
    /**
     * Preload content with lazy-loading param
     */
    lazyLoad() {
      if (this.instance.dispatch("contentLazyLoad", {
        content: this
      }).defaultPrevented) {
        return;
      }
      this.load(true);
    }
    /**
     * @returns {boolean} If placeholder should be kept after content is loaded
     */
    keepPlaceholder() {
      return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
    }
    /**
     * Destroy the content
     */
    destroy() {
      this.hasSlide = false;
      this.slide = void 0;
      if (this.instance.dispatch("contentDestroy", {
        content: this
      }).defaultPrevented) {
        return;
      }
      this.remove();
      if (this.placeholder) {
        this.placeholder.destroy();
        this.placeholder = void 0;
      }
      if (this.isImageContent() && this.element) {
        this.element.onload = null;
        this.element.onerror = null;
        this.element = void 0;
      }
    }
    /**
     * Display error message
     */
    displayError() {
      if (this.slide) {
        var _this$instance$option, _this$instance$option2;
        let errorMsgEl = createElement2("pswp__error-msg", "div");
        errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : "";
        errorMsgEl = /** @type {HTMLDivElement} */
        this.instance.applyFilters("contentErrorElement", errorMsgEl, this);
        this.element = createElement2("pswp__content pswp__error-msg-container", "div");
        this.element.appendChild(errorMsgEl);
        this.slide.container.innerText = "";
        this.slide.container.appendChild(this.element);
        this.slide.updateContentSize(true);
        this.removePlaceholder();
      }
    }
    /**
     * Append the content
     */
    append() {
      if (this.isAttached || !this.element) {
        return;
      }
      this.isAttached = true;
      if (this.state === LOAD_STATE2.ERROR) {
        this.displayError();
        return;
      }
      if (this.instance.dispatch("contentAppend", {
        content: this
      }).defaultPrevented) {
        return;
      }
      const supportsDecode = "decode" in this.element;
      if (this.isImageContent()) {
        if (supportsDecode && this.slide && (!this.slide.isActive || isSafari2())) {
          this.isDecoding = true;
          this.element.decode().catch(() => {
          }).finally(() => {
            this.isDecoding = false;
            this.appendImage();
          });
        } else {
          this.appendImage();
        }
      } else if (this.slide && !this.element.parentNode) {
        this.slide.container.appendChild(this.element);
      }
    }
    /**
     * Activate the slide,
     * active slide is generally the current one,
     * meaning the user can see it.
     */
    activate() {
      if (this.instance.dispatch("contentActivate", {
        content: this
      }).defaultPrevented || !this.slide) {
        return;
      }
      if (this.isImageContent() && this.isDecoding && !isSafari2()) {
        this.appendImage();
      } else if (this.isError()) {
        this.load(false, true);
      }
      if (this.slide.holderElement) {
        this.slide.holderElement.setAttribute("aria-hidden", "false");
      }
    }
    /**
     * Deactivate the content
     */
    deactivate() {
      this.instance.dispatch("contentDeactivate", {
        content: this
      });
      if (this.slide && this.slide.holderElement) {
        this.slide.holderElement.setAttribute("aria-hidden", "true");
      }
    }
    /**
     * Remove the content from DOM
     */
    remove() {
      this.isAttached = false;
      if (this.instance.dispatch("contentRemove", {
        content: this
      }).defaultPrevented) {
        return;
      }
      if (this.element && this.element.parentNode) {
        this.element.remove();
      }
      if (this.placeholder && this.placeholder.element) {
        this.placeholder.element.remove();
      }
    }
    /**
     * Append the image content to slide container
     */
    appendImage() {
      if (!this.isAttached) {
        return;
      }
      if (this.instance.dispatch("contentAppendImage", {
        content: this
      }).defaultPrevented) {
        return;
      }
      if (this.slide && this.element && !this.element.parentNode) {
        this.slide.container.appendChild(this.element);
      }
      if (this.state === LOAD_STATE2.LOADED || this.state === LOAD_STATE2.ERROR) {
        this.removePlaceholder();
      }
    }
  };
  var MIN_SLIDES_TO_CACHE = 5;
  function lazyLoadData2(itemData, instance, index) {
    const content = instance.createContentFromData(itemData, index);
    let zoomLevel;
    const {
      options
    } = instance;
    if (options) {
      zoomLevel = new ZoomLevel2(options, itemData, -1);
      let viewportSize;
      if (instance.pswp) {
        viewportSize = instance.pswp.viewportSize;
      } else {
        viewportSize = getViewportSize2(options, instance);
      }
      const panAreaSize = getPanAreaSize2(options, viewportSize, itemData, index);
      zoomLevel.update(content.width, content.height, panAreaSize);
    }
    content.lazyLoad();
    if (zoomLevel) {
      content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
    }
    return content;
  }
  function lazyLoadSlide2(index, instance) {
    const itemData = instance.getItemData(index);
    if (instance.dispatch("lazyLoadSlide", {
      index,
      itemData
    }).defaultPrevented) {
      return;
    }
    return lazyLoadData2(itemData, instance, index);
  }
  var ContentLoader = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this.limit = Math.max(pswp.options.preload[0] + pswp.options.preload[1] + 1, MIN_SLIDES_TO_CACHE);
      this._cachedItems = [];
    }
    /**
     * Lazy load nearby slides based on `preload` option.
     *
     * @param {number} [diff] Difference between slide indexes that was changed recently, or 0.
     */
    updateLazy(diff) {
      const {
        pswp
      } = this;
      if (pswp.dispatch("lazyLoad").defaultPrevented) {
        return;
      }
      const {
        preload
      } = pswp.options;
      const isForward = diff === void 0 ? true : diff >= 0;
      let i2;
      for (i2 = 0; i2 <= preload[1]; i2++) {
        this.loadSlideByIndex(pswp.currIndex + (isForward ? i2 : -i2));
      }
      for (i2 = 1; i2 <= preload[0]; i2++) {
        this.loadSlideByIndex(pswp.currIndex + (isForward ? -i2 : i2));
      }
    }
    /**
     * @param {number} initialIndex
     */
    loadSlideByIndex(initialIndex) {
      const index = this.pswp.getLoopedIndex(initialIndex);
      let content = this.getContentByIndex(index);
      if (!content) {
        content = lazyLoadSlide2(index, this.pswp);
        if (content) {
          this.addToCache(content);
        }
      }
    }
    /**
     * @param {Slide} slide
     * @returns {Content}
     */
    getContentBySlide(slide) {
      let content = this.getContentByIndex(slide.index);
      if (!content) {
        content = this.pswp.createContentFromData(slide.data, slide.index);
        this.addToCache(content);
      }
      content.setSlide(slide);
      return content;
    }
    /**
     * @param {Content} content
     */
    addToCache(content) {
      this.removeByIndex(content.index);
      this._cachedItems.push(content);
      if (this._cachedItems.length > this.limit) {
        const indexToRemove = this._cachedItems.findIndex((item) => {
          return !item.isAttached && !item.hasSlide;
        });
        if (indexToRemove !== -1) {
          const removedItem = this._cachedItems.splice(indexToRemove, 1)[0];
          removedItem.destroy();
        }
      }
    }
    /**
     * Removes an image from cache, does not destroy() it, just removes.
     *
     * @param {number} index
     */
    removeByIndex(index) {
      const indexToRemove = this._cachedItems.findIndex((item) => item.index === index);
      if (indexToRemove !== -1) {
        this._cachedItems.splice(indexToRemove, 1);
      }
    }
    /**
     * @param {number} index
     * @returns {Content | undefined}
     */
    getContentByIndex(index) {
      return this._cachedItems.find((content) => content.index === index);
    }
    destroy() {
      this._cachedItems.forEach((content) => content.destroy());
      this._cachedItems = [];
    }
  };
  var PhotoSwipeBase2 = class extends Eventable2 {
    /**
     * Get total number of slides
     *
     * @returns {number}
     */
    getNumItems() {
      var _this$options;
      let numItems = 0;
      const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;
      if (dataSource && "length" in dataSource) {
        numItems = dataSource.length;
      } else if (dataSource && "gallery" in dataSource) {
        if (!dataSource.items) {
          dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
        }
        if (dataSource.items) {
          numItems = dataSource.items.length;
        }
      }
      const event = this.dispatch("numItems", {
        dataSource,
        numItems
      });
      return this.applyFilters("numItems", event.numItems, dataSource);
    }
    /**
     * @param {SlideData} slideData
     * @param {number} index
     * @returns {Content}
     */
    createContentFromData(slideData, index) {
      return new Content2(slideData, this, index);
    }
    /**
     * Get item data by index.
     *
     * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
     * For example, it may contain properties like
     * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
     *
     * @param {number} index
     * @returns {SlideData}
     */
    getItemData(index) {
      var _this$options2;
      const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
      let dataSourceItem = {};
      if (Array.isArray(dataSource)) {
        dataSourceItem = dataSource[index];
      } else if (dataSource && "gallery" in dataSource) {
        if (!dataSource.items) {
          dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
        }
        dataSourceItem = dataSource.items[index];
      }
      let itemData = dataSourceItem;
      if (itemData instanceof Element) {
        itemData = this._domElementToItemData(itemData);
      }
      const event = this.dispatch("itemData", {
        itemData: itemData || {},
        index
      });
      return this.applyFilters("itemData", event.itemData, index);
    }
    /**
     * Get array of gallery DOM elements,
     * based on childSelector and gallery element.
     *
     * @param {HTMLElement} galleryElement
     * @returns {HTMLElement[]}
     */
    _getGalleryDOMElements(galleryElement) {
      var _this$options3, _this$options4;
      if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
        return getElementsFromOption2(this.options.children, this.options.childSelector, galleryElement) || [];
      }
      return [galleryElement];
    }
    /**
     * Converts DOM element to item data object.
     *
     * @param {HTMLElement} element DOM element
     * @returns {SlideData}
     */
    _domElementToItemData(element) {
      const itemData = {
        element
      };
      const linkEl = (
        /** @type {HTMLAnchorElement} */
        element.tagName === "A" ? element : element.querySelector("a")
      );
      if (linkEl) {
        itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
        if (linkEl.dataset.pswpSrcset) {
          itemData.srcset = linkEl.dataset.pswpSrcset;
        }
        itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
        itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
        itemData.w = itemData.width;
        itemData.h = itemData.height;
        if (linkEl.dataset.pswpType) {
          itemData.type = linkEl.dataset.pswpType;
        }
        const thumbnailEl = element.querySelector("img");
        if (thumbnailEl) {
          var _thumbnailEl$getAttri;
          itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
          itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute("alt")) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : "";
        }
        if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
          itemData.thumbCropped = true;
        }
      }
      return this.applyFilters("domItemData", itemData, element, linkEl);
    }
    /**
     * Lazy-load by slide data
     *
     * @param {SlideData} itemData Data about the slide
     * @param {number} index
     * @returns {Content} Image that is being decoded or false.
     */
    lazyLoadData(itemData, index) {
      return lazyLoadData2(itemData, this, index);
    }
  };
  var MIN_OPACITY = 3e-3;
  var Opener = class {
    /**
     * @param {PhotoSwipe} pswp
     */
    constructor(pswp) {
      this.pswp = pswp;
      this.isClosed = true;
      this.isOpen = false;
      this.isClosing = false;
      this.isOpening = false;
      this._duration = void 0;
      this._useAnimation = false;
      this._croppedZoom = false;
      this._animateRootOpacity = false;
      this._animateBgOpacity = false;
      this._placeholder = void 0;
      this._opacityElement = void 0;
      this._cropContainer1 = void 0;
      this._cropContainer2 = void 0;
      this._thumbBounds = void 0;
      this._prepareOpen = this._prepareOpen.bind(this);
      pswp.on("firstZoomPan", this._prepareOpen);
    }
    open() {
      this._prepareOpen();
      this._start();
    }
    close() {
      if (this.isClosed || this.isClosing || this.isOpening) {
        return;
      }
      const slide = this.pswp.currSlide;
      this.isOpen = false;
      this.isOpening = false;
      this.isClosing = true;
      this._duration = this.pswp.options.hideAnimationDuration;
      if (slide && slide.currZoomLevel * slide.width >= this.pswp.options.maxWidthToAnimate) {
        this._duration = 0;
      }
      this._applyStartProps();
      setTimeout(() => {
        this._start();
      }, this._croppedZoom ? 30 : 0);
    }
    /** @private */
    _prepareOpen() {
      this.pswp.off("firstZoomPan", this._prepareOpen);
      if (!this.isOpening) {
        const slide = this.pswp.currSlide;
        this.isOpening = true;
        this.isClosing = false;
        this._duration = this.pswp.options.showAnimationDuration;
        if (slide && slide.zoomLevels.initial * slide.width >= this.pswp.options.maxWidthToAnimate) {
          this._duration = 0;
        }
        this._applyStartProps();
      }
    }
    /** @private */
    _applyStartProps() {
      const {
        pswp
      } = this;
      const slide = this.pswp.currSlide;
      const {
        options
      } = pswp;
      if (options.showHideAnimationType === "fade") {
        options.showHideOpacity = true;
        this._thumbBounds = void 0;
      } else if (options.showHideAnimationType === "none") {
        options.showHideOpacity = false;
        this._duration = 0;
        this._thumbBounds = void 0;
      } else if (this.isOpening && pswp._initialThumbBounds) {
        this._thumbBounds = pswp._initialThumbBounds;
      } else {
        this._thumbBounds = this.pswp.getThumbBounds();
      }
      this._placeholder = slide === null || slide === void 0 ? void 0 : slide.getPlaceholderElement();
      pswp.animations.stopAll();
      this._useAnimation = Boolean(this._duration && this._duration > 50);
      this._animateZoom = Boolean(this._thumbBounds) && (slide === null || slide === void 0 ? void 0 : slide.content.usePlaceholder()) && (!this.isClosing || !pswp.mainScroll.isShifted());
      if (!this._animateZoom) {
        this._animateRootOpacity = true;
        if (this.isOpening && slide) {
          slide.zoomAndPanToInitial();
          slide.applyCurrentZoomPan();
        }
      } else {
        var _options$showHideOpac;
        this._animateRootOpacity = (_options$showHideOpac = options.showHideOpacity) !== null && _options$showHideOpac !== void 0 ? _options$showHideOpac : false;
      }
      this._animateBgOpacity = !this._animateRootOpacity && this.pswp.options.bgOpacity > MIN_OPACITY;
      this._opacityElement = this._animateRootOpacity ? pswp.element : pswp.bg;
      if (!this._useAnimation) {
        this._duration = 0;
        this._animateZoom = false;
        this._animateBgOpacity = false;
        this._animateRootOpacity = true;
        if (this.isOpening) {
          if (pswp.element) {
            pswp.element.style.opacity = String(MIN_OPACITY);
          }
          pswp.applyBgOpacity(1);
        }
        return;
      }
      if (this._animateZoom && this._thumbBounds && this._thumbBounds.innerRect) {
        var _this$pswp$currSlide;
        this._croppedZoom = true;
        this._cropContainer1 = this.pswp.container;
        this._cropContainer2 = (_this$pswp$currSlide = this.pswp.currSlide) === null || _this$pswp$currSlide === void 0 ? void 0 : _this$pswp$currSlide.holderElement;
        if (pswp.container) {
          pswp.container.style.overflow = "hidden";
          pswp.container.style.width = pswp.viewportSize.x + "px";
        }
      } else {
        this._croppedZoom = false;
      }
      if (this.isOpening) {
        if (this._animateRootOpacity) {
          if (pswp.element) {
            pswp.element.style.opacity = String(MIN_OPACITY);
          }
          pswp.applyBgOpacity(1);
        } else {
          if (this._animateBgOpacity && pswp.bg) {
            pswp.bg.style.opacity = String(MIN_OPACITY);
          }
          if (pswp.element) {
            pswp.element.style.opacity = "1";
          }
        }
        if (this._animateZoom) {
          this._setClosedStateZoomPan();
          if (this._placeholder) {
            this._placeholder.style.willChange = "transform";
            this._placeholder.style.opacity = String(MIN_OPACITY);
          }
        }
      } else if (this.isClosing) {
        if (pswp.mainScroll.itemHolders[0]) {
          pswp.mainScroll.itemHolders[0].el.style.display = "none";
        }
        if (pswp.mainScroll.itemHolders[2]) {
          pswp.mainScroll.itemHolders[2].el.style.display = "none";
        }
        if (this._croppedZoom) {
          if (pswp.mainScroll.x !== 0) {
            pswp.mainScroll.resetPosition();
            pswp.mainScroll.resize();
          }
        }
      }
    }
    /** @private */
    _start() {
      if (this.isOpening && this._useAnimation && this._placeholder && this._placeholder.tagName === "IMG") {
        new Promise((resolve) => {
          let decoded = false;
          let isDelaying = true;
          decodeImage(
            /** @type {HTMLImageElement} */
            this._placeholder
          ).finally(() => {
            decoded = true;
            if (!isDelaying) {
              resolve(true);
            }
          });
          setTimeout(() => {
            isDelaying = false;
            if (decoded) {
              resolve(true);
            }
          }, 50);
          setTimeout(resolve, 250);
        }).finally(() => this._initiate());
      } else {
        this._initiate();
      }
    }
    /** @private */
    _initiate() {
      var _this$pswp$element, _this$pswp$element2;
      (_this$pswp$element = this.pswp.element) === null || _this$pswp$element === void 0 || _this$pswp$element.style.setProperty("--pswp-transition-duration", this._duration + "ms");
      this.pswp.dispatch(this.isOpening ? "openingAnimationStart" : "closingAnimationStart");
      this.pswp.dispatch(
        /** @type {'initialZoomIn' | 'initialZoomOut'} */
        "initialZoom" + (this.isOpening ? "In" : "Out")
      );
      (_this$pswp$element2 = this.pswp.element) === null || _this$pswp$element2 === void 0 || _this$pswp$element2.classList.toggle("pswp--ui-visible", this.isOpening);
      if (this.isOpening) {
        if (this._placeholder) {
          this._placeholder.style.opacity = "1";
        }
        this._animateToOpenState();
      } else if (this.isClosing) {
        this._animateToClosedState();
      }
      if (!this._useAnimation) {
        this._onAnimationComplete();
      }
    }
    /** @private */
    _onAnimationComplete() {
      const {
        pswp
      } = this;
      this.isOpen = this.isOpening;
      this.isClosed = this.isClosing;
      this.isOpening = false;
      this.isClosing = false;
      pswp.dispatch(this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd");
      pswp.dispatch(
        /** @type {'initialZoomInEnd' | 'initialZoomOutEnd'} */
        "initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")
      );
      if (this.isClosed) {
        pswp.destroy();
      } else if (this.isOpen) {
        var _pswp$currSlide;
        if (this._animateZoom && pswp.container) {
          pswp.container.style.overflow = "visible";
          pswp.container.style.width = "100%";
        }
        (_pswp$currSlide = pswp.currSlide) === null || _pswp$currSlide === void 0 || _pswp$currSlide.applyCurrentZoomPan();
      }
    }
    /** @private */
    _animateToOpenState() {
      const {
        pswp
      } = this;
      if (this._animateZoom) {
        if (this._croppedZoom && this._cropContainer1 && this._cropContainer2) {
          this._animateTo(this._cropContainer1, "transform", "translate3d(0,0,0)");
          this._animateTo(this._cropContainer2, "transform", "none");
        }
        if (pswp.currSlide) {
          pswp.currSlide.zoomAndPanToInitial();
          this._animateTo(pswp.currSlide.container, "transform", pswp.currSlide.getCurrentTransform());
        }
      }
      if (this._animateBgOpacity && pswp.bg) {
        this._animateTo(pswp.bg, "opacity", String(pswp.options.bgOpacity));
      }
      if (this._animateRootOpacity && pswp.element) {
        this._animateTo(pswp.element, "opacity", "1");
      }
    }
    /** @private */
    _animateToClosedState() {
      const {
        pswp
      } = this;
      if (this._animateZoom) {
        this._setClosedStateZoomPan(true);
      }
      if (this._animateBgOpacity && pswp.bgOpacity > 0.01 && pswp.bg) {
        this._animateTo(pswp.bg, "opacity", "0");
      }
      if (this._animateRootOpacity && pswp.element) {
        this._animateTo(pswp.element, "opacity", "0");
      }
    }
    /**
     * @private
     * @param {boolean} [animate]
     */
    _setClosedStateZoomPan(animate) {
      if (!this._thumbBounds) return;
      const {
        pswp
      } = this;
      const {
        innerRect
      } = this._thumbBounds;
      const {
        currSlide,
        viewportSize
      } = pswp;
      if (this._croppedZoom && innerRect && this._cropContainer1 && this._cropContainer2) {
        const containerOnePanX = -viewportSize.x + (this._thumbBounds.x - innerRect.x) + innerRect.w;
        const containerOnePanY = -viewportSize.y + (this._thumbBounds.y - innerRect.y) + innerRect.h;
        const containerTwoPanX = viewportSize.x - innerRect.w;
        const containerTwoPanY = viewportSize.y - innerRect.h;
        if (animate) {
          this._animateTo(this._cropContainer1, "transform", toTransformString2(containerOnePanX, containerOnePanY));
          this._animateTo(this._cropContainer2, "transform", toTransformString2(containerTwoPanX, containerTwoPanY));
        } else {
          setTransform(this._cropContainer1, containerOnePanX, containerOnePanY);
          setTransform(this._cropContainer2, containerTwoPanX, containerTwoPanY);
        }
      }
      if (currSlide) {
        equalizePoints(currSlide.pan, innerRect || this._thumbBounds);
        currSlide.currZoomLevel = this._thumbBounds.w / currSlide.width;
        if (animate) {
          this._animateTo(currSlide.container, "transform", currSlide.getCurrentTransform());
        } else {
          currSlide.applyCurrentZoomPan();
        }
      }
    }
    /**
     * @private
     * @param {HTMLElement} target
     * @param {'transform' | 'opacity'} prop
     * @param {string} propValue
     */
    _animateTo(target, prop, propValue) {
      if (!this._duration) {
        target.style[prop] = propValue;
        return;
      }
      const {
        animations
      } = this.pswp;
      const animProps = {
        duration: this._duration,
        easing: this.pswp.options.easing,
        onComplete: () => {
          if (!animations.activeAnimations.length) {
            this._onAnimationComplete();
          }
        },
        target
      };
      animProps[prop] = propValue;
      animations.startTransition(animProps);
    }
  };
  var defaultOptions = {
    allowPanToNext: true,
    spacing: 0.1,
    loop: true,
    pinchToClose: true,
    closeOnVerticalDrag: true,
    hideAnimationDuration: 333,
    showAnimationDuration: 333,
    zoomAnimationDuration: 333,
    escKey: true,
    arrowKeys: true,
    trapFocus: true,
    returnFocus: true,
    maxWidthToAnimate: 4e3,
    clickToCloseNonZoomable: true,
    imageClickAction: "zoom-or-close",
    bgClickAction: "close",
    tapAction: "toggle-controls",
    doubleTapAction: "zoom",
    indexIndicatorSep: " / ",
    preloaderDelay: 2e3,
    bgOpacity: 0.8,
    index: 0,
    errorMsg: "The image cannot be loaded",
    preload: [1, 2],
    easing: "cubic-bezier(.4,0,.22,1)"
  };
  var PhotoSwipe = class extends PhotoSwipeBase2 {
    /**
     * @param {PhotoSwipeOptions} [options]
     */
    constructor(options) {
      super();
      this.options = this._prepareOptions(options || {});
      this.offset = {
        x: 0,
        y: 0
      };
      this._prevViewportSize = {
        x: 0,
        y: 0
      };
      this.viewportSize = {
        x: 0,
        y: 0
      };
      this.bgOpacity = 1;
      this.currIndex = 0;
      this.potentialIndex = 0;
      this.isOpen = false;
      this.isDestroying = false;
      this.hasMouse = false;
      this._initialItemData = {};
      this._initialThumbBounds = void 0;
      this.topBar = void 0;
      this.element = void 0;
      this.template = void 0;
      this.container = void 0;
      this.scrollWrap = void 0;
      this.currSlide = void 0;
      this.events = new DOMEvents();
      this.animations = new Animations();
      this.mainScroll = new MainScroll(this);
      this.gestures = new Gestures(this);
      this.opener = new Opener(this);
      this.keyboard = new Keyboard(this);
      this.contentLoader = new ContentLoader(this);
    }
    /** @returns {boolean} */
    init() {
      if (this.isOpen || this.isDestroying) {
        return false;
      }
      this.isOpen = true;
      this.dispatch("init");
      this.dispatch("beforeOpen");
      this._createMainStructure();
      let rootClasses = "pswp--open";
      if (this.gestures.supportsTouch) {
        rootClasses += " pswp--touch";
      }
      if (this.options.mainClass) {
        rootClasses += " " + this.options.mainClass;
      }
      if (this.element) {
        this.element.className += " " + rootClasses;
      }
      this.currIndex = this.options.index || 0;
      this.potentialIndex = this.currIndex;
      this.dispatch("firstUpdate");
      this.scrollWheel = new ScrollWheel(this);
      if (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) {
        this.currIndex = 0;
      }
      if (!this.gestures.supportsTouch) {
        this.mouseDetected();
      }
      this.updateSize();
      this.offset.y = window.pageYOffset;
      this._initialItemData = this.getItemData(this.currIndex);
      this.dispatch("gettingData", {
        index: this.currIndex,
        data: this._initialItemData,
        slide: void 0
      });
      this._initialThumbBounds = this.getThumbBounds();
      this.dispatch("initialLayout");
      this.on("openingAnimationEnd", () => {
        const {
          itemHolders
        } = this.mainScroll;
        if (itemHolders[0]) {
          itemHolders[0].el.style.display = "block";
          this.setContent(itemHolders[0], this.currIndex - 1);
        }
        if (itemHolders[2]) {
          itemHolders[2].el.style.display = "block";
          this.setContent(itemHolders[2], this.currIndex + 1);
        }
        this.appendHeavy();
        this.contentLoader.updateLazy();
        this.events.add(window, "resize", this._handlePageResize.bind(this));
        this.events.add(window, "scroll", this._updatePageScrollOffset.bind(this));
        this.dispatch("bindEvents");
      });
      if (this.mainScroll.itemHolders[1]) {
        this.setContent(this.mainScroll.itemHolders[1], this.currIndex);
      }
      this.dispatch("change");
      this.opener.open();
      this.dispatch("afterInit");
      return true;
    }
    /**
     * Get looped slide index
     * (for example, -1 will return the last slide)
     *
     * @param {number} index
     * @returns {number}
     */
    getLoopedIndex(index) {
      const numSlides = this.getNumItems();
      if (this.options.loop) {
        if (index > numSlides - 1) {
          index -= numSlides;
        }
        if (index < 0) {
          index += numSlides;
        }
      }
      return clamp(index, 0, numSlides - 1);
    }
    appendHeavy() {
      this.mainScroll.itemHolders.forEach((itemHolder) => {
        var _itemHolder$slide;
        (_itemHolder$slide = itemHolder.slide) === null || _itemHolder$slide === void 0 || _itemHolder$slide.appendHeavy();
      });
    }
    /**
     * Change the slide
     * @param {number} index New index
     */
    goTo(index) {
      this.mainScroll.moveIndexBy(this.getLoopedIndex(index) - this.potentialIndex);
    }
    /**
     * Go to the next slide.
     */
    next() {
      this.goTo(this.potentialIndex + 1);
    }
    /**
     * Go to the previous slide.
     */
    prev() {
      this.goTo(this.potentialIndex - 1);
    }
    /**
     * @see slide/slide.js zoomTo
     *
     * @param {Parameters<Slide['zoomTo']>} args
     */
    zoomTo(...args) {
      var _this$currSlide;
      (_this$currSlide = this.currSlide) === null || _this$currSlide === void 0 || _this$currSlide.zoomTo(...args);
    }
    /**
     * @see slide/slide.js toggleZoom
     */
    toggleZoom() {
      var _this$currSlide2;
      (_this$currSlide2 = this.currSlide) === null || _this$currSlide2 === void 0 || _this$currSlide2.toggleZoom();
    }
    /**
     * Close the gallery.
     * After closing transition ends - destroy it
     */
    close() {
      if (!this.opener.isOpen || this.isDestroying) {
        return;
      }
      this.isDestroying = true;
      this.dispatch("close");
      this.events.removeAll();
      this.opener.close();
    }
    /**
     * Destroys the gallery:
     * - instantly closes the gallery
     * - unbinds events,
     * - cleans intervals and timeouts
     * - removes elements from DOM
     */
    destroy() {
      var _this$element;
      if (!this.isDestroying) {
        this.options.showHideAnimationType = "none";
        this.close();
        return;
      }
      this.dispatch("destroy");
      this._listeners = {};
      if (this.scrollWrap) {
        this.scrollWrap.ontouchmove = null;
        this.scrollWrap.ontouchend = null;
      }
      (_this$element = this.element) === null || _this$element === void 0 || _this$element.remove();
      this.mainScroll.itemHolders.forEach((itemHolder) => {
        var _itemHolder$slide2;
        (_itemHolder$slide2 = itemHolder.slide) === null || _itemHolder$slide2 === void 0 || _itemHolder$slide2.destroy();
      });
      this.contentLoader.destroy();
      this.events.removeAll();
    }
    /**
     * Refresh/reload content of a slide by its index
     *
     * @param {number} slideIndex
     */
    refreshSlideContent(slideIndex) {
      this.contentLoader.removeByIndex(slideIndex);
      this.mainScroll.itemHolders.forEach((itemHolder, i2) => {
        var _this$currSlide$index, _this$currSlide3;
        let potentialHolderIndex = ((_this$currSlide$index = (_this$currSlide3 = this.currSlide) === null || _this$currSlide3 === void 0 ? void 0 : _this$currSlide3.index) !== null && _this$currSlide$index !== void 0 ? _this$currSlide$index : 0) - 1 + i2;
        if (this.canLoop()) {
          potentialHolderIndex = this.getLoopedIndex(potentialHolderIndex);
        }
        if (potentialHolderIndex === slideIndex) {
          this.setContent(itemHolder, slideIndex, true);
          if (i2 === 1) {
            var _itemHolder$slide3;
            this.currSlide = itemHolder.slide;
            (_itemHolder$slide3 = itemHolder.slide) === null || _itemHolder$slide3 === void 0 || _itemHolder$slide3.setIsActive(true);
          }
        }
      });
      this.dispatch("change");
    }
    /**
     * Set slide content
     *
     * @param {ItemHolder} holder mainScroll.itemHolders array item
     * @param {number} index Slide index
     * @param {boolean} [force] If content should be set even if index wasn't changed
     */
    setContent(holder, index, force) {
      if (this.canLoop()) {
        index = this.getLoopedIndex(index);
      }
      if (holder.slide) {
        if (holder.slide.index === index && !force) {
          return;
        }
        holder.slide.destroy();
        holder.slide = void 0;
      }
      if (!this.canLoop() && (index < 0 || index >= this.getNumItems())) {
        return;
      }
      const itemData = this.getItemData(index);
      holder.slide = new Slide(itemData, index, this);
      if (index === this.currIndex) {
        this.currSlide = holder.slide;
      }
      holder.slide.append(holder.el);
    }
    /** @returns {Point} */
    getViewportCenterPoint() {
      return {
        x: this.viewportSize.x / 2,
        y: this.viewportSize.y / 2
      };
    }
    /**
     * Update size of all elements.
     * Executed on init and on page resize.
     *
     * @param {boolean} [force] Update size even if size of viewport was not changed.
     */
    updateSize(force) {
      if (this.isDestroying) {
        return;
      }
      const newViewportSize = getViewportSize2(this.options, this);
      if (!force && pointsEqual(newViewportSize, this._prevViewportSize)) {
        return;
      }
      equalizePoints(this._prevViewportSize, newViewportSize);
      this.dispatch("beforeResize");
      equalizePoints(this.viewportSize, this._prevViewportSize);
      this._updatePageScrollOffset();
      this.dispatch("viewportSize");
      this.mainScroll.resize(this.opener.isOpen);
      if (!this.hasMouse && window.matchMedia("(any-hover: hover)").matches) {
        this.mouseDetected();
      }
      this.dispatch("resize");
    }
    /**
     * @param {number} opacity
     */
    applyBgOpacity(opacity) {
      this.bgOpacity = Math.max(opacity, 0);
      if (this.bg) {
        this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity);
      }
    }
    /**
     * Whether mouse is detected
     */
    mouseDetected() {
      if (!this.hasMouse) {
        var _this$element2;
        this.hasMouse = true;
        (_this$element2 = this.element) === null || _this$element2 === void 0 || _this$element2.classList.add("pswp--has_mouse");
      }
    }
    /**
     * Page resize event handler
     *
     * @private
     */
    _handlePageResize() {
      this.updateSize();
      if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
        setTimeout(() => {
          this.updateSize();
        }, 500);
      }
    }
    /**
     * Page scroll offset is used
     * to get correct coordinates
     * relative to PhotoSwipe viewport.
     *
     * @private
     */
    _updatePageScrollOffset() {
      this.setScrollOffset(0, window.pageYOffset);
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    setScrollOffset(x, y) {
      this.offset.x = x;
      this.offset.y = y;
      this.dispatch("updateScrollOffset");
    }
    /**
     * Create main HTML structure of PhotoSwipe,
     * and add it to DOM
     *
     * @private
     */
    _createMainStructure() {
      this.element = createElement2("pswp", "div");
      this.element.setAttribute("tabindex", "-1");
      this.element.setAttribute("role", "dialog");
      this.template = this.element;
      this.bg = createElement2("pswp__bg", "div", this.element);
      this.scrollWrap = createElement2("pswp__scroll-wrap", "section", this.element);
      this.container = createElement2("pswp__container", "div", this.scrollWrap);
      this.scrollWrap.setAttribute("aria-roledescription", "carousel");
      this.container.setAttribute("aria-live", "off");
      this.container.setAttribute("id", "pswp__items");
      this.mainScroll.appendHolders();
      this.ui = new UI(this);
      this.ui.init();
      (this.options.appendToEl || document.body).appendChild(this.element);
    }
    /**
     * Get position and dimensions of small thumbnail
     *   {x:,y:,w:}
     *
     * Height is optional (calculated based on the large image)
     *
     * @returns {Bounds | undefined}
     */
    getThumbBounds() {
      return getThumbBounds(this.currIndex, this.currSlide ? this.currSlide.data : this._initialItemData, this);
    }
    /**
     * If the PhotoSwipe can have continuous loop
     * @returns Boolean
     */
    canLoop() {
      return this.options.loop && this.getNumItems() > 2;
    }
    /**
     * @private
     * @param {PhotoSwipeOptions} options
     * @returns {PreparedPhotoSwipeOptions}
     */
    _prepareOptions(options) {
      if (window.matchMedia("(prefers-reduced-motion), (update: slow)").matches) {
        options.showHideAnimationType = "none";
        options.zoomAnimationDuration = 0;
      }
      return {
        ...defaultOptions,
        ...options
      };
    }
  };

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js
  var t = { captionContent: ".pswp-caption-content", type: "auto", horizontalEdgeThreshold: 20, mobileCaptionOverlapRatio: 0.3, mobileLayoutBreakpoint: 600, verticallyCenterImage: false };
  var i = class {
    constructor(i2, e) {
      this.options = { ...t, ...e }, this.lightbox = i2, this.lightbox.on("init", () => {
        this.pswp = this.lightbox.pswp, this.initCaption();
      });
    }
    initCaption() {
      const { pswp: t2 } = this;
      t2.on("change", () => {
        this.showCaption(this.pswp.currSlide);
      }), t2.on("calcSlideSize", (t3) => this.onCalcSlideSize(t3)), t2.on("slideDestroy", (t3) => {
        t3.slide.dynamicCaption && (t3.slide.dynamicCaption.element && t3.slide.dynamicCaption.element.remove(), delete t3.slide.dynamicCaption);
      }), t2.on("zoomPanUpdate", ({ slide: i2 }) => {
        if (t2.opener.isOpen && i2.dynamicCaption) {
          if (i2.currZoomLevel > i2.zoomLevels.initial ? this.hideCaption(i2) : this.showCaption(i2), i2.dynamicCaption.element) {
            let t3 = 0;
            if (i2.currZoomLevel <= i2.zoomLevels.initial) {
              const e = i2.pan.y - i2.bounds.center.y;
              Math.abs(e) > 1 && (t3 = e);
            }
            this.setCaptionYOffset(i2.dynamicCaption.element, t3);
          }
          this.adjustPanArea(i2, i2.currZoomLevel);
        }
      }), t2.on("beforeZoomTo", (i2) => {
        this.adjustPanArea(t2.currSlide, i2.destZoomLevel);
      }), t2.on("tapAction", (t3) => {
        t3.originalEvent.target.closest(".pswp__dynamic-caption") && t3.preventDefault();
      });
    }
    adjustPanArea(t2, i2) {
      t2.dynamicCaption && t2.dynamicCaption.adjustedPanAreaSize && (i2 > t2.zoomLevels.initial ? (t2.panAreaSize.x = t2.dynamicCaption.originalPanAreaSize.x, t2.panAreaSize.y = t2.dynamicCaption.originalPanAreaSize.y) : (t2.panAreaSize.x = t2.dynamicCaption.adjustedPanAreaSize.x, t2.panAreaSize.y = t2.dynamicCaption.adjustedPanAreaSize.y));
    }
    useMobileLayout() {
      const { mobileLayoutBreakpoint: t2 } = this.options;
      return "function" == typeof t2 ? t2.call(this) : "number" == typeof t2 && window.innerWidth < t2;
    }
    hideCaption(t2) {
      if (t2.dynamicCaption && !t2.dynamicCaption.hidden) {
        const i2 = t2.dynamicCaption.element;
        if (!i2) return;
        t2.dynamicCaption.hidden = true, i2.classList.add("pswp__dynamic-caption--faded"), t2.captionFadeTimeout && clearTimeout(t2.captionFadeTimeout), t2.captionFadeTimeout = setTimeout(() => {
          i2.style.visibility = "hidden", delete t2.captionFadeTimeout;
        }, 400);
      }
    }
    setCaptionYOffset(t2, i2) {
      t2.style.transform = `translateY(${i2}px)`;
    }
    showCaption(t2) {
      if (t2.dynamicCaption && t2.dynamicCaption.hidden) {
        const i2 = t2.dynamicCaption.element;
        if (!i2) return;
        t2.dynamicCaption.hidden = false, i2.style.visibility = "visible", clearTimeout(t2.captionFadeTimeout), t2.captionFadeTimeout = setTimeout(() => {
          i2.classList.remove("pswp__dynamic-caption--faded"), delete t2.captionFadeTimeout;
        }, 50);
      }
    }
    setCaptionPosition(t2, i2, e) {
      const s = i2 <= this.options.horizontalEdgeThreshold;
      t2.classList[s ? "add" : "remove"]("pswp__dynamic-caption--on-hor-edge"), t2.style.left = i2 + "px", t2.style.top = e + "px";
    }
    setCaptionWidth(t2, i2) {
      i2 ? t2.style.width = i2 + "px" : t2.style.removeProperty("width");
    }
    setCaptionType(t2, i2) {
      const e = t2.dataset.pswpCaptionType;
      i2 !== e && (t2.classList.add("pswp__dynamic-caption--" + i2), t2.classList.remove("pswp__dynamic-caption--" + e), t2.dataset.pswpCaptionType = i2);
    }
    updateCaptionPosition(t2) {
      if (!t2.dynamicCaption || !t2.dynamicCaption.type || !t2.dynamicCaption.element) return;
      if ("mobile" === t2.dynamicCaption.type) return this.setCaptionType(t2.dynamicCaption.element, t2.dynamicCaption.type), t2.dynamicCaption.element.style.removeProperty("left"), t2.dynamicCaption.element.style.removeProperty("top"), void this.setCaptionWidth(t2.dynamicCaption.element, false);
      const i2 = t2.zoomLevels.initial, e = Math.ceil(t2.width * i2), s = Math.ceil(t2.height * i2);
      this.setCaptionType(t2.dynamicCaption.element, t2.dynamicCaption.type), "aside" === t2.dynamicCaption.type ? (this.setCaptionPosition(t2.dynamicCaption.element, t2.bounds.center.x + e, t2.bounds.center.y), this.setCaptionWidth(t2.dynamicCaption.element, false)) : "below" === t2.dynamicCaption.type && (this.setCaptionPosition(t2.dynamicCaption.element, t2.bounds.center.x, t2.bounds.center.y + s), this.setCaptionWidth(t2.dynamicCaption.element, e));
    }
    onCalcSlideSize(t2) {
      const { slide: i2 } = t2;
      let e, s;
      if (!i2.dynamicCaption) {
        i2.dynamicCaption = { element: void 0, type: false, hidden: false };
        const t3 = this.getCaptionHTML(i2);
        if (!t3) return;
        i2.dynamicCaption.element = document.createElement("div"), i2.dynamicCaption.element.className = "pswp__dynamic-caption pswp__hide-on-close", i2.dynamicCaption.element.innerHTML = t3, this.pswp.dispatch("dynamicCaptionUpdateHTML", { captionElement: i2.dynamicCaption.element, slide: i2 }), i2.holderElement.appendChild(i2.dynamicCaption.element);
      }
      if (!i2.dynamicCaption.element) return;
      this.storeOriginalPanAreaSize(i2), i2.bounds.update(i2.zoomLevels.initial), this.useMobileLayout() ? (i2.dynamicCaption.type = "mobile", s = true) : "auto" === this.options.type ? i2.bounds.center.x > i2.bounds.center.y ? i2.dynamicCaption.type = "aside" : i2.dynamicCaption.type = "below" : i2.dynamicCaption.type = this.options.type;
      const o = Math.ceil(i2.width * i2.zoomLevels.initial), n = Math.ceil(i2.height * i2.zoomLevels.initial);
      if (this.setCaptionType(i2.dynamicCaption.element, i2.dynamicCaption.type), "aside" === i2.dynamicCaption.type) {
        this.setCaptionWidth(i2.dynamicCaption.element, false), e = this.measureCaptionSize(i2.dynamicCaption.element, t2.slide);
        const s2 = e.x, n2 = o + i2.bounds.center.x;
        i2.panAreaSize.x - n2 <= s2 && (i2.panAreaSize.x -= s2, this.recalculateZoomLevelAndBounds(i2));
      } else if ("below" === i2.dynamicCaption.type || s) {
        this.setCaptionWidth(i2.dynamicCaption.element, s ? this.pswp.viewportSize.x : o), e = this.measureCaptionSize(i2.dynamicCaption.element, t2.slide);
        const a = e.y;
        if (this.options.verticallyCenterImage) i2.panAreaSize.y -= a, this.recalculateZoomLevelAndBounds(i2);
        else {
          const t3 = n + i2.bounds.center.y, e2 = i2.panAreaSize.y - t3, o2 = i2.panAreaSize.y;
          if (e2 <= a) {
            i2.panAreaSize.y -= Math.min(2 * (a - e2), a), this.recalculateZoomLevelAndBounds(i2);
            const t4 = i2.panAreaSize.x * this.options.mobileCaptionOverlapRatio / 2;
            s && i2.bounds.center.x > t4 && (i2.panAreaSize.y = o2, this.recalculateZoomLevelAndBounds(i2));
          }
        }
      }
      this.storeAdjustedPanAreaSize(i2), this.updateCaptionPosition(i2);
    }
    measureCaptionSize(t2, i2) {
      const e = t2.getBoundingClientRect();
      return this.pswp.dispatch("dynamicCaptionMeasureSize", { captionEl: t2, slide: i2, captionSize: { x: e.width, y: e.height } }).captionSize;
    }
    recalculateZoomLevelAndBounds(t2) {
      t2.zoomLevels.update(t2.width, t2.height, t2.panAreaSize), t2.bounds.update(t2.zoomLevels.initial);
    }
    storeAdjustedPanAreaSize(t2) {
      t2.dynamicCaption && (t2.dynamicCaption.adjustedPanAreaSize || (t2.dynamicCaption.adjustedPanAreaSize = {}), t2.dynamicCaption.adjustedPanAreaSize.x = t2.panAreaSize.x, t2.dynamicCaption.adjustedPanAreaSize.y = t2.panAreaSize.y);
    }
    storeOriginalPanAreaSize(t2) {
      t2.dynamicCaption && (t2.dynamicCaption.originalPanAreaSize || (t2.dynamicCaption.originalPanAreaSize = {}), t2.dynamicCaption.originalPanAreaSize.x = t2.panAreaSize.x, t2.dynamicCaption.originalPanAreaSize.y = t2.panAreaSize.y);
    }
    getCaptionHTML(t2) {
      if ("function" == typeof this.options.captionContent) return this.options.captionContent.call(this, t2);
      const i2 = t2.data.element;
      let e = "";
      if (i2) {
        const t3 = i2.querySelector(this.options.captionContent);
        if (t3) e = t3.innerHTML;
        else {
          const t4 = i2.querySelector("img");
          t4 && (e = t4.getAttribute("alt"));
        }
      }
      return e;
    }
  };

  // ns-hugo-params:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/lightbox.js
  var arrowNextTitle = "Nast\u0119pny";
  var arrowPrevTitle = "Poprzedni";
  var closeTitle = "Zamknij";
  var downloadTitle = "Pobierz";
  var enableDownload = true;
  var errorMsg = "Zdj\u0119cie nie mog\u0142o zosta\u0107 za\u0142adowane";
  var zoomTitle = "Przybli\u017Cenie";

  // ns-hugo-imp:/home/karolina/Dokumenty/Portfolio-2025/themes/gallery/assets/js/lightbox.js
  var gallery2 = document.querySelectorAll(".gallery");
  gallery2.forEach((gallery3) => {
    if (gallery3) {
      const lightbox = new PhotoSwipeLightbox({
        gallery: gallery3,
        children: ".gallery-item",
        showHideAnimationType: "zoom",
        bgOpacity: 1,
        pswpModule: PhotoSwipe,
        imageClickAction: "close",
        secondaryZoomLevel: 2,
        wheelToZoom: true,
        closeTitle,
        zoomTitle,
        arrowPrevTitle,
        arrowNextTitle,
        errorMsg
      });
      if (enableDownload) {
        lightbox.on("uiRegister", () => {
          lightbox.pswp.ui.registerElement({
            name: "download-button",
            order: 8,
            isButton: true,
            tagName: "a",
            html: {
              isCustomSVG: true,
              inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
              outlineID: "pswp__icn-download"
            },
            onInit: (el2, pswp) => {
              el2.setAttribute("download", "");
              el2.setAttribute("target", "_blank");
              el2.setAttribute("rel", "noopener");
              el2.setAttribute("title", downloadTitle || "Download");
              pswp.on("change", () => {
                el2.href = pswp.currSlide.data.element.href;
              });
            }
          });
        });
      }
      lightbox.on("change", () => {
        const target = lightbox.pswp.currSlide?.data?.element?.dataset["pswpTarget"];
        history.replaceState("", document.title, "#" + target);
      });
      lightbox.on("close", () => {
        history.replaceState("", document.title, window.location.pathname);
      });
      new i(lightbox, {
        mobileLayoutBreakpoint: 700,
        type: "auto",
        mobileCaptionOverlapRatio: 1
      });
      lightbox.init();
      if (window.location.hash.substring(1).length > 1) {
        const target = window.location.hash.substring(1);
        const items = gallery3.querySelectorAll("a");
        for (let i2 = 0; i2 < items.length; i2++) {
          if (items[i2].dataset["pswpTarget"] === target) {
            lightbox.loadAndOpen(i2, { gallery: gallery3 });
            break;
          }
        }
      }
    }
  });
})();
/*!
 * Original work Copyright 2019 SmugMug, Inc.
 * Modified work Copyright 2025 Nico Kaiser
 * Licensed under the terms of the MIT license.
 */
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
/*!
  * PhotoSwipe 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
/*!
  * PhotoSwipe Dynamic Caption plugin 1.2.7 - https://photoswipe.com
  * (c) 2022 Dmytro Semenov
  */
