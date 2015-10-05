(function() {
  'use strict';

  angular
    .module('content')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$log', 'parser', 'messaging'];

  /* @ngInject */
  function ContentController($log, parser, messaging) {
    const vm = this;

    activate();

    ////////////////

    function activate() {
      messaging
        .on('tab-navigate', onTabNavigate);

      const comments = parser.parseBody();
      $log.debug('comments', comments);
      chrome.runtime.sendMessage(['comments-parsed', comments]);
    }

    function onTabNavigate({url}) {
      $log.debug('navigate to:', url);
      document.location.href = url;
    }

  }
})();