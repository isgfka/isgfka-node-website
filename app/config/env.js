
let argvEnv = process.argv.splice(2)[0] || '';
argvEnv = (argvEnv || 'prod').toUpperCase();

let ENVS = {
  PROD: {port: 5000, ip: '127.0.0.1', baseUrl: 'http://isgfka.easy.com'},
  PRE: {port: 5001, ip: '127.0.0.1', baseUrl: 'http://pre-isgfka.easy.com'},
  TEST: {port: 5000, ip: '0.0.0.0', baseUrl: 'http://test-isgfka.easy.com'},
  ISGFKA: {port: 5000, ip: '0.0.0.0', baseUrl: 'http://isgfka-isgfka.easy.com'}
};

exports.BASE_URL = ENVS[argvEnv].baseUrl;
exports.PORT = ENVS[argvEnv].port;
exports.IP = ENVS[argvEnv].ip;
