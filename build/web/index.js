"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embed = embed;
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
function embed(_a) {
  return __awaiter(this, arguments, void 0, function (_b) {
    var recruitmentId, embedInfo, domain, res, error_1, wrapperStyle, inlineStyle, buttonStyle, iframeStyle, html, target, wrapper, button, iframe, style;
    var id = _b.id,
      _c = _b.isDevelopmentMode,
      isDevelopmentMode = _c === void 0 ? false : _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          recruitmentId = id;
          if (!recruitmentId) {
            console.error("Recruitment ID is required");
            return [2 /*return*/];
          }
          console.log("recruitmentId:", recruitmentId);
          embedInfo = null;
          _d.label = 1;
        case 1:
          _d.trys.push([1, 4,, 5]);
          domain = isDevelopmentMode ? "http://localhost:3000" : "https://fasterview.ai";
          return [4 /*yield*/, fetch("".concat(domain, "/api/embed?id=").concat(recruitmentId))];
        case 2:
          res = _d.sent();
          if (!res.ok) {
            console.error("failed to get embed info");
            return [2 /*return*/];
          }
          return [4 /*yield*/, res.json()];
        case 3:
          // json を取得して定数 json に格納
          embedInfo = _d.sent();
          console.log("got embed info:", embedInfo);
          return [3 /*break*/, 5];
        case 4:
          error_1 = _d.sent();
          console.error("failed to get embed info:", error_1);
          return [3 /*break*/, 5];
        case 5:
          if (!embedInfo) {
            console.error("failed to get embed info");
            return [2 /*return*/];
          }
          wrapperStyle = "\n          position: fixed;        \n          top: 200px;\n          right: 0;\n          transform: translateX(100%);\n          transition: 0.2s ease-in-out;\n          z-index: 1000;\n      ";
          inlineStyle = "\n          position: relative;\n          display: flex;\n          align-items: center;\n      ";
          buttonStyle = "\n          position: absolute;\n          left: 0;\n          width: fit-content;\n          height: fit-content;\n          background-color: ".concat(embedInfo.backgroundColor, ";\n          color: ").concat(embedInfo.textColor, ";\n          border-radius: 8px 8px 0 0;\n          border: none;\n          padding: 8px 16px;\n          white-space: nowrap;\n          transform: rotate(-90deg);\n          overflow: hidden;\n          text-overflow: ellipsis;\n          cursor: pointer;\n      ");
          iframeStyle = "\n          width: 360px;\n          height: 480px;\n          border-radius: 8px 0 0 8px;\n          border: 1px solid #cac7d6;\n          border-right: none;\n          overflow: hidden;\n          z-index: 1000;\n      ";
          html = "\n          <div id=\"fasterview-wrapper\" style=\"".concat(wrapperStyle, "\">\n              <div style=\"").concat(inlineStyle, "\">\n                  <button id=\"fasterview-button\" style=\"").concat(buttonStyle, "\">").concat(embedInfo.text, "</button>\n                  <iframe id=\"fasterview-iframe\" style=\"").concat(iframeStyle, "\" src=\"http://localhost:3000/user/answer/").concat(recruitmentId, "/embed\"></iframe>\n              </div>\n          </div>\n      ");
          target = document.createElement("div");
          target.innerHTML = html;
          document.body.appendChild(target);
          wrapper = document.getElementById("fasterview-wrapper");
          button = document.getElementById("fasterview-button");
          iframe = document.getElementById("fasterview-iframe");
          if (!wrapper || !button || !iframe) {
            console.error("failed to get embed elements");
            return [2 /*return*/];
          }
          // ボタンの位置を調整する
          // ボタンを-90度回転させているので, ちょうど横幅の半分を左にずらしたらボタンの半分までが見えて,
          // さらにボタンの半分を左にずらすと, ボタン全体が表示される
          // (button.offsetWidth + button.offsetHeight) / 2 でも良いが, 分かりやすいようにそれぞれの半分を足す
          button.style.left = "-".concat(button.offsetWidth / 2 + button.offsetHeight / 2, "px");
          style = document.createElement("style");
          style.textContent = "\n          .fasterview-open {\n              transform: translateX(0) !important;\n          }\n      ";
          document.body.appendChild(style);
          window.addEventListener("message", function (event) {
            if (event.data === "fasterview-close-button-".concat(recruitmentId)) {
              wrapper.classList.remove("fasterview-open");
            }
          });
          window.addEventListener("click", function (event) {
            var target = event.target;
            if ((target === null || target === void 0 ? void 0 : target.id) === button.id) {
              wrapper.classList.toggle("fasterview-open");
            } else {
              wrapper.classList.remove("fasterview-open");
            }
          });
          return [2 /*return*/];
      }
    });
  });
}