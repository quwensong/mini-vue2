import { isReservedTag } from '../../utils/web'
import { isObject } from '../../util'

export function createElement(vm,tag,attrs={},...children){

  // 如果是原始标签
  if(isReservedTag(tag)){
    return vnode(vm,tag,attrs,children,undefined)
  }else{//如果是组件
    const Ctor = vm.$options.components[tag]

    return createComponent(vm,tag,attrs={},children,Ctor)
  }

}

export function createTextNode(vm,text){
  return vnode(vm,undefined,undefined,undefined,text)
}

function createComponent(vm,tag,attrs={},children,Ctor){
  if(isObject(Ctor)){
    // vm.$options._base 就是 Vue
    Ctor = vm.$options._base.extend(Ctor)
  }
  return vnode(`vue-component-${Ctor.cid}-${tag}`,attrs,undefined,{Ctor,children})
}

function vnode(vm,tag,attrs,children,text,componentOptions){
  return {
    vm,
    tag,
    attrs,
    key:attrs?.key,
    children,
    text,
    componentOptions
    // ...
  }
}