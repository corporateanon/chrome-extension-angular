var series = require('stream-series');
var gulp = require('gulp');
var spa = require('./gulp/spa');
var conf = require('./gulpconfig')();

var $ = require('gulp-load-plugins')({
  camelize: true
});


spa.appDev      (conf.optionsPage     , 'options.app.dev'    );
spa.appProd     (conf.optionsPage     , 'options.app.prod'   );
spa.appDev      (conf.backgroundScript, 'background.app.dev' );
spa.appProd     (conf.backgroundScript, 'background.app.prod');
spa.appDev      (conf.contentScript   , 'content.app.dev'    );
spa.appProd     (conf.contentScript   , 'content.app.prod'   );
spa.manifestDev (conf.manifest        , 'manifest.dev'       );
spa.manifestProd(conf.manifest        , 'manifest.prod'      );

gulp.task('dev', [
  'options.app.dev',
  'background.app.dev',
  'content.app.dev',
  'manifest.dev',
]);

gulp.task('clean', function() {
  return gulp.src(['build'], {
      read: false
    })
    .pipe($.clean());
});


gulp.task('watch', function() {
  gulp.watch([
      'app/**/*.js',
      'app/**/*.html',
      'app/**/*.json',
      ], function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('dev');
  });
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.run('dev', 'watch');
});