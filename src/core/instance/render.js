import { createElement,createTextElement } from "../vdom/index"
import { nextTick } from '../../utils/next-tick'
// vm,tag,attrs,children,normalizationType
export function renderMixin(Vue){

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  }
  
  Vue.prototype._render = function(){
    const vm = this
    const { render } = vm.$options
    const vnode = render.call(vm,vm.$createElement)
    return vnode
  }
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
  
}


export function initRender(vm) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  vm.$createElement = (a, b, c) => createElement(vm, a, b, c)
}


