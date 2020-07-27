const express = require('express');
const router = express.Router();
const clientTest = require('../../util/tools').clientTest;

exports.$router = router.use(function (req, res, next) {
  if (clientTest(req)) {
    res.render('mobile', {isPC: false});
  } else {
    next();
  }
});
