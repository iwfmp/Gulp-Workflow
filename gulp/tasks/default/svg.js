// gulp/tasks/default/svg.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp svg' : main svg task
// ----------------------------------
// plugins:
//     gulp-svg-symbols : $.svgSymbols
//     gulp-svgmin      : $.svgmin
// ----------------------------------
// config:
//     config.task.svg : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy svg to dev folder
    gulp.task(config.task.svg, 'copy svg to dev folder', function() {

        return gulp.src(path.to.svg.src)
            // Minimize SVG Files
            .pipe($.svgmin())
            // Create an SVG Sprite
            .pipe($.svgSymbols(
                config.svg.svgSymbolsOptions // options
            ))
            // Move to dist folder
            .pipe(gulp.dest(path.to.svg.dist.dev));

    });

};
