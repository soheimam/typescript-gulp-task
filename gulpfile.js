const gulp = require("gulp");
const ts = require("gulp-typescript");
const gutil = require("gulp-util");
const browserify = require('browserify');
const watchify = require('watchify')
const tsify = require("tsify");
const source = require('vinyl-source-stream');

const paths = {
    pages: ['src/*.html']
};


const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);