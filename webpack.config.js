'use strict';

const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production', //'production' //指定当前的构建环境
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
}