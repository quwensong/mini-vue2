const oldArrProto = Array.prototype
export const arrayMethods = Object.create(oldArrProto);
// Object.create 使用现有的对象来作为新创建对象的原型
const methods = [
  'push',
  'unshift',
  'splice',
  'pop',
  'reserve',
  'sort',
  'shift'
]
// configurable:false,//能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
// enumerable:false,//对象属性是否可通过for-in循环，flase为不可循环，默认值为true
// writable:false,//对象属性是否可修改,flase为不可修改，默认值为true

// 用户调用的是以上七个方法会用自己重写的，否则就用原来的数组原型上面的方法
methods.forEach(method =>{
  // NOTE 缓存原始方法
  const original = oldArrProto[method]
  // 代理
  Object.defineProperty(arrayMethods,method,{
    value:function mutator(...args){
      const result = original.call(this,...args)
      const ob = this.__ob__
      let inserted;
      switch(method){
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2)
          break;
        default:
          break;
      }
      // 如果有新增加的值要继续进行劫持
      if(inserted) ob.observerArray(inserted)
      ob.dep.notify()
      return result
    },
    enumerable:false,
    writable:false,
    configurable:false
  })
    
    
})


