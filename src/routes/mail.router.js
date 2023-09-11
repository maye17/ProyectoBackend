const express = require('express');
const nodemailer = require('nodemailer');
const uploader = require('../utils/utils')

const mailRouter = express.Router();

const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    },
});

mailRouter.get('/',uploader.single("thumbnail"), async(req,res)=>{
    const {__dirname}=uploader;

    try {
        const result= await transport.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to:"mayerlin.dossantos@gmail.com",
            subject:"Veamos este a ver si anda",
            html:`
            <div>
                <h1>Hola enviando mail desde el programa</h1>
                <img src="cid:gracias" />
            </div>`,
  /*           attachments:[
                {
                    filename:"gracias.gif",
                    path:req.file.path,
                    cid:"gracias"
                },
            ] */
        })
        res.send('Correo enviado correctamente');
    } catch (error) {
        res.status(500).send('Error al enviar el correo');
    }

})

module.exports = mailRouter;