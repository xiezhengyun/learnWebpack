'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //把css代码整理成css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js' //js文件指纹
    },
    mode: 'production', //'production' //指定当前的构建环境
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', //先执行css-loader解释css，再传递给style-loader写到页面head || MiniCssExtractPlugin.loader生成文件
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', //
                    'less-loader', //先less-loader转译，然后执行css-loader解释css，再传递给style-loader写到页面head || MiniCssExtractPlugin.loader生成文件
                    {
                        loader: 'postcss-loader', 
                        options: {
                            plugins: ()=>[  //css3属性前缀补全
                                require('autoprefixer')({
                                    browsers: ['last 2 version','>1%','ios 7']
                                })     
                            ]
                        }
                    },
                ]
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/,
            //     use:'file-loader'
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader', //设置limit 小于 10k  base64转码
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        limit: 10240
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|TTF|otf)$/, //大小写区分
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //清除output
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsWebpackPlugin({ //css代码压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') //cssnano 预处理器
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'), //html 模版所在位置
            filename: 'search.html',
            chunks: ['search'], //生成的html要使用哪些chunks
            inject: true, //打包出来的chunks 比如 js css 自动注入到html里面
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            }
        }),
        //一个页面一个plugin
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'), //html 模版所在位置
            filename: 'index.html',
            chunks: ['index'], //生成的html要使用哪些chunks
            inject: true, //打包出来的chunks 比如 js css 自动注入到html里面
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ]

}