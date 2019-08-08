(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.snjs = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    var _listCacheClear = listCacheClear;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    var eq_1 = eq;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq_1(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    var _assocIndexOf = assocIndexOf;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    var _listCacheDelete = listCacheDelete;

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    var _listCacheGet = listCacheGet;

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return _assocIndexOf(this.__data__, key) > -1;
    }

    var _listCacheHas = listCacheHas;

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    var _listCacheSet = listCacheSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = _listCacheClear;
    ListCache.prototype['delete'] = _listCacheDelete;
    ListCache.prototype.get = _listCacheGet;
    ListCache.prototype.has = _listCacheHas;
    ListCache.prototype.set = _listCacheSet;

    var _ListCache = ListCache;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new _ListCache;
      this.size = 0;
    }

    var _stackClear = stackClear;

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    var _stackDelete = stackDelete;

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    var _stackGet = stackGet;

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    var _stackHas = stackHas;

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function('return this')();

    var _root = root;

    /** Built-in value references. */
    var Symbol$1 = _root.Symbol;

    var _Symbol = Symbol$1;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    var isObject_1 = isObject;

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject_1(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = _baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    var isFunction_1 = isFunction;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = _root['__core-js_shared__'];

    var _coreJsData = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    var _isMasked = isMasked;

    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    var _toSource = toSource;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject_1(value) || _isMasked(value)) {
        return false;
      }
      var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
      return pattern.test(_toSource(value));
    }

    var _baseIsNative = baseIsNative;

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    var _getValue = getValue;

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = _getValue(object, key);
      return _baseIsNative(value) ? value : undefined;
    }

    var _getNative = getNative;

    /* Built-in method references that are verified to be native. */
    var Map = _getNative(_root, 'Map');

    var _Map = Map;

    /* Built-in method references that are verified to be native. */
    var nativeCreate = _getNative(Object, 'create');

    var _nativeCreate = nativeCreate;

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
      this.size = 0;
    }

    var _hashClear = hashClear;

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    var _hashDelete = hashDelete;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (_nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
    }

    var _hashGet = hashGet;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
    }

    var _hashHas = hashHas;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    var _hashSet = hashSet;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = _hashClear;
    Hash.prototype['delete'] = _hashDelete;
    Hash.prototype.get = _hashGet;
    Hash.prototype.has = _hashHas;
    Hash.prototype.set = _hashSet;

    var _Hash = Hash;

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new _Hash,
        'map': new (_Map || _ListCache),
        'string': new _Hash
      };
    }

    var _mapCacheClear = mapCacheClear;

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    var _isKeyable = isKeyable;

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return _isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    var _getMapData = getMapData;

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = _getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    var _mapCacheDelete = mapCacheDelete;

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return _getMapData(this, key).get(key);
    }

    var _mapCacheGet = mapCacheGet;

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return _getMapData(this, key).has(key);
    }

    var _mapCacheHas = mapCacheHas;

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = _getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    var _mapCacheSet = mapCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = _mapCacheClear;
    MapCache.prototype['delete'] = _mapCacheDelete;
    MapCache.prototype.get = _mapCacheGet;
    MapCache.prototype.has = _mapCacheHas;
    MapCache.prototype.set = _mapCacheSet;

    var _MapCache = MapCache;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof _ListCache) {
        var pairs = data.__data__;
        if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new _MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    var _stackSet = stackSet;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new _ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = _stackClear;
    Stack.prototype['delete'] = _stackDelete;
    Stack.prototype.get = _stackGet;
    Stack.prototype.has = _stackHas;
    Stack.prototype.set = _stackSet;

    var _Stack = Stack;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED$2);
      return this;
    }

    var _setCacheAdd = setCacheAdd;

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    var _setCacheHas = setCacheHas;

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new _MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
    SetCache.prototype.has = _setCacheHas;

    var _SetCache = SetCache;

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    var _arraySome = arraySome;

    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    var _cacheHas = cacheHas;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!_arraySome(other, function(othValue, othIndex) {
                if (!_cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    var _equalArrays = equalArrays;

    /** Built-in value references. */
    var Uint8Array = _root.Uint8Array;

    var _Uint8Array = Uint8Array;

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    var _mapToArray = mapToArray;

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    var _setToArray = setToArray;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$1 = 1,
        COMPARE_UNORDERED_FLAG$1 = 2;

    /** `Object#toString` result references. */
    var boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]';

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq_1(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = _mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
          convert || (convert = _setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG$1;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    var _equalByTag = equalByTag;

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    var _arrayPush = arrayPush;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray_1 = isArray;

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
    }

    var _baseGetAllKeys = baseGetAllKeys;

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    var _arrayFilter = arrayFilter;

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    var stubArray_1 = stubArray;

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return _arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    var _getSymbols = getSymbols;

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    var _baseTimes = baseTimes;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
    }

    var _baseIsArguments = baseIsArguments;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
      return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
        !propertyIsEnumerable$1.call(value, 'callee');
    };

    var isArguments_1 = isArguments;

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    var stubFalse_1 = stubFalse;

    var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse_1;

    module.exports = isBuffer;
    });

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    var _isIndex = isIndex;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
    }

    var isLength_1 = isLength;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag$1 = '[object Boolean]',
        dateTag$1 = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag$1 = '[object Function]',
        mapTag$1 = '[object Map]',
        numberTag$1 = '[object Number]',
        objectTag = '[object Object]',
        regexpTag$1 = '[object RegExp]',
        setTag$1 = '[object Set]',
        stringTag$1 = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag$1 = '[object ArrayBuffer]',
        dataViewTag$1 = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
    typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
    typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
    typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike_1(value) &&
        isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
    }

    var _baseIsTypedArray = baseIsTypedArray;

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    var _baseUnary = baseUnary;

    var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && _freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    module.exports = nodeUtil;
    });

    /* Node.js helper references. */
    var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

    var isTypedArray_1 = isTypedArray;

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray_1(value),
          isArg = !isArr && isArguments_1(value),
          isBuff = !isArr && !isArg && isBuffer_1(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? _baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$5.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               _isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    var _arrayLikeKeys = arrayLikeKeys;

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

      return value === proto;
    }

    var _isPrototype = isPrototype;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    var _overArg = overArg;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = _overArg(Object.keys, Object);

    var _nativeKeys = nativeKeys;

    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!_isPrototype(object)) {
        return _nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeys = baseKeys;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength_1(value.length) && !isFunction_1(value);
    }

    var isArrayLike_1 = isArrayLike;

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
    }

    var keys_1 = keys;

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return _baseGetAllKeys(object, keys_1, _getSymbols);
    }

    var _getAllKeys = getAllKeys;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$2 = 1;

    /** Used for built-in method references. */
    var objectProto$a = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
          objProps = _getAllKeys(object),
          objLength = objProps.length,
          othProps = _getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    var _equalObjects = equalObjects;

    /* Built-in method references that are verified to be native. */
    var DataView = _getNative(_root, 'DataView');

    var _DataView = DataView;

    /* Built-in method references that are verified to be native. */
    var Promise$1 = _getNative(_root, 'Promise');

    var _Promise = Promise$1;

    /* Built-in method references that are verified to be native. */
    var Set = _getNative(_root, 'Set');

    var _Set = Set;

    /* Built-in method references that are verified to be native. */
    var WeakMap = _getNative(_root, 'WeakMap');

    var _WeakMap = WeakMap;

    /** `Object#toString` result references. */
    var mapTag$2 = '[object Map]',
        objectTag$1 = '[object Object]',
        promiseTag = '[object Promise]',
        setTag$2 = '[object Set]',
        weakMapTag$1 = '[object WeakMap]';

    var dataViewTag$2 = '[object DataView]';

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = _toSource(_DataView),
        mapCtorString = _toSource(_Map),
        promiseCtorString = _toSource(_Promise),
        setCtorString = _toSource(_Set),
        weakMapCtorString = _toSource(_WeakMap);

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = _baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
        (_Map && getTag(new _Map) != mapTag$2) ||
        (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
        (_Set && getTag(new _Set) != setTag$2) ||
        (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
      getTag = function(value) {
        var result = _baseGetTag(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? _toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag$2;
            case mapCtorString: return mapTag$2;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag$2;
            case weakMapCtorString: return weakMapTag$1;
          }
        }
        return result;
      };
    }

    var _getTag = getTag;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$3 = 1;

    /** `Object#toString` result references. */
    var argsTag$2 = '[object Arguments]',
        arrayTag$1 = '[object Array]',
        objectTag$2 = '[object Object]';

    /** Used for built-in method references. */
    var objectProto$b = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray_1(object),
          othIsArr = isArray_1(other),
          objTag = objIsArr ? arrayTag$1 : _getTag(object),
          othTag = othIsArr ? arrayTag$1 : _getTag(other);

      objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
      othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

      var objIsObj = objTag == objectTag$2,
          othIsObj = othTag == objectTag$2,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer_1(object)) {
        if (!isBuffer_1(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new _Stack);
        return (objIsArr || isTypedArray_1(object))
          ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
        var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new _Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new _Stack);
      return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    var _baseIsEqualDeep = baseIsEqualDeep;

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
        return value !== value && other !== other;
      }
      return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    var _baseIsEqual = baseIsEqual;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$4 = 1,
        COMPARE_UNORDERED_FLAG$2 = 2;

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new _Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    var _baseIsMatch = baseIsMatch;

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject_1(value);
    }

    var _isStrictComparable = isStrictComparable;

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys_1(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, _isStrictComparable(value)];
      }
      return result;
    }

    var _getMatchData = getMatchData;

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    var _matchesStrictComparable = matchesStrictComparable;

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = _getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || _baseIsMatch(object, source, matchData);
      };
    }

    var _baseMatches = baseMatches;

    /** `Object#toString` result references. */
    var symbolTag$1 = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
    }

    var isSymbol_1 = isSymbol;

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/;

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray_1(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol_1(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    var _isKey = isKey;

    /** Error message constants. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || _MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = _MapCache;

    var memoize_1 = memoize;

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize_1(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    var _memoizeCapped = memoizeCapped;

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = _memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    var _stringToPath = stringToPath;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
        symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray_1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return _arrayMap(value, baseToString) + '';
      }
      if (isSymbol_1(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _baseToString = baseToString;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : _baseToString(value);
    }

    var toString_1 = toString;

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray_1(value)) {
        return value;
      }
      return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
    }

    var _castPath = castPath;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol_1(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    var _toKey = toKey;

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = _castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[_toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    var _baseGet = baseGet;

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : _baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    var get_1 = get;

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    var _baseHasIn = baseHasIn;

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = _castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = _toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength_1(length) && _isIndex(key, length) &&
        (isArray_1(object) || isArguments_1(object));
    }

    var _hasPath = hasPath;

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && _hasPath(object, path, _baseHasIn);
    }

    var hasIn_1 = hasIn;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$5 = 1,
        COMPARE_UNORDERED_FLAG$3 = 2;

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (_isKey(path) && _isStrictComparable(srcValue)) {
        return _matchesStrictComparable(_toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get_1(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn_1(object, path)
          : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
      };
    }

    var _baseMatchesProperty = baseMatchesProperty;

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    var identity_1 = identity;

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    var _baseProperty = baseProperty;

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return _baseGet(object, path);
      };
    }

    var _basePropertyDeep = basePropertyDeep;

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
    }

    var property_1 = property;

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity_1;
      }
      if (typeof value == 'object') {
        return isArray_1(value)
          ? _baseMatchesProperty(value[0], value[1])
          : _baseMatches(value);
      }
      return property_1(value);
    }

    var _baseIteratee = baseIteratee;

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    var last_1 = last;

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    var _baseSlice = baseSlice;

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
    }

    var _parent = parent;

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = _castPath(path, object);
      object = _parent(object, path);
      return object == null || delete object[_toKey(last_1(path))];
    }

    var _baseUnset = baseUnset;

    /** Used for built-in method references. */
    var arrayProto$1 = Array.prototype;

    /** Built-in value references. */
    var splice$1 = arrayProto$1.splice;

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (_isIndex(index)) {
            splice$1.call(array, index, 1);
          } else {
            _baseUnset(array, index);
          }
        }
      }
      return array;
    }

    var _basePullAt = basePullAt;

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = _baseIteratee(predicate);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      _basePullAt(array, indexes);
      return result;
    }

    var remove_1 = remove;

    var dateFormatter;

    class SFItem$1 {

      constructor(json_obj = {}) {
        this.content = {};
        this.referencingObjects = [];
        this.updateFromJSON(json_obj);

        if(!this.uuid) {
          // on React Native, this method will not exist. UUID gen will be handled manually via async methods.
          if(typeof(SFJS) !== "undefined" && SFJS.crypto.generateUUIDSync) {
            this.uuid = SFJS.crypto.generateUUIDSync();
          }
        }

        if(typeof this.content === 'object' && !this.content.references) {
          this.content.references = [];
        }
      }

      // On some platforms, syncrounous uuid generation is not available.
      // Those platforms (mobile) must call this function manually.
      async initUUID() {
        if(!this.uuid) {
          this.uuid = await SFJS.crypto.generateUUID();
        }
      }

      get contentObject() {

        if(this.errorDecrypting) {
          return this.content;
        }

        if(!this.content) {
          this.content = {};
          return this.content;
        }

        if(this.content !== null && typeof this.content === 'object') {
          // this is the case when mapping localStorage content, in which case the content is already parsed
          return this.content;
        }

        try {
          let content = JSON.parse(this.content);
          this.content = content;
          return this.content;
        } catch (e) {
          console.log("Error parsing json", e, this);
          this.content = {};
          return this.content;
        }
      }

      static deepMerge(a, b) {
        // By default _.merge will not merge a full array with an empty one.
        // We want to replace arrays wholesale
        function mergeCopyArrays(objValue, srcValue) {
          if (_.isArray(objValue)) {
            return srcValue;
          }
        }
        _.mergeWith(a, b, mergeCopyArrays);
        return a;
      }

      updateFromJSON(json) {
        // Don't expect this to ever be the case but we're having a crash with Android and this is the only suspect.
        if(!json) {
          return;
        }

        this.deleted = json.deleted;
        this.uuid = json.uuid;
        this.enc_item_key = json.enc_item_key;
        this.auth_hash = json.auth_hash;
        this.auth_params = json.auth_params;

        // When updating from server response (as opposed to local json response), these keys will be missing.
        // So we only want to update these values if they are explicitly present.
        let clientKeys = ["errorDecrypting", "dirty", "dirtyCount", "dirtiedDate", "dummy"];
        for(var key of clientKeys) {
          if(json[key] !== undefined) {
            this[key] = json[key];
          }
        }

        if(this.dirtiedDate && typeof this.dirtiedDate === 'string') {
          this.dirtiedDate = new Date(this.dirtiedDate);
        }

        // Check if object has getter for content_type, and if so, skip
        if(!this.content_type) {
          this.content_type = json.content_type;
        }

        // this.content = json.content will copy it by reference rather than value. So we need to do a deep merge after.
        // json.content can still be a string here. We copy it to this.content, then do a deep merge to transfer over all values.

        if(json.errorDecrypting) {
          this.content = json.content;
        } else {
          try {
            let parsedContent = typeof json.content === 'string' ? JSON.parse(json.content) : json.content;
            SFItem$1.deepMerge(this.contentObject, parsedContent);
          } catch (e) {
            console.log("Error while updating item from json", e);
          }
        }

        // Manually merge top level data instead of wholesale merge
        if(json.created_at) {
          this.created_at = json.created_at;
        }
        // Could be null if we're mapping from an extension bridge, where we remove this as its a private property.
        if(json.updated_at) {
          this.updated_at = json.updated_at;
        }

        if(this.created_at) { this.created_at = new Date(this.created_at);}
        else { this.created_at = new Date();}

        if(this.updated_at) { this.updated_at = new Date(this.updated_at);}
        else { this.updated_at = new Date(0);} // Epoch

        // Allows the getter to be re-invoked
        this._client_updated_at = null;

        if(json.content) {
          this.mapContentToLocalProperties(this.contentObject);
        } else if(json.deleted == true) {
          this.handleDeletedContent();
        }
      }

      mapContentToLocalProperties(contentObj) {

      }

      createContentJSONFromProperties() {
        /*
        NOTE: This function does have side effects and WILL modify our content.

        Subclasses will override structureParams, and add their own custom content and properties to the object returned from structureParams
        These are properties that this superclass will not be aware of, like 'title' or 'text'

        When we call createContentJSONFromProperties, we want to update our own inherit 'content' field with the values returned from structureParams,
        so that our content field is up to date.

        Each subclass will call super.structureParams and merge it with its own custom result object.
        Since our own structureParams gets a real-time copy of our content, it should be safe to merge the aggregate value back into our own content field.
        */
        let content = this.structureParams();

        SFItem$1.deepMerge(this.contentObject, content);

        // Return the content item copy and not our actual value, as we don't want it to be mutated outside our control.
        return content;
      }

      structureParams() {
        return this.getContentCopy();
      }

      /* Allows the item to handle the case where the item is deleted and the content is null */
      handleDeletedContent() {
        // Subclasses can override
      }

      setDirty(dirty, updateClientDate) {
        this.dirty = dirty;

        // Allows the syncManager to check if an item has been marked dirty after a sync has been started
        // This prevents it from clearing it as a dirty item after sync completion, if someone else has marked it dirty
        // again after an ongoing sync.
        if(!this.dirtyCount) { this.dirtyCount = 0; }
        if(dirty) {
          this.dirtyCount++;
        } else {
          this.dirtyCount = 0;
        }

        // Used internally by syncManager to determine if a dirted item needs to be saved offline.
        // You want to set this in both cases, when dirty is true and false. If it's false, we still need
        // to save it to disk as an update.
        this.dirtiedDate = new Date();

        if(dirty && updateClientDate) {
          // Set the client modified date to now if marking the item as dirty
          this.client_updated_at = new Date();
        } else if(!this.hasRawClientUpdatedAtValue()) {
          // if we don't have an explcit raw value, we initialize client_updated_at.
          this.client_updated_at = new Date(this.updated_at);
        }
      }

      updateLocalRelationships() {
        // optional override
      }

      addItemAsRelationship(item) {
        item.setIsBeingReferencedBy(this);

        if(this.hasRelationshipWithItem(item)) {
          return;
        }

        var references = this.content.references || [];
        references.push({
          uuid: item.uuid,
          content_type: item.content_type
        });
        this.content.references = references;
      }

      removeItemAsRelationship(item) {
        item.setIsNoLongerBeingReferencedBy(this);
        this.removeReferenceWithUuid(item.uuid);
      }

      // When another object has a relationship with us, we push that object into memory here.
      // We use this so that when `this` is deleted, we're able to update the references of those other objects.
      setIsBeingReferencedBy(item) {
        if(!_.find(this.referencingObjects, {uuid: item.uuid})) {
          this.referencingObjects.push(item);
        }
      }

      setIsNoLongerBeingReferencedBy(item) {
        _.remove(this.referencingObjects, {uuid: item.uuid});
        // Legacy two-way relationships should be handled here
        if(this.hasRelationshipWithItem(item)) {
          this.removeReferenceWithUuid(item.uuid);
          // We really shouldn't have the authority to set this item as dirty, but it's the only way to save this change.
          this.setDirty(true);
        }
      }

      removeReferenceWithUuid(uuid) {
        var references = this.content.references || [];
        references = references.filter((r) => {return r.uuid != uuid});
        this.content.references = references;
      }

      hasRelationshipWithItem(item) {
        let target = this.content.references.find((r) => {
          return r.uuid == item.uuid;
        });
        return target != null;
      }

      isBeingRemovedLocally() {

      }

      didFinishSyncing() {

      }

      informReferencesOfUUIDChange(oldUUID, newUUID) {
        // optional override
      }

      potentialItemOfInterestHasChangedItsUUID(newItem, oldUUID, newUUID) {
        // optional override
        for(var reference of this.content.references) {
          if(reference.uuid == oldUUID) {
            reference.uuid = newUUID;
            this.setDirty(true);
          }
        }
      }

      doNotEncrypt() {
        return false;
      }

      /*
      App Data
      */

      setDomainDataItem(key, value, domain) {
        if(!domain) {
          console.error("SFItem.AppDomain needs to be set.");
          return;
        }

        if(this.errorDecrypting) {
          return;
        }

        if(!this.content.appData) {
          this.content.appData = {};
        }

        var data = this.content.appData[domain];
        if(!data) {
          data = {};
        }
        data[key] = value;
        this.content.appData[domain] = data;
      }

      getDomainDataItem(key, domain) {
        if(!domain) {
          console.error("SFItem.AppDomain needs to be set.");
          return;
        }

        if(this.errorDecrypting) {
          return;
        }

        if(!this.content.appData) {
          this.content.appData = {};
        }

        var data = this.content.appData[domain];
        if(data) {
          return data[key];
        } else {
          return null;
        }
      }

      setAppDataItem(key, value) {
        this.setDomainDataItem(key, value, SFItem$1.AppDomain);
      }

      getAppDataItem(key) {
        return this.getDomainDataItem(key, SFItem$1.AppDomain);
      }

      get pinned() {
        return this.getAppDataItem("pinned");
      }

      get archived() {
        return this.getAppDataItem("archived");
      }

      get locked() {
        return this.getAppDataItem("locked");
      }

      // May be used by clients to display the human readable type for this item. Should be overriden by subclasses.
      get displayName() {
        return "Item";
      }

      hasRawClientUpdatedAtValue() {
        return this.getAppDataItem("client_updated_at") != null;
      }

      get client_updated_at() {
        if(!this._client_updated_at) {
          var saved = this.getAppDataItem("client_updated_at");
          if(saved) {
            this._client_updated_at = new Date(saved);
          } else {
            this._client_updated_at = new Date(this.updated_at);
          }
        }
        return this._client_updated_at;
      }

      set client_updated_at(date) {
        this._client_updated_at = date;

        this.setAppDataItem("client_updated_at", date);
      }

      /*
        During sync conflicts, when determing whether to create a duplicate for an item, we can omit keys that have no
        meaningful weight and can be ignored. For example, if one component has active = true and another component has active = false,
        it would be silly to duplicate them, so instead we ignore this.
       */
      keysToIgnoreWhenCheckingContentEquality() {
        return [];
      }

      // Same as above, but keys inside appData[Item.AppDomain]
      appDataKeysToIgnoreWhenCheckingContentEquality() {
        return ["client_updated_at"];
      }

      getContentCopy() {
        let contentCopy = JSON.parse(JSON.stringify(this.content));
        return contentCopy;
      }

      isItemContentEqualWith(otherItem) {
        return SFItem$1.AreItemContentsEqual({
          leftContent: this.content,
          rightContent: otherItem.content,
          keysToIgnore: this.keysToIgnoreWhenCheckingContentEquality(),
          appDataKeysToIgnore: this.appDataKeysToIgnoreWhenCheckingContentEquality()
        })
      }

      static AreItemContentsEqual({leftContent, rightContent, keysToIgnore, appDataKeysToIgnore}) {
        const omit = (obj, keys) => {
          if(!obj) { return obj; }
          for(let key of keys) {
            delete obj[key];
          }
          return obj;
        };

        // Create copies of objects before running omit as not to modify source values directly.
        leftContent = JSON.parse(JSON.stringify(leftContent));
        if(leftContent.appData) {
          omit(leftContent.appData[SFItem$1.AppDomain], appDataKeysToIgnore);
        }
        leftContent = omit(leftContent, keysToIgnore);

        rightContent = JSON.parse(JSON.stringify(rightContent));
        if(rightContent.appData) {
          omit(rightContent.appData[SFItem$1.AppDomain], appDataKeysToIgnore);
        }
        rightContent = omit(rightContent, keysToIgnore);

        return JSON.stringify(leftContent) === JSON.stringify(rightContent);
      }

      satisfiesPredicate(predicate) {
        /*
        Predicate is an SFPredicate having properties:
        {
          keypath: String,
          operator: String,
          value: object
        }
         */
        return SFPredicate.ItemSatisfiesPredicate(this, predicate);
      }

      /*
      Dates
      */

      createdAtString() {
        return this.dateToLocalizedString(this.created_at);
      }

      updatedAtString() {
        return this.dateToLocalizedString(this.client_updated_at);
      }

      updatedAtTimestamp() {
        return this.updated_at.getTime();
      }

      dateToLocalizedString(date) {
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
          if (!dateFormatter) {
            var locale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
            dateFormatter = new Intl.DateTimeFormat(locale, {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
            });
          }
          return dateFormatter.format(date);
        } else {
          // IE < 11, Safari <= 9.0.
          // In English, this generates the string most similar to
          // the toLocaleDateString() result above.
          return date.toDateString() + ' ' + date.toLocaleTimeString();
        }
      }

    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike_1(collection)) {
          var iteratee = _baseIteratee(predicate);
          collection = keys_1(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    var _createFind = createFind;

    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    var _baseFindIndex = baseFindIndex;

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol_1(value)) {
        return NAN;
      }
      if (isObject_1(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject_1(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var toNumber_1 = toNumber;

    /** Used as references for various `Number` constants. */
    var INFINITY$2 = 1 / 0,
        MAX_INTEGER = 1.7976931348623157e+308;

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber_1(value);
      if (value === INFINITY$2 || value === -INFINITY$2) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    var toFinite_1 = toFinite;

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite_1(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    var toInteger_1 = toInteger;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return _baseFindIndex(array, _baseIteratee(predicate), index);
    }

    var findIndex_1 = findIndex;

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = _createFind(findIndex_1);

    var find_1 = find;

    var SNTag = /** @class */ (function (_super) {
        __extends(SNTag, _super);
        function SNTag(json_obj) {
            var _this = _super.call(this, json_obj) || this;
            if (!_this.content_type) {
                _this.content_type = 'Tag';
            }
            if (!_this.notes) {
                _this.notes = [];
            }
            return _this;
        }
        SNTag.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.title = content.title;
        };
        SNTag.prototype.structureParams = function () {
            var params = {
                title: this.title
            };
            var superParams = _super.prototype.structureParams.call(this);
            Object.assign(superParams, params);
            return superParams;
        };
        SNTag.prototype.addItemAsRelationship = function (item) {
            if (item.content_type == 'Note') {
                if (!find_1(this.notes, { uuid: item.uuid })) {
                    this.notes.push(item);
                    item.tags.push(this);
                }
            }
            _super.prototype.addItemAsRelationship.call(this, item);
        };
        SNTag.prototype.removeItemAsRelationship = function (item) {
            if (item.content_type == 'Note') {
                remove_1(this.notes, { uuid: item.uuid });
                remove_1(item.tags, { uuid: this.uuid });
            }
            _super.prototype.removeItemAsRelationship.call(this, item);
        };
        SNTag.prototype.updateLocalRelationships = function () {
            var _this = this;
            var references = this.content.references;
            var uuids = references.map(function (ref) {
                return ref.uuid;
            });
            this.notes.slice().forEach(function (note) {
                if (!uuids.includes(note.uuid)) {
                    remove_1(note.tags, { uuid: _this.uuid });
                    remove_1(_this.notes, { uuid: note.uuid });
                    note.setIsNoLongerBeingReferencedBy(_this);
                }
            });
        };
        SNTag.prototype.isBeingRemovedLocally = function () {
            var _this = this;
            this.notes.forEach(function (note) {
                remove_1(note.tags, { uuid: _this.uuid });
                note.setIsNoLongerBeingReferencedBy(_this);
            });
            this.notes.length = 0;
            _super.prototype.isBeingRemovedLocally.call(this);
        };
        SNTag.prototype.informReferencesOfUUIDChange = function (oldUUID, newUUID) {
            for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
                var note = _a[_i];
                remove_1(note.tags, { uuid: oldUUID });
                note.tags.push(this);
            }
        };
        SNTag.prototype.didFinishSyncing = function () {
            for (var _i = 0, _a = this.notes; _i < _a.length; _i++) {
                var note = _a[_i];
                note.tagDidFinishSyncing(this);
            }
        };
        SNTag.prototype.isSmartTag = function () {
            return this.content_type == 'SN|SmartTag';
        };
        Object.defineProperty(SNTag.prototype, "displayName", {
            get: function () {
                return 'Tag';
            },
            enumerable: true,
            configurable: true
        });
        SNTag.arrayToDisplayString = function (tags) {
            return tags
                .sort(function (a, b) {
                return a.title > b.title;
            })
                .map(function (tag, i) {
                return '#' + tag.title;
            })
                .join(' ');
        };
        return SNTag;
    }(SFItem$1));

    var SNNote = /** @class */ (function (_super) {
        __extends(SNNote, _super);
        function SNNote(json_obj) {
            var _this = _super.call(this, json_obj) || this;
            if (!_this.text) {
                // Some external editors can't handle a null value for text.
                // Notes created on mobile with no text have a null value for it,
                // so we'll just set a default here.
                _this.text = '';
            }
            if (!_this.tags) {
                _this.tags = [];
            }
            return _this;
        }
        SNNote.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.title = content.title;
            this.text = content.text;
        };
        SNNote.prototype.structureParams = function () {
            var params = {
                title: this.title,
                text: this.text
            };
            var superParams = _super.prototype.structureParams.call(this);
            Object.assign(superParams, params);
            return superParams;
        };
        SNNote.prototype.addItemAsRelationship = function (item) {
            /*
            Legacy.
            Previously, note/tag relationships were bidirectional, however in some cases there
            may be broken links such that a note has references to a tag and not vice versa.
            Now, only tags contain references to notes. For old notes that may have references to tags,
            we want to transfer them over to the tag.
             */
            if (item.content_type == 'Tag') {
                item.addItemAsRelationship(this);
            }
            _super.prototype.addItemAsRelationship.call(this, item);
        };
        SNNote.prototype.setIsBeingReferencedBy = function (item) {
            _super.prototype.setIsBeingReferencedBy.call(this, item);
            this.clearSavedTagsString();
        };
        SNNote.prototype.setIsNoLongerBeingReferencedBy = function (item) {
            _super.prototype.setIsNoLongerBeingReferencedBy.call(this, item);
            this.clearSavedTagsString();
        };
        SNNote.prototype.isBeingRemovedLocally = function () {
            var _this = this;
            this.tags.forEach(function (tag) {
                remove_1(tag.notes, { uuid: _this.uuid });
            });
            _super.prototype.isBeingRemovedLocally.call(this);
        };
        SNNote.filterDummyNotes = function (notes) {
            var filtered = notes.filter(function (note) {
                return note.dummy == false || note.dummy == null;
            });
            return filtered;
        };
        SNNote.prototype.informReferencesOfUUIDChange = function (oldUUID, newUUID) {
            _super.prototype.informReferencesOfUUIDChange.call(this);
            for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                remove_1(tag.notes, { uuid: oldUUID });
                tag.notes.push(this);
            }
        };
        SNNote.prototype.tagDidFinishSyncing = function (tag) {
            this.clearSavedTagsString();
        };
        SNNote.prototype.safeText = function () {
            return this.text || '';
        };
        SNNote.prototype.safeTitle = function () {
            return this.title || '';
        };
        Object.defineProperty(SNNote.prototype, "content_type", {
            get: function () {
                return 'Note';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SNNote.prototype, "displayName", {
            get: function () {
                return 'Note';
            },
            enumerable: true,
            configurable: true
        });
        SNNote.prototype.clearSavedTagsString = function () {
            this.savedTagsString = null;
        };
        SNNote.prototype.tagsString = function () {
            this.savedTagsString = SNTag.arrayToDisplayString(this.tags);
            return this.savedTagsString;
        };
        return SNNote;
    }(SFItem$1));

    class SFPredicate$1 {


      constructor(keypath, operator, value) {
        this.keypath = keypath;
        this.operator = operator;
        this.value = value;

        // Preprocessing to make predicate evaluation faster.
        // Won't recurse forever, but with arbitrarily large input could get stuck. Hope there are input size limits
        // somewhere else.
        if(SFPredicate$1.IsRecursiveOperator(this.operator)) {
          this.value = this.value.map(SFPredicate$1.fromArray);
        }
      }

      static fromArray(array) {
        return new SFPredicate$1(array[0],array[1],array[2]);
      }

      static ObjectSatisfiesPredicate(object, predicate) {
        // Predicates may not always be created using the official constructor
        // so if it's still an array here, convert to object
        if(Array.isArray(predicate)) {
          predicate = this.fromArray(predicate);
        }

        if(SFPredicate$1.IsRecursiveOperator(predicate.operator)) {
          if(predicate.operator === "and") {
            for(var subPredicate of predicate.value) {
              if (!this.ObjectSatisfiesPredicate(object, subPredicate)) {
                return false;
              }
            }
            return true;
          }
          if(predicate.operator === "or") {
            for(var subPredicate of predicate.value) {
              if (this.ObjectSatisfiesPredicate(object, subPredicate)) {
                return true;
              }
            }
            return false;
          }
        }

        var predicateValue = predicate.value;
        if(typeof(predicateValue) == 'string' && predicateValue.includes(".ago")) {
          predicateValue = this.DateFromString(predicateValue);
        }

        var valueAtKeyPath = predicate.keypath.split('.').reduce((previous, current) => {
          return previous && previous[current]
        }, object);

        const falseyValues = [false, "", null, undefined, NaN];

        // If the value at keyPath is undefined, either because the property is nonexistent or the value is null.
        if(valueAtKeyPath == undefined) {
          if(predicate.operator == "!=") {
            return !falseyValues.includes(predicate.value);
          } else {
            return falseyValues.includes(predicate.value);
          }
        }

        if(predicate.operator == "=") {
          // Use array comparison
          if(Array.isArray(valueAtKeyPath)) {
            return JSON.stringify(valueAtKeyPath) == JSON.stringify(predicateValue);
          } else {
            return valueAtKeyPath == predicateValue;
          }
        } else if(predicate.operator == "!=") {
          // Use array comparison
          if(Array.isArray(valueAtKeyPath)) {
            return JSON.stringify(valueAtKeyPath) != JSON.stringify(predicateValue);
          } else {
            return valueAtKeyPath !== predicateValue;
          }
        } else if(predicate.operator == "<")  {
          return valueAtKeyPath < predicateValue;
        } else if(predicate.operator == ">")  {
          return valueAtKeyPath > predicateValue;
        } else if(predicate.operator == "<=")  {
          return valueAtKeyPath <= predicateValue;
        } else if(predicate.operator == ">=")  {
          return valueAtKeyPath >= predicateValue;
        } else if(predicate.operator == "startsWith")  {
          return valueAtKeyPath.startsWith(predicateValue);
        } else if(predicate.operator == "in") {
          return predicateValue.indexOf(valueAtKeyPath) != -1;
        } else if(predicate.operator == "includes") {
          return this.resolveIncludesPredicate(valueAtKeyPath, predicateValue);
        } else if(predicate.operator == "matches") {
          var regex = new RegExp(predicateValue);
          return regex.test(valueAtKeyPath);
        }

        return false;
      }

      static resolveIncludesPredicate(valueAtKeyPath, predicateValue) {
        // includes can be a string  or a predicate (in array form)
        if(typeof(predicateValue) == 'string') {
          // if string, simply check if the valueAtKeyPath includes the predicate value
          return valueAtKeyPath.includes(predicateValue);
        } else {
          // is a predicate array or predicate object
          var innerPredicate;
          if(Array.isArray(predicateValue)) {
            innerPredicate = SFPredicate$1.fromArray(predicateValue);
          } else {
            innerPredicate = predicateValue;
          }
          for(var obj of valueAtKeyPath) {
            if(this.ObjectSatisfiesPredicate(obj, innerPredicate)) {
              return true;
            }
          }
          return false;
        }
      }

      static ItemSatisfiesPredicate(item, predicate) {
        if(Array.isArray(predicate)) {
          predicate = SFPredicate$1.fromArray(predicate);
        }
        return this.ObjectSatisfiesPredicate(item, predicate);
      }

      static ItemSatisfiesPredicates(item, predicates) {
        for(var predicate of predicates) {
          if(!this.ItemSatisfiesPredicate(item, predicate)) {
            return false;
          }
        }
        return true;
      }

      static DateFromString(string) {
        // x.days.ago, x.hours.ago
        var comps = string.split(".");
        var unit = comps[1];
        var date = new Date;
        var offset = parseInt(comps[0]);
        if(unit == "days") {
          date.setDate(date.getDate() - offset);
        } else if(unit == "hours") {
          date.setHours(date.getHours() - offset);
        }
        return date;
      }

      static IsRecursiveOperator(operator) {
        return ["and", "or"].includes(operator);
      }
    }

    var SNSmartTag = /** @class */ (function (_super) {
        __extends(SNSmartTag, _super);
        function SNSmartTag(json_ob) {
            var _this = _super.call(this, json_ob) || this;
            _this.content_type = 'SN|SmartTag';
            return _this;
        }
        SNSmartTag.systemSmartTags = function () {
            return [
                new SNSmartTag({
                    uuid: SNSmartTag.SystemSmartTagIdAllNotes,
                    dummy: true,
                    content: {
                        title: 'All notes',
                        isSystemTag: true,
                        isAllTag: true,
                        predicate: new SFPredicate$1.fromArray(['content_type', '=', 'Note'])
                    }
                }),
                new SNSmartTag({
                    uuid: SNSmartTag.SystemSmartTagIdArchivedNotes,
                    dummy: true,
                    content: {
                        title: 'Archived',
                        isSystemTag: true,
                        isArchiveTag: true,
                        predicate: new SFPredicate$1.fromArray(['archived', '=', true])
                    }
                }),
                new SNSmartTag({
                    uuid: SNSmartTag.SystemSmartTagIdTrashedNotes,
                    dummy: true,
                    content: {
                        title: 'Trash',
                        isSystemTag: true,
                        isTrashTag: true,
                        predicate: new SFPredicate$1.fromArray(['content.trashed', '=', true])
                    }
                })
            ];
        };
        SNSmartTag.SystemSmartTagIdAllNotes = 'all-notes';
        SNSmartTag.SystemSmartTagIdArchivedNotes = 'archived-notes';
        SNSmartTag.SystemSmartTagIdTrashedNotes = 'trashed-notes';
        return SNSmartTag;
    }(SNTag));

    var SNMfa = /** @class */ (function (_super) {
        __extends(SNMfa, _super);
        function SNMfa(json_obj) {
            return _super.call(this, json_obj) || this;
        }
        Object.defineProperty(SNMfa.prototype, "content_type", {
            get: function () {
                return 'SF|MFA';
            },
            enumerable: true,
            configurable: true
        });
        SNMfa.prototype.doNotEncrypt = function () {
            return true;
        };
        return SNMfa;
    }(SFItem$1));

    var SNServerExtension = /** @class */ (function (_super) {
        __extends(SNServerExtension, _super);
        function SNServerExtension() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SNServerExtension.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.url = content.url;
        };
        Object.defineProperty(SNServerExtension.prototype, "content_type", {
            get: function () {
                return 'SF|Extension';
            },
            enumerable: true,
            configurable: true
        });
        SNServerExtension.prototype.doNotEncrypt = function () {
            return true;
        };
        return SNServerExtension;
    }(SFItem$1));

    var SNComponent = /** @class */ (function (_super) {
        __extends(SNComponent, _super);
        function SNComponent(json_obj) {
            var _this = this;
            // If making a copy of an existing component (usually during sign in if you have a component active in the session),
            // which may have window set, you may get a cross-origin exception since you'll be trying to copy the window. So we clear it here.
            json_obj.window = null;
            _this = _super.call(this, json_obj) || this;
            if (!_this.componentData) {
                _this.componentData = {};
            }
            if (!_this.disassociatedItemIds) {
                _this.disassociatedItemIds = [];
            }
            if (!_this.associatedItemIds) {
                _this.associatedItemIds = [];
            }
            return _this;
        }
        SNComponent.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            /* Legacy */
            // We don't want to set the url directly, as we'd like to phase it out.
            // If the content.url exists, we'll transfer it to legacy_url
            // We'll only need to set this if content.hosted_url is blank, otherwise, hosted_url is the url replacement.
            if (!content.hosted_url) {
                this.legacy_url = content.url;
            }
            /* New */
            this.local_url = content.local_url;
            this.hosted_url = content.hosted_url || content.url;
            this.offlineOnly = content.offlineOnly;
            if (content.valid_until) {
                this.valid_until = new Date(content.valid_until);
            }
            this.name = content.name;
            this.autoupdateDisabled = content.autoupdateDisabled;
            this.package_info = content.package_info;
            // the location in the view this component is located in. Valid values are currently tags-list, note-tags, and editor-stack`
            this.area = content.area;
            this.permissions = content.permissions;
            if (!this.permissions) {
                this.permissions = [];
            }
            this.active = content.active;
            // custom data that a component can store in itself
            this.componentData = content.componentData || {};
            // items that have requested a component to be disabled in its context
            this.disassociatedItemIds = content.disassociatedItemIds || [];
            // items that have requested a component to be enabled in its context
            this.associatedItemIds = content.associatedItemIds || [];
        };
        SNComponent.prototype.handleDeletedContent = function () {
            _super.prototype.handleDeletedContent.call(this);
            this.active = false;
        };
        SNComponent.prototype.structureParams = function () {
            var params = {
                legacy_url: this.legacy_url,
                hosted_url: this.hosted_url,
                local_url: this.local_url,
                valid_until: this.valid_until,
                offlineOnly: this.offlineOnly,
                name: this.name,
                area: this.area,
                package_info: this.package_info,
                permissions: this.permissions,
                active: this.active,
                autoupdateDisabled: this.autoupdateDisabled,
                componentData: this.componentData,
                disassociatedItemIds: this.disassociatedItemIds,
                associatedItemIds: this.associatedItemIds
            };
            var superParams = _super.prototype.structureParams.call(this);
            Object.assign(superParams, params);
            return superParams;
        };
        Object.defineProperty(SNComponent.prototype, "content_type", {
            get: function () {
                return 'SN|Component';
            },
            enumerable: true,
            configurable: true
        });
        SNComponent.prototype.isEditor = function () {
            return this.area == 'editor-editor';
        };
        SNComponent.prototype.isTheme = function () {
            return this.content_type == 'SN|Theme' || this.area == 'themes';
        };
        SNComponent.prototype.isDefaultEditor = function () {
            return this.getAppDataItem('defaultEditor') == true;
        };
        SNComponent.prototype.getAppDataItem = function (arg0) {
            throw new Error('Method not implemented.');
        };
        SNComponent.prototype.setLastSize = function (size) {
            this.setAppDataItem('lastSize', size);
        };
        SNComponent.prototype.setAppDataItem = function (arg0, size) {
            throw new Error('Method not implemented.');
        };
        SNComponent.prototype.getLastSize = function () {
            return this.getAppDataItem('lastSize');
        };
        SNComponent.prototype.acceptsThemes = function () {
            if (this.content.package_info &&
                'acceptsThemes' in this.content.package_info) {
                return this.content.package_info.acceptsThemes;
            }
            return true;
        };
        /*
          The key used to look up data that this component may have saved to an item.
          This key will be look up on the item, and not on itself.
         */
        SNComponent.prototype.getClientDataKey = function () {
            if (this.legacy_url) {
                return this.legacy_url;
            }
            else {
                return this.uuid;
            }
        };
        SNComponent.prototype.hasValidHostedUrl = function () {
            return this.hosted_url || this.legacy_url;
        };
        SNComponent.prototype.keysToIgnoreWhenCheckingContentEquality = function () {
            return ['active', 'disassociatedItemIds', 'associatedItemIds'].concat(_super.prototype.keysToIgnoreWhenCheckingContentEquality.call(this));
        };
        /*
          An associative component depends on being explicitly activated for a given item, compared to a dissaciative component,
          which is enabled by default in areas unrelated to a certain item.
         */
        SNComponent.associativeAreas = function () {
            return ['editor-editor'];
        };
        SNComponent.prototype.isAssociative = function () {
            return SNComponent.associativeAreas().includes(this.area);
        };
        SNComponent.prototype.associateWithItem = function (item) {
            this.associatedItemIds.push(item.uuid);
        };
        SNComponent.prototype.isExplicitlyEnabledForItem = function (item) {
            return this.associatedItemIds.indexOf(item.uuid) !== -1;
        };
        SNComponent.prototype.isExplicitlyDisabledForItem = function (item) {
            return this.disassociatedItemIds.indexOf(item.uuid) !== -1;
        };
        return SNComponent;
    }(SFItem$1));

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    var _createBaseFor = createBaseFor;

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = _createBaseFor();

    var _baseFor = baseFor;

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && _baseFor(object, iteratee, keys_1);
    }

    var _baseForOwn = baseForOwn;

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike_1(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    var _createBaseEach = createBaseEach;

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = _createBaseEach(_baseForOwn);

    var _baseEach = baseEach;

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike_1(collection) ? Array(collection.length) : [];

      _baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    var _baseMap = baseMap;

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray_1(collection) ? _arrayMap : _baseMap;
      return func(collection, _baseIteratee(iteratee));
    }

    var map_1 = map;

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    var _apply = apply;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax$1 = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax$1(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return _apply(func, this, otherArgs);
      };
    }

    var _overRest = overRest;

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    var constant_1 = constant;

    var defineProperty = (function() {
      try {
        var func = _getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var _defineProperty = defineProperty;

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
      return _defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant_1(string),
        'writable': true
      });
    };

    var _baseSetToString = baseSetToString;

    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    var _shortOut = shortOut;

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = _shortOut(_baseSetToString);

    var _setToString = setToString;

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return _setToString(_overRest(func, start, identity_1), func + '');
    }

    var _baseRest = baseRest;

    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    var _baseIsNaN = baseIsNaN;

    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    var _strictIndexOf = strictIndexOf;

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      return value === value
        ? _strictIndexOf(array, value, fromIndex)
        : _baseFindIndex(array, _baseIsNaN, fromIndex);
    }

    var _baseIndexOf = baseIndexOf;

    /**
     * This function is like `baseIndexOf` except that it accepts a comparator.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    var _baseIndexOfWith = baseIndexOfWith;

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    var _copyArray = copyArray;

    /** Used for built-in method references. */
    var arrayProto$2 = Array.prototype;

    /** Built-in value references. */
    var splice$2 = arrayProto$2.splice;

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? _baseIndexOfWith : _baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = _copyArray(values);
      }
      if (iteratee) {
        seen = _arrayMap(array, _baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice$2.call(seen, fromIndex, 1);
          }
          splice$2.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    var _basePullAll = basePullAll;

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? _basePullAll(array, values)
        : array;
    }

    var pullAll_1 = pullAll;

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = _baseRest(pullAll_1);

    var pull_1 = pull;

    var SNEditor = /** @class */ (function (_super) {
        __extends(SNEditor, _super);
        function SNEditor(json_obj) {
            var _this = _super.call(this, json_obj) || this;
            if (!_this.notes) {
                _this.notes = [];
            }
            if (!_this.data) {
                _this.data = {};
            }
            return _this;
        }
        SNEditor.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.url = content.url;
            this.name = content.name;
            this.data = content.data || {};
            this.default = content.default;
            this.systemEditor = content.systemEditor;
        };
        SNEditor.prototype.structureParams = function () {
            var params = {
                url: this.url,
                name: this.name,
                data: this.data,
                default: this.default,
                systemEditor: this.systemEditor
            };
            var superParams = _super.prototype.structureParams.call(this);
            Object.assign(superParams, params);
            return superParams;
        };
        SNEditor.prototype.referenceParams = function () {
            var references = map_1(this.notes, function (note) {
                return { uuid: note.uuid, content_type: note.content_type };
            });
            return references;
        };
        SNEditor.prototype.addItemAsRelationship = function (item) {
            if (item.content_type == 'Note') {
                if (!find_1(this.notes, item)) {
                    this.notes.push(item);
                }
            }
            _super.prototype.addItemAsRelationship.call(this, item);
        };
        SNEditor.prototype.removeItemAsRelationship = function (item) {
            if (item.content_type == 'Note') {
                pull_1(this.notes, item);
            }
            _super.prototype.removeItemAsRelationship.call(this, item);
        };
        SNEditor.prototype.removeAndDirtyAllRelationships = function () {
            _super.prototype.removeAndDirtyAllRelationships.call(this);
            this.notes = [];
        };
        SNEditor.prototype.removeReferencesNotPresentIn = function (references) {
            var _this = this;
            _super.prototype.removeReferencesNotPresentIn.call(this, references);
            var uuids = references.map(function (ref) {
                return ref.uuid;
            });
            this.notes.forEach(function (note) {
                if (!uuids.includes(note.uuid)) {
                    remove_1(_this.notes, { uuid: note.uuid });
                }
            });
        };
        SNEditor.prototype.potentialItemOfInterestHasChangedItsUUID = function (newItem, oldUUID, newUUID) {
            if (newItem.content_type === 'Note' &&
                find_1(this.notes, { uuid: oldUUID })) {
                remove_1(this.notes, { uuid: oldUUID });
                this.notes.push(newItem);
            }
        };
        Object.defineProperty(SNEditor.prototype, "content_type", {
            get: function () {
                return 'SN|Editor';
            },
            enumerable: true,
            configurable: true
        });
        SNEditor.prototype.setData = function (key, value) {
            var dataHasChanged = JSON.stringify(this.data[key]) !== JSON.stringify(value);
            if (dataHasChanged) {
                this.data[key] = value;
                return true;
            }
            return false;
        };
        SNEditor.prototype.dataForKey = function (key) {
            return this.data[key] || {};
        };
        return SNEditor;
    }(SFItem$1));

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && _defineProperty) {
        _defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    var _baseAssignValue = baseAssignValue;

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq_1(object[key], value)) ||
          (value === undefined && !(key in object))) {
        _baseAssignValue(object, key, value);
      }
    }

    var _assignMergeValue = assignMergeValue;

    var _cloneBuffer = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
    });

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
      return result;
    }

    var _cloneArrayBuffer = cloneArrayBuffer;

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    var _cloneTypedArray = cloneTypedArray;

    /** Built-in value references. */
    var objectCreate = Object.create;

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject_1(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    var _baseCreate = baseCreate;

    /** Built-in value references. */
    var getPrototype = _overArg(Object.getPrototypeOf, Object);

    var _getPrototype = getPrototype;

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !_isPrototype(object))
        ? _baseCreate(_getPrototype(object))
        : {};
    }

    var _initCloneObject = initCloneObject;

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike_1(value) && isArrayLike_1(value);
    }

    var isArrayLikeObject_1 = isArrayLikeObject;

    /** `Object#toString` result references. */
    var objectTag$3 = '[object Object]';

    /** Used for built-in method references. */
    var funcProto$2 = Function.prototype,
        objectProto$c = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$2 = funcProto$2.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString$2.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$3) {
        return false;
      }
      var proto = _getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$9.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString$2.call(Ctor) == objectCtorString;
    }

    var isPlainObject_1 = isPlainObject;

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    var _safeGet = safeGet;

    /** Used for built-in method references. */
    var objectProto$d = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$a = objectProto$d.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$a.call(object, key) && eq_1(objValue, value)) ||
          (value === undefined && !(key in object))) {
        _baseAssignValue(object, key, value);
      }
    }

    var _assignValue = assignValue;

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          _baseAssignValue(object, key, newValue);
        } else {
          _assignValue(object, key, newValue);
        }
      }
      return object;
    }

    var _copyObject = copyObject;

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    var _nativeKeysIn = nativeKeysIn;

    /** Used for built-in method references. */
    var objectProto$e = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$b = objectProto$e.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject_1(object)) {
        return _nativeKeysIn(object);
      }
      var isProto = _isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$b.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeysIn = baseKeysIn;

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn$1(object) {
      return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
    }

    var keysIn_1 = keysIn$1;

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return _copyObject(value, keysIn_1(value));
    }

    var toPlainObject_1 = toPlainObject;

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = _safeGet(object, key),
          srcValue = _safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        _assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray_1(srcValue),
            isBuff = !isArr && isBuffer_1(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray_1(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject_1(objValue)) {
            newValue = _copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = _cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = _cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
          newValue = objValue;
          if (isArguments_1(objValue)) {
            newValue = toPlainObject_1(objValue);
          }
          else if (!isObject_1(objValue) || isFunction_1(objValue)) {
            newValue = _initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      _assignMergeValue(object, key, newValue);
    }

    var _baseMergeDeep = baseMergeDeep;

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      _baseFor(source, function(srcValue, key) {
        stack || (stack = new _Stack);
        if (isObject_1(srcValue)) {
          _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          _assignMergeValue(object, key, newValue);
        }
      }, keysIn_1);
    }

    var _baseMerge = baseMerge;

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject_1(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike_1(object) && _isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq_1(object[index], value);
      }
      return false;
    }

    var _isIterateeCall = isIterateeCall;

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return _baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    var _createAssigner = createAssigner;

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = _createAssigner(function(object, source, srcIndex) {
      _baseMerge(object, source, srcIndex);
    });

    var merge_1 = merge;

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    var _arrayEach = arrayEach;

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && _copyObject(source, keys_1(source), object);
    }

    var _baseAssign = baseAssign;

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && _copyObject(source, keysIn_1(source), object);
    }

    var _baseAssignIn = baseAssignIn;

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return _copyObject(source, _getSymbols(source), object);
    }

    var _copySymbols = copySymbols;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
      var result = [];
      while (object) {
        _arrayPush(result, _getSymbols(object));
        object = _getPrototype(object);
      }
      return result;
    };

    var _getSymbolsIn = getSymbolsIn;

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return _copyObject(source, _getSymbolsIn(source), object);
    }

    var _copySymbolsIn = copySymbolsIn;

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
    }

    var _getAllKeysIn = getAllKeysIn;

    /** Used for built-in method references. */
    var objectProto$f = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$c = objectProto$f.hasOwnProperty;

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty$c.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    var _initCloneArray = initCloneArray;

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    var _cloneDataView = cloneDataView;

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    var _cloneRegExp = cloneRegExp;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
        symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
    }

    var _cloneSymbol = cloneSymbol;

    /** `Object#toString` result references. */
    var boolTag$2 = '[object Boolean]',
        dateTag$2 = '[object Date]',
        mapTag$3 = '[object Map]',
        numberTag$2 = '[object Number]',
        regexpTag$2 = '[object RegExp]',
        setTag$3 = '[object Set]',
        stringTag$2 = '[object String]',
        symbolTag$2 = '[object Symbol]';

    var arrayBufferTag$2 = '[object ArrayBuffer]',
        dataViewTag$3 = '[object DataView]',
        float32Tag$1 = '[object Float32Array]',
        float64Tag$1 = '[object Float64Array]',
        int8Tag$1 = '[object Int8Array]',
        int16Tag$1 = '[object Int16Array]',
        int32Tag$1 = '[object Int32Array]',
        uint8Tag$1 = '[object Uint8Array]',
        uint8ClampedTag$1 = '[object Uint8ClampedArray]',
        uint16Tag$1 = '[object Uint16Array]',
        uint32Tag$1 = '[object Uint32Array]';

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag$2:
          return _cloneArrayBuffer(object);

        case boolTag$2:
        case dateTag$2:
          return new Ctor(+object);

        case dataViewTag$3:
          return _cloneDataView(object, isDeep);

        case float32Tag$1: case float64Tag$1:
        case int8Tag$1: case int16Tag$1: case int32Tag$1:
        case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
          return _cloneTypedArray(object, isDeep);

        case mapTag$3:
          return new Ctor;

        case numberTag$2:
        case stringTag$2:
          return new Ctor(object);

        case regexpTag$2:
          return _cloneRegExp(object);

        case setTag$3:
          return new Ctor;

        case symbolTag$2:
          return _cloneSymbol(object);
      }
    }

    var _initCloneByTag = initCloneByTag;

    /** `Object#toString` result references. */
    var mapTag$4 = '[object Map]';

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike_1(value) && _getTag(value) == mapTag$4;
    }

    var _baseIsMap = baseIsMap;

    /* Node.js helper references. */
    var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

    var isMap_1 = isMap;

    /** `Object#toString` result references. */
    var setTag$4 = '[object Set]';

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike_1(value) && _getTag(value) == setTag$4;
    }

    var _baseIsSet = baseIsSet;

    /* Node.js helper references. */
    var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

    var isSet_1 = isSet;

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG = 4;

    /** `Object#toString` result references. */
    var argsTag$3 = '[object Arguments]',
        arrayTag$2 = '[object Array]',
        boolTag$3 = '[object Boolean]',
        dateTag$3 = '[object Date]',
        errorTag$2 = '[object Error]',
        funcTag$2 = '[object Function]',
        genTag$1 = '[object GeneratorFunction]',
        mapTag$5 = '[object Map]',
        numberTag$3 = '[object Number]',
        objectTag$4 = '[object Object]',
        regexpTag$3 = '[object RegExp]',
        setTag$5 = '[object Set]',
        stringTag$3 = '[object String]',
        symbolTag$3 = '[object Symbol]',
        weakMapTag$2 = '[object WeakMap]';

    var arrayBufferTag$3 = '[object ArrayBuffer]',
        dataViewTag$4 = '[object DataView]',
        float32Tag$2 = '[object Float32Array]',
        float64Tag$2 = '[object Float64Array]',
        int8Tag$2 = '[object Int8Array]',
        int16Tag$2 = '[object Int16Array]',
        int32Tag$2 = '[object Int32Array]',
        uint8Tag$2 = '[object Uint8Array]',
        uint8ClampedTag$2 = '[object Uint8ClampedArray]',
        uint16Tag$2 = '[object Uint16Array]',
        uint32Tag$2 = '[object Uint32Array]';

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
    cloneableTags[arrayBufferTag$3] = cloneableTags[dataViewTag$4] =
    cloneableTags[boolTag$3] = cloneableTags[dateTag$3] =
    cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
    cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
    cloneableTags[int32Tag$2] = cloneableTags[mapTag$5] =
    cloneableTags[numberTag$3] = cloneableTags[objectTag$4] =
    cloneableTags[regexpTag$3] = cloneableTags[setTag$5] =
    cloneableTags[stringTag$3] = cloneableTags[symbolTag$3] =
    cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
    cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
    cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
    cloneableTags[weakMapTag$2] = false;

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject_1(value)) {
        return value;
      }
      var isArr = isArray_1(value);
      if (isArr) {
        result = _initCloneArray(value);
        if (!isDeep) {
          return _copyArray(value, result);
        }
      } else {
        var tag = _getTag(value),
            isFunc = tag == funcTag$2 || tag == genTag$1;

        if (isBuffer_1(value)) {
          return _cloneBuffer(value, isDeep);
        }
        if (tag == objectTag$4 || tag == argsTag$3 || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : _initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? _copySymbolsIn(value, _baseAssignIn(result, value))
              : _copySymbols(value, _baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = _initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new _Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet_1(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap_1(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? _getAllKeysIn : _getAllKeys)
        : (isFlat ? keysIn : keys_1);

      var props = isArr ? undefined : keysFunc(value);
      _arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    var _baseClone = baseClone;

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject_1(value) ? undefined : value;
    }

    var _customOmitClone = customOmitClone;

    /** Built-in value references. */
    var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray_1(value) || isArguments_1(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    var _isFlattenable = isFlattenable;

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = _isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            _arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    var _baseFlatten = baseFlatten;

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? _baseFlatten(array, 1) : [];
    }

    var flatten_1 = flatten;

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return _setToString(_overRest(func, undefined, flatten_1), func + '');
    }

    var _flatRest = flatRest;

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG$1 = 1,
        CLONE_FLAT_FLAG$1 = 2,
        CLONE_SYMBOLS_FLAG$1 = 4;

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = _flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = _arrayMap(paths, function(path) {
        path = _castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      _copyObject(object, _getAllKeysIn(object), result);
      if (isDeep) {
        result = _baseClone(result, CLONE_DEEP_FLAG$1 | CLONE_FLAT_FLAG$1 | CLONE_SYMBOLS_FLAG$1, _customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        _baseUnset(result, paths[length]);
      }
      return result;
    });

    var omit_1 = omit;

    var Action = /** @class */ (function () {
        function Action(json) {
            merge_1(this, json);
            this.running = false; // in case running=true was synced with server since model is uploaded nondiscriminatory
            this.error = false;
            if (this.lastExecuted) {
                // is string
                this.lastExecuted = new Date(this.lastExecuted);
            }
        }
        return Action;
    }());
    var SNExtension = /** @class */ (function (_super) {
        __extends(SNExtension, _super);
        function SNExtension(json) {
            var _this = _super.call(this, json) || this;
            if (json.actions) {
                _this.actions = json.actions.map(function (action) {
                    return new Action(action);
                });
            }
            if (!_this.actions) {
                _this.actions = [];
            }
            return _this;
        }
        SNExtension.prototype.actionsWithContextForItem = function (item) {
            return this.actions.filter(function (action) {
                return action.context == item.content_type || action.context == 'Item';
            });
        };
        SNExtension.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.description = content.description;
            this.url = content.url;
            this.name = content.name;
            this.package_info = content.package_info;
            this.supported_types = content.supported_types;
            if (content.actions) {
                this.actions = content.actions.map(function (action) {
                    return new Action(action);
                });
            }
        };
        Object.defineProperty(SNExtension.prototype, "content_type", {
            get: function () {
                return 'Extension';
            },
            enumerable: true,
            configurable: true
        });
        SNExtension.prototype.structureParams = function () {
            var params = {
                name: this.name,
                url: this.url,
                package_info: this.package_info,
                description: this.description,
                actions: this.actions.map(function (a) {
                    return omit_1(a, ['subrows', 'subactions']);
                }),
                supported_types: this.supported_types
            };
            var superParams = _super.prototype.structureParams.call(this);
            Object.assign(superParams, params);
            return superParams;
        };
        return SNExtension;
    }(SFItem$1));

    var SNTheme = /** @class */ (function (_super) {
        __extends(SNTheme, _super);
        function SNTheme(json_obj) {
            var _this = _super.call(this, json_obj) || this;
            _this.area = 'themes';
            return _this;
        }
        SNTheme.prototype.isLayerable = function () {
            return this.package_info && this.package_info.layerable;
        };
        Object.defineProperty(SNTheme.prototype, "content_type", {
            get: function () {
                return 'SN|Theme';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SNTheme.prototype, "displayName", {
            get: function () {
                return 'Theme';
            },
            enumerable: true,
            configurable: true
        });
        SNTheme.prototype.setMobileRules = function (rules) {
            this.setAppDataItem('mobileRules', rules);
        };
        SNTheme.prototype.getMobileRules = function () {
            return this.getAppDataItem('mobileRules') || { constants: {}, rules: {} };
        };
        // Same as getMobileRules but without default value
        SNTheme.prototype.hasMobileRules = function () {
            return this.getAppDataItem('mobileRules');
        };
        SNTheme.prototype.setNotAvailOnMobile = function (na) {
            this.setAppDataItem('notAvailableOnMobile', na);
        };
        SNTheme.prototype.getNotAvailOnMobile = function () {
            return this.getAppDataItem('notAvailableOnMobile');
        };
        /* We must not use .active because if you set that to true, it will also activate that theme on desktop/web */
        SNTheme.prototype.setMobileActive = function (active) {
            this.setAppDataItem('mobileActive', active);
        };
        SNTheme.prototype.isMobileActive = function () {
            return this.getAppDataItem('mobileActive');
        };
        return SNTheme;
    }(SNComponent));

    var SNEncryptedStorage = /** @class */ (function (_super) {
        __extends(SNEncryptedStorage, _super);
        function SNEncryptedStorage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SNEncryptedStorage.prototype.mapContentToLocalProperties = function (content) {
            _super.prototype.mapContentToLocalProperties.call(this, content);
            this.storage = content.storage;
        };
        Object.defineProperty(SNEncryptedStorage.prototype, "content_type", {
            get: function () {
                return 'SN|EncryptedStorage';
            },
            enumerable: true,
            configurable: true
        });
        return SNEncryptedStorage;
    }(SFItem$1));

    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && _baseIndexOf(array, value, 0) > -1;
    }

    var _arrayIncludes = arrayIncludes;

    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }

    var _arrayIncludesWith = arrayIncludesWith;

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    var noop_1 = noop;

    /** Used as references for various `Number` constants. */
    var INFINITY$3 = 1 / 0;

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$3) ? noop_1 : function(values) {
      return new _Set(values);
    };

    var _createSet = createSet;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE$1 = 200;

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = _arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = _arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE$1) {
        var set = iteratee ? null : _createSet(array);
        if (set) {
          return _setToArray(set);
        }
        isCommon = false;
        includes = _cacheHas;
        seen = new _SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    var _baseUniq = baseUniq;

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? _baseUniq(array) : [];
    }

    var uniq_1 = uniq;

    var globalScope = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : null);

    class StandardFile {
      constructor(cryptoInstance) {
        // This library runs in native environments as well (react native)
        if(globalScope) {
          // detect IE8 and above, and edge.
          // IE and Edge do not support pbkdf2 in WebCrypto, therefore we need to use CryptoJS
          var IEOrEdge = (typeof document !== 'undefined' && document.documentMode) || /Edge/.test(navigator.userAgent);

          if(!IEOrEdge && (globalScope.crypto && globalScope.crypto.subtle)) {
            this.crypto = new SFCryptoWeb();
          } else {
            this.crypto = new SFCryptoJS();
          }
        }

        // This must be placed outside window check, as it's used in native.
        if(cryptoInstance) {
          this.crypto = cryptoInstance;
        }

        this.itemTransformer = new SFItemTransformer(this.crypto);

        this.crypto.SFJS = {
          version : this.version(),
          defaultPasswordGenerationCost : this.defaultPasswordGenerationCost()
        };
      }

      version() {
        return "003";
      }

      supportsPasswordDerivationCost(cost) {
        // some passwords are created on platforms with stronger pbkdf2 capabilities, like iOS,
        // which CryptoJS can't handle here (WebCrypto can however).
        // if user has high password cost and is using browser that doesn't support WebCrypto,
        // we want to tell them that they can't login with this browser.
        if(cost > 5000) {
          return this.crypto instanceof SFCryptoWeb;
        } else {
          return true;
        }
      }

      // Returns the versions that this library supports technically.
      supportedVersions() {
        return ["001", "002", "003"];
      }

      isVersionNewerThanLibraryVersion(version) {
        var libraryVersion = this.version();
        return parseInt(version) > parseInt(libraryVersion);
      }

      isProtocolVersionOutdated(version) {
        // YYYY-MM-DD
        let expirationDates = {
          "001" : Date.parse("2018-01-01"),
          "002" : Date.parse("2020-01-01"),
        };

        let date = expirationDates[version];
        if(!date) {
          // No expiration date, is active version
          return false;
        }
        let expired = new Date() > date;
        return expired;
      }

      costMinimumForVersion(version) {
        return {
          "001" : 3000,
          "002" : 3000,
          "003" : 110000
        }[version];
      }

      defaultPasswordGenerationCost() {
        return this.costMinimumForVersion(this.version());
      }
    }

    if(globalScope) {
      // window is for some reason defined in React Native, but throws an exception when you try to set to it
      try {
        globalScope.StandardFile = StandardFile;
        globalScope.SFJS = new StandardFile();
        globalScope.SFCryptoWeb = SFCryptoWeb;
        globalScope.SFCryptoJS = SFCryptoJS;
        globalScope.SFItemTransformer = SFItemTransformer;
        globalScope.SFModelManager = SFModelManager;
        globalScope.SFItem = SFItem;
        globalScope.SFItemParams = SFItemParams;
        globalScope.SFHttpManager = SFHttpManager;
        globalScope.SFStorageManager = SFStorageManager;
        globalScope.SFSyncManager = SFSyncManager;
        globalScope.SFAuthManager = SFAuthManager;
        globalScope.SFMigrationManager = SFMigrationManager;
        globalScope.SFAlertManager = SFAlertManager;
        globalScope.SFPredicate = SFPredicate;
        globalScope.SFHistorySession = SFHistorySession;
        globalScope.SFSessionHistoryManager = SFSessionHistoryManager;
        globalScope.SFItemHistory = SFItemHistory;
        globalScope.SFItemHistoryEntry = SFItemHistoryEntry;
        globalScope.SFPrivilegesManager = SFPrivilegesManager;
        globalScope.SFPrivileges = SFPrivileges;
        globalScope.SFSingletonManager = SFSingletonManager;
      } catch (e) {
        console.log("Exception while exporting window variables", e);
      }
    }

    class SFModelManager$1 {

      constructor(timeout) {
        SFModelManager$1.MappingSourceRemoteRetrieved = "MappingSourceRemoteRetrieved";
        SFModelManager$1.MappingSourceRemoteSaved = "MappingSourceRemoteSaved";
        SFModelManager$1.MappingSourceLocalSaved = "MappingSourceLocalSaved";
        SFModelManager$1.MappingSourceLocalRetrieved = "MappingSourceLocalRetrieved";
        SFModelManager$1.MappingSourceLocalDirtied = "MappingSourceLocalDirtied";
        SFModelManager$1.MappingSourceComponentRetrieved = "MappingSourceComponentRetrieved";
        SFModelManager$1.MappingSourceDesktopInstalled = "MappingSourceDesktopInstalled"; // When a component is installed by the desktop and some of its values change
        SFModelManager$1.MappingSourceRemoteActionRetrieved = "MappingSourceRemoteActionRetrieved"; /* aciton-based Extensions like note history */
        SFModelManager$1.MappingSourceFileImport = "MappingSourceFileImport";

        SFModelManager$1.isMappingSourceRetrieved = (source) => {
          return [
            SFModelManager$1.MappingSourceRemoteRetrieved,
            SFModelManager$1.MappingSourceComponentRetrieved,
            SFModelManager$1.MappingSourceRemoteActionRetrieved
          ].includes(source);
        };

        this.$timeout = timeout || setTimeout.bind(window);

        this.itemSyncObservers = [];
        this.items = [];
        this.itemsHash = {};
        this.missedReferences = {};
        this.uuidChangeObservers = [];
      }

      handleSignout() {
        this.items.length = 0;
        this.itemsHash = {};
        this.missedReferences = {};
      }

      addModelUuidChangeObserver(id, callback) {
        this.uuidChangeObservers.push({id: id, callback: callback});
      }

      notifyObserversOfUuidChange(oldItem, newItem) {
        for(let observer of this.uuidChangeObservers) {
          observer.callback(oldItem, newItem);
        }
      }

      async alternateUUIDForItem(item) {
        // We need to clone this item and give it a new uuid, then delete item with old uuid from db (you can't modify uuid's in our indexeddb setup)
        let newItem = this.createItem(item);
        newItem.uuid = await SFJS.crypto.generateUUID();

        // Update uuids of relationships
        newItem.informReferencesOfUUIDChange(item.uuid, newItem.uuid);
        this.informModelsOfUUIDChangeForItem(newItem, item.uuid, newItem.uuid);

        // the new item should inherit the original's relationships
        for(let referencingObject of item.referencingObjects) {
          referencingObject.setIsNoLongerBeingReferencedBy(item);
          item.setIsNoLongerBeingReferencedBy(referencingObject);
          referencingObject.addItemAsRelationship(newItem);
        }

        this.setItemsDirty(item.referencingObjects, true);

        // Used to set up referencingObjects for new item (so that other items can now properly reference this new item)
        this.resolveReferencesForItem(newItem);

        if(this.loggingEnabled) {
          console.log(item.uuid, "-->", newItem.uuid);
        }

        // Set to deleted, then run through mapping function so that observers can be notified
        item.deleted = true;
        item.content.references = [];
        // Don't set dirty, because we don't need to sync old item. alternating uuid only occurs in two cases:
        // signing in and merging offline data, or when a uuid-conflict occurs. In both cases, the original item never
        // saves to a server, so doesn't need to be synced.
        // informModelsOfUUIDChangeForItem may set this object to dirty, but we want to undo that here, so that the item gets deleted
        // right away through the mapping function.
        this.setItemDirty(item, false, false, SFModelManager$1.MappingSourceLocalSaved);
        this.mapResponseItemsToLocalModels([item], SFModelManager$1.MappingSourceLocalSaved);

        // add new item
        this.addItem(newItem);
        this.setItemDirty(newItem, true, true, SFModelManager$1.MappingSourceLocalSaved);

        this.notifyObserversOfUuidChange(item, newItem);

        return newItem;
      }

      informModelsOfUUIDChangeForItem(newItem, oldUUID, newUUID) {
        // some models that only have one-way relationships might be interested to hear that an item has changed its uuid
        // for example, editors have a one way relationship with notes. When a note changes its UUID, it has no way to inform the editor
        // to update its relationships

        for(let model of this.items) {
          model.potentialItemOfInterestHasChangedItsUUID(newItem, oldUUID, newUUID);
        }
      }

      didSyncModelsOffline(items) {
        this.notifySyncObserversOfModels(items, SFModelManager$1.MappingSourceLocalSaved);
      }

      async mapResponseItemsToLocalModels(items, source, sourceKey) {
        return this.mapResponseItemsToLocalModelsWithOptions({items, source, sourceKey});
      }

      async mapResponseItemsToLocalModelsOmittingFields(items, omitFields, source, sourceKey) {
        return this.mapResponseItemsToLocalModelsWithOptions({items, omitFields, source, sourceKey});
      }

      async mapResponseItemsToLocalModelsWithOptions({items, omitFields, source, sourceKey, options}) {
        let models = [], processedObjects = [], modelsToNotifyObserversOf = [];

        // first loop should add and process items
        for(let json_obj of items) {
          if(!json_obj) {
            continue;
          }

          // content is missing if it has been sucessfullly decrypted but no content
          let isMissingContent = !json_obj.content && !json_obj.errorDecrypting;
          let isCorrupt = !json_obj.content_type || !json_obj.uuid;
          if((isCorrupt || isMissingContent) && !json_obj.deleted) {
            // An item that is not deleted should never have empty content
            console.error("Server response item is corrupt:", json_obj);
            continue;
          }

          // Lodash's _.omit, which was previously used, seems to cause unexpected behavior
          // when json_obj is an ES6 item class. So we instead manually omit each key.
          if(Array.isArray(omitFields)) {
            for(let key of omitFields) {
              delete json_obj[key];
            }
          }

          let item = this.findItem(json_obj.uuid);

          if(item) {
            item.updateFromJSON(json_obj);
            // If an item goes through mapping, it can no longer be a dummy.
            item.dummy = false;
          }

          let contentType = json_obj["content_type"] || (item && item.content_type);
          let unknownContentType = this.acceptableContentTypes && !this.acceptableContentTypes.includes(contentType);
          if(unknownContentType) {
            continue;
          }

          let isDirtyItemPendingDelete = false;
          if(json_obj.deleted == true) {
            if(json_obj.dirty) {
              // Item was marked as deleted but not yet synced (in offline scenario)
              // We need to create this item as usual, but just not add it to individual arrays
              // i.e add to this.items but not this.notes (so that it can be retrieved with getDirtyItems)
              isDirtyItemPendingDelete = true;
            } else {
              if(item) {
                modelsToNotifyObserversOf.push(item);
                this.removeItemLocally(item);
              }
              continue;
            }
          }

          if(!item) {
            item = this.createItem(json_obj);
          }

          this.addItem(item, isDirtyItemPendingDelete);

          // Observers do not need to handle items that errored while decrypting.
          if(!item.errorDecrypting) {
            modelsToNotifyObserversOf.push(item);
          }

          models.push(item);
          processedObjects.push(json_obj);
        }

        // second loop should process references
        for(let [index, json_obj] of processedObjects.entries()) {
          let model = models[index];
          if(json_obj.content) {
            this.resolveReferencesForItem(model);
          }

          model.didFinishSyncing();
        }

        let missedRefs = this.popMissedReferenceStructsForObjects(processedObjects);
        for(let ref of missedRefs) {
          let model = models.find((candidate) => candidate.uuid == ref.reference_uuid);
          // Model should 100% be defined here, but let's not be too overconfident
          if(model) {
            let itemWaitingForTheValueInThisCurrentLoop = ref.for_item;
            itemWaitingForTheValueInThisCurrentLoop.addItemAsRelationship(model);
          }
        }

        await this.notifySyncObserversOfModels(modelsToNotifyObserversOf, source, sourceKey);

        return models;
      }

      missedReferenceBuildKey(referenceId, objectId) {
        return `${referenceId}:${objectId}`
      }

      popMissedReferenceStructsForObjects(objects) {
        if(!objects || objects.length == 0) {
          return [];
        }

        let results = [];
        let toDelete = [];
        let uuids = objects.map((item) => item.uuid);
        let genericUuidLength = uuids[0].length;

        let keys = Object.keys(this.missedReferences);
        for(let candidateKey of keys) {
          /*
          We used to do string.split to get at the UUID, but surprisingly,
          the performance of this was about 20x worse then just getting the substring.

          let matches = candidateKey.split(":")[0] == object.uuid;
          */
          let matches = uuids.includes(candidateKey.substring(0, genericUuidLength));
          if(matches) {
            results.push(this.missedReferences[candidateKey]);
            toDelete.push(candidateKey);
          }
        }

        // remove from hash
        for(let key of toDelete) {
          delete this.missedReferences[key];
        }

        return results;
      }

      resolveReferencesForItem(item, markReferencesDirty = false) {

        if(item.errorDecrypting) {
          return;
        }

        let contentObject = item.contentObject;

        // If another client removes an item's references, this client won't pick up the removal unless
        // we remove everything not present in the current list of references
        item.updateLocalRelationships();

        if(!contentObject.references) {
          return;
        }

        let references = contentObject.references.slice(); // make copy, references will be modified in array

        let referencesIds = references.map((ref) => {return ref.uuid});
        let includeBlanks = true;
        let referencesObjectResults = this.findItems(referencesIds, includeBlanks);

        for(let [index, referencedItem] of referencesObjectResults.entries()) {
          if(referencedItem) {
            item.addItemAsRelationship(referencedItem);
            if(markReferencesDirty) {
              this.setItemDirty(referencedItem, true);
            }
          } else {
            let missingRefId = referencesIds[index];
            // Allows mapper to check when missing reference makes it through the loop,
            // and then runs resolveReferencesForItem again for the original item.
            let mappingKey = this.missedReferenceBuildKey(missingRefId, item.uuid);
            if(!this.missedReferences[mappingKey]) {
              let missedRef = {reference_uuid: missingRefId, for_item: item};
              this.missedReferences[mappingKey] = missedRef;
            }
          }
        }
      }

      /* Note that this function is public, and can also be called manually (desktopManager uses it) */
      async notifySyncObserversOfModels(models, source, sourceKey) {
        // Make sure `let` is used in the for loops instead of `var`, as we will be using a timeout below.
        let observers = this.itemSyncObservers.sort((a, b) => {
          // sort by priority
          return a.priority < b.priority ? -1 : 1;
        });
        for(let observer of observers) {
          let allRelevantItems = observer.types.includes("*") ? models : models.filter((item) => {return observer.types.includes(item.content_type)});
          let validItems = [], deletedItems = [];
          for(let item of allRelevantItems) {
            if(item.deleted) {
              deletedItems.push(item);
            } else {
              validItems.push(item);
            }
          }

          if(allRelevantItems.length > 0) {
            await this._callSyncObserverCallbackWithTimeout(observer, allRelevantItems, validItems, deletedItems, source, sourceKey);
          }
        }
      }

      /*
        Rather than running this inline in a for loop, which causes problems and requires all variables to be declared with `let`,
        we'll do it here so it's more explicit and less confusing.
       */
      async _callSyncObserverCallbackWithTimeout(observer, allRelevantItems, validItems, deletedItems, source, sourceKey) {
        return new Promise((resolve, reject) => {
          this.$timeout(() => {
            observer.callback(allRelevantItems, validItems, deletedItems, source, sourceKey);
            resolve();
          });
        })
      }

      // When a client sets an item as dirty, it means its values has changed, and everyone should know about it.
      // Particularly extensions. For example, if you edit the title of a note, extensions won't be notified until the save sync completes.
      // With this, they'll be notified immediately.
      setItemDirty(item, dirty = true, updateClientDate, source, sourceKey) {
        this.setItemsDirty([item], dirty, updateClientDate, source, sourceKey);
      }

      setItemsDirty(items, dirty = true, updateClientDate, source, sourceKey) {
        for(let item of items) {
          item.setDirty(dirty, updateClientDate);
        }
        this.notifySyncObserversOfModels(items, source || SFModelManager$1.MappingSourceLocalDirtied, sourceKey);
      }

      createItem(json_obj) {
        let itemClass = SFModelManager$1.ContentTypeClassMapping && SFModelManager$1.ContentTypeClassMapping[json_obj.content_type];
        if(!itemClass) {
          itemClass = SFItem;
        }

        let item = new itemClass(json_obj);
        return item;
      }

      /*
        Be sure itemResponse is a generic Javascript object, and not an Item.
        An Item needs to collapse its properties into its content object before it can be duplicated.
        Note: the reason we need this function is specificallty for the call to resolveReferencesForItem.
        This method creates but does not add the item to the global inventory. It's used by syncManager
        to check if this prospective duplicate item is identical to another item, including the references.
       */
      async createDuplicateItemFromResponseItem(itemResponse) {
        if(typeof itemResponse.setDirty === 'function') {
          // You should never pass in objects here, as we will modify the itemResponse's uuid below (update: we now make a copy of input value).
          console.error("Attempting to create conflicted copy of non-response item.");
          return null;
        }
        // Make a copy so we don't modify input value.
        let itemResponseCopy = JSON.parse(JSON.stringify(itemResponse));
        itemResponseCopy.uuid = await SFJS.crypto.generateUUID();
        let duplicate = this.createItem(itemResponseCopy);
        return duplicate;
      }

      duplicateItemAndAddAsConflict(duplicateOf) {
        return this.duplicateItemWithCustomContentAndAddAsConflict({content: duplicateOf.content, duplicateOf});
      }

      duplicateItemWithCustomContentAndAddAsConflict({content, duplicateOf}) {
        let copy = this.duplicateItemWithCustomContent({content, duplicateOf});
        this.addDuplicatedItemAsConflict({duplicate: copy, duplicateOf});
        return copy;
      }

      addDuplicatedItemAsConflict({duplicate, duplicateOf}) {
        this.addDuplicatedItem(duplicate, duplicateOf);
        duplicate.content.conflict_of = duplicateOf.uuid;
      }

      duplicateItemWithCustomContent({content, duplicateOf}) {
        let copy = new duplicateOf.constructor({content});
        copy.created_at = duplicateOf.created_at;
        if(!copy.content_type) {
          copy.content_type = duplicateOf.content_type;
        }
        return copy;
      }

      duplicateItemAndAdd(item) {
        let copy = this.duplicateItemWithoutAdding(item);
        this.addDuplicatedItem(copy, item);
        return copy;
      }

      duplicateItemWithoutAdding(item) {
        let copy = new item.constructor({content: item.content});
        copy.created_at = item.created_at;
        if(!copy.content_type) {
          copy.content_type = item.content_type;
        }
        return copy;
      }

      addDuplicatedItem(duplicate, original) {
        this.addItem(duplicate);
        // the duplicate should inherit the original's relationships
        for(let referencingObject of original.referencingObjects) {
          referencingObject.addItemAsRelationship(duplicate);
          this.setItemDirty(referencingObject, true);
        }
        this.resolveReferencesForItem(duplicate);
        this.setItemDirty(duplicate, true);
      }


      addItem(item, globalOnly = false) {
        this.addItems([item], globalOnly);
      }

      addItems(items, globalOnly = false) {
        items.forEach((item) => {
          if(!this.itemsHash[item.uuid]) {
            this.itemsHash[item.uuid] = item;
            this.items.push(item);
          }
        });
      }

      /* Notifies observers when an item has been synced or mapped from a remote response */
      addItemSyncObserver(id, types, callback) {
        this.addItemSyncObserverWithPriority({id, types, callback, priority: 1});
      }

      addItemSyncObserverWithPriority({id, priority, types, callback}) {
        if(!Array.isArray(types)) {
          types = [types];
        }
        this.itemSyncObservers.push({id, types, priority, callback});
      }

      removeItemSyncObserver(id) {
        _.remove(this.itemSyncObservers, _.find(this.itemSyncObservers, {id: id}));
      }

      getDirtyItems() {
        return this.items.filter((item) => {
          // An item that has an error decrypting can be synced only if it is being deleted.
          // Otherwise, we don't want to send corrupt content up to the server.
          return item.dirty == true && !item.dummy && (!item.errorDecrypting || item.deleted);
        })
      }

      clearDirtyItems(items) {
        for(let item of items) {
          item.setDirty(false);
        }
      }

      removeAndDirtyAllRelationshipsForItem(item) {
        // Handle direct relationships
        // An item with errorDecrypting will not have valid content field
        if(!item.errorDecrypting) {
          for(let reference of item.content.references) {
            let relationship = this.findItem(reference.uuid);
            if(relationship) {
              item.removeItemAsRelationship(relationship);
              if(relationship.hasRelationshipWithItem(item)) {
                relationship.removeItemAsRelationship(item);
                this.setItemDirty(relationship, true);
              }
            }
          }
        }

        // Handle indirect relationships
        for(let object of item.referencingObjects) {
          object.removeItemAsRelationship(item);
          this.setItemDirty(object, true);
        }

        item.referencingObjects = [];
      }

      /* Used when changing encryption key */
      setAllItemsDirty() {
        let relevantItems = this.allItems;
        this.setItemsDirty(relevantItems, true);
      }

      setItemToBeDeleted(item) {
        item.deleted = true;

        if(!item.dummy) {
          this.setItemDirty(item, true);
        }

        this.removeAndDirtyAllRelationshipsForItem(item);
      }

      async removeItemLocally(item) {
        _.remove(this.items, {uuid: item.uuid});

        delete this.itemsHash[item.uuid];

        item.isBeingRemovedLocally();
      }

      /* Searching */

      get allItems() {
        return this.items.slice();
      }

      get allNondummyItems() {
        return this.items.filter(function(item){
          return !item.dummy;
        })
      }

      allItemsMatchingTypes(contentTypes) {
        return this.allItems.filter(function(item){
          return (_.includes(contentTypes, item.content_type) || _.includes(contentTypes, "*")) && !item.dummy;
        })
      }

      invalidItems() {
        return this.allItems.filter((item) => {
          return item.errorDecrypting;
        });
      }

      validItemsForContentType(contentType) {
        return this.allItems.filter((item) => {
          return item.content_type == contentType && !item.errorDecrypting;
        });
      }

      findItem(itemId) {
        return this.itemsHash[itemId];
      }

      findItems(ids, includeBlanks = false) {
        let results = [];
        for(let id of ids) {
          let item = this.itemsHash[id];
          if(item || includeBlanks) {
            results.push(item);
          }
        }
        return results;
      }

      itemsMatchingPredicate(predicate) {
        return this.itemsMatchingPredicates([predicate]);
      }

      itemsMatchingPredicates(predicates) {
        return this.filterItemsWithPredicates(this.allItems, predicates);
      }

      filterItemsWithPredicates(items, predicates) {
        let results = items.filter((item) => {
          for(let predicate of predicates)  {
            if(!item.satisfiesPredicate(predicate)) {
              return false;
            }
          }
          return true;
        });

        return results;
      }


      /*
      Archives
      */

      async importItems(externalItems) {
        let itemsToBeMapped = [];
        // Get local values before doing any processing. This way, if a note change below modifies a tag,
        // and the tag is going to be iterated on in the same loop, then we don't want this change to be compared
        // to the local value.
        let localValues = {};
        for(let itemData of externalItems) {
          let localItem = this.findItem(itemData.uuid);
          if(!localItem) {
            localValues[itemData.uuid] = {};
            continue;
          }
          let frozenValue = this.duplicateItemWithoutAdding(localItem);
          localValues[itemData.uuid] = {frozenValue, itemRef: localItem};
        }

        for(let itemData of externalItems) {
          let {frozenValue, itemRef} = localValues[itemData.uuid];
          if(frozenValue && !itemRef.errorDecrypting) {
            // if the item already exists, check to see if it's different from the import data.
            // If it's the same, do nothing, otherwise, create a copy.
            let duplicate = await this.createDuplicateItemFromResponseItem(itemData);
            if(!itemData.deleted && !frozenValue.isItemContentEqualWith(duplicate)) {
              // Data differs
              this.addDuplicatedItemAsConflict({duplicate, duplicateOf: itemRef});
              itemsToBeMapped.push(duplicate);
            }
          } else {
            // it doesn't exist, push it into items to be mapped
            itemsToBeMapped.push(itemData);
            if(itemRef && itemRef.errorDecrypting) {
              itemRef.errorDecrypting = false;
            }
          }
        }

        let items = this.mapResponseItemsToLocalModels(itemsToBeMapped, SFModelManager$1.MappingSourceFileImport);
        for(let item of items) {
          this.setItemDirty(item, true, true);
          item.deleted = false;
        }

        return items;
      }

      async getAllItemsJSONData(keys, authParams, returnNullIfEmpty) {
        return this.getJSONDataForItems(this.allItems, keys, authParams, returnNullIfEmpty);
      }

      async getJSONDataForItems(items, keys, authParams, returnNullIfEmpty) {
        return Promise.all(items.map((item) => {
          let itemParams = new SFItemParams(item, keys, authParams);
          return itemParams.paramsForExportFile();
        })).then((items) => {
          if(returnNullIfEmpty && items.length == 0) {
            return null;
          }

          let data = {items: items};

          if(keys) {
            // auth params are only needed when encrypted with a standard file key
            data["auth_params"] = authParams;
          }

          return JSON.stringify(data, null, 2 /* pretty print */);
        })
      }

      async computeDataIntegrityHash() {
        try {
          let items = this.allNondummyItems.sort((a, b) => {
            return b.updated_at - a.updated_at;
          });
          let dates = items.map((item) => item.updatedAtTimestamp());
          let string = dates.join(",");
          let hash = await SFJS.crypto.sha256(string);
          return hash;
        } catch (e) {
          console.error("Error computing data integrity hash", e);
          return null;
        }
      }
    }

    var SNComponentManager = /** @class */ (function () {
        /*
          @param {string} environment: one of [web, desktop, mobile]
          @param {string} platform: one of [ios, android, linux-${environment}, mac-${environment}, windows-${environment}]
        */
        function SNComponentManager(_a) {
            var modelManager = _a.modelManager, syncManager = _a.syncManager, desktopManager = _a.desktopManager, nativeExtManager = _a.nativeExtManager, alertManager = _a.alertManager, $uiRunner = _a.$uiRunner, $timeout = _a.$timeout, environment = _a.environment, platform = _a.platform;
            // Some actions need to be run on the ui thread (desktop/web only)
            this.$uiRunner =
                $uiRunner ||
                    (function (fn) {
                        fn();
                    });
            this.$timeout = $timeout || setTimeout.bind(window);
            this.modelManager = modelManager;
            this.syncManager = syncManager;
            this.desktopManager = desktopManager;
            this.nativeExtManager = nativeExtManager;
            this.alertManager = alertManager;
            this.streamObservers = [];
            this.contextStreamObservers = [];
            this.activeComponents = [];
            this.environment = environment;
            this.platform = platform;
            this.isDesktop = this.environment == 'desktop';
            this.isMobile = this.environment == 'mobile';
            this.SFJS = new StandardFile();
            if (environment != 'mobile') {
                this.configureForNonMobileUsage();
            }
            this.configureForGeneralUsage();
            // this.loggingEnabled = true;
            this.permissionDialogs = [];
            this.handlers = [];
        }
        SNComponentManager.prototype.configureForGeneralUsage = function () {
            var _this = this;
            this.modelManager.addItemSyncObserver('component-manager', '*', function (allItems, validItems, deletedItems, source, sourceKey) {
                var syncedComponents = allItems.filter(function (item) {
                    return (item.content_type === 'SN|Component' ||
                        item.content_type == 'SN|Theme');
                });
                /* We only want to sync if the item source is Retrieved, not MappingSourceRemoteSaved to avoid
                recursion caused by the component being modified and saved after it is updated.
              */
                if (syncedComponents.length > 0 &&
                    source != SFModelManager$1.MappingSourceRemoteSaved) {
                    // Ensure any component in our data is installed by the system
                    if (_this.isDesktop) {
                        _this.desktopManager.syncComponentsInstallation(syncedComponents);
                    }
                }
                for (var _i = 0, syncedComponents_1 = syncedComponents; _i < syncedComponents_1.length; _i++) {
                    var component = syncedComponents_1[_i];
                    var activeComponent = find_1(_this.activeComponents, {
                        uuid: component.uuid
                    });
                    if (component.active && !component.deleted && !activeComponent) {
                        _this.activateComponent(component);
                    }
                    else if (!component.active && activeComponent) {
                        _this.deactivateComponent(component);
                    }
                }
                var _loop_1 = function (observer) {
                    if (sourceKey && sourceKey == observer.component.uuid) {
                        return "continue";
                    }
                    var relevantItems = allItems.filter(function (item) {
                        return observer.contentTypes.indexOf(item.content_type) !== -1;
                    });
                    if (relevantItems.length == 0) {
                        return "continue";
                    }
                    var requiredPermissions = [
                        {
                            name: 'stream-items',
                            content_types: observer.contentTypes.sort()
                        }
                    ];
                    _this.runWithPermissions(observer.component, requiredPermissions, function () {
                        _this.sendItemsInReply(observer.component, relevantItems, observer.originalMessage);
                    });
                };
                for (var _a = 0, _b = _this.streamObservers; _a < _b.length; _a++) {
                    var observer = _b[_a];
                    _loop_1(observer);
                }
                var requiredContextPermissions = [
                    {
                        name: 'stream-context-item'
                    }
                ];
                var _loop_2 = function (observer) {
                    if (sourceKey && sourceKey == observer.component.uuid) {
                        return "continue";
                    }
                    for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        if (!handler.areas.includes(observer.component.area) &&
                            !handler.areas.includes('*')) {
                            continue;
                        }
                        if (handler.contextRequestHandler) {
                            itemInContext = handler.contextRequestHandler(observer.component);
                            if (itemInContext) {
                                matchingItem = find_1(allItems, {
                                    uuid: itemInContext.uuid
                                });
                                if (matchingItem) {
                                    _this.runWithPermissions(observer.component, requiredContextPermissions, function () {
                                        _this.sendContextItemInReply(observer.component, matchingItem, observer.originalMessage, source);
                                    });
                                }
                            }
                        }
                    }
                };
                var itemInContext, matchingItem;
                for (var _c = 0, _d = _this.contextStreamObservers; _c < _d.length; _c++) {
                    var observer = _d[_c];
                    _loop_2(observer);
                }
            });
        };
        SNComponentManager.prototype.configureForNonMobileUsage = function () {
            var _this = this;
            var detectFocusChange = function (event) {
                for (var _i = 0, _a = _this.activeComponents; _i < _a.length; _i++) {
                    var component = _a[_i];
                    if (document.activeElement == _this.iframeForComponent(component)) {
                        _this.$timeout(function () {
                            _this.focusChangedForComponent(component);
                        });
                        break;
                    }
                }
            };
            window.addEventListener
                ? window.addEventListener('focus', detectFocusChange, true)
                : window.attachEvent('onfocusout', detectFocusChange);
            window.addEventListener
                ? window.addEventListener('blur', detectFocusChange, true)
                : window.attachEvent('onblur', detectFocusChange);
            this.desktopManager.registerUpdateObserver(function (component) {
                // Reload theme if active
                if (component.active && component.isTheme()) {
                    _this.postActiveThemesToAllComponents();
                }
            });
            // On mobile, events listeners are handled by a respective component
            window.addEventListener('message', function (event) {
                if (_this.loggingEnabled) {
                    console.log('Web app: received message', event);
                }
                // Make sure this message is for us
                if (event.data.sessionKey) {
                    _this.handleMessage(_this.componentForSessionKey(event.data.sessionKey), event.data);
                }
            }, false);
        };
        SNComponentManager.prototype.postActiveThemesToAllComponents = function () {
            for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
                var component = _a[_i];
                // Skip over components that are themes themselves,
                // or components that are not active, or components that don't have a window
                if (component.isTheme() || !component.active || !component.window) {
                    continue;
                }
                this.postActiveThemesToComponent(component);
            }
        };
        SNComponentManager.prototype.getActiveThemes = function () {
            return this.componentsForArea('themes').filter(function (theme) {
                return theme.active;
            });
        };
        SNComponentManager.prototype.urlsForActiveThemes = function () {
            var _this = this;
            var themes = this.getActiveThemes();
            return themes.map(function (theme) {
                return _this.urlForComponent(theme);
            });
        };
        SNComponentManager.prototype.postActiveThemesToComponent = function (component) {
            var urls = this.urlsForActiveThemes();
            var data = { themes: urls };
            this.sendMessageToComponent(component, { action: 'themes', data: data });
        };
        SNComponentManager.prototype.contextItemDidChangeInArea = function (area) {
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.areas.includes(area) === false &&
                    !handler.areas.includes('*')) {
                    continue;
                }
                var observers = this.contextStreamObservers.filter(function (observer) {
                    return observer.component.area === area;
                });
                for (var _b = 0, observers_1 = observers; _b < observers_1.length; _b++) {
                    var observer = observers_1[_b];
                    if (handler.contextRequestHandler) {
                        var itemInContext = handler.contextRequestHandler(observer.component);
                        if (itemInContext) {
                            this.sendContextItemInReply(observer.component, itemInContext, observer.originalMessage);
                        }
                    }
                }
            }
        };
        SNComponentManager.prototype.setComponentHidden = function (component, hidden) {
            /*
              A hidden component will not receive messages.
              However, when a component is unhidden, we need to send it any items it may have
              registered streaming for.
            */
            if (hidden) {
                component.hidden = true;
            }
            else if (component.hidden) {
                // Only enter this condition if component is hidden to make this note have double side effects.
                component.hidden = false;
                // streamContextItem
                var contextObserver = find_1(this.contextStreamObservers, {
                    identifier: component.uuid
                });
                if (contextObserver) {
                    this.handleStreamContextItemMessage(component, contextObserver.originalMessage);
                }
                // streamItems
                var streamObserver = find_1(this.streamObservers, {
                    identifier: component.uuid
                });
                if (streamObserver) {
                    this.handleStreamItemsMessage(component, streamObserver.originalMessage);
                }
            }
        };
        SNComponentManager.prototype.jsonForItem = function (item, component, source) {
            var params = {
                uuid: item.uuid,
                content_type: item.content_type,
                created_at: item.created_at,
                updated_at: item.updated_at,
                deleted: item.deleted
            };
            params.content = item.createContentJSONFromProperties();
            params.clientData =
                item.getDomainDataItem(component.getClientDataKey(), SNComponentManager.ClientDataDomain) || {};
            // isMetadataUpdate implies that the extension should make reference of updated metadata,
            // but not update content values as they may be stale relative to what the extension currently has
            // Changes are always metadata updates if the mapping source is SFModelManager.MappingSourceRemoteSaved || source == SFModelManager.MappingSourceLocalSaved.
            //
            if (source &&
                (source == SFModelManager$1.MappingSourceRemoteSaved ||
                    source == SFModelManager$1.MappingSourceLocalSaved)) {
                params.isMetadataUpdate = true;
            }
            this.removePrivatePropertiesFromResponseItems([params], component, {
                type: 'outgoing'
            });
            return params;
        };
        SNComponentManager.prototype.sendItemsInReply = function (component, items, message, source) {
            var _this = this;
            if (this.loggingEnabled) {
                console.log('Web|componentManager|sendItemsInReply', component, items, message);
            }
            var response = { items: {} };
            var mapped = items.map(function (item) {
                return _this.jsonForItem(item, component, source);
            });
            response.items = mapped;
            this.replyToMessage(component, message, response);
        };
        SNComponentManager.prototype.sendContextItemInReply = function (component, item, originalMessage, source) {
            if (this.loggingEnabled) {
                console.log('Web|componentManager|sendContextItemInReply', component, item, originalMessage);
            }
            var response = { item: this.jsonForItem(item, component, source) };
            this.replyToMessage(component, originalMessage, response);
        };
        SNComponentManager.prototype.replyToMessage = function (component, originalMessage, replyData) {
            var reply = {
                action: 'reply',
                original: originalMessage,
                data: replyData
            };
            this.sendMessageToComponent(component, reply);
        };
        SNComponentManager.prototype.sendMessageToComponent = function (component, message) {
            var permissibleActionsWhileHidden = ['component-registered', 'themes'];
            if (component.hidden &&
                !permissibleActionsWhileHidden.includes(message.action)) {
                if (this.loggingEnabled) {
                    console.log('Component disabled for current item, not sending any messages.', component.name);
                }
                return;
            }
            if (this.loggingEnabled) {
                console.log('Web|sendMessageToComponent', component, message);
            }
            var origin = this.urlForComponent(component, 'file://');
            if (!origin.startsWith('http') && !origin.startsWith('file')) {
                // Native extension running in web, prefix current host
                origin = window.location.href + origin;
            }
            if (!component.window) {
                this.alertManager.alert({
                    text: "Standard Notes is trying to communicate with " + component.name + ", but an error is occurring. Please restart this extension and try again."
                });
            }
            // Mobile messaging requires json
            if (this.isMobile) {
                message = JSON.stringify(message);
            }
            component.window.postMessage(message, origin);
        };
        Object.defineProperty(SNComponentManager.prototype, "components", {
            get: function () {
                return this.modelManager.allItemsMatchingTypes([
                    'SN|Component',
                    'SN|Theme'
                ]);
            },
            enumerable: true,
            configurable: true
        });
        SNComponentManager.prototype.componentsForArea = function (area) {
            return this.components.filter(function (component) {
                return component.area === area;
            });
        };
        SNComponentManager.prototype.urlForComponent = function (component, offlinePrefix) {
            if (offlinePrefix === void 0) { offlinePrefix = ''; }
            // offlineOnly is available only on desktop, and not on web or mobile.
            if (component.offlineOnly && !this.isDesktop) {
                return null;
            }
            if (component.offlineOnly || (this.isDesktop && component.local_url)) {
                return (component.local_url &&
                    component.local_url.replace('sn://', offlinePrefix + this.desktopManager.getApplicationDataPath() + '/'));
            }
            else {
                var url = component.hosted_url || component.legacy_url;
                if (this.isMobile) {
                    var localReplacement = this.platform == 'ios' ? 'localhost' : '10.0.2.2';
                    url = url
                        .replace('localhost', localReplacement)
                        .replace('sn.local', localReplacement);
                }
                return url;
            }
        };
        SNComponentManager.prototype.componentForUrl = function (url) {
            return this.components.filter(function (component) {
                return component.hosted_url === url || component.legacy_url === url;
            })[0];
        };
        SNComponentManager.prototype.componentForSessionKey = function (key) {
            var component = find_1(this.components, { sessionKey: key });
            if (!component) {
                for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    if (handler.componentForSessionKeyHandler) {
                        component = handler.componentForSessionKeyHandler(key);
                        if (component) {
                            break;
                        }
                    }
                }
            }
            return component;
        };
        SNComponentManager.prototype.handleMessage = function (component, message) {
            if (!component) {
                console.log('Component not defined for message, returning', message);
                this.alertManager.alert({
                    text: 'An extension is trying to communicate with Standard Notes, but there is an error establishing a bridge. Please restart the app and try again.'
                });
                return;
            }
            // Actions that won't succeeed with readonly mode
            var readwriteActions = [
                'save-items',
                'associate-item',
                'deassociate-item',
                'create-item',
                'create-items',
                'delete-items',
                'set-component-data'
            ];
            if (component.readonly && readwriteActions.includes(message.action)) {
                // A component can be marked readonly if changes should not be saved.
                // Particullary used for revision preview windows where the notes should not be savable.
                this.alertManager.alert({
                    text: "The extension " + component.name + " is trying to save, but it is in a locked state and cannot accept changes."
                });
                return;
            }
            /**
            Possible Messages:
              set-size
              stream-items
              stream-context-item
              save-items
              select-item
              associate-item
              deassociate-item
              clear-selection
              create-item
              create-items
              delete-items
              set-component-data
              install-local-component
              toggle-activate-component
              request-permissions
              present-conflict-resolution
            */
            if (message.action === 'stream-items') {
                this.handleStreamItemsMessage(component, message);
            }
            else if (message.action === 'stream-context-item') {
                this.handleStreamContextItemMessage(component, message);
            }
            else if (message.action === 'set-component-data') {
                this.handleSetComponentDataMessage(component, message);
            }
            else if (message.action === 'delete-items') {
                this.handleDeleteItemsMessage(component, message);
            }
            else if (message.action === 'create-items' ||
                message.action === 'create-item') {
                this.handleCreateItemsMessage(component, message);
            }
            else if (message.action === 'save-items') {
                this.handleSaveItemsMessage(component, message);
            }
            else if (message.action === 'toggle-activate-component') {
                var componentToToggle = this.modelManager.findItem(message.data.uuid);
                this.handleToggleComponentMessage(component, componentToToggle, message);
            }
            else if (message.action === 'request-permissions') {
                this.handleRequestPermissionsMessage(component, message);
            }
            else if (message.action === 'install-local-component') {
                this.handleInstallLocalComponentMessage(component, message);
            }
            else if (message.action === 'duplicate-item') {
                this.handleDuplicateItemMessage(component, message);
            }
            var _loop_3 = function (handler) {
                if (handler.actionHandler &&
                    (handler.areas.includes(component.area) || handler.areas.includes('*'))) {
                    this_1.$timeout(function () {
                        handler.actionHandler(component, message.action, message.data);
                    });
                }
            };
            var this_1 = this;
            // Notify observers
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                _loop_3(handler);
            }
        };
        SNComponentManager.prototype.removePrivatePropertiesFromResponseItems = function (responseItems, component, options) {
            if (options === void 0) { options = {}; }
            // can be 'incoming' or 'outgoing'. We want to remove updated_at if incoming, but keep it if outgoing
            if (options.type == 'incoming') {
                var privateTopLevelProperties = ['updated_at'];
                // Maintaining our own updated_at value is imperative for sync to work properly, we ignore any incoming value.
                for (var _i = 0, responseItems_1 = responseItems; _i < responseItems_1.length; _i++) {
                    var responseItem = responseItems_1[_i];
                    if (typeof responseItem.setDirty === 'function') {
                        console.error('Attempting to pass object. Use JSON.');
                        continue;
                    }
                    for (var _a = 0, privateTopLevelProperties_1 = privateTopLevelProperties; _a < privateTopLevelProperties_1.length; _a++) {
                        var privateProperty = privateTopLevelProperties_1[_a];
                        delete responseItem[privateProperty];
                    }
                }
            }
            if (component) {
                // System extensions can bypass this step
                if (this.nativeExtManager &&
                    this.nativeExtManager.isSystemExtension(component)) {
                    return;
                }
            }
            // Don't allow component to overwrite these properties.
            var privateContentProperties = [
                'autoupdateDisabled',
                'permissions',
                'active'
            ];
            if (options) {
                if (options.includeUrls) {
                    privateContentProperties = privateContentProperties.concat([
                        'url',
                        'hosted_url',
                        'local_url'
                    ]);
                }
            }
            for (var _b = 0, responseItems_2 = responseItems; _b < responseItems_2.length; _b++) {
                var responseItem = responseItems_2[_b];
                // Do not pass in actual items here, otherwise that would be destructive.
                // Instead, generic JS/JSON objects should be passed.
                if (typeof responseItem.setDirty === 'function') {
                    console.error('Attempting to pass object. Use JSON.');
                    continue;
                }
                for (var _c = 0, privateContentProperties_1 = privateContentProperties; _c < privateContentProperties_1.length; _c++) {
                    var prop = privateContentProperties_1[_c];
                    delete responseItem.content[prop];
                }
            }
        };
        SNComponentManager.prototype.handleStreamItemsMessage = function (component, message) {
            var _this = this;
            var requiredPermissions = [
                {
                    name: 'stream-items',
                    content_types: message.data.content_types.sort()
                }
            ];
            this.runWithPermissions(component, requiredPermissions, function () {
                if (!find_1(_this.streamObservers, { identifier: component.uuid })) {
                    // for pushing laster as changes come in
                    _this.streamObservers.push({
                        identifier: component.uuid,
                        component: component,
                        originalMessage: message,
                        contentTypes: message.data.content_types
                    });
                }
                // push immediately now
                var items = [];
                for (var _i = 0, _a = message.data.content_types; _i < _a.length; _i++) {
                    var contentType = _a[_i];
                    items = items.concat(_this.modelManager.validItemsForContentType(contentType));
                }
                _this.sendItemsInReply(component, items, message);
            });
        };
        SNComponentManager.prototype.handleStreamContextItemMessage = function (component, message) {
            var _this = this;
            var requiredPermissions = [
                {
                    name: 'stream-context-item'
                }
            ];
            this.runWithPermissions(component, requiredPermissions, function () {
                if (!find_1(_this.contextStreamObservers, { identifier: component.uuid })) {
                    // for pushing laster as changes come in
                    _this.contextStreamObservers.push({
                        identifier: component.uuid,
                        component: component,
                        originalMessage: message
                    });
                }
                // push immediately now
                for (var _i = 0, _a = _this.handlersForArea(component.area); _i < _a.length; _i++) {
                    var handler = _a[_i];
                    if (handler.contextRequestHandler) {
                        var itemInContext = handler.contextRequestHandler(component);
                        if (itemInContext) {
                            _this.sendContextItemInReply(component, itemInContext, message);
                        }
                    }
                }
            });
        };
        SNComponentManager.prototype.isItemIdWithinComponentContextJurisdiction = function (uuid, component) {
            var itemIdsInJurisdiction = this.itemIdsInContextJurisdictionForComponent(component);
            return itemIdsInJurisdiction.includes(uuid);
        };
        /* Returns items that given component has context permissions for */
        SNComponentManager.prototype.itemIdsInContextJurisdictionForComponent = function (component) {
            var itemIds = [];
            for (var _i = 0, _a = this.handlersForArea(component.area); _i < _a.length; _i++) {
                var handler = _a[_i];
                if (handler.contextRequestHandler) {
                    var itemInContext = handler.contextRequestHandler(component);
                    if (itemInContext) {
                        itemIds.push(itemInContext.uuid);
                    }
                }
            }
            return itemIds;
        };
        SNComponentManager.prototype.handlersForArea = function (area) {
            return this.handlers.filter(function (candidate) {
                return candidate.areas.includes(area);
            });
        };
        SNComponentManager.prototype.handleSaveItemsMessage = function (component, message) {
            return __awaiter(this, void 0, void 0, function () {
                var responseItems, requiredPermissions, itemIdsInContextJurisdiction, pendingResponseItems, _i, _a, responseItem, requiredContentTypes;
                var _this = this;
                return __generator(this, function (_b) {
                    responseItems = message.data.items;
                    requiredPermissions = [];
                    itemIdsInContextJurisdiction = this.itemIdsInContextJurisdictionForComponent(component);
                    pendingResponseItems = responseItems.slice();
                    for (_i = 0, _a = responseItems.slice(); _i < _a.length; _i++) {
                        responseItem = _a[_i];
                        if (itemIdsInContextJurisdiction.includes(responseItem.uuid)) {
                            requiredPermissions.push({
                                name: 'stream-context-item'
                            });
                            pull_1(pendingResponseItems, responseItem);
                            // We break because there can only be one context item
                            break;
                        }
                    }
                    // Check to see if additional privileges are required
                    if (pendingResponseItems.length > 0) {
                        requiredContentTypes = uniq_1(pendingResponseItems.map(function (i) {
                            return i.content_type;
                        })).sort();
                        requiredPermissions.push({
                            name: 'stream-items',
                            content_types: requiredContentTypes
                        });
                    }
                    this.runWithPermissions(component, requiredPermissions, function () { return __awaiter(_this, void 0, void 0, function () {
                        var ids, items, lockedCount, _i, items_1, item, itemNoun, auxVerb, localItems, _a, responseItems_3, responseItem, item;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    this.removePrivatePropertiesFromResponseItems(responseItems, component, {
                                        includeUrls: true,
                                        type: 'incoming'
                                    });
                                    ids = responseItems.map(function (i) {
                                        return i.uuid;
                                    });
                                    items = this.modelManager.findItems(ids);
                                    lockedCount = 0;
                                    for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                                        item = items_1[_i];
                                        if (item.locked) {
                                            remove_1(responseItems, { uuid: item.uuid });
                                            lockedCount++;
                                        }
                                    }
                                    if (lockedCount > 0) {
                                        itemNoun = lockedCount == 1 ? 'item' : 'items';
                                        auxVerb = lockedCount == 1 ? 'is' : 'are';
                                        this.alertManager.alert({
                                            title: 'Items Locked',
                                            text: lockedCount + " " + itemNoun + " you are attempting to save " + auxVerb + " locked and cannot be edited."
                                        });
                                    }
                                    return [4 /*yield*/, this.modelManager.mapResponseItemsToLocalModels(responseItems, SFModelManager$1.MappingSourceComponentRetrieved, component.uuid)];
                                case 1:
                                    localItems = _b.sent();
                                    for (_a = 0, responseItems_3 = responseItems; _a < responseItems_3.length; _a++) {
                                        responseItem = responseItems_3[_a];
                                        item = find_1(localItems, { uuid: responseItem.uuid });
                                        if (!item) {
                                            // An item this extension is trying to save was possibly removed locally, notify user
                                            this.alertManager.alert({
                                                text: "The extension " + component.name + " is trying to save an item with type " + responseItem.content_type + ", but that item does not exist. Please restart this extension and try again."
                                            });
                                            continue;
                                        }
                                        if (!item.locked) {
                                            if (responseItem.clientData) {
                                                item.setDomainDataItem(component.getClientDataKey(), responseItem.clientData, SNComponentManager.ClientDataDomain);
                                            }
                                            this.modelManager.setItemDirty(item, true, true, SFModelManager$1.MappingSourceComponentRetrieved, component.uuid);
                                        }
                                    }
                                    this.syncManager.sync().then(function (response) {
                                        // Allow handlers to be notified when a save begins and ends, to update the UI
                                        var saveMessage = Object.assign({}, message);
                                        saveMessage.action =
                                            response && response.error ? 'save-error' : 'save-success';
                                        _this.replyToMessage(component, message, {
                                            error: response && response.error
                                        });
                                        _this.handleMessage(component, saveMessage);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        SNComponentManager.prototype.handleDuplicateItemMessage = function (component, message) {
            var _this = this;
            var itemParams = message.data.item;
            var item = this.modelManager.findItem(itemParams.uuid);
            var requiredPermissions = [
                {
                    name: 'stream-items',
                    content_types: [item.content_type]
                }
            ];
            this.runWithPermissions(component, requiredPermissions, function () {
                var duplicate = _this.modelManager.duplicateItemAndAdd(item);
                _this.syncManager.sync();
                _this.replyToMessage(component, message, {
                    item: _this.jsonForItem(duplicate, component)
                });
            });
        };
        SNComponentManager.prototype.handleCreateItemsMessage = function (component, message) {
            var _this = this;
            var responseItems = message.data.item
                ? [message.data.item]
                : message.data.items;
            var uniqueContentTypes = uniq_1(responseItems.map(function (item) {
                return item.content_type;
            }));
            var requiredPermissions = [
                {
                    name: 'stream-items',
                    content_types: uniqueContentTypes
                }
            ];
            this.runWithPermissions(component, requiredPermissions, function () {
                _this.removePrivatePropertiesFromResponseItems(responseItems, component, {
                    type: 'incoming'
                });
                var processedItems = [];
                for (var _i = 0, responseItems_4 = responseItems; _i < responseItems_4.length; _i++) {
                    var responseItem = responseItems_4[_i];
                    var item = _this.modelManager.createItem(responseItem);
                    if (responseItem.clientData) {
                        item.setDomainDataItem(component.getClientDataKey(), responseItem.clientData, SNComponentManager.ClientDataDomain);
                    }
                    _this.modelManager.addItem(item);
                    _this.modelManager.resolveReferencesForItem(item, true);
                    _this.modelManager.setItemDirty(item, true);
                    processedItems.push(item);
                }
                _this.syncManager.sync();
                // "create-item" or "create-items" are possible messages handled here
                var reply = message.action == 'create-item'
                    ? { item: _this.jsonForItem(processedItems[0], component) }
                    : {
                        items: processedItems.map(function (item) {
                            return _this.jsonForItem(item, component);
                        })
                    };
                _this.replyToMessage(component, message, reply);
            });
        };
        SNComponentManager.prototype.handleDeleteItemsMessage = function (component, message) {
            var _this = this;
            var requiredContentTypes = uniq_1(message.data.items.map(function (i) {
                return i.content_type;
            })).sort();
            var requiredPermissions = [
                {
                    name: 'stream-items',
                    content_types: requiredContentTypes
                }
            ];
            this.runWithPermissions(component, requiredPermissions, function () { return __awaiter(_this, void 0, void 0, function () {
                var itemsData, noun, reply, didConfirm, _i, itemsData_1, itemData, model;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            itemsData = message.data.items;
                            noun = itemsData.length == 1 ? 'item' : 'items';
                            didConfirm = true;
                            return [4 /*yield*/, this.alertManager
                                    .confirm({
                                    text: "Are you sure you want to delete " + itemsData.length + " " + noun + "?"
                                })
                                    .catch(function () {
                                    didConfirm = false;
                                })];
                        case 1:
                            _a.sent();
                            if (didConfirm) {
                                // Filter for any components and deactivate before deleting
                                for (_i = 0, itemsData_1 = itemsData; _i < itemsData_1.length; _i++) {
                                    itemData = itemsData_1[_i];
                                    model = this.modelManager.findItem(itemData.uuid);
                                    if (!model) {
                                        this.alertManager.alert({
                                            text: "The item you are trying to delete cannot be found."
                                        });
                                        continue;
                                    }
                                    if (['SN|Component', 'SN|Theme'].includes(model.content_type)) {
                                        this.deactivateComponent(model, true);
                                    }
                                    this.modelManager.setItemToBeDeleted(model);
                                    // Currently extensions are not notified of association until a full server sync completes.
                                    // We manually notify observers.
                                    this.modelManager.notifySyncObserversOfModels([model], SFModelManager$1.MappingSourceRemoteSaved);
                                }
                                this.syncManager.sync();
                                reply = { deleted: true };
                            }
                            else {
                                // Rejected by user
                                reply = { deleted: false };
                            }
                            this.replyToMessage(component, message, reply);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        SNComponentManager.prototype.handleRequestPermissionsMessage = function (component, message) {
            var _this = this;
            this.runWithPermissions(component, message.data.permissions, function () {
                _this.replyToMessage(component, message, { approved: true });
            });
        };
        SNComponentManager.prototype.handleSetComponentDataMessage = function (component, message) {
            var _this = this;
            // A component setting its own data does not require special permissions
            this.runWithPermissions(component, [], function () {
                component.componentData = message.data.componentData;
                _this.modelManager.setItemDirty(component, true);
                _this.syncManager.sync();
            });
        };
        SNComponentManager.prototype.handleToggleComponentMessage = function (sourceComponent, targetComponent, message) {
            this.toggleComponent(targetComponent);
        };
        SNComponentManager.prototype.toggleComponent = function (component) {
            var _this = this;
            if (component.area == 'modal') {
                this.openModalComponent(component);
            }
            else {
                if (component.active) {
                    this.deactivateComponent(component);
                }
                else {
                    if (component.content_type == 'SN|Theme') {
                        // Deactive currently active theme if new theme is not layerable
                        var activeThemes = this.getActiveThemes();
                        // Activate current before deactivating others, so as not to flicker
                        this.activateComponent(component);
                        if (!component.isLayerable()) {
                            setTimeout(function () {
                                for (var _i = 0, activeThemes_1 = activeThemes; _i < activeThemes_1.length; _i++) {
                                    var theme = activeThemes_1[_i];
                                    if (theme && !theme.isLayerable()) {
                                        _this.deactivateComponent(theme);
                                    }
                                }
                            }, 10);
                        }
                    }
                    else {
                        this.activateComponent(component);
                    }
                }
            }
        };
        SNComponentManager.prototype.handleInstallLocalComponentMessage = function (sourceComponent, message) {
            // Only extensions manager has this permission
            if (this.nativeExtManager &&
                !this.nativeExtManager.isSystemExtension(sourceComponent)) {
                return;
            }
            var targetComponent = this.modelManager.findItem(message.data.uuid);
            this.desktopManager.installComponent(targetComponent);
        };
        SNComponentManager.prototype.runWithPermissions = function (component, requiredPermissions, runFunction) {
            if (!component.permissions) {
                component.permissions = [];
            }
            // Make copy as not to mutate input values
            requiredPermissions = JSON.parse(JSON.stringify(requiredPermissions));
            var acquiredPermissions = component.permissions;
            var _loop_4 = function (required) {
                // Remove anything we already have
                var respectiveAcquired = acquiredPermissions.find(function (candidate) { return candidate.name == required.name; });
                if (!respectiveAcquired) {
                    return "continue";
                }
                // We now match on name, lets substract from required.content_types anything we have in acquired.
                var requiredContentTypes = required.content_types;
                if (!requiredContentTypes) {
                    // If this permission does not require any content types (i.e stream-context-item)
                    // then we can remove this from required since we match by name (respectiveAcquired.name == required.name)
                    pull_1(requiredPermissions, required);
                    return "continue";
                }
                for (var _i = 0, _a = respectiveAcquired.content_types; _i < _a.length; _i++) {
                    var acquiredContentType = _a[_i];
                    // console.log("Removing content_type", acquiredContentType, "from", requiredContentTypes);
                    pull_1(requiredContentTypes, acquiredContentType);
                }
                if (requiredContentTypes.length == 0) {
                    // We've removed all acquired and end up with zero, means we already have all these permissions
                    pull_1(requiredPermissions, required);
                }
            };
            for (var _i = 0, _a = requiredPermissions.slice(); _i < _a.length; _i++) {
                var required = _a[_i];
                _loop_4(required);
            }
            if (requiredPermissions.length > 0) {
                this.promptForPermissions(component, requiredPermissions, function (approved) {
                    if (approved) {
                        runFunction();
                    }
                });
            }
            else {
                runFunction();
            }
        };
        SNComponentManager.prototype.promptForPermissions = function (component, permissions, callback) {
            var _this = this;
            var params = {};
            params.component = component;
            params.permissions = permissions;
            params.permissionsString = this.permissionsStringForPermissions(permissions, component);
            params.actionBlock = callback;
            params.callback = function (approved) {
                if (approved) {
                    var _loop_5 = function (permission) {
                        var matchingPermission = component.permissions.find(function (candidate) { return candidate.name == permission.name; });
                        if (!matchingPermission) {
                            component.permissions.push(permission);
                        }
                        else {
                            // Permission already exists, but content_types may have been expanded
                            var contentTypes = matchingPermission.content_types || [];
                            matchingPermission.content_types = uniq_1(contentTypes.concat(permission.content_types));
                        }
                    };
                    for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
                        var permission = permissions_1[_i];
                        _loop_5(permission);
                    }
                    _this.modelManager.setItemDirty(component, true);
                    _this.syncManager.sync();
                }
                _this.permissionDialogs = _this.permissionDialogs.filter(function (pendingDialog) {
                    // Remove self
                    if (pendingDialog == params) {
                        pendingDialog.actionBlock && pendingDialog.actionBlock(approved);
                        return false;
                    }
                    var containsObjectSubset = function (source, target) {
                        return !target.some(function (val) {
                            return !source.find(function (candidate) { return JSON.stringify(candidate) === JSON.stringify(val); });
                        });
                    };
                    if (pendingDialog.component == component) {
                        // remove pending dialogs that are encapsulated by already approved permissions, and run its function
                        if (pendingDialog.permissions == permissions ||
                            containsObjectSubset(permissions, pendingDialog.permissions)) {
                            // If approved, run the action block. Otherwise, if canceled, cancel any pending ones as well, since the user was
                            // explicit in their intentions
                            if (approved) {
                                pendingDialog.actionBlock && pendingDialog.actionBlock(approved);
                            }
                            return false;
                        }
                    }
                    return true;
                });
                if (_this.permissionDialogs.length > 0) {
                    _this.presentPermissionsDialog(_this.permissionDialogs[0]);
                }
            };
            // since these calls are asyncronous, multiple dialogs may be requested at the same time. We only want to present one and trigger all callbacks based on one modal result
            var existingDialog = find_1(this.permissionDialogs, {
                component: component
            });
            this.permissionDialogs.push(params);
            if (!existingDialog) {
                this.presentPermissionsDialog(params);
            }
            else {
                console.log('Existing dialog, not presenting.');
            }
        };
        SNComponentManager.prototype.presentPermissionsDialog = function (dialog) {
            console.error('Must override');
        };
        SNComponentManager.prototype.openModalComponent = function (component) {
            console.error('Must override');
        };
        SNComponentManager.prototype.registerHandler = function (handler) {
            this.handlers.push(handler);
        };
        SNComponentManager.prototype.deregisterHandler = function (identifier) {
            var handler = find_1(this.handlers, { identifier: identifier });
            if (!handler) {
                console.log('Attempting to deregister non-existing handler');
                return;
            }
            this.handlers.splice(this.handlers.indexOf(handler), 1);
        };
        // Called by other views when the iframe is ready
        SNComponentManager.prototype.registerComponentWindow = function (component, componentWindow) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (component.window === componentWindow) {
                                if (this.loggingEnabled) {
                                    console.log('Web|componentManager', 'attempting to re-register same component window.');
                                }
                            }
                            if (this.loggingEnabled) {
                                console.log('Web|componentManager|registerComponentWindow', component);
                            }
                            component.window = componentWindow;
                            _a = component;
                            return [4 /*yield*/, this.SFJS.crypto.generateUUID()];
                        case 1:
                            _a.sessionKey = _b.sent();
                            this.sendMessageToComponent(component, {
                                action: 'component-registered',
                                sessionKey: component.sessionKey,
                                componentData: component.componentData,
                                data: {
                                    uuid: component.uuid,
                                    environment: this.environment,
                                    platform: this.platform,
                                    activeThemeUrls: this.urlsForActiveThemes()
                                }
                            });
                            this.postActiveThemesToComponent(component);
                            if (this.desktopManager) {
                                this.desktopManager.notifyComponentActivation(component);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SNComponentManager.prototype.activateComponent = function (component, dontSync) {
            if (dontSync === void 0) { dontSync = false; }
            var didChange = component.active != true;
            component.active = true;
            var _loop_6 = function (handler) {
                if (handler.areas.includes(component.area) ||
                    handler.areas.includes('*')) {
                    // We want to run the handler in a $timeout so the UI updates, but we also don't want it to run asyncronously
                    // so that the steps below this one are run before the handler. So we run in a waitTimeout.
                    // Update 12/18: We were using this.waitTimeout previously, however, that caused the iframe.onload callback to never be called
                    // for some reason for iframes on desktop inside the revision-preview-modal. So we'll use safeApply instead. I'm not quite sure
                    // where the original "so the UI updates" comment applies to, but we'll have to keep an eye out to see if this causes problems somewhere else.
                    this_2.$uiRunner(function () {
                        handler.activationHandler && handler.activationHandler(component);
                    });
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                _loop_6(handler);
            }
            if (didChange && !dontSync) {
                this.modelManager.setItemDirty(component, true);
                this.syncManager.sync();
            }
            if (!this.activeComponents.includes(component)) {
                this.activeComponents.push(component);
            }
            if (component.area == 'themes') {
                this.postActiveThemesToAllComponents();
            }
        };
        SNComponentManager.prototype.deactivateComponent = function (component, dontSync) {
            if (dontSync === void 0) { dontSync = false; }
            var didChange = component.active != false;
            component.active = false;
            component.sessionKey = null;
            var _loop_7 = function (handler) {
                if (handler.areas.includes(component.area) ||
                    handler.areas.includes('*')) {
                    // See comment in activateComponent regarding safeApply and awaitTimeout
                    this_3.$uiRunner(function () {
                        handler.activationHandler && handler.activationHandler(component);
                    });
                }
            };
            var this_3 = this;
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                _loop_7(handler);
            }
            if (didChange && !dontSync) {
                this.modelManager.setItemDirty(component, true);
                this.syncManager.sync();
            }
            pull_1(this.activeComponents, component);
            this.streamObservers = this.streamObservers.filter(function (o) {
                return o.component !== component;
            });
            this.contextStreamObservers = this.contextStreamObservers.filter(function (o) {
                return o.component !== component;
            });
            if (component.area == 'themes') {
                this.postActiveThemesToAllComponents();
            }
        };
        SNComponentManager.prototype.reloadComponent = function (component) {
            return __awaiter(this, void 0, void 0, function () {
                var _loop_8, this_4, _i, _a, handler;
                var _this = this;
                return __generator(this, function (_b) {
                    //
                    // Do soft deactivate
                    //
                    component.active = false;
                    _loop_8 = function (handler) {
                        if (handler.areas.includes(component.area) ||
                            handler.areas.includes('*')) {
                            // See comment in activateComponent regarding safeApply and awaitTimeout
                            this_4.$uiRunner(function () {
                                handler.activationHandler && handler.activationHandler(component);
                            });
                        }
                    };
                    this_4 = this;
                    for (_i = 0, _a = this.handlers; _i < _a.length; _i++) {
                        handler = _a[_i];
                        _loop_8(handler);
                    }
                    this.streamObservers = this.streamObservers.filter(function (o) {
                        return o.component !== component;
                    });
                    this.contextStreamObservers = this.contextStreamObservers.filter(function (o) {
                        return o.component !== component;
                    });
                    if (component.area == 'themes') {
                        this.postActiveThemesToAllComponents();
                    }
                    //
                    // Do soft activate
                    //
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.$timeout(function () {
                                component.active = true;
                                for (var _i = 0, _a = _this.handlers; _i < _a.length; _i++) {
                                    var handler = _a[_i];
                                    if (handler.areas.includes(component.area) ||
                                        handler.areas.includes('*')) {
                                        // See comment in activateComponent regarding safeApply and awaitTimeout
                                        _this.$uiRunner(function () {
                                            handler.activationHandler && handler.activationHandler(component);
                                            resolve();
                                        });
                                    }
                                }
                                if (!_this.activeComponents.includes(component)) {
                                    _this.activeComponents.push(component);
                                }
                                if (component.area == 'themes') {
                                    _this.postActiveThemesToAllComponents();
                                }
                                // Resolve again in case first resolve in for loop isn't reached.
                                // Should be no effect if resolved twice, only first will be used.
                                resolve();
                            });
                        })];
                });
            });
        };
        SNComponentManager.prototype.deleteComponent = function (component) {
            this.modelManager.setItemToBeDeleted(component);
            this.syncManager.sync();
        };
        SNComponentManager.prototype.isComponentActive = function (component) {
            return component.active;
        };
        SNComponentManager.prototype.iframeForComponent = function (component) {
            for (var _i = 0, _a = Array.from(document.getElementsByTagName('iframe')); _i < _a.length; _i++) {
                var frame = _a[_i];
                var componentId = frame.dataset.componentId;
                if (componentId === component.uuid) {
                    return frame;
                }
            }
        };
        SNComponentManager.prototype.focusChangedForComponent = function (component) {
            var focused = document.activeElement == this.iframeForComponent(component);
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                // Notify all handlers, and not just ones that match this component type
                handler.focusHandler && handler.focusHandler(component, focused);
            }
        };
        SNComponentManager.prototype.handleSetSizeEvent = function (component, data) {
            var setSize = function (element, size) {
                var widthString = typeof size.width === 'string' ? size.width : data.width + "px";
                var heightString = typeof size.height === 'string' ? size.height : data.height + "px";
                if (element) {
                    element.setAttribute('style', "width:" + widthString + "; height:" + heightString + ";");
                }
            };
            if (component.area == 'rooms' || component.area == 'modal') {
                var selector = component.area == 'rooms' ? 'inner' : 'outer';
                var content = document.getElementById("component-content-" + selector + "-" + component.uuid);
                if (content) {
                    setSize(content, data);
                }
            }
            else {
                var iframe = this.iframeForComponent(component);
                if (!iframe) {
                    return;
                }
                setSize(iframe, data);
                // On Firefox, resizing a component iframe does not seem to have an effect with editor-stack extensions.
                // Sizing the parent does the trick, however, we can't do this globally, otherwise, areas like the note-tags will
                // not be able to expand outside of the bounds (to display autocomplete, for example).
                if (component.area == 'editor-stack') {
                    var parent_1 = iframe.parentElement;
                    if (parent_1) {
                        setSize(parent_1, data);
                    }
                }
                // content object in this case is === to the iframe object above. This is probably
                // legacy code from when we would size content and container individually, which we no longer do.
                // var content = document.getElementById(`component-iframe-${component.uuid}`);
                // console.log("content === iframe", content == iframe);
                // if(content) {
                //   setSize(content, data);
                // }
            }
        };
        SNComponentManager.prototype.editorForNote = function (note) {
            var editors = this.componentsForArea('editor-editor');
            for (var _i = 0, editors_1 = editors; _i < editors_1.length; _i++) {
                var editor = editors_1[_i];
                if (editor.isExplicitlyEnabledForItem(note)) {
                    return editor;
                }
            }
            // No editor found for note. Use default editor, if note does not prefer system editor
            if (this.isMobile) {
                if (!note.content.mobilePrefersPlainEditor) {
                    return this.getDefaultEditor();
                }
            }
            else {
                if (!note.getAppDataItem('prefersPlainEditor')) {
                    return editors.filter(function (e) {
                        return e.isDefaultEditor();
                    })[0];
                }
            }
        };
        SNComponentManager.prototype.getDefaultEditor = function () {
            throw new Error('Method not implemented.');
        };
        SNComponentManager.prototype.permissionsStringForPermissions = function (permissions, component) {
            var _this = this;
            var finalString = '';
            var permissionsCount = permissions.length;
            var addSeparator = function (index, length) {
                if (index > 0) {
                    if (index == length - 1) {
                        if (length == 2) {
                            return ' and ';
                        }
                        else {
                            return ', and ';
                        }
                    }
                    else {
                        return ', ';
                    }
                }
                return '';
            };
            permissions.forEach(function (permission, index) {
                if (permission.name === 'stream-items') {
                    var types = permission.content_types.map(function (type) {
                        var desc = _this.modelManager.humanReadableDisplayForContentType(type);
                        if (desc) {
                            return desc + 's';
                        }
                        else {
                            return 'items of type ' + type;
                        }
                    });
                    var typesString = '';
                    for (var i = 0; i < types.length; i++) {
                        var type = types[i];
                        typesString += addSeparator(i, types.length + permissionsCount - index - 1);
                        typesString += type;
                    }
                    finalString += addSeparator(index, permissionsCount);
                    finalString += typesString;
                    if (types.length >= 2 && index < permissionsCount - 1) {
                        // If you have a list of types, and still an additional root-level permission coming up, add a comma
                        finalString += ', ';
                    }
                }
                else if (permission.name === 'stream-context-item') {
                    var mapping = {
                        'editor-stack': 'working note',
                        'note-tags': 'working note',
                        'editor-editor': 'working note'
                    };
                    finalString += addSeparator(index, permissionsCount);
                    finalString += mapping[component.area];
                }
            });
            return finalString + '.';
        };
        /* This domain will be used to save context item client data */
        SNComponentManager.ClientDataDomain = 'org.standardnotes.sn.components';
        return SNComponentManager;
    }());

    exports.SNComponent = SNComponent;
    exports.SNComponentManager = SNComponentManager;
    exports.SNEditor = SNEditor;
    exports.SNEncryptedStorage = SNEncryptedStorage;
    exports.SNExtension = SNExtension;
    exports.SNMfa = SNMfa;
    exports.SNNote = SNNote;
    exports.SNServerExtension = SNServerExtension;
    exports.SNSmartTag = SNSmartTag;
    exports.SNTag = SNTag;
    exports.SNTheme = SNTheme;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=snjs.umd.js.map
