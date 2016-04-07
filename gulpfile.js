var gulp = require('gulp')
var wrap = require('gulp-wrap')
var gutil = require('gulp-util')
var replace = require('gulp-replace')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var handlebars = require('gulp-handlebars')
var declare = require('gulp-declare')
var concat = require('gulp-concat')
var coffee = require('gulp-coffee')
var debug = require('gulp-debug')

gulp.task('templates', function () {
  return gulp
    .src(['node_modules/swagger-ui/src/main/template/**/*'])
    .pipe(debug({title: 'templates'}))
    .pipe(handlebars())
    .pipe(wrap({ src: './templates/template.txt'}))
    .pipe(gulp.dest('./dist/template'))
    .on('error', gutil.log)
})

gulp.task('jquery-plugins', function () {
  return gulp
    .src([
      'node_modules/swagger-ui/lib/jquery.slideto.min.js',
      'node_modules/swagger-ui/lib/jquery.wiggle.min.js'
    ])
    .pipe(debug({title: 'jquery-plugins'}))
    .pipe(concat('jquery.plugins.js'))
    .pipe(gulp.dest('./work'))
    .on('error', gutil.log)
})

gulp.task('coffee', function() {
  return gulp.src('node_modules/swagger-ui/src/main/coffeescript/**/*.coffee')
    .pipe(debug({title: 'coffee'}))
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('work/coffee-to-js'))
    .on('error', gutil.log)
});

gulp.task('concat-files', ['coffee'], function () {
  return gulp.src([
    'work/coffee-to-js/**/*.js',
    'node_modules/swagger-ui/src/main/javascript/**/*.js'
  ])
    .pipe(debug({title: 'wrap-files'}))
    .pipe(replace(/window\.SwaggerUi\s+=/g, 'module.exports = SwaggerUi = '))
    .pipe(concat('swagger-ui.js'))
    .pipe(gulp.dest('./work'))
    .on('error', gutil.log)
})

gulp.task('wrap', ['jquery-plugins', 'concat-files'], function () {
  return gulp.src([
    './work/swagger-ui.js',
    './work/views.js',
    './work/jquery.plugins.js'
  ])
    .pipe(debug({title: 'wrap'}))
    .pipe(replace(/Handlebars\.templates\.([a-z_]+)/g, 'require(\'./template/$1\')'))
    .pipe(concat('index.js'))
    .pipe(wrap({ src: './templates/index.txt'}))
    .pipe(gulp.dest('./dist'))
    .on('error', gutil.log)
})

gulp.task('default', ['templates', 'wrap'])
