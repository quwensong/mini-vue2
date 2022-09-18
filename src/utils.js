export function isFunction(target){
  return typeof target === 'function'
}

export function isObject(target){
  return typeof target === "object" && target !== null
}

export function def(target,key,value,enumerable){
  Object.defineProperty(target,key,{
    value: value,
    enumerable:!!enumerable,
    writable:true,
    configurable:true
  })
}