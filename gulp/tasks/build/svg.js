// gulp/tasks/default/svg.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp build:svg' : main svg task
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy svg to prod folder
    gulp.task(config.task.build + ':svg', 'copy svg to prod folder', function() {

        return gulp.src(path.to.svg.dist.dev + '/**/*')
            .pipe(gulp.dest(path.to.svg.dist.prod));

    });

};
