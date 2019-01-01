var gulp = require('gulp');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);
var livereload = require('gulp-livereload');

// File paths
var SCRIPTS_PATH = 'public/scripts/**/*.js';

// Styles
gulp.task('styles', function () {
  console.log('Starting "styles" task.');
});

// Scripts
gulp.task('scripts', function () {
  console.log('Starting "scripts" task.');

  return gulp.src(SCRIPTS_PATH)
    .pipe(minify())
    .pipe(gulp.dest('public/dist'))
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
});

// Gulp 4 example - done is necessary to signal async completion
// gulp.task('watch', function ( done ) {
//   console.log('Starting watch task');
//   gulp.watch( SCRIPTS_PATH, gulp.series('scripts') );
//   done();
// });
