var express = require('express');
var router = express.Router();
var newsJSON = require('../public/json/news.json');

router.get(['/news/:id', '/news'], function(req, res, next) {
  res.send(`Get News ${req.params.id ? req.params.id : ""}`);
  console.log(`GET request ${req.params.id ? req.params.id : ""}`);
});

router.post(['/news/:id', '/news'], function(req, res, next) {
  res.send(`Post News ${req.params.id ? req.params.id : ""}`);
  console.log(`POST request ${req.params.id ? req.params.id : ""}`);
});

router.delete(['/news/:id', '/news'], function(req, res, next) {
  res.send(`Delete News ${req.params.id ? req.params.id : ""}`);
  console.log(`DELETE request ${req.params.id ? req.params.id : ""}`);
});

router.put(['/news/:id', '/news'], function(req, res, next) {
  res.send(`Put News ${req.params.id ? req.params.id : ""}`);
  console.log(`PUT request ${req.params.id ? req.params.id : ""}`);
});

module.exports = router;
