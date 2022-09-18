(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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

  function isFunction(target) {
    return typeof target === 'function';
  }
  function isObject$1(target) {
    return _typeof(target) === "object" && target !== null;
  }
  function def(target, key, value, enumerable) {
    Object.defineProperty(target, key, {
      value: value,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
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
          return observer(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // NOTE 4、value有可能是对象，再进行递归劫持
    var childOb = observer(value); // 每个属性都对应一个 dep

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
          observer(newValue); // (对象触发收集的 watcher )告诉当前的属性存放的wtacher执行get()

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

  function observer(value) {
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

  var queue = [];
  var has = {};

  function queueWatch(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      queue.push(watcher);
      has[id] = true;
      setTimeout(function () {
        queue.forEach(function (watcher) {
          return watcher.run();
        });
        queue = [];
        has = {};
      }, 0);
    }
  }

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


    observer(data);
  }

  function stateMixin(Vue) {
    // Vue.js中计算属性（Computed）的实现原理与expOrFn支持函数有很大的关系
    // Vue.prototype.$set = set
    // Vue.prototype.$delete = del
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

  // Regular Expressions for parsing tags and attributes
  // NOTE 标签名
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // NOTE 标签名捕获 通过正则的分组查找

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // NOTE 匹配开始标签

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // NOTE 匹配整个标签的关闭

  var startTagClose = /^\s*(\/?)>/; // NOTE 匹配结束标签

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // NOTE 匹配属性

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      parent: null,
      attrs: attrs
    };
  }

  var root = null;
  var stack = [];

  function start(tagName, attributes) {
    var parent = stack[stack.length - 1];
    var element = createAstElement(tagName, attributes);

    if (!root) {
      root = element;
    }

    element.parent = parent;

    if (parent) {
      parent.children.push(element);
    }

    stack.push(element);
  }

  function end(tagName) {
    var last = stack.pop();

    if (last.tag !== tagName) {
      throw new Error("标签有误");
    }
  }

  function chars(text) {
    text = text.replace(/\s/g, "");
    var parent = stack[stack.length - 1];

    if (text) {
      parent.children.push({
        type: 3,
        text: text
      });
    }
  }

  function parserHTML(html) {
    function advance(len) {
      html = html.substring(len);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end;

        var attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }

      return false;
    } // 解析 template 字符串


    while (html) {
      //看解析的内容是否存在
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        var startTagMatch = parseStartTag(); //解析开始标签

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag); //解析结束标签

        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      }

      var text = void 0; // 1234</div>

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        chars(text);
        advance(text.length);
      }
    }

    return root;
  }

  var defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{ name }}

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var styleObj = {};
          attr.value.replace(/([^;:]+):([^;:]+)/g, function () {
            styleObj[arguments[1]] = arguments[2];
          });
          attr.value = styleObj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(el) {
    if (el.type == 1) {
      return generate(el);
    } else {
      var text = el.text; // return  `_v("${text}")`

      if (!defaultTagRe.test(text)) {
        return "_v(\"".concat(text, "\")");
      } else {
        var tokens = [];
        var match;
        var lastIndex = defaultTagRe.lastIndex = 0;

        while (match = defaultTagRe.exec(text)) {
          var index = match.index; //开始索引

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length; //结束索引
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (c) {
        return gen(c);
      }).join(',');
    }

    return false;
  }

  function generate(el) {
    // 遍历树，将树拼接为字符串
    var children = genChildren(el);
    var code = "_c(\"".concat(el.tag, "\",").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  function compileToFunction(template) {
    // TAG html -> ast -> render -> vnode -> 真实dom
    // NOTE 1、html -> ast
    var root = parserHTML(template); // NOTE 2、ast -> render

    var code = generate(root); // _c("div",),_v("hhha"+_s(name)+"hello"),_c("span",{class:"span"}),_v("hello")))
    //模板引擎靠的是 new Function + with

    var render = new Function("with(this){return ".concat(code, "}")); // 谁调用的render，this就指向谁

    return render;
  }

  function patch(oldVnode, vnode) {
    // NOTE 1、真实dom节点
    var el = null;
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode; // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉

      var parentElm = oldVnode.parentNode;
      var elm = createElm(vnode);
      el = parentElm.insertBefore(elm, oldVnode.nextSibling); // insertBefore() 方法在您指定的已有子节点之前插入新的子节点。

      parentElm.removeChild(oldElm);
    }

    return el;
  }

  function createElm(vnode) {
    var tag = vnode.tag;
        vnode.attrs;
        var children = vnode.children,
        text = vnode.text;
        vnode.vm; // 普通元素

    if (typeof tag === "string") {
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
  } // 更新属性


  function updateProperties(vnode) {
    vnode.data || {};
    vnode.el;
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

    var updateComponent = function updateComponent() {
      // NOTE 1.调用render函数，生成虚拟dom
      // NOTE 2.用虚拟dom 生成真实dom
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {}, true);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      //TAG：this和vm保存的是同一个对象的地址，所以vm上面增加内容了，对应的Vue
      //TAG：实例对象也会增加
      var vm = this;
      vm.$options = options; //NOTE：1、对数据进行初始化

      initState(vm); //NOTE: 2、编译挂载

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

          var render = compileToFunction(template);
          options.render = render;
        }
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

  function createElement(vm, tag, attrs) {
    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    return vnode(vm, tag, attrs, attrs.key, children, undefined);
  }
  function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, attrs, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      attrs: attrs,
      key: key,
      children: children,
      text: text // ...

    };
  }

  function renderMixin(Vue) {
    // 创建普通dom
    Vue.prototype._c = function (tag, attrs) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return createElement.apply(void 0, [this, tag, attrs].concat(children));
    }; // 创建文本dom


    Vue.prototype._v = function (text) {
      return createTextElement(this, text);
    }; // JSON


    Vue.prototype._s = function (val) {
      if (_typeof(val) === "object") return JSON.stringify(val);
      return val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
