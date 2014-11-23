'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// console.log('\'Allo \'Allo! Event Page - Background');

// var desiredTabWidth = 4;

// function getTabWidth () {
//   return desiredTabWidth;
// }
// function setTableWidth(s) {
//   // Validate that text with is INT and <= 12
//   if (true) {
//     desiredTabWidth = s;
//     return desiredTabWidth;
//   } else {
//     return new Error('error message');
//   }
// }
