const express = require('express');
const router = express.Router();
const News = require('../server/schema.js').News;
const newsJSON = require('../public/json/news.json');
const passport = require('passport');

// Login
router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).redirect('/news');
});

router.post('/loginHandler', function (req, res, next) {
  passport.authenticate('local', function (err, user, message) {
      if (!user) {
          return res.render('login', { message: message.message });
      }
      req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.redirect('/news');
      });
  })(req, res, next)
});

//Routing
router.get(['/news/:id', '/news'], function(req, res, next) {
  News.find(req.params.id ? {id: req.params.id} : {})
      .then( results => res.send(results))
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

router.delete(['/news/:id'], function(req, res, next) {
  if (req.isAuthenticated()){
    News.findOneAndRemove({id: req.params.id})
        .then(results => { res.send(`News ${results} was deleted`) })
        .catch(err => res.send(500));
  } else {
    res.status(200).render('login');
  }
});

router.put(['/news/:id'], function(req, res, next) {
  if (req.isAuthenticated()){
    News.findOneAndUpdate({id: req.params.id}, {date: new Date()})
        .then(results => { res.send(`News ${results} was updated`) })
        .catch(err => res.send(500))
  } else {
    res.status(200).render('login');
  }
});

module.exports = router;
