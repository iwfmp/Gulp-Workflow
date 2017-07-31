// gulp/config.js
'use strict';

// require gulp-util & paths
var gutil    = require('gulp-util'),
    path     = require('./paths.js');

// project local url
var url = 'play.iwfmp';

// define options
module.exports = {

    // tasks names
    task: {
        bower      : 'bower',
        browserSync: 'serve',
        build      : 'build',
        clean      : 'clean',
        fonts      : 'fonts',
        html       : 'html',
        hugo       : 'hugo',
        images     : 'images',
        inject     : 'inject',
        publish    : 'publish',
        sass       : 'sass',
        scripts    : 'js',
        svg        : 'svg'
    },

    // serve task browser-sync options
    serve: {
        dev: {
            server: {
                baseDir: path.to.dist.dev
            },
            open: false
        },
        prod: {
            server: {
                baseDir: path.to.dist.prod
            },
            open: false
        }
    },

    // serve task ngrok options
    ngrok: {
        options: {
            port: '3000', // Port
            auth: 'iwfmp:zxasqw12', // http basic authentication for tunnel
            subdomain: url // reserved tunnel name
            // Access token is required, add it manually through CLI
        }
    },

    // bower task mainBowerFiles options
    mainBowerFiles: {
        // main options
        options: {
            base: 'bower_components',
            paths: {
                bowerDirectory: './bower_components',
                bowerJson: './bower.json'
            }
        }
    },

    // sass task options
    sass: {
        // main options
        options: {
            includePaths: [
                path.to.sass.vendor
            ],
            outputStyle: 'expanded'
            // more options
            // https://github.com/sass/node-sass#usage-1
        },
        // sass:doc options
        sassdocOptions: {
            dest: path.to.sass.dist.dev + '/_sassdoc',
            // for more options
            // http://sassdoc.com/gulp/
        }
    },

    // html task options
    html: {
        // build:html:copy prettify options
        prettifyOptions: {
            indent_size: 4,
            preserve_newlines: true
            // for more options:
            // https://github.com/beautify-web/js-beautify#css--html
        },
        inject: {
            options: {
                relative: true
            }
        },
        injectProd: {
            options: {
                relative: true,
                removeTags: true
            }
        }
    },

    // hugo task options
    hugo: {
        cmd: 'hugo --config=' + path.to.hugo.config + ' -s ' + path.to.hugo.src + ' -d ' + path.to.hugo.dist
    },

    // css task options
    css: {
        // uncss options
        uncssOptions: {
            html: [path.to.html.dist.dev + '/**/*.html'],
            ignore: ['/^.o-field/', '.is-active']
            // more options
            // https://github.com/giakki/uncss#within-nodejs
        },
        // strip-css-comments options
        stripCommentsOptions: {
            preserve: true
        },
        // cssbeautify options
        cssbeautifyOptions: {
            indent: '  '
        },
        // minify css options
        minifyCssOptions: {
            keepSpecialComments: 1
        },
        // rename options
        renameOptions: {
            suffix: '.min'
        }
    },

    // svg task options
    svg: {
        // SVG Symbols options
        svgSymbolsOptions: {
          className:  '.icon--%f',
          templates: ['default-svg']
        }
    },

    // publish task options
    publish: {
        publishOptions: {
          remoteUrl:  ' git@github.com:iwfmp/alternative.git'
        }
    },

    // images task options
    images: {
        // imagemin options
        imageminOptions: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true,
          verbose: true
        },
        // favicons options
        faviconsOptions: {
            appName: 'Gulpfile Setup',
            appDescription: 'Gulpfile setup',
            developerName: 'Elad Rom',
            developerURL: 'http://eladrom.com/',
            background: '#000000',
            path: '../images/favicons',
            url: '/',
            display: 'standalone',
            orientation: 'portrait',
            version: 1.0,
            logging: false,
            online: false,
            // html: path.to.html.index,
            // html: path.to.hugo.favicons,
            replace: true,
            icons: {
                android: false, // create Android homescreen icon
                appleIcon: false, // create Apple touch icons
                appleStartup: false, // create Apple startup images
                coast: false, // create Opera Coast icon
                favicons: true, // create regular favicons
                firefox: false, // create Firefox OS icons
                opengraph: false, // create Facebook OpenGraph image
                twitter: false, // create Twitter Summary Card image
                windows: false, // create Windows 8 tile icons
                yandex: false // create Yandex browser icon
            }
        }
            // options from here : https://github.com/haydenbleasel/favicons#nodejs
    },
};
