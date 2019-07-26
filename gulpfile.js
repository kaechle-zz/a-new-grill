// gulp
const gulp = require('gulp');

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

// compile them sassy styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass({includePaths: ['src/styles/']}))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
        stream: true
    }));
})

// watch for changes
gulp.task('watch', function () {
  gulp.watch('src/assets/styles/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

// sync the browser
const browserSync = require('browser-sync').create();

gulp.task('serve', function(){
  browserSync.init({
    server: 'src',
    port: 4000
  });
})

// make things ugly
const concat = require('gulp-concat')

gulp.task('pack-js', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('pack-css', function () {
  return gulp.src(['src/js/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js'));
})

// build it
var runSequence = require('run-sequence');

gulp.task('build', function (callback) {
  runSequence(
    'sass',
    ['pack-js', 'pack-css', 'images', 'fonts'],
    callback
  )
})






