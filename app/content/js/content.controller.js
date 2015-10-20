(function () {
  'use strict';

  angular
    .module('content')
    .controller('ContentController', ContentController);

  ContentController.$inject = [
    '$log',
    'messaging',
    'parser',
    'parserDirtyRu',
  ];

  /* @ngInject */
  function ContentController(
    $log,
    messaging,
    parser,
    parserDirtyRu
  ) {
    const vm = this;

    activate();

    ////////////////

    function activate() {
      messaging
        .on('tab-navigate', onTabNavigate);

      const comments = parser.parseBody(parserDirtyRu);
      $log.debug('comments', comments);
      chrome.runtime.sendMessage(['comments-parsed', comments]);
    }

    function onTabNavigate({url}) {
      $log.debug('navigate to:', url);
      document.location.href = url;
    }

  }
})();