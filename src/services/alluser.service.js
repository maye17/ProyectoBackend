const userModel = require("../models/mongoose/user.model");



class allUserService{

    async AllUser() {
        try {
            const users = await userModel.find({},
                {
                  _id: true,
                  email: true,
                  firstName: true,
                  lastName:true,
                  password: true,
                  role: true,
                  usuario:true,
                });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async updateDataUserIn(userId,firstName,lastName){

        try {
            
            const updatedatoUser = await userModel.findOne({_id:userId});

            if(!updatedatoUser){
                console.log('usuario no encontrado');
                return null;
            }
            
            // Actualiza los campos de nombre y apellido con los nuevos valores
            updatedatoUser.firstName = firstName;
            updatedatoUser.lastName = lastName;

        // Guarda los cambios en la base de datos
        await updatedatoUser.save();

        // Devuelve el usuario actualizado
        return updatedatoUser;
            
        } catch (error) {
            throw error
        }
        

    }

    async deleteInUser(userId){
        try {
           // Elimina al usuario de la base de datos utilizando deleteOne
        const userToDelete = await userModel.deleteOne({ _id: userId });

            if(!userToDelete){
                throw new Error ('usuario no encontrado')

            }

             // Elimina al usuario de la base de datos
    
            return 'usuario eliminado correctamente'

        } catch (error) {
            throw error
        }
    }


//Actualizar documentos desde el front del usuario

async getUserToDocument(userId){
    try {

        const UserDocument = await userModel.findById({_id:userId})

        return UserDocument;
        
    } catch (error) {
        throw error
    }
}


    async addDocumenTotUser(userId){
        try {
            const user = await userModel.findById(userId);

            if (!user) {
                throw error;
            }
    
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    async  converUserToUpdate(userUpdate) {
        try {
            if (!userUpdate) {
                throw new Error('Usuario no válido');
            }
           
            const updatedUser = await userUpdate.save();
    
            return {
                message: 'Usuario convertido en premium exitosamente',
                payload: updatedUser,
            };
        } catch (error) {
            throw error;
        }
    }



    //ACTUALIZAR A USUARIO PREMIUM 

    async updateDocumenTotUser(userId){
        try {
            const user = await userModel.findById(userId);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }
    
            return user;
        } catch (error) {
            throw error;
        }
    }
    

    async  convertUserToPremium(userPremium) {
        try {
            if (!userPremium) {
                throw new Error('Usuario no válido');
            }
    
            userPremium.isPremium = true;
            const updatedUser = await userPremium.save();
    
            return {
                message: 'Usuario convertido en premium exitosamente',
                payload: updatedUser,
            };
        } catch (error) {
            throw error;
        }
    }

}

module.exports = allUserService