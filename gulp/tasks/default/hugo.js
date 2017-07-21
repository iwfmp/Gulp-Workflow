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

    // render hugo files
    gulp.task(config.task.hugo + ':render', 'render hugo files', function(cb) {

        var exec = require('child_process').exec;

        exec(config.hugo.cmd, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });

    });

    // prettify and refresh browser
    gulp.task(config.task.hugo + ':prettify', 'prettify hugo files', function() {

        return gulp.src(path.to.html.dist.dev + '**/*.html')
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

    // inject local css/js files task
    gulp.task(config.task.hugo + ':inject', 'inject css/js files', function() {

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

    // main sass task
    gulp.task(config.task.hugo, 'main hugo task', function(cb) {

        $.runSequence(
            config.task.hugo + ':render',
            config.task.hugo + ':inject',
            config.task.hugo + ':prettify',
            cb
        )

    });

};
