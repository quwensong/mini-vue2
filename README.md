# mini-vue2
A concise Vue2 source code project to help you better understand how Vue2 works( in development )

**运行步骤**
1. 第一步：安装依赖 `npm install`
2. 第二步：npm run build（打包结果在dist/vue.js）
3. 第三步：创建一个测试html文件导入

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
     <p key="1">hhha {{name}}hello</p>
     <span key="2">{{arr}} </span>
  </div>
  <script src="../../../dist/vue.js"></script>
  <script>
    const vm = new Vue({
      data(){
        return {
          name:'哈哈哈',
          arr:[1,2,3]
        }
      }
    })
    vm.$mount('#app')
    setTimeout(()=>{
      vm.arr.push(888)
    },2000)
  </script>
</body>
</html>
```
