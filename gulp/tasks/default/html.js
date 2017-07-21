// gulp/tasks/default/html.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp html'          : copy & prettify html
// ----------------------------------
// plugins:
//     browser-sync     : $.browserSync
//     gulp-cached      : $.cached
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
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
    gulp.task(config.task.html, 'copy & prettify html to dev folder', function() {

        return gulp.src(path.to.html.src)
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

};
