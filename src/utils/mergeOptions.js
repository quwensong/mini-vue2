import { isFunction,hasOwn,isObject } from '../util'
import { LIFECYCLE_HOOKS } from '../shared/constants'
/**
 * Default strategy.
 */
 const defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal
}
// 策略
let strats = {}
// 合并生命周期
function mergeHook(parentVal,childVal){
  if(childVal){
    if(parentVal){
      return parentVal.concat(childVal)
    }else{
      return [childVal]
    }
  }else{
    return parentVal;
  }
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
 export function mergeOptions(parent,child,vm) {

  // normalizeProps(child, vm)
  // normalizeInject(child, vm)
  // normalizeDirectives(child)
  const options = {} 
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    // 如果已经合并过了就不需要再次合并了
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    if(strats[key]){
      return options[key] = strats[key](parent[key],child[key])
    }
    if(typeof parent[key] === 'object' && typeof child[key] == 'object') {
      options[key] = {
        ...parent[key],
        ...child[key]
      }
    }else if(child[key] == null){
      options[key] = parent[key]
    }else{
      options[key] = child[key]
    }
  }
  return options
}
