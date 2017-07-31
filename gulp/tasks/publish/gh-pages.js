// gulp/tasks/publish/gh-pages.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp publish:gh-pages' : publish to github pages
// ----------------------------------
// plugins:
//     gulp-gh-pages         : $.ghPages
// ----------------------------------
// config:
//     config.task.publish : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // publish to github pages
    gulp.task(config.task.publish + ':gh-pages', 'publish to Github Pages', function() {

        return gulp.src(path.to.dist.prod + '**/*')
            .pipe($.ghPages());

    });

};
