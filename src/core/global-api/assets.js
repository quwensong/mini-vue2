import { ASSET_TYPES } from '../../shared/constants'
import { isFunction,isPlainObject } from '../../util'

export function initAssetRegisters(Vue){

    ASSET_TYPES.forEach(type => {
      Vue[type] = function (id,definition) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id
            definition = this.options._base.extend(definition)
            // 这个时候的 definition 是一个构造函数，继承自 Vue
          }
          if (type === 'directive' && isFunction(definition)) {
            definition = { bind: definition, update: definition }
          }
          // 不是组件 指令那就只能是过滤器了
          // NOTE：这里是重点 。。。
          this.options[type + 's'][id] = definition
          return definition
        }
      }
      // Vue.component() 只要调用这个方法就会往Vue.options.components里面增加组件
      // Vue.directive()只要调用这个方法就会往Vue.options.directives里面增加指令
      // Vue.filter()只要调用这个方法就会往Vue.options.filters里面增加过滤器
    })
}