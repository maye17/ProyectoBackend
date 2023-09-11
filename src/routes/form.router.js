const fs = require("fs");
const express = require("express");

const form = express.Router();

form.get('/',  (req,res)=>{


    res.status(200).render('formulario')
    
  
   
})

module.exports = form;