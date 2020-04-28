const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const { NODE_ENV } = process.env;

console.log(NODE_ENV, '环境');

module.exports = {
  //打包入口文件
  // entry: {
  //     main: './src/app/main.js',
  //     other: './src/app/other.js',
  //     a: './src/app/a.js',
  //     b: './src/app/b.js',
  //     c: './src/app/c.js'
  // },
  entry: './src/index.js',
  //打包后的目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'src/[name].[hash].min.js',
    publicPath: ''
  },
  module: {
    rules: [
      // {
      //     test: /\.js$/,
      //     loader: 'eslint-loader',
      //     enforce: "pre",
      //     include: path.resolve(__dirname, 'src'),
      //     exclude: path.resolve(__dirname, 'node_modules'),
      //     options: {
      //         // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
      //         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      //     }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
      // {
      //     test: /.css$/,
      //     loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      //     exclude: path.resolve(__dirname, 'node_modules'),
      //     include: path.resolve(__dirname, 'src')
      // },
      {
        test: /\.html$/,
        loaders: ['html-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      }
      ,
      {
        test: /\.less$/,
        loaders: ['style-loader', {
          loader: 'css-loader',
          options: {
            // 支持css中互相import引用
            importLoaders: 2,
            // css module 化
            // modules: true
          }
        }, 'less-loader', 'postcss-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(jpg|jpeg|gif)$/,
        loader: 'url-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        options: {
          limit: 10000,
          name: 'src/images/[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        // 删除注释
        removeComments: true,
        // 删除空格
        collapseWhitespace: true
      }
    }),
    new cleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [
            require("autoprefixer")({
              browsers: ['ie>=8', '>1% in CN']
            })
          ]
        }
      }
    })
  ],
  mode: NODE_ENV
};
