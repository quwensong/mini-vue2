// 每个属性都分配一个Dep,watcher中也要存放这个Dep,多对多
let id = 0;
class Dep{
  constructor(){
    this.id = id++
    this.subs = [];//存放 watcher
  }
  depend(){
    // dep要存放 watcher watcher也要存放 dep
    if(Dep.target){
      // 把dep传给watcher存储
      Dep.target.addDep(this);
    }
  }
  addSub(watcher){
    this.subs.push(watcher);
  }
  notify(){
    this.subs.forEach((watcher)=> watcher.update())
  }
}

Dep.target = null

export function pushTarget(watcher){
  Dep.target = watcher
}

export function popTarget(watcher){
  Dep.target = null
}

export default Dep;