var express = require('express');
var router = express.Router();
var newsJSON = require('../public/json/news.json');

/* GET users listing. */
router.all('*', function(req, res, next) {
  res.json(newsJSON);
});

module.exports = router;
