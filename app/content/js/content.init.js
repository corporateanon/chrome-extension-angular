(function() {
  'use strict';

  angular.element(document).ready(function() {
    const ngIsland = angular.element(`
      <div class="ng-island" ng-controller="ContentController as vm">
        <div ng-include="'content.html'"></div>
      </div>
    `);

    angular.element(document)
      .find('body')
      .prepend(ngIsland)

    angular.bootstrap(ngIsland, ['content']);
  });
})();