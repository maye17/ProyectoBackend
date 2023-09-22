function isUser(req, res, next) {

    if (req.isAuthenticated()) {
      console.log('ingreso por el middleware de usuario')
      return next();
  } else if (req.session.passport && req.session.passport.user && req.session.passport.user.githubUser?.email) {
      return next();
  } 
  
  return res.status(401).render('error', { error: 'error de autenticacion!' });
    }
  module.exports = isUser;