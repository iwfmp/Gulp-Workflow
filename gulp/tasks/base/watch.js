// gulp/tasks/base/watch.js
'use strict';

// ----------------------------------
// watch tasks:
//    fonts
//    html
//    images
//    js
//    sass
//    svg
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    gulp.task('watch', 'watch files when changes', function() {
        // gulp.watch(path.to.hugo.watch,   { usePolling: true }, [config.task.hugo]);
        gulp.watch(path.to.fonts.src,  { usePolling: true }, [config.task.fonts]);
        gulp.watch(path.to.html.src,   { usePolling: true }, [config.task.html, config.task.inject]);
        gulp.watch(path.to.images.src, { usePolling: true }, [config.task.images]);
        gulp.watch(path.to.js.src,     { usePolling: true }, [config.task.scripts]);
        gulp.watch(path.to.sass.src,   { usePolling: true }, [config.task.sass]);
        gulp.watch(path.to.svg.src,    { usePolling: true }, [config.task.svg]);
    });

};
