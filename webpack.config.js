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
        ]
    },
}