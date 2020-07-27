// const util = require('../../util/index');
// const $http = util.$http;
// const CONFIG = require('../../config/index');
const router = require('./index').$router;

// const getList = () => {
//   return $http.get(API, {
//     params: {}
//   });
// };

router.get('/', async function (req, res) {
  let data = {
  };
  res.render('home', data);
});

module.exports = router;
