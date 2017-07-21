// gulp/tasks/default/html.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp html'          : main html task
//    'gulp html:copy'     : copy & prettify html
//    'gulp html:inject'   : inject minified css/js
// ----------------------------------
// plugins:
//     browser-sync     : $.browserSync
//     gulp-cached      : $.cached
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-plumber     : $.plumber
//     lazypipe         : $.lazypipe
//
//     gulp-prettify    : $.prettify
// ----------------------------------
// config:
//     config.task.html : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.html.dist.dev + '/**/*.html')
        // only pass through newer source files
        .pipe($.newer, path.to.html.dist.dev + '/**/*.html')
        // start cache
        .pipe($.cached, 'html');

    // copy fonts to dev folder
    gulp.task(config.task.html + ':copy', 'copy & prettify html to dev folder', function() {

        return gulp.src(path.to.html.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // beautify HTML
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            .pipe(gulp.dest(path.to.html.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // inject css/js files task
    gulp.task(config.task.html + ':inject', 'inject css/js files', function() {

        return gulp.src(path.to.html.dist.dev + '/*.html')
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            /**
             * CSS files
             */
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.sass.dist.dev + '/*.css', {
                    read: false
                }),
                config.html.inject.options // options
            ))
            /**
             * JS files
             */
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.js.dist.dev + '/*.js', {
                    read: false
                }),
                config.html.inject.options // options
            ))
            .pipe(gulp.dest(path.to.html.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main nunjucks task
    gulp.task(config.task.html, 'main html task', function(cb) {

        $.runSequence(
            config.task.html + ':copy',
            config.task.html + ':inject',
            cb
        )

    });

};