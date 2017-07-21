## Gulp workflow
An organized front-end workflow for your next project using gulp.
* [Features](https://github.com/iwfmp/gulp-workflow#features)
* [Gulp Tasks Structure](https://github.com/iwfmp/gulp-workflow#gulp-tasks-structure)
* [Getting Started](https://github.com/iwfmp/gulp-workflow#getting-started)
* [Folders Structure](https://github.com/iwfmp/gulp-workflow#folders-structure)
* [Configuration & Paths](https://github.com/iwfmp/gulp-workflow#configuration--paths)
* [License](https://github.com/iwfmp/gulp-workflow#license)
* [Fork](https://github.com/iwfmp/gulp-workflow#fork)

## Features
- Organized & splitting tasks files
- Using gulp-load-plugins
- Define tasks options & paths from one file
- Using bower to get dependencies
- Preview server with BrowserSync
- Cleans up file directories
- Plumber to handle gulp exceptions
- Sourcemaps for sass & js
- Sass compile with docs
- Js browserify & uglify
- Hugo Build command
- Automagically inject css/js files
- Prettify html files
- Image optimization
- Generate favicons
- Concat css/js files
- Revision all assets
- Use Ngrok as a dev tunnel
- & more, take a look at the gulp plugins used in [package.json](https://github.com/iwfmp/gulp-workflow/blob/master/package.json)

## Gulp Tasks Structure
This is gulp folder structure:
- `config.js` file : to define tasks options
- `paths.js` file : to define all paths for tasks
- `base` folder : contain base tasks
- `default` folder : contain common tasks for development
- `debug` folder : contain stats tasks for development
- `build` folder : contain build tasks for production
- `publish` folder : contain publish tasks for production

## Getting Started
- Install [Node.js](https://nodejs.org/)
- Install [Gulp](http://gulpjs.com/), [Yarn](https://yarnpkg.com/) & [Bower](http://bower.io/) globally
```
npm install -g gulp bower yarn
```
- In terminal/command line, `cd` into your project directory
- Clone this workflow
```
git clone https://github.com/iwfmp/gulp-workflow.git .
```
- Clone [source folder structure](https://github.com/iwfmp/boilerplate)
```
git clone https://github.com/iwfmp/boilerplate.git src
```
- Install Gulp dependencies
```
yarn install
```
- Install front-end/bower dependencies
```
bower install
```
- After all done installing, you can run tasks
  * `gulp` to run default tasks for development
  * `gulp build` to build your project for production
  * `gulp publish` to publish your project (gh-pages ATM)
  * `gulp stats` to see useful statistics about your project (IN PROGRESS)
  * `gulp help` to get a listing of available tasks

## Folders Structure
- `src` folder : contain all source files
- `dist` folder : contain dest folders `dev` for development & `prod` for production
- `bower_components` folder : contain all bower dependencies
- `gulp` folder : contain all gulp tasks files
- `node_modules` folder : contain all gulp dependencies
- `bower.json` file : define bower dependencies
- `gulpfile.js` file : define gulp tasks for default & build
- `package.json` file : define gulp dependencies

## Configuration & Paths
- From [`gulp/config.js`](https://github.com/iwfmp/gulp-workflow/blob/master/gulp/config.js) you can define tasks & plugins options without change anything in task file, example :
```javascript
// bower task mainBowerFiles options
    mainBowerFiles: {
        // main options
        options: {
            base: 'bower_components'
        },
        // bower:css rename options
        rename: {
            suffix: "-css",
            extname: '.scss'
        },
        // watch src
        watch: ['./bower_components/**', './bower.json']
    },
```

- From [`gulp/paths.js`](https://github.com/iwfmp/gulp-workflow/blob/master/gulp/paths.js) you can define all paths for tasks, example :
```javascript
// base paths
var src    = './source/',
    dist   = './build/',
    dev    = 'dev/',
    prod   = 'prod/',
    assets = 'assets/';

// svg task options
        svg: {
            // SVG Symbols options
            svgSymbolsOptions: {
              className:  '.icon--%f',
              templates: ['default-svg']
            }
        },
```

## License
The code is available under the [MIT License](https://github.com/iwfmp/gulp-workflow/LICENSE).

## Fork
This code has been forked from [Gulp Workflow](https://github.com/mohamdio/gulp-workflow)
