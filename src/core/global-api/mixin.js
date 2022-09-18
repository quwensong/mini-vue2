import { mergeOptions } from "../../utils/mergeOptions";

export function initMixin(Vue){
  Vue.mixin = function(mixin){
    // 这里的 this 就是 Vue
    this.options = mergeOptions(this.options, mixin);
    return this;
  }
}