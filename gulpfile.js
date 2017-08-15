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

  // SASS/SCSS Processing
  gulp.task('scss', function() {
    return gulp.src(folder.src + 'scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(folder.build + './css'));
  });

  // Automated Tasks //
  // *****************

  // run all tasks
  gulp.task('run', ['images', 'scss', 'js']);
  // watch for changes
  gulp.task('watch', function() {
    // images
    gulp.watch(folder.src + 'images/**/*', ['images']);
    // js
    gulp.watch(folder.src + 'js/**/*', ['js']);
    // sass
    gulp.watch(folder.src + 'scss/**/*', ['scss']);
  });

  // Default Task //
  // **************

  gulp.task('default', ['run', 'watch']);

;