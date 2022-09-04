export function createElement(vm,tag,attrs,...children){
  return vnode(vm,tag,attrs,attrs.key,children,undefined)
}

export function createTextElement(vm,text){
  return vnode(vm,undefined,undefined,undefined,undefined,text)
}

function vnode(vm,tag,attrs,key,children,text){
  return {
    vm,
    tag,
    attrs,
    key,
    children,
    text
    // ...
  }
}