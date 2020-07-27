exports.clientTest = function (req) {
  let ua = req.headers['user-agent'];
  let $ = {};
  let test = false;
  if (/mobile/i.test(ua)) { $.Mobile = true; }
  if (/like Mac OS X/.test(ua)) {
    $.iOS = /CPU( iPhone)? OS ([0-9._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    $.iPhone = /iPhone/.test(ua);
    $.iPad = /iPad/.test(ua);
  }
  if (/Android/.test(ua)) { $.Android = /Android ([0-9.]+)[);]/.exec(ua)[1]; }
  for (let item in $) {
    test = test || $[item];
  }
  return test;
};
