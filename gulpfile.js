const gulp = require('gulp')
const wrap = require('gulp-wrap')
const gutil = require('gulp-util')
const replace = require('gulp-replace')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const handlebars = require('gulp-handlebars')
const declare = require('gulp-declare')
const concat = require('gulp-concat')

gulp.task('templates', () => {
  return gulp
    .src(['node_modules/swagger-ui/src/main/template/**/*'])
    .pipe(handlebars())
    .pipe(wrap({ src: './templates/template.txt'}))
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
    'node_modules/swagger-ui/src/main/javascript/*'
  ])
    .pipe(replace(/window\.SwaggerUi\s+=/g, 'module.exports = SwaggerUi = '))
    .pipe(replace(/module\.exports\s+=\s+factory\(require\('b'\)\);/g, ''))
    .pipe(replace(/window\.SwaggerUi\.Views\s+=\s+{};/g, 'SwaggerUi.Views = {};'))

    .pipe(concat('swagger-ui.js'))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('wrap-views', ['wrap-files'], () => {
  return gulp.src([
    'node_modules/swagger-ui/src/main/javascript/view/*'
  ])
    .pipe(replace(/Handlebars\.templates\.([a-z_]+)/g, 'require(\'./template/$1\')'))
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
    .pipe(wrap({ src: './templates/index.txt'}))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('default', ['templates', 'wrap'])
