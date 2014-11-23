'use strict';

var defaultTabSpace = 4;

chrome.storage.sync.get('tabspace', function(result) {
  document.getElementById('tabspace').value = result.tabspace || defaultTabSpace;
});

document.getElementById('tabspace_submit').onclick = function () {
  var val = document.getElementById('tabspace').value || defaultTabSpace;

  // Todo: Validate that val is and INT and 0 < val < 12
  chrome.storage.sync.set({'tabspace': val}, function() {
    // Notify that we saved.
    // console.log('Settings saved');
  });
};
