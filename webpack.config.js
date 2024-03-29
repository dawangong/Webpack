const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const { NODE_ENV } = process.env;

console.log(NODE_ENV, '环境');

const env = {
  dev: 'development',
  test: 'development',
  prod: 'production'
};

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
    // 默认值 ./
    publicPath: './'
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
      // babel-polyfill 兼容低版本浏览器不支持的api（配置后 自动引入） babel只转译语法 不转api
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
      // 模版支持 （模版语法和htmlWebpackPlugin ejs冲突）
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
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        options: {
          limit: 10000,
          name: 'src/images/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(svg|eot|ttf)$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    // 支持模版 （ejs和html-loader冲突）
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
    new webpack.HotModuleReplacementPlugin(),
    new cleanWebpackPlugin(['dist']),
    // postcss.config postcss需要（此插件无效果）
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function () {
    //       return [
    //         require("autoprefixer")({
    //           browsers: ['ie>=8', '>1% in CN']
    //         })
    //       ]
    //     }
    //   }
    // })
  ],
  mode: env[NODE_ENV],
  // source-map 生成 .map文件  排错 定位错误到行列
  // inline-source-map base64形式 打入主js 定位错误到行列 本地推荐
  // cheap-inline-source-map base64形式 打入主js 定位错误到行 本地推荐 线上推荐
  // eval 最快 可能定位不准
  devtool: env[NODE_ENV] === 'prod' ? 'cheap-inline-source-map' : 'inline-source-map',
  devServer: {
    publicPath: '/',
    // contentBase: './dist',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    host: 'localhost',
    port: 8000,
    hot: true,
    compress: true
  },
  // mode production 无需写optimization
  // optimization: {
  //   // 打开tree shaking(摇树优化) 只支持es6（静态引入）commonjs （modules,动态引入）
  //   usedExports: true
  //   // 非导出模块 会被忽略 故在package中设定 sideEffects 防止被忽略
  // }
};
