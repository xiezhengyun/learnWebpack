## 文件指纹
一般js文件采用chunckhash，而css文件采用contenthash，图片字体文件用hash

## sourceMap
devtool 设置 
#### eval
没有单独的map文件，把sourcemap放到js文件里。使⽤用eval包裹模块代码
#### source-map
有单独的map文件
#### inline-source-map
把sourcemap放到js文件里。报错定位到行，代码比cheap-source-map干净。
#### cheap-source-map
报错只能定位到行。这一行哪里有错，不能直接定位。

##  公共脚本分离（2种）
### HtmlWebpackExternalsPlugin
```js
new HtmlWebpackExternalsPlugin({ //公共库代码分离
            externals: [{
                    module: 'react',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global: 'ReactDOM',
                },
            ]
        })
```
### splitChunksPlugin
#### chunks 参数说明
+ async 异步引入的库进行分离 vue react （import）
+ initial 同步引入的引入的库分离
+ all 所有引入的库分离