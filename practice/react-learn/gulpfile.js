const gulp = require('gulp')
const path = require('path')
const gutil = require("gulp-util")
const open = require('gulp-open')
const webpackServer = require('./system/webpack-dev.config')
const webpackConfig = require('./system/webpack.config')
const less = require('gulp-less')
const includer = require('gulp-htmlincluder')
const runSequence = require('run-sequence').use(gulp)
const clean = require('gulp-rimraf')
const webpack = require("webpack")
const glob = require("glob")
const config = require('./system/config/base.config')
const internalIP = require('internal-ip')
const flatten = require('gulp-flatten')

const devPort = config.devPort

gulp.task('open', function () {
  gulp.src(__filename).pipe(open({
      uri: "http://"+(internalIP.v4() || '127.0.0.1')+":" + devPort +config.defaultStartPage
    }))
})

gulp.task('hot', function (callback) {
  webpackServer()
})

gulp.task('min-webpack', function (done) {
  const wbpk = Object.create(webpackConfig)
  wbpk.output.filename = '[name].min.js'
  wbpk.plugins.push(new webpack.optimize.UglifyJsPlugin())

  webpack(wbpk).run(function (err, stats) {
    if (err) throw new gutil.PluginError("min-webpack", err)
    gutil.log("[min-webpack]", stats.toString({}))
    done()
  })
})

gulp.task('webpack', function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err)
        gutil.log("[webpack]", stats.toString({
            // output options
        }))
        callback()
    })
})

gulp.task('html-includer', function() {
  gulp.src(config.html+'/**/*.html')
      .pipe(includer())
      .on('error', console.error)
      .pipe(gulp.dest('html'))
})



gulp.task('clean', function(){
  gulp.src([
      config.output
    ], {
        read:false
    }).pipe(clean())
});

gulp.task('html', function () {
    return gulp.src([config.html+ '/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest(config.output ))
});
gulp.task('default', function(){
  runSequence('clean','webpack','html')
});
gulp.task('dev', ['hot', 'open'])
