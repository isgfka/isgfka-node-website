'use strict';

exports.API_URL = require('../config/env').BASE_URL;

exports.css = function (str, option) {
  this.cssList = this.cssList || [];
  this.cssList.push(str);
};
exports.js = function (str, option) {
  this.jsList = this.jsList || [];
  this.jsList.push(str);
};
exports.meta = function (str, option) {
  this.metaList = this.metaList || [];
  this.metaList.push({'referrer': str, 'time': option});
};
