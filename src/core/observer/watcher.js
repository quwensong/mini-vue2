
const bailRE = /[^\w.$]/

let id = 0;
class Watcher{
  constructor(vm,expOrFn,cb,options){
    this.vm = vm;
    this.exprOrFn = expOrFn
    this.cb = cb;
    this.options = options;
    this.id = id++
    // 默认调用一次更新函数
    this.getter = parsePath(expOrFn)
    this.deps = []
    this.depsId = new Set()
    // 默认初始化
    this.value = this.get()
  }
  // 初始化
  get(){
    window.target = this
    const value = this.getter.call(this.vm,this.vm)
    window.target = undefined;
    return value
  }
  // 更新
  update(){
    queueWatch(this)
  }
  addDep(dep){
    const id = dep.id
    if(!this.depsId.has(id)){
      this.depsId.add(id)
      this.deps.push(dep)
      // dep存储watcher
      dep.addSub(this)
    }
  }
  run(){
    const oldValue = this.value
    this.value = this.get()
    // 监听器实现原理
    this.cb.call(this.vm,this.vm,oldValue)
  }
}
let queue = []
let has = {}
function queueWatch(watcher){
  const id = watcher.id;
  if(has[id] == null) {
    queue.push(watcher)
    has[id] = true
    setTimeout(()=>{
      queue.forEach(watcher => watcher.run())
      queue = []
      has = {}
    },0)

  }
}

function parsePath(path){
  // 如果不是这种格式 'a.b.c'是函数的话直接返回
  if(bailRE.test(path)) return path;
  const segments = path.split('.')
  return function(obj){
    for(let i = 0; i < segments.length; i++){
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj;
  }
}

export default Watcher