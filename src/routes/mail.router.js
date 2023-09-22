

const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendMail = express.Router();


const transport = nodemailer.createTransport({
    service:config.serviceMail,
    port:config.portMail,
    auth:{
       user:config.googleEmail,
       pass:config.googlePass
    },
});


sendMail.get('/', async(req,res)=>{
    try {
        
        const email = req.query.email;
        const resetPasswordLink = 'https://localhost:8080/reset-password';
        const result= await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to:email,
            subject:"Olvido de contraseña",
            template:resetPasswordLink,
            context:{
                resetLink:resetPasswordLink
            }
       ,
        })
        console.log(result)
        res.send('Correo enviado correctamente'); 
    } catch (error) {
        throw error
    }



})

module.exports = sendMail;