const express = require('express');
const nodemailer = require('nodemailer');
const uploader = require('../utils/utils')
const twilio = require('twilio')
const mailRouter = express.Router();
const config = require('../config/config.js');
const crypto = require('crypto');
const usersModel = require('../models/mongoose/user.model')
const bodyParser = require('body-parser');
const createHash = require('../utils/createHash')
const mongoose = require('mongoose');
const userModel = require('../models/mongoose/user.model');
//const handlebars = require('nodemailer-handlebars');
//const path = require('path');


//definiendo el cliente de twilio
const client = twilio(
    config.twilioAccountSid,
    config.twilioAuthToken

)



const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
       user:config.googleEmail,
       pass:config.googlePass
    },
});

/* transport.use('compile',handlebars({
    viewEngine:'handlebars',
    viewPath:path.resolve(__dirname,'forgetPassword')
})) */

mailRouter.get('/mail',uploader.single("thumbnail"), async(req,res)=>{
    const {__dirname}=uploader;

    try {
        const result= await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to:"mayerlin.dossantos@gmail.com",
            subject:"Olvido de contraseña",
            html:`
            <div>
                <h1>Hola enviando mail desde el programa</h1>
                <img src="cid:gracias" />
            </div>`,
  /*           attachments:[
                {
                    filename:"gracias.gif",
                    path:req.file.filename,
                    cid:"gracias"
                },
            ] */
        })
        console.log(result)
        res.send('Correo enviado correctamente');
    } catch (error) {
        res.status(500).send('Error al enviar el correo');
    }

})


// Ruta para la página de solicitud de correo electrónico
mailRouter.get('/emailForm', (req, res) => {
    res.render('emailForm');
  });
  
  
  //ruta para cambiar la contraseña

  mailRouter.get('/resetPassword', async(req,res)=>{
    const token = req.query.token
    res.render('resetPassword')
  })


 mailRouter.post('/resetPassword', async(req,res)=>{
    try {
        const tokenUrl = req.query.token;
        const tokenValidate = await userModel.findOne ({ resetPasswordToken: tokenUrl });
        if(!tokenValidate){
            return res.render('error', { message: 'Usuario no encontrado' });
        }

        const newPassword = req.body.password;
        console.log('nueva contraseña introducida',newPassword)
        const hashedPassword = await createHash(newPassword);

        // Asigna la contraseña hasheada al usuario
        tokenValidate.password = hashedPassword;


          // Expira el campo resetPasswordExpires (lo establece en null)
    tokenValidate.resetPasswordExpires = null;
    console.log('nueva contraseña para guardar',hashedPassword)
    console.log('nueva contraseña de token',tokenValidate.password)
        await tokenValidate.save();
        
        //res.render('passwordResetSuccess', { message: 'Contraseña restablecida con éxito' });
        res.send('contraseñ a restablecida con éxito!')


    } catch (error) {
        throw error
    }
    
    
 })   

//ENVIO DE MENSAJE DE TEXTO
mailRouter.get('/sms',async(req,res)=>{
    try {
        const result= await client.messages.create({
            body:"Your code verification is",
  
            from:config.twilioPhoneNumber,
            to:'+541164620512'
        })
        console.log(result)
        res.send('mensaje enviado')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al enviar el mensaje');
    }

})

mailRouter.use(bodyParser.urlencoded({ extended: true }));



// Ruta para manejar el envío del correo electrónico
mailRouter.post('/sendEmail', async (req, res) => {
    try {
      const email = req.body.email;

   // Genera un token seguro para el enlace de restablecimiento de contraseña
   const token = crypto.randomBytes(20).toString('hex');

   const expirationDate = new Date();

   expirationDate.setHours(expirationDate.getHours());

      // Busca el usuario por su correo electrónico en la base de datos
    const userFind = await userModel.findOne ({ email: email });
        if(!userFind){
            return res.render('error', { message: 'Usuario no encontrado' });
        }

   // Almacena el token y la fecha de vencimiento en la base de datos
   userFind.resetPasswordToken = token;
   userFind.resetPasswordExpires = expirationDate;
    await userFind.save();

    // Crea una URL para el enlace de restablecimiento de contraseña
   
        const resetPasswordLink = `http://localhost:8080/send/resetPassword?token=${token}`;
        const mailOptions= {
            from: process.env.GOOGLE_EMAIL,
            to:email,
            subject:"Recuperar contraseña",
            html:`<div>
            <p>Haz click en el siguiente enlace para restablecer tu contraseña </p><p><p><a href="${resetPasswordLink}">Restablecer Contraseña</a></p>
            </div>`
       ,
        }

       // Envía el correo electrónico
      await transport.sendMail(mailOptions);
      console.log(mailOptions)
     return res.render('emailSent',{
        message: 'Correo enviado correctamente',});
       
      
  
      
    } catch (error) {
      console.error(error);
      res.render('error');
    }
  });


module.exports = mailRouter;