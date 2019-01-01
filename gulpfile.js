'use strict';

var gulp = require('gulp');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minifyJs = composer(uglifyjs, console);
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourceMaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

// // CSS Styles
// gulp.task('styles', function () {
//   console.log('Starting "styles" task.');

//   // make sure reset.css comes first
//   return gulp.src(['public/css/reset.css', CSS_PATH])
//     .pipe(plumber(function (e) {
//       console.log('Styles Task Error');
//       console.log(e);
//       this.emit('end');
//     })) // error handling
//     .pipe(sourceMaps.init())
//     .pipe(autoprefixer()) // config ex. {browsers: ['last 2 versions', 'ie 8']}
//     .pipe(concat('styles.css'))
//     .pipe(minifyCss())
//     .pipe(sourceMaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// SCSS Styles
gulp.task('styles', function () {
  console.log('Starting "styles" task.');

  return gulp.src('public/scss/styles.scss')
    .pipe(plumber(function (e) {
      console.log('Styles Task Error');
      console.log(e);
      this.emit('end');
    })) // error handling
    .pipe(sourceMaps.init())
    .pipe(autoprefixer()) // config ex. {browsers: ['last 2 versions', 'ie 8']}
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
  console.log('Starting "scripts" task.');

  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function (e) {
      console.log('Scripts Task Error');
      console.log(e);
      this.emit('end');
    })) // error handling
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
  // gulp.watch(CSS_PATH, ['styles']);
  gulp.watch('public/scss/**/*.scss', ['styles']);
});

// Gulp 4 example - done is necessary to signal async completion
// gulp.task('watch', function ( done ) {
//   console.log('Starting watch task');
//   gulp.watch( SCRIPTS_PATH, gulp.series('scripts') );
//   done();
// });
