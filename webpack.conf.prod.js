const merge = require('webpack-merge');
const commonConfig = require('./webpack.conf.common');

const prodConfig = {
  plugins: []
};

module.exports = merge(prodConfig, commonConfig);
