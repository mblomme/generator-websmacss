var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	sass   = require('gulp-sass'),
        concat = require('gulp-concat'),
        sourcemaps = require('gulp-sourcemaps'),
        plumber = require('gulp-plumber');
	
gulp.task('build-css', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
  	file: 'app/wwwroot/css/main.css'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/wwwroot/css'));
});		

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['build-css']);
});
	
gulp.task('default', ['watch'], function() {
	
});
