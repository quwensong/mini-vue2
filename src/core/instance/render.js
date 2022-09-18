import { createElement,createTextElement } from "../vdom/index"

export function renderMixin(Vue){
  // 创建普通dom
  Vue.prototype._c = function(tag,attrs,...children){
    return createElement(this,tag,attrs,...children)
  }
  // 创建文本dom
  Vue.prototype._v = function(text){
    return createTextElement(this,text)
  }
  // JSON
  Vue.prototype._s = function(val){
    if(typeof val === "object") return JSON.stringify(val)    
    return val
  }
  Vue.prototype._render = function(){
    const vm = this

    const { render } = vm.$options
    const vnode = render.call(vm)
    return vnode
  }
}