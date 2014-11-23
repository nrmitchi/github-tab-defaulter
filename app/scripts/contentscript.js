'use strict';

// console.time('github-tab-extension-load');

var url = require('url');

var links = document.links;
var currentPage = document.URL;

function getCurrentTabSpaceSetting(cb) {
  chrome.storage.sync.get('tabspace', function(result) {
    cb(result.tabspace || 4);
  });
}

function convertQueryStringToObject(s) {
  var obj = {};
  
  // Only process non-null strings
  if (s) {
    // Split on &
    var params = s.split('&');
    params.forEach( function (param) {
      var parts = param.split('='); // Split on =
      obj[parts[0]] = parts[1];
    });
  }
  return obj;
}
/**
 * Determine if the given URL contains a 'ts' parameter
 *
 * TODO: Should actually parse the URL to determine if the 
 *       tag is present
 */
function containsTsParam(s) {
  var u = url.parse(s);
  var queryParams = convertQueryStringToObject(u.query);

  if (queryParams.ts) {
    return true;
  } else {
    return false;
  }
}
function isGithubBlobLink(s) {
  var patt = /github.com.*\/(blob|commit)\/.*/gi;
  if (s.match(patt)) {
    return true;
  } else {
    return false;
  }
}
function addTsParam(s, tabspace) {
  var u = url.parse(s);
  var queryParams = convertQueryStringToObject(u.query);

  if (queryParams.ts) {
    // already present, dont overwrite
    return s;
  } else {
    queryParams.ts = tabspace;
    u.query = queryParams;
    return url.format(u);
  }
}

// Todo: Get rid of this callback structure
getCurrentTabSpaceSetting(function (tabspace) {
  if (isGithubBlobLink(currentPage) && !containsTsParam(currentPage)) {
    // Redirect to self with ts Added
    window.location = addTsParam(currentPage, tabspace);
  }
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (isGithubBlobLink(link.href)) {
      link.href = addTsParam(link.href, tabspace);
    }
  }
  // console.timeEnd('github-tab-extension-load');
});
