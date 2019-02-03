var express = require('express');
var router = express.Router();
var newsJSON = require('../public/json/news.json');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newsDB', { useNewUrlParser: true });

const newsSchema = new mongoose.Schema({
  id: Number,
  title:  String,
  author: String,
  text:   String,
  date:  Date
});
const News = mongoose.model('News', newsSchema);

router.get(['/news/:id', '/news'], function(req, res, next) {
  News.find(req.params.id ? {id: req.params.id} : {})
      .then( function(results) {
        res.send(results)
      })
      .catch(err => res.send(500));
});

router.post(['/news'], function(req, res, next) {
  News.create({
        id: Math.floor(Math.random() * 10000),
        title:  req.query.title ? req.query.title : "No Title",
        author: req.query.author ? req.query.author : "No Author",
        text:   req.query.text ? req.query.text : "No Text",
        date:  new Date()
      })
      .then(results => { res.send(`News created ${results}`) })
      .catch(err => res.send(500));
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
