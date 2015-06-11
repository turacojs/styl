// https://gist.github.com/demisx/beef93591edc1521330a

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var grep = require('gulp-grep');
var browserSync = require('browser-sync');
var bs;


gulp.task('stylus', function() {
    if (bs) {
        bs.notify("Compiling, please wait!");
    }
    var stream = gulp.src('styles/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write('.', {sourceRoot: '/'}))
        .pipe(gulp.dest('public/'))
        .pipe(grep('**/*.css', {read: false, dot: true}));
    if (bs) {
        stream.pipe(bs.stream());
    }
    return stream;
});

gulp.task('all', gulp.parallel('stylus'));
gulp.task('build', gulp.series('all'));

gulp.task('watch:styles', function() {
    gulp.watch(['styles/**/*.styl', '../styl/**/*.styl'], gulp.series('stylus'));
});

gulp.task('watch', gulp.parallel('watch:styles'));

gulp.task('ws', function(cb) {
    bs = browserSync.create();
    bs.init({
        proxy: "localhost:3000",
        port: 4000,
        notify: false,
        open: false
    }, cb);
});

gulp.task('default', gulp.series('build', 'ws', 'watch'));
