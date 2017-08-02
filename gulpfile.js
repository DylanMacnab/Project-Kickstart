// Gulp.js configuration

var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }

  // image processing
  gulp.task('images', function(){
    var out = folder.build + 'images/';
    return gulp.src(folder.src + 'images/**/*')
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out));
  });

;