export function patch(oldVnode,vnode){
  // 如果 oldVnode 没有值，说明是组件的挂载 ，调用如下会走到这里
  // 🚀 ~ file: create-element.js ~ line 32 ~ init ~ child.$mount()
  if(!oldVnode){
    // 当组件挂载的时候，由于没有 $el 也就是oldVnode 会走到这里来
    // 然后这里利用 调用组件的_render方法得到的render函数返回的vnode创建出一个真实的dom节点
    // 并且返回这个真实dom 
    //这样子组件的$el就有值了 哈哈哈
    // vm.$el = patch(vm.$el,vnode)
    return createElm(vnode)
  }else{
    // NOTE 1、真实dom节点
    const isRealElement = oldVnode.nodeType
    if(isRealElement){
      const oldElm = oldVnode
      // 先把新的虚拟dom创建为真的dom元素，插入到和当前同一层级，再把原来的自己删掉
      const parentElm = oldVnode.parentNode

      const elm = createElm(vnode)
      parentElm.insertBefore(elm, oldVnode.nextSibling)
      // insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
      parentElm.removeChild(oldElm)
      // 将渲染完成的真实dom节点返回
      return elm
    }
  }
  
}
// NOTE 返回真实 dom节点元素
function createElm(vnode){
  const {tag,attrs,children=[],text,vm} = vnode
  // 普通元素
  if(typeof tag === "string"){
    // 实例化组件
    if(createComponent(vnode)){
      // 组件应该返回真实 dom
      return vnode.componentInstance.$el
    }
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {//递归创建儿子节点
      vnode.el.appendChild(createElm(child))
    });
  }else{
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function createComponent(vnode){
  // 创建组件实例
  let i = vnode.attrs
  if((i = i?.hook) && (i = i?.init)){
    i(vnode)
  }
  // 执行完毕后
  if(vnode.componentInstance){
    return vnode.componentInstance.$el
  }

}
// 更新属性
function updateProperties(vnode){
  const newProps = vnode.data || {};
  const el = vnode.el;

  for(const key in newProps){
    if(key == 'style'){
      for(let styleName in newProps.style){
        el.style[styleName] = newProps.style[styleName]
      }
    }else if(key == 'class'){
      el.className = newProps.class
    }else{
      el.setAttribute(key,newProps)
    }
  }
}