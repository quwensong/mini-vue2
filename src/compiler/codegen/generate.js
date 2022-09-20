const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{ asdsadsa }} 匹配到的内容是我们表达式的变量

function genProps(attrs) {
  let str = ''; // {name,value}
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      // color:red => {color:'red'}
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':');
        obj[key] = value
      })
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}
function gen(node) {
  if (node.type === 1) {
    return codegen(node)
  } else {
    // 文本
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    } else {
      // _c 元素 _s文本 _v 文本变量 {{name}}
      // _v(_s(name)+'hello'+_v(name))
      let tokens = [];
      let match;
      let lastIndex = 0;
      defaultTagRE.lastIndex = 0;
      while (match = defaultTagRE.exec(text)) {
        let index = match.index;
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length

      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}
function genChildren(children) {
  return children?.map(child => gen(child)).join(',')
}
export function codegen(ast) {
  const children = genChildren(ast.children)
  const code = `_c('${ast.tag}',${ast.attrs.length > 0 ? genProps(ast.attrs) : `null`}${ast.children.length ? `,${children}` : ''})`
  return code
}
