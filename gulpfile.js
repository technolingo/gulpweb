var gulp = require('gulp');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minifyJs = composer(uglifyjs, console);
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

// Styles
gulp.task('styles', function () {
  console.log('Starting "styles" task.');

  // make sure reset.css comes first
  return gulp.src(['public/css/reset.css', CSS_PATH])
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
  console.log('Starting "scripts" task.');

  return gulp.src(SCRIPTS_PATH)
    .pipe(minifyJs())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Images
gulp.task('images', function () {
  console.log('Starting "images" task.');
});

// Default
gulp.task('default', function () {
  console.log('Starting "default" task.');
});

// Watch
gulp.task('watch', function () {
  console.log('Starting watch task.');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(CSS_PATH, ['styles']);
});

// Gulp 4 example - done is necessary to signal async completion
// gulp.task('watch', function ( done ) {
//   console.log('Starting watch task');
//   gulp.watch( SCRIPTS_PATH, gulp.series('scripts') );
//   done();
// });
