(function() {
  const HANDLERS = new Map();
  HANDLERS.set('comments-parsed', onCommentsParsed);
  HANDLERS.set('request-comments', onRequestComments);

  main();

  function main() {
    chrome.runtime.onMessage.addListener(onMessage);
  }

  function onMessage([topic, data], sender, sendResponse) {
    if (HANDLERS.has(topic)) {
      return HANDLERS.get(topic).call(null, data, sender, sendResponse);
    }
  }

  function onCommentsParsed(comments, sender, sendResponse) {
    const tab = sender.tab;
    const tops = App.Top.getTops(comments);
    const {
      icon,
      bestRank,
      worstRank
    } = App.Top.getDigest(tops);
    const fullIcon = `page-action/img/${icon}`;
    App.Storage.set(tab, tops);
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
        const tops = App.Storage.get(tab);
        sendResponse(tops);
      }
    });
    return true; //`true` means that `sendResponse` is asynchronous. See: https://developer.chrome.com/extensions/runtime#event-onMessage
  }

})();