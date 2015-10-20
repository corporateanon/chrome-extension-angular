(function () {
  'use strict';

  angular
    .module('content')
    .service('parser', Parser);

  Parser.$inject = ['$document'];

  /* @ngInject */
  function Parser($document) {
    this.parseBody = parseBody;


    ////////


    function parseBody(config) {
      return parse($document[0].body, config);
    }

    function parseUrl(node) {
      if (!node) {
        return '';
      }
      return node.getAttribute('href');
    }

    function parseRank(node, config) {
      if (!node) {
        return 0;
      }
      return parseInt(('' + node.textContent)
        .replace(config.symbolPlus, '+')
        .replace(config.symbolMinus, '-'), 10) || 0;
    }

    function parse(node, config) {
      return Array.from(node.querySelectorAll(config.selectorComment))
        .map(nComment => {

          const nRank   = nComment.querySelector(config.selectorRank);
          const nText   = nComment.querySelector(config.selectorText);
          const nLink   = nComment.querySelector(config.selectorURL);
          const nAuthor = nComment.querySelector(config.selectorAuthor);
          const nImg    = nComment.querySelector(config.selectorImg);

          const rank   = parseRank(nRank, config);
          const text   = config.extractText(nText);
          const url    = config.extractUrl(nLink);
          const author = config.extractAuthor(nAuthor);
          const img    = config.extractImg(nImg);

          return {rank, text, url, author, img};
        })
    }
  }
})();