<!-- TOC -->

- [插件介绍](#插件介绍)

<!-- /TOC -->

## 插件介绍

1. mini-css-extract-plugin：可以将css从js中提取出来
   
2. postcss-loader：postcss可处理css兼容性，需要下载 postcss-preset-env
   postcss-preset-env可帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式，更多browserslist的配置可以去Github中搜索,关键字browserslist
    ``` js
    "browserslist": {
        // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ],
        // 生产环境：默认是看生产环境
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]
    }
    ```

3. optimize-css-assets-webpack-plugin：压缩css

4. eslint-loader：js中的语法检查，依赖于eslint,需要下载 eslint 、
   1. 为了使用airbnb的规则，需要下载eslint-config-airbnb-base、eslint-plugin-import
   2. 需要配置package.json中的eslintConfig

5. bable-loader：js兼容性处理，需要下载 @babel/preset-env、@babel/core
   1. 基本的js兼容性处理：@babel/preset-env，只能转换基本语法。不能转换promise等语法
   2. 使用：@babel/polyfill 来处理全部的js兼容性。不需要安装，只需要index.js引用就行.但是比较暴力，只需解决部分兼容性问题，但是却将所有兼容性代码全部引入，体积太大。
   所以
   3. 需要做兼容性处理的才做：按需加载，----》core-js，需要安装core-js。
   4. 最后是结合第一个和第3个，分别处理低级和高级的兼容性处理


注意：

正常来讲，一个文件只能被一个loader处理
当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序

比如js的文件：先执行eslint，后执行babel-loader
添加`enforce:"pre"`表示优先执行