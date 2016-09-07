const gulp = require('gulp')
const wrap = require('gulp-wrap')
const gutil = require('gulp-util')
const replace = require('gulp-replace')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const handlebars = require('gulp-handlebars')
const declare = require('gulp-declare')
const concat = require('gulp-concat')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

gulp.task('templates', () => {
  return gulp
    .src(['node_modules/swagger-ui/src/main/template/**/*'])
    .pipe(handlebars())
    .pipe(wrap({
      src: './templates/template.txt'
    }))
    .pipe(gulp.dest('./dist/template'))
    .on('error', gutil.log)
})

gulp.task('jquery-plugins', () => {
  return gulp
    .src([
      'node_modules/swagger-ui/lib/jquery.slideto.min.js',
      'node_modules/swagger-ui/lib/jquery.wiggle.min.js',
      'node_modules/swagger-ui/lib/jsoneditor.min.js'
    ])
    .pipe(concat('jquery.plugins.js'))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('wrap-files', () => {
  return gulp.src([
    'node_modules/swagger-ui/src/main/javascript/helpers/*',
    'node_modules/swagger-ui/src/main/javascript/*',
    'node_modules/swagger-ui/src/main/javascript/utils/*'
  ])
    .pipe(replace(/window\.SwaggerUi\s+=/g, 'module.exports = SwaggerUi = '))
    .pipe(replace(/module\.exports\s+=\s+factory\(require\('b'\)\);/g, ''))
    .pipe(replace(/window\.SwaggerUi\.Views\s+=\s+{};/g, 'SwaggerUi.Views = {};'))
    .pipe(replace(/window\.SwaggerUi\.Models\s+=\s+{};/g, 'SwaggerUi.Models = {};'))
    .pipe(replace(/window\.SwaggerUi\.Collections\s+=\s+{};/g, 'SwaggerUi.Collections = {};'))
    .pipe(replace(/window\.SwaggerUi\.partials\s+=\s+{};/g, 'SwaggerUi.partials = {};'))
    .pipe(replace(/window\.SwaggerUi\.utils\s+=\s+{};/g, 'SwaggerUi.utils = {};'))
    .pipe(replace(/window\.SwaggerUi\.utils\s+=\s+{\n/g, 'SwaggerUi.utils = {\n'))
    .pipe(replace(/window\.SwaggerUi\.utils;/g, 'SwaggerUi.utils;'))

    .pipe(concat('swagger-ui.js'))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('wrap-views', ['wrap-files'], () => {
  return gulp.src([
    'node_modules/swagger-ui/src/main/javascript/view/*',
    'node_modules/swagger-ui/src/main/javascript/view/partials/*'
  ])
    .pipe(replace(/Handlebars\.templates\.([a-z_0-9]+)/g, 'require(\'./template/$1\')'))
    .pipe(concat('views.js'))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('wrap', ['jquery-plugins', 'wrap-views'], () => {
  return gulp.src([
    './dist/swagger-ui.js',
    './dist/views.js',
    './dist/jquery.plugins.js'
  ])
    .pipe(concat('index.js'))
    .pipe(replace(/Backbone\.View\.extend\({/g, 'Backbone.View.extend({options: {swaggerOptions: {}},'))
    .pipe(replace(/window\.hljs/g, 'hljs'))
    .pipe(wrap({
      src: './templates/index.txt'
    }))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('test-setup', ['templates', 'wrap'], () => {
  var b = browserify({
    entries: './test/fixtures/public/index.js',
    debug: true// ,
    // defining transforms here will avoid crashing your stream
    // transform: [reactify]
  })

  return b.bundle()
    .pipe(source('index.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./test/fixtures/public'))
    .pipe(gulp.dest('./test/fixtures/public'))
})

gulp.task('default', ['templates', 'wrap'])
