// gulp/tasks/build/rev.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp build:rev'             : main revision task
//    'gulp build:rev:menifest'    : main revision task
//    'gulp build:rev:collect'     : main revision task
// ----------------------------------
// plugins:
//     gulp-rev           : $.rev
//     gulp-rev-del       : $.revDel
//     gulp-rev-collector : $.revCollector
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // revision all static assets
    gulp.task(config.task.build + ':manifest', 'menifest all static assets', function() {

        return gulp.src(path.to.rev.src, { base: path.to.rev.dist })
            .pipe($.rev())
            .pipe($.revDel())
            .pipe(gulp.dest(path.to.rev.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(path.to.rev.manifest.path));

    });

    // update references all static assets
    gulp.task(config.task.build + ':collect', 'collect and revision assets', function() {

        return gulp.src(path.to.collect.src)
            .pipe($.revCollector())
            .pipe(gulp.dest(path.to.collect.dist));

    });

    // main revision task
    gulp.task(config.task.build + ':rev', 'main rev task', function(cb) {

        $.runSequence(
            config.task.build + ':manifest',
            config.task.build + ':collect',
            cb
        )

    });

};