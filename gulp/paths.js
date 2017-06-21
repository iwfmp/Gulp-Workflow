// gulp/paths.js
'use strict';

// base paths
var src    = './src/',
    dist   = './dist/',
    dev    = 'dev/',
    prod   = 'prod/';

// taks paths
module.exports = {
    to: {

    	// dest folders
        dist: {
            dev: dist + dev,
            prod: dist + prod,
            main: dist
        },
        dev: dev,
        prod: prod,

        // html files
        html: {
            index: src + 'html/index.html',
            src: src + 'html/**/*.html',
            dist: {
                dev: dist + dev + 'html',
                prod: dist + prod + 'html'
            }
        },

        // hugo files
        hugo: {
            config: src + 'hugo/config.toml',
            src: src + 'hugo',
            dist: '../../' + dist + dev,
            watch: src + 'hugo/**/*.{toml,html,md}'
        },

        // js files
        js: {
            src: [
                src + 'js/**/*.js',
                '!' + src + 'js/vendor/**/*.js'
            ],
            vendor: src + 'js/vendor/',
            dist: {
                dev: dist + dev + 'js',
                prod: dist + prod + 'js'
            }
        },

        // sass files
        sass: {
            src: [
                src + 'scss/**/*.scss',
                '!' + src + 'scss/vendor/**/*.{scss,sass}'
            ],
            vendor: src + 'scss/vendor/',
            dist: {
                dev: dist + dev + 'css',
                prod: dist + prod + 'css'
            }
        },

        // images
        images: {
            src: src + 'images/**/*',
            logo: src + 'images/logo.png', // change it depend on logo name
            favicons: src + 'images/favicons', // change it depend on logo name
            dist: {
                favicons: dist + dev + 'images/favicons',
                dev: dist + dev + 'images',
                prod: dist + prod + 'images'
            }
        },

        // svg
        svg: {
            src: src + 'svg/*',
            dist: {
                dev: dist + dev + 'svg',
                prod: dist + prod + 'svg'
            }
        },

        // fonts
        fonts: {
            src: src + 'fonts/*',
            vendor: src + 'fonts/vendor/',
            dist: {
                dev: dist + dev + 'fonts',
                prod: dist + prod + 'fonts'
            }
        },

        // revision
        rev: {
            src: [
                dist + prod + 'css/*.css',
                dist + prod + 'svg/*.svg',
                dist + prod + 'js/*.js',
                dist + prod + 'images/**/*'
            ],
            dist: dist + prod,
            manifest: {
                name: 'manifest.json',
                path: dist + prod
            }
        },

        // revision collect
        collect: {
            src: [
                dist + prod + 'manifest.json',
                dist + prod + '**/*.{html,xml,txt,json,css,js}',
                '!' + dist + prod + '/feed.xml'
            ],
            dist: dist + prod
        }

    }
};
