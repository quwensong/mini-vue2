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

  function isFunction(obj) {
    return typeof obj === 'function';
  }
  function isObject(obj) {
    return _typeof(obj) === "object" && obj !== null;
  }

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(Array.prototype); // Object.create 使用现有的对象来作为新创建对象的原型

  var methods = ['push', 'unshift', 'splice', 'pop', 'reserve', 'sort', 'shift']; // 用户调用的是以上七个方法会用自己重写的，否则就用原来的数组原型上面的方法

  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      console.log('数组发生变化'); // oldArrayPrototype[method].apply(this,args)

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));

      var inserted;
      var ob = this.__ob__;

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
    };
  });

  // 每个属性都分配一个Dep,watcher中也要存放这个Dep,多对多
  var id$1 = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++;
      this.subs = []; //存放 watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // dep要存放 watcher watcher也要存放 dep
        if (Dep.target) {
          // 把dep传给watcher存储
          Dep.target.addDep(this);
        }
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget(watcher) {
    Dep.target = null;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false
      }); // data.__ob__ = this;//所有被劫持的属性都有 __ob__
      // NOTE 2、对data中的数据进行遍历循环 劫持 

      if (Array.isArray(data)) {
        //数组劫持 
        // 内部对数组不采用 Object.defineProperty
        // 对数组原来的方法进行改写 push shift pop unshift reserve sort splice/ 
        // __proto__指向构造函数的原型（prototype）对象 
        data._proto_ = arrayMethods; // TAG 如果数组里面的是对象，则需要劫持对象

        this.observerArray(data);
      } else {
        this.walk(data); //对象劫持
      }
    } // 遍历对象


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // NOTE 3、遍历对象，响应式劫持
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      } // 遍历数组

    }, {
      key: "observerArray",
      value: function observerArray(data) {
        data.forEach(function (item) {
          return observer(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    // NOTE 4、value有可能是对象，再进行递归劫持
    observer(value); // 每个属性都对应一个 dep

    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        // 取值的时候将wtacher和dep关联起来
        // Dep.target
        if (Dep.target) {
          dep.depend();
        }

        return value;
      },
      set: function set(newValue) {
        // NOTE 5、如果用户赋值一个新的对象需要将这个对象也进行劫持
        // TAG：只有新增加的属性是对象才会进行监听劫持
        if (newValue !== value) {
          observer(newValue);
          value = newValue; // 告诉当前的属性存放的wtacher执行get()

          dep.notify();
        }
      }
    });
  }

  function observer(data) {
    // NOTE: 1、如果是对象才进行观测
    if (!isObject(data)) {
      return;
    }

    if (data.__ob__) {
      return;
    }

    new Observer(data);
  }

  function initState(vm) {
    // console.log("🚀 ~ file: state.js ~ line 2 ~ initState ~ vm", vm)
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
    // console.log(data)

    if (!isFunction(data)) {
      console.error('data must be a function');
    } else {
      // TAG 绑定this 通过_data进行关联
      data = vm._data = data.call(vm);
    } // TAG 用户 vm.name 代理--> vm._data.name 


    for (var key in data) {
      proxy(vm, '_data', key);
    } // NOTE: 1、把 data 变成响应式


    observer(data);
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
    if (oldVnode.nodeType == 1) {
      // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉
      var parentElm = oldVnode.parentNode;
      console.log("🚀 ", oldVnode);
      var elm = createElm(vnode);
      parentElm.appendChild(elm, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag;
        vnode.attrs;
        var children = vnode.children,
        text = vnode.text;
        vnode.vm; // 普通元素

    if (typeof tag === "string") {
      vnode.el = document.createElement(tag);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, updateComponent, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.exprOrFn = updateComponent;
      this.cb = cb;
      this.options = options;
      this.id = id++; // 默认调用一次更新函数

      this.getter = updateComponent;
      this.deps = [];
      this.depsId = new Set(); // 默认初始化

      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this);
        this.getter();
        popTarget();
      }
    }, {
      key: "update",
      value: function update() {
        this.get();
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
    }]);

    return Watcher;
  }();

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this; // INFO 初始化 + 更新
      // console.log(vm.$el,vnode)

      patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    var updateComponent = function updateComponent() {
      // NOTE 1.调用render函数，生成虚拟dom
      // NOTE 2.用虚拟dom 生成真实dom
      vm._update(vm._render());
    }; // updateComponent()


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

          var render = compileToFunction(template); // console.log(render)

          options.render = render;
        }
      } // 调用 render方法渲染为真正的dom替换页面的内容
      //NOTE 组件的第一次挂载


      mountComponent(vm);
    };
  }
  /**
   * <div id="d">
      <p>Content</p>
      <p>Further Elaborated</p>
    </div>  
    console.log(d.outerHTML);
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

      return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
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
  renderMixin(Vue);
  lifecycleMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
