const defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g //{{ name }}

function genProps(attrs){
  let str = ''
  for (let i = 0; i < attrs.length; i++){
    let attr = attrs[i]
    if(attr.name === 'style'){
      let styleObj = {}
      attr.value.replace(/([^;:]+):([^;:]+)/g,function(){
        styleObj[arguments[1]] = arguments[2]
      })
      attr.value = styleObj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}

function gen(el){
  if(el.type == 1){
    return generate(el)
  }else{
    let text = el.text
    // return  `_v("${text}")`
    if(!defaultTagRe.test(text)){
      return  `_v("${text}")`
    }else{
      let tokens = [];
      let match;
      let lastIndex = defaultTagRe.lastIndex = 0;
      while(match = defaultTagRe.exec(text)){
        let index = match.index;//开始索引
        if(index > lastIndex){
          tokens.push(JSON.stringify(text.slice(lastIndex,index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length //结束索引
      }
      if(lastIndex < text.length){
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}

function genChildren(el){
  let children = el.children
  if(children){
    return children.map(c => gen(c)).join(',')
  }
  return false

}

export function generate(el){
  // 遍历树，将树拼接为字符串
  let children = genChildren(el)
  let code = `_c("${el.tag}",${el.attrs.length ? genProps(el.attrs) : 'undefined'
  }${children? `,${children}`:''})`;
  return code
}