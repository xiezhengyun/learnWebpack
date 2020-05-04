'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'  //js文件指纹
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
                    MiniCssExtractPlugin.loader,
                    'css-loader', //先执行css-loader解释css，再传递给style-loader写到页面head || MiniCssExtractPlugin.loader生成文件
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', //
                    'less-loader',//先less-loader转译，然后执行css-loader解释css，再传递给style-loader写到页面head || MiniCssExtractPlugin.loader生成文件
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
                            name:'[name]_[hash:8].[ext]',
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|TTF|otf)$/, //大小写区分
                use:[
                    {
                        loader: 'file-loader', 
                        options:{
                            name:'[name]_[hash:8].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ]
   
}