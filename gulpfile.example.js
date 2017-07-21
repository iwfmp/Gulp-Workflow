// gulpfile.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp'
//    'gulp bower'
//          bower:clean - bower:scss - bower:js
//    'gulp clean'
//          clean:cache - clean:prod
//    'gulp serve'
//          serve:prod
//    'gulp watch'

//    'gulp fonts'
//    'gulp html'
//    'gulp hugo'
//          hugo:render - hugo:prettify
//    'gulp inject'
//    'gulp images'
//          images:minify - images:favicons
//    'gulp sass'
//          sass:compile - sass:doc
//    'gulp scripts'
//          scripts:local - scripts:vendor
//    'gulp svg'

//    'gulp debug'
//          debug:colorguard - debug:psi - debug:selectorlist - debug:stylestats
//    'gulp build'
//          build:css - build:fonts - build:html - build:images
//          build:rev - build:scripts - build:svg
//    'gulp publish'
//          publish:gh-pages
// ----------------------------------


// main gulp plugins
var gulp     = require('gulp-help')(require('gulp')),
    path     = require('./gulp/paths.js'),
    config   = require('./gulp/config.js'),
    sequence = require('run-sequence'),
    $        = require('gulp-load-plugins')({
        // used for all plugins type not just with gulp-*
        pattern: '*',
        rename: {
            'lodash.assign': 'assign'
        }
    });

// require all tasks : gulp-load-subtasks
$.loadSubtasks('./gulp/tasks/**/*.js', $, path, config);


// Global error handling
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe($.plumber(function(error) {
      // Output an error message
        console.log(' -------------------------------------');
        gutil.log('\r', '      Plugin Error:', gutil.colors.green(error.plugin));
        gutil.log('\r', '      Error Message:', gutil.colors.blue(error.message));
        console.log(' -------------------------------------');
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};


// common default tasks : for dev mode
gulp.task('default', 'common default tasks for dev mode', function(cb) {
    sequence(
        config.task.clean,
        config.task.bower,

        config.task.fonts,
        config.task.images,
        config.task.sass,
        config.task.scripts,
        config.task.svg,

        // config.task.hugo,
        config.task.html,
        config.task.inject,
        config.task.browserSync,
        'watch',
        cb
    )
});

// build tasks : for prod mode
gulp.task(config.task.build, 'main build task for prod mode', function(cb) {
    sequence(
        config.task.clean + ':cache',
        config.task.clean + ':prod',

        config.task.build + ':css',
        config.task.build + ':fonts',
        config.task.build + ':images',
        config.task.build + ':js',
        config.task.build + ':svg',

        config.task.build + ':html',
        config.task.build + ':rev',
        config.task.browserSync + ':prod',
        cb
    )
});
