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

    // inject local css/js files task
    gulp.task(config.task.inject, 'inject css/js files', function() {

        return gulp.src(path.to.html.dist.dev + '**/*.html')
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // inject main css files
            .pipe($.inject(gulp.src(
                path.to.sass.dist.dev + '/*.css', {
                    read: false
                }),
                config.html.inject.options // options
            ))

            // inject main js files
            .pipe($.inject(gulp.src(
                path.to.js.dist.dev + '/**/*.js', {
                    read: false
                }),
                config.html.inject.options // options
            ))
            .pipe(gulp.dest(path.to.html.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

};




