const oldArrayPrototype = Array.prototype
export const arrayMethods = Object.create(Array.prototype);
// Object.create 使用现有的对象来作为新创建对象的原型
let methods = [
  'push',
  'unshift',
  'splice',
  'pop',
  'reserve',
  'sort',
  'shift'
]
// 用户调用的是以上七个方法会用自己重写的，否则就用原来的数组原型上面的方法
methods.forEach(method =>{
  arrayMethods[method] = function(...args){
    console.log('数组发生变化')
    // oldArrayPrototype[method].apply(this,args)
    oldArrayPrototype[method].call(this,...args)
    let inserted;
    let ob = this.__ob__;
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
    
  }
})


