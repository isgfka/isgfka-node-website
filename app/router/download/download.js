const express = require('express');
const router = express.Router();

router.get('/download', function (req, res) {
  res.render('download', {
    layout: 'download'
  });
});
module.exports = router;
