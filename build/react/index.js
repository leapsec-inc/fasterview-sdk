"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embed = Embed;
var _react = _interopRequireWildcard(require("react"));
var _swr = _interopRequireDefault(require("swr"));
var _style = require("./style");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function Embed(_a) {
  var id = _a.id,
    _b = _a.isDevelopmentMode,
    isDevelopmentMode = _b === void 0 ? false : _b,
    _c = _a.absoluteStyle,
    absoluteStyle = _c === void 0 ? {} : _c;
  var _d = (0, _react.useState)(false),
    isOpen = _d[0],
    setIsOpen = _d[1];
  // ボタンの位置調整
  var _e = (0, _react.useState)(0),
    buttonLeftCoord = _e[0],
    setButtonLeftCoord = _e[1];
  var buttonRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var adjustButtonPosition = function () {
      console.log("buttonRef", buttonRef.current);
      if (buttonRef.current) {
        setButtonLeftCoord(buttonRef.current.offsetWidth / 2 + buttonRef.current.offsetHeight / 2);
      }
    };
    // ページ表示タイミングではなぜかbuttonRefが取得できないので, 100ms後に実行する
    setTimeout(function () {
      adjustButtonPosition();
    }, 100);
    window.addEventListener("resize", adjustButtonPosition);
    return function () {
      window.removeEventListener("resize", adjustButtonPosition);
    };
  }, [buttonRef]);
  // ボタン以外をクリックしたら埋め込みを閉じる
  (0, _react.useEffect)(function () {
    var handleClick = function (event) {
      if (event.target !== buttonRef.current) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return function () {
      window.removeEventListener("click", handleClick);
    };
  }, [buttonRef]);
  // APIから埋め込み設定の情報を取得する
  var domain = isDevelopmentMode ? 'http://localhost:3000' : 'https://fasterview.ai';
  var fetcher = function (url) {
    return fetch(url).then(function (res) {
      return res.json();
    });
  };
  var _f = (0, _swr.default)("".concat(domain, "/api/embed?id=").concat(id), fetcher),
    data = _f.data,
    error = _f.error;
  // iframeからのメッセージを受信して, アンケートを閉じる
  (0, _react.useEffect)(function () {
    var handleMessage = function (event) {
      if (event.data === "fasterview-close-button-".concat(id)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return function () {
      window.removeEventListener("message", handleMessage);
    };
  }, [id]);
  if (error) {
    console.error('failed to get fasterview embed info. error: ', error);
    return null;
  }
  return _react.default.createElement(_react.default.Fragment, null, data && _react.default.createElement("div", {
    style: __assign(__assign({}, isOpen ? _style.openStyle : _style.wrapperStyle), absoluteStyle)
  }, _react.default.createElement("div", {
    style: _style.inlineStyle
  }, _react.default.createElement("button", {
    ref: buttonRef,
    style: __assign(__assign({}, _style.buttonStyle), {
      backgroundColor: data.backgroundColor,
      color: data.textColor,
      left: "-".concat(buttonLeftCoord, "px")
    }),
    onClick: function () {
      setIsOpen(!isOpen);
    }
  }, data.text), _react.default.createElement("iframe", {
    style: __assign(__assign({}, _style.iframeStyle), {
      borderColor: data.backgroundColor
    }),
    src: "".concat(domain, "/user/answer/").concat(id, "/embed")
  }))));
}