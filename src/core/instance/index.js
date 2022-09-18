import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import { initGlobalAPI } from '../global-api/index'

//NOTE: options 为用户传入的配置项
function Vue(options){

  this._init(options)

}

initMixin(Vue)
stateMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

// 初始化全局API mixin 
initGlobalAPI(Vue)

export default Vue