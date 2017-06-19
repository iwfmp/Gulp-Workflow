// gulp/tasks/default/hugo.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp hugo'       : main hugo task
// ----------------------------------
// plugins:
//     browser-sync     : $.browserSync
//     gulp-cached      : $.cached
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-plumber     : $.plumber
//     lazypipe         : $.lazypipe
//
//     gulp-exec        : $.exec
// ----------------------------------
// config:
//     config.task.hugo : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.hugo.watch)
        // only pass through newer source files
        .pipe($.newer, path.to.hugo.watch)
        // start cache
        // .pipe($.cached, 'hugo');

    // copy fonts to dev folder
    gulp.task(config.task.hugo, 'render and copy hugo to dev folder', function() {

        return gulp.src(path.to.html.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // Render Hugo files
            .pipe($.exec(config.hugo.cmd, {encoding: 'utf-8'}))
            // beautify HTML
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            // Reload browser
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

};
