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


    // render hugo files
    gulp.task(config.task.hugo + ':render', 'render hugo files', function() {

        var exec = require('child_process').exec;

        exec(config.hugo.cmd, function(error, stdout, stderr) {
            console.log('Builder Says: ' + stdout);
            if (error !== null) {
                console.log('stderr: ' + stderr);
                console.log('exec error: ' + error);
            }
        });

    });

    // prettify and refresh browser
    gulp.task(config.task.hugo + ':prettify', 'prettify hugo files', function() {

        return gulp.src(path.to.html.dist.dev)
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
            // Reload browser
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main sass task
    gulp.task(config.task.hugo, 'main hugo task', function(cb) {

        $.runSequence(
            config.task.hugo + ':render',
            config.task.hugo + ':prettify',
            cb
        )

    });

};
