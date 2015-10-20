(function () {
  'use strict';

  ns.service('main', Main);

  Main.$inject = [
    'messaging',
    'parser',
    'parserDirtyRu',
    'document',
  ];

  /* @ngInject */
  function Main(messaging, parser, parserDirtyRu, document) {
    this.activate = activate;

    var currentParserConfig = parserDirtyRu;

    ////////

    function activate() {
      messaging
        .on('tab-navigate', onTabNavigate);

      const comments = parser.parseBody(currentParserConfig);
      console.info('comments', comments);
      messaging.send('comments-parsed', comments);
    }

    function onTabNavigate({url}) {
      console.info('navigate to:', url);
      currentParserConfig.expandAllThreads && currentParserConfig.expandAllThreads(document.body);
      document.location.href = url;
    }

  }
})();