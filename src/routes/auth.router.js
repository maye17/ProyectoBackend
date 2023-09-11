const express = require("express");

const isUser = require("../middlewares/authUser.js");
const isAdmin = require("../middlewares/authAdmin.js")
const passport = require('passport');
const UserProfileController = require('../controllers/user.controler.js')
const controllerUser  = new UserProfileController();
const authRouter = express.Router();
const authController = require("../controllers/auth.controller.js");



//CONTROL DE ACCESO DE USUARIOS
authRouter.get("/user",isUser, controllerUser.getUserAll);
authRouter.get("/administracion", isAdmin, controllerUser.getAdmin);   


// LOGIN CON PASSPORT
    authRouter.get("/login", authController.renderLoginPage);

    authRouter.post("/login",
    passport.authenticate('login', { failureRedirect: '/auth/faillogin' }),
    (req,res,next) => {

        if(req.user && req.user.isAdmin===false){
            isUser(req,res,next);
            console.log("Acceso de usuario validado")
        }else if(req.user && req.user.isAdmin===true){
            isAdmin(req,res,next);
            console.log("Acceso de administración validado");
        }else{
            res.redirect('/auth/faillogin')
        }

    },
    
    authController.handleSuccessfulLogin
);


    authRouter.get('/faillogin', async (req, res) => {
        return res.json({ error: 'fail to login' });

        });

//LOGIN CON SESION DE GITHUB

        authRouter.get('/sesion', async (req, res) => {
            return res.send(JSON.stringify(req.session))
            });
   
//REGISTRO CON PASSPORT
authRouter.post("/register",passport.authenticate('register', { failureRedirect: '/auth/failregister' }), async (req, res) => {
    if(!req.user) {
        return res.json({ status: 'error', msg: 'Error in register', payload: {} });
        }

        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, usuario: req.user.usuario };

        return res.redirect('/access/user')
 
    });


        
    authRouter.get('/failregister', async (req, res) => {
        return res.json({ error: 'fail to register' });
      });


    
    authRouter.get("/register", async (req,res)=> {
        try {
            
            return res.render("register",{})
        } catch (error) {
            res.status(500).json({ 
                status: "error",
                msg: "Error en servidor", 
                data: {} })
        }
    
    })
    
//LOGOUT CON PASSPORT

    authRouter.get("/logout", async (req,res)=> {  
    req.session.destroy((err) => {
        if (err) {
            return res.json({ status: 'error', msg: 'Error in logout', payload: {} });
        }
        res.clearCookie('connect.sid');
        return res.redirect('/auth/login');
        });
})


module.exports = authRouter;