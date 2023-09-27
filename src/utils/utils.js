
const multer = require("multer");
const path = require("path");


//carga de archivos
const storage = multer.diskStorage({

        destination: (req, file, cb) => {
          
            let documentsPath = path.join(__dirname,'..', 'public','documents'); 
   
            // Verificar el tipo de archivo
            if (file.fieldname === 'profile') {
                documentsPath = path.join(__dirname, '..', 'public', 'profiles');; // Carpeta para imágenes de perfil
            } else if (file.fieldname === 'products') {
                documentsPath = path.join(__dirname, '..', 'public', 'products');; // Carpeta para imágenes de productos
            }
    
            cb(null, documentsPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
});


const uploader = multer({storage});

module.exports = uploader ;



/*     destination:(req,file,cb)=>{
        cb(null, path.join(__dirname , "/public"));
    },
    filename: ((req,file,cb)=>{
        cb(null, Date.now() + "-" +file.originalname )
    }) */

    /*     destination: (req, file, cb) => {
        
        const documentsPath = path.join(__dirname,'..', 'public','documents'); 
        cb(null, documentsPath);
    },
    filename: (req, file, cb) => {
        // Utilizar el nombre de archivo original
        cb(null, file.originalname); 
    }, */