'use strict';
const express = require('express');
const path = require('path');
const ENVS = require('./app/config/env');
const helper = require('./app/util/helper');
const installRouter = require('./app/router').install;

let hbs = require('express-handlebars').create({
  defaultLayout: 'main', // 默认布局模板为main.hbs
  extname: '.hbs',         // 设置文件后缀名为.hbs
  partialDir: 'views/partials',   // 以{{> }}的方式引用模板的模板路径
  layoutsDir: 'views/layouts',    // 布局文件。
  helpers: helper,
  data: {}
});

let app = express();
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views/pages'));

app.get('/public/*', function (req, res, next) {
  // 先后顺序，若先命中了static，不会再走public
  console.log(req.originalUrl);
  setTimeout(() => {
    next();
  }, 2000);
});

// todo modify root directory
app.use(express.static(path.join(__dirname, '/')));
installRouter(app);

app.listen(ENVS.PORT, ENVS.IP);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('app is running on: ' + ENVS.PORT);
