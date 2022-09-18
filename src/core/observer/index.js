import { isObject,def,isValidArrayIndex,isArray,hasOwn} from "../../util"
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

export function set(target,key,val) {
  // target是数组并且key是一个有效的索引值，就先设置length属性
  if (isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 由于key已经存在于target中，所以其实这个key已经被侦测了变化。也就是说，这种情况属于修改数据，直接用key和val改数据就好了
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = target.__ob__;
  // 那么，什么是根数据？this.$data就是根数据。
  if (target._isVue || (ob && ob.vmCount)) {
      console.warn('target不能是Vue.js实例或Vue.js实例的根数据对象')
    return val
  }
  // 不是响应式数据直接赋值就行
  if (!ob) {
    target[key] = val
    return val
  }
  // NOTE 处理新增的属性
    /**
   * 如果前面的所有判断条件都不满足，那么说明用户是在响应式数据上
   * 新增了一个属性，这种情况下需要追踪这个新增属性的变化，即使用
   * defineReactive将新增属性转换成getter/setter的形式即可。
   */
  defineReactive(ob.value, key, val)
  // 向target的依赖触发变化通知，并返回val
  ob.dep.notify()
  return val
}

export function del(target, key){
  // 数组
  if(Array.isArray(target) && isValidArrayIndex(key)){
    target.splice(key, 1)
    return
  }
  
  // 对象
  const ob = target.__ob__;

  if (target._isVue || (ob && ob.vmCount)) {
    console.warn('target不能是Vue.js实例或Vue.js实例的根数据对象')
    return 
  }
  // 如果不是target自己的属性就阻止程序继续执行
  if(!hasOwn(target, key)) return

  delete target[key]
  // 只有响应式数据才需要发送通知
  if(!ob) return
  ob.dep.notify()
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