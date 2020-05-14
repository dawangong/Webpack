const path = require("path");
const webpack = require("webpack");

// 单独打包第三方库
module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash"]
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "[name].dll.min.js",
    // 通过vendors暴露
    library: "[name]",
  },
  plugins: [
    // 生成第三方库映射文件vendors.manifest.json
    new webpack.DllPlugin({
      // 生成的库名 同 暴露的vendors变量名
      name: "[name]",
      path: path.resolve(__dirname, "../dll/[name].manifest.json")
    })
  ]
};
