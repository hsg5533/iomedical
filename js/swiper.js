var Swiper = (function () {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s, i) {
    void 0 === s && (s = {}), void 0 === i && (i = {});
    let a = ["__proto__", "constructor", "prototype"];
    Object.keys(i)
      .filter((e) => 0 > a.indexOf(e))
      .forEach((a) => {
        void 0 === s[a]
          ? (s[a] = i[a])
          : e(i[a]) && e(s[a]) && Object.keys(i[a]).length > 0 && t(s[a], i[a]);
      });
  }
  let s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function i() {
    let e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  let a = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    let e = "undefined" != typeof window ? window : {};
    return t(e, a), e;
  }
  function l(e) {
    return (
      void 0 === e && (e = ""),
      e
        .trim()
        .split(" ")
        .filter((e) => !!e.trim())
    );
  }
  function n(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function o() {
    return Date.now();
  }
  function d(e, t) {
    void 0 === t && (t = "x");
    let s = r(),
      i,
      a,
      l,
      n = (function (e) {
        let t = r(),
          s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
    return (
      s.WebKitCSSMatrix
        ? ((a = n.transform || n.webkitTransform).split(",").length > 6 &&
            (a = a
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (l = new s.WebKitCSSMatrix("none" === a ? "" : a)))
        : (i = (l =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,"))
            .toString()
            .split(",")),
      "x" === t &&
        (a = s.WebKitCSSMatrix
          ? l.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (a = s.WebKitCSSMatrix
          ? l.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      a || 0
    );
  }
  function p(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function c() {
    var e;
    let t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      let a = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != a &&
        ((e = a),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? e instanceof HTMLElement
          : e && (1 === e.nodeType || 11 === e.nodeType)))
      ) {
        let r = Object.keys(Object(a)).filter((e) => 0 > s.indexOf(e));
        for (let l = 0, n = r.length; l < n; l += 1) {
          let o = r[l],
            d = Object.getOwnPropertyDescriptor(a, o);
          void 0 !== d &&
            d.enumerable &&
            (p(t[o]) && p(a[o])
              ? a[o].__swiper__
                ? (t[o] = a[o])
                : c(t[o], a[o])
              : !p(t[o]) && p(a[o])
              ? ((t[o] = {}), a[o].__swiper__ ? (t[o] = a[o]) : c(t[o], a[o]))
              : (t[o] = a[o]));
        }
      }
    }
    return t;
  }
  function u(e, t, s) {
    e.style.setProperty(t, s);
  }
  function m(e) {
    let { swiper: t, targetPosition: s, side: i } = e,
      a = r(),
      l = -t.translate,
      n,
      o = null,
      d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(t.cssModeFrameID);
    let p = s > l ? "next" : "prev",
      c = (e, t) => ("next" === p && e >= t) || ("prev" === p && e <= t),
      u = () => {
        (n = new Date().getTime()), null === o && (o = n);
        let e = Math.max(Math.min((n - o) / d, 1), 0),
          r = l + (0.5 - Math.cos(e * Math.PI) / 2) * (s - l);
        if ((c(r, s) && (r = s), t.wrapperEl.scrollTo({ [i]: r }), c(r, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: r });
            }),
            void a.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = a.requestAnimationFrame(u);
      };
    u();
  }
  function h(e) {
    return (
      e.querySelector(".swiper-slide-transform") ||
      (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
      e
    );
  }
  function f(e, t) {
    void 0 === t && (t = "");
    let s = r(),
      i = [...e.children];
    return (
      s.HTMLSlotElement &&
        e instanceof HTMLSlotElement &&
        i.push(...e.assignedElements()),
      t ? i.filter((e) => e.matches(t)) : i
    );
  }
  function g(e) {
    try {
      return void console.warn(e);
    } catch (t) {}
  }
  function v(e, t) {
    void 0 === t && (t = []);
    let s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : l(t))), s;
  }
  function $(e) {
    let t = r(),
      s = i(),
      a = e.getBoundingClientRect(),
      l = s.body,
      n = e.clientTop || l.clientTop || 0,
      o = e.clientLeft || l.clientLeft || 0,
      d = e === t ? t.scrollY : e.scrollTop,
      p = e === t ? t.scrollX : e.scrollLeft;
    return { top: a.top + d - n, left: a.left + p - o };
  }
  function w(e, t) {
    return r().getComputedStyle(e, null).getPropertyValue(t);
  }
  function y(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function b(e, t) {
    let s = [],
      i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function _(e, t) {
    t &&
      e.addEventListener("transitionend", function s(i) {
        i.target === e &&
          (t.call(e, i), e.removeEventListener("transitionend", s));
      });
  }
  function E(e, t, s) {
    let i = r();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top")
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
          )
      : e.offsetWidth;
  }
  function x(e) {
    return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
  }
  function S(e) {
    return (t) =>
      Math.abs(t) > 0 &&
      e.browser &&
      e.browser.need3dFix &&
      Math.abs(t) % 90 == 0
        ? t + 0.001
        : t;
  }
  let T, C, P;
  function L() {
    return (
      T ||
        (T = (function () {
          let e = r(),
            t = i();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      T
    );
  }
  function M(e) {
    return (
      void 0 === e && (e = {}),
      C ||
        (C = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e,
            s = L(),
            i = r(),
            a = i.navigator.platform,
            l = t || i.navigator.userAgent,
            n = { ios: !1, android: !1 },
            o = i.screen.width,
            d = i.screen.height,
            p = l.match(/(Android);?[\s\/]+([\d.]+)?/),
            c = l.match(/(iPad).*OS\s([\d_]+)/),
            u = l.match(/(iPod)(.*OS\s([\d_]+))?/),
            m = !c && l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "MacIntel" === a;
          return (
            !c &&
              h &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((c = l.match(/(Version)\/([\d.]+)/)) || (c = [0, 1, "13_0_0"]),
              (h = !1)),
            p && "Win32" !== a && ((n.os = "android"), (n.android = !0)),
            (c || m || u) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      C
    );
  }
  function z() {
    return (
      P ||
        (P = (function () {
          let e = r(),
            t = M(),
            s = !1;
          function i() {
            let t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              0 > t.indexOf("chrome") &&
              0 > t.indexOf("android")
            );
          }
          if (i()) {
            let a = String(e.navigator.userAgent);
            if (a.includes("Version/")) {
              let [l, n] = a
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              s = l < 16 || (16 === l && n < 2);
            }
          }
          let o = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
            d = i();
          return {
            isSafari: s || d,
            needPerspectiveFix: s,
            need3dFix: d || (o && t.ios),
            isWebView: o,
          };
        })()),
      P
    );
  }
  let k = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    },
    I = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    },
    A = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      let s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      );
      if (s) {
        let i = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !i &&
          e.isElement &&
          (s.shadowRoot
            ? (i = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  (i = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`
                  )) &&
                  i.remove();
              })),
          i && i.remove();
      }
    },
    D = (e, t) => {
      if (!e.slides[t]) return;
      let s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    O = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext,
        s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      let i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        a = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        let r = a,
          l = [r - t];
        return (
          l.push(...Array.from({ length: t }).map((e, t) => r + i + t)),
          void e.slides.forEach((t, s) => {
            l.includes(t.column) && D(e, s);
          })
        );
      }
      let n = a + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let o = a - t; o <= n + t; o += 1) {
          let d = ((o % s) + s) % s;
          (d < a || d > n) && D(e, d);
        }
      else
        for (let p = Math.max(a - t, 0); p <= Math.min(n + t, s - 1); p += 1)
          p !== a && (p > n || p < a) && D(e, p);
    };
  function G(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: a } = e,
      { activeIndex: r, previousIndex: l } = t,
      n = i;
    if (
      (n || (n = r > l ? "next" : r < l ? "prev" : "reset"),
      t.emit(`transition${a}`),
      s && r !== l)
    ) {
      if ("reset" === n) return void t.emit(`slideResetTransition${a}`);
      t.emit(`slideChangeTransition${a}`),
        "next" === n
          ? t.emit(`slideNextTransition${a}`)
          : t.emit(`slidePrevTransition${a}`);
    }
  }
  function X(e, t, s) {
    let i = r(),
      { params: a } = e,
      l = a.edgeSwipeDetection,
      n = a.edgeSwipeThreshold;
    return (
      !l ||
      !(s <= n || s >= i.innerWidth - n) ||
      ("prevent" === l && (t.preventDefault(), !0))
    );
  }
  function Y(e) {
    let t = this,
      s = i(),
      a = e;
    a.originalEvent && (a = a.originalEvent);
    let l = t.touchEventsData;
    if ("pointerdown" === a.type) {
      if (null !== l.pointerId && l.pointerId !== a.pointerId) return;
      l.pointerId = a.pointerId;
    } else
      "touchstart" === a.type &&
        1 === a.targetTouches.length &&
        (l.touchId = a.targetTouches[0].identifier);
    if ("touchstart" === a.type) return void X(t, a, a.targetTouches[0].pageX);
    let { params: n, touches: d, enabled: p } = t;
    if (
      !p ||
      (!n.simulateTouch && "mouse" === a.pointerType) ||
      (t.animating && n.preventInteractionOnTransition)
    )
      return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let c = a.target;
    if (
      ("wrapper" === n.touchEventsTarget &&
        !(function (e, t) {
          let s = r(),
            i = t.contains(e);
          return (
            !i &&
              s.HTMLSlotElement &&
              t instanceof HTMLSlotElement &&
              ((i = [...t.assignedElements()].includes(e)) ||
                (i = (function (e, t) {
                  let s = [t];
                  for (; s.length > 0; ) {
                    let i = s.shift();
                    if (e === i) return !0;
                    s.push(
                      ...i.children,
                      ...(i.shadowRoot ? i.shadowRoot.children : []),
                      ...(i.assignedElements ? i.assignedElements() : [])
                    );
                  }
                })(e, t))),
            i
          );
        })(c, t.wrapperEl)) ||
      ("which" in a && 3 === a.which) ||
      ("button" in a && a.button > 0) ||
      (l.isTouched && l.isMoved)
    )
      return;
    let u = !!n.noSwipingClass && "" !== n.noSwipingClass,
      m = a.composedPath ? a.composedPath() : a.path;
    u && a.target && a.target.shadowRoot && m && (c = m[0]);
    let h = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
      f = !(!a.target || !a.target.shadowRoot);
    if (
      n.noSwiping &&
      (f
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === i() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                let a = s.closest(e);
                return a || s.getRootNode ? a || t(s.getRootNode().host) : null;
              })(t)
            );
          })(h, c)
        : c.closest(h))
    )
      return void (t.allowClick = !0);
    if (n.swipeHandler && !c.closest(n.swipeHandler)) return;
    (d.currentX = a.pageX), (d.currentY = a.pageY);
    let g = d.currentX,
      v = d.currentY;
    if (!X(t, a, g)) return;
    Object.assign(l, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (d.startX = g),
      (d.startY = v),
      (l.touchStartTime = o()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      n.threshold > 0 && (l.allowThresholdMove = !1);
    let $ = !0;
    c.matches(l.focusableElements) &&
      (($ = !1), "SELECT" === c.nodeName && (l.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(l.focusableElements) &&
        s.activeElement !== c &&
        ("mouse" === a.pointerType ||
          ("mouse" !== a.pointerType && !c.matches(l.focusableElements))) &&
        s.activeElement.blur();
    let w = $ && t.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || w) &&
      !c.isContentEditable &&
      a.preventDefault(),
      n.freeMode &&
        n.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !n.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", a);
  }
  function B(e) {
    let t = i(),
      s = this,
      a = s.touchEventsData,
      { params: r, touches: l, rtlTranslate: n, enabled: d } = s;
    if (!d || (!r.simulateTouch && "mouse" === e.pointerType)) return;
    let p,
      c = e;
    if (
      (c.originalEvent && (c = c.originalEvent),
      "pointermove" === c.type &&
        (null !== a.touchId || c.pointerId !== a.pointerId))
    )
      return;
    if ("touchmove" === c.type) {
      if (
        !(p = [...c.changedTouches].find((e) => e.identifier === a.touchId)) ||
        p.identifier !== a.touchId
      )
        return;
    } else p = c;
    if (!a.isTouched)
      return void (
        a.startMoving &&
        a.isScrolling &&
        s.emit("touchMoveOpposite", c)
      );
    let u = p.pageX,
      m = p.pageY;
    if (c.preventedByNestedSwiper) return (l.startX = u), void (l.startY = m);
    if (!s.allowTouchMove)
      return (
        c.target.matches(a.focusableElements) || (s.allowClick = !1),
        void (
          a.isTouched &&
          (Object.assign(l, { startX: u, startY: m, currentX: u, currentY: m }),
          (a.touchStartTime = o()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop) {
      if (s.isVertical()) {
        if (
          (m < l.startY && s.translate <= s.maxTranslate()) ||
          (m > l.startY && s.translate >= s.minTranslate())
        )
          return (a.isTouched = !1), void (a.isMoved = !1);
      } else if (
        (n &&
          ((u > l.startX && -s.translate <= s.maxTranslate()) ||
            (u < l.startX && -s.translate >= s.minTranslate()))) ||
        (!n &&
          ((u < l.startX && s.translate <= s.maxTranslate()) ||
            (u > l.startX && s.translate >= s.minTranslate())))
      )
        return;
    }
    if (
      (t.activeElement &&
        t.activeElement.matches(a.focusableElements) &&
        t.activeElement !== c.target &&
        "mouse" !== c.pointerType &&
        t.activeElement.blur(),
      t.activeElement &&
        c.target === t.activeElement &&
        c.target.matches(a.focusableElements))
    )
      return (a.isMoved = !0), void (s.allowClick = !1);
    a.allowTouchCallbacks && s.emit("touchMove", c),
      (l.previousX = l.currentX),
      (l.previousY = l.currentY),
      (l.currentX = u),
      (l.currentY = m);
    let h = l.currentX - l.startX,
      f = l.currentY - l.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === a.isScrolling) {
      let g;
      (s.isHorizontal() && l.currentY === l.startY) ||
      (s.isVertical() && l.currentX === l.startX)
        ? (a.isScrolling = !1)
        : h * h + f * f >= 25 &&
          ((g = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
          (a.isScrolling = s.isHorizontal()
            ? g > r.touchAngle
            : 90 - g > r.touchAngle));
    }
    if (
      (a.isScrolling && s.emit("touchMoveOpposite", c),
      void 0 === a.startMoving &&
        ((l.currentX === l.startX && l.currentY === l.startY) ||
          (a.startMoving = !0)),
      a.isScrolling ||
        ("touchmove" === c.type && a.preventTouchMoveFromPointerMove))
    )
      return void (a.isTouched = !1);
    if (!a.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && c.cancelable && c.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
    let v = s.isHorizontal() ? h : f,
      $ = s.isHorizontal()
        ? l.currentX - l.previousX
        : l.currentY - l.previousY;
    r.oneWayMovement &&
      ((v = Math.abs(v) * (n ? 1 : -1)), ($ = Math.abs($) * (n ? 1 : -1))),
      (l.diff = v),
      (v *= r.touchRatio),
      n && ((v = -v), ($ = -$));
    let w = s.touchesDirection;
    (s.swipeDirection = v > 0 ? "prev" : "next"),
      (s.touchesDirection = $ > 0 ? "prev" : "next");
    let y = s.params.loop && !r.cssMode,
      b =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!a.isMoved) {
      if (
        (y && b && s.loopFix({ direction: s.swipeDirection }),
        (a.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        let _ = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
          detail: { bySwiperTouchMove: !0 },
        });
        s.wrapperEl.dispatchEvent(_);
      }
      (a.allowMomentumBounce = !1),
        r.grabCursor &&
          (!0 === s.allowSlideNext || !0 === s.allowSlidePrev) &&
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c);
    }
    if (
      (new Date().getTime(),
      !1 !== r._loopSwapReset &&
        a.isMoved &&
        a.allowThresholdMove &&
        w !== s.touchesDirection &&
        y &&
        b &&
        Math.abs(v) >= 1)
    )
      return (
        Object.assign(l, {
          startX: u,
          startY: m,
          currentX: u,
          currentY: m,
          startTranslate: a.currentTranslate,
        }),
        (a.loopSwapReset = !0),
        void (a.startTranslate = a.currentTranslate)
      );
    s.emit("sliderMove", c),
      (a.isMoved = !0),
      (a.currentTranslate = v + a.startTranslate);
    let E = !0,
      x = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (x = 0),
      v > 0
        ? (y &&
            b &&
            a.allowThresholdMove &&
            a.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() -
                  s.slidesSizesGrid[s.activeIndex + 1] -
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.activeIndex + 1] +
                      s.params.spaceBetween
                    : 0) -
                  s.params.spaceBetween
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          a.currentTranslate > s.minTranslate() &&
            ((E = !1),
            r.resistance &&
              (a.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + a.startTranslate + v) ** x)))
        : v < 0 &&
          (y &&
            b &&
            a.allowThresholdMove &&
            a.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                  s.params.spaceBetween +
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                      s.params.spaceBetween
                    : 0)
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          a.currentTranslate < s.maxTranslate() &&
            ((E = !1),
            r.resistance &&
              (a.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - a.startTranslate - v) ** x))),
      E && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        a.currentTranslate < a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        a.currentTranslate > a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (a.currentTranslate = a.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(v) > r.threshold || a.allowThresholdMove))
        return void (a.currentTranslate = a.startTranslate);
      if (!a.allowThresholdMove)
        return (
          (a.allowThresholdMove = !0),
          (l.startX = l.currentX),
          (l.startY = l.currentY),
          (a.currentTranslate = a.startTranslate),
          void (l.diff = s.isHorizontal()
            ? l.currentX - l.startX
            : l.currentY - l.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      r.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(a.currentTranslate),
      s.setTranslate(a.currentTranslate));
  }
  function H(e) {
    let t = this,
      s = t.touchEventsData,
      i,
      a = e;
    if (
      (a.originalEvent && (a = a.originalEvent),
      "touchend" === a.type || "touchcancel" === a.type)
    ) {
      if (
        !(i = [...a.changedTouches].find((e) => e.identifier === s.touchId)) ||
        i.identifier !== s.touchId
      )
        return;
    } else {
      if (null !== s.touchId || a.pointerId !== s.pointerId) return;
      i = a;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        a.type
      ) &&
      !(
        ["pointercancel", "contextmenu"].includes(a.type) &&
        (t.browser.isSafari || t.browser.isWebView)
      )
    )
      return;
    (s.pointerId = null), (s.touchId = null);
    let {
      params: r,
      touches: l,
      rtlTranslate: d,
      slidesGrid: p,
      enabled: c,
    } = t;
    if (!c || (!r.simulateTouch && "mouse" === a.pointerType)) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", a),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    let u = o(),
      m = u - s.touchStartTime;
    if (t.allowClick) {
      let h = a.path || (a.composedPath && a.composedPath());
      t.updateClickedSlide((h && h[0]) || a.target, h),
        t.emit("tap click", a),
        m < 300 &&
          u - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", a);
    }
    if (
      ((s.lastClickTime = o()),
      n(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === l.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let f;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (f = r.followFinger
        ? d
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: f });
    let g = f >= -t.maxTranslate() && !t.params.loop,
      v = 0,
      $ = t.slidesSizesGrid[0];
    for (
      let w = 0;
      w < p.length;
      w += w < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      let y = w < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== p[w + y]
        ? (g || (f >= p[w] && f < p[w + y])) && ((v = w), ($ = p[w + y] - p[w]))
        : (g || f >= p[w]) &&
          ((v = w), ($ = p[p.length - 1] - p[p.length - 2]));
    }
    let b = null,
      _ = null;
    r.rewind &&
      (t.isBeginning
        ? (_ =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (b = 0));
    let E = (f - p[v]) / $,
      x = v < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (m > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (E >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? b : v + x)
          : t.slideTo(v)),
        "prev" === t.swipeDirection &&
          (E > 1 - r.longSwipesRatio
            ? t.slideTo(v + x)
            : null !== _ && E < 0 && Math.abs(E) > r.longSwipesRatio
            ? t.slideTo(_)
            : t.slideTo(v));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl)
        ? a.target === t.navigation.nextEl
          ? t.slideTo(v + x)
          : t.slideTo(v)
        : ("next" === t.swipeDirection && t.slideTo(null !== b ? b : v + x),
          "prev" === t.swipeDirection && t.slideTo(null !== _ ? _ : v));
    }
  }
  function N() {
    let e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    let { allowSlideNext: i, allowSlidePrev: a, snapGrid: r } = e,
      l = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    let n = l && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    n
      ? e.params.loop && !l
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = a),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function R(e) {
    this.enabled &&
      (this.allowClick ||
        (this.params.preventClicks && e.preventDefault(),
        this.params.preventClicksPropagation &&
          this.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function V() {
    let e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let a;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    let r = e.maxTranslate() - e.minTranslate();
    (a = 0 === r ? 0 : (e.translate - e.minTranslate()) / r) !== e.progress &&
      e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function W(e) {
    A(this, e.target),
      this.params.cssMode ||
        ("auto" !== this.params.slidesPerView && !this.params.autoHeight) ||
        this.update();
  }
  function q() {
    let e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  let F = (e, t) => {
      let s = i(),
        { params: a, el: r, wrapperEl: l, device: n } = e,
        o = !!a.nested,
        d = "on" === t ? "addEventListener" : "removeEventListener",
        p = t;
      r &&
        "string" != typeof r &&
        (s[d]("touchstart", e.onDocumentTouchStart, {
          passive: !1,
          capture: o,
        }),
        r[d]("touchstart", e.onTouchStart, { passive: !1 }),
        r[d]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
        s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
        s[d]("touchend", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
        s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (a.preventClicks || a.preventClicksPropagation) &&
          r[d]("click", e.onClick, !0),
        a.cssMode && l[d]("scroll", e.onScroll),
        a.updateOnWindowResize
          ? e[p](
              n.ios || n.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              N,
              !0
            )
          : e[p]("observerUpdate", N, !0),
        r[d]("load", e.onLoad, { capture: !0 }));
    },
    j = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var U = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  let K = {
      eventsEmitter: {
        on(e, t, s) {
          let i = this;
          if (!i.eventsListeners || i.destroyed || "function" != typeof t)
            return i;
          let a = s ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][a](t);
            }),
            i
          );
        },
        once(e, t, s) {
          let i = this;
          if (!i.eventsListeners || i.destroyed || "function" != typeof t)
            return i;
          function a() {
            i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
            for (var s = arguments.length, r = Array(s), l = 0; l < s; l++)
              r[l] = arguments[l];
            t.apply(i, r);
          }
          return (a.__emitterProxy = t), i.on(e, a, s);
        },
        onAny(e, t) {
          return (
            !this.eventsListeners ||
              this.destroyed ||
              "function" != typeof e ||
              (0 > this.eventsAnyListeners.indexOf(e) &&
                this.eventsAnyListeners[t ? "unshift" : "push"](e)),
            this
          );
        },
        offAny(e) {
          if (
            !this.eventsListeners ||
            this.destroyed ||
            !this.eventsAnyListeners
          )
            return this;
          let t = this.eventsAnyListeners.indexOf(e);
          return t >= 0 && this.eventsAnyListeners.splice(t, 1), this;
        },
        off(e, t) {
          let s = this;
          return (
            !s.eventsListeners ||
              s.destroyed ||
              (s.eventsListeners &&
                e.split(" ").forEach((e) => {
                  void 0 === t
                    ? (s.eventsListeners[e] = [])
                    : s.eventsListeners[e] &&
                      s.eventsListeners[e].forEach((i, a) => {
                        (i === t ||
                          (i.__emitterProxy && i.__emitterProxy === t)) &&
                          s.eventsListeners[e].splice(a, 1);
                      });
                })),
            s
          );
        },
        emit() {
          let e = this;
          if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e;
          let t, s, i;
          for (var a = arguments.length, r = Array(a), l = 0; l < a; l++)
            r[l] = arguments[l];
          return (
            "string" == typeof r[0] || Array.isArray(r[0])
              ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
              : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
            s.unshift(i),
            (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
              e.eventsAnyListeners &&
                e.eventsAnyListeners.length &&
                e.eventsAnyListeners.forEach((e) => {
                  e.apply(i, [t, ...s]);
                }),
                e.eventsListeners &&
                  e.eventsListeners[t] &&
                  e.eventsListeners[t].forEach((e) => {
                    e.apply(i, s);
                  });
            }),
            e
          );
        },
      },
      update: {
        updateSize: function () {
          let e,
            t,
            s = this.el;
          (e =
            void 0 !== this.params.width && null !== this.params.width
              ? this.params.width
              : s.clientWidth),
            (t =
              void 0 !== this.params.height && null !== this.params.height
                ? this.params.height
                : s.clientHeight),
            (0 === e && this.isHorizontal()) ||
              (0 === t && this.isVertical()) ||
              ((e =
                e -
                parseInt(w(s, "padding-left") || 0, 10) -
                parseInt(w(s, "padding-right") || 0, 10)),
              (t =
                t -
                parseInt(w(s, "padding-top") || 0, 10) -
                parseInt(w(s, "padding-bottom") || 0, 10)),
              Number.isNaN(e) && (e = 0),
              Number.isNaN(t) && (t = 0),
              Object.assign(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t,
              }));
        },
        updateSlides: function () {
          let e = this;
          function t(t, s) {
            return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
          }
          let s = e.params,
            {
              wrapperEl: i,
              slidesEl: a,
              size: r,
              rtlTranslate: l,
              wrongRTL: n,
            } = e,
            o = e.virtual && s.virtual.enabled,
            d = o ? e.virtual.slides.length : e.slides.length,
            p = f(a, `.${e.params.slideClass}, swiper-slide`),
            c = o ? e.virtual.slides.length : p.length,
            m = [],
            h = [],
            g = [],
            v = s.slidesOffsetBefore;
          "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
          let $ = s.slidesOffsetAfter;
          "function" == typeof $ && ($ = s.slidesOffsetAfter.call(e));
          let y = e.snapGrid.length,
            b = e.slidesGrid.length,
            _ = s.spaceBetween,
            x = -v,
            S = 0,
            T = 0;
          if (void 0 === r) return;
          "string" == typeof _ && _.indexOf("%") >= 0
            ? (_ = (parseFloat(_.replace("%", "")) / 100) * r)
            : "string" == typeof _ && (_ = parseFloat(_)),
            (e.virtualSize = -_),
            p.forEach((e) => {
              l ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                (e.style.marginBottom = ""),
                (e.style.marginTop = "");
            }),
            s.centeredSlides &&
              s.cssMode &&
              (u(i, "--swiper-centered-offset-before", ""),
              u(i, "--swiper-centered-offset-after", ""));
          let C = s.grid && s.grid.rows > 1 && e.grid,
            P;
          C ? e.grid.initSlides(p) : e.grid && e.grid.unsetSlides();
          let L =
            "auto" === s.slidesPerView &&
            s.breakpoints &&
            Object.keys(s.breakpoints).filter(
              (e) => void 0 !== s.breakpoints[e].slidesPerView
            ).length > 0;
          for (let M = 0; M < c; M += 1) {
            let z;
            if (
              ((P = 0),
              p[M] && (z = p[M]),
              C && e.grid.updateSlide(M, z, p),
              !p[M] || "none" !== w(z, "display"))
            ) {
              if ("auto" === s.slidesPerView) {
                L && (p[M].style[e.getDirectionLabel("width")] = "");
                let k = getComputedStyle(z),
                  I = z.style.transform,
                  A = z.style.webkitTransform;
                if (
                  (I && (z.style.transform = "none"),
                  A && (z.style.webkitTransform = "none"),
                  s.roundLengths)
                )
                  P = e.isHorizontal() ? E(z, "width", !0) : E(z, "height", !0);
                else {
                  let D = t(k, "width"),
                    O = t(k, "padding-left"),
                    G = t(k, "padding-right"),
                    X = t(k, "margin-left"),
                    Y = t(k, "margin-right"),
                    B = k.getPropertyValue("box-sizing");
                  if (B && "border-box" === B) P = D + X + Y;
                  else {
                    let { clientWidth: H, offsetWidth: N } = z;
                    P = D + O + G + X + Y + (N - H);
                  }
                }
                I && (z.style.transform = I),
                  A && (z.style.webkitTransform = A),
                  s.roundLengths && (P = Math.floor(P));
              } else
                (P = (r - (s.slidesPerView - 1) * _) / s.slidesPerView),
                  s.roundLengths && (P = Math.floor(P)),
                  p[M] && (p[M].style[e.getDirectionLabel("width")] = `${P}px`);
              p[M] && (p[M].swiperSlideSize = P),
                g.push(P),
                s.centeredSlides
                  ? ((x = x + P / 2 + S / 2 + _),
                    0 === S && 0 !== M && (x = x - r / 2 - _),
                    0 === M && (x = x - r / 2 - _),
                    0.001 > Math.abs(x) && (x = 0),
                    s.roundLengths && (x = Math.floor(x)),
                    T % s.slidesPerGroup == 0 && m.push(x),
                    h.push(x))
                  : (s.roundLengths && (x = Math.floor(x)),
                    (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                      e.params.slidesPerGroup ==
                      0 && m.push(x),
                    h.push(x),
                    (x = x + P + _)),
                (e.virtualSize += P + _),
                (S = P),
                (T += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, r) + $),
            l &&
              n &&
              ("slide" === s.effect || "coverflow" === s.effect) &&
              (i.style.width = `${e.virtualSize + _}px`),
            s.setWrapperSize &&
              (i.style[e.getDirectionLabel("width")] = `${
                e.virtualSize + _
              }px`),
            C && e.grid.updateWrapperSize(P, m),
            !s.centeredSlides)
          ) {
            let R = [];
            for (let V = 0; V < m.length; V += 1) {
              let W = m[V];
              s.roundLengths && (W = Math.floor(W)),
                m[V] <= e.virtualSize - r && R.push(W);
            }
            (m = R),
              Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 &&
                m.push(e.virtualSize - r);
          }
          if (o && s.loop) {
            let q = g[0] + _;
            if (s.slidesPerGroup > 1) {
              let F = Math.ceil(
                  (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                    s.slidesPerGroup
                ),
                j = q * s.slidesPerGroup;
              for (let U = 0; U < F; U += 1) m.push(m[m.length - 1] + j);
            }
            for (
              let K = 0;
              K < e.virtual.slidesBefore + e.virtual.slidesAfter;
              K += 1
            )
              1 === s.slidesPerGroup && m.push(m[m.length - 1] + q),
                h.push(h[h.length - 1] + q),
                (e.virtualSize += q);
          }
          if ((0 === m.length && (m = [0]), 0 !== _)) {
            let Z =
              e.isHorizontal() && l
                ? "marginLeft"
                : e.getDirectionLabel("marginRight");
            p.filter(
              (e, t) => !(s.cssMode && !s.loop) || t !== p.length - 1
            ).forEach((e) => {
              e.style[Z] = `${_}px`;
            });
          }
          if (s.centeredSlides && s.centeredSlidesBounds) {
            let Q = 0;
            g.forEach((e) => {
              Q += e + (_ || 0);
            }),
              (Q -= _);
            let J = Q > r ? Q - r : 0;
            m = m.map((e) => (e <= 0 ? -v : e > J ? J + $ : e));
          }
          if (s.centerInsufficientSlides) {
            let ee = 0;
            g.forEach((e) => {
              ee += e + (_ || 0);
            }),
              (ee -= _);
            let et = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
            if (ee + et < r) {
              let es = (r - ee - et) / 2;
              m.forEach((e, t) => {
                m[t] = e - es;
              }),
                h.forEach((e, t) => {
                  h[t] = e + es;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: p,
              snapGrid: m,
              slidesGrid: h,
              slidesSizesGrid: g,
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
          ) {
            u(i, "--swiper-centered-offset-before", -m[0] + "px"),
              u(
                i,
                "--swiper-centered-offset-after",
                e.size / 2 - g[g.length - 1] / 2 + "px"
              );
            let ei = -e.snapGrid[0],
              ea = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + ei)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + ea));
          }
          if (
            (c !== d && e.emit("slidesLengthChange"),
            m.length !== y &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            h.length !== b && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset(),
            e.emit("slidesUpdated"),
            !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
          ) {
            let er = `${s.containerModifierClass}backface-hidden`,
              el = e.el.classList.contains(er);
            c <= s.maxBackfaceHiddenSlides
              ? el || e.el.classList.add(er)
              : el && e.el.classList.remove(er);
          }
        },
        updateAutoHeight: function (e) {
          let t = this,
            s = [],
            i = t.virtual && t.params.virtual.enabled,
            a,
            r = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          let l = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
            if (t.params.centeredSlides)
              (t.visibleSlides || []).forEach((e) => {
                s.push(e);
              });
            else
              for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
                let n = t.activeIndex + a;
                if (n > t.slides.length && !i) break;
                s.push(l(n));
              }
          } else s.push(l(t.activeIndex));
          for (a = 0; a < s.length; a += 1)
            if (void 0 !== s[a]) {
              let o = s[a].offsetHeight;
              r = o > r ? o : r;
            }
          (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
        },
        updateSlidesOffset: function () {
          let e = this.slides,
            t = this.isElement
              ? this.isHorizontal()
                ? this.wrapperEl.offsetLeft
                : this.wrapperEl.offsetTop
              : 0;
          for (let s = 0; s < e.length; s += 1)
            e[s].swiperSlideOffset =
              (this.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) -
              t -
              this.cssOverflowAdjustment();
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = (this && this.translate) || 0);
          let t = this,
            s = t.params,
            { slides: i, rtlTranslate: a, snapGrid: r } = t;
          if (0 === i.length) return;
          void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
          let l = -e;
          a && (l = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
          let n = s.spaceBetween;
          "string" == typeof n && n.indexOf("%") >= 0
            ? (n = (parseFloat(n.replace("%", "")) / 100) * t.size)
            : "string" == typeof n && (n = parseFloat(n));
          for (let o = 0; o < i.length; o += 1) {
            let d = i[o],
              p = d.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (p -= i[0].swiperSlideOffset);
            let c =
                (l + (s.centeredSlides ? t.minTranslate() : 0) - p) /
                (d.swiperSlideSize + n),
              u =
                (l - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - p) /
                (d.swiperSlideSize + n),
              m = -(l - p),
              h = m + t.slidesSizesGrid[o],
              f = m >= 0 && m <= t.size - t.slidesSizesGrid[o],
              g =
                (m >= 0 && m < t.size - 1) ||
                (h > 1 && h <= t.size) ||
                (m <= 0 && h >= t.size);
            g && (t.visibleSlides.push(d), t.visibleSlidesIndexes.push(o)),
              k(d, g, s.slideVisibleClass),
              k(d, f, s.slideFullyVisibleClass),
              (d.progress = a ? -c : c),
              (d.originalProgress = a ? -u : u);
          }
        },
        updateProgress: function (e) {
          if (void 0 === e) {
            let t = this.rtlTranslate ? -1 : 1;
            e = (this && this.translate && this.translate * t) || 0;
          }
          let s = this.params,
            i = this.maxTranslate() - this.minTranslate(),
            { progress: a, isBeginning: r, isEnd: l, progressLoop: n } = this,
            o = r,
            d = l;
          if (0 === i) (a = 0), (r = !0), (l = !0);
          else {
            a = (e - this.minTranslate()) / i;
            let p = 1 > Math.abs(e - this.minTranslate()),
              c = 1 > Math.abs(e - this.maxTranslate());
            (r = p || a <= 0), (l = c || a >= 1), p && (a = 0), c && (a = 1);
          }
          if (s.loop) {
            let u = this.getSlideIndexByData(0),
              m = this.getSlideIndexByData(this.slides.length - 1),
              h = this.slidesGrid[u],
              f = this.slidesGrid[m],
              g = this.slidesGrid[this.slidesGrid.length - 1],
              v = Math.abs(e);
            (n = v >= h ? (v - h) / g : (v + g - f) / g) > 1 && (n -= 1);
          }
          Object.assign(this, {
            progress: a,
            progressLoop: n,
            isBeginning: r,
            isEnd: l,
          }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              this.updateSlidesProgress(e),
            r && !o && this.emit("reachBeginning toEdge"),
            l && !d && this.emit("reachEnd toEdge"),
            ((o && !r) || (d && !l)) && this.emit("fromEdge"),
            this.emit("progress", a);
        },
        updateSlidesClasses: function () {
          let { slides: e, params: t, slidesEl: s, activeIndex: i } = this,
            a = this.virtual && t.virtual.enabled,
            r = this.grid && t.grid && t.grid.rows > 1,
            l = (e) => f(s, `.${t.slideClass}${e}, swiper-slide${e}`)[0],
            n,
            o,
            d;
          if (a) {
            if (t.loop) {
              let p = i - this.virtual.slidesBefore;
              p < 0 && (p = this.virtual.slides.length + p),
                p >= this.virtual.slides.length &&
                  (p -= this.virtual.slides.length),
                (n = l(`[data-swiper-slide-index="${p}"]`));
            } else n = l(`[data-swiper-slide-index="${i}"]`);
          } else
            r
              ? ((n = e.find((e) => e.column === i)),
                (d = e.find((e) => e.column === i + 1)),
                (o = e.find((e) => e.column === i - 1)))
              : (n = e[i]);
          n &&
            (r ||
              ((d = (function (e, t) {
                let s = [];
                for (; e.nextElementSibling; ) {
                  let i = e.nextElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(n, `.${t.slideClass}, swiper-slide`)[0]),
              t.loop && !d && (d = e[0]),
              (o = (function (e, t) {
                let s = [];
                for (; e.previousElementSibling; ) {
                  let i = e.previousElementSibling;
                  t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
                }
                return s;
              })(n, `.${t.slideClass}, swiper-slide`)[0]),
              t.loop)),
            e.forEach((e) => {
              I(e, e === n, t.slideActiveClass),
                I(e, e === d, t.slideNextClass),
                I(e, e === o, t.slidePrevClass);
            }),
            this.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          let t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              snapGrid: i,
              params: a,
              activeIndex: r,
              realIndex: l,
              snapIndex: n,
            } = t,
            o,
            d = e,
            p = (e) => {
              let s = e - t.virtual.slidesBefore;
              return (
                s < 0 && (s = t.virtual.slides.length + s),
                s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                s
              );
            };
          if (
            (void 0 === d &&
              (d = (function (e) {
                let { slidesGrid: t, params: s } = e,
                  i = e.rtlTranslate ? e.translate : -e.translate,
                  a;
                for (let r = 0; r < t.length; r += 1)
                  void 0 !== t[r + 1]
                    ? i >= t[r] && i < t[r + 1] - (t[r + 1] - t[r]) / 2
                      ? (a = r)
                      : i >= t[r] && i < t[r + 1] && (a = r + 1)
                    : i >= t[r] && (a = r);
                return (
                  s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0), a
                );
              })(t)),
            i.indexOf(s) >= 0)
          )
            o = i.indexOf(s);
          else {
            let c = Math.min(a.slidesPerGroupSkip, d);
            o = c + Math.floor((d - c) / a.slidesPerGroup);
          }
          if ((o >= i.length && (o = i.length - 1), d === r && !t.params.loop))
            return void (
              o !== n && ((t.snapIndex = o), t.emit("snapIndexChange"))
            );
          if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
            return void (t.realIndex = p(d));
          let u = t.grid && a.grid && a.grid.rows > 1,
            m;
          if (t.virtual && a.virtual.enabled && a.loop) m = p(d);
          else if (u) {
            let h = t.slides.find((e) => e.column === d),
              f = parseInt(h.getAttribute("data-swiper-slide-index"), 10);
            Number.isNaN(f) && (f = Math.max(t.slides.indexOf(h), 0)),
              (m = Math.floor(f / a.grid.rows));
          } else if (t.slides[d]) {
            let g = t.slides[d].getAttribute("data-swiper-slide-index");
            m = g ? parseInt(g, 10) : d;
          } else m = d;
          Object.assign(t, {
            previousSnapIndex: n,
            snapIndex: o,
            previousRealIndex: l,
            realIndex: m,
            previousIndex: r,
            activeIndex: d,
          }),
            t.initialized && O(t),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              (l !== m && t.emit("realIndexChange"), t.emit("slideChange"));
        },
        updateClickedSlide: function (e, t) {
          let s = this,
            i = s.params,
            a = e.closest(`.${i.slideClass}, swiper-slide`);
          !a &&
            s.isElement &&
            t &&
            t.length > 1 &&
            t.includes(e) &&
            [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
              !a &&
                e.matches &&
                e.matches(`.${i.slideClass}, swiper-slide`) &&
                (a = e);
            });
          let r,
            l = !1;
          if (a) {
            for (let n = 0; n < s.slides.length; n += 1)
              if (s.slides[n] === a) {
                (l = !0), (r = n);
                break;
              }
          }
          if (!a || !l)
            return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
          (s.clickedSlide = a),
            s.virtual && s.params.virtual.enabled
              ? (s.clickedIndex = parseInt(
                  a.getAttribute("data-swiper-slide-index"),
                  10
                ))
              : (s.clickedIndex = r),
            i.slideToClickedSlide &&
              void 0 !== s.clickedIndex &&
              s.clickedIndex !== s.activeIndex &&
              s.slideToClickedSlide();
        },
      },
      translate: {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          let { params: t, rtlTranslate: s, translate: i, wrapperEl: a } = this;
          if (t.virtualTranslate) return s ? -i : i;
          if (t.cssMode) return i;
          let r = d(a, e);
          return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
          let s = this,
            { rtlTranslate: i, params: a, wrapperEl: r, progress: l } = s,
            n,
            o = 0,
            d = 0;
          s.isHorizontal() ? (o = i ? -e : e) : (d = e),
            a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? o : d),
            a.cssMode
              ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -o : -d)
              : a.virtualTranslate ||
                (s.isHorizontal()
                  ? (o -= s.cssOverflowAdjustment())
                  : (d -= s.cssOverflowAdjustment()),
                (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
          let p = s.maxTranslate() - s.minTranslate();
          (n = 0 === p ? 0 : (e - s.minTranslate()) / p) !== l &&
            s.updateProgress(e),
            s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, s, i, a) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
          let r = this,
            { params: l, wrapperEl: n } = r;
          if (r.animating && l.preventInteractionOnTransition) return !1;
          let o = r.minTranslate(),
            d = r.maxTranslate(),
            p;
          if (
            ((p = i && e > o ? o : i && e < d ? d : e),
            r.updateProgress(p),
            l.cssMode)
          ) {
            let c = r.isHorizontal();
            if (0 === t) n[c ? "scrollLeft" : "scrollTop"] = -p;
            else {
              if (!r.support.smoothScroll)
                return (
                  m({
                    swiper: r,
                    targetPosition: -p,
                    side: c ? "left" : "top",
                  }),
                  !0
                );
              n.scrollTo({ [c ? "left" : "top"]: -p, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (r.setTransition(0),
                r.setTranslate(p),
                s &&
                  (r.emit("beforeTransitionStart", t, a),
                  r.emit("transitionEnd")))
              : (r.setTransition(t),
                r.setTranslate(p),
                s &&
                  (r.emit("beforeTransitionStart", t, a),
                  r.emit("transitionStart")),
                r.animating ||
                  ((r.animating = !0),
                  r.onTranslateToWrapperTransitionEnd ||
                    (r.onTranslateToWrapperTransitionEnd = function (e) {
                      r &&
                        !r.destroyed &&
                        e.target === this &&
                        (r.wrapperEl.removeEventListener(
                          "transitionend",
                          r.onTranslateToWrapperTransitionEnd
                        ),
                        (r.onTranslateToWrapperTransitionEnd = null),
                        delete r.onTranslateToWrapperTransitionEnd,
                        (r.animating = !1),
                        s && r.emit("transitionEnd"));
                    }),
                  r.wrapperEl.addEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      },
      transition: {
        setTransition: function (e, t) {
          let s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          let { params: s } = this;
          s.cssMode ||
            (s.autoHeight && this.updateAutoHeight(),
            G({ swiper: this, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          let s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              G({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: {
        slideTo: function (e, t, s, i, a) {
          void 0 === e && (e = 0),
            void 0 === s && (s = !0),
            "string" == typeof e && (e = parseInt(e, 10));
          let r = this,
            l = e;
          l < 0 && (l = 0);
          let {
            params: n,
            snapGrid: o,
            slidesGrid: d,
            previousIndex: p,
            activeIndex: c,
            rtlTranslate: u,
            wrapperEl: h,
            enabled: f,
          } = r;
          if (
            (!f && !i && !a) ||
            r.destroyed ||
            (r.animating && n.preventInteractionOnTransition)
          )
            return !1;
          void 0 === t && (t = r.params.speed);
          let g = Math.min(r.params.slidesPerGroupSkip, l),
            v = g + Math.floor((l - g) / r.params.slidesPerGroup);
          v >= o.length && (v = o.length - 1);
          let $ = -o[v];
          if (n.normalizeSlideIndex)
            for (let w = 0; w < d.length; w += 1) {
              let y = -Math.floor(100 * $),
                b = Math.floor(100 * d[w]),
                _ = Math.floor(100 * d[w + 1]);
              void 0 !== d[w + 1]
                ? y >= b && y < _ - (_ - b) / 2
                  ? (l = w)
                  : y >= b && y < _ && (l = w + 1)
                : y >= b && (l = w);
            }
          if (
            r.initialized &&
            l !== c &&
            ((!r.allowSlideNext &&
              (u
                ? $ > r.translate && $ > r.minTranslate()
                : $ < r.translate && $ < r.minTranslate())) ||
              (!r.allowSlidePrev &&
                $ > r.translate &&
                $ > r.maxTranslate() &&
                (c || 0) !== l))
          )
            return !1;
          let E;
          l !== (p || 0) && s && r.emit("beforeSlideChangeStart"),
            r.updateProgress($),
            (E = l > c ? "next" : l < c ? "prev" : "reset");
          let x = r.virtual && r.params.virtual.enabled;
          if (
            !(x && a) &&
            ((u && -$ === r.translate) || (!u && $ === r.translate))
          )
            return (
              r.updateActiveIndex(l),
              n.autoHeight && r.updateAutoHeight(),
              r.updateSlidesClasses(),
              "slide" !== n.effect && r.setTranslate($),
              "reset" !== E && (r.transitionStart(s, E), r.transitionEnd(s, E)),
              !1
            );
          if (n.cssMode) {
            let S = r.isHorizontal(),
              T = u ? $ : -$;
            if (0 === t)
              x &&
                ((r.wrapperEl.style.scrollSnapType = "none"),
                (r._immediateVirtual = !0)),
                x && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
                  ? ((r._cssModeVirtualInitialSet = !0),
                    requestAnimationFrame(() => {
                      h[S ? "scrollLeft" : "scrollTop"] = T;
                    }))
                  : (h[S ? "scrollLeft" : "scrollTop"] = T),
                x &&
                  requestAnimationFrame(() => {
                    (r.wrapperEl.style.scrollSnapType = ""),
                      (r._immediateVirtual = !1);
                  });
            else {
              if (!r.support.smoothScroll)
                return (
                  m({ swiper: r, targetPosition: T, side: S ? "left" : "top" }),
                  !0
                );
              h.scrollTo({ [S ? "left" : "top"]: T, behavior: "smooth" });
            }
            return !0;
          }
          let C = z().isSafari;
          return (
            x && !a && C && r.isElement && r.virtual.update(!1, !1, l),
            r.setTransition(t),
            r.setTranslate($),
            r.updateActiveIndex(l),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, i),
            r.transitionStart(s, E),
            0 === t
              ? r.transitionEnd(s, E)
              : r.animating ||
                ((r.animating = !0),
                r.onSlideToWrapperTransitionEnd ||
                  (r.onSlideToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.wrapperEl.removeEventListener(
                        "transitionend",
                        r.onSlideToWrapperTransitionEnd
                      ),
                      (r.onSlideToWrapperTransitionEnd = null),
                      delete r.onSlideToWrapperTransitionEnd,
                      r.transitionEnd(s, E));
                  }),
                r.wrapperEl.addEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e, t, s, i) {
          void 0 === e && (e = 0),
            void 0 === s && (s = !0),
            "string" == typeof e && (e = parseInt(e, 10));
          let a = this;
          if (a.destroyed) return;
          void 0 === t && (t = a.params.speed);
          let r = a.grid && a.params.grid && a.params.grid.rows > 1,
            l = e;
          if (a.params.loop) {
            if (a.virtual && a.params.virtual.enabled)
              l += a.virtual.slidesBefore;
            else {
              let n;
              if (r) {
                let o = l * a.params.grid.rows;
                n = a.slides.find(
                  (e) => 1 * e.getAttribute("data-swiper-slide-index") === o
                ).column;
              } else n = a.getSlideIndexByData(l);
              let d = r
                  ? Math.ceil(a.slides.length / a.params.grid.rows)
                  : a.slides.length,
                { centeredSlides: p } = a.params,
                c = a.params.slidesPerView;
              "auto" === c
                ? (c = a.slidesPerViewDynamic())
                : ((c = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
                  p && c % 2 == 0 && (c += 1));
              let u = d - n < c;
              if (
                (p && (u = u || n < Math.ceil(c / 2)),
                i && p && "auto" !== a.params.slidesPerView && !r && (u = !1),
                u)
              ) {
                let m = p
                  ? n < a.activeIndex
                    ? "prev"
                    : "next"
                  : n - a.activeIndex - 1 < a.params.slidesPerView
                  ? "next"
                  : "prev";
                a.loopFix({
                  direction: m,
                  slideTo: !0,
                  activeSlideIndex: "next" === m ? n + 1 : n - d + 1,
                  slideRealIndex: "next" === m ? a.realIndex : void 0,
                });
              }
              if (r) {
                let h = l * a.params.grid.rows;
                l = a.slides.find(
                  (e) => 1 * e.getAttribute("data-swiper-slide-index") === h
                ).column;
              } else l = a.getSlideIndexByData(l);
            }
          }
          return (
            requestAnimationFrame(() => {
              a.slideTo(l, t, s, i);
            }),
            a
          );
        },
        slideNext: function (e, t, s) {
          void 0 === t && (t = !0);
          let i = this,
            { enabled: a, params: r, animating: l } = i;
          if (!a || i.destroyed) return i;
          void 0 === e && (e = i.params.speed);
          let n = r.slidesPerGroup;
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            (n = Math.max(i.slidesPerViewDynamic("current", !0), 1));
          let o = i.activeIndex < r.slidesPerGroupSkip ? 1 : n,
            d = i.virtual && r.virtual.enabled;
          if (r.loop) {
            if (l && !d && r.loopPreventsSliding) return !1;
            if (
              (i.loopFix({ direction: "next" }),
              (i._clientLeft = i.wrapperEl.clientLeft),
              i.activeIndex === i.slides.length - 1 && r.cssMode)
            )
              return (
                requestAnimationFrame(() => {
                  i.slideTo(i.activeIndex + o, e, t, s);
                }),
                !0
              );
          }
          return r.rewind && i.isEnd
            ? i.slideTo(0, e, t, s)
            : i.slideTo(i.activeIndex + o, e, t, s);
        },
        slidePrev: function (e, t, s) {
          void 0 === t && (t = !0);
          let i = this,
            {
              params: a,
              snapGrid: r,
              slidesGrid: l,
              rtlTranslate: n,
              enabled: o,
              animating: d,
            } = i;
          if (!o || i.destroyed) return i;
          void 0 === e && (e = i.params.speed);
          let p = i.virtual && a.virtual.enabled;
          if (a.loop) {
            if (d && !p && a.loopPreventsSliding) return !1;
            i.loopFix({ direction: "prev" }),
              (i._clientLeft = i.wrapperEl.clientLeft);
          }
          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          let u = c(n ? i.translate : -i.translate),
            m = r.map((e) => c(e)),
            h = a.freeMode && a.freeMode.enabled,
            f = r[m.indexOf(u) - 1];
          if (void 0 === f && (a.cssMode || h)) {
            let g;
            r.forEach((e, t) => {
              u >= e && (g = t);
            }),
              void 0 !== g && (f = h ? r[g] : r[g > 0 ? g - 1 : g]);
          }
          let v = 0;
          if (
            (void 0 !== f &&
              ((v = l.indexOf(f)) < 0 && (v = i.activeIndex - 1),
              "auto" === a.slidesPerView &&
                1 === a.slidesPerGroup &&
                a.slidesPerGroupAuto &&
                (v = Math.max(
                  (v = v - i.slidesPerViewDynamic("previous", !0) + 1),
                  0
                ))),
            a.rewind && i.isBeginning)
          ) {
            let $ =
              i.params.virtual && i.params.virtual.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
            return i.slideTo($, e, t, s);
          }
          return a.loop && 0 === i.activeIndex && a.cssMode
            ? (requestAnimationFrame(() => {
                i.slideTo(v, e, t, s);
              }),
              !0)
            : i.slideTo(v, e, t, s);
        },
        slideReset: function (e, t, s) {
          if ((void 0 === t && (t = !0), !this.destroyed))
            return (
              void 0 === e && (e = this.params.speed),
              this.slideTo(this.activeIndex, e, t, s)
            );
        },
        slideToClosest: function (e, t, s, i) {
          if (
            (void 0 === t && (t = !0),
            void 0 === i && (i = 0.5),
            this.destroyed)
          )
            return;
          void 0 === e && (e = this.params.speed);
          let a = this.activeIndex,
            r = Math.min(this.params.slidesPerGroupSkip, a),
            l = r + Math.floor((a - r) / this.params.slidesPerGroup),
            n = this.rtlTranslate ? this.translate : -this.translate;
          if (n >= this.snapGrid[l]) {
            let o = this.snapGrid[l];
            n - o > (this.snapGrid[l + 1] - o) * i &&
              (a += this.params.slidesPerGroup);
          } else {
            let d = this.snapGrid[l - 1];
            n - d <= (this.snapGrid[l] - d) * i &&
              (a -= this.params.slidesPerGroup);
          }
          return (
            (a = Math.min((a = Math.max(a, 0)), this.slidesGrid.length - 1)),
            this.slideTo(a, e, t, s)
          );
        },
        slideToClickedSlide: function () {
          let e = this;
          if (e.destroyed) return;
          let { params: t, slidesEl: s } = e,
            i =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView,
            a,
            r = e.clickedIndex,
            l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
          if (t.loop) {
            if (e.animating) return;
            (a = parseInt(
              e.clickedSlide.getAttribute("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? r < e.loopedSlides - i / 2 ||
                  r > e.slides.length - e.loopedSlides + i / 2
                  ? (e.loopFix(),
                    (r = e.getSlideIndex(
                      f(s, `${l}[data-swiper-slide-index="${a}"]`)[0]
                    )),
                    n(() => {
                      e.slideTo(r);
                    }))
                  : e.slideTo(r)
                : r > e.slides.length - i
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    f(s, `${l}[data-swiper-slide-index="${a}"]`)[0]
                  )),
                  n(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r);
          } else e.slideTo(r);
        },
      },
      loop: {
        loopCreate: function (e, t) {
          let s = this,
            { params: i, slidesEl: a } = s;
          if (!i.loop || (s.virtual && s.params.virtual.enabled)) return;
          let r = () => {
              f(a, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
                e.setAttribute("data-swiper-slide-index", t);
              });
            },
            l = s.grid && i.grid && i.grid.rows > 1,
            n = i.slidesPerGroup * (l ? i.grid.rows : 1),
            o = s.slides.length % n != 0,
            d = l && s.slides.length % i.grid.rows != 0,
            p = (e) => {
              for (let t = 0; t < e; t += 1) {
                let a = s.isElement
                  ? v("swiper-slide", [i.slideBlankClass])
                  : v("div", [i.slideClass, i.slideBlankClass]);
                s.slidesEl.append(a);
              }
            };
          o
            ? (i.loopAddBlankSlides
                ? (p(n - (s.slides.length % n)),
                  s.recalcSlides(),
                  s.updateSlides())
                : g(
                    "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                  ),
              r())
            : (d &&
                (i.loopAddBlankSlides
                  ? (p(i.grid.rows - (s.slides.length % i.grid.rows)),
                    s.recalcSlides(),
                    s.updateSlides())
                  : g(
                      "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                    )),
              r()),
            s.loopFix({
              slideRealIndex: e,
              direction: i.centeredSlides ? void 0 : "next",
              initial: t,
            });
        },
        loopFix: function (e) {
          let {
              slideRealIndex: t,
              slideTo: s = !0,
              direction: i,
              setTranslate: a,
              activeSlideIndex: r,
              initial: l,
              byController: n,
              byMousewheel: o,
            } = void 0 === e ? {} : e,
            d = this;
          if (!d.params.loop) return;
          d.emit("beforeLoopFix");
          let {
              slides: p,
              allowSlidePrev: c,
              allowSlideNext: u,
              slidesEl: m,
              params: h,
            } = d,
            { centeredSlides: f, initialSlide: v } = h;
          if (
            ((d.allowSlidePrev = !0),
            (d.allowSlideNext = !0),
            d.virtual && h.virtual.enabled)
          )
            return (
              s &&
                (h.centeredSlides || 0 !== d.snapIndex
                  ? h.centeredSlides && d.snapIndex < h.slidesPerView
                    ? d.slideTo(
                        d.virtual.slides.length + d.snapIndex,
                        0,
                        !1,
                        !0
                      )
                    : d.snapIndex === d.snapGrid.length - 1 &&
                      d.slideTo(d.virtual.slidesBefore, 0, !1, !0)
                  : d.slideTo(d.virtual.slides.length, 0, !1, !0)),
              (d.allowSlidePrev = c),
              (d.allowSlideNext = u),
              void d.emit("loopFix")
            );
          let $ = h.slidesPerView;
          "auto" === $
            ? ($ = d.slidesPerViewDynamic())
            : (($ = Math.ceil(parseFloat(h.slidesPerView, 10))),
              f && $ % 2 == 0 && ($ += 1));
          let w = h.slidesPerGroupAuto ? $ : h.slidesPerGroup,
            y = w;
          y % w != 0 && (y += w - (y % w)),
            (y += h.loopAdditionalSlides),
            (d.loopedSlides = y);
          let b = d.grid && h.grid && h.grid.rows > 1;
          p.length < $ + y ||
          ("cards" === d.params.effect && p.length < $ + 2 * y)
            ? g(
                "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
              )
            : b &&
              "row" === h.grid.fill &&
              g(
                "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
              );
          let _ = [],
            E = [],
            x = b ? Math.ceil(p.length / h.grid.rows) : p.length,
            S = l && x - v < $ && !f,
            T = S ? v : d.activeIndex;
          void 0 === r
            ? (r = d.getSlideIndex(
                p.find((e) => e.classList.contains(h.slideActiveClass))
              ))
            : (T = r);
          let C = "next" === i || !i,
            P = "prev" === i || !i,
            L = 0,
            M = 0,
            z = (b ? p[r].column : r) + (f && void 0 === a ? -$ / 2 + 0.5 : 0);
          if (z < y) {
            L = Math.max(y - z, w);
            for (let k = 0; k < y - z; k += 1) {
              let I = k - Math.floor(k / x) * x;
              if (b) {
                let A = x - I - 1;
                for (let D = p.length - 1; D >= 0; D -= 1)
                  p[D].column === A && _.push(D);
              } else _.push(x - I - 1);
            }
          } else if (z + $ > x - y) {
            (M = Math.max(z - (x - 2 * y), w)),
              S && (M = Math.max(M, $ - x + v + 1));
            for (let O = 0; O < M; O += 1) {
              let G = O - Math.floor(O / x) * x;
              b
                ? p.forEach((e, t) => {
                    e.column === G && E.push(t);
                  })
                : E.push(G);
            }
          }
          if (
            ((d.__preventObserver__ = !0),
            requestAnimationFrame(() => {
              d.__preventObserver__ = !1;
            }),
            "cards" === d.params.effect &&
              p.length < $ + 2 * y &&
              (E.includes(r) && E.splice(E.indexOf(r), 1),
              _.includes(r) && _.splice(_.indexOf(r), 1)),
            P &&
              _.forEach((e) => {
                (p[e].swiperLoopMoveDOM = !0),
                  m.prepend(p[e]),
                  (p[e].swiperLoopMoveDOM = !1);
              }),
            C &&
              E.forEach((e) => {
                (p[e].swiperLoopMoveDOM = !0),
                  m.append(p[e]),
                  (p[e].swiperLoopMoveDOM = !1);
              }),
            d.recalcSlides(),
            "auto" === h.slidesPerView
              ? d.updateSlides()
              : b &&
                ((_.length > 0 && P) || (E.length > 0 && C)) &&
                d.slides.forEach((e, t) => {
                  d.grid.updateSlide(t, e, d.slides);
                }),
            h.watchSlidesProgress && d.updateSlidesOffset(),
            s)
          ) {
            if (_.length > 0 && P) {
              if (void 0 === t) {
                let X = d.slidesGrid[T],
                  Y = d.slidesGrid[T + L] - X;
                o
                  ? d.setTranslate(d.translate - Y)
                  : (d.slideTo(T + Math.ceil(L), 0, !1, !0),
                    a &&
                      ((d.touchEventsData.startTranslate =
                        d.touchEventsData.startTranslate - Y),
                      (d.touchEventsData.currentTranslate =
                        d.touchEventsData.currentTranslate - Y)));
              } else if (a) {
                let B = b ? _.length / h.grid.rows : _.length;
                d.slideTo(d.activeIndex + B, 0, !1, !0),
                  (d.touchEventsData.currentTranslate = d.translate);
              }
            } else if (E.length > 0 && C) {
              if (void 0 === t) {
                let H = d.slidesGrid[T],
                  N = d.slidesGrid[T - M] - H;
                o
                  ? d.setTranslate(d.translate - N)
                  : (d.slideTo(T - M, 0, !1, !0),
                    a &&
                      ((d.touchEventsData.startTranslate =
                        d.touchEventsData.startTranslate - N),
                      (d.touchEventsData.currentTranslate =
                        d.touchEventsData.currentTranslate - N)));
              } else {
                let R = b ? E.length / h.grid.rows : E.length;
                d.slideTo(d.activeIndex - R, 0, !1, !0);
              }
            }
          }
          if (
            ((d.allowSlidePrev = c),
            (d.allowSlideNext = u),
            d.controller && d.controller.control && !n)
          ) {
            let V = {
              slideRealIndex: t,
              direction: i,
              setTranslate: a,
              activeSlideIndex: r,
              byController: !0,
            };
            Array.isArray(d.controller.control)
              ? d.controller.control.forEach((e) => {
                  !e.destroyed &&
                    e.params.loop &&
                    e.loopFix({
                      ...V,
                      slideTo: e.params.slidesPerView === h.slidesPerView && s,
                    });
                })
              : d.controller.control instanceof d.constructor &&
                d.controller.control.params.loop &&
                d.controller.control.loopFix({
                  ...V,
                  slideTo:
                    d.controller.control.params.slidesPerView ===
                      h.slidesPerView && s,
                });
          }
          d.emit("loopFix");
        },
        loopDestroy: function () {
          let { params: e, slidesEl: t } = this;
          if (!e.loop || !t || (this.virtual && this.params.virtual.enabled))
            return;
          this.recalcSlides();
          let s = [];
          this.slides.forEach((e) => {
            let t =
              void 0 === e.swiperSlideIndex
                ? 1 * e.getAttribute("data-swiper-slide-index")
                : e.swiperSlideIndex;
            s[t] = e;
          }),
            this.slides.forEach((e) => {
              e.removeAttribute("data-swiper-slide-index");
            }),
            s.forEach((e) => {
              t.append(e);
            }),
            this.recalcSlides(),
            this.slideTo(this.realIndex, 0);
        },
      },
      grabCursor: {
        setGrabCursor: function (e) {
          let t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          let s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          let e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          let e = this,
            { params: t } = e;
          (e.onTouchStart = Y.bind(e)),
            (e.onTouchMove = B.bind(e)),
            (e.onTouchEnd = H.bind(e)),
            (e.onDocumentTouchStart = q.bind(e)),
            t.cssMode && (e.onScroll = V.bind(e)),
            (e.onClick = R.bind(e)),
            (e.onLoad = W.bind(e)),
            F(e, "on");
        },
        detachEvents: function () {
          F(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          let e = this,
            { realIndex: t, initialized: s, params: a, el: r } = e,
            l = a.breakpoints;
          if (!l || (l && 0 === Object.keys(l).length)) return;
          let n = i(),
            o =
              "window" !== a.breakpointsBase && a.breakpointsBase
                ? "container"
                : a.breakpointsBase,
            d =
              ["window", "container"].includes(a.breakpointsBase) ||
              !a.breakpointsBase
                ? e.el
                : n.querySelector(a.breakpointsBase),
            p = e.getBreakpoint(l, o, d);
          if (!p || e.currentBreakpoint === p) return;
          let u = (p in l ? l[p] : void 0) || e.originalParams,
            m = j(e, a),
            h = j(e, u),
            f = e.params.grabCursor,
            g = u.grabCursor,
            v = a.enabled;
          m && !h
            ? (r.classList.remove(
                `${a.containerModifierClass}grid`,
                `${a.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !m &&
              h &&
              (r.classList.add(`${a.containerModifierClass}grid`),
              ((u.grid.fill && "column" === u.grid.fill) ||
                (!u.grid.fill && "column" === a.grid.fill)) &&
                r.classList.add(`${a.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            f && !g ? e.unsetGrabCursor() : !f && g && e.setGrabCursor(),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === u[t]) return;
              let s = a[t] && a[t].enabled,
                i = u[t] && u[t].enabled;
              s && !i && e[t].disable(), !s && i && e[t].enable();
            });
          let $ = u.direction && u.direction !== a.direction,
            w = a.loop && (u.slidesPerView !== a.slidesPerView || $),
            y = a.loop;
          $ && s && e.changeDirection(), c(e.params, u);
          let b = e.params.enabled,
            _ = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            v && !b ? e.disable() : !v && b && e.enable(),
            (e.currentBreakpoint = p),
            e.emit("_beforeBreakpoint", u),
            s &&
              (w
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !y && _
                ? (e.loopCreate(t), e.updateSlides())
                : y && !_ && e.loopDestroy()),
            e.emit("breakpoint", u);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1,
            a = r(),
            l = "window" === t ? a.innerHeight : s.clientHeight,
            n = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                let t = parseFloat(e.substr(1));
                return { value: l * t, point: e };
              }
              return { value: e, point: e };
            });
          n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let o = 0; o < n.length; o += 1) {
            let { point: d, value: p } = n[o];
            "window" === t
              ? a.matchMedia(`(min-width: ${p}px)`).matches && (i = d)
              : p <= s.clientWidth && (i = d);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          let e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            let a = e.slides.length - 1,
              r = e.slidesGrid[a] + e.slidesSizesGrid[a] + 2 * i;
            e.isLocked = e.size > r;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          let { classNames: e, params: t, rtl: s, el: i, device: a } = this,
            r = (function (e, t) {
              let s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                t.direction,
                { "free-mode": this.params.freeMode && t.freeMode.enabled },
                { autoheight: t.autoHeight },
                { rtl: s },
                { grid: t.grid && t.grid.rows > 1 },
                {
                  "grid-column":
                    t.grid && t.grid.rows > 1 && "column" === t.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": t.cssMode },
                { centered: t.cssMode && t.centeredSlides },
                { "watch-progress": t.watchSlidesProgress },
              ],
              t.containerModifierClass
            );
          e.push(...r), i.classList.add(...e), this.emitContainerClasses();
        },
        removeClasses: function () {
          let { el: e, classNames: t } = this;
          e &&
            "string" != typeof e &&
            (e.classList.remove(...t), this.emitContainerClasses());
        },
      },
    },
    Z = {};
  class Q {
    constructor() {
      let e, t;
      for (var s = arguments.length, a = Array(s), r = 0; r < s; r++)
        a[r] = arguments[r];
      1 === a.length &&
      a[0].constructor &&
      "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
        ? (t = a[0])
        : ([e, t] = a),
        t || (t = {}),
        (t = c({}, t)),
        e && !t.el && (t.el = e);
      let l = i();
      if (
        t.el &&
        "string" == typeof t.el &&
        l.querySelectorAll(t.el).length > 1
      ) {
        let n = [];
        return (
          l.querySelectorAll(t.el).forEach((e) => {
            let s = c({}, t, { el: e });
            n.push(new Q(s));
          }),
          n
        );
      }
      let o = this;
      (o.__swiper__ = !0),
        (o.support = L()),
        (o.device = M({ userAgent: t.userAgent })),
        (o.browser = z()),
        (o.eventsListeners = {}),
        (o.eventsAnyListeners = []),
        (o.modules = [...o.__modules__]),
        t.modules && Array.isArray(t.modules) && o.modules.push(...t.modules);
      let d = {};
      o.modules.forEach((e) => {
        var s, i;
        e({
          params: t,
          swiper: o,
          extendParams:
            ((s = t),
            (i = d),
            function (e) {
              void 0 === e && (e = {});
              let t = Object.keys(e)[0],
                a = e[t];
              "object" == typeof a &&
                null !== a &&
                (!0 === s[t] && (s[t] = { enabled: !0 }),
                "navigation" === t &&
                  s[t] &&
                  s[t].enabled &&
                  !s[t].prevEl &&
                  !s[t].nextEl &&
                  (s[t].auto = !0),
                ["pagination", "scrollbar"].indexOf(t) >= 0 &&
                  s[t] &&
                  s[t].enabled &&
                  !s[t].el &&
                  (s[t].auto = !0),
                t in s &&
                  "enabled" in a &&
                  ("object" != typeof s[t] ||
                    "enabled" in s[t] ||
                    (s[t].enabled = !0),
                  s[t] || (s[t] = { enabled: !1 }))),
                c(i, e);
            }),
          on: o.on.bind(o),
          once: o.once.bind(o),
          off: o.off.bind(o),
          emit: o.emit.bind(o),
        });
      });
      let p = c({}, U, d);
      return (
        (o.params = c({}, p, Z, t)),
        (o.originalParams = c({}, o.params)),
        (o.passedParams = c({}, t)),
        o.params &&
          o.params.on &&
          Object.keys(o.params.on).forEach((e) => {
            o.on(e, o.params.on[e]);
          }),
        o.params && o.params.onAny && o.onAny(o.params.onAny),
        Object.assign(o, {
          enabled: o.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === o.params.direction,
          isVertical: () => "vertical" === o.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return 8388608 * Math.trunc(this.translate / 8388608);
          },
          allowSlideNext: o.params.allowSlideNext,
          allowSlidePrev: o.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: o.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: o.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        o.emit("_swiper"),
        o.params.init && o.init(),
        o
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      let { slidesEl: t, params: s } = this,
        i = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
      return y(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.find(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
        )
      );
    }
    recalcSlides() {
      let { slidesEl: e, params: t } = this;
      this.slides = f(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      let e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      let e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      e = Math.min(Math.max(e, 0), 1);
      let s = this.minTranslate(),
        i = (this.maxTranslate() - s) * e + s;
      this.translateTo(i, void 0 === t ? 0 : t),
        this.updateActiveIndex(),
        this.updateSlidesClasses();
    }
    emitContainerClasses() {
      let e = this;
      if (!e.params._emitClasses || !e.el) return;
      let t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      let t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
    }
    emitSlidesClasses() {
      let e = this;
      if (!e.params._emitClasses || !e.el) return;
      let t = [];
      e.slides.forEach((s) => {
        let i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      let {
          params: s,
          slides: i,
          slidesGrid: a,
          slidesSizesGrid: r,
          size: l,
          activeIndex: n,
        } = this,
        o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let d,
          p = i[n] ? Math.ceil(i[n].swiperSlideSize) : 0;
        for (let c = n + 1; c < i.length; c += 1)
          i[c] &&
            !d &&
            ((p += Math.ceil(i[c].swiperSlideSize)),
            (o += 1),
            p > l && (d = !0));
        for (let u = n - 1; u >= 0; u -= 1)
          i[u] &&
            !d &&
            ((p += i[u].swiperSlideSize), (o += 1), p > l && (d = !0));
      } else if ("current" === e)
        for (let m = n + 1; m < i.length; m += 1)
          (t ? a[m] + r[m] - a[n] < l : a[m] - a[n] < l) && (o += 1);
      else for (let h = n - 1; h >= 0; h -= 1) a[n] - a[h] < l && (o += 1);
      return o;
    }
    update() {
      let e = this;
      if (!e || e.destroyed) return;
      let { snapGrid: t, params: s } = e;
      function i() {
        let t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let a;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && A(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          let r = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          a = e.slideTo(r.length - 1, 0, !1, !0);
        } else a = e.slideTo(e.activeIndex, 0, !1, !0);
        a || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      let s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      let t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      let t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          s.parentNode.host.nodeName ===
            t.params.swiperElementNodeName.toUpperCase() &&
          (t.isElement = !0);
      let i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`,
        a =
          s && s.shadowRoot && s.shadowRoot.querySelector
            ? s.shadowRoot.querySelector(i())
            : f(s, i())[0];
      return (
        !a &&
          t.params.createElements &&
          ((a = v("div", t.params.wrapperClass)),
          s.append(a),
          f(s, `.${t.params.slideClass}`).forEach((e) => {
            a.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: a,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : a,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === w(s, "direction")),
          wrongRTL: "-webkit-box" === w(a, "display"),
        }),
        !0
      );
    }
    init(e) {
      let t = this;
      if (t.initialized || !1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            ),
        t.params.loop && t.loopCreate(void 0, !0),
        t.attachEvents();
      let s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? A(t, e)
            : e.addEventListener("load", (e) => {
                A(t, e.target);
              });
        }),
        O(t),
        (t.initialized = !0),
        O(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      let s = this,
        { params: i, el: a, wrapperEl: r, slides: l } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            a && "string" != typeof a && a.removeAttribute("style"),
            r && r.removeAttribute("style"),
            l &&
              l.length &&
              l.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            (s.el && "string" != typeof s.el && (s.el.swiper = null),
            (function (e) {
              let t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (s) {}
                try {
                  delete t[e];
                } catch (i) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      c(Z, e);
    }
    static get extendedDefaults() {
      return Z;
    }
    static get defaults() {
      return U;
    }
    static installModule(e) {
      Q.prototype.__modules__ || (Q.prototype.__modules__ = []);
      let t = Q.prototype.__modules__;
      "function" == typeof e && 0 > t.indexOf(e) && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => Q.installModule(e)), Q)
        : (Q.installModule(e), Q);
    }
  }
  function J(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let r = f(e.el, `.${i[a]}`)[0];
            r || (((r = v("div", i[a])).className = i[a]), e.el.append(r)),
              (s[a] = r),
              (t[a] = r);
          }
        }),
      s
    );
  }
  function ee(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function et(e) {
    let { params: t, slidesEl: s } = this;
    t.loop && this.loopDestroy();
    let i = (e) => {
      if ("string" == typeof e) {
        let t = document.createElement("div");
        (t.innerHTML = e), s.append(t.children[0]), (t.innerHTML = "");
      } else s.append(e);
    };
    if ("object" == typeof e && "length" in e)
      for (let a = 0; a < e.length; a += 1) e[a] && i(e[a]);
    else i(e);
    this.recalcSlides(),
      t.loop && this.loopCreate(),
      (t.observer && !this.isElement) || this.update();
  }
  function es(e) {
    let { params: t, activeIndex: s, slidesEl: i } = this;
    t.loop && this.loopDestroy();
    let a = s + 1,
      r = (e) => {
        if ("string" == typeof e) {
          let t = document.createElement("div");
          (t.innerHTML = e), i.prepend(t.children[0]), (t.innerHTML = "");
        } else i.prepend(e);
      };
    if ("object" == typeof e && "length" in e) {
      for (let l = 0; l < e.length; l += 1) e[l] && r(e[l]);
      a = s + e.length;
    } else r(e);
    this.recalcSlides(),
      t.loop && this.loopCreate(),
      (t.observer && !this.isElement) || this.update(),
      this.slideTo(a, 0, !1);
  }
  function ei(e, t) {
    let { params: s, activeIndex: i, slidesEl: a } = this,
      r = i;
    s.loop &&
      ((r -= this.loopedSlides), this.loopDestroy(), this.recalcSlides());
    let l = this.slides.length;
    if (e <= 0) return void this.prependSlide(t);
    if (e >= l) return void this.appendSlide(t);
    let n = r > e ? r + 1 : r,
      o = [];
    for (let d = l - 1; d >= e; d -= 1) {
      let p = this.slides[d];
      p.remove(), o.unshift(p);
    }
    if ("object" == typeof t && "length" in t) {
      for (let c = 0; c < t.length; c += 1) t[c] && a.append(t[c]);
      n = r > e ? r + t.length : r;
    } else a.append(t);
    for (let u = 0; u < o.length; u += 1) a.append(o[u]);
    this.recalcSlides(),
      s.loop && this.loopCreate(),
      (s.observer && !this.isElement) || this.update(),
      s.loop
        ? this.slideTo(n + this.loopedSlides, 0, !1)
        : this.slideTo(n, 0, !1);
  }
  function ea(e) {
    let { params: t, activeIndex: s } = this,
      i = s;
    t.loop && ((i -= this.loopedSlides), this.loopDestroy());
    let a,
      r = i;
    if ("object" == typeof e && "length" in e) {
      for (let l = 0; l < e.length; l += 1)
        (a = e[l]),
          this.slides[a] && this.slides[a].remove(),
          a < r && (r -= 1);
      r = Math.max(r, 0);
    } else
      (a = e),
        this.slides[a] && this.slides[a].remove(),
        a < r && (r -= 1),
        (r = Math.max(r, 0));
    this.recalcSlides(),
      t.loop && this.loopCreate(),
      (t.observer && !this.isElement) || this.update(),
      t.loop
        ? this.slideTo(r + this.loopedSlides, 0, !1)
        : this.slideTo(r, 0, !1);
  }
  function er() {
    let e = [];
    for (let t = 0; t < this.slides.length; t += 1) e.push(t);
    this.removeSlide(e);
  }
  function el(e) {
    let {
        effect: t,
        swiper: s,
        on: i,
        setTranslate: a,
        setTransition: r,
        overwriteParams: l,
        perspective: n,
        recreateShadows: o,
        getEffectParams: d,
      } = e,
      p;
    i("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        n && n() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      let e = l ? l() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      i("setTranslate", () => {
        s.params.effect === t && a();
      }),
      i("setTransition", (e, i) => {
        s.params.effect === t && r(i);
      }),
      i("transitionEnd", () => {
        s.params.effect === t &&
          o &&
          d &&
          d().slideShadows &&
          (s.slides.forEach((e) => {
            e.querySelectorAll(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            ).forEach((e) => e.remove());
          }),
          o());
      }),
      i("virtualUpdate", () => {
        s.params.effect === t &&
          (s.slides.length || (p = !0),
          requestAnimationFrame(() => {
            p && s.slides && s.slides.length && (a(), (p = !1));
          }));
      });
  }
  function en(e, t) {
    let s = h(t);
    return (
      s !== t &&
        ((s.style.backfaceVisibility = "hidden"),
        (s.style["-webkit-backface-visibility"] = "hidden")),
      s
    );
  }
  function eo(e) {
    let { swiper: t, duration: s, transformElements: i, allSlides: a } = e,
      { activeIndex: r } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let l,
        n = !1;
      (l = a
        ? i
        : i.filter((e) => {
            var s;
            let i = e.classList.contains("swiper-slide-transform")
              ? (s = e).parentElement
                ? s.parentElement
                : t.slides.find(
                    (e) => e.shadowRoot && e.shadowRoot === s.parentNode
                  )
              : e;
            return t.getSlideIndex(i) === r;
          })).forEach((e) => {
        _(e, () => {
          if (n || !t || t.destroyed) return;
          (n = !0), (t.animating = !1);
          let e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          t.wrapperEl.dispatchEvent(e);
        });
      });
    }
  }
  function ed(e, t, s) {
    let i = `swiper-slide-shadow${s ? `-${s}` : ""}${
        e ? ` swiper-slide-shadow-${e}` : ""
      }`,
      a = h(t),
      r = a.querySelector(`.${i.split(" ").join(".")}`);
    return r || ((r = v("div", i.split(" "))), a.append(r)), r;
  }
  Object.keys(K).forEach((e) => {
    Object.keys(K[e]).forEach((t) => {
      Q.prototype[t] = K[e][t];
    });
  }),
    Q.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e,
          a = r(),
          l = null,
          n = null,
          o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== a.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              (l = new ResizeObserver((e) => {
                n = a.requestAnimationFrame(() => {
                  let { width: s, height: i } = t,
                    a = s,
                    r = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: l } = e;
                    (l && l !== t.el) ||
                      ((a = i ? i.width : (s[0] || s).inlineSize),
                      (r = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (a === s && r === i) || o();
                });
              })).observe(t.el)
            : (a.addEventListener("resize", o),
              a.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            n && a.cancelAnimationFrame(n),
              l && l.unobserve && t.el && (l.unobserve(t.el), (l = null)),
              a.removeEventListener("resize", o),
              a.removeEventListener("orientationchange", d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e,
          l = [],
          n = r(),
          o = function (e, s) {
            void 0 === s && (s = {});
            let i = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void a("observerUpdate", e[0]);
                let s = function () {
                  a("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              }
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: t.isElement || (void 0 === s.childList || s).childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              l.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                let e = b(t.hostEl);
                for (let s = 0; s < e.length; s += 1) o(e[s]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            l.forEach((e) => {
              e.disconnect();
            }),
              l.splice(0, l.length);
          });
      },
    ]);
  let ep = [
    function (e) {
      let t,
        { swiper: s, extendParams: a, on: r, emit: l } = e;
      a({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      });
      let n = i();
      s.virtual = {
        cache: {},
        from: void 0,
        to: void 0,
        slides: [],
        offset: 0,
        slidesGrid: [],
      };
      let o = n.createElement("div");
      function d(e, t) {
        let i = s.params.virtual;
        if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t];
        let a;
        return (
          i.renderSlide
            ? "string" == typeof (a = i.renderSlide.call(s, e, t)) &&
              ((o.innerHTML = a), (a = o.children[0]))
            : (a = s.isElement
                ? v("swiper-slide")
                : v("div", s.params.slideClass)),
          a.setAttribute("data-swiper-slide-index", t),
          i.renderSlide || (a.innerHTML = e),
          i.cache && (s.virtual.cache[t] = a),
          a
        );
      }
      function p(e, t, i) {
        let {
          slidesPerView: a,
          slidesPerGroup: r,
          centeredSlides: n,
          loop: o,
          initialSlide: p,
        } = s.params;
        if (t && !o && p > 0) return;
        let { addSlidesBefore: c, addSlidesAfter: u } = s.params.virtual,
          { from: m, to: h, slides: g, slidesGrid: v, offset: $ } = s.virtual;
        s.params.cssMode || s.updateActiveIndex();
        let w = void 0 === i ? s.activeIndex || 0 : i,
          y,
          b,
          _;
        (y = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
          n
            ? ((b = Math.floor(a / 2) + r + u), (_ = Math.floor(a / 2) + r + c))
            : ((b = a + (r - 1) + u), (_ = (o ? a : r) + c));
        let E = w - _,
          x = w + b;
        o || ((E = Math.max(E, 0)), (x = Math.min(x, g.length - 1)));
        let S = (s.slidesGrid[E] || 0) - (s.slidesGrid[0] || 0);
        function T() {
          s.updateSlides(),
            s.updateProgress(),
            s.updateSlidesClasses(),
            l("virtualUpdate");
        }
        if (
          (o && w >= _
            ? ((E -= _), n || (S += s.slidesGrid[0]))
            : o && w < _ && ((E = -_), n && (S += s.slidesGrid[0])),
          Object.assign(s.virtual, {
            from: E,
            to: x,
            offset: S,
            slidesGrid: s.slidesGrid,
            slidesBefore: _,
            slidesAfter: b,
          }),
          m === E && h === x && !e)
        )
          return (
            s.slidesGrid !== v &&
              S !== $ &&
              s.slides.forEach((e) => {
                e.style[y] = S - Math.abs(s.cssOverflowAdjustment()) + "px";
              }),
            s.updateProgress(),
            void l("virtualUpdate")
          );
        if (s.params.virtual.renderExternal)
          return (
            s.params.virtual.renderExternal.call(s, {
              offset: S,
              from: E,
              to: x,
              slides: (function () {
                let e = [];
                for (let t = E; t <= x; t += 1) e.push(g[t]);
                return e;
              })(),
            }),
            void (s.params.virtual.renderExternalUpdate
              ? T()
              : l("virtualUpdate"))
          );
        let C = [],
          P = [],
          L = (e) => {
            let t = e;
            return (
              e < 0 ? (t = g.length + e) : t >= g.length && (t -= g.length), t
            );
          };
        if (e)
          s.slides
            .filter((e) => e.matches(`.${s.params.slideClass}, swiper-slide`))
            .forEach((e) => {
              e.remove();
            });
        else
          for (let M = m; M <= h; M += 1)
            if (M < E || M > x) {
              let z = L(M);
              s.slides
                .filter((e) =>
                  e.matches(
                    `.${s.params.slideClass}[data-swiper-slide-index="${z}"], swiper-slide[data-swiper-slide-index="${z}"]`
                  )
                )
                .forEach((e) => {
                  e.remove();
                });
            }
        let k = o ? -g.length : 0,
          I = o ? 2 * g.length : g.length;
        for (let A = k; A < I; A += 1)
          if (A >= E && A <= x) {
            let D = L(A);
            void 0 === h || e
              ? P.push(D)
              : (A > h && P.push(D), A < m && C.push(D));
          }
        if (
          (P.forEach((e) => {
            s.slidesEl.append(d(g[e], e));
          }),
          o)
        )
          for (let O = C.length - 1; O >= 0; O -= 1) {
            let G = C[O];
            s.slidesEl.prepend(d(g[G], G));
          }
        else
          C.sort((e, t) => t - e),
            C.forEach((e) => {
              s.slidesEl.prepend(d(g[e], e));
            });
        f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e) => {
          e.style[y] = S - Math.abs(s.cssOverflowAdjustment()) + "px";
        }),
          T();
      }
      r("beforeInit", () => {
        if (!s.params.virtual.enabled) return;
        let e;
        if (void 0 === s.passedParams.virtual.slides) {
          let t = [...s.slidesEl.children].filter((e) =>
            e.matches(`.${s.params.slideClass}, swiper-slide`)
          );
          t &&
            t.length &&
            ((s.virtual.slides = [...t]),
            (e = !0),
            t.forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t),
                (s.virtual.cache[t] = e),
                e.remove();
            }));
        }
        e || (s.virtual.slides = s.params.virtual.slides),
          s.classNames.push(`${s.params.containerModifierClass}virtual`),
          (s.params.watchSlidesProgress = !0),
          (s.originalParams.watchSlidesProgress = !0),
          p(!1, !0);
      }),
        r("setTranslate", () => {
          s.params.virtual.enabled &&
            (s.params.cssMode && !s._immediateVirtual
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  p();
                }, 100)))
              : p());
        }),
        r("init update resize", () => {
          s.params.virtual.enabled &&
            s.params.cssMode &&
            u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
        }),
        Object.assign(s.virtual, {
          appendSlide: function (e) {
            if ("object" == typeof e && "length" in e)
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.push(e[t]);
            else s.virtual.slides.push(e);
            p(!0);
          },
          prependSlide: function (e) {
            let t = s.activeIndex,
              i = t + 1,
              a = 1;
            if (Array.isArray(e)) {
              for (let r = 0; r < e.length; r += 1)
                e[r] && s.virtual.slides.unshift(e[r]);
              (i = t + e.length), (a = e.length);
            } else s.virtual.slides.unshift(e);
            if (s.params.virtual.cache) {
              let l = s.virtual.cache,
                n = {};
              Object.keys(l).forEach((e) => {
                let t = l[e],
                  s = t.getAttribute("data-swiper-slide-index");
                s &&
                  t.setAttribute(
                    "data-swiper-slide-index",
                    parseInt(s, 10) + a
                  ),
                  (n[parseInt(e, 10) + a] = t);
              }),
                (s.virtual.cache = n);
            }
            p(!0), s.slideTo(i, 0);
          },
          removeSlide: function (e) {
            if (null == e) return;
            let t = s.activeIndex;
            if (Array.isArray(e))
              for (let i = e.length - 1; i >= 0; i -= 1)
                s.params.virtual.cache &&
                  (delete s.virtual.cache[e[i]],
                  Object.keys(s.virtual.cache).forEach((t) => {
                    t > e &&
                      ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                      s.virtual.cache[t - 1].setAttribute(
                        "data-swiper-slide-index",
                        t - 1
                      ),
                      delete s.virtual.cache[t]);
                  })),
                  s.virtual.slides.splice(e[i], 1),
                  e[i] < t && (t -= 1),
                  (t = Math.max(t, 0));
            else
              s.params.virtual.cache &&
                (delete s.virtual.cache[e],
                Object.keys(s.virtual.cache).forEach((t) => {
                  t > e &&
                    ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                    s.virtual.cache[t - 1].setAttribute(
                      "data-swiper-slide-index",
                      t - 1
                    ),
                    delete s.virtual.cache[t]);
                })),
                s.virtual.slides.splice(e, 1),
                e < t && (t -= 1),
                (t = Math.max(t, 0));
            p(!0), s.slideTo(t, 0);
          },
          removeAllSlides: function () {
            (s.virtual.slides = []),
              s.params.virtual.cache && (s.virtual.cache = {}),
              p(!0),
              s.slideTo(0, 0);
          },
          update: p,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: l } = e,
        n = i(),
        o = r();
      function d(e) {
        if (!t.enabled) return;
        let { rtlTranslate: s } = t,
          i = e;
        i.originalEvent && (i = i.originalEvent);
        let a = i.keyCode || i.charCode,
          r = t.params.keyboard.pageUpDown,
          d = r && 33 === a,
          p = r && 34 === a,
          c = 37 === a,
          u = 39 === a,
          m = 38 === a,
          h = 40 === a;
        if (
          (!t.allowSlideNext &&
            ((t.isHorizontal() && u) || (t.isVertical() && h) || p)) ||
          (!t.allowSlidePrev &&
            ((t.isHorizontal() && c) || (t.isVertical() && m) || d))
        )
          return !1;
        if (
          !(
            i.shiftKey ||
            i.altKey ||
            i.ctrlKey ||
            i.metaKey ||
            (n.activeElement &&
              n.activeElement.nodeName &&
              ("input" === n.activeElement.nodeName.toLowerCase() ||
                "textarea" === n.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (d || p || c || u || m || h)
          ) {
            let f = !1;
            if (
              b(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 &&
              0 === b(t.el, `.${t.params.slideActiveClass}`).length
            )
              return;
            let g = t.el,
              v = g.clientWidth,
              w = g.clientHeight,
              y = o.innerWidth,
              _ = o.innerHeight,
              E = $(g);
            s && (E.left -= g.scrollLeft);
            let x = [
              [E.left, E.top],
              [E.left + v, E.top],
              [E.left, E.top + w],
              [E.left + v, E.top + w],
            ];
            for (let S = 0; S < x.length; S += 1) {
              let T = x[S];
              if (T[0] >= 0 && T[0] <= y && T[1] >= 0 && T[1] <= _) {
                if (0 === T[0] && 0 === T[1]) continue;
                f = !0;
              }
            }
            if (!f) return;
          }
          t.isHorizontal()
            ? ((d || p || c || u) &&
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              (((p || u) && !s) || ((d || c) && s)) && t.slideNext(),
              (((d || c) && !s) || ((p || u) && s)) && t.slidePrev())
            : ((d || p || m || h) &&
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              (p || h) && t.slideNext(),
              (d || m) && t.slidePrev()),
            l("keyPress", a);
        }
      }
      function p() {
        t.keyboard.enabled ||
          (n.addEventListener("keydown", d), (t.keyboard.enabled = !0));
      }
      function c() {
        t.keyboard.enabled &&
          (n.removeEventListener("keydown", d), (t.keyboard.enabled = !1));
      }
      (t.keyboard = { enabled: !1 }),
        s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        a("init", () => {
          t.params.keyboard.enabled && p();
        }),
        a("destroy", () => {
          t.keyboard.enabled && c();
        }),
        Object.assign(t.keyboard, { enable: p, disable: c });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e,
        l = r(),
        d;
      s({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: "container",
          thresholdDelta: null,
          thresholdTime: null,
          noMousewheelClass: "swiper-no-mousewheel",
        },
      }),
        (t.mousewheel = { enabled: !1 });
      let p,
        c = o(),
        u = [];
      function m() {
        t.enabled && (t.mouseEntered = !0);
      }
      function h() {
        t.enabled && (t.mouseEntered = !1);
      }
      function f(e) {
        return (
          !(
            t.params.mousewheel.thresholdDelta &&
            e.delta < t.params.mousewheel.thresholdDelta
          ) &&
          !(
            t.params.mousewheel.thresholdTime &&
            o() - c < t.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && o() - c < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), a("scroll", e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), a("scroll", e.raw)),
            (c = new l.Date().getTime()),
            !1))
        );
      }
      function g(e) {
        var s;
        let i = e,
          r = !0;
        if (
          !t.enabled ||
          e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`)
        )
          return;
        let l = t.params.mousewheel;
        t.params.cssMode && i.preventDefault();
        let c = t.el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (c = document.querySelector(t.params.mousewheel.eventsTarget));
        let m = c && c.contains(i.target);
        if (!t.mouseEntered && !m && !l.releaseOnEdges) return !0;
        i.originalEvent && (i = i.originalEvent);
        let h = 0,
          g,
          v,
          $,
          w,
          y = t.rtlTranslate ? -1 : 1,
          b =
            ((s = i),
            (g = 0),
            (v = 0),
            ($ = 0),
            (w = 0),
            "detail" in s && (v = s.detail),
            "wheelDelta" in s && (v = -s.wheelDelta / 120),
            "wheelDeltaY" in s && (v = -s.wheelDeltaY / 120),
            "wheelDeltaX" in s && (g = -s.wheelDeltaX / 120),
            "axis" in s && s.axis === s.HORIZONTAL_AXIS && ((g = v), (v = 0)),
            ($ = 10 * g),
            (w = 10 * v),
            "deltaY" in s && (w = s.deltaY),
            "deltaX" in s && ($ = s.deltaX),
            s.shiftKey && !$ && (($ = w), (w = 0)),
            ($ || w) &&
              s.deltaMode &&
              (1 === s.deltaMode
                ? (($ *= 40), (w *= 40))
                : (($ *= 800), (w *= 800))),
            $ && !g && (g = $ < 1 ? -1 : 1),
            w && !v && (v = w < 1 ? -1 : 1),
            { spinX: g, spinY: v, pixelX: $, pixelY: w });
        if (l.forceToAxis) {
          if (t.isHorizontal()) {
            if (!(Math.abs(b.pixelX) > Math.abs(b.pixelY))) return !0;
            h = -b.pixelX * y;
          } else {
            if (!(Math.abs(b.pixelY) > Math.abs(b.pixelX))) return !0;
            h = -b.pixelY;
          }
        } else
          h =
            Math.abs(b.pixelX) > Math.abs(b.pixelY) ? -b.pixelX * y : -b.pixelY;
        if (0 === h) return !0;
        l.invert && (h = -h);
        let _ = t.getTranslate() + h * l.sensitivity;
        if (
          (_ >= t.minTranslate() && (_ = t.minTranslate()),
          _ <= t.maxTranslate() && (_ = t.maxTranslate()),
          (r =
            !!t.params.loop ||
            !(_ === t.minTranslate() || _ === t.maxTranslate())) &&
            t.params.nested &&
            i.stopPropagation(),
          t.params.freeMode && t.params.freeMode.enabled)
        ) {
          let E = { time: o(), delta: Math.abs(h), direction: Math.sign(h) },
            x =
              p &&
              E.time < p.time + 500 &&
              E.delta <= p.delta &&
              E.direction === p.direction;
          if (!x) {
            p = void 0;
            let S = t.getTranslate() + h * l.sensitivity,
              T = t.isBeginning,
              C = t.isEnd;
            if (
              (S >= t.minTranslate() && (S = t.minTranslate()),
              S <= t.maxTranslate() && (S = t.maxTranslate()),
              t.setTransition(0),
              t.setTranslate(S),
              t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses(),
              ((!T && t.isBeginning) || (!C && t.isEnd)) &&
                t.updateSlidesClasses(),
              t.params.loop &&
                t.loopFix({
                  direction: E.direction < 0 ? "next" : "prev",
                  byMousewheel: !0,
                }),
              t.params.freeMode.sticky)
            ) {
              clearTimeout(d), (d = void 0), u.length >= 15 && u.shift();
              let P = u.length ? u[u.length - 1] : void 0,
                L = u[0];
              if (
                (u.push(E),
                P && (E.delta > P.delta || E.direction !== P.direction))
              )
                u.splice(0);
              else if (
                u.length >= 15 &&
                E.time - L.time < 500 &&
                L.delta - E.delta >= 1 &&
                E.delta <= 6
              ) {
                let M = h > 0 ? 0.8 : 0.2;
                (p = E),
                  u.splice(0),
                  (d = n(() => {
                    !t.destroyed &&
                      t.params &&
                      t.slideToClosest(t.params.speed, !0, void 0, M);
                  }, 0));
              }
              d ||
                (d = n(() => {
                  !t.destroyed &&
                    t.params &&
                    ((p = E),
                    u.splice(0),
                    t.slideToClosest(t.params.speed, !0, void 0, 0.5));
                }, 500));
            }
            if (
              (x || a("scroll", i),
              t.params.autoplay &&
                t.params.autoplay.disableOnInteraction &&
                t.autoplay.stop(),
              l.releaseOnEdges &&
                (S === t.minTranslate() || S === t.maxTranslate()))
            )
              return !0;
          }
        } else {
          let z = {
            time: o(),
            delta: Math.abs(h),
            direction: Math.sign(h),
            raw: e,
          };
          u.length >= 2 && u.shift();
          let k = u.length ? u[u.length - 1] : void 0;
          if (
            (u.push(z),
            k
              ? (z.direction !== k.direction ||
                  z.delta > k.delta ||
                  z.time > k.time + 150) &&
                f(z)
              : f(z),
            (function (e) {
              let s = t.params.mousewheel;
              if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
              } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(z))
          )
            return !0;
        }
        return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
      }
      function v(e) {
        let s = t.el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (s = document.querySelector(t.params.mousewheel.eventsTarget)),
          s[e]("mouseenter", m),
          s[e]("mouseleave", h),
          s[e]("wheel", g);
      }
      function $() {
        return t.params.cssMode
          ? (t.wrapperEl.removeEventListener("wheel", g), !0)
          : !t.mousewheel.enabled &&
              (v("addEventListener"), (t.mousewheel.enabled = !0), !0);
      }
      function w() {
        return t.params.cssMode
          ? (t.wrapperEl.addEventListener(event, g), !0)
          : !!t.mousewheel.enabled &&
              (v("removeEventListener"), (t.mousewheel.enabled = !1), !0);
      }
      i("init", () => {
        !t.params.mousewheel.enabled && t.params.cssMode && w(),
          t.params.mousewheel.enabled && $();
      }),
        i("destroy", () => {
          t.params.cssMode && $(), t.mousewheel.enabled && w();
        }),
        Object.assign(t.mousewheel, { enable: $, disable: w });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e;
      function r(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          (s = t.el.querySelector(e) || t.hostEl.querySelector(e))
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
              "string" == typeof e &&
              s &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length
                ? (s = t.el.querySelector(e))
                : s && 1 === s.length && (s = s[0])),
            e && !s ? e : s);
      }
      function l(e, s) {
        let i = t.params.navigation;
        (e = x(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function n() {
        let { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return l(s, !1), void l(e, !1);
        l(s, t.isBeginning && !t.params.rewind),
          l(e, t.isEnd && !t.params.rewind);
      }
      function o(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), a("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), a("navigationNext"));
      }
      function p() {
        let e = t.params.navigation;
        if (
          ((t.params.navigation = J(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = r(e.nextEl),
          i = r(e.prevEl);
        Object.assign(t.navigation, { nextEl: s, prevEl: i }),
          (s = x(s)),
          (i = x(i));
        let a = (s, i) => {
          s && s.addEventListener("click", "next" === i ? d : o),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
        };
        s.forEach((e) => a(e, "next")), i.forEach((e) => a(e, "prev"));
      }
      function c() {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = x(e)), (s = x(s));
        let i = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : o),
            e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        i("init", () => {
          !1 === t.params.navigation.enabled ? u() : (p(), n());
        }),
        i("toEdge fromEdge lock unlock", () => {
          n();
        }),
        i("destroy", () => {
          c();
        }),
        i("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = x(e)),
            (s = x(s)),
            t.enabled
              ? n()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass)
                  );
        }),
        i("click", (e, s) => {
          let { nextEl: i, prevEl: r } = t.navigation;
          (i = x(i)), (r = x(r));
          let l = s.target,
            n = r.includes(l) || i.includes(l);
          if (t.isElement && !n) {
            let o = s.path || (s.composedPath && s.composedPath());
            o && (n = o.find((e) => i.includes(e) || r.includes(e)));
          }
          if (t.params.navigation.hideOnClick && !n) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === l || t.pagination.el.contains(l))
            )
              return;
            let d;
            i.length
              ? (d = i[0].classList.contains(t.params.navigation.hiddenClass))
              : r.length &&
                (d = r[0].classList.contains(t.params.navigation.hiddenClass)),
              a(!0 === d ? "navigationShow" : "navigationHide"),
              [...i, ...r]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass)
                );
          }
        });
      let u = () => {
        t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" ")
        ),
          c();
      };
      Object.assign(t.navigation, {
        enable() {
          t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" ")
          ),
            p(),
            n();
        },
        disable: u,
        update: n,
        init: p,
        destroy: c,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e,
        r = "swiper-pagination",
        l;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] });
      let n = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        let { bulletActiveClass: i } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${i}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${i}-${s}-${s}`));
      }
      function p(e) {
        var s, i, a;
        let r = e.target.closest(ee(t.params.pagination.bulletClass));
        if (!r) return;
        e.preventDefault();
        let l = y(r) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === l) return;
          let n =
            ((s = t.realIndex),
            (i = l),
            (i %= a = t.slides.length) == 1 + (s %= a)
              ? "next"
              : i === s - 1
              ? "previous"
              : void 0);
          "next" === n
            ? t.slideNext()
            : "previous" === n
            ? t.slidePrev()
            : t.slideToLoop(l);
        } else t.slideTo(l);
      }
      function c() {
        let e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        let i,
          r,
          p = t.pagination.el;
        p = x(p);
        let c =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          u = t.params.loop
            ? Math.ceil(c / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((r = t.previousRealIndex || 0),
              (i =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
            ? ((i = t.snapIndex), (r = t.previousSnapIndex))
            : ((r = t.previousIndex || 0), (i = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          let m = t.pagination.bullets,
            h,
            f,
            g;
          if (
            (s.dynamicBullets &&
              ((l = E(m[0], t.isHorizontal() ? "width" : "height", !0)),
              p.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  l * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== r &&
                ((n += i - (r || 0)) > s.dynamicMainBullets - 1
                  ? (n = s.dynamicMainBullets - 1)
                  : n < 0 && (n = 0)),
              (g =
                ((f =
                  (h = Math.max(i - n, 0)) +
                  (Math.min(m.length, s.dynamicMainBullets) - 1)) +
                  h) /
                2)),
            m.forEach((e) => {
              let t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e
                )
                .flat();
              e.classList.remove(...t);
            }),
            p.length > 1)
          )
            m.forEach((e) => {
              let a = y(e);
              a === i
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (a >= h &&
                    a <= f &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" ")
                    ),
                  a === h && d(e, "prev"),
                  a === f && d(e, "next"));
            });
          else {
            let v = m[i];
            if (
              (v && v.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                m.forEach((e, t) => {
                  e.setAttribute("part", t === i ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              let $ = m[h],
                w = m[f];
              for (let b = h; b <= f; b += 1)
                m[b] &&
                  m[b].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" ")
                  );
              d($, "prev"), d(w, "next");
            }
          }
          if (s.dynamicBullets) {
            let _ = Math.min(m.length, s.dynamicMainBullets + 4),
              S = (l * _ - l) / 2 - g * l,
              T = e ? "right" : "left";
            m.forEach((e) => {
              e.style[t.isHorizontal() ? T : "top"] = `${S}px`;
            });
          }
        }
        p.forEach((e, r) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(ee(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(i + 1);
              }),
              e.querySelectorAll(ee(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(u);
              })),
            "progressbar" === s.type)
          ) {
            let l;
            l = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
              ? "horizontal"
              : "vertical";
            let n = (i + 1) / u,
              o = 1,
              d = 1;
            "horizontal" === l ? (o = n) : (d = n),
              e.querySelectorAll(ee(s.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${o}) scaleY(${d})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, i + 1, u)),
              0 === r && a("paginationRender", e))
            : (0 === r && a("paginationRender", e), a("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function u() {
        let e = t.params.pagination;
        if (o()) return;
        let s =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length,
          i = t.pagination.el;
        i = x(i);
        let r = "";
        if ("bullets" === e.type) {
          let l = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && l > s && (l = s);
          for (let n = 0; n < l; n += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, n, e.bulletClass))
              : (r += `<${e.bulletElement} ${
                  t.isElement ? 'part="bullet"' : ""
                } class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          i.forEach((s) => {
            "custom" !== e.type && (s.innerHTML = r || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(ee(e.bulletClass))
                );
          }),
          "custom" !== e.type && a("paginationRender", i[0]);
      }
      function m() {
        t.params.pagination = J(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" }
        );
        let e = t.params.pagination;
        if (!e.el) return;
        let s;
        "string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              (s = [...t.el.querySelectorAll(e.el)]).length > 1 &&
              (s = s.find((e) => b(e, ".swiper")[0] === t.el)),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = x(s)).forEach((s) => {
              "bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (n = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", p),
                t.enabled || s.classList.add(e.lockClass);
            }));
      }
      function h() {
        let e = t.params.pagination;
        if (o()) return;
        let s = t.pagination.el;
        s &&
          (s = x(s)).forEach((s) => {
            s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", p));
          }),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" "))
            );
      }
      i("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        let e = t.params.pagination,
          { el: s } = t.pagination;
        (s = x(s)).forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass
            );
        });
      }),
        i("init", () => {
          !1 === t.params.pagination.enabled ? f() : (m(), u(), c());
        }),
        i("activeIndexChange", () => {
          void 0 === t.snapIndex && c();
        }),
        i("snapIndexChange", () => {
          c();
        }),
        i("snapGridLengthChange", () => {
          u(), c();
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            (e = x(e)).forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass
              )
            );
        }),
        i("lock unlock", () => {
          c();
        }),
        i("click", (e, s) => {
          let i = s.target,
            r = x(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !i.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            let l = r[0].classList.contains(t.params.pagination.hiddenClass);
            a(!0 === l ? "paginationShow" : "paginationHide"),
              r.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass)
              );
          }
        });
      let f = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          (e = x(e)).forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass)
          ),
          h();
      };
      Object.assign(t.pagination, {
        enable() {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            (e = x(e)).forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass)
            ),
            m(),
            u(),
            c();
        },
        disable: f,
        render: u,
        update: c,
        init: m,
        destroy: h,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: r } = e,
        o = i(),
        d,
        p,
        c,
        u,
        m = !1,
        h = null,
        f = null;
      function g() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        let { scrollbar: e, rtlTranslate: s } = t,
          { dragEl: i, el: a } = e,
          r = t.params.scrollbar,
          l = t.params.loop ? t.progressLoop : t.progress,
          n = p,
          o = (c - p) * l;
        s
          ? (o = -o) > 0
            ? ((n = p - o), (o = 0))
            : -o + p > c && (n = c + o)
          : o < 0
          ? ((n = p + o), (o = 0))
          : o + p > c && (n = c - o),
          t.isHorizontal()
            ? ((i.style.transform = `translate3d(${o}px, 0, 0)`),
              (i.style.width = `${n}px`))
            : ((i.style.transform = `translate3d(0px, ${o}px, 0)`),
              (i.style.height = `${n}px`)),
          r.hide &&
            (clearTimeout(h),
            (a.style.opacity = 1),
            (h = setTimeout(() => {
              (a.style.opacity = 0), (a.style.transitionDuration = "400ms");
            }, 1e3)));
      }
      function w() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        let { scrollbar: e } = t,
          { dragEl: s, el: i } = e;
        (s.style.width = ""),
          (s.style.height = ""),
          (c = t.isHorizontal() ? i.offsetWidth : i.offsetHeight),
          (u =
            t.size /
            (t.virtualSize +
              t.params.slidesOffsetBefore -
              (t.params.centeredSlides ? t.snapGrid[0] : 0))),
          (p =
            "auto" === t.params.scrollbar.dragSize
              ? c * u
              : parseInt(t.params.scrollbar.dragSize, 10)),
          t.isHorizontal()
            ? (s.style.width = `${p}px`)
            : (s.style.height = `${p}px`),
          (i.style.display = u >= 1 ? "none" : ""),
          t.params.scrollbar.hide && (i.style.opacity = 0),
          t.params.watchOverflow &&
            t.enabled &&
            e.el.classList[t.isLocked ? "add" : "remove"](
              t.params.scrollbar.lockClass
            );
      }
      function y(e) {
        return t.isHorizontal() ? e.clientX : e.clientY;
      }
      function b(e) {
        let { scrollbar: s, rtlTranslate: i } = t,
          { el: a } = s,
          r;
        (r = Math.max(
          Math.min(
            (r =
              (y(e) -
                $(a)[t.isHorizontal() ? "left" : "top"] -
                (null !== d ? d : p / 2)) /
              (c - p)),
            1
          ),
          0
        )),
          i && (r = 1 - r);
        let l = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
        t.updateProgress(l),
          t.setTranslate(l),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
      }
      function _(e) {
        let s = t.params.scrollbar,
          { scrollbar: i, wrapperEl: a } = t,
          { el: l, dragEl: n } = i;
        (m = !0),
          (d =
            e.target === n
              ? y(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          (a.style.transitionDuration = "100ms"),
          (n.style.transitionDuration = "100ms"),
          b(e),
          clearTimeout(f),
          (l.style.transitionDuration = "0ms"),
          s.hide && (l.style.opacity = 1),
          t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"),
          r("scrollbarDragStart", e);
      }
      function E(e) {
        let { scrollbar: s, wrapperEl: i } = t,
          { el: a, dragEl: l } = s;
        m &&
          (e.preventDefault && e.cancelable
            ? e.preventDefault()
            : (e.returnValue = !1),
          b(e),
          (i.style.transitionDuration = "0ms"),
          (a.style.transitionDuration = "0ms"),
          (l.style.transitionDuration = "0ms"),
          r("scrollbarDragMove", e));
      }
      function S(e) {
        let s = t.params.scrollbar,
          { scrollbar: i, wrapperEl: a } = t,
          { el: l } = i;
        m &&
          ((m = !1),
          t.params.cssMode &&
            ((t.wrapperEl.style["scroll-snap-type"] = ""),
            (a.style.transitionDuration = "")),
          s.hide &&
            (clearTimeout(f),
            (f = n(() => {
              (l.style.opacity = 0), (l.style.transitionDuration = "400ms");
            }, 1e3))),
          r("scrollbarDragEnd", e),
          s.snapOnRelease && t.slideToClosest());
      }
      function T(e) {
        let { scrollbar: s, params: i } = t,
          a = s.el;
        if (!a) return;
        let r = a,
          l = !!i.passiveListeners && { passive: !1, capture: !1 },
          n = !!i.passiveListeners && { passive: !0, capture: !1 };
        if (!r) return;
        let d = "on" === e ? "addEventListener" : "removeEventListener";
        r[d]("pointerdown", _, l),
          o[d]("pointermove", E, l),
          o[d]("pointerup", S, n);
      }
      function C() {
        let { scrollbar: e, el: s } = t;
        t.params.scrollbar = J(
          t,
          t.originalParams.scrollbar,
          t.params.scrollbar,
          { el: "swiper-scrollbar" }
        );
        let i = t.params.scrollbar;
        if (!i.el) return;
        let a, r;
        if (
          ("string" == typeof i.el &&
            t.isElement &&
            (a = t.el.querySelector(i.el)),
          a || "string" != typeof i.el)
        )
          a || (a = i.el);
        else if (!(a = o.querySelectorAll(i.el)).length) return;
        t.params.uniqueNavElements &&
          "string" == typeof i.el &&
          a.length > 1 &&
          1 === s.querySelectorAll(i.el).length &&
          (a = s.querySelector(i.el)),
          a.length > 0 && (a = a[0]),
          a.classList.add(
            t.isHorizontal() ? i.horizontalClass : i.verticalClass
          ),
          a &&
            ((r = a.querySelector(ee(t.params.scrollbar.dragClass))) ||
              ((r = v("div", t.params.scrollbar.dragClass)), a.append(r))),
          Object.assign(e, { el: a, dragEl: r }),
          i.draggable && t.params.scrollbar.el && t.scrollbar.el && T("on"),
          a &&
            a.classList[t.enabled ? "remove" : "add"](
              ...l(t.params.scrollbar.lockClass)
            );
      }
      function P() {
        let e = t.params.scrollbar,
          s = t.scrollbar.el;
        s &&
          s.classList.remove(
            ...l(t.isHorizontal() ? e.horizontalClass : e.verticalClass)
          ),
          t.params.scrollbar.el && t.scrollbar.el && T("off");
      }
      s({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
          scrollbarDisabledClass: "swiper-scrollbar-disabled",
          horizontalClass: "swiper-scrollbar-horizontal",
          verticalClass: "swiper-scrollbar-vertical",
        },
      }),
        (t.scrollbar = { el: null, dragEl: null }),
        a("changeDirection", () => {
          if (!t.scrollbar || !t.scrollbar.el) return;
          let e = t.params.scrollbar,
            { el: s } = t.scrollbar;
          (s = x(s)).forEach((s) => {
            s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass
              );
          });
        }),
        a("init", () => {
          !1 === t.params.scrollbar.enabled ? L() : (C(), w(), g());
        }),
        a("update resize observerUpdate lock unlock changeDirection", () => {
          w();
        }),
        a("setTranslate", () => {
          g();
        }),
        a("setTransition", (e, s) => {
          var i;
          (i = s),
            t.params.scrollbar.el &&
              t.scrollbar.el &&
              (t.scrollbar.dragEl.style.transitionDuration = `${i}ms`);
        }),
        a("enable disable", () => {
          let { el: e } = t.scrollbar;
          e &&
            e.classList[t.enabled ? "remove" : "add"](
              ...l(t.params.scrollbar.lockClass)
            );
        }),
        a("destroy", () => {
          P();
        });
      let L = () => {
        t.el.classList.add(...l(t.params.scrollbar.scrollbarDisabledClass)),
          t.scrollbar.el &&
            t.scrollbar.el.classList.add(
              ...l(t.params.scrollbar.scrollbarDisabledClass)
            ),
          P();
      };
      Object.assign(t.scrollbar, {
        enable() {
          t.el.classList.remove(
            ...l(t.params.scrollbar.scrollbarDisabledClass)
          ),
            t.scrollbar.el &&
              t.scrollbar.el.classList.remove(
                ...l(t.params.scrollbar.scrollbarDisabledClass)
              ),
            C(),
            w(),
            g();
        },
        disable: L,
        updateSize: w,
        setTranslate: g,
        init: C,
        destroy: P,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ parallax: { enabled: !1 } });
      let a =
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
        r = (e, s) => {
          let { rtl: i } = t,
            a = i ? -1 : 1,
            r = e.getAttribute("data-swiper-parallax") || "0",
            l = e.getAttribute("data-swiper-parallax-x"),
            n = e.getAttribute("data-swiper-parallax-y"),
            o = e.getAttribute("data-swiper-parallax-scale"),
            d = e.getAttribute("data-swiper-parallax-opacity"),
            p = e.getAttribute("data-swiper-parallax-rotate");
          l || n
            ? ((l = l || "0"), (n = n || "0"))
            : t.isHorizontal()
            ? ((l = r), (n = "0"))
            : ((n = r), (l = "0")),
            (l =
              l.indexOf("%") >= 0
                ? parseInt(l, 10) * s * a + "%"
                : l * s * a + "px"),
            (n =
              n.indexOf("%") >= 0 ? parseInt(n, 10) * s + "%" : n * s + "px"),
            null != d && (e.style.opacity = d - (d - 1) * (1 - Math.abs(s)));
          let c = `translate3d(${l}, ${n}, 0px)`;
          null != o && (c += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`),
            p && null != p && (c += ` rotate(${-(p * s * 1)}deg)`),
            (e.style.transform = c);
        },
        l = () => {
          let { el: e, slides: s, progress: i, snapGrid: l, isElement: n } = t,
            o = f(e, a);
          t.isElement && o.push(...f(t.hostEl, a)),
            o.forEach((e) => {
              r(e, i);
            }),
            s.forEach((e, s) => {
              let n = e.progress;
              t.params.slidesPerGroup > 1 &&
                "auto" !== t.params.slidesPerView &&
                (n += Math.ceil(s / 2) - i * (l.length - 1)),
                (n = Math.min(Math.max(n, -1), 1)),
                e
                  .querySelectorAll(`${a}, [data-swiper-parallax-rotate]`)
                  .forEach((e) => {
                    r(e, n);
                  });
            });
        };
      i("beforeInit", () => {
        t.params.parallax.enabled &&
          ((t.params.watchSlidesProgress = !0),
          (t.originalParams.watchSlidesProgress = !0));
      }),
        i("init", () => {
          t.params.parallax.enabled && l();
        }),
        i("setTranslate", () => {
          t.params.parallax.enabled && l();
        }),
        i("setTransition", (e, s) => {
          t.params.parallax.enabled &&
            (function (e) {
              void 0 === e && (e = t.params.speed);
              let { el: s, hostEl: i } = t,
                r = [...s.querySelectorAll(a)];
              t.isElement && r.push(...i.querySelectorAll(a)),
                r.forEach((t) => {
                  let s =
                    parseInt(
                      t.getAttribute("data-swiper-parallax-duration"),
                      10
                    ) || e;
                  0 === e && (s = 0), (t.style.transitionDuration = `${s}ms`);
                });
            })(s);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e,
        l = r();
      s({
        zoom: {
          enabled: !1,
          limitToOriginalSize: !1,
          maxRatio: 3,
          minRatio: 1,
          panOnMouseMove: !1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (t.zoom = { enabled: !1 });
      let n = 1,
        o = !1,
        p = !1,
        c = { x: 0, y: 0 },
        u,
        m,
        h = [],
        g = {
          originX: 0,
          originY: 0,
          slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          imageEl: void 0,
          imageWrapEl: void 0,
          maxRatio: 3,
        },
        v = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        w = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        },
        y,
        _ = 1;
      function E() {
        if (h.length < 2) return 1;
        let e = h[0].pageX,
          t = h[0].pageY,
          s = h[1].pageX,
          i = h[1].pageY;
        return Math.sqrt((s - e) ** 2 + (i - t) ** 2);
      }
      function x() {
        let e = t.params.zoom,
          s = g.imageWrapEl.getAttribute("data-swiper-zoom") || e.maxRatio;
        if (e.limitToOriginalSize && g.imageEl && g.imageEl.naturalWidth) {
          let i = g.imageEl.naturalWidth / g.imageEl.offsetWidth;
          return Math.min(i, s);
        }
        return s;
      }
      function S(e) {
        let s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
        return (
          !!e.target.matches(s) ||
          t.slides.filter((t) => t.contains(e.target)).length > 0
        );
      }
      function T(e) {
        let s = `.${t.params.zoom.containerClass}`;
        return (
          !!e.target.matches(s) ||
          [...t.hostEl.querySelectorAll(s)].filter((t) => t.contains(e.target))
            .length > 0
        );
      }
      function C(e) {
        if (("mouse" === e.pointerType && h.splice(0, h.length), !S(e))) return;
        let s = t.params.zoom;
        if (((u = !1), (m = !1), h.push(e), !(h.length < 2))) {
          if (((u = !0), (g.scaleStart = E()), !g.slideEl)) {
            (g.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`
            )),
              g.slideEl || (g.slideEl = t.slides[t.activeIndex]);
            let i = g.slideEl.querySelector(`.${s.containerClass}`);
            if (
              (i &&
                (i = i.querySelectorAll(
                  "picture, img, svg, canvas, .swiper-zoom-target"
                )[0]),
              (g.imageEl = i),
              (g.imageWrapEl = i
                ? b(g.imageEl, `.${s.containerClass}`)[0]
                : void 0),
              !g.imageWrapEl)
            )
              return void (g.imageEl = void 0);
            g.maxRatio = x();
          }
          if (g.imageEl) {
            let [a, r] = (function () {
              if (h.length < 2) return { x: null, y: null };
              let e = g.imageEl.getBoundingClientRect();
              return [
                (h[0].pageX + (h[1].pageX - h[0].pageX) / 2 - e.x - l.scrollX) /
                  n,
                (h[0].pageY + (h[1].pageY - h[0].pageY) / 2 - e.y - l.scrollY) /
                  n,
              ];
            })();
            (g.originX = a),
              (g.originY = r),
              (g.imageEl.style.transitionDuration = "0ms");
          }
          o = !0;
        }
      }
      function P(e) {
        if (!S(e)) return;
        let s = t.params.zoom,
          i = t.zoom,
          a = h.findIndex((t) => t.pointerId === e.pointerId);
        a >= 0 && (h[a] = e),
          h.length < 2 ||
            ((m = !0),
            (g.scaleMove = E()),
            g.imageEl &&
              ((i.scale = (g.scaleMove / g.scaleStart) * n),
              i.scale > g.maxRatio &&
                (i.scale = g.maxRatio - 1 + (i.scale - g.maxRatio + 1) ** 0.5),
              i.scale < s.minRatio &&
                (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** 0.5),
              (g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`)));
      }
      function L(e) {
        if (!S(e) || ("mouse" === e.pointerType && "pointerout" === e.type))
          return;
        let s = t.params.zoom,
          i = t.zoom,
          a = h.findIndex((t) => t.pointerId === e.pointerId);
        a >= 0 && h.splice(a, 1),
          u &&
            m &&
            ((u = !1),
            (m = !1),
            g.imageEl &&
              ((i.scale = Math.max(Math.min(i.scale, g.maxRatio), s.minRatio)),
              (g.imageEl.style.transitionDuration = `${t.params.speed}ms`),
              (g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`),
              (n = i.scale),
              (o = !1),
              i.scale > 1 && g.slideEl
                ? g.slideEl.classList.add(`${s.zoomedSlideClass}`)
                : i.scale <= 1 &&
                  g.slideEl &&
                  g.slideEl.classList.remove(`${s.zoomedSlideClass}`),
              1 === i.scale &&
                ((g.originX = 0), (g.originY = 0), (g.slideEl = void 0))));
      }
      function M() {
        t.touchEventsData.preventTouchMoveFromPointerMove = !1;
      }
      function z(e) {
        let s = "mouse" === e.pointerType && t.params.zoom.panOnMouseMove;
        if (!S(e) || !T(e)) return;
        let i = t.zoom;
        if (!g.imageEl) return;
        if (!v.isTouched || !g.slideEl) return void (s && I(e));
        if (s) return void I(e);
        v.isMoved ||
          ((v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth),
          (v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight),
          (v.startX = d(g.imageWrapEl, "x") || 0),
          (v.startY = d(g.imageWrapEl, "y") || 0),
          (g.slideWidth = g.slideEl.offsetWidth),
          (g.slideHeight = g.slideEl.offsetHeight),
          (g.imageWrapEl.style.transitionDuration = "0ms"));
        let a = v.width * i.scale,
          r = v.height * i.scale;
        if (
          ((v.minX = Math.min(g.slideWidth / 2 - a / 2, 0)),
          (v.maxX = -v.minX),
          (v.minY = Math.min(g.slideHeight / 2 - r / 2, 0)),
          (v.maxY = -v.minY),
          (v.touchesCurrent.x = h.length > 0 ? h[0].pageX : e.pageX),
          (v.touchesCurrent.y = h.length > 0 ? h[0].pageY : e.pageY),
          Math.max(
            Math.abs(v.touchesCurrent.x - v.touchesStart.x),
            Math.abs(v.touchesCurrent.y - v.touchesStart.y)
          ) > 5 && (t.allowClick = !1),
          !v.isMoved &&
            !o &&
            ((t.isHorizontal() &&
              ((Math.floor(v.minX) === Math.floor(v.startX) &&
                v.touchesCurrent.x < v.touchesStart.x) ||
                (Math.floor(v.maxX) === Math.floor(v.startX) &&
                  v.touchesCurrent.x > v.touchesStart.x))) ||
              (!t.isHorizontal() &&
                ((Math.floor(v.minY) === Math.floor(v.startY) &&
                  v.touchesCurrent.y < v.touchesStart.y) ||
                  (Math.floor(v.maxY) === Math.floor(v.startY) &&
                    v.touchesCurrent.y > v.touchesStart.y)))))
        )
          return (v.isTouched = !1), void M();
        e.cancelable && e.preventDefault(),
          e.stopPropagation(),
          clearTimeout(y),
          (t.touchEventsData.preventTouchMoveFromPointerMove = !0),
          (y = setTimeout(() => {
            t.destroyed || M();
          })),
          (v.isMoved = !0);
        let l = (i.scale - n) / (g.maxRatio - t.params.zoom.minRatio),
          { originX: p, originY: c } = g;
        (v.currentX =
          v.touchesCurrent.x -
          v.touchesStart.x +
          v.startX +
          l * (v.width - 2 * p)),
          (v.currentY =
            v.touchesCurrent.y -
            v.touchesStart.y +
            v.startY +
            l * (v.height - 2 * c)),
          v.currentX < v.minX &&
            (v.currentX = v.minX + 1 - (v.minX - v.currentX + 1) ** 0.8),
          v.currentX > v.maxX &&
            (v.currentX = v.maxX - 1 + (v.currentX - v.maxX + 1) ** 0.8),
          v.currentY < v.minY &&
            (v.currentY = v.minY + 1 - (v.minY - v.currentY + 1) ** 0.8),
          v.currentY > v.maxY &&
            (v.currentY = v.maxY - 1 + (v.currentY - v.maxY + 1) ** 0.8),
          w.prevPositionX || (w.prevPositionX = v.touchesCurrent.x),
          w.prevPositionY || (w.prevPositionY = v.touchesCurrent.y),
          w.prevTime || (w.prevTime = Date.now()),
          (w.x =
            (v.touchesCurrent.x - w.prevPositionX) /
            (Date.now() - w.prevTime) /
            2),
          (w.y =
            (v.touchesCurrent.y - w.prevPositionY) /
            (Date.now() - w.prevTime) /
            2),
          2 > Math.abs(v.touchesCurrent.x - w.prevPositionX) && (w.x = 0),
          2 > Math.abs(v.touchesCurrent.y - w.prevPositionY) && (w.y = 0),
          (w.prevPositionX = v.touchesCurrent.x),
          (w.prevPositionY = v.touchesCurrent.y),
          (w.prevTime = Date.now()),
          (g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`);
      }
      function k() {
        let e = t.zoom;
        g.slideEl &&
          t.activeIndex !== t.slides.indexOf(g.slideEl) &&
          (g.imageEl &&
            (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          g.imageWrapEl &&
            (g.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          g.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),
          (e.scale = 1),
          (n = 1),
          (g.slideEl = void 0),
          (g.imageEl = void 0),
          (g.imageWrapEl = void 0),
          (g.originX = 0),
          (g.originY = 0));
      }
      function I(e) {
        if (n <= 1 || !g.imageWrapEl || !S(e) || !T(e)) return;
        let t = l.getComputedStyle(g.imageWrapEl).transform,
          s = new l.DOMMatrix(t);
        if (!p)
          return (
            (p = !0),
            (c.x = e.clientX),
            (c.y = e.clientY),
            (v.startX = s.e),
            (v.startY = s.f),
            (v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth),
            (v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight),
            (g.slideWidth = g.slideEl.offsetWidth),
            void (g.slideHeight = g.slideEl.offsetHeight)
          );
        let i = -((e.clientX - c.x) * 3),
          a = -((e.clientY - c.y) * 3),
          r = v.width * n,
          o = v.height * n,
          d = g.slideWidth,
          u = g.slideHeight,
          m = Math.min(d / 2 - r / 2, 0),
          h = Math.min(u / 2 - o / 2, 0),
          f = Math.max(Math.min(v.startX + i, -m), m),
          $ = Math.max(Math.min(v.startY + a, -h), h);
        (g.imageWrapEl.style.transitionDuration = "0ms"),
          (g.imageWrapEl.style.transform = `translate3d(${f}px, ${$}px, 0)`),
          (c.x = e.clientX),
          (c.y = e.clientY),
          (v.startX = f),
          (v.startY = $),
          (v.currentX = f),
          (v.currentY = $);
      }
      function A(e) {
        let s = t.zoom,
          i = t.params.zoom;
        if (!g.slideEl) {
          e &&
            e.target &&
            (g.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`
            )),
            g.slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (g.slideEl = f(
                    t.slidesEl,
                    `.${t.params.slideActiveClass}`
                  )[0])
                : (g.slideEl = t.slides[t.activeIndex]));
          let a = g.slideEl.querySelector(`.${i.containerClass}`);
          a &&
            (a = a.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target"
            )[0]),
            (g.imageEl = a),
            (g.imageWrapEl = a
              ? b(g.imageEl, `.${i.containerClass}`)[0]
              : void 0);
        }
        if (!g.imageEl || !g.imageWrapEl) return;
        let r, o, d, p, c, u, m, h, w, y, _, E, S, T, C, P, L, M;
        t.params.cssMode &&
          ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.touchAction = "none")),
          g.slideEl.classList.add(`${i.zoomedSlideClass}`),
          void 0 === v.touchesStart.x && e
            ? ((r = e.pageX), (o = e.pageY))
            : ((r = v.touchesStart.x), (o = v.touchesStart.y));
        let z = n,
          k = "number" == typeof e ? e : null;
        1 === n &&
          k &&
          ((r = void 0),
          (o = void 0),
          (v.touchesStart.x = void 0),
          (v.touchesStart.y = void 0));
        let I = x();
        (s.scale = k || I),
          (n = k || I),
          !e || (1 === n && k)
            ? ((m = 0), (h = 0))
            : ((L = g.slideEl.offsetWidth),
              (M = g.slideEl.offsetHeight),
              (d = $(g.slideEl).left + l.scrollX),
              (p = $(g.slideEl).top + l.scrollY),
              (c = d + L / 2 - r),
              (u = p + M / 2 - o),
              (w = g.imageEl.offsetWidth || g.imageEl.clientWidth),
              (y = g.imageEl.offsetHeight || g.imageEl.clientHeight),
              (_ = w * s.scale),
              (E = y * s.scale),
              (S = Math.min(L / 2 - _ / 2, 0)),
              (T = Math.min(M / 2 - E / 2, 0)),
              (C = -S),
              (P = -T),
              z > 0 &&
              k &&
              "number" == typeof v.currentX &&
              "number" == typeof v.currentY
                ? ((m = (v.currentX * s.scale) / z),
                  (h = (v.currentY * s.scale) / z))
                : ((m = c * s.scale), (h = u * s.scale)),
              m < S && (m = S),
              m > C && (m = C),
              h < T && (h = T),
              h > P && (h = P)),
          k && 1 === s.scale && ((g.originX = 0), (g.originY = 0)),
          (v.currentX = m),
          (v.currentY = h),
          (g.imageWrapEl.style.transitionDuration = "300ms"),
          (g.imageWrapEl.style.transform = `translate3d(${m}px, ${h}px,0)`),
          (g.imageEl.style.transitionDuration = "300ms"),
          (g.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`);
      }
      function D() {
        let e = t.zoom,
          s = t.params.zoom;
        if (!g.slideEl) {
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (g.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0])
            : (g.slideEl = t.slides[t.activeIndex]);
          let i = g.slideEl.querySelector(`.${s.containerClass}`);
          i &&
            (i = i.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target"
            )[0]),
            (g.imageEl = i),
            (g.imageWrapEl = i
              ? b(g.imageEl, `.${s.containerClass}`)[0]
              : void 0);
        }
        g.imageEl &&
          g.imageWrapEl &&
          (t.params.cssMode &&
            ((t.wrapperEl.style.overflow = ""),
            (t.wrapperEl.style.touchAction = "")),
          (e.scale = 1),
          (n = 1),
          (v.currentX = void 0),
          (v.currentY = void 0),
          (v.touchesStart.x = void 0),
          (v.touchesStart.y = void 0),
          (g.imageWrapEl.style.transitionDuration = "300ms"),
          (g.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          (g.imageEl.style.transitionDuration = "300ms"),
          (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          g.slideEl.classList.remove(`${s.zoomedSlideClass}`),
          (g.slideEl = void 0),
          (g.originX = 0),
          (g.originY = 0),
          t.params.zoom.panOnMouseMove &&
            ((c = { x: 0, y: 0 }),
            p && ((p = !1), (v.startX = 0), (v.startY = 0))));
      }
      function O(e) {
        let s = t.zoom;
        s.scale && 1 !== s.scale ? D() : A(e);
      }
      function G() {
        return {
          passiveListener: !!t.params.passiveListeners && {
            passive: !0,
            capture: !1,
          },
          activeListenerWithCapture: !t.params.passiveListeners || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function X() {
        let e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        let { passiveListener: s, activeListenerWithCapture: i } = G();
        t.wrapperEl.addEventListener("pointerdown", C, s),
          t.wrapperEl.addEventListener("pointermove", P, i),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.addEventListener(e, L, s);
          }),
          t.wrapperEl.addEventListener("pointermove", z, i);
      }
      function Y() {
        let e = t.zoom;
        if (!e.enabled) return;
        e.enabled = !1;
        let { passiveListener: s, activeListenerWithCapture: i } = G();
        t.wrapperEl.removeEventListener("pointerdown", C, s),
          t.wrapperEl.removeEventListener("pointermove", P, i),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.removeEventListener(e, L, s);
          }),
          t.wrapperEl.removeEventListener("pointermove", z, i);
      }
      Object.defineProperty(t.zoom, "scale", {
        get: () => _,
        set(e) {
          if (_ !== e) {
            let t = g.imageEl,
              s = g.slideEl;
            a("zoomChange", e, t, s);
          }
          _ = e;
        },
      }),
        i("init", () => {
          t.params.zoom.enabled && X();
        }),
        i("destroy", () => {
          Y();
        }),
        i("touchStart", (e, s) => {
          t.zoom.enabled &&
            (function (e) {
              let s = t.device;
              if (!g.imageEl || v.isTouched) return;
              s.android && e.cancelable && e.preventDefault(),
                (v.isTouched = !0);
              let i = h.length > 0 ? h[0] : e;
              (v.touchesStart.x = i.pageX), (v.touchesStart.y = i.pageY);
            })(s);
        }),
        i("touchEnd", (e, s) => {
          t.zoom.enabled &&
            (function () {
              let e = t.zoom;
              if (((h.length = 0), !g.imageEl)) return;
              if (!v.isTouched || !v.isMoved)
                return (v.isTouched = !1), void (v.isMoved = !1);
              (v.isTouched = !1), (v.isMoved = !1);
              let s = 300,
                i = 300,
                a = w.x * s,
                r = v.currentX + a,
                l = w.y * i,
                n = v.currentY + l;
              0 !== w.x && (s = Math.abs((r - v.currentX) / w.x)),
                0 !== w.y && (i = Math.abs((n - v.currentY) / w.y));
              let o = Math.max(s, i);
              (v.currentX = r), (v.currentY = n);
              let d = v.width * e.scale,
                p = v.height * e.scale;
              (v.minX = Math.min(g.slideWidth / 2 - d / 2, 0)),
                (v.maxX = -v.minX),
                (v.minY = Math.min(g.slideHeight / 2 - p / 2, 0)),
                (v.maxY = -v.minY),
                (v.currentX = Math.max(Math.min(v.currentX, v.maxX), v.minX)),
                (v.currentY = Math.max(Math.min(v.currentY, v.maxY), v.minY)),
                (g.imageWrapEl.style.transitionDuration = `${o}ms`),
                (g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`);
            })();
        }),
        i("doubleTap", (e, s) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            O(s);
        }),
        i("transitionEnd", () => {
          t.zoom.enabled && t.params.zoom.enabled && k();
        }),
        i("slideChange", () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && k();
        }),
        Object.assign(t.zoom, {
          enable: X,
          disable: Y,
          in: A,
          out: D,
          toggle: O,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      function a(e, t) {
        let s,
          i,
          a,
          r = (e, t) => {
            for (i = -1, s = e.length; s - i > 1; )
              e[(a = (s + i) >> 1)] <= t ? (i = a) : (s = a);
            return s;
          },
          l,
          n;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((l = (n = r(this.x, e)) - 1),
                ((e - this.x[l]) * (this.y[n] - this.y[l])) /
                  (this.x[n] - this.x[l]) +
                  this.y[l])
              : 0;
          }),
          this
        );
      }
      function r() {
        t.controller.control &&
          t.controller.spline &&
          ((t.controller.spline = void 0), delete t.controller.spline);
      }
      s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (t.controller = { control: void 0 }),
        i("beforeInit", () => {
          "undefined" != typeof window &&
          ("string" == typeof t.params.controller.control ||
            t.params.controller.control instanceof HTMLElement)
            ? ("string" == typeof t.params.controller.control
                ? [...document.querySelectorAll(t.params.controller.control)]
                : [t.params.controller.control]
              ).forEach((e) => {
                if (
                  (t.controller.control || (t.controller.control = []),
                  e && e.swiper)
                )
                  t.controller.control.push(e.swiper);
                else if (e) {
                  let s = `${t.params.eventsPrefix}init`,
                    i = (a) => {
                      t.controller.control.push(a.detail[0]),
                        t.update(),
                        e.removeEventListener(s, i);
                    };
                  e.addEventListener(s, i);
                }
              })
            : (t.controller.control = t.params.controller.control);
        }),
        i("update", () => {
          r();
        }),
        i("resize", () => {
          r();
        }),
        i("observerUpdate", () => {
          r();
        }),
        i("setTranslate", (e, s, i) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTranslate(s, i);
        }),
        i("setTransition", (e, s, i) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTransition(s, i);
        }),
        Object.assign(t.controller, {
          setTranslate: function (e, s) {
            let i = t.controller.control,
              r,
              l,
              n = t.constructor;
            function o(e) {
              var s;
              if (e.destroyed) return;
              let i = t.rtlTranslate ? -t.translate : t.translate;
              "slide" === t.params.controller.by &&
                ((s = e),
                (t.controller.spline = t.params.loop
                  ? new a(t.slidesGrid, s.slidesGrid)
                  : new a(t.snapGrid, s.snapGrid)),
                (l = -t.controller.spline.interpolate(-i))),
                (l && "container" !== t.params.controller.by) ||
                  ((!Number.isNaN(
                    (r =
                      (e.maxTranslate() - e.minTranslate()) /
                      (t.maxTranslate() - t.minTranslate()))
                  ) &&
                    Number.isFinite(r)) ||
                    (r = 1),
                  (l = (i - t.minTranslate()) * r + e.minTranslate())),
                t.params.controller.inverse && (l = e.maxTranslate() - l),
                e.updateProgress(l),
                e.setTranslate(l, t),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
            }
            if (Array.isArray(i))
              for (let d = 0; d < i.length; d += 1)
                i[d] !== s && i[d] instanceof n && o(i[d]);
            else i instanceof n && s !== i && o(i);
          },
          setTransition: function (e, s) {
            let i = t.constructor,
              a = t.controller.control,
              r;
            function l(s) {
              s.destroyed ||
                (s.setTransition(e, t),
                0 !== e &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    n(() => {
                      s.updateAutoHeight();
                    }),
                  _(s.wrapperEl, () => {
                    a && s.transitionEnd();
                  })));
            }
            if (Array.isArray(a))
              for (r = 0; r < a.length; r += 1)
                a[r] !== s && a[r] instanceof i && l(a[r]);
            else a instanceof i && s !== a && l(a);
          },
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          containerRole: null,
          itemRoleDescriptionMessage: null,
          slideRole: "group",
          id: null,
          scrollOnFocus: !0,
        },
      }),
        (t.a11y = { clicked: !1 });
      let r,
        l,
        n = null,
        o = new Date().getTime();
      function d(e) {
        let t = n;
        0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
      }
      function p(e) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("tabIndex", "0");
        });
      }
      function c(e) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("tabIndex", "-1");
        });
      }
      function u(e, t) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("role", t);
        });
      }
      function m(e, t) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("aria-roledescription", t);
        });
      }
      function h(e, t) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("aria-label", t);
        });
      }
      function f(e) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !0);
        });
      }
      function g(e) {
        (e = x(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !1);
        });
      }
      function $(e) {
        if (13 !== e.keyCode && 32 !== e.keyCode) return;
        let s = t.params.a11y,
          i = e.target;
        if (
          !t.pagination ||
          !t.pagination.el ||
          (i !== t.pagination.el && !t.pagination.el.contains(e.target)) ||
          e.target.matches(ee(t.params.pagination.bulletClass))
        ) {
          if (t.navigation && t.navigation.prevEl && t.navigation.nextEl) {
            let a = x(t.navigation.prevEl);
            x(t.navigation.nextEl).includes(i) &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.isEnd ? d(s.lastSlideMessage) : d(s.nextSlideMessage)),
              a.includes(i) &&
                ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                t.isBeginning ? d(s.firstSlideMessage) : d(s.prevSlideMessage));
          }
          t.pagination &&
            i.matches(ee(t.params.pagination.bulletClass)) &&
            i.click();
        }
      }
      function w() {
        return (
          t.pagination && t.pagination.bullets && t.pagination.bullets.length
        );
      }
      function b() {
        return w() && t.params.pagination.clickable;
      }
      let _ = (e, t, s) => {
          p(e),
            "BUTTON" !== e.tagName &&
              (u(e, "button"), e.addEventListener("keydown", $)),
            h(e, s),
            (function (e, t) {
              (e = x(e)).forEach((e) => {
                e.setAttribute("aria-controls", t);
              });
            })(e, t);
        },
        E = (e) => {
          l && l !== e.target && !l.contains(e.target) && (r = !0),
            (t.a11y.clicked = !0);
        },
        S = () => {
          (r = !1),
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                t.destroyed || (t.a11y.clicked = !1);
              });
            });
        },
        T = (e) => {
          o = new Date().getTime();
        },
        C = (e) => {
          if (
            t.a11y.clicked ||
            !t.params.a11y.scrollOnFocus ||
            new Date().getTime() - o < 100
          )
            return;
          let s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
          if (!s || !t.slides.includes(s)) return;
          l = s;
          let i = t.slides.indexOf(s) === t.activeIndex,
            a =
              t.params.watchSlidesProgress &&
              t.visibleSlides &&
              t.visibleSlides.includes(s);
          i ||
            a ||
            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
            (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
            requestAnimationFrame(() => {
              r ||
                (t.params.loop
                  ? t.slideToLoop(
                      parseInt(s.getAttribute("data-swiper-slide-index")),
                      0
                    )
                  : t.slideTo(t.slides.indexOf(s), 0),
                (r = !1));
            }));
        },
        P = () => {
          let e = t.params.a11y;
          e.itemRoleDescriptionMessage &&
            m(t.slides, e.itemRoleDescriptionMessage),
            e.slideRole && u(t.slides, e.slideRole);
          let s = t.slides.length;
          e.slideLabelMessage &&
            t.slides.forEach((i, a) => {
              let r = t.params.loop
                ? parseInt(i.getAttribute("data-swiper-slide-index"), 10)
                : a;
              h(
                i,
                e.slideLabelMessage
                  .replace(/\{\{index\}\}/, r + 1)
                  .replace(/\{\{slidesLength\}\}/, s)
              );
            });
        },
        L = () => {
          var e, s;
          let a = t.params.a11y;
          t.el.append(n);
          let r = t.el;
          a.containerRoleDescriptionMessage &&
            m(r, a.containerRoleDescriptionMessage),
            a.containerMessage && h(r, a.containerMessage),
            a.containerRole && u(r, a.containerRole);
          let l = t.wrapperEl,
            o =
              a.id ||
              l.getAttribute("id") ||
              `swiper-wrapper-${
                ((e = 16),
                "x"
                  .repeat(e)
                  .replace(/x/g, () =>
                    Math.round(16 * Math.random()).toString(16)
                  ))
              }`,
            d =
              t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
          (s = o),
            x(l).forEach((e) => {
              e.setAttribute("id", s);
            }),
            (function (e, t) {
              (e = x(e)).forEach((e) => {
                e.setAttribute("aria-live", t);
              });
            })(l, d),
            P();
          let { nextEl: p, prevEl: c } = t.navigation ? t.navigation : {};
          (p = x(p)),
            (c = x(c)),
            p && p.forEach((e) => _(e, o, a.nextSlideMessage)),
            c && c.forEach((e) => _(e, o, a.prevSlideMessage)),
            b() &&
              x(t.pagination.el).forEach((e) => {
                e.addEventListener("keydown", $);
              }),
            i().addEventListener("visibilitychange", T),
            t.el.addEventListener("focus", C, !0),
            t.el.addEventListener("focus", C, !0),
            t.el.addEventListener("pointerdown", E, !0),
            t.el.addEventListener("pointerup", S, !0);
        };
      a("beforeInit", () => {
        (n = v("span", t.params.a11y.notificationClass)).setAttribute(
          "aria-live",
          "assertive"
        ),
          n.setAttribute("aria-atomic", "true");
      }),
        a("afterInit", () => {
          t.params.a11y.enabled && L();
        }),
        a(
          "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
          () => {
            t.params.a11y.enabled && P();
          }
        ),
        a("fromEdge toEdge afterInit lock unlock", () => {
          t.params.a11y.enabled &&
            (function () {
              if (t.params.loop || t.params.rewind || !t.navigation) return;
              let { nextEl: e, prevEl: s } = t.navigation;
              s && (t.isBeginning ? (f(s), c(s)) : (g(s), p(s))),
                e && (t.isEnd ? (f(e), c(e)) : (g(e), p(e)));
            })();
        }),
        a("paginationUpdate", () => {
          t.params.a11y.enabled &&
            (function () {
              let e = t.params.a11y;
              w() &&
                t.pagination.bullets.forEach((s) => {
                  t.params.pagination.clickable &&
                    (p(s),
                    t.params.pagination.renderBullet ||
                      (u(s, "button"),
                      h(
                        s,
                        e.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          y(s) + 1
                        )
                      ))),
                    s.matches(ee(t.params.pagination.bulletActiveClass))
                      ? s.setAttribute("aria-current", "true")
                      : s.removeAttribute("aria-current");
                });
            })();
        }),
        a("destroy", () => {
          t.params.a11y.enabled &&
            (function () {
              n && n.remove();
              let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {};
              (e = x(e)),
                (s = x(s)),
                e && e.forEach((e) => e.removeEventListener("keydown", $)),
                s && s.forEach((e) => e.removeEventListener("keydown", $)),
                b() &&
                  x(t.pagination.el).forEach((e) => {
                    e.removeEventListener("keydown", $);
                  }),
                i().removeEventListener("visibilitychange", T),
                t.el &&
                  "string" != typeof t.el &&
                  (t.el.removeEventListener("focus", C, !0),
                  t.el.removeEventListener("pointerdown", E, !0),
                  t.el.removeEventListener("pointerup", S, !0));
            })();
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        history: {
          enabled: !1,
          root: "",
          replaceState: !1,
          key: "slides",
          keepQuery: !1,
        },
      });
      let a = !1,
        l = {},
        n = (e) =>
          e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        o = (e) => {
          let t = r(),
            s;
          s = e ? new URL(e) : t.location;
          let i = s.pathname
              .slice(1)
              .split("/")
              .filter((e) => "" !== e),
            a = i.length;
          return { key: i[a - 2], value: i[a - 1] };
        },
        d = (e, s) => {
          let i = r();
          if (!a || !t.params.history.enabled) return;
          let l;
          l = t.params.url ? new URL(t.params.url) : i.location;
          let o =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(`[data-swiper-slide-index="${s}"]`)
                : t.slides[s],
            d = n(o.getAttribute("data-history"));
          if (t.params.history.root.length > 0) {
            let p = t.params.history.root;
            "/" === p[p.length - 1] && (p = p.slice(0, p.length - 1)),
              (d = `${p}/${e ? `${e}/` : ""}${d}`);
          } else l.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`);
          t.params.history.keepQuery && (d += l.search);
          let c = i.history.state;
          (c && c.value === d) ||
            (t.params.history.replaceState
              ? i.history.replaceState({ value: d }, null, d)
              : i.history.pushState({ value: d }, null, d));
        },
        p = (e, s, i) => {
          if (s)
            for (let a = 0, r = t.slides.length; a < r; a += 1) {
              let l = t.slides[a];
              if (n(l.getAttribute("data-history")) === s) {
                let o = t.getSlideIndex(l);
                t.slideTo(o, e, i);
              }
            }
          else t.slideTo(0, e, i);
        },
        c = () => {
          (l = o(t.params.url)), p(t.params.speed, l.value, !1);
        };
      i("init", () => {
        t.params.history.enabled &&
          (() => {
            let e = r();
            if (t.params.history) {
              if (!e.history || !e.history.pushState)
                return (
                  (t.params.history.enabled = !1),
                  void (t.params.hashNavigation.enabled = !0)
                );
              (a = !0),
                ((l = o(t.params.url)).key || l.value) &&
                  p(0, l.value, t.params.runCallbacksOnInit),
                t.params.history.replaceState ||
                  e.addEventListener("popstate", c);
            }
          })();
      }),
        i("destroy", () => {
          t.params.history.enabled &&
            (() => {
              let e = r();
              t.params.history.replaceState ||
                e.removeEventListener("popstate", c);
            })();
        }),
        i("transitionEnd _freeModeNoMomentumRelease", () => {
          a && d(t.params.history.key, t.activeIndex);
        }),
        i("slideChange", () => {
          a && t.params.cssMode && d(t.params.history.key, t.activeIndex);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: a, on: l } = e,
        n = !1,
        o = i(),
        d = r();
      s({
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1,
          getSlideIndex(e, s) {
            if (t.virtual && t.params.virtual.enabled) {
              let i = t.slides.find((e) => e.getAttribute("data-hash") === s);
              return i
                ? parseInt(i.getAttribute("data-swiper-slide-index"), 10)
                : 0;
            }
            return t.getSlideIndex(
              f(
                t.slidesEl,
                `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`
              )[0]
            );
          },
        },
      });
      let p = () => {
          a("hashChange");
          let e = o.location.hash.replace("#", ""),
            s =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`
                  )
                : t.slides[t.activeIndex];
          if (e !== (s ? s.getAttribute("data-hash") : "")) {
            let i = t.params.hashNavigation.getSlideIndex(t, e);
            if (void 0 === i || Number.isNaN(i)) return;
            t.slideTo(i);
          }
        },
        c = () => {
          if (!n || !t.params.hashNavigation.enabled) return;
          let e =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`
                  )
                : t.slides[t.activeIndex],
            s = e
              ? e.getAttribute("data-hash") || e.getAttribute("data-history")
              : "";
          t.params.hashNavigation.replaceState &&
          d.history &&
          d.history.replaceState
            ? (d.history.replaceState(null, null, `#${s}` || ""), a("hashSet"))
            : ((o.location.hash = s || ""), a("hashSet"));
        };
      l("init", () => {
        t.params.hashNavigation.enabled &&
          (() => {
            if (
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
              return;
            n = !0;
            let e = o.location.hash.replace("#", "");
            if (e) {
              let s = t.params.hashNavigation.getSlideIndex(t, e);
              t.slideTo(s || 0, 0, t.params.runCallbacksOnInit, !0);
            }
            t.params.hashNavigation.watchState &&
              d.addEventListener("hashchange", p);
          })();
      }),
        l("destroy", () => {
          t.params.hashNavigation.enabled &&
            t.params.hashNavigation.watchState &&
            d.removeEventListener("hashchange", p);
        }),
        l("transitionEnd _freeModeNoMomentumRelease", () => {
          n && c();
        }),
        l("slideChange", () => {
          n && t.params.cssMode && c();
        });
    },
    function (e) {
      let t,
        s,
        { swiper: a, extendParams: r, on: l, emit: n, params: o } = e;
      (a.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        r({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        });
      let d,
        p,
        c,
        u,
        m,
        h,
        f,
        g,
        v = o && o.autoplay ? o.autoplay.delay : 3e3,
        $ = o && o.autoplay ? o.autoplay.delay : 3e3,
        w = new Date().getTime();
      function y(e) {
        a &&
          !a.destroyed &&
          a.wrapperEl &&
          e.target === a.wrapperEl &&
          (a.wrapperEl.removeEventListener("transitionend", y),
          g || (e.detail && e.detail.bySwiperTouchMove) || T());
      }
      let b = () => {
          if (a.destroyed || !a.autoplay.running) return;
          a.autoplay.paused ? (p = !0) : p && (($ = d), (p = !1));
          let e = a.autoplay.paused ? d : w + $ - new Date().getTime();
          (a.autoplay.timeLeft = e),
            n("autoplayTimeLeft", e, e / v),
            (s = requestAnimationFrame(() => {
              b();
            }));
        },
        _ = (e) => {
          if (a.destroyed || !a.autoplay.running) return;
          cancelAnimationFrame(s), b();
          let i = void 0 === e ? a.params.autoplay.delay : e;
          (v = a.params.autoplay.delay), ($ = a.params.autoplay.delay);
          let r = (() => {
            let e;
            if (
              (e =
                a.virtual && a.params.virtual.enabled
                  ? a.slides.find((e) =>
                      e.classList.contains("swiper-slide-active")
                    )
                  : a.slides[a.activeIndex])
            )
              return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
          })();
          !Number.isNaN(r) &&
            r > 0 &&
            void 0 === e &&
            ((i = r), (v = r), ($ = r)),
            (d = i);
          let l = a.params.speed,
            o = () => {
              a &&
                !a.destroyed &&
                (a.params.autoplay.reverseDirection
                  ? !a.isBeginning || a.params.loop || a.params.rewind
                    ? (a.slidePrev(l, !0, !0), n("autoplay"))
                    : a.params.autoplay.stopOnLastSlide ||
                      (a.slideTo(a.slides.length - 1, l, !0, !0), n("autoplay"))
                  : !a.isEnd || a.params.loop || a.params.rewind
                  ? (a.slideNext(l, !0, !0), n("autoplay"))
                  : a.params.autoplay.stopOnLastSlide ||
                    (a.slideTo(0, l, !0, !0), n("autoplay")),
                a.params.cssMode &&
                  ((w = new Date().getTime()),
                  requestAnimationFrame(() => {
                    _();
                  })));
            };
          return (
            i > 0
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  o();
                }, i)))
              : requestAnimationFrame(() => {
                  o();
                }),
            i
          );
        },
        E = () => {
          (w = new Date().getTime()),
            (a.autoplay.running = !0),
            _(),
            n("autoplayStart");
        },
        x = () => {
          (a.autoplay.running = !1),
            clearTimeout(t),
            cancelAnimationFrame(s),
            n("autoplayStop");
        },
        S = (e, s) => {
          if (a.destroyed || !a.autoplay.running) return;
          clearTimeout(t), e || (f = !0);
          let i = () => {
            n("autoplayPause"),
              a.params.autoplay.waitForTransition
                ? a.wrapperEl.addEventListener("transitionend", y)
                : T();
          };
          if (((a.autoplay.paused = !0), s))
            return h && (d = a.params.autoplay.delay), (h = !1), void i();
          let r = d || a.params.autoplay.delay;
          (d = r - (new Date().getTime() - w)),
            (a.isEnd && d < 0 && !a.params.loop) || (d < 0 && (d = 0), i());
        },
        T = () => {
          (a.isEnd && d < 0 && !a.params.loop) ||
            a.destroyed ||
            !a.autoplay.running ||
            ((w = new Date().getTime()),
            f ? ((f = !1), _(d)) : _(),
            (a.autoplay.paused = !1),
            n("autoplayResume"));
        },
        C = () => {
          if (a.destroyed || !a.autoplay.running) return;
          let e = i();
          "hidden" === e.visibilityState && ((f = !0), S(!0)),
            "visible" === e.visibilityState && T();
        },
        P = (e) => {
          "mouse" === e.pointerType &&
            ((f = !0), (g = !0), a.animating || a.autoplay.paused || S(!0));
        },
        L = (e) => {
          "mouse" === e.pointerType && ((g = !1), a.autoplay.paused && T());
        };
      l("init", () => {
        a.params.autoplay.enabled &&
          (a.params.autoplay.pauseOnMouseEnter &&
            (a.el.addEventListener("pointerenter", P),
            a.el.addEventListener("pointerleave", L)),
          i().addEventListener("visibilitychange", C),
          E());
      }),
        l("destroy", () => {
          a.el &&
            "string" != typeof a.el &&
            (a.el.removeEventListener("pointerenter", P),
            a.el.removeEventListener("pointerleave", L)),
            i().removeEventListener("visibilitychange", C),
            a.autoplay.running && x();
        }),
        l("_freeModeStaticRelease", () => {
          (u || f) && T();
        }),
        l("_freeModeNoMomentumRelease", () => {
          a.params.autoplay.disableOnInteraction ? x() : S(!0, !0);
        }),
        l("beforeTransitionStart", (e, t, s) => {
          !a.destroyed &&
            a.autoplay.running &&
            (s || !a.params.autoplay.disableOnInteraction ? S(!0, !0) : x());
        }),
        l("sliderFirstMove", () => {
          !a.destroyed &&
            a.autoplay.running &&
            (a.params.autoplay.disableOnInteraction
              ? x()
              : ((c = !0),
                (u = !1),
                (f = !1),
                (m = setTimeout(() => {
                  (f = !0), (u = !0), S(!0);
                }, 200))));
        }),
        l("touchEnd", () => {
          if (!a.destroyed && a.autoplay.running && c) {
            if (
              (clearTimeout(m),
              clearTimeout(t),
              a.params.autoplay.disableOnInteraction)
            )
              return (u = !1), void (c = !1);
            u && a.params.cssMode && T(), (u = !1), (c = !1);
          }
        }),
        l("slideChange", () => {
          !a.destroyed && a.autoplay.running && (h = !0);
        }),
        Object.assign(a.autoplay, { start: E, stop: x, pause: S, resume: T });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let r = !1,
        l = !1;
      function n() {
        let e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        let s = e.clickedIndex,
          i = e.clickedSlide;
        if (
          (i && i.classList.contains(t.params.thumbs.slideThumbActiveClass)) ||
          null == s
        )
          return;
        let a;
        (a = e.params.loop
          ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
          : s),
          t.params.loop ? t.slideToLoop(a) : t.slideTo(a);
      }
      function o() {
        let { thumbs: e } = t.params;
        if (r) return !1;
        r = !0;
        let s = t.constructor;
        if (e.swiper instanceof s) {
          if (e.swiper.destroyed) return (r = !1), !1;
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            t.thumbs.swiper.update();
        } else if (p(e.swiper)) {
          let i = Object.assign({}, e.swiper);
          Object.assign(i, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(i)),
            (l = !0);
        }
        return (
          t.thumbs.swiper.el.classList.add(
            t.params.thumbs.thumbsContainerClass
          ),
          t.thumbs.swiper.on("tap", n),
          !0
        );
      }
      function d(e) {
        let s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        let i =
            "auto" === s.params.slidesPerView
              ? s.slidesPerViewDynamic()
              : s.params.slidesPerView,
          a = 1,
          r = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (a = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (a = 1),
          (a = Math.floor(a)),
          s.slides.forEach((e) => e.classList.remove(r)),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let l = 0; l < a; l += 1)
            f(
              s.slidesEl,
              `[data-swiper-slide-index="${t.realIndex + l}"]`
            ).forEach((e) => {
              e.classList.add(r);
            });
        else
          for (let n = 0; n < a; n += 1)
            s.slides[t.realIndex + n] &&
              s.slides[t.realIndex + n].classList.add(r);
        let o = t.params.thumbs.autoScrollOffset,
          d = o && !s.params.loop;
        if (t.realIndex !== s.realIndex || d) {
          let p = s.activeIndex,
            c,
            u;
          if (s.params.loop) {
            let m = s.slides.find(
              (e) =>
                e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`
            );
            (c = s.slides.indexOf(m)),
              (u = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else u = (c = t.realIndex) > t.previousIndex ? "next" : "prev";
          d && (c += "next" === u ? o : -1 * o),
            s.visibleSlidesIndexes &&
              0 > s.visibleSlidesIndexes.indexOf(c) &&
              (s.params.centeredSlides
                ? (c =
                    c > p
                      ? c - Math.floor(i / 2) + 1
                      : c + Math.floor(i / 2) - 1)
                : c > p && s.params.slidesPerGroup,
              s.slideTo(c, e ? 0 : void 0));
        }
      }
      (t.thumbs = { swiper: null }),
        a("beforeInit", () => {
          let { thumbs: e } = t.params;
          if (e && e.swiper) {
            if (
              "string" == typeof e.swiper ||
              e.swiper instanceof HTMLElement
            ) {
              let s = i(),
                a = () => {
                  let i =
                    "string" == typeof e.swiper
                      ? s.querySelector(e.swiper)
                      : e.swiper;
                  if (i && i.swiper) (e.swiper = i.swiper), o(), d(!0);
                  else if (i) {
                    let a = `${t.params.eventsPrefix}init`,
                      r = (s) => {
                        (e.swiper = s.detail[0]),
                          i.removeEventListener(a, r),
                          o(),
                          d(!0),
                          e.swiper.update(),
                          t.update();
                      };
                    i.addEventListener(a, r);
                  }
                  return i;
                },
                r = () => {
                  !t.destroyed && (a() || requestAnimationFrame(r));
                };
              requestAnimationFrame(r);
            } else o(), d(!0);
          }
        }),
        a("slideChange update resize observerUpdate", () => {
          d();
        }),
        a("setTransition", (e, s) => {
          let i = t.thumbs.swiper;
          i && !i.destroyed && i.setTransition(s);
        }),
        a("beforeDestroy", () => {
          let e = t.thumbs.swiper;
          e && !e.destroyed && l && e.destroy();
        }),
        Object.assign(t.thumbs, { init: o, update: d });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: i, once: a } = e;
      s({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(t, {
          freeMode: {
            onTouchStart: function () {
              if (t.params.cssMode) return;
              let e = t.getTranslate();
              t.setTranslate(e),
                t.setTransition(0),
                (t.touchEventsData.velocities.length = 0),
                t.freeMode.onTouchEnd({
                  currentPos: t.rtl ? t.translate : -t.translate,
                });
            },
            onTouchMove: function () {
              if (t.params.cssMode) return;
              let { touchEventsData: e, touches: s } = t;
              0 === e.velocities.length &&
                e.velocities.push({
                  position: s[t.isHorizontal() ? "startX" : "startY"],
                  time: e.touchStartTime,
                }),
                e.velocities.push({
                  position: s[t.isHorizontal() ? "currentX" : "currentY"],
                  time: o(),
                });
            },
            onTouchEnd: function (e) {
              let { currentPos: s } = e;
              if (t.params.cssMode) return;
              let {
                  params: r,
                  wrapperEl: l,
                  rtlTranslate: n,
                  snapGrid: d,
                  touchEventsData: p,
                } = t,
                c = o() - p.touchStartTime;
              if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
              else if (s > -t.maxTranslate())
                t.slides.length < d.length
                  ? t.slideTo(d.length - 1)
                  : t.slideTo(t.slides.length - 1);
              else {
                if (r.freeMode.momentum) {
                  if (p.velocities.length > 1) {
                    let u = p.velocities.pop(),
                      m = p.velocities.pop(),
                      h = u.position - m.position,
                      f = u.time - m.time;
                    (t.velocity = h / f),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                        (t.velocity = 0),
                      (f > 150 || o() - u.time > 300) && (t.velocity = 0);
                  } else t.velocity = 0;
                  (t.velocity *= r.freeMode.momentumVelocityRatio),
                    (p.velocities.length = 0);
                  let g = 1e3 * r.freeMode.momentumRatio,
                    v = t.velocity * g,
                    $ = t.translate + v;
                  n && ($ = -$);
                  let w,
                    y = !1,
                    b =
                      20 *
                      Math.abs(t.velocity) *
                      r.freeMode.momentumBounceRatio,
                    E;
                  if ($ < t.maxTranslate())
                    r.freeMode.momentumBounce
                      ? ($ + t.maxTranslate() < -b &&
                          ($ = t.maxTranslate() - b),
                        (w = t.maxTranslate()),
                        (y = !0),
                        (p.allowMomentumBounce = !0))
                      : ($ = t.maxTranslate()),
                      r.loop && r.centeredSlides && (E = !0);
                  else if ($ > t.minTranslate())
                    r.freeMode.momentumBounce
                      ? ($ - t.minTranslate() > b && ($ = t.minTranslate() + b),
                        (w = t.minTranslate()),
                        (y = !0),
                        (p.allowMomentumBounce = !0))
                      : ($ = t.minTranslate()),
                      r.loop && r.centeredSlides && (E = !0);
                  else if (r.freeMode.sticky) {
                    let x;
                    for (let S = 0; S < d.length; S += 1)
                      if (d[S] > -$) {
                        x = S;
                        break;
                      }
                    $ = -($ =
                      Math.abs(d[x] - $) < Math.abs(d[x - 1] - $) ||
                      "next" === t.swipeDirection
                        ? d[x]
                        : d[x - 1]);
                  }
                  if (
                    (E &&
                      a("transitionEnd", () => {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  ) {
                    if (
                      ((g = n
                        ? Math.abs((-$ - t.translate) / t.velocity)
                        : Math.abs(($ - t.translate) / t.velocity)),
                      r.freeMode.sticky)
                    ) {
                      let T = Math.abs((n ? -$ : $) - t.translate),
                        C = t.slidesSizesGrid[t.activeIndex];
                      g =
                        T < C
                          ? r.speed
                          : T < 2 * C
                          ? 1.5 * r.speed
                          : 2.5 * r.speed;
                    }
                  } else if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode.momentumBounce && y
                    ? (t.updateProgress(w),
                      t.setTransition(g),
                      t.setTranslate($),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      _(l, () => {
                        t &&
                          !t.destroyed &&
                          p.allowMomentumBounce &&
                          (i("momentumBounce"),
                          t.setTransition(r.speed),
                          setTimeout(() => {
                            t.setTranslate(w),
                              _(l, () => {
                                t && !t.destroyed && t.transitionEnd();
                              });
                          }, 0));
                      }))
                    : t.velocity
                    ? (i("_freeModeNoMomentumRelease"),
                      t.updateProgress($),
                      t.setTransition(g),
                      t.setTranslate($),
                      t.transitionStart(!0, t.swipeDirection),
                      t.animating ||
                        ((t.animating = !0),
                        _(l, () => {
                          t && !t.destroyed && t.transitionEnd();
                        })))
                    : t.updateProgress($),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
                } else {
                  if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode && i("_freeModeNoMomentumRelease");
                }
                (!r.freeMode.momentum || c >= r.longSwipesMs) &&
                  (i("_freeModeStaticRelease"),
                  t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              }
            },
          },
        });
    },
    function (e) {
      let t,
        s,
        i,
        a,
        { swiper: r, extendParams: l, on: n } = e;
      l({ grid: { rows: 1, fill: "column" } });
      let o = () => {
        let e = r.params.spaceBetween;
        return (
          "string" == typeof e && e.indexOf("%") >= 0
            ? (e = (parseFloat(e.replace("%", "")) / 100) * r.size)
            : "string" == typeof e && (e = parseFloat(e)),
          e
        );
      };
      n("init", () => {
        a = r.params.grid && r.params.grid.rows > 1;
      }),
        n("update", () => {
          let { params: e, el: t } = r,
            s = e.grid && e.grid.rows > 1;
          a && !s
            ? (t.classList.remove(
                `${e.containerModifierClass}grid`,
                `${e.containerModifierClass}grid-column`
              ),
              (i = 1),
              r.emitContainerClasses())
            : !a &&
              s &&
              (t.classList.add(`${e.containerModifierClass}grid`),
              "column" === e.grid.fill &&
                t.classList.add(`${e.containerModifierClass}grid-column`),
              r.emitContainerClasses()),
            (a = s);
        }),
        (r.grid = {
          initSlides(e) {
            let { slidesPerView: a } = r.params,
              { rows: l, fill: n } = r.params.grid,
              o =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : e.length;
            (i = Math.floor(o / l)),
              (t = Math.floor(o / l) === o / l ? o : Math.ceil(o / l) * l),
              "auto" !== a && "row" === n && (t = Math.max(t, a * l)),
              (s = t / l);
          },
          unsetSlides() {
            r.slides &&
              r.slides.forEach((e) => {
                e.swiperSlideGridSet &&
                  ((e.style.height = ""),
                  (e.style[r.getDirectionLabel("margin-top")] = ""));
              });
          },
          updateSlide(e, a, l) {
            let { slidesPerGroup: n } = r.params,
              d = o(),
              { rows: p, fill: c } = r.params.grid,
              u =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : l.length,
              m,
              h,
              f;
            if ("row" === c && n > 1) {
              let g = Math.floor(e / (n * p)),
                v = e - p * n * g,
                $ = 0 === g ? n : Math.min(Math.ceil((u - g * p * n) / p), n);
              (f = Math.floor(v / $)),
                (m = (h = v - f * $ + g * n) + (f * t) / p),
                (a.style.order = m);
            } else
              "column" === c
                ? ((h = Math.floor(e / p)),
                  (f = e - h * p),
                  (h > i || (h === i && f === p - 1)) &&
                    (f += 1) >= p &&
                    ((f = 0), (h += 1)))
                : ((f = Math.floor(e / s)), (h = e - f * s));
            (a.row = f),
              (a.column = h),
              (a.style.height = `calc((100% - ${(p - 1) * d}px) / ${p})`),
              (a.style[r.getDirectionLabel("margin-top")] =
                0 !== f ? d && `${d}px` : ""),
              (a.swiperSlideGridSet = !0);
          },
          updateWrapperSize(e, s) {
            let { centeredSlides: i, roundLengths: a } = r.params,
              l = o(),
              { rows: n } = r.params.grid;
            if (
              ((r.virtualSize = (e + l) * t),
              (r.virtualSize = Math.ceil(r.virtualSize / n) - l),
              r.params.cssMode ||
                (r.wrapperEl.style[r.getDirectionLabel("width")] = `${
                  r.virtualSize + l
                }px`),
              i)
            ) {
              let d = [];
              for (let p = 0; p < s.length; p += 1) {
                let c = s[p];
                a && (c = Math.floor(c)),
                  s[p] < r.virtualSize + s[0] && d.push(c);
              }
              s.splice(0, s.length), s.push(...d);
            }
          },
        });
    },
    function (e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: et.bind(t),
        prependSlide: es.bind(t),
        addSlide: ei.bind(t),
        removeSlide: ea.bind(t),
        removeAllSlides: er.bind(t),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ fadeEffect: { crossFade: !1 } }),
        el({
          effect: "fade",
          swiper: t,
          on: i,
          setTranslate() {
            let { slides: e } = t;
            t.params.fadeEffect;
            for (let s = 0; s < e.length; s += 1) {
              let i = t.slides[s],
                a = -i.swiperSlideOffset;
              t.params.virtualTranslate || (a -= t.translate);
              let r = 0;
              t.isHorizontal() || ((r = a), (a = 0));
              let l = t.params.fadeEffect.crossFade
                  ? Math.max(1 - Math.abs(i.progress), 0)
                  : 1 + Math.min(Math.max(i.progress, -1), 0),
                n = en(0, i);
              (n.style.opacity = l),
                (n.style.transform = `translate3d(${a}px, ${r}px, 0px)`);
            }
          },
          setTransition(e) {
            let s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              t.style.transitionDuration = `${e}ms`;
            }),
              eo({
                swiper: t,
                duration: e,
                transformElements: s,
                allSlides: !0,
              });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
      let a = (e, t, s) => {
        let i = s
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          a = s
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        i ||
          ((i = v(
            "div",
            (
              "swiper-slide-shadow-cube swiper-slide-shadow-" +
              (s ? "left" : "top")
            ).split(" ")
          )),
          e.append(i)),
          a ||
            ((a = v(
              "div",
              (
                "swiper-slide-shadow-cube swiper-slide-shadow-" +
                (s ? "right" : "bottom")
              ).split(" ")
            )),
            e.append(a)),
          i && (i.style.opacity = Math.max(-t, 0)),
          a && (a.style.opacity = Math.max(t, 0));
      };
      el({
        effect: "cube",
        swiper: t,
        on: i,
        setTranslate() {
          let {
              el: e,
              wrapperEl: s,
              slides: i,
              width: r,
              height: l,
              rtlTranslate: n,
              size: o,
              browser: d,
            } = t,
            p = S(t),
            c = t.params.cubeEffect,
            u = t.isHorizontal(),
            m = t.virtual && t.params.virtual.enabled,
            h,
            f = 0;
          c.shadow &&
            (u
              ? ((h = t.wrapperEl.querySelector(".swiper-cube-shadow")) ||
                  ((h = v("div", "swiper-cube-shadow")), t.wrapperEl.append(h)),
                (h.style.height = `${r}px`))
              : (h = e.querySelector(".swiper-cube-shadow")) ||
                ((h = v("div", "swiper-cube-shadow")), e.append(h)));
          for (let g = 0; g < i.length; g += 1) {
            let $ = i[g],
              w = g;
            m && (w = parseInt($.getAttribute("data-swiper-slide-index"), 10));
            let y = 90 * w,
              b = Math.floor(y / 360);
            n && (b = Math.floor(-(y = -y) / 360));
            let _ = Math.max(Math.min($.progress, 1), -1),
              E = 0,
              x = 0,
              T = 0;
            w % 4 == 0
              ? ((E = -(4 * b) * o), (T = 0))
              : (w - 1) % 4 == 0
              ? ((E = 0), (T = -(4 * b) * o))
              : (w - 2) % 4 == 0
              ? ((E = o + 4 * b * o), (T = o))
              : (w - 3) % 4 == 0 && ((E = -o), (T = 3 * o + 4 * o * b)),
              n && (E = -E),
              u || ((x = E), (E = 0));
            let C = `rotateX(${p(u ? 0 : -y)}deg) rotateY(${p(
              u ? y : 0
            )}deg) translate3d(${E}px, ${x}px, ${T}px)`;
            _ <= 1 &&
              _ > -1 &&
              ((f = 90 * w + 90 * _), n && (f = -(90 * w) - 90 * _)),
              ($.style.transform = C),
              c.slideShadows && a($, _, u);
          }
          if (
            ((s.style.transformOrigin = `50% 50% -${o / 2}px`),
            (s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`),
            c.shadow)
          ) {
            if (u)
              h.style.transform = `translate3d(0px, ${
                r / 2 + c.shadowOffset
              }px, ${-r / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${
                c.shadowScale
              })`;
            else {
              let P = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                L = c.shadowScale,
                M =
                  c.shadowScale /
                  (1.5 -
                    (Math.sin((2 * P * Math.PI) / 360) / 2 +
                      Math.cos((2 * P * Math.PI) / 360) / 2)),
                z = c.shadowOffset;
              h.style.transform = `scale3d(${L}, 1, ${M}) translate3d(0px, ${
                l / 2 + z
              }px, ${-l / 2 / M}px) rotateX(-89.99deg)`;
            }
          }
          let k =
            (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
          (s.style.transform = `translate3d(0px,0,${k}px) rotateX(${p(
            t.isHorizontal() ? 0 : f
          )}deg) rotateY(${p(t.isHorizontal() ? -f : 0)}deg)`),
            s.style.setProperty("--swiper-cube-translate-z", `${k}px`);
        },
        setTransition(e) {
          let { el: s, slides: i } = t;
          if (
            (i.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t
                  .querySelectorAll(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .forEach((t) => {
                    t.style.transitionDuration = `${e}ms`;
                  });
            }),
            t.params.cubeEffect.shadow && !t.isHorizontal())
          ) {
            let a = s.querySelector(".swiper-cube-shadow");
            a && (a.style.transitionDuration = `${e}ms`);
          }
        },
        recreateShadows() {
          let e = t.isHorizontal();
          t.slides.forEach((t) => {
            let s = Math.max(Math.min(t.progress, 1), -1);
            a(t, s, e);
          });
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
      let a = (e, s) => {
        let i = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          a = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        i || (i = ed("flip", e, t.isHorizontal() ? "left" : "top")),
          a || (a = ed("flip", e, t.isHorizontal() ? "right" : "bottom")),
          i && (i.style.opacity = Math.max(-s, 0)),
          a && (a.style.opacity = Math.max(s, 0));
      };
      el({
        effect: "flip",
        swiper: t,
        on: i,
        setTranslate() {
          let { slides: e, rtlTranslate: s } = t,
            i = t.params.flipEffect,
            r = S(t);
          for (let l = 0; l < e.length; l += 1) {
            let n = e[l],
              o = n.progress;
            t.params.flipEffect.limitRotation &&
              (o = Math.max(Math.min(n.progress, 1), -1));
            let d = n.swiperSlideOffset,
              p = -180 * o,
              c = 0,
              u = t.params.cssMode ? -d - t.translate : -d,
              m = 0;
            t.isHorizontal()
              ? s && (p = -p)
              : ((m = u), (u = 0), (c = -p), (p = 0)),
              (n.style.zIndex = -Math.abs(Math.round(o)) + e.length),
              i.slideShadows && a(n, o);
            let h = `translate3d(${u}px, ${m}px, 0px) rotateX(${r(
              c
            )}deg) rotateY(${r(p)}deg)`;
            en(0, n).style.transform = h;
          }
        },
        setTransition(e) {
          let s = t.slides.map((e) => h(e));
          s.forEach((t) => {
            (t.style.transitionDuration = `${e}ms`),
              t
                .querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                )
                .forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                });
          }),
            eo({ swiper: t, duration: e, transformElements: s });
        },
        recreateShadows() {
          t.params.flipEffect,
            t.slides.forEach((e) => {
              let s = e.progress;
              t.params.flipEffect.limitRotation &&
                (s = Math.max(Math.min(e.progress, 1), -1)),
                a(e, s);
            });
        },
        getEffectParams: () => t.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
        },
      }),
        el({
          effect: "coverflow",
          swiper: t,
          on: i,
          setTranslate() {
            let { width: e, height: s, slides: i, slidesSizesGrid: a } = t,
              r = t.params.coverflowEffect,
              l = t.isHorizontal(),
              n = t.translate,
              o = l ? e / 2 - n : s / 2 - n,
              d = l ? r.rotate : -r.rotate,
              p = r.depth,
              c = S(t);
            for (let u = 0, m = i.length; u < m; u += 1) {
              let h = i[u],
                f = a[u],
                g = (o - h.swiperSlideOffset - f / 2) / f,
                v =
                  "function" == typeof r.modifier
                    ? r.modifier(g)
                    : g * r.modifier,
                $ = l ? d * v : 0,
                w = l ? 0 : d * v,
                y = -p * Math.abs(v),
                b = r.stretch;
              "string" == typeof b &&
                -1 !== b.indexOf("%") &&
                (b = (parseFloat(r.stretch) / 100) * f);
              let _ = l ? 0 : b * v,
                E = l ? b * v : 0,
                x = 1 - (1 - r.scale) * Math.abs(v);
              0.001 > Math.abs(E) && (E = 0),
                0.001 > Math.abs(_) && (_ = 0),
                0.001 > Math.abs(y) && (y = 0),
                0.001 > Math.abs($) && ($ = 0),
                0.001 > Math.abs(w) && (w = 0),
                0.001 > Math.abs(x) && (x = 0);
              let T = `translate3d(${E}px,${_}px,${y}px)  rotateX(${c(
                w
              )}deg) rotateY(${c($)}deg) scale(${x})`;
              if (
                ((en(0, h).style.transform = T),
                (h.style.zIndex = 1 - Math.abs(Math.round(v))),
                r.slideShadows)
              ) {
                let C = l
                    ? h.querySelector(".swiper-slide-shadow-left")
                    : h.querySelector(".swiper-slide-shadow-top"),
                  P = l
                    ? h.querySelector(".swiper-slide-shadow-right")
                    : h.querySelector(".swiper-slide-shadow-bottom");
                C || (C = ed("coverflow", h, l ? "left" : "top")),
                  P || (P = ed("coverflow", h, l ? "right" : "bottom")),
                  C && (C.style.opacity = v > 0 ? v : 0),
                  P && (P.style.opacity = -v > 0 ? -v : 0);
              }
            }
          },
          setTransition(e) {
            t.slides
              .map((e) => h(e))
              .forEach((t) => {
                (t.style.transitionDuration = `${e}ms`),
                  t
                    .querySelectorAll(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .forEach((t) => {
                      t.style.transitionDuration = `${e}ms`;
                    });
              });
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        creativeEffect: {
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      let a = (e) => ("string" == typeof e ? e : `${e}px`);
      el({
        effect: "creative",
        swiper: t,
        on: i,
        setTranslate() {
          let { slides: e, wrapperEl: s, slidesSizesGrid: i } = t,
            r = t.params.creativeEffect,
            { progressMultiplier: l } = r,
            n = t.params.centeredSlides,
            o = S(t);
          if (n) {
            let d = i[0] / 2 - t.params.slidesOffsetBefore || 0;
            s.style.transform = `translateX(calc(50% - ${d}px))`;
          }
          for (let p = 0; p < e.length; p += 1) {
            let c = e[p],
              u = c.progress,
              m = Math.min(
                Math.max(c.progress, -r.limitProgress),
                r.limitProgress
              ),
              h = m;
            n ||
              (h = Math.min(
                Math.max(c.originalProgress, -r.limitProgress),
                r.limitProgress
              ));
            let f = c.swiperSlideOffset,
              g = [t.params.cssMode ? -f - t.translate : -f, 0, 0],
              v = [0, 0, 0],
              $ = !1;
            t.isHorizontal() || ((g[1] = g[0]), (g[0] = 0));
            let w = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            m < 0
              ? ((w = r.next), ($ = !0))
              : m > 0 && ((w = r.prev), ($ = !0)),
              g.forEach((e, t) => {
                g[t] = `calc(${e}px + (${a(w.translate[t])} * ${Math.abs(
                  m * l
                )}))`;
              }),
              v.forEach((e, t) => {
                let s = w.rotate[t] * Math.abs(m * l);
                v[t] = s;
              }),
              (c.style.zIndex = -Math.abs(Math.round(u)) + e.length);
            let y = g.join(", "),
              b = `rotateX(${o(v[0])}deg) rotateY(${o(v[1])}deg) rotateZ(${o(
                v[2]
              )}deg)`,
              _ =
                h < 0
                  ? `scale(${1 + (1 - w.scale) * h * l})`
                  : `scale(${1 - (1 - w.scale) * h * l})`,
              E =
                h < 0
                  ? 1 + (1 - w.opacity) * h * l
                  : 1 - (1 - w.opacity) * h * l,
              x = `translate3d(${y}) ${b} ${_}`;
            if (($ && w.shadow) || !$) {
              let T = c.querySelector(".swiper-slide-shadow");
              if ((!T && w.shadow && (T = ed("creative", c)), T)) {
                let C = r.shadowPerProgress ? m * (1 / r.limitProgress) : m;
                T.style.opacity = Math.min(Math.max(Math.abs(C), 0), 1);
              }
            }
            let P = en(0, c);
            (P.style.transform = x),
              (P.style.opacity = E),
              w.origin && (P.style.transformOrigin = w.origin);
          }
        },
        setTransition(e) {
          let s = t.slides.map((e) => h(e));
          s.forEach((t) => {
            (t.style.transitionDuration = `${e}ms`),
              t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                t.style.transitionDuration = `${e}ms`;
              });
          }),
            eo({ swiper: t, duration: e, transformElements: s, allSlides: !0 });
        },
        perspective: () => t.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        cardsEffect: {
          slideShadows: !0,
          rotate: !0,
          perSlideRotate: 2,
          perSlideOffset: 8,
        },
      }),
        el({
          effect: "cards",
          swiper: t,
          on: i,
          setTranslate() {
            let { slides: e, activeIndex: s, rtlTranslate: i } = t,
              a = t.params.cardsEffect,
              { startTranslate: r, isTouched: l } = t.touchEventsData,
              n = i ? -t.translate : t.translate;
            for (let o = 0; o < e.length; o += 1) {
              let d = e[o],
                p = d.progress,
                c = Math.min(Math.max(p, -4), 4),
                u = d.swiperSlideOffset;
              t.params.centeredSlides &&
                !t.params.cssMode &&
                (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                t.params.centeredSlides &&
                  t.params.cssMode &&
                  (u -= e[0].swiperSlideOffset);
              let m = t.params.cssMode ? -u - t.translate : -u,
                h = 0,
                f = -100 * Math.abs(c),
                g = 1,
                v = -a.perSlideRotate * c,
                $ = a.perSlideOffset - 0.75 * Math.abs(c),
                w =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.from + o
                    : o,
                y =
                  (w === s || w === s - 1) &&
                  c > 0 &&
                  c < 1 &&
                  (l || t.params.cssMode) &&
                  n < r,
                b =
                  (w === s || w === s + 1) &&
                  c < 0 &&
                  c > -1 &&
                  (l || t.params.cssMode) &&
                  n > r;
              if (y || b) {
                let _ = (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                (v += -28 * c * _),
                  (g += -0.5 * _),
                  ($ += 96 * _),
                  (h = -25 * _ * Math.abs(c) + "%");
              }
              if (
                ((m =
                  c < 0
                    ? `calc(${m}px ${i ? "-" : "+"} (${$ * Math.abs(c)}%))`
                    : c > 0
                    ? `calc(${m}px ${i ? "-" : "+"} (-${$ * Math.abs(c)}%))`
                    : `${m}px`),
                !t.isHorizontal())
              ) {
                let E = h;
                (h = m), (m = E);
              }
              let x = c < 0 ? "" + (1 + (1 - g) * c) : "" + (1 - (1 - g) * c),
                S = `
        translate3d(${m}, ${h}, ${f}px)
        rotateZ(${a.rotate ? (i ? -v : v) : 0}deg)
        scale(${x})
      `;
              if (a.slideShadows) {
                let T = d.querySelector(".swiper-slide-shadow");
                T || (T = ed("cards", d)),
                  T &&
                    (T.style.opacity = Math.min(
                      Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                      1
                    ));
              }
              (d.style.zIndex = -Math.abs(Math.round(p)) + e.length),
                (en(0, d).style.transform = S);
            }
          },
          setTransition(e) {
            let s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                });
            }),
              eo({ swiper: t, duration: e, transformElements: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            _loopSwapReset: !1,
            watchSlidesProgress: !0,
            loopAdditionalSlides: t.params.cardsEffect.rotate ? 3 : 2,
            centeredSlides: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
  ];
  return Q.use(ep), Q;
})();
