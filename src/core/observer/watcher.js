const bailRE = /[^\w.$]/

let id = 0;
class Watcher{
  constructor(vm,expOrFn,cb,options){
    // 默认调用一次更新函数
    if(typeof expOrFn === 'function'){
      this.getter = expOrFn
    }else{
      // a.b.c.d就是一个keypath，说明从vm.a.b.c.d中读取数据。
      this.getter = parsePath(expOrFn)
    }
    if(options){
      this.deep = !!options.deep
    }else{
      this.deep = false
    }
    this.vm = vm;
    this.exprOrFn = expOrFn
    this.cb = cb;
    this.options = options;
    this.id = id++
    this.deps = []
    this.depsId = new Set()
    // 默认初始化
    this.value = this.get()
  }
  // 初始化
  get(){
    /**
     * 一定要在window.target =undefined之前去触发子值的收集依赖逻辑，
     * 这样才能保证子集收集的依赖是当前这个Watcher。如果在window.target
     *  =undefined之后去触发收集依赖的逻辑，那么其实当前的Watcher并不会
     * 被收集到子值的依赖列表中，也就无法实现deep的功能。
     * 简单来说就是 父亲和子属性的 dep 都收集了父亲的 watcher
     * 只要有一个变化就会通知watcher更新
     */
    window.target = this
    const value = this.getter.call(this.vm,this.vm)
    if(this.deep){
      traverse(value)
    }
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
    this.cb.call(this.vm,oldValue,this.value)
  }
  // 把watcher实例从当前正在观察的状态的依赖列表中移除。
  teardown(){
    /**
     * Watcher中记录自己都订阅了谁，也就是watcher实例被收集进了哪些Dep里。
     * 然后当Watcher不想继续订阅这些Dep时，循环自己记录的订阅列表来通知
     * 它们（Dep）将自己从它们（Dep）的依赖列表中移除掉。
     */
    let i = this.deps.length
    while(i--){
      this.deps[i].removeSub(this)
    }
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
    // 这里的obj就是外面传进来的 this.vm
    // 一直往下取值直到取到最后面一层
    for(let i = 0; i < segments.length; i++){
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj;
  }
}
  
const seenObjects = new Set()

export function traverse (val) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}
  
function _traverse (val, seen) {
  let i, keys
  const isArray = Array.isArray(val)
  if ((!isArray && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }
  if (isArray) {
    i = val.length
    while (i--) _traverse(val[i], seen)
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen)
  }
}

export default Watcher