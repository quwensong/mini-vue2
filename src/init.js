import { initState } from "./state"
import { compileToFunction } from './compiler/index'
import { mountComponent } from "./lifecycle"

export function initMixin(Vue){
  Vue.prototype._init = function(options){
    //TAG：this和vm保存的是同一个对象的地址，所以vm上面增加内容了，对应的Vue
    //TAG：实例对象也会增加
    const vm = this
    vm.$options = options

    //NOTE：1、对数据进行初始化
    initState(vm)
    //NOTE: 2、编译挂载

    if(vm.$options.el){
      // 将数据挂载到这个模板上面
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function(el){
    const vm = this;
    const options = vm.$options
    el = typeof el === 'string' ? document.querySelector(el) : el
    vm.$el = el
    
    // 如果用户没有传入render函数
    if(!options.render){
      let template =  options.template 
      // 没有传 template且 el 存在
      if(!template && el){
        // 取最外层的那个 dom 字符串 outerHTML
        template = el.outerHTML
        // 把模板变成 render 函数
        const render = compileToFunction(template)
        // console.log(render)
        options.render = render
      }
    }
    // 调用 render方法渲染为真正的dom替换页面的内容
    //NOTE 组件的第一次挂载
    mountComponent(vm,el) 
  }
}
/**
 * <div id="d">
    <p>Content</p>
    <p>Further Elaborated</p>
  </div>  
  console.log(d.outerHTML);
  字符串 '<div id="d"><p>Content</p><p>Further Elaborated</p></div>'
 */

