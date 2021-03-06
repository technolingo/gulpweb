'use strict';

var gulp = require('gulp');

var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var del = require('del');
var zip = require('gulp-zip');

var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minifyJs = composer(uglifyjs, console);

var concat = require('gulp-concat');
// var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourceMaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');
var babel = require('gulp-babel');

sass.compiler = require('node-sass');

// Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

// Image compression
var imageMin = require('gulp-imagemin');
var pngQuant = require('imagemin-pngquant');
var jpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
// var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var TEMPLATES_PATH = 'public/templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// // CSS Styles
// gulp.task('styles', function () {
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
  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function (e) {
      console.log('Scripts Task Error');
      console.log(e);
      this.emit('end');
    }))
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minifyJs())
    .pipe(concat('scripts.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Images
gulp.task('images', function () {
  return gulp.src(IMAGES_PATH)
    .pipe(imageMin([
      imageMin.gifsicle({ interlaced: true }),
      imageMin.jpegtran({ progressive: true }),
      imageMin.optipng({ optimizationLevel: 5 }),
      imageMin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      }),
      pngQuant(),
      jpegRecompress()
    ]))
    .pipe(gulp.dest(DIST_PATH + '/images'));
});

// Templates
gulp.task('templates', function () {
  return gulp.src(TEMPLATES_PATH)
    .pipe(handlebars({
      handlebars: handlebarsLib
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Clean-up redundant files
gulp.task('clean', function () {
  return del.sync([
    // a list of files or directories to delete
    DIST_PATH
  ]);
});

// Default
gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], function () {
  console.log('Starting "default" task.');
});

// Export public/ as zip
gulp.task('export', ['clean'], function () {
  return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});

// Watch
gulp.task('watch', ['default'], function () {
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  // gulp.watch(CSS_PATH, ['styles']);
  gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(TEMPLATES_PATH, ['templates']);
});

// Gulp 4 example - done is necessary to signal async completion
// gulp.task('watch', function ( done ) {
//   gulp.watch( SCRIPTS_PATH, gulp.series('scripts') );
//   done();
// });
