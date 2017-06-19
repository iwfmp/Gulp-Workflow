// gulp/tasks/build/css.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp build:css' : main css task
// ----------------------------------
// plugins:
//     gulp-csso               : $.csso
//     gulp-rename             : $.rename
//     gulp-plumber            : $.plumber
//     gulp-concat             : $.concat
//     gulp-uncss              : $.uncss
//     gulp-cssbeautify        : $.cssbeautify
//     gulp-strip-css-comments : $.stripCssComments
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // start css task
    gulp.task(config.task.build + ':css', 'build css files (beautify/concat/minify..)', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/vendor/*.css',
                path.to.sass.dist.dev + '/*.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // remove unused css selectors
            .pipe($.uncss(
                config.css.uncssOptions // options
            ))
            // strip unimportant css comments
            .pipe($.stripCssComments(
                config.css.stripCommentsOptions // options
            ))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // concat all css files
            .pipe($.concat('style.css'))
            // minify
            .pipe($.csso())
            // rename files
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            .pipe(gulp.dest(path.to.sass.dist.prod));

    });

};
