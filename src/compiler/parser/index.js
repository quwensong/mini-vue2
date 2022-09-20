import { parseHTML } from './parser-html';
import { codegen } from '../codegen/generate';

// 对模版进行编译处理 vue3采用的不是使用正则
export function compileToFunction(template) {
  // 1. 将template转换成ast语法树
  const ast = parseHTML(template)
  // 2. 生成render方法(render方法执行后返回的结果就是 虚拟DOM)
  // 模版引擎的实现原理 就是 with + new Function()
  const code = `with(this){return ${codegen(ast)}}`;
  const render = new Function(code);
  return render
}