(function() {
  'use strict';

  angular
    .module('content')
    .service('parser', Parser);

  Parser.$inject = ['$document'];

  /* @ngInject */
  function Parser($document) {
    this.PLUS             = '+';
    this.MINUS            = '-';
    this.SELECTOR_COMMENT = '.comment_inner',
    this.SELECTOR_RANK    = '.vote_result',
    this.SELECTOR_TEXT    = '.c_body',
    this.SELECTOR_URL     = '.c_footer .c_icon',
    this.SELECTOR_AUTOR   = '.c_footer .c_user',

    this.parseBody   = parseBody;
    this.parse       = parse;
    this.parseUrl    = parseUrl;
    this.parseRank   = parseRank;
    this.parseAuthor = parseAuthor;
    this.parseText   = parseText;


    ////////////////


    function parseBody() {
      return this.parse($document[0].body);
    }

    function parseUrl(node) {
      if (!node) {
        return '';
      }
      return node.getAttribute('href');
    }

    function parseRank(node) {
      if (!node) {
        return 0;
      }
      return parseInt(('' + node.textContent)
        .replace(this.PLUS, '+')
        .replace(this.MINUS, '-'), 10) || 0;
    }

    function parseText(node) {
      if (!node) {
        return '';
      }
      return ('' + node.textContent).trim();
    }

    function parseAuthor(node) {
      if (!node) {
        return '';
      }
      return ('' + node.textContent).trim();
    }

    function parse(node) {
      var nComments = node.querySelectorAll(this.SELECTOR_COMMENT);
      var results = [];
      for (var i = 0; i < nComments.length; i++) {
        var nComment = nComments[i];

        var nRank = this.SELECTOR_RANK ?
          nComment.querySelector(this.SELECTOR_RANK) : nComment;

        var nText = this.SELECTOR_TEXT ?
          nComment.querySelector(this.SELECTOR_TEXT) : nComment;

        var nLink = this.SELECTOR_URL ?
          nComment.querySelector(this.SELECTOR_URL) : nComment;

        var nAuthor = this.SELECTOR_AUTOR ?
          nComment.querySelector(this.SELECTOR_AUTOR) : nComment;

        var iRank = this.parseRank(nRank);
        var sText = this.parseText(nText);
        var sUrl = this.parseUrl(nLink);
        var sAuthor = this.parseAuthor(nAuthor);

        results.push({
          rank: iRank,
          text: sText,
          url: sUrl,
          author: sAuthor
        });
      }

      return results;
    }

  }
})();