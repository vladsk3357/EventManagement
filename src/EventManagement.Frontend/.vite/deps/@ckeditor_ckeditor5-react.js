import {
  require_react
} from "./chunk-LNTNMRP6.js";
import {
  __commonJS
} from "./chunk-FWVXXLA5.js";

// node_modules/@ckeditor/ckeditor5-react/dist/index.js
var require_dist = __commonJS({
  "node_modules/@ckeditor/ckeditor5-react/dist/index.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e(require_react()) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.CKEditor = e(require_react()) : t.CKEditor = e(t.React);
    }(self, (t) => (() => {
      var e = { 703: (t2, e2, r2) => {
        "use strict";
        var o2 = r2(414);
        function n2() {
        }
        function s() {
        }
        s.resetWarningCache = n2, t2.exports = function() {
          function t3(t4, e4, r4, n3, s2, i) {
            if (i !== o2) {
              var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw a.name = "Invariant Violation", a;
            }
          }
          function e3() {
            return t3;
          }
          t3.isRequired = t3;
          var r3 = { array: t3, bigint: t3, bool: t3, func: t3, number: t3, object: t3, string: t3, symbol: t3, any: t3, arrayOf: e3, element: t3, elementType: t3, instanceOf: e3, node: t3, objectOf: e3, oneOf: e3, oneOfType: e3, shape: e3, exact: e3, checkPropTypes: s, resetWarningCache: n2 };
          return r3.PropTypes = r3, r3;
        };
      }, 697: (t2, e2, r2) => {
        t2.exports = r2(703)();
      }, 414: (t2) => {
        "use strict";
        t2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      }, 787: (e2) => {
        "use strict";
        e2.exports = t;
      } }, r = {};
      function o(t2) {
        var n2 = r[t2];
        if (void 0 !== n2)
          return n2.exports;
        var s = r[t2] = { exports: {} };
        return e[t2](s, s.exports, o), s.exports;
      }
      o.n = (t2) => {
        var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
        return o.d(e2, { a: e2 }), e2;
      }, o.d = (t2, e2) => {
        for (var r2 in e2)
          o.o(e2, r2) && !o.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: e2[r2] });
      }, o.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), o.r = (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      };
      var n = {};
      return (() => {
        "use strict";
        o.r(n), o.d(n, { CKEditor: () => eo, CKEditorContext: () => Zr, useMultiRootEditor: () => no });
        var t2 = o(787), e2 = o.n(t2), r2 = o(697), s = o.n(r2);
        const i = new Array(256).fill("").map((t3, e3) => ("0" + e3.toString(16)).slice(-2));
        class a {
          constructor(t3) {
            if (this.crashes = [], this.state = "initializing", this._now = Date.now, this.crashes = [], this._crashNumberLimit = "number" == typeof t3.crashNumberLimit ? t3.crashNumberLimit : 3, this._minimumNonErrorTimePeriod = "number" == typeof t3.minimumNonErrorTimePeriod ? t3.minimumNonErrorTimePeriod : 5e3, this._boundErrorHandler = (t4) => {
              const e3 = "error" in t4 ? t4.error : t4.reason;
              e3 instanceof Error && this._handleError(e3, t4);
            }, this._listeners = {}, !this._restart)
              throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.");
          }
          destroy() {
            this._stopErrorHandling(), this._listeners = {};
          }
          on(t3, e3) {
            this._listeners[t3] || (this._listeners[t3] = []), this._listeners[t3].push(e3);
          }
          off(t3, e3) {
            this._listeners[t3] = this._listeners[t3].filter((t4) => t4 !== e3);
          }
          _fire(t3, ...e3) {
            const r3 = this._listeners[t3] || [];
            for (const t4 of r3)
              t4.apply(this, [null, ...e3]);
          }
          _startErrorHandling() {
            window.addEventListener("error", this._boundErrorHandler), window.addEventListener("unhandledrejection", this._boundErrorHandler);
          }
          _stopErrorHandling() {
            window.removeEventListener("error", this._boundErrorHandler), window.removeEventListener("unhandledrejection", this._boundErrorHandler);
          }
          _handleError(t3, e3) {
            if (this._shouldReactToError(t3)) {
              this.crashes.push({ message: t3.message, stack: t3.stack, filename: e3 instanceof ErrorEvent ? e3.filename : void 0, lineno: e3 instanceof ErrorEvent ? e3.lineno : void 0, colno: e3 instanceof ErrorEvent ? e3.colno : void 0, date: this._now() });
              const r3 = this._shouldRestart();
              this.state = "crashed", this._fire("stateChange"), this._fire("error", { error: t3, causesRestart: r3 }), r3 ? this._restart() : (this.state = "crashedPermanently", this._fire("stateChange"));
            }
          }
          _shouldReactToError(t3) {
            return t3.is && t3.is("CKEditorError") && void 0 !== t3.context && null !== t3.context && "ready" === this.state && this._isErrorComingFromThisItem(t3);
          }
          _shouldRestart() {
            if (this.crashes.length <= this._crashNumberLimit)
              return true;
            return (this.crashes[this.crashes.length - 1].date - this.crashes[this.crashes.length - 1 - this._crashNumberLimit].date) / this._crashNumberLimit > this._minimumNonErrorTimePeriod;
          }
        }
        function c(t3, e3 = /* @__PURE__ */ new Set()) {
          const r3 = [t3], o2 = /* @__PURE__ */ new Set();
          let n2 = 0;
          for (; r3.length > n2; ) {
            const t4 = r3[n2++];
            if (!o2.has(t4) && u(t4) && !e3.has(t4))
              if (o2.add(t4), Symbol.iterator in t4)
                try {
                  for (const e4 of t4)
                    r3.push(e4);
                } catch (t5) {
                }
              else
                for (const e4 in t4)
                  "defaultValue" !== e4 && r3.push(t4[e4]);
          }
          return o2;
        }
        function u(t3) {
          const e3 = Object.prototype.toString.call(t3), r3 = typeof t3;
          return !("number" === r3 || "boolean" === r3 || "string" === r3 || "symbol" === r3 || "function" === r3 || "[object Date]" === e3 || "[object RegExp]" === e3 || "[object Module]" === e3 || null == t3 || t3._watchdogExcluded || t3 instanceof EventTarget || t3 instanceof Event);
        }
        function d(t3, e3, r3 = /* @__PURE__ */ new Set()) {
          if (t3 === e3 && ("object" == typeof (o2 = t3) && null !== o2))
            return true;
          var o2;
          const n2 = c(t3, r3), s2 = c(e3, r3);
          for (const t4 of n2)
            if (s2.has(t4))
              return true;
          return false;
        }
        const h = function(t3) {
          var e3 = typeof t3;
          return null != t3 && ("object" == e3 || "function" == e3);
        };
        const l = "object" == typeof global && global && global.Object === Object && global;
        var f = "object" == typeof self && self && self.Object === Object && self;
        const p = l || f || Function("return this")();
        const g = function() {
          return p.Date.now();
        };
        var _ = /\s/;
        const y = function(t3) {
          for (var e3 = t3.length; e3-- && _.test(t3.charAt(e3)); )
            ;
          return e3;
        };
        var b = /^\s+/;
        const m = function(t3) {
          return t3 ? t3.slice(0, y(t3) + 1).replace(b, "") : t3;
        };
        const v = p.Symbol;
        var w = Object.prototype, j = w.hasOwnProperty, E = w.toString, x = v ? v.toStringTag : void 0;
        const O = function(t3) {
          var e3 = j.call(t3, x), r3 = t3[x];
          try {
            t3[x] = void 0;
            var o2 = true;
          } catch (t4) {
          }
          var n2 = E.call(t3);
          return o2 && (e3 ? t3[x] = r3 : delete t3[x]), n2;
        };
        var C = Object.prototype.toString;
        const R = function(t3) {
          return C.call(t3);
        };
        var A = v ? v.toStringTag : void 0;
        const S = function(t3) {
          return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : A && A in Object(t3) ? O(t3) : R(t3);
        };
        const P = function(t3) {
          return null != t3 && "object" == typeof t3;
        };
        const T = function(t3) {
          return "symbol" == typeof t3 || P(t3) && "[object Symbol]" == S(t3);
        };
        var D = /^[-+]0x[0-9a-f]+$/i, N = /^0b[01]+$/i, W = /^0o[0-7]+$/i, k = parseInt;
        const I = function(t3) {
          if ("number" == typeof t3)
            return t3;
          if (T(t3))
            return NaN;
          if (h(t3)) {
            var e3 = "function" == typeof t3.valueOf ? t3.valueOf() : t3;
            t3 = h(e3) ? e3 + "" : e3;
          }
          if ("string" != typeof t3)
            return 0 === t3 ? t3 : +t3;
          t3 = m(t3);
          var r3 = N.test(t3);
          return r3 || W.test(t3) ? k(t3.slice(2), r3 ? 2 : 8) : D.test(t3) ? NaN : +t3;
        };
        var z = Math.max, U = Math.min;
        const M = function(t3, e3, r3) {
          var o2, n2, s2, i2, a2, c2, u2 = 0, d2 = false, l2 = false, f2 = true;
          if ("function" != typeof t3)
            throw new TypeError("Expected a function");
          function p2(e4) {
            var r4 = o2, s3 = n2;
            return o2 = n2 = void 0, u2 = e4, i2 = t3.apply(s3, r4);
          }
          function _2(t4) {
            var r4 = t4 - c2;
            return void 0 === c2 || r4 >= e3 || r4 < 0 || l2 && t4 - u2 >= s2;
          }
          function y2() {
            var t4 = g();
            if (_2(t4))
              return b2(t4);
            a2 = setTimeout(y2, function(t5) {
              var r4 = e3 - (t5 - c2);
              return l2 ? U(r4, s2 - (t5 - u2)) : r4;
            }(t4));
          }
          function b2(t4) {
            return a2 = void 0, f2 && o2 ? p2(t4) : (o2 = n2 = void 0, i2);
          }
          function m2() {
            var t4 = g(), r4 = _2(t4);
            if (o2 = arguments, n2 = this, c2 = t4, r4) {
              if (void 0 === a2)
                return function(t5) {
                  return u2 = t5, a2 = setTimeout(y2, e3), d2 ? p2(t5) : i2;
                }(c2);
              if (l2)
                return clearTimeout(a2), a2 = setTimeout(y2, e3), p2(c2);
            }
            return void 0 === a2 && (a2 = setTimeout(y2, e3)), i2;
          }
          return e3 = I(e3) || 0, h(r3) && (d2 = !!r3.leading, s2 = (l2 = "maxWait" in r3) ? z(I(r3.maxWait) || 0, e3) : s2, f2 = "trailing" in r3 ? !!r3.trailing : f2), m2.cancel = function() {
            void 0 !== a2 && clearTimeout(a2), u2 = 0, o2 = c2 = n2 = a2 = void 0;
          }, m2.flush = function() {
            return void 0 === a2 ? i2 : b2(g());
          }, m2;
        };
        const F = function(t3, e3, r3) {
          var o2 = true, n2 = true;
          if ("function" != typeof t3)
            throw new TypeError("Expected a function");
          return h(r3) && (o2 = "leading" in r3 ? !!r3.leading : o2, n2 = "trailing" in r3 ? !!r3.trailing : n2), M(t3, e3, { leading: o2, maxWait: e3, trailing: n2 });
        };
        const L = function(t3, e3) {
          return function(r3) {
            return t3(e3(r3));
          };
        };
        const q = L(Object.getPrototypeOf, Object);
        var J = Function.prototype, B = Object.prototype, $ = J.toString, H = B.hasOwnProperty, K = $.call(Object);
        const V = function(t3) {
          if (!P(t3) || "[object Object]" != S(t3))
            return false;
          var e3 = q(t3);
          if (null === e3)
            return true;
          var r3 = H.call(e3, "constructor") && e3.constructor;
          return "function" == typeof r3 && r3 instanceof r3 && $.call(r3) == K;
        };
        const Q = function(t3) {
          return P(t3) && 1 === t3.nodeType && !V(t3);
        };
        const G = function() {
          this.__data__ = [], this.size = 0;
        };
        const Y = function(t3, e3) {
          return t3 === e3 || t3 != t3 && e3 != e3;
        };
        const X = function(t3, e3) {
          for (var r3 = t3.length; r3--; )
            if (Y(t3[r3][0], e3))
              return r3;
          return -1;
        };
        var Z = Array.prototype.splice;
        const tt = function(t3) {
          var e3 = this.__data__, r3 = X(e3, t3);
          return !(r3 < 0) && (r3 == e3.length - 1 ? e3.pop() : Z.call(e3, r3, 1), --this.size, true);
        };
        const et = function(t3) {
          var e3 = this.__data__, r3 = X(e3, t3);
          return r3 < 0 ? void 0 : e3[r3][1];
        };
        const rt = function(t3) {
          return X(this.__data__, t3) > -1;
        };
        const ot = function(t3, e3) {
          var r3 = this.__data__, o2 = X(r3, t3);
          return o2 < 0 ? (++this.size, r3.push([t3, e3])) : r3[o2][1] = e3, this;
        };
        function nt(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        nt.prototype.clear = G, nt.prototype.delete = tt, nt.prototype.get = et, nt.prototype.has = rt, nt.prototype.set = ot;
        const st = nt;
        const it = function() {
          this.__data__ = new st(), this.size = 0;
        };
        const at = function(t3) {
          var e3 = this.__data__, r3 = e3.delete(t3);
          return this.size = e3.size, r3;
        };
        const ct = function(t3) {
          return this.__data__.get(t3);
        };
        const ut = function(t3) {
          return this.__data__.has(t3);
        };
        const dt = function(t3) {
          if (!h(t3))
            return false;
          var e3 = S(t3);
          return "[object Function]" == e3 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
        };
        const ht = p["__core-js_shared__"];
        var lt = function() {
          var t3 = /[^.]+$/.exec(ht && ht.keys && ht.keys.IE_PROTO || "");
          return t3 ? "Symbol(src)_1." + t3 : "";
        }();
        const ft = function(t3) {
          return !!lt && lt in t3;
        };
        var pt = Function.prototype.toString;
        const gt = function(t3) {
          if (null != t3) {
            try {
              return pt.call(t3);
            } catch (t4) {
            }
            try {
              return t3 + "";
            } catch (t4) {
            }
          }
          return "";
        };
        var _t = /^\[object .+?Constructor\]$/, yt = Function.prototype, bt = Object.prototype, mt = yt.toString, vt = bt.hasOwnProperty, wt = RegExp("^" + mt.call(vt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        const jt = function(t3) {
          return !(!h(t3) || ft(t3)) && (dt(t3) ? wt : _t).test(gt(t3));
        };
        const Et = function(t3, e3) {
          return null == t3 ? void 0 : t3[e3];
        };
        const xt = function(t3, e3) {
          var r3 = Et(t3, e3);
          return jt(r3) ? r3 : void 0;
        };
        const Ot = xt(p, "Map");
        const Ct = xt(Object, "create");
        const Rt = function() {
          this.__data__ = Ct ? Ct(null) : {}, this.size = 0;
        };
        const At = function(t3) {
          var e3 = this.has(t3) && delete this.__data__[t3];
          return this.size -= e3 ? 1 : 0, e3;
        };
        var St = Object.prototype.hasOwnProperty;
        const Pt = function(t3) {
          var e3 = this.__data__;
          if (Ct) {
            var r3 = e3[t3];
            return "__lodash_hash_undefined__" === r3 ? void 0 : r3;
          }
          return St.call(e3, t3) ? e3[t3] : void 0;
        };
        var Tt = Object.prototype.hasOwnProperty;
        const Dt = function(t3) {
          var e3 = this.__data__;
          return Ct ? void 0 !== e3[t3] : Tt.call(e3, t3);
        };
        const Nt = function(t3, e3) {
          var r3 = this.__data__;
          return this.size += this.has(t3) ? 0 : 1, r3[t3] = Ct && void 0 === e3 ? "__lodash_hash_undefined__" : e3, this;
        };
        function Wt(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        Wt.prototype.clear = Rt, Wt.prototype.delete = At, Wt.prototype.get = Pt, Wt.prototype.has = Dt, Wt.prototype.set = Nt;
        const kt = Wt;
        const It = function() {
          this.size = 0, this.__data__ = { hash: new kt(), map: new (Ot || st)(), string: new kt() };
        };
        const zt = function(t3) {
          var e3 = typeof t3;
          return "string" == e3 || "number" == e3 || "symbol" == e3 || "boolean" == e3 ? "__proto__" !== t3 : null === t3;
        };
        const Ut = function(t3, e3) {
          var r3 = t3.__data__;
          return zt(e3) ? r3["string" == typeof e3 ? "string" : "hash"] : r3.map;
        };
        const Mt = function(t3) {
          var e3 = Ut(this, t3).delete(t3);
          return this.size -= e3 ? 1 : 0, e3;
        };
        const Ft = function(t3) {
          return Ut(this, t3).get(t3);
        };
        const Lt = function(t3) {
          return Ut(this, t3).has(t3);
        };
        const qt = function(t3, e3) {
          var r3 = Ut(this, t3), o2 = r3.size;
          return r3.set(t3, e3), this.size += r3.size == o2 ? 0 : 1, this;
        };
        function Jt(t3) {
          var e3 = -1, r3 = null == t3 ? 0 : t3.length;
          for (this.clear(); ++e3 < r3; ) {
            var o2 = t3[e3];
            this.set(o2[0], o2[1]);
          }
        }
        Jt.prototype.clear = It, Jt.prototype.delete = Mt, Jt.prototype.get = Ft, Jt.prototype.has = Lt, Jt.prototype.set = qt;
        const Bt = Jt;
        const $t = function(t3, e3) {
          var r3 = this.__data__;
          if (r3 instanceof st) {
            var o2 = r3.__data__;
            if (!Ot || o2.length < 199)
              return o2.push([t3, e3]), this.size = ++r3.size, this;
            r3 = this.__data__ = new Bt(o2);
          }
          return r3.set(t3, e3), this.size = r3.size, this;
        };
        function Ht(t3) {
          var e3 = this.__data__ = new st(t3);
          this.size = e3.size;
        }
        Ht.prototype.clear = it, Ht.prototype.delete = at, Ht.prototype.get = ct, Ht.prototype.has = ut, Ht.prototype.set = $t;
        const Kt = Ht;
        const Vt = function(t3, e3) {
          for (var r3 = -1, o2 = null == t3 ? 0 : t3.length; ++r3 < o2 && false !== e3(t3[r3], r3, t3); )
            ;
          return t3;
        };
        const Qt = function() {
          try {
            var t3 = xt(Object, "defineProperty");
            return t3({}, "", {}), t3;
          } catch (t4) {
          }
        }();
        const Gt = function(t3, e3, r3) {
          "__proto__" == e3 && Qt ? Qt(t3, e3, { configurable: true, enumerable: true, value: r3, writable: true }) : t3[e3] = r3;
        };
        var Yt = Object.prototype.hasOwnProperty;
        const Xt = function(t3, e3, r3) {
          var o2 = t3[e3];
          Yt.call(t3, e3) && Y(o2, r3) && (void 0 !== r3 || e3 in t3) || Gt(t3, e3, r3);
        };
        const Zt = function(t3, e3, r3, o2) {
          var n2 = !r3;
          r3 || (r3 = {});
          for (var s2 = -1, i2 = e3.length; ++s2 < i2; ) {
            var a2 = e3[s2], c2 = o2 ? o2(r3[a2], t3[a2], a2, r3, t3) : void 0;
            void 0 === c2 && (c2 = t3[a2]), n2 ? Gt(r3, a2, c2) : Xt(r3, a2, c2);
          }
          return r3;
        };
        const te = function(t3, e3) {
          for (var r3 = -1, o2 = Array(t3); ++r3 < t3; )
            o2[r3] = e3(r3);
          return o2;
        };
        const ee = function(t3) {
          return P(t3) && "[object Arguments]" == S(t3);
        };
        var re = Object.prototype, oe = re.hasOwnProperty, ne = re.propertyIsEnumerable;
        const se = ee(function() {
          return arguments;
        }()) ? ee : function(t3) {
          return P(t3) && oe.call(t3, "callee") && !ne.call(t3, "callee");
        };
        const ie = Array.isArray;
        const ae = function() {
          return false;
        };
        var ce = "object" == typeof exports && exports && !exports.nodeType && exports, ue = ce && "object" == typeof module && module && !module.nodeType && module, de = ue && ue.exports === ce ? p.Buffer : void 0;
        const he = (de ? de.isBuffer : void 0) || ae;
        var le = /^(?:0|[1-9]\d*)$/;
        const fe = function(t3, e3) {
          var r3 = typeof t3;
          return !!(e3 = null == e3 ? 9007199254740991 : e3) && ("number" == r3 || "symbol" != r3 && le.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
        };
        const pe = function(t3) {
          return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= 9007199254740991;
        };
        var ge = {};
        ge["[object Float32Array]"] = ge["[object Float64Array]"] = ge["[object Int8Array]"] = ge["[object Int16Array]"] = ge["[object Int32Array]"] = ge["[object Uint8Array]"] = ge["[object Uint8ClampedArray]"] = ge["[object Uint16Array]"] = ge["[object Uint32Array]"] = true, ge["[object Arguments]"] = ge["[object Array]"] = ge["[object ArrayBuffer]"] = ge["[object Boolean]"] = ge["[object DataView]"] = ge["[object Date]"] = ge["[object Error]"] = ge["[object Function]"] = ge["[object Map]"] = ge["[object Number]"] = ge["[object Object]"] = ge["[object RegExp]"] = ge["[object Set]"] = ge["[object String]"] = ge["[object WeakMap]"] = false;
        const _e = function(t3) {
          return P(t3) && pe(t3.length) && !!ge[S(t3)];
        };
        const ye = function(t3) {
          return function(e3) {
            return t3(e3);
          };
        };
        var be = "object" == typeof exports && exports && !exports.nodeType && exports, me = be && "object" == typeof module && module && !module.nodeType && module, ve = me && me.exports === be && l.process;
        const we = function() {
          try {
            var t3 = me && me.require && me.require("util").types;
            return t3 || ve && ve.binding && ve.binding("util");
          } catch (t4) {
          }
        }();
        var je = we && we.isTypedArray;
        const Ee = je ? ye(je) : _e;
        var xe = Object.prototype.hasOwnProperty;
        const Oe = function(t3, e3) {
          var r3 = ie(t3), o2 = !r3 && se(t3), n2 = !r3 && !o2 && he(t3), s2 = !r3 && !o2 && !n2 && Ee(t3), i2 = r3 || o2 || n2 || s2, a2 = i2 ? te(t3.length, String) : [], c2 = a2.length;
          for (var u2 in t3)
            !e3 && !xe.call(t3, u2) || i2 && ("length" == u2 || n2 && ("offset" == u2 || "parent" == u2) || s2 && ("buffer" == u2 || "byteLength" == u2 || "byteOffset" == u2) || fe(u2, c2)) || a2.push(u2);
          return a2;
        };
        var Ce = Object.prototype;
        const Re = function(t3) {
          var e3 = t3 && t3.constructor;
          return t3 === ("function" == typeof e3 && e3.prototype || Ce);
        };
        const Ae = L(Object.keys, Object);
        var Se = Object.prototype.hasOwnProperty;
        const Pe = function(t3) {
          if (!Re(t3))
            return Ae(t3);
          var e3 = [];
          for (var r3 in Object(t3))
            Se.call(t3, r3) && "constructor" != r3 && e3.push(r3);
          return e3;
        };
        const Te = function(t3) {
          return null != t3 && pe(t3.length) && !dt(t3);
        };
        const De = function(t3) {
          return Te(t3) ? Oe(t3) : Pe(t3);
        };
        const Ne = function(t3, e3) {
          return t3 && Zt(e3, De(e3), t3);
        };
        const We = function(t3) {
          var e3 = [];
          if (null != t3)
            for (var r3 in Object(t3))
              e3.push(r3);
          return e3;
        };
        var ke = Object.prototype.hasOwnProperty;
        const Ie = function(t3) {
          if (!h(t3))
            return We(t3);
          var e3 = Re(t3), r3 = [];
          for (var o2 in t3)
            ("constructor" != o2 || !e3 && ke.call(t3, o2)) && r3.push(o2);
          return r3;
        };
        const ze = function(t3) {
          return Te(t3) ? Oe(t3, true) : Ie(t3);
        };
        const Ue = function(t3, e3) {
          return t3 && Zt(e3, ze(e3), t3);
        };
        var Me = "object" == typeof exports && exports && !exports.nodeType && exports, Fe = Me && "object" == typeof module && module && !module.nodeType && module, Le = Fe && Fe.exports === Me ? p.Buffer : void 0, qe = Le ? Le.allocUnsafe : void 0;
        const Je = function(t3, e3) {
          if (e3)
            return t3.slice();
          var r3 = t3.length, o2 = qe ? qe(r3) : new t3.constructor(r3);
          return t3.copy(o2), o2;
        };
        const Be = function(t3, e3) {
          var r3 = -1, o2 = t3.length;
          for (e3 || (e3 = Array(o2)); ++r3 < o2; )
            e3[r3] = t3[r3];
          return e3;
        };
        const $e = function(t3, e3) {
          for (var r3 = -1, o2 = null == t3 ? 0 : t3.length, n2 = 0, s2 = []; ++r3 < o2; ) {
            var i2 = t3[r3];
            e3(i2, r3, t3) && (s2[n2++] = i2);
          }
          return s2;
        };
        const He = function() {
          return [];
        };
        var Ke = Object.prototype.propertyIsEnumerable, Ve = Object.getOwnPropertySymbols;
        const Qe = Ve ? function(t3) {
          return null == t3 ? [] : (t3 = Object(t3), $e(Ve(t3), function(e3) {
            return Ke.call(t3, e3);
          }));
        } : He;
        const Ge = function(t3, e3) {
          return Zt(t3, Qe(t3), e3);
        };
        const Ye = function(t3, e3) {
          for (var r3 = -1, o2 = e3.length, n2 = t3.length; ++r3 < o2; )
            t3[n2 + r3] = e3[r3];
          return t3;
        };
        const Xe = Object.getOwnPropertySymbols ? function(t3) {
          for (var e3 = []; t3; )
            Ye(e3, Qe(t3)), t3 = q(t3);
          return e3;
        } : He;
        const Ze = function(t3, e3) {
          return Zt(t3, Xe(t3), e3);
        };
        const tr = function(t3, e3, r3) {
          var o2 = e3(t3);
          return ie(t3) ? o2 : Ye(o2, r3(t3));
        };
        const er = function(t3) {
          return tr(t3, De, Qe);
        };
        const rr = function(t3) {
          return tr(t3, ze, Xe);
        };
        const or = xt(p, "DataView");
        const nr = xt(p, "Promise");
        const sr = xt(p, "Set");
        const ir = xt(p, "WeakMap");
        var ar = "[object Map]", cr = "[object Promise]", ur = "[object Set]", dr = "[object WeakMap]", hr = "[object DataView]", lr = gt(or), fr = gt(Ot), pr = gt(nr), gr = gt(sr), _r = gt(ir), yr = S;
        (or && yr(new or(new ArrayBuffer(1))) != hr || Ot && yr(new Ot()) != ar || nr && yr(nr.resolve()) != cr || sr && yr(new sr()) != ur || ir && yr(new ir()) != dr) && (yr = function(t3) {
          var e3 = S(t3), r3 = "[object Object]" == e3 ? t3.constructor : void 0, o2 = r3 ? gt(r3) : "";
          if (o2)
            switch (o2) {
              case lr:
                return hr;
              case fr:
                return ar;
              case pr:
                return cr;
              case gr:
                return ur;
              case _r:
                return dr;
            }
          return e3;
        });
        const br = yr;
        var mr = Object.prototype.hasOwnProperty;
        const vr = function(t3) {
          var e3 = t3.length, r3 = new t3.constructor(e3);
          return e3 && "string" == typeof t3[0] && mr.call(t3, "index") && (r3.index = t3.index, r3.input = t3.input), r3;
        };
        const wr = p.Uint8Array;
        const jr = function(t3) {
          var e3 = new t3.constructor(t3.byteLength);
          return new wr(e3).set(new wr(t3)), e3;
        };
        const Er = function(t3, e3) {
          var r3 = e3 ? jr(t3.buffer) : t3.buffer;
          return new t3.constructor(r3, t3.byteOffset, t3.byteLength);
        };
        var xr = /\w*$/;
        const Or = function(t3) {
          var e3 = new t3.constructor(t3.source, xr.exec(t3));
          return e3.lastIndex = t3.lastIndex, e3;
        };
        var Cr = v ? v.prototype : void 0, Rr = Cr ? Cr.valueOf : void 0;
        const Ar = function(t3) {
          return Rr ? Object(Rr.call(t3)) : {};
        };
        const Sr = function(t3, e3) {
          var r3 = e3 ? jr(t3.buffer) : t3.buffer;
          return new t3.constructor(r3, t3.byteOffset, t3.length);
        };
        const Pr = function(t3, e3, r3) {
          var o2 = t3.constructor;
          switch (e3) {
            case "[object ArrayBuffer]":
              return jr(t3);
            case "[object Boolean]":
            case "[object Date]":
              return new o2(+t3);
            case "[object DataView]":
              return Er(t3, r3);
            case "[object Float32Array]":
            case "[object Float64Array]":
            case "[object Int8Array]":
            case "[object Int16Array]":
            case "[object Int32Array]":
            case "[object Uint8Array]":
            case "[object Uint8ClampedArray]":
            case "[object Uint16Array]":
            case "[object Uint32Array]":
              return Sr(t3, r3);
            case "[object Map]":
            case "[object Set]":
              return new o2();
            case "[object Number]":
            case "[object String]":
              return new o2(t3);
            case "[object RegExp]":
              return Or(t3);
            case "[object Symbol]":
              return Ar(t3);
          }
        };
        var Tr = Object.create;
        const Dr = function() {
          function t3() {
          }
          return function(e3) {
            if (!h(e3))
              return {};
            if (Tr)
              return Tr(e3);
            t3.prototype = e3;
            var r3 = new t3();
            return t3.prototype = void 0, r3;
          };
        }();
        const Nr = function(t3) {
          return "function" != typeof t3.constructor || Re(t3) ? {} : Dr(q(t3));
        };
        const Wr = function(t3) {
          return P(t3) && "[object Map]" == br(t3);
        };
        var kr = we && we.isMap;
        const Ir = kr ? ye(kr) : Wr;
        const zr = function(t3) {
          return P(t3) && "[object Set]" == br(t3);
        };
        var Ur = we && we.isSet;
        const Mr = Ur ? ye(Ur) : zr;
        var Fr = "[object Arguments]", Lr = "[object Function]", qr = "[object Object]", Jr = {};
        Jr[Fr] = Jr["[object Array]"] = Jr["[object ArrayBuffer]"] = Jr["[object DataView]"] = Jr["[object Boolean]"] = Jr["[object Date]"] = Jr["[object Float32Array]"] = Jr["[object Float64Array]"] = Jr["[object Int8Array]"] = Jr["[object Int16Array]"] = Jr["[object Int32Array]"] = Jr["[object Map]"] = Jr["[object Number]"] = Jr[qr] = Jr["[object RegExp]"] = Jr["[object Set]"] = Jr["[object String]"] = Jr["[object Symbol]"] = Jr["[object Uint8Array]"] = Jr["[object Uint8ClampedArray]"] = Jr["[object Uint16Array]"] = Jr["[object Uint32Array]"] = true, Jr["[object Error]"] = Jr[Lr] = Jr["[object WeakMap]"] = false;
        const Br = function t3(e3, r3, o2, n2, s2, i2) {
          var a2, c2 = 1 & r3, u2 = 2 & r3, d2 = 4 & r3;
          if (o2 && (a2 = s2 ? o2(e3, n2, s2, i2) : o2(e3)), void 0 !== a2)
            return a2;
          if (!h(e3))
            return e3;
          var l2 = ie(e3);
          if (l2) {
            if (a2 = vr(e3), !c2)
              return Be(e3, a2);
          } else {
            var f2 = br(e3), p2 = f2 == Lr || "[object GeneratorFunction]" == f2;
            if (he(e3))
              return Je(e3, c2);
            if (f2 == qr || f2 == Fr || p2 && !s2) {
              if (a2 = u2 || p2 ? {} : Nr(e3), !c2)
                return u2 ? Ze(e3, Ue(a2, e3)) : Ge(e3, Ne(a2, e3));
            } else {
              if (!Jr[f2])
                return s2 ? e3 : {};
              a2 = Pr(e3, f2, c2);
            }
          }
          i2 || (i2 = new Kt());
          var g2 = i2.get(e3);
          if (g2)
            return g2;
          i2.set(e3, a2), Mr(e3) ? e3.forEach(function(n3) {
            a2.add(t3(n3, r3, o2, n3, e3, i2));
          }) : Ir(e3) && e3.forEach(function(n3, s3) {
            a2.set(s3, t3(n3, r3, o2, s3, e3, i2));
          });
          var _2 = l2 ? void 0 : (d2 ? u2 ? rr : er : u2 ? ze : De)(e3);
          return Vt(_2 || e3, function(n3, s3) {
            _2 && (n3 = e3[s3 = n3]), Xt(a2, s3, t3(n3, r3, o2, s3, e3, i2));
          }), a2;
        };
        const $r = function(t3, e3) {
          return Br(t3, 5, e3 = "function" == typeof e3 ? e3 : void 0);
        };
        class Hr extends a {
          constructor(t3, e3 = {}) {
            super(e3), this._editor = null, this._initUsingData = true, this._editables = {}, this._throttledSave = F(this._save.bind(this), "number" == typeof e3.saveInterval ? e3.saveInterval : 5e3), t3 && (this._creator = (e4, r3) => t3.create(e4, r3)), this._destructor = (t4) => t4.destroy();
          }
          get editor() {
            return this._editor;
          }
          get _item() {
            return this._editor;
          }
          setCreator(t3) {
            this._creator = t3;
          }
          setDestructor(t3) {
            this._destructor = t3;
          }
          _restart() {
            return Promise.resolve().then(() => (this.state = "initializing", this._fire("stateChange"), this._destroy())).catch((t3) => {
              console.error("An error happened during the editor destroying.", t3);
            }).then(() => {
              const t3 = {}, e3 = [], r3 = this._config.rootsAttributes || {}, o2 = {};
              for (const [n3, s2] of Object.entries(this._data.roots))
                s2.isLoaded ? (t3[n3] = "", o2[n3] = r3[n3] || {}) : e3.push(n3);
              const n2 = { ...this._config, extraPlugins: this._config.extraPlugins || [], lazyRoots: e3, rootsAttributes: o2, _watchdogInitialData: this._data };
              return delete n2.initialData, n2.extraPlugins.push(Kr), this._initUsingData ? this.create(t3, n2, n2.context) : Q(this._elementOrData) ? this.create(this._elementOrData, n2, n2.context) : this.create(this._editables, n2, n2.context);
            }).then(() => {
              this._fire("restart");
            });
          }
          create(t3 = this._elementOrData, e3 = this._config, r3) {
            return Promise.resolve().then(() => (super._startErrorHandling(), this._elementOrData = t3, this._initUsingData = "string" == typeof t3 || Object.keys(t3).length > 0 && "string" == typeof Object.values(t3)[0], this._config = this._cloneEditorConfiguration(e3) || {}, this._config.context = r3, this._creator(t3, this._config))).then((t4) => {
              this._editor = t4, t4.model.document.on("change:data", this._throttledSave), this._lastDocumentVersion = t4.model.document.version, this._data = this._getData(), this._initUsingData || (this._editables = this._getEditables()), this.state = "ready", this._fire("stateChange");
            });
          }
          destroy() {
            return Promise.resolve().then(() => (this.state = "destroyed", this._fire("stateChange"), super.destroy(), this._destroy()));
          }
          _destroy() {
            return Promise.resolve().then(() => {
              this._stopErrorHandling(), this._throttledSave.cancel();
              const t3 = this._editor;
              return this._editor = null, t3.model.document.off("change:data", this._throttledSave), this._destructor(t3);
            });
          }
          _save() {
            const t3 = this._editor.model.document.version;
            try {
              this._data = this._getData(), this._initUsingData || (this._editables = this._getEditables()), this._lastDocumentVersion = t3;
            } catch (t4) {
              console.error(t4, "An error happened during restoring editor data. Editor will be restored from the previously saved data.");
            }
          }
          _setExcludedProperties(t3) {
            this._excludedProps = t3;
          }
          _getData() {
            const t3 = this._editor, e3 = t3.model.document.roots.filter((t4) => t4.isAttached() && "$graveyard" != t4.rootName), { plugins: r3 } = t3, o2 = r3.has("CommentsRepository") && r3.get("CommentsRepository"), n2 = r3.has("TrackChanges") && r3.get("TrackChanges"), s2 = { roots: {}, markers: {}, commentThreads: JSON.stringify([]), suggestions: JSON.stringify([]) };
            e3.forEach((t4) => {
              s2.roots[t4.rootName] = { content: JSON.stringify(Array.from(t4.getChildren())), attributes: JSON.stringify(Array.from(t4.getAttributes())), isLoaded: t4._isLoaded };
            });
            for (const e4 of t3.model.markers)
              e4._affectsData && (s2.markers[e4.name] = { rangeJSON: e4.getRange().toJSON(), usingOperation: e4._managedUsingOperations, affectsData: e4._affectsData });
            return o2 && (s2.commentThreads = JSON.stringify(o2.getCommentThreads({ toJSON: true, skipNotAttached: true }))), n2 && (s2.suggestions = JSON.stringify(n2.getSuggestions({ toJSON: true, skipNotAttached: true }))), s2;
          }
          _getEditables() {
            const t3 = {};
            for (const e3 of this.editor.model.document.getRootNames()) {
              const r3 = this.editor.ui.getEditableElement(e3);
              r3 && (t3[e3] = r3);
            }
            return t3;
          }
          _isErrorComingFromThisItem(t3) {
            return d(this._editor, t3.context, this._excludedProps);
          }
          _cloneEditorConfiguration(t3) {
            return $r(t3, (t4, e3) => Q(t4) || "context" === e3 ? t4 : void 0);
          }
        }
        class Kr {
          constructor(t3) {
            this.editor = t3, this._data = t3.config.get("_watchdogInitialData");
          }
          init() {
            this.editor.data.on("init", (t3) => {
              t3.stop(), this.editor.model.enqueueChange({ isUndoable: false }, (t4) => {
                this._restoreCollaborationData(), this._restoreEditorData(t4);
              }), this.editor.data.fire("ready");
            }, { priority: 999 });
          }
          _createNode(t3, e3) {
            if ("name" in e3) {
              const r3 = t3.createElement(e3.name, e3.attributes);
              if (e3.children)
                for (const o2 of e3.children)
                  r3._appendChild(this._createNode(t3, o2));
              return r3;
            }
            return t3.createText(e3.data, e3.attributes);
          }
          _restoreEditorData(t3) {
            const e3 = this.editor;
            Object.entries(this._data.roots).forEach(([r3, { content: o2, attributes: n2 }]) => {
              const s2 = JSON.parse(o2), i2 = JSON.parse(n2), a2 = e3.model.document.getRoot(r3);
              for (const [e4, r4] of i2)
                t3.setAttribute(e4, r4, a2);
              for (const e4 of s2) {
                const r4 = this._createNode(t3, e4);
                t3.insert(r4, a2, "end");
              }
            }), Object.entries(this._data.markers).forEach(([r3, o2]) => {
              const { document: n2 } = e3.model, { rangeJSON: { start: s2, end: i2 }, ...a2 } = o2, c2 = n2.getRoot(s2.root), u2 = t3.createPositionFromPath(c2, s2.path, s2.stickiness), d2 = t3.createPositionFromPath(c2, i2.path, i2.stickiness), h2 = t3.createRange(u2, d2);
              t3.addMarker(r3, { range: h2, ...a2 });
            });
          }
          _restoreCollaborationData() {
            const t3 = JSON.parse(this._data.commentThreads), e3 = JSON.parse(this._data.suggestions);
            t3.forEach((t4) => {
              const e4 = this.editor.config.get("collaboration.channelId"), r3 = this.editor.plugins.get("CommentsRepository");
              if (r3.hasCommentThread(t4.threadId)) {
                r3.getCommentThread(t4.threadId).remove();
              }
              r3.addCommentThread({ channelId: e4, ...t4 });
            }), e3.forEach((t4) => {
              const e4 = this.editor.plugins.get("TrackChangesEditing");
              if (e4.hasSuggestion(t4.id)) {
                e4.getSuggestion(t4.id).attributes = t4.attributes;
              } else
                e4.addSuggestionData(t4);
            });
          }
        }
        const Vr = Symbol("MainQueueId");
        class Qr extends a {
          constructor(t3, e3 = {}) {
            super(e3), this._watchdogs = /* @__PURE__ */ new Map(), this._context = null, this._contextProps = /* @__PURE__ */ new Set(), this._actionQueues = new Gr(), this._watchdogConfig = e3, this._creator = (e4) => t3.create(e4), this._destructor = (t4) => t4.destroy(), this._actionQueues.onEmpty(() => {
              "initializing" === this.state && (this.state = "ready", this._fire("stateChange"));
            });
          }
          setCreator(t3) {
            this._creator = t3;
          }
          setDestructor(t3) {
            this._destructor = t3;
          }
          get context() {
            return this._context;
          }
          create(t3 = {}) {
            return this._actionQueues.enqueue(Vr, () => (this._contextConfig = t3, this._create()));
          }
          getItem(t3) {
            return this._getWatchdog(t3)._item;
          }
          getItemState(t3) {
            return this._getWatchdog(t3).state;
          }
          add(t3) {
            const e3 = Yr(t3);
            return Promise.all(e3.map((t4) => this._actionQueues.enqueue(t4.id, () => {
              if ("destroyed" === this.state)
                throw new Error("Cannot add items to destroyed watchdog.");
              if (!this._context)
                throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");
              let e4;
              if (this._watchdogs.has(t4.id))
                throw new Error(`Item with the given id is already added: '${t4.id}'.`);
              if ("editor" === t4.type)
                return e4 = new Hr(null, this._watchdogConfig), e4.setCreator(t4.creator), e4._setExcludedProperties(this._contextProps), t4.destructor && e4.setDestructor(t4.destructor), this._watchdogs.set(t4.id, e4), e4.on("error", (r3, { error: o2, causesRestart: n2 }) => {
                  this._fire("itemError", { itemId: t4.id, error: o2 }), n2 && this._actionQueues.enqueue(t4.id, () => new Promise((r4) => {
                    const o3 = () => {
                      e4.off("restart", o3), this._fire("itemRestart", { itemId: t4.id }), r4();
                    };
                    e4.on("restart", o3);
                  }));
                }), e4.create(t4.sourceElementOrData, t4.config, this._context);
              throw new Error(`Not supported item type: '${t4.type}'.`);
            })));
          }
          remove(t3) {
            const e3 = Yr(t3);
            return Promise.all(e3.map((t4) => this._actionQueues.enqueue(t4, () => {
              const e4 = this._getWatchdog(t4);
              return this._watchdogs.delete(t4), e4.destroy();
            })));
          }
          destroy() {
            return this._actionQueues.enqueue(Vr, () => (this.state = "destroyed", this._fire("stateChange"), super.destroy(), this._destroy()));
          }
          _restart() {
            return this._actionQueues.enqueue(Vr, () => (this.state = "initializing", this._fire("stateChange"), this._destroy().catch((t3) => {
              console.error("An error happened during destroying the context or items.", t3);
            }).then(() => this._create()).then(() => this._fire("restart"))));
          }
          _create() {
            return Promise.resolve().then(() => (this._startErrorHandling(), this._creator(this._contextConfig))).then((t3) => (this._context = t3, this._contextProps = c(this._context), Promise.all(Array.from(this._watchdogs.values()).map((t4) => (t4._setExcludedProperties(this._contextProps), t4.create(void 0, void 0, this._context))))));
          }
          _destroy() {
            return Promise.resolve().then(() => {
              this._stopErrorHandling();
              const t3 = this._context;
              return this._context = null, this._contextProps = /* @__PURE__ */ new Set(), Promise.all(Array.from(this._watchdogs.values()).map((t4) => t4.destroy())).then(() => this._destructor(t3));
            });
          }
          _getWatchdog(t3) {
            const e3 = this._watchdogs.get(t3);
            if (!e3)
              throw new Error(`Item with the given id was not registered: ${t3}.`);
            return e3;
          }
          _isErrorComingFromThisItem(t3) {
            for (const e3 of this._watchdogs.values())
              if (e3._isErrorComingFromThisItem(t3))
                return false;
            return d(this._context, t3.context);
          }
        }
        class Gr {
          constructor() {
            this._onEmptyCallbacks = [], this._queues = /* @__PURE__ */ new Map(), this._activeActions = 0;
          }
          onEmpty(t3) {
            this._onEmptyCallbacks.push(t3);
          }
          enqueue(t3, e3) {
            const r3 = t3 === Vr;
            this._activeActions++, this._queues.get(t3) || this._queues.set(t3, Promise.resolve());
            const o2 = (r3 ? Promise.all(this._queues.values()) : Promise.all([this._queues.get(Vr), this._queues.get(t3)])).then(e3), n2 = o2.catch(() => {
            });
            return this._queues.set(t3, n2), o2.finally(() => {
              this._activeActions--, this._queues.get(t3) === n2 && 0 === this._activeActions && this._onEmptyCallbacks.forEach((t4) => t4());
            });
          }
        }
        function Yr(t3) {
          return Array.isArray(t3) ? t3 : [t3];
        }
        const Xr = e2().createContext("contextWatchdog");
        class Zr extends e2().Component {
          constructor(t3, e3) {
            super(t3, e3), this.contextWatchdog = null, this.props.isLayoutReady && this._initializeContextWatchdog(this.props.config);
          }
          shouldComponentUpdate(t3) {
            return this._shouldComponentUpdate(t3);
          }
          async _shouldComponentUpdate(t3) {
            return t3.id !== this.props.id && (this.contextWatchdog && await this.contextWatchdog.destroy(), await this._initializeContextWatchdog(t3.config)), t3.isLayoutReady && !this.contextWatchdog ? (await this._initializeContextWatchdog(t3.config), true) : this.props.children !== t3.children;
          }
          render() {
            return e2().createElement(Xr.Provider, { value: this.contextWatchdog }, this.props.children);
          }
          componentWillUnmount() {
            this._destroyContext();
          }
          async _initializeContextWatchdog(t3) {
            this.contextWatchdog = new Qr(this.props.context, this.props.watchdogConfig), this.contextWatchdog.on("error", (t4, e3) => {
              this.props.onError(e3.error, { phase: "runtime", willContextRestart: e3.causesRestart });
            }), this.contextWatchdog.on("stateChange", () => {
              "ready" === this.contextWatchdog.state && this.props.onReady && this.props.onReady(this.contextWatchdog.context);
            }), await this.contextWatchdog.create(t3).catch((t4) => {
              this.props.onError(t4, { phase: "initialization", willContextRestart: false });
            });
          }
          async _destroyContext() {
            this.contextWatchdog && (await this.contextWatchdog.destroy(), this.contextWatchdog = null);
          }
        }
        Zr.defaultProps = { isLayoutReady: true, onError: (t3, e3) => console.error(t3, e3) }, Zr.propTypes = { id: s().string, isLayoutReady: s().bool, context: s().func, watchdogConfig: s().object, config: s().object, onReady: s().func, onError: s().func };
        const to = "Lock from React integration (@ckeditor/ckeditor5-react)";
        class eo extends e2().Component {
          constructor(t3) {
            super(t3), this.editorDestructionInProgress = null, this.domContainer = e2().createRef(), this.watchdog = null;
            const { CKEDITOR_VERSION: r3 } = window;
            if (r3) {
              const [t4] = r3.split(".").map(Number);
              t4 < 37 && console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.");
            } else
              console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');
          }
          get editor() {
            return this.props.disableWatchdog ? this.instance : this.watchdog ? this.watchdog.editor : null;
          }
          shouldComponentUpdate(t3) {
            return !!this.editor && (t3.id !== this.props.id || (t3.disableWatchdog !== this.props.disableWatchdog || (this._shouldUpdateEditor(t3) && this.editor.data.set(t3.data), "disabled" in t3 && (t3.disabled ? this.editor.enableReadOnlyMode(to) : this.editor.disableReadOnlyMode(to)), false)));
          }
          async componentDidMount() {
            await this._initializeEditor();
          }
          async componentDidUpdate() {
            await this._destroyEditor(), await this._initializeEditor();
          }
          async componentWillUnmount() {
            await this._destroyEditor();
          }
          render() {
            return e2().createElement("div", { ref: this.domContainer });
          }
          async _initializeEditor() {
            await this.editorDestructionInProgress, this.props.disableWatchdog ? this.instance = await this._createEditor(this.domContainer.current, this._getConfig()) : this.watchdog || (this.context instanceof Qr ? this.watchdog = new ro(this.context) : this.watchdog = new eo._EditorWatchdog(this.props.editor, this.props.watchdogConfig), this.watchdog.setCreator((t3, e3) => this._createEditor(t3, e3)), this.watchdog.on("error", (t3, { error: e3, causesRestart: r3 }) => {
              (this.props.onError || console.error)(e3, { phase: "runtime", willEditorRestart: r3 });
            }), await this.watchdog.create(this.domContainer.current, this._getConfig()).catch((t3) => {
              (this.props.onError || console.error)(t3, { phase: "initialization", willEditorRestart: false });
            }));
          }
          _createEditor(t3, e3) {
            return this.props.editor.create(t3, e3).then((t4) => {
              "disabled" in this.props && this.props.disabled && t4.enableReadOnlyMode(to);
              const e4 = t4.model.document, r3 = t4.editing.view.document;
              return e4.on("change:data", (e5) => {
                this.props.onChange && this.props.onChange(e5, t4);
              }), r3.on("focus", (e5) => {
                this.props.onFocus && this.props.onFocus(e5, t4);
              }), r3.on("blur", (e5) => {
                this.props.onBlur && this.props.onBlur(e5, t4);
              }), setTimeout(() => {
                this.props.onReady && this.props.onReady(t4);
              }), t4;
            });
          }
          async _destroyEditor() {
            this.editorDestructionInProgress = new Promise((t3) => {
              setTimeout(async () => this.watchdog ? (await this.watchdog.destroy(), this.watchdog = null, t3()) : this.instance ? (await this.instance.destroy(), this.instance = null, t3()) : void t3());
            });
          }
          _shouldUpdateEditor(t3) {
            return this.props.data !== t3.data && this.editor.data.get() !== t3.data;
          }
          _getConfig() {
            const t3 = this.props.config || {};
            return this.props.data && t3.initialData && console.warn("Editor data should be provided either using `config.initialData` or `content` property. The config value takes precedence over `content` property and will be used when both are specified."), { ...t3, initialData: t3.initialData || this.props.data || "" };
          }
        }
        eo.contextType = Xr, eo.propTypes = { editor: s().func.isRequired, data: s().string, config: s().object, disableWatchdog: s().bool, watchdogConfig: s().object, onChange: s().func, onReady: s().func, onFocus: s().func, onBlur: s().func, onError: s().func, disabled: s().bool, id: s().any }, eo._EditorWatchdog = Hr;
        class ro {
          constructor(t3) {
            this._contextWatchdog = t3, this._id = function() {
              const t4 = 4294967296 * Math.random() >>> 0, e3 = 4294967296 * Math.random() >>> 0, r3 = 4294967296 * Math.random() >>> 0, o2 = 4294967296 * Math.random() >>> 0;
              return "e" + i[t4 >> 0 & 255] + i[t4 >> 8 & 255] + i[t4 >> 16 & 255] + i[t4 >> 24 & 255] + i[e3 >> 0 & 255] + i[e3 >> 8 & 255] + i[e3 >> 16 & 255] + i[e3 >> 24 & 255] + i[r3 >> 0 & 255] + i[r3 >> 8 & 255] + i[r3 >> 16 & 255] + i[r3 >> 24 & 255] + i[o2 >> 0 & 255] + i[o2 >> 8 & 255] + i[o2 >> 16 & 255] + i[o2 >> 24 & 255];
            }();
          }
          setCreator(t3) {
            this._creator = t3;
          }
          create(t3, e3) {
            return this._contextWatchdog.add({ sourceElementOrData: t3, config: e3, creator: this._creator, id: this._id, type: "editor" });
          }
          on(t3, e3) {
            this._contextWatchdog.on("itemError", (t4, { itemId: r3, error: o2 }) => {
              r3 === this._id && e3(null, { error: o2, causesRestart: void 0 });
            });
          }
          destroy() {
            return "ready" === this._contextWatchdog.state ? this._contextWatchdog.remove(this._id) : Promise.resolve();
          }
          get editor() {
            return this._contextWatchdog.getItem(this._id);
          }
        }
        const oo = "Lock from React integration (@ckeditor/ckeditor5-react)", no = (r3) => {
          let o2 = null;
          const n2 = (0, t2.useRef)(null), s2 = (0, t2.useContext)(Xr), [i2, a2] = (0, t2.useState)(null), [c2, u2] = (0, t2.useState)(r3.data), [d2, h2] = (0, t2.useState)(r3.rootsAttributes || {}), [l2, f2] = (0, t2.useState)([]), p2 = (0, t2.useRef)(true), g2 = (0, t2.useRef)(null), _2 = e2().createElement("div", { ref: g2 });
          (0, t2.useEffect)(() => ((async () => {
            await n2.current, false !== r3.isLayoutReady && w2();
          })(), () => {
            v2().then(() => {
              n2.current = null;
            });
          }), [r3.isLayoutReady]), (0, t2.useEffect)(() => {
            i2 && (r3.disabled ? i2.enableReadOnlyMode(oo) : i2.disableReadOnlyMode(oo));
          }, [r3.disabled]), (0, t2.useEffect)(() => {
            const t3 = g2.current;
            if (i2 && !n2.current) {
              const e3 = i2.getFullData();
              u2({ ...e3 }), h2({ ...i2.getRootsAttributes() }), f2([...Object.keys(e3).map((t4) => b2(i2, t4))]), t3 && t3.appendChild(i2.ui.view.toolbar.element);
            }
            return () => {
              t3 && t3.firstChild && t3.removeChild(t3.firstChild);
            };
          }, [i2 && i2.id]);
          const y2 = () => {
            const t3 = r3.config || {};
            return r3.data && t3.initialData && console.warn("Editor data should be provided either using `config.initialData` or `data` property. The config value takes precedence over `data` property and will be used when both are specified."), { ...t3, rootsAttributes: d2 };
          }, b2 = (t3, r4) => e2().createElement("div", { id: r4, key: r4, ref: (e3) => {
            if (e3) {
              const o3 = t3.ui.view.createEditable(r4, e3);
              t3.ui.addEditable(o3), t3.editing.view.forceRender();
            }
          } }), m2 = (t3, e3) => r3.editor.create(t3, e3).then((t4) => {
            r3.disabled && r3.disabled && t4.enableReadOnlyMode(oo);
            const e4 = t4.model.document, o3 = t4.editing.view.document;
            return e4.on("change:data", (e5) => ((t5, e6) => {
              const o4 = t5.model.document, n3 = {}, s3 = {};
              o4.differ.getChanges().forEach((e7) => {
                let r4;
                if (r4 = "insert" == e7.type || "remove" == e7.type ? e7.position.root : e7.range.root, !r4.isAttached())
                  return;
                const { rootName: o5 } = r4;
                n3[o5] = t5.getData({ rootName: o5 });
              }), o4.differ.getChangedRoots().forEach((e7) => {
                if (e7.state)
                  return void (void 0 !== n3[e7.name] && delete n3[e7.name]);
                const r4 = e7.name;
                s3[r4] = t5.getRootAttributes(r4);
              }), Object.keys(n3).length && u2((t6) => ({ ...t6, ...n3 })), Object.keys(s3).length && h2((t6) => ({ ...t6, ...s3 })), r3.onChange && r3.onChange(e6, t5);
            })(t4, e5)), t4.on("addRoot", (e5, r4) => ((t5, e6, r5) => {
              const o4 = r5.rootName, n3 = b2(t5, o4);
              u2((e7) => ({ ...e7, [o4]: t5.getData({ rootName: o4 }) })), h2((e7) => ({ ...e7, [o4]: t5.getRootAttributes(o4) })), f2((t6) => [...t6, n3]);
            })(t4, 0, r4)), t4.on("detachRoot", (e5, r4) => ((t5, e6, r5) => {
              const o4 = r5.rootName;
              f2((t6) => t6.filter((t7) => t7.props.id !== o4)), u2((t6) => {
                const { [o4]: e7, ...r6 } = t6;
                return { ...r6 };
              }), h2((t6) => {
                const { [o4]: e7, ...r6 } = t6;
                return { ...r6 };
              }), t5.detachEditable(r5);
            })(t4, 0, r4)), o3.on("focus", (e5) => {
              r3.onFocus && r3.onFocus(e5, t4);
            }), o3.on("blur", (e5) => {
              r3.onBlur && r3.onBlur(e5, t4);
            }), a2(t4), r3.onReady && r3.onReady(t4), t4;
          }), v2 = async () => {
            a2(null), u2({}), h2({}), f2([]), n2.current = new Promise((t3) => {
              setTimeout(async () => o2 ? (await o2.destroy(), o2 = null, t3()) : i2 ? (await i2.destroy(), t3()) : void t3());
            });
          }, w2 = async () => {
            r3.disableWatchdog ? await m2(r3.data, y2()) : o2 || (o2 = s2 instanceof Qr ? new ro(s2) : new Hr(r3.editor, r3.watchdogConfig), o2.setCreator((t3, e3) => m2(t3, e3)), o2.on("error", (t3, { error: e3, causesRestart: o3 }) => {
              (r3.onError || console.error)(e3, { phase: "runtime", willEditorRestart: o3 });
            }), await o2.create(c2, y2()).catch((t3) => {
              (r3.onError || console.error)(t3, { phase: "initialization", willEditorRestart: false });
            }));
          };
          (0, t2.useEffect)(() => {
            if (i2 && p2.current) {
              p2.current = false;
              const t3 = Object.keys(c2), e3 = Object.keys(d2);
              if (!t3.every((t4) => e3.includes(t4)))
                throw new Error("`data` and `attributes` objects must have the same keys (roots).");
              const r4 = i2.getFullData(), o3 = i2.getRootsAttributes(), { addedKeys: n3, removedKeys: s3 } = j2(r4, c2 || {}), a3 = t3.some((t4) => void 0 !== r4[t4] && JSON.stringify(r4[t4]) !== JSON.stringify(c2[t4])), u3 = e3.filter((t4) => JSON.stringify(o3[t4]) !== JSON.stringify(d2[t4]));
              i2.model.change((t4) => {
                E2(n3), x2(s3), a3 && O2(), u3.length && C2(t4, u3);
              });
            }
          }, [c2, d2]);
          const j2 = (t3, e3) => {
            const r4 = Object.keys(t3), o3 = Object.keys(e3);
            return { addedKeys: o3.filter((t4) => !r4.includes(t4)), removedKeys: r4.filter((t4) => !o3.includes(t4)) };
          }, E2 = (t3) => {
            t3.forEach((t4) => {
              i2.addRoot(t4, { data: c2[t4] || "", attributes: (null == d2 ? void 0 : d2[t4]) || {}, isUndoable: true });
            });
          }, x2 = (t3) => {
            t3.forEach((t4) => {
              i2.detachRoot(t4, true);
            });
          }, O2 = () => {
            i2.data.set(c2, { suppressErrorInCollaboration: true });
          }, C2 = (t3, e3) => {
            e3.forEach((e4) => {
              Object.keys(d2[e4]).forEach((t4) => {
                i2.registerRootAttribute(t4);
              }), t3.clearAttributes(i2.model.document.getRoot(e4)), t3.setAttributes(d2[e4], i2.model.document.getRoot(e4));
            });
          }, R2 = (0, t2.useCallback)((t3) => {
            p2.current = true, u2(t3);
          }, [u2]), A2 = (0, t2.useCallback)((t3) => {
            p2.current = true, h2(t3);
          }, [h2]);
          return { editor: i2, editableElements: l2, toolbarElement: _2, data: c2, setData: R2, attributes: d2, setAttributes: A2 };
        };
      })(), n;
    })());
  }
});
export default require_dist();
/*! Bundled license information:

@ckeditor/ckeditor5-react/dist/index.js:
  (*!
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md.
   *)
*/
//# sourceMappingURL=@ckeditor_ckeditor5-react.js.map
