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
            .pipe($.svgmin()) // Minimize SVG Files
            .pipe($.svgSymbols(  // Create an SVG Sprite
                config.svg.svgSymbolsOptions // options
            ))
            .pipe(gulp.dest(path.to.svg.dist.dev));

    });

};
