(function() {
  'use strict';

  angular
    .module('content')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$log', 'parser'];

  /* @ngInject */
  function ContentController($log, parser) {
    var vm = this;
    vm.title = 'Content Controller';

    activate();

    ////////////////

    function activate() {
      const result = parser.parseBody();
      $log.debug('comments', result);
    }

  }
})();