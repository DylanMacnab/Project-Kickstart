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
  pump = require('pump');


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

  // HTML processing
  gulp.task('html', ['images'], function() {
    var
      out = folder.build + 'html/',
      page = gulp.src(folder.src + 'html/**/*')
        .pipe(newer(out));

    // minify production code
    if (!devBuild) {
      page = page.pipe(htmlclean());
    }

    return page.pipe(gulp.dest(out));
  });

  // JavaScript processing
  // gulp.task('js', function() {
  //
  //   var jsbuild = gulp.src(folder.src + 'js/**/*')
  //     .pipe(deporder())
  //     .pipe(concat('main.js'));
  //
  //   if (!devBuild) {
  //     jsbuild = jsbuild
  //       .pipe(stripdebug())
  //       .pipe(uglify());
  //   }
  //
  //   return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
  // });

  // js
  gulp.task('js', function (cb) {
    pump([
          gulp.src(folder.src + 'js/**/*'),
          uglify(),
          gulp.dest(folder.build + 'js/')
      ],
      cb
    );
  });

;