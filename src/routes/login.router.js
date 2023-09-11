
const express = require('express');
const loginRouter = express.Router();


loginRouter.get('/', async (req, res) => {
  res.render('inicio');
});

loginRouter.get('/login', async (req, res) => {
  res.render('login-github');
});


module.exports = loginRouter;