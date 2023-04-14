(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@mctech/kaka-grid'), require('element-resize-detector')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', '@mctech/kaka-grid', 'element-resize-detector'], factory) :
  (global = global || self, factory(global.VueKakaGrid = {}, global.Vue, global.kakaGrid, global.elementResizeDetectorMaker));
}(this, (function (exports, Vue, kakaGrid, elementResizeDetectorMaker) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  kakaGrid = kakaGrid && Object.prototype.hasOwnProperty.call(kakaGrid, 'default') ? kakaGrid['default'] : kakaGrid;
  elementResizeDetectorMaker = elementResizeDetectorMaker && Object.prototype.hasOwnProperty.call(elementResizeDetectorMaker, 'default') ? elementResizeDetectorMaker['default'] : elementResizeDetectorMaker;

  var detector;

  function getDetector() {
    if (!detector) {
      detector = elementResizeDetectorMaker({
        strategy: 'scroll',
        callOnAdd: true
      });
    }

    return detector;
  }

  function dispatchResizeEvent(el) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('elementresize', false, true, null);
    return el.dispatchEvent(event);
  }

  Vue.directive('resize-detector', {
    bind: function bind(el) {
      getDetector().listenTo(el, dispatchResizeEvent);
    },
    unbind: function unbind(el) {
      getDetector().removeListener(el, dispatchResizeEvent);
    }
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

  var toString$1 = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return nativeGetOwnPropertyNames(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : nativeGetOwnPropertyNames(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$5
  };

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var f$6 = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
  	f: f$6
  };

  var defineProperty = objectDefineProperty.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var defineProperty$1 = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$1 = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE$1];
  var $Symbol = global_1.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty$1 = objectDefineProperty.f;
  var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore$1 = shared('wks');
  var QObject = global_1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty$1({}, 'a', {
      get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty$1(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty$1;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);
    if (has(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty$1(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable$1.call(this, P);
    if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.github.io/ecma262/#sec-symbol-constructor
  if (!nativeSymbol) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable;
    objectDefineProperty.f = $defineProperty;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
    defineWellKnownSymbol(name);
  });

  _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
    // `Symbol.for` method
    // https://tc39.github.io/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.github.io/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
    // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.github.io/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!isArray(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys[HIDDEN] = true;

  var defineProperty$2 = objectDefineProperty.f;


  var NativeSymbol = global_1.Symbol;

  if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var native = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$2(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `Symbol.iterator` well-known symbol
  // https://tc39.github.io/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol('iterator');

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var defineProperty$3 = Object.defineProperty;
  var cache = {};

  var thrower = function (it) { throw it; };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = { length: -1 };

      if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  var $filter = arrayIteration.filter;



  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
  // Edge 14- issue
  var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach$1 = arrayIteration.forEach;



  var STRICT_METHOD = arrayMethodIsStrict('forEach');
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH$1) ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  } : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
    forEach: arrayForEach
  });

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var iterators = {};

  var ITERATOR = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$1] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.github.io/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.github.io/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR$3)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.github.io/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$2 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$2 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var defineProperty$4 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.github.io/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty$4(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$5 = objectDefineProperty.f;
  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global_1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.github.io/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  // `Number` constructor
  // https://tc39.github.io/ecma262/#sec-number-constructor
  if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
          ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j = 0, key; keys$1.length > j; j++) {
      if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
        defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

  var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


  var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
  var FORCED = !descriptors || FAILS_ON_PRIMITIVES;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  _export({ target: 'Object', stat: true, forced: FORCED, sham: !descriptors }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
    }
  });

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  _export({ target: 'Object', stat: true, sham: !descriptors }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject(object);
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var keys = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;
      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty(result, key, descriptor);
      }
      return result;
    }
  });

  var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var nativePromiseConstructor = global_1.Promise;

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES
            ? boundFunction(anObject(step = iterable[index])[0], step[1])
            : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
  });

  var SPECIES$4 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.github.io/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

  var location = global_1.location;
  var set$1 = global_1.setImmediate;
  var clear = global_1.clearImmediate;
  var process$1 = global_1.process;
  var MessageChannel = global_1.MessageChannel;
  var Dispatch = global_1.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global_1.postMessage(id + '', location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set$1 || !clear) {
    set$1 = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (classofRaw(process$1) == 'process') {
      defer = function (id) {
        process$1.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !engineIsIos) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = functionBindContext(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global_1.addEventListener &&
      typeof postMessage == 'function' &&
      !global_1.importScripts &&
      !fails(post) &&
      location.protocol !== 'file:'
    ) {
      defer = post;
      global_1.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
      defer = function (id) {
        html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task = {
    set: set$1,
    clear: clear
  };

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

  var macrotask = task.set;


  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var process$2 = global_1.process;
  var Promise$1 = global_1.Promise;
  var IS_NODE = classofRaw(process$2) == 'process';
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE && (parent = process$2.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (IS_NODE) {
      notify = function () {
        process$2.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    } else if (MutationObserver && !engineIsIos) {
      toggle = true;
      node = document.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      then = promise.then;
      notify = function () {
        then.call(promise, flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global_1, flush);
      };
    }
  }

  var microtask = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // 25.4.1.5 NewPromiseCapability(C)
  var f$7 = function (C) {
    return new PromiseCapability(C);
  };

  var newPromiseCapability = {
  	f: f$7
  };

  var promiseResolve = function (C, x) {
    anObject(C);
    if (isObject(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var hostReportErrors = function (a, b) {
    var console = global_1.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var task$1 = task.set;










  var SPECIES$5 = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState$2 = internalState.get;
  var setInternalState$2 = internalState.set;
  var getInternalPromiseState = internalState.getterFor(PROMISE);
  var PromiseConstructor = nativePromiseConstructor;
  var TypeError$1 = global_1.TypeError;
  var document$2 = global_1.document;
  var process$3 = global_1.process;
  var $fetch = getBuiltIn('fetch');
  var newPromiseCapability$1 = newPromiseCapability.f;
  var newGenericPromiseCapability = newPromiseCapability$1;
  var IS_NODE$1 = classofRaw(process$3) == 'process';
  var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED$1 = isForced_1(PROMISE, function () {
    var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
    if (!GLOBAL_CORE_JS_PROMISE) {
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (engineV8Version === 66) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
    }
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = PromiseConstructor.resolve(1);
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$5] = FakePromise;
    return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
  });

  var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify$1 = function (promise, state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(promise, state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$2.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global_1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (handler = global_1['on' + name]) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (promise, state) {
    task$1.call(global_1, function () {
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE$1) {
            process$3.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (promise, state) {
    task$1.call(global_1, function () {
      if (IS_NODE$1) {
        process$3.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, promise, state, unwrap) {
    return function (value) {
      fn(promise, state, value, unwrap);
    };
  };

  var internalReject = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify$1(promise, state, true);
  };

  var internalResolve = function (promise, state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(value,
              bind(internalResolve, promise, wrapper, state),
              bind(internalReject, promise, wrapper, state)
            );
          } catch (error) {
            internalReject(promise, wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify$1(promise, state, false);
      }
    } catch (error) {
      internalReject(promise, { done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED$1) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      var state = getInternalState$2(this);
      try {
        executor(bind(internalResolve, this, state), bind(internalReject, this, state));
      } catch (error) {
        internalReject(this, state, error);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      setInternalState$2(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromiseConstructor.prototype, {
      // `Promise.prototype.then` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify$1(this, state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState$2(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, promise, state);
      this.reject = bind(internalReject, promise, state);
    };
    newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if ( typeof nativePromiseConstructor == 'function') {
      nativeThen = nativePromiseConstructor.prototype.then;

      // wrap native Promise#then for native async functions
      redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // wrap fetch result
      if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
        // eslint-disable-next-line no-unused-vars
        fetch: function fetch(input /* , init */) {
          return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
        }
      });
    }
  }

  _export({ global: true, wrap: true, forced: FORCED$1 }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  _export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
    // `Promise.reject` method
    // https://tc39.github.io/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability$1(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  _export({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
    // `Promise.resolve` method
    // https://tc39.github.io/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve( this, x);
    }
  });

  _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
    // `Promise.all` method
    // https://tc39.github.io/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate_1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          $promiseResolve.call(C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.github.io/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability$1(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        iterate_1(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = internalState.set;
  var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$3(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$3(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  }

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME$1 in domIterables) {
    var Collection$1 = global_1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
      } catch (error) {
        CollectionPrototype$1[ITERATOR$5] = ArrayValues;
      }
      if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
      }
      if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  // `Symbol.asyncIterator` well-known symbol
  // https://tc39.github.io/ecma262/#sec-symbol.asynciterator
  defineWellKnownSymbol('asyncIterator');

  // `Symbol.toStringTag` well-known symbol
  // https://tc39.github.io/ecma262/#sec-symbol.tostringtag
  defineWellKnownSymbol('toStringTag');

  // JSON[@@toStringTag] property
  // https://tc39.github.io/ecma262/#sec-json-@@tostringtag
  setToStringTag(global_1.JSON, 'JSON', true);

  // Math[@@toStringTag] property
  // https://tc39.github.io/ecma262/#sec-math-@@tostringtag
  setToStringTag(Math, 'Math', true);

  var FAILS_ON_PRIMITIVES$2 = fails(function () { objectGetPrototypeOf(1); });

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !correctPrototypeGetter }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return objectGetPrototypeOf(toObject(it));
    }
  });

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
  var runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  var $map = arrayIteration.map;



  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');
  // FF49- issue
  var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map');

  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$3 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $includes = arrayIncludes.includes;



  var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$4 }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  function isFunction(v) {
    return typeof v === 'function';
  }
  function isString(v) {
    return typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]';
  }

  var $indexOf = arrayIncludes.indexOf;



  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
  var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$5 }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y,
  	BROKEN_CARET: BROKEN_CARET
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }
      return match;
    };
  }

  var regexpExec = patchedExec;

  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$6 = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    return 'a'.replace(/./, '$0') === '$0';
  })();

  var REPLACE = wellKnownSymbol('replace');
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$6] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }, {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
    }

    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var max$2 = Math.max;
  var min$2 = Math.min;
  var floor$1 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$2(min$2(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$1(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var arrayPush = [].push;
  var min$3 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SUPPORTS_Y);

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  _export({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return URL.prototype.toString.call(this);
    }
  });

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
  var dayjs_min = createCommonjsModule(function (module, exports) {
    !function (t, e) {
       module.exports = e() ;
    }(commonjsGlobal, function () {

      var t = "millisecond",
          e = "second",
          n = "minute",
          r = "hour",
          i = "day",
          s = "week",
          u = "month",
          o = "quarter",
          a = "year",
          h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
          f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
          c = function c(t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
      },
          d = {
        s: c,
        z: function z(t) {
          var e = -t.utcOffset(),
              n = Math.abs(e),
              r = Math.floor(n / 60),
              i = n % 60;
          return (e <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");
        },
        m: function m(t, e) {
          var n = 12 * (e.year() - t.year()) + (e.month() - t.month()),
              r = t.clone().add(n, u),
              i = e - r < 0,
              s = t.clone().add(n + (i ? -1 : 1), u);
          return Number(-(n + (e - r) / (i ? r - s : s - r)) || 0);
        },
        a: function a(t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function p(h) {
          return {
            M: u,
            y: a,
            w: s,
            d: i,
            D: "date",
            h: r,
            m: n,
            s: e,
            ms: t,
            Q: o
          }[h] || String(h || "").toLowerCase().replace(/s$/, "");
        },
        u: function u(t) {
          return void 0 === t;
        }
      },
          $ = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
      },
          l = "en",
          m = {};

      m[l] = $;

      var y = function y(t) {
        return t instanceof v;
      },
          M = function M(t, e, n) {
        var r;
        if (!t) return l;
        if ("string" == typeof t) m[t] && (r = t), e && (m[t] = e, r = t);else {
          var i = t.name;
          m[i] = t, r = i;
        }
        return !n && r && (l = r), r || !n && l;
      },
          g = function g(t, e) {
        if (y(t)) return t.clone();
        var n = "object" == _typeof$1(e) ? e : {};
        return n.date = t, n.args = arguments, new v(n);
      },
          D = d;

      D.l = M, D.i = y, D.w = function (t, e) {
        return g(t, {
          locale: e.$L,
          utc: e.$u,
          $offset: e.$offset
        });
      };

      var v = function () {
        function c(t) {
          this.$L = this.$L || M(t.locale, null, !0), this.parse(t);
        }

        var d = c.prototype;
        return d.parse = function (t) {
          this.$d = function (t) {
            var e = t.date,
                n = t.utc;
            if (null === e) return new Date(NaN);
            if (D.u(e)) return new Date();
            if (e instanceof Date) return new Date(e);

            if ("string" == typeof e && !/Z$/i.test(e)) {
              var r = e.match(h);
              if (r) return n ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);
            }

            return new Date(e);
          }(t), this.init();
        }, d.init = function () {
          var t = this.$d;
          this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, d.$utils = function () {
          return D;
        }, d.isValid = function () {
          return !("Invalid Date" === this.$d.toString());
        }, d.isSame = function (t, e) {
          var n = g(t);
          return this.startOf(e) <= n && n <= this.endOf(e);
        }, d.isAfter = function (t, e) {
          return g(t) < this.startOf(e);
        }, d.isBefore = function (t, e) {
          return this.endOf(e) < g(t);
        }, d.$g = function (t, e, n) {
          return D.u(t) ? this[e] : this.set(n, t);
        }, d.year = function (t) {
          return this.$g(t, "$y", a);
        }, d.month = function (t) {
          return this.$g(t, "$M", u);
        }, d.day = function (t) {
          return this.$g(t, "$W", i);
        }, d.date = function (t) {
          return this.$g(t, "$D", "date");
        }, d.hour = function (t) {
          return this.$g(t, "$H", r);
        }, d.minute = function (t) {
          return this.$g(t, "$m", n);
        }, d.second = function (t) {
          return this.$g(t, "$s", e);
        }, d.millisecond = function (e) {
          return this.$g(e, "$ms", t);
        }, d.unix = function () {
          return Math.floor(this.valueOf() / 1e3);
        }, d.valueOf = function () {
          return this.$d.getTime();
        }, d.startOf = function (t, o) {
          var h = this,
              f = !!D.u(o) || o,
              c = D.p(t),
              d = function d(t, e) {
            var n = D.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h);
            return f ? n : n.endOf(i);
          },
              $ = function $(t, e) {
            return D.w(h.toDate()[t].apply(h.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), h);
          },
              l = this.$W,
              m = this.$M,
              y = this.$D,
              M = "set" + (this.$u ? "UTC" : "");

          switch (c) {
            case a:
              return f ? d(1, 0) : d(31, 11);

            case u:
              return f ? d(1, m) : d(0, m + 1);

            case s:
              var g = this.$locale().weekStart || 0,
                  v = (l < g ? l + 7 : l) - g;
              return d(f ? y - v : y + (6 - v), m);

            case i:
            case "date":
              return $(M + "Hours", 0);

            case r:
              return $(M + "Minutes", 1);

            case n:
              return $(M + "Seconds", 2);

            case e:
              return $(M + "Milliseconds", 3);

            default:
              return this.clone();
          }
        }, d.endOf = function (t) {
          return this.startOf(t, !1);
        }, d.$set = function (s, o) {
          var h,
              f = D.p(s),
              c = "set" + (this.$u ? "UTC" : ""),
              d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[n] = c + "Minutes", h[e] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],
              $ = f === i ? this.$D + (o - this.$W) : o;

          if (f === u || f === a) {
            var l = this.clone().set("date", 1);
            l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();
          } else d && this.$d[d]($);

          return this.init(), this;
        }, d.set = function (t, e) {
          return this.clone().$set(t, e);
        }, d.get = function (t) {
          return this[D.p(t)]();
        }, d.add = function (t, o) {
          var h,
              f = this;
          t = Number(t);

          var c = D.p(o),
              d = function d(e) {
            var n = g(f);
            return D.w(n.date(n.date() + Math.round(e * t)), f);
          };

          if (c === u) return this.set(u, this.$M + t);
          if (c === a) return this.set(a, this.$y + t);
          if (c === i) return d(1);
          if (c === s) return d(7);
          var $ = (h = {}, h[n] = 6e4, h[r] = 36e5, h[e] = 1e3, h)[c] || 1,
              l = this.$d.getTime() + t * $;
          return D.w(l, this);
        }, d.subtract = function (t, e) {
          return this.add(-1 * t, e);
        }, d.format = function (t) {
          var e = this;
          if (!this.isValid()) return "Invalid Date";

          var n = t || "YYYY-MM-DDTHH:mm:ssZ",
              r = D.z(this),
              i = this.$locale(),
              s = this.$H,
              u = this.$m,
              o = this.$M,
              a = i.weekdays,
              h = i.months,
              c = function c(t, r, i, s) {
            return t && (t[r] || t(e, n)) || i[r].substr(0, s);
          },
              d = function d(t) {
            return D.s(s % 12 || 12, t, "0");
          },
              $ = i.meridiem || function (t, e, n) {
            var r = t < 12 ? "AM" : "PM";
            return n ? r.toLowerCase() : r;
          },
              l = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: o + 1,
            MM: D.s(o + 1, 2, "0"),
            MMM: c(i.monthsShort, o, h, 3),
            MMMM: c(h, o),
            D: this.$D,
            DD: D.s(this.$D, 2, "0"),
            d: String(this.$W),
            dd: c(i.weekdaysMin, this.$W, a, 2),
            ddd: c(i.weekdaysShort, this.$W, a, 3),
            dddd: a[this.$W],
            H: String(s),
            HH: D.s(s, 2, "0"),
            h: d(1),
            hh: d(2),
            a: $(s, u, !0),
            A: $(s, u, !1),
            m: String(u),
            mm: D.s(u, 2, "0"),
            s: String(this.$s),
            ss: D.s(this.$s, 2, "0"),
            SSS: D.s(this.$ms, 3, "0"),
            Z: r
          };

          return n.replace(f, function (t, e) {
            return e || l[t] || r.replace(":", "");
          });
        }, d.utcOffset = function () {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, d.diff = function (t, h, f) {
          var c,
              d = D.p(h),
              $ = g(t),
              l = 6e4 * ($.utcOffset() - this.utcOffset()),
              m = this - $,
              y = D.m(this, $);
          return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[n] = m / 6e4, c[e] = m / 1e3, c)[d] || m, f ? y : D.a(y);
        }, d.daysInMonth = function () {
          return this.endOf(u).$D;
        }, d.$locale = function () {
          return m[this.$L];
        }, d.locale = function (t, e) {
          if (!t) return this.$L;
          var n = this.clone(),
              r = M(t, e, !0);
          return r && (n.$L = r), n;
        }, d.clone = function () {
          return D.w(this.$d, this);
        }, d.toDate = function () {
          return new Date(this.valueOf());
        }, d.toJSON = function () {
          return this.isValid() ? this.toISOString() : null;
        }, d.toISOString = function () {
          return this.$d.toISOString();
        }, d.toString = function () {
          return this.$d.toUTCString();
        }, c;
      }();

      return g.prototype = v.prototype, g.extend = function (t, e) {
        return t(e, v, g), g;
      }, g.locale = M, g.isDayjs = y, g.unix = function (t) {
        return g(1e3 * t);
      }, g.en = m[l], g.Ls = m, g;
    });
  });

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;
  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
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
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = _typeof$2(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof$2(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString$1 = objectProto.toString;
  /** Built-in value references. */

  var _Symbol = root.Symbol;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMin = Math.min;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString$1 = symbolProto ? symbolProto.toString : undefined;
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

    if (isSymbol$1(value)) {
      return symbolToString$1 ? symbolToString$1.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }
  /**
   * Creates a function like `_.round`.
   *
   * @private
   * @param {string} methodName The name of the `Math` method to use when rounding.
   * @returns {Function} Returns the new round function.
   */


  function createRound(methodName) {
    var func = Math[methodName];
    return function (number, precision) {
      number = toNumber$1(number);
      precision = nativeMin(toInteger$1(precision), 292);

      if (precision) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        var pair = (toString$2(number) + 'e').split('e'),
            value = func(pair[0] + 'e' + (+pair[1] + precision));
        pair = (toString$2(value) + 'e').split('e');
        return +(pair[0] + 'e' + (+pair[1] - precision));
      }

      return func(number);
    };
  }
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


  function isObject$1(value) {
    var type = _typeof$2(value);

    return !!value && (type == 'object' || type == 'function');
  }
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
    return !!value && _typeof$2(value) == 'object';
  }
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


  function isSymbol$1(value) {
    return _typeof$2(value) == 'symbol' || isObjectLike(value) && objectToString$1.call(value) == symbolTag;
  }
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

    value = toNumber$1(value);

    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }

    return value === value ? value : 0;
  }
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


  function toInteger$1(value) {
    var result = toFinite(value),
        remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }
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


  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol$1(value)) {
      return NAN;
    }

    if (isObject$1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$1(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
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


  function toString$2(value) {
    return value == null ? '' : baseToString(value);
  }
  /**
   * Computes `number` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */


  var round = createRound('round');
  var lodash_round = round;

  function getReadonly(rec, option, gridOption) {
    var readonly = isFunction(option.readonly) ? option.readonly(rec) : option.readonly !== undefined ? option.readonly : gridOption.readonly;
    return readonly;
  }

  function getCellStyle(rec, option, gridOption) {
    var readonly = getReadonly(rec, option, gridOption);
    var result = !readonly && ['captionLink', 'dangerLink', 'removeLink', 'buttonLink', 'modifyLink', 'treeLink'].indexOf(option.type) === -1;
    return result ? {
      innerBox: 'dashed'
    } : {};
  }

  function isNumberColumn(type) {
    return ['percent', 'unitPrice', 'quantity', 'price', 'number'].includes(type);
  }
  function convertColumnType(type, columnOption, format, _ref) {
    var option = _ref.option,
        gridOption = _ref.gridOption;
    var Column = kakaGrid.columns.type.Column;

    if (type === 'date') {
      var dateFormat = format || 'YYYY-MM-DD';
      columnOption.columnType = new Column({
        convert: function convert(value) {
          return value ? dayjs_min(value).format(dateFormat) : '';
        },
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      });
    } else if (isNumberColumn(type)) {
      var digits = isNaN(format) ? ['price', 'percent'].indexOf(type) === -1 ? 6 : 2 : parseInt(format);
      columnOption.columnType = new Column({
        convert: function convert(value) {
          return !value && value !== '0' && value !== 0 ? '' : lodash_round(value, digits);
        },
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      });
    } else if (type === 'no') {
      columnOption.columnType = new Column({
        convert: function convert(value, displayValue, cell, frozenInfo) {
          return cell.row - frozenInfo.frozenRowCount + 1;
        },
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      });
    } else {
      columnOption.columnType = new Column({
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      });
    }
  }

  var svg = "<svg t=\"1589881528523\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"16078\" width=\"200\" height=\"200\"><path d=\"M184 392V256h128v48c0 4.8 4 8 8 8h56c4 0 8-3.2 8-8v-48h256v48c0 4.8 4 8 8 8h56c4 0 8-3.2 8-8v-48h128v136H184z m656 448H184V460h656V840z m40-656H712v-64c0-4.8-4-8-8-8h-56c-4.8 0-8 3.2-8 8v64H384v-64c0-4.8-4-8-8-8h-56c-4 0-8 3.2-8 8v64H144c-17.6 0-32 14.4-32 32v664c0 17.6 14.4 32 32 32h736c17.6 0 32-14.4 32-32V216c0-17.6-14.4-32-32-32z\" p-id=\"16079\" fill=\"#666\"></path></svg>";

  function getAppearance(type) {

    if (type === 'date') {
      return {
        appearance: function appearance(active) {
          return {
            svg: svg,
            width: 14
          };
        }
      };
    }

    return {};
  }

  var $find = arrayIteration.find;



  var FIND = 'find';
  var SKIPS_HOLES = true;

  var USES_TO_LENGTH$6 = arrayMethodUsesToLength(FIND);

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$6 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var type = kakaGrid.columns.type;
  var map = {
    BUTTON: type.ButtonColumn,
    CHECK: type.CheckColumn,
    DATE: type.DateColumn,
    DEFAULT: type.Column,
    DRAW: type.DrawColumn,
    IMAGE: type.ImageColumn,
    LOOKUP: type.LookupColumn,
    MULTILINETEXT: type.MultilineTextColumn,
    NUMBER: type.NumberColumn,
    SWITCH: type.SwitchColumn,
    TREE: type.TreeColumn
  };

  var InlineInputEditor = kakaGrid.columns.action.InlineInputEditor;

  function isInlineEditorType(columnType) {
    columnType = isString(columnType) ? columnType.toUpperCase() : columnType;
    var allowTypes = ['DEFAULT', 'NUMBER', 'TREE', 'DATE'];
    return !columnType || (isString(columnType) ? allowTypes.indexOf(columnType) !== -1 : allowTypes.find(function (key) {
      return columnType instanceof map[key];
    }));
  }

  function convertInputType(columnType, type) {
    columnType = isString(columnType) ? columnType.toUpperCase() : columnType;
    return isNumberColumn(type) || columnType === 'NUMBER' || columnType instanceof map.NUMBER ? 'number' : type === 'date' ? 'date' : 'text';
  }

  function getAction(option) {
    var action = option.action,
        _option$gridReadonly = option.gridReadonly,
        gridReadonly = _option$gridReadonly === void 0 ? true : _option$gridReadonly,
        _option$readonly = option.readonly,
        optionReadonly = _option$readonly === void 0 ? gridReadonly : _option$readonly,
        type = option.type,
        columnType = option.columnType;
    var inputOptions = {
      type: convertInputType(columnType, type),
      classList: ['al-right'],
      readonly: function readonly(rec) {
        return !isFunction(optionReadonly) ? optionReadonly : optionReadonly(rec);
      }
    };

    if (type === 'date') {
      inputOptions.action = function (rec, info) {
        this.open(info.grid, info.cell);
      };
    }

    return !action && isInlineEditorType(columnType) ? new InlineInputEditor(inputOptions) : undefined;
  }

  var nativeAssign = Object.assign;
  var defineProperty$6 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  var objectAssign = !nativeAssign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$6({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$6(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  function warn(message) {
    console.warn('[kaka-grid]', '[!]', message);
  }

  var treeLink = function treeLink(option, gridOption, vm) {
    return {
      columnType: option.columnType || new kakaGrid.columns.type.TreeColumn({
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      }),
      style: function style(rec) {
        var _option$style;

        return getReadonly(rec, option, gridOption) ? {} : {
          color: ((_option$style = option.style) === null || _option$style === void 0 ? void 0 : _option$style.color) || gridOption.theme.primaryColor
        };
      },
      action: option.action || new kakaGrid.columns.action.ButtonAction({
        disabled: function disabled(rec) {
          return getReadonly(rec, option, gridOption);
        },
        action: option.onClick || function (rec) {
          return vm.$emit('buttonclick', {
            record: rec,
            field: option.field,
            value: option.field ? rec[option.field] : undefined,
            columnCaption: option.caption,
            buttonCaption: option.buttonCaption
          }, vm);
        }
      })
    };
  };

  var tree = function tree(option, gridOption, vm) {
    return {
      columnType: option.columnType || new kakaGrid.columns.type.TreeColumn({
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      })
    };
  };

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function getOptions(comboOptions, valueField, captionField) {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rec) {
        var options, records;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!isFunction(comboOptions)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return comboOptions(rec);

              case 3:
                _context.t0 = _context.sent;
                _context.next = 7;
                break;

              case 6:
                _context.t0 = comboOptions;

              case 7:
                options = _context.t0;
                records = (options || []).map(function (el) {
                  var _ref2;

                  return valueField in Object(el) ? el : (_ref2 = {}, _defineProperty(_ref2, valueField, el), _defineProperty(_ref2, captionField, el), _ref2);
                });
                return _context.abrupt("return", records);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  var comboBox = function comboBox(option, gridOption, vm) {
    var valueField = option.lookupValueField || 'value';
    var captionField = option.lookupLabelField || 'label';
    var records = getOptions(option.options, valueField, captionField);
    var readonly = option.readonly === true && gridOption.readonly === true;
    return {
      columnType: option.columnType || new kakaGrid.columns.type.LookupColumn({
        records: records,
        valueField: valueField,
        captionField: captionField,
        cellStyle: function cellStyle(rec) {
          return getCellStyle(rec, option, gridOption);
        }
      }),
      action: readonly !== true ? option.action || new kakaGrid.columns.action.InlineLookupEditor({
        records: records,
        valueField: valueField,
        captionField: captionField,
        readonly: function readonly(rec) {
          return isFunction(option.readonly) ? option.readonly(rec) : option.readonly !== undefined ? option.readonly : gridOption.readonly;
        },
        filterFields: option.filterFields || [option.captionField, option.valueField],
        allowOtherInput: option.AcceptInputValue,
        disableFilterSort: option.sortByInput !== true,
        disableFilterRecords: option.FilterByInput !== true,
        valueType: option.type === 'number' ? 'number' : 'string'
      }) : undefined
    };
  };

  var $some = arrayIteration.some;



  var STRICT_METHOD$3 = arrayMethodIsStrict('some');
  var USES_TO_LENGTH$7 = arrayMethodUsesToLength('some');

  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$7 }, {
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var internalHandlers = {};

  function addEventHandler(eventType, handler) {
    if (!internalHandlers[eventType]) internalHandlers[eventType] = [];
    internalHandlers[eventType].push(handler);
  }

  function applyInternalHandler(eventType) {
    var handlers = internalHandlers[eventType];

    if (handlers) {
      var args = [].slice.call(arguments, 1);
      handlers.forEach(function (handler) {
        return handler.apply(void 0, _toConsumableArray(args));
      });
    }
  }

  function getWidthOption(width, minWidth, maxWidth) {
    var option = {
      width: width
    };

    switch (width) {
      case 'xs':
        option.width = 60;
        break;

      case 's':
        option.width = 80;
        break;

      case 'm':
        option.width = 135;
        break;

      case 'l':
        option.width = 200;
        break;

      case 'xl':
        option.width = 300;
        break;
      // case 'auto':
      //   option.minWidth = minWidth || 100
      //   option.maxWidth = maxWidth || 600
      //   break
    }

    return option;
  }

  function changeable(column, rec, gridOption) {
    var readonly = column.readonly,
        contentHidden = column.contentHidden;
    var gridReadonly = gridOption.readonly;
    return !(isFunction(readonly) ? readonly(rec) : readonly !== undefined ? readonly : gridReadonly) && !(isFunction(contentHidden) ? contentHidden(rec) : contentHidden);
  }

  addEventHandler('headerchange', function (data, vm) {
    var value = data.value,
        field = data.field;
    var column = vm.gridOption.columns.find(function (el) {
      return el.field === field;
    });

    if ((column === null || column === void 0 ? void 0 : column.headerType) === 'check') {
      vm.records.forEach(function (rec) {
        if (changeable(column, rec, vm.gridOption)) rec[field] = value;
      });
      vm.$emit(value ? 'checkall' : 'uncheckall', data, vm);

      if (field === vm.gridOption.selectedField) {
        vm.$emit(value ? 'allselect' : 'allunselect', vm);
      }

      vm.invalidate();
    }
  });
  addEventHandler('cellchange', function (data, vm) {
    var col = data.col,
        value = data.value,
        field = data.field,
        record = data.record;
    var column = vm.gridOption.columns[col];

    if ((column === null || column === void 0 ? void 0 : column.type) === 'checkBox') {
      if (!value && (column === null || column === void 0 ? void 0 : column.headerType) === 'check') {
        vm.kakaGrid.headerValues.set(field, false);
      }

      if (vm.checkCascade) {
        // 在vm.records中查找子节点,lazeLoadedRecords中递归的查找子节点，将这些子节点的值都设置成value
        setChildRecordsChecked(vm, record, value);
        setParentRecordsChecked(vm, record, value, field, column === null || column === void 0 ? void 0 : column.headerType);
      }

      vm.invalidate();
      vm.$emit(value ? 'cellcheck' : 'celluncheck', data, vm);

      if (field === vm.gridOption.selectedField) {
        vm.$emit(value ? 'rowselect' : 'rowunselect', record, vm);
      }
    }
  });

  function setParentRecordsChecked(vm, record, value, field, headerType) {
    if (!value) {
      // 如果是级联操作，并且取消选中，那么他的所有上级节点全部取消选择
      var parentId = record[vm.parentKeyField];

      while (parentId) {
        var index = vm.kakaGrid.dataSource.getIndexByKey(parentId);

        if (index < 0) {
          break;
        } else {
          var parentRecord = vm.kakaGrid.dataSource.get(index);
          parentRecord[vm.gridOption.selectedField] = false;
          parentId = parentRecord[vm.parentKeyField];
        }
      }
    } else {
      (function () {
        // 如果级联操作，并且是选中，那么观察全部平级的节点，如果是全部都是选中状态
        // 则将其父亲设置成选中，并且递归操作
        var parentId = record[vm.parentKeyField];

        while (parentId) {
          var siblings = vm.records.filter(function (v) {
            return v[vm.parentKeyField] === parentId && !v[vm.gridOption.selectedField];
          }); // 如果存在兄弟节点为未选中的状态, 直接终止

          if (siblings.length > 0) {
            break;
          } else {
            // 如果兄弟节点全部都选中
            var _index = vm.kakaGrid.dataSource.getIndexByKey(parentId);

            if (_index < 0) {
              // 如果找不到parent，跳出
              break;
            } else {
              var _parentRecord = vm.kakaGrid.dataSource.get(_index);

              _parentRecord[vm.gridOption.selectedField] = true;
              parentId = _parentRecord[vm.parentKeyField];
            }
          }
        }

        if (headerType === 'check') {
          var notAllSelected = vm.records.some(function (v) {
            return !v[vm.gridOption.selectedField];
          });
          vm.kakaGrid.headerValues.set(field, !notAllSelected);
        }
      })();
    }
  }

  function setChildRecordsChecked(vm, record, value) {
    if (vm.keyField && vm.parentKeyField) {
      (function () {
        var keys = [record[vm.keyField]];

        var _loop = function _loop() {
          var key = keys.shift();
          var records = vm.records;
          var children = records.filter(function (rec) {
            return rec[vm.parentKeyField] === key;
          });
          children.forEach(function (v) {
            v[vm.gridOption.selectedField] = value;
            keys.push(v[vm.keyField]);
          });
        };

        while (keys.length > 0) {
          _loop();
        }
      })();
    }
  }

  var checkBox = function checkBox(option, gridOption) {
    var headerType = 'headerType' in option ? option.headerType : 'check';
    var headerAction = option.headerAction || new kakaGrid.headers.action.CheckHeaderAction({
      disabled: function disabled() {
        return isFunction(option.headerReadonly) ? option.headerReadonly() : option.headerReadonly;
      }
    });
    return {
      headerType: headerType,
      headerAction: headerAction,
      width: getWidthOption(option.width || '40'),
      minWidth: getWidthOption(option.minWidth || '40'),
      maxWidth: getWidthOption(option.maxWidth || '40'),
      columnType: option.columnType || 'check',
      field: option.field || gridOption.selectedField,
      action: new kakaGrid.columns.action.CheckEditor({
        disabled: function disabled(rec) {
          return !changeable(option, rec, gridOption);
        }
      }) // style (rec) {
      //   return option.hidden?.(rec)
      //     ? {
      //       borderColor: 'rgba(0, 0, 0, 0)',
      //       checkBgColor: 'rgba(0, 0, 0, 0)',
      //       uncheckBgColor: 'rgba(0, 0, 0, 0)'
      //     }
      //     : undefined
      // }

    };
  };

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var buttonLink = function buttonLink(option, gridOption, vm) {
    var _option$style;

    return {
      icon: option.icon,
      caption: option.caption,
      width: option.width || 's',
      style: {
        color: ((_option$style = option.style) === null || _option$style === void 0 ? void 0 : _option$style.color) || gridOption.theme.primaryColor
      },
      columnType: option.columnType || new kakaGrid.columns.type.ButtonColumn({
        linkButton: true,
        caption: option.buttonCaption
      }),
      action: option.action || new kakaGrid.columns.action.ButtonAction({
        disabled: function disabled(rec) {
          return isFunction(option.disabled) ? option.disabled(rec) : option.disabled;
        },
        action: option.onClick || function (rec) {
          return vm.$emit('buttonclick', {
            record: rec,
            field: option.field,
            value: option.field ? rec[option.field] : undefined,
            columnCaption: option.caption,
            buttonCaption: option.buttonCaption
          }, vm);
        }
      })
    };
  };

  var dangerLink = function dangerLink(option, gridOption, vm) {
    return buttonLink(_objectSpread({
      style: {
        color: gridOption.theme.dangerColor
      }
    }, option), gridOption, vm);
  };

  var captionLink = function captionLink(option, gridOption, vm) {
    return buttonLink(_objectSpread({
      width: 'l'
    }, option), gridOption, vm);
  };

  var modifyLink = function modifyLink(option, gridOption, vm) {
    return buttonLink(_objectSpread({
      buttonCaption: '编辑',
      caption: '编辑',
      width: 'xs'
    }, option), gridOption, vm);
  };

  var removeLink = function removeLink(option, gridOption, vm) {
    return dangerLink(_objectSpread({
      buttonCaption: '删除',
      caption: '删除',
      width: 'xs'
    }, option), gridOption, vm);
  };

  function setColumnPreset(data) {
    Object.keys(data).forEach(function (key) {
      if (presets[key]) warn("Column preset \"".concat(key, "\" has been overwritten."));
      presets[key] = data[key];
    });
    Object.assign(presets, data);
  }

  var presets = {
    tree: tree,
    comboBox: comboBox,
    checkBox: checkBox,
    buttonLink: buttonLink,
    dangerLink: dangerLink,
    captionLink: captionLink,
    modifyLink: modifyLink,
    removeLink: removeLink,
    treeLink: treeLink
  };

  function checkBoxBorderStyle(rec, option) {
    return (isFunction(option.field) ? option.field(rec) : rec[option.field || '_selected']) ? {
      borderColor: '#008cd6'
    } : {
      borderColor: '#b9b9b9'
    };
  }
  function headerCheckBoxBorderStyle(option, map) {
    return option.type === 'checkBox' && map.get(option.field || '_selected') ? {
      borderColor: '#008cd6'
    } : {
      borderColor: '#b9b9b9'
    };
  }
  function readonlyStyle(rec, option, gridOption) {
    return (isFunction(option.readonly) ? option.readonly(rec) : option.readonly !== undefined ? option.readonly : gridOption.readonly) ? {
      uncheckBgColor: '#EAEAEA'
    } : {
      uncheckBgColor: '#fff'
    };
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var UNEXPECTED_PROPERTIES = ['preset', 'disabled', 'buttonCaption', 'onClick'];
  function defineColumn(option, gridOption, vm) {
    var _presets$type;

    var type = option.type,
        align = option.align,
        color = option.color,
        _style = option.style,
        minWidth = option.minWidth,
        maxWidth = option.maxWidth,
        format = option.format,
        _headerStyle = option.headerStyle;
    var theme = gridOption.theme;
    var presetOption = (_presets$type = presets[type]) === null || _presets$type === void 0 ? void 0 : _presets$type.call(presets, option, gridOption, vm);
    var width = option.width || (presetOption === null || presetOption === void 0 ? void 0 : presetOption.width) || 'm';
    var rightTypes = ['price', 'percent', 'unitPrice', 'quantity', 'number'];
    var centerTypes = ['date', 'no', 'checkBox', 'modifyLink', 'removeLink'];
    var textAlign = align || (presetOption === null || presetOption === void 0 ? void 0 : presetOption.align) || (rightTypes.includes(type) ? 'right' : centerTypes.includes(type) ? 'center' : option.isMultiHeader ? 'center' : 'left');

    var columnOption = _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
      action: getAction(_objectSpread$1(_objectSpread$1({}, option), {}, {
        gridReadonly: gridOption.readonly,
        presetOption: presetOption
      }))
    }, option), presetOption), getWidthOption(width)), {}, {
      style: function style(rec) {
        return _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
          textAlign: textAlign,
          padding: [0, 8],
          textOverflow: 'ellipsis',
          checkBgColor: '#008cd6',
          inputPadding: [0, 7, 1, 7]
        }, checkBoxBorderStyle(rec, option)), readonlyStyle(rec, option, gridOption)), isFunction(presetOption === null || presetOption === void 0 ? void 0 : presetOption.style) ? presetOption === null || presetOption === void 0 ? void 0 : presetOption.style(rec) : presetOption === null || presetOption === void 0 ? void 0 : presetOption.style), color ? {
          color: color
        } : undefined), (isFunction(option.disabled) ? option.disabled(rec) : option.disabled) ? _objectSpread$1({
          color: theme.disabledColor
        }, getAppearance(type)) : getAppearance(type)), isFunction(_style) ? _style(rec) : _style);
      },
      headerStyle: function headerStyle(col) {
        return _objectSpread$1(_objectSpread$1({
          textAlign: textAlign,
          padding: [0, 8],
          textOverflow: 'ellipsis',
          checkBgColor: '#008cd6'
        }, headerCheckBoxBorderStyle(option, col)), isFunction(_headerStyle) ? _headerStyle(col) : _headerStyle);
      }
    });

    if (!columnOption.columnType) {
      convertColumnType(type, columnOption, format, {
        option: option,
        gridOption: gridOption
      });
    }

    UNEXPECTED_PROPERTIES.forEach(function (key) {
      delete columnOption[key];
    });
    return columnOption;
  }

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function getColumns(columnOption, option, vm) {
    var caption = columnOption.caption,
        headerStyle = columnOption.headerStyle;
    return columnOption.columns ? _objectSpread$2(_objectSpread$2({}, defineColumn({
      caption: caption,
      headerStyle: headerStyle,
      isMultiHeader: true
    }, option, vm)), {}, {
      columns: columnOption.columns.map(function (column) {
        return getColumns(column, option, vm);
      })
    }) : defineColumn(columnOption, option, vm);
  }

  function kakaOption(option, vm) {
    var theme = option.theme,
        columns = option.columns,
        frozenColCount = option.frozenColCount,
        hideHeader = option.hideHeader,
        singleSelection = option.singleSelection,
        spanBodyOptions = option.spanBodyOptions;
    var _theme$rowHeight = theme.rowHeight,
        rowHeight = _theme$rowHeight === void 0 ? 32 : _theme$rowHeight,
        _theme$headerRowHeigh = theme.headerRowHeight,
        headerRowHeight = _theme$headerRowHeigh === void 0 ? 40 : _theme$headerRowHeigh;
    var header = columns.map(function (columnOption) {
      return getColumns(columnOption, option, vm);
    });
    option.columns = header;
    var result = {
      theme: theme,
      header: header,
      rowHeight: rowHeight,
      frozenColCount: frozenColCount,
      headerRowHeight: headerRowHeight,
      hiddenHeader: hideHeader,
      monitorResize: false,
      singleSelection: singleSelection
    };

    if (spanBodyOptions) {
      result.spanBodyOptions = spanBodyOptions;
    }

    return result;
  }

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED$2 }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var theme = {
    //  external
    rowHeight: 32,
    headerRowHeight: 40,
    dangerColor: '#f5222d',
    primaryColor: '#1890ff',
    disabledColor: 'rgba(0, 0, 0, .3)',
    tree: {
      linkColor: '#008CD6'
    },
    // within kaka
    borderColor: '#e8e8e8',
    highlightBorderColor: '#24A7E3',
    highlightBorderWidth: 2,
    selectionBgColor: '#FFF',
    frozenRowsColor: '#333',
    frozenRowsBgColor: '#f5f5f5',
    frozenRowsBorderColor: '#e8e8e8',
    font: '12px "-apple-system","BlinkMacSystemFont","PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑","Helvetica Neue",Helvetica,Arial,sans-serif'
  };

  function setTheme(value) {
    Object.assign(theme, value);
  }

  function mergeTheme() {
    return Object.assign.apply(Object, [{}, theme].concat(Array.prototype.slice.call(arguments)));
  }

  var _types;

  function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var _kakaGrid$ListGrid$EV = kakaGrid.ListGrid.EVENT_TYPE,
      CHANGED_HEADER_VALUE = _kakaGrid$ListGrid$EV.CHANGED_HEADER_VALUE,
      CHANGED_VALUE = _kakaGrid$ListGrid$EV.CHANGED_VALUE,
      DRAG_SELECTION = _kakaGrid$ListGrid$EV.DRAG_SELECTION,
      CAN_DRAG_SELECTION = _kakaGrid$ListGrid$EV.CAN_DRAG_SELECTION,
      CLICK_CELL = _kakaGrid$ListGrid$EV.CLICK_CELL,
      CLICK_UNDERLAY = _kakaGrid$ListGrid$EV.CLICK_UNDERLAY,
      COPY = _kakaGrid$ListGrid$EV.COPY,
      CUT = _kakaGrid$ListGrid$EV.CUT,
      DBLCLICK_CELL = _kakaGrid$ListGrid$EV.DBLCLICK_CELL,
      DBLCLICK_UNDERLAY = _kakaGrid$ListGrid$EV.DBLCLICK_UNDERLAY,
      DBLTAP_CELL = _kakaGrid$ListGrid$EV.DBLTAP_CELL,
      DBLTAP_UNDERLAY = _kakaGrid$ListGrid$EV.DBLTAP_UNDERLAY,
      EDITABLEINPUT_CELL = _kakaGrid$ListGrid$EV.EDITABLEINPUT_CELL,
      INPUT_CELL = _kakaGrid$ListGrid$EV.INPUT_CELL,
      KEYDOWN = _kakaGrid$ListGrid$EV.KEYDOWN,
      MODIFY_STATUS_EDITABLEINPUT_CELL = _kakaGrid$ListGrid$EV.MODIFY_STATUS_EDITABLEINPUT_CELL,
      MOUSEDOWN_CELL = _kakaGrid$ListGrid$EV.MOUSEDOWN_CELL,
      MOUSEENTER_CELL = _kakaGrid$ListGrid$EV.MOUSEENTER_CELL,
      MOUSELEAVE_CELL = _kakaGrid$ListGrid$EV.MOUSELEAVE_CELL,
      MOUSEMOVE_CELL = _kakaGrid$ListGrid$EV.MOUSEMOVE_CELL,
      MOUSEOUT_CELL = _kakaGrid$ListGrid$EV.MOUSEOUT_CELL,
      MOUSEOVER_CELL = _kakaGrid$ListGrid$EV.MOUSEOVER_CELL,
      MOUSEUP_CELL = _kakaGrid$ListGrid$EV.MOUSEUP_CELL,
      PASTE = _kakaGrid$ListGrid$EV.PASTE,
      PASTE_CELL = _kakaGrid$ListGrid$EV.PASTE_CELL,
      RESIZE_COLUMN = _kakaGrid$ListGrid$EV.RESIZE_COLUMN,
      SCROLL = _kakaGrid$ListGrid$EV.SCROLL,
      SELECTED_CELL = _kakaGrid$ListGrid$EV.SELECTED_CELL,
      FOCUS_GRID = _kakaGrid$ListGrid$EV.FOCUS_GRID,
      BLUR_GRID = _kakaGrid$ListGrid$EV.BLUR_GRID;
  var types = (_types = {}, _defineProperty$4(_types, CAN_DRAG_SELECTION, 'beforedrag'), _defineProperty$4(_types, CHANGED_HEADER_VALUE, 'headerchange'), _defineProperty$4(_types, CHANGED_VALUE, 'cellchange'), _defineProperty$4(_types, CLICK_CELL, 'cellclick'), _defineProperty$4(_types, CLICK_UNDERLAY, 'underlayclick'), _defineProperty$4(_types, COPY, 'copy'), _defineProperty$4(_types, CUT, 'cut'), _defineProperty$4(_types, DBLCLICK_CELL, 'dblclick'), _defineProperty$4(_types, DBLCLICK_UNDERLAY, 'underlaydblclick'), _defineProperty$4(_types, DBLTAP_CELL, 'dbltap'), _defineProperty$4(_types, DBLTAP_UNDERLAY, 'underlaydbltap'), _defineProperty$4(_types, DRAG_SELECTION, 'drag'), _defineProperty$4(_types, EDITABLEINPUT_CELL, 'editablecellinput'), _defineProperty$4(_types, INPUT_CELL, 'cellinput'), _defineProperty$4(_types, KEYDOWN, 'keydown'), _defineProperty$4(_types, MODIFY_STATUS_EDITABLEINPUT_CELL, 'editing'), _defineProperty$4(_types, MOUSEDOWN_CELL, 'cellmousedown'), _defineProperty$4(_types, MOUSEENTER_CELL, 'cellmouseenter'), _defineProperty$4(_types, MOUSELEAVE_CELL, 'cellmouseleave'), _defineProperty$4(_types, MOUSEMOVE_CELL, 'cellmousemove'), _defineProperty$4(_types, MOUSEOUT_CELL, 'cellmouseout'), _defineProperty$4(_types, MOUSEOVER_CELL, 'cellmouseover'), _defineProperty$4(_types, MOUSEUP_CELL, 'cellmouseup'), _defineProperty$4(_types, PASTE, 'paste'), _defineProperty$4(_types, PASTE_CELL, 'cellpaste'), _defineProperty$4(_types, RESIZE_COLUMN, 'columnresize'), _defineProperty$4(_types, SCROLL, 'scroll'), _defineProperty$4(_types, SELECTED_CELL, 'cellselect'), _defineProperty$4(_types, FOCUS_GRID, 'foucs'), _defineProperty$4(_types, BLUR_GRID, 'blur'), _types);

  function bind$1(vm, grid) {
    Object.keys(types).forEach(function (raw) {
      grid.listen(raw, function () {
        var eventType = types[raw];
        applyInternalHandler.apply(void 0, [eventType].concat(Array.prototype.slice.call(arguments), [vm]));
        var context = {};
        vm.$emit.apply(vm, [eventType].concat(Array.prototype.slice.call(arguments), [vm, context]));
        if ('result' in context) return context.result;
      });
    });
  }

  function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }

  function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var _kakaGrid$data = kakaGrid.data,
      CachedDataSource = _kakaGrid$data.CachedDataSource,
      TreeDataSource = _kakaGrid$data.TreeDataSource;
  var script = {
    name: 'KakaGrid',
    props: {
      theme: Object,
      records: Array,
      columns: Array,
      keyField: String,
      readonly: {
        type: Boolean,
        default: true
      },
      parentKeyField: String,
      selectedField: String,
      frozenColCount: Number,
      hideHeader: Boolean,
      getRecords: Function,
      hasRecords: Function,
      singleSelection: {
        type: Boolean,
        default: false
      },
      checkCascade: {
        type: Boolean,
        default: true
      },
      spanBodyOptions: Object
    },
    data: function data() {
      return {
        gridOption: null,
        currentRecords: null,
        lazyLoadingRecords: {} // 存放正在异步获取records的可以，防止快速多次请求，或者请求过慢导致的加载多份数据的问题

      };
    },
    watch: {
      records: {
        handler: function handler(value) {
          var _this = this;

          if (value && value === this.currentRecords) {
            var cachedDataSource = this.gridOption.cachedDataSource;
            var dataSource = this.kakaGrid.dataSource;

            if (cachedDataSource && cachedDataSource.length !== value.length) {
              cachedDataSource.length = value.length;
            } else if (!cachedDataSource && dataSource.length !== value.length) {
              dataSource.length = value.length;
            }

            this.refreshDatasource();
          } else if (value !== this.currentRecords) {
            // 需要取消头的checkBox的全选状态
            this.columns.forEach(function (v) {
              if (v.type === 'checkBox') {
                _this.kakaGrid.headerValues.set(v.field || _this.gridOption.selectedField, false);
              }
            });
            this.loadRecords(value);
          }
        },
        deep: true
      },
      readonly: function readonly() {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.kakaGrid.dataSource.refresh();
        });
      }
    },
    mounted: function mounted() {
      this.initGrid();
    },
    beforeDestroy: function beforeDestroy() {
      this.kakaGrid.dispose();
    },
    methods: {
      initGrid: function initGrid() {
        var _this3 = this;

        if (this.kakaGrid) this.kakaGrid.dispose();
        var o = this.$options;
        var columns = this.getValue('columns');
        var records = this.currentRecords = this.getValue('records');
        var keyField = this.getValue('keyField');
        var parentKeyField = this.getValue('parentKeyField');
        var selectedField = this.getValue('selectedField') || '_selected';
        var frozenColCount = this.getValue('frozenColCount');
        var hideHeader = this.getValue('hideHeader');
        var getRecords = this.getValue('getRecords');
        var hasRecords = this.getValue('hasRecords');
        var singleSelection = this.getValue('singleSelection');
        var spanBodyOptions = this.getValue('spanBodyOptions');
        var readonly = this.readonly;
        var theme = mergeTheme(o.theme, this.theme);
        this.gridOption = {
          singleSelection: singleSelection,
          theme: theme,
          columns: columns,
          keyField: keyField,
          parentKeyField: parentKeyField,
          selectedField: selectedField,
          frozenColCount: frozenColCount,
          getRecords: getRecords,
          hasRecords: hasRecords,
          hideHeader: hideHeader,
          readonly: readonly,
          spanBodyOptions: spanBodyOptions
        };
        this.$nextTick(function () {
          var grid = new kakaGrid.ListGrid(_objectSpread$3({
            parentElement: _this3.$el
          }, kakaOption(_this3.gridOption, _this3)));
          bind$1(_this3, grid);
          _this3.kakaGrid = grid;
          if (records) _this3.loadRecords(records);
        });
      },
      getValue: function getValue(key) {
        var o = this.$options;
        return this[key] || o[key];
      },
      loadRecords: function loadRecords(records) {
        var _this4 = this;

        return _asyncToGenerator$1( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var o, keyField, parentKeyField, getRecords, hasRecords, options;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _this4.lazyLoadingRecords = {};
                  _this4.currentRecords = records;
                  o = _this4.gridOption;
                  keyField = o.keyField, parentKeyField = o.parentKeyField, getRecords = o.getRecords, hasRecords = o.hasRecords;
                  options = {
                    keyField: keyField,
                    parentKeyField: parentKeyField
                  };

                  if (getRecords) {
                    options.hasChildren = hasRecords || function (rec) {
                      return rec ? !rec.isLeaf : true;
                    };

                    options.getChildren = /*#__PURE__*/function () {
                      var _ref = _asyncToGenerator$1( /*#__PURE__*/regeneratorRuntime.mark(function _callee(rec, all) {
                        var parentKey, data;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                parentKey = rec ? rec[keyField] : null;

                                if (!(!rec || _this4.lazyLoadingRecords[parentKey])) {
                                  _context.next = 3;
                                  break;
                                }

                                return _context.abrupt("return", []);

                              case 3:
                                _this4.lazyLoadingRecords[parentKey] = true;
                                _context.next = 6;
                                return getRecords(rec);

                              case 6:
                                data = _context.sent;

                                if (_this4.checkCascade) {
                                  (data.records || data).forEach(function (v) {
                                    v[_this4.gridOption.selectedField] = rec[_this4.gridOption.selectedField] || _this4.kakaGrid.headerValues.get(_this4.gridOption.selectedField);
                                  });
                                }

                                records.push.apply(records, _toConsumableArray$1(data.records || data));
                                delete _this4.lazyLoadingRecords[parentKey]; // console.log(data)

                                return _context.abrupt("return", data);

                              case 11:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                      };
                    }();
                  }

                  if (keyField && parentKeyField) {
                    o.cachedDataSource = CachedDataSource.ofArray(records);
                    _this4.kakaGrid.dataSource = new TreeDataSource(o.cachedDataSource, options);
                  } else {
                    _this4.kakaGrid.records = records;
                  }

                  _this4.$emit('load', _this4);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      expandToLevel: function expandToLevel(level) {
        this.kakaGrid.dataSource.expandToLevel(level);
      },
      expandToKey: function expandToKey(key) {
        this.kakaGrid.dataSource.expandToKey(key);
      },
      refreshDatasource: function refreshDatasource() {
        this.kakaGrid.dataSource.refresh();
      },
      invalidate: function invalidate() {
        this.kakaGrid.invalidate();
      },
      onResize: function onResize() {
        var _this5 = this;

        if (!this.kakaGrid) return;
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
          _this5.kakaGrid.resize();

          _this5.resizeTimer = null;
        }, 200);
      },
      selectAll: function selectAll() {
        var _this6 = this;

        this.records.forEach(function (v) {
          v[_this6.gridOption.selectedField] = true;
        });
        this.kakaGrid.headerValues.set(this.gridOption.selectedField, true);
        this.invalidate();
      },
      unSelectAll: function unSelectAll() {
        var _this7 = this;

        this.records.forEach(function (v) {
          v[_this7.gridOption.selectedField] = false;
        });
        this.kakaGrid.headerValues.set(this.gridOption.selectedField, false);
        this.invalidate();
      },
      getSelectedRecords: function getSelectedRecords() {
        var _this8 = this;

        return this.records.filter(function (rec) {
          return rec[_this8.gridOption.selectedField];
        });
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var freezing = !fails(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;



  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + ++id, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys[METADATA] = true;
  });
  var internalMetadata_1 = internalMetadata.REQUIRED;
  var internalMetadata_2 = internalMetadata.fastKey;
  var internalMetadata_3 = internalMetadata.getWeakData;
  var internalMetadata_4 = internalMetadata.onFreeze;

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global_1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    // eslint-disable-next-line max-len
    if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    })))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var defineProperty$7 = objectDefineProperty.f;








  var fastKey = internalMetadata.fastKey;


  var setInternalState$4 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$4(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty$7(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$4(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  // `Set` constructor
  // https://tc39.github.io/ecma262/#sec-set-objects
  var es_set = collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }

  var HEAD;
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  /* script */
  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      directives: [{
        name: "resize-detector",
        rawName: "v-resize-detector"
      }],
      staticStyle: {
        overflow: "hidden"
      },
      on: {
        elementresize: _vm.onResize
      }
    });
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-3774c1ea_0", {
      source: "\n.kaka-grid__inline-lookup__dropdown-item {\n  height: 40px;\n  line-height: 40px;\n  border-bottom: 1px solid #f2f2f2;\n  background: #fff;\n}\n.kaka-grid__inline-lookup__dropdown-item--first {\n  border-top: 1px solid #f2f2f2;\n}\n.kaka-grid__inline-lookup__dropdown-item:hover {\n  color: #008cd6;\n}\n.kaka-grid__inline-lookup__dropdown-item[data-select] {\n  color: #008cd6\n}\n.kaka-grid__inline-input,\n.kaka-grid__inline-lookup__input,\n.kaka-grid__inline-textarea {\n  outline: none;\n  border: 1px #008cd6 solid !important;\n  border-radius: 2px;\n}\n\n",
      map: {
        "version": 3,
        "sources": ["/Users/zhangxiaoquan/Documents/梦成公司/platform/vue-kaka-grid/src/grid/kaka-grid.vue"],
        "names": [],
        "mappings": ";AAsOA;EACA,YAAA;EACA,iBAAA;EACA,gCAAA;EACA,gBAAA;AACA;AACA;EACA,6BAAA;AACA;AACA;EACA,cAAA;AACA;AACA;EACA;AACA;AACA;;;EAGA,aAAA;EACA,oCAAA;EACA,kBAAA;AACA",
        "file": "kaka-grid.vue",
        "sourcesContent": ["<template>\n  <div\n    v-resize-detector\n    style=\"overflow: hidden\"\n    @elementresize=\"onResize\" />\n</template>\n\n<script>\n  import kakaGrid from '@mctech/kaka-grid'\n\n  import { kakaOption } from './kaka-option'\n  import { mergeTheme } from './theme'\n  import { bind as bindEvents } from '../event'\n\n  const { CachedDataSource, TreeDataSource } = kakaGrid.data\n\n  export default {\n    name: 'KakaGrid',\n    props: {\n      theme: Object,\n      records: Array,\n      columns: Array,\n      keyField: String,\n      readonly: {\n        type: Boolean,\n        default: true\n      },\n      parentKeyField: String,\n      selectedField: String,\n      frozenColCount: Number,\n      hideHeader: Boolean,\n      getRecords: Function,\n      hasRecords: Function,\n      singleSelection: {\n        type: Boolean,\n        default: false\n      },\n      checkCascade: {\n        type: Boolean,\n        default: true\n      },\n      spanBodyOptions: Object\n    },\n    data () {\n      return {\n        gridOption: null,\n        currentRecords: null,\n        lazyLoadingRecords: {} // 存放正在异步获取records的可以，防止快速多次请求，或者请求过慢导致的加载多份数据的问题\n      }\n    },\n    watch: {\n      records: {\n        handler (value) {\n          if (value && value === this.currentRecords) {\n            const { cachedDataSource } = this.gridOption\n            const { dataSource } = this.kakaGrid\n\n            if (\n              cachedDataSource &&\n              cachedDataSource.length !== value.length\n            ) {\n              cachedDataSource.length = value.length\n            } else if (\n              !cachedDataSource &&\n              dataSource.length !== value.length\n            ) {\n              dataSource.length = value.length\n            }\n            this.refreshDatasource()\n          } else if (value !== this.currentRecords) {\n            // 需要取消头的checkBox的全选状态\n            this.columns.forEach(v => {\n              if (v.type === 'checkBox') {\n                this.kakaGrid.headerValues.set(\n                  v.field || this.gridOption.selectedField, false\n                )\n              }\n            })\n            this.loadRecords(value)\n          }\n        },\n        deep: true\n      },\n      readonly () {\n        this.$nextTick(() => {\n          this.kakaGrid.dataSource.refresh()\n        })\n      }\n    },\n    mounted () {\n      this.initGrid()\n    },\n    beforeDestroy: function () {\n      this.kakaGrid.dispose()\n    },\n    methods: {\n      initGrid () {\n        if (this.kakaGrid) this.kakaGrid.dispose()\n        const o = this.$options\n\n        const columns = this.getValue('columns')\n        const records = this.currentRecords = this.getValue('records')\n        const keyField = this.getValue('keyField')\n        const parentKeyField = this.getValue('parentKeyField')\n        const selectedField = this.getValue('selectedField') || '_selected'\n        const frozenColCount = this.getValue('frozenColCount')\n        const hideHeader = this.getValue('hideHeader')\n        const getRecords = this.getValue('getRecords')\n        const hasRecords = this.getValue('hasRecords')\n        const singleSelection = this.getValue('singleSelection')\n        const spanBodyOptions = this.getValue('spanBodyOptions')\n        const readonly = this.readonly\n        const theme = mergeTheme(o.theme, this.theme)\n\n        this.gridOption = {\n          singleSelection,\n          theme,\n          columns,\n          keyField,\n          parentKeyField,\n          selectedField,\n          frozenColCount,\n          getRecords,\n          hasRecords,\n          hideHeader,\n          readonly,\n          spanBodyOptions\n        }\n        this.$nextTick(() => {\n          const grid = new kakaGrid.ListGrid({\n            parentElement: this.$el,\n            ...kakaOption(this.gridOption, this)\n          })\n          bindEvents(this, grid)\n          this.kakaGrid = grid\n\n          if (records) this.loadRecords(records)\n        })\n      },\n      getValue (key) {\n        const o = this.$options\n        return this[key] || o[key]\n      },\n      async loadRecords (records) {\n        this.lazyLoadingRecords = {}\n        this.currentRecords = records\n\n        const o = this.gridOption\n        const { keyField, parentKeyField, getRecords, hasRecords } = o\n        const options = {\n          keyField,\n          parentKeyField\n        }\n        if (getRecords) {\n          options.hasChildren = hasRecords || (rec => {\n            return rec ? !rec.isLeaf : true\n          })\n          options.getChildren = async (rec, all) => {\n            const parentKey = rec ? rec[keyField] : null\n            if (!rec || this.lazyLoadingRecords[parentKey]) return []\n            this.lazyLoadingRecords[parentKey] = true\n            const data = await getRecords(rec)\n            if (this.checkCascade) {\n              (data.records || data).forEach(v => {\n                v[this.gridOption.selectedField] =\n                  rec[this.gridOption.selectedField] ||\n                  this.kakaGrid.headerValues.get(this.gridOption.selectedField)\n              })\n            }\n            records.push(...(data.records || data))\n            delete this.lazyLoadingRecords[parentKey]\n            // console.log(data)\n            return data\n          }\n        }\n        if (keyField && parentKeyField) {\n          o.cachedDataSource = CachedDataSource.ofArray(records)\n          this.kakaGrid.dataSource = new TreeDataSource(\n            o.cachedDataSource,\n            options\n          )\n        } else {\n          this.kakaGrid.records = records\n        }\n        this.$emit('load', this)\n      },\n      expandToLevel (level) {\n        this.kakaGrid.dataSource.expandToLevel(level)\n      },\n      expandToKey (key) {\n        this.kakaGrid.dataSource.expandToKey(key)\n      },\n      refreshDatasource () {\n        this.kakaGrid.dataSource.refresh()\n      },\n      invalidate () {\n        this.kakaGrid.invalidate()\n      },\n      onResize () {\n        if (!this.kakaGrid) return\n        if (this.resizeTimer) clearTimeout(this.resizeTimer)\n        this.resizeTimer = setTimeout(() => {\n          this.kakaGrid.resize()\n          this.resizeTimer = null\n        }, 200)\n      },\n      selectAll () {\n        this.records.forEach(v => {\n          v[this.gridOption.selectedField] = true\n        })\n        this.kakaGrid.headerValues.set(this.gridOption.selectedField, true)\n        this.invalidate()\n      },\n      unSelectAll () {\n        this.records.forEach(v => {\n          v[this.gridOption.selectedField] = false\n        })\n        this.kakaGrid.headerValues.set(this.gridOption.selectedField, false)\n        this.invalidate()\n      },\n      getSelectedRecords () {\n        return this.records.filter(\n          rec => rec[this.gridOption.selectedField]\n        )\n      }\n    }\n  }\n</script>\n\n<style lang=\"postcss\">\n  .kaka-grid__inline-lookup__dropdown-item {\n    height: 40px;\n    line-height: 40px;\n    border-bottom: 1px solid #f2f2f2;\n    background: #fff;\n  }\n  .kaka-grid__inline-lookup__dropdown-item--first {\n    border-top: 1px solid #f2f2f2;\n  }\n  .kaka-grid__inline-lookup__dropdown-item:hover {\n    color: #008cd6;\n  }\n  .kaka-grid__inline-lookup__dropdown-item[data-select] {\n    color: #008cd6\n  }\n  .kaka-grid__inline-input,\n  .kaka-grid__inline-lookup__input,\n  .kaka-grid__inline-textarea {\n    outline: none;\n    border: 1px #008cd6 solid !important;\n    border-radius: 2px;\n  }\n\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

  Vue.component('kaka-grid', __vue_component__);

  exports.kakaGrid = kakaGrid;
  exports.KakaGrid = __vue_component__;
  exports.setColumnPreset = setColumnPreset;
  exports.setTheme = setTheme;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
