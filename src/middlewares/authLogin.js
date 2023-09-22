function isLogin(req,res,next){
    const email = req.body.email;
    const pass = req.body.password;
    if (req.isAuthenticated()) {
        // El usuario está autenticado correctamente.
        return next();
    } else {
        // El usuario no está autenticado.
        return res.status(401).json({
            message: "Usuario no autenticado"
        });
    }


}

module.exports = isLogin;