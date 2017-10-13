var gulp = require('gulp'),
    // pump = require('pump'),
    rename = require('gulp-rename'),
    srcPath = './src/',
    distPath = './build/',
    // Files/Paths that need to be watched by gulp
    watchPaths = {
        html: srcPath + '*.html',
        // css: [srcPath + 'css/style.css'],
        sass: srcPath + 'scss/*/*.scss'
        // js:   [srcPath + 'js/app.js']
    },
    bs = require('browser-sync').create();

gulp.task('browser-sync', function (cb) {
    bs.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html').on('change', bs.reload);
});

// gulp.task('sass', function (cb) {
//     var sass = require('gulp-sass');
//     pump([
//         gulp.src(srcPath + 'scss/*.scss'),
//         sass().on('error', sass.logError),
//         gulp.dest(srcPath + 'css')
//     ], cb);
// });
gulp.task('sass', function (cb) {
    var sass = require('gulp-sass');

    return gulp.src('src/scss/*.scss')
        // .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(srcPath + 'css'))
        .pipe(bs.reload({stream: true}));
});

// gulp.task('js', function (cb) {
//     var uglifyjs = require('uglify-es'),
//         composer = require('gulp-uglify/composer'),
//         minify = composer(uglifyjs, console),
//         options = {};

//     return gulp.src(srcPath + 'js/app.js')
//         .pipe(minify(options))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest(distPath + 'js'));
// });

gulp.task('css', function (cb) {
    var postcss = require('gulp-postcss');

    return gulp.src(srcPath + 'css/style.css')
        .pipe(postcss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(distPath + 'css'));
});

// The watch task will be executed upon each file change
gulp.task('watch', function () {
    // gulp.watch(watchPaths.js, ['js']);
    // gulp.watch(watchPaths.css, ['css']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/scss/*/*.scss', ['sass']);
    gulp.watch('src/*.html').on('change', bs.reload);
});
// gulp.task('watch-sass-only', function() {
//     gulp.watch(watchPaths.sass, ['sass']);
// });

// Default task is executed upon execution of gulp
// gulp.task('start', ['browser-sync', 'watch']);
gulp.task('default', ['sass', 'css']);
