import { parserHTML } from './parser';
import { generate } from './generate';


export function compileToFunction(template){
  console.log("🚀  template", template)
  // TAG html -> ast -> render -> vnode -> 真实dom
  // NOTE 1、html -> ast
  let root = parserHTML(template)
  // NOTE 2、ast -> render
  let code = generate(root);
  // console.log("🚀code", code)
  // _c("div",),_v("hhha"+_s(name)+"hello"),_c("span",{class:"span"}),_v("hello")))
  //模板引擎靠的是 new Function + with
  const render = new Function(`with(this){return ${code}}`);
  // 谁调用的render，this就指向谁
  return render
}