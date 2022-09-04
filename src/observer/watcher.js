import { pushTarget,popTarget} from './dep'

let id = 0;
class Watcher{
  constructor(vm,updateComponent,cb,options){
    this.vm = vm;
    this.exprOrFn = updateComponent
    this.cb = cb;
    this.options = options;
    this.id = id++
    // 默认调用一次更新函数
    this.getter = updateComponent
    this.deps = []
    this.depsId = new Set()
    // 默认初始化
    this.get()
  }

  get(){

    pushTarget(this)
    this.getter()
    popTarget()
  }
  update(){
    this.get()
  }
  addDep(dep){
    let id = dep.id
    if(!this.depsId.has(id)){
      this.depsId.add(id)
      this.deps.push(dep)
      // dep存储watcher
      dep.addSub(this)
    }
  }
}

export default Watcher