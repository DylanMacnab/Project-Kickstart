// Gulp.js configuration

var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  babel = require("gulp-babel");


  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }

  // image processing
  gulp.task('images', function() {
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*')
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out));
  });

  // JS Processing
  gulp.task('js', function (cb) {
    pump([
          gulp.src(folder.src + 'js/**/*'),
          babel(),
          uglify(),
          gulp.dest(folder.build + 'js/')
      ],
      cb
    );
  });

  // SASS Processing
  gulp.task('sass', function() {
    return gulp.src(folder.src + 'scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(folder.build + './css'));
  });

  gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
  });

;