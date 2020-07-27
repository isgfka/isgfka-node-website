$(document).ready(function () {
  var baseUrl = [API_URL];
  console.log('baseUrl: ', baseUrl);
  function toolFn () {}
  Handlebars.registerHelper('toolFn', toolFn);
});
