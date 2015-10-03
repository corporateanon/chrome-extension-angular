(function() {
  ns.service('main', Main);

  Main.$inject = ['top', 'storage'];

  function Main(Top, Storage) {
    this.activate = activate;

    const HANDLERS = new Map();
    HANDLERS.set('comments-parsed', onCommentsParsed);
    HANDLERS.set('request-comments', onRequestComments);

    ////////

    function activate() {
      chrome.runtime.onMessage.addListener(onMessage);
    }

    function onMessage([topic, data], sender, sendResponse) {
      if (HANDLERS.has(topic)) {
        return HANDLERS.get(topic).call(null, data, sender, sendResponse);
      }
    }

    function onCommentsParsed(comments, sender, sendResponse) {
      const tab = sender.tab;
      const tops = Top.getTops(comments);
      const {
        icon,
        bestRank,
        worstRank
      } = Top.getDigest(tops);
      const fullIcon = `page-action/img/${icon}`;
      Storage.set(tab, tops);
      chrome.pageAction.show(tab.id);
      chrome.pageAction.setTitle({
        tabId: tab.id,
        title: `-${worstRank} : +${bestRank}`,
      });
      chrome.pageAction.setIcon({
        tabId: tab.id,
        path: fullIcon,
      });
    }

    function onRequestComments(data, sender, sendResponse) {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, ([tab] = []) => {
        if (tab) {
          const tops = Storage.get(tab);
          sendResponse(tops);
        }
      });
      return true; //`true` means that `sendResponse` is asynchronous. See: https://developer.chrome.com/extensions/runtime#event-onMessage
    }

  }

})();