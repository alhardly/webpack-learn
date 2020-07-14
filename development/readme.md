开发环境的webpack配置

1. 在根目录下`npm init` 初始化环境
2. 编写简单的项目 
3. 在js入口文件(index.js)中引入样式资源
4. 配置webpack.config.js
5. 安装配置中用到的依赖
   1. 切换到根目录下
   2.  `npm i -D  html-webpack-plugin style-loader css-loader less-loader url-loader html-loader file-loader webpack-dev-server  webpack  webpack-cli`
   
6. 在当前目录运行 `npx webpack-dev-server`

npx webpack-dev-server 只会在内存中编译打包，没有输出

注：
之前不小心在当前目录下执行了`npm init`,然后生成了package.json文件，然后运行`npx webpack-dev-server`的时候，有点问题，删除package.json文件就好了。