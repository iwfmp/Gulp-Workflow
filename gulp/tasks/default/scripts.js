// gulp/tasks/default/scripts.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp js'              : main js task
// ----------------------------------
// plugins:
//     browser-sync          : $.browserSync
//     gulp-cached           : $.cached
//     gulp-changed          : $.changed
//     gulp-concat           : $.concat
//     gulp-newer            : $.newer
//     gulp-plumber          : $.plumber
//     lazypipe              : $.lazypipe
//
//     gulp-jshint           : $.jshint
//     gulp-uglify           : $.uglify
// ----------------------------------
// config:
//     config.task.scripts   : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.js.dist.dev + '/**/*.js')
        // only pass through newer source files
        .pipe($.newer, path.to.js.dist.dev + '/**/*.js')
        // start cache
        .pipe($.cached, 'js');

    // compile js task
    gulp.task(config.task.scripts + ':local', 'work through js files', function() {

        return gulp.src(path.to.js.src)
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // run jshint
            // .pipe($.jshint())
            // run uglify pipe
            .pipe($.uglify())
            // concat to single file
            .pipe($.concat('main.js'))
            // move to dist folder
            .pipe(gulp.dest(path.to.js.dist.dev))
            // browser reload
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // compile vendor task
    gulp.task(config.task.scripts + ':vendor', 'work through js files', function() {

        return gulp.src(path.to.js.vendor + '**/*.js')
            // move to dist folder
            .pipe(gulp.dest(path.to.js.dist.dev + '/vendor'))
            // browser reload
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main scripts task
    gulp.task(config.task.scripts, 'main scripts task', function(cb) {

        $.runSequence(
            config.task.scripts + ':local',
            config.task.scripts + ':vendor',
            cb
        )

    });

};
