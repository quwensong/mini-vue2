// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const isPhantomJS = UA && /phantomjs/.test(UA)
export const isFF = UA && UA.match(/firefox\/(\d+)/)

export function isFunction(target){
  return typeof target === 'function'
}

export function isObject(target){
  return typeof target === "object" && target !== null
}

export function isArray(target){
  return Array.isArray(target)
}

/**
 * Mix properties into target object.
 */
 export function extend(to,_from){
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
 const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
 export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

export function def(target,key,value,enumerable){
  Object.defineProperty(target,key,{
    value: value,
    enumerable:!!enumerable,
    writable:true,
    configurable:true
  })
}
/**
 * Check if val is a valid(有效) array index.
 */
 export function isValidArrayIndex(val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/* istanbul ignore next */
export function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

/**
 * Check whether an object has the property.
 */
 const hasOwnProperty = Object.prototype.hasOwnProperty

 export function hasOwn(obj, key){
   return hasOwnProperty.call(obj, key)
 }

 
/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
