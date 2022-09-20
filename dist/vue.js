(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  UA && /msie|trident/.test(UA);
  UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  UA && /chrome\/\d+/.test(UA) && !isEdge;
  UA && /phantomjs/.test(UA);
  UA && UA.match(/firefox\/(\d+)/);
  function isFunction(target) {
    return typeof target === 'function';
  }
  function isObject$1(target) {
    return _typeof(target) === "object" && target !== null;
  }
  function isArray(target) {
    return Array.isArray(target);
  }
  /**
   * Get the raw type string of a value, e.g., [object Object].
   */

  var _toString = Object.prototype.toString;
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */

  function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
  }
  function def(target, key, value, enumerable) {
    Object.defineProperty(target, key, {
      value: value,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  /**
   * Check if val is a valid(有效) array index.
   */

  function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }
  /* istanbul ignore next */

  function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }
  /**
   * Check whether an object has the property.
   */

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  /**
   * Convert an Array-like object to a real Array.
   */

  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);

    while (i--) {
      ret[i] = list[i + start];
    }

    return ret;
  }

  var oldArrProto = Array.prototype;
  var arrayMethods = Object.create(oldArrProto); // Object.create 使用现有的对象来作为新创建对象的原型

  var methods = ['push', 'unshift', 'splice', 'pop', 'reserve', 'sort', 'shift']; // configurable:false,//能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
  // enumerable:false,//对象属性是否可通过for-in循环，flase为不可循环，默认值为true
  // writable:false,//对象属性是否可修改,flase为不可修改，默认值为true
  // 用户调用的是以上七个方法会用自己重写的，否则就用原来的数组原型上面的方法

  methods.forEach(function (method) {
    // NOTE 缓存原始方法
    var original = oldArrProto[method]; // 代理

    Object.defineProperty(arrayMethods, method, {
      value: function mutator() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = original.call.apply(original, [this].concat(args));
        var ob = this.__ob__;
        var inserted;

        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;

          case 'splice':
            inserted = args.slice(2);
            break;
        } // 如果有新增加的值要继续进行劫持


        if (inserted) ob.observerArray(inserted);
        ob.dep.notify();
        return result;
      },
      enumerable: false,
      writable: false,
      configurable: false
    });
  });

  // 每个属性都分配一个Dep,watcher中也要存放这个Dep,多对多
  var uid = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = uid++;
      this.subs = []; //存放 watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // dep要存放 watcher watcher也要存放 dep
        if (window.target) {
          // 把dep传给watcher存储
          window.target.addDep(this); //新增
        }
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "removeSub",
      value: function removeSub(watcher) {
        remove(this.subs, watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        var subs = this.subs.slice();
        subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  function remove(arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);

      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }

  var hasProto = ('__ob__' in {});
  var arrKeys = Object.getOwnPropertyNames(arrayMethods); //INFO 观测者类 类有类型，对象没有类型

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      this.value = value, this.dep = new Dep();
      def(value, '__ob__', this); // value.__ob__ = this;//所有被劫持的属性都有 __ob__
      // NOTE 2、对value中的数据进行遍历循环 劫持 

      if (Array.isArray(value)) {
        //数组劫持 
        // 内部对数组不采用 Object.defineProperty
        // 对数组原来的方法进行改写 push shift pop unshift reserve sort splice/ 
        // __proto__指向构造函数的原型（prototype）对象 
        var augment = hasProto ? protoAugment : copyAugment;
        augment(value, arrayMethods, arrKeys); // TAG 如果数组里面的是对象，则需要劫持对象

        this.observerArray(value);
      } else {
        this.walk(value); //对象劫持
      }
    } // 遍历对象


    _createClass(Observer, [{
      key: "walk",
      value: function walk(value) {
        // NOTE 3、遍历对象，响应式劫持
        Object.keys(value).forEach(function (key) {
          return defineReactive(value, key, value[key]);
        });
      } // 遍历数组

    }, {
      key: "observerArray",
      value: function observerArray(value) {
        value.forEach(function (item) {
          return observer$1(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // NOTE 4、value有可能是对象，再进行递归劫持
    var childOb = observer$1(value); // 每个属性都对应一个 dep

    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        // 取值的时候将wtacher和dep关联起来
        // Dep.target
        if (window.target) {
          // 收集对象依赖(watcher)
          dep.depend(); // 收集数组依赖(watcher)

          if (childOb) childOb.dep.depend();
        }

        return value;
      },
      set: function set(newValue) {
        // NOTE 5、如果用户赋值一个新的对象需要将这个对象也进行劫持
        // TAG：只有新增加的属性是对象才会进行监听劫持
        if (newValue !== value) {
          observer$1(newValue); // (对象触发收集的 watcher )告诉当前的属性存放的wtacher执行get()

          dep.notify();
          value = newValue;
        }
      }
    });
  }

  function protoAugment(target, src, keys) {
    target.__ob__ = src;
  }

  function copyAugment(target, src, keys) {
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  function set(target, key, val) {
    // target是数组并且key是一个有效的索引值，就先设置length属性
    if (isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    } // 由于key已经存在于target中，所以其实这个key已经被侦测了变化。也就是说，这种情况属于修改数据，直接用key和val改数据就好了


    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val;
    }

    var ob = target.__ob__; // 那么，什么是根数据？this.$data就是根数据。

    if (target._isVue || ob && ob.vmCount) {
      console.warn('target不能是Vue.js实例或Vue.js实例的根数据对象');
      return val;
    } // 不是响应式数据直接赋值就行


    if (!ob) {
      target[key] = val;
      return val;
    } // NOTE 处理新增的属性

    /**
    * 如果前面的所有判断条件都不满足，那么说明用户是在响应式数据上
    * 新增了一个属性，这种情况下需要追踪这个新增属性的变化，即使用
    * defineReactive将新增属性转换成getter/setter的形式即可。
    */


    defineReactive(ob.value, key, val); // 向target的依赖触发变化通知，并返回val

    ob.dep.notify();
    return val;
  }
  function del(target, key) {
    // 数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return;
    } // 对象


    var ob = target.__ob__;

    if (target._isVue || ob && ob.vmCount) {
      console.warn('target不能是Vue.js实例或Vue.js实例的根数据对象');
      return;
    } // 如果不是target自己的属性就阻止程序继续执行


    if (!hasOwn(target, key)) return;
    delete target[key]; // 只有响应式数据才需要发送通知

    if (!ob) return;
    ob.dep.notify();
  }
  function observer$1(value) {
    // NOTE: 1、如果是对象才进行观测
    if (!isObject$1(value)) return; // NOTE: 2、如果是响应式的也没必要再进行观测了

    var ob = null;

    if (value.__ob__ && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else {
      ob = new Observer(value);
    }

    return ob;
  }

  var callbacks = [];
  var pending = false;

  function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    copies.forEach(function (cb) {
      return cb();
    });
  }

  var timerFunc;

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();

    timerFunc = function timerFunc() {
      p.then(flushCallbacks);
      if (isIOS) setTimeout(noop);
    };
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });

    timerFunc = function timerFunc() {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = function timerFunc() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function timerFunc() {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick(cb, ctx) {
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          console.error(e, ctx, 'nextTick');
        }
      }
    });

    if (!pending) {
      pending = true;
      timerFunc();
    }
  }

  var queue = [];
  var has = {};
  function queueWatch(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      queue.push(watcher);
      has[id] = true;
      nextTick(function () {
        queue.forEach(function (watcher) {
          return watcher.run();
        });
        queue = [];
        has = {};
      });
    }
  }

  var bailRE = /[^\w.$]/;
  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, expOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      // 默认调用一次更新函数
      if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
      } else {
        // a.b.c.d就是一个keypath，说明从vm.a.b.c.d中读取数据。
        this.getter = parsePath(expOrFn);
      }

      if (options) {
        this.deep = !!options.deep;
      } else {
        this.deep = false;
      }

      this.vm = vm;
      this.exprOrFn = expOrFn;
      this.cb = cb;
      this.options = options;
      this.id = id++;
      this.deps = [];
      this.depsId = new Set(); // 默认初始化

      this.value = this.get();
    } // 初始化


    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        /**
         * 一定要在window.target =undefined之前去触发子值的收集依赖逻辑，
         * 这样才能保证子集收集的依赖是当前这个Watcher。如果在window.target
         *  =undefined之后去触发收集依赖的逻辑，那么其实当前的Watcher并不会
         * 被收集到子值的依赖列表中，也就无法实现deep的功能。
         * 简单来说就是 父亲和子属性的 dep 都收集了父亲的 watcher
         * 只要有一个变化就会通知watcher更新
         */
        window.target = this;
        var value = this.getter.call(this.vm, this.vm);

        if (this.deep) {
          traverse(value);
        }

        window.target = undefined;
        return value;
      } // 更新

    }, {
      key: "update",
      value: function update() {
        queueWatch(this);
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.depsId.add(id);
          this.deps.push(dep); // dep存储watcher

          dep.addSub(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        var oldValue = this.value;
        this.value = this.get(); // 监听器实现原理

        this.cb.call(this.vm, oldValue, this.value);
      } // 把watcher实例从当前正在观察的状态的依赖列表中移除。

    }, {
      key: "teardown",
      value: function teardown() {
        /**
         * Watcher中记录自己都订阅了谁，也就是watcher实例被收集进了哪些Dep里。
         * 然后当Watcher不想继续订阅这些Dep时，循环自己记录的订阅列表来通知
         * 它们（Dep）将自己从它们（Dep）的依赖列表中移除掉。
         */
        var i = this.deps.length;

        while (i--) {
          this.deps[i].removeSub(this);
        }
      }
    }]);

    return Watcher;
  }();

  function parsePath(path) {
    // 如果不是这种格式 'a.b.c'是函数的话直接返回
    if (bailRE.test(path)) return path;
    var segments = path.split('.');
    return function (obj) {
      // 这里的obj就是外面传进来的 this.vm
      // 一直往下取值直到取到最后面一层
      for (var i = 0; i < segments.length; i++) {
        if (!obj) return;
        obj = obj[segments[i]];
      }

      return obj;
    };
  }

  var seenObjects = new Set();
  function traverse(val) {
    _traverse(val, seenObjects);

    seenObjects.clear();
  }

  function _traverse(val, seen) {
    var i, keys;
    var isArray = Array.isArray(val);

    if (!isArray && !isObject(val) || Object.isFrozen(val)) {
      return;
    }

    if (val.__ob__) {
      var depId = val.__ob__.dep.id;

      if (seen.has(depId)) {
        return;
      }

      seen.add(depId);
    }

    if (isArray) {
      i = val.length;

      while (i--) {
        _traverse(val[i], seen);
      }
    } else {
      keys = Object.keys(val);
      i = keys.length;

      while (i--) {
        _traverse(val[keys[i]], seen);
      }
    }
  }

  function initState(vm) {
    var options = vm.$options; // NOTE: 1、props 初始化

    if (options.props) ; // NOTE: 2、data 初始化


    if (options.data) {
      initData(vm);
    } // NOTE: 3、computed 初始化


    if (options.computed) ; // NOTE: 4、watch 初始化


    if (options.watch) ;
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; // INFO: Vue2中会将data中所有的数据进行劫持 Object.defineProperty

    if (!isFunction(data)) ; else {
      // TAG 绑定this 通过_data进行关联
      data = vm._data = data.call(vm);
    } // TAG 用户 vm.name 代理--> vm._data.name 


    for (var key in data) {
      proxy(vm, '_data', key);
    } // NOTE: 1、把 data 变成响应式


    observer$1(data);
  }

  function stateMixin(Vue) {
    // Vue.js中计算属性（Computed）的实现原理与expOrFn支持函数有很大的关系
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options); // NOTE: 1.代码会判断用户是否使用了immediate参数，如果使用了，则立即执行一次cb。

      if (options.immediate) {
        cb.call(vm, watcher.value);
      }

      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }

  /* @flow */

  Object.freeze({}); // These helpers produce better VM code in JS engines due to their
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */

  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');

    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }

    return expectsLowerCase ? function (val) {
      return map[val.toLowerCase()];
    } : function (val) {
      return map[val];
    };
  }
  /**
   * Check if a tag is a built-in tag.
   */

  makeMap('slot,component', true);
  /**
   * Check if an attribute is a reserved attribute.
   */

  makeMap('key,ref,slot,slot-scope,is');

  // import { inBrowser } from 'core/util/env'
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.

  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  var isReservedTag = function isReservedTag(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };
  makeMap('text,number,password,search,email,tel,url');

  function createElement(vm, tag) {
    var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var children = arguments.length > 3 ? arguments[3] : undefined;

    if (typeof children == 'string') {
      children = [vnode(undefined, undefined, undefined, children)];
    }

    if (Array.isArray(children) && typeof children[0] === 'function') {
      attrs = attrs || {};
      attrs.scopedSlots = {
        "default": children[0]
      };
      children.length = 0;
    } // 如果是原始标签


    if (isReservedTag(tag)) {
      return vnode(tag, attrs, children, undefined);
    } else {
      //如果是组件
      var Ctor = vm.$options.components[tag];
      return createComponent$1(vm, tag, attrs = {}, children, Ctor);
    }
  }
  function createTextNode(vm, text) {
    return vnode(undefined, undefined, undefined, text);
  }

  function createComponent$1(vm, tag) {
    var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var children = arguments.length > 3 ? arguments[3] : undefined;
    var Ctor = arguments.length > 4 ? arguments[4] : undefined;

    if (isObject$1(Ctor)) {
      // vm.$options._base 就是 Vue
      Ctor = vm.$options._base.extend(Ctor);
    }

    attrs.hook = {
      init: function init(vnode) {
        var Ctor = vnode.componentOptions.Ctor;
        var child = vnode.componentInstance = new Ctor({
          _isComponent: true
        });
        child.$mount();
      },
      inserted: function inserted() {}
    };
    return vnode("vue-component-".concat(Ctor.cid, "-").concat(tag), attrs, undefined, undefined, {
      Ctor: Ctor,
      children: children
    });
  }

  function vnode(tag, attrs, children, text, componentOptions) {
    return {
      tag: tag,
      attrs: attrs,
      key: attrs === null || attrs === void 0 ? void 0 : attrs.key,
      children: children,
      text: text,
      componentOptions: componentOptions // ...

    };
  }

  function renderMixin(Vue) {
    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this);
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm, vm.$createElement);
      console.log("🚀 ~ file: render.js ~ line 15 ~ renderMixin ~ vnode", vnode);
      return vnode;
    }; // 创建普通dom


    Vue.prototype._c = function (tag, attrs) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return createElement(this, tag, attrs, children);
    }; // 创建文本dom


    Vue.prototype._v = function (text) {
      return createTextNode(this, text);
    }; // JSON


    Vue.prototype._s = function (val) {
      if (_typeof(val) === "object") return JSON.stringify(val);
      return val;
    };
  }
  function initRender(vm) {
    vm._vnode = null; // the root of the child tree

    vm._staticTrees = null; // v-once cached trees

    vm.$options;

    vm.$createElement = function (a, b, c) {
      return createElement(vm, a, b, c);
    };
  }

  // NOTE 标签名

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // NOTE 标签名捕获 通过正则的分组查找

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // NOTE 匹配开始标签

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // NOTE 匹配整个标签的关闭

  var startTagClose = /^\s*(\/?)>/; // NOTE 匹配结束标签

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // NOTE 匹配属性

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  makeMap('script,style,textarea', true);
  makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
  makeMap('pre,textarea', true);

  function parseHTML(html) {
    var ELEMENT_TYPE = 1;
    var TEXT_TYPE = 3;
    var stack = [];
    var currentParent; // 指向的是栈中的最后一个

    var root;

    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    function start(tag, attrs) {
      var node = createASTElement(tag, attrs); // 创造一个ast节点

      if (!root) {
        // 看一下是否为空树
        root = node; // 如果为空则当前是树的根节点
      }

      if (currentParent) {
        node.parent = currentParent; // 只赋予了parent属性

        currentParent.children.push(node); // 还需要让父亲记住自己
      }

      stack.push(node);
      currentParent = node;
    }

    function chars(text) {
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: TEXT_TYPE,
          text: text,
          parent: currentParent
        });
      }
    }

    function end(tag) {
      stack.pop();
      currentParent = stack[stack.length - 1];
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          // 标签名
          attrs: []
        };
        advance(start[0].length); // 如果不是开始标签的结束 就一直匹配下去

        var attr, _end;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }

      return false;
    }

    while (html) {
      // html最开始肯定是一个 <   <div>hello</div>
      // 如果textEnd = 0 说明是一个开始标签或者结束标签
      // 如果textEnd > 0 说明就是文本的结束位置
      var textEnd = html.indexOf('<'); // 如果indexOf中的索引是0 则说明是个标签

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      if (textEnd > 0) {
        var text = html.substring(0, textEnd); // 文本内容

        if (text) {
          chars(text);
          advance(text.length);
        }
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ asdsadsa }} 匹配到的内容是我们表达式的变量

  function genProps(attrs) {
    var str = ''; // {name,value}

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          // color:red => {color:'red'}
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(node) {
    if (node.type === 1) {
      return codegen(node);
    } else {
      // 文本
      var text = node.text;

      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        // _c 元素 _s文本 _v 文本变量 {{name}}
        // _v(_s(name)+'hello'+_v(name))
        var tokens = [];
        var match;
        var lastIndex = 0;
        defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          var index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(children) {
    return children === null || children === void 0 ? void 0 : children.map(function (child) {
      return gen(child);
    }).join(',');
  }

  function codegen(ast) {
    var children = genChildren(ast.children);
    var code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length > 0 ? genProps(ast.attrs) : "null").concat(ast.children.length ? ",".concat(children) : '', ")");
    return code;
  }

  function compileToFunction(template) {
    // 1. 将template转换成ast语法树
    var ast = parseHTML(template); // 2. 生成render方法(render方法执行后返回的结果就是 虚拟DOM)
    // 模版引擎的实现原理 就是 with + new Function()

    var code = "with(this){return ".concat(codegen(ast), "}");
    var render = new Function(code);
    return render;
  }

  function patch(oldVnode, vnode) {
    // 如果 oldVnode 没有值，说明是组件的挂载 ，调用如下会走到这里
    // 🚀 ~ file: create-element.js ~ line 32 ~ init ~ child.$mount()
    if (!oldVnode) {
      // 当组件挂载的时候，由于没有 $el 也就是oldVnode 会走到这里来
      // 然后这里利用 调用组件的_render方法得到的render函数返回的vnode创建出一个真实的dom节点
      // 并且返回这个真实dom 
      //这样子组件的$el就有值了 哈哈哈
      // vm.$el = patch(vm.$el,vnode)
      return createElm(vnode);
    } else {
      // NOTE 1、真实dom节点
      var isRealElement = oldVnode.nodeType;

      if (isRealElement) {
        var oldElm = oldVnode; // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉

        var parentElm = oldVnode.parentNode;
        var elm = createElm(vnode);
        parentElm.insertBefore(elm, oldVnode.nextSibling); // insertBefore() 方法在您指定的已有子节点之前插入新的子节点。

        parentElm.removeChild(oldElm); // 将渲染完成的真实dom节点返回

        return elm;
      }
    }
  } // NOTE 返回真实 dom节点元素

  function createElm(vnode) {
    var tag = vnode.tag;
        vnode.attrs;
        var _vnode$children = vnode.children,
        children = _vnode$children === void 0 ? [] : _vnode$children,
        text = vnode.text;
        vnode.vm; // 普通元素

    if (typeof tag === "string") {
      // 实例化组件
      if (createComponent(vnode)) {
        // 组件应该返回真实 dom
        return vnode.componentInstance.$el;
      }

      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        //递归创建儿子节点
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function createComponent(vnode) {
    var _i, _i2;

    // 创建组件实例
    var i = vnode.attrs;

    if ((i = (_i = i) === null || _i === void 0 ? void 0 : _i.hook) && (i = (_i2 = i) === null || _i2 === void 0 ? void 0 : _i2.init)) {
      i(vnode);
    } // 执行完毕后


    if (vnode.componentInstance) {
      return vnode.componentInstance.$el;
    }
  } // 更新属性


  function updateProperties(vnode) {
    var newProps = vnode.data || {};
    var el = vnode.el;

    for (var key in newProps) {
      if (key == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key == 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this; // INFO 初始化 + 更新
      // 用虚拟节点创建真实节点替换掉 $el

      vm.$el = patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    vm.$options;
    vm.$el = el;
    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      // NOTE 1.调用render函数，生成虚拟dom
      // NOTE 2.用虚拟dom 生成真实dom
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {
      callHook(vm, 'beforeUpdate');
    }, true);
    callHook(vm, 'mounted');
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      handlers.forEach(function (hook) {
        return hook.call(vm);
      });
    }
  }

  var ASSET_TYPES = ['component', 'directive', 'filter'];
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

  var strats = {}; // 合并生命周期策略

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  }); // 合并组件策略

  strats.components = function mergeAssets(parentVal, childVal) {
    var res = Object.create(parentVal); // res.__proto__ = parentVal

    if (childVal) {
      for (var key in childVal) {
        res[key] = childVal[key];
      }
    }

    return res;
  }; // 通过原型链
  // $options:{
  //   components:{
  //     my-component3:{name: 'my-component3', data: ƒ}
  //     __proto__:{
  //       my-component: ƒ VueComponent(options),
  //       my-component2: ƒ VueComponent(options),
  //     }
  //   }
  // }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */


  function mergeOptions(parent, child, vm) {
    // normalizeProps(child, vm)
    // normalizeInject(child, vm)
    // normalizeDirectives(child)
    var options = {};
    var key;

    for (key in parent) {
      mergeField(key);
    }

    for (key in child) {
      // 如果已经合并过了就不需要再次合并了
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }

    function mergeField(key) {
      if (strats[key]) {
        return options[key] = strats[key](parent[key], child[key]);
      }

      if (_typeof(parent[key]) === 'object' && _typeof(child[key]) == 'object') {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }

  function initMixin$1(Vue) {
    Vue.prototype._init = function (options) {
      //TAG：this和vm保存的是同一个对象的地址，所以vm上面增加内容了，对应的Vue
      //TAG：实例对象也会增加
      var vm = this; // 将用户自己的 options 和 Vue 上面的进行合并

      vm.$options = mergeOptions(vm.constructor.options, options);
      vm._self = vm;
      initRender(vm); //NOTE：1、对数据进行初始化

      callHook(vm, 'beforeCreate');
      initState(vm);
      callHook(vm, 'created'); //NOTE: 2、编译挂载

      if (vm.$options.el) {
        // 将数据挂载到这个模板上面
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = typeof el === 'string' ? document.querySelector(el) : el;
      vm.$el = el; // 如果用户没有传入render函数

      if (!options.render) {
        var template = options.template; // 没有传 template且 el 存在

        if (!template && el) {
          // 取最外层的那个 dom 字符串 outerHTML
          template = el.outerHTML; // 把模板变成 render 函数
        }

        var render = compileToFunction(template);
        options.render = render;
      } // 调用 render方法渲染为真正的dom替换页面的内容
      //NOTE 组件的第一次挂载


      mountComponent(vm, el);
    };
  }
  /**
   * <div id="d">
      <p>Content</p>
      <p>Further Elaborated</p>
    </div>  
    字符串 '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
   */

  function initMixin(Vue) {
    Vue.mixin = function (mixin) {
      // 这里的 this 就是 Vue 
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }

  function initUse(Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      } // additional parameters


      var args = toArray(arguments, 1);
      args.unshift(this);

      if (isFunction(plugin.install)) {
        plugin.install.apply(plugin, args);
      } else if (isFunction(plugin)) {
        plugin.apply(null, args);
      }

      installedPlugins.push(plugin);
      return this;
    };
  }

  function initAssetRegisters(Vue) {
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (id, definition) {
        if (!definition) {
          return this.options[type + 's'][id];
        } else {
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition); // 这个时候的 definition 是一个构造函数，继承自 Vue
          }

          if (type === 'directive' && isFunction(definition)) {
            definition = {
              bind: definition,
              update: definition
            };
          } // 不是组件 指令那就只能是过滤器了
          // NOTE：这里是重点 。。。


          this.options[type + 's'][id] = definition;
          return definition;
        }
      }; // Vue.component() 只要调用这个方法就会往Vue.options.components里面增加组件
      // Vue.directive()只要调用这个方法就会往Vue.options.directives里面增加指令
      // Vue.filter()只要调用这个方法就会往Vue.options.filters里面增加过滤器

    });
  }

  function initExtend(Vue) {
    Vue.cid = 0;
    var cid = 1; // 类的继承

    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid; // 做一个缓存(缓存构造函数)

      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }

      var Sub = function VueComponent(options) {
        this._init(options);
      };

      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub['super'] = Super; // if (Sub.options.props) {
      //   initProps(Sub)
      // }
      // if (Sub.options.computed) {
      //   initComputed(Sub)
      // }

      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });

      if (name) {
        Sub.options.components[name] = Sub;
      } // cache constructor


      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {};
    Vue.options._base = Vue;
    initMixin(Vue);
    initUse(Vue);
    initExtend(Vue); // 初始化全局 过滤器 组件 指令

    ASSET_TYPES.forEach(function (type) {
      return Vue.options["".concat(type, "s")] = Object.create({});
    });
    initAssetRegisters(Vue);
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin$1(Vue);
  stateMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue); // 初始化全局API mixin 

  initGlobalAPI(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
