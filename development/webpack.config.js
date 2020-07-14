const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 打包入口
    entry: './js/index.js',

    // 打包输出对象
    output: {

        // 文件名
        filename: 'js/index.js',

        // 输出路径，需要导出nodejs.path.resolve,来处理绝对路径
        path: resolve(__dirname, 'build')
    },


    // loader配置

    module: {


        rules: [

            // 处理css,因为此时css是打包到js中的，所有不需要添加outputPath
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // 处理less
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // 处理样式中的图片
            {
                test: /\.(gif|jpg|png)$/,
                loader: 'url-loader',
                // 配置处理的最小尺寸，以及输出路径
                options: {
                    limit: 8 * 1024,
                    name: '[hase:10].[ext]',
                    esModule: false,
                    outputPath: 'imgs'
                }
            },

            // 处理html中的图片，即在url-loader的处理图片后的基础上，改变html中的图片的引用路径。或者直接转成打包后的base-64
            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            // 处理上面之外的其他资源，字体图标等
            {
                exclude: /\.(css|less|gif|jpg|png|html|js)/,
                loader: 'file-loader',
                options: {

                    name: '[hase:10].[ext]',
                    outputPath: 'other'
                }
            }

        ],


    },

    // 插件配置
    plugins: [

        // 处理html文件
        new HtmlWebpackPlugin({
            template: './index.html'
        }),

    ],

    // 指定为开发环境
    mode: 'development',

    // 开发环境启动服务器
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
    }


}