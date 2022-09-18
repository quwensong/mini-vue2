export function createElement(vm,tag,attrs,...children){
  return vnode(vm,tag,attrs,children,undefined)
}

export function createTextElement(vm,text){
  return vnode(vm,undefined,undefined,undefined,text)
}

function vnode(vm,tag,attrs,children,text){
  return {
    vm,
    tag,
    attrs,
    key:attrs?.key,
    children,
    text
    // ...
  }
}