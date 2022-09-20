import { isReservedTag } from '../../utils/web'
import { isObject } from '../../util'

export function createElement(vm,tag,attrs={},...children){

  // 如果是原始标签
  if(isReservedTag(tag)){
    return vnode(tag,attrs,children,undefined)
  }else{//如果是组件
    const Ctor = vm.$options.components[tag]

    return createComponent(vm,tag,attrs={},children,Ctor)
  }

}

export function createTextNode(vm,text){
  return vnode(undefined,undefined,undefined,text)
}

function createComponent(vm,tag,attrs={},children,Ctor){
  if(isObject(Ctor)){
    // vm.$options._base 就是 Vue
    Ctor = vm.$options._base.extend(Ctor)
  }
  
  attrs.hook = {
    init(vnode){
      const { Ctor } = vnode.componentOptions
      let child = vnode.componentInstance = new Ctor({_isComponent: true})
      child.$mount()
    },
    inserted(){
    }
  }
  return vnode(`vue-component-${Ctor.cid}-${tag}`,attrs,undefined,undefined,{Ctor,children})
}

function vnode(tag,attrs,children,text,componentOptions){
  return {
    tag,
    attrs,
    key:attrs?.key,
    children,
    text,
    componentOptions
    // ...
  }
}