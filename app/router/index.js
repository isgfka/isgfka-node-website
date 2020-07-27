exports.install = function (app) {
  // public assets
  // app.use('/public', require('./public'));

  // routes download
  app.use('/download', require('./download'));

  // routes main
  app.use('/', require('./main/home'));
};
