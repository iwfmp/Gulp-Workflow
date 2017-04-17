// gulp/tasks/default/sass.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp sass'           : main sass task
//    'gulp sass:compile'   : compile scss to css
//    'gulp sass:doc'       : release sass docs
// ----------------------------------
// plugins:
//     browser-sync         : $.browserSync
//     gulp-cached          : $.cached
//     gulp-changed         : $.changed
//     gulp-newer           : $.newer
//     gulp-plumber         : $.plumber
//     lazypipe             : $.lazypipe

//     autoprefixer         : $.autoprefixer
//     gulp-filter          : $.filter
//     gulp-sass            : $.sass
//     gulp-sourcemaps      : $.sourcemaps
//     sassdoc              : $.sassdoc
//
//     gulp-postcss         : $.postcss
//     postcss-utilities    : $.postcssUtilities
//     postcss-reporter     : $.postcssReporter
// ----------------------------------
// config:
//     config.task.sass : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.sass.dist.dev + '/**/*.css')
        // only pass through newer source files
        .pipe($.newer, path.to.sass.dist.dev + '/**/*.css')
        // start cache
        .pipe($.cached, 'sass');

    // compile sass task
    gulp.task(config.task.sass + ':compile', 'compile scss to css', function() {

        // avoid writing sourcemaps of sourcemaps
        var filter = $.filter(['*.css', '!*.map'], {
            restore: true
        });

        return gulp.src(path.to.sass.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // initialize sourcemaps
            .pipe($.sourcemaps.init())
            // start compile
            .pipe($.sass(
                config.sass.options // options
            ))
            .pipe($.postcss([
                    $.postcssUtilities(),
                    $.postcssReporter()
                ])
            )
            // writing sourcemaps
            .pipe($.sourcemaps.write('./_maps'))
            // filter css files
            .pipe(filter)
            // prefixing css
            .pipe($.autoprefixer())
            // restoring filtered files
            .pipe(filter.restore)
            .pipe(gulp.dest(path.to.sass.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // release sass docs task
    gulp.task(config.task.sass + ':doc', 'release sass docs', function() {

        return gulp.src(path.to.sass.src)
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // start sassdoc
            .pipe($.sassdoc(
                config.sass.sassdocOptions // options
            ))
            .resume();

    });

    // main sass task
    gulp.task(config.task.sass, 'main sass task', function(cb) {

        $.runSequence(
            config.task.sass + ':compile',
            config.task.sass + ':doc',
            cb
        )

    });

};
