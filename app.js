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
app.use(express.static(path.join(__dirname, '/public')));
app.use('/static', express.static(path.join(__dirname, '/static')));
installRouter(app);

app.listen(ENVS.PORT, ENVS.IP);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('app is running on: ' + ENVS.PORT);
