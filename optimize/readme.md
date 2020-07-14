<!-- TOC -->

- [webpack性能优化](#webpack性能优化)
  - [开发环境性能优化](#开发环境性能优化)
    - [优化打包构建速度](#优化打包构建速度)
    - [优化代码调试](#优化代码调试)
  - [生产环境性能优化](#生产环境性能优化)

<!-- /TOC -->

# webpack性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

### 优化打包构建速度
HMR：hot module replace，热模块替换/模块热替换，
作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块),极大提升构建速度,~~这里的模块是针对webpack来说的，一个独立js、css、less、html都是一个模块~~
```js
devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true
}
```
样式文件：可以使用HMR功能：因为style-loader内部实现了。
所以在生产环境中，只要用style-loader去处理样式资源就能实现热替换了

js文件：默认不能使用HMR功能，会重新刷新，-----需要做HMR功能，以为存在多个js，这个js改了，那就重新打包这个js，其他不变的js不需要重新打包
需要修改js代码，添加让HMR功能生效的功能,在index.js中配置即可.
```js
if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数, 
    // 此回调函数内,主要是重新执行一次print.js的主要函数
    print();
  });
}
```
HMR功能对js的处理,只能处理非入口文件的变化，而入口文件是做不了热替换的，因为入口文件引入了其它的文件，一旦入口文件发生了变化，就需要重新加载执行其他文件，这是不可避免的

html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了 
解决：修改entry入口，将html文件引入
```js
entry: ['./src/js/index.js', './src/index.html'],
```
html文件不用做HRML功能，以为项目只有一个html文件，不是存在多个html文件，改了就必然需要重新打包，所以没必要
    
  
### 优化代码调试


## 生产环境性能优化

- 优化打包构建速度
- 优化代码运行的性能 