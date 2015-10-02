(function() {
  'use strict';

  angular
    .module('pAction')
    .service('TopService', TopService);

  TopService.$inject = ['$q', '$rootScope'];

  /* @ngInject */
  function TopService($q, $rootScope) {
    this.getList = getList;

    ////////////////

    function getList() {
      const def = $q.defer();
      chrome.runtime.sendMessage([
        'request-comments', {}
      ], ::def.resolve);
      return def.promise;
    }
  }
})();