import { extend} from '../../util'
import { mergeOptions } from '../../utils/mergeOptions'
import { ASSET_TYPES } from '../../shared/constants'


export function initExtend(Vue) {
  Vue.cid = 0
  let cid = 1
    // 类的继承
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    // 做一个缓存
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }


    const Sub = function VueComponent( options) {
      this._init(options)
    } 

    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
  
    Sub.cid = cid++
    Sub.options = mergeOptions(Super.options, extendOptions)

    Sub['super'] = Super
    
    // if (Sub.options.props) {
    //   initProps(Sub)
    // }
    // if (Sub.options.computed) {
    //   initComputed(Sub)
    // }
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    if (name) {
      Sub.options.components[name] = Sub
    }
    // cache constructor
    cachedCtors[SuperId] = Sub

    return Sub
  }
}



