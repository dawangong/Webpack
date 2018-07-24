let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    //打包入口文件
    entry: {
        main: './src/app/main.js',
        other: './src/app/other.js',
        a: './src/app/a.js',
        b: './src/app/b.js',
        c: './src/app/c.js'
    },
    //打包后的目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'src/[name].[hash].min.js',
        publicPath: ''
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
            minify: {
                // 删除注释
                removeComments: true,
                // 删除空格
                // collapseWhitespace: true
            }
        }),
        new cleanWebpackPlugin(['dist'])
    ]
};