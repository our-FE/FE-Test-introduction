import jsdom from 'jsdom';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}

// require('babel-register')();
//
// var jsdom = require('jsdom').jsdom;
//
// var exposedProperties = ['window', 'navigator', 'document'];
//
// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//     if (typeof global[property] === 'undefined') {
//         exposedProperties.push(property);
//         global[property] = document.defaultView[property];
//     }
// });
//
// global.navigator = {
//     userAgent: 'node.js'
// };

// documentRef = document;
