(function () {
  'use strict';

  ns.service('document', Document);


  /* @ngInject */
  function Document() {
    return window.document;
  }
})();