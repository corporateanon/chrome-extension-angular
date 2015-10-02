module.exports = conf;

function conf() {

  var buildDev = 'build/dev';
  var buildProd = 'build/prod';

  return {
    manifest: {
      src: './app/_manifest.json',
      buildDev: buildDev,
      buildProd: buildProd,
    },

    contentScript: {
      destAssets: 'content',
      vendorJs: [
        './app/bower_components/angular/angular.js',
      ],
      less: [
        './app/content/less/main.less',
      ],
      js: [
        './app/content/js/**/*.module.js',
        './app/content/js/**/*.!(module).js',
      ],
      angularTemplates: [
        './app/content/js/**/*.html'
      ],
      buildDev: buildDev,
      buildProd: buildProd,
    },

    backgroundScript: {
      destAssets: 'background',
      vendorJs: [
        './app/bower_components/moment/moment.js',
        './app/bower_components/lodash/lodash.js',
      ],
      js: [
        './app/background/*.js',
      ],
      buildDev: buildDev,
      buildProd: buildProd,
    },

    optionsPage: {
      destAssets: 'options',
      html: './app/options.html',
      vendorJs: [
        './app/bower_components/angular/angular.js',
      ],
      js: [
        './app/options/js/**/*.module.js',
        './app/options/js/**/*.!(module).js',
      ],
      angularTemplates: [
        './app/options/js/**/*.html'
      ],
      buildDev: buildDev,
      buildProd: buildProd,
    },

    browserAction: {
      destAssets: 'browser-action',
      html: './app/browser-action.html',
      vendorJs: [
        './app/bower_components/angular/angular.js',
      ],
      js: [
        './app/browser-action/js/**/*.module.js',
        './app/browser-action/js/**/*.!(module).js',
      ],
      angularTemplates: [
        './app/browser-action/js/**/*.html'
      ],
      buildDev: buildDev,
      buildProd: buildProd,
    },

    pageAction: {
      destAssets: 'page-action',
      html: './app/page-action.html',
      vendorJs: [
        './app/bower_components/angular/angular.js',
      ],
      js: [
        './app/page-action/js/**/*.module.js',
        './app/page-action/js/**/*.!(module).js',
      ],
      angularTemplates: [
        './app/page-action/js/**/*.html'
      ],
      buildDev: buildDev,
      buildProd: buildProd,
    },
  };
}