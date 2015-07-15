var gulp = require('gulp'),
    watch = require('gulp-watch'),
    reactify = require('reactify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    distPath = 'public/dist',
    publicPath = 'public/src';

gulp.task('default', function() {
    runSequence('clean', 'build', 'copy');

    watch([publicPath + '/**/*.jsx', publicPath + '/**/*.js'], function() {
        gulp.start('build-js');
     });

    watch(publicPath + '**/*.scss', function() {
        gulp.start('build-css');
     });
});

gulp.task('copy', function() {
    gulp.src(publicPath + '/**/*.html', {base: publicPath})
        .pipe(gulp.dest(distPath));
});

gulp.task('build', function() {
    runSequence('build-js', 'build-css');
});

gulp.task('build-js', function() {
    var b = browserify({
        transform: [reactify],
        debug: true,
        entries: [publicPath + '/main.jsx']
    });
    b.bundle()
        .pipe(source('main.jsx'))
        .pipe(gulp.dest(distPath));
});

gulp.task('build-css', function() {
    gulp.src(publicPath + '/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(distPath));
});

gulp.task('clean', function() {
    return gulp.src(distPath, {read: false})
        .pipe(clean());
});
