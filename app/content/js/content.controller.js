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
      const comments = parser.parseBody();
      $log.debug('comments', comments);
      chrome.runtime.sendMessage(['comments-parsed', comments]);
    }

  }
})();