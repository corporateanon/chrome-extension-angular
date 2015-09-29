module.exports = conf;

function conf() {
  return {
    manifest: {
      buildDev: 'build/dev',
      buildProd: 'build/prod',
      src: './app/_manifest.json',
    },

    contentScript: {
      buildDev: 'build/dev',
      buildProd: 'build/prod',
      destAssets: 'content',
      vendorJs: [
        './app/bower_components/angular/angular.js',
      ],
      js: [
        './app/content/js/**/*.module.js',
        './app/content/js/**/*.!(module).js',
      ],
      angularTemplates: [
        './app/content/js/**/*.html'
      ],
    },

    backgroundScript: {
      buildDev: 'build/dev',
      buildProd: 'build/prod',
      destAssets: 'background',
      vendorJs: [
        './app/bower_components/moment/moment.js',
      ],
      js: [
        './app/background/*.js',
      ],
    },

    optionsPage: {
      buildDev: 'build/dev',
      buildProd: 'build/prod',
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
    },
  };
}