(function() {
  'use strict';

  angular
    .module('options')
    .controller('OptionsController', OptionsController);

  OptionsController.$inject = [];

  /* @ngInject */
  function OptionsController() {
    var vm = this;
    vm.title = 'Options Controller';

    activate();

    ////////////////

    function activate() {
    }

  }
})();