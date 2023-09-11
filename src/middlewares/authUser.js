

function isUser(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
} else if (req.session.passport && req.session.passport.user && req.session.passport.user.githubUser?.email) {
    return next();
}

return res.status(401).render('error', { error: 'error de autenticacion!' });
  }


    module.exports = isUser;
  //redireccionando una pagina de error
  //res.redirect('/auth/error');

  //otra forma 
  /*     if (req.user) {
      return next();
    } else if (req.isAuthenticated() && req.session.passport.user.githubUser?.email) {
      return next();
    } */