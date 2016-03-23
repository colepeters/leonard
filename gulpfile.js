var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var postcss = require('gulp-postcss')
var rename = require('gulp-rename')

var BROWSER_SUPPORT_LIST = [
  'Chrome >= 41',
  'Safari >= 8',
  'Firefox >= 36',
  'ie >= 10',
  'iOS >= 8',
  'Android >= 4.4.2',
  'ChromeAndroid >= 4.4.2'
]

gulp.task('css', function () {
  return gulp.src('src/css/app.css')
  .pipe(postcss([
    require('postcss-import'),
    require('postcss-cssnext')({
      browsers: BROWSER_SUPPORT_LIST
    }),
    require('cssnano')
  ]))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./assets/css'))
})

gulp.task('sync', function () {
  browserSync.init({
    proxy: 'localhost:2368'
  })
  gulp.watch('./src/css/*.css', ['css'])
  gulp.watch('./*.hbs').on('change', browserSync.reload)
})

gulp.task('build', ['css'], function () {
  gulp.src(['./**/*.hbs', '!./node_modules/**/*.hbs', 'assets/**/*', 'package.json'], {
    base: './'
  }).pipe(gulp.dest('./release'))
})

gulp.task('default', ['css', 'sync'])
