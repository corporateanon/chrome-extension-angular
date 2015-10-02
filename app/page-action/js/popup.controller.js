(function() {
  'use strict';

  angular
    .module('pAction')
    .controller('PopupController', PopupController);

  PopupController.$inject = ['$log', 'TopService'];

  /* @ngInject */
  function PopupController($log, TopService) {
    var vm = this;
    vm.title = 'PopupController';

    activate();

    ////////////////

    function activate() {
      getTops();
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