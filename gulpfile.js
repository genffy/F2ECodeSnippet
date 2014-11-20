'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	bower = require('gulp-bower'),
	connect = require('gulp-connect');

/**
 * sass build
 * @return {[type]} [description]
 */
gulp.task('sass', function () {
	gulp.src('./resources/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

/**
 * images copy
 * @return {[type]} [description]
 */
gulp.task('image', function () {
  gulp.src('./resources/images/*.*')
        .pipe(gulp.dest('./dist/images'));
});

/**
 * bower install
 * @return {[type]} [description]
 */
gulp.task('bower', function () {
	return bower()
    .pipe(gulp.dest('bower_components/'));
});

/*gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});*/

/**
 * web server
 * @return {[type]} [description]
 */
gulp.task('webserver', function() {
  connect.server({
  	livereload: true
  });
});

var serverReload = function (file) {
    console.log(file);
    gulp.src(file.path).pipe(connect.reload());
};
/**
 * 监听文件的变化
 * @return {[type]} [description]
 */
gulp.task('watch', function () {
    gulp.watch('./resources/scss/*.*', ['sass']);
    gulp.watch('./dist/css/*.*', function (file){
       serverReload(file);
    });
     gulp.watch('./practices/**/*.*', function (file) {
        serverReload(file);
    });
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'bower', 'image', 'webserver', 'watch']);