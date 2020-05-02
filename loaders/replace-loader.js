module.exports = function (source) {
  // 参数接收
  console.log(this.query);

  // cb params: error source sourceMap meta

  // 同步
  // this.callback(null, source);

  // 异步
  const callback = this.async();

  setTimeout(() => {
    callback(null, source)
  }, 0);

  // use: error catch | language package
};
