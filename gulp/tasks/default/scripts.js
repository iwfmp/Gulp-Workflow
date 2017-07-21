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

    // compile sass task
    gulp.task(config.task.scripts, 'work through js files', function() {

        return gulp.src(path.to.js.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            .pipe(cacheFiles())
            // run jshint
            // .pipe($.jshint())
            // run uglify pipe
            .pipe($.uglify())
            .pipe(gulp.dest(path.to.js.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

};
