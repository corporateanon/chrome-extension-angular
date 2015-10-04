(function() {
  ns.service('main', Main);

  Main.$inject = ['top', 'storage', 'messaging'];

  function Main(Top, Storage, Messaging) {
    this.activate = activate;

    ////////

    function activate() {
      Messaging.createContext()
        .on('comments-parsed', onCommentsParsed)
        .on('request-comments', onRequestComments)
        .on('navigate', onNavigate)
        .listen();
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

    function onNavigate(data, sender, sendResponse) {
      // alert(data.url);
    }

  }

})();