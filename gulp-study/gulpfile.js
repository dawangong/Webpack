const gulp = require("gulp");
// const concat = require("gulp-concat");
// const rename = require("gulp-rename");
// const uglify = require("gulp-uglify");
// const less = require("gulp-less");
// const cleanCss = require("gulp-clean-css");
// const htmlmin = require("gulp-htmlmin");
// const livereload = require("gulp-livereload");
// const connect = require("gulp-connect");

// todo watch、ES6
// 自动引入 名字 = 末尾
const { concat, rename, uglify, less, cleanCss, htmlmin, livereload, connect } = require("gulp-load-plugins")();

/*
 * pipe 每一步会拿到上一步
 * gulp.series 队列
 * gulp.parallel 并发
 * gulp.src 找到目标文件 读取到gulp内存中 /** / => 深层遍历
 * concat 合并文件
 * gulp.dest 输出
 * uglify 压缩js
 * rename 重命名 suffix 名字+后缀
 * cleanCss 压缩css => compatibility 兼容浏览器
 * htmlmin 压缩html collapseWhitespace 压缩空格
 */

gulp.task('js', () => {
  const jsTask = () => gulp.src('./src/**/*.js')
  // .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
  gulp.watch('./src/**/*.js', jsTask);
  return jsTask();
});

gulp.task('less', () => {
  const lessTask = () => gulp.src('./src/**/*.less')
    .pipe(less())
    // .pipe(concat('index.css'))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
  gulp.watch('./src/**/*.less', lessTask);
  return lessTask();
  });

gulp.task('html', () => {
  const htmlTask = () => gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
  gulp.watch('./src/**/*.html',htmlTask);
  return htmlTask();
});

gulp.task('default', gulp.series(gulp.parallel(['js', 'less', 'html']), () => {
  connect.server({
    root: 'dist/',
    livereload: true,
    port: 8000
  });

  // livereload.listen();
  // pipe(livereload())
}));


