(function() {
  'use strict';

  angular
    .module('content')
    .controller('ContentController', ContentController);

  ContentController.$inject = [];

  /* @ngInject */
  function ContentController() {
    var vm = this;
    vm.title = 'Content Controller';

    activate();

    ////////////////

    function activate() {
    }

  }
})();