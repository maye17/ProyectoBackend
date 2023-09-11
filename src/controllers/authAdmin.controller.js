const UserService = require('../services/user.service')
const serviceUser = new UserService();

class userController {
    async getUser(req,res){
        try {
    
          
            const users = await serviceUser.AllUser();
 
            return  res.status(200).json({
                status:"OK",
                msg:"user list",
                payload:users,
            })
         } catch (err) {
             if (err instanceof Error) {
                 res.status(400).json({ status: "error", msg: "No se encontraron datos", data: {} })
             } else {
                 res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
             }
         }
    }
}

module.exports = userController;