export function patch(oldVnode,vnode){
  // NOTE 1、真实dom节点
  
  if(oldVnode.nodeType == 1){
    // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉
    const parentElm = oldVnode.parentNode
    console.log("🚀 ", oldVnode)

    let elm = createElm(vnode)
    parentElm.appendChild(elm, oldVnode.nextSibling)

    parentElm.removeChild(oldVnode)
    
  }
}

function createElm(vnode){
  const {tag,attrs,children,text,vm} = vnode
  // 普通元素
  if(typeof tag === "string"){
    vnode.el = document.createElement(tag)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    });
  }else{
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}