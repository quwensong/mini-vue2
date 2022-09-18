import { patch } from '../../core/vdom/patch'
import Watcher from '../../core/observer/watcher'

export function lifecycleMixin(Vue){
  Vue.prototype._update = function(vnode){
    const vm = this;
    // INFO 初始化 + 更新
    // 用虚拟节点创建真实节点替换掉 $el
    vm.$el = patch(vm.$el,vnode)
  }
}

export function mountComponent(vm,el){
  const options = vm.$options
  vm.$el = el;
  callHook(vm,'beforeMount')
  const updateComponent = () => {
    // NOTE 1.调用render函数，生成虚拟dom
    // NOTE 2.用虚拟dom 生成真实dom
    vm._update(vm._render())

  }

  new Watcher(vm, updateComponent,()=>{},true)
  callHook(vm,'mounted')
}

export function callHook(vm,hook){
  const handlers = vm.$options[hook]
  if(handlers){
    handlers.forEach(hook =>  hook.call(vm))
  }
}