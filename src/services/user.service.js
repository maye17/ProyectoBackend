const usersModel = require("../models/mongoose/user.model")
const hashPassword = require("../utils/hashPassword")
const createHash = require("../utils/createHash")


class UserService {

    async AllUser() {
        try {
            const users = await usersModel.find({},
                {
                  _id: true,
                  email: true,
                  firstName: true,
                  password: true,
                  role: true,
                });
            return users;
        } catch (error) {
            throw error;
        }
    }


async AllPassword (){

    const {password} = usersModel;
    try {
        const hashedPassword = await hashPassword(password);
        const storedHashedPassword = hashedPassword;
        const isPasswordValid = await validatePassword(password, storedHashedPassword);
    
        return isPasswordValid
        
    } catch (error) {
        throw error
    }
 
}


    async addUser (email,firstName,lastName,password,usuario){
       
   
        try {

            const user = await usersModel.create({email:email, password: await createHash(password), firstName:firstName,lastName:lastName,isAdmin:false, usuario:usuario} )
            return user;
            }
         catch (error) {
            throw error;
        }
    }


    async addUserGitHub (email,firstName,lastName,usuario){
       
   
        try {

            const user = await usersModel.create({firstName:firstName,lastName:lastName,isAdmin:false,usuario:usuario} )
            return user;
            }
         catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;