"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./api/buildClient.js":
/*!****************************!*\
  !*** ./api/buildClient.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst buildClient = ({ req  })=>{\n    const setLocal = `http:localhost:3001`;\n    if (true) {\n        // we are on the server\n        const url = \"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local\";\n        return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n            baseURL: process.env.USE_LOCAL === \"true\" ? setLocal : url,\n            headers: req.headers\n        });\n    } else {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (buildClient);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvYnVpbGRDbGllbnQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsY0FBYyxDQUFDLEVBQUVDLElBQUcsRUFBRSxHQUFLO0lBQzdCLE1BQU1DLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztJQUN0QyxJQUFJLElBQWtCLEVBQWE7UUFDL0IsdUJBQXVCO1FBQ3ZCLE1BQU1DLE1BQU07UUFDWixPQUFPSixvREFBWSxDQUFDO1lBQ2hCTSxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLFNBQVMsS0FBSyxTQUFTTixXQUFXQyxHQUFHO1lBQzFETSxTQUFTUixJQUFJUSxPQUFPO1FBQ3hCO0lBQ0osT0FBTyxFQUtOO0FBQ0w7QUFFQSxpRUFBZVQsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2FwaS9idWlsZENsaWVudC5qcz9lN2EzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IGJ1aWxkQ2xpZW50ID0gKHsgcmVxIH0pID0+IHtcclxuICAgIGNvbnN0IHNldExvY2FsID0gYGh0dHA6bG9jYWxob3N0OjMwMDFgO1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICBjb25zdCB1cmwgPSAnaHR0cDovL2luZ3Jlc3MtbmdpbngtY29udHJvbGxlci5pbmdyZXNzLW5naW54LnN2Yy5jbHVzdGVyLmxvY2FsJ1xyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiBwcm9jZXNzLmVudi5VU0VfTE9DQUwgPT09ICd0cnVlJyA/IHNldExvY2FsIDogdXJsLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVyc1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgYnJvd3NlclxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiBwcm9jZXNzLmVudi5VU0VfTE9DQUwgPT09ICd0cnVlJyA/IHNldExvY2FsIDogJy8nLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkQ2xpZW50OyJdLCJuYW1lcyI6WyJheGlvcyIsImJ1aWxkQ2xpZW50IiwicmVxIiwic2V0TG9jYWwiLCJ1cmwiLCJjcmVhdGUiLCJiYXNlVVJMIiwicHJvY2VzcyIsImVudiIsIlVTRV9MT0NBTCIsImhlYWRlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/buildClient.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_buildClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/buildClient */ \"./api/buildClient.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_buildClient__WEBPACK_IMPORTED_MODULE_1__]);\n_api_buildClient__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst LandingPage = ({ currentUser  })=>{\n    return currentUser ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are signed in\"\n    }, void 0, false, {\n        fileName: \"D:\\\\Ronak\\\\Udemy\\\\projects\\\\ticketing\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 5,\n        columnNumber: 6\n    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"You are NOT singed in\"\n    }, void 0, false, {\n        fileName: \"D:\\\\Ronak\\\\Udemy\\\\projects\\\\ticketing\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 6,\n        columnNumber: 6\n    }, undefined);\n};\nLandingPage.getInitialProps = async (context)=>{\n    let url = \"/api/users/currentUser\";\n    const { data ={}  } = await (0,_api_buildClient__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context).get(url);\n    console.log(\"index.js  => \", data);\n    return data;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxjQUFjLENBQUMsRUFBRUMsWUFBVyxFQUFFLEdBQUs7SUFDdkMsT0FBT0EsNEJBQ0osOERBQUNDO2tCQUFHOzs7OztrQ0FDSiw4REFBQ0E7a0JBQUc7Ozs7O2lCQUEyQjtBQUNwQztBQUVBRixZQUFZRyxlQUFlLEdBQUcsT0FBT0MsVUFBWTtJQUMvQyxJQUFJQyxNQUFNO0lBQ1YsTUFBTSxFQUFFQyxNQUFPLENBQUMsRUFBQyxFQUFFLEdBQUcsTUFBTVAsNERBQVdBLENBQUNLLFNBQVNHLEdBQUcsQ0FBQ0Y7SUFDckRHLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJIO0lBQzdCLE9BQU9BO0FBQ1Q7QUFFQSxpRUFBZU4sV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkQ2xpZW50IGZyb20gXCIuLi9hcGkvYnVpbGRDbGllbnRcIjtcclxuXHJcbmNvbnN0IExhbmRpbmdQYWdlID0gKHsgY3VycmVudFVzZXIgfSkgPT4ge1xyXG4gIHJldHVybiBjdXJyZW50VXNlciA/XHJcbiAgICAoPGgxPllvdSBhcmUgc2lnbmVkIGluPC9oMT4pIDpcclxuICAgICg8aDE+WW91IGFyZSBOT1Qgc2luZ2VkIGluPC9oMT4pO1xyXG59O1xyXG5cclxuTGFuZGluZ1BhZ2UuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcclxuICBsZXQgdXJsID0gJy9hcGkvdXNlcnMvY3VycmVudFVzZXInO1xyXG4gIGNvbnN0IHsgZGF0YSA9IHt9IH0gPSBhd2FpdCBidWlsZENsaWVudChjb250ZXh0KS5nZXQodXJsKVxyXG4gIGNvbnNvbGUubG9nKCdpbmRleC5qcyAgPT4gJywgZGF0YSk7XHJcbiAgcmV0dXJuIGRhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYW5kaW5nUGFnZTsiXSwibmFtZXMiOlsiYnVpbGRDbGllbnQiLCJMYW5kaW5nUGFnZSIsImN1cnJlbnRVc2VyIiwiaDEiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwidXJsIiwiZGF0YSIsImdldCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();