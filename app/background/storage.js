(function() {
  'use strict';

  ns.service('storage', Storage);

  function Storage() {
    this.set = set;
    this.get = get;
   
    const data = new Map();

    return;

    ////////

    function set(tab, comments) {
      data.set(tab.id, comments);
    }

    function get(tab, comments) {
      return data.get(tab.id);
    }
  }
})();