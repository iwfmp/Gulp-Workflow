// gulp/tasks/base/bower.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp bower'       : main task
//    'gulp bower:js'    : dest js files
//    'gulp bower:scss'  : dest scss files
//    'gulp bower:clean' : clean before dest
// ----------------------------------
// plugins:
//     main-bower-files  : $.mainBowerFiles
//     gulp-flatten      : $.flatten
//     del               : $.del
//     run-sequence      : $.runSequence
//     gulp-cached       : $.cached
//     gulp-rename       : $.rename
// ----------------------------------
// config:
//     config.task.bower : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // clean folders and files
    gulp.task(config.task.bower + ':clean', 'clean before copy files', function() {

        return $.del([
            path.to.js.vendor,
            path.to.sass.vendor
        ]);

    });

    // copy JS files
    gulp.task(config.task.bower + ':js', 'copy js files', function() {

        return gulp.src($.mainBowerFiles('**/*.js'),
                config.mainBowerFiles.options // options
            )
            .pipe($.cached('bowerJs')) // start cache
            .pipe($.flatten()) // replace relative path for files
            .pipe(gulp.dest(path.to.js.vendor));

    });

    // copy SCSS files
    gulp.task(config.task.bower + ':scss', 'copy scss files', function() {

        return gulp.src($.mainBowerFiles('**/*.{scss,sass}'),
                config.mainBowerFiles.options // options
            )
            .pipe($.cached('bowerScss')) // start cache
            .pipe(gulp.dest(path.to.sass.vendor));

    });

    // main bower task
    gulp.task(config.task.bower, 'copy all bower dependencies to source folder', function(cb) {

        $.runSequence(
            config.task.bower + ':clean',
            [
                config.task.bower + ':js',
                config.task.bower + ':scss'
            ],
            cb
        )

    });

};