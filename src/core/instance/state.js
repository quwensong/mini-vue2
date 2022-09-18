import { set,del,observer } from '../observer/index'
import { isFunction } from '../../util'
import Watcher from '../observer/watcher'

export function initState(vm){
  const options = vm.$options
  // NOTE: 1、props 初始化
  if(options.props){
    // initProps()

  }
  // NOTE: 2、data 初始化
  if(options.data){
    initData(vm)

  }
  // NOTE: 3、computed 初始化
  if(options.computed){
    // initComputed()
  }
  // NOTE: 4、watch 初始化
  if(options.watch){
      // initWatch()
  }


  
}

function proxy(vm,source,key){
  Object.defineProperty(vm,key,{
    get() {
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}

function initData(vm){
  let data = vm.$options.data
  // INFO: Vue2中会将data中所有的数据进行劫持 Object.defineProperty
  if(!isFunction(data)){
  }else{
    // TAG 绑定this 通过_data进行关联
    data = vm._data = data.call(vm)
  }
  // TAG 用户 vm.name 代理--> vm._data.name 
  for(let key in data){
    proxy(vm,'_data',key)
  }
  // NOTE: 1、把 data 变成响应式
  observer(data)
} 




export function stateMixin(Vue) {
  // Vue.js中计算属性（Computed）的实现原理与expOrFn支持函数有很大的关系

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (expOrFn,cb,options) {
    const vm = this
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    // NOTE: 1.代码会判断用户是否使用了immediate参数，如果使用了，则立即执行一次cb。
    if (options.immediate) {
      cb.call(vm,watcher.value)
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}


