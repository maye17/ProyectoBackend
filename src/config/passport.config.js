const passport = require('passport');
const local = require('passport-local').Strategy;
const LocalStrategy = local.Strategy;
const passportGithub= require('passport-github2');
const GitHubStrategy = passportGithub.Strategy;
const UserService = require('../services/user.service.js');
const hashPassword = require('../utils/hashPassword.js');
const userModel = require('../models/mongoose/user.model.js');
const mongoose = require('mongoose')
const createHash = require('../utils/createHash.js');
const validatePassword = require("../utils/validatePassword.js")
const fetch = require('node-fetch');
const CartControllers = require("../controllers/cart.controller.js");
const cartControllers = new CartControllers();
const iniPassport = () => {
    const ObjectId = mongoose.Types.ObjectId;
    const userService = new UserService();
 //paspsort local
 passport.use(
    'login',
    new LocalStrategy(  
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email:username})
                if (!user) {
                    console.log('no se encontro el usuario' +  username)
                    return done(null, false, { message: 'Incorrect email.' });
                }
                if (validatePassword(password, user.password)) {
                    console.log("Invalid password")
                    return done(null, false, { message: 'Incorrect password.' });
                }

                
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'register',
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
            
        },
        async (req, username, password, done) => {

            try {
                const { email, firstName, lastName, usuario } = req.body;
                let user = await userModel.findOne({email:username})
                if (user) {
                    console.log('el usuario ya existe')
                    return done(null, false, { message: 'User already exists' });
                }
                    const newUser = {
                        email,
                        firstName,
                        lastName,
                        isAdmin:false,
                        password:createHash(password) ,
                        usuario,
                       
                    }
                    let userCreated = await userModel.create(newUser);  
                    console.log(userCreated);
                    console.log('user registration succesful');
                    return done(null, userCreated);
                }   catch (error) { 
                    console.log('error en el registro')
                    console.log(error)
                    return done(error);

                }
            }
    )
);

//passport github
passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: 'Iv1.0df6c35ddb8fa72e',
            clientSecret: 'aacd7c060daf343c79d3d5c18fbd65c854e9ce98',
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        },
        async (accessToken, _, profile, done) => {
           
            try {
                const res = await fetch('https://api.github.com/user/emails', {
                    headers: {
                      Accept: 'application/vnd.github+json',
                      Authorization: 'Bearer ' + accessToken,
                      'X-Github-Api-Version': '2022-11-28',
                    },
                  });
                  const emails = await res.json();
                  const emailDetail = emails.find((email) => email.verified == true);
        
           
                if(!emailDetail){
                    return done(new error('No se pudo obtener el email del usuario'));
                }
                profile.emails = emailDetail.email;
                let user = await userModel.findOne({email:profile.email});
                console.log('los datos del usuario',user)
                if (!user) {

                    const newUser = {
                  
                        email:profile.email,
                        firstName:profile._json.name || profile._json.login || 'noname',
                        lastName:"nolastname",
                        isAdmin:false,
                        password:"nopassword",
                        usuario:profile._json.login || 'noname',
                        resetPasswordToken:null,
                        resetPasswordExpires:null
                    }  

                    //creando el usuario
                    let userCreated = await userModel.create(newUser);
                    console.log("usuario registrado con exito",userCreated)
                    await userCreated.save();
                
             
                } else {
                    
                   console.log("usuario logueado",user)
                    return done(null, user);
               }
                
            } catch (error) {
                console.log('error con github')
                console.log(error)
                return done(error);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
}
module.exports = iniPassport;
