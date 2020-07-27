exports.install = function (app) {
  // routes download
  app.use('/download', require('./download/download'));

  // routes main
  app.use('/', require('./main/home'));
};
