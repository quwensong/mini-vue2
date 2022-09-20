
import { makeMap, no } from '../../shared/utils'
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
const comment = /^<!\--/
const conditionalComment = /^<!\[/
// NOTE 匹配 {{ }}
const defaultTagRe = /\{\{((?:.|\r?\n)+?)\}\}/g
export const isPlainTextElement = makeMap('script,style,textarea', true)
export const isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track'
)
const decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
}
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g
const isIgnoreNewlineTag = makeMap('pre,textarea', true)
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n'
function decodeAttr(value, shouldDecodeNewlines) {
  const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
  return value.replace(re, match => decodingMap[match])
}




export function parseHTML(html) {
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;
  const stack = [];
  let currentParent; // 指向的是栈中的最后一个
  let root;
  function createASTElement(tag, attrs) {
    return {
      tag,
      type: ELEMENT_TYPE,
      children: [],
      attrs,
      parent: null
    }
  }
  function start(tag, attrs) {
    let node = createASTElement(tag, attrs); // 创造一个ast节点
    if (!root) {   // 看一下是否为空树
      root = node; // 如果为空则当前是树的根节点
    }
    if (currentParent) {
      node.parent = currentParent; // 只赋予了parent属性
      currentParent.children.push(node); // 还需要让父亲记住自己
    }
    stack.push(node)
    currentParent = node;

    // console.log('root', root)
  }
  function chars(text) {
    text = text.replace(/\s/g, '');
    if (text) {
      currentParent.children.push({
        type: TEXT_TYPE,
        text,
        parent: currentParent
      })
    }
  }
  function end(tag) {
    let node = stack.pop();
    currentParent = stack[stack.length - 1];
  }

  function advance(n) {
    html = html.substring(n);
  }
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1], // 标签名
        attrs: []
      }
      advance(start[0].length)

      // 如果不是开始标签的结束 就一直匹配下去
      let attr, end;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })
      }
      if (end) {
        advance(end[0].length)
        // console.log('attr[0].length: ', attr[0].length);
      }
      return match;
    }

    // console.log(html)
    return false;
  }

  while (html) { // html最开始肯定是一个 <   <div>hello</div>
    // 如果textEnd 为0 说明是一个开始标签或者结束标签
    // 如果textEnd >0 说明就是文本的结束位置
    let textEnd = html.indexOf('<'); // 如果indexOf中的索引是0 则说明是个标签
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue;
      }
      let endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1])
        continue;
      }
    }
    if (textEnd > 0) {
      let text = html.substring(0, textEnd); // 文本内容
      if (text) {
        chars(text)
        advance(text.length)
      }
    }

  }
  // console.log('cc', html)
  return root;
}