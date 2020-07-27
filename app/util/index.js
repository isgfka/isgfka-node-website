const request = require('./request');
const type = require('./type');

module.exports = {
  getData: request.getData,
  $http: request.$http,
  getType: type.getType,
  isType: type.isType
};
