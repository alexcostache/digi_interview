const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
    return src('app/sass/styles.sass', {
            sourcemaps: true
        })
        .pipe(sass( {
            includePaths: ['node_modules']
        }))
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist', {
            sourcemaps: './'
        }));
}

// JavaScript Task
function jsTask() {
    return src('app/js/script.js', {
            sourcemaps: true
        })
        .pipe(terser())
        .pipe(dest('dist', {
            sourcemaps: './'
        }));
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['./app/**/*.sass', './app/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);