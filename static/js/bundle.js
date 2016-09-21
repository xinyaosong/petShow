/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "79c937243eaa4aa3241c"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _upload = __webpack_require__(3);

	var _upload2 = _interopRequireDefault(_upload);

	var _show = __webpack_require__(6);

	var _show2 = _interopRequireDefault(_show);

	__webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HomeComponent = function (_React$Component) {
		_inherits(HomeComponent, _React$Component);

		function HomeComponent() {
			_classCallCheck(this, HomeComponent);

			var _this = _possibleConstructorReturn(this, (HomeComponent.__proto__ || Object.getPrototypeOf(HomeComponent)).call(this));

			_this.state = { addNew: false, index: 0, showImg: false };
			_this.handleAddClick = _this.handleAddClick.bind(_this);
			_this.handleSubmit = _this.handleSubmit.bind(_this);
			return _this;
		}

		_createClass(HomeComponent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				$('[id$=Icon]').tooltip();
			}
		}, {
			key: 'handleAddClick',
			value: function handleAddClick() {
				this.setState({ addNew: true,
					index: this.state.index + 1
				});
			}
		}, {
			key: 'handleSubmit',
			value: function handleSubmit() {
				var imgList = $('img');
				if (imgList.length <= 0) {
					$('.uploadError').css('opacity', 1);
				} else {
					$('.uploadError').hide();
					this.setState({ showImg: true });
				}
			}
		}, {
			key: 'render',
			value: function render() {

				if (this.state.showImg == true) {
					return _react2.default.createElement(
						'div',
						{ className: 'container', id: 'mainContent' },
						_react2.default.createElement(_show2.default, null)
					);
				}

				var addNew = null;
				if (this.state.addNew == true) {
					var arr = [];
					for (var i = 0; i < this.state.index; i++) {
						arr.push(_react2.default.createElement(
							'li',
							{ key: i + 1 },
							' ',
							_react2.default.createElement(_upload2.default, null),
							' '
						));
					}
					addNew = arr;
				}
				return _react2.default.createElement(
					'div',
					{ className: 'container', id: 'mainContent' },
					_react2.default.createElement(
						'section',
						{ id: 'uploadSection' },
						_react2.default.createElement(
							'header',
							null,
							_react2.default.createElement(
								'div',
								{ id: 'rectangle' },
								'Upload your favorite pictures'
							),
							_react2.default.createElement('div', { id: 'triangle' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'imgContent' },
							_react2.default.createElement(
								'ul',
								{ id: 'uploadList' },
								_react2.default.createElement(
									'li',
									{ key: 0 },
									_react2.default.createElement(_upload2.default, null)
								),
								addNew
							)
						)
					),
					_react2.default.createElement(
						'aside',
						{ className: 'homeIcon' },
						_react2.default.createElement(
							'div',
							{ id: 'addIcon', 'data-toggle': 'tooltip', 'data-placement': 'top', title: 'Add more', onClick: this.handleAddClick },
							_react2.default.createElement(
								'h4',
								null,
								'+'
							)
						),
						_react2.default.createElement(
							'div',
							{ id: 'submitIcon', 'data-toggle': 'tooltip', 'data-placement': 'bottom', title: 'Show it', onClick: this.handleSubmit },
							_react2.default.createElement(
								'h1',
								null,
								_react2.default.createElement('span', { className: 'glyphicon glyphicon-play-circle' })
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'uploadError' },
						_react2.default.createElement(
							'h3',
							null,
							'Please upload at least one picture.'
						)
					)
				);
			}
		}]);

		return HomeComponent;
	}(_react2.default.Component);

	_reactDom2.default.render(_react2.default.createElement(HomeComponent, null), document.getElementById('wrapper'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dropifyMin = __webpack_require__(4);

	var _dropifyMin2 = _interopRequireDefault(_dropifyMin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UploadComponent = function (_React$Component) {
		_inherits(UploadComponent, _React$Component);

		function UploadComponent() {
			_classCallCheck(this, UploadComponent);

			return _possibleConstructorReturn(this, (UploadComponent.__proto__ || Object.getPrototypeOf(UploadComponent)).call(this));
		}

		_createClass(UploadComponent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				$('.dropify').dropify();
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'col-md-8' },
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-md-6 imgContainer' },
								React.createElement('input', { type: 'file', className: 'dropify', 'data-height': '200' })
							),
							React.createElement(
								'div',
								{ className: 'col-md-6 imgContainer' },
								React.createElement('input', { type: 'file', className: 'dropify', 'data-height': '200' })
							)
						),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-md-6 imgContainer' },
								React.createElement('input', { type: 'file', className: 'dropify', 'data-height': '200' })
							),
							React.createElement(
								'div',
								{ className: 'col-md-6 imgContainer' },
								React.createElement('input', { type: 'file', className: 'dropify', 'data-height': '200' })
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'col-md-4 imgContainer' },
						React.createElement('input', { type: 'file', className: 'dropify', 'data-height': '420' })
					)
				);
			}
		}]);

		return UploadComponent;
	}(React.Component);

	exports.default = UploadComponent;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * =============================================================
	 * dropify v0.2.1 - Override your input files with style.
	 * https://github.com/JeremyFagis/dropify
	 *
	 * (c) 2016 - Jeremy FAGIS <jeremy@fagis.fr> (http://fagis.fr)
	 * =============================================================
	 */

	!function (e, i) {
	   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = i(require("jquery")) : e.Dropify = i(e.jQuery);
	}(undefined, function (e) {
	  function i(i, t) {
	    if (window.File && window.FileReader && window.FileList && window.Blob) {
	      var s = { defaultFile: "", maxFileSize: 0, minWidth: 0, maxWidth: 0, minHeight: 0, maxHeight: 0, showRemove: !0, showLoader: !0, showErrors: !0, errorTimeout: 3e3, errorsPosition: "overlay", imgFileExtensions: ["png", "jpg", "jpeg", "gif", "bmp"], maxFileSizePreview: "5M", allowedFormats: ["portrait", "square", "landscape"], allowedFileExtensions: ["*"], messages: { "default": "Drag and drop a file here or click", replace: "Drag and drop or click to replace", remove: "Remove", error: "Ooops, something wrong appended." }, error: { fileSize: "The file size is too big ({{ value }} max).", minWidth: "The image width is too small ({{ value }}}px min).", maxWidth: "The image width is too big ({{ value }}}px max).", minHeight: "The image height is too small ({{ value }}}px min).", maxHeight: "The image height is too big ({{ value }}px max).", imageFormat: "The image format is not allowed ({{ value }} only).", fileExtension: "The file is not allowed ({{ value }} only)." }, tpl: { wrap: '<div class="dropify-wrapper"></div>', loader: '<div class="dropify-loader"></div>', message: '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>', preview: '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>', filename: '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>', clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>', errorLine: '<p class="dropify-error">{{ error }}</p>', errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>' } };this.element = i, this.input = e(this.element), this.wrapper = null, this.preview = null, this.filenameWrapper = null, this.settings = e.extend(!0, s, t, this.input.data()), this.errorsEvent = e.Event("dropify.errors"), this.isDisabled = !1, this.isInit = !1, this.file = { object: null, name: null, size: null, width: null, height: null, type: null }, Array.isArray(this.settings.allowedFormats) || (this.settings.allowedFormats = this.settings.allowedFormats.split(" ")), Array.isArray(this.settings.allowedFileExtensions) || (this.settings.allowedFileExtensions = this.settings.allowedFileExtensions.split(" ")), this.onChange = this.onChange.bind(this), this.clearElement = this.clearElement.bind(this), this.onFileReady = this.onFileReady.bind(this), this.translateMessages(), this.createElements(), this.setContainerSize(), this.errorsEvent.errors = [], this.input.on("change", this.onChange);
	    }
	  }var t = "dropify";return i.prototype.onChange = function () {
	    this.resetPreview(), this.readFile(this.element);
	  }, i.prototype.createElements = function () {
	    this.isInit = !0, this.input.wrap(e(this.settings.tpl.wrap)), this.wrapper = this.input.parent();var i = e(this.settings.tpl.message).insertBefore(this.input);e(this.settings.tpl.errorLine).appendTo(i), this.isTouchDevice() === !0 && this.wrapper.addClass("touch-fallback"), this.input.attr("disabled") && (this.isDisabled = !0, this.wrapper.addClass("disabled")), this.settings.showLoader === !0 && (this.loader = e(this.settings.tpl.loader), this.loader.insertBefore(this.input)), this.preview = e(this.settings.tpl.preview), this.preview.insertAfter(this.input), this.isDisabled === !1 && this.settings.showRemove === !0 && (this.clearButton = e(this.settings.tpl.clearButton), this.clearButton.insertAfter(this.input), this.clearButton.on("click", this.clearElement)), this.filenameWrapper = e(this.settings.tpl.filename), this.filenameWrapper.prependTo(this.preview.find(".dropify-infos-inner")), this.settings.showErrors === !0 && (this.errorsContainer = e(this.settings.tpl.errorsContainer), "outside" === this.settings.errorsPosition ? this.errorsContainer.insertAfter(this.wrapper) : this.errorsContainer.insertBefore(this.input));var t = this.settings.defaultFile || "";"" !== t.trim() && (this.file.name = this.cleanFilename(t), this.setPreview(this.isImage(), t));
	  }, i.prototype.readFile = function (i) {
	    if (i.files && i.files[0]) {
	      var t = new FileReader(),
	          s = new Image(),
	          r = i.files[0],
	          n = null,
	          o = this,
	          h = e.Event("dropify.fileReady");this.clearErrors(), this.showLoader(), this.setFileInformations(r), this.errorsEvent.errors = [], this.checkFileSize(), this.isFileExtensionAllowed(), this.isImage() && this.file.size < this.sizeToByte(this.settings.maxFileSizePreview) ? (this.input.on("dropify.fileReady", this.onFileReady), t.readAsDataURL(r), t.onload = function (e) {
	        n = e.target.result, s.src = e.target.result, s.onload = function () {
	          o.setFileDimensions(this.width, this.height), o.validateImage(), o.input.trigger(h, [!0, n]);
	        };
	      }.bind(this)) : this.onFileReady(!1);
	    }
	  }, i.prototype.onFileReady = function (e, i, t) {
	    if (this.input.off("dropify.fileReady", this.onFileReady), 0 === this.errorsEvent.errors.length) this.setPreview(i, t);else {
	      this.input.trigger(this.errorsEvent, [this]);for (var s = this.errorsEvent.errors.length - 1; s >= 0; s--) {
	        var r = this.errorsEvent.errors[s].namespace,
	            n = r.split(".").pop();this.showError(n);
	      }if ("undefined" != typeof this.errorsContainer) {
	        this.errorsContainer.addClass("visible");var o = this.errorsContainer;setTimeout(function () {
	          o.removeClass("visible");
	        }, this.settings.errorTimeout);
	      }this.wrapper.addClass("has-error"), this.resetPreview(), this.clearElement();
	    }
	  }, i.prototype.setFileInformations = function (e) {
	    this.file.object = e, this.file.name = e.name, this.file.size = e.size, this.file.type = e.type, this.file.width = null, this.file.height = null;
	  }, i.prototype.setFileDimensions = function (e, i) {
	    this.file.width = e, this.file.height = i;
	  }, i.prototype.setPreview = function (i, t) {
	    this.wrapper.removeClass("has-error").addClass("has-preview"), this.filenameWrapper.children(".dropify-filename-inner").html(this.file.name);var s = this.preview.children(".dropify-render");if (this.hideLoader(), i === !0) {
	      var r = e("<img />").attr("src", t);this.settings.height && r.css("max-height", this.settings.height), r.appendTo(s);
	    } else e("<i />").attr("class", "dropify-font-file").appendTo(s), e('<span class="dropify-extension" />').html(this.getFileType()).appendTo(s);this.preview.fadeIn();
	  }, i.prototype.resetPreview = function () {
	    this.wrapper.removeClass("has-preview");var e = this.preview.children(".dropify-render");e.find(".dropify-extension").remove(), e.find("i").remove(), e.find("img").remove(), this.preview.hide(), this.hideLoader();
	  }, i.prototype.cleanFilename = function (e) {
	    var i = e.split("\\").pop();return i == e && (i = e.split("/").pop()), "" !== e ? i : "";
	  }, i.prototype.clearElement = function () {
	    if (0 === this.errorsEvent.errors.length) {
	      var i = e.Event("dropify.beforeClear");this.input.trigger(i, [this]), i.result !== !1 && (this.resetFile(), this.input.val(""), this.resetPreview(), this.input.trigger(e.Event("dropify.afterClear"), [this]));
	    } else this.resetFile(), this.input.val(""), this.resetPreview();
	  }, i.prototype.resetFile = function () {
	    this.file.object = null, this.file.name = null, this.file.size = null, this.file.type = null, this.file.width = null, this.file.height = null;
	  }, i.prototype.setContainerSize = function () {
	    this.settings.height && this.wrapper.height(this.settings.height);
	  }, i.prototype.isTouchDevice = function () {
	    return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	  }, i.prototype.getFileType = function () {
	    return this.file.name.split(".").pop().toLowerCase();
	  }, i.prototype.isImage = function () {
	    return "-1" != this.settings.imgFileExtensions.indexOf(this.getFileType()) ? !0 : !1;
	  }, i.prototype.isFileExtensionAllowed = function () {
	    return "-1" != this.settings.allowedFileExtensions.indexOf("*") || "-1" != this.settings.allowedFileExtensions.indexOf(this.getFileType()) ? !0 : (this.pushError("fileExtension"), !1);
	  }, i.prototype.translateMessages = function () {
	    for (var e in this.settings.tpl) {
	      for (var i in this.settings.messages) {
	        this.settings.tpl[e] = this.settings.tpl[e].replace("{{ " + i + " }}", this.settings.messages[i]);
	      }
	    }
	  }, i.prototype.checkFileSize = function () {
	    0 !== this.sizeToByte(this.settings.maxFileSize) && this.file.size > this.sizeToByte(this.settings.maxFileSize) && this.pushError("fileSize");
	  }, i.prototype.sizeToByte = function (e) {
	    var i = 0;if (0 !== e) {
	      var t = e.slice(-1).toUpperCase(),
	          s = 1024,
	          r = 1024 * s,
	          n = 1024 * r;"K" === t ? i = parseFloat(e) * s : "M" === t ? i = parseFloat(e) * r : "G" === t && (i = parseFloat(e) * n);
	    }return i;
	  }, i.prototype.validateImage = function () {
	    0 !== this.settings.minWidth && this.settings.minWidth >= this.file.width && this.pushError("minWidth"), 0 !== this.settings.maxWidth && this.settings.maxWidth <= this.file.width && this.pushError("maxWidth"), 0 !== this.settings.minHeight && this.settings.minHeight >= this.file.height && this.pushError("minHeight"), 0 !== this.settings.maxHeight && this.settings.maxHeight <= this.file.height && this.pushError("maxHeight"), "-1" == this.settings.allowedFormats.indexOf(this.getImageFormat()) && this.pushError("imageFormat");
	  }, i.prototype.getImageFormat = function () {
	    return this.file.width == this.file.height ? "square" : this.file.width < this.file.height ? "portrait" : this.file.width > this.file.height ? "landscape" : void 0;
	  }, i.prototype.pushError = function (i) {
	    var t = e.Event("dropify.error." + i);this.errorsEvent.errors.push(t), this.input.trigger(t, [this]);
	  }, i.prototype.clearErrors = function () {
	    "undefined" != typeof this.errorsContainer && this.errorsContainer.children("ul").html("");
	  }, i.prototype.showError = function (e) {
	    "undefined" != typeof this.errorsContainer && this.errorsContainer.children("ul").append("<li>" + this.getError(e) + "</li>");
	  }, i.prototype.getError = function (e) {
	    var i = this.settings.error[e],
	        t = "";return "fileSize" === e ? t = this.settings.maxFileSize : "minWidth" === e ? t = this.settings.minWidth : "maxWidth" === e ? t = this.settings.maxWidth : "minHeight" === e ? t = this.settings.minHeight : "maxHeight" === e ? t = this.settings.maxHeight : "imageFormat" === e ? t = this.settings.allowedFormats.join(", ") : "fileExtension" === e && (t = this.settings.allowedFileExtensions.join(", ")), "" !== t ? i.replace("{{ value }}", t) : i;
	  }, i.prototype.showLoader = function () {
	    "undefined" != typeof this.loader && this.loader.show();
	  }, i.prototype.hideLoader = function () {
	    "undefined" != typeof this.loader && this.loader.hide();
	  }, i.prototype.destroy = function () {
	    this.input.siblings().remove(), this.input.unwrap(), this.isInit = !1;
	  }, i.prototype.init = function () {
	    this.createElements();
	  }, i.prototype.isDropified = function () {
	    return this.isInit;
	  }, e.fn[t] = function (s) {
	    return this.each(function () {
	      e.data(this, t) || e.data(this, t, new i(this, s));
	    }), this;
	  }, i;
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Carousel = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ShowImgComponent = function (_React$Component) {
		_inherits(ShowImgComponent, _React$Component);

		function ShowImgComponent() {
			_classCallCheck(this, ShowImgComponent);

			var _this = _possibleConstructorReturn(this, (ShowImgComponent.__proto__ || Object.getPrototypeOf(ShowImgComponent)).call(this));

			_this.handleClick = _this.handleClick.bind(_this);
			_this.state = {
				carousel: _Carousel.carousel
			};
			return _this;
		}

		_createClass(ShowImgComponent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.state.carousel.start();
			}
		}, {
			key: 'handleClick',
			value: function handleClick(event) {
				var target = event.target;
				var parent = target.parentNode;
				if (parent && parent.id == 'imgMark') {
					var cur_index = target.innerHTML - 1;
					this.state.carousel.markClick(cur_index);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'section',
					{ id: 'showImgSection' },
					React.createElement(
						'div',
						{ className: 'imgListWrapper', onClick: this.handleClick },
						React.createElement(GetImgList, null),
						React.createElement(GetImgMark, null)
					)
				);
			}
		}]);

		return ShowImgComponent;
	}(React.Component);

	exports.default = ShowImgComponent;

	var GetImgList = function (_React$Component2) {
		_inherits(GetImgList, _React$Component2);

		function GetImgList() {
			_classCallCheck(this, GetImgList);

			return _possibleConstructorReturn(this, (GetImgList.__proto__ || Object.getPrototypeOf(GetImgList)).apply(this, arguments));
		}

		_createClass(GetImgList, [{
			key: 'render',
			value: function render() {
				var imgList = [];
				var preImgList = $('.dropify-render').find('img');
				var jq_imgList = preImgList.map(function (index, img) {
					var src = img.src;
					return React.createElement(
						'li',
						{ key: index },
						React.createElement('img', { src: src, alt: 'favorite picture' })
					);
				});
				for (var i = 0; i < jq_imgList.length; i++) {
					imgList.push(jq_imgList.get(i));
				}
				return React.createElement(
					'ul',
					{ id: 'imgList' },
					imgList
				);
			}
		}]);

		return GetImgList;
	}(React.Component);

	var GetImgMark = function (_React$Component3) {
		_inherits(GetImgMark, _React$Component3);

		function GetImgMark() {
			_classCallCheck(this, GetImgMark);

			return _possibleConstructorReturn(this, (GetImgMark.__proto__ || Object.getPrototypeOf(GetImgMark)).apply(this, arguments));
		}

		_createClass(GetImgMark, [{
			key: 'render',
			value: function render() {
				var list = [];
				var preImgList = $('.dropify-render').find('img');
				var jq_list = preImgList.map(function (index) {
					if (index == 0) {
						return React.createElement(
							'li',
							{ key: index, className: 'on' },
							index + 1
						);
					}
					return React.createElement(
						'li',
						{ key: index },
						index + 1
					);
				});
				for (var i = 0; i < jq_list.length; i++) {
					list.push(jq_list.get(i));
				}
				return React.createElement(
					'ul',
					{ id: 'imgMark' },
					list
				);
			}
		}]);

		return GetImgMark;
	}(React.Component);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var carousel = function () {
		var TIME = 2000;
		function setImgInitialOpacity(_this) {
			for (var i = 0; i < _this.imgList.length; i++) {
				if (i != 0) {
					setOpacity(_this.imgList[i], 0);
				}
			}
		}

		function fadeIn(elem) {
			setOpacity(elem, 0);
			for (var i = 1; i <= 20; i++) {
				(function (i) {
					setTimeout(function () {
						setOpacity(elem, 5 * i);
					}, i * 25);
				})(i);
			}
		}

		function fadeOut(elem) {

			for (var i = 1; i <= 20; i++) {
				(function (i) {
					setTimeout(function () {
						setOpacity(elem, 100 - 5 * i);
					}, i * 25);
				})(i);
			}
		}

		function setOpacity(elem, level) {
			if (elem.filters) {
				elem.style.filter = "alpha(opacity=" + level + '")';
			} else {
				elem.style.opacity = level / 100;
			}
		}

		function handleMark(last_index, cur_index) {
			var marks = $('#imgMark li');
			$(marks.get(last_index)).removeClass('on');
			$(marks.get(cur_index)).addClass('on');
		}

		return {
			start: function start() {
				var _this = this;
				this.imgWrapper = $('.imgListWrapper');
				this.imgList = $('.imgListWrapper').find('img');
				this.index = 0;

				if (!this.imgList.length || this.imgList.length == 1) {
					return;
				}

				setImgInitialOpacity(_this); //set all imgs opacity=0 except the first one

				// carousel
				var imgTransform = function () {
					var last = this.index;
					if (this.index == this.imgList.length - 1) {
						this.index = 0;
					} else {
						this.index = this.index + 1;
					}

					this.fade(last, this.index);
					handleMark(last, this.index);
				}.bind(this);

				var intervalId = setInterval(imgTransform, TIME);

				//bind the mouseover and mouseout event on the img
				this.imgList.on('mouseover', function () {
					clearInterval(intervalId);
				});
				this.imgList.on('mouseout', function () {
					intervalId = setInterval(imgTransform, TIME);
				});

				//bind the mouseover and mouseout event on the img mark(li)
				$('#imgMark').on({
					'mouseover': function mouseover() {
						clearInterval(intervalId);
					},
					'mouseout': function mouseout() {
						intervalId = setInterval(imgTransform, TIME);
					}
				}, 'li');
			},

			fade: function fade(last_index, cur_index) {
				if (last_index == cur_index) return;
				fadeOut(this.imgList[last_index]);
				fadeIn(this.imgList[cur_index]);
			},

			markClick: function markClick(cur_index) {
				var last_index = this.index;
				this.fade(last_index, cur_index);
				this.index = cur_index;
				handleMark(last_index, cur_index);
			}
		};
	}();

	exports.carousel = carousel;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(9, function() {
				var newContent = __webpack_require__(9);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "body {\n  background: url(" + __webpack_require__(11) + ");\n}\nli {\n  list-style-type: none;\n}\nheader {\n  position: fixed;\n  top: 20px;\n  left: 0px;\n}\n#rectangle {\n  position: absolute;\n  width: 300px;\n  height: 50px;\n  border-radius: 1px;\n  text-align: center;\n  line-height: 50px;\n  color: white;\n  font-size: large;\n  background-color: lightslategrey;\n}\n#triangle {\n  position: absolute;\n  left: 300px;\n  height: 0;\n  width: 0;\n  border-radius: 1px;\n  border-top: 25px solid transparent;\n  border-bottom: 25px solid transparent;\n  border-left: 30px solid lightslategrey;\n}\n.homeIcon {\n  position: fixed;\n  bottom: 10%;\n  right: 7%;\n  text-align: center;\n}\n#addIcon {\n  width: 40px;\n  height: 40px;\n  color: #fff;\n  border-radius: 40px;\n  cursor: pointer;\n  outline: none;\n  background-color: #999999;\n  border: 1px solid #999999;\n}\n#addIcon:hover {\n  border: 1px solid #ccc;\n  background-color: #ccc;\n  color: #fff;\n}\n#addIcon:focus {\n  outline: none;\n}\n#submitIcon {\n  width: 40px;\n  margin-top: 10px;\n  cursor: pointer;\n  color: yellowgreen;\n}\n#submitIcon:hover {\n  color: #99FF33;\n}\n#mainContent {\n  width: 56%;\n}\n.imgContainer {\n  margin-bottom: 10px;\n}\n#uploadList {\n  margin-top: 100px;\n}\n.imgListWrapper {\n  position: relative;\n  margin-top: 50px;\n  height: 500px;\n  border-left: 3px solid lightsalmon;\n  margin: 50px 90px;\n}\n.imgListWrapper img {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  max-width: 90%;\n  max-height: 90%;\n  overflow: hidden;\n  margin-left: 90px;\n  border: 12px solid rgba(255, 255, 255, 0.3);\n}\n#imgMark {\n  text-align: center;\n  color: white;\n  -webkit-padding-start: 0px;\n}\n#imgMark li {\n  background-color: lightslategrey;\n  width: 30px;\n  margin-bottom: 5px;\n  cursor: pointer;\n  transition: padding-left 0.25s ease-in-out;\n}\n#imgMark li:hover {\n  padding-left: 60px;\n  background-color: lightsalmon;\n}\n#imgMark li.on {\n  padding-left: 60px;\n  background-color: lightsalmon;\n}\n.uploadError {\n  opacity: 0;\n  position: absolute;\n  top: 20px;\n  left: 50%;\n  margin-left: -12.5%;\n  color: darksalmon;\n  transition: opacity 0.5s ease-in;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ec69ce4642202a7a17aa7a862affc2c0.jpg";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);