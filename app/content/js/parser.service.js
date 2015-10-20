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
    this.SELECTOR_AUTHOR  = '.c_footer .c_user',
    this.SELECTOR_IMG     = '.img_wrapper:first-of-type img:first-of-type',

    this.parseBody   = parseBody;
    this.parse       = parse;
    this.parseUrl    = parseUrl;
    this.parseRank   = parseRank;
    this.parseAuthor = parseAuthor;
    this.parseText   = parseText;
    this.parseImg   = parseImg;


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

    function parseImg(node) {
      if (!node) {
        return null;
      }
      return node.getAttribute('src') || null;
    }

    function parse(node) {
      return Array.from(node.querySelectorAll(this.SELECTOR_COMMENT))
        .map(nComment => {
          var nRank = this.SELECTOR_RANK ?
            nComment.querySelector(this.SELECTOR_RANK) : nComment;

          var nText = this.SELECTOR_TEXT ?
            nComment.querySelector(this.SELECTOR_TEXT) : nComment;

          var nLink = this.SELECTOR_URL ?
            nComment.querySelector(this.SELECTOR_URL) : nComment;

          var nAuthor = this.SELECTOR_AUTHOR ?
            nComment.querySelector(this.SELECTOR_AUTHOR) : nComment;

          var nImg = this.SELECTOR_IMG ?
            nComment.querySelector(this.SELECTOR_IMG) : nComment;

          var rank = this.parseRank(nRank);
          var text = this.parseText(nText);
          var url = this.parseUrl(nLink);
          var author = this.parseAuthor(nAuthor);
          var img = this.parseImg(nImg);

          return {
            rank,
            text,
            url,
            author,
            img,
          };
        })
    }
  }
})();