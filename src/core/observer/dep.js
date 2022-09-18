// 每个属性都分配一个Dep,watcher中也要存放这个Dep,多对多
let uid = 0;
class Dep{
  constructor(){
    this.id = uid++
    this.subs = [];//存放 watcher
  }
  depend(){
    // dep要存放 watcher watcher也要存放 dep
    if(window.target){
      // 把dep传给watcher存储
      window.target.addDep(this);//新增
    }
  }
  addSub(watcher){
    this.subs.push(watcher);
  }
  removeSub(watcher){
    remove(this.subs, watcher);
  }
  notify(){
    const subs = this.subs.slice();
    subs.forEach(watcher => watcher.update())
  }
}

function remove(arr,item){
  if(arr.length){
    const index = arr.indexOf(item)
    if(index > -1){
      return arr.splice(index,1)
    }
  }
}

export default Dep;