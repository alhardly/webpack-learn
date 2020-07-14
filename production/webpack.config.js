const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs的环境变量，默认是production:作用是决定使用browserslist的哪个环境。
// process.env.NODE_ENV = 'development';

const commonCssLoader = [
    // 'style-loader', 需要将css单独打包，不在放到js中,需要额外配置输出文件名，在下面的plugin对象中配置                       
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 如果是使用loader的默认配置的话，那就直接写成一个字符串，比如这里就直接使用css-laoder的默认配置，而如果还需要额外配置的话，就写成一个对象，比如下面的兼容性配置
    // 对样式做兼容性处理
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            indent: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]

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

            // // 处理css,因为此时css是打包到js中的，所有不需要添加outputPath
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoader
                ]
            },

            // 处理less
            {
                test: /\.less$/,
                use: [
                    // 'style-loader', 
                    ...commonCssLoader,
                    'less-loader',

                ]
            },

            // 处理样式中的图片
            {
                test: /\.(gif|jpg|png)$/,
                loader: 'url-loader',
                // 配置处理的最小尺寸，以及输出路径
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
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

                    name: '[hash:10].[ext]',
                    outputPath: 'other'
                }
            },

            {
                // 需要在package.json中添加eslintConfig做哪些检查。用的是airbnb规则，
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: "pre",
                loader: 'eslint-loader',
                // 自动修复
                options: {
                    fix: true
                }

            },
            // 对js做兼容性处理
            {
                // 需要在package.json中添加eslintConfig做哪些检查。用的是airbnb规则，
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: [
                        // 注意，下面是在一个数组里面的
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }

                            }
                        ]
                    ]

                }

            },

        ],


    },

    // 插件配置
    plugins: [

        // 处理html文件
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),

    ],

    // 指定为开发环境
    mode: 'production',

    // // 开发环境启动服务器
    // devServer: {
    //     contentBase: resolve(__dirname, 'build'),
    //     compress: true,
    //     port: 3000,
    //     open: true,
    // }


}