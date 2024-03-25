/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@emailjs/browser/es/api/sendPost.js":
/*!**********************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/api/sendPost.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendPost: () => (/* binding */ sendPost)\n/* harmony export */ });\n/* harmony import */ var _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/EmailJSResponseStatus */ \"./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js\");\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/store */ \"./node_modules/@emailjs/browser/es/store/store.js\");\n\n\nconst sendPost = (url, data, headers = {}) => {\n    return new Promise((resolve, reject) => {\n        const xhr = new XMLHttpRequest();\n        xhr.addEventListener('load', ({ target }) => {\n            const responseStatus = new _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__.EmailJSResponseStatus(target);\n            if (responseStatus.status === 200 || responseStatus.text === 'OK') {\n                resolve(responseStatus);\n            }\n            else {\n                reject(responseStatus);\n            }\n        });\n        xhr.addEventListener('error', ({ target }) => {\n            reject(new _models_EmailJSResponseStatus__WEBPACK_IMPORTED_MODULE_0__.EmailJSResponseStatus(target));\n        });\n        xhr.open('POST', _store_store__WEBPACK_IMPORTED_MODULE_1__.store._origin + url, true);\n        Object.keys(headers).forEach((key) => {\n            xhr.setRequestHeader(key, headers[key]);\n        });\n        xhr.send(data);\n    });\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/api/sendPost.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   init: () => (/* reexport safe */ _methods_init_init__WEBPACK_IMPORTED_MODULE_0__.init),\n/* harmony export */   send: () => (/* reexport safe */ _methods_send_send__WEBPACK_IMPORTED_MODULE_1__.send),\n/* harmony export */   sendForm: () => (/* reexport safe */ _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__.sendForm)\n/* harmony export */ });\n/* harmony import */ var _methods_init_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/init/init */ \"./node_modules/@emailjs/browser/es/methods/init/init.js\");\n/* harmony import */ var _methods_send_send__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/send/send */ \"./node_modules/@emailjs/browser/es/methods/send/send.js\");\n/* harmony import */ var _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/sendForm/sendForm */ \"./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    init: _methods_init_init__WEBPACK_IMPORTED_MODULE_0__.init,\n    send: _methods_send_send__WEBPACK_IMPORTED_MODULE_1__.send,\n    sendForm: _methods_sendForm_sendForm__WEBPACK_IMPORTED_MODULE_2__.sendForm,\n});\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/index.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/init/init.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/init/init.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ \"./node_modules/@emailjs/browser/es/store/store.js\");\n\n/**\n * Initiation\n * @param {string} publicKey - set the EmailJS public key\n * @param {string} origin - set the EmailJS origin\n */\nconst init = (publicKey, origin = 'https://api.emailjs.com') => {\n    _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID = publicKey;\n    _store_store__WEBPACK_IMPORTED_MODULE_0__.store._origin = origin;\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/methods/init/init.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendForm: () => (/* binding */ sendForm)\n/* harmony export */ });\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ \"./node_modules/@emailjs/browser/es/store/store.js\");\n/* harmony import */ var _utils_validateParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/validateParams */ \"./node_modules/@emailjs/browser/es/utils/validateParams.js\");\n/* harmony import */ var _api_sendPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/sendPost */ \"./node_modules/@emailjs/browser/es/api/sendPost.js\");\n\n\n\nconst findHTMLForm = (form) => {\n    let currentForm;\n    if (typeof form === 'string') {\n        currentForm = document.querySelector(form);\n    }\n    else {\n        currentForm = form;\n    }\n    if (!currentForm || currentForm.nodeName !== 'FORM') {\n        throw 'The 3rd parameter is expected to be the HTML form element or the style selector of form';\n    }\n    return currentForm;\n};\n/**\n * Send a form the specific EmailJS service\n * @param {string} serviceID - the EmailJS service ID\n * @param {string} templateID - the EmailJS template ID\n * @param {string | HTMLFormElement} form - the form element or selector\n * @param {string} publicKey - the EmailJS public key\n * @returns {Promise<EmailJSResponseStatus>}\n */\nconst sendForm = (serviceID, templateID, form, publicKey) => {\n    const uID = publicKey || _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID;\n    const currentForm = findHTMLForm(form);\n    (0,_utils_validateParams__WEBPACK_IMPORTED_MODULE_1__.validateParams)(uID, serviceID, templateID);\n    const formData = new FormData(currentForm);\n    formData.append('lib_version', '3.11.0');\n    formData.append('service_id', serviceID);\n    formData.append('template_id', templateID);\n    formData.append('user_id', uID);\n    return (0,_api_sendPost__WEBPACK_IMPORTED_MODULE_2__.sendPost)('/api/v1.0/email/send-form', formData);\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/methods/sendForm/sendForm.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/methods/send/send.js":
/*!***************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/methods/send/send.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   send: () => (/* binding */ send)\n/* harmony export */ });\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/store */ \"./node_modules/@emailjs/browser/es/store/store.js\");\n/* harmony import */ var _utils_validateParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/validateParams */ \"./node_modules/@emailjs/browser/es/utils/validateParams.js\");\n/* harmony import */ var _api_sendPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/sendPost */ \"./node_modules/@emailjs/browser/es/api/sendPost.js\");\n\n\n\n/**\n * Send a template to the specific EmailJS service\n * @param {string} serviceID - the EmailJS service ID\n * @param {string} templateID - the EmailJS template ID\n * @param {object} templatePrams - the template params, what will be set to the EmailJS template\n * @param {string} publicKey - the EmailJS public key\n * @returns {Promise<EmailJSResponseStatus>}\n */\nconst send = (serviceID, templateID, templatePrams, publicKey) => {\n    const uID = publicKey || _store_store__WEBPACK_IMPORTED_MODULE_0__.store._userID;\n    (0,_utils_validateParams__WEBPACK_IMPORTED_MODULE_1__.validateParams)(uID, serviceID, templateID);\n    const params = {\n        lib_version: '3.11.0',\n        user_id: uID,\n        service_id: serviceID,\n        template_id: templateID,\n        template_params: templatePrams,\n    };\n    return (0,_api_sendPost__WEBPACK_IMPORTED_MODULE_2__.sendPost)('/api/v1.0/email/send', JSON.stringify(params), {\n        'Content-type': 'application/json',\n    });\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/methods/send/send.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EmailJSResponseStatus: () => (/* binding */ EmailJSResponseStatus)\n/* harmony export */ });\nclass EmailJSResponseStatus {\n    constructor(httpResponse) {\n        this.status = httpResponse ? httpResponse.status : 0;\n        this.text = httpResponse ? httpResponse.responseText : 'Network Error';\n    }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/models/EmailJSResponseStatus.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/store/store.js":
/*!*********************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/store/store.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   store: () => (/* binding */ store)\n/* harmony export */ });\nconst store = {\n    _origin: 'https://api.emailjs.com',\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/store/store.js?");

/***/ }),

