(function () {
  'use strict';

  ns.service('parserDirtyRu', parserDirtyRu);

  parserDirtyRu.$inject = [];

  /* @ngInject */
  function parserDirtyRu() {
    var service = {
      symbolPlus     : '+',
      symbolMinus    : '-',

      selectorComment: '.comment_inner',
      selectorRank   : '.vote_result',
      selectorText   : '.c_body',
      selectorURL    : '.c_footer .c_icon',
      selectorAuthor : '.c_footer .c_user',
      selectorImg    : '.img_wrapper:first-of-type img:first-of-type',

      extractUrl     : el => el && el.getAttribute('href'),
      extractImg     : el => el && el.getAttribute('src'),
      extractText    : el => el && String.prototype.trim.call(el.textContent || ''),
      extractAuthor  : el => el && String.prototype.trim.call(el.textContent || ''),

      expandAllThreads : expandAllThreads
    };

    return service;

    ////////////////

    function expandAllThreads(root) {
      Array.from(root.querySelectorAll('.b-comments_collapsed'))
        .forEach(el => el.classList.add('b-comments_collapsed_expanded'));
      Array.from(root.querySelectorAll('.b-comments_collapsed_comments'))
        .forEach(el => el.style.maxHeight = 'none');
    }
  }
})();