const merge = require("webpack-merge");
const commonConfig = require("./webpack.conf.common");
// 分析打包
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); ？反而会变得更大？
const WorkBoxWebpackPlugin = require("workbox-webpack-plugin");


const prodConfig = {
  plugins: [
    new BundleAnalyzerPlugin(),
    // pwa
    new WorkBoxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
    // new UglifyJsPlugin({
    //   cache: true,
    //   parallel: true,
    //   sourceMap: true
    // })
  ]
};

module.exports = merge(prodConfig, commonConfig);
