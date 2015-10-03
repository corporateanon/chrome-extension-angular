(function() {
  'use strict';

  angular
    .module('pAction.widgets')
    .directive('bcmComment', bcmComment);

  bcmComment.$inject = [];

  /* @ngInject */
  function bcmComment() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      templateUrl: 'widgets/comment/comment.directive.html',
      bindToController: true,
      controller: CommentController,
      controllerAs: 'vm',
      link: link,
      restrict: 'AE',
      scope: {
        value: '=value',
      }
    };
    return directive;

    function link(scope, element, attrs) {}
  }

  /* @ngInject */
  function CommentController() {

  }
})();