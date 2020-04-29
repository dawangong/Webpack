const merge = require('webpack-merge');
const commonConfig = require('./webpack.conf.common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); ？反而会变得更大？

const prodConfig = {
  plugins: [
    new BundleAnalyzerPlugin(),
    // new UglifyJsPlugin({
    //   cache: true,
    //   parallel: true,
    //   sourceMap: true
    // })
  ]
};

module.exports = merge(prodConfig, commonConfig);
