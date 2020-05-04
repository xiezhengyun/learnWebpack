'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const setMpa = ()=>{
    const entry = {};
    const HtmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
    console.log(entryFiles)
    console.log(Object.keys(entryFiles))
    Object.keys(entryFiles)
        .map((index)=>{
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;

            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`), //html 模版所在位置
                    filename: `${pageName}.html`,
                    chunks: [pageName], //生成的html要使用哪些chunks
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
            )
        });

    return {
        entry,
        HtmlWebpackPlugins
    }
}
const { entry,HtmlWebpackPlugins } = setMpa();
console.log(entry)
console.log(HtmlWebpackPlugins)

module.exports = {
    entry:entry,
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
        new webpack.HotModuleReplacementPlugin(), //自带热更新插件
        new CleanWebpackPlugin(), //清除output
    ].concat(HtmlWebpackPlugins),
    devServer:{ //使用之前配置package.json，dev命令，然后安装 cnpm i webpack-dev-server -D
        contentBase: './dist',
        hot: true,
    },
    devtool: 'inline-source-map'//'source-map' 'eval'
}