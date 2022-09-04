import { patch } from './vdom/patch'
import Watcher from './observer/watcher'

export function lifecycleMixin(Vue){
  Vue.prototype._update = function(vnode){
    const vm = this;
    // INFO 初始化 + 更新
    // console.log(vm.$el,vnode)
    patch(vm.$el,vnode)
  }
}

export function mountComponent(vm,el){
  
  const updateComponent = () => {
    // NOTE 1.调用render函数，生成虚拟dom
    // NOTE 2.用虚拟dom 生成真实dom
    vm._update(vm._render())

  }
  // updateComponent()

  new Watcher(vm, updateComponent,()=>{},true)
}