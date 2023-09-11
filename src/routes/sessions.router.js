const express = require('express');
const passport = require('passport');

const sessionsRouter = express.Router();

sessionsRouter.get('/github', (passport.authenticate('github', { scope: ['user:email'] })));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    console.log('puedo entrar?',req.session.user);
res.redirect('/access/user');

});

sessionsRouter.get('/show', (req, res) => {
    return res.send(JSON.stringify(req.session));
  });

module.exports = sessionsRouter;