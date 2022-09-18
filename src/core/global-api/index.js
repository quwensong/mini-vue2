import { initMixin } from "./mixin";
import { initUse } from "./use";
import { initAssetRegisters } from './assets'
import { initExtend } from './extend';

import { ASSET_TYPES } from '../../shared/constants'

export function initGlobalAPI(Vue){
  Vue.options = {};

  initMixin(Vue)
  initUse(Vue)
  initExtend(Vue)

  // 初始化全局 过滤器 组件 指令
  ASSET_TYPES.forEach(type => Vue.options[`${type}s`] = Object.create({}));
  initAssetRegisters(Vue)

  Vue.options._base = Vue 


}