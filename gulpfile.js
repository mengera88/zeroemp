let gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber');
let autoprefix = require('gulp-autoprefixer');
let gutil = require('gulp-util');

let config = require('./config/build');
let srcBase = config.web.clientBase;
let distBase = config.web.distBase;
let targetPath = distBase + '/css';

gulp.task('buildLess', function () {
    gulp.src([srcBase + '/less/index.less'])
        .pipe(plumber())
        .pipe(less({compress: true}).on('error', gutil.log))
        .pipe(autoprefix('last 10 versions', 'ie 9'))
        .pipe(gulp.dest(targetPath));
});

gulp.task('watchLess', function() {
    gulp.watch(srcBase + '/less/**/*.less', ['buildLess']);
})


gulp.task('default', ['watchLess']);