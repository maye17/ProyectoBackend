
const express = require("express");
const userModel = require("../models/mongoose/user.model.js");
const isUser = require("../middlewares/authUser.js");
const isAdmin = require("../middlewares/authAdmin.js")

const passport = require('passport');

const authAdminRouter = express.Router();

const userController = require("../controllers/authAdmin.controller.js")
const controllerUser = new userController()

//obtiene todos los productos
authAdminRouter.get("/users",isAdmin, controllerUser.getUser);

authAdminRouter.post("/",passport.authenticate('users', { failureRedirect: '/auth/failregister' }), async (req, res) => {
    if(!req.user) {
        return res.json({ status: 'error', msg: 'Error in register', payload: {} });
        }

        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, usuario: req.user.usuario };

        return res.redirect('/users')
        //res.json({ msg: 'ok', payload: req.user });
    });


        
    authAdminRouter.get('/failregister', async (req, res) => {
        return res.json({ error: 'fail to register' });
      });


      authAdminRouter.get("/users", async (req,res)=> {
        try {
            
            return res.render("authAdmin",{})
        } catch (error) {
            res.status(500).json({ 
                status: "error",
                msg: "Error en servidor", 
                data: {} })
        }
    
    })


    module.exports = authAdminRouter;