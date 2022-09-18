import { toArray, isFunction } from '../../util.js'

export function initUse(Vue) {
  Vue.use = function (plugin) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args)
    } else if (isFunction(plugin)) {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
