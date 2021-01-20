"use strict";

var HTMLPostCSS = require("tonix-html-postcss");
var autoprefixer = require("autoprefixer");

module.exports = new HTMLPostCSS([autoprefixer]);
