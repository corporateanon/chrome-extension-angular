var path = require('path');
var series = require('stream-series');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  camelize: true
});
var domain = require('./domain');
var pkg = require('../package.json');

exports.appDev = appDev;
exports.appProd = appProd;
exports.manifestDev = manifestDev;
exports.manifestProd = manifestProd;

function appDev(conf, taskName) {
  app(conf, taskName, true);
}

function appProd(conf, taskName) {
  app(conf, taskName, false);
}

function manifestDev(conf, taskName) {
  manifest(conf, taskName, true);
}

function manifestProd(conf, taskName) {
  manifest(conf, taskName, false);
}

function manifest(conf, taskName, dev) {

  var buildPath = dev ? conf.buildDev : conf.buildProd;

  gulp.task(taskName, function() {
    return gulp.src(conf.src)
      .pipe($.jsonEditor(function(json) {
        json.version = pkg.version;
        return json;
      }))
      .pipe($.rename('manifest.json'))
      .pipe(gulp.dest(buildPath));
  });
}

function app(conf, taskName, dev) {
  validateConfig(conf);

  gulp.task(taskName, function() {
    var smVendor, smTemplateCache,
      smApp, smFullApp, smInject,
      smLess;

    var buildPath = dev ? conf.buildDev : conf.buildProd;

    var destHtml = buildPath;
    var destJs = path.join(buildPath, conf.destAssets, 'js');
    var destCss = path.join(buildPath, conf.destAssets, 'css');

    smApp = gulp
      .src(conf.js)
      .pipe($.if(dev, $.sourcemaps.init()))
      .pipe($.babel({
        optional: [
          'es7.functionBind'
        ]
      }))
      .pipe($.concat('app.js'))
      .pipe($.if(!dev, $.uglify()))
      .pipe($.if(dev, $.sourcemaps.write()));

    if (conf.less) {
      smLess = gulp
        .src(conf.less)
        .pipe($.less())
        .pipe(gulp.dest(destCss));
    }

    if (conf.vendorJs) {
      smVendor = gulp
        .src(conf.vendorJs)
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.concat('vendors.js'))
        .pipe($.if(!dev, $.uglify()))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest(destJs));
    }

    if (conf.angularTemplates) {
      smTemplateCache = gulp.src(conf.angularTemplates)
        .pipe($.angularTemplatecache({
          standalone: true
        }))
        .pipe($.if(!dev, $.uglify()))
        .pipe($.rename('templates.js'));

      smFullApp = series(smApp, smTemplateCache)
        .pipe($.concat('app.js'))
    } else {
      smFullApp = smApp;
    }

    smFullApp = smFullApp.pipe(gulp.dest(destJs));


    smInject = conf.vendorJs ? series(smVendor, smFullApp) : smFullApp;

    if (conf.less) {
      smInject = series(smInject, smLess);
    }

    if (!conf.html) {
      return smInject;
    }

    return gulp.src(conf.html)
      .pipe($.inject(smInject, {
        ignorePath: '/' + destHtml,
        addRootSlash: false,
      }))
      .pipe(gulp.dest(destHtml));

  });
}

function validateConfig(conf) {
  var val = domain.validate(conf, domain.TSpaConfig);
  if (!val.isValid()) {
    $.util.log($.util.colors.red('[invalid config] ' + val.firstError().message));
    process.exit(1);
  }
}

function makeTaskName(taskName, taskNamePrefix, dev) {
  var parts = [];
  if (taskNamePrefix) {
    parts.push(taskNamePrefix);
  }
  parts.push(taskName);
  if (dev) {
    parts.push('dev');
  } else {
    parts.push('prod');
  }

  return parts.join('.');
}