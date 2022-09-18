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
            console.log("🚀 ~ file:inition", definition.prototype)
          }
          if (type === 'directive' && isFunction(definition)) {
            definition = { bind: definition, update: definition }
          }
          // 不是组件 指令那就只能是过滤器了
          this.options[type + 's'][id] = definition
          return definition
        }
      }
    })
}