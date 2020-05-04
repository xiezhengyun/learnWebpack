'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development', //'production' //指定当前的构建环境
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader', //先执行css-loader解释css，再传递给style-loader写到页面head
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader', //
                    'less-loader',//先less-loader转译，然后执行css-loader解释css，再传递给style-loader写到页面head
                ]
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/,
            //     use:'file-loader'
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader', //设置limit 小于 10k  base64转码
                        options:{
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|TTF|otf)$/, //大小写区分
                use:'file-loader'
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin() //自带热更新插件
    ],
    devServer:{ //使用之前配置package.json，dev命令，然后安装 cnpm i webpack-dev-server -D
        contentBase: './dist',
        hot: true,
    }
}