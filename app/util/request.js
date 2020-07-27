let http = require('http');
let axios = require('axios');
let isType = require('./type').isType;
let BASE_URL = require('../config/env').BASE_URL;

exports.getData = (url, fn) => {
  let data = {};
  for (let i = 0; i < url.length; i++) {
    http.get(url[i], (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
          // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          Array.prototype.push.call(data, parsedData.data);
          if (fn && +i === url.length - 1) {
            fn(data);
          }
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
  }
};

const options = {
  baseURL: BASE_URL
};
const $http = axios.create(options);

$http
  .interceptors
  .response
  .use(res => {
    let data = res.data;
    if (res.headers['content-type'] !== 'application/json') {
      return res;
    }
    if (res.headers['content-type'] === 'application/json' && res.config.responseType === 'arraybuffer') {
      data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
    }
    if (!data || (!isType(data, 'Object') && !isType(data, 'Array'))) {
      // 处理响应为空的情况
      return Promise.reject(new Error('response is empty'));
    } else if (+res.data.code === 0) {
      // 正常返回
      return data;
    }
  });

$http
  .interceptors
  .request
  .use(config => {
    return config;
  });

exports.$http = $http;
