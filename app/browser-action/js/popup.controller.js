(function() {
    'use strict';

    angular
        .module('bAction')
        .controller('PopupController', PopupController);

    PopupController.$inject = [];

    /* @ngInject */
    function PopupController() {
        var vm = this;
        vm.title = 'PopupController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();