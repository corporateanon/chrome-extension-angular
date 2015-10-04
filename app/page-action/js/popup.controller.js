(function() {
  'use strict';

  angular
    .module('pAction')
    .controller('PopupController', PopupController);

  PopupController.$inject = [
  '$log',
  'TopService',
  'NavigationService',
  ];

  /* @ngInject */
  function PopupController($log, TopService, NavigationService) {
    var vm = this;
    vm.onCommentClicked = onCommentClicked;

    activate();

    ////////////////

    function activate() {
      getTops();
    }

    function onCommentClicked(comment) {
      NavigationService.navigate(comment.url);
    }

    function getTops() {
      TopService.getList()
        .then(tops => {
          $log.debug('tops', tops)
          vm.tops = tops;
        });
    }
  }
})();