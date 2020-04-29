const merge = require('webpack-merge');
const commonConfig = require('./webpack.conf.common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConfig = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(prodConfig, commonConfig);
