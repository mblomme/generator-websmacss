var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	sass   = require('gulp-sass'),
    concat = require('gulp-concat');
	
gulp.task('build-css', function() {
  return gulp.src('/app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('/app/wwwroot/css'));
});	

gulp.task('watch', function() {
  gulp.watch('/app/scss/*.scss', ['build-css']);
});
	
gulp.task('default', ['watch'], function() {
	
});

