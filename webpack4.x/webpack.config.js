const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./src/app/index.js" // 入口文件，若不配置webpack4将自动查找src目录下的index.js文件
    },
    output: {
        filename: "[name].[hash].min.js", // 输出文件名，[name]表示入口文件js名
        path: path.join(__dirname, "dist") // 输出文件路径
    },
    module: { // 处理对应模块
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]//处理css
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/',//输出到images文件夹 可无
                        limit:10000  //是把小于10000B的文件打成Base64的格式，写入JS
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 以src下的index.html文件为模板生成dist/index.html文件
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        open: true,
        contentBase: './dist',//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 9000,//端口号
        compress: true//开发服务器是否启动gzip等压缩
    },
    // mode: 'development'
};