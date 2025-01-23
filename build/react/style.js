"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapperStyle = exports.openStyle = exports.inlineStyle = exports.iframeStyle = exports.buttonStyle = void 0;
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
var wrapperStyle = exports.wrapperStyle = {
  position: 'fixed',
  top: '200px',
  right: '-360px',
  transition: '0.2s ease-in-out',
  zIndex: 1000
};
var inlineStyle = exports.inlineStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};
var buttonStyle = exports.buttonStyle = {
  position: 'absolute',
  left: 0,
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '8px 8px 0 0',
  padding: '8px 16px',
  whiteSpace: 'nowrap',
  transform: 'rotate(-90deg)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer'
};
var iframeStyle = exports.iframeStyle = {
  width: '360px',
  height: '480px',
  borderRadius: '8px 0 0 8px',
  borderRight: 'none',
  overflow: 'hidden',
  zIndex: 1000
};
var openStyle = exports.openStyle = __assign(__assign({}, wrapperStyle), {
  display: 'flex',
  transition: 'all 0.2s ease-in-out',
  position: 'fixed',
  top: '200px',
  right: '0px',
  zIndex: 1000
});