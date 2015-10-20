(function() {
  'use strict';

  ns.service('messaging', Messaging)
    .ngCompat('common', 'messaging');

  function Messaging() {
    this.on = on;
    this.send = send;
    this.sendToTabId = sendToTabId;
    this.sendToActiveTab = sendToActiveTab;
    this.getActiveTab = getActiveTab;

    const handlers = new Map();
    listen();

    ////////

    function on(topic, handler) {
      handlers.set(topic, handler);
      return this;
    }

    function listen() {
      chrome.runtime.onMessage.addListener(onMessage);
      return this;
    }

    function send(topic, data) {
      return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage([topic, data], resolve);
      });
    }

    function sendToTabId(tabId, topic, data) {
      return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tabId, [topic, data], resolve);
      });
    }

    function sendToActiveTab(topic, data) {
      return getActiveTab().then(sendTo);

      function sendTo(tab) {
        if (!tab) {
          throw new Error('no active tab found');
        }
        return sendToTabId(tab.id, topic, data);
      }
    }

    function getActiveTab() {
      return new Promise((resolve, reject) => {
        chrome.tabs.query({
          currentWindow: true,
          active: true
        }, ([tab] = []) => {
          resolve(tab);
        });
      });
    }

    function onMessage([topic, data], sender, sendResponse) {
      if (handlers.has(topic)) {
        return handlers.get(topic).call(null, data, sender, sendResponse);
      }
    }
  }

})();