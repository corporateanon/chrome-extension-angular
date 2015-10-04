(function() {
  'use strict';

  angular
    .module('pAction')
    .service('NavigationService', NavigationService);

  NavigationService.$inject = ['$q', '$rootScope'];

  /* @ngInject */
  function NavigationService($q, $rootScope) {
    this.navigate = navigate;

    ////////////////
    
    function navigate(url) {
      const def = $q.defer();
      chrome.runtime.sendMessage([
        'navigate', {url}
      ], ::def.resolve);
      return def.promise;
    }
  }
})();