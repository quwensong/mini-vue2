import { isObject } from "../utils"
import { arrayMethods } from './array'
import Dep,{ pushTarget,popTarget}from './dep'

//INFO 观测者类 类有类型，对象没有类型
class Observer {
  constructor(data) {
    Object.defineProperty(data,'__ob__',{
      value:this,
      enumerable:false
    })
    // data.__ob__ = this;//所有被劫持的属性都有 __ob__
    // NOTE 2、对data中的数据进行遍历循环 劫持 
    if(Array.isArray(data)){ //数组劫持 
      // 内部对数组不采用 Object.defineProperty
      // 对数组原来的方法进行改写 push shift pop unshift reserve sort splice/ 
      // __proto__指向构造函数的原型（prototype）对象 
      data._proto_ = arrayMethods
      // TAG 如果数组里面的是对象，则需要劫持对象
      this.observerArray(data)

    }else{
      this.walk(data) //对象劫持
    }
    
  }
  // 遍历对象
  walk(data) {
    // NOTE 3、遍历对象，响应式劫持
    Object.keys(data).forEach((key)=> defineReactive(data,key,data[key]))
  }
  // 遍历数组
  observerArray(data){
    data.forEach((item)=> observer(item))
  }

}

function defineReactive(data, key, value) {
  // NOTE 4、value有可能是对象，再进行递归劫持
  observer(value)
  // 每个属性都对应一个 dep
  let dep = new Dep()
  Object.defineProperty(data, key,{
    get(){
      // 取值的时候将wtacher和dep关联起来
      // Dep.target
      if(Dep.target){
        dep.depend()
      }
      return value;
    },
    set(newValue){
      // NOTE 5、如果用户赋值一个新的对象需要将这个对象也进行劫持
      // TAG：只有新增加的属性是对象才会进行监听劫持
      if(newValue !== value){
        observer(newValue)
        value = newValue
        // 告诉当前的属性存放的wtacher执行get()
        dep.notify()
      }

    }
  })
}

export function observer(data){
  // NOTE: 1、如果是对象才进行观测
  if(!isObject(data)){
    return 
  }
  if(data.__ob__){
    return
  }
  new Observer(data)
}