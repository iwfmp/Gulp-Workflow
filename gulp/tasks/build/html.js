// gulp/tasks/build/html.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp build:html'        : main html task
//    'gulp build:html:copy'   : copy & prettify html
//    'gulp build:html:inject' : inject minified css/js
// ----------------------------------
// plugins:
//     gulp-prettify    : $.prettify
//     gulp-inject      : $.inject
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy html to prod folder
    gulp.task(config.task.build + ':html:copy', 'copy html to prod folder', function() {

        return gulp.src(path.to.html.dist.dev + '/**/*')
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            .pipe(gulp.dest(path.to.html.dist.prod));

    });

    // inject css/js files task
    gulp.task(config.task.build + ':html:inject', 'inject css/js files', function() {

        return gulp.src(path.to.html.dist.dev + '/*.html')
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            /**
             * CSS files
             */
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.sass.dist.prod + '/*.min.css', {
                    read: false
                }),
                config.html.injectProd.options // options
            ))
            /**
             * JS files
             */
            // inject main files
            .pipe($.inject(gulp.src(
                path.to.js.dist.prod + '/*.min.js', {
                    read: false
                }),
                config.html.injectProd.options // options
            ))
            .pipe(gulp.dest(path.to.html.dist.prod))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main html task
    gulp.task(config.task.build + ':html', 'main build:html task', function(cb) {

        $.runSequence(
            config.task.build + ':html:copy',
            config.task.build + ':html:inject',
            cb
        )

    });

};