/***/ "./node_modules/@emailjs/browser/es/utils/validateParams.js":
/*!******************************************************************!*\
  !*** ./node_modules/@emailjs/browser/es/utils/validateParams.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateParams: () => (/* binding */ validateParams)\n/* harmony export */ });\nconst validateParams = (publicKey, serviceID, templateID) => {\n    if (!publicKey) {\n        throw 'The public key is required. Visit https://dashboard.emailjs.com/admin/account';\n    }\n    if (!serviceID) {\n        throw 'The service ID is required. Visit https://dashboard.emailjs.com/admin';\n    }\n    if (!templateID) {\n        throw 'The template ID is required. Visit https://dashboard.emailjs.com/admin/templates';\n    }\n    return true;\n};\n\n\n//# sourceURL=webpack:///./node_modules/@emailjs/browser/es/utils/validateParams.js?");

/***/ }),

/***/ "./src/contact.ts":
/*!************************!*\
  !*** ./src/contact.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _emailjs_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emailjs/browser */ \"./node_modules/@emailjs/browser/es/index.js\");\n/* eslint-disable @typescript-eslint/no-non-null-assertion */\n\n(function () {\n    _emailjs_browser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init('DzZ6BIu3N4pT6e34Q');\n})();\nconst contactForm = document.querySelector('#contact-form');\n// * Send email with data from the document\ncontactForm.addEventListener('submit', (event) => {\n    // handle the form data\n    event.preventDefault();\n    // *Send form with emailjs\n    _emailjs_browser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sendForm('contact_service', 'contact_form', contactForm)\n        .then(() => {\n        contactForm.submit();\n    })\n        .catch((error) => {\n        const par = document.getElementById('test');\n        par.innerText = 'Something went wrong!';\n        console.log('FAILED....', error);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/contact.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/contact.ts");
/******/ 	
/******/ })()
;