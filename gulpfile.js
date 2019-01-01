var gulp = require('gulp');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);

// Styles
gulp.task('styles', function () {
    console.log('Starting "styles" task.');
});

// Scripts
gulp.task('scripts', function () {
    console.log('Starting "scripts" task.');

    return gulp.src('public/scripts/*.js')
        .pipe(minify())
        .pipe(gulp.dest('public/dist'));
});

// Images
gulp.task('images', function () {
    console.log('Starting "images" task.');
});

// Default
gulp.task('default', function () {
    console.log('Starting "default" task.');
});
