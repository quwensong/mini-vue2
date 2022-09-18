import { nextTick } from '../../utils/next-tick'

let queue = []
let has = {}
export function queueWatch(watcher){
  const id = watcher.id;
  if(has[id] == null) {
    queue.push(watcher)
    has[id] = true
    nextTick(()=>{
      queue.forEach(watcher => watcher.run())
      queue = []
      has = {}
    })
  }
}
