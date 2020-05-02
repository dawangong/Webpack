class copyWebpackPlugin {
  constructor(options) {
    // 参数接收
    console.log(options);
    console.log('is by used!');
  }

  apply(compiler) {
    // tapAsync 异步 tap 同步
    // compiler.hooks.compile.tap
    // compiler.hooks 可以理解为打包的生命周期 (emit, done, compile)
    compiler.hooks.emit.tapAsync('copyWebpackPlugin', (compilation, cb) => {
      // 文件名
      compilation.assets['copy.text'] = {
        // 文件内容
        source: function () {
          return 'i am copy.text';
        },
        // 文件大概大小
        size: function() {
          return 21;
        }
      };
      // 必须执行
      cb()
    })
  }
}

module.exports = copyWebpackPlugin;
