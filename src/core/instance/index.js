import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'

//NOTE: options 为用户传入的配置项
function Vue(options){

  this._init(options)

}

initMixin(Vue)
stateMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

export default Vue