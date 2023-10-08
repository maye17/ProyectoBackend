const allUserService = require('../services/alluser.service')
const serviceUserAll = new allUserService()

class allUserController{



async getAllUser (req,res){
    try {


    const data = await serviceUserAll.AllUser({});
        console.log(data)

        const users = data.map((user) => {
            return {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName:user.lastName,
              password: user.password,
              role: user.role,
              usuario:user.usuario,
            };
        })
     
        return res.status(200).render("authAdmin", { users});
        

    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input AllUserRouter", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

}


async updateDataUser(req,res){
    const userId = req.params.uid;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName

    try {

        const updatedUser = await serviceUserAll.updateDataUserIn(userId,firstName,lastName)
        if (updatedUser) {
            
            return res.status(200).json({
                status: 'success',
                message: 'Datos de usuario actualizados con éxito',
                data: updatedUser,
            });
        } else {
           
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado o no se pudo actualizar',
            });
        }
    } catch (error) {
        throw error
    }
  
}

async deleteUser(req,res){
 
    const userId = req.params.uid;

    console.log('obteniendo el id del usuario', userId);
    if(!userId){

        console.log('usuario no existe')
        return res.status(400).json({
            status:"error",
            message:"usuario no existe"
        })
    }

    try {
        const userDelete = await serviceUserAll.deleteInUser(userId)

        return res.status(200).json({
            status:"success",
            message:'usuario eliminado',
            payload:userDelete
        })

    } catch (error) {
        throw error
    }
}


//Acutalizar datos de usuario desde el front de usuario

async getDocumentUser(req,res){
    try {
  
        if (req.isAuthenticated()) {
            // Obteniendo el Id del usuario autenticado
            const userData = req.user; 
      /*       const data = {
                firstName: userData.firstName,
                cartId:userData.cartId
            };
 */
            console.log('ID del usuario logueado que pasará a handlebars:', userData);
            return res.status(200).render("profile",userData);
        
        } else {
            // El usuario no está autenticado
            return res.status(401).render('error', { message: 'Usuario no autenticado' });
        }

    } catch (error) {
        throw error
    }
}


async addDocumentUser(req,res){

    try {
        const userId = req.params.uid;
        const archivo = req.file;

        const userUpdate = await serviceUserAll.addDocumenTotUser(userId);

        if (!userUpdate) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }

        if(archivo){
         await  serviceUserAll.converUserToUpdate(userUpdate)
        }

 
         return res.status(200).json({
             status: "success",
             message: "Usuario convertido en premium exitosamente",
             payload: userUpdate,
         });



    } catch (error) {
        throw error
    }
  

}


//Actualizando el usuario premium
async updateUserPremium(req,res){

    try {
        const userId = req.params.uid;
//        const archivo = req.files.archivo;
        const identificacionFiles = req.files['identificacion'];
        const domicilioFiles = req.files['domicilio'];
        const estadoCuentaFiles = req.files['estadoCuenta'];
       
        const userPremium = await serviceUserAll.updateDocumenTotUser(userId);

        if ( !identificacionFiles || !domicilioFiles || ! estadoCuentaFiles) {
            return res.status(400).json({
                status: "error",
                message: "Debes proporcionar los tres archivos: identificacion, domicilio y estadoCuenta.",
            });
        } 

        if (!userPremium) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
            });
        }
         
        await serviceUserAll.convertUserToPremium(userPremium)
        
         return res.status(200).json({
             status: "success",
             message: "Usuario convertido en premium exitosamente",
             payload: userPremium,
         });



    } catch (error) {
        throw error
    }
  

}

}

module.exports = allUserController