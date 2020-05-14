const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const addAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const copyWebpackPlugin = require("../plugins/copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { NODE_ENV } = process.env;

console.log(NODE_ENV, "环境");

const env = {
  dev: "development",
  test: "development",
  prod: "production"
};

module.exports = {
  //打包入口文件
  entry: {
    // 参照点：文件根目录
    index: "./src/index.js"
  },
  //打包后的目录
  output: {
    path: path.resolve(__dirname, "../dist"),
    // hash 改变hash才会变
    filename: "src/[name].[hash].min.js",
    // 默认值 ./
    publicPath: "./"
  },
  // 设置loader寻找目录
  resolveLoader: {
    // 参照点：文件根目录
    modules: ["node_modules", "loaders"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: [{
          loader: "eslint-loader",
          options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            formatter: require("eslint-friendly-formatter"), // 指定错误报告的格式规范
            // fix: true // 自动修复简单问题
          }
        }],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      },
      // babel-polyfill 兼容低版本浏览器不支持的api（4.0后 只安装 会自动引入） babel只转译语法 不转api
      {
        test: /\.js$/,
        use: ["babel-loader", {
          loader: "replace-loader",
          options: {
            name: "name"
          }
        }],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      },
      // 模版支持 （模版语法和htmlWebpackPlugin ejs冲突）
      {
        test: /\.html$/,
        use: ["html-loader"],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      }
      ,
      {
        test: /\.less$/,
        // link 引入css
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              // 支持css中互相import引用
              importLoaders: 2,
              // css module 化
              // modules: true
            }
          }, "less-loader", "postcss-loader"]
        }),
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "src/images/[name].[hash].[ext]"
          }
        }],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.(svg|eot|ttf)$/,
        use: ["file-loader"],
        exclude: path.resolve(__dirname, "../node_modules"),
        include: path.resolve(__dirname, "../src")
      }
    ]
  },
  plugins: [
    // 支持模版 （ejs和html-loader冲突）
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true,
      minify: {
        // 删除注释
        removeComments: true,
        // 删除空格
        collapseWhitespace: true
      },
      // 输出模版名字
      // filename: "index.html",
      // 控制引入的js
      // chunks: [""]
    }),
    // link 引入css 名字规定 必须有
    new ExtractTextPlugin("index.min.css"),
    new copyWebpackPlugin({
      type: 1
    }),
    new cleanWebpackPlugin(["dist"], {
      // 指定root
      root: path.resolve(__dirname, "../")
    }),
    // html插入vendors
    new addAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/vendors.dll.min.js")
    }),
    // dll寻找映射关系 （业务中引入时 就不会从node_modules中引入模块）
    new webpack.DllReferencePlugin({
      "manifest": path.resolve(__dirname, "../dll/vendors.manifest.json")
    })
  ],
  mode: env[NODE_ENV],
  // source-map 生成 .map文件  排错 定位错误到行列
  // inline-source-map base64形式 打入主js 定位错误到行列 本地推荐
  // cheap-inline-source-map base64形式 打入主js 定位错误到行 本地推荐 线上推荐
  // eval 最快 可能定位不准
  devtool: env[NODE_ENV] === "prod" ? "cheap-inline-source-map" : "inline-source-map",
  // mode production 无需写optimization
  optimization: {
    // 打开tree shaking(摇树优化) 只支持es6（静态引入）commonjs （module,动态引入）
    // 非导出模块 会被忽略 故在package中设定 sideEffects 防止被忽略
    usedExports: true,
    // 代码分割 1.splitChunks 2.syntax-dynamic-import（babel） 动态引入
    // 依赖的类库 浏览器进行缓存 （新代码发布时优化提高加载速度）
    splitChunks: {
      chunks: "all"
    }
  },
  performance: false, // 性能提示
  resolve: {
    // 默认引入目录下的文件类型
    extensions: [".js"],
    // 默认引入目录下的文件名
    mainFiles: ["index", "main"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  }
};

// entry && resolveLoader 项目根目录起
