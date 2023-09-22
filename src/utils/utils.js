
const multer = require("multer");
const path = require("path");


//carga de archivos
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname , "/public"));
    },
    filename: ((req,file,cb)=>{
        cb(null, Date.now() + "-" +file.originalname )
    })
});


const uploader = multer({storage});

module.exports = uploader ;



