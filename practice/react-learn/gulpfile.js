var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var config = require('./webpack.config')

gulp.task('webpack', function(callback) {
    // run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({
            // output options
        }))
        callback()
    })
})

gulp.task('webpack-dev-server', function(callback) {
    // Start a webpack-dev-server
    var wbpConfig = Object.create(config);
    new WebpackDevServer(webpack(wbpConfig), {
        // devServer: {
        //     hot: true,
        //     // 开启服务器的模块热替换(HMR)

        //     contentBase: path.resolve(__dirname, 'dist'),
        //     // 输出文件的路径

        //     publicPath: '/'
        //     // 和上文 output 的“publicPath”值保持一致
        // },
        publicPath: '/',
		publicPath: path.join(__dirname, "dist"),
		stats: {
			colors: true
		}
    }).listen(3000, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err)
        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html')

        // keep the server alive or continue?
        callback();
    })
})

gulp.task('default', ['webpack-dev-server'])