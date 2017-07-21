// gulp/tasks/base/serve.js
'use strict';

// ----------------------------------
// available tasks:
//    'gulp serve'      : start server & open browser
//    'gulp serve:prod' : start server for production
// ----------------------------------
// plugins:
//     browser-sync : $.browserSync
//     ngrok        : $.ngrok
//     gulp-utils   : $.util
// ----------------------------------
// config:
//     config.task.browserSync : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    gulp.task(config.task.browserSync, 'start server for development', function() {
        $.browserSync(
            config.serve.dev, function (err, bs) {
            $.ngrok.connect(config.ngrok.options, function (err, url) {
                console.log(' -------------------------------------');
                $.util.log('\r', '      NGROK:', $.util.colors.magenta(url));
                console.log(' -------------------------------------');
            });
        });
    });

    gulp.task(config.task.browserSync + ':prod', 'start server for production', function() {
        $.browserSync(
            config.serve.prod, function (err, bs) {
            $.ngrok.connect(config.ngrok.options, function (err, url) {
                console.log(' -------------------------------------');
                $.util.log('\r', '      NGROK:', $.util.colors.magenta(url));
                console.log(' -------------------------------------');
            });
        });
    });

};
