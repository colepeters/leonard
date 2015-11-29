var gulp = require('gulp');
var cssnext = require('gulp-cssnext');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var reload = browserSync.reload;
var rename = require('gulp-rename');

gulp.task('css', function(){
  gulp.src('src/css/app.css')
    .pipe(cssnext({
      compress: false
    }))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(reload({stream: true}));
});

gulp.task('sync', function(){
  browserSync.init({
    proxy: "localhost:2368"
  });
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./*.hbs').on('change', browserSync.reload);
});

gulp.task('build', ['css'], function(){
  gulp.src(['./**/*.hbs', '!./node_modules/**/*.hbs', 'assets/**/*', 'package.json'], {
    base: './'
  }).pipe(gulp.dest('./release'));
});

gulp.task('default', ['css', 'sync']);
