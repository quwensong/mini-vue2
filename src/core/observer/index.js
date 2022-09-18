import { isObject,def } from "../../utils"
import { arrayMethods } from './array'
import Dep from './dep'

// NOTE 检查__ob__是否可用
const hasProto = '__ob__' in {}
const arrKeys = Object.getOwnPropertyNames(arrayMethods)

//INFO 观测者类 类有类型，对象没有类型
class Observer {
  constructor(value) {
    this.value = value,
    this.dep = new Dep()
    def(value,'__ob__',this)

    // value.__ob__ = this;//所有被劫持的属性都有 __ob__
    // NOTE 2、对value中的数据进行遍历循环 劫持 
    if(Array.isArray(value)){ //数组劫持 
      // 内部对数组不采用 Object.defineProperty
      // 对数组原来的方法进行改写 push shift pop unshift reserve sort splice/ 
      // __proto__指向构造函数的原型（prototype）对象 
      const augment = hasProto ? protoAugment : copyAugment
      augment(value,arrayMethods,arrKeys)

      // TAG 如果数组里面的是对象，则需要劫持对象
      this.observerArray(value)

    }else{
      this.walk(value) //对象劫持
    }
    
  }
  // 遍历对象
  walk(value) {
    // NOTE 3、遍历对象，响应式劫持
    Object.keys(value).forEach((key)=> defineReactive(value,key,value[key]))
  }
  // 遍历数组
  observerArray(value){
    value.forEach((item)=> observer(item))
  }

}

function defineReactive(data, key, value) {
  // NOTE 4、value有可能是对象，再进行递归劫持
  const childOb = observer(value)
  // 每个属性都对应一个 dep
  let dep = new Dep()
  Object.defineProperty(data, key,{
    get(){
      // 取值的时候将wtacher和dep关联起来
      // Dep.target
      if(window.target){
        // 收集对象依赖(watcher)
        dep.depend()
        // 收集数组依赖(watcher)
        if(childOb) childOb.dep.depend()
      }
      return value;
    },
    set(newValue){
      // NOTE 5、如果用户赋值一个新的对象需要将这个对象也进行劫持
      // TAG：只有新增加的属性是对象才会进行监听劫持
      if(newValue !== value){
        observer(newValue)
        // (对象触发收集的 watcher )告诉当前的属性存放的wtacher执行get()
        dep.notify()
        value = newValue
      }
    }
  })
}

function protoAugment(target,src,keys){
  target.__ob__ = src
}
function copyAugment(target,src,keys){
  for(var i=0;i<keys.length;i++){
    const key = keys[i]
    def(target,key,src[key])
  }
}

export function observer(value){
  // NOTE: 1、如果是对象才进行观测
  if(!isObject(value)) return 
  // NOTE: 2、如果是响应式的也没必要再进行观测了

  let ob = null;
  if(value.__ob__ && value.__ob__ instanceof Observer){
    ob = value.__ob__
  }else{
    ob = new Observer(value)
  }
  return ob
}