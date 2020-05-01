const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.conf.common');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 页面展示eslint error
    overlay: true,
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
  }
};

module.exports = merge(devConfig, commonConfig);
