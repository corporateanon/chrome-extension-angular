(function() {
  'use strict';

  ns.service('messaging', Messaging);

  function Messaging() {
    this.createContext = createContext;


    class Context {
      handlers = new Map();

      on(topic, handler) {
        this.handlers.set(topic, handler);
        return this;
      }

      listen() {
        chrome.runtime.onMessage.addListener(::this._onMessage);
        return this;
      }

      _onMessage([topic, data], sender, sendResponse) {
        if (this.handlers.has(topic)) {
          return this.handlers.get(topic).call(null, data, sender, sendResponse);
        }
      }

    }

    function createContext() {
      return new Context();
    }
  }

})();