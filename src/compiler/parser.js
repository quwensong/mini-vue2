// Regular Expressions for parsing tags and attributes
// NOTE 标签名
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// NOTE 标签名捕获 通过正则的分组查找
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// NOTE 匹配开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// NOTE 匹配整个标签的关闭
const startTagClose = /^\s*(\/?)>/
// NOTE 匹配结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
// NOTE 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being pased as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/
// NOTE 匹配 {{ }}
const defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g

function createAstElement(tagName, attrs){
  return {
    tag:tagName,
    type:1,
    children:[],
    parent:null,
    attrs
  }
}
let root = null
let stack = []
function start(tagName,attributes){
  let parent = stack[stack.length - 1]
  let element = createAstElement(tagName, attributes)
  if(!root){
    root = element
  }
  element.parent = parent
  if(parent){
    parent.children.push(element)
  }
  stack.push(element)
}
function end(tagName){
  let last = stack.pop()
  if(last.tag !==  tagName){
    throw new Error("标签有误")
  }
}
function chars(text){
  text = text.replace(/\s/g,"")
  let parent = stack[stack.length - 1]
  if(text){
    parent.children.push({
      type:3,
      text
    })
  }
}
export function parserHTML(html){
  function advance(len){
    html = html.substring(len)
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(start){
      const match = {
        tagName: start[1],
        attrs:[]
      }
      advance(start[0].length)
      let end
      let attr
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
        match.attrs.push({name:attr[1],value:attr[3] || attr[4] || attr[5]})
        advance(attr[0].length)
      }
      if(end){
        advance(end[0].length)
      }
      return match;
    }
    return false;
  }
  // 解析 template 字符串
  while(html){ //看解析的内容是否存在
    let textEnd = html.indexOf('<')
    if(textEnd == 0){
      const startTagMatch = parseStartTag() //解析开始标签
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs,)
        continue
      } 
      const endTagMatch = html.match(endTag) //解析结束标签
      if(endTagMatch){
        end(endTagMatch[1])
        advance(endTagMatch[0].length)
        continue
      }
    }
    let text; // 1234</div>
    if(textEnd > 0){
      text = html.substring(0,textEnd)
    }
    if(text){
      chars(text)
      advance(text.length)
    }
  }
  return root
}
