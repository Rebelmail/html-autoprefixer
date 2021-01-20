'use strict';

var expect = require('chai').expect;

var htmlAutoprefixer = require('../');

describe('html-autoprefixer', function() {
  describe('#process', function() {
    it('autoprefixes inside of style tags', function( ) {
      var htmlString = '<html><style>.testClass { backdrop-filter: blur(4px) saturate(150%); } :fullscreen a { transition: transform 1s; }</style></html>';
      var prefixedResult = '<html><style>.testClass { -webkit-backdrop-filter: blur(4px) saturate(150%); backdrop-filter: blur(4px) saturate(150%); } :-webkit-full-screen a { -webkit-transition: transform 1s; transition: transform 1s; } :-ms-fullscreen a { -ms-transition: transform 1s; transition: transform 1s; } :fullscreen a { transition: transform 1s; }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);
      expect(prefixed).to.equal(prefixedResult);
    });

    it('autoprefixes nested elements inside of style tags', function( ) {
      var htmlString = '<html><style>@media screen and (max-width: 600px){ .class{ transition: transform 1s; } }</style></html>';
      var prefixedResult = '<html><style>@media screen and (max-width: 600px){ .class{ transition: transform 1s; } }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);
      expect(prefixed).to.equal(prefixedResult);
    });

    it('autoprefixes nested elements when doing SVG hack', function( ) {
      var htmlString = '<html><style>@media screen{ @media screen{ .svg{ transition: transform 1s; } } }</style></html>';
      var prefixedResult = '<html><style>@media screen{ @media screen{ .svg{ transition: transform 1s; } } }</style></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);
      expect(prefixed).to.equal(prefixedResult);
    });

    it('autoprefixes inside of style attributes', function() {
      var htmlString = '<html><h1 style="transition: transform 1s">Hello</h1><h2 style="display: flex">World</h2></html>';
      var prefixedResult = '<html><h1 style="transition: transform 1s">Hello</h1><h2 style="display: flex">World</h2></html>';

      var prefixed = htmlAutoprefixer.process(htmlString);
      expect(prefixed).to.equal(prefixedResult);
    });

    it('can pass cheerio options', function() {
      var htmlString = '<HTML><BODY>Hello</BODY></HTML>';
      var prefixedResult = '<html><body>Hello</body></html>';

      var prefixed = htmlAutoprefixer.process(htmlString, { lowerCaseTags: true });
      expect(prefixed).to.equal(prefixedResult);
    });
  });
});
