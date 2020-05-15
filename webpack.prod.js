'use strict';

const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //把css代码整理成css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') //压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


const setMpa = () => {
    const entry = {};
    const HtmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    console.log(entryFiles)
    console.log(Object.keys(entryFiles))
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;

            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`), //html 模版所在位置
                    filename: `${pageName}.html`,
                    chunks: [pageName,'vendors','commons'], //生成的html要使用哪些chunks
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
const {
    entry,
    HtmlWebpackPlugins
} = setMpa();
console.log(entry)
console.log(HtmlWebpackPlugins)

module.exports = {
    entry: entry,
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
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                ]
            },
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
        // new HtmlWebpackExternalsPlugin({ //公共库代码分离
        //     externals: [{
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM',
        //         },
        //     ]
        // })
    ].concat(HtmlWebpackPlugins),
    optimization: { 
        splitChunks: { // 内置 splitChunksPlugin 提取公共资源  
            minSize: 0, //引用的模块的大小
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2, //至少引用的次数 2次
                    //priority: 1 // 优先级 默认按照顺序
                },
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /(react|reaxt-dom)/,
                }
            }
        }
    },
    devtool: 'inline-source-map' //'source-map' 'eval'

}