const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./src/app/index.js"
    },
    output: {
        filename: "[name].[hash].min.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/',
                        limit:10000
                    }
                }]
            },{
            test: /\.js$/,
            include: /src/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: [
                  'env',
                  'stage-2'
                ],
                plugins: [
                  [
                    'transform-runtime',
                    {
                      'polyfill': true,
                      'regenerator': true
                    }
                  ],
                  ['transform-decorators-legacy',
                    {
                      'legacy': true
                    }
                  ]
                ]
              }
            }]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        inline:true,
        hot:true,
        open: true,
        contentBase: './dist',
        host: 'localhost',
        port: 9000,
        compress: true
    },
    mode: process.env
};
