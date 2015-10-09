# swagger-ui-browserify

Use [swagger-ui](https://github.com/swagger-api/swagger-ui) with browserify.

Supports version 2.1.3 and 2.0.24. Why?  Because 2.1.3 tries to convert a Swagger 1.2 into a Swagger 2 definition and it's not always a one-to-one mapping.

## Installation

Version 2.1.3 (Swagger 2.0)

```sh
$ npm install --save swagger-ui-browserify@2.1.3a
```

Version 2.0.24 (Swagger 1.2)

```sh
$ npm install --save swagger-ui-browserify@2.0.24a
```

## Example (version 2.1.3)

```javascript
// in your app.js file
var SwaggerUi = require('swagger-ui-browserify')

var swaggerUi = new SwaggerUi({
  url: '/apidocs',
  dom_id: 'swagger-ui-container',
  supportHeaderParams: true,
  onComplete: function (swaggerApi, swaggerUi) {
    console.log('Loaded SwaggerUI')
  },
  onFailure: function (error) {
    console.error('Unable to Load SwaggerUI', error)
  },
  apisSorter: 'alpha',
  operationsSorter: 'alpha',
  docExpansion: 'none'
})
swaggerUi.load()
```
## Example (version 2.0.24)

```javascript
// in your app.js file

window.swaggerUi = new SwaggerUi({
  url: "/apidocs/apis",
  dom_id: "swagger-ui-container",
  supportHeaderParams: true,
  onComplete: function (swaggerApi, swaggerUi) {
    console.log('Loaded SwaggerUI')
  },
  onFailure: function (error) {
    console.error('Unable to Load SwaggerUI', error)
  },
  sorter: 'alpha',
  docExpansion: "none"
});
```

## Assets

You will need to make the CSS/images/font assets bundled with swagger-ui available to be referenced from your app's html page.  So, for example, in your `gulpfile.js` you might do something like the following:

```javascript
var gulp = require('gulp')
var browserify = require('browserify')
var concat = require('gulp-concat')

var SWAGGER_UI_PATH = './node_modules/swagger-ui-browserify/node_modules/swagger-ui'

gulp.task('browserify', function () {
  return browserify({
    entries: ['./lib/app.js']
  })
    .bundle()
    .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function () {
  return gulp.src([
    SWAGGER_UI_PATH + '/dist/fonts/*.{eot,svg,ttf,woff,woff2}'
  ])
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('css-print', function () {
  return gulp.src([
    SWAGGER_UI_PATH + '/dist/css/reset.css',
    SWAGGER_UI_PATH + '/dist/css/print.css',
    SWAGGER_UI_PATH + '/dist/css/typography.css'
  ])
    .pipe(concat('app-print.css'))
    .pipe(gulp.dest(DEST + '/css'))
})

gulp.task('css', ['css-print'], function () {
  return gulp.src([
    SWAGGER_UI_PATH + '/dist/css/reset.css',
    SWAGGER_UI_PATH + '/dist/css/screen.css',
    SWAGGER_UI_PATH + '/dist/css/typography.css'
  ])
    .pipe(concat('app.css'))
    .pipe(gulp.dest(DEST + '/css'))
})

gulp.task('images', function () {
  return gulp.src([
    SWAGGER_UI_PATH + '/dist/images/*.{png,jpg,gif}'
  ])
    .pipe(gulp.dest(DEST + '/images'))
})

gulp.task('default', ['browserify', 'css', 'fonts', 'images'])

```
