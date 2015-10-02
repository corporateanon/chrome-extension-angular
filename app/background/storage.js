window.App = window.App || {};
window.App.Storage = function() {
  const Storage = {};

  const data = new Map();

  Storage.set = function(tab, comments) {
    data.set(tab.id, comments);
  }

  Storage.get = function(tab, comments) {
    return data.get(tab.id);
  }

  return Storage;
}();