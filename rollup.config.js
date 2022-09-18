import babel from 'rollup-plugin-babel';

export default {
  // 打包入口
  input:'./src/core/instance/index.js',
  // 打包出口
  output:{
    format:'umd',
    name:'Vue',
    file:'dist/vue.js',
    sourcemap:true //es5 --> es6
  },
  plugins:[
    babel({
      exclude:'node_modules/**'
    })
  ]

}