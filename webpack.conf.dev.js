const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.conf.common');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
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
  optimization: {
    // 打开tree shaking(摇树优化) 只支持es6（静态引入）commonjs （module,动态引入）
    usedExports: true
    // 非导出模块 会被忽略 故在package中设定 sideEffects 防止被忽略
  }
};

module.exports = merge(devConfig, commonConfig);